/* Structure of the Game:
  Ultraboard : Consists of 9 'Board's (placed in the array 'boards')
  Board: Consists of 9 'cell's (placed in the array 'cells')
  Cell: Has a state , active , play() function that changes the state of the cell, when clicked.
       If state = 0 : Unoccupied 
          state = 1 : Occupied by x
          state = 2 : Occupied by o
       If active = true - Can be played
          active = false - Cannot be played
  Similarly for each board there is a state and active
  Additionally , for a Board:
      activate() function - activates/deactivates the boards and available cells for a particular turn
      checkboard() function - checks if a board has reached a win condition (denoted by winning combinations)
      Need to implement checkdraw() function (making a new state = 2)
  And for the UltraBoard:
      checkstate() function - checks the win condition over multiple boards 
      checkdraw() function - checks if there is a draw (Need rework by making new state and add corresponding changes)
      checkwinner() function - returns the winner (if the game ends)
      start() - to setup the board properly (not used for now)
 */

class Player {

  constructor(string) {
    this.name = string;
    this.wins = 0;
    this.losses = 0;
    this.ties = 0;
  }

  result(val) {
    if (val == 1) {
      this.wins += 1;
    } else if (val == 0) {
      this.ties += 1;
    } else {
      this.losses += 1;
    }
  }
  // To-do : Implement other functions and statistics 
}


class cell {

  constructor(x, y, r, c) {
    this.state = 0; 
    this.active = false;
    this.boardrow = x;
    this.boardcol = y;
    this.row = r;
    this.col = c;
  }
  
  // Initialization 
  init() {
    this.state = 0;
    this.active = false;
  }

  // Play
  play(val) {
    this.state = val;
  }

  // Debug
  print(){
    console.log("State of cell " , this.row , this.col , " :" , this.state);
  }
}

class Board {

  constructor(x, y) {
    this.cells = [];

    for (let i = 0; i < 3; ++i) {
      let dum = [];
      for (let j = 0; j < 3; ++j) {
        dum.push(new cell(x, y, i, j));
      }
      this.cells.push(dum);
    }

    this.state = 0;
    this.row = x;
    this.col = y;
    this.active = false;

    this.winconditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  // Initialization
  init() {
    this.state = 0;
    this.active = false;
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        this.cells[i][j].init();
      }
    }
  }

  // Play
  play(r, c, val) {
    this.cells[i][j].play(val);
  }

  checkboard(val) {

    for (let i = 0; i < 8; i++) {
      let check1 = this.winconditions[i][0];
      let check2 = this.winconditions[i][1];
      let check3 = this.winconditions[i][2];

      let mod1 = check1%3 ;
      let quo1 = floor(check1/3);
      let mod2 = check2%3 ;
      let quo2 = floor(check2/3);
      let mod3 = check3%3 ;
      let quo3 = floor(check3/3);

      if (
        this.cells[mod1][quo1].state == this.cells[mod2][quo2].state &&
        this.cells[mod2][quo2].state == this.cells[mod3][quo3].state &&
        this.cells[mod3][quo3].state == val
      ) {
        console.log("wincondition for board reached");
        this.state = val;
        return true;
      }
    }
    return false;
  }

  activate(bool) {
    this.active = bool;

    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (this.cells[i][j].state == 0 && bool == true) {
          this.cells[i][j].active = bool;
        } else {
          this.cells[i][j].active = false;
        }
      }
    }
  }
  
  // Debug
  print(){
    console.log("State of board " , this.row , this.col , " :" , this.state);
  }
}

class UltraBoard {

  constructor() {
    this.boards = [];
    for (let i = 0; i < 3; ++i) {
      let dum = [];
      for (let j = 0; j < 3; ++j) {
        dum.push(new Board(i, j));
      }
      this.boards.push(dum);
    }
    this.state = 0;
    this.active = false;
    this.winconditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  init() {
    this.state = 0;
    this.active = false;
  }

  play(x, y, r, c, val) {
    this.boards[x][y].play(r, c, val);
  }

  // Debug
  print(){
    console.log("State of full:" , this.state);
  }

  checkstate(val) {
    for (let i = 0; i < 8; i++) {
      let check1 = this.winconditions[i][0];
      let check2 = this.winconditions[i][1];
      let check3 = this.winconditions[i][2];
      let mod1 = check1%3 ;
      let quo1 = floor(check1/3);
      let mod2 = check2%3 ;
      let quo2 = floor(check2/3);
      let mod3 = check3%3 ;
      let quo3 = floor(check3/3);
      if (
        this.boards[mod1][quo1].state == this.boards[mod2][quo2].state &&
        this.boards[mod2][quo2].state == this.boards[mod3][quo3].state &&
        this.boards[mod3][quo3].state == val 
      ) {
        this.state = val;
        return;
      }
    }
  }
  
  checkdraw(){
    for(let i = 0 ; i < 3 ; ++i){
        for(let j = 0 ; j < 3 ; ++j){
            if(this.boards[i][j].state == 0){
                return false ;
            }
        }
    }
    return true ;
  }

  checkwinner() {
    if (this.state == 1) {
        return [true , 1] ;
    } 
    else if (this.state == -1) {
        return [true , -1] ;
    }
    else{
        if(this.checkdraw()){
            return [true , 0] ;
        }
        return [false , 0] ;
    }
  }

  start() {
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        this.boards[i][j].activate(true);
      }
    }
  }
}
