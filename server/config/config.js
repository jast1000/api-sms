//Puerto
process.env.PORT = 3000;

//Base de datos
process.env.PGHOST = '127.0.0.1';
process.env.PGPORT = 5432;
process.env.PGDATABASE = 'smsbd';
process.env.PGUSER = 'postgres';
process.env.PGPASSWORD = '';

//Bulk SMS
process.env.BULKSMS_URL = 'https://api.bulksms.com/v1';
process.env.BULKSMS_TOKENID = '';
process.env.BULKSMS_TOKENSECRET = '';