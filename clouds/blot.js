
class Blot {
    constructor() {
        this.layers = []
    }

    push(layer) {
        this.layers.push(layer);
    }

    add(other) {
        return [...this.layers, ...other.layers];
    }
}

class BlotRandomSetting {
    // holds info of one shade 
    constructor(x, y, radius, sdx = 10, sdy = 10, generation = 2, alpha = 4) {
        this.x = randomGaussian(x, sdx);
        this.y = randomGaussian(y, sdy);
        this.radius = randomGaussian(radius);
        this.numSides = Math.floor(randomGaussian(10));
        this.generation = Math.floor(randomGaussian(generation, 1));
        this.alpha = randomGaussian(alpha, 4);
    }
}

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}