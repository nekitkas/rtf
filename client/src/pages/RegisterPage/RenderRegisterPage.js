import { Navbar } from "../../components/Navbar/Navbar.js";


export function RenderRegisterPage() {
  const mainContainer = document.querySelector(".root");
  mainContainer.innerHTML = ""
  Navbar();

  const main = document.createElement("main");
  main.className = "main";
  main.innerHTML = `
    <div class="container">
    <div class="auth">
      <form type="submit" action="/register" class="form" method="POST">
        <h1 class="auth-title">REGISTER</h1>
        <label>EMAIL</label>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          required
        />
        <label>USERNAME</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          minlength="3"
          required
        />
        <label>PASSWORD</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          minlength="8"
          maxlength="32"
          required
        />
        <label>CONFIRM PASSWORD</label>
        <input
          type="password"
          name="confirm_password"
          placeholder="********"
          minlength="8"
          maxlength="32"
          required
        />
        <button type="submit">REGISTER</button>
        <p>
          Already have an account? <a href="/./src/templates/login.html">sign-in</a>
        </p>
        <div class="errorMsg"></div>
      </form>
    </div>
  </div>
      `;

  mainContainer.appendChild(main);
}
