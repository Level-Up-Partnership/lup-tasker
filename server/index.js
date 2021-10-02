const express = require('express');
const cors = require('cors')
const serveStatic = require('serve-static');
const path = require('path');
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());


//ROUTES
app.use('/login', require('./routes/api/loginRoute/login'));
app.use('/register', require('./routes/api/registerRoute/register'));
app.use('/user', require('./routes/api/getUser/getUser'));
app.use('/changepassword', require('./routes/api/changePassword/changePassword'));
app.use('/checkRole', require('./routes/api/checkUserRole/userRole'));
app.use('/categoryInfo', require('./routes/api/ForumAPI/Category'));
app.use('/postCreation', require('./routes/api/ForumAPI/PostCreation'));
app.use('/getPosts', require('./routes/api/ForumAPI/GetForumPost'));
app.use('/categoryCreation', require('./routes/api/addCategory/addCategory'));
app.use('/deleteCategory', require('./routes/api/ForumAPI/DeleteCategory'));
app.use('/deletePost', require('./routes/api/ForumAPI/DeletePost'));
app.use('/forumReplies', require('./routes/api/ForumAPI/GetForumReplies'));
app.use('/getimgurl', require('./routes/api/getUser/getAdminImg'));
app.use('/addBanner', require('./routes/api/addBanner/addAdminBanner'));
app.use('/postTask', require('./routes/api/TaskAPI/createTask/createTask'));
app.use('/getTask', require('./routes/api/TaskAPI/getTask/getTask'));
app.use('/deleteTask', require('./routes/api/TaskAPI/deleteTask/deleteTask'));

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '../client/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));

})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));