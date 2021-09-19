'use strict'

module.exports = function(app) {
  const jsonku = require('./controller')

  app.route('/')
    .get(jsonku.index)

  app.route('/mahasiswa')
    .get(jsonku.tampilMahasiswa)
  
  app.route('/mahasiswa/:id')
  .get(jsonku.tampilMahasiswaById)
}