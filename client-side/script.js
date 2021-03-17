var board = [];
var turn = 1;
var gameID = -1;

async function getTurn(){
    //TODO
    // GET /turn
    //Call API to get turn for current gameID
    console.log("Game ID:",gameID);
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
    window.turn = asJson;
    console.log(turn);
    return turn;
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
    // gameID = await asJson.id;
    // console.log("What's this",gameID);

    return await asJson;
}

async function getBoard(){
    //TODO
    // Post /board
    //Call API to get board state for current gameID
    const request ={"id": window.gameID};
    const response = await fetch("/board",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)

    });
    const asJson = await response.json();
    window.board = asJson;
    console.log(board);

    return board;

}

window.onload = function(){
    console.log("Loading complete :)");
    console.log(getGameID());
    console.log("Game ID onload",gameID);
    // turn = getTurn();
    // board = getBoard();

    //show game id on page 
    document.getElementById("gameID").innerHTML = gameID;
    testStuff();
}

function insertAt(id) {
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
            //alert("Yellow Win!");
            //window.open("modeless.htm","Yellow Win","width = 300,height = 200,alwaysRaised = yes");
            document.getElementById("winner").innerHTML = "Yellow Win!";
            // document.getElementById("myModal").style.display = "block";
        }

        if (checkwin == -1) {
            console.log("Red Win!");
            document.getElementById("winner").innerHTML = "Red Win!";
            // document.getElementById("myModal").style.display = "block";
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

async function testStuff(){
    const response = await fetch("https://api.wheretheiss.at/v1/satellites");
    const asJSON = await response.json();
    console.log(asJSON);
}
