var maxDepth = 4;

function getBestMoveMiniMax(board, aiColor, currentDepth) {
    if (currentDepth >= maxDepth)
        return evaluateBestMove(board, aiColor);

    var availableMoves = getAvailableFields(board, aiColor);
    if (availableMoves.length === 0)
        return null;

    if (aiColor === TURNS.WHITE)
        return getMax(board, aiColor, currentDepth, availableMoves);
    else
        return getMin(board, aiColor, currentDepth);
}

function evaluateBestMove(board, aiColor) {
    
}

function getAvailableFields(board, aiColor) {
    
}

function getMax(board, aiColor, currentDepth, availableMoves){//todo aiColor -> currentColor
    var bestValue = MIN_VALUE;
    var bestMove = null;
    for (var  i = 0; i < availableMoves.length; i++) {
        var newBoard = getBoardAfterMove(board, aiColor, availableMoves[i]);

        var currentResult = getBestMoveMiniMax(newBoard, aiColor, currentDepth + 1);
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

function getMin(board, aiColor, currentDepth, availableMoves) {
    var bestValue = MAX_VALUE;
    var bestMove = null;
    for (var i = 0; i < availableMoves.length; i++) {
        var newBoard = getBoardAfterMove(board, aiColor, availableMoves[i]);

        var currentResult = getBestMoveMiniMax(newBoard, aiColor, currentDepth + 1);
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

function getBoardAfterMove(board, aiColor, availableMove) {
    
}