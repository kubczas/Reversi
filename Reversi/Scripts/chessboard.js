var helpBoard = new Array(8);
var uiBoard = {}
ChessBoard = function (boardId, config) {
    var boardWidthFix;
    var squareSize;
    var options = {
        resize: true,
        minSquareSize: 20,
        maxSquareSize: 64
    };
    for (var key in config) {
        if (config.hasOwnProperty(key)) {
            options[key] = config[key];
        }
    }

    function initBoard() {
        if (options.resize) {
            window.addEventListener('resize', calculateBoardSize);
        }
        createBoard();
    }

    function createBoard() {
        var boardElement = document.getElementById(boardId);
        boardElement.classList.add('chessboard');
        uiBoard.element = boardElement;
        calculateSquareSize();
        for (var r = 7; r >= 0; r--) {
            var rowElement = document.createElement('div');

            uiBoard[r] = {
                element: rowElement
            };

            helpBoard[r] = new Array(8);

            for (var c = 0; c < 8; c++) {
                var squareElement = document.createElement('div');
                squareElement.style.width = squareSize;
                squareElement.style.height = squareSize;
                squareElement.className = 'green square';
                if (options.onSquareClick) {
                    squareElement.addEventListener('click', onSquareClick);
                }
                if (options.onSquareFocus) {
                    squareElement.addEventListener('mouseover', onSquareFocus);
                }
                if (options.onSquareFocusLost) {
                    squareElement.addEventListener('mouseleave', onSquareFocusLost);
                }
                squareElement.setAttribute('data-square-row', r);
                squareElement.setAttribute('data-square-column', c);
                uiBoard[r][c] = {
                    element: squareElement
                };
                helpBoard[r][c] = null;
                setStartedPieces(squareElement, r, c);
                rowElement.appendChild(squareElement);
            }

            boardElement.appendChild(rowElement);
        }
        calculateBoardSize();
    }

    function calculateSquareSize() {
        var boardStyle = getComputedStyle(uiBoard.element);
        var boardBorderWidth = parseInt(boardStyle.borderTopWidth);

        if (boardStyle.boxSizing === 'border-box') {
            boardWidthFix = 2 * boardBorderWidth;
        } else {
            boardWidthFix = 0;
        }

        var parentStyle = getComputedStyle(uiBoard.element.parentNode);
        var parentWidth = parseInt(parentStyle.width) - parseInt(parentStyle.paddingLeft)
            - parseInt(parentStyle.paddingRight);

        squareSize = Math.floor((parentWidth - 2 * boardBorderWidth) / 8);
        squareSize = Math.min(squareSize, options.maxSquareSize);
        squareSize = Math.max(squareSize, options.minSquareSize);
    }

    function calculateBoardSize() {
        var squareSizePx = squareSize + 'px';
        var rowWidthPx = (8 * squareSize) + 'px';
        var backgroundSizePx = (6 * squareSize) + 'px';

        uiBoard.element.style.width = (8 * squareSize) + boardWidthFix + 'px';

        for (var r = 0; r < 8; r++) {
            uiBoard[r].element.style.width = rowWidthPx;
            uiBoard[r].element.style.height = squareSizePx;

            for (var c = 0; c < 8; c++) {
                uiBoard[r][c].element.style.width = squareSizePx;
                uiBoard[r][c].element.style.height = squareSizePx;
                uiBoard[r][c].element.style.backgroundSize = backgroundSizePx;
            }
        }
    }

    function setStartedPieces(squareElement, row, column) {
        if ((row === 4 && column === 3) || (row === 3 && column === 4)) {
            var whitePiece = document.createElement('div');
            whitePiece.className = 'white piece';
            setSquareElementSize(whitePiece);
            squareElement.classList.add('whiteplaced');
            squareElement.appendChild(whitePiece);
            helpBoard[row][column] = TURNS.WHITE;
        } else if ((row === 4 && column === 4) || (row === 3 && column === 3)) {
            var blackPiece = document.createElement('div');
            setSquareElementSize(blackPiece);
            blackPiece.className = 'black piece';
            squareElement.classList.add('blackplaced');
            squareElement.appendChild(blackPiece);
            helpBoard[row][column] = TURNS.BLACK;
        }
    }

    function setSquareElementSize(element) {
        element.style.width = squareSize + 'px';
        element.style.height = squareSize + 'px';
    }

    function getBoardSquare(row, column) {
        return uiBoard[row][column];
    }

    function onSquareClick(event) {
        var clickedSquareRow = event.target.getAttribute('data-square-row');
        var clickedSquareColumn = event.target.getAttribute('data-square-column');
        var clickedSquare = getBoardSquare(clickedSquareRow, clickedSquareColumn).element;
        options.onSquareClick(clickedSquare, clickedSquareRow, clickedSquareColumn, uiBoard, squareSize);
    }

    function onSquareFocus(event) {
        var focusedSquareRow = event.target.getAttribute('data-square-row');
        var focusedSquareColumn = event.target.getAttribute('data-square-column');
        var focusedSquare = getBoardSquare(focusedSquareRow, focusedSquareColumn).element;
        if (!focusedSquare.classList.contains('placed')) {
            options.onSquareFocus(focusedSquare, focusedSquareRow, focusedSquareColumn, uiBoard);
        }
    }
    
    function onSquareFocusLost(event) {
        options.onSquareFocusLost();
    }

    initBoard();
}