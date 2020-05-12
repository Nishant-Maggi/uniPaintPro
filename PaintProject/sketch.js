var database;

var positions;
var currentPath;

function setup() {

  database = firebase.database();

  createCanvas(displayWidth-50,displayHeight-150); 

  stroke (75,184,245);
  strokeWeight (6);
  
  
}

function draw() {

  //console.log(positions);

  background("black"); 
  
  getPainting();

  if(positions){ 

  for(var index = 0 ; index < positions.length; index ++){
    for(var path = 1; path < positions[index].length; path++){
    var point1 = positions[index][path-1];
    var point2 = positions[index][path];
 

    line (point1.x,point1.y,point2.x,point2.y);
    
      
    }
    
  }

  for(var drawing = 1; drawing < currentPath.length ; drawing++){
    var drawing1 = currentPath[drawing - 1];
    var drawing2 = currentPath[drawing];

    line(drawing1.x,drawing1.y,drawing2.x,drawing2.y);

   
  }
  }

  drawSprites();
}

function startPath(){
  currentPath=[];
 
}

function endPath(){
  console.log(positions);
  positions.push(currentPath);
  currentPath = [];
  
}

function mouseDragged(){

  var point = {
    'x': mouseX,
    'y': mouseY
  }

  //console.log(point);
  
  currentPath.push(point);

 // console.log(positions);
  
}

function mousePressed(){
  startPath();

}

function mouseReleased(){
  endPath();
  savePainting();
}

function getPainting(){
  

  var positionsRef = database.ref('positions');
  positionsRef.on("value",readPosition,showError);


  var currentPathRef = database.ref('currentPath');
  currentPathRef.on("value",readCurrentPath,showError);
}

function readPosition(data){
  positions = data.val();
  console.log(positions);
}

function readCurrentPath(data){
  currentPath = data.val();
  console.log(currentPath);
}

function showError(){
  console.log("Database Error");
}

function savePainting(){
  var ref = database.ref('/');
  console.log("savePainting");
  ref.set({
    'positions':positions,
    'currentPath':currentPath
  });

}
