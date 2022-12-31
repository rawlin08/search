// DOM Selectors

const formDetails = document.querySelector('form');
const propertiesArea = document.querySelector('.searchedProperties');

// Events

formDetails.addEventListener('submit', search)

// search functions

function search(e) {
    e.preventDefault();
    const form = e.target;
    console.log(form);
    console.log(form.elements.search.value);
    console.log(form.elements.language.value);
    if(form.elements.search.value.length == 0) {
        return
    }
    else if (form.elements.language.value == 'All') {
        fetch('http://localhost:3000/db')
            .then((response) => response.json())
            .then((data) => {
                propertiesArea.innerHTML = '';
                let searchedHTML = data.HTML.filter(element => element.property.includes(form.elements.search.value));
                let searchedCSS = data.CSS.filter(element => element.property.includes(form.elements.search.value));
                let searchedJS = data.JavaScript.filter(element => element.property.includes(form.elements.search.value));
                let searched = searchedHTML.concat(searchedCSS, searchedJS);
                searched.forEach(element => makeNewCard(element));
            })
    }
    else {
        fetch(`http://localhost:3000/${form.elements.language.value}`)
            .then((response) => response.json())
            .then((data) => {
                propertiesArea.innerHTML = '';
                let searched = data.filter(element => element.property.includes(form.elements.search.value));
                searched.forEach(element => makeNewCard(element));
            })
    }
}

function makeNewCard(element) {
    console.log(element);
    propertiesArea.innerHTML += 
    `
    <div class="card">
        <h2>${element.property}</h2>
        <p>Language: ${element.language}</p>
        <p>${element.description}</p>
    </div>
    `;
}