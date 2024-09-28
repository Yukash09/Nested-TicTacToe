// Imports classes.js (Header file)

function setup() {
  createCanvas(1525, 800);
}

/* Try to use Images instead of x and o?? */
// let toothless ;
// let pikachu ;

let font ;

function preload(){
  // toothless = loadImage('./assets/toothless.png');
  // pikachu = loadImage('./assets/pika.png') ;

  font = loadFont('./assets/lemon-jelly-font/LemonJellyPersonalUse-dEqR.ttf')
}

function drawboard(Ultraboard){
  // translate(450 , 25);  // To-do: Make the board centralized by appropriately changing coordinates
  for(let i = 0 ; i < 3 ; ++i){
    for(let j = 0 ; j < 3 ; ++j){

      // Set the drawing cursor position appropriately
      posX = (Ultraboard.boards[i][j].row+1) * 100 * 2 - 100 ;
      posY = (Ultraboard.boards[i][j].col+1) * 100 * 2 - 100 ;
      translate(posX , posY) ;

      // Draw squares for each board
      let nsize = (200 - ((200/(3))/100*2));
      textAlign(CENTER);
      textSize(nsize/3);
      stroke(300);
      fill(0);
      square(-nsize/2  , -nsize/2 , nsize);

      // Draw the inner lines for each square
      for(let k = 1 ; k <= 2 ; ++k){
        stroke(100)
        line(-nsize/2   , -nsize/2 + k*nsize/3  , nsize/2  , -nsize/2 + k*nsize/3);
      }
      for(let k = 1 ; k <= 2 ; ++k){
        line(-nsize/2 + k* nsize/3  ,  -nsize/2   , -nsize/2+ k*nsize/3 , +nsize/2 );     
      }

      // Draw x or o based on the change in state of each cell
      for(let k = 0 ; k < 3 ; ++k){
        for(let l = 0 ; l < 3 ; ++l){

          if(Ultraboard.boards[j][i].cells[k][l].state == 1){
            textFont(font);
            stroke(255 , 0 ,  0);
            fill(255 , 0 , 0);
            text('x' , -nsize/2 + (l*2 + 1) * nsize/6 , -nsize/2 + (k*2 + 1)* nsize/6 + nsize/9) ;
            // image(pikachu , -nsize/2 + (l*2 + 1)*nsize/6 , -nsize/2 + (k*2 + 1)* nsize/6 + nsize/9 )
          }

          else if(Ultraboard.boards[j][i].cells[k][l].state == -1){
            textFont(font);
            stroke(0 , 0 , 255);
            fill(0 , 0 , 255);
            text('o' , -nsize/2 + (l*2 + 1) * nsize/6  , -nsize/2 + (k*2 + 1)* nsize/6 + nsize/9) ;
          }

          // Debug  
          else{
            // stroke(0 , 255 , 0);
            // text('0', -nsize/2 + (l*2 + 1) * nsize/6  , -nsize/2 + (k*2 + 1)* nsize/6 + nsize/9);
          }          
        }
      } 

      // If a board is completed , Fill with bigger x or o correspondingly
      if(Ultraboard.boards[j][i].state == 1){

        // Draw square
        fill(0);
        stroke(255);
        square(-nsize/2  , -nsize/2 , nsize);

        // Draw o
        stroke(255 , 0 , 0) ;
        fill(255 , 0 , 0);
        textSize(nsize);
        text('x' , 0 , nsize/9);
      }
      else if(Ultraboard.boards[j][i].state == -1){
        
        // Draw square
        fill(0);
        stroke(255);
        square(-nsize/2  , -nsize/2 , nsize);

        // Draw o
        stroke(0 , 0 , 255) ;
        fill(0 , 0 , 255);
        textSize(nsize);
        text('o' , 0 , nsize/9);        
      }

      // Show all the playable boards for each turn of the game

      if(Ultraboard.boards[j][i].active){
        noFill();
        stroke(0 , 255 , 0);
        square(-nsize/2 + 5  , -nsize/2 + 5 , nsize-10);
      }
      translate(-posX , -posY) ;
    }
  }
  // Get the size and cursor properly w.r.t the whole board
  let nsize = (200 - ((200/(3))/100*2));
  posX = (2) * 100 * 2 - 100;
  posY = (2) * 100 * 2 - 100 ;

  // Do the same for the whole board
  if(Ultraboard.state == 1){
    fill(0);
    stroke(255 , 0 , 0);
    square(0 , 0 , 600);

    stroke(255 , 0 , 0) ;
    fill(255 , 0 , 0);
    translate(posX , posY) ;
    textSize(300);
    text('x' , 0 , nsize/3);
    
    // Bottom text
    textSize(100);
    textAlign(CENTER);
    translate(-posX , -posY) ;
    text("Hehehaw won" , 200 , 700);
  }

  else if(Ultraboard.state == -1){
    fill(0);
    stroke(0 , 0 , 255);
    square(0 , 0 , 600);

    stroke(0 , 0 , 255) ;
    fill(0 , 0 , 255);
    translate(posX , posY) ;
    textSize(300);
    text('o' , 0 , nsize/3);

    // Bottom text
    textSize(100);
    textAlign(CENTER);
    text("Hohohaw won" , 0 , 700);
  }
}

