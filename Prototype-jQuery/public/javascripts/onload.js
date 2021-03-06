$(initAll);

var imageNum = 1;
var drawPosition = 0;
var l2r = true;

function initAll() {
    // set theme
    $(":header").addClass("ui-widget-header");

    // ajax html template
    $("#footerDiv").load("/html/footer.html");

    // dropdown menu init
    dropDownMenu();

    // rolling image animation init
    window.setInterval("changeImg()", 1200);

    // canvas init and canvas animation init
    drawSmilingFace();
    window.setInterval(drawWelcome, 50);

    // build resizable and draggable searching form
    $("#searchForm").resizable();
    $("#searchForm").draggable();

    // build draggable and droppable object
    $("#draggableObject1").draggable();
    $("#draggableObject2").draggable();
    $("#droppbleObject").droppable();
    $("#droppbleObject").bind("drop", highlightTarget);
    $("#droppbleObject").bind("dropout", resetTarget);

    // build selectable and sortable login/register form
    $("#sortableTab").sortable();

    // build ajax login/register form
    $("#loginTab").tabs();

    // build dialog widget
    $("#dialog").dialog();
    $("#dialog").dialog("close");

    // $("#selectable").selectable();

    // build sortable user fav college list
    $("#sortable").sortable();
}

function dropDownMenu() {
    var allLinks = document.getElementsByTagName("a");
    for (var i = 0; i < allLinks.length; i++) {
        if (allLinks[i].className == "menuLink") {
            allLinks[i].onmouseover = toggleMenu;
            allLinks[i].onclick = clickHandler;
        }
    }
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

function changeImg() {
    imageNum++;
    if (imageNum > 3) {
        imageNum = 1;
    }
    var img = document.getElementById("rollingImage");
    img.src = "/img/" + imageNum + ".jpg";
}

function drawWelcome() {
    if (!document.getElementById('canvasWelcome')) {
        return;
    }
    var canvas = document.getElementById("canvasWelcome");
    var c = canvas.getContext("2d");
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.font = "25px Verdana";
    var gradient = c.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    c.fillStyle = gradient;
    if (drawPosition > canvas.width/2) {
        l2r = false;
    }else if(drawPosition == 0) {
        l2r = true;
    }
    if(l2r) {
        drawPosition++;
    }else {
        drawPosition--;
    }

    c.fillText('Welcome User!', drawPosition, 25);
}

function drawSmilingFace() {
    if (!document.getElementById('canvasSmilingFace')) {
        return;
    }
    var canvas = document.getElementById('canvasSmilingFace');
    var con = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 12;
    var eyeRadius = 2;
    var eyeXOffset = 4;
    var eyeYOffset = 3;

    // draw face circle
    con.beginPath();
    con.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    con.fillStyle = 'yellow';
    con.fill();
    con.lineWidth = 1;
    con.strokeStyle = 'black';
    con.stroke();

    var eyeY = centerY - eyeYOffset;
    // draw left eye
    con.beginPath();
    var eyeX1 = centerX - eyeXOffset;
    con.arc(eyeX1, eyeY, eyeRadius, 0, Math.PI, true);
    con.stroke();
    // draw right eye
    con.beginPath();
    var eyeX2 = centerX + eyeXOffset;
    con.arc(eyeX2, eyeY, eyeRadius, 0, Math.PI, true);
    con.stroke();
    // draw the mouth
    con.beginPath();
    con.arc(centerX, centerY * 1.15, 5.5, 0.1 * Math.PI, 0.9 * Math.PI, false);
    con.stroke();
}

function inputValidate() {
    var schoolName = document.getElementById("schoolName").value;
    var error = "";
    if (schoolName == "") {
        error = "Missing University Name\n";
        alert(error);
        return false;
    }
    var schoolNameRE = /^[a-zA-Z\s]+$/; // has to be letter or space
    if (!schoolName.match(schoolNameRE)) {
        error = "Invalid University Name\n";
        alert(error);
        return false;
    }
    return true;
}

function openDialog() {
    $("#dialog").dialog("open");
}

function closeDialog() {
    $("#dialog").dialog("close");
}

function highlightTarget(event, ui) {
    $("#droppbleObject").addClass("ui-state-highlight").html("Selected").append(ui.draggable.text());
}

function resetTarget(event, ui) {
    $("#droppbleObject").removeClass("ui-state-highlight").html("Select Gender");
}
