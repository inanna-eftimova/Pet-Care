import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import { getAccesToken } from '../service/localUserData.js';
import { updatePet, getPetDetails } from '../service/http-service.js';

const editTemplate = (book, edit) => html`
    <section id="editPage">
            <form class="editForm" @submit=${edit}>
                <img src="./images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" .value=${book.name}>
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" .value=${book.breed}>
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" .value=${book.age}>
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" .value=${book.weight}>
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" .value=${book.image}>
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>`

const editView = async (ctx) => {

    let id = ctx.params.id;
    let book = await getPetDetails(id);

    async function edit(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let name = formData.get('name');
        let breed = formData.get('breed');
        let age = formData.get('age');
        let weight = formData.get('weight');
        let image = formData.get('image');

        if (!name || !breed || !age || !weight||!image) {
            alert('Fill all fields');
            return;
        }
        await updatePet(id,getAccesToken(), name,breed,age,weight,image)

        ctx.page.redirect(`/details/${id}`)

    }
    ctx.render(editTemplate(book, edit))
}

export {
    editView
}