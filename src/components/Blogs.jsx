import React from "react";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Blogs.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const Blogs = ({ blogs, title }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <>
      <div className="allblog-list">
        <div className="allblog-title">
          <h2 className="allmiddle">{title}</h2>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search blogs"
            value={searchQuery}
            className="allblog-search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {blogs
          .filter(
            (blog) =>
              blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              blog.author.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((blog) => (
            <Link
              to={`/blogs/allblogdetails/${blog.id}`}
              className="link-com"
              key={blog.id}
            >
              <div className="allblog-preview">
                <h2>{blog.title}</h2>
                <p className="alllink-p">Written by {blog.author}</p>
                {/* <button onClick={() => handleDelete(blog.id)}>delete blog</button> */}
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};
