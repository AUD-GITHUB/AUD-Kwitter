var firebaseConfig = {
    apiKey: "AIzaSyBAutJ-222Bra8r_-d_a_NWzrM1GiMVy7M",
    authDomain: "aud-kwitter.firebaseapp.com",
    databaseURL: "https://aud-kwitter-default-rtdb.firebaseio.com",
    projectId: "aud-kwitter",
    storageBucket: "aud-kwitter.appspot.com",
    messagingSenderId: "206247631306",
    appId: "1:206247631306:web:9bf9ef633f15b3c09bd733"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
  firebase_message_id = childKey;
  message_data = childData;
    console.log(firebase_message_id);
    console.log(message_data);
    var name = message_data['name'];
    var message = message_data['message'];
    var likes = message_data['likes'];
    name_display = "<h3>" + name + "<img class = 'user_tick' src = 'tick.png'></h3>";
    message_diplay = "<h4 class = 'message_h4'>" + message + "</h4>";
    likes_Button = "<button class = 'btn btn-warning' id = " + firebase_message_id + "value = " + likes  + "onclick = 'addLikes(this.id)'>";
    likes_display = "<span class = 'glyphicon glyphicon-thumbs-up'> Like : " + likes + "</span></button><hr>";
    row = name_display + message_diplay + likes_Button + likes_display;
    document.getElementById("output").innerHTML += row;
  } });  }); }
getData();

function addLikes(message_id){
  console.log("Liked");
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
    likes : updated_likes
  });
}


function send(){
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      likes:0
  });
  document.getElementById("msg").value ="";
}

  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}