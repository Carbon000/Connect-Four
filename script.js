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
    var checkwin = checkWinState(board);
    if(checkwin == 1)
    {
        console.log("Yellow Win!");
        //alert("Yellow Win!");
        //window.open("modeless.htm","Yellow Win","width = 300,height = 200,alwaysRaised = yes");
        document.getElementById("modtext").innerHTML = "Yellow Win!";
        document.getElementById("myModal").style.display = "block";
    }
        
    if(checkwin == -1)
    {
        console.log("Red Win!");
        document.getElementById("modtext").innerHTML = "Red Win!";
        document.getElementById("myModal").style.display = "block";
    }
        
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
function checkWinState1(data){
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
turn = 1;
document.getElementById("myModal").style.display = "none";
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
        document.getElementById(""+i+""+j).style.backgroundColor = "white";
        board[i][j] = 0;
    }
}
}


