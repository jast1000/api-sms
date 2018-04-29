const { Client } = require('pg');

class Contacto {

    constructor() {
        this.client = new Client();
        this.client.connect();
    }

    async searchContacto(id) {
        const query = 'SELECT id_contacto, alias, nombres, numero_celular FROM contacto WHERE id_contacto = $1';
        let data = await this.client.query(query, [id]);
        return data.rows === 0 ? null : data.rows[0];
    }

    async getContactos() {
        const sql = 'SELECT id_contacto, alias, nombres, numero_celular FROM contacto where activo = true order by upper(nombres) asc';
        let data = await this.client.query(sql);
        return data.rows;
    }

    async saveContacto(contacto) {
        const sql = 'INSERT INTO contacto(alias, nombres, numero_celular, activo) VALUES($1, $2, $3, true)';
        await this.client.query(sql, [contacto.alias, contacto.nombres, contacto.numero_celular]);
    }

    async deleteContacto(id) {
        const update = 'UPDATE contacto SET activo = false WHERE id_contacto = $1';
        await this.client.query(update, [id]);
    }

    async updateContacto(id, contacto) {
        const update = 'UPDATE contacto SET alias = $1, nombres = $2, numero_celular = $3 WHERE id_contacto = $4';
        await this.client.query(update, [contacto.alias, contacto.nombres, contacto.numero_celular, id]);
    }
}

module.exports = {
    Contacto
};