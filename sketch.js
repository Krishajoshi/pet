var dog,sadDog,happyDog;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var database;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  foodObj = new food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  


  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}
function readStock(data)
{
   Food=data.val();
   //console.log(position);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

//last fed logic from pdf

  drawSprites();

  foodObj.display();
}


function feedDog(){
dog.addImage(happyDog);

if(foodObj.getFoodStock()<= 0){
 foodObj.updateFoodStock(foodObj.getFoodStock()*0);
}else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}



}
function addFoods(){
foodS++;
database.ref('Food').update({
Food:foodS
})


}
//function to update food stock and last fed time


//function to add food in stock
