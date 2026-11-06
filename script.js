
// Selecionando os elementos do HTML
const senha = document.getElementById("senha");
const gerar = document.getElementById("gerar");
const copiar = document.getElementById("copiar");
const nivel = document.getElementById("nivel");
const mensagem = document.getElementById("mensagem");

// Função para gerar a senha
function gerarSenha() {

    // Pegando as quantidades escolhidas
    const numeros = Number(document.getElementById("numeros").value);
    const maiusculas = Number(document.getElementById("maiusculas").value);
    const minusculas = Number(document.getElementById("minusculas").value);
    const simbolos = Number(document.getElementById("simbolos").value);

    // Verificando se os valores são válidos
    const quantidades = [numeros, maiusculas, minusculas, simbolos];

    if (quantidades.some(q => !Number.isInteger(q) || q < 0 || q > 50)) {
        alert("Digite quantidades entre 0 e 50.");
        return;
    }

    const total = numeros + maiusculas + minusculas + simbolos;

    if (total === 0) {
        alert("Escolha pelo menos um caractere!");
        return;
    }

    // Tipos de caracteres
    const conjuntoNumeros = "0123456789";
    const conjuntoMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const conjuntoMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const conjuntoSimbolos = "!@#$%&*?";

    let caracteres = "";

    // Adicionando os caracteres conforme a escolha
    for (let i = 0; i < numeros; i++) {
        caracteres += conjuntoNumeros[Math.floor(Math.random() * conjuntoNumeros.length)];
    }

    for (let i = 0; i < maiusculas; i++) {
        caracteres += conjuntoMaiusculas[Math.floor(Math.random() * conjuntoMaiusculas.length)];
    }

    for (let i = 0; i < minusculas; i++) {
        caracteres += conjuntoMinusculas[Math.floor(Math.random() * conjuntoMinusculas.length)];
    }

    for (let i = 0; i < simbolos; i++) {
        caracteres += conjuntoSimbolos[Math.floor(Math.random() * conjuntoSimbolos.length)];
    }

    // Embaralhando os caracteres
    let resultado = caracteres.split("");

    resultado.sort(() => Math.random() - 0.5);

    senha.value = resultado.join("");

    // Verificando a segurança
    verificarSeguranca(total, quantidades.filter(q => q > 0).length);

    mensagem.textContent = "Senha gerada com sucesso!";
}

// Função para verificar a segurança
function verificarSeguranca(total, tipos) {

    if (total < 8 || tipos < 2) {
        nivel.textContent = "Não segura";
        nivel.style.color = "#e74c3c";
    }

    else if (total >= 16 && tipos >= 3) {
        nivel.textContent = "Extremamente segura";
        nivel.style.color = "#27ae60";
    }

    else {
        nivel.textContent = "Segura";
        nivel.style.color = "#9b59b6";
    }
}

// Função para copiar a senha
copiar.addEventListener("click", async function() {

    if (senha.value === "") {
        mensagem.textContent = "Gere uma senha primeiro!";
        return;
    }

    try {
        await navigator.clipboard.writeText(senha.value);
        mensagem.textContent = "Senha copiada com sucesso!";
    } catch (erro) {
        mensagem.textContent = "Não foi possível copiar. Copie a senha manualmente.";
    }

});

// Evento do botão gerar
gerar.addEventListener("click", gerarSenha);
