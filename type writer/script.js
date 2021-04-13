/**
 * Constructor
 * */
const TypeWriter = function(txtElement, words, wait=3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt='';
  this.wordIndex = 0;
  //Use parseInt which takes the value and base
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

/**
 * Type Method
 * */
TypeWriter.prototype.type = function() {
//set timeout
//Current index of word
const current = this.wordIndex % this.words.length;

//Full text of current word
const fullTxt = this.words[current];


//Check if deleting
if(this.isDeleting) {
  //Remove char  
  this.txt = fullTxt.substring(0, this.txt.length - 1);
}else{
//Add char
this.txt = fullTxt.substring(0, this.txt.length + 1);
}

// Insert txt into element
this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;


//Initial Type Speed
let typeSpeed = 300;

if(this.isDeleting) {
    //Division assignment
    typeSpeed /= 2;
}

//If word is complete
if(!this.isDeleting && this.txt===fullTxt) {
    //Make pause at end
     typeSpeed = this.wait;
     //Set delete to true
     this.isDeleting = true;
}
//After word is fully deleted
else if(this.isDeleting && this.txt===''){
    this.isDeleting= false;
    //Move to next word
    this.wordIndex++;
    //Pause before start typing
    typeSpeed = 500;
}

setTimeout(() => this.type(), typeSpeed);

}


/**
 * Init
 * */
//Init on DOM load
document.addEventListener('DOMContentLoaded', init);

//Init app
function init() {
    const txtElement  = document.querySelector('.txt-type');
   //run thru JSON method 
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypeWriter
    new TypeWriter(txtElement,words,wait);

}