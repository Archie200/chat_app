const archieSelectorBtn = document.querySelector('#archie-selector')
const michaelSelectorBtn = document.querySelector('#michael-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

let messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
    <div class="message ${message.sender === 'Archie' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
`

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    })
}

let messageSender = 'Archie'

const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}`

    if (name === 'Archie') {
        archieSelectorBtn.classList.add('active-person')
        michaelSelectorBtn.classList.remove('active-person')
    }

    if (name === 'Michael') {
        michaelSelectorBtn.classList.add('active-person')
        archieSelectorBtn.classList.remove('active-person')
    }

    chatInput.focus()
}

archieSelectorBtn.onclick = () => updateMessageSender('Archie')
michaelSelectorBtn.onclick = () => updateMessageSender('Michael')

const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))
    chatMessages.innerHTML += createChatMessageElement(message)

    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    messages = []
    chatMessages.innerHTML = ''
})