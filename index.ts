// Step 2: Define Book Model Using Interface and Enum
enum Genre {
  Fiction,
  NonFiction,
  Science,
  History,
}

interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  publishedYear: number;
  available: boolean;
}

// Step 8: Create a Library Class to Manage the Inventory
class Library {
  private books: Book[] = [];

  // Step 3: Implement Basic Functions for Adding Books
  addBook(book: Book): void {
    this.books.push(book);
    console.log(`Book "${book.title}" added to the library.`);
  }

  // Step 4: Implement a Function to List All Books
  listBooks(): void {
    if (this.books.length === 0) {
      console.log("No books available in the library.");
      return;
    }

    console.log("Book List:");
    this.books.forEach((book) => {
      console.log(`${book.id}: "${book.title}" by ${book.author} - ${Genre[book.genre]} (${book.publishedYear}) - Available: ${book.available}`);
    });
  }

  // Step 5: Implement Search Functionality Using keyof and typeof
  searchBooks<K extends keyof Book>(property: K, value: Book[K]): Book[] {
    const results = this.books.filter((book) => book[property] === value);
    if (results.length === 0) {
      console.log("No books found with the given criteria.");
    } else {
      console.log("Search Results:");
      results.forEach((book) => {
        console.log(`${book.id}: "${book.title}" by ${book.author}`);
      });
    }
    return results;
  }

  // Step 6: Add Update Book Functionality with Conditional Types
  updateBook(id: number, updatedDetails: Partial<Book>): void {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      this.books[bookIndex] = { ...this.books[bookIndex], ...updatedDetails };
      console.log(`Book with ID ${id} updated.`);
    } else {
      console.log(`Book with ID ${id} not found.`);
    }
  }

  // Step 7: Implement Deletion of Books Using Type Assertions
  deleteBook(id: number): void {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      const removedBook = this.books.splice(bookIndex, 1);
      console.log(`Book "${removedBook[0].title}" deleted.`);
    } else {
      console.log(`Book with ID ${id} not found.`);
    }
  }
}

// Example Usage:
const myLibrary = new Library();

// Step 3: Add some books to the inventory
myLibrary.addBook({ id: 1, title: "1984", author: "George Orwell", genre: Genre.Fiction, publishedYear: 1949, available: true });
myLibrary.addBook({ id: 2, title: "A Brief History of Time", author: "Stephen Hawking", genre: Genre.Science, publishedYear: 1988, available: true });

// Step 4: List all books
myLibrary.listBooks();

// Step 5: Search books by title
myLibrary.searchBooks("title", "1984");

// Step 6: Update a book's availability
myLibrary.updateBook(1, { available: false });
myLibrary.listBooks();

// Step 7: Delete a book by ID
myLibrary.deleteBook(2);
myLibrary.listBooks();
