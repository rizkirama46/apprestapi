const jwt = require('jsonwebtoken')
const config = require('../config/secret')

function verifikasi(roles) {
  return function(req, rest, next) {
    //cek authorization header
    const tokenWithBearer = req.headers.authorization
    if(tokenWithBearer) {
      const token = tokenWithBearer.split(' ')[1]
      //verifikasi
      jwt.verify(token, config.secret, function(err, rows) {
        if(err) {
          return rest.status(401).send({auth: false, message: 'Token Tidak Terdaftar!'})
        } else {
          if(roles == 1) {
            req.auth = rows;
            next()
          } else {
            return rest.status(401).send({auth: false, message: 'Gagal Mengotorisasi Role Anda!'})
          }
        }
      })
    } else {
      return rest.status(401).send({auth: false, message: 'Token Tidak Tersedia!'})
    }
  }
}

module.exports = verifikasi