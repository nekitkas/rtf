export function RenderMessenger() {
  const messenger = document.createElement("div")
  messenger.classList.add("messenger")

  const chatHeader = document.createElement("div")
  chatHeader.classList.add("chat-header")

  const userImage = document.createElement("img")
  userImage.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwme89cM8YZvHcybGrZl_Obd9U9p5QabozJQ&usqp=CAU"
  userImage.alt = "chat-user"

  const userName = document.createElement("p")
  userName.textContent = "Elissa Thompson"

  const closeIcon = document.createElement("img")
  closeIcon.src = "/assets/close.svg"
  closeIcon.alt = "close"

  chatHeader.appendChild(userImage)
  chatHeader.appendChild(userName)
  chatHeader.appendChild(closeIcon)

  const chatBody = document.createElement("div")
  chatBody.classList.add("chat-body")

  // Sample messages
  const messages = [
    {
      text: "Hey there! Have you delved into the Cyberpunk universe lately?",
      class: "left",
    },
    {
      text: "Absolutely! Night City is as chaotic as ever. The neon lights, the tech, it's all so immersive.",
      class: "right",
    },
    {
      text: "I know, right? The cityscape is mind-blowing. Did you explore the Badlands yet?",
      class: "left",
    },
    {
      text: "Just started roaming there. The wasteland vibes and the Nomad life are a whole new experience.",
      class: "right",
    },
    {
      text: "Nice! Nomad path adds such a different perspective. What's your go-to cyberware setup?",
      class: "left",
    },
    {
      text: "I'm all about the mantis blades and the projectile launch system. Makes every encounter intense. You?",
      class: "right",
    },
    {
      text: "Smart choice! I'm a netrunner at heart. Hacking into systems and manipulating the environment is my thing.",
      class: "left",
    },
    {
      text: "Oh, the hacking aspect is so intricate. Have you uncovered any hidden gems or Easter eggs in the game?",
      class: "right",
    },
    {
      text: "Found a few! There's this hidden bar with an NPC telling crazy stories about the old net. It's a goldmine.",
      class: "left",
    },
    {
      text: "Nice find! The attention to detail is insane. And the soundtrack? Pure cyberpunk vibes. Favorite track?",
      class: "right",
    },
    {
      text: "Gotta be 'Chippin' In' by Samurai. Takes me back to those Keanu Reeves moments. You?",
      class: "left",
    },
    {
      text: "'Never Fade Away' by Kerry Eurodyne. The emotions it evokes during key moments are unparalleled.",
      class: "right",
    },
    {
      text: "True, the narrative is gripping. Speaking of which, which lifepath did you choose for your V?",
      class: "left",
    },
    {
      text: "Street Kid. I love the street-smart attitude. You get to navigate the underbelly of Night City.",
      class: "right",
    },
    {
      text: "Nice. I went with Nomad for that nomadic freedom. Different paths, but both lead to a wild Cyberpunk journey!",
      class: "left",
    },
    // Add more messages as needed
  ]

  messages.forEach((message) => {
    const msgDiv = document.createElement("div")
    msgDiv.classList.add("msg")

    const msgText = document.createElement("p")
    msgText.classList.add(message.class)
    msgText.textContent = message.text

    msgDiv.appendChild(msgText)
    chatBody.appendChild(msgDiv)
  })

  const chatFooter = document.createElement("div")
  chatFooter.classList.add("chat-footer")

  const inputField = document.createElement("input")
  inputField.type = "text"
  inputField.placeholder = "Aa"

  const sendIcon = document.createElement("img")
  sendIcon.src = "./assets/send.svg"
  sendIcon.alt = "send"

  chatFooter.appendChild(inputField)
  chatFooter.appendChild(sendIcon)

  messenger.appendChild(chatHeader)
  messenger.appendChild(chatBody)
  messenger.appendChild(chatFooter)

  return messenger
}

// Append the 'messenger' element to the document or any other container element in your HTML
