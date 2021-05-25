

function numToHex(num) {
    if (num === 0) {
        return "00";
    }
    let temp = [];
    while (num > 0) {
        temp.push(Math.floor(num % 16));
        num = Math.floor(num / 16);
    }

    return formatHex(temp);
}

function timeToHex() {
    // returns an array [hour, min, sec] in hex
    let now = new Date();
    return [
        numToHex(now.getHours()),
        numToHex(now.getMinutes()),
        numToHex(now.getSeconds()),
    ].join("");
}

function formatHex(hexArr) {
    let hex = hexArr.map(
        x => x >= 10 ? String.fromCharCode("a".charCodeAt() + x - 10) : x.toString()
    ).reverse().join("");

    return hex.length === 1 ? "0" + hex : hex;
}

function getKST() {
    /*
        Calculate time in KST with UTC
    */
    const d = new Date().toISOString();
    let utc = d.substr(11, 5).split(":");
    let hour = ((parseInt(utc) + 9) % 24);
    return formatKST([hour, utc[1]]);
}

function getLifeYearRange() {
    let currYear = new Date().getFullYear();
    let born = Math.floor(Math.random() * 80 + (currYear - 80)); 
    return [born.toString(), (born + 80).toString()];
}

function getLifeExpectPercentage(yearRange) {
    let start = new Date("01/01/" + yearRange[0]).getTime();
    let final = new Date("01/01/" + yearRange[1]).getTime();
    let curr = new Date().getTime();
    const passed = ((curr - start) / (final - start)) * 100;
    return [passed, 100 - passed, yearRange[0]];
}

function calculateTimeSpent(start) {
    /*
        Returns how long user spent on site in seconds
    */
    let now = new Date().getTime();
    return Math.floor((now - start) / 1000);
}


function displayHex() {
    const timeHex = timeToHex();
    const revTimeHex = timeHex.split("").reverse().join("");
    const elem = document.getElementById("hex-time");
    elem.style.color = timeHex;
    elem.textContent = timeHex;
    const revElem = document.getElementById("rev-hex-time");
    revElem.style.color = revTimeHex;
    revElem.textContent = revTimeHex;
}

function formatKST(timeArr) {
    let night = false;
    if (timeArr[0] > 12) {
        night = true;
    }
    let hour = timeArr[0] % 12;
    if (timeArr[0] === 0) {
        hour += 12;
    }    
    return [hour.toString(), timeArr[1]].join(":") + (night ? "pm" : "am");
}

function displayKST() {
    const elem = document.getElementById("kst");
    elem.textContent = getKST();
}

function displayLifeExpect(lifeRange) {
    const percentages = getLifeExpectPercentage(lifeRange);
    let elem = document.getElementById("passed");
    let elem2 = document.getElementById("remaining");
    let elem3 = document.getElementById("born");
    elem.textContent = percentages[0];
    elem2.textContent = percentages[1];
    elem3.textContent = percentages[2];
}

function displayTimeSpent(start) {
    /*
        Returns how long user spent on site in seconds
    */
    const spent = calculateTimeSpent(start);
    let elem = document.getElementById("spent");
    elem.textContent = spent + "s";
}

function main() {
    const lifeRange = getLifeYearRange();
    let start = new Date().getTime();

    setInterval(function () {
        displayHex();
        displayKST();
        displayLifeExpect(lifeRange);
        displayTimeSpent(start);
    }, 1000);
}

main();
