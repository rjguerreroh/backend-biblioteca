const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { getAutor, crearAutor} = require('../controllers/autor.controller');

router.get("/",getAutor);
router.post("/", [
    check('nombre','El nombre del autor es necesario').not().isEmpty(),
    check('email','El email del autor es necesario').not().isEmpty(), 
    validarCampos
],crearAutor);

module.exports = router;