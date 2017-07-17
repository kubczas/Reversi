var maxDepth = 4;

function getBestMoveMiniMax(board, currentTurnColor, currentDepth) {
    if (currentDepth >= maxDepth)
        return evaluateBestMove(board, currentTurnColor);

    var availableMoves = getAvailableFields(board, aiColor);//todo
    if (availableMoves.length === 0)
        return null;

    if (currentTurnColor === aiColor)
        return getMax(board, aiColor, currentDepth, availableMoves);
    else
        return getMin(board, humanPlayerColor, currentDepth);
}

function evaluateBestMove(board, currentTurnColor) {
    
}

function getMax(board, pieceColor, currentDepth, availableMoves) {
    var bestValue = MIN_VALUE;
    var bestMove = null;
    for (var  i = 0; i < availableMoves.length; i++) {
        var newBoard = getBoardAfterMove(board, pieceColor, availableMoves[i]);

        var currentResult = getBestMoveMiniMax(newBoard, pieceColor, currentDepth + 1);
        if (bestValue < currentResult.moveValue)
        {
            bestValue = currentResult.moveValue;
            bestMove = currentResult.bestMove;
        }
    }
    return new {
        moveValue: bestValue,
        bestMove: bestMove
    }
}

function getMin(board, pieceColor, currentDepth, availableMoves) {
    var bestValue = MAX_VALUE;
    var bestMove = null;
    for (var i = 0; i < availableMoves.length; i++) {
        var newBoard = getBoardAfterMove(board, pieceColor, availableMoves[i]);

        var currentResult = getBestMoveMiniMax(newBoard, pieceColor, currentDepth + 1);
        if (bestValue > currentResult.moveValue) {
            bestValue = currentResult.moveValue;
            bestMove = currentResult.bestMove;
        }
    }
    return new {
        moveValue: bestValue,
        bestMove: bestMove
    }
}

function getBoardAfterMove(board, color, availableMove) {
    var boardAfterMove = board.slice(0);
    boardAfterMove[availableMove.row][availableMove.column] = color;
    return boardAfterMove;
}