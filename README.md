

# Real-Time Forum

## Introduction

The Real-Time Forum is an advanced web application designed to facilitate dynamic interactions among users through features like post creation, commenting, live messaging, and more, all in real-time. This project builds upon a previous forum model, enhancing its capabilities with real-time data exchange using WebSockets, a single-page application (SPA) architecture, and a blend of technologies including SQLite, Golang, JavaScript, HTML, and CSS.

## Table of Contents
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
  - [Registration and Login](#registration-and-login)
  - [Creating Posts and Comments](#creating-posts-and-comments)
  - [Private Messages](#private-messages)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

<hr>

## DEMO

**Our link** :
<center>

 http://165.22.197.149:3000/

<span style="color:red">*Note: This offer is valid until the completion of audits.*</span>

</center>

<hr>

## Installation

1. **Clone the repository:**

```bash
git clone "LINK HERE"
cd real-time-forum
```

2. **Set up the Backend (Golang):**

Ensure Go is installed and set up the Go workspace.

```bash
make run-api
```

3. **Set up the Frontend(in separate terminal):**

```bash
make run-client
```

4. **Database Setup:**

The Database is set up each time you run the backend, if database exists, then nothing happens.

## Usage

### Registration and Login

- Users must register with a nickname, age, gender, first name, last name, email, and password.
- Login using either the nickname or email combined with the password.
- A logout feature must be accessible from any page.

### Creating Posts and Comments

- Users can create posts assigned to categories and comment on these posts.
- Posts are visible in a feed display, with comments accessible upon clicking on a post.

### Private Messages

- A chat feature for sending private messages, showing online/offline users, and reloading past messages.
- Real-time message exchange is facilitated through WebSockets.

## Features

- **Single Page Application:** Dynamic content loading without refreshing the page.
- **Real-Time Data Exchange:** Utilizing WebSockets for live updates.
- **SQLite Database:** For storing user data, posts, comments, and messages.
- **Secure Registration and Login:** With hashed passwords.

## Dependencies

- **Golang** for the backend logic.
- **Gorilla Websocket** for real-time communication.
- **SQLite3** for database management.
- **bcrypt** for password hashing.
- **UUID** for unique identifiers.

## Configuration

Environmental variables and configurations are located in `config.json`. Adjust database paths, server ports, and other settings as needed.

## Contributors

<div align="center">
  <table>
    <tbody><tr>
      <td align="center"><a href="https://01.kood.tech/git/azindiks" rel="nofollow"><img src="https://01.kood.tech/git/avatars/3dc29a90b6669d5d43b4c1cb57f84ef6?size=870" alt="azindiks" width="100"></a></td>
      <td align="center"><a href="https://01.kood.tech/git/iskorokh" rel="nofollow"><img src="https://01.kood.tech/git/avatars/8eba7c3eae2bbd752aad7eca5408beb2?size=870" alt="iskorokh" width="100"></a></td>
      <td align="center"><a href="https://01.kood.tech/git/nekitkas" rel="nofollow"><img src="https://01.kood.tech/git/avatars/912995c935e2a5b0b26f10c00eaa9e36?size=870" alt="nekitkas" width="100"></a></td>
      <td align="center"><a href="https://01.kood.tech/git/mkuzmina" rel="nofollow"><img src="https://01.kood.tech/git/avatars/e93fda0671647220cf65070aa5afc03a?size=870" alt="mkuzmina" width="100"></a></td>
       <td align="center"><a href="https://01.kood.tech/git/hmahar" rel="nofollow"><img src="https://01.kood.tech/git/avatars/1a0705a2bf733df12b22a69273e2c7b3?size=870" alt="hmahar" width="100"></a></td>
    </tr>
    <tr>
      <td align="center">azindiks</td>
      <td align="center">iskorokh</td>
      <td align="center">nekitkas</td>
      <td align="center">mkuzmina</td>
      <td align="center">hmahar</td>
    </tr>
  </tbody></table>
</div>

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

