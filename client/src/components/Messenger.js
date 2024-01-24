

export function RenderMessenger(){

    const messenger = document.createElement('div');
    messenger.classList.add('messenger');

    const chatHeader = document.createElement('div');
    chatHeader.classList.add('chat-header');


    const userImage = document.createElement('img');
    userImage.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwme89cM8YZvHcybGrZl_Obd9U9p5QabozJQ&usqp=CAU';
    userImage.alt = 'chat-user';




    const userName = document.createElement('p');
    userName.textContent = 'Elissa Thompson';

    const closeIcon = document.createElement('img');
    closeIcon.src = '/assets/close.svg';
    closeIcon.alt = 'close';

    chatHeader.appendChild(userImage);
    chatHeader.appendChild(userName);
    chatHeader.appendChild(closeIcon);

    const chatBody = document.createElement('div');
    chatBody.classList.add('chat-body');

// Sample messages
    const messages = [
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'left' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'right' },
        { text: "asdasd", class: 'right' },
        { text: "Hello world", class: 'right' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'left' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'right' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'left' },
        { text: "Hello ", class: 'left' },
        { text: "How are YOur dasd asdasd", class: 'left' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'right' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'left' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'right' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'left' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'right' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'left' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'right' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'left' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'right' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'left' },
        { text: "Hello world\nHow are YOur dasd asdasd", class: 'right' },
        // Add more messages as needed
    ];

    messages.forEach(message => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('msg');

        const msgText = document.createElement('p');
        msgText.classList.add(message.class);
        msgText.textContent = message.text;

        msgDiv.appendChild(msgText);
        chatBody.appendChild(msgDiv);
    });

    const chatFooter = document.createElement('div');
    chatFooter.classList.add('chat-footer');

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Aa';

    const sendIcon = document.createElement('img');
    sendIcon.src = './assets/send.svg';
    sendIcon.alt = 'send';

    chatFooter.appendChild(inputField);
    chatFooter.appendChild(sendIcon);

    messenger.appendChild(chatHeader);
    messenger.appendChild(chatBody);
    messenger.appendChild(chatFooter);



    return messenger


}




// Append the 'messenger' element to the document or any other container element in your HTML

