const Blog = require("../Model/Blog"); 
const mongoose = require("mongoose"); // ✅ Import mongoose to validate ObjectId

// ✅ Create Blog
exports.createBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!title || !content || !category || !image) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const blog = new Blog({ title, content, category, image });
        await blog.save();

        res.status(201).json({
            message: "Blog added successfully",
            blog,
        });

    } catch (error) {
        console.error("Error creating blog:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Fetch All Blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        if (!blogs.length) {
            return res.status(404).json({ message: "No blogs found" });
        }

        res.status(200).json(blogs);

    } catch (error) {
        console.error("Error fetching blogs:", error.message);
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};

// ✅ Fetch Blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        //console.log("Received blog ID:", id); // ✅ Debug log

        // ✅ Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid blog ID format");
            return res.status(400).json({ error: "Invalid blog ID format" });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            console.warn("Blog not found for ID:", id);
            return res.status(404).json({ error: "Blog not found" });
        }

        //console.log("Blog found:", blog);
        res.status(200).json(blog);

    } catch (error) {
        console.error("Error fetching blog:", error.message);
        res.status(500).json({ error: "Failed to fetch blog" });
    }
};
