const init = () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
    const imagesContainer = document.getElementById('dog-image-container');
    const dogList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');
    const dogBreeds = [];

    fetch(imgUrl)
    .then(res => res.json())
    .then(json => {
        const { message } = json;

        message.forEach(m => {
            imagesContainer.innerHTML += `<img src="${m}" height="250" width="250">`
        })
    })

    fetch(breedUrl)
    .then(res => res.json())
    .then(json => {
        const { message } = json;

        for (const key of Object.keys(message)) {
            dogList.innerHTML += `<li class="dog-breed">${key}</li>`
            dogBreeds.push(key);
        };
    })

    dogList.addEventListener('click', (event) => {
        if (event.target.tagName === "LI") {
            event.target.style.color = "blue";
        }
    });

    breedDropdown.addEventListener('change', (event) => {
        const { value } = event.target;
        const filteredDogBreeds = dogBreeds.filter(dog => dog.split('')[0] === value);

        dogList.innerHTML = "";
        filteredDogBreeds.forEach(dog => {
            dogList.innerHTML += `<li>${dog}</li>`;
        })
    });
};

document.addEventListener('DOMContentLoaded', init);