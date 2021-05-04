function smoothScroll(target,duration){
    //Get target 
    var target = document.querySelector(target);
    //Get target position. note,specification of top 
    var targetPosition = target.getBoundingClientRect().top;
    //Get target start position
    var startPosition = window.pageYOffset;
   //Get distance
     var distance = targetPosition - startPosition;
    //Get start time
    var startTime = null;
    
    //animation function
    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        //Running var.note params
        var run = ease(timeElapsed,startPosition,distance,duration);
       //Scrolling setup
        window.scrollTo(0,run);
        if(timeElapsed <duration) requestAnimationFrame(animation);
        console.log(timeElapsed,duration);
    }

    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    //Running animation
    requestAnimationFrame(animation);
}



//Get sections and set smooth scroll anim  w eventlistener
var section1 = document.querySelector('.section1');
var section2 = document.querySelector('.section2');

section1.addEventListener('click',function(){
    smoothScroll('.section2',1000);
});
section2.addEventListener('click',function(){
    smoothScroll('.section1',1000);
});