var maxDepth = 2;

function getBestMoveMiniMax(board, currentTurnColor, currentDepth) {
    if (currentDepth >= maxDepth)
        return virtualEvaluate(board, currentTurnColor);

    var availableMoves = getAvailableFields(board, currentTurnColor);
    if (availableMoves.length === 0)
        return null;

    currentTurnColor = getOppositeColor(currentTurnColor);

    if (currentTurnColor === aiColor)
        return getMax(board, aiColor, currentDepth, availableMoves);
    else
        return getMin(board, humanPlayerColor, currentDepth, availableMoves);
}

function virtualEvaluate(board) {
    return evaluateByCorners(board) + evaluateByEdgeFields(board) + evaluateByWorstFields(board) + evaluateByEdgeFields(board);
}

function getMax(board, pieceColor, currentDepth, availableMoves) {
    var bestValue = Number.MIN_VALUE;
    var bestMove = null;
    for (var  i = 0; i < availableMoves.length; i++) {
        var newBoard = getBoardAfterMove(board, pieceColor, availableMoves[i]);

        var currentResult = getBestMoveMiniMax(newBoard, pieceColor, currentDepth + 1);
        if (bestValue < currentResult.moveValue)
        {
            bestValue = currentResult.moveValue;
            bestMove = availableMoves[i];
        }
    }
    return {
        moveValue: bestValue,
        bestMove: bestMove
    }
}

function getMin(board, pieceColor, currentDepth, availableMoves) {
    var bestValue = Number.MAX_VALUE;
    var bestMove = null;
    for (var i = 0; i < availableMoves.length; i++) {
        var newBoard = getBoardAfterMove(board, pieceColor, availableMoves[i]);

        var currentResult = getBestMoveMiniMax(newBoard, pieceColor, currentDepth + 1);
        if (bestValue > currentResult.moveValue) {
            bestValue = currentResult.moveValue;
            bestMove = availableMoves[i];
        }
    }
    return {
        moveValue: bestValue,
        bestMove: bestMove
    }
}

function getBoardAfterMove(board, color, availableMove) {
    var boardAfterMove = JSON.parse(JSON.stringify(board));
    boardAfterMove[availableMove.row][availableMove.column] = color;
    return boardAfterMove;
}

function getOppositeColor(color) {
    if (color === TURNS.WHITE)
        return TURNS.BLACK;
    else
        return TURNS.WHITE;
}