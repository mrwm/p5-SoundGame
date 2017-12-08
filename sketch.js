var spin; //The cat
var direction = 90; //spin initial direction moving down
var mic; //The mic
//var life = 3; //Useless for now

//for the walking guy
var walk_animation;
var eks = window.innerWidth - 200; //say the variable out loud

//Help Button
var imgBtn;

//for the background
var grass, grassy, tree, cloud, cloudy;

function preload(){
  walk_animation = loadAnimation("img/walk/walk.0005.png", "img/walk/walk.0006.png", "img/walk/walk.0005.png", "img/walk/walk.0006.png");
  walk_animation.scale = 0.5;
}

function setup() {
  imgBtn = loadImage("img/help.png");

  clear();
  mic = new p5.AudioIn() //set things up
  mic.start(); //Start up the mic
  createCanvas(window.innerWidth,800); // How large your drawing is in (x,y)

  //position of the cat
  spin1 = createSprite(250, 150, 1, 1); //(x,y,??,??) origin @ top left corner
  spin1.addAnimation("floating", "img/cat_4.png"); //change to cat_2.png for other cat

  //for the background
  grass = createSprite(100, 300, 1, 1);
  grass.addAnimation("floating", "img/grass_1.png");
  grassy = createSprite(150, 325, 1, 1);
  grassy.addAnimation("floating", "img/grass_2.png");
  tree = createSprite(700, 100, 1, 1);
  tree.addAnimation("floating", "img/tree.png");
  cloud = createSprite(150, 10, 1, 1);
  cloud.addAnimation("floating", "img/cloud_1.png");
  cloudy = createSprite(500, 15, 1, 1);
  cloudy.addAnimation("floating", "img/cloud_2.png");
}

function draw() {
  //var randnum = random(5); //a random number
  micLevel = mic.getLevel(); //micLevel is the LOUDNESS value from mic
  background(135, 206, 235);  //Backgrouond color

  //for the ground
  fill(48, 101, 0, 127); //Grey: 150, 150, 150 
  stroke(72, 152, 0); //Grey: 211, 211, 211
  rotate(PI/15.0); //Rotate things
  rect(0, 250, window.innerWidth+1000, 1000); //rectangle for ground

  //move a sprite by providing a speed and an angle
  direction += 0 + 100*micLevel;
  spin1.setSpeed(micLevel*100, direction);//speed, angle
  //console.log(micLevel*100);
  //Make it rotate towards direction
  spin1.rotateToDirection = true;

  if(micLevel*100>5){ //only move if it's loud enough
    spin1.position.x += micLevel*10;
  }
  else if ((micLevel*100<10)&&(spin1.position.x > 50)){
    spin1.position.x -= 10;
  }
  
  if (spin1.position.x > eks - 50){
    alert("You cought up! (b^__^)b");
    alert("You can remove this popup or change the text in line 73ish");
    spin1.position.x = 100; //reset the cat position
  }


  //For the backgrouond
  
  //move the things
  grass.setSpeed(1, 0.1); //speed, angle
  grassy.setSpeed(1, 0.1);
  tree.setSpeed(1, 0.1);
  cloud.setSpeed(1, 0.1);
  cloudy.setSpeed(1, 0.1);

  //background logic
  if (grass.position.x > 0){
    grass.position.x -= 10; //move the grass
  }
  else if (grass.position.x < 0){
    grass.position.x = eks + 300; //reset the grass
  }
  if (grassy.position.x > 0){
    grassy.position.x -= 10; //move the grass
  }
  else if (grassy.position.x < 0){
    grassy.position.x = eks + 300; //reset the grass
  }
  if (tree.position.x > 0){
    tree.position.x -= 10; //move the tree
  }
  else if (tree.position.x < 0){
    tree.position.x = eks + 300; //reset the tree
  }
  if (cloud.position.x > 0){
    cloud.position.x -= 3; //move the cloud
  }
  else if (cloud.position.x < 0){
    cloud.position.x = eks + 300; //reset the cloud
  }
  if (cloudy.position.x > 0){
    cloudy.position.x -= 4; //move the cloud
  }
  else if (cloudy.position.x < 0){
    cloudy.position.x = eks + 300; //reset the cloud
  }

  //shrink the cat
  spin1.scale = .15; //how big do you want the cat?

  //shrink the background stuff
  grass.scale = 0.1;
  grassy.scale = 0.1;
  tree.scale = 0.5;
  cloud.scale = 0.3;
  cloudy.scale = 0.2;

  //The help button
  image(imgBtn, 100, 425, 120, 120);
  drawSprites();

  //the guy
  animation(walk_animation, eks, 150);
}

function mousePressed() {
  // Check if mouse is inside the circle
  var d = dist(mouseX, mouseY, 30, 500);
  if (d < 75) {
    var text = "enter the instructions here\n(line 140ish) in sketch.js";
    alert(text);
  }
}
