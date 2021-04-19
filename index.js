const express = require('express');
const Datasore = require('nedb');
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

const database = new Datasore("games.db");
database.loadDatabase();
function makeGameSession(){
    let seed = Math.ceil(Math.random()*MAX_SIZE);
    let data = {
        _id: seed, 
        board: giveBoard(),
        turn: 1
    }
    
    database.insert(data, function(err, document){
        if(err){
            makeGameSession();
        }
    });
    return seed;
}

///////////////////////////////////////////////////////
app.post("/turn", function(request, response){
    let index = request.body.id;
    database.find({_id: index}, function(err, data){
        if(data.length != 0){
            response.json(data[0].turn);
            response.status(200);
        } else {
            response.json();
            response.status(404);
        }
    });
});

app.get("/id", function(request, response){
    let id = makeGameSession();
    response.json({"id": id});
    response.status(200);
});

app.post("/board", function(request, response){
    let index = request.body.id;
    database.find({_id: index}, function(err, data){
        if(data.length != 0){
            let output = {
                "board": data[0].board,
                "win": checkWinState(data[0].board)
            };
            response.json(output)
            response.status(200);
            // response.json(data[0].board);
            // response.status(200);
        } else {
            response.json();
            response.status(404);
        }
    });
});

app.post("/clear", function(request, response){
    let index = request.body.id;
    database.update({_id: index},{$set: {board: giveBoard()}},{upsert: true},function(err,num,upsrt){
    response.status(200);
    })
});

app.post("/placechip", function(request, response){
    let index = request.body.id;
    index = parseInt(index);
    let column = Number.parseInt(request.body.column);

    database.find({_id: index}, function (err, data){
        let gameboard = data[0].board
        for (let i = gameboard.length -1; i >= 0; i--) {
            if (gameboard[i][column] == 0){
                gameboard[i][column] = data[0].turn
                break;
            }
        }
        database.update({_id: index},{$set: {board: gameboard, turn: data[0].turn * -1}},{upsert: true},function(){})
        database.find({_id: index}, function(err, data){
            let output = {
                "board": data[0].board,
                "turn": data[0].turn,
                "win": checkWinState(data[0].board)
            };
            response.json(output)
            response.status(200);
        });
    })
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
IDs     boards    turn    used
sequilize
*/