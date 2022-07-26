const books =[];
const totalAllBooks = document.getElementById('total-all-books');
const totalIncompletedBooks = document.getElementById('total-incompleted-books');
const totalCompletedBooks = document.getElementById('total-completed-books');

const localTotalAllBooksKey = 'LOCAL_TOTAL_ALL_BOOKS';
const localTotalIncompletedBooksKey = 'LOCAL_TOTAL_INCOMPLETED_BOOKS';
const localTotalCompletedBooksKey = 'LOCAL_TOTAL_COMPLETED_BOOKS';

   

function updateData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY,parsed);

        if (localStorage.getItem(localTotalAllBooksKey) === null) {
            localStorage.setItem(localTotalAllBooksKey, 0);
        }
        if (localStorage.getItem(localTotalCompletedBooksKey) === null) {
            localStorage.setItem(localTotalCompletedBooksKey, 0);
        }

        if (localStorage.getItem(localTotalIncompletedBooksKey) === null) {
            localStorage.setItem(localTotalIncompletedBooksKey, 0);
        }

        document.dispatchEvent(new Event(SAVED_BOOK));
    }
};

totalAllBooks.innerText = localStorage.getItem(localTotalAllBooksKey);
totalIncompletedBooks.innerText = localStorage.getItem(localTotalCompletedBooksKey);
totalCompletedBooks.innerText = localStorage.getItem(localTotalCompletedBooksKey);

const SAVED_BOOK = 'saved-books';
const STORAGE_KEY = 'BOOKSHELF_APPS';

function isStorageExist(){
if (typeof(Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
    }
    return true;

}

document.addEventListener(SAVED_BOOK, function() {
    console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage(){
    const serializeData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializeData);

    if (data !== null) {
        for (const bookItem of data) {
            books.push(bookItem);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT))
}


function booksTotalStats() {
    localStorage.setItem(localTotalAllBooksKey, books.length);
    totalAllBooks.innerText = localStorage.getItem(localTotalAllBooksKey);
      
    let done = 0;
    let unDone = 0;

    for (let i = 0; i < books.length; i++) {
    if(books[i]['isRead']){
        done +=1
    } else{
        unDone +=1
    }
    }
      
    localStorage.setItem(localTotalCompletedBooksKey, done);
    localStorage.setItem(localTotalIncompletedBooksKey, unDone);
    totalCompletedBooks.innerText=localStorage.getItem(localTotalCompletedBooksKey);
    totalIncompletedBooks.innerText = localStorage.getItem(localTotalIncompletedBooksKey);
}
