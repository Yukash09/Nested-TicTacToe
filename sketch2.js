let turnBox; // Declare turnBox at the top with other global variables

function setup(){
    createCanvas(1525 , 800) ;
    // Create and style reset button
    resetButton = createButton('Reset Game');
    resetButton.position(1200 , 375); // Position it to the side of the board
    resetButton.style('background-color', '#FF5733'); // Change to a vibrant color
    resetButton.style('border', '2px solid #C70039'); // Add a border
    resetButton.style('color', 'white');
    resetButton.style('padding', '15px 30px');
    resetButton.style('text-align', 'center');
    resetButton.style('text-decoration', 'none');
    resetButton.style('display', 'inline-block');
    resetButton.style('font-size', '18px'); // Slightly larger font size
    resetButton.style('margin', '10px 2px');
    resetButton.style('cursor', 'pointer');
    resetButton.style('border-radius', '8px'); // More rounded corners
    resetButton.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)'); // Add shadow for depth
    resetButton.mousePressed(resetGame);

    // Create and style turn indicator box
    createTurnIndicator();
}

function createTurnIndicator() {
    turnBox = createDiv('');
    turnBox.position(1200, 200); // Position above reset button
    turnBox.size(200, 80);
    turnBox.style('background-color', '#2C3E50');
    turnBox.style('border', '3px solid #34495E');
    turnBox.style('border-radius', '10px');
    turnBox.style('color', 'white');
    turnBox.style('padding', '10px');
    turnBox.style('text-align', 'center');
    turnBox.style('font-family', 'Arial, sans-serif');
    turnBox.style('font-size', '20px');
    turnBox.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
}

function updateTurnIndicator() {
    if (!play || (Newboard.state !== 0 && Newboard.state !== 2)) { // Game is over
        let winner = Newboard.state === 1 ? 'X' : 'O';
        let color = Newboard.state === 1 ? '#FF5733' : '#3498DB';
        let turnText = `Game Over!<br><strong>${winner} Wins!</strong>`;
        turnBox.html(turnText);
        turnBox.style('border-left', `10px solid ${color}`);
    } else if (Newboard.state == 2) {
        turnBox.html("Game Over!<br><strong>Draw!</strong>");
        turnBox.style('border-left', '10px solid #FFD700'); // Gold color for draw
    } else {
        let player = currplayer === 1 ? 'X' : 'O';
        let color = currplayer === 1 ? '#FF5733' : '#3498DB';
        let turnText = `Current Turn:<br><strong>${player}</strong>`;
        turnBox.html(turnText);
        turnBox.style('border-left', `10px solid ${color}`);
    }
}

// let font = 'Times New Roman' ;
function draw(){
    background(30);
    //translate(-400 , 0);
    textFont('Times New Roman');
    textSize(32);
    textAlign(CENTER) ;
    stroke(175) ;
    fill(255);
    let s = 'Nested TicTacToe';
    text(s , 475 , 20 , 600 , 800);
    drawboard(Newboard);
    
    // Update turn indicator
    updateTurnIndicator();
}

