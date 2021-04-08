//Getlong and lang from our location
window.addEventListener('load', ()=>{
let long;
let lat;
let tempDescription = document.querySelector('.temp-description');
let tempDegree = document.querySelector('.temp-degree');
let locationTimezone = document.querySelector('.location-timezone');
let image = document.querySelector(".icon");
let tempSection = document.querySelector(".degree-section");
const tempSpan = document.querySelector(".degree-section span");

if(navigator.geolocation){
 navigator.geolocation.getCurrentPosition(position=>{
console.log(position);
long = position.coords.longitude;
lat= position.coords.latitude;

//Proxy
const proxy = 'https://cors-anywhere.herokuapp.com'
//Note how lat and long is inserted in string and the quotation marks
const api = `http://api.weatherapi.com/v1/current.json?key=8c69b67ff2a34137be0152305210804&q=${lat},${long}&aqi=no`;

 //Call and convert response to json from server
 fetch(api)
 .then(response =>{
   return response.json();
 })
 .then(data =>{
     console.log(data);
//Store the current values from JSON
     const {temp_f,temp_c,condition} = data.current;
     const {text,icon} = condition; 
     //Set DOM elements from the API
     tempDegree.textContent = temp_f;
     tempDescription.textContent = text;
     const {tz_id} = data.location;
     locationTimezone.textContent = tz_id;
     //set icons
     image.src = icon;

     //Change temperature to fahrenheit
     tempSection.addEventListener('click', ()=>{
       if(tempSpan.textContent === "F"){
         tempSpan.textContent = "C";
         tempDegree.textContent = temp_c;
       }else{
        tempSpan.textContent = "F";
        tempDegree.textContent = temp_f;
       }
     })
 })
});


}
//function to set icon
function setIcons(icon, icon_id){
  const skycons = new Skycons({color:"white"});
  const currentIcon = icon.replace(/ /g," _").toUpperCase();
  console.log(currentIcon);
  skycons.play();
  return skycons.set(icon_id, Skycons[currentIcon]);
}
});