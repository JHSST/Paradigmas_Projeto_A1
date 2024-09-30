// Importando a biblioteca prompt-sync para capturar entradas do usuário
const prompt = require('prompt-sync')({ sigint: true });

// Array de usuários para simular o banco de dados
let users = [];

// Função para criar um novo usuário
function createUser() {
    // Captura o nome e email do usuário
    const name = prompt('Digite o nome do usuário: ');
    const email = prompt('Digite o email do usuário: ');
    
    // Verifica se o nome e email foram fornecidos
    if (!name || !email) {
        console.log("Nome e email são obrigatórios para criar um usuário.");
        return null;
    }
    
    // Verifica se o email já existe no sistema
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
        console.log(`O email ${email} já está em uso.`);
        return null;
    }

    // Gera um ID único para o novo usuário
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    
    // Cria um objeto de usuário com ID, nome e email
    const user = { id, name, email };
    
    // Adiciona o novo usuário ao array de usuários
    users.push(user);
    
    // Exibe o usuário criado
    console.log(`Usuário criado:`, user);
    console.log();
    return user;
}

// Função para exibir todos os usuários
function readAllUsers() {
    console.log(`Lista de todos os usuários:`);
    users.forEach(user => {
        console.log(`ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`);
    });
    console.log();
}

// Função para buscar um usuário específico pelo ID
function readUserById() {
    const id = parseInt(prompt('Digite o ID do usuário: '));
    const user = users.find(user => user.id === id);
    if (user) {
        console.log(`Usuário encontrado:`);
        console.log(`ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`);
    } else {
        console.log(`Usuário com ID ${id} não encontrado.`);
    }
    console.log();
}

// Função para atualizar um usuário pelo ID
function updateUser() {
    const id = parseInt(prompt('Digite o ID do usuário que deseja atualizar: '));
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex !== -1) {
        const updatedName = prompt('Digite o novo nome (deixe em branco para manter o mesmo): ');
        const updatedEmail = prompt('Digite o novo email (deixe em branco para manter o mesmo): ');

        // Atualiza os dados do usuário se fornecido, ou mantém o atual
        users[userIndex].name = updatedName || users[userIndex].name;
        users[userIndex].email = updatedEmail || users[userIndex].email;

        console.log(`Usuário atualizado:`);
        console.log(`ID: ${users[userIndex].id}, Nome: ${users[userIndex].name}, Email: ${users[userIndex].email}`);
    } else {
        console.log(`Usuário com ID ${id} não encontrado.`);
    }
    console.log();
}

// Função para deletar um usuário pelo ID
function deleteUser() {
    const id = parseInt(prompt('Digite o ID do usuário que deseja deletar: '));
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        console.log(`Usuário deletado:`);
        console.log(`ID: ${deletedUser[0].id}, Nome: ${deletedUser[0].name}, Email: ${deletedUser[0].email}`);
    } else {
        console.log(`Usuário com ID ${id} não encontrado.`);
    }
    console.log();
}

// Função para exibir o menu de opções do CRUD
function showMenu() {
    console.log('Sistema de Gerenciamento de Usuários:');
    console.log('1. Criar usuário');
    console.log('2. Listar todos os usuários');
    console.log('3. Buscar usuário por ID');
    console.log('4. Atualizar usuário');
    console.log('5. Deletar usuário');
    console.log('6. Sair');
    console.log();
}

// Função principal que executa o loop do menu
function main() {
    let option = 0;
    while (option !== 6) {
        showMenu();
        option = parseInt(prompt('Escolha uma opção: '));
        
        switch (option) {
            case 1:
                createUser();
                break;
            case 2:
                readAllUsers();
                break;
            case 3:
                readUserById();
                break;
            case 4:
                updateUser();
                break;
            case 5:
                deleteUser();
                break;
            case 6:
                console.log('Encerrando o programa...');
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                break;
        }
    }
}

// Executa o programa
main();
