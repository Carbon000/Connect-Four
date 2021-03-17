const express = require('express');
const app = express();
app.use(express.static("client-side"));
app.use(express.json());
app.listen(3000,()=> {console.log("Running....")} );

app.post("/test", function(reqst, respns){
    console.log(reqst.body);
    respns.json("All good!");
});

app.get("/path", function(reqst, respons){

});