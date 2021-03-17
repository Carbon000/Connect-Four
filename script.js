var board = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];
turn = 1;
gameID = -1;
function getTurn(){
    //TODO
    //Call API to get turn for current gameID

    return turn;
}

function getGameID(){
    //TODO
    //Call API to get random gameID

    return gameID;
}

function getBoard(){
    //TODO
    //Call API to get board state for current gameID

    return board;
}

window.onload = function(){
    console.log("Loading complete :)");
    gameID = getGameID();
    turn = getTurn();
    board = getBoard();

    //show game id on page 
    document.getElementById("gameID").innerHTML = gameID;
    testStuff();
}

function insertAt(id){
    let column = Number(id.charAt(1));
    let i = -1;
    for(i = 0; i < board.length; i++){
        if(board[i][column] != 0){
            break;
        }
    }
    i--;
    if(i != -1){
        board[i][column] = turn;
        turn *= -1;
        changeColor(i+""+column, turn);
        console.log(checkWinState(board));
    } else {
        console.log("Invalid, column is full");
    }
}

function changeColor(id, whichTurn){
    if(whichTurn == 1){
        document.getElementById(id).style.backgroundColor = "red";
    }
    if(whichTurn == -1){
        document.getElementById(id).style.backgroundColor = "yellow";
    }
}

function checkWinState(data){
    function topLeftBottomRight(i,j){
        if(i-1< 0 || i+1 > data.length-1 || j-1 < 0 || j+1 > data[0].length){
            return false;
        }
        if(data[i][j] == 0){
            return false;
        }
        sum = (data[i][j] + data[i-1][j-1] + data[i+1][j+1]) ;
        return sum == 3 || sum == -3;
    }


    function bottomRightTopLeft(i,j){
        if(i-1< 0 || i+1 > data.length-1 || j-1 < 0 || j+1 > data[0].length){
            return false;
        }
        sum = (data[i][j] + data[i+1][j-1] + data[i-1][j+1]);
        return sum == 3 || sum == -3;
    }

    
    function leftRight(i,j){
        if(j-1 < 0 || j+1 > data[0].length){
            return false;
        }
        sum = (data[i][j] + data[i][j-1] + data[i][j+1]);
        return sum == 3 || sum == -3;
    }

    
    function topBottom(i,j){
        if(i-1< 0 || i+1 > data.length-1){
            return false;
        }
        sum = (data[i][j] + data[i-1][j] + data[i+1][j]);
        return sum == 3 || sum == -3;
    }

    
    function checkPlace(i,j){
        if(data[i][j] == 0){
            return false;
        }
    win = topLeftBottomRight(i,j) == topLeftBottomRight(i-1,j-1) == topLeftBottomRight(i+1,j+1) ||
            bottomRightTopLeft(i,j) == bottomRightTopLeft(i+1,j-1) == bottomRightTopLeft(i-1,j+1) ||
            leftRight(i,j) == leftRight(i,j-1) == leftRight(i,j+1) ||
            topBottom(i,j) == topBottom(i-1,j) == topBottom(i+1,j);
    return win;
    }

    for (let i = 0; i < board.length; i++) {
       for (let j = 0; j < board[i].length; j++) {
          if(checkPlace(i,j)) {
              console.log(i,j,board[i][j]);
              return true;
          }
       } 
    }
    return false;
}

function clearBoard(){
    console.log("clearin...");
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            document.getElementById(""+i+""+j).style.backgroundColor = "white";
            board[i][j] = 0;
        }
    }
}

async function testStuff(){
    const response = await fetch("https://api.wheretheiss.at/v1/satellites");
    const asJSON = await response.json();
    console.log(asJSON);
}