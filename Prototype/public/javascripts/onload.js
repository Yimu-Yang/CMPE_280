window.onload = init;
var i = 1;

function init() {
    // dropdown menu init
    var allLinks = document.getElementsByTagName("a");
    for (var i = 0; i < allLinks.length; i++) {
        if (allLinks[i].className == "menuLink") {
            allLinks[i].onmouseover = toggleMenu;
            allLinks[i].onclick = clickHandler;
        }
    }
    // image animation init
    window.setInterval("changeImg()", 1200);
}
var i = 1;
function changeImg(){

    i++;
    if(i > 3){
        i=1;
    }
    var img1 = document.getElementById("changeImg");
    img1.src="/img/"+i+".jpg";
}



function changeImg() {
    i++;
    if (i > 3) {
        i = 1;
    }
    var img = document.getElementById("changeImg");
    img.src = "/img/" + i + ".jpg";
}

function clickHandler(event) {
    event.preventDefault();
}

function toggleMenu() {
    var startMenu = this.href.lastIndexOf("/") + 1;
    var stopMenu = this.href.lastIndexOf(".");
    var thisMenuName = this.href.substring(startMenu, stopMenu);
    var menuParent = document.getElementById(thisMenuName).parentNode;
    var thisMenuStyle = document.getElementById(thisMenuName).style;

    thisMenuStyle.display = "block";

    menuParent.onmouseout = function() {
        thisMenuStyle.display = "none";
    };

    menuParent.onmouseover = function() {
        thisMenuStyle.display = "block";
    };
}