var makeDiv = function(text){
    var div = document.createElement('div');
    div.classList.add('popper-div');
    div.innerHTML = text;
    document.body.appendChild( div );

    return div;
};

function createTCItem(){
    let nowElem = document.createElement("div");
    nowElem.className = "tCItem";
    return nowElem;
}