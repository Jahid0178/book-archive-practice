const searchField = document.getElementById('search-field');
const spinnerLoad = spinner => {
    document.getElementById('spinner').style.display = spinner;
}

const searchBook = () => {
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    if (searchText == 0) {
        const errorMessage = document.getElementById('error-message');
        const p = document.createElement('p');
        p.style.padding = '10px';
        p.style.fontSize = '18px';
        p.innerText = `Search your books name`;
        errorMessage.appendChild(p);
    } else {
        fetch(url)
            .then(response => response.json())
            .then(data => displayResult(data));

        searchField.value = '';
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = '';
        spinnerLoad('block');
    };    
};

const displayResult = books => {
    const displayContainer = document.getElementById('display-result');
    displayContainer.textContent = '';
    books.docs.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author_name[0]}</p>
                        <p>First Publish Date: ${book.publish_date}</p>
                        <p>Publish Place: ${book.publish_place}</p>
                    </div>
            </div>
        `;
        displayContainer.appendChild(div);
    });
    spinnerLoad('none');
};