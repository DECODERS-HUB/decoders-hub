
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import AIChat from "@/components/ui/AIChat";
import { Search, Calendar } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Technology Trends That Will Transform Businesses in 2025",
    excerpt: "Discover the cutting-edge technologies that are set to revolutionize how businesses operate in the coming years.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Technology",
    date: "Apr 15, 2025",
    author: "Dr. Sarah Chen",
    authorRole: "Chief Technology Officer"
  },
  {
    id: 2,
    title: "How Digital Transformation Is Reshaping Business Consultancy",
    excerpt: "The rapid evolution of digital technologies is forcing consultancy firms to adapt their approach and service offerings.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Business",
    date: "Mar 28, 2025",
    author: "Michael Rodriguez",
    authorRole: "Digital Transformation Lead"
  },
  {
    id: 3,
    title: "The Essential Skills Every Tech Professional Needs in 2025",
    excerpt: "Beyond technical expertise, these are the critical skills that will set apart successful technology professionals.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Training",
    date: "Mar 12, 2025",
    author: "Alisha Patel",
    authorRole: "Training Director"
  },
  {
    id: 4,
    title: "Building a Culture of Innovation in Traditional Industries",
    excerpt: "How traditional industries can embrace technological innovation to stay competitive in the digital age.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Innovation",
    date: "Feb 25, 2025",
    author: "James Wilson",
    authorRole: "Innovation Strategist"
  },
  {
    id: 5,
    title: "The Rise of AI-Powered Business Intelligence",
    excerpt: "How artificial intelligence is revolutionizing how businesses collect, analyze, and act on data.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Artificial Intelligence",
    date: "Feb 10, 2025",
    author: "Dr. Lucas Kim",
    authorRole: "AI Research Lead"
  },
  {
    id: 6,
    title: "Cybersecurity Challenges in a Remote-First World",
    excerpt: "As remote work becomes the norm, businesses face new cybersecurity challenges that require innovative solutions.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl. Sed euismod, nunc ut aliquam aliquam, nisl nunc aliquam nisl, eget aliquam nisl nunc eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Cybersecurity",
    date: "Jan 22, 2025",
    author: "Elena Vasquez",
    authorRole: "Head of Cybersecurity"
  },
];

const categories = [
  "All",
  "Technology",
  "Business",
  "Training",
  "Innovation",
  "Artificial Intelligence",
  "Cybersecurity"
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Tech & Business Insights</h1>
              <p className="text-xl text-gray-200">
                Expert perspectives, industry analyses, and practical advice from our team of specialists
              </p>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="w-full lg:w-2/3">
                {/* Search */}
                <div className="mb-8 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                
                {/* Category Filter - Mobile */}
                <div className="md:hidden mb-8">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Category Filter - Desktop */}
                <div className="hidden md:flex flex-wrap gap-2 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        selectedCategory === category
                          ? "bg-brand-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                {/* Blog Posts */}
                <div className="space-y-10">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <img 
                              src={post.imageUrl} 
                              alt={post.title} 
                              className="h-48 md:h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-6 md:w-2/3">
                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium text-accent1-400">{post.category}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                {post.date}
                              </div>
                            </div>
                            <h2 className="font-bold text-xl mb-2 text-brand-800">{post.title}</h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex items-center mb-4">
                              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                              <div className="text-sm">
                                <p className="font-medium text-brand-800">{post.author}</p>
                                <p className="text-gray-500">{post.authorRole}</p>
                              </div>
                            </div>
                            <Button asChild variant="ghost" className="text-brand-600 hover:text-brand-700 p-0 hover:bg-transparent">
                              <Link to={`/blog/${post.id}`}>Read full article →</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-medium text-gray-600">No articles found</h3>
                      <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="w-full lg:w-1/3 space-y-8">
                {/* Newsletter */}
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
                  <h3 className="text-xl font-bold mb-4 text-brand-800">Subscribe to Our Newsletter</h3>
                  <p className="text-gray-600 mb-4">Get the latest insights and updates delivered to your inbox.</p>
                  <form className="space-y-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <Button className="w-full bg-brand-600 hover:bg-brand-700">Subscribe</Button>
                  </form>
                </div>
                
                {/* Popular Posts */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-brand-800">Popular Articles</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <Link to={`/blog/${post.id}`} key={post.id} className="flex gap-4 group">
                        <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 group-hover:text-brand-600 transition-colors line-clamp-2">{post.title}</h4>
                          <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Categories */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-brand-800">Categories</h3>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg ${
                          selectedCategory === category
                            ? "bg-brand-100 text-brand-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span>{category}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {blogPosts.filter(post => post.category === category).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-800 text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Need Expert Technology Advice?</h2>
              <p className="text-xl mb-8">
                Schedule a consultation with our team to discuss how we can help you implement these insights in your business.
              </p>
              <Button asChild size="lg" className="bg-accent1-400 hover:bg-accent1-500">
                <Link to="/appointment">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Blog;
