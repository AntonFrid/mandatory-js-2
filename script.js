let body = document.querySelector('body');
let boxes = document.getElementsByClassName('boxes');
let userPiece = 'X';
let compPiece = 'O';
let userCount = 0;
let compCount = 0;
let victory = false;
let overlayDiv = document.getElementById('overlay-div')
let winText = document.getElementById('win-text');
let winDirr;
let winner;
let compRemoveCheck = false;
let moving = false;
let prevComp;

//Adding event listeners to each box on the board.
for (box of boxes){
  box.addEventListener('click', addGamePiece)
}

//Adding the piece to the right box on the board and checking if there
// is 3 or less pieces in play.
function addGamePiece(){
  if (moving) return;
  if(this.innerHTML === ''){
    if (userCount !== 3 || compCount !== 3){
      this.innerHTML = userPiece;

      userCount++;
    }
  }
  else if (this.innerHTML === userPiece && userCount === 3 && compCount === 3) {
    userCount--;
    this.innerHTML = '';
  }

  moving = true;
  setTimeout(compChoice, 350)

  victoryChecker()
}

//wincheck!
function victoryChecker(){

  //row check!
  for (let i = 0; i < boxes.length; i += 3){
    if (boxes[i].innerHTML !== ''){
      let ii = i + 1;
      let iii = i + 2;
      if (boxes[i].innerHTML === boxes[ii].innerHTML && boxes[i].innerHTML === boxes[iii].innerHTML){
        victory = true;
        winDirr = 'Row';

        if(boxes[i].innerHTML === userPiece){
          winner = 'User';
        }
        else{
          winner = 'Comp';
        }
      }
    }
  }

  //column check!
  for (let i = 0; i < 3; i++){
    if (boxes[i].innerHTML !== ''){
      let ii = i + 3;
      let iii = i + 6;
      if (boxes[i].innerHTML === boxes[ii].innerHTML && boxes[i].innerHTML === boxes[iii].innerHTML){
        victory = true;
        winDirr = 'Column';

        if(boxes[i].innerHTML === userPiece){
          winner = 'User';
        }
        else{
          winner = 'Comp';
        }
      }
    }
  }

  //diagonal check!
  for (let i = 0; i <= 2; i += 2){
    if (boxes[i].innerHTML !== ''){
      if (i === 0){
        let ii = i + 4;
        let iii = i + 8;
        if (boxes[i].innerHTML === boxes[ii].innerHTML && boxes[i].innerHTML === boxes[iii].innerHTML){
          victory = true;
          winDirr = 'Diagonal';

          if(boxes[i].innerHTML === userPiece){
            winner = 'User';
          }
          else{
            winner = 'Comp';
          }
        }
      }
      else if (i === 2) {
        let ii = i + 2;
        let iii = i + 4;
        if (boxes[i].innerHTML === boxes[ii].innerHTML && boxes[i].innerHTML === boxes[iii].innerHTML){
          victory = true;
          winDirr = 'Diagonal';

          if(boxes[i].innerHTML === userPiece){
            winner = 'User';
          }
          else{
            winner = 'Comp';
          }
        }
      }

    }
  }

  //Checking if game is won, and stops the game.
  if (victory === true){
    //Creating and adding reset button.
    let resetButton = document.createElement('button');
    resetButton.innerHTML = 'Play again';
    body.appendChild(resetButton);


    overlayDiv.classList.add('overlay');
    winText.innerHTML = winner + ' wins with a ' + winDirr + '!';

    resetButton.addEventListener('click', function(){
      for (box of boxes){
        box.innerHTML = '';
      }

      victory = false;

      userCount = 0;
      compCount = 0;

      overlayDiv.classList.remove('overlay');

      winText.innerHTML = '';

      resetButton.remove();
    })
  }
}

//Computer choice randomized and displayed.
function compChoice(){
  moving = false;
  let randomIndex = Math.floor(Math.random() * boxes.length);
  if (victory === false){
    if (compCount !== 3 && compCount < userCount){
      if (boxes[randomIndex].innerHTML === '' && randomIndex !== prevComp){
        boxes[randomIndex].innerHTML = compPiece;
        compCount++;
        victoryChecker()
      }
      else {
        compChoice();
      }
    }

    if(compRemoveCheck === true){
      for (let i = 0; i < boxes.length; i++){
        if(boxes[i].innerHTML === compPiece && compCount === 3){
          prevComp = i;
          boxes[i].innerHTML = '';
          compCount--;
          setTimeout(compChoice, 350)
        }
      }
      compRemoveCheck = false;
    }

    if(compCount === 3 && userCount === 2){
      compRemoveCheck = true;
    }
  }
}
