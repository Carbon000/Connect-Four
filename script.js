board = {rows:[[0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]]};

function display(){
    let board = document.getElementById('board');
    let tmp = makeElement('p','test');
    board.append(tmp);
}

function makeElement(type, text){
    let elem = document.createElement(type);
    let theText = document.createTextNode(text);
    elem.appendChild(theText);
    return elem;
}