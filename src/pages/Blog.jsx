// import { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';
// import PurpleShadowBG from "../assets/images/purple-shadow-bg.webp";
// import GreenShadowBG from "../assets/images/green-shadow-bg.webp";

// export default function Blog() {
//     const [blogPosts, setBlogPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [currentPage, setCurrentPage] = useState(1);
//     const postsPerPage = 6;

//     // SVG data URI for the custom hand cursor (active/click state)
//     const handCursor =
//       "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 85.55 122.88\"><path fill=\"%23ffffff\" d=\"M31.66,83.11a2.37,2.37,0,0,1-4.74,0V78.74a2.82,2.82,0,0,1-.36-.24C25.06,77.3,23.4,76,22,74.77c-2.07-1.69-4.45-3.64-6.1-5a8.76,8.76,0,0,0-3.65-1.84,3.78,3.78,0,0,0-2.06.09A2.15,2.15,0,0,0,9,69.15a7.27,7.27,0,0,0-.41,3.33,12.62,12.62,0,0,0,1.15,4.1,27.12,27.12,0,0,0,3,5.06l.15.22,18,27.21a2.36,2.36,0,0,1,.38,1,15.66,15.66,0,0,0,1.92,6.57,2.94,2.94,0,0,0,2.63,1.49H64.05a8.39,8.39,0,0,0,4.8-1.55,15.29,15.29,0,0,0,4.4-5.15l.34-.58c3.5-6,6.89-11.87,7.24-18.81l-.18-8c0-.11,0-.23,0-.35l0-1.89c.07-5.32.15-11.9-4.72-12.73H72.78c0,1.5-.11,3-.2,4.5-.09,1.32-.17,2.6-.17,3.81a2.37,2.37,0,0,1-4.73,0c0-1.22.09-2.64.18-4.1.32-5,.68-10.77-3.33-11.49H61.42a2.76,2.76,0,0,1-.51,0c0,1.81-.09,3.69-.2,5.5-.09,1.32-.17,2.6-.17,3.81a2.37,2.37,0,1,1-4.73,0c0-1.22.09-2.63.18-4.1.32-5,.68-10.77-3.33-11.49H49.55a2.11,2.11,0,0,1-.62-.08v9.17a2.37,2.37,0,0,1-4.74,0V39.93c0-4.11-1.68-6.71-3.82-7.8a5.48,5.48,0,0,0-2.47-.6,5.38,5.38,0,0,0-2.46.6c-2.13,1.08-3.78,3.69-3.78,7.9V83.11ZM11.92,37.63a3.12,3.12,0,1,1,0,6.23H3.11a3.12,3.12,0,0,1,0-6.23ZM20.82,19a3.12,3.12,0,0,1-4.43,4.39l-7-7A3.11,3.11,0,1,1,13.82,12l7,7Zm41,24.84a3.12,3.12,0,0,1,0-6.23h8.81a3.12,3.12,0,1,1,0,6.23ZM57.3,22.73a3.12,3.12,0,0,1-4.42-4.4l7-7a3.12,3.12,0,0,1,4.42,4.4l-7,7Zm-17-10.81a3.12,3.12,0,1,1-6.23,0V3.11a3.12,3.12,0,0,1,6.23,0v8.81Zm26.8,78.56a1.94,1.94,0,1,1,3.87,0v8.84a1.94,1.94,0,0,1-3.87,0V90.48ZM55.64,86.57a1.94,1.94,0,0,1,3.87,0V99.32a1.94,1.94,0,0,1-3.87,0V86.57ZM26.92,72.72V40c0-6.26,2.8-10.3,6.37-12.12a10.21,10.21,0,0,1,9.2,0c3.61,1.82,6.44,5.86,6.44,12V50.78a2.51,2.51,0,0,1,.62-.08h3.26a2.33,2.33,0,0,1,.53.06,7.89,7.89,0,0,1,7.08,6.49,2.36,2.36,0,0,1,1-.22h3.26a2.33,2.33,0,0,1,.53.06c4.68.72,6.57,3.6,7.24,7.24a2.22,2.22,0,0,1,.37,0h3.26a2.33,2.33,0,0,1,.53.06c9,1.38,8.85,10.29,8.76,17.47,0,3.38.1,6.76.18,10.14a2.43,2.43,0,0,1,0,.27c-.4,8.12-4.08,14.46-7.87,21l-.32.57a20.15,20.15,0,0,1-5.82,6.69,13.15,13.15,0,0,1-7.47,2.38H35.86a7.35,7.35,0,0,1-6.6-3.58,19.2,19.2,0,0,1-2.62-8.08L9,84.47a32,32,0,0,1-3.52-6,17.06,17.06,0,0,1-1.53-5.71,11.59,11.59,0,0,1,.82-5.56,6.7,6.7,0,0,1,3.64-3.58,8.25,8.25,0,0,1,4.74-.35,13.42,13.42,0,0,1,5.76,2.84c1.43,1.18,3.79,3.12,6.09,5l2,1.61Z\"/></svg>') 16 0, pointer";

