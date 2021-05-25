
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clockRadius = 100;
let transX = canvas.width * 0.5;
let transY = canvas.width * 0.5;
ctx.translate(transX, transY);
let currTime = getTime();

// model
function getTime() {
    let date = new Date().toTimeString();
    let [hour, min, sec] = (date.split(" ")[0].split(":")).map(x => +x);;
    return [hour % 12, min, sec]
}

function get24Time() {
    let date = new Date().toTimeString();
    let [hour, min, sec] = (date.split(" ")[0].split(":")).map(x => +x);;
    return [hour, min, sec]
}

function rotate(x, y, rad) {
    let cos = Math.cos(rad);
    let sin = Math.sin(rad);
    let nx = (cos * (x - 0)) - (sin * (y - 0)) + 0;
    let ny = (cos * (y - 0)) + (sin * (x - 0)) + 0;
    return [nx, ny];
}

function displayHand(length, radians) {
    let [x, y] = rotate(0, -length, radians);
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function displayHands(hour, min, sec) {
    let tsec = sec + 60 * (min + 60 * hour);
    displayHand(30, 2 * Math.PI * tsec / (12 * 60 * 60));
    displayHand(60, 2 * Math.PI * (tsec % 3600) / (60 * 60));
    displayHand(50, 2 * Math.PI * tsec / (60));
}

function displayClock() {
    ctx.beginPath();
    ctx.arc(0, 0, clockRadius, 0, 2 * Math.PI);
    ctx.stroke();

    let x = 0;
    let y = -75;
    for (let i = 0; i < 12; i++) {
        let [nx, ny] = rotate(x, y, (Math.PI / 6));
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(`${i + 1}`, nx, ny);
        x = nx;
        y = ny;
    }
}

function draw(hour, min, sec) {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    displayClock();
    displayHands(hour, min, sec);
    displayTime();

}

function tick() {
    let [hour, min, sec] = getTime();
    if (hour != currTime[0] || min != currTime[1] || sec != currTime[2]) {
        currTime = [hour, min, sec];
        draw(hour, min, sec);
    }
    requestAnimationFrame(tick);
}

function displayTime() {
    let [hour, min, sec] = get24Time().map(x => +x);
    if (min < 10) {
        min = "0" + min;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    ctx.font = "20px Georgia";
    ctx.fillText(`${hour}:${min}:${sec}`, 0, clockRadius + clockRadius / 2);
}

draw(currTime[0], currTime[1], currTime[2]);

function main() {
    tick();
}

main();
