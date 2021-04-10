var board = [];
var turn = 1;
var gameID = -1;
var bWin = 0;

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

async function inputchip(colnum){
    var audio = new Audio('click.mp3');
    audio.play();
    


    const request ={"id": gameID,"column":colnum};
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
        updateBoard(board);
        if (bWin == 1) {
            console.log("Yellow Win!");
            document.getElementById("winner").innerHTML = "Red Win!";
        }

        if (bWin == -1) {
            console.log("Red Win!");
            document.getElementById("winner").innerHTML = "Yellow Win!";
        }
    }
    else{
        console.log("Failed:" + response.status);
        console.log("error: " + asJson.error);
    }
    
}


window.onload = function(){
    console.log("Loading complete :)");
    getGameID();
}


function updateBoard(board_) {
    
    for (i = 0; i < board_.length; i++) {
        for(var j = 0 ; j < board_[0].length ; j++)
        {   
            let whichTurn = board_[i][j];
            let id = i + "" + j;
            if (whichTurn == 1) {
                document.getElementById(id).style.backgroundColor = "red";
            }
            else if (whichTurn == -1) {
                document.getElementById(id).style.backgroundColor = "yellow";
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

    const request ={"id": gameID};
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
    document.getElementById("winner").innerHTML = "";
    
    

    // return await asJson;
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

function inputID(){
    gameID = document.getElementById("id-input").value;
    document.getElementById("gameID").innerHTML = gameID;

}