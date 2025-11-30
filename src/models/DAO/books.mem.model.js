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

    getBooksGeneral = async () => {
    const counts = {
        candidatoA: 0,
        candidatoB: 0,
        candidatoC: 0,
        enblanco: 0
    };

    for (const book of this.books) {
        if (counts[book.candidato] !== undefined) {
            counts[book.candidato]++;
        }
    }

    return { generales: counts };
};


    getBooksByZone = async (identifier) => {
    const result = {
        candidatoA: 0,
        candidatoB: 0,
        candidatoC: 0,
        enblanco: 0
    };

    // Filtrar solo los votos de esa zona
    const books = this.books.filter(v => v.distrito === identifier);

    // for (const v of this.books) {
    for (const v of books) {
        if (v.distrito === identifier) {
            if (result[v.candidato] !== undefined) {
                result[v.candidato]++;
            }
        }
    }

    return { [identifier]: result };
    };

    getBooksPercentage = async () => {
    const counts = {
        candidatoA: 0,
        candidatoB: 0,
        candidatoC: 0,
        enblanco: 0
    };

    // Contar votos
    for (const book of this.books) {
        if (counts[book.candidato] !== undefined) {
            counts[book.candidato]++;
        }
    }

    // votos en blanco
    const blancos = counts.enblanco;

    // determinar ganador
    const candidatos = ["candidatoA", "candidatoB", "candidatoC"];
    const ganador = candidatos.reduce((max, c) => 
        counts[c] > counts[max] ? c : max
    );

    // asignar blancos al ganador
    counts[ganador] += blancos;
    delete counts.enblanco; // ya no se consideran como categoría aparte

    // total de votos válidos después de sumar blancos
    const total = Object.values(counts).reduce((acc, v) => acc + v, 0);

    // generar array en formato solicitado
    const result = candidatos.map(c => ({
        [c]: ((counts[c] / total) * 100).toFixed(2) + "%"
    }));

    return result;
};


    // // Reemplaza el voto existente, si la zona ya existe, en vez de agregar un voto, lo actualiza ...
    // postBooks = async (book) => {
    //     const {distrito, candidato} = book
    //     const index = this.books.findIndex((v) => v.distrito == distrito)
    //     if (index === -1) {
    //         this.books.push({distrito, candidato})
    //     } else {
    //         this.books[index] = {
    //         ...this.books[index], // conserva propiedades previas
    //         distrito,
    //         candidato
    //     };
    //     }
    //     return {
    //         book: {distrito, candidato},
    //     }
    // };

    // Permite agregar más de un voto por distrito, aunque la zona ya exista
    // postBooks = async (book) => {
    //     const {codigo, titulo, autor, estado} = book
    //     const index = this.books.findIndex((b) => b.codigo === book.codigo)
    //     if (index === -1) {
    //         this.books.push({codigo, titulo, autor, estado})
    //     } else {
    //         this.books[index] = {
    //         ...this.books[index], // conserva propiedades previas
    //         codigo, titulo, autor, estado
    //     };
    //     }
    // return {
    //     book: { codigo, titulo, autor, estado }
    // }
    // // return { codigo, titulo, autor, estado }
    // // }
    // };

        postBooks = async (book) => {
        const {codigo, titulo, autor, estado} = book

        const exists = this.books.find(b => b.codigo === codigo);
        if (exists) {
            throw new Error("El código ya existe");
        }

        const newBook = {
            codigo,
            titulo,
            autor,
            estado: "disponible"
        };

        this.books.push(newBook);
        return newBook;
    }
    // return { codigo, titulo, autor, estado }
    // }




    getEntitiesById = async (identificador) => {
        try {
            const index = this.entities.findIndex((e) => e.id == identificador)
            if (index === -1) throw new Error("El índice no existe.")
            const entityById = this.entities.filter((entity) => entity.id == identificador)
            return entityById
        } catch (error) {
            console.error("Ha ocurrido un error en la operación:", error);
            throw error
        }
    }

    deleteBooks = async (identifier) => {
    const index = this.books.findIndex((b) => b.codigo == identifier);
    console.log("INDEX: ", index)
    if (index === -1) {
        // lanzar Error para que el controller lo maneje
        throw new Error("Book inexistent");
    }
    const removed = this.books.splice(index, 1)[0];
    return removed; // devolver el libro eliminado (objeto)
};

}

export default BooksMemModel  