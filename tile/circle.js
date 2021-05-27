
class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    doesOverlap(other) {
        const distx = (other.x - this.x) * (other.x - this.x);
        const disty = (other.y - this.y) * (other.y - this.y);
        return Math.sqrt(distx + disty) < (this.radius + other.radius);
    }
}
