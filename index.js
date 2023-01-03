// DOM Selectors

const formDetails = document.querySelector('form');
const propertiesArea = document.querySelector('.searchedProperties');

// Events

formDetails.addEventListener('submit', search);

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
                        let searchedHTML = data.HTML.filter(element => element.property.includes(searchedText) || element.description.includes(searchedText));
                        let searchedCSS = data.CSS.filter(element => element.property.includes(searchedText) || element.description.includes(searchedText));
                        let searchedJS = data.JavaScript.filter(element => element.property.includes(searchedText) || element.description.includes(searchedText));
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
                        let searched = data.filter(element => element.property.includes(searchedText) || element.description.includes(searchedText));
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
        <h2>${element.property}</h2>
        <p>Language: ${element.language}</p>
        <p>${element.description}</p>
    </div>
    `;
}

function addNewProperty() {

}