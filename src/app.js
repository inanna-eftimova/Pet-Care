import page from '../node_modules/page/page.mjs'
import { navigationView } from './views/navigationView.js';
import { loginView } from './views/loginView.js';
import {renderCtx} from "../src/middlewares/render.js"
import {registerView} from"./views/registerView.js" 
import {logout} from "./views/logoutView.js"
import {homeView} from "./views/homeView.js"
import {dashboardView} from './views/dashboardView.js'
import {createView} from './views/createView.js'
import {detailsView} from './views/detailsView.js'
import {editView} from './views/editPetView.js'
import {deleteView } from './views/deletePetView.js'

page(renderCtx);
page(navigationView);
page('/login',loginView)
page('/register',registerView)
page('/logout',logout)
page('/',homeView)
page('/dashboard',dashboardView)
page('/create',createView)
page('/details/edit/:id',editView)
page('/details/delete/:id',deleteView)
page('/details/:id',detailsView)


page.start();