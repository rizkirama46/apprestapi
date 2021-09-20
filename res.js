'use strict'

const e = require("express");

exports.ok = function(values, res){
  const data = {
    'status': 200,
    'values': values
  }

  res.json(data);
  res.end();
}

exports.gabungMatakuliahByIdMahasiswa = function(values, res) {
  //lakukan akumulasi
  const hasil = values.reduce((akumulasi, e) => {
     //tentukan key group
     if(akumulasi[e.nama]) {
      //buat variabel group nama mahasiswa
      const group = akumulasi[e.nama]
      //cek jika isi Array adalah matakuliah
      if(Array.isArray(group.matakuliah)) {
        //tambahkan value ke dalam group matakuliah
        group.matakuliah.push(e.matakuliah)
      } else {
        group.matakuliah = [group.matakuliah, e.matakuliah]
      }
    } else {
      akumulasi[e.nama] = e
    }
    return akumulasi
  }, {})    
  
  const data = {
    'status': 200,
    'values': hasil
  }

  res.json(data);
  res.end();
}