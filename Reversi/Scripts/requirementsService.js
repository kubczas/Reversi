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

function getAvailableFields(currentBoard, currentColor) {
    availableFields = [];
    var index = 0;
    for (var r = 0; r < 8; r++) {
        for (var c = 0; c < 8; c++) {
            if (isAvailableField(r, c, currentBoard, currentColor)) {
                availableFields[index] = {
                    row: r,
                    column: c
                }
                index++;
            }
        }
    }
    return availableFields;
}

function isAvailableField(row, column, currentBoard, currentColor) {
    for (var i = 0; i < 8; i++)
        if (isPieceFullifulRequirement(directionCoordinates[i].coordinates.x, directionCoordinates[i].coordinates.y, row, column, currentBoard, currentColor))
            return true;
    return false;
}

function isOtherPiecesColorPlaced(row, column, currentBoard, currentColor) {
    if (isPieceInsideBoard(row, column)) {
        if (currentColor === TURNS.WHITE)
            return currentBoard[row][column] === TURNS.BLACK;
        if (currentColor === TURNS.BLACK)
            return currentBoard[row][column] === TURNS.WHITE;
    }
    return false;
}

function isCurrentPieceColorPlaced(row, column, currentBoard, currentColor) {
    return currentColor === currentBoard[row][column];
}

function isPieceFullifulRequirement(directionX, directionY, row, column, currentBoard, currentColor) {
    var isOtherPiecePlaced = false;
    var currentX = (Number(column) + Number(directionX));
    var currentY = (Number(row) + Number(directionY));

    while (isOtherPiecesColorPlaced(currentY, currentX, currentBoard, currentColor)) {
        isOtherPiecePlaced = true;
        currentX = (Number(currentX) + Number(directionX));
        currentY = (Number(currentY) + Number(directionY));
    }

    if (isPieceInsideBoard(currentY, currentX) && isOtherPiecePlaced) {
        return isCurrentPieceColorPlaced(currentY, currentX, currentBoard, currentColor);
    }
    return false;
}

function isPieceInsideBoard(row, column) {
    return column < 8 && column >= 0 && row < 8 && row >= 0;
}