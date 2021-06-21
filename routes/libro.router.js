const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { getLibros, crearLibro, updateLibro, eliminarLibro} = require('../controllers/libro.controller');

router.get("/", getLibros);
router.post("/", [
    check('titulo','El titulo del libro es necesario').not().isEmpty(),
    check('autor','El nombre del autor es necesario').not().isEmpty(),
    check('genero','El genero es necesario').not().isEmpty(),
    check('numero_paginas','El numero de paginas es necesario').not().isEmpty(),
    check('numero_paginas','Ingrese un numero de paginas valido').isNumeric(),
    check('ano','El año del libro es necesario').not().isEmpty(),
    check('editorial','El nombre del editorial es necesario').not().isEmpty(),
    validarCampos
],crearLibro);
router.put("/:id", updateLibro);
router.delete("/:id", eliminarLibro);

module.exports = router;