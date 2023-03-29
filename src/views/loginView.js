import { html } from '../../node_modules/lit-html/lit-html.js'
import { saveUserData } from '../service/localUserData.js';
import { loginUser } from '../service/http-service.js';

const loginTemplate = (login) => html`
  <section id="loginPage">
            <form class="loginForm" @submit=${login}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </form>
        </section>`

const loginView = (ctx) => {
    async function login(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let email = formData.get('email');
        let password = formData.get('password');

        if (!email || !password) {
            alert('Fill all fields');
            return;
        }

        let loginRequest = await loginUser(email, password)
        if (!loginRequest.ok) {
            return alert(`Error ${loginRequest.status}`)
        }

        let user = await loginRequest.json();
        saveUserData(user)
        ctx.page.redirect('/')

    }
    ctx.render(loginTemplate(login))
}

export {
    loginView
}