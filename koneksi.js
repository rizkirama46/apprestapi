const mysql = require('mysql')

//buat koneksi
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbrestapi'
})

conn.connect((err) => {
  if(err) throw err
  console.log('MySQL Terkoneksi');
})

module.exports = conn