const images = [
    'images/cherry.png',
    'images/lemon.png',
    'images/auto-win.png',
    'images/melon.png',
    'images/diamond.png'
];

let attemptsEnabled = true;

const imgExtractionRegex = /<img.*?src=['"](.*?)['"].*?>/i;

let slots=[];
const initTable = document.getElementById("slots");
const tdInTable = document.getElementsByTagName("td");
for (let i = 0; i < tdInTable.length; i++) {
    slots[i] = document.getElementById(`slot${i+1}`); 
}

const startButton = document.getElementById("startButton");
const playType = document.getElementById("playType");
const result = document.getElementById("result");
const score = document.getElementById("score");
const attempts = 3;
let userAttempts = 0;

insertRandImage(9);
enterPlayerName();

startButton.addEventListener("click", start);
playType.addEventListener("click", function() {
    attemptsEnabled = !attemptsEnabled;
    userAttempts=0;
    let chosenString = playType.innerHTML === 'Play infinitely' ? 'Play with Attempts' : 'Play infinitely';
    playType.innerHTML = chosenString.toString();
});

function generateRandIndex(max) {
    return Math.floor(Math.random() * max);
}

function insertRandImage(numberOfSlots) {
    for (let i = 0; i < numberOfSlots; i++) {
        const randomIndex = generateRandIndex(images.length);
        slots[i].innerHTML = `<img class ="slot-image" alt="slotIMG" src='${images[randomIndex]}' width='100%' height='100%'>`;
    }
}

function start() {
    resetSlotsBg(slots);
    checkForPlayType(attemptsEnabled);
    startButton.disabled = true;

    const inBtwImages = 15;

    for (let i = 0; i < slots.length; i++) {
        spinSlot(tdInTable[i], inBtwImages);
    }
}
function resetSlotsBg(slots) {
    slots.forEach(slot => {
        slot.style.backgroundColor = "#656565";
    });
}
function checkForPlayType(attemptsEnabled) {
    if(attemptsEnabled){
        if (userAttempts === attempts) {
            const YOrN = prompt('You have no attempts left! Want more attempts? Y/N').toLowerCase();
            YOrN === 'y'? location.href="https://www.paypal.com/myaccount/transfer/homepage/send/preview" : alert("Then reload the page.");
            return;
        }
    }
    else{
        score.innerHTML=null;
    }
}
function spinSlot(slot, inBtwImages) {
  let slotInBtwImages = 0;
    const slotAction = setInterval(function () {
        const randomIndex = generateRandIndex(images.length);
        slot.innerHTML = `<img class ="slot-image" alt="slotIMG" src='${images[randomIndex]}' width='100%' height='100%'>`;
        slotInBtwImages++;

        if (slotInBtwImages === inBtwImages) {
            clearInterval(slotAction);
            if (slot === slots[slots.length-1]) {
                end();
            }
        }
    }, 40);
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
function getSlot(slotNumber) {
    return document.getElementById(`slot${slotNumber}`);
}

function end() {
    const slotsImgMatch = [];
    for (let i = 0; i < tdInTable.length; i++) {
        slotsImgMatch[i] = slots[i].innerHTML.match(imgExtractionRegex);
    }
    for (let i = 0; i < slotsImgMatch.length; i++) {
        if(!slotsImgMatch[i]){return};
    }
        const slotImg = [];
        for (let i = 0; i < slotsImgMatch.length; i++) {
            slotImg[i] = slotsImgMatch[i][1];
        }
        const isWin = (startIndex, endIndex) => {
            for (let i = startIndex; i <= endIndex; i += 3) {
                if (slotImg[i] !== slotImg[i + 1] || slotImg[i + 1] !== slotImg[i + 2]) {
                    return false;
                }
            }
            return true;
        };
        if (isWin(0, 2) || isWin(3, 5) || isWin(6, 8)) {
            let startIndex, endIndex;
        
            if (isWin(0, 2)) {
                startIndex = 0;
                endIndex = 2;
            } else if (isWin(3, 5)) {
                startIndex = 3;
                endIndex = 5;
            } else {
                startIndex = 6;
                endIndex = 8;
            }
        
            for (let i = startIndex; i <= endIndex; i++) {
                slots[i].style.backgroundColor = "#257728";
            }
        
            result.style.cssText = 'color:#03b206;border: 3px solid #03b206;box-shadow: 0 0 10px #03b206;background-color:#005901;';
            result.innerHTML = 'YOU WON!!';
        } else {
            result.style.cssText = 'color:#c70606;border: 3px solid #c70606;box-shadow: 0 0 10px #c70606;background-color:#4f0000;';
            result.innerHTML = 'You lost :(';
        }
        if(attemptsEnabled){score.textContent = `Round ${++userAttempts} out of ${attempts}`;}
        startButton.disabled = false;
}
