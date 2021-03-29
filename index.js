const express = require('express');
const app = express();
app.use(express.static("client-side"));
app.use(express.json());
const PORT = process.env.PORT || 3000
app.listen(PORT,()=> {console.log("Running....")} );



function giveBoard(){
    var board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    return board;
}

const MAX_SIZE = 100000000;
database  = {
};

function makeGameSession(){
    let seed = Math.ceil(Math.random()*MAX_SIZE);
    if(database[seed] == undefined){
       database[seed] = {'id': seed, 'board': giveBoard(), 'turn': 1,'win':0,'current_row':-1};
    } else if(database.length < MAX_SIZE){
        makeGameSession();
    }
}
///////////////////////////////////////////////////////
app.post("/turn", function(request, response){
    let index = request.body.id;
    console.log("Turn");
    console.log(database);
    console.log(index);
    response.json(database[index].turn);
    response.status(200);

});

app.get("/id", function(request, response){
    makeGameSession();
    let place = Math.floor(Math.random() * Object.keys(database).length);
    let index = Object.keys(database)[place];
    response.json({"id": index});
    response.status(200);

});

app.post("/board", function(request, response){
    let index = request.body.id;
    console.log("Board");
    console.log(database);
    console.log(index);
    
    response.json(database[index].board);
    response.status(200);
});

app.post("/clear", function(request, response){
    let index = request.body.id;
    console.log("Board");
    console.log(database);
    console.log(index);
    database[index].board = giveBoard();
    response.json(database[index].board);
    response.status(200);
});

app.post("/placechip", function(request, response){
    let index = request.body.id;
    let column1 = request.body.column;
    let currentdata = database[index];
    
    if(currentdata.win != 0)
    {
        
        response.json({"error":"game over"});
        response.status(202);
    }
    else
    {    
        let nextturn = currentdata.turn *(-1) ;    
        
        let column = Number(column1.charAt(1));
        let i = -1;
        for (i = 0; i < currentdata.board.length; i++) {
            if (currentdata.board[i][column] != 0) {
                break;
            }
        }
        
        i--;
        if (i != -1) {
            currentdata.board[i][column] = nextturn;

            
            
            currentdata.win = checkWinState(currentdata.board);
            

        } else {
            console.log("Invalid, column is full");
        }
        
        currentdata.turn = nextturn;
        response.json(currentdata);
        response.status(200);
        
        database[index] =  currentdata;
        
    }
        
    
    
    

});

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
/*
IDs     boards      turn    used
sequilize
*/