const express = require('express');
const app = express();

const { Contacto } = require('../classes/contacto');
const { Mensaje } = require('../classes/mensaje');
const { BulkSMS } = require('../classes/bulk');

const contactoModel = new Contacto();
const mensajeModel = new Mensaje();
const bulkSMS = new BulkSMS();

app.get('/v1/sms', async (req, res) => {
    try {
        let mensajes = await mensajeModel.listMensajes();
        return res.json({
            success: true,
            response: mensajes
        });
    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({
                success: false,
                message: 'Ocurrió un error al consultar los mensajes'
            });
    }
});

app.post('/v1/sms', async (req, res) => {
    let smsRequest = req.body;
    try {
        let contacto = await contactoModel.searchContacto(smsRequest.id_contacto);
        if (!contacto) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Contacto inválido'
                });
        }
        let mensaje = {
            id_contacto: smsRequest.id_contacto,
            mensaje: smsRequest.mensaje,
            envio: new Date()
        };
        let respBulk = await bulkSMS.sendSMS(`+521${contacto.numero_celular}`, smsRequest.mensaje);
        mensaje.log = {
            respuesta: new Date(),
            estado: respBulk.estado,
            descripcion_estado: respBulk.descripcion
        };
        await mensajeModel.saveMensaje(mensaje);
        return res.json({
            success: true,
            message: 'Mensaje enviado'
        });
    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({
                success: false,
                message: 'Ocurrió un error al enviar el mensaje'
            });
    }
});


module.exports = app;