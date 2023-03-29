const baseUrl = `http://localhost:3030`

async function loginUser(email, password) {
    let loginRequest = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    return loginRequest;

}

async function registerUser(email, password) {
    let registerRequest = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    return registerRequest;

}

async function logoutUser(auth) {
    await fetch(`${baseUrl}/users/logout`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': auth,
        }
    })
}

async function getAllPets() {

    let loadRequest = await fetch(`${baseUrl}/data/pets?sortBy=_createdOn%20desc&distinct=name`);
    let pets = await loadRequest.json();
    return pets;
}

// var getAllPets = Observable.fromPromise(fetch(`${baseUrl}/data/pets?sortBy=_createdOn%20desc&distinct=name`));
// getAllPets.subscribe(x => console.log(x), e => console.error(e));

async function getPetDetails(id) {
    let getRequest = await fetch(`${baseUrl}/data/pets/${id}`);
    let pet = await getRequest.json();
    return pet;
}

async function createPet(token, name, breed, age, weight, image) {

    await fetch(`${baseUrl}/data/pets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({
            name,
            breed,
            age,
            weight,
            image
        })
    })
}

async function deletePet(id, auth) {
    await fetch(`${baseUrl}/data/pets/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': auth
        }
    });

}

async function updatePet(id, token, name, breed, age, weight, image) {

    await fetch(`${baseUrl}/data/pets/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({
            name,
            breed,
            age,
            weight,
            image
        })
    })
}


async function donate(token, petId) {
    await fetch(`${baseUrl}/data/donation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({
            petId
        })
    })
}

async function getTotalDonations(petId) {

    let request = await fetch(`${baseUrl}/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
    let count = await request.json();
    return count*100;
}

async function isDonated(petId, userId) {
    let request = await fetch(`${baseUrl}/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    let donated = await request.json()
    if (donated > 0) {
        return true;
    } else {

        return false;
    }

}

export {
    getAllPets,
    getPetDetails,
    loginUser,
    registerUser,
    logoutUser,
    createPet,
    updatePet,
    deletePet,
    donate,
    getTotalDonations,
    isDonated
}