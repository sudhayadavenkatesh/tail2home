require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const petRouter = require('./Routes/PetRoute');
const AdoptFormRoute = require('./Routes/AdoptFormRoute');
const userRouter = require('./Routes/UserRoute');
const OtpRouter = require('./Routes/OtpRoute');
const DashboardRouter = require('./Routes/DashboardRoute');
const blogRoutes = require('./Routes/blogRoutes');
const requireAuth = require('./Middleware/requireAuth');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
}));
app.use(cors());

// ✅ Serve images before authentication
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "images")));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Open routes (No authentication required)
app.use('/api', OtpRouter);
app.use(userRouter);
app.use('/dashboard', DashboardRouter);
app.use('/api/blogs', blogRoutes);  // ✅ Blogs should work now
app.use('/form', AdoptFormRoute);  // ✅ Adoption form should work

// ✅ Apply authentication only for protected routes
app.use(requireAuth);

app.use(petRouter);  // ✅ Only pet-related routes require authentication

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to DB');
        const PORT = 4000;
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
