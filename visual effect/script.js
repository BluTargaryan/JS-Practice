function scrollAppear(){
    //Get introtext elem.note-compul dot
    var introText = document.querySelector('.intro-text');
    //Get dist of introtext
    var introPosition = introText.getBoundingClientRect().top;
    //get screenposition
    var screenPosition = window.innerHeight/2;

    if(introPosition < screenPosition){
        //note.non-compul dot
        introText.classList.add('intro-appear');
    }
}

window.addEventListener('scroll', scrollAppear);