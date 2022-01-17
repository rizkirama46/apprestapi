const connection = require('../koneksi')
const mysql = require('mysql')
const md5 = require('md5')
const respone = require('../res')
const jwt = require('jsonwebtoken')
const config = require('../config/secret')
const ip = require('ip')
const nodemailer = require('nodemailer')

let smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "rizkiramaworks@gmail.com",
    pass: "madepwae147"
  }
})

let rand, mailOptions, host, link

exports.verifikasi = function(req, res) {
  console.log(req.protocol);
  if((req.protocol + '://' + req.get('host')) == ('http://' + host)) {
    if(req.query.id == rand) {
      connection.query('UPDATE user SET isVerified=? WHERE email=?', [1, mailOptions.to],
        function(error, rows, fields) {
          if(error) {
            console.log(error);
          } else {
            respone.ok("Berhasl merubah data verifikasi", res)
          }
        }
      )
      res.end("<h1>Email anda " + mailOptions.to + " telah terverifikasi")
    } else {
      res.end("<h1>Email anda " + mailOptions.to + " tidak terverifikasi")
    }
  }
}

//controller untuk register
exports.registrasi = function(req, res) {
  const post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: 3,
    tanggal_daftar: new Date(),
    isVerified: 0
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
            rand = Math.floor((Math.random() * 100) + 54)
            host = "localhost:3001"
            link = "http://" + host + "/auth/verify?id=" + rand
            mailOptions = {
              to: post.email,
              subject: "Verifikasi Email",
              html: "Hallo, <br> Please klik tautan verifikasi berikut <br>" + 
              "<a href=" + link + "> Click here to verifikasi </a>"
            }
            smtpTransport.sendMail(mailOptions, function(error, respone) {
              if(error) {
                 res.json({
                   success: false,
                   isRegistered: false,
                   message: "Email verifikasi gagal terkirim"
                 }).end();
              } else {
                res.json({
                  success: true,
                  isRegistered: false,
                  message: "Email verifikasi berhasil terkirim"
                }).end();
              }
            })
          }
        })
      } else {
        res.json({
          success: false,
          isRegistered: true,
          message: "Email anda telah terdaftar"
        }).end();
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
          expiresIn: '10000'
        })
       
        id = rows[0].id
        //1. tambahan row username
        username = rows[0].username
        //2. tambahan row role
        role = rows[0].role
        
        isVerified = rows[0].isVerified
        //3. variable expired
        const expired = 10000

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
               currUser: data.id_user,
               //4. tambahan expired time
               expires: expired,
               //2. tambahan user
               user: username,
               //3. tambah role
               role: role,

               isVerified: isVerified
             });
          }
        })
      } else {
        res.json({'Error': true, "Message": "Email atau Password Salah!"});
     }
    }
  })
}

exports.halamanRahasia = function(req, res) {
  respone.ok('Halaman ini hayan untuk user dengan role = 2!', res)
}

//menampilkan semua mahasiswa
exports.adminMahasiswa = function(req, res) {
  connection.query('SELECT * FROM mahasiswa', function(error, rows, fields) {
    if(error) {
      console.log(error)
    } else {
      respone.ok(rows, res)
    }
  })
}