import express from "express";
import BooksController from "../controllers/books.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";

class BooksRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = new BooksController();
    }

    start() {
        this.router.get("/books/all", this.controller.getAllBooks);

        this.router.get("/books/general", this.controller.getBooksGeneral);

        this.router.get("/books/percent", this.controller.getBooksPercentage);

        this.router.get("/books/:identifier", this.controller.getBooksByZone);

        // this.router.post("/books", validationMiddleware.validateDistrict, validationMiddleware.validateCandidate, this.controller.postBooks);
        this.router.post("/books", this.controller.postBooks);
        
        this.router.delete("/books/delete/:identifier", this.controller.deleteBooks);

        return this.router;
    }
}

export default BooksRoutes;