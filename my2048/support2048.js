function getPosTop(i, j) {
    return 20 + 120 * i;
}

function getPosLeft(i, j) {
    return 20 + 120 * j;
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
        case 4096: return "#a6c"; break;
        case 8192: return "#93c"; break;
    }
    return "balck";
}

function getNumberColor(number) {
    if (number <= 4)
        return "#776e65";
    return "white";
}

function getNumberText( number ){
    switch( number ){
        case 2:return "萌新";break;
        //case 2: return img2; break;
        case 4:return "双马尾";break;
        case 8:return "小狮子";break;
        case 16:return "小飞象";break;
        case 32:return "雨妈";break;
        case 64:return "龙骨";break;
        case 128:return "卡卡";break;
        case 256:return "平菇";break;
        case 512:return "羽毛球";break;
        case 1024:return "南瓜头";break;
        case 2048:return "绊爱";break;
        case 4096:return "白鸟";break;
        case 8192:return "林克";break;
    }

    return "black";
}


function nospace(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] == 0)
                return false;
    return true;
}

function nomove(board) {
    if (canMoveLeft(board) || canMoveRight(board)
        || canMoveUp(board) || canMoveDown(board))
        return false;
    return true;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++)
            if (board[i][j] !=0) 
                if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1])
                    return true;
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >=0; j--)
            if (board[i][j] != 0) 
                if (board[i][j +1] == 0 || board[i][j] == board[i][j + 1])
                    return true;
    return false;
}

function canMoveUp(board) {
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++)
            if (board[i][j] != 0)
                if (board[i-1][j] == 0 || board[i][j] == board[i-1][j])
                    return true;
    return false;
}

function canMoveDown(board) {
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >=0; i--)
            if (board[i][j] != 0)
                if (board[i+1][j] == 0 || board[i][j] == board[i+1][j])
                    return true;
    return false;
}

function noBlockHorizontal(row,col1,col2, board) {
    for (var i = col1 + 1; i < col2; i++)
        if (board[row][i] != 0)
            return false;
    return true;
}

function noBlockVertical(col, row1, row2, board) {
    for (var j = row1 + 1; j < row2; j++)
        if (board[j][col] != 0)
            return false;
    return true;
}