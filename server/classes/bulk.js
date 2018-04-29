const axios = require('axios');

const URL_BULKSMS = process.env.BULKSMS_URL;

class BulkSMS {

    constructor() { }

    async sendSMS(number, message) {
        try {
            let data = await axios({
                method: 'post',
                url: `${URL_BULKSMS}/messages`,
                data: { to: number, body: message },
                auth: {
                    username: process.env.BULKSMS_TOKENID,
                    password: process.env.BULKSMS_TOKENSECRET
                }
            });
            return {
                estado: 'ok',
                descripcion: 'Se envío el mensaje SMS'
            }
        } catch (err) {
            return {
                estado: 'error',
                descripcion: 'No se envío el mensaje SMS'
            }
        }
    }
}

module.exports = {
    BulkSMS
};