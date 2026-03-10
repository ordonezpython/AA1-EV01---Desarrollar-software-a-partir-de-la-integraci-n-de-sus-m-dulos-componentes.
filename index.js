const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const Factura = require('./models/factura');
const  mongoose  = require('./database');

const app = express(); 
app.set('port', process.env.PORT || 3000);

// Configuraciones

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.use('/api/facturas', require('./routes/factura.routes'));


// Iniciando el servidor

app.listen(app.get('port'), () => {

console.log('server activo en el puerto', app.get('port'));

});