import React, { useState, useRef, useEffect } from "react";
import styles from "./AddBlogPage.module.css";
import { useAuthContext } from "../../hooks/UseAuthContext";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [page, setPage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImagePreview(url);
      
      return () => URL.revokeObjectURL(url);  // Cleanup object URL
    }
  }, [image]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setImage(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      setError("You must be logged in to post a blog.");
      return;
    }

    if (!title.trim() || !content.trim() || !image || !page) {
      setError("All fields are required!");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", page);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:4000/api/blogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Blog posted successfully!");
        setTitle("");
        setContent("");
        setImage(null);
        setImagePreview(null);
        setPage("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError(data.message || "Failed to post blog");
      }
    } catch (err) {
      setError("Something went wrong! Try again.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.addBlogContainer}>
      <h2 className={styles.heading}>Add Blog</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className={styles.label}>Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />

        <label htmlFor="content" className={styles.label}>Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className={styles.textarea}
        ></textarea>

        <label className={styles.label}>Image:</label>
        <div
          className={`${styles.dropZone} ${dragOver ? styles.dragOver : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current.click()}
        >
          {image ? "Click to change image" : "Drag & Drop an image here or click to select"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {imagePreview && (
          <div className={styles.imagePreviewContainer}>
            <p>Selected File: {image.name}</p>
            <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
            <button type="button" onClick={handleRemoveImage} className={styles.removeImageBtn}>
              Remove Image
            </button>
          </div>
        )}

        <label htmlFor="category" className={styles.label}>Category:</label>
        <select
          id="category"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          required
          className={styles.select}
        >
          <option value="">Select an option</option>
          <option value="home pets">Home Pets</option>
          <option value="stray animals">Stray Animals</option>
        </select>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? "Posting..." : "Post Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
