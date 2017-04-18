var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var interval;
var interval2;
var tileSize = 40;
var sx =1; 
var sy=2;
var ex=5;
var ey=2;
var steps =0;
var finArr = [];
var start;
var big = true;
var end;
var h1 = true;
var h2 = false;
var h3 = false;
var h4 = false;
var complete = false;
var animSpeed = 1000;
var neighborFullList = [];
var grid = [
        ['e','e','e','e','e','e','e'],
        ['e','e','e','e','e','e','e'],
        ['e','e','e','e','e','e','e'],
        ['e','o','o','o','e','e','e'],
        ['e','e','e','e','e','e','e'],
        ['e','e','e','e','e','e','e'],
        ['e','e','e','e','e','e','e']
    ];
var tileCount=0;
var tileCount2=0;
function drawTiles2(){
    var i = tileCount2;            
        //console.log(neighborFullList.length-1);
        if (i<neighborFullList.length){
            var t =neighborFullList[i];
            //console.log(neighborFullList[i]);
            for(var j=0;j<t.length;j++){
                if (t[j].x == ex && t[j].y == ey || (t[j].x == sx && t[j].y == sy)) {
                   //console.log("t");
                   
                }else{
                     var tx = t[j].x;
                    var ty = t[j].y;
                    context.fillStyle="blue";
                    context.fillRect(tx*tileSize,ty*tileSize,tileSize,tileSize);
                     if(big){
                    context.fillStyle="white";
                    context.font= "10px Arial";
                    var tf = t[j].f;
                    var tg = t[j].g;
                    var th = t[j].h;
                    context.fillText("f:"+tf,tx*tileSize+10,ty*tileSize+10);
                    context.fillText("g:"+tg,tx*tileSize+10,ty*tileSize+25);
                    context.fillText("h:"+th,tx*tileSize+10,ty*tileSize+40);
                     }
                }

            }//end for
        }else{
            complete = true;
            clearInterval(interval2);
        }
        tileCount2++;
}
function refresh(){
        complete = false;
        tileCount=0;
        tileCount2=0;
        neighborFullList = [];
        clearInterval(interval);
        clearInterval(interval2);
        steps=0;
        
        startGame();
}
function startGame(){
    drawBoard();
    startEnd();
    interval2 = setInterval(drawTiles2,animSpeed*.5);
    interval = setInterval(drawTiles,animSpeed);

    document.getElementById("stat").innerHTML = "Final Length: "+finArr.length+" Steps:"+steps;
    document.getElementById("submit").onclick = function (){
        grid=[];
        complete = false;
        tileCount=0;
        tileCount2=0;
        steps=0;
        neighborFullList = [];
        var t = document.getElementById("grid").value;
        parse(t);
        clearInterval(interval);
        clearInterval(interval2);
        var tf = true;
        var tf2 = true;
        for(var a =0; a< grid.length; a++){
            for(var b =0; b< grid[a].length; b++){
                if (grid[a][b]=="g")
                    tf = false;
                if (grid[a][b]=="s")
                    tf2 = false;    
            }
        }
        if(tf){
            ex = Math.round(Math.random()*(grid.length-1));
            ey = Math.round(Math.random()*(grid[0].length-1));
            while(grid[ex][ey]=="o"){
                 ex = Math.round(Math.random()*(grid.length-1));
                ey = Math.round(Math.random()*(grid[0].length-1));
            }
        }
        if(tf2){
            sx = Math.round(Math.random()*(grid.length-1));
            sy = Math.round(Math.random()*(grid[0].length-1));
             while(grid[sx][sy]=="o" && (sx!=ex && sy!=ey)){
                sx = Math.round(Math.random()*(grid.length-1));
                sy = Math.round(Math.random()*(grid[0].length-1));
            }
        }
        startGame();
        
    }
    document.getElementById("speedup").onclick = function (){
        animSpeed-=250;
        if(animSpeed<2){
            animSpeed = 20;
        }
    }
     document.getElementById("slowdown").onclick = function (){
         animSpeed+=250;
    }
     document.getElementById("h1").onclick = function (){
         h1 = true;
         h2 = false;
         h3 = false;
         h4 = false;
         refresh();
     }
     document.getElementById("h2").onclick = function (){
         h1 = false;
         h2 = true;
         h3 = false;
         h4 = false;
         refresh();
     }
     document.getElementById("h3").onclick = function (){
         h1 = false;
         h2 = false;
         h3 = true;
         h4 = false;
         refresh();
     }
     document.getElementById("h4").onclick = function (){
         h1 = false;
         h2 = false;
         h3 = false;
         h4 = true;
         refresh();
     }
}
function parse(info){
    var t=[];
    info = info.split("\n");
    for(var i=0; i<info.length;i++){
       t =info[i].split(" ");
       grid.push(t);
    }
}

