const express = require('express');
const cors = require('cors')
const { authHeader, unAuthUser } = require('./middleware');
const serveStatic = require('serve-static');
const path = require('path');
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(authHeader);

//ROUTES
app.use('/login', require('./routes/api/loginRoute/login'));
app.use('/register', require('./routes/api/registerRoute/register'));
app.use('/user', require('./routes/api/getUser/getUser'));
app.use('/changepassword', require('./routes/api/changePassword/changePassword'));
app.use('/checkRole', require('./routes/api/checkUserRole/userRole'));
app.use('/categoryInfo', require('./routes/api/ForumAPI/Category'));
app.use('/postCreation', require('./routes/api/ForumAPI/PostCreation'));
app.use('/getPosts', require('./routes/api/ForumAPI/GetForumPost'));

// Handle production 
// app.use
// if (process.env.NODE_ENV === 'production') {
//     //
//     app.use(express.static(__dirname + '/public/'))

//     //Handle spa
//     app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }
//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join('../client/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join('../client/dist/index.html'));
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));