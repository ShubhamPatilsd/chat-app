var requirejs = require('./r.js');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});
requirejs('dotenv').config();
console.log(process.env.TEST);

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let username=prompt("What's your name?");
function checkName(name){
    if(username.trim()==""){
        username=prompt("That is not a valid name");
        checkName(username);
    }else{
        
    }
}
checkName(username);


document.getElementById("send-message").addEventListener("submit",postChat);





function postChat(e){
    e.preventDefault();
    const dateObj = new Date();
    let Othertimestamp = (dateObj.getMonth()+1+"/"+dateObj.getDate()+"/"+dateObj.getFullYear()+" at "+dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds()).toString();
    const timestamp=Date.now();
    const chatTxt=document.getElementById("chat-txt");
    const message=chatTxt.value;
    const strippedText = $("<div/>").html(message).text();
    if(strippedText.trim()==""){
        
    }else{
    chatTxt.value="";
    db.ref("messages/"+timestamp).set({
        usr: username,
        msg: strippedText,
        time: Othertimestamp
    });
    document.getElementById('test').scrollTop = document.getElementById('test').scrollHeight;
    document.getElementById("chat-txt").focus();
}
}
function closeMessage(){
    const dateObj = new Date();
    let Othertimestamp = (dateObj.getMonth()+1+"/"+dateObj.getDate()+"/"+dateObj.getFullYear()+" at "+dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds()).toString();
    const timestamp=Date.now();
    db.ref("messages/"+timestamp).set({
        usr: "System",
        msg: username+" has left.",
        time: Othertimestamp
    });
    
    
}

//<div class="window" float style="width: 98%">
//<link rel="stylesheet" href="https://unpkg.com/98.css" />




const fetchChat=db.ref("messages/");
fetchChat.on("child_added",function(snapshot){
    const message = snapshot.val();
    const msg = "<li class=\"message\">" + message.usr + " ("+message.time+") : " + message.msg + "</li><br>";
    
    document.getElementById("messages").innerHTML += msg;
    document.getElementById("chat-txt").focus();
    document.getElementById('test').scrollTop = document.getElementById('test').scrollHeight
});

window.addEventListener('beforeunload', function (e) {
    //e.preventDefault();
    //e.returnValue = '';
    closeMessage();
});




