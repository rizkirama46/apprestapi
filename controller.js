'use strict'

const respone = require('./res')
const connection = require('./koneksi')

exports.index = function(req, res){
  respone.ok("Aplikasi REST API ku berjalan!")
}