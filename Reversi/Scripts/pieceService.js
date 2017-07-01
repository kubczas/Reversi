function setBlackPieces(piece, square) {
    piece.className = 'black piece';
    square.classList.add('blackplaced');
}

function setWhitePieces(piece, square) {
    piece.className = 'white piece';
    square.classList.add('whiteplaced');
}

function updateColorOfPiece(square) {
    if (square.element.childNodes.length > 0) {
        var squareSize = square.element.childNodes.item(0).offsetHeight;
        square.element.removeChild(square.element.childNodes.item(0));
        createPiece(square.element, squareSize);
    }
}

function changeColorPieceToBlack(square) {
    square.element.classList.remove('whiteplaced');
    square.element.classList.add('blackplaced');
    updateColorOfPiece(square);
}

function changeColorPieceToWhite(square) {
    square.element.classList.remove('blackplaced');
    square.element.classList.add('whiteplaced');
    updateColorOfPiece(square);
}

function setPieceSize(piece, squareSize) {
    piece.style.width = squareSize + 'px';
    piece.style.height = squareSize + 'px';
}

function createPiece(square, squareSize) {
    var piece = document.createElement('div');
    setPieceSize(piece, squareSize);
    if (currentTurn===TURNS.BLACK)
        setBlackPieces(piece, square);
    else
        setWhitePieces(piece, square);
    square.appendChild(piece);
}

function changePieceColor(square) {
    if (currentTurn === TURNS.BLACK)
        changeColorPieceToBlack(square);
    else
        changeColorPieceToWhite(square);
}