const app= () => {
const song = document.querySelector('.song');//For song
const play = document.querySelector('.play');//For play
const outline = document.querySelector('.moving-outline circle');//For blue outline
const video = document.querySelector('.vid-container video');//for bg vid

//Sounds
const sounds = document.querySelectorAll('.sound-picker button')
//Time display
const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select button');
//Get the length of the outline
const outlineLength = outline.getTotalLength();
//Duration
let fakeDuration = 600;
//To controlhow much of the blue outline shows
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;


//Pick diferent sounds
sounds.forEach(sound =>{
sound.addEventListener('click',function(){
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
});
});
//Play sound
play.addEventListener('click', () =>{
    checkPlaying(song);
});

//Select sound(changes the sound duration)
timeSelect.forEach(option =>{
option.addEventListener('click',function(){
fakeDuration = this.getAttribute('data-time');
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
});
});

//Create function to stop and play sound
const checkPlaying = x =>{
    if(song.paused){
        song.play();
        video.play();
        play.src = './meditation-app-master/svg/pause.svg';
    }else{
        song.pause();
        video.pause();
        play.src = './meditation-app-master/svg/play.svg';
    }
};

//We can animate the circle and check the time
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //Animate progress bar
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Animate text
    timeDisplay.textContent = `${minutes}:${seconds}`
    if(currentTime >= fakeDuration){
        song.pause();
        song.currentTime = 0;
        play.src = "./meditation-app-master/svg/play.svg";
        video.pause();
    }
};
};

app();