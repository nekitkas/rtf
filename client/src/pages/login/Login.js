import { Navbar } from "../../components/Navbar/Navbar";
import "../../styles/auth.css";

export function RenderLoginPage() {
  const mainContainer = document.querySelector(".root");
  Navbar();

  const main = document.createElement("main");
  main.className = "main";
  main.innerHTML = `
        <div class="container">
            <div class="auth">
                <form type="submit" action="/login" class="form" method="POST">
                    <h1 class="auth-title">SIGN-IN</h1>

                    <label>EMAIL</label>
                    <input type="email" placeholder="Email address" name="email" />

                    <label>PASSWORD</label>
                    <input type="password" name="password" placeholder="********" />

                    <button type="submit">SIGN-IN</button>

                    <p>
                        Don't have an account?
                        <a href="/./src/templates/register.html">register</a>
                    </p>

                    <div class="errorMsg"></div>
                </form>
            </div>
        </div>
    `;

  mainContainer.appendChild(main);
}
