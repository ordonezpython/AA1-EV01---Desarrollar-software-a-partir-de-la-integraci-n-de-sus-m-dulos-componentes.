const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/facturas';

mongoose.connect(URI,)
.then(() => console.log('conexion a MongoDB establecida'))
.catch(err => console.error('error de conexion a MongoDB:', err));

module.exports = mongoose;