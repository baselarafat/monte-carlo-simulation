let totalSamples, insideCircle;
let estimatedPi;
let dotRadius;
let circleBoundary;
let isRunning;

function simulate() {
    if (isRunning) {
        let coordX, coordY;
        coordX = Math.random() * canvasW;
        coordY = Math.random() * canvasH;

        if (Math.pow(coordX - canvasW / 2, 2) + Math.pow(coordY - canvasH / 2, 2) < circleBoundary) {
            insideCircle++;
            ctx.fillStyle = "#e63946";
        } else {
            ctx.fillStyle = "#1d3557";
        }
        ctx.beginPath();
        ctx.arc(coordX, coordY, dotRadius, 0, 2 * Math.PI);
        ctx.fill();
        totalSamples++;

        estimatedPi = 4 * insideCircle / totalSamples;
        totalPointsDisplay.innerHTML = `Total Samples: ${totalSamples}`;
        insideCircleDisplay.innerHTML = `Inside Circle: ${insideCircle}`;
        estimatedPiDisplay.innerHTML = `Estimated Pi: ${estimatedPi.toFixed(6)}`;
    }
}

function resetCanvas() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasW, canvasH);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvasW / 2, canvasH / 2, canvasW / 2, 0, 2 * Math.PI);
    ctx.stroke();
}

function initializeParams() {
    totalSamples = 0;
    insideCircle = 0;
    isRunning = true;

    circleBoundary = Math.pow(canvasW / 2, 2);

    dotRadius = isMobile ? 2 : 3;
    resetCanvas();
}
