const pageUsers = []
function displayUsers() {}
function fetchUsers() {}
function addUser() {}
function removeUser(userId) {}
document.addEventListener("DOMContentLoaded", function () {
 // Cria lista de usuários a partir da chamada da API
 fetchUsers();
});

function displayUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    pageUsers.forEach(user => {
    const listItem = document.createElement("li");
    listItem.setAttribute("class", "card");
    // Adiciona todos os campos disponíveis e o botão de remoção
    listItem.innerHTML = `<div class="space"><strong>Nome:</strong> ${user.name}</div>
    <div class="space"><strong>Usuário:</strong> ${user.username}</div>
    <div class="space"><strong>Email:</strong> ${user.email}</div>
    <div class="space"><strong>Telefone:</strong> ${user.phone || 'N/A'}</div>
    <div class="space"><strong>Site:</strong> ${user.website || 'N/A'}</div>
    <button onclick="removeUser(${user.id})" class="remove-btn">
    <i class="bi bi-trash"></i>
    </button>`;
    userList.appendChild(listItem);
    });
}
function fetchUsers() {
    // Substitua a URL pela API desejada
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    // Fazendo uma requisição à API
    fetch(apiUrl)
    .then(response => response.json())
    .then(users => {
    // Itera sobre a lista de usuários e cria elementos HTML
    users.forEach(user => {
    pageUsers.push(new User(user.id, user.name, user.username, user.email, user.phone, user.website));
    });
    console.log(pageUsers);
    // Mostra lista de usuários
    displayUsers();
    })
    .catch(error => console.error("Erro ao obter dados da API:", error));
}

function addUser() {
    const addUserForm = document.getElementById("add-user-form");
    // Obtem os valores do formulário
    const id = pageUsers[pageUsers.length - 1].id + 1;
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const website = document.getElementById("website").value;
    // Verifica se o campo de nome não está vazio
    if (name.trim() !== "") {
    pageUsers.push(new User(id, name, username, email, phone, website));
    // Limpa o formulário
    addUserForm.reset();
    // Mostra lista de usuários
    displayUsers();
    }
}
function removeUser(userId) {
    // Apenas checando se é o usuário correto
    console.log("Removendo usuário com ID:", userId);
    // Encontrando índice do usuário que vai ser removido
    const userIndexToRemove = pageUsers.findIndex((user) => user.id === userId);
    // Removendo usuário da lista
    pageUsers.splice(userIndexToRemove, 1);
    // Atualizando lista na tela
    displayUsers();
}
