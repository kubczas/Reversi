﻿
function onSquareClick(clickedSquare, selectedSquares) {
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