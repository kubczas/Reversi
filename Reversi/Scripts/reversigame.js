var board;
var TURNS = {
    WHITE: 1,
    BLACK: 2
}
var currentTurn = TURNS.WHITE;
var canSetPiece = false;
var lastFocused;
var directionCoordinates = [
    { direction: "LeftUp", coordinates: { x: -1, y: 1 } },
    { direction: "Up", coordinates: { x: 0, y: 1 } },
    { direction: "UpRight", coordinates: { x: 1, y: 1 } },
    { direction: "Right", coordinates: { x: 1, y: 0 } },
    { direction: "DownRight", coordinates: { x: 1, y: -1 } },
    { direction: "Down", coordinates: { x: 0, y: -1 } },
    { direction: "LeftDown", coordinates: { x: -1, y: -1 } },
    { direction: "Left", coordinates: { x: -1, y: 0 } }
];

function init() {
    board = new ChessBoard('board', {
        onSquareClick: onSquareClick,
        onSquareFocus: onSquareFocus,
        onSquareFocusLost: onSquareFocusLost
    });
}

function calcSquareColumn(column) {
    return column.charCodeAt(0) - 97;
}

function verifyIfFocusedSquareHasPlacedPiece(focusedSquare) {
    return focusedSquare.classList.contains('whiteplaced') || focusedSquare.classList.contains('blackplaced');
}

function changeCurrentTurn() {
    if (currentTurn === TURNS.WHITE)
        currentTurn = TURNS.BLACK;
    else
        currentTurn = TURNS.WHITE;
}

function updatePieceForSpecificDirection(directionX, directionY, focusedSquareRow, focusedSquareColumn, board) {
    var currentX = (Number(focusedSquareColumn) + Number(directionX));
    var currentY = (Number(focusedSquareRow) + Number(directionY));

    while (currentX < 8 && currentX >= 0 && currentY <= 8 && currentY >= 1) {
        var currentSquare = getSquare(currentX, currentY, board);
        if(isOtherPiecesColorPlaced(currentSquare))
            changePieceColor(currentSquare);
        currentX = (Number(currentX) + Number(directionX));
        currentY = (Number(currentY) + Number(directionY));
    }
}

function updatePieces(clickedSquare, clickedSquareRow, clickedSquareColumn, board) {
    for (var i = 0; i < 8; i++) {
        if (isPieceFullifulRequirement(directionCoordinates[i].coordinates.x, directionCoordinates[i].coordinates.y, clickedSquareRow, calcSquareColumn(clickedSquareColumn), board)) {
            updatePieceForSpecificDirection(directionCoordinates[i].coordinates.x, directionCoordinates[i].coordinates.y, clickedSquareRow, calcSquareColumn(clickedSquareColumn), board);
        }
    }
}

function onSquareClick(clickedSquare, clickedSquareRow, clickedSquareColumn, board, squareSize) {
    if (canSetPiece) {
        createPiece(clickedSquare, squareSize);
        canSetPiece = false;
        clickedSquare.style.color = 'black';
        updatePieces(clickedSquare, clickedSquareRow, clickedSquareColumn, board);
        changeCurrentTurn();
        updateResults();
    }
}

function onSquareFocus(focusedSquare, focusSquareRow, focusSquareColumn, board) {
    lastFocused = focusedSquare;
    if (verifyIfFocusedSquareHasPlacedPiece(focusedSquare)) {
        focusedSquare.style.color = 'red';
        return;
    }
    for (var i = 0; i < 8; i++) {
        if (isPieceFullifulRequirement(directionCoordinates[i].coordinates.x, directionCoordinates[i].coordinates.y, focusSquareRow, calcSquareColumn(focusSquareColumn), board)) {
            focusedSquare.style.color = 'green';
            canSetPiece = true;
            return;
        }
    }
    focusedSquare.style.color = 'red';
}

function onSquareFocusLost() {
    lastFocused.style.color = 'black';
    canSetPiece = false;
}

function getSquare(column, row, board) {
    var currentRow = board[row];
    return currentRow[column];
}

function isOtherPiecesColorPlaced(square) {
    return (currentTurn === TURNS.BLACK && square.element.classList.contains('whiteplaced')) || (currentTurn === TURNS.WHITE && square.element.classList.contains('blackplaced'));
}

function isCurrentTurnColorPiecePlaced(piece) {
    if (currentTurn === TURNS.BLACK) {
        return piece.element.classList.contains('blackplaced');
    } else {
        return piece.element.classList.contains('whiteplaced');
    }
}

function isPieceFullifulRequirement(directionX, directionY, focusedSquareRow, focusedSquareColumn, board) {
    var nextPiece;
    var currentX = (Number(focusedSquareColumn) + Number(directionX));
    var currentY = (Number(focusedSquareRow) + Number(directionY));

    while (currentX < 8 && currentX >= 0 && currentY <= 8 && currentY >= 1) {
        var currentSquare = getSquare(currentX, currentY, board);
        if (isOtherPiecesColorPlaced(currentSquare)) {
            nextPiece = getSquare(currentX + directionX, currentY + directionY, board);
        } else {
            break;
        }
        currentX = (Number(currentX) + Number(directionX));
        currentY = (Number(currentY) + Number(directionY));
    }
    if (nextPiece != null) {
        return isCurrentTurnColorPiecePlaced(nextPiece);
    }
    return false;
}

function updateResults(){
    var whitePieces = $(".whiteplaced").map(function () {
        return this.innerHTML;
    }).get();
    var blackPieces = $(".blackplaced").map(function () {
        return this.innerHTML;
    }).get();
    document.getElementById("whiteResult").textContent = whitePieces.length.toString();
    document.getElementById("blackResult").textContent = blackPieces.length.toString();
}