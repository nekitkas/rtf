

export function CreateCommentComponent(createTime, text, author) {

    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    const createTimeDiv = document.createElement("div");
    createTimeDiv.className = "commentCreateTime";

    const dateObject = new Date(createTime);

    const formattedCommentDate = dateObject.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    createTimeDiv.textContent = formattedCommentDate;

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