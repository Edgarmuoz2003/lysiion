const Empleado = require('../models/empleado');
const bcrypt = require('bcrypt');
const loginCtrl = {}; // Create an object to hold the controller methods

loginCtrl.login = async (req, res) => {

    const { email, password } = req.body;

   try {
    const empleado = await Empleado.findOne({ email });
    if (empleado) {
        const match = await bcrypt.compare(password, empleado.password);
        if (match) {
            res.status(200).json({ status: 'Login success' });
        } else {
            res.status(401).json({ status: 'Contraseña Incorrecta' });
        }
    } else {
        res.status(404).json({ status: 'Usuario no encontrado' });
    }
   } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error de servidor' });
   }
}







module.exports = loginCtrl; // Export the controller object