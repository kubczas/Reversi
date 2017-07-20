var board;
var TURNS = {
    WHITE: 1,
    BLACK: 2
}
var currentTurn = TURNS.WHITE;
var humanPlayerColor = TURNS.WHITE;
var aiColor = TURNS.BLACK;
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

function verifyIfFocusedSquareHasPlacedPiece(focusedSquare) {
    return focusedSquare.classList.contains('whiteplaced') || focusedSquare.classList.contains('blackplaced');
}

function verifyIfFocusedSquareHasPlacedPiece(row, column) {
    return currentStatusBoard[row][column] !== null;
}

function changeCurrentTurn() {
    if (currentTurn === TURNS.WHITE)
        currentTurn = TURNS.BLACK;
    else
        currentTurn = TURNS.WHITE;
}

function updatePieceForSpecificDirection(directionX, directionY, focusedSquareRow, focusedSquareColumn) {
    var currentX = (Number(focusedSquareColumn) + Number(directionX));
    var currentY = (Number(focusedSquareRow) + Number(directionY));

    while (isPieceInsideBoard(currentY, currentX)) {
        var currentSquare = getSquare(currentX, currentY);
        if (isOtherPiecesColorPlaced(currentY, currentX, currentStatusBoard)) {
            currentStatusBoard[currentY][currentX] = currentTurn;
            changePieceColor(currentSquare);
        }
        currentX = (Number(currentX) + Number(directionX));
        currentY = (Number(currentY) + Number(directionY));
    }
}

function updatePieces(clickedSquareRow, clickedSquareColumn) {
    for (var i = 0; i < 8; i++) {
        if (isPieceFullifulRequirement(directionCoordinates[i].coordinates.x, directionCoordinates[i].coordinates.y, clickedSquareRow, clickedSquareColumn, currentStatusBoard)) {
            updatePieceForSpecificDirection(directionCoordinates[i].coordinates.x, directionCoordinates[i].coordinates.y, clickedSquareRow, clickedSquareColumn);
        }
    }
}

function onSquareClick(clickedSquare, clickedSquareRow, clickedSquareColumn, board, squareSize) {
    if (canSetPiece) {
        createPiece(clickedSquare, squareSize);
        canSetPiece = false;
        clickedSquare.style.color = 'black';
        updatePieces(clickedSquareRow, clickedSquareColumn);
        currentStatusBoard[clickedSquareRow][clickedSquareColumn] = currentTurn;
        changeCurrentTurn();
        updateResults();
    }
}

function onSquareFocus(focusedSquare, focusSquareRow, focusSquareColumn) {
    if (currentTurn !== humanPlayerColor)
        return;
    lastFocused = focusedSquare;
    if (verifyIfFocusedSquareHasPlacedPiece(focusSquareRow, focusSquareColumn)) {
        focusedSquare.style.color = 'red';
        return;
    }
    for (var i = 0; i < 8; i++) {
        if (isAvailableField(focusSquareRow, focusSquareColumn, currentStatusBoard)) {
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

function getSquare(column, row) {
    var currentRow = uiBoard[row];
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

function updateResults() {
    var whitePieces = $(".whiteplaced").map(function () {
        return this.innerHTML;
    }).get();
    var blackPieces = $(".blackplaced").map(function () {
        return this.innerHTML;
    }).get();
    document.getElementById("whiteResult").textContent = whitePieces.length.toString();
    document.getElementById("blackResult").textContent = blackPieces.length.toString();
}