import { getPetDetails, isDonated, getTotalDonations, donate } from "../service/http-service.js";
import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import { isOwner, isLogged, getId, getAccesToken } from "../service/localUserData.js";

const detailsTemplate = (pet, count, donatePet, donated) => html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src='${pet.image}'>
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${pet.name}</h1>
                    <h3>Breed: ${pet.breed}</h3>
                    <h4>Age: ${pet.age}</h4>
                    <h4>Weight: ${pet.weight}</h4>
                    <h4 class="donation">Donation: ${count}$</h4>
                </div>
                ${isLogged() ? html`<div class="actionBtn">
                    ${isOwner(pet._ownerId) ? html` <a href="/details/edit/${pet._id}" class="edit">Edit</a>
                    <a href="/details/delete/${pet._id}" class="remove">Delete</a>` : nothing}
    
                    ${!isOwner(pet._ownerId) && !donated ? html`<a @click=${donatePet} href="javascript:void(0)" class="donate">Donate</a>` : nothing}
    
                </div>`: nothing}
    
            </div>
        </div>
    </section>`

const detailsView = async (ctx) => {

    let id = ctx.params.id;
    let donated = false;
    if (isLogged()) {
        donated = await isDonated(id, getId());
    }

    async function donatePet() {
        await donate(getAccesToken(), id)
        ctx.page.redirect(`/details/${id}`)
    }
    let count = await getTotalDonations(id);

    let pet = await getPetDetails(id)

    ctx.render(detailsTemplate(pet, count, donatePet, donated))


}
export {
    detailsView
}