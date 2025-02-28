const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now } // ✅ Ensure updatedAt field exists
});

// Automatically update `updatedAt` when a blog is modified
blogSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

blogSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: new Date() });
    next();
});

module.exports = mongoose.model("Blog", blogSchema);
