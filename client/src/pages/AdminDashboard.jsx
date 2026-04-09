import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FaSignOutAlt, FaImage, FaBullhorn, FaCalendarAlt, FaPlus, FaTrash, FaEdit, FaFileAlt, FaEnvelope, FaReply } from 'react-icons/fa';


const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('slides');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Form states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({});

    const checkAuth = () => {
        if (!localStorage.getItem('token')) {
            navigate('/admin/login');
        }
    };

    useEffect(() => {
        checkAuth();
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setData([]); // Clear data before fetching new items

        let isIgnored = false;
        const currentTab = activeTab;

        try {
            let res;
            if (activeTab === 'slides') res = await api.get('/slides');
            else if (activeTab === 'announcements') res = await api.get('/announcements');
            else if (activeTab === 'events') res = await api.get('/events');
            else if (activeTab === 'dept-notices') res = await api.get('/dept-notices');
            else if (activeTab === 'placement-slides') res = await api.get('/placement-slides');
            else if (activeTab === 'queries') res = await api.get('/queries');

            if (res && activeTab === currentTab) {
                setData(res.data);
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/admin/login');
            }
        } finally {
            if (activeTab === currentTab) {
                setLoading(false);
            }
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/${activeTab}/${id}`);
            fetchData();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const openModal = (item = null) => {
        if (item) {
            setIsEditMode(true);
            setEditId(item.id);
            // Pre-fill form data
            if (activeTab === 'queries') {
                setFormData({ ...item, replyMessage: '' });
            } else {
                setFormData(item);
            }
        } else {
            setIsEditMode(false);
            setEditId(null);
            setFormData({});
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let payload = formData;
            const headers = {};

            if (activeTab === 'slides' || activeTab === 'placement-slides' || activeTab === 'events') {
                const multiPartData = new FormData();
                for (const key in formData) {
                    if (key === 'image' && typeof formData[key] === 'string') continue; // Skip URL on edit if no new file
                    multiPartData.append(key, formData[key]);
                }
                payload = multiPartData;
                // headers['Content-Type'] = 'multipart/form-data'; // Let axios/browser handle boundary
            }

            if (isEditMode) {
                if (activeTab === 'queries') {
                    await api.post(`/queries/${editId}/reply`, { replyMessage: formData.replyMessage });
                } else {
                    await api.put(`/${activeTab}/${editId}`, payload, { headers });
                }
            } else {
                await api.post(`/${activeTab}`, payload, { headers });
            }



            setIsModalOpen(false);
            setFormData({});
            fetchData();
        } catch (err) {
            const msg = err.response?.data?.error || err.response?.data?.message || 'Action failed';
            alert(`Failed to ${isEditMode ? 'update' : 'add'}: ${msg}`);
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-dark flex font-sans transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-72 bg-primary dark:bg-gray-900 text-white flex flex-col shadow-2xl z-20 transition-colors">
                <div className="p-8 text-2xl font-black border-b border-white/10 tracking-tight">ADMIN PANEL</div>
                <nav className="flex-1 py-6 space-y-1">
                    {[
                        { id: 'slides', icon: FaImage, label: 'Hero Slides' },
                        { id: 'placement-slides', icon: FaImage, label: 'Placement Slides' },
                        { id: 'announcements', icon: FaBullhorn, label: 'Announcements' },
                        { id: 'dept-notices', icon: FaBullhorn, label: 'Dept Notices' },
                        { id: 'events', icon: FaCalendarAlt, label: 'Events' },
                        { id: 'queries', icon: FaEnvelope, label: 'User Queries' },
                    ].map(tab => (

                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-8 py-4 flex items-center transition-all duration-300 ${activeTab === tab.id ? 'bg-secondary dark:bg-accent border-r-4 border-accent dark:border-white text-white dark:text-dark' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <tab.icon className={`mr-4 text-xl ${activeTab === tab.id ? 'text-accent dark:text-dark' : ''}`} /> {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 bg-black/20">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 font-bold">
                        <FaSignOutAlt className="mr-3" /> LOGOUT
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-4xl font-black capitalize text-gray-900 dark:text-white tracking-tight transition-colors">{activeTab} Manager</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 transition-colors">Manage your website's {activeTab} effortlessly.</p>
                    </div>
                    {activeTab !== 'content' && activeTab !== 'queries' && (
                        <button onClick={() => openModal()} className="bg-primary dark:bg-accent text-white dark:text-dark px-8 py-4 rounded-2xl flex items-center hover:bg-secondary dark:hover:bg-white transition-all shadow-xl shadow-primary/20 dark:shadow-accent/20 font-bold">
                            <FaPlus className="mr-3" /> Add New {activeTab.slice(0, -1)}
                        </button>
                    )}

                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-[32px] shadow-2xl shadow-black/5 overflow-hidden border border-gray-100 dark:border-white/5 transition-colors">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-700/30 transition-colors">
                                    <th className="p-6 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5">ID</th>
                                    <th className="p-6 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5">Title / Value</th>
                                    <th className="p-6 text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-primary/5 dark:hover:bg-accent/5 transition-colors group">
                                        <td className="p-6 font-mono text-gray-400 dark:text-gray-500 text-sm">#{item.id}</td>
                                        <td className="p-6">
                                            <div className="font-bold text-gray-800 dark:text-white transition-colors">{item.title || item.image_url || item.subject}</div>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {item.is_important && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-black uppercase inline-block">Important</span>}
                                                {activeTab === 'dept-notices' && <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-black uppercase inline-block">{item.department_id}</span>}
                                                {activeTab === 'queries' && (
                                                    <>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase inline-block ${item.status === 'replied' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                            {item.status}
                                                        </span>
                                                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium inline-block">From: {item.name} ({item.email})</span>
                                                    </>
                                                )}
                                            </div>
                                            {activeTab === 'queries' && <div className="text-sm text-gray-500 mt-2 line-clamp-1 italic">"{item.message}"</div>}
                                        </td>

                                        <td className="p-6 text-right space-x-3">
                                            {activeTab === 'queries' ? (
                                                <div className="flex items-center gap-3 ml-auto">
                                                    <button onClick={() => openModal(item)} className="p-3 bg-secondary/10 text-secondary rounded-xl hover:bg-secondary hover:text-white transition-all shadow-sm flex items-center gap-2">
                                                        <FaReply /> Reply
                                                    </button>
                                                    {item.status === 'replied' && (
                                                        <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                                            <FaTrash />
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <button onClick={() => openModal(item)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                        <FaEdit />
                                                    </button>
                                                    {activeTab !== 'content' && (
                                                        <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                                            <FaTrash />
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {data.length === 0 && (
                            <div className="p-20 text-center">
                                <div className="text-gray-300 dark:text-gray-700 text-6xl mb-4 flex justify-center transition-colors"><FaBullhorn /></div>
                                <p className="text-gray-400 dark:text-gray-500 font-medium transition-colors">No items found in this section.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
                    <div className="bg-white dark:bg-gray-800 p-10 rounded-[40px] w-full max-w-xl shadow-2xl border border-gray-100 dark:border-white/5 animate-in fade-in zoom-in duration-300 transition-colors">
                        <h3 className="text-3xl font-black mb-8 capitalize text-gray-900 dark:text-white tracking-tight transition-colors">
                            {isEditMode ? 'Update' : 'Add New'} {activeTab.slice(0, -1)}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {activeTab === 'slides' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1 transition-colors">Slide Image</label>
                                        <input type="file" accept="image/*" className="w-full border-2 border-gray-100 dark:border-white/5 p-4 rounded-2xl focus:border-primary dark:focus:border-accent dark:bg-gray-700 dark:text-white outline-none transition-all" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} required={!isEditMode} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1 transition-colors">Slide Title</label>
                                        <input placeholder="Enter title" value={formData.title || ''} className="w-full border-2 border-gray-100 dark:border-white/5 p-4 rounded-2xl focus:border-primary dark:focus:border-accent dark:bg-gray-700 dark:text-white outline-none transition-all font-bold" onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1 transition-colors">Subtitle</label>
                                        <input placeholder="Enter subtitle" value={formData.subtitle || ''} className="w-full border-2 border-gray-100 dark:border-white/5 p-4 rounded-2xl focus:border-primary dark:focus:border-accent dark:bg-gray-700 dark:text-white outline-none transition-all" onChange={e => setFormData({ ...formData, subtitle: e.target.value })} />
                                    </div>
                                </>
                            )}
                            {activeTab === 'placement-slides' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Photo / Poster Image</label>
                                        <input type="file" accept="image/*" className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} required={!isEditMode} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Title / Caption</label>
                                        <input placeholder="Enter image title" value={formData.title || ''} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all font-bold" onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                    </div>
                                </>
                            )}
                            {activeTab === 'announcements' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Title</label>
                                        <input placeholder="Announcement title" value={formData.title || ''} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all font-bold" onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                                        <textarea placeholder="Detailed description" value={formData.description || ''} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all h-32" onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                                    </div>
                                    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <input type="checkbox" id="important" className="w-6 h-6 rounded-md border-gray-300 text-primary focus:ring-primary cursor-pointer" checked={formData.is_important || false} onChange={e => setFormData({ ...formData, is_important: e.target.checked })} />
                                            <label htmlFor="important" className="text-sm font-bold text-gray-700 cursor-pointer">Mark as Important (Pinned)</label>
                                        </div>
                                        {!isEditMode && (
                                            <div className="flex items-center space-x-3 pt-2 border-t border-gray-200/50">
                                                <input type="checkbox" id="sendEmailAnn" className="w-6 h-6 rounded-md border-gray-300 text-secondary focus:ring-secondary cursor-pointer" checked={formData.send_email || false} onChange={e => setFormData({ ...formData, send_email: e.target.checked })} />
                                                <label htmlFor="sendEmailAnn" className="text-sm font-bold text-gray-700 cursor-pointer text-secondary">Send Email to Students (via Principal)</label>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                            {activeTab === 'dept-notices' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Target Department</label>
                                        <select
                                            value={formData.department_id || ''}
                                            className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all font-bold"
                                            onChange={e => setFormData({ ...formData, department_id: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Department</option>
                                            <option value="mechanical-engineering">Mechanical Engineering</option>
                                            <option value="electronics-communication">Electronics & Communication</option>
                                            <option value="electrical-electronics">Electrical & Electronics</option>
                                            <option value="computer-science">Computer Science</option>
                                            <option value="data-science">CSE (Data Science)</option>
                                            <option value="applied-science">Applied Science</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Title</label>
                                        <input placeholder="Notice title" value={formData.title || ''} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all font-bold" onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                                        <textarea placeholder="Notice description" value={formData.description || ''} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all h-32" onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                                    </div>
                                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-gray-100 dark:border-white/5 transition-colors">
                                        <input type="checkbox" id="important" className="w-6 h-6 rounded-md border-gray-300 dark:border-white/10 text-primary dark:text-accent focus:ring-primary dark:focus:ring-accent cursor-pointer" checked={formData.is_important || false} onChange={e => setFormData({ ...formData, is_important: e.target.checked })} />
                                        <label htmlFor="important" className="text-sm font-bold text-gray-700 dark:text-gray-300 cursor-pointer transition-colors">Mark as Important (Pinned)</label>
                                    </div>
                                </>
                            )}
                            {activeTab === 'events' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Event Title</label>
                                        <input placeholder="What's the event?" value={formData.title || ''} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all font-bold" onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Date</label>
                                        <input type="date" value={formData.event_date ? formData.event_date.split('T')[0] : ''} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all" onChange={e => setFormData({ ...formData, event_date: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Event Image</label>
                                        <input type="file" accept="image/*" className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} required={!isEditMode} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Summary</label>
                                        <textarea placeholder="Quick overview" value={formData.description || ''} className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all" onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                    </div>
                                    {!isEditMode && (
                                        <div className="flex items-center space-x-3 p-4 bg-blue-50/50 rounded-2xl border-2 border-blue-100 shadow-sm">
                                            <input type="checkbox" id="sendEmailEvt" className="w-6 h-6 rounded-md border-gray-300 text-secondary focus:ring-secondary cursor-pointer" checked={formData.send_email || false} onChange={e => setFormData({ ...formData, send_email: e.target.checked })} />
                                            <label htmlFor="sendEmailEvt" className="text-sm font-bold text-gray-700 cursor-pointer text-secondary uppercase tracking-wider">Send details to Student Group Email</label>
                                        </div>
                                    )}
                                </>
                            )}
                            {activeTab === 'queries' && (
                                <>
                                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-white/5 mb-6 font-medium text-gray-700 dark:text-gray-300 transition-colors">
                                        <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 transition-colors">Original Message</p>
                                        <p className="italic text-sm">"{formData.message}"</p>
                                        <p className="mt-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest transition-colors">From: <span className="text-primary dark:text-accent">{formData.name} ({formData.email})</span></p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Your Reply</label>
                                        <textarea
                                            placeholder="Type your response here... an email will be sent to the user."
                                            value={formData.replyMessage || ''}
                                            className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary outline-none transition-all h-48 leading-relaxed"
                                            onChange={e => setFormData({ ...formData, replyMessage: e.target.value })}
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end space-x-4 mt-10">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors uppercase tracking-widest text-xs">Cancel</button>
                                <button type="submit" className="px-10 py-4 bg-primary text-white rounded-2xl hover:bg-secondary shadow-xl shadow-primary/20 transition-all font-black uppercase tracking-widest text-xs">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
