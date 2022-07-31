const RENDER_EVENT = 'render-books';

document.addEventListener('DOMContentLoaded', function () {

    const formBook = document.getElementById('inputBook');
    formBook.addEventListener('submit', function (e) {
      e.preventDefault();
      addBook();
    });

    const searchForm = document.getElementById('searchBook');
    searchForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputSearch = document.getElementById("searchBookTitle").value;
    bookSearch(inputSearch);
});
    
    if(isStorageExist()) {
      loadDataFromStorage();
    }
  });

  function addBook() {    
    const bookId = +new Date();
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById( 'inputBookYear').value;
    const isRead =  document.getElementById('inputBookIsComplete').checked;
    const bookData = generateBookItem(bookId, bookTitle, bookAuthor,  year, isRead);
    books.push(bookData);
    
    if (isRead) {
      document.getElementById('inputBookIsComplete').append(books);
      } else {
      document.getElementById('incompleteBookshelfList').append(books);
    }
    
    document.dispatchEvent(new Event(RENDER_EVENT)); 
    updateData();   
    clear();
    alert(`Buku '${bookTitle}' berhasil ditambahkan ke rak buku!`);
    
  }

  
  function generateBookItem(id, title, author, year, isRead) {
    return {
        id,
        title,
        author,
        year,
        isRead
    }
  }

  document.addEventListener(RENDER_EVENT, function() {
    
    const completeBookshelfList = document.getElementById('completeBookshelfList');
          completeBookshelfList.innerHTML = '';

    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
          incompleteBookshelfList.innerHTML='';

    for (const book of books) {
          const bookElement = bookData(book);

        if(book.isRead !== true) {
          incompleteBookshelfList.append(bookElement);

         } else { 
              completeBookshelfList.append(bookElement);
         }
      }

      booksTotalStats();
      clear();

  });

  function bookData(bookItem){
    
    const textTitle = document.createElement('h3');
    textTitle.innerText=bookItem.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = 'Penulis : ' +bookItem.author;

    const textYear = document.createElement('p');
    textYear.innerText = 'Tahun : ' +bookItem.year;

    const actionCard = document.createElement('div');
    actionCard.classList.add('action');

    const inCompleted = document.createElement('button');
    inCompleted.classList.add('green');
    inCompleted.innerText='Belum Selesai';

    const completed = document.createElement('button');
    completed.classList.add('green');
    completed.innerText='Selesai';

    completed.addEventListener('click', function() {
       addBookToCompleted(bookItem.id);
    });

    inCompleted.addEventListener('click', function() {
        undoBookFromCompleted(bookItem.id);
    });

    const trash = document.createElement('button');
    trash.classList.add('red');
    trash.innerText='Hapus Buku';

    trash.addEventListener('click', function() {
      deleteBook(bookItem.id);
    });

    if (bookItem.isRead){
    actionCard.append(inCompleted, trash);

    } else {
      actionCard.append(completed, trash);
    }

    const bookCard = document.createElement('article');
    bookCard.classList.add('book_item');    
    bookCard.classList.add('shadow');
    bookCard.append(textTitle, textAuthor, textYear, actionCard);

    return bookCard;
  }

  function clear(){
    document.querySelector("#inputBookTitle").value = "";
    document.querySelector("#inputBookAuthor").value = "";
    document.querySelector("#inputBookYear").value = "";
    document.querySelector("#inputBookIsComplete").checked = false;
    document.querySelector('#searchBookTitle').value = "";
  }


  function addBookToCompleted (bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isRead = true;
    document.dispatchEvent(new Event(RENDER_EVENT)); 
    updateData(); 
    alert('Buku berhasil dipindahkan!');
  }

  function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isRead = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    updateData();
    alert('Buku berhasil dipindahkan!');
  }

  function findBook(bookId) {
    for (const bookItem of books) {
      if (bookItem.id === bookId) {
        return bookItem;
      }
    }
    return null;
  }

  function deleteBook(bookId) {
    const bookTarget = findBookIndex(bookId);
   
    if (bookTarget === -1) return;   
    books.splice(bookTarget, 1); 
    document.dispatchEvent(new Event(RENDER_EVENT));   
    updateData(); 
    alert('Buku berhasil dihapus!')
  }

  function findBookIndex(bookId) {
    for (const index in books) {
      if (books[index].id === bookId) {
        return index;
      }
    }
    return -1;
  }

  function bookSearch(byTitle) {
    const filter = byTitle.toLowerCase();
    const title = document.getElementsByTagName('h3');

    for (let i = 0; i < title.length; i++) {
        const titleText = title[i].textContent || title[i].innerText;
       
        if (titleText.toLowerCase().indexOf(filter) > -1) {
            title[i].closest('.book_item').style.display = 'block';
        } else{
            title[i].closest('.book_item').style.display = 'none';
        }
    }
}
