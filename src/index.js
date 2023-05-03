document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById("table-body");
    getDogs(tableBody);
    editFormSubmit();
});

function getDogs(tableBody) {
    fetch("http://localhost:3000/dogs")
        .then(res => res.json())
        .then(dogs => dogs.forEach(dog => displayDogs(dog, tableBody)))
        .catch(err => console.log(err))
}

function displayDogs(dog, tableBody) {
    const dogRow = document.createElement("tr");
    const dogName = document.createElement("td");
    const dogBreed = document.createElement("td");
    const dogSex = document.createElement("td");
    const editDog = document.createElement("button");

    dogName.textContent = dog.name;
    dogBreed.textContent = dog.breed;
    dogSex.textContent = dog.sex;
    editDog.textContent = "Edit Dog";

    dogRow.append(dogName, dogBreed, dogSex, editDog);
    tableBody.appendChild(dogRow);

    editDogHandler(dog, editDog);
}

function editDogHandler(dog, editBtn) {
    const nameInput = document.getElementsByName("name")[0];
    const breedInput = document.getElementsByName("breed")[0];
    const sexInput = document.getElementsByName("sex")[0];
    const idInput = document.getElementsByName("id")[0];

    editBtn.addEventListener("click", () => {
        nameInput.value = dog.name;
        breedInput.value = dog.breed;
        sexInput.value = dog.sex;
        idInput.value = dog.id;
    })

}

function editFormSubmit() {
    const dogForm = document.getElementById("dog-form");

    dogForm.addEventListener("submit", event => {
        event.preventDefault();

        const updatedDog = {
            name: event.target[0].value,
            breed: event.target[1].value,
            sex: event.target[2].value
        }

        fetch(`http://localhost:3000/dogs/${event.target[3].value}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(updatedDog)
        })
        .then(res => res.json())
        .then(dog => console.log(dog))
        .catch(err => console.log(err))
        
        console.log(`${event.target[0].value} | ${event.target[1].value} | ${event.target[2].value} | ${event.target[3].value}`);
    })
}