import React from "react";

const BlogDetails = () => {
  // Static blog details
  const blog = {
    title: "The Art of Magazine Writing",
    author: "John Doe",
    time: "2 hours ago",
    reads: "1.2k",
    image: "https://garciamedia.com/wp-content/uploads/2023/08/Screenshot-2023-08-31-at-16.16.16-1024x763.png", 
    description: `
      Magazine writing is a unique blend of storytelling, factual reporting, and creative expression. 
      Unlike other forms of journalism, it allows the writer to explore topics with depth, 
      personality, and flair, often focusing on the human elements behind the story.
      
      Writing for a magazine requires an understanding of the audience, 
      the publication's tone, and the balance between informative and entertaining content. 
      From profile pieces that capture the essence of remarkable individuals to investigative articles 
      that unveil hidden truths, magazine writing is a versatile and impactful craft.
      
      To excel, writers must hone their ability to research thoroughly, interview effectively, 
      and write compelling narratives. The rise of digital magazines has further expanded opportunities, 
      offering platforms for new voices and perspectives. With persistence, creativity, 
      and a commitment to quality, magazine writing continues to be an inspiring way 
      to inform, engage, and connect with readers worldwide.
    `,
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Blog Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover"
        />

        {/* Blog Content */}
        <div className="p-6">
          {/* Blog Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>

          {/* Blog Metadata */}
          <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
            <span>
              Posted by <span className="font-medium">{blog.author}</span> ·{" "}
              {blog.time}
            </span>
            <div className="flex items-center gap-4">
              <span>Total Reads: {blog.reads}</span>
              <button className="btn btn-primary btn-sm">Share</button>
            </div>
          </div>

          {/* Blog Description */}
          <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {blog.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
