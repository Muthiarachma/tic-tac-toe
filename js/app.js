const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const o_scors = document.querySelector("#o_win");
const x_scors = document.querySelector("#x_win");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let o_win = 0;
let x_win = 0;
let compInGame = false;

initializeGame();

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementsByClassName("modal")[0];
    
});

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;

  setTimeout(showOptions, 500);
}

function getOptions() {
    if (document.getElementById('PvsP').checked === true) {
        compInGame = false;
    } else {
        compInGame = true;
    }
    
    document.getElementById("optionsDlg").style.display = "none";
}

function showOptions() {
    document.getElementById("optionsDlg").style.display = "block";
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function cellClickedComp(currentPlayer, index) {
    let selectedCell = Array.from(cells).find(cell => cell.getAttribute('cellindex') == index);
selectedCell.textContent = 'O';

  updateCell(currentPlayer, index);
  checkWinner();
}

function comp(){
    let emptyIndexes = options.reduce(function(acc, option, index) {
        if (option === '') {
            acc.push(index);
        }
        return acc;
    }, []);
    
    let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    return randomIndex;
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}


function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}


function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
    Swal.fire({
        title: `${currentPlayer} wins!`,
        imageUrl: "../css/congratulation.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Continue the game ?",
      }).then((result) => {
        if(currentPlayer === "X"){
            x_win++;
            x_scors.textContent = x_win;
        }else{
            o_win++;
            o_scors.textContent = o_win;
        }
        restartGame();
      });

  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
    Swal.fire({
        title: "You're tied",
        imageUrl: "../css/Yahh!!.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Continue the game ?",
      }).then((result) => {
        restartGame();
      });
  } else {
    changePlayer();
    if(currentPlayer === "O" && compInGame){
        let indexComp = comp();
        cellClickedComp(currentPlayer, indexComp);
    }
  }
}


function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}


