var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  invisibleBlockGroup=new Group();
  climbersGroup=new Group();
  doorsGroup=new Group();
  ghost=createSprite(200,100,50,50)
  ghost.addImage(ghostImg)
  ghost.scale=0.4
  spookySound.play();
}

function draw() {
  background(200);
  if (gameState==="play"){
    drawSprites()
    if(keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+5
    }
    if(keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-5
    }
    if (keyDown("space")){
      ghost.velocityY=-10
    }
    ghost.velocityY=ghost.velocityY+0.999999
    if(tower.y > 400){
        tower.y = 300
      }
      if (climbersGroup.isTouching(ghost)){
        ghost.velocityY=0
      }
      if (invisibleBlockGroup.isTouching(ghost)||ghost.y>601){
        gameState="end"
      }
      SpawnDoors();
  }
 if (gameState==="end"){
   background("black")
   fill("red")
   textSize(16)
  text("GO TO HELL ",300,300)
  spookySound.stop();
  
 }
}
function SpawnDoors(){
  if (frameCount%250===0){
    door=createSprite(200,-50,200,200)
  door.x=Math.round(random(120,499))
    door.addImage(doorImg)
    door.velocityY=1
    climber=createSprite(200,10,50,50)
    climber.addImage(climberImg)
    climber.velocityY=1
    climber.x=door.x
    invisibleBlock=createSprite(200,17)
    invisibleBlock.x=climber.x
    invisibleBlock.velocityY=1
    invisibleBlock.width=climber.width
    invisibleBlock.height=2.5
    invisibleBlock.visible=false
    invisibleBlockGroup.add(invisibleBlock)
    doorsGroup.add(door)
    climbersGroup.add(climber)
    ghost.depth=door.depth+1
  }
}