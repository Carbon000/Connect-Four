var board = [];
var turn = 1;
var gameID = -1;
var bWin = 0;
var userTurn = 1;
var player1Color = "red";
var player2Color = "yellow";

async function getTurn(){
    //TODO
    // GET /turn
    //Call API to get turn for current gameID
    const request ={"id": parseInt(gameID)};
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
    const request ={"id": parseInt(gameID)};
    const response = await fetch("/board",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)

    });
    const asJson = await response.json();
    board = asJson.board;
    bWin = asJson.win;

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

async function inputchip(colnum){
    if(userTurn != turn || bWin != 0){
        return;
    }
    var audio = new Audio('click.mp3');
    audio.play();
    colnum = colnum[1];
    console.log(gameID,colnum);
    const request ={"id": parseInt(gameID),"column":colnum};
    const response = await fetch("/placechip",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)

    });
    const asJson = await response.json();
    if(response.status == 200)
    {
        board = asJson.board;
        turn = asJson.turn;
        bWin = asJson.win;
        setWinner();
        console.log(asJson);
        updateBoard(board);
    }
    else{
        console.log("Failed:" + response.status);
        console.log("error: " + asJson.error);
    }
    
}

function setWinner(){
    if (bWin == 1) {
        document.getElementById("winner").innerHTML = "Player1 Wins!";
    }

    if (bWin == -1) {
        document.getElementById("winner").innerHTML = "Player2 Wins!";
    }

    if (bWin == 0) {
        document.getElementById("winner").innerHTML = "";
    }
}

function showTurn(){
    document.getElementById("turn-value").innerHTML =" " + (turn == 1? "Player1": "Player2");
    document.getElementById("turn-value").style.color = (turn == 1? player1Color: player2Color);
}
function refresh(){
    getBoard();
    getTurn();
    updateBoard(board);
    setWinner();
    showTurn();
    player1Color = document.getElementById("player1-color").value;
    player2Color = document.getElementById("player2-color").value;
}
//Trying to get board to refresh over and over

window.onload = function(){
    console.log("Loading complete :)");
    getGameID();
    setInterval(refresh, 1000);
}


function updateBoard(board_) {
    
    for (i = 0; i < board_.length; i++) {
        for(var j = 0 ; j < board_[0].length ; j++)
        {   
            let whichTurn = board_[i][j];
            let id = i + "" + j;
            if (whichTurn == 1) {
                document.getElementById(id).style.backgroundColor = player1Color;
            }
            else if (whichTurn == -1) {
                document.getElementById(id).style.backgroundColor = player2Color;
            }
            else{
                document.getElementById(id).style.backgroundColor = "white";
            }
            
        }
        
    }
    
}


async function clearBoard(){
    //TODO
    // GET /id
    //Call API to get random gameID
    const request ={"id": parseInt(gameID)};
    const response = await fetch("/clear",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)

    });
    
    const asJson = await response.json();
    board = asJson;
    updateBoard(board);
    bWin = 0;
}


function inputID(){
    gameID = document.getElementById("id-input").value;
    document.getElementById("gameID").innerHTML = gameID;
    getBoard();
    userTurn = -1;
    document.getElementById("id-input").value = "";
}