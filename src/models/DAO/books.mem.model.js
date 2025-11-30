// import fetch from "node-fetch";

class BooksMemModel {
    constructor() {
        this.books = [
            { codigo: "codA", titulo: "tituloA", autor: "autorA", estado: "disponible" },
            { codigo: "codB", titulo: "tituloB", autor: "autorB", estado: "disponible" },
            { codigo: "codC", titulo: "tituloC", autor: "autorC", estado: "disponible" },
            { codigo: "codD", titulo: "tituloD", autor: "autorD", estado: "disponible" },
        ];
    }

    getAllBooks = async () => {
        return await this.books
    };

    postBooks = async (book) => {
        const { codigo, titulo, autor, estado } = book
        const exists = this.books.find(b => b.codigo === codigo);
        if (exists) {
            throw new Error("El código ya existe");
        }
        const newBook = {
            codigo,
            titulo,
            autor,
            estado: "disponible"
        }; this.books.push(newBook);
        return newBook;
    }
    // return { codigo, titulo, autor, estado }
    // }

    deleteBooks = async (identifier) => {
        const index = this.books.findIndex((b) => b.codigo == identifier);
        console.log("INDEX: ", index)
        if (index === -1) {
            // lanzar Error para que el controller lo maneje
            throw new Error("Book inexistent");
        }
        // para obtener el libro eliminado → el elemento, no el array → usar ...
        //const removed = this.books.splice(index, 1)[0]; // splice NO devuelve el elemento, sino un array con los elementos eliminados.

        // alternativa usando destructuring ...
        const [removed] = this.books.splice(index, 1);

        // Las dos formas son destructuring, pero se aplican a estructuras distintas:
        // ✅ 1. [] destructura arrays

        // Cuando hacés:
        // const [removed] = this.books.splice(index, 1);
        // Esto funciona porque:
        // splice(index, 1) devuelve un array
        // Ejemplo:
        // ["libroEliminado"]
        // Al usar destructuring de arrays ([]), el código toma el primer elemento del array:

        // ❌ 2. {} destructura objetos, no arrays
        // Cuando escribís:
        // const { removed } = this.books.splice(index, 1);
        // Estás diciendo:
        // “Buscá dentro del objeto una propiedad con nombre removed”.
        // Pero:
        // splice NO devuelve un objeto, devuelve un array, por ejemplo:
        // ["libroEliminado"]
        // Al usar destructuring de arrays ([]), el código toma el primer elemento del array:
        // const [removed] = ["libroEliminado"];
        // removed = "libroEliminado"
        // Un array así no tiene propiedad removed, solo tiene índices:
        // 0: "libroEliminado"
        // length: 1
        // const { removed } = ["libroEliminado"];
        // console.log(removed); // → undefined
        // Por eso no funciona.

        // 🧠 Regla simple para recordar
        // Estructura	Destructuring
        // Array → ["a", "b", "c"]	const [x, y] = array;
        // Objeto → { a: 1, b: 2 }	const { a, b } = obj;

        // 👉 Usá [] cuando querés sacar elementos por posición.
        // 👉 Usá {} cuando querés sacar propiedades por nombre.

        // 📌 Conclusión clara
        // splice() devuelve un array, entonces solo se puede destructurar con corchetes [].
        return removed; // devolver el libro eliminado (objeto)
    };

    patchLendBooks = async (identifier) => {
        try {
            const index = this.books.findIndex(b => b.codigo == identifier)
            // if (index === -1) throw new Error("book not found")
            if (index === -1) throw { code: "book not found", status: 400 };
            const updatedBook = this.books[index]
            if (updatedBook.estado !== "disponible") {
                // throw new Error("El libro no está disponible para alquilar");
                throw { code: "book_not_available", status: 400 };
            }
            updatedBook.estado = "alquilado"
            return updatedBook
        } catch (error) {
            console.error("Ha ocurrido un error en la operación:", error);
            throw error
        }
    }

    patchReturnBooks = async (identifier) => {
        try {
            const index = this.books.findIndex(b => b.codigo == identifier)
            // if (index === -1) throw new Error("book not found")
            if (index === -1) throw { code: "book not found", status: 400 };
            const updatedBook = this.books[index]
            if (updatedBook.estado !== "alquilado") {
                // throw new Error("El libro no está disponible para alquilar");
                throw { code: "not loaned", status: 400 };
            }
            updatedBook.estado = "disponible"
            return updatedBook
        } catch (error) {
            console.error("Ha ocurrido un error en la operación:", error);
            throw error
        }
    }

    patchUnfitBooks = async (identifier) => {
        try {
            const index = this.books.findIndex(b => b.codigo == identifier)
            // if (index === -1) throw new Error("book not found")
            if (index === -1) throw { code: "book not found", status: 400 };
            console.log("INDEX: ", index)
            const updatedBook = this.books[index]
            if (updatedBook.estado !== "disponible") {
                // throw new Error("El libro no está disponible para alquilar");
                throw { code: "not unfittable", status: 400 };
            }
            updatedBook.estado = "no-apto"
            return updatedBook
        } catch (error) {
            console.error("Ha ocurrido un error en la operación:", error);
            throw error
        }
    }

    patchFitBooks = async (identifier) => {
        try {
            const index = this.books.findIndex(b => b.codigo == identifier)
            // if (index === -1) throw new Error("book not found")
            if (index === -1) throw { code: "book not found", status: 400 };
            const updatedBook = this.books[index]
            if (updatedBook.estado !== "no-apto") {
                // throw new Error("El libro no está disponible para alquilar");
                throw { code: "fitted", status: 400 };
            }
            updatedBook.estado = "disponible"
            return updatedBook
        } catch (error) {
            console.error("Ha ocurrido un error en la operación:", error);
            throw error
        }
    }

    getBooksByStatus = async () => {
        return this.books.reduce((acc, book) => {
            if (!acc[book.estado]) acc[book.estado] = [];
            acc[book.estado].push(book);
            return acc;
        }, {});
    };

    patchLendBooksWithPrize = async (identifier) => {
        const index = this.books.findIndex(b => b.codigo === identifier);
        if (index === -1) throw { code: "book_not_found", status: 400 };
        const book = this.books[index];
        if (book.estado !== "disponible") {
            throw { code: "book_not_available", status: 400 };
        }
        // --------------------
        // 1) Consultar servicio externo
        // --------------------
        // const response = await fetch("https://libros.deno.dev/premios");
        // const result = await response.json();
        let result;
        try {
            const response = await fetch("https://libros.deno.dev/premios");
            if (!response.ok) {
                throw new Error("Fetch failed: " + response.status);
            }
            result = await response.json();
        } catch (err) {
            console.error("Error llamando al sorteo:", err);
            throw {
                code: "external_service_error",
                status: 503,
                message: "El servicio de premios no respondió"
            };
        }

        console.log("Resultado del sorteo:", result);
        if (result.premio === true) {
            // GANÓ EL PREMIO → eliminar libro
            const removed = await this.deleteBooks(identifier);
            return {
                mensaje: "Sorteo ganado: el lector se queda con el libro",
                sorteo: result.sorteo,
                libro_entregado: removed
            };
        }
        // --------------------
        // 2) NO ganó → alquilar normalmente
        // --------------------
        book.estado = "alquilado";
        return {
            mensaje: "Libro alquilado con éxito",
            sorteo: result.sorteo,
            premio: false,
            libro: book
        };
    };

}

export default BooksMemModel  