const producto = require('../models/producto');
const cloudinaryService = require('../services/cloudinary.service');
const productoCtrl = {};

productoCtrl.create = async(req, res)=>{
    //obtener datos del formulario del front
    const { nombre, descripcion, precio, genero, categoria } = req.body;
    const files = req.files;

    //enviar images a cloudinary y obtener urls
    try {
        const imagesUrls = [];

    for(const file of files){
        const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const url = await cloudinaryService.uploadImage(dataUrl);
        imagesUrls.push(url);
    }

    const product = new producto({
        nombre,
        descripcion,
        precio,
        genero,
        categoria,
        images: imagesUrls
    });

    await product.save();
        res.status(201).json({ message: 'el producto a sido guardado' })
    } catch (error) {
        res.status(500).json( { message: 'A ocurrido un error ' + error.message })
    }
};

productoCtrl.getProduct = async(req, res)=>{
    const { id } = req.params
    try {
        const data = await producto.findById( id )
        if (!data) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(201).send(data)
    } catch (error) {
        res.status(500).json({message: "error al intentar obtener los datos" + error})
    }
}

productoCtrl.getAllProduct = async(req, res)=>{
    try {
        const data = await producto.find()
        if(!data){
            res.status(404).json({message: "No se encontraron Productos"})
        }
        res.status(201).send(data)
    } catch (error) {
        res.status(500).json({message: "A ocurrido un error"} + error)
    }
}

productoCtrl.deleteOneProduct = async(req, res) =>{
   try {
    const { id } = req.params;
    const data = await producto.findById( id )

    if(!data){
        res.status(404).json({message: "producto no encontrado"});
        return;
    }

    for(const imageUrl of data.images){
        const publicId = imageUrl.split('/').pop().split('.')[0];
        await cloudinaryService.deleteImage(publicId);
    }

    await producto.findByIdAndDelete(id)
    res.status(200).json({message: "El producto a sido eliminado"})
   } catch (error) {
    res.status(500).json({message: "Error de conexion al servidor"})
    console.error("Error al eliminar producto:", error);
   }
}

module.exports = productoCtrl;


