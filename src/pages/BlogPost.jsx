import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Skeleton from 'react-loading-skeleton';
import PurpleShadowBG from "../assets/images/purple-shadow-bg.webp";
import GreenShadowBG from "../assets/images/green-shadow-bg.webp";

export default function BlogPost() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sample blog data - replace with actual API call
    const sampleBlogPosts = [
        {
            id: 1,
            title: "The Art of Audio Mixing: A Complete Guide",
            excerpt: "Learn the fundamentals of audio mixing and how to create professional-quality tracks that stand out in today's competitive music industry.",
            content: `
                <p>Audio mixing is both an art and a science, requiring technical expertise and creative intuition. In this comprehensive guide, we'll explore the fundamental principles that every audio engineer should understand.</p>
                
                <h2>Understanding the Basics</h2>
                <p>Before diving into advanced techniques, it's crucial to understand the basic concepts of audio mixing. Mixing involves combining multiple audio tracks into a single stereo or surround sound output.</p>
                
                <h3>Key Elements of Mixing</h3>
                <ul>
                    <li><strong>Balance:</strong> Ensuring all elements are at appropriate levels</li>
                    <li><strong>Panning:</strong> Positioning sounds in the stereo field</li>
                    <li><strong>EQ:</strong> Shaping the frequency content of each track</li>
                    <li><strong>Compression:</strong> Controlling dynamic range</li>
                    <li><strong>Reverb & Delay:</strong> Adding space and depth</li>
                </ul>
                
                <h2>Setting Up Your Mix</h2>
                <p>The first step in any mix is to establish a solid foundation. Start by setting appropriate levels for your kick drum and bass, as these form the backbone of most modern music.</p>
                
                <h3>Level Setting Guidelines</h3>
                <p>Begin with your kick drum at around -10dB, then adjust other elements relative to this reference point. Remember, it's better to start conservative and build up rather than starting too loud.</p>
                
                <h2>Advanced Techniques</h2>
                <p>Once you've mastered the basics, you can explore more advanced mixing techniques such as parallel processing, sidechain compression, and creative use of effects.</p>
                
                <h3>Parallel Processing</h3>
                <p>Parallel processing involves blending a processed version of a track with the original. This technique is commonly used for drums and vocals to add character while maintaining clarity.</p>
                
                <h2>Final Thoughts</h2>
                <p>Remember that mixing is a skill that develops over time. Don't be afraid to experiment and trust your ears. The best mixers are those who can balance technical precision with creative expression.</p>
            `,
            category: "mixing",
            author: "Audio Master Pro",
            date: "2024-01-15",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=400&fit=crop",
            featured: true
        },
        {
            id: 2,
            title: "Mastering Techniques for Different Genres",
            excerpt: "Discover genre-specific mastering techniques that will help your music sound its best across different platforms and listening environments.",
            content: `
                <p>Mastering is the final step in the music production process, where the mix is prepared for distribution across various platforms and listening environments.</p>
                
                <h2>Genre-Specific Approaches</h2>
                <p>Different genres require different mastering approaches. What works for electronic dance music won't necessarily work for acoustic folk.</p>
                
                <h3>Electronic Dance Music (EDM)</h3>
                <p>EDM typically requires high levels and strong bass presence. Focus on maintaining punch in the low end while ensuring clarity in the high frequencies.</p>
                
                <h3>Rock and Metal</h3>
                <p>Rock music benefits from maintaining dynamic range while ensuring consistency across the album. Pay attention to the relationship between guitars and drums.</p>
                
                <h3>Hip-Hop and R&B</h3>
                <p>These genres often emphasize bass and vocal clarity. Ensure the kick drum and bass work together without masking each other.</p>
                
                <h2>Technical Considerations</h2>
                <p>Regardless of genre, there are technical considerations that apply to all mastering work.</p>
                
                <h3>Loudness Standards</h3>
                <p>Different platforms have different loudness standards. Streaming services typically target -14 LUFS, while CD mastering might target -9 LUFS.</p>
                
                <h3>Frequency Balance</h3>
                <p>Ensure your master translates well across different playback systems, from earbuds to club sound systems.</p>
            `,
            category: "mastering",
            author: "Studio Expert",
            date: "2024-01-10",
            readTime: "12 min read",
            image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=400&fit=crop",
            featured: false
        },
        {
            id: 3,
            title: "How to Choose the Right Audio Equipment",
            excerpt: "A comprehensive guide to selecting the perfect audio equipment for your home studio setup, from microphones to monitors.",
            content: `
                <p>Building a home studio requires careful consideration of equipment choices. The right gear can make a significant difference in the quality of your recordings.</p>
                
                <h2>Microphones</h2>
                <p>Microphones are the first link in your recording chain, making them crucial to your sound.</p>
                
                <h3>Dynamic Microphones</h3>
                <p>Dynamic microphones are rugged and handle high sound pressure levels well. They're ideal for recording drums, guitar amplifiers, and live vocals.</p>
                
                <h3>Condenser Microphones</h3>
                <p>Condenser microphones are more sensitive and detailed, making them perfect for studio vocals, acoustic instruments, and overhead drum miking.</p>
                
                <h2>Audio Interfaces</h2>
                <p>Your audio interface is the bridge between your analog gear and your computer.</p>
                
                <h3>Input/Output Count</h3>
                <p>Consider how many simultaneous inputs you need. A simple interface with 2-4 inputs might be sufficient for solo work, while bands might need 8 or more inputs.</p>
                
                <h3>Quality Considerations</h3>
                <p>Look for interfaces with good preamps and converters. The quality of these components directly affects your recording quality.</p>
                
                <h2>Studio Monitors</h2>
                <p>Accurate monitoring is essential for making good mixing decisions.</p>
                
                <h3>Size and Room</h3>
                <p>Larger monitors generally provide better low-frequency response, but they require more space and proper room treatment.</p>
                
                <h3>Nearfield vs Midfield</h3>
                <p>Nearfield monitors are designed for close listening and are ideal for smaller rooms. Midfield monitors work better in larger spaces.</p>
            `,
            category: "equipment",
            author: "Tech Guru",
            date: "2024-01-08",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1598520108910-85dee481eabc?w=800&h=400&fit=crop",
            featured: false
        },
        {
            id: 4,
            title: "Digital vs Analog: The Great Audio Debate",
            excerpt: "Explore the pros and cons of digital and analog audio processing, and learn when to use each approach for optimal results.",
            content: `
                <p>The debate between digital and analog audio processing has been ongoing for decades. Both approaches have their merits, and the best engineers know when to use each.</p>
                
                <h2>Analog Processing</h2>
                <p>Analog equipment has a certain character that many engineers find appealing.</p>
                
                <h3>Advantages of Analog</h3>
                <ul>
                    <li>Natural saturation and harmonic distortion</li>
                    <li>Intuitive, tactile controls</li>
                    <li>Unique character and coloration</li>
                    <li>No latency issues</li>
                </ul>
                
                <h3>Disadvantages of Analog</h2>
                <ul>
                    <li>Higher cost</li>
                    <li>Maintenance requirements</li>
                    <li>Limited recall capabilities</li>
                    <li>Noise and distortion accumulation</li>
                </ul>
                
                <h2>Digital Processing</h2>
                <p>Digital processing offers precision and flexibility that analog can't match.</p>
                
                <h3>Advantages of Digital</h3>
                <ul>
                    <li>Perfect recall and automation</li>
                    <li>Lower cost</li>
                    <li>No noise accumulation</li>
                    <li>Unlimited processing power</li>
                </ul>
                
                <h3>Disadvantages of Digital</h3>
                <ul>
                    <li>Can sound sterile or harsh</li>
                    <li>Latency issues</li>
                    <li>Less tactile interaction</li>
                    <li>Potential for over-processing</li>
                </ul>
                
                <h2>Hybrid Approaches</h2>
                <p>Many modern studios use a hybrid approach, combining the best of both worlds.</p>
                
                <h3>When to Use Each</h3>
                <p>Use analog for tracking and critical processing where character matters. Use digital for precise editing, automation, and when you need perfect recall.</p>
            `,
            category: "technology",
            author: "Audio Philosopher",
            date: "2024-01-05",
            readTime: "15 min read",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=400&fit=crop",
            featured: false
        },
        {
            id: 5,
            title: "Building Your Home Studio on a Budget",
            excerpt: "Learn how to create a professional-quality home studio without breaking the bank, with tips on essential equipment and room treatment.",
            content: `
                <p>Creating a professional-quality home studio doesn't have to cost a fortune. With careful planning and smart choices, you can build an excellent setup on a budget.</p>
                
                <h2>Essential Equipment</h2>
                <p>Start with the basics and build up over time.</p>
                
                <h3>Computer and DAW</h3>
                <p>Your computer is the heart of your studio. A modern computer with at least 8GB RAM and a fast processor will handle most recording tasks.</p>
                
                <h3>Audio Interface</h3>
                <p>Don't skimp on your audio interface. It's the most important piece of equipment for sound quality. Look for interfaces with good preamps and converters.</p>
                
                <h3>Microphone</h3>
                <p>Start with one good microphone. A large-diaphragm condenser microphone is versatile and can handle vocals and acoustic instruments.</p>
                
                <h2>Room Treatment</h2>
                <p>Room treatment is often overlooked but crucial for good sound.</p>
                
                <h3>Acoustic Panels</h3>
                <p>DIY acoustic panels are cost-effective and effective. Use rigid fiberglass insulation wrapped in fabric.</p>
                
                <h3>Bass Traps</h3>
                <p>Bass traps in corners help control low-frequency issues that are common in small rooms.</p>
                
                <h2>Budget-Friendly Tips</h2>
                <p>Here are some strategies for building your studio economically.</p>
                
                <h3>Buy Used</h3>
                <p>Many professional studios sell equipment when upgrading. Used gear can offer excellent value.</p>
                
                <h3>DIY Solutions</h3>
                <p>Build your own acoustic treatment, microphone stands, and cable management solutions.</p>
                
                <h3>Prioritize</h3>
                <p>Focus on the most important pieces first: computer, interface, microphone, and monitors.</p>
            `,
            category: "studio",
            author: "Budget Producer",
            date: "2024-01-03",
            readTime: "14 min read",
            image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=400&fit=crop",
            featured: false
        },
        {
            id: 6,
            title: "The Future of Audio Production: AI and Machine Learning",
            excerpt: "Discover how artificial intelligence is revolutionizing audio production and what this means for the future of music creation.",
            content: `
                <p>Artificial intelligence and machine learning are transforming the way we create and process audio. From automated mixing to intelligent mastering, AI is becoming an integral part of modern music production.</p>
                
                <h2>AI in Mixing</h2>
                <p>AI-powered mixing tools can analyze tracks and suggest optimal settings for EQ, compression, and effects.</p>
                
                <h3>Automated EQ</h3>
                <p>AI can analyze frequency content and suggest EQ adjustments to improve clarity and balance.</p>
                
                <h3>Intelligent Compression</h3>
                <p>Machine learning algorithms can detect transients and apply compression settings that would take hours to achieve manually.</p>
                
                <h2>AI in Mastering</h2>
                <p>Automated mastering services use AI to analyze your mix and apply appropriate processing for different platforms.</p>
                
                <h3>Loudness Optimization</h3>
                <p>AI can automatically adjust levels to meet the loudness standards of different streaming platforms.</p>
                
                <h3>Frequency Balancing</h3>
                <p>Machine learning can analyze your mix and suggest frequency adjustments for better translation across different playback systems.</p>
                
                <h2>The Human Element</h2>
                <p>While AI is powerful, it's important to remember that it's a tool, not a replacement for human creativity.</p>
                
                <h3>Collaboration</h3>
                <p>The best results often come from collaboration between human engineers and AI tools.</p>
                
                <h3>Creative Decisions</h3>
                <p>AI can handle technical aspects, but creative decisions still require human judgment and artistic vision.</p>
                
                <h2>Looking Forward</h2>
                <p>As AI technology continues to evolve, we can expect even more sophisticated tools for audio production.</p>
                
                <h3>Real-time Processing</h3>
                <p>Future AI tools may offer real-time processing capabilities, allowing for instant feedback during recording and mixing.</p>
                
                <h3>Personalized Learning</h3>
                <p>AI systems may learn your preferences and style, offering increasingly personalized suggestions.</p>
            `,
            category: "technology",
            author: "Future Tech",
            date: "2024-01-01",
            readTime: "11 min read",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=400&fit=crop",
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
        const fetchPost = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const foundPost = sampleBlogPosts.find(p => p.id === parseInt(postId));
                if (foundPost) {
                    setPost(foundPost);
                    
                    // Get related posts (same category, excluding current post)
                    const related = sampleBlogPosts
                        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
                        .slice(0, 3);
                    setRelatedPosts(related);
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    if (loading) {
        return (
            <main className='mt-24'>
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
                        <div className="mb-8">
                            <Skeleton height={40} width={200} baseColor="#0B1306" highlightColor="#171717" />
                        </div>
                        <div className="bg-[#0B1306] rounded-[30px] p-8">
                            <Skeleton height={400} baseColor="#0B1306" highlightColor="#171717" className="mb-6" />
                            <Skeleton height={50} width="80%" baseColor="#0B1306" highlightColor="#171717" className="mb-4" />
                            <Skeleton height={20} width="60%" baseColor="#0B1306" highlightColor="#171717" className="mb-6" />
                            <Skeleton height={20} width="90%" baseColor="#0B1306" highlightColor="#171717" className="mb-3" />
                            <Skeleton height={20} width="85%" baseColor="#0B1306" highlightColor="#171717" className="mb-3" />
                            <Skeleton height={20} width="70%" baseColor="#0B1306" highlightColor="#171717" />
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    if (!post) {
        return (
            <main className='mt-24'>
                <section className="text-white relative z-20 mb-24 px-5 md:px-10 xl:px-0">
                    <picture>
                        <source srcSet={GreenShadowBG} type="image/webp" />
                        <img src={GreenShadowBG} className="absolute -top-full left-0 pointer-events-none" alt="Green Shadow Background" />
                    </picture>
                    <picture>
                        <source srcSet={PurpleShadowBG} type="image/webp" />
                        <img src={PurpleShadowBG} className="absolute -top-3/4 right-0 pointer-events-none" alt="Purple Shadow Background" />
                    </picture>
                    
                    <div className="max-w-[1110px] relative z-20 mx-auto text-center">
                        <h1 className="font-THICCCBOI-Medium text-3xl md:text-4xl mb-6">Article Not Found</h1>
                        <p className="text-gray-300 mb-8">The article you're looking for doesn't exist or has been removed.</p>
                        <RouterLink
                            to="/blog"
                            className="inline-flex items-center px-6 py-3 bg-[#4DC801] text-white rounded-full font-Montserrat font-medium hover:bg-[#3ba001] transition-colors duration-300"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Back to Blog
                        </RouterLink>
                    </div>
                </section>
            </main>
        );
    }

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
                    {/* Back Button */}
                    <div className="mb-8">
                        <RouterLink
                            to="/blog"
                            className="inline-flex items-center text-[#4CC800] hover:text-[#3ba001] font-Montserrat font-medium transition-colors duration-300"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Back to Blog
                        </RouterLink>
                    </div>

                    {/* Article Header */}
                    <div className="bg-[#0B1306] rounded-[30px] p-8 mb-12">
                        <div className="mb-8">
                            <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-[300px] md:h-[400px] object-cover rounded-[20px]"
                            />
                        </div>
                        
                        <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{formatDate(post.date)}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <h1 className="font-THICCCBOI-Medium text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                            {post.title}
                        </h1>

                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            {post.excerpt}
                        </p>

                        <div className="inline-block bg-[#4DC801] text-white px-4 py-2 rounded-full text-sm font-medium">
                            {categories.find(cat => cat.id === post.category)?.name}
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="bg-[#0B1306] rounded-[30px] p-8 mb-12">
                        <div 
                            className="prose prose-invert prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                            style={{
                                '--tw-prose-body': '#d1d5db',
                                '--tw-prose-headings': '#ffffff',
                                '--tw-prose-links': '#4CC800',
                                '--tw-prose-bold': '#ffffff',
                                '--tw-prose-counters': '#6b7280',
                                '--tw-prose-bullets': '#6b7280',
                                '--tw-prose-hr': '#374151',
                                '--tw-prose-quotes': '#f3f4f6',
                                '--tw-prose-quote-borders': '#4CC800',
                                '--tw-prose-captions': '#9ca3af',
                                '--tw-prose-code': '#ffffff',
                                '--tw-prose-pre-code': '#d1d5db',
                                '--tw-prose-pre-bg': '#1f2937',
                                '--tw-prose-pre-border': '#374151',
                                '--tw-prose-th-borders': '#4b5563',
                                '--tw-prose-td-borders': '#374151',
                            }}
                        />
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="bg-[#0B1306] rounded-[30px] p-8">
                            <h2 className="font-THICCCBOI-Medium text-2xl md:text-3xl mb-8">
                                Related Articles
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {relatedPosts.map(relatedPost => (
                                    <article key={relatedPost.id} className="bg-black rounded-[20px] overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                                        <div className="relative">
                                            <img 
                                                src={relatedPost.image} 
                                                alt={relatedPost.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {categories.find(cat => cat.id === relatedPost.category)?.name}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                                                <span>{relatedPost.author}</span>
                                                <span>•</span>
                                                <span>{formatDate(relatedPost.date)}</span>
                                            </div>
                                            <h3 className="font-THICCCBOI-Medium text-xl leading-tight mb-3 line-clamp-2">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                                                {relatedPost.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-400">{relatedPost.readTime}</span>
                                                <RouterLink
                                                    to={`/blog/${relatedPost.id}`}
                                                    className="text-[#4CC800] hover:text-[#3ba001] font-medium transition-colors duration-300"
                                                >
                                                    Read More →
                                                </RouterLink>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
} 