const express = require('express');
const cors = require('cors')
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/login', require('./routes/api/loginRoute/login'));
app.use('/register', require('./routes/api/registerRoute/register'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${5000}`));