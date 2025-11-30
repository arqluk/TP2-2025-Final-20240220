import BooksMemModel from "./DAO/books.mem.model.js";
// import BooksFsModel from "./DAO/books.fs.model.js";

class BooksFactory {
    static get(persistence) {
        switch (persistence) {
            case "MEM":
                console.log("Persistiendo en la memoria del servidor.");
                return new BooksMemModel();
            case "FS":
                console.log("Persistiendo en File System.");
                return new BooksFsModel();
            default:
                console.log("Persistiendo en la memoria default.");
                return new BooksMemModel();
        }
    }
}

export default BooksFactory;