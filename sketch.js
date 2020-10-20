var tower, towerImg, ghostImg,ghost, door, doorImg, doorGroup,climber, climberImg, climberGroup,invisibleBlock, invisibleBlockGroup ;
var PLAY=1;
var END=0;
var gameState=PLAY;
var sound;
var score=0;
function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.velocityY=3;
  tower.addImage(towerImg);
  
  doorGroup=new Group();
  climberGroup= new Group();
  invisibleBlockGroup=new Group();
  ghost=createSprite(300,200,10,10);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.25;
  sound.loop();
}
function draw(){
  background("white");
  if(gameState==PLAY){
     
  if(tower.y>400){
     tower.y=300;
  }
  score=score+Math.round(getFrameRate()/60);
    
  railing();
  if(keyDown("space")){
    ghost.velocityY=-5;      
    
  }
    
  ghost.velocityY=ghost.velocityY+0.5;
  if(keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-5;
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+5;
  }
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState=END;
  }
    drawSprites();
    fill("yellow");
    text("Score: "+score,400,30);
  
  }
  else if(gameState==END){
  
    fill("black");
    textSize(30);
    text("GAME OVER",230,200);
  }
  
  
}
function railing(){
if(frameCount%100==0){
  door=createSprite(random(120,400),-50);
  door.addImage(doorImg);
  door.velocityY=3;
  door.lifetime=250;
  doorGroup.add(door);
  
  climber=createSprite(door.x,10);
  climber.addImage(climberImg);
climber.velocityY=3;
  climber.lifetime=250;
  
  climberGroup.add(climber);
  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
  
  invisibleBlock=createSprite(climber.x,12);
  invisibleBlock.velocityY=climber.velocityY;
  invisibleBlock.lifetime=250;
  invisibleBlock.visible=false;
  invisibleBlockGroup.add(invisibleBlock);
}  
}