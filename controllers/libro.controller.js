const Libro = require('../models/libro.model');
const Autor = require('../models/autor.model');
const Editorial = require('../models/editorial.model');

const getLibros = async ( req, res ) => {
    const libros = await Libro.find().populate('autor','nombre').populate('editorial','nombre');
    res.json({
        ok: true,
        libros
    });
}

const crearLibro = async ( req, res ) => {
    const { autor, editorial, ...resto} = req.body;
    try {
        const [autorEncontrado, editorialEncontrada] = await Promise.all([
            await Autor.findOne({nombre: autor}),
            await Editorial.findOne({nombre: editorial})
        ]);
        if(!autorEncontrado) return res.json({ok: false, msg: "El autor no esta registrado"});
        if(!editorialEncontrada) return res.json({ ok: false, msg: "El editorial no esta registrado"});
        
        const numeroDeLibrosRegistrados = await Libro.find({editorial: editorialEncontrada.id}).count()
        if(
            (editorialEncontrada.maximo_libros != -1) &&
            (numeroDeLibrosRegistrados > editorialEncontrada.maximo_libros)
        ){
            return res.json({ ok: false, msg: "El limite de libros registrados por el editorial ha sido superado"});
        }

        const libro = new Libro({
            editorial: editorialEncontrada.id,
            autor: autorEncontrado.id,
            ...resto
        });
        console.log('req body', req.body, resto);
        console.log('Guardar libro', libro);

        await libro.save();
        
        return res.json({ ok: true, msg: "Libro registrado exitosamente"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Ocurrio un error en el proceso"
        });
    }

}

const updateLibro = async ( req, res ) => {
    res.json({
        ok: true,
        msg: "lIBRO actualizado",
        id: req.params.id
    });
}

const eliminarLibro = async ( req, res ) => {
    const id = req.params.id;
    try {
        const existe_libro = await Libro.findById(id);
        if(!existe_libro) {
            return res.status(400).json({
                ok: false,
                msg: "Libro no encontrado por id"
            })
        }
        await Libro.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Libro eliminado'
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, msg: "Ocurrio un error en el proceso, contactar con el Administrador del sistema"});
    }
}

module.exports = {
    getLibros,
    crearLibro,
    updateLibro,
    eliminarLibro
}