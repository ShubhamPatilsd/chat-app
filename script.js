const firebaseConfig = {
    apiKey: "AIzaSyCkapaKPViCeM3_nE_jBV4X5FkdbcvbWpM",
    authDomain: "realtime-chat-176dc.firebaseapp.com",
    projectId: "realtime-chat-176dc",
    storageBucket: "realtime-chat-176dc.appspot.com",
    messagingSenderId: "13392932731",
    appId: "1:13392932731:web:647bfba21e0cead5a6d7de"
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
    chatTxt.value="";
    db.ref("messages/"+timestamp).set({
        usr: username,
        msg: message,
        time: Othertimestamp
    });
    document.getElementById("chat-txt").focus();
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
    //document.getElementById("chat-txt").focus();
}






const fetchChat=db.ref("messages/");
fetchChat.on("child_added",function(snapshot){
    const message = snapshot.val();
    const msg = "<li>" + message.usr + " ("+message.time+") : " + message.msg + "</li><br>";
    
    document.getElementById("messages").innerHTML += msg;
    document.getElementById("chat-txt").focus();
});

window.addEventListener('beforeunload', function (e) {
    //e.preventDefault();
    //e.returnValue = '';
    closeMessage();
});