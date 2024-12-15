import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBlogPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    time: "",
    reads: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.author || !formData.image || !formData.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Simulate a successful submission
    console.log("Blog Submitted", formData);
    toast.success("Blog post added successfully!");

    // Reset the form
    setFormData({
      title: "",
      author: "",
      time: "",
      reads: "",
      image: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add a New Blog Post</h1>
        <form onSubmit={handleSubmit}>
          {/* Blog Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Blog Author */}
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Blog Time */}
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time (e.g., "2 hours ago")
            </label>
            <input
              type="text"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Total Reads */}
          <div className="mb-4">
            <label htmlFor="reads" className="block text-sm font-medium text-gray-700">
              Total Reads
            </label>
            <input
              type="text"
              id="reads"
              name="reads"
              value={formData.reads}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Blog Image URL */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Blog Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              rows="6"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPost;
