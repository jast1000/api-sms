const express = require('express');
const { Contacto } = require('../classes/contacto');
const app = express();

const contactoModel = new Contacto();

app.get('/v1/contactos', async (req, res) => {
    try {
        let data = await contactoModel.getContactos();
        return res.json({
            success: true,
            response: data
        });
    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({
                success: false,
                message: 'Ocurrió un error al consultar'
            });
    }
});

app.post('/v1/contactos', async (req, res) => {
    const contacto = req.body;
    if (!contacto.alias || !contacto.nombres || !contacto.numero_celular) {
        return res.status(400).json({
            success: false,
            message: "Falta informacion"
        });
    }

    try {
        await contactoModel.saveContacto(contacto);
        return res.json({
            success: true,
            message: "Contacto guardado"
        });
    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({
                success: false,
                message: 'Ocurrió un error al guardar'
            });
    }
});


app.put('/v1/contactos/:id', async (req, res) => {
    let idContacto = req.params.id;
    const contacto = req.body;

    if (!contacto.alias || !contacto.nombres || !contacto.numero_celular) {
        return res.status(400).json({
            success: false,
            message: "Falta informacion"
        });
    }

    try {
        let contactoDB = await contactoModel.searchContacto(idContacto);
        if (!contactoDB) {
            return res.status(400).json({
                success: false,
                message: "Contacto inválido"
            });
        }
        await contactoModel.updateContacto(idContacto, contacto);
        return res.json({
            success: true,
            message: "Contacto actualizado"
        });
    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({
                success: false,
                message: 'Ocurrió un error al actualizar'
            });
    }
});

app.delete('/v1/contactos/:id', async (req, res) => {
    let idContacto = req.params.id;
    try {
        let contacto = await contactoModel.searchContacto(idContacto);
        if (!contacto) {
            return res.status(400).json({
                success: false,
                message: "Contacto inválido"
            });
        }
        await contactoModel.deleteContacto(idContacto);
        return res.json({
            success: true,
            message: "Contacto eliminado"
        });
    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({
                success: false,
                message: 'Ocurrió un error al eliminar'
            });
    }
});

module.exports = app;