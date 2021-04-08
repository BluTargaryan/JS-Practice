function animatedForm(){
  const arrows = document.querySelectorAll(".fa-arrow-down");  

  //For each arrow
  arrows.forEach(arrow => {
      //To get input of current box
arrow.addEventListener("click", () => {
    //Get current element i.e previous sibling of the arrow, which is input tag
const input = arrow.previousElementSibling;
//Get parent element i.e. the div container
const parent = arrow.parentElement;
//Get next form i.e next sibling of the parent div
const nextForm = parent.nextElementSibling;


//Check for validation
if(input.type ==="text" && validateUser(input)){
    //For username
    nextSlide(parent,nextForm);
}else if(input.type ==="email" && validateEmail(input)){
    //For email
    nextSlide(parent,nextForm); 
}else if(input.type ==="password" && validateUser(input)){
    //For password
    nextSlide(parent,nextForm); 
}else{
    //Animation if error
    parent.style.animation = "shake .5s ease";
}
//get rid of animation i.e to reset animation
parent.addEventListener("animationend", () =>{
 parent.style.animation = "";
});
});
  });
}

//User validation
function validateUser(user){
    if(user.value.length < 6){
        console.log('not enough characters');
        error('rgb(189,87,87)');
    }else{
        error("rgb(87, 189, 130)");
        return true;
    }
}

//Email validation
function validateEmail(email){
    const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(validation.test(email.value)){
        error("rgb(87, 189, 130)");
        return true;
    }else{
        error('rgb(189,87,87)');
    }

}

//Next form function
function  nextSlide(parent,nextForm){
    parent.classList.add("inactive");
    parent.classList.remove('active');
    nextForm.classList.add('active');
}

//To throw error color
function error(color) {
    document.body.style.backgroundColor = color;
}

animatedForm();