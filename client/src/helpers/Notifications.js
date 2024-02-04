


export function ShowNotificationsModal(){
    const modal = document.querySelector(".notifications-modal");
    modal.classList.toggle("show-notifications-modal");
}


export function AddNotification(id,message){


    const notification = document.createElement("div");
    notification.className = "notification";

    const notficationMsg = document.createElement("p");
    notficationMsg.classList.add("notification-msg");
    notficationMsg.textContent = truncateText(message, 15);

   const messageAuthor = document.createElement("div");
    messageAuthor.className = "message-author";
    messageAuthor.textContent = id;

    notification.appendChild(notficationMsg);
    notification.appendChild(messageAuthor)

    document.querySelector(".notifications-modal").appendChild(notification);
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
    } else {
        return text;
    }
}

