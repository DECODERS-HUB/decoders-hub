import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/ui/AIChat';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      
      // Fetch the blog post by slug
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (postError) {
        if (postError.code === 'PGRST116') {
          // No rows returned
          navigate('/blog');
          toast({
            title: "Post not found",
            description: "The blog post you're looking for doesn't exist or has been removed.",
            variant: "destructive"
          });
          return;
        }
        throw postError;
      }

      setBlogPost(postData as BlogPost);
      document.title = `${postData.title} - DECODERS HUB`;

      // Fetch related posts
      const { data: relatedData, error: relatedError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .neq('id', postData.id)
        .order('published_at', { ascending: false })
        .limit(3);

      if (!relatedError && relatedData) {
        setRelatedPosts(relatedData as BlogPost[]);
      }

    } catch (error: any) {
      console.error('Error fetching blog post:', error);
      toast({
        title: "Error",
        description: "Failed to load the blog post. Please try again.",
        variant: "destructive"
      });
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share && blogPost) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt || blogPost.content.substring(0, 150),
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The blog post URL has been copied to your clipboard."
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog post...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h1>
              <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
              <Link to="/blog">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-16">
        <article className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link to="/blog">
                <Button variant="ghost" className="mb-6">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
              
              <div className="mb-6">
                <Badge className="mb-4">Blog Post</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-brand-800 mb-4">
                  {blogPost.title}
                </h1>
                
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(blogPost.published_at || blogPost.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{calculateReadTime(blogPost.content)}</span>
                    </div>
                    <span>By {blogPost.author_name}</span>
                  </div>
                  
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Featured Image */}
              {blogPost.featured_image_url && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img
                    src={blogPost.featured_image_url}
                    alt={blogPost.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              )}

              {/* Excerpt */}
              {blogPost.excerpt && (
                <div className="bg-brand-50 border-l-4 border-brand-600 p-6 mb-8 rounded-r-lg">
                  <p className="text-lg text-brand-800 font-medium italic">
                    {blogPost.excerpt}
                  </p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {blogPost.content}
              </div>
            </div>

            {/* Author Info */}
            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {blogPost.author_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-800">{blogPost.author_name}</h3>
                  <p className="text-gray-600">Author at DECODERS HUB</p>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-brand-800 mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                    >
                      {post.featured_image_url ? (
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                          <span className="text-brand-600 text-2xl font-bold">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-brand-800 group-hover:text-brand-600 transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {post.excerpt || post.content.substring(0, 100) + '...'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-brand-600 text-white rounded-xl p-8 mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-brand-100 mb-6">
                Let's discuss how our expertise can help you implement these insights and drive growth.
              </p>
              <Link to="/appointment">
                <Button variant="secondary" size="lg">
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default BlogPost;