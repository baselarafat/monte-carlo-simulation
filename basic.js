let screenW = window.innerWidth, screenH = window.innerHeight;
let canvasW, canvasH;
let frameRate = 24, isPaused = false;
let isMobile;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
} else {
    isMobile = false;
}

let canvasElem = document.getElementById("canvas");
let ctx = canvasElem.getContext("2d");

let totalPointsDisplay = document.getElementById("num-points");
let insideCircleDisplay = document.getElementById("num-inside");
let estimatedPiDisplay = document.getElementById("pi-estimate");
let togglePauseBtn = document.getElementById("pause-button");

canvasW = isMobile ? 0.9 * screenW : 0.4 * screenW;
canvasH = canvasW;

canvasElem.width = canvasW;
canvasElem.height = canvasH;

let animationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / frameRate);
    };

function renderFrame() {
    if (!isPaused) {
        simulate();
    }
    animationFrame(renderFrame);
}

window.onload = function() {
    initializeParams();
    animationFrame(renderFrame);
}

let clickPosX, clickPosY, isPressed;

if (isMobile) {
    canvasElem.addEventListener("touchstart", function (e) {
        getTouchCoords(canvasElem, e);
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvasElem.dispatchEvent(mouseEvent);
        isPressed = true;
        onClick();
    }, false);

    canvasElem.addEventListener("touchmove", function (e) {
        getTouchCoords(canvasElem, e);
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvasElem.dispatchEvent(mouseEvent);
        onMove();
    }, false);

    canvasElem.addEventListener("touchend", function (e) {
        getTouchCoords(canvasElem, e);
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mouseup", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvasElem.dispatchEvent(mouseEvent);
        isPressed = false;
        onRelease();
    }, false);
} else {
    canvasElem.addEventListener("mousedown", function (e) {
        getMouseCoords(canvasElem, e);
        isPressed = true;
        onClick();
    });

    canvasElem.addEventListener("mousemove", function (e) {
        getMouseCoords(canvasElem, e);
        onMove();
    });

    canvasElem.addEventListener("mouseup", function (e) {
        getMouseCoords(canvasElem, e);
        isPressed = false;
        onRelease();
    });

    window.addEventListener("keydown", function(e) {
        keyDownHandler(e.keyCode);
    }, false);

    window.addEventListener("keyup", function(e) {
        keyUpHandler(e.keyCode);
    }, false);
}

function getMouseCoords(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    clickPosX = event.clientX - rect.left;
    clickPosY = event.clientY - rect.top;
}

function getTouchCoords(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    clickPosX = event.touches[0].clientX - rect.left;
    clickPosY = event.touches[0].clientY - rect.top;
}

function togglePause() {
    isPaused = !isPaused;
    togglePauseBtn.innerHTML = isPaused ? "Resume" : "Pause";
}
