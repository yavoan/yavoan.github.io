var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var pacImage = new Image();
pacImage.src = "pacsheet.png";
var ghostImage = new Image();
ghostImage.src= "ghostsheet.png";
var score;
var interval;
//final sizes
var final_border_height = 500;
var final_border_width = 500;
var timeCheck;
//direction is 0 for up 1 for down 2 for left 3 for right
var nextDirection;
var direction;
var trap;
//0 = dot, 1 = wall;    25x25
var board = [];
//The pacman object. Contains his location and size. Offset is the offset for the sprite sheet.
function pacman(){
    this.x = 240;
    this.y = 240;
    this.size = 20;
    this.offset = 0;
}
//The ghost object. Contains their location and size. Offset is the offset for the sprite sheet.
//d and nd are direction and next direction. This is just to keep track of their directions.
function ghos(){
    this.name = "ghost1";
    this.x = 400;
    this.y = 200;
    this.size = 20;
    this.d= 1;
    this.nd =0;
    this.offset =0;
}
var pac;
var ghost1;
var ghost2;
var dotsLeft =1;


//0: up          1: down             2: left            3:right
//This function basically checks the time and moves the ghosts and updates their sprite sheet offset.
function ghostCoordinates(ghost){
    //Have this statement to make sure the ghost uses the proper direction function
    if(ghost.name=="ghost1")
        ghostDirection(ghost);
    else
        ghost2Direction(ghost);
    if(timeCheck%10==0)
        ghost.d = ghost.nd;
    if(timeCheck%2==0){
        switch (ghost.d){
            case 0:
                ghost.y-=4;
                ghost.offset =1; 
                break;
            case 1:
                ghost.y+=4;
                ghost.offset = 0;
                break;
            case 2:
                ghost.x-=4;
                ghost.offset = 2;
                break;
            case 3:
                ghost.x+=4;
                ghost.offset = 3;
                break;
        }
    }
}
//0: up          1: down             2: left            3:right
//This function is calculating the best direction to go to get pacman.
//If there is no best path it chooses one at random.
//This direction function calculates based on pacmans exact location.
function ghostDirection(ghost){
    var options = canMove(ghost);
    if(options.length==1){
        ghost.nd = options[0];
    }
    var badcount=0;
    var dis = Math.sqrt(  Math.pow(ghost.x-pac.x,2) + Math.pow(ghost.y-pac.y,2)  );
    for (var i=0;i<options.length;i++){
        if(options[i]==0){
            temp = Math.sqrt(  Math.pow(ghost.x-pac.x,2) + Math.pow(ghost.y-20-pac.y,2)  );
        }
        if(options[i]==1){
            temp = Math.sqrt(  Math.pow(ghost.x-pac.x,2) + Math.pow(ghost.y+20-pac.y,2)  );
        }
        if(options[i]==2){
            temp = Math.sqrt(  Math.pow(ghost.x-20-pac.x,2) + Math.pow(ghost.y-pac.y,2)  );
        }
        if(options[i]==3){
            temp = Math.sqrt(  Math.pow(ghost.x+20-pac.x,2) + Math.pow(ghost.y-pac.y,2)  );
        }
        if (temp<=dis)
            ghost.nd = options[i];
        else
            badcount++;
    }
    if (badcount==options.length){
        var r = Math.round(Math.random()*options.length);
        ghost.nd = options[r];
    }
}
//This function is calculating the best direction to go to get pacman.
//If there is no best path it chooses one at random.
//This function calculates based on pacmans location +1 tile.
function ghost2Direction(ghost){
    var options = canMove(ghost);
    if(options.length==1){
        ghost.nd = options[0];
    }
    var badcount=0;
    var dis = Math.sqrt(  Math.pow(ghost.x-pac.x,2) + Math.pow(ghost.y-pac.y,2)  );
    for (var i=0;i<options.length;i++){
        if(options[i]==0){
            temp = Math.sqrt(  Math.pow(ghost.x-pac.x,2) + Math.pow(ghost.y-40-pac.y,2)  );
        }
        if(options[i]==1){
            temp = Math.sqrt(  Math.pow(ghost.x-pac.x,2) + Math.pow(ghost.y+40-pac.y,2)  );
        }
        if(options[i]==2){
            temp = Math.sqrt(  Math.pow(ghost.x-40-pac.x,2) + Math.pow(ghost.y-pac.y,2)  );
        }
        if(options[i]==3){
            temp = Math.sqrt(  Math.pow(ghost.x+40-pac.x,2) + Math.pow(ghost.y-pac.y,2)  );
        }
        if (temp<=dis)
            ghost.nd = options[i];
        else
            badcount++;
    }
    if (badcount==options.length){
        var r = Math.round(Math.random()*options.length);
        ghost.nd = options[r];
    }
}
//This is making sure that the ghosts can move by seeing if there are walls around them.
//In addition it returns a array that holds the possible moves for the ghost parameter.
function canMove(g){
    bxright = Math.floor(g.x/20);
    bydown = Math.floor(g.y/20);
    bxleft = Math.ceil(g.x/20);
    byup = Math.ceil(g.y/20);
    var options = [0,1,2,3];
    switch (g.d){
        case 0:
            options.splice(1,1);
            break;
        case 1:
            options.splice(0,1);
            break;
        case 2:
            options.splice(3,1);
            break;
        case 3:
            options.splice(2,1);
            break;
    }
    if(board[bxright+1][bydown]==1 || board[bxright+1][byup]==1)
        options.splice(options.indexOf(3),1);
    if(board[bxleft-1][byup]==1 || board[bxleft-1][bydown]==1)
        options.splice(options.indexOf(2),1);

    if(board[bxleft][byup-1]==1 || board[bxright][byup-1]==1 )
        options.splice(options.indexOf(0),1);
    if(board[bxleft][byup+1]==1 || board[bxright][byup+1]==1 )
        options.splice(options.indexOf(1),1);
    return options;

}
//Handling input.
//Controls arrow keys and space bar.
function keyHandler(e){
    switch (e.keyCode){
        //spacebar
        case 32:
            score=0;
            startGame();
            break;
        //up
        case 38:
            nextDirection = 0;
            pac.offset = 3;            
            break;
        //down
        case 40:
            nextDirection = 1;
            pac.offset = 1; 
            break;
        //left
        case 37:
            nextDirection = 2;
            pac.offset = 0; 
            break;
        //right
        case 39:
            nextDirection = 3;
            pac.offset = 2; 
            break;   
    }
}
//Checking for the dot and updating the game board.When trap is true it activates the +1 tile radius
function checkDot(bx,by){
    if(board[bx][by]==0){
        board[bx][by]=3;
        score+=10;
    }
    if(trap){
        if (board[bx+1][by+1]==0){
            board[bx+1][by+1]=3;
            score+=10;
        }
        if (board[bx+1][by]==0){
            board[bx+1][by]=3;
            score+=10;
        }
        if (board[bx+1][by-1]==0){
            board[bx+1][by-1]=3;
            score+=10;
        }
        if (board[bx][by-1]==0){
            board[bx][by-1]=3;
            score+=10;
        }
        if (board[bx][by+1]==0){
            board[bx][by+1]=3;
            score+=10;
        }
         if (board[bx-1][by-1]==0){
            board[bx-1][by-1]=3;
            score+=10;
        }
         if (board[bx-1][by]==0){
            board[bx-1][by]=3;
            score+=10;
        }
         if (board[bx-1][by+1]==0){
            board[bx-1][by+1]=3;
            score+=10;
        }
    }
}
//Pacman is moving 4 pixels for every frame. 50 FPS
//board[bx][by] ==1 means there is a wall there
//Updates pacmans coordinates based on user input.
function updateCoordinates(){
    //bx & by are the board array coordinates because grid is 500x500 pixels
    //but the array is 25x25 
    var bx = Math.floor(pac.x/20);
    var by = Math.floor(pac.y/20);
    var byup = Math.ceil(pac.y/20);
    var bxleft = Math.ceil(pac.x/20);
    var z = timeCheck%5;
    if (z==0){
        if (nextDirection!=direction){
            direction = nextDirection;
        }
    }
    //up
    if (direction==0 && board[bxleft][byup-1]!=1){
        checkDot(bxleft,byup);
        pac.y-=4;
    }
    //down
    if(direction==1 && board[bx][by+1]!=1){
        checkDot(bx,by);
        pac.y+=4;
    }
    //left
    if (direction==2 && board[bxleft-1][byup]!=1){
        checkDot(bxleft,byup);
        pac.x-=4;
    }
    //right
    if(direction==3 && board[bx+1][by]!=1 ){
        checkDot(bx,by);
        pac.x+=4;
    }
    
}
//The init function. Basically clears all variables and gets the game ready to start.
function startGame(){
    //0 = dot, 1 = wall;    25x25
    board = [ 
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,1,0,0,1,0,0,1,1,1,0,0,0,0,1,0,1],
    [1,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,1,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,1,0,0,0,1,0,1,0,1],
    [1,0,1,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1],
    [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1,3,3,3,1,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,1,1,0,0,3,3,3,3,1,0,0,0,0,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,1,3,3,3,1,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1],
    [1,0,1,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,1,0,0,0,1,0,1,0,1],
    [1,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,1,0,0,0,0,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,1,0,0,1,0,0,1,1,1,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
    nextDirection=0;
    direction=0;
    score = 0;
    trap = false;
    pac = new pacman();
    pac.offset = 3; 
    ghost1 = new ghos();
    ghost2 = new ghos();
    ghost2.name = "ghost2";
    //ghostImage.src = "ghostdown.png";
    ghost2.y=400;
    timeCheck=0;
    dotsLeft=1;
    clearInterval(interval);
    interval = setInterval(update,20);
}
//The interval function that keeps the game running at ~60fps.
function updateGame(){
    clear();
    update();
    timeCheck++;
}
//Clears the board so there aren't leftover sprites on the board.
function clear(){
    context.clearRect(0,0,final_border_width,final_border_height);
}
//Main function that calls everything.
//It draws the board sees if youve won. 
//calls all the coordinate function and draws the sprites.
//It also checks to see if pacman has run into a ghost.
function update(){
    drawBoard();
      if (dotsLeft==0 && trap==true){
        clearInterval(interval);
        score+=100;
        alert("You've won the Game!");
    }
    updateCoordinates();
    ghostCoordinates(ghost1);
    ghostCoordinates(ghost2);
    context.drawImage(pacImage,300*pac.offset,0,300,300,pac.x,pac.y,pac.size,pac.size);
    context.drawImage(ghostImage,457*ghost1.offset,0,457,457,ghost1.x,ghost1.y,ghost1.size,ghost1.size);
    context.drawImage(ghostImage,457*ghost2.offset,0,457,457,ghost2.x,ghost2.y,ghost2.size,ghost2.size);
   
    //if(ghost1.x == pac.x && ghost1.y == pac.y)
    if(ghost1.x<pac.x+5 && ghost1.x>pac.x-5)
        if(ghost1.y<pac.y+5 && ghost1.y>pac.y-5)
         loseGame();
    //if(ghost2.x == pac.x && ghost2.y == pac.y)
    if(ghost2.x<pac.x+5 && ghost2.x>pac.x-5)
        if(ghost2.y<pac.y+5 && ghost2.y>pac.y-5)
            loseGame();
    trapCheck(ghost1);
    trapCheck(ghost2);
    document.getElementById("score").innerHTML = "Score: "+score;
}
//This is to see if the ghosts have fallen into the trap.
function trapCheck(g){
    if(g.x>=220 && g.x<=260)
        if(g.y<=260 && g.y>=220)
            trap = true;
}
//0=dot, 1=wall, 2 = empty tile, 3 = ghost
//Lose game alert also stops the interval.
function loseGame(){
    clearInterval(interval);
    alert("You've Lost. Try again by pressing space.");
}
//Draws the walls of the board.
function drawBoard(){
    context.fillStyle="black";
    context.fillRect(0,0,500,500);
    dotsLeft=0;
    for(a=0;a<25;a++){
        for (b=0;b<25;b++){
            if (board[a][b]==0){
                drawDots(a,b);
                dotsLeft++;
            }
            if(board[a][b]==1){
                drawWalls(a,b);
            }
        }
    }
}
//Draws the dots of the board.
function drawDots(a,b){
    context.fillStyle="white";
    context.beginPath();
    context.arc(a*20+10,b*20+10,3,0,2*Math.PI);
    context.fill();
}
//Draws the walls.
function drawWalls(a,b){
    context.fillStyle = "blue";
    context.fillRect(a*20,b*20,20,20);
}
//Listener for the keyboard input.
window.addEventListener("keydown", keyHandler,false);
//This is the start image so that the user has something to look at before the game.
window.onload = startImage;
function startImage(){
    var bg = new Image()
    bg.src = "start.png";
    bg.onload = function (){context.drawImage(bg,0,0);}
}
