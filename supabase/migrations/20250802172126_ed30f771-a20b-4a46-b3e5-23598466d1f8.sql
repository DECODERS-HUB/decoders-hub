-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'blog-images', 
  'blog-images', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage policies for blog images
CREATE POLICY "Anyone can view blog images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'blog-images' 
  AND EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
);

CREATE POLICY "Admins can update blog images" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'blog-images' 
  AND EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
);

CREATE POLICY "Admins can delete blog images" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'blog-images' 
  AND EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
);

-- Add new columns to blog_posts table for enhanced blogging features
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS reading_time_minutes INTEGER,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS category TEXT;

-- Create index for better performance on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured) WHERE is_featured = true;