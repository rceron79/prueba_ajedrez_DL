const { nanoid } = require("nanoid");

const requireDatos = (req, res, next) => {
    try {
        // validaciones
        const { nombre, email, password, experiencia } = req.body;

        if (
            !nombre?.trim() ||
            !email?.trim() ||
            !password?.trim() ||
            !experiencia?.trim() ||
            !req.files?.foto
        ) {
            throw new Error("Algunos campos están vacios");
        }

        // validaciones de las fotos
        const { foto } = req.files;
        const mimeTypes = ["image/jpeg", "image/png"];
        if (!mimeTypes.includes(foto.mimetype)) {
            throw new Error("Solo archivos png o jpg");
        }
        if (foto.size > 5 * 1024 * 1024) {
            throw new Error("Máximo 5MB");
        }

        const pathFoto = `${nanoid()}.${foto.mimetype.split("/")[1]}`;
        req.pathFoto = pathFoto;

        next();
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = {
    requireDatos,
};