import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import AIChat from "@/components/ui/AIChat";
import { Search, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  author_name: string;
  created_at: string;
  published_at: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Tech & Business Insights - DECODERS HUB";
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogPosts((data || []) as BlogPost[]);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 text-brand-800">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Tech & Business Insights</h1>
              <p className="text-xl text-gray-700">
                Expert perspectives, industry analyses, and practical advice from our team of specialists
              </p>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-white">
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
                
                
                {/* Blog Posts */}
                <div className="space-y-10">
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading blog posts...</p>
                    </div>
                  ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            {post.featured_image_url ? (
                              <img 
                                src={post.featured_image_url} 
                                alt={post.title} 
                                className="h-48 md:h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-48 md:h-full w-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                                <span className="text-brand-600 text-4xl font-bold">
                                  {post.title.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-6 md:w-2/3">
                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium text-accent1-400">Blog</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(post.published_at || post.created_at)}
                              </div>
                            </div>
                            <h2 className="font-bold text-xl mb-2 text-brand-800">{post.title}</h2>
                            <p className="text-gray-600 mb-4">{post.excerpt || post.content.substring(0, 150) + '...'}</p>
                            <div className="flex items-center mb-4">
                              <div className="w-8 h-8 bg-brand-600 rounded-full mr-2 flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{post.author_name.charAt(0)}</span>
                              </div>
                              <div className="text-sm">
                                <p className="font-medium text-brand-800">{post.author_name}</p>
                                <p className="text-gray-500">Author</p>
                              </div>
                            </div>
                            <Button asChild variant="ghost" className="text-brand-600 hover:text-brand-700 p-0 hover:bg-transparent">
                              <Link to={`/blog/${post.slug}`}>Read full article →</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-medium text-gray-600">No articles found</h3>
                      <p className="text-gray-500 mt-2">No blog posts have been published yet</p>
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
                
                {/* Recent Posts */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-brand-800">Recent Articles</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <Link to={`/blog/${post.slug}`} key={post.id} className="flex gap-4 group">
                        <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          {post.featured_image_url ? (
                            <img 
                              src={post.featured_image_url} 
                              alt={post.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-brand-100 flex items-center justify-center">
                              <span className="text-brand-600 font-bold">{post.title.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 group-hover:text-brand-600 transition-colors line-clamp-2">{post.title}</h4>
                          <p className="text-sm text-gray-500">{formatDate(post.published_at || post.created_at)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-brand-800 py-16">
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
