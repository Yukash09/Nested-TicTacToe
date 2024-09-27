function setup() {
  createCanvas(600, 800);
}

function drawboard(Ultraboard){
  for(let i = 0 ; i < 3 ; ++i){
    for(let j = 0 ; j < 3 ; ++j){
      posX = (Ultraboard.boards[i][j].row+1) * 100 * 2 - 100;
      posY = (Ultraboard.boards[i][j].col+1) * 100 * 2 - 100 ;
      translate(posX , posY) ;
      let nsize = (this.width/3 - ((this.width/(3))/100*2));
      textAlign(CENTER);
      textSize(nsize/3);
      stroke(200);
      noFill();
      square(-nsize/2  , -nsize/2 , nsize);
      for(let k = 1 ; k <= 2 ; ++k){
        stroke(100)
        line(-nsize/2   , -nsize/2 + k*nsize/3  , nsize/2  , -nsize/2 + k*nsize/3);
      }
      for(let k = 1 ; k <= 2 ; ++k){
        line(-nsize/2 + k* nsize/3  ,  -nsize/2   , -nsize/2+ k*nsize/3 , +nsize/2 );     
      }
      for(let k = 0 ; k < 3 ; ++k){
        for(let l = 0 ; l < 3 ; ++l){
          if(Ultraboard.boards[j][i].cells[k][l].state == 1){
            stroke(255 , 0 , 0);
            text('X' , -nsize/2 + (l*2 + 1) * nsize/6 , -nsize/2 + (k*2 + 1)* nsize/6 + nsize/9) ;
          }
          else if(Ultraboard.boards[j][i].cells[k][l].state == -1){
            stroke(0 , 255 , 0);
            text('O' , -nsize/2 + (l*2 + 1) * nsize/6  , -nsize/2 + (k*2 + 1)* nsize/6 + nsize/9) ;
          }  
          else{
            // stroke(0 , 255 , 0);
            // text('0', -nsize/2 + (l*2 + 1) * nsize/6  , -nsize/2 + (k*2 + 1)* nsize/6 + nsize/9);
          }          
        }
      } 
      translate(-posX , -posY) ;
    }
  }
}



let P1 = new Player("Hehehaw") ;
let P2 = new Player("Hohohaw") ;
let play = true ;
let Newboard = new UltraBoard() ;
Newboard.init();
Newboard.start();
let currplayer = 1 ;

function getcrtboard(){
  let r = floor((mouseY) / 200);
  let c = floor((mouseX) / 200);
  console.log("Coordinates of boards:" , r  , c);

  return Newboard.boards[r][c] ;
}

function getcursorsquare(){
  let sx = floor((mouseX) / 200) * 200 ;
  let sy = floor((mouseY) / 200) * 200 ;
  let nx = mouseX - sx ;
  let ny = mouseY - sy ;
  let r = floor(ny / (200/3));
  let c = floor(nx / (200/3));
  console.log("Coordinates of cells:" , r , c);
  return [r , c] ;

}

function mousePressed(){
  if(mouseX > 600 || mouseY > 600){
    return ;
  }
  else{
    let crtboard = getcrtboard();
    if(!crtboard.active){
      return ;
    }
    let crtsqr = getcursorsquare() ;
    if(!crtboard.cells[crtsqr[0]][crtsqr[1]].active){
      return ;
    }
    playmove(crtboard , crtsqr , Newboard);
  }
}
function swap(){
  console.log("Swapping turns");
    currplayer *= -1 ;
}
function playmove(crtboard , crtsqr , ultra){
  crtboard.cells[crtsqr[0]][crtsqr[1]].play(currplayer) ;
  let prev = currplayer
  swap();
  if(ultra.boards[crtsqr[0]][crtsqr[1]].state != 0){
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
    for(let i = 0 ; i < 3 ; ++i){
      for(let j = 0 ; j < 3 ; ++j){
        ultra.boards[i][j].activate(false);
      }
    }
    ultra.boards[crtsqr[0]][crtsqr[1]].activate(true);
    console.log("Playable board" , crtsqr[0] , crtsqr[1]);
  }
  let change = crtboard.checkboard(prev) ;
  if(change){
    ultra.checkstate(prev);
    let winner = ultra.checkwinner();
    if(winner[0]){
      play = false ;
      endgame(winner[1]);
    }
  }
  crtboard.print();
  crtboard.cells[crtsqr[0]][crtsqr[1]].print();
  ultra.print();
}

function endgame(winner){
  Newboard.init();
  background(255) ;
  strokeWeight(2);
  stroke(0);
  fill(0);
  textSize(100);
  textAlign(CENTER);
  if(winner == 1){
    text("Hehehaw won" , 300 , 250);
  }
  else if(winner == -1){
    text("Hohohaw won" , 300 , 250);
  }
  else{
    text("Drew" , 300 , 250);
  }
  textSize(20);
  noStroke();
  text("Click to restart", 300 , 350);
  setTimeout(function(){
    play = true ;
  }, 1000);
}

function draw() {
  background(30);
  textSize(16);
  textAlign(CENTER);
  stroke(175);
  fill(255);
  let s = 'Welcome to 3D-Tictactoe shut up and play' ;
  text(s , 1000 , 70 , 600 , 800);
  drawboard(Newboard);
}



