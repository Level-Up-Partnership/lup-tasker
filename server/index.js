const express = require('express');
const user = require('./routes/api/user');

const app = express();
app.use(express.json());

app.use('/api/user', user);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${5000}`));