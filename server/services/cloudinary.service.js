const cloudinary = require('cloudinary').v2;
const cloudinary_name = process.env.CLOUDINARY_NAME;
const cloudinary_key = process.env.CLOUDINARY_KEY;
const cloudinary_secret = process.env.CLOUDINARY_SECRET;

cloudinary.config({
    cloud_name: cloudinary_name,
    api_key: cloudinary_key,
    api_secret: cloudinary_secret
});

async function uploadImage(file) {
    try {
        const result = await cloudinary.uploader.upload(file, { resource_type: "auto" });
        return result.secure_url;

    } catch (error) {
        console.log('Error al enviar las imagenes a cloudinary' + error.message);
        throw error;
        
    }
    
};

async function deleteImage(publicId){
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`se a eliminado la imagen ${publicId} de cloudinary`)
    } catch (error) {
        console.log("error al elimanar la imagen de cloudinary" + error)
    }
}

module.exports = {
    uploadImage,
    deleteImage
};