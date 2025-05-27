const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/admin/role');
const permissionRoutes = require('./routes/admin/permission');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authenticateJWT = require('./middlewares/authenticateJWT');

require('dotenv').config();
require('./config/passport');

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:3000", // allow frontend
    credentials: true, // allow cookies & headers like CSRF
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/api', authRoutes);
app.use('/api/admin/role', authenticateJWT, roleRoutes);
app.use('/api/admin/permission',authenticateJWT, permissionRoutes);
app.use('/', (req, res) => {
    return res.json({ 'msg': "this is the home page."});
});


app.listen(process.env.PORT, async () => {
    console.log(`Server Started at port: ${process.env.PORT}`); 
})