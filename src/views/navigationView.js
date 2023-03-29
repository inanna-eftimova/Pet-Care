import { render, html } from "../../node_modules/lit-html/lit-html.js"
import { isLogged } from "../service/localUserData.js"

const navTemplate = () => html`
<section class="logo">
    <img src="./images/logo.png" alt="logo">
</section>
<ul>

    <li><a href="/">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    ${isLogged() ?
       html`<li><a href="/create">Create Postcard</a></li>
    <li><a href="/logout">Logout</a></li>`:
       html`<li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`}

</ul>
`
const navigationView = (ctx, next) => {
    render(navTemplate(), document.querySelector('nav'))
    next();
}


export {
    navigationView
}