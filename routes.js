'use strict'

module.exports = function(app) {
  const jsonku = require('./controller')

  app.route('/')
    .get(jsonku.index)

  app.route('/mahasiswa')
    .get(jsonku.tampilMahasiswa)
  
  app.route('/mahasiswa/:id')
  .get(jsonku.tampilMahasiswaById)

  app.route('/tambah')
    .post(jsonku.tambahMahasiswa)
  
  app.route('/edit')
    .put(jsonku.ubahMahasiswa)
  
  app.route('/delete')
    .delete(jsonku.hapusMahasiswa)
  
  app.route('/matakuliah')
    .get(jsonku.tampilGroupMatakuliahByIdMahasiswa)
}