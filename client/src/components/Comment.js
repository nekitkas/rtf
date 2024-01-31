

export function CreateCommentComponent(createTime, text, author) {
console.log(createTime, text, author);

    const createTimeDiv = document.createElement("div");
    createTimeDiv.className = "commentCreateTime";
    createTimeDiv.textContent = createTime;

    const commentTextBlockDiv = document.createElement("div");
    commentTextBlockDiv.className = "commentTextBlock";

    const commentTextParagraph = document.createElement("p");
    commentTextParagraph.className = "commentText";
    commentTextParagraph.textContent = text;

    commentTextBlockDiv.appendChild(commentTextParagraph);

    const commentAuthorDiv = document.createElement("div");
    commentAuthorDiv.className = "comment-author";
    commentAuthorDiv.textContent = `Author: ${author}`;

    commentDiv.appendChild(createTimeDiv);
    commentDiv.appendChild(commentTextBlockDiv);
    commentDiv.appendChild(commentAuthorDiv);

    return commentDiv;
}