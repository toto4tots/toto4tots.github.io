function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}

function getRiemannZetaSum(n, c) {
    let total = 1; // when i = 0
    for (let i = 1; i < n; i++) {
        total += Math.pow(i, -c);
    }
    return total;
}

function getInitialArea(totalArea, n, c) {
    return totalArea / getRiemannZetaSum(n, c);
}

function findRadius(area) {
    return Math.sqrt(area / Math.PI);
}

function createCircles(size) {
    const totalArea = size * size;
    let circles = [];
    const n = 1000;
    const c = 0.5;
    let failCount = 0;

    let initial = getInitialArea(totalArea, n, c);
    for (let i = 0; i < n; i++) {
        let newArea = i === 0 ? initial : initial * Math.pow(i, -c);
        let radius = findRadius(newArea);
        let found = false;
        let tries = 0;
        while (!found) {
            if (tries > 20) {
                failCount++;
                break;
            }
            tries += 1;
            let x = Math.floor(getRandomNum(0, size));
            let y = Math.floor(getRandomNum(0, size));
            let circle = new Circle(x, y, radius);
            if (circles.length === 0) {
                circles.push(circle);
                break;
            } else {
                found = true;
                for (let other of circles) {
                    if (circle.doesOverlap(other)) {
                        found = false;
                        break;
                    }
                }
                if (found) {
                    circles.push(circle);
                }
            }
        }
    }
    // console.log(failCount);
    return circles
}

function calculationTest() {
    {
        console.assert(getRiemannZetaSum(3, 1) === 2.5);
    }
    {
        const totalArea = 160000;
        const n = 3;
        const c = 1;
        const initial = getInitialArea(totalArea, n, c)
        console.assert(initial === 64000);
        let total = initial;
        for (let i = 1; i < n; i++) {
            total += initial * Math.pow(i, -c);
        }
        console.assert(total === totalArea);
    }
}

calculationTest();