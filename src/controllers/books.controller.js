import BooksService from "../services/books.service.js";

class BooksController {
    constructor() {
        this.service = new BooksService();
    }

    getAllBooks = async (req, res) => {
        const books = await this.service.getAllBooks();
        try {
            // res.status(200).json({
            //     status: "Success",
            //     message: "Ok.",
            //     data: books,
            // });
            res.status(200).json(
                books
            );
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: error,
            });
        }
    };

    postBooks = async (req, res) => {
        const book = req.body
        try {
            const newBook = await this.service.postBooks(book);
            res.status(200).json({ message: "book added ok", newBook })
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    };

    // deleteBooks = async (req, res) => {
    //     const { identifier } = req.params;
    //     const removedBook = await this.service.deleteBooks(identifier);
    //     try {
    //         res.status(200).json({
    //             status: "Success",
    //             message: removedBook,
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             status: "Error",
    //             message: removedBook,
    //             // data: error,
    //         });
    //     }
    // };

    deleteBooks = async (req, res) => {
        const { identifier } = req.params;
        try {
            const removedBook = await this.service.deleteBooks(identifier);
            // devolver el objeto eliminado con 200
            return res.status(200).json({
                message: "book removed ok",
                removed: removedBook
            });
        } catch (error) {
            if (error.message === "Book inexistent") {
                return res.status(404).json({ error: error.message });
            }
            console.error("Error en deleteBooks controller:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    };

    patchLendBooks = async (req, res) => {
        try {
            const { identifier } = req.params;
            const updatedBook = await this.service.patchLendBooks(identifier);
            // devolver el objeto eliminado con 200
            return res.status(200).json({
                message: "book updated ok",
                updatedBook: updatedBook
            });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ error: error.code });
            console.error("Error en patchRentBooks controller:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    };

    patchReturnBooks = async (req, res) => {
        try {
            const { identifier } = req.params;
            const updatedBook = await this.service.patchReturnBooks(identifier);
            // devolver el objeto eliminado con 200
            return res.status(200).json({
                message: "book updated ok",
                updatedBook: updatedBook
            });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ error: error.code });
            console.error("Error en patchReturnBooks controller:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    };

    patchUnfitBooks = async (req, res) => {
        try {
            const { identifier } = req.params;
            const updatedBook = await this.service.patchUnfitBooks(identifier);
            // devolver el objeto eliminado con 200
            return res.status(200).json({
                message: "book updated ok",
                updatedBook: updatedBook
            });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ error: error.code });
            console.error("Error en patchUnfitBooks controller:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    };

    patchFitBooks = async (req, res) => {
        try {
            const { identifier } = req.params;
            const updatedBook = await this.service.patchFitBooks(identifier);
            // devolver el objeto eliminado con 200
            return res.status(200).json({
                message: "book updated ok",
                updatedBook: updatedBook
            });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ error: error.code });
            console.error("Error en patchFitBooks controller:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    };

    getBooksByStatus = async (req, res) => {
        try {
            // const { identifier } = req.params;
            const booksByStatus = await this.service.getBooksByStatus();
            // devolver el objeto eliminado con 200
            return res.status(200).json({
                message: "success",
                booksByStatus: booksByStatus
            });
        } catch (error) {
            // if (error.status) return res.status(error.status).json({ error: error.code });
            console.error("Error en booksByStatus controller:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    };

    patchLendBooksWithPrize = async (req, res) => {
        try {
            const { identifier } = req.params;
            console.log("Identifier recibido EN EL CONTROLADOR:", req.params.identifier);
            const result = await this.service.patchLendBooksWithPrize(identifier);
            return res.status(200).json(result);
        } catch (error) {
            // Si el modelo envía errores con estructura { code, status, message }
            if (error.status) {
                return res.status(error.status).json({
                    error: error.code || "error",
                    message: error.message || "Ha ocurrido un error"
                });
            }
            // Error inesperado
            console.error("Error inesperado en patchLendBooksWithPrize:", error);
            return res.status(500).json({
                error: "internal_error",
                message: "Error interno del servidor"
            });
        }
    };

}

export default BooksController;
