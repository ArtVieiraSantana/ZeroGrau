const MOCK_USERS = [
    { nome: "Usuário Teste", email: "teste@exemplo.com", cpf: "123.456.789-00", password: "senha" }
];

const API_MOCK = {
    async cadastrar(nome, email, password, cpf) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simula latência

        if (MOCK_USERS.find(user => user.email === email)) {
            return { success: false, message: "Este e-mail já está cadastrado." };
        }

        const newUser = { nome, email, cpf, password };
        MOCK_USERS.push(newUser);
        console.log("Novo usuário cadastrado (MOCK):", newUser);

        return { success: true, message: "Cadastro realizado com sucesso!" };
    },

    async login(email, password) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simula latência

        const user = MOCK_USERS.find(u => u.email === email && u.password === password);

        if (user) {
            const { password, ...sessionUser } = user;
            return { success: true, message: "Login bem-sucedido!", user: sessionUser };
        } else {
            return { success: false, message: "E-mail ou senha inválidos." };
        }
    }
};
