import { deletePet } from "../service/http-service.js";
import { getAccesToken } from "../service/localUserData.js";

async function deleteView(ctx) {

    let id = ctx.params.id;

    let result = confirm('Are you sure?')
    if (result) {
        await deletePet(id,getAccesToken());
        ctx.page.redirect('/')
    }

}
export {
    deleteView
}