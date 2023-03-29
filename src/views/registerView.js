import { html } from '../../node_modules/lit-html/lit-html.js'
import { saveUserData } from '../service/localUserData.js';
import { registerUser } from '../service/http-service.js';

const registerTemplate = (register) => html`
 <section id="registerPage">
            <form class="registerForm" @submit=${register}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>`

const registerView = (ctx) => {
    async function register(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('repeatPassword')

        if (!email || !password || !rePass) {
            return alert('Fill all fields!');
        }
        if (password != rePass) {
            return alert('Passwords don\'t match!');
        }

        let registerRequest = await registerUser(email, password)
        if (!registerRequest.ok) {
            return alert(`Error ${registerRequest.status}`)
        }

        let user = await registerRequest.json();
        saveUserData(user)
        ctx.page.redirect('/')

    }
    ctx.render(registerTemplate(register))
}

export {
    registerView
}