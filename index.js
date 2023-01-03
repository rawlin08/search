// DOM Selectors

const searchDetails = document.querySelector('.searching');
const newDetails = document.querySelector('.add');
const propertiesArea = document.querySelector('.searchedProperties');
const newPropertyDialog = document.querySelector('.newProperty');
const newPropertyBttn = document.querySelector('.addNew');

// Events

searchDetails.addEventListener('submit', search);
newDetails.addEventListener('submit', addNewProperty);
newPropertyBttn.addEventListener('click', openDialog);

// search functions

function search(e) {
    e.preventDefault();
    const form = e.target;
    let searchedText = form.elements.search.value.toLowerCase();
    if(searchedText.length != 0) {
        if (form.elements.language.value == 'All') {
            fetch('http://localhost:3000/db')
                .then((response) => response.json())
                .then((data) => {
                    propertiesArea.innerHTML = '';
                    if (searchedText == 'all') {
                        data.HTML.forEach(element => makeNewCard(element));
                        data.CSS.forEach(element => makeNewCard(element));
                        data.JavaScript.forEach(element => makeNewCard(element));
                    }
                    else {
                        let searchedHTML = data.HTML.filter(element => element.property.toLowerCase().includes(searchedText) || element.description.toLowerCase().includes(searchedText));
                        let searchedCSS = data.CSS.filter(element => element.property.toLowerCase().includes(searchedText) || element.description.toLowerCase().includes(searchedText));
                        let searchedJS = data.JavaScript.filter(element => element.property.toLowerCase().includes(searchedText) || element.description.toLowerCase().includes(searchedText));
                        let searched = searchedHTML.concat(searchedCSS, searchedJS);
                        searched.forEach(element => makeNewCard(element));
                    }
                })
        }
        else {
            fetch(`http://localhost:3000/${form.elements.language.value}`)
                .then((response) => response.json())
                .then((data) => {
                    propertiesArea.innerHTML = '';
                    if (searchedText == 'all') {
                        data.forEach(element => makeNewCard(element));
                    }
                    else {
                        let searched = data.filter(element => element.property.toLowerCase().includes(searchedText) || element.description.toLowerCase().includes(searchedText));
                        searched.forEach(element => makeNewCard(element));
                    }
                })
        }
        console.log('Search Done!');
    }
}

function makeNewCard(element) {
    propertiesArea.innerHTML += 
    `
    <div class="card">
        <a href="#" data-property class="property"><h2>${element.property}</h2></a>
        <h3>Language: ${element.language}</h3>
        <p>${element.description}</p>
    </div>
    `;

    let propertyID = document.querySelectorAll('[data-property]');
    propertyID.forEach(href => {
        href.addEventListener('click', () => {
            test(href.textContent);
        });
    })
}

function test(h) {
    console.log(h);
}

function openDialog() {
    newPropertyDialog.showModal();
}

function addNewProperty(e) {
    e.preventDefault();
    console.log('hello');
}