//     // SVG data URI for the hover cursor (new SVG)
//     const hoverCursor =
//       "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 106.17 122.88\"><path fill=\"%23ffffff\" d=\"M29.96,67.49c-0.16-0.09-0.32-0.19-0.47-0.31c-1.95-1.56-4.08-3.29-5.94-4.81c-2.69-2.2-5.8-4.76-7.97-6.55 c-1.49-1.23-3.17-2.07-4.75-2.39c-1.02-0.2-1.95-0.18-2.67,0.12c-0.59,0.24-1.1,0.72-1.45,1.48c-0.45,0.99-0.66,2.41-0.54,4.32 c0.11,1.69,0.7,3.55,1.48,5.33c1.16,2.63,2.73,5.04,3.89,6.59c0.07,0.09,0.13,0.19,0.19,0.29l23.32,33.31 c0.3,0.43,0.47,0.91,0.53,1.4l0.01,0c0.46,3.85,1.28,6.73,2.49,8.54c0.88,1.31,2.01,1.98,3.42,1.94l0.07,0v-0.01h36.38 c0.09,0,0.17,0,0.26,0.01c2.28-0.03,4.36-0.71,6.25-2.02c2.09-1.44,3.99-3.68,5.72-6.7c0.03-0.05,0.06-0.11,0.1-0.16 c0.67-1.15,1.55-2.6,2.41-4.02c3.72-6.13,6.96-11.45,7.35-19.04L99.8,74.34c-0.02-0.15-0.03-0.3-0.03-0.45 c0-0.14,0.02-1.13,0.03-2.46c0.09-6.92,0.19-15.48-6.14-16.56h-4.05l-0.04,0c-0.02,1.95-0.15,3.93-0.27,5.86 c-0.11,1.71-0.21,3.37-0.21,4.95c0,1.7-1.38,3.08-3.08,3.08c-1.7,0-3.08-1.38-3.08-3.08c0-1.58,0.12-3.42,0.24-5.33 c0.41-6.51,0.89-13.99-4.33-14.93H74.8c-0.23,0-0.45-0.02-0.66-0.07c0.04,2.36-0.12,4.81-0.27,7.16c-0.11,1.71-0.21,3.37-0.21,4.95 c0,1.7-1.38,3.08-3.08,3.08c-1.7,0-3.08-1.38-3.08-3.08c0-1.58,0.12-3.42,0.24-5.33c0.41-6.51,0.89-13.99-4.33-14.93h-4.05 c-0.28,0-0.55-0.04-0.8-0.11V49c0,1.7-1.38,3.08-3.08,3.08c-1.7,0-3.08-1.38-3.08-3.08V17.05c0-5.35-2.18-8.73-4.97-10.14 c-1.02-0.52-2.12-0.78-3.21-0.78c-1.08,0-2.18,0.26-3.19,0.77c-2.76,1.4-4.92,4.79-4.92,10.28v56c0,1.7-1.38,3.08-3.08,3.08 c-1.7,0-3.08-1.38-3.08-3.08V67.49L29.96,67.49z M58.57,31.15c0.26-0.07,0.53-0.11,0.8-0.11h4.24c0.24,0,0.47,0.03,0.69,0.08 c5.65,0.88,8.17,4.18,9.2,8.43c0.39-0.18,0.83-0.29,1.3-0.29h4.24c0.24,0,0.47,0.03,0.69,0.08c6.08,0.94,8.53,4.69,9.41,9.41 c0.15-0.02,0.31-0.04,0.47-0.04h4.24c0.24,0,0.47,0.03,0.69,0.08c11.64,1.8,11.5,13.37,11.38,22.71c0,0.33-0.01,0.68-0.01,2.35 l0,0.07l0.24,10.77c0.01,0.11,0.01,0.23,0,0.34c-0.45,9.16-4.07,15.12-8.24,21.98c-0.7,1.14-1.41,2.32-2.34,3.93 c-0.02,0.04-0.04,0.08-0.07,0.13c-2.18,3.8-4.7,6.71-7.57,8.69c-2.92,2.02-6.16,3.06-9.71,3.1c-0.09,0.01-0.19,0.01-0.28,0.01 H41.58v-0.01c-3.66,0.07-6.5-1.53-8.59-4.66c-1.68-2.51-2.79-6.03-3.4-10.47L6.73,75.07c-0.03-0.04-0.07-0.08-0.1-0.12 c-1.36-1.82-3.21-4.65-4.59-7.79C1,64.8,0.21,62.24,0.05,59.74c-0.2-2.97,0.22-5.36,1.06-7.23c1.05-2.32,2.72-3.83,4.74-4.66 c1.89-0.77,4.01-0.88,6.16-0.45c2.57,0.51,5.22,1.81,7.49,3.68c1.86,1.54,4.95,4.07,7.95,6.52l2.52,2.06V17.18 c0-8.14,3.63-13.39,8.28-15.76C40.12,0.47,42.17,0,44.23,0c2.05,0,4.1,0.48,5.98,1.43c4.69,2.37,8.36,7.62,8.36,15.62V31.15 L58.57,31.15z\"/></svg>') 16 0, pointer";

