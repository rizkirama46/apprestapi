const connection = require('../koneksi')
const mysql = require('mysql')
const md5 = require('md5')
const respone = require('../res')
const jwt = require('jsonwebtoken')
const config = require('../config/secret')
const ip = require('ip')
const { token } = require('morgan')

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

//controller untuk login
exports.login = function(req, res) {
  const post = {
    email: req.body.email,
    password: md5(req.body.password)
  }

  const query = `SELECT * FROM ?? WHERE ??=? AND ??=?`
  const table = ['user', 'email', post.email, 'password', post.password]

  const sql = mysql.format(query, table)

  connection.query(sql, function(error, rows) {
    if(error) {
      console.log(error);
    } else {
      if(rows.length == 1) {
        const token = jwt.sign({rows}, config.secret, {
          expiresIn: 1440
        })
       
        id = rows[0].id

        const data = {
          id_user: id,
          access_token: token,
          ip_address: ip.address()
        }

        const query = `INSERT INTO ?? SET ?`
        const table = ['akses_token']

        const sql = mysql.format(query, table)

        connection.query(sql, data, function(error, rows) {
          if(error) {
            console.log(error);
          } else {
             res.json({
               success: true,
               message: 'Token JWS Tergenerate!',
               token: token,
               currUser: data.id_user
             });
          }
        })
      } else {
        res.json({'Error': true, "Message": "Email atau Password Salah!"});
     }
    }
  })
}