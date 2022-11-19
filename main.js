    img="";
    status="";
    objects=[];
    function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();

}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function modelLoaded(){

    console.log("modeLoaded");
    status=true;
    objectDetector.detect(video,gotresult);
}
function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        R=random(255);
        G=random(255);
        B=random(255);
        for(i=0;i<objects.length;i++){
            if(objects[i].label=="people"){
                document.getElementById("numberofobjects").innerHTML="status:Baby is Safe";
                }
                else{
                document.getElementById("numberofobjects").innerHTML="status:Baby is in danger";
                }
        document.getElementById("status").innerHTML="status:Object detected";  
        document.getElementById("numberofobjects").innerHTML="Number of objects detected are: "+objects.length;  
        fill(R,G,B);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+"   "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke(R,G,B);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    
    }