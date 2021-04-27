// GET ELEMENTS
const start = document.getElementById("start");
const products = document.getElementById("products");
const contact = document.getElementById("contact");
const main = document.querySelector('main');

// CREATE ELEMENTS
const root = document.createElement('div');
main.appendChild(root);

// PRINT STARTPAGE
printStart("start");

// EVT LISTENERS
document.addEventListener("click", (evt) => {
    printStart(evt.target.id);
    printCategories(evt.target.id);
    printOffices(evt.target.id);
});

// FUNCTIONS - START
function printStart(id) {
    if (id == "start") {
        root.innerHTML = "";
        const startContainer = document.createElement('section');
        root.appendChild(startContainer);
        startContainer.id = "startContainer";
        const imgContainer = document.createElement('div');
        startContainer.appendChild(imgContainer);
        imgContainer.id = "imgContainer";
        const textContainer = document.createElement('article');
        startContainer.appendChild(textContainer);
        textContainer.id = "textContainer";

        textContainer.innerText = `Välkommen till Classic Models webbshop. Tryck på produkter för att se vad vi erbjuder, eller på kontakt för att hitta till närmsta kontor!`;
    };
};

// FUNCTIONS - PRODUCTS
function printCategories(id) {
    if (id == "products") {
        root.innerHTML = "";
        const categoriesContainer = document.createElement('section');
        root.appendChild(categoriesContainer);
        categoriesContainer.id = "categoriesContainer";
        const categories = document.createElement('article');
        categoriesContainer.appendChild(categories);
        categories.id = "categories";
        const productsBox = document.createElement('article');
        categoriesContainer.appendChild(productsBox);
        productsBox.id = "productsBox";

        fetch("http://localhost:3000/users/categories")
        .then(resp => resp.json())
        .then(data => {

            for (product in data) {
                categories.insertAdjacentHTML("beforeend", `<div id="${data[product].productLine}">${data[product].productLine}</div>`);
            };
        });

        // EVT LISTENER
        categories.addEventListener("click", (evt) => {
            printProducts(evt.target.id);
        });
    };
};

function printProducts(categoryId) {
    let category = {categoryId};

    fetch("http://localhost:3000/users/products", {method: "post", headers: {"Content-type": "application/json"}, body: JSON.stringify(category)})
    .then(resp => resp.json())
    .then(data => {

        productsBox.innerHTML = "";
        for (product in data) {
            productsBox.insertAdjacentHTML("beforeend", `<div id="${data[product].productName}">${data[product].productName}</div>`);
        };
    });
};

// FUNCTIONS - CONTACT
function printOffices(id) {
    if (id == "contact") {
        root.innerHTML = "";
        const officesContainer = document.createElement('section');
        root.appendChild(officesContainer);
        officesContainer.id = "officesContainer";
        const offices = document.createElement('article');
        officesContainer.appendChild(offices);
        offices.id = "offices";
        const employeesBox = document.createElement('article');
        officesContainer.appendChild(employeesBox);
        employeesBox.id = "employeesBox";

        fetch("http://localhost:3000/users/contact")
        .then(resp => resp.json())
        .then(data => {

            for (product in data) {
                offices.insertAdjacentHTML("beforeend", `<div id="${data[product].officeCode}" class="office">
                ${data[product].city}<br>
                ${data[product].addressLine1}
                </div>`);
            };
        });

        officesContainer.addEventListener('click', (evt) => {
            printEmployees(evt.target.id);
        });
    };
};

function printEmployees(officeId) {
    let office = {officeId};

    fetch("http://localhost:3000/users/officeInfo", {method: "post", headers: {"Content-type": "application/json"}, body: JSON.stringify(office)})
    .then(resp => resp.json())
    .then(data => {

        employeesBox.innerHTML = "";
        for (product in data) {
            employeesBox.insertAdjacentHTML("beforeend", `<div id="${data[product].firstName}">${data[product].firstName} ${data[product].lastName}<br>
            ${data[product].email}<br>
            ${data[product].jobTitle}</div><br>`);
        };
    });
};