var divMessages = document.querySelector("#messages");
var divOnlineUsers = document.querySelector("#onlineUsers");


function createMessageElement(message) {
  var p = document.createElement("p");
  p.innerHTML = message.username + ' : ' + message.content

  return p;
}

function createOnlineUsersElement(message) {
  var p = document.createElement("p");
  p.innerHTML = message.username

  return p;
}


function getMessages() {
  var url = "https://run.mocky.io/v3/ce541268-9685-4aac-8e07-6de953927678";

  return fetch(url)
    .then((res) => res.json())
    .then((result) => {
        result.messages.forEach((message) => {
          const index = result.users.findIndex((user)=> user.id === message.userId)

          const dataMessage = {...message, ...result.users[index]}
          
          divMessages.appendChild(createMessageElement(dataMessage))
          divOnlineUsers.appendChild(createOnlineUsersElement(dataMessage))
        });
      });
}