//     // Add CSS styles for cursor states
//     useEffect(() => {
//         const style = document.createElement('style');
//         style.textContent = `
//             .blog-post-link {
//                 cursor: ${hoverCursor} !important;
//             }
//             .blog-post-link:hover {
//                 cursor: ${hoverCursor} !important;
//             }
//             .blog-post-link:active {
//                 cursor: ${handCursor} !important;
//             }
//             .blog-post-link:focus {
//                 cursor: ${handCursor} !important;
//             }
//         `;
//         document.head.appendChild(style);

//         return () => {
//             document.head.removeChild(style);
//         };
//     }, []);

//     // Sample blog data - replace with actual API call
//     const sampleBlogPosts = [
//         {
//             id: 1,
//             title: "The Art of Audio Mixing: A Complete Guide",
//             excerpt: "Learn the fundamentals of audio mixing and how to create professional-quality tracks that stand out in today's competitive music industry.",
//             category: "mixing",
//             author: "Audio Master Pro",
//             date: "2024-01-15",
//             readTime: "8 min read",
//             image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=250&fit=crop",
//             featured: true
//         },
//         {
//             id: 2,
//             title: "Mastering Techniques for Different Genres",
//             excerpt: "Discover genre-specific mastering techniques that will help your music sound its best across different platforms and listening environments.",
//             category: "mastering",
//             author: "Studio Expert",
//             date: "2024-01-10",
//             readTime: "12 min read",
//             image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=250&fit=crop",
//             featured: false
//         },
//         {
//             id: 3,
//             title: "How to Choose the Right Audio Equipment",
//             excerpt: "A comprehensive guide to selecting the perfect audio equipment for your home studio setup, from microphones to monitors.",
//             category: "equipment",
//             author: "Tech Guru",
//             date: "2024-01-08",
//             readTime: "10 min read",
//             image: "https://images.unsplash.com/photo-1598520108910-85dee481eabc?w=400&h=250&fit=crop",
//             featured: false
//         },
//         {
//             id: 4,
//             title: "Digital vs Analog: The Great Audio Debate",
//             excerpt: "Explore the pros and cons of digital and analog audio processing, and learn when to use each approach for optimal results.",
//             category: "technology",
//             author: "Audio Philosopher",
//             date: "2024-01-05",
//             readTime: "15 min read",
//             image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=250&fit=crop",
//             featured: false
//         },
//         {
//             id: 5,
//             title: "Building Your Home Studio on a Budget",
//             excerpt: "Learn how to create a professional-quality home studio without breaking the bank, with tips on essential equipment and room treatment.",
//             category: "studio",
//             author: "Budget Producer",
//             date: "2024-01-03",
//             readTime: "14 min read",
//             image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=250&fit=crop",
//             featured: false
//         },
//         {
//             id: 6,
//             title: "The Future of Audio Production: AI and Machine Learning",
//             excerpt: "Discover how artificial intelligence is revolutionizing audio production and what this means for the future of music creation.",
//             category: "technology",
//             author: "Future Tech",
//             date: "2024-01-01",
//             readTime: "11 min read",
//             image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=250&fit=crop",
//             featured: false
//         }
//     ];

