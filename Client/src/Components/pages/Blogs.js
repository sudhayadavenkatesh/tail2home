import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchBlogs from "../../hooks/useFetchBlogs";
import { formatDistanceToNow } from "date-fns"; 
import "./Blog.css";

const Blogs = () => {
    const { blogs, loading } = useFetchBlogs();
    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;

    const formatTimeAgo = (updatedAt) => {
        if (!updatedAt) return "Unknown time"; 
        const date = new Date(updatedAt);
        if (isNaN(date.getTime())) return "Invalid date"; 
        return formatDistanceToNow(date, { addSuffix: true });
    };

    return (
        <div className="blog-container">
            <h2 className="blog-title">Latest Blogs</h2>
            <div className="blog-grid">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog._id} className="blog-card">
                            <img src={`http://localhost:4000${blog.image}`} alt={blog.title} />
                            <div className="blog-content">
                                <h3>{blog.title}</h3>
                                <p>{blog.content.substring(0, 100)}...</p>
                                <button 
                                    onClick={() => navigate(`/blog/${blog._id}`)} 
                                    className="read-more-btn"
                                >
                                    Read More
                                </button>
                                <p className="blog-time">{formatTimeAgo(blog.updatedAt)}</p> 
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>
        </div>
    );
};

export default Blogs;
