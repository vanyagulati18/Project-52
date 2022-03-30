var PLAY = 1
var END = 0
var gameState = PLAY;
var backgroundImg, bg;
var knightImg, knight, knight_collided;
var invisibleGround;
var obstacles,obstacleImg, obstaclesGroup;
var gameOver,restart;
var dieSound, jumpSound;
function preload() {


  backgroundImg = loadImage("background.jpg")
  knightImg = loadAnimation("assets/image1.png", "assets/image2.png", "assets/image3.png", "assets/image4.png", "assets/image5.png", "assets/image6.png", "assets/image7.png", "assets/image8.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  obstacleImg = loadImage("obstacle.png")
  knight_collided = loadAnimation("assets/knightColidded.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  
}

function setup() {
  createCanvas(800,600)
  bg = createSprite(width / 2, height / 2, width, height)
  bg.addImage(backgroundImg)
  bg.velocityX = -5;
  bg.x = width / 2;


  invisibleGround = createSprite(300, 600, 800, 100)
  invisibleGround.visible = false;

  knight = createSprite(100, height / 2, 40, 40)
  knight.addAnimation("running", knightImg)
  knight.scale = 0.3;

  gameOver = createSprite(400,350);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  restart = createSprite(400,400);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  


  obstaclesGroup = new Group()

  

}
function draw() {
  background("black");
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
  if (keyDown("space")) {
    knight.velocityY = -10;
    jumpSound.play();
  }
  knight.velocityY = knight.velocityY + 0.8

  spawnObstacles()
  if(obstaclesGroup.isTouching(knight)){
    gameState = END;
    dieSound.play();
  }
  
}
 if(gameState === END){
  knight.velocityX = 0;
  knight.addAnimation("collided", knight_collided);
  gameOver.visible = true;
      restart.visible = true;
      if(mousePressedOver(restart)) {
        reset();
}
  knight.collide(invisibleGround)
  if (bg.x < 300) {
    bg.x = width / 2;
  }
  drawSprites()
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  
  knight.changeAnimation("running",knightImg);

}
function spawnObstacles(){
  if(frameCount % 90 === 0){
    obstacles = createSprite(300,520,20,20);
    
    obstacles.addImage("obstacle", obstacleImg);
    obstacles.velocityX= -5;
    obstacles.scale = 0.2;
    obstaclesGroup.add(obstacles);
  }
}
  

}