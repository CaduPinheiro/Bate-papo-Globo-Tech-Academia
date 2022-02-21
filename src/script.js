var divMessages = document.querySelector("#messages");
var divOnlineUsers = document.querySelector("#onlineUsers");
var inputSendMessage = document.querySelector("#sendMessage");
var users;

/**
 * Insere Mensagens no HTML
 * @returns 
 */
function createMessageElement(message) {
  var p = document.createElement("p");
  p.innerHTML = message.username + " : " + message.content;
  return p;
}

/**
 * Insere Usuários no HTML
 * @returns 
 */

function createOnlineUsersElement(message) {
  var p = document.createElement("p");
  p.innerHTML = message.username;

  return p;
}

/**
 * Funcão se inicialização
 * @returns 
 */
async function init() {
  await getUsers();
  getMessages();
}

/**
 * Funcão que retorna as mensagens
 * @returns 
 */
function getMessages() {
  var url = "https://run.mocky.io/v3/0dbb135b-da66-425b-8b87-727cd2684750";

  return fetch(url)
    .then((res) => res.json())
    .then((result) => {

      result.messages.forEach((message) => {
      const index = users.users.findIndex((user) => user.id === message.userId);

      const dataMessage = { ...message, ...users.users[index] };
        
      setInterval(() => {
        divMessages.appendChild(createMessageElement(dataMessage));
      }, 2000);     

      });
    });
}

/**
 * Funcão que retorna os usuários
 * @returns 
 */

function getUsers() {
  console.log("entrou");
  var url = "https://run.mocky.io/v3/f064f884-dab0-4ed4-874e-3ffbae904f93";

  return fetch(url)
    .then((res) => res.json())
    .then((result) => {
      users = result;
      result.users.forEach((users) => {
        divOnlineUsers.appendChild(createOnlineUsersElement(users));
      });
    });
}

/**
 * Funcão que envia mensagem
 * @returns 
 */
function sendMessage() {
  divMessages.appendChild(createMessageElement({
    username: "Eu",
    content: inputSendMessage.value
  }));

  inputSendMessage.value = "" 

}
