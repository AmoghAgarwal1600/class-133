img="";
status="";
objects=[];
function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: detecting objects";
}
function preload()
{
    img=loadImage('dog_cat.jpg');
}
function modelLoaded()
{
    console.log("model loaded");
    status=true;
    objectDetector.detect(img,gotResult);
}
function draw(){
image(img,0,0,640,420);
if(status!="")
{
    for(i=0; i<objects.length; i++)
    {
        document.getElementById("status").innerHTML="Status: Object Detected";
        fill("red");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects=results;
    }
}