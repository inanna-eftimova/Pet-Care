import { logoutUser } from "../service/http-service.js";
import { deleteUserData, getAccesToken } from "../service/localUserData.js";

async function logout(ctx) {
    await logoutUser(getAccesToken());
    deleteUserData();
    ctx.page.redirect('/')
}
export {
    logout
}