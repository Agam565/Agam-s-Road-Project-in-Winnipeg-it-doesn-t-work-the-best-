var trashCan, trashCanImg;
var runningAnimation;
var person;
var gameState = "wait";
var score = 0;
var backgroundImg, background1Img, background2Img;

var playButton, playButtonImg
var road, roadImg;
var pencil, pencilImg;
var pencilGroup
//var bottle, bottleGroup;
//var eraser, eraserGroup;
//var paper, paperGroup;
//var bottleImg, eraserImg, paperImg; 
var invisibleGround;
var gameOver, gameOverImg;
var restartButton, restartButtonImg; 
function preload(){
backgroundImg = loadImage("./backgrounds/background.jpg");
background1Img = loadImage("./backgrounds/background1.jpg");
background2Img = loadImage("./backgrounds/background2.jpg")
trashCanImg = loadImage("trashCan.jpg");
playButtonImg = loadImage("playButton.png")     
runningAnimation = loadAnimation("animation1.png","animation2.png")
roadImg = loadImage("road.png");
pencilImg = loadImage("pencil.png")
//bottleImg = loadImage("bottle.png")
//eraserImg = loadImage("eraser.png");
//paperImg = loadImage("paper.png");
gameOverImg = loadImage("gameOver.webp");   
restartButtonImg = loadImage("restartButton.jpg");
}
function setup(){
 createCanvas(windowWidth,windowHeight);
 //trashCan = createSprite(200,200);
 //trashCan.addImage(trashCanImg);
 road = createSprite(500.5,703);
 road.addImage(roadImg);
 road.scale = 0.5;
 road.velocityX = -3;

  playButton = createSprite(680,400,20,20);
  playButton.addImage(playButtonImg);
  playButton.scale = 0.09;

  person = createSprite(65,630,20,20);
 person.addAnimation("running",runningAnimation);
 person.scale = 0.5;

  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";

pencil = createSprite(65,630,20,20);
pencil.addImage(pencilImg);
pencil.sclae = 0.04;
pencil.visible = false;
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
 restartButton = createSprite(680,700);
  restartButton.addImage(restartButtonImg);
  restartButton.scale = 0.2;
trashCan = createSprite(500,200);
trashCan.addImage(trashCanImg);
trashCan.scale = 0.04;
  pencilGroup = new Group();
  //bottleGroup = new Group();
  //eraserGroup = new Group();
  //paperGroup = new Group();

}
function draw(){
  if(gameState == "wait"){
    background(background1Img)
    fill("purple");
    textSize(50);
    text("School Simulator",520,330)
    playButton.visible = true;
    road.visible = false;
    person.visible = false;
    invisibleGround.visible = false;
    gameOver.visible = false;
    restartButton.visible = false;
    trashCan.visible = false;
  }
  if(mousePressedOver(playButton) && gameState === "wait"){
    gameState = "play";
  }
  if(gameState == "play"){
    background(backgroundImg);
    road.visible = true;
    fill("black")
    textSize(29);
    text("Score:" + score,1250,70);
    score += 1;
    playButton.visible = false;
    person.visible = true;
    restartButton.visible = false;
    trashCan.visible = true;
    person.velocityX = 2;
    createPencils();
    if(road.x > 800){
      road.x = width/2;
    }
    if(keyDown("SPACE")){
      person.velocityY = -10;
      }
      person.velocityY = person.velocityY + 0.8;

    person.collide(invisibleGround);
    }
    if(pencilGroup.collide(person) || trashCan.collide(person)){
      gameState = "end";
     }
     
     if(gameState == "end"){
       background(gameOverImg);
       restartButton.visible = true;
       person.visible = false;
      road.visible = false;
       road.velocityX = 0;
       person.velocityY = 0;
       person.velocityX = 0;
       pencilGroup.destroyEach();
     }
      if(mousePressedOver(restartButton)){
        //location.reload(true);
        //Both options are good(up and down) but the better one for this case is th bottom one(the 6 lines of code).
        gameState = "wait";
        score = 0;
         //person.x = 65;
        // person.y = 630;
        // score = 0;
        // road.x = 500.5;
        // road.velocityX = -3;
       }
       drawSprites();
}

function createPencils(){
  if (World.frameCount % 60 == 0) {
    var pencil = createSprite(65,630);
    pencil.addImage(pencilImg);
    pencil.scale = 0.05;
    pencil.velocityX = -3;
    pencilGroup.add(pencil);
  }
}
/*function spawnObstacles(){
  if(frameCount% 60 == 0){
 var obstacle = createSprite(600,height-95,20,30);
 obstacle.velocityX = -(6 + 3*score/100);
 // The code below is to generate random obstacles.
 var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3)
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    //add the obstacle in the obstacleGroup.
    obstaclesGroup.add(obstacle);
    obstacle.scale = 0.03;
    obstacle.lifetime = 500;

  }
}*/