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

exports.ubahMahasiswa = function(req, res){
  const id = req.body.id
  const nim = req.body.nim
  const nama = req.body.nama
  const jurusan = req.body.jurusan

  connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id=?', [nim, nama, jurusan, +id], function(error, rows, fields) {
    if(error) {
      console.log(error);
    } else {
      respone.ok('Berhasil Mengubah Data!', res)
    }
  })
}

exports.hapusMahasiswa = function(req, res){
  let id = req.body.id

  connection.query('DELETE FROM mahasiswa WHERE id = ?', [id], function(error, rows, fields) {
    if(error) {
      console.log(error);
    } else {
      respone.ok('Berhasil Menghapus Data', res)
    }
  })
}

exports.tampilGroupMatakuliahByIdMahasiswa = function(req, res){

  connection.query(`SELECT mhs.id, mhs.nim, mhs.nama, mhs.jurusan, mk.matakuliah, mk.sks FROM krs krs INNER JOIN matakuliah mk ON krs.id_matakuliah = mk.id INNER JOIN mahasiswa mhs ON krs.id_mahasiswa = mhs.id ORDER BY mhs.id`, function(error, rows, fields) {
    if(error) {
      console.log(error);
    } else {
      respone.gabungMatakuliahByIdMahasiswa(rows, res)
    }
  })
}