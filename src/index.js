document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById("table-body");
    getDogs(tableBody);
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
}