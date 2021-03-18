var board = [];
var turn = 1;
var gameID = -1;

async function getTurn(){
    //TODO
    // GET /turn
    //Call API to get turn for current gameID
    const request ={"id": gameID};
    const response = await fetch("/turn",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)

    });
    const asJson = await response.json();
    turn = asJson;
}


async function getBoard(){
    //TODO
    // Post /board
    //Call API to get board state for current gameID
    const request ={"id": gameID};
    const response = await fetch("/board",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)

    });
    const asJson = await response.json();
    board = asJson;

}

async function getGameID(){
    //TODO
    // GET /id
    //Call API to get random gameID
    const response = await fetch("/id",
    {
        method: 'GET',
    });
    const asJson = await response.json();
    gameID = await asJson.id;
    // console.log("What's this",gameID);
    document.getElementById("gameID").innerHTML = gameID;
    getTurn();
    getBoard();

    // return await asJson;
}


window.onload = function(){
    console.log("Loading complete :)");
    getGameID();
}

function insertAt(id) {
    console.log("Game ID onload",gameID);
    let column = Number(id.charAt(1));
    let i = -1;
    for (i = 0; i < board.length; i++) {
        if (board[i][column] != 0) {
            break;
        }
    }
    i--;
    if (i != -1) {
        board[i][column] = turn;
        turn *= -1;
        changeColor(i + "" + column, turn);
        var checkwin = checkWinState(board);
        if (checkwin == 1) {
            console.log("Yellow Win!");
            document.getElementById("winner").innerHTML = "Yellow Win!";
        }

        if (checkwin == -1) {
            console.log("Red Win!");
            document.getElementById("winner").innerHTML = "Red Win!";
        }

    } else {
        console.log("Invalid, column is full");
    }
}
function changeColor(id, whichTurn) {
    if (whichTurn == 1) {
        document.getElementById(id).style.backgroundColor = "red";
    }
    if (whichTurn == -1) {
        document.getElementById(id).style.backgroundColor = "yellow";
    }
}
function checkWinState(data)
{
    var nrow = data.length;
    var ncol = data[0].length;
    var checksum = 0;
    //check row
    for(var i = 0 ; i < nrow ; i++)
    {        
        for(var j = 3; j < ncol ; j++)
        {
            checksum = 0;
            for(var k = 0 ; k < 4 ;k++)
                checksum += data[i][j-k];
            if(checksum == 4)
                return 1;
            if(checksum == -4)
                return -1;
        }
    }

    //check column
    for(var i = 0 ; i < ncol ; i++)
    {        
        for(var j = 3; j < nrow ; j++)
        {
            checksum = 0;
            for(var k = 0 ; k < 4 ;k++)
                checksum += data[j-k][i];
            if(checksum == 4)
                return 1;
            if(checksum == -4)
                return -1;
        }
    }
    //check right top -> bottom left
    for(var i = 0 ; i < ncol -3  ; i++)
    {        
        for(var j = 3; j < nrow ; j++)
        {
            checksum = 0;
            for(var k = 0 ; k < 4 ;k++)
                checksum += data[j-k][i+k];
            if(checksum == 4)
                return 1;
            if(checksum == -4)
                return -1;
        }
    }
    //check left top ->  right bottom
    for(var i = 3 ; i < nrow ; i++)
    {
        for(var j = 3 ; j < ncol ; j++)
        {
            checksum = 0;
            for(var k = 0 ; k < 4 ; k++)
            {
                checksum += data[i-k][j-k];
            }
            if(checksum == 4)
                return 1;
            if(checksum == -4)
                return -1;
        }
    }

    return 0;

}

function clearBoard() {
    console.log("clearin...");
    turn = 1;
    document.getElementById("myModal").style.display = "none";
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            document.getElementById("" + i + "" + j).style.backgroundColor = "white";
            board[i][j] = 0;
        }
    }
}

function drawBoard(){
    //Go through each chip and set its color
    
    //if 0 then white
    //if 1 then red
    // if -1 then yellow
    // [row][column] ex row 1 column 3 = 13
    for(let i = 0; i < 6; i++){
        for(let i = 0; i < 6; i++){
            if(board[i][j] == 0){
                document.getElementById(i+""+j).style.backgroundColor = "white";
            } else if(board[i][j] == 1){
                document.getElementById(i+""+j).style.backgroundColor = "red";
            } else if(board[i][j] == -1){
                document.getElementById(i+""+j).style.backgroundColor = "yellow";
            }
        }
    }

    
}