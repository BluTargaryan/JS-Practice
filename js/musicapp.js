window.addEventListener('load', () =>{
 const sounds = document.querySelectorAll(".sound");
 const pads = document.querySelectorAll(".pads div");
 const visual = document.querySelector('.visual');
 const colors = [
     "#60d394",
     "#d36060",
     "#c060d3",
     "#d3d160",
     "#d860d3",
     "#6ae2da"
 ];
 console.log(sounds);
  
 //Lets get the sound working
 pads.forEach((pad, index) =>{
     pad.addEventListener('click', function(){
         //Reset the current time
         sounds[index].currentTime = 0;
         //Plays song
         sounds[index].play();

 createBubbles(index);
     });
 });

 //Create function that makes bubbles on cursor on click
 const createBubbles = (index) => {
     //Bubble creation and stylng
     const bubble = document.createElement("div");
     visual.appendChild(bubble);
     bubble.style.backgroundColor = colors[index]
     bubble.style.animation = 'jump 1s ease';
     //To help performance, remove bubble once animated
     bubble.addEventListener('animationend', function(){
         visual.removeChild(this);
     })
 };
});
