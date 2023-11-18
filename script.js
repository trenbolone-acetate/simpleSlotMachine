const images = [
    'images/cherry.png',
    'images/lemon.png',
    'images/auto-win.png',
    'images/melon.png',
    'images/diamond.png'
  ];
let imgExtractionRegex = /<img.*?src=['"](.*?)['"].*?>/i;
const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const startButton = document.getElementById("startButton");
const result = document.getElementById("result");
insertRandImage(3);

enterPlayerName();

startButton.addEventListener("click", startGame);

function startGame(){
  startButton.disabled = true;

  const attempts = 8;
  let slot1Attempts = 0, slot2Attempts = 0, slot3Attempts = 0;

  let slot1Action = setInterval(function(){
    randomIndex = generateRandIndex(images.length);
    slot1.innerHTML = `<img class ="slot-image" alt="slot1IMG" src='${images[randomIndex]}' width='100%' height='100%'>`;
    slot1Attempts++;
    if (slot1Attempts == attempts) {
      clearInterval(slot1Action);
      return null;
    }
  }, 80);

  let slot2Action = setInterval(function(){
    randomIndex = generateRandIndex(images.length);
    slot2.innerHTML = `<img class ="slot-image" alt="slot1IMG" src='${images[randomIndex]}' width='100%' height='100%'>`;
    slot2Attempts++;
    if (slot2Attempts == attempts) {
      clearInterval(slot2Action);
      return null;
    }
  }, 80);

  let slot3Action = setInterval(function(){
    randomIndex = generateRandIndex(images.length);
    slot3.innerHTML = `<img class ="slot-image" alt="slot1IMG" src='${images[randomIndex]}' width='100%' height='100%'>`;
    slot3Attempts++;
    if (slot3Attempts == attempts) {
      clearInterval(slot3Action);
      victory();
      document.getElementById("startButton").disabled = false;
      return null;
    }
  }, 80);
}
function generateRandIndex(max){
	return Math.floor((Math.random() *  max));
}

function insertRandImage(numberOfSlots){
	for (let i = 1; i <= numberOfSlots; i++) {
    randomIndex = generateRandIndex(images.length);
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
  const playerNameElement = document.getElementById("playerName");
  playerNameElement.textContent = playerName;
}

function victory() {
  slot1Img = slot1.innerHTML.match(imgExtractionRegex)[1];
  slot2Img = slot2.innerHTML.match(imgExtractionRegex)[1];
  slot3Img = slot3.innerHTML.match(imgExtractionRegex)[1];

  if (slot1Img == slot2Img && slot2Img == slot3Img){
    result.style = 
    'color:#03b206;'+
    'border: 3px solid #03b206;'+
    'box-shadow: 0 0 10px #03b206;'+
    'background-color:#005901;';
    result.innerHTML = 'YOU WON!!';
  } else {
    result.style = 
    'color:#c70606;'+
    'border: 3px solid #c70606;'+
    'box-shadow: 0 0 10px #c70606;'+
    'background-color:#4f0000;';
    result.innerHTML = 'You lost :(';
  }
}
