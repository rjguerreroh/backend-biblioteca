const Autor = require('../models/autor.model');
const getAutor = async ( req, res ) => {
    const autores = await Autor.find();
    res.json({
        ok: true,
        autores
    });
}

const crearAutor = async(req, res) => {
    try {
        const { nombre, email} = req.body;
        const existNombre = await Autor.findOne({ nombre });
        if(existNombre) res.status(400).json({ ok: false, msg: "El nombre del autor ya existe"});
        const existEmail = await Autor.findOne({ email });;
        if(existEmail) res.status(400).json({ ok: false, msg: "El nombre del email ya existe"});
        const autor = new Autor(req.body);
        await autor.save();

        res.json({
            ok: true,
            msg: "Autor creado"
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
           ok: false,
           msg: 'Ocurrio un error en el proceso' 
        });
    }
}

module.exports = {
    getAutor,
    crearAutor
}