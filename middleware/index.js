const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat yang perlu otoriasi
router.get('/api/v1/rahasia', verifikasi(2), auth.halamanRahasia)

module.exports = router