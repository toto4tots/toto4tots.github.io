
class Segment {
    constructor(vect1, vect2) {
        this.vect1 = vect1;
        this.vect2 = vect2;
    }

    x1() {
        return this.vect1.x
    }

    y1() {
        return this.vect1.y
    }

    x2() {
        return this.vect2.x
    }

    y2() {
        return this.vect2.y
    }

    _deform() {
        // Deform side according to Koch curve _/\_
        let ret = [];
        let vect3 = p5.Vector.sub(this.vect2, this.vect1);
        let s = vect3.div(3);

        let e1 = p5.Vector.add(this.vect1, s); // find end of 1st segment
        ret.push(new Segment(this.vect1, e1));
        let s4 = p5.Vector.sub(this.vect2, s); // find start of 4th segment
        ret.push(new Segment(s4, this.vect2));

        s.rotate(-PI / 3);
        let e2 = p5.Vector.add(e1, s);
        ret.push(new Segment(e1, e2));
        ret.push(new Segment(e2, s4))
        return ret;
    }

    deform(gen = 1, prev = []) {
        if (gen <= 0) {
            return prev
        }
        let curr = [];
        if (prev.length == 0) {
            curr = this._deform();
        } else {
            for (let segment of prev) {
                curr = curr.concat(segment._deform());
            }
        }
        return this.deform(gen - 1, curr);
    }
}

class Layer {
    constructor(colorInfo) {
        // console.log(colorInfo);

        this.x = colorInfo.x;
        this.y = colorInfo.y;
        this.radius = colorInfo.radius;
        this.numSides = colorInfo.numSides;
        this.a = colorInfo.alpha;
        this.sides = [];
        this.r = 97;
        this.g = 40;
        this.b = 40;
    }

    setColor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    create() {
        let angle = TWO_PI / this.numSides;
        let i = 0;
        for (let a = 0; a < TWO_PI; a += angle) {
            let vx1 = (this.x + cos(a) * this.radius * Math.random());
            let vy1 = this.y + sin(a) * this.radius * Math.random();
            let s = createVector(vx1, vy1);
            let vx2 = (this.x + cos(a + angle) * this.radius);

            let vy2 = (this.y + sin(a + angle) * this.radius);
            let e = createVector(vx2, vy2);
            this.sides.push(new Segment(s, e));
            i += 1;
        }
    }

    add(side) {
        this.sides.push(side);
    }

    concat(arr) {
        this.sides = this.sides.concat(arr);
    }

    deform(gen = 0) {
        if (gen == 0) {
            return
        }
        let temp = [];
        for (let side of this.sides) {
            temp = temp.concat(side.deform(gen));
        }
        this.sides = temp;
    }

}


