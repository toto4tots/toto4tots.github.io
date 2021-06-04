
class DisplayHelper {
    constructor(layer) {
        this.layer = layer;
    }

    displaySide(side) {
        noStroke();
        line(side.x1(), side.y1(), side.x2(), side.y2());
    }

    displayOutline() {
        for (let side of this.layer.sides) {
            this.displaySide(side);
        }
    }

    fillShape() {
        noStroke();
        beginShape();
        for (let side of this.layer.sides) {
            vertex(side.x1(), side.y1());
            vertex(side.x2(), side.y2());
        }
        endShape(CLOSE);
    }

    drawShape() {
        this.displayOutline();
        this.fillShape();
    }
}

class Display {
    constructor(blot) {
        this.blot = blot;
    }

    draw() {
        for (let layer of this.blot.layers) {
            let c = color(layer.r, layer.g, layer.b);
            c.setAlpha(layer.a);
            fill(c);
            let display = new DisplayHelper(layer);
            display.displayOutline();
            display.fillShape();
        }
    }
}

function mix(info, colorArr, blot) {
    let s = new Layer(
        info
    );
    s.setColor(
        colorArr[0],
        colorArr[1],
        colorArr[2],
    )
    s.create();
    s.deform(3);
    blot.push(s);
}
