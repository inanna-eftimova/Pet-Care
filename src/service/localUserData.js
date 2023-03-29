function isLogged() {
    if (localStorage.getItem('user')) {
        return true;
    }
    return false;
}

function getAccesToken() {
    return isLogged()?JSON.parse(localStorage.getItem('user')).accessToken:false;
}

function getId() {
    return isLogged()?JSON.parse(localStorage.getItem('user'))._id:false;
}
function getEmail() {
    return isLogged()?JSON.parse(localStorage.getItem('user')).email:false;
}
function isOwner(id) {
    if (id == getId()) {
        return true;
    }
    return false;
}

function saveUserData(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

function deleteUserData() {
    localStorage.clear();
}


export {
    isLogged,
    getAccesToken,
    getId,
    isOwner,
    saveUserData,
    deleteUserData,
    getEmail
}