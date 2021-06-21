const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { getEditoriales, crearEditorial, updateEditorial, eliminarEditorial } = require('../controllers/editorial.controller');

router.get("/", getEditoriales);
router.post("/", [
    check('nombre','El nombre del editorial es necesario').not().isEmpty(),
    check('email','El email del editorial es necesario').not().isEmpty(),
    check('email','Ingresar un email vaido').isEmail(),
    check('telefono','El numero de telefono es necesario').not().isEmpty(),
    check('telefono','Ingresar un numero de telefono valido').isNumeric(),
    check('maximo_libros','El numero maximo de libros es necesario').not().isEmpty(),
    check('maximo_libros','Ingresar un numero valido para el maximo de libros registrados').isNumeric(),
    validarCampos
],crearEditorial);
router.put("/:id", [
    check('nombre','El nombre del editorial es necesario').not().isEmpty(),
    check('email','El email del editorial es necesario').not().isEmpty(),
    check('email','Ingresar un email vaido').isEmail(),
    check('telefono','El numero de telefono es necesario').not().isEmpty(),
    check('telefono','Ingresar un numero de telefono valido').isNumeric(),
    check('maximo_libros','El numero maximo de libros es necesario').not().isEmpty(),
    check('maximo_libros','Ingresar un numero valido para el maximo de libros registrados').isNumeric(),
    validarCampos
],updateEditorial);
router.delete('/:id', eliminarEditorial);

module.exports = router;