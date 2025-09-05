// DATE :-  5th Sep 2025

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn_O = true;
let count_O = 0;  // Used in the Draw Condition    

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const draw = () =>{
  if(count_O === 9 && !checkWinner()){
    setTimeout(()=>{
      msg.innerText = `Tough Competition!! Match is a Draw!!`;
      msgContainer.classList.remove("hide"); 
      disableBoxes();
    },1000);     // 1000 milliseconds = 1 seconds
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn_O) {
      box.innerText = "O";
      turn_O = false;
    } else {
      box.innerText = "X";
      turn_O = true;
    }
    count_O++;
    box.disabled = true; // So that same box can't be used again.
    checkWinner();
    draw();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations!! Winner is ${winner}`;
  msgContainer.classList.remove("hide"); // As soon as the message is given, we will remove the "hide" class.
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // here, "let pattern" is a new array made trough the functionality of this loop.
    // console.log(pattern[0], pattern[1], pattern[2]);    // Here, we are accessing Specific element of the "pattern" array.
    // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);   // Here, we are accessing the boxes.

    let position1 = boxes[pattern[0]].innerText;
    let position2 = boxes[pattern[1]].innerText;
    let position3 = boxes[pattern[2]].innerText;

    if (position1 != "" && position2 != "" && position3 != "") {        /* CHECKING, whether all the positions are "Filled"  &  with the "Same innerText"  OR Not */
      if (position1 === position2 && position2 === position3) {
        showWinner(position1);
        return true;   // winner found
      }
    }
  }
  return false;     // No winner found
};

const resetGame = () => {
  turn_O = true;
  count_O = 0;
  enableBoxes();
  msgContainer.classList.add("hide"); // Adding the hide class again for the new Game.
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);