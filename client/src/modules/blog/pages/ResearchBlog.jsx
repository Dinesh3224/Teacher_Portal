import { useState } from "react";
import { PlusCircle, Search, Filter, ThumbsUp, MessageSquare, Star, FileText, Send, X, Paperclip } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function ResearchBlog() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", category: "Research", content: "" });
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Optimizing Neural Networks for Edge Devices",
      author: "Professor John",
      department: "Computer Science",
      date: "Oct 12, 2026",
      category: "Research",
      tags: ["AI", "Edge Computing", "Optimization"],
      content: "This paper explores novel pruning techniques drastically reducing model size without sacrificing precision allowing LLMs to compile effectively inside standard edge processors...",
      likes: 24,
      stars: 12,
      comments: [
        { id: 1, author: "Dr. Smith", text: "Great research work! Very relevant." }
      ],
      liked: false,
      starred: false,
      attachment: "neural_net_edge.pdf"
    },
    {
      id: 2,
      title: "Impact of AI in Modern Education Systems",
      author: "Dr. Emily Davis",
      department: "Education & Psychology",
      date: "Oct 10, 2026",
      category: "Article",
      tags: ["EdTech", "AI", "Pedagogy"],
      content: "Evaluating the integration of Large Language models across standard examination workflows formatting analytical breakdowns mapping the risk versus reward...",
      likes: 45,
      stars: 8,
      comments: [
        { id: 1, author: "Prof. John", text: "Interesting methodology!" }
      ],
      liked: true,
      starred: false,
      attachment: null
    }
  ]);

  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  const handleInteraction = (postId, type) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        if (type === "like") return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
        if (type === "star") return { ...p, starred: !p.starred, stars: p.starred ? p.stars - 1 : p.stars + 1 };
      }
      return p;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    
    const created = {
      id: Date.now(),
      title: newPost.title,
      author: user?.name || "Unknown",
      department: user?.department || "General",
      date: "Just now",
      category: newPost.category,
      tags: [newPost.category],
      content: newPost.content,
      likes: 0,
      stars: 0,
      comments: [],
      liked: false,
      starred: false,
      attachment: "draft_document.pdf" // mock
    };
    
    setPosts([created, ...posts]);
    setShowCreate(false);
    setNewPost({ title: "", category: "Research", content: "" });
  };

  const submitComment = (postId) => {
    if (!commentText.trim()) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
         return {
           ...p,
           comments: [...p.comments, { id: Date.now(), author: user?.name, text: commentText }]
         };
      }
      return p;
    }));
    setCommentText("");
  };

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === "All" || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-2xl font-bold text-gray-900">Research Blog</h1>
            <p className="text-sm text-gray-500 mt-1">Share ideas, articles, and department updates with faculty.</p>
         </div>
         <button 
           onClick={() => setShowCreate(true)}
           className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98] shrink-0 self-start md:self-auto"
         >
            <PlusCircle size={18} /> Create Post
         </button>
      </div>

      {/* Toolkit Toolbar */}
      <div className="flex items-center gap-3">
         <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            <input
               type="text"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search papers or tags..."
               className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400 shadow-sm"
            />
         </div>
         <div className="relative bg-white border border-gray-200 rounded-xl p-1 shadow-sm flex items-center">
            <Filter className="text-gray-400 ml-3 mr-2" size={14} />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-700 py-1.5 pr-8 focus:outline-none cursor-pointer appearance-none outline-none"
            >
               <option value="All">All Categories</option>
               <option value="Research">Research Papers</option>
               <option value="Article">Articles</option>
               <option value="Idea">Ideas</option>
            </select>
         </div>
      </div>

      {/* Feed Layout */}
      <div className="flex flex-col gap-6">
         {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                     <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md ${
                        post.category === 'Research' ? 'bg-red-50 text-red-600' :
                        post.category === 'Article' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                     }`}>
                        {post.category}
                     </span>
                     <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  
                  <h2 className="text-xl font-extrabold text-gray-900 mb-2">{post.title}</h2>
                  
                  <div className="flex items-center gap-2 mb-4">
                     <img src={`https://ui-avatars.com/api/?name=${post.author}&background=f1f5f9&color=64748b`} className="w-6 h-6 rounded-full" alt="Author" />
                     <p className="text-sm font-bold text-gray-700">{post.author}</p>
                     <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                     <p className="text-xs text-gray-500">{post.department}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{post.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                     {post.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                           #{tag}
                        </span>
                     ))}
                  </div>

                  {post.attachment && (
                     <div className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 rounded-xl p-3 w-fit mb-6 cursor-pointer hover:bg-blue-50 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                           <FileText size={16} />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-blue-900">Attached Paper</p>
                           <p className="text-[10px] text-blue-500">{post.attachment}</p>
                        </div>
                     </div>
                  )}

                  <div className="flex items-center gap-6 pt-5 border-t border-gray-100">
                     <button onClick={() => handleInteraction(post.id, 'like')} className={`flex items-center gap-2 text-sm font-bold transition-colors cursor-pointer ${post.liked ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                        <ThumbsUp size={18} className={post.liked ? "fill-blue-100" : ""} />
                        <span>Insightful</span>
                        {post.likes > 0 && <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-md ml-1">{post.likes}</span>}
                     </button>
                     <button onClick={() => handleInteraction(post.id, 'star')} className={`flex items-center gap-2 text-sm font-bold transition-colors cursor-pointer ${post.starred ? 'text-orange-500' : 'text-gray-500 hover:text-gray-800'}`}>
                        <Star size={18} className={post.starred ? "fill-orange-100" : ""} />
                        <span>Important</span>
                        {post.stars > 0 && <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-md ml-1">{post.stars}</span>}
                     </button>
                     <button onClick={() => setActiveCommentPost(activeCommentPost === post.id ? null : post.id)} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer ml-auto">
                        <MessageSquare size={18} />
                        <span>Discuss ({post.comments.length})</span>
                     </button>
                  </div>
               </div>

               {/* Comments Dropdown Section */}
               {activeCommentPost === post.id && (
                  <div className="bg-gray-50 p-6 border-t border-gray-100 animate__animated animate__fadeIn animate__faster">
                     <div className="space-y-4 mb-5">
                        {post.comments.map(c => (
                           <div key={c.id} className="flex items-start gap-3">
                              <img src={`https://ui-avatars.com/api/?name=${c.author}&background=fff`} className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" alt="Author" />
                              <div className="bg-white px-4 py-2.5 rounded-xl rounded-tl-none shadow-sm min-w-[200px] border border-gray-100">
                                 <p className="text-xs font-bold text-gray-900 mb-0.5">{c.author}</p>
                                 <p className="text-sm text-gray-700">{c.text}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="flex gap-2">
                        <input
                           type="text"
                           value={commentText}
                           onChange={(e) => setCommentText(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && submitComment(post.id)}
                           placeholder="Write your thoughts..."
                           className="flex-1 bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                        />
                        <button onClick={() => submitComment(post.id)} className="bg-blue-500 text-white p-2.5 rounded-xl hover:bg-blue-600 transition-colors cursor-pointer">
                           <Send size={18} />
                        </button>
                     </div>
                  </div>
               )}
            </div>
         ))}
         {filteredPosts.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
               <Search className="mx-auto text-gray-300 mb-3" size={32} />
               <p className="font-bold text-gray-500">No posts found matching criteria.</p>
            </div>
         )}
      </div>

      {/* Create Modal */}
      {showCreate && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate__animated animate__fadeInUp animate__faster flex flex-col max-h-screen">
               <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 text-lg">Create New Post</h3>
                  <button onClick={() => setShowCreate(false)} className="p-1 text-gray-400 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                     <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 overflow-y-auto">
                  <form id="blog-form" onSubmit={handleCreatePost} className="space-y-4">
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Title</label>
                        <input 
                           type="text" 
                           value={newPost.title}
                           onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                           placeholder="Enter post title..."
                           className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 font-bold"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                        <div className="flex gap-3">
                           {["Research", "Article", "Idea"].map(cat => (
                              <button
                                 key={cat}
                                 type="button"
                                 onClick={() => setNewPost({...newPost, category: cat})}
                                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors border cursor-pointer ${
                                    newPost.category === cat 
                                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                 }`}
                              >
                                 {cat}
                              </button>
                           ))}
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Content</label>
                        <textarea 
                           className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-blue-400 min-h-[150px] resize-none text-sm leading-relaxed"
                           placeholder="Detailed breakdown of your post..."
                           value={newPost.content}
                           onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                           required
                        />
                     </div>
                     
                     {/* Dummy Document Uploader */}
                     <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 text-center hover:bg-blue-50/50 transition-colors cursor-pointer">
                        <Paperclip size={24} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm font-bold text-blue-600">Click to upload paper PDF</p>
                        <p className="text-xs text-gray-400 mt-1">Maximum file size 10MB.</p>
                     </div>
                  </form>
               </div>
               
               <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                  <button onClick={() => setShowCreate(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer">
                     Cancel
                  </button>
                  <button form="blog-form" type="submit" className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer">
                     Publish Post
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
