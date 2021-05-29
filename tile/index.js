
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d");
const rc = rough.canvas(canvas);

function displayCircle(circle) {
    rc.circle(circle.x, circle.y, circle.radius * 2);
}

function displayCircles(circles) {
    for (let circle of circles) {
        displayCircle(circle);
    }
}

function handleClick(button) {
    let target = document.getElementById("collection");
    if (target.style.display !== "none") {
        button.textContent = "More";
        target.style.display = "none";
    } else {
        button.textContent = "Less";
        target.style.display = "block";
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    const size = 300;
    ctx.translate(canvas.width / 2 - size / 2, canvas.height / 2 - size / 2);
    const circles = createCircles(300);
    displayCircles(circles);
    ctx.restore();
}

function main() {
    draw();
    setInterval(draw, 2000);
}

main();
