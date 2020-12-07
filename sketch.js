var dog, dogImg, happyDog, database, foodS, foodStock;


function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup(){
  createCanvas(500,500);
  database = firebase.database();

  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food')
  foodStock.on("value", readStock);
  
}


function draw(){  
  background(46,139,87); 

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  fill("white")
  stroke(4)
  textSize(20);
  text("Press The Up Arrow To Feed DRAGO Milk", 80, 100);
  text("You have: " + foodS + " Milk left", 100, 70);

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

    if (x <= 0) {
      x = 0;
    } else {
      x = x - 1;
    }

  database.ref("/").update({
    Food: x
  })


}