//     const categories = [
//         { id: 'all', name: 'All Posts' },
//         { id: 'mixing', name: 'Mixing' },
//         { id: 'mastering', name: 'Mastering' },
//         { id: 'equipment', name: 'Equipment' },
//         { id: 'technology', name: 'Technology' },
//         { id: 'studio', name: 'Studio Setup' }
//     ];

//     useEffect(() => {
//         // Simulate API call
//         const fetchBlogPosts = async () => {
//             try {
//                 // Simulate loading delay
//                 await new Promise(resolve => setTimeout(resolve, 1000));
//                 setBlogPosts(sampleBlogPosts);
//                 setLoading(false);
//             } catch (error) {
//                 setLoading(false);
//             }
//         };

//         fetchBlogPosts();
//     }, []);

//     const filteredPosts = selectedCategory === 'all' 
//         ? blogPosts 
//         : blogPosts.filter(post => post.category === selectedCategory);

//     const featuredPost = blogPosts.find(post => post.featured);
//     const regularPosts = filteredPosts.filter(post => !post.featured);

//     // Pagination logic
//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);
//     const totalPages = Math.ceil(regularPosts.length / postsPerPage);

//     // Reset to first page when category changes
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [selectedCategory]);

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', { 
//             year: 'numeric', 
//             month: 'long', 
//             day: 'numeric' 
//         });
//     };

//     return (
//         <main className='mt-24'>
//             {/* Hero Section */}
//             <section className="text-white relative z-20 mb-24 px-5 md:px-10 xl:px-0">
//                 <picture>
//                     <source srcSet={GreenShadowBG} type="image/webp" />
//                     <img src={GreenShadowBG} className="absolute -top-full left-0 pointer-events-none" alt="Green Shadow Background" />
//                 </picture>
//                 <picture>
//                     <source srcSet={PurpleShadowBG} type="image/webp" />
//                     <img src={PurpleShadowBG} className="absolute -top-3/4 right-0 pointer-events-none" alt="Purple Shadow Background" />
//                 </picture>
                
//                 <div className="max-w-[1110px] relative z-20 mx-auto">
//                     <div className="text-center mb-16">
//                         <h1 className="font-THICCCBOI-Medium font-medium text-[40px] md:text-[50px] leading-[50px] md:leading-[60px] mb-6">
//                             Audio <span className="text-[#4CC800]">Blog</span>
//                         </h1>
//                         <p className="font-Roboto text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
//                             Discover the latest insights, tips, and techniques in audio mixing, mastering, and music production.
//                         </p>
//                     </div>

//                     {/* Category Filter */}
//                     <div className="flex flex-wrap justify-center gap-4 mb-12">
//                         {categories.map(category => (
//                             <button
//                                 key={category.id}
//                                 onClick={() => setSelectedCategory(category.id)}
//                                 className={`px-6 py-3 rounded-full font-Montserrat font-medium text-sm md:text-base transition-all duration-300 ${
//                                     selectedCategory === category.id
//                                         ? 'bg-[#4DC801] text-white'
//                                         : 'border border-gray-600 text-gray-300 hover:border-[#4CC800] hover:text-[#4CC800]'
//                                 }`}
//                             >
//                                 {category.name}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Blog Content Section */}
//             <section className="text-white mb-36 px-5 md:px-10 xl:px-0">
//                 <div className="max-w-[1110px] mx-auto">
//                     {loading ? (
//                         // Loading skeleton
//                         <div className="space-y-12">
//                             {/* Featured post skeleton */}
//                             <div className="bg-[#0B1306] rounded-[30px] p-8">
//                                 <Skeleton height={400} baseColor="#0B1306" highlightColor="#171717" className="mb-6" />
//                                 <Skeleton height={40} width="60%" baseColor="#0B1306" highlightColor="#171717" className="mb-4" />
//                                 <Skeleton height={20} width="80%" baseColor="#0B1306" highlightColor="#171717" className="mb-4" />
//                                 <Skeleton height={20} width="40%" baseColor="#0B1306" highlightColor="#171717" />
//                             </div>
                            
