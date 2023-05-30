import greenlet from 'greenlet'
const cinemasController = require("../controllers-layer/cinemas-controller");
const cinemasController = require("../controllers-layer/cinemas-controller");

let getName = greenlet( async () => {
    const cinemas = cinemasController.get();

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        for
    }

    let url = `https://api.github.com/users/${username}`
    let res = await fetch(url)
    let profile = await res.json()
    return profile.name
})

console.log(await getName('developit'))