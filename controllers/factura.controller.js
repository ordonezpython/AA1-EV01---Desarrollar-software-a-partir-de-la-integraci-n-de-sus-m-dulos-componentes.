const Factura = require("../models/factura");
const PDFDocument = require("pdfkit");

const facturaCtrl = {};

// Obtener todas las facturas
facturaCtrl.getFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find();
    res.json(facturas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear factura
facturaCtrl.createFactura = async (req, res) => {
  try {
    const nuevaFactura = new Factura(req.body);
    await nuevaFactura.save();
    res.json({ status: "Factura guardada", factura: nuevaFactura });
  } catch (err) {
    console.error("error al crear factura:", err)
    res.status(400).json({ error: err.message });
  }
};

// Obtener una factura por ID
facturaCtrl.getFacturaById = async (req, res) => {
  try {
    const factura = await Factura.findById(req.params.id);
    if (!factura) return res.status(404).json({ mensaje: "Factura no encontrada" });
    res.json(factura);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar factura
facturaCtrl.updateFactura = async (req, res) => {
  try {
    const facturaActualizada = await Factura.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!facturaActualizada) return res.status(404).json({ mensaje: "Factura no encontrada" });
    res.json({ status: "Factura actualizada", factura: facturaActualizada });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar factura
facturaCtrl.deleteFactura = async (req, res) => {
  try {
    const facturaEliminada = await Factura.findByIdAndDelete(req.params.id);
    if (!facturaEliminada) return res.status(404).json({ mensaje: "Factura no encontrada" });
    res.json({ status: "Factura eliminada", factura: facturaEliminada });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Imprimir factura en PDF
facturaCtrl.imprimirFactura = async (req, res) => {
  try {
    const factura = await Factura.findById(req.params.id);
    if (!factura) return res.status(404).json({ mensaje: "Factura no encontrada" });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=factura_${factura.numero}.pdf`);
    doc.pipe(res);

    doc.fontSize(20).text("Factura", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Número: ${factura.numero}`);
    doc.text(`Fecha: ${factura.fecha.toLocaleDateString()}`);
    doc.text(`Monto: $${factura.monto}`);
    doc.moveDown();

    doc.fontSize(16).text("Datos del Cliente:");
    doc.fontSize(14).text(`Nombres: ${factura.cliente.nombres}`);
    doc.text(`Apellidos: ${factura.cliente.apellidos}`);
    doc.text(`Cédula: ${factura.cliente.cedula}`);
    doc.text(`Celular: ${factura.cliente.celular}`);
    doc.text(`Correo: ${factura.cliente.correo}`);

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = facturaCtrl;