const express = require('express');
const router = express.Router();
const facturaCtrl = require('../controllers/factura.controller');

// CRUD
router.get('/', facturaCtrl.getFacturas);
router.post('/', facturaCtrl.createFactura);
router.get('/:id', facturaCtrl.getFacturaById);
router.put('/:id', facturaCtrl.updateFactura);
router.delete('/:id', facturaCtrl.deleteFactura);

// Imprimir
router.get('/imprimir/:id', facturaCtrl.imprimirFactura);

module.exports = router;