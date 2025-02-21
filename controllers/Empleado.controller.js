const Empleado = require('../models/empleado');
const bcrypt = require('bcrypt'); 
const EmpleadoCtrl = {}; // Create an object to hold the controller methods

EmpleadoCtrl.create = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const empleado = new Empleado({
            email,
            password: hashedPassword
        });
        await empleado.save();
        res.json({ message: 'Empleado creado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear empleado', details: error.message });
    }
}

// EmpleadoCtrl.getEmpleado = async (req, res) => {
//     const email = req.params.email;
//     const empleado = await Empleado.findOne({ email });
// }

module.exports = EmpleadoCtrl; // Export the controller object