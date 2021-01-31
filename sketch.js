var balloon, database, position;
var bg = "Hot Air Balloon-01.png";

function preload() {

backgroundImg = loadImage(bg);
balloonImage1 = loadAnimation("Hot Air Balloon-02.png")
balloonImage2 = loadAnimation("Hot Air Balloon-02.png","Hot Air Balloon-03.png","Hot Air Balloon-04.png")

}
function setup() {
  createCanvas(1400,600);
  database = firebase.database();
  console.log(database);

  balloon = createSprite(100,500,50,50);
  balloon.addAnimation("balloon",balloonImage1);

  var balloonPosition = database.ref('Balloon/Height');
  balloonPosition.on("value",readHeight,showError);
}

function draw() {
  if(backgroundImg)
 background(backgroundImg);

 if(keyDown(LEFT_ARROW)){
  updateHeight(-10,0);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
 }
else if(keyDown(RIGHT_ARROW)){
  updateHeight(+10,0);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale = balloon.scale-0.01;
}
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,+10);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale = balloon.scale+0.01;
}

strokeWeight(1)
stroke("black");
textSize(20);
fill("black");
text("Use arrow keys to move Hot Air Balloon!",10,20);

  drawSprites();
}

function updateHeight(x,y){

database.ref("Balloon/Height").set({
  'x' : height.x + x,
  'y' : height.y + y
})

}

function readHeight(data){
height = data.val();
balloon.x = height.x;
balloon.y = height.y;
}

function showError(){
console.log("Error in writing to the database");
}