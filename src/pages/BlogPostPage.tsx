import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/lib/blog-posts";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useEffect, useState } from "react";

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<ReturnType<typeof getPostBySlug>>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sanitizedContent, setSanitizedContent] = useState<string>("");

  useEffect(() => {
    const loadPostAndSanitizer = async () => {
      setIsLoading(true);
      console.log('[BlogPostPage] Starting to load post, slug:', slug);
      
      try {
        if (!slug) {
          const errorMsg = 'No slug provided';
          console.error('[BlogPostPage] Error:', errorMsg);
          setError(errorMsg);
          return;
        }

        console.log('[BlogPostPage] Looking for post with slug:', slug.toLowerCase());
        const foundPost = getPostBySlug(slug.toLowerCase());
        
        if (!foundPost) {
          const errorMsg = `Post not found for slug: ${slug}`;
          console.error('[BlogPostPage] Error:', errorMsg);
          setError(errorMsg);
          return;
        }

        console.log('[BlogPostPage] Found post:', foundPost.title);
        setPost(foundPost);

        console.log('[BlogPostPage] Setting content, length:', foundPost.content.length);
        
        // Use content directly - we control the blog posts so no need for DOMPurify
        // This avoids potential Suspense/SSR issues with DOMPurify on Cloudflare Pages
        setSanitizedContent(foundPost.content);
        setError(null);
        console.log('[BlogPostPage] Successfully loaded post');
        
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        console.error('[BlogPostPage] Caught error:', errorMsg, err);
        console.error('[BlogPostPage] Error stack:', err instanceof Error ? err.stack : 'No stack');
        console.error('[BlogPostPage] Error type:', typeof err, err);
        setError(errorMsg);
      } finally {
        setIsLoading(false);
        console.log('[BlogPostPage] Finished loading, isLoading:', false);
      }
    };

    loadPostAndSanitizer();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-orange"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <>
        <SEO
          title="Post Not Found"
          description="Sorry, we couldn't find the blog post you're looking for."
        />
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl font-display font-bold text-gray-900">Post Not Found</h1>
          <p className="mt-4 text-lg text-gray-600">Sorry, we couldn't find the blog post you're looking for.</p>
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-mono">Error: {error}</p>
              <p className="text-xs text-red-600 mt-2">Check browser console for details</p>
            </div>
          )}
          <div className="mt-8">
            <Button asChild variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-semibold rounded-lg px-6 py-3 text-base transition-colors border-2">
              <Link to="/blog" aria-label="Back to blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="bg-white">
      <SEO
        title={post.title}
        description={post.excerpt}
      />
      
      {/* Hero Section */}
      <section className="relative bg-light-gray overflow-hidden">
        {/* Content */}
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-brand-orange font-semibold hover:text-brand-orange-dark p-0 hover:bg-transparent">
              <Link to="/blog" aria-label="Back to blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all articles
              </Link>
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600">{post.date}</p>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose lg:prose-xl max-w-none prose-p:text-gray-700 prose-headings:font-display prose-headings:text-gray-900 prose-p:leading-relaxed">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: sanitizedContent
              }} 
            />
          </article>
        </div>
      </section>
    </div>
  );
}
export default BlogPostPage;
