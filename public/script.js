const socket = io();

let username;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    username = prompt('Please enter your name...')
} while (!username);


textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
        e.target.value = "";
    }
})

function sendMessage(message){
    let msg = {
        user: username,
        message: message.trim(),
    }
    // Append
    appendMessage(msg, "outgoing");
    scrollToBottom();

    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
     
    mainDiv.classList.add(type, 'message')
    let markup = `<h4>${msg.user}</h4>
                <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);
}

// Recieve Message

socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}
