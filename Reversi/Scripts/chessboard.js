var board = {};
var boardWidthFix;
var squareSize;
var options = {
    resize: true,
    minSquareSize: 20,
    maxSquareSize: 64
};

function initBoard() {
    if (options.resize) {
        window.addEventListener('resize', calculateBoardSize);
    }
    createBoard();
}

function createBoard() {
    var boardElement = document.getElementById('board');
    boardElement.classList.add('chessboard');
    board.element = boardElement;
    for (var r = 8; r >= 1; r--) {
        var rowElement = document.createElement('div');

        board[r] = {
            element: rowElement
        };

        for (var c = 0; c < 8; c++) {
            var squareElement = document.createElement('div');
            squareElement.style.width = squareSize;
            squareElement.style.height = squareSize;
            squareElement.className = 'green square';

            board[r][c] = {
                element: squareElement,
                piece: null
            };

            rowElement.appendChild(squareElement);
        }

        boardElement.appendChild(rowElement);
    }
    calculateBoardSize();
}

function calculateSquareSize() {
    var boardStyle = getComputedStyle(board.element);
    var boardBorderWidth = parseInt(boardStyle.borderTopWidth);


    if (boardStyle.boxSizing === 'border-box') {
        boardWidthFix = 2 * boardBorderWidth;
    } else {
        boardWidthFix = 0;
    }

    var parentStyle = getComputedStyle(board.element.parentNode);
    var parentWidth = parseInt(parentStyle.width) - parseInt(parentStyle.paddingLeft)
                                                  - parseInt(parentStyle.paddingRight);

    squareSize = Math.floor((parentWidth - 2 * boardBorderWidth) / 8);
    squareSize = Math.min(squareSize, options.maxSquareSize);
    squareSize = Math.max(squareSize, options.minSquareSize);
}

function calculateBoardSize() {
    calculateSquareSize();

    var squareSizePx = squareSize + 'px';
    var rowWidthPx = (8 * squareSize) + 'px';
    var backgroundSizePx = (6 * squareSize) + 'px';

    board.element.style.width = (8 * squareSize) + boardWidthFix + 'px';

    for (var r = 8; r >= 1; r--) {
        board[r].element.style.width = rowWidthPx;
        board[r].element.style.height = squareSizePx;

        for (var c = 0; c < 8; c++) {
            board[r][c].element.style.width = squareSizePx;
            board[r][c].element.style.height = squareSizePx;
            board[r][c].element.style.backgroundSize = backgroundSizePx;
        }
    }
}