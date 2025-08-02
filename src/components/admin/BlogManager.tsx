import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Trash2, Edit, Plus, Eye, Upload, X, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  reading_time_minutes?: number;
  is_featured?: boolean;
  category?: string;
}

interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  meta_title: string;
  meta_description: string;
  tags: string[];
  category: string;
  is_featured: boolean;
}

const BLOG_CATEGORIES = [
  'Technology',
  'Business',
  'Digital Marketing',
  'Web Development',
  'Software Solutions',
  'Industry News',
  'Tutorials',
  'Case Studies'
];

const BlogManager: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    featured_image_url: '',
    slug: '',
    status: 'draft',
    meta_title: '',
    meta_description: '',
    tags: [],
    category: '',
    is_featured: false
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts((data || []) as BlogPost[]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `featured-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        featured_image_url: publicUrl
      }));

      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (field: keyof BlogFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'title' && !editingPost ? { 
        slug: generateSlug(value),
        meta_title: value.length <= 60 ? value : value.substring(0, 60)
      } : {})
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const readingTime = calculateReadingTime(formData.content);
      
      const postData = {
        ...formData,
        author_id: user.id,
        author_name: user.email || 'Admin',
        reading_time_minutes: readingTime,
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.excerpt
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Blog post updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Blog post created successfully"
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchBlogPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save blog post",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      featured_image_url: post.featured_image_url || '',
      slug: post.slug,
      status: post.status,
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      tags: post.tags || [],
      category: post.category || '',
      is_featured: post.is_featured || false
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });
      fetchBlogPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      featured_image_url: '',
      slug: '',
      status: 'draft',
      meta_title: '',
      meta_description: '',
      tags: [],
      category: '',
      is_featured: false
    });
    setEditingPost(null);
    setTagInput('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-6">Loading blog posts...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter blog post title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {BLOG_CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="url-friendly-slug"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Brief description of the blog post"
                    rows={3}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.excerpt.length}/160 characters</p>
                </div>
              </div>

              <Separator />

              {/* Featured Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Featured Image</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label>Upload Image</Label>
                    <div className="flex items-center gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {uploading ? 'Uploading...' : 'Choose Image'}
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <span className="text-sm text-gray-500">Max 5MB, JPG/PNG/WebP/GIF</span>
                    </div>
                  </div>

                  {formData.featured_image_url && (
                    <div className="relative">
                      <img 
                        src={formData.featured_image_url} 
                        alt="Featured" 
                        className="w-full max-w-sm h-48 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => handleInputChange('featured_image_url', '')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tags</h3>
                
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Content</h3>
                
                <div>
                  <Label htmlFor="content">Blog Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Write your blog post content here..."
                    rows={15}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {calculateReadingTime(formData.content)} min read • {formData.content.split(' ').length} words
                  </p>
                </div>
              </div>

              <Separator />

              {/* SEO Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">SEO Settings</h3>
                
                <div>
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => handleInputChange('meta_title', e.target.value)}
                    placeholder="SEO title (defaults to post title)"
                    maxLength={60}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.meta_title.length}/60 characters</p>
                </div>

                <div>
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => handleInputChange('meta_description', e.target.value)}
                    placeholder="SEO description (defaults to excerpt)"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.meta_description.length}/160 characters</p>
                </div>
              </div>

              <Separator />

              {/* Publishing Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Publishing Options</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2 pt-6">
                    <Checkbox
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => handleInputChange('is_featured', !!checked)}
                    />
                    <Label htmlFor="is_featured">Featured Post</Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPost ? 'Update' : 'Create'} Post
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {blogPosts.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No blog posts found. Create your first post!</p>
            </CardContent>
          </Card>
        ) : (
          blogPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      {post.is_featured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                    </div>
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                      {post.category && (
                        <Badge variant="outline">{post.category}</Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        by {post.author_name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      {post.reading_time_minutes && (
                        <span className="text-sm text-muted-foreground">
                          {post.reading_time_minutes} min read
                        </span>
                      )}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {post.featured_image_url && (
                    <div className="w-32 h-20 flex-shrink-0">
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-2 line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="text-sm text-muted-foreground">
                      <span>Slug: {post.slug}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogManager;