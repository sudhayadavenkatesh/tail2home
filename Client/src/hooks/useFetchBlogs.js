import { useState, useEffect } from "react";
import { useAuthContext } from "./UseAuthContext"; // ✅ Correct import

const useFetchBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useAuthContext(); // Added setUser for updating token

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                let authToken = user?.token;
                let response = await fetch("http://localhost:4000/api/blogs", {
                    headers: { Authorization: `Bearer ${authToken}` },
                });

                if (response.status === 401) { // Token expired
                    const refreshResponse = await fetch("http://localhost:4000/api/refresh-token", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token: authToken }),
                    });

                    if (refreshResponse.ok) {
                        const data = await refreshResponse.json();
                        authToken = data.newToken;
                        const updatedUser = { ...user, token: authToken };
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                        setUser(updatedUser); // Update token in context

                        response = await fetch("http://localhost:4000/api/blogs", {
                            headers: { Authorization: `Bearer ${authToken}` },
                        });
                    }
                }

                if (!response.ok) throw new Error("Failed to fetch blogs");

                const data = await response.json();
                setBlogs(data || []);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [user, setUser]);

    return { blogs, loading };
};

export default useFetchBlogs;
