const express = require('express');
const app = express();
app.use(express.static("client-side"));
app.use(express.json());
app.listen(3000,()=> {console.log("Running....")} );



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
       database[seed] = {'id': seed, 'board': giveBoard(), 'turn': 1};
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

/*
IDs     boards      turn    used
sequilize
*/