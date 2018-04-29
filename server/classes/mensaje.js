const { Client } = require('pg');

class Mensaje {

    constructor() {
        this.client = new Client();
        this.client.connect();
    }

    async listMensajes() {
        const sql = `   SELECT m.id_sms, c.alias as alias_contacto, c.nombres as contacto, m.mensaje, m.envio, ls.respuesta, ls.estado
            FROM sms AS m INNER JOIN log_sms AS ls ON ls.id_log_sms = m.id_sms
            INNER JOIN contacto AS c using(id_contacto)
            order by envio desc`;
        let { rows } = await this.client.query(sql);
        return rows.length === 0 ? null : rows;
    }

    async saveMensaje(mensaje) {
        let log = mensaje.log;
        const sql1 = 'INSERT INTO sms(id_contacto, mensaje, envio) VALUES($1, $2, $3) RETURNING id_sms';
        const sql2 = 'INSERT INTO log_sms(id_log_sms, respuesta, estado, descripcion_estado) VALUES($1, $2, $3, $4)'
        try {
            await this.client.query('BEGIN');
            let { rows } = await this.client.query(sql1, [mensaje.id_contacto, mensaje.mensaje, mensaje.envio]);
            await this.client.query(sql2, [rows[0].id_sms, log.respuesta, log.estado, log.descripcion_estado]);
            await this.client.query('COMMIT');
        } catch (err) {
            await this.client.query('ROLLBACK');
            throw err;
        }
    }

}

module.exports = {
    Mensaje
};