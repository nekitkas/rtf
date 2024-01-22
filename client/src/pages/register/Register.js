import { Navbar } from "../../components/Navbar/Navbar.js";

export function RenderRegisterPage() {
  const mainContainer = document.querySelector(".root");
  mainContainer.innerHTML = "";
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


      <div class="fullName">

        <div>
          <label>FIRST NAME</label>
          <input
                  type="text"
                  placeholder="First name"
                  name="firstname"
                  minlength="3"
                  required
          />

        </div>


        <div>
          <label>LAST NAME</label>
          <input
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  minlength="3"
                  required
          />

        </div>







      </div>




<!--            <fieldset>-->
        <label>GENDER</label>
      <div>
        <select id="gender" name="gender">
          <option value="male" selected>MALE</option>
          <option value="female">FEMALE</option>
          <option value="diverse">DIVERSE</option>
        </select>
      </div>
<!--            </fieldset>-->



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

  const registerForm = document.querySelector('.form');
  registerForm.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(e) {
    e.preventDefault(); // Prevent the default form submission

    const password = document.querySelector('input[name="password"]').value;
    const confirm_password = document.querySelector('input[name="confirm_password"]').value;

    if (password !== confirm_password) {
      alert('Passwords do not match');
      return;
    }


    // Get form data
    const formData = new FormData(registerForm);

    // Create an object from the form data
    const formDataObject = {};
    formData.forEach((value, key) => {
      // Exclude specific fields (e.g., 'confirm_password')
      if (key !== 'confirm_password') {
        formDataObject[key] = value;
      }
    });

    // Log the form data object
    console.log('Form data:', formDataObject);

    // Make a fetch request to the server
    fetch('http://localhost:8080/api/v1/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the response from the server
        console.log('Server response:', data);
      })
      .catch(error => {
        // Handle fetch errors
        console.error('Fetch error:', error);
      });
  }
}