//                             {/* Regular posts skeleton */}
//                             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                                 {[...Array(6)].map((_, index) => (
//                                     <div key={index} className="bg-[#0B1306] rounded-[20px] p-6">
//                                         <Skeleton height={200} baseColor="#0B1306" highlightColor="#171717" className="mb-4" />
//                                         <Skeleton height={30} width="80%" baseColor="#0B1306" highlightColor="#171717" className="mb-3" />
//                                         <Skeleton height={20} width="90%" baseColor="#0B1306" highlightColor="#171717" className="mb-3" />
//                                         <Skeleton height={20} width="60%" baseColor="#0B1306" highlightColor="#171717" />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="space-y-12">
//                             {/* Featured Post */}
//                             {featuredPost && selectedCategory === 'all' && (
//                                 <RouterLink
//                                     to={`/blog/${featuredPost.id}`}
//                                     className="block bg-[#0B1306] rounded-[30px] p-8 hover:transform hover:scale-[1.02] transition-all duration-300 group blog-post-link"
//                                 >
//                                     <div className="grid lg:grid-cols-2 gap-8 items-center">
//                                         <div className="relative">
//                                             <img 
//                                                 src={featuredPost.image} 
//                                                 alt={featuredPost.title}
//                                                 className="w-full h-[300px] lg:h-[400px] object-cover rounded-[20px]"
//                                             />
//                                             <div className="absolute top-4 left-4 bg-[#4DC801] text-white px-3 py-1 rounded-full text-sm font-medium">
//                                                 Featured
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
//                                                 <span>{featuredPost.author}</span>
//                                                 <span>•</span>
//                                                 <span>{formatDate(featuredPost.date)}</span>
//                                                 <span>•</span>
//                                                 <span>{featuredPost.readTime}</span>
//                                             </div>
//                                             <h2 className="font-THICCCBOI-Medium text-2xl md:text-3xl leading-tight mb-4 group-hover:text-[#4CC800] transition-colors duration-300">
//                                                 {featuredPost.title}
//                                             </h2>
//                                             <p className="text-gray-300 mb-6 leading-relaxed">
//                                                 {featuredPost.excerpt}
//                                             </p>
//                                             <span className="inline-flex items-center px-6 py-3 bg-[#4DC801] text-white rounded-full font-Montserrat font-medium group-hover:bg-[#3ba001] transition-colors duration-300">
//                                                 Read Full Article
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </RouterLink>
//                             )}

//                             {/* Regular Blog Posts Grid */}
//                             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                                 {currentPosts.map(post => (
//                                                                     <RouterLink
//                                     key={post.id}
//                                     to={`/blog/${post.id}`}
//                                     className="block bg-[#0B1306] rounded-[20px] overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group blog-post-link"
//                                 >
//                                         <div className="relative">
//                                             <img 
//                                                 src={post.image} 
//                                                 alt={post.title}
//                                                 className="w-full h-48 object-cover"
//                                             />
//                                             <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
//                                                 {categories.find(cat => cat.id === post.category)?.name}
//                                             </div>
//                                         </div>
//                                         <div className="p-6">
//                                             <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
//                                                 <span>{post.author}</span>
//                                                 <span>•</span>
//                                                 <span>{formatDate(post.date)}</span>
//                                             </div>
//                                             <h3 className="font-THICCCBOI-Medium text-xl leading-tight mb-3 line-clamp-2 group-hover:text-[#4CC800] transition-colors duration-300">
//                                                 {post.title}
//                                             </h3>
//                                             <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
//                                                 {post.excerpt}
//                                             </p>
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-gray-400">{post.readTime}</span>
//                                                 <span className="text-[#4CC800] group-hover:text-[#3ba001] font-medium transition-colors duration-300">
//                                                     Read More →
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </RouterLink>
//                                 ))}
//                             </div>

//                             {/* Pagination */}
//                             {totalPages > 1 && (
//                                 <div className="flex justify-center items-center gap-2 mt-12">
//                                     <button
//                                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                                         disabled={currentPage === 1}
//                                         className={`px-4 py-2 rounded-full font-Montserrat font-medium text-sm transition-all duration-300 ${
//                                             currentPage === 1
//                                                 ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                                                 : 'bg-[#4DC801] text-white hover:bg-[#3ba001]'
//                                         }`}
//                                     >
//                                         Previous
//                                     </button>
                                    
//                                     {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
//                                         <button
//                                             key={page}
//                                             onClick={() => setCurrentPage(page)}
//                                             className={`px-4 py-2 rounded-full font-Montserrat font-medium text-sm transition-all duration-300 ${
//                                                 currentPage === page
//                                                     ? 'bg-[#4DC801] text-white'
//                                                     : 'border border-gray-600 text-gray-300 hover:border-[#4CC800] hover:text-[#4CC800]'
//                                             }`}
//                                         >
//                                             {page}
//                                         </button>
//                                     ))}
                                    
