const images = [
    'images/cherry.png',
    'images/lemon.png',
    'images/auto-win.png',
    'images/melon.png',
    'images/diamond.png'
];

const imgExtractionRegex = /<img.*?src=['"](.*?)['"].*?>/i;
const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const startButton = document.getElementById("startButton");
const result = document.getElementById("result");
const score = document.getElementById("score");
const attempts = 3;
let userAttempts = 0;

insertRandImage(3);
enterPlayerName();

startButton.addEventListener("click", start);

function start() {
    if (userAttempts === attempts) {
        const YOrN = prompt('You have no attempts left! Want more attempts? Y/N').toLowerCase();
        YOrN == 'y'? location.href="https://www.paypal.com/myaccount/transfer/homepage/send/preview" : alert("Then reload the page.");
        return;
    }
    startButton.disabled = true;

    const inBtwImages = 10;

    spinSlot(slot1, inBtwImages);
    spinSlot(slot2, inBtwImages);
    spinSlot(slot3, inBtwImages);
}

function spinSlot(slot, inBtwImages) {
  let slotInBtwImages = 0;
  const randomIntrvl = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const slotAction = setInterval(function () {
        const randomIndex = generateRandIndex(images.length);
        slot.innerHTML = `<img class ="slot-image" alt="slot1IMG" src='${images[randomIndex]}' width='100%' height='100%'>`;
        slotInBtwImages++;

        if (slotInBtwImages === inBtwImages) {
            clearInterval(slotAction);
            if (slot === slot3) {
                end();
            }
        }
    }, randomIntrvl);
}

function generateRandIndex(max) {
    return Math.floor(Math.random() * max);
}

function insertRandImage(numberOfSlots) {
    for (let i = 1; i <= numberOfSlots; i++) {
        const randomIndex = generateRandIndex(images.length);
        document.getElementById(`slot${i}`).innerHTML = `<img class ="slot-image" alt="slot1IMG" src='${images[randomIndex]}' width='100%' height='100%'>`;
    }
}

function enterPlayerName() {
    let playerName;
    do {
        playerName = prompt("Please enter your name", "Player1");
        if (!playerName) {
            alert("Name cannot be empty. Please enter a valid name.");
        }
    } while (!playerName)
    document.getElementById("playerName").textContent = playerName;
}

function end() {
    const slot1ImgMatch = slot1.innerHTML.match(imgExtractionRegex);
    const slot2ImgMatch = slot2.innerHTML.match(imgExtractionRegex);
    const slot3ImgMatch = slot3.innerHTML.match(imgExtractionRegex);

    if (slot1ImgMatch && slot2ImgMatch && slot3ImgMatch) {
        const slot1Img = slot1ImgMatch[1];
        const slot2Img = slot2ImgMatch[1];
        const slot3Img = slot3ImgMatch[1];

        if (slot1Img === slot2Img && slot2Img === slot3Img) {
            result.style.cssText = 'color:#03b206;border: 3px solid #03b206;box-shadow: 0 0 10px #03b206;background-color:#005901;';
            result.innerHTML = 'YOU WON!!';
        } else {
            result.style.cssText = 'color:#c70606;border: 3px solid #c70606;box-shadow: 0 0 10px #c70606;background-color:#4f0000;';
            result.innerHTML = 'You lost :(';
        }
        score.textContent = `Round ${++userAttempts} out of ${attempts}`;
        startButton.disabled = false;
    }
}
