var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var pacImage = new Image();
var ghostImage = new Image();

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
function pacman(){
    this.x = 240;
    this.y = 240;
    this.size = 20;
}
function ghos(){
    this.name = "ghost1";
    this.x = 400;
    this.y = 200;
    this.size = 20;
    this.d= 1;
    this.nd =0;
}
var pac;
var ghost1;
var ghost2;
var dotsLeft =1;


//0: up          1: down             2: left            3:right
function ghostCoordinates(ghost){
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
                ghostImage.src = "ghostup.png";
                break;
            case 1:
                ghost.y+=4;
                ghostImage.src = "ghostdown.png";
                break;
            case 2:
                ghost.x-=4;
                ghostImage.src = "ghostleft.png";
                break;
            case 3:
                ghost.x+=4;
                ghostImage.src = "ghostright.png";
                break;
        }
    }
}
//0: up          1: down             2: left            3:right
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
            pacImage.src = "pacup.png";            
            break;
        //down
        case 40:
            nextDirection = 1;
            pacImage.src = "pacdown.png";
            break;
        //left
        case 37:
            nextDirection = 2;
            pacImage.src = "pacleft.png";
            break;
        //right
        case 39:
            nextDirection = 3;
            pacImage.src = "pacright.png";
            break;   
    }
}
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
    pacImage.src = "pacup.png";
    ghost1 = new ghos();
    ghost2 = new ghos();
    ghost2.name = "ghost2";
    ghostImage.src = "ghostdown.png";
    ghost2.y=400;
    timeCheck=0;
    dotsLeft=1;
    clearInterval(interval);
    interval = setInterval(updateGame,20);
}
function updateGame(){
    clear();
    update();
    timeCheck++;
}
function clear(){
    context.clearRect(0,0,final_border_width,final_border_height);
}
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
    context.drawImage(pacImage,pac.x,pac.y,pac.size,pac.size);
    context.drawImage(ghostImage,ghost1.x,ghost1.y,ghost1.size,ghost1.size);
    context.drawImage(ghostImage,ghost2.x,ghost2.y,ghost2.size,ghost2.size);
   
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
function trapCheck(g){
    if(g.x>=220 && g.x<=260)
        if(g.y<=260 && g.y>=220)
            trap = true;
}
//0=dot, 1=wall, 2 = empty tile, 3 = ghost
function loseGame(){
    clearInterval(interval);
    alert("You've Lost. Try again by pressing space.");
}
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
function drawDots(a,b){
    context.fillStyle="white";
    context.beginPath();
    context.arc(a*20+10,b*20+10,3,0,2*Math.PI);
    context.fill();
}
function drawWalls(a,b){
    context.fillStyle = "blue";
    context.fillRect(a*20,b*20,20,20);
}
window.addEventListener("keydown", keyHandler,false);
window.onload = startImage;
function startImage(){
    var bg = new Image()
    bg.src = "start.png";
    bg.onload = function (){context.drawImage(bg,0,0);}
}