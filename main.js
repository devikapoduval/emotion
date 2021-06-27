prediction1="";
prediction2="";
Webcam.set
({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90,
}
)
 
camera=document.getElementById("camera");
Webcam.attach(camera);

 function take_snapshot(){
     Webcam.snap(function(data_uri){
         document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'/>"
     })
 }

console.log("ml5.version",ml5.version) ;

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ypC-EnhCQ/model.json",modelLoaded);

function modelLoaded() {
    console.log("modelLoaded")
}

function speak(){
    synth=window.speechSynthesis;
    speak_data1="The first prediction is "+prediction1;
    speak_data2="The second prediction is "+ prediction2;
    uttherThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(uttherThis);
}

function predict() {
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult)
}

function gotResult(error,result) {
    if (error) {
        console.log(error);
    } else{ 
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label
        document.getElementById("result_emotion_name2").innerHTML=result[1].label
       
        prediction1=result[0].label
        prediction2=result[1].label
        speak()

        if (result[0].label==" Happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;"
        }
        if (result[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;"
        }
        if (result[0].label=="Acting"){
            document.getElementById("update_emoji").innerHTML="😎"
        }
        if (result[1].label==" Happy"){
            document.getElementById("update_emoji_2").innerHTML="&#128522;"
        }
        if (result[1].label=="Angry"){
            document.getElementById("update_emoji_2").innerHTML="&#128548;"
        }
        if (result[1].label=="Acting"){
            document.getElementById("update_emoji_2").innerHTML="😎"
        }

        
    }
}