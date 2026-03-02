const express = require('express')

const morgan = require('morgan');

const cors = require('cors');

const app = express(); // la constante app tendrá ahora todo el funcionamiento del servidor

const  mongoose  = require('./database');

// Configuraciones

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));

app.use(express.json()); // método que ayuda a convertir el código para que el servidor pueda entender lo que viene del cliente.

app.use(cors({origin: 'http://localhost:4200'})); // método para comunicar con el cliente

// rutas de nuestro servidor

app.use('/api/facturas',require('./routes/factura.routes'));

// Iniciando el servidor

app.listen(app.get('port'), () => {

console.log('server activo en el puerto', app.get('port'));

});