document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('user-input');
    const yearSpan = document.getElementById('year');

    yearSpan.textContent = new Date().getFullYear();

    chatForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const userText = userInput.value.trim();

        if (userText === '') return;

        // Mostra mensagem do usuário
        appendMessage('user', userText);
        userInput.value = '';

        // Simula o bot digitando
        const typingMessage = appendMessage('bot', 'Bot FURIA está digitando...', true);

        let botMessageText = "";

        try {
            // Detecção de intenção com RegEx
            if (/próximo jogo|quando (vai )?jogar/.test(userText.toLowerCase())) {
                botMessageText = "O próximo jogo da FURIA será contra a Team Liquid, no dia 30 de abril de 2025!";
            } else if (/jogador mais antigo|quem é o mais antigo/.test(userText.toLowerCase())) {
                botMessageText = "O jogador mais antigo da FURIA é o 'FURIA player', que está na equipe desde o início!";
            } else if (/escalação|jogadores da equipe|quem são os jogadores/.test(userText.toLowerCase())) {
                botMessageText = "A escalação atual da FURIA é: Yuurih, Kscerato, Vini, Art e Drop!";
             } else if (/último resultado|como foi o último jogo/.test(userText.toLowerCase())) {
                    botMessageText = "O último jogo da FURIA foi contra a NAVI e eles venceram por 2 a 1!";
                
            } else {
                // Frases motivacionais ou genéricas
                const frasesPortugues = [
                    "A persistência realiza o impossível.",
                    "Acredite em você e tudo será possível.",
                    "Grandes batalhas são dadas aos grandes guerreiros.",
                    "Nada é em vão, tudo é aprendizado.",
                    "Fé para os dias difíceis, força para a caminhada e foco para as conquistas."
                ];
                const randomIndex = Math.floor(Math.random() * frasesPortugues.length);
                botMessageText = `"${frasesPortugues[randomIndex]}"`;
            }

            // Remove o "digitando..." e coloca a resposta final
            chatbox.removeChild(typingMessage);
            appendMessage('bot', botMessageText);

        } catch (error) {
            console.error("Erro ao processar mensagem:", error);
            chatbox.removeChild(typingMessage);
            appendMessage('bot', "Não consegui processar sua pergunta, tente novamente. 😢");
        } finally {
            // Garante que a barra de rolagem sempre vá para o final
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    });

    function appendMessage(sender, text, isTyping = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender);
        messageDiv.textContent = (sender === 'user' ? 'Você: ' : 'Bot FURIA: ') + text;
        chatbox.appendChild(messageDiv);
        return messageDiv;
    }
});