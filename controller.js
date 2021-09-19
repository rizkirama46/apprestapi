'use strict'

const respone = require('./res')
const connection = require('./koneksi')

exports.index = function(req, res) {
  respone.ok("Aplikasi REST API ku berjalan!", res)
}

exports.tampilMahasiswa = function(req, res){
  connection.query('SELECT * FROM mahasiswa',  function(error, rows, fields) {
    if(error) {
      console.log(error);
    } else {
      respone.ok(rows, res)
    }
  })
}