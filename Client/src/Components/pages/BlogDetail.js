import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Blog.css";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                console.log("Fetching blog with ID:", id);
                
                const token = localStorage.getItem("authToken"); // Fetching token from localStorage
                console.log("Fetched Token:", token); // Check if token is null or valid
                
                const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
    
                console.log("API response status:", response.status);
                
                if (!response.ok) {
                    console.error("Failed to fetch blog. Status:", response.status);
                    return;
                }
    
                const data = await response.json();
                console.log("Fetched blog data:", data);
                
                setBlog(data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);
    
    

    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog not found.</p>;

    return (
        <div className="blog-container">
            <div className="blog-details">
                <img 
                    src={`http://localhost:4000${blog.image}`} 
                    alt={blog.title} 
                    className="blog-image"
                />
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-content">{blog.content}</p>
            </div>
        </div>
    );
};

export default BlogDetails;
