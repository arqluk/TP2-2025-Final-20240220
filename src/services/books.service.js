import BooksFactory from "../models/BooksFactory.js";


class BooksService {
    constructor() {
        this.model = BooksFactory.get(process.env.PERSISTENCE);
    }

    getAllBooks = async () => {
        const books = await this.model.getAllBooks();
        return books
    };

    getBooksGeneral = async () => {
        const generalBooks = await this.model.getBooksGeneral();
        return generalBooks
    };

    getBooksByZone = async (identifier) => {
        const booksByZone = await this.model.getBooksByZone(identifier);
        return booksByZone
    };

    getBooksPercentage = async () => {
        const percentages = await this.model.getBooksPercentage();
        return percentages
    };

    postBooks = async (book) => {
        const newBook = await this.model.postBooks(book);
        return newBook
    };

    deleteBooks = async (identifier) => {
        const removedBook = await this.model.deleteBooks(identifier);
        return removedBook
    };
}

export default BooksService;