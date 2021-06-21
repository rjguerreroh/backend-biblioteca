const { findById } = require('../models/editorial.model');
const Editorial = require('../models/editorial.model');
const getEditoriales = async ( req, res ) => {
    const editoriales = await Editorial.find();
    res.json({
        ok: true,
        msg: "Listado de editoriales",
        editoriales
    });
};

const crearEditorial = async( req, res ) => {
    try {
        const { nombre, email, telefono, ...resto } = req.body;
        const [nombre_encontrado, email_encontrado, telefono_encontrado] = await Promise.all([
            await Editorial.findOne({ nombre }),
            await Editorial.findOne({ email }),
            await Editorial.findOne({ telefono })
        ]);
        if(nombre_encontrado) return res.json({ok:false, msg: "El nombre de la editorial ya existe"});
        if(email_encontrado) return res.json({ok:false, msg: "El email ingresado ya existe"});
        if(telefono_encontrado) return res.json({ok:false, msg: "El numero de telefono ingresado ya existe"});
    
        const objeto = {nombre, email, telefono, ...resto};
        const editorial = new Editorial(objeto);
        await editorial.save();
        res.json({
            ok: true,
            msg: "El editorial ha sido registrado",
            objeto
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, msg: "Ocurrio un error en el proceso, contactar con el Administrador del sistema"});
    }
};

const updateEditorial = async(req,res) => {
    // try {
    //     const id = req.params.id;
    //     const old = await Editorial.findById(id);
    //     return res.json({ok:true, id, old});
    // } catch (error) {
    //     console.log(error);
    //     return res.status(400).json({ ok: false, msg: "Ocurrio un error en el proceso, contactar con el Administrador del sistema"});
    // }
    try {        
        const id = req.params.id;
        // return res.json({id});
        const editorial = await Editorial.findById(id);
        const { nombre, email, telefono, ...resto } = req.body;

        if(!editorial) return res.json({ok: false, msg: "El id del editorial no existe"});
        if(editorial.nombre != nombre){
            const existe_nombre = await Editorial.findOne({ nombre });
            if(existe_nombre) return res.json({ok:false, msg: "El nombre de la editorial ya existe"});
        }
        if(editorial.telefono != telefono){
            const existe_telefono =  await Editorial.findOne({ telefono });
            if(existe_telefono) return res.json({ok:false, msg: "El numero de telefono ingresado ya existe"});
        }
        if(editorial.email != email){
            var existe_email = await Editorial.findOne({ email });
            if(existe_email) return res.json({ok:false, msg: "El email ingresado ya existe"});
        }

        const objeto = {nombre, email, telefono, ...resto};
        const EditorialActualizado = await Editorial.findByIdAndUpdate(id, objeto);

        res.json({
            ok: true,
            msg: "Editorial actualizado"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, msg: "Ocurrio un error en el proceso, contactar con el Administrador del sistema"});
    }
};

const eliminarEditorial = async( req, res) => {
    const id = req.params.id;
    try {
        const existe_editorial = await Editorial.findById(id);
        if(!existe_editorial) {
            return res.status(400).json({
                ok: false,
                msg: "Editorial no encontrado por id"
            })
        }
        await Editorial.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Editorial eliminado'
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, msg: "Ocurrio un error en el proceso, contactar con el Administrador del sistema"});
    }

};

module.exports = {
    getEditoriales,
    crearEditorial,
    updateEditorial,
    eliminarEditorial
};