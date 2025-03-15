const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./database');

const app = express();
connectDB();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/Empleado.routes'));
app.use('/api', require('./routes/Login.routes'));
app.use('/api', require('./routes/productos.routes'));

//listen
app.listen(app.get('port'), () => {
  console.log('Server running on port', app.get('port'));
});