function drawTiles(){ 
        if(complete){
        var i = tileCount;            
        
        if (i<finArr.length-1){
         
            context.fillStyle="yellow";
            context.fillRect(finArr[i].x*tileSize,finArr[i].y*tileSize,tileSize,tileSize);
            if(big){
            context.fillStyle="red";
            context.font= "10px Arial";
            context.fillText("f:"+finArr[i].f,finArr[i].x*tileSize+10,finArr[i].y*tileSize+10);
            context.fillStyle="black";
            context.fillText("g:"+finArr[i].g,finArr[i].x*tileSize+10,finArr[i].y*tileSize+25);
            context.fillText("h:"+finArr[i].h,finArr[i].x*tileSize+10,finArr[i].y*tileSize+40);
            }
        }else{
            clearInterval(interval);
        }
        tileCount++;
        }
}
function node (x,y){
    this.parent = null;;
    this.x=x;
    this.y=y;
    this.f=0;
    this.g=0;
    this.h=0;
}
function drawBoard(){
   
    context.fillStyle="white";
    context.fillRect(0,0,5000,5000);
    context.fillStyle="black";
    if(grid.length>40 || grid[0].length>40){
        big = false;
        tileSize = 5;
    }
    for(var a =0; a< grid.length; a++){
        for(var b =0; b< grid[a].length; b++){
            if(grid[a][b]=="g"){
                ex=a;
                ey=b;
            }
            if(grid[a][b]=="s"){
                sx=a;
                sy=b;
            }
            if(grid[a][b]=="o")
                context.fillRect(a*tileSize,b*tileSize,tileSize,tileSize);
            else    {
                context.beginPath();
                context.rect(a*tileSize,b*tileSize,tileSize,tileSize);
                context.stroke();
            }
        }
    }
}
function startEnd(){

    
    context.fillStyle="red";
    context.fillRect(ex*tileSize,ey*tileSize,tileSize,tileSize);
    context.fillStyle="green";
    context.fillRect(sx*tileSize,sy*tileSize,tileSize,tileSize);
    start = new node(sx,sy);
    end = new node(ex,ey);
    
    astar(start,end);
}
function astar(start,end){
    var open = [];
    var closed = [];
    open.push(start);
    var lowestf;
    var neighbors=[];
    var found = false;
    while(open.length!=0){
        var low = 900000;
        steps++;
        var index;
        for(var i=0;i<open.length;i++){
            if (open[i].f < low){
                lowestf = open[i];
                index = i;
                low = open[i].f
            }
        }
        open.splice(index,1);
        neighbors = generate(lowestf);
        
        //console.log(neighbors);    
        neighborFullList.push(neighbors);    
        for (var x=0;x<neighbors.length;x++){
            //context.fillStyle="blue";
            //context.fillRect(neighbors[x].x*tileSize,neighbors[x].y*tileSize,tileSize,tileSize);
            neighbors[x].parent = lowestf;
            neighbors[x].g=lowestf.g + mdis(neighbors[x],lowestf);
            neighbors[x].h = mdis(end,neighbors[x]);
            neighbors[x].f = neighbors[x].g + neighbors[x].h;
            if(neighbors[x].x==end.x && neighbors[x].y == end.y){
                found=true;
                open.push(neighbors[x]);
                end.parent = neighbors[x].parent;
                break;
            }
            var skip = true;
            for(var j=0; j<open.length;j++){
                if (open[j].x==neighbors[x].x && open[j].y==neighbors[x].y && open[j].f <=neighbors[x].f ){
                    skip = false;
                    //console.log("false1");
                }
            }
            for(var j=0; j<closed.length;j++){
                if (closed[j].x==neighbors[x].x && closed[j].y==neighbors[x].y && closed[j].f <=neighbors[x].f ){
                    skip = false;
                    //console.log("false2");

                }
            }
            if (skip){
                open.push(neighbors[x]);
            }
        }
        closed.push(lowestf);
        if(found){
            closed.push(end);
            break;
        }
       
        
   }
    var final=end;
    finArr = [];
    while(final.parent!=null){
        finArr.push(final);
        final = final.parent;
    }
    finArr.reverse();
    return finArr;
}
function mdis(node1, node2){
    var x = Math.abs(node1.x - node2.x )*10;
    var y = Math.abs(node1.y - node2.y)*10;
    if(x==y){
        if(h1)
            return x+y*.4;
        if(h2)
            return (x+y)*.4;
        if(h3)
            return x+y;
        if(h4)
            return (x+y)*1.5;
    }

    return x+y;
}
function generate(lowestf){
    var successorList=[];
    var x = lowestf.x;
    var y = lowestf.y;
   //console.log(x+"   "+y);
    if(grid[x] && (grid[x][y-1]=='e' || grid[x][y-1]=='g'  ))
        successorList.push(new node(x,y-1));
    if(grid[x-1] && (grid[x-1][y]=='e' || grid[x-1][y]=='g' ))
        successorList.push(new node(x-1,y));
    if(grid[x+1] && (grid[x+1][y]=='e' || grid[x+1][y]=='g'  ))
        successorList.push(new node(x+1,y));
    if(grid[x] && (grid[x][y+1]=='e' || grid[x][y+1]=='g'  ))
        successorList.push(new node(x,y+1));
    

    //diagonal
     if(grid[x-1] && (grid[x-1][y-1]=='e' || grid[x-1][y-1]=='g'  ))
        successorList.push(new node(x-1,y-1));
    if(grid[x-1] && (grid[x-1][y+1]=='e' || grid[x-1][y+1]=='g'  ))
        successorList.push(new node(x-1,y+1));
    if(grid[x+1] && (grid[x+1][y+1]=='e'|| grid[x+1][y+1]=='g'  ))
        successorList.push(new node(x+1,y+1));
    if(grid[x+1] && (grid[x+1][y-1]=='e'|| grid[x+1][y-1]=='g'  ))
        successorList.push(new node(x+1,y-1));


    return successorList;
}
window.onload = startGame;