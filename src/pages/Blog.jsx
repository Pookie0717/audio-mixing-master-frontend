import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import PurpleShadowBG from "../assets/images/purple-shadow-bg.webp";
import GreenShadowBG from "../assets/images/green-shadow-bg.webp";

export default function Blog() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // SVG data URI for the custom hand cursor
    const handCursor =
      "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 85.55 122.88\"><path fill=\"%23ffffff\" d=\"M31.66,83.11a2.37,2.37,0,0,1-4.74,0V78.74a2.82,2.82,0,0,1-.36-.24C25.06,77.3,23.4,76,22,74.77c-2.07-1.69-4.45-3.64-6.1-5a8.76,8.76,0,0,0-3.65-1.84,3.78,3.78,0,0,0-2.06.09A2.15,2.15,0,0,0,9,69.15a7.27,7.27,0,0,0-.41,3.33,12.62,12.62,0,0,0,1.15,4.1,27.12,27.12,0,0,0,3,5.06l.15.22,18,27.21a2.36,2.36,0,0,1,.38,1,15.66,15.66,0,0,0,1.92,6.57,2.94,2.94,0,0,0,2.63,1.49H64.05a8.39,8.39,0,0,0,4.8-1.55,15.29,15.29,0,0,0,4.4-5.15l.34-.58c3.5-6,6.89-11.87,7.24-18.81l-.18-8c0-.11,0-.23,0-.35l0-1.89c.07-5.32.15-11.9-4.72-12.73H72.78c0,1.5-.11,3-.2,4.5-.09,1.32-.17,2.6-.17,3.81a2.37,2.37,0,0,1-4.73,0c0-1.22.09-2.64.18-4.1.32-5,.68-10.77-3.33-11.49H61.42a2.76,2.76,0,0,1-.51,0c0,1.81-.09,3.69-.2,5.5-.09,1.32-.17,2.6-.17,3.81a2.37,2.37,0,1,1-4.73,0c0-1.22.09-2.63.18-4.1.32-5,.68-10.77-3.33-11.49H49.55a2.11,2.11,0,0,1-.62-.08v9.17a2.37,2.37,0,0,1-4.74,0V39.93c0-4.11-1.68-6.71-3.82-7.8a5.48,5.48,0,0,0-2.47-.6,5.38,5.38,0,0,0-2.46.6c-2.13,1.08-3.78,3.69-3.78,7.9V83.11ZM11.92,37.63a3.12,3.12,0,1,1,0,6.23H3.11a3.12,3.12,0,0,1,0-6.23ZM20.82,19a3.12,3.12,0,0,1-4.43,4.39l-7-7A3.11,3.11,0,1,1,13.82,12l7,7Zm41,24.84a3.12,3.12,0,0,1,0-6.23h8.81a3.12,3.12,0,1,1,0,6.23ZM57.3,22.73a3.12,3.12,0,0,1-4.42-4.4l7-7a3.12,3.12,0,0,1,4.42,4.4l-7,7Zm-17-10.81a3.12,3.12,0,1,1-6.23,0V3.11a3.12,3.12,0,0,1,6.23,0v8.81Zm26.8,78.56a1.94,1.94,0,1,1,3.87,0v8.84a1.94,1.94,0,0,1-3.87,0V90.48ZM55.64,86.57a1.94,1.94,0,0,1,3.87,0V99.32a1.94,1.94,0,0,1-3.87,0V86.57ZM26.92,72.72V40c0-6.26,2.8-10.3,6.37-12.12a10.21,10.21,0,0,1,9.2,0c3.61,1.82,6.44,5.86,6.44,12V50.78a2.51,2.51,0,0,1,.62-.08h3.26a2.33,2.33,0,0,1,.53.06,7.89,7.89,0,0,1,7.08,6.49,2.36,2.36,0,0,1,1-.22h3.26a2.33,2.33,0,0,1,.53.06c4.68.72,6.57,3.6,7.24,7.24a2.22,2.22,0,0,1,.37,0h3.26a2.33,2.33,0,0,1,.53.06c9,1.38,8.85,10.29,8.76,17.47,0,3.38.1,6.76.18,10.14a2.43,2.43,0,0,1,0,.27c-.4,8.12-4.08,14.46-7.87,21l-.32.57a20.15,20.15,0,0,1-5.82,6.69,13.15,13.15,0,0,1-7.47,2.38H35.86a7.35,7.35,0,0,1-6.6-3.58,19.2,19.2,0,0,1-2.62-8.08L9,84.47a32,32,0,0,1-3.52-6,17.06,17.06,0,0,1-1.53-5.71,11.59,11.59,0,0,1,.82-5.56,6.7,6.7,0,0,1,3.64-3.58,8.25,8.25,0,0,1,4.74-.35,13.42,13.42,0,0,1,5.76,2.84c1.43,1.18,3.79,3.12,6.09,5l2,1.61Z\"/></svg>') 16 0, pointer";

    // Sample blog data - replace with actual API call
    const sampleBlogPosts = [
        {
            id: 1,
            title: "The Art of Audio Mixing: A Complete Guide",
            excerpt: "Learn the fundamentals of audio mixing and how to create professional-quality tracks that stand out in today's competitive music industry.",
            category: "mixing",
            author: "Audio Master Pro",
            date: "2024-01-15",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=250&fit=crop",
            featured: true
        },
        {
            id: 2,
            title: "Mastering Techniques for Different Genres",
            excerpt: "Discover genre-specific mastering techniques that will help your music sound its best across different platforms and listening environments.",
            category: "mastering",
            author: "Studio Expert",
            date: "2024-01-10",
            readTime: "12 min read",
            image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=250&fit=crop",
            featured: false
        },
        {
            id: 3,
            title: "How to Choose the Right Audio Equipment",
            excerpt: "A comprehensive guide to selecting the perfect audio equipment for your home studio setup, from microphones to monitors.",
            category: "equipment",
            author: "Tech Guru",
            date: "2024-01-08",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1598520108910-85dee481eabc?w=400&h=250&fit=crop",
            featured: false
        },
        {
            id: 4,
            title: "Digital vs Analog: The Great Audio Debate",
            excerpt: "Explore the pros and cons of digital and analog audio processing, and learn when to use each approach for optimal results.",
            category: "technology",
            author: "Audio Philosopher",
            date: "2024-01-05",
            readTime: "15 min read",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=250&fit=crop",
            featured: false
        },
        {
            id: 5,
            title: "Building Your Home Studio on a Budget",
            excerpt: "Learn how to create a professional-quality home studio without breaking the bank, with tips on essential equipment and room treatment.",
            category: "studio",
            author: "Budget Producer",
            date: "2024-01-03",
            readTime: "14 min read",
            image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=250&fit=crop",
            featured: false
        },
        {
            id: 6,
            title: "The Future of Audio Production: AI and Machine Learning",
            excerpt: "Discover how artificial intelligence is revolutionizing audio production and what this means for the future of music creation.",
            category: "technology",
            author: "Future Tech",
            date: "2024-01-01",
            readTime: "11 min read",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=250&fit=crop",
            featured: false
        }
    ];

    const categories = [
        { id: 'all', name: 'All Posts' },
        { id: 'mixing', name: 'Mixing' },
        { id: 'mastering', name: 'Mastering' },
        { id: 'equipment', name: 'Equipment' },
        { id: 'technology', name: 'Technology' },
        { id: 'studio', name: 'Studio Setup' }
    ];

    useEffect(() => {
        // Simulate API call
        const fetchBlogPosts = async () => {
            try {
                // Simulate loading delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setBlogPosts(sampleBlogPosts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    const filteredPosts = selectedCategory === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === selectedCategory);

    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(regularPosts.length / postsPerPage);

    // Reset to first page when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <main className='mt-24'>
            {/* Hero Section */}
            <section className="text-white relative z-20 mb-24 px-5 md:px-10 xl:px-0">
                <picture>
                    <source srcSet={GreenShadowBG} type="image/webp" />
                    <img src={GreenShadowBG} className="absolute -top-full left-0 pointer-events-none" alt="Green Shadow Background" />
                </picture>
                <picture>
                    <source srcSet={PurpleShadowBG} type="image/webp" />
                    <img src={PurpleShadowBG} className="absolute -top-3/4 right-0 pointer-events-none" alt="Purple Shadow Background" />
                </picture>
                
                <div className="max-w-[1110px] relative z-20 mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="font-THICCCBOI-Medium font-medium text-[40px] md:text-[50px] leading-[50px] md:leading-[60px] mb-6">
                            Audio <span className="text-[#4CC800]">Blog</span>
                        </h1>
                        <p className="font-Roboto text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            Discover the latest insights, tips, and techniques in audio mixing, mastering, and music production.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-Montserrat font-medium text-sm md:text-base transition-all duration-300 ${
                                    selectedCategory === category.id
                                        ? 'bg-[#4DC801] text-white'
                                        : 'border border-gray-600 text-gray-300 hover:border-[#4CC800] hover:text-[#4CC800]'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Content Section */}
            <section className="text-white mb-36 px-5 md:px-10 xl:px-0">
                <div className="max-w-[1110px] mx-auto">
                    {loading ? (
                        // Loading skeleton
                        <div className="space-y-12">
                            {/* Featured post skeleton */}
                            <div className="bg-[#0B1306] rounded-[30px] p-8">
                                <Skeleton height={400} baseColor="#0B1306" highlightColor="#171717" className="mb-6" />
                                <Skeleton height={40} width="60%" baseColor="#0B1306" highlightColor="#171717" className="mb-4" />
                                <Skeleton height={20} width="80%" baseColor="#0B1306" highlightColor="#171717" className="mb-4" />
                                <Skeleton height={20} width="40%" baseColor="#0B1306" highlightColor="#171717" />
                            </div>
                            
                            {/* Regular posts skeleton */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="bg-[#0B1306] rounded-[20px] p-6">
                                        <Skeleton height={200} baseColor="#0B1306" highlightColor="#171717" className="mb-4" />
                                        <Skeleton height={30} width="80%" baseColor="#0B1306" highlightColor="#171717" className="mb-3" />
                                        <Skeleton height={20} width="90%" baseColor="#0B1306" highlightColor="#171717" className="mb-3" />
                                        <Skeleton height={20} width="60%" baseColor="#0B1306" highlightColor="#171717" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* Featured Post */}
                            {featuredPost && selectedCategory === 'all' && (
                                <RouterLink
                                    to={`/blog/${featuredPost.id}`}
                                    className="block bg-[#0B1306] rounded-[30px] p-8 hover:transform hover:scale-[1.02] transition-all duration-300 group"
                                    style={{ cursor: handCursor }}
                                >
                                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                                        <div className="relative">
                                            <img 
                                                src={featuredPost.image} 
                                                alt={featuredPost.title}
                                                className="w-full h-[300px] lg:h-[400px] object-cover rounded-[20px]"
                                            />
                                            <div className="absolute top-4 left-4 bg-[#4DC801] text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Featured
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                                                <span>{featuredPost.author}</span>
                                                <span>•</span>
                                                <span>{formatDate(featuredPost.date)}</span>
                                                <span>•</span>
                                                <span>{featuredPost.readTime}</span>
                                            </div>
                                            <h2 className="font-THICCCBOI-Medium text-2xl md:text-3xl leading-tight mb-4 group-hover:text-[#4CC800] transition-colors duration-300">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-gray-300 mb-6 leading-relaxed">
                                                {featuredPost.excerpt}
                                            </p>
                                            <span className="inline-flex items-center px-6 py-3 bg-[#4DC801] text-white rounded-full font-Montserrat font-medium group-hover:bg-[#3ba001] transition-colors duration-300">
                                                Read Full Article
                                            </span>
                                        </div>
                                    </div>
                                </RouterLink>
                            )}

                            {/* Regular Blog Posts Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentPosts.map(post => (
                                    <RouterLink
                                        key={post.id}
                                        to={`/blog/${post.id}`}
                                        className="block bg-[#0B1306] rounded-[20px] overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
                                        style={{ cursor: handCursor }}
                                    >
                                        <div className="relative">
                                            <img 
                                                src={post.image} 
                                                alt={post.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {categories.find(cat => cat.id === post.category)?.name}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                                                <span>{post.author}</span>
                                                <span>•</span>
                                                <span>{formatDate(post.date)}</span>
                                            </div>
                                            <h3 className="font-THICCCBOI-Medium text-xl leading-tight mb-3 line-clamp-2 group-hover:text-[#4CC800] transition-colors duration-300">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-400">{post.readTime}</span>
                                                <span className="text-[#4CC800] group-hover:text-[#3ba001] font-medium transition-colors duration-300">
                                                    Read More →
                                                </span>
                                            </div>
                                        </div>
                                    </RouterLink>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-full font-Montserrat font-medium text-sm transition-all duration-300 ${
                                            currentPage === 1
                                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                : 'bg-[#4DC801] text-white hover:bg-[#3ba001]'
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    
                                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-4 py-2 rounded-full font-Montserrat font-medium text-sm transition-all duration-300 ${
                                                currentPage === page
                                                    ? 'bg-[#4DC801] text-white'
                                                    : 'border border-gray-600 text-gray-300 hover:border-[#4CC800] hover:text-[#4CC800]'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-full font-Montserrat font-medium text-sm transition-all duration-300 ${
                                            currentPage === totalPages
                                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                : 'bg-[#4DC801] text-white hover:bg-[#3ba001]'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}

                            {/* No Posts Found */}
                            {regularPosts.length === 0 && (
                                <div className="text-center py-16">
                                    <h3 className="font-THICCCBOI-Medium text-2xl mb-4">No posts found</h3>
                                    <p className="text-gray-400 mb-6">Try selecting a different category or check back later for new content.</p>
                                    <button
                                        onClick={() => setSelectedCategory('all')}
                                        className="px-6 py-3 bg-[#4DC801] text-white rounded-full font-Montserrat font-medium hover:bg-[#3ba001] transition-colors duration-300"
                                    >
                                        View All Posts
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="text-white mb-36 px-5 md:px-10 xl:px-0">
                <div className="max-w-[1110px] mx-auto">
                    <div className="bg-[#0B1306] rounded-[30px] p-8 md:p-12 text-center">
                        <h2 className="font-THICCCBOI-Medium text-2xl md:text-3xl mb-4">
                            Stay Updated with Our Latest Articles
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Get the latest tips, tutorials, and industry insights delivered directly to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-4 py-3 bg-black border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#4CC800]"
                            />
                            <button className="px-6 py-3 bg-[#4DC801] text-white rounded-full font-Montserrat font-medium hover:bg-[#3ba001] transition-colors duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}