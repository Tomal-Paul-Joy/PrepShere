document.getElementById('send-button').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('photo-button').addEventListener('click', function() {
    document.getElementById('photo-input').click();
});

document.getElementById('file-button').addEventListener('click', function() {
    document.getElementById('file-input').click();
});

document.getElementById('audio-button').addEventListener('click', function() {
    document.getElementById('audio-input').click();
});

document.getElementById('call-button').addEventListener('click', function() {
    alert('Calling feature not implemented.');
});

document.getElementById('photo-input').addEventListener('change', function(event) {
    sendFile(event.target.files[0], 'image');
});

document.getElementById('file-input').addEventListener('change', function(event) {
    sendFile(event.target.files[0], 'file');
});

document.getElementById('audio-input').addEventListener('change', function(event) {
    sendFile(event.target.files[0], 'audio');
});

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();

    if (message !== '') {
        addMessageToChat('user', message);
        inputField.value = '';
        setTimeout(() => {
            addMessageToChat('bot', generateBotResponse(message));
        }, 1000);
    }
}

function addMessageToChat(sender, message, type='text') {
    const chatContent = document.getElementById('chatbox-content');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');

    if (type === 'text') {
        messageContent.textContent = message;
    } else if (type === 'image') {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(message);
        messageContent.appendChild(img);
    } else if (type === 'file') {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(message);
        link.textContent = message.name;
        link.download = message.name;
        messageContent.appendChild(link);
    } else if (type === 'audio') {
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = URL.createObjectURL(message);
        messageContent.appendChild(audio);
    }

    messageElement.appendChild(messageContent);
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function sendFile(file, fileType) {
    addMessageToChat('user', file, fileType);
    setTimeout(() => {
        addMessageToChat('bot', generateBotResponse('file received'), 'text');
    }, 1000);
}

function generateBotResponse(userMessage) {
    const responses = {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! What do you need help with?",
        "help": "Sure, I'm here to help. Please tell me your query.",
        "courses": "We offer various courses in olympaid, bcs,admission test and more. Which one are you interested in?",
        "thank you": "You're welcome! If you have any other questions, feel free to ask.",
        "thanks": "You're welcome! If you have any other questions, feel free to ask."
    };

    const lowerCaseMessage = userMessage.toLowerCase();
    return responses[lowerCaseMessage] || "I'm not sure I understand. Could you please elaborate?";
}
