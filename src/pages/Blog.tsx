import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from an API or a local source
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold">Blog</h1>
      </header>
      <main className="container mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="mb-6">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-300">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="text-purple-400 hover:underline">
              Read more
            </Link>
          </div>
        ))}
      </main>
      <div className="container mx-auto py-8 text-center">
        <Link 
          to="/admin" 
          className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
        >
          Access Admin Panel
        </Link>
      </div>
    </div>
  );
};

export default Blog;
