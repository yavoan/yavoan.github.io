var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var interval;
var sx =0;
var sy=0;
var ex=0;
var ey=0;
var finArr = [];
var start;
var end;
var neighborFullList = [];
var grid = [
        ['e','e','e','e','e','e','e'],
        ['e','e','e','e','e','e','e'],
        ['e','e','e','e','e','e','e'],
        ['e','o','o','o','o','e','e'],
        ['e','e','e','e','e','e','e'],
        ['e','e','e','e','e','e','e'],
        ['e','e','e','e','e','e','e']
    ];
var tileCount=0;
function startGame(){
    drawBoard();
    startEnd();
    setInterval(drawTiles,250);
    document.getElementById("submit").onclick = function (){
        grid=[];
        tileCount=0;
        neighborFullList = [];
        var t = document.getElementById("grid").value;
        parse(t);
        interval = null;
        startGame();
        
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
        var i = tileCount;
        
            
        
        if (i<finArr.length-1){
            /*var t =neighborFullList[i];
            for(var j=0;j<t.length;j++){
                if(t[j]!=finArr[i-1]){
                    var tx = t[j].x;
                    var ty = t[j].y;
                    context.fillStyle="blue";
                    context.fillRect(tx*50,ty*50,50,50);
                    context.fillStyle="white";
                    context.font= "10px Arial";
                    var tf = t[j].f;
                    var tg = t[j].g;
                    var th = t[j].h;
                    context.fillText("f:"+tf,tx*50+10,ty*50+10);
                    context.fillText("g:"+tg,tx*50+10,ty*50+25);
                    context.fillText("h:"+th,tx*50+10,ty*50+40);
                }
            }*/
            context.fillStyle="yellow";
            context.fillRect(finArr[i].x*50,finArr[i].y*50,50,50);
            context.fillStyle="black";
            context.font= "10px Arial";
            context.fillText("f:"+finArr[i].f,finArr[i].x*50+10,finArr[i].y*50+10);
            context.fillText("g:"+finArr[i].g,finArr[i].x*50+10,finArr[i].y*50+25);
            context.fillText("h:"+finArr[i].h,finArr[i].x*50+10,finArr[i].y*50+40);
        }
        tileCount++;
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
    for(var a =0; a< grid.length; a++){
        for(var b =0; b< grid[a].length; b++){

            if(grid[a][b]=="o")
                context.fillRect(a*50,b*50,50,50);
            else    {
                context.beginPath();
                context.rect(a*50,b*50,50,50);
                context.stroke();
            }
        }
    }
}
function startEnd(){
    //sx = Math.round(Math.random()*boardSize);
    //sy = Math.round(Math.random()*boardSize);
    //ex= Math.round(Math.random()*boardSize);
    //ey= Math.round(Math.random()*boardSize);
    sx = 0;
    sy =1;
    ex = 6;
    ey = 6;
    context.fillStyle="red";
    context.fillRect(ex*50,ey*50,50,50);
    context.fillStyle="green";
    context.fillRect(sx*50,sy*50,50,50);
    start = new node(sx,sy);
    end = new node(ex,ey);
    
    console.log(astar(start,end));
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
    if(x==y)
        return x+y*.4;
    return x+y;
}
function generate(lowestf){
    var successorList=[];
    var x = lowestf.x;
    var y = lowestf.y;
   //console.log(x+"   "+y);
    if(grid[x] && grid[x][y-1]=='e')
        successorList.push(new node(x,y-1));
    if(grid[x-1] && grid[x-1][y]=='e')
        successorList.push(new node(x-1,y));
    if(grid[x+1] && grid[x+1][y]=='e')
        successorList.push(new node(x+1,y));
    if(grid[x] && grid[x][y+1]=='e')
        successorList.push(new node(x,y+1));
    

    //diagonal
     if(grid[x-1] && grid[x-1][y-1]=='e')
        successorList.push(new node(x-1,y-1));
    if(grid[x-1] && grid[x-1][y+1]=='e')
        successorList.push(new node(x-1,y+1));
    if(grid[x+1] && grid[x+1][y+1]=='e')
        successorList.push(new node(x+1,y+1));
         if(grid[x+1] && grid[x+1][y-1]=='e')
        successorList.push(new node(x+1,y-1));


    return successorList;
}
window.onload = startGame;