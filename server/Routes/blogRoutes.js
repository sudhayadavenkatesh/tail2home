const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { createBlog, getAllBlogs, getBlogById } = require("../Controller/blogController"); // ✅ Import getBlogById
const requireAuth = require("../Middleware/requireAuth");

const router = express.Router();

// Ensure "uploads/" directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ Existing Routes
router.post("/", requireAuth, upload.single("image"), createBlog); // Protected Route (Requires Auth)
router.get("/", getAllBlogs); // Public Route (Fetch All Blogs)

// ✅ New Route to Fetch a Blog by ID (Public Route)
router.get("/:id", getBlogById); 

module.exports = router;