//                                     <button
//                                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                                         disabled={currentPage === totalPages}
//                                         className={`px-4 py-2 rounded-full font-Montserrat font-medium text-sm transition-all duration-300 ${
//                                             currentPage === totalPages
//                                                 ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                                                 : 'bg-[#4DC801] text-white hover:bg-[#3ba001]'
//                                         }`}
//                                     >
//                                         Next
//                                     </button>
//                                 </div>
//                             )}

//                             {/* No Posts Found */}
//                             {regularPosts.length === 0 && (
//                                 <div className="text-center py-16">
//                                     <h3 className="font-THICCCBOI-Medium text-2xl mb-4">No posts found</h3>
//                                     <p className="text-gray-400 mb-6">Try selecting a different category or check back later for new content.</p>
//                                     <button
//                                         onClick={() => setSelectedCategory('all')}
//                                         className="px-6 py-3 bg-[#4DC801] text-white rounded-full font-Montserrat font-medium hover:bg-[#3ba001] transition-colors duration-300"
//                                     >
//                                         View All Posts
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </section>

//             {/* Newsletter Section */}
//             <section className="text-white mb-36 px-5 md:px-10 xl:px-0">
//                 <div className="max-w-[1110px] mx-auto">
//                     <div className="bg-[#0B1306] rounded-[30px] p-8 md:p-12 text-center">
//                         <h2 className="font-THICCCBOI-Medium text-2xl md:text-3xl mb-4">
//                             Stay Updated with Our Latest Articles
//                         </h2>
//                         <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
//                             Get the latest tips, tutorials, and industry insights delivered directly to your inbox.
//                         </p>
//                         <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//                             <input
//                                 type="email"
//                                 placeholder="Enter your email address"
//                                 className="flex-1 px-4 py-3 bg-black border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#4CC800]"
//                             />
//                             <button className="px-6 py-3 bg-[#4DC801] text-white rounded-full font-Montserrat font-medium hover:bg-[#3ba001] transition-colors duration-300">
//                                 Subscribe
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </main>
//     );
// }



import { useState } from 'react';
import { Link } from 'react-router-dom';
import PurpleShadowBG from "../assets/images/purple-shadow-bg.webp";
import GreenShadowBG from "../assets/images/green-shadow-bg.webp";

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    // Generate blog posts data for the 91 HTML pages
    const generateBlogPosts = () => {
        const posts = [];
        for (let i = 1; i <= 91; i++) {
            posts.push({
                id: i,
                title: `Blog Post ${i} - Audio Mixing & Mastering Guide`,
                excerpt: `Discover the latest techniques and insights in audio mixing and mastering. This comprehensive guide covers everything you need to know about professional audio production.`,
                category: `Category${(i % 6) + 1}`,
                author: `Author ${i}`,
                date: `2024-01-${(i % 30 + 1).toString().padStart(2, '0')}`,
                readTime: `${5 + (i % 10)} min read`,
                image: `https://picsum.photos/400/250?random=${i}`,
                featured: i === 1
            });
        }
        return posts;
    };

    const blogPosts = generateBlogPosts();
    const categories = [
        { id: 'all', name: 'All Posts' },
        { id: 'Category1', name: 'Mixing' },
        { id: 'Category2', name: 'Mastering' },
        { id: 'Category3', name: 'Equipment' },
        { id: 'Category4', name: 'Technology' },
        { id: 'Category5', name: 'Studio Setup' },
        { id: 'Category6', name: 'Tips & Tricks' }
    ];

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
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    setCurrentPage(1);
                                }}
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

                    {/* Blog Posts Grid */}
                    <div className="space-y-12">
                        {/* Featured Post */}
                        {featuredPost && selectedCategory === 'all' && (
                            <Link
                                to={`/blog/BlogPost${featuredPost.id}.html`}
                                className="block bg-[#0B1306] rounded-[30px] p-8 hover:transform hover:scale-[1.02] transition-all duration-300 group"
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
                            </Link>
                        )}

                        {/* Regular Blog Posts Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentPosts.map(post => (
                                <Link
                                    key={post.id}
                                    to={`/blog/BlogPost${post.id}.html`}
                                    className="block bg-[#0B1306] rounded-[20px] overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
                                >
                                    <div className="relative">
                                        <img 
                                            src={post.image} 
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {post.category}
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
                                </Link>
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
};

export default Blog