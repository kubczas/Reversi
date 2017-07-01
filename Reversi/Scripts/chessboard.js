window.ChessBoard = function (boardId, config) {
    var board = {};
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

    function calcSquareColumn(column) {
        return String.fromCharCode(97 + column);
    }

    function createBoard() {
        var boardElement = document.getElementById(boardId);
        boardElement.classList.add('chessboard');
        board.element = boardElement;
        calculateSquareSize();
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
                squareElement.setAttribute('data-square-column', calcSquareColumn(c));
                board[r][c] = {
                    element: squareElement
                };
                setStartedPieces(squareElement, r, c);
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

    function setStartedPieces(squareElement, row, column) {
        if ((row === 5 && column === 3) || (row === 4 && column === 4)) {
            var whitePiece = document.createElement('div');
            whitePiece.className = 'white piece';
            setSquareElementSize(whitePiece);
            squareElement.classList.add('whiteplaced');
            squareElement.appendChild(whitePiece);
        } else if ((row === 5 && column === 4) || (row === 4 && column === 3)) {
            var blackPiece = document.createElement('div');
            setSquareElementSize(blackPiece);
            blackPiece.className = 'black piece';
            squareElement.classList.add('blackplaced');
            squareElement.appendChild(blackPiece);
        }
    }

    function setSquareElementSize(element) {
        element.style.width = squareSize + 'px';
        element.style.height = squareSize + 'px';
    }

    function getBoardSquare(row, column) {
        var c = column.charCodeAt(0) - 97;
        return board[row][c];
    }

    function onSquareClick(event) {
        var clickedSquareRow = event.target.getAttribute('data-square-row');
        var clickedSquareColumn = event.target.getAttribute('data-square-column');
        var clickedSquare = getBoardSquare(clickedSquareRow, clickedSquareColumn).element;
        options.onSquareClick(clickedSquare, clickedSquareRow, clickedSquareColumn, board, squareSize);
    }

    function onSquareFocus(event) {
        var focusedSquareRow = event.target.getAttribute('data-square-row');
        var focusedSquareColumn = event.target.getAttribute('data-square-column');
        var focusedSquare = getBoardSquare(focusedSquareRow, focusedSquareColumn).element;
        if (!focusedSquare.classList.contains('placed')) {
            options.onSquareFocus(focusedSquare, focusedSquareRow, focusedSquareColumn, board);
        }
    }
    
    function onSquareFocusLost(event) {
        options.onSquareFocusLost();
    }

    initBoard();
}