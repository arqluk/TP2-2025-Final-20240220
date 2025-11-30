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

    // getBooksGeneral = async (req, res) => {
    //     const generales = await this.service.getBooksGeneral();
    //     try {
    //         res.status(200).json({
    //             // status: "Success",
    //             // message: "Ok.",
    //             // data: generalBooks,
    //             generales
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             status: "error",
    //             data: error,
    //         });
    //     }
    // };

//     getBooksGeneral = async (req, res) => {
//     try {
//         const { generales } = await this.service.getBooksGeneral(); // destructuring

//         res.status(200).json(generales);

//     } catch (error) {
//         res.status(500).json({
//             status: "error",
//             data: error,
//         });
//     }
// };

getBooksGeneral = async (req, res) => {
    try {
        const generales = await this.service.getBooksGeneral();

        // generales YA es: { generales: {...} }
        res.status(200).json(generales);

    } catch (error) {
        res.status(500).json({
            status: "error",
            data: error,
        });
    }
};

    // getBooksByZone = async (req, res) => {
    //     const books = await this.service.getBooksByZone();
    //     try {
    //         res.status(200).json({
    //             status: "Success",
    //             message: "Ok.",
    //             data: books,
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             status: "error",
    //             data: error,
    //         });
    //     }
    // };

    getBooksByZone = async (req, res) => {
        const { identifier } = req.params; // /books/zona1
        console.log("Distrito: ", identifier)

        const booksByZone = await this.service.getBooksByZone(identifier);

        try {
            res.status(200).json(
                booksByZone,
            );
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: error,
            });
        }
    };

    getBooksPercentage = async (req, res) => {
    try {
        const percentages = await this.service.getBooksPercentage();
        res.status(200).json(percentages);
    } catch (error) {
        res.status(500).json({ error });
    }
    };

    postBooks = async (req, res) => {
        const book = req.body
        
        try {
            const newBook = await this.service.postBooks(book);
            // res.status(200).json({
            //     status: "Success",
            //     message: "voto cargado",
            //     data: newBook,
            // });
            // res.status(200).json({
            //     message: "libro cargado",
            // });
            // res.status(200).json( {message: "libro cargado", newBook} )
            res.status(200).json(newBook)
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
            status: "Success",
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


}

export default BooksController;
