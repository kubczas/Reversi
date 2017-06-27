var board;
var TURNS = {
    WHITE: 1,
    BLACK: 2
}
var currentTurn = TURNS.WHITE;
var lastFocused;

function init() {
    board = new ChessBoard('board', {
        onSquareClick: onSquareClick,
        onSquareFocus: onSquareFocus,
        onSquareFocusLost: onSquareFocusLost
    });
}

function onSquareClick(clickedSquare) {
    if (selectedSquares.length === 0) {
        if (game.moves({ square: clickedSquare }).length > 0) {
            board.selectSquare(clickedSquare);
        }

        return;
    }

    var selectedSquare = selectedSquares[0];

    if (clickedSquare === selectedSquare) {
        board.unselectSquare(clickedSquare);
        return;
    }

    board.unselectSquare(selectedSquare);

    var clickedPieceObject = game.get(clickedSquare);
    var selectedPieceObject = game.get(selectedSquare);

    if (clickedPieceObject && (clickedPieceObject.color === selectedPieceObject.color)) {
        board.selectSquare(clickedSquare);
        return;
    }

    var legalMoves = game.moves({ square: selectedSquare, verbose: true });
    var isMoveLegal = legalMoves.filter(function (move) {
        return move.to === clickedSquare;
    }).length > 0;

    if (!isMoveLegal) {
        return;
    }

    if (selectedPieceObject.type === 'p' && (clickedSquare[1] === '1' || clickedSquare[1] === '8')) { // Promotion
        board.askPromotion(selectedPieceObject.color, function (shortPiece) {
            move(selectedSquare, clickedSquare, shortPiece);
        });
    } else {
        move(selectedSquare, clickedSquare);
    }
}

function onSquareFocus(focusedSquare, focusSquareRow, focusSquareColumn, board) {
    lastFocused = focusedSquare;
    focusedSquare.style.color = 'red';
    //var pieces = board.element.getElementsByClassName('green square');
    //if (currentTurn === TURNS.WHITE) {
    //    var piecesFromRow = getPiecesFromRow(pieces, focusSquareRow);
    //    for(var i = 0; i < )
    //}
}

function onSquareFocusLost() {
    lastFocused.style.color = 'black';
}

function getPiecesFromRow(pieces, row) {
    var piecesFromRow = [];
    for (var i = 0; i < pieces.length; i++) {
        if (pieces[i].getAttribute('data-square-row') === row) {
            piecesFromRow.push(pieces[i]);
        }
    }
    return piecesFromRow;
}