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

        this.router.get("/books/all/status", this.controller.getBooksByStatus);

        // this.router.post("/books", validationMiddleware.validateDistrict, validationMiddleware.validateCandidate, this.controller.postBooks);
        this.router.post("/books", this.controller.postBooks);

        this.router.delete("/books/delete/:identifier", this.controller.deleteBooks);

        this.router.patch("/books/lend/:identifier", this.controller.patchLendBooks);
        // this.router.patch("/books/rent/:identifier", express.text({ type: "*/*" }), this.controller.patchRentBooks);
        this.router.patch("/books/prize/:identifier", this.controller.patchLendBooksWithPrize);

        this.router.patch("/books/return/:identifier", this.controller.patchReturnBooks);

        this.router.patch("/books/unfit/:identifier", this.controller.patchUnfitBooks);

        this.router.patch("/books/fit/:identifier", this.controller.patchFitBooks);

        return this.router;
    }
}

export default BooksRoutes;