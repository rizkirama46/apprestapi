const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan')
const app = express();
const cors = require('cors')

//parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//panggil routes
const routes = require('./routes');
routes(app)

//daftarkan menu routes dari index
app.use('/auth', require('./middleware'));

app.listen(3001, () => {
  console.log(`Server started on port 3001`);
});