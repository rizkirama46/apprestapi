const connection = require('../koneksi')
const mysql = require('mysql')
const md5 = require('md5')
const respone = require('../res')
const jwt = require('jsonwebtoken')
const config = require('../config/secret')
const ip = require('ip')

//controller untuk register
exports.registrasi = function(req, res) {
  const post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: +req.body.role,
    tanggal_daftar: req.body.tanggal_daftar
  }

  const query = `SELECT email FROM ?? WHERE ??=?`
  const table = ['user', 'email', post.email]

  const sql = mysql.format(query, table)

  connection.query(sql, function(error, rows) {
    if(error) {
      console.log(error);
    } else {
      if(rows.length == 0) {
        const query = "INSERT INTO ?? SET ?"
        const table = ["user"]
        const sql = mysql.format(query, table)
        connection.query(sql, post, function(error, rows) {
          if(error) {
            console.log(error);
          } else {
            respone.ok('Berhasil Menambahkan Data', res)
          }
        })
      } else {
        respone.ok('Email sudah terdaftar', res)
      }
    }
  })
}