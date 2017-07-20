var POSSIBLE_MOVE = 100;

var cornersCoordinates = [
        new {
            row: 0,
            column: 0
        },
        new {
            row: 0,
            column: 7
        },
        new {
            row: 7,
            column: 0
        },
        new {
            row: 7,
            column: 7
        }
];

var fieldsNearbyCornerCoordinates = [
        new {
            row: 0,
            column: 1
        },
        new {
            row: 0,
            column: 6
        },
        new {
            row: 7,
            column: 1
        },
        new {
            row: 7,
            column: 6
        },
        new {
            row: 1,
            column: 0
        },
        new {
            row: 1,
            column: 7
        },
        new {
            row: 6,
            column: 0
        },
        new {
            row: 6,
            column: 7
        }
];

var worstFieldsCoordinates = [
    new {
        row: 1,
        column: 1
    },
    new {
        row: 1,
        column: 6
    },
    new {
        row: 6,
        column: 1
    },
    new {
        row: 6,
        column: 6
    }
];

var edgeFieldsCoordinates = [
        new {
            row: 0,
            column: 2
        },
        new {
            row: 0,
            column: 3
        },
        new {
            row: 0,
            column: 4
        },
        new {
            row: 0,
            column: 5
        },
        new {
            row: 2,
            column: 0
        },
        new {
            row: 3,
            column: 0
        },
        new {
            row: 4,
            column: 0
        },
        new {
            row: 5,
            column: 0
        },
        new {
            row: 2,
            column: 7
        },
        new {
            row: 3,
            column: 7
        },
        new {
            row: 4,
            column: 7
        },
        new {
            row: 5,
            column: 7
        },
        new {
            row: 7,
            column: 2
        },
        new {
            row: 7,
            column: 3
        },
        new {
            row: 7,
            column: 4
        },
        new {
            row: 7,
            column: 5
        }
];

var fieldsCloseToEdgeCoordinates = [
        new {
            row: 1,
            column: 2
        },
        new {
            row: 1,
            column: 3
        },
        new {
            row: 1,
            column: 4
        },
        new {
            row: 1,
            column: 5
        },
        new {
            row: 2,
            column: 1
        },
        new {
            row: 3,
            column: 1
        },
        new {
            row: 4,
            column: 1
        },
        new {
            row: 5,
            column: 1
        },
        new {
            row: 2,
            column: 6
        },
        new {
            row: 3,
            column: 6
        },
        new {
            row: 4,
            column: 6
        },
        new {
            row: 5,
            column: 6
        },
        new {
            row: 6,
            column: 2
        },
        new {
            row: 6,
            column: 3
        },
        new {
            row: 6,
            column: 4
        },
        new {
            row: 6,
            column: 5
        }
];

function countFields(coordinateBoard, board) {
    var result = 0;
    for (var i = 0; i < coordinateBoard.length; i++) {
        if (board[coordinateBoard[i].row][coordinateBoard[i].column] === aiColor) {
            result++;
        }
    }
    return result;
}

function countCorners(board) {
    return countFields(cornersCoordinates, board);
}

function countPossibleAIMoves(board) {
    return getAvailableFields(board, aiColor).length;
}

function countPossibleHumanMoves(board) {
    return getAvailableFields(board, humanPlayerColor).length;
}

function countFieldsNearbyCorner(board) {
    return countFields(fieldsNearbyCornerCoordinates, board);
}

function countWorstField(board) {
    return countFields(worstFieldsCoordinates, board);
}

function countEdgeFields(board) {
    return countFields(edgeFieldsCoordinates, board);
}

function countFieldsCloseToTheEdge(board) {
    return countFields(fieldsCloseToEdgeCoordinates, board);
}

function evaluteByPossibleMoves(board) {
    var aiPossibleMoves = countPossibleAIMoves(board);
    var humanPossibleMoves = countPossibleHumanMoves(board);
    if (aiPossibleMoves !== humanPossibleMoves) {
        return POSSIBLE_MOVE * (aiPossibleMoves - humanPossibleMoves) / (aiPossibleMoves + humanPossibleMoves);
    }
    return 0;
}

function evaluateByNumberOfPieces(board) {
    //todo write functions for calculate current result
}