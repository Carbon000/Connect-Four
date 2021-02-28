var board = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];
turn = 1;
function sayHi(id){
    document.getElementById(id).style.backgroundColor = "red";
    console.log(id.className);
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