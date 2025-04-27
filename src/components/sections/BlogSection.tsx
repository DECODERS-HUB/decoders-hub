import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "10 Technology Trends That Will Transform Businesses in 2025",
    excerpt: "Discover the cutting-edge technologies that are set to revolutionize how businesses operate in the coming years.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Technology",
    date: "Apr 15, 2025",
  },
  {
    id: 2,
    title: "How Digital Transformation Is Reshaping Business Consultancy",
    excerpt: "The rapid evolution of digital technologies is forcing consultancy firms to adapt their approach and service offerings.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Business",
    date: "Mar 28, 2025",
  },
  {
    id: 3,
    title: "The Essential Skills Every Tech Professional Needs in 2025",
    excerpt: "Beyond technical expertise, these are the critical skills that will set apart successful technology professionals.",
    imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Training",
    date: "Mar 12, 2025",
  },
];

const BlogCard = ({ post }: { post: typeof blogPosts[0] }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-accent1-400">{post.category}</span>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 text-brand-800 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <Button asChild variant="ghost" className="text-brand-600 hover:text-brand-700 p-0 hover:bg-transparent">
          <Link to={`/blog/${post.id}`}>Read more →</Link>
        </Button>
      </div>
    </div>
  );
};

const BlogSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Latest Insights</h2>
          <p className="section-subtitle mx-auto">
            Expert perspectives, industry analyses, and practical advice to help you navigate
            the evolving technology and business landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-brand-700 hover:bg-brand-800">
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
