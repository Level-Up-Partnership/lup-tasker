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
app.use('/updateTime', require('./routes/api/TaskAPI/updateTask/updateTime.js'));
app.use('/finishTask', require('./routes/api/TaskAPI/updateTask/finishTask.js'));
app.use('/editTask', require('./routes/api/TaskAPI/updateTask/editTask.js'));
app.use('/filteredTask', require('./routes/api/TaskAPI/getTask/filteredCategory.js'));
app.use('/searchTask', require('./routes/api/TaskAPI/getTask/searchForTask.js'));
app.use('/updateComment', require('./routes/api/TaskAPI/updateTask/updateComment.js'));
app.use('/createSubtask', require('./routes/api/TaskAPI/createTask/createSubTask.js'));
app.use('/getSingleTask', require('./routes/api/TaskAPI/getTask/getSingleTask.js'));
app.use('/getSubTask', require('./routes/api/TaskAPI/getTask/getSubTask.js'));
app.use('/deleteSubTask', require('./routes/api/TaskAPI/deleteTask/deleteSubTask.js'));
app.use('/filteredTaskStatus', require('./routes/api/TaskAPI/getTask/filteredStatus.js'));
app.use('/updateSubTask', require('./routes/api/TaskAPI/updateTask/updateSubTask'));
app.use('/getPagTask', require('./routes/api/TaskAPI/getTask/getPaginatedTask.js'));
app.use('/getTasksCompleted', require('./routes/api/userStatsAPI/TasksCompleted.js'));
app.use('/getTaskByMonth', require('./routes/api/userStatsAPI/getTaskByMonth'));
app.use('/getTasksCompletedAdmin', require('./routes/api/userStatsAPI/getTasksCompAdmin'));
app.use('/getTasksByMonthAdmin', require('./routes/api/userStatsAPI/getTasksMonthAdmin'));
app.use('/getCategoriesAdmin', require('./routes/api/userStatsAPI/getTotalCategoriesAdmin'));
app.use('/getAllUsers', require('./routes/api/getUser/getAllUsers'));
app.use('/friendTaskbyMonth', require('./routes/api/userFriendstatsAPI/friendTaskbyMonth'));
app.use('/friendCompletedTask', require('./routes/api/userFriendstatsAPI/friendCompletedTask'));
app.use('/sendFriendRequest', require('./routes/api/userFriendstatsAPI/sendFriendReq'));
app.use('/getFriendStatus', require('./routes/api/userFriendstatsAPI/getFriendStatus'));
app.use('/getFriendRequsts', require('./routes/api/userFriendstatsAPI/getFriendRequests'));
app.use('/acceptFriend', require('./routes/api/userFriendstatsAPI/updateFriendStatus'));
app.use('/deleteFriend', require('./routes/api/userFriendstatsAPI/deleteFriendRequest'));
app.use('/getFriends', require('./routes/api/userFriendstatsAPI/getFriends'));

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '../client/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));

})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));