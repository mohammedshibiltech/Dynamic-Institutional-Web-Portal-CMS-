import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaBus,
    FaUserGraduate, FaBuilding, FaHandsHelping, FaLaptopCode,
    FaBolt, FaMicrochip, FaCogs, FaFlask, FaMapMarkedAlt
} from 'react-icons/fa';
import api from '../api/axios';


const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/queries', formData);
            alert("Thank you for reaching out! Your query has been submitted and we will get back to you soon.");
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting query:', error);
            alert("Failed to submit query. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };


    const hodContacts = [
        { dept: "Computer Science", name: "Dr. Vinod P R", email: "hodcse@cea.ac.in", phone: "9447469246", icon: <FaLaptopCode /> },
        { dept: "Electrical & Electronics", name: "Dr. Sreeja P", email: "hodeee@cea.ac.in", phone: "9497358915", icon: <FaBolt /> },
        { dept: "Electronics & Communication", name: "Prof. Rajesh M S", email: "hodece@cea.ac.in", phone: "9495062864", icon: <FaMicrochip /> },
        { dept: "Mechanical Engineering", name: "Dr. Jose Mathew", email: "hodme@cea.ac.in", phone: "9447870068", icon: <FaCogs /> },
        { dept: "Applied Science", name: "Prof. Shiji K V", email: "hodasc@cea.ac.in", phone: "09446538651", icon: <FaFlask /> }
    ];

    const administrativeContacts = [
        { role: "Placement Officer", name: "Dr. Madhu A K", icon: <FaUserGraduate /> },
        { role: "NSS Officer", name: "Prof. Sreedeepa H S", icon: <FaHandsHelping /> },
        { role: "Senior Superintendent", name: "Smt. Vijaya M", icon: <FaBuilding /> },
        { role: "Hostel Warden (Boys)", name: "Prof. Renjith Kumar D", icon: <FaBuilding /> },
        { role: "PTA President", name: "Dr. Sunil Kumar K", icon: <FaHandsHelping /> }
    ];

    const reachingDistances = [
        { from: "Chengannur", via: "Adoor - Manakala", dist: "28.3 km" },
        { from: "Kayamkulam", via: "Adoor - Manakala", dist: "29.2 km" },
        { from: "Kollam", via: "Mankala", dist: "37.2 km" },
        { from: "Pathanamthitta", via: "Adoor - Manakala", dist: "20.2 km" }
    ];

    return (
        <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-300 overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-primary dark:bg-gray-950 py-24 px-6 overflow-hidden transition-colors duration-300">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">Contact Us</h1>
                    <p className="text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                        Have questions? Reach out to our dedicated faculty, administration, or visit our campus in the heart of Pathanamthitta.
                    </p>
                </div>
            </section>

            {/* Quick Contact Cards */}
            <div className="container mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-300 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-secondary dark:group-hover:text-white transition-colors">
                            <FaMapMarkerAlt size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">Visit Us</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm italic transition-colors">Manakala PO, Adoor, Pathanamthitta<br />Kerala - 691551</p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-300 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-secondary dark:group-hover:text-white transition-colors">
                            <FaPhoneAlt size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">Call Us</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm italic transition-colors">+91 8547005100<br />Mon-Fri, 9am - 4pm</p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-300 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-secondary dark:group-hover:text-white transition-colors">
                            <FaEnvelope size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">Email Us</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm italic transition-colors">principal@cea.ac.in<br />For all official inquiries</p>
                    </div>
                </div>
            </div>

            {/* Main Content: Map & Form */}
            <section className="py-20 px-6 container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Maps & Reach */}
                    <div className="space-y-10">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-[40px] shadow-2xl border border-gray-100 dark:border-white/5 h-[400px] overflow-hidden group transition-colors">
                            <iframe
                                title="CEA Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.581977755!2d76.7161673!3d9.1354504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06067b07c9b2e5%3A0xe5a363a0335e!2sCollege%20of%20Engineering%20Adoor!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                className="w-full h-full rounded-[30px] border-none filter grayscale hover:grayscale-0 dark:brightness-75 dark:hover:brightness-100 transition-all duration-700"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                        <div className="bg-white dark:bg-gray-900/50 rounded-[40px] p-10 shadow-xl border border-gray-50 dark:border-white/5 transition-colors">
                            <h2 className="text-3xl font-bold text-primary dark:text-accent mb-8 flex items-center gap-4 transition-colors">
                                <FaBus className="text-secondary" /> How to Reach
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {reachingDistances.map((item, id) => (
                                    <div key={id} className="p-6 bg-blue-50/50 dark:bg-gray-800/80 rounded-2xl border-l-4 border-secondary flex flex-col justify-center transition-colors">
                                        <p className="text-sm font-bold text-primary/60 dark:text-accent/60 uppercase mb-1">{item.from}</p>
                                        <p className="text-lg font-bold text-gray-800 dark:text-white">{item.dist}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">via {item.via}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-primary p-12 rounded-[50px] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <h2 className="text-4xl font-bold text-white mb-8 relative z-10">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    name="name" value={formData.name} onChange={handleChange}
                                    placeholder="Your Name" required
                                    className="bg-white/10 border border-white/20 text-white placeholder-blue-200 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/20 transition-all"
                                />
                                <input
                                    name="email" value={formData.email} onChange={handleChange}
                                    type="email" placeholder="Email Address" required
                                    className="bg-white/10 border border-white/20 text-white placeholder-blue-200 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/20 transition-all"
                                />
                            </div>
                            <input
                                name="subject" value={formData.subject} onChange={handleChange}
                                placeholder="Subject" required
                                className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-200 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/20 transition-all"
                            />
                            <textarea
                                name="message" value={formData.message} onChange={handleChange}
                                rows="5" placeholder="Your Message..." required
                                className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-200 p-5 rounded-3xl focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/20 transition-all"
                            ></textarea>
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-5 bg-secondary text-white font-bold rounded-2xl hover:bg-white hover:text-secondary transition-all transform hover:scale-[1.02] shadow-xl ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {submitting ? 'Sending...' : 'Send Message'}
                            </button>

                        </form>
                    </div>
                </div>
            </section>

            {/* Department Heads Directory */}
            <section className="py-24 bg-white dark:bg-dark transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-primary dark:text-accent mb-4 transition-colors">Departmental Contacts</h2>
                        <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hodContacts.map((contact, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-[40px] border border-gray-100 dark:border-white/5 hover:shadow-2xl transition-all duration-500 group">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-16 h-16 bg-primary dark:bg-gray-800 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg ring-4 ring-blue-50 dark:ring-white/5">
                                        {contact.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white text-lg leading-tight mb-1 transition-colors">{contact.dept}</h3>
                                        <p className="text-secondary dark:text-accent font-semibold text-sm transition-colors">Head of Department</p>
                                    </div>
                                </div>
                                <h4 className="text-2xl font-bold text-primary dark:text-accent mb-6 transition-colors">{contact.name}</h4>
                                <div className="space-y-4 pt-4 border-t border-gray-200/50 dark:border-white/10">
                                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors">
                                        <FaEnvelope className="text-secondary dark:text-accent" />
                                        <span className="text-sm font-medium">{contact.email}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                                        <FaPhoneAlt className="text-secondary dark:text-accent" />
                                        <span className="text-sm font-bold tracking-wider">{contact.phone}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Admin Directory */}
            <section className="py-24 container mx-auto px-6 mb-20">
                <div className="bg-gray-900 rounded-[60px] p-12 md:p-20 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border dark:border-white/5">
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -mb-64 -mr-64 pointer-events-none"></div>
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-4">Administration & Welfare</h2>
                        <p className="text-blue-200/60 dark:text-gray-400 max-w-2xl mx-auto">Key administrative contacts for placements, hostels, and academic support.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
                        {administrativeContacts.map((admin, idx) => (
                            <div key={idx} className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20">
                                <div className="w-14 h-14 bg-secondary/80 text-white rounded-2xl flex items-center justify-center text-2xl">
                                    {admin.icon}
                                </div>
                                <div>
                                    <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">{admin.role}</p>
                                    <h4 className="text-lg font-bold text-white">{admin.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
