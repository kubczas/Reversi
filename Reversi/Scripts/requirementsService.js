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

var availableFields;

function getAvailableFields() {
    availableFields = [];
    var index = 0;
    for (var r = 8; r >= 1; r--) {
        for (var c = 0; c < 8; c++) {
            if (isAvailableField(r, c)) {
                availableFields[index] = new {
                    row: r,
                    column: c
                }
            }
        }
    }
    return availableFields;
}

function isAvailableField(row, column) {
    for (var i = 0; i < 8; i++)
        if (isPieceFullifulRequirement(directionCoordinates[i].coordinates.x, directionCoordinates[i].coordinates.y, row, column))
            return true;
    return false;
}

function isOtherPiecesColorPlaced(row, column) {
    if (isPieceInsideBoard(row, column)) {
        if (currentTurn === TURNS.WHITE)
            return currentStatusBoard[row][column] === TURNS.BLACK;
        if (currentTurn === TURNS.BLACK)
            return currentStatusBoard[row][column] === TURNS.WHITE;
    }
    return false;
}

function isCurrentPieceColorPlaced(row, column) {
    return currentTurn === currentStatusBoard[row][column];
}

function isPieceFullifulRequirement(directionX, directionY, row, column) {
    var isOtherPiecePlaced = false;
    var currentX = (Number(column) + Number(directionX));
    var currentY = (Number(row) + Number(directionY));

    while (isOtherPiecesColorPlaced(currentY, currentX)) {
        isOtherPiecePlaced = true;
        currentX = (Number(currentX) + Number(directionX));
        currentY = (Number(currentY) + Number(directionY));
    }

    if (isPieceInsideBoard(currentY, currentX) && isOtherPiecePlaced) {
        return isCurrentPieceColorPlaced(currentY, currentX);
    }
    return false;
}

function isPieceInsideBoard(row, column) {
    return column < 8 && column >= 0 && row < 8 && row >= 0;
}