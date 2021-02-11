//Listen for formsubmit
document.getElementById('myform').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e){
//Get form values
var siteName  = document.getElementById('siteName').value;
var siteUrl  = document.getElementById('siteUrl').value;

if(!validateform(siteName,siteUrl)){
    return false;
}

var bookmark = {
    name: siteName,
    url: siteUrl
}

/*
//Local storage text
localStorage.setItem('test', 'Hello World');
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
console.log(localStorage.getItem('test'));
//To prevent default behaviour i.e prevent form from submitting
*/  

//Test if bookmarks is null
if(localStorage.getItem('bookmarks')===null){
   //Init array
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //set to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}else{
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//add bookmark to array
bookmarks.push(bookmark);
//set to local storage
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
//clear form
document.getElementById('myform').reset();
//reset pageie refetch bookmarks
fetchBookmarks();
e.preventDefault();
}

//Delete bookmarks
function deleteBookmark(url){
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//loop through bookmarks
for(var i = 0;i<bookmarks.length; i++){
if(bookmarks[i].url==url){
    //Remove from array
    bookmarks.splice(i,1);
}
}
 //reset to local storage
 localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
 
 
 //reset pageie refetch bookmarks
 fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks(){
     //get bookmarks from local storage
     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

      //get output id
      var bookmarksResults = document.getElementById('bookmarksResults');

      //Build output
      bookmarksResults.innerHTML = "";

      for(var i = 0;i<bookmarks.length; i++){
          var name = bookmarks[i].name;
          var url = bookmarks[i].url;

          bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body">'+
          '<h3>'+name+
          '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
          '<a onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger"  href="#">Delete</a>'+
          '</h3>'
          '</div>';
      }
}

function validateform(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
        }
        
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        
        if(!siteUrl.match(regex)){
        alert('Please use a valid url');
        return false;
        }

        return true;
}