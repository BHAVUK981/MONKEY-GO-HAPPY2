var ground,invisibleGround,groundImage;
var monkey , monkey_running,monkeyCollide;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score=0;
var PLAY=0;
var END=1;
var gameState=PLAY;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyCollide=loadImage("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600,400)
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  
  monkey=createSprite(80,230,20.20);
  monkey.scale=0.12;
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("collide",monkeyCollide);
                      

   invisibleGround=createSprite(300,278,600,7)
  invisibleGround.visible=false;
    
}


function draw() {
background("red")

  fill("black")
 
  text("Score:"+score,300,20);

   text("SURVIVAL TIME:"+survivalTime,470,20)

  if (gameState===PLAY){
    obstacles()
    bananas();
   
      survivalTime=Math.ceil(frameCount/frameRate());
 
    if (keyDown("space")&&monkey.y>=230){
      monkey.velocityY=-15;
    }
  
    monkey.velocityY=monkey.velocityY+0.5
    if(monkey.isTouching(bananaGroup)){
      score=score+2;
    bananaGroup.destroyEach();
    } 
    
    
    
    if(monkey.isTouching(obstacleGroup)){
    gameState=END
    }  
  }
  if(gameState===END){
  
  monkey.y=235;
  monkey.scale=0.12;
  monkey.changeAnimation("collide",monkeyCollide)
  obstacleGroup.setVelocityXEach(0)
  bananaGroup.setVelocityXEach(0)
 obstacleGroup.setLifetimeEach(-1)
 bananaGroup.setLifetimeEach(-1)
  fill("blue")
  stroke("black")
  textSize(30)
  text("GAME OVER",220,150)
 
  } 
    
  drawSprites();
  monkey.collide(invisibleGround)
}
function bananas(){
  var rand=Math.round(random(1,4));
  if (frameCount%80===0){
    banana=createSprite(500,Math.round(random(120,200)),10,10)
    banana.addImage("banana",bananaImage);
    banana.scale=0.1;
    banana.velocityX=-(4+score*1/100)
    banana.lifetime=220;
    bananaGroup.add(banana)
  }
}
  function obstacles(){
    if (frameCount%80===0){
      obstacle=createSprite(600,250,40,40)
      obstacle.addAnimation("rock",obstacleImage)
      obstacle.setCollider("circle",0,0,180);
      obstacle.scale=0.13;
      obstacle.velocityX=-(4+score*1.5/100);
      obstacle.lifetime=220;
      obstacleGroup.add(obstacle);
    }
  }




