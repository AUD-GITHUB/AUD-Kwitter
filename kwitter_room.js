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
//ADD YOUR FIREBASE LINKS HERE

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function addRoom(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            Created : "New Room"
      });

      localStorage.setItem("room_name", room_name);
      console.log(room_name);
      window.location = "kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      Room_names = childKey;
      row = "<div id =" + Room_names + " class = 'room_name' onclick = 'redirectToRoomPage(this.id)'>#" + Room_names +"</div> <hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomPage(name){
      console.log("name");
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
