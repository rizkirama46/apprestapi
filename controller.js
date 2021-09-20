'use strict'

const respone = require('./res')
const connection = require('./koneksi')

exports.index = function(req, res) {
  respone.ok("Aplikasi REST API ku berjalan!", res)
}

exports.tampilMahasiswa = function(req, res){
  connection.query('SELECT * FROM mahasiswa', function(error, rows, fields) {
    if(error) {
      console.log(error);
    } else {
      respone.ok(rows, res)
    }
  })
}

exports.tampilMahasiswaById = function(req, res){
  let id = req.params.id

  connection.query('SELECT * FROM mahasiswa WHERE id = ?', [id], function(error, rows, fields) {
    if(error) {
      console.log(error);
    } else {
      respone.ok(rows, res)
    }
  })
}

exports.tambahMahasiswa = function(req, res){
  const nim = req.body.nim
  const nama = req.body.nama
  const jurusan = req.body.jurusan

  connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES (?,?,?)', [nim, nama, jurusan], function(error, rows, fields) {
    if(error) {
      console.log(error);
    } else {
      respone.ok('Berhasil Menambah Data!', res)
    }
  })
}