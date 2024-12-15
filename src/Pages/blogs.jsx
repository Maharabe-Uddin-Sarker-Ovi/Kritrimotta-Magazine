import React from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  // Static data for 10 blog posts
  const blogs = Array(10).fill({
    title: "The Art of Magazine Writing",
    author: "John Doe",
    time: "2 hours ago",
    reads: "1.2k",
    image: "https://garciamedia.com/wp-content/uploads/2023/08/Screenshot-2023-08-31-at-16.16.16-1024x763.png", // Placeholder image
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="card bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Posted by <span className="font-medium">{blog.author}</span>{" "}
                  · {blog.time}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    Total Reads: <span className="font-medium">{blog.reads}</span>
                  </span>
                  <Link to={"/blog-details"} className="btn btn-primary btn-sm">details...</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