function drawboard(Ultraboard){
    //translate(100 , 0);
    stroke(300) ; fill(0) ;
    // point(150 , 50);
    let x1 = 500 ; 
    let y1 = 80 ;
    let x2 = 1040 ;
    let y2 = 80 ;
    strokeWeight(5);
    line(x1 , y1 , x2 , y2);
    for(let i = 1 ; i < 10 ; ++i){
        if(i%3 == 0){
            strokeWeight(5);
        }
        else{
            strokeWeight(2);
        }
        line(x1 , y1+(i*60) , x2 , y2+(i*60));       
    }
    x1 = 500 ;
    y1 = 80 ;
    x2 = 500 ;
    y1 = 620 ;
    line(x1 , y1 , x2 , y2);
    for(let j = 1 ; j < 10 ; ++j){
        if(j%3 == 0){
            strokeWeight(5);
        }
        else{
            strokeWeight(2);
        }
        line(x1+(j*60) , y1 , x2+(j*60) , y2);
    }


    for(let i = 0 ; i < 3 ; ++i){
        for(let j = 0 ; j < 3 ; ++j){
            for(let k = 0 ; k < 3 ; ++k){
                for(let l = 0 ; l < 3 ; ++l){
                    // Draw x or o based on the change in state of each cell

                    //if(i == 0 & j == 0 & k== 0 && l == 0)
                    //console.log("State: " , Ultraboard.boards[i][j].cells[k][l].state , i , j , k , l);
                    if(Ultraboard.boards[i][j].cells[k][l].state == 1){
                        //textFont(font);
                        strokeWeight(2);
                        stroke(255 , 0 , 0) ;
                        fill(255 , 0 , 0) ;
                        textSize(40);
                        let x_ = 500 + 3*i*60 + k*60 ;
                        let y_ = 80 + 3*j*60 + l*60 ;

                        //console.log("here"); ;
                        text('x' , x_ + 30, y_ + 40 ) ;
                    }
                    else if(Ultraboard.boards[i][j].cells[k][l].state == -1){
                        //textFont(font);
                        strokeWeight(2);
                        stroke(0 , 0 , 255) ;
                        fill(0 , 0 , 255) ;
                        textSize(40);
                        let x_ = 500 + 3*i*60 + k*60 ;
                        let y_ = 80 + 3*j*60 + l*60 ;
                        text('o' , x_ + 30 , y_ + 40);
                    }
                }
            }
             // If a board is completed , Fill with bigger x or o correspondingly
            if(Ultraboard.boards[i][j].state == 1){

                // Draw square
                fill(0) ;
                stroke(255) ;
                let x_ = 500 + 3*i*60 ;
                let y_ = 80 + 3*j*60 ;
                square(x_ , y_ , 180);

                // Draw x
                stroke(255 , 0 , 0) ;
                fill(255 , 0 , 0) ;
                textSize(120) ;
                text('x' , x_+90 , y_+120) ;
            }

            else if(Ultraboard.boards[i][j].state == -1){

                // Draw square
                fill(0) ;
                stroke(255) ;
                let x_ = 500 + 3*i*60 ;
                let y_ = 80 + 3*j*60 ;
                square(x_ , y_ , 180);

                // Draw o
                stroke(0 , 0 , 255) ;
                fill(0 , 0 , 255) ;
                textSize(120) ;
                text('o' , x_+90 , y_+120) ;
            }

            else if(Ultraboard.boards[i][j].state == 2){

                // Draw square
                fill(0) ;
                stroke(255) ;
                let x_ = 500 + 3*i*60 ;
                let y_ = 80 + 3*j*60 ;
                square(x_ , y_ , 180);

                // Draw o
                stroke(0 , 255 , 0) ;
                fill(0 , 255 , 0) ;
                textSize(120) ;
                text('-' , x_+90 , y_+120) ;
            }

            if(Ultraboard.boards[i][j].active){
                noFill() ;
                stroke(0 , 255 , 0);
                strokeWeight(1);
                let x_ = 500 + 3*i*60 ;
                let y_ = 80 + 3*j*60 ;
                square(x_ + 5 , y_+ 5 , 170);
            }
        }
    }
    if(Ultraboard.state == 1){
        fill(0) ;
        stroke(255 , 0 , 0) ;
        square(500 , 80 , 540);

        stroke(255 , 0 , 0) ;
        fill(255 , 0 , 0 );
        text('x' , 500 + 270 , 80 + 360);

        textSize(100) ;
        textAlign(CENTER);
        text("X won" , 500+300 , 720);
    }

    else if(Ultraboard.state == -1){
        fill(0) ;
        stroke(0 , 0 , 255) ;
        square(500 , 80 , 540);

        stroke(0 , 0 , 255) ;
        fill(0 , 0 , 255 );
        text('x' , 500 + 300 , 80 + 400);

        textSize(100) ;
        textAlign(CENTER);
        text("O won" , 500+300 , 720);
    }

    else if(Ultraboard.state == 2){
        fill(0) ;
        stroke(0 , 255 , 0) ;
        square(500 , 80 , 540);

        stroke(0 , 255 , 0) ;
        fill(0 , 255 , 0 );
        text('-' , 500 + 300 , 80 + 400);

        textSize(100) ;
        textAlign(CENTER);
        text("Draw " , 500+300 , 720);
    }
    //textSize(40);
    strokeWeight(0) ;
    // getcrtboard();
}
let currplayer = 1 ;
function getcursorsquare(){
    let sx = floor((mouseX - 500)/60) ;
    let sy = floor((mouseY - 80)/60) ;
    console.log("Coordinates of cells: " , sx , sy);
    return [sx , sy];
}
function getcrtboard(){
    coords = getcursorsquare() ;
    let sx = floor(coords[0]/3) ;
    let sy = floor(coords[1]/3) ;
    console.log("Coordinates of boards: " , sx , sy);
    return [sx , sy];
}
play = true ;
let Newboard = new UltraBoard() ;
Newboard.init() ;
Newboard.start();
function mousePressed(){
    coords = getcrtboard() ;
    let x1 = coords[0] ;
    let y1 = coords[1] ;
    if(x1 < 0 || y1 < 0 || x1 > 8 || y1 > 8 || !play){
        console.log("Outside board or game is over");
        return ;
    }
    else{
        crtboard = Newboard.boards[x1][y1] ;
        if(!crtboard.active){
            console.log("Inactive board");
            return ;
        }
        else{
            let crtsqr = getcursorsquare();
            crtsqr[0] = crtsqr[0]%3 ;
            crtsqr[1] = crtsqr[1]%3 ;
            if(!crtboard.cells[crtsqr[0]][crtsqr[1]].active){
                console.log("Inactive cell")
                return ;
            }
            playmove(crtboard , crtsqr , Newboard) ;
        }
    }
}
function swap(){
    currplayer *= -1 ;
}

function playmove(crtboard , crtsqr , ultra){
    crtboard.cells[crtsqr[0]][crtsqr[1]].play(currplayer) ;

    let prev = currplayer ;
    swap();
    let change = crtboard.checkboard(prev) ;
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


    if(change){

      // If there is a change, then check for change in state of the Ultraboard
      let wholechange = ultra.checkstate(prev);

      // let winner = ultra.checkwinner(); // Check if the game is finished

      if(wholechange){

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

// Add new reset function
function resetGame() {
    Newboard = new UltraBoard();
    Newboard.init();
    Newboard.start();
    currplayer = 1;
    play = true;
    updateTurnIndicator(); // Update indicator after reset
}

