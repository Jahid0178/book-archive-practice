const searchField = document.getElementById('search-field');
const spinnerLoad = spinner => {
    document.getElementById('spinner').style.display = spinner;
}

const searchBook = () => {
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResult(data));
    
    searchField.value = '';
    spinnerLoad('block');
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
    spinnerLoad('none')
};

