class User {
    constructor(id, firstName, lastName, email, age, image) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.image = image || "https://via.placeholder.com/150";
    }
}

const users = [];
const userList = document.getElementById("user-list");

// Exibir usuários
function displayUsers() {
    userList.innerHTML = "";
    users.forEach((user) => {
        const item = document.createElement("li");
        item.className = "card";
        item.innerHTML = `
            <div><strong>Nome:</strong> ${user.firstName} ${user.lastName}</div>
            <div><strong>Email:</strong> ${user.email}</div>
            <div><strong>Idade:</strong> ${user.age}</div>
            <img src="${user.image}" alt="Foto do usuário" />
            <button class="remove-btn" onclick="removeUser(${user.id})">Remover</button>
        `;
        userList.appendChild(item);
    });
}

// Adicionar usuário
function addUser() {
    const id = users.length + 1;
    const firstName = document.getElementById("name").value;
    const lastName = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const age = parseInt(document.getElementById("phone").value);
    const image = document.getElementById("website").value;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
        firstName.length >= 3 &&
        lastName.length >= 3 &&
        emailRegex.test(email) &&
        age > 0 &&
        age <= 120
    ) {
        const newUser = new User(id, firstName, lastName, email, age, image);
        users.push(newUser);
        displayUsers();
        document.getElementById("add-user-form").reset();
    } else {
        alert("Preencha os campos corretamente!");
    }
}

// Remover usuário
function removeUser(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        displayUsers();
    }
}

// Inicializar a lista com dados da API
function fetchUsers() {
    fetch("https://dummyjson.com/users")
        .then((response) => response.json())
        .then((data) => {
            data.users.forEach((user) => {
                users.push(
                    new User(
                        user.id,
                        user.firstName,
                        user.lastName,
                        user.email,
                        user.age,
                        user.image
                    )
                );
            });
            displayUsers();
        })
        .catch((error) => console.error("Erro ao carregar usuários:", error));
}

// Chamada inicial ao carregar a página
document.addEventListener("DOMContentLoaded", fetchUsers);