// Create Player class (To-do: Add accounts system?)
let P1 = new Player("Hehehaw") ;
let P2 = new Player("Hohohaw") ;

let play = true ; 

// Setup the Ultraboard 
let Newboard = new UltraBoard() ;
Newboard.init();
Newboard.start();

let currplayer = 1 ; // currplayer: 1 - x ; -1 - y ;

if(play){
  // helper function to get the board where the player clicks
  function getcrtboard(){
    let r = floor((mouseY) / 200);
    let c = floor((mouseX) / 200);
    console.log("Coordinates of boards:" , r  , c);
  
    return Newboard.boards[r][c] ;
  }
  // helper function to get the square where the player clicks
  function getcursorsquare(){
    let sx = floor((mouseX) / 200) * 200 ;
    let sy = floor((mouseY) / 200) * 200 ;
    let nx = mouseX- sx ;
    let ny = mouseY - sy ;
    let r = floor(ny / (200/3));
    let c = floor(nx / (200/3));
    console.log("Coordinates of cells:" , r , c);
    return [r , c] ;
  
  }
  // function that checks if the click is a valid and move should be made or not
  function mousePressed(){

    // Out of bound conditions or the game is over already
    if(mouseX > 600 || mouseY > 600 || !play){
      return ;
    }

    else{
      let crtboard = getcrtboard();

      // Check if the board is active
      if(!crtboard.active){
        return ;
      }

      let crtsqr = getcursorsquare() ;

      // Check if the cell is active
      if(!crtboard.cells[crtsqr[0]][crtsqr[1]].active){
        return ;
      }

      // Play if both are active
      playmove(crtboard , crtsqr , Newboard);
    }
  }

  function swap(){
    console.log("Swapping turns");
    currplayer *= -1 ; // Swap player
  }

  function playmove(crtboard , crtsqr , ultra){

    crtboard.cells[crtsqr[0]][crtsqr[1]].play(currplayer) ; // Play the move in the cell

    let prev = currplayer // Store before swapping (Not really needed)
    swap(); // Swap turns

    // Check if the corresponding board is available
    if(ultra.boards[crtsqr[0]][crtsqr[1]].state != 0){
      // If not then activate all the possible boards (boards where the game isn't completed)
      console.log("All boards playable state")
      for(let i = 0 ; i < 3 ; ++i){
        for(let j = 0 ; j < 3 ; ++j){
          if(ultra.boards[i][j].state == 0){
            ultra.boards[i][j].activate(true);
          }
        }
      }
    }

    else{
      // Else deactivate all the other boards and activate only the corresponding board
      for(let i = 0 ; i < 3 ; ++i){
        for(let j = 0 ; j < 3 ; ++j){
          ultra.boards[i][j].activate(false);
        }
      }
      ultra.boards[crtsqr[0]][crtsqr[1]].activate(true);
      console.log("Playable board" , crtsqr[0] , crtsqr[1]);
    }

    // Check for the change in state of the board
    let change = crtboard.checkboard(prev) ;

    if(change){

      // If there is a change, then check for change in state of the Ultraboard
      ultra.checkstate(prev);

      let winner = ultra.checkwinner(); // Check if the game is finished

      if(winner[0]){

        // If yes, then end the game (To-do: Make a restart button which starts the game all over again)
        play = false ;
        // endgame(winner[1]);
      }

      // If no, continue playing
    }

    // Debug
    crtboard.print();
    crtboard.cells[crtsqr[0]][crtsqr[1]].print();
    ultra.print();
    console.log("play:" , play);
  }
}

// End game implementation failed terribly (Need to fix, need to add restart game)
// function endgame(winner){
//   // Newboard.init();
//   background(255) ;
//   strokeWeight(2);
//   stroke(0);
//   fill(0);
//   textSize(100);
//   textAlign(CENTER);
//   if(winner == 1){
//     text("Hehehaw won" , 300 , 250);
//   }
//   else if(winner == -1){
//     text("Hohohaw won" , 300 , 250);
//   }
//   else{
//     text("Drew" , 300 , 250);
//   }
//   textSize(20);
//   noStroke();
//   text("Click to restart", 300 , 350);
//   // setTimeout(function(){
//   //   play = true ;
//   // }, 1000);
// }

function draw() {

  // Rules , Title , Text and other utilities (Need to add more things as possible)
  background(30);
  textFont('Times New Roman');
  textSize(32);
  textAlign(CENTER);
  stroke(175);
  fill(255);
  let s = 'Nested TicTacToe' ;
  text(s , 800 , 20 , 600 , 800);

  drawboard(Newboard);
}



