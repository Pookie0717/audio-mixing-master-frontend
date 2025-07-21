import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../utils/constants';

export const useBlogPosts = (params = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        per_page: 9
    });

    // Fetch posts from backend
    const fetchPosts = async (filters = {}) => {
        try {
            setLoading(true);
            setError(null);
            
            const queryParams = new URLSearchParams({
                page: filters.page || 1,
                per_page: filters.per_page || 9,
                ...filters
            });

            const response = await axios.get(`${API_ENDPOINT}blogs/?${queryParams}`);
            
            // Handle the specific backend response structure
            let postsData = [];
            let paginationData = {};
            
            if (response.data.success && response.data.data) {
                // Backend returns: { success: true, data: { blogs: [...], pagination: {...} } }
                if (response.data.data.blogs) {
                    postsData = response.data.data.blogs;
                    paginationData = response.data.data.pagination || {};
                } else {
                    postsData = response.data.data;
                }
            } else if (response.data.data && response.data.data.blogs) {
                // Alternative structure: { data: { blogs: [...], pagination: {...} } }
                postsData = response.data.data.blogs;
                paginationData = response.data.data.pagination || {};
            } else if (response.data.blogs) {
                // Direct blogs array: { blogs: [...], pagination: {...} }
                postsData = response.data.blogs;
                paginationData = response.data.pagination || {};
            } else if (response.data.data) {
                // Direct data array: { data: [...], pagination: {...} }
                postsData = response.data.data;
            } else {
                // Fallback to response.data
                postsData = response.data;
            }
            
            // Transform posts data to match frontend expectations
            const transformedPosts = postsData.map(post => ({
                id: post.id,
                title: post.title,
                excerpt: post.meta_description || post.excerpt || '',
                content: post.html_content || post.content || '',
                category_id: post.category_id || post.category?.id,
                category_name: post.category?.name || '',
                author: post.author_name || post.author || 'Audio Expert',
                date: post.publish_date || post.created_at || new Date().toISOString(),
                readTime: post.read_time ? `${post.read_time} min read` : '8 min read',
                image: post.featured_image || post.image || `https://picsum.photos/400/250?random=${post.id}`,
                featured: post.is_featured || post.featured || false,
                slug: post.slug || `blog-post-${post.id}`,
                status: post.is_published ? 'published' : 'draft',
                keywords: post.keywords || '',
                views: post.views || 0
            }));
            
            setPosts(transformedPosts);
            setPagination({
                current_page: paginationData.current_page || 1,
                total_pages: paginationData.total_pages || 1,
                total_items: paginationData.total || transformedPosts.length,
                per_page: paginationData.per_page || 9
            });
        } catch (err) {
            console.error('Error fetching blog posts:', err);
            setError(err.message || 'Failed to fetch blog posts');
            
            // Fallback to default posts if API fails
            const fallbackPosts = generateFallbackPosts();
            setPosts(fallbackPosts);
            setPagination({
                current_page: 1,
                total_pages: 1,
                total_items: fallbackPosts.length,
                per_page: 9
            });
        } finally {
            setLoading(false);
        }
    };

    // Generate fallback posts if API fails
    const generateFallbackPosts = () => {
        const blogTitles = [
            "The History of Mixing and Mastering",
            "Tips On Recording Vocals", 
            "Background Vocals",
            "EQ Tips & Tricks",
            "20 Tips On Home Mastering",
            "How to Approach Major Recording Studio for a Sound Engineer Job",
            "HOW TO SUBMIT MUSIC FOR TV & FILM",
            "HOW TO SET UP A GOOD MIX",
            "Beginner's Series on Recording",
            "Mixdown preparation"
        ];

        return blogTitles.map((title, index) => ({
            id: index + 1,
            title: title,
            excerpt: `Discover the latest techniques and insights in audio mixing and mastering. This comprehensive guide covers everything you need to know about professional audio production.`,
            content: `<p>This is a fallback blog post content for ${title}.</p>`,
            category_id: 'all',
            category_name: 'Audio Production',
            author: `Audio Expert ${index + 1}`,
            date: `2024-01-${(index % 30 + 1).toString().padStart(2, '0')}`,
            readTime: `${5 + (index % 10)} min read`,
            image: `https://picsum.photos/400/250?random=${index + 1}`,
            featured: index === 0,
            slug: `blog-post-${index + 1}`,
            status: 'published',
            keywords: '',
            views: 0
        }));
    };

    // Get a single post by ID
    const getPostById = async (postId) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}blogs/${postId}`);
            
            let postData;
            if (response.data.success && response.data.data) {
                postData = response.data.data;
            } else if (response.data.data) {
                postData = response.data.data;
            } else {
                postData = response.data;
            }
            
            return {
                id: postData.id,
                title: postData.title,
                excerpt: postData.meta_description || postData.excerpt || '',
                content: postData.html_content || postData.content || '',
                category_id: postData.category_id || postData.category?.id,
                category_name: postData.category?.name || '',
                author: postData.author_name || postData.author || 'Audio Expert',
                date: postData.publish_date || postData.created_at || new Date().toISOString(),
                readTime: postData.read_time ? `${postData.read_time} min read` : '8 min read',
                image: postData.featured_image || postData.image || `https://picsum.photos/800/400?random=${postData.id}`,
                featured: postData.is_featured || postData.featured || false,
                slug: postData.slug || `blog-post-${postData.id}`,
                status: postData.is_published ? 'published' : 'draft',
                keywords: postData.keywords || '',
                views: postData.views || 0
            };
        } catch (err) {
            console.error('Error fetching blog post:', err);
            throw err;
        }
    };

    // Get posts by category
    const getPostsByCategory = async (categoryId, filters = {}) => {
        const categoryFilters = categoryId === 'all' ? {} : { category_id: categoryId };
        await fetchPosts({ ...filters, ...categoryFilters });
    };

    // Initialize posts on component mount
    useEffect(() => {
        fetchPosts(params);
    }, []);

    return {
        posts,
        loading,
        error,
        pagination,
        fetchPosts,
        getPostById,
        getPostsByCategory
    };
}; 