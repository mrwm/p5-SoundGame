var spin; //The cat
var direction = 90; //spin initial direction moving down
var mic; //The mic
var life = 3; //Useless for now

//for the walking guy
var walk_animation;
var eks = window.innerWidth - 200; //say the variable out loud


//Help Button
var imgBtn;

function preload(){
  walk_animation = loadAnimation("img/walk/walk.0001.png", "img/walk/walk.0002.png", "img/walk/walk.0003.png", "img/walk/walk.0004.png");
}

function setup() {
  imgBtn = loadImage("img/help.png");

  clear();
  mic = new p5.AudioIn() //set things up
  mic.start(); //Start up the mic
  createCanvas(window.innerWidth,800); // How large your drawing is in (x,y)

  spin1 = createSprite(200, 200, 1, 1); //(x,y,??,??) origin @ top left corner
  spin1.addAnimation("floating", "img/cat_3.png"); //change to cat_2.png for other cat
}

function draw() {
  micLevel = mic.getLevel(); //micLevel is the LOUDNESS value from mic
  background(135, 206, 235);  //Backgrouond color

  //for the ground
  fill(150, 150, 150, 127);
  stroke(211, 211, 211);
  rotate(PI/45.0);
  rect(0, 300, window.innerWidth, 500); //rectangle for ground
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
    spin1.position.x = 100; //reset the cat position
  }


  //draw the cat
  spin1.scale = .15; //how big do you want the cat?
  //the guy
  animation(walk_animation, eks, 200);
  image(imgBtn, 30, 425, 120, 120);
  drawSprites();
}

function mousePressed() {
  // Check if mouse is inside the circle
  var d = dist(mouseX, mouseY, 30, 500);
  if (d < 75) {
    var text = "enter the instructions here";
    alert(text);
  }
}
