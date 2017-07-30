var POSSIBLE_MOVE = 100;
var NUMBER_OF_PIECES = 50;
var CORNERS = 200;
var EDGE_FIELDS = 180;
var NEARBY_CORNER = 80;
var WORST_FIELD = 150;
var CLOSER_EDGE = 150;

var cornersCoordinates = [
        {
            row: 0,
            column: 0
        },
        {
            row: 0,
            column: 7
        },
        {
            row: 7,
            column: 0
        },
        {
            row: 7,
            column: 7
        }
];

var fieldsNearbyCornerCoordinates = [
        {
            row: 0,
            column: 1
        },
        {
            row: 0,
            column: 6
        },
        {
            row: 7,
            column: 1
        },
        {
            row: 7,
            column: 6
        },
        {
            row: 1,
            column: 0
        },
        {
            row: 1,
            column: 7
        },
        {
            row: 6,
            column: 0
        },
        {
            row: 6,
            column: 7
        }
];

var worstFieldsCoordinates = [
    {
        row: 1,
        column: 1
    },
    {
        row: 1,
        column: 6
    },
    {
        row: 6,
        column: 1
    },
    {
        row: 6,
        column: 6
    }
];

var edgeFieldsCoordinates = [
    {
        row: 0,
        column: 2
    },
    {
        row: 0,
        column: 3
    },
    {
        row: 0,
        column: 4
    },
    {
        row: 0,
        column: 5
    },
    {
        row: 2,
        column: 0
    },
    {
        row: 3,
        column: 0
    },
    {
        row: 4,
        column: 0
    },
    {
        row: 5,
        column: 0
    },
    {
        row: 2,
        column: 7
    },
    {
        row: 3,
        column: 7
    },
    {
        row: 4,
        column: 7
    },
    {
        row: 5,
        column: 7
    },
    {
        row: 7,
        column: 2
    },
    {
        row: 7,
        column: 3
    },
    {
        row: 7,
        column: 4
    },
    {
        row: 7,
        column: 5
    }
];

var fieldsCloseToEdgeCoordinates = [
    {
        row: 1,
        column: 2
    },
    {
        row: 1,
        column: 3
    },
    {
        row: 1,
        column: 4
    },
    {
        row: 1,
        column: 5
    },
    {
        row: 2,
        column: 1
    },
    {
        row: 3,
        column: 1
    },
    {
        row: 4,
        column: 1
    },
    {
        row: 5,
        column: 1
    },
    {
        row: 2,
        column: 6
    },
    {
        row: 3,
        column: 6
    },
    {
        row: 4,
        column: 6
    },
    {
        row: 5,
        column: 6
    },
    {
        row: 6,
        column: 2
    },
    {
        row: 6,
        column: 3
    },
    {
        row: 6,
        column: 4
    },
    {
        row: 6,
        column: 5
    }
];

function countFields(coordinateBoard, board, color) {
    var result = 0;
    for (var i = 0; i < coordinateBoard.length; i++) {
        if (board[coordinateBoard[i].row][coordinateBoard[i].column] === color) {
            result++;
        }
    }
    return result;
}

function countCorners(board, color) {
    return countFields(cornersCoordinates, board, color);
}

function countPossibleAIMoves(board) {
    return getAvailableFields(board, aiColor).length;
}

function countPossibleHumanMoves(board) {
    return getAvailableFields(board, humanPlayerColor).length;
}

function countFieldsNearbyCorner(board, color) {
    return countFields(fieldsNearbyCornerCoordinates, board, color);
}

function countWorstField(board, color) {
    return countFields(worstFieldsCoordinates, board, color);
}

function countEdgeFields(board, color) {
    return countFields(edgeFieldsCoordinates, board, color);
}

function countFieldsCloseToTheEdge(board, color) {
    return countFields(fieldsCloseToEdgeCoordinates, board, color);
}

function evaluteByPossibleMoves(board) {
    var aiPossibleMoves = countPossibleAIMoves(board);
    var humanPossibleMoves = countPossibleHumanMoves(board);
    if (aiPossibleMoves !== humanPossibleMoves) {
        return POSSIBLE_MOVE * (aiPossibleMoves - humanPossibleMoves) / (aiPossibleMoves + humanPossibleMoves);
    }
    return 0;
}

function evaluateByCorners(board) {
    var aiCorners = countCorners(board, aiColor);
    var humanCorners = countCorners(board, humanPlayerColor);
    if (aiCorners !== humanCorners) {
        return CORNERS * (aiCorners - humanCorners) / (aiCorners + humanCorners);
    }
    return 0;
}

function evaluateByEdgeFields(board) {
    var aiCorners = countEdgeFields(board, aiColor);
    var humanCorners = countEdgeFields(board, humanPlayerColor);
    if (aiCorners !== humanCorners) {
        return EDGE_FIELDS * (aiCorners - humanCorners) / (aiCorners + humanCorners);
    }
    return 0;
}

function evaluateByWorstFields(board) {
    var result = 0;
    var aiNearbyCorner = countFieldsNearbyCorner(board, aiColor);
    var humanNearbyCorner = countFieldsNearbyCorner(board, humanPlayerColor);
    if (aiNearbyCorner !== humanNearbyCorner)
        result = NEARBY_CORNER * (aiNearbyCorner - humanNearbyCorner) / (aiNearbyCorner + humanNearbyCorner);

    var aiWorstFields = countWorstField(board, aiColor);
    var humanWorstFields = countWorstField(board, humanPlayerColor);
    if (aiWorstFields !== humanWorstFields) 
        result = WORST_FIELD * (aiWorstFields - humanWorstFields) / (aiWorstFields + humanWorstFields);

    var aiCloserEdgeFields = countFieldsCloseToTheEdge(board, aiColor);
    var humanCloserEdgeFields = countFieldsCloseToTheEdge(board, humanPlayerColor);
    if (aiCloserEdgeFields !== humanCloserEdgeFields)
        result = CLOSER_EDGE * (aiCloserEdgeFields - humanCloserEdgeFields) / (aiCloserEdgeFields + humanCloserEdgeFields);

    return result;
}