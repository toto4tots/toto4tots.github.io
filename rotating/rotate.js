
let margin = 200;

function setup() {
    cnv = createCanvas(800, 800);
    cols = 25;
    a = 0;
    b = 0;
    cnvWidth = windowWidth / 2 - 400;
    cnvHeight = 50;

    [u1, u2] = input();
    updateInputPos(cnvWidth, cnvHeight);
    updateInput();
}

class UserInput {
    constructor(textarea, button, textX, textY, size=30) {
        this.text = textarea;
        this.text.size(size);
        this.button = button;
        this.text.position(textX, textY);
        this.button.position(this.text.x + this.text.width, this.text.y);
        this.width = this.text.width + this.button.width;
        this.height = this.text.height;
        this.x = textX;
        this.y = textY;
    }

    updatePos(x, y) {
        this.text.position(x, y);
        this.button.position(this.text.x + this.text.width, this.text.y);
    }
}

function input() {
    let text1 = createInput("0");
    let button1 = createButton("x");
    let text2 = createInput("0");
    let button2 = createButton("y");
    return [
        new UserInput(text1, button1, 0, height - button1.height * 2),
        new UserInput(text2, button2, 0, height - button1.height),
    ]
}

function updateInput() {
    u1.button.mousePressed(() => {
        const n1 = +u1.text.value();
        a = isNaN(n1) ? a : n1;
    });

    u2.button.mousePressed(() => {
        const n2 = +u2.text.value();
        b = isNaN(n2) ? b : n2;
    });    
}

function updateInputPos(cx, cy) {
    const x = cx;
    const y = height - u1.height;
    u1.updatePos(x, y);
    u2.updatePos(x, y + u1.height);
}

function draw() {
    background(15, 20, 30);
    stroke(255);

    let cell = (width - margin * 2) / cols;
    let radius = cell / 4;
    for (let i = margin; i < width - margin; i += cell) {
        for (let j = margin; j < height - margin; j += cell) {
            let centerX = i + cell / 2;
            let centerY = j + cell / 2;
            circle(centerX, centerY, radius);
            push();
            translate(centerX, centerY);
            rotate(radians(frameCount * 10 + i * a + j * b));
            circle(radius, radius, radius);
            pop();
        }
    }

    cnvWidth = windowWidth / 2 - 400;
    cnv.position(cnvWidth, cnvHeight);
    updateInputPos(cnvWidth, cnvHeight)

}
