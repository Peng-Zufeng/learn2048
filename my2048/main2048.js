var board = new Array();
var score = 0;
var hasConflicted = new Array();

//var img2 = document.createElement("img");
//img2.src = "D:\网课\web设计\Web前端\my2048\photos\萌新.jpg";




$(document).ready(function () {
    newgame();
});

function newgame() {
    init();
    score = 0;
    updateScore(score);
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + '-' + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateBoardView();
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j+'"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            }
            else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j) );
                theNumberCell.css('left', getPosLeft(i, j));
                
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(getNumberText(board[i][j]));
            }
            hasConflicted[i][j] = false;
        }
}

function generateOneNumber() {
    if (nospace(board))
        return false;
    //随机位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0)
            break;
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        
    }

    if (times == 50) {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++){
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
                    
            }
    }
    //随机数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //随机位置上显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:
            if (moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38:
            if (moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39:
            if (moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40: 
            if (moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default:
            break;
                
    }
}
);

function isGameOver() {
    if(nospace(board)&&nomove(board))
    gameover();
}

function gameover() {
    alert('game over!');
}

function moveLeft() {
    if (!canMoveLeft(board))
        return false;
    //move left
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++){
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++){
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)&&!hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] *= 2;
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board))
        return false;
    //move right
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >=0; j--){
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--){
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][j] == board[i][k] && noBlockHorizontal(i, j, k, board)&&!hasConflicted[i][k]) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k] *= 2;
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board))
        return false;
    //move up
    for (var j = 0; j < 4; j++)
        for (var i = 1; i<4; i++){
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++){
                    if (board[k][j] == 0 && noBlockVertical(j,k,i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][j] == board[k][j] && noBlockVertical(j,k,i, board)&&!hasConflicted[k][j]) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] *= 2;
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board))
        return false;
    //move down
    for (var j = 0; j < 4; j++)
        for (var i = 2; i>=0; i--){
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--){
                    if (board[k][j] == 0 && noBlockVertical(j,i,k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][j] == board[k][j] && noBlockVertical(j,i,k, board)&&!hasConflicted[k][j]) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] *= 2;
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}