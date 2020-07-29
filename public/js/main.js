const chatMessages = document.querySelector('.chat-messages');
const chatForm = document.getElementById('chat-form');


// get username and room from URL
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

console.log(username, room);
const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room })

socket.on('msg', (msg) => {
  console.log(msg);
  outputMessage(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
})


chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get the msg
  const msg = e.target.elements.msg.value;
  // Scroll down
  //Emit message to the server
  socket.emit('chatMessage', msg);
  // clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});


// Output message to DOM
function outputMessage({username, text, time}) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = ` <p class='meta'> ${username} <span> ${time} </span></p>
            <p class='text'>
              ${text}
            </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}