import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUserTie, FaBuilding, FaChalkboardTeacher, FaEnvelope, FaPhone, FaQuoteLeft } from 'react-icons/fa';
import principalPhoto from '../assets/principal.jpeg';

const Administration = () => {
    const [activeTab, setActiveTab] = useState('bog');

    const bogData = [
        { sl: 1, name: "Dr. T I Eldho", designation: "Chairman", details: "Institute Chair Professor, Dept. of Civil Engineering, IIT Mumbai", contact: "eldho@civil.iitb.ac.in" },
        { sl: 2, name: "Sri. L L Ramachandran", designation: "Member", details: "Ex. General Manager (IS), Group Refinery BPCL, Cochin, ERP Advisor, IIM Kozhikode", contact: "Ramachandran.ll@gmail.com, 9446078193" },
        { sl: 3, name: "Dr. Nisha Kuruvilla", designation: "Secretary", details: "Principal, College of Engineering Adoor", contact: "principal@cea.ac.in, 8547005100" },
        { sl: 4, name: "Dr. Jayachandran E S", designation: "Member", details: "Professor, College of Engineering Adoor", contact: "jayan@cea.ac.in, 9495062864" },
        { sl: 5, name: "Dr. John George", designation: "Member", details: "Professor, College of Engineering Adoor", contact: "johngeorge@cea.ac.in, 9447895099" },
        { sl: 6, name: "Dr. P Suresh Kumar", designation: "Member", details: "Director, IHRD", contact: "director@ihrd.ac.in, 8547005003" },
        { sl: 7, name: "Dr. Vrinda V Nair", designation: "Member", details: "Director SPFU", contact: "spfu.teqip.kerala@gmail.com, 9447381186" },
        { sl: 8, name: "Dr. Shalij P R", designation: "Member", details: "Dean Research, KTU", contact: "deanresearch@ktu.edu.in, 9400995567" },
        { sl: 9, name: "Dr. Ramesh Unnikrishnan", designation: "Member", details: "AICTE Nominee", contact: "rameshtrivandrum@rediffmail.com, 9447246162" },
        { sl: 10, name: "Dr. K C Chandrasekharan Nair", designation: "Member", details: "CEO, Techno lodge, Trivandrum", contact: "kccnair@gmail.com, 9447111244" },
        { sl: 11, name: "Finance Department Secretary", designation: "Member", details: "Government Nominee", contact: "Government Nominee" },
        { sl: 12, name: "Higher Education Department Secretary", designation: "Member", details: "Government Nominee", contact: "Government Nominee" }
    ];

    const officeData = [
        { sl: 1, name: "Sarasan TN", designation: "Administrative Officer", contact: "8547042689, ao@cea.ac.in" },
        { sl: 2, name: "Smt. Sunitha Cherian", designation: "Senior Superintendent", contact: "9495143997" },
        { sl: 3, name: "Smt. Santhya Murali", designation: "Finance Section", contact: "9497615975" },
        { sl: 4, name: "Sri. Viswamohan V", designation: "Purchase Section", contact: "9497615975" },
        { sl: 5, name: "Smt. Ramlath Bevi", designation: "Academic Section", contact: "9447861713, academics@cea.ac.in" },
        { sl: 6, name: "Smt. Vidhya", designation: "KTU Portal", contact: "8289827372" },
        { sl: 7, name: "Sri. Baby John", designation: "HC", contact: "9447564197" },
        { sl: 8, name: "Smt. Mercy Alex", designation: "Establishment", contact: "8113834459" }
    ];

    const tabs = [
        { id: 'bog', label: 'Board of Governors', icon: <FaUserTie /> },
        { id: 'principal', label: 'Principal', icon: <FaChalkboardTeacher /> },
        { id: 'office', label: 'Office Administration', icon: <FaBuilding /> }
    ];

    return (
        <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-300">
            <Navbar />

            {/* Header Section */}
            <div className="bg-primary dark:bg-gray-900 py-16 px-6 transition-colors duration-300">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">Administration</h1>
                    <p className="text-blue-100 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Meet the leadership and administrative team dedicated to excellence at College of Engineering Adoor.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 -mt-8 mb-20">
                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md ${activeTab === tab.id
                                ? 'bg-secondary text-white transform scale-105'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Sections */}
                <div className="glass-card rounded-2xl p-6 md:p-10 min-h-[500px] transition-all duration-500 overflow-hidden">
                    {activeTab === 'bog' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-primary dark:text-accent mb-8 flex items-center gap-3 transition-colors">
                                <FaUserTie className="text-secondary" /> Board of Governors
                            </h2>
                            <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-800 text-primary dark:text-accent uppercase text-sm font-bold">
                                            <th className="px-6 py-4">Sl No</th>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Designation</th>
                                            <th className="px-6 py-4">Contact & Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-white/10 bg-white dark:bg-gray-900/50">
                                        {bogData.map((row) => (
                                            <tr key={row.sl} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">{row.sl}</td>
                                                <td className="px-6 py-4 font-bold text-gray-800 dark:text-white transition-colors">{row.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.designation === 'Chairman' ? 'bg-amber-100 text-amber-700' :
                                                        row.designation === 'Secretary' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                        }`}>
                                                        {row.designation}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                                                    <p className="font-medium text-primary/80 dark:text-accent/80 mb-1">{row.details}</p>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <FaEnvelope className="text-secondary" />
                                                        <span>{row.contact}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'principal' && (
                        <div className="animate-fade-in text-center py-12">
                            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/10 transition-colors">
                                <div className="md:flex">
                                    <div className="md:w-1/3 bg-primary dark:bg-gray-800 p-8 flex flex-col items-center justify-center text-white transition-colors">
                                        <div className="w-48 h-48 rounded-2xl bg-gray-200 dark:bg-gray-700 mb-6 overflow-hidden border-4 border-secondary/30 dark:border-accent/30 shadow-lg group relative">
                                            <img
                                                src={principalPhoto}
                                                alt="Dr. Nisha Kuruvilla"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div className="hidden w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                                                <FaChalkboardTeacher size={80} />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-1">Dr. Nisha Kuruvilla</h3>
                                        <p className="text-secondary dark:text-accent font-medium mb-4">Principal</p>
                                        <div className="w-full space-y-3 text-sm">
                                            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                                                <FaEnvelope className="text-secondary dark:text-accent" />
                                                <span>principal@cea.ac.in</span>
                                            </div>
                                            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                                                <FaPhone className="text-secondary dark:text-accent" />
                                                <span>+91 8547005100</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 p-10 text-left flex flex-col justify-center">
                                        <div className="mb-10">
                                            <h4 className="text-2xl font-bold text-primary dark:text-accent flex items-center gap-3 mb-6 transition-colors">
                                                <FaQuoteLeft className="text-secondary text-3xl opacity-50" />
                                                Message from the Principal
                                            </h4>
                                            <div className="bg-blue-50/50 dark:bg-gray-800/50 p-8 rounded-3xl border-l-8 border-secondary relative transition-colors">
                                                <p className="text-primary/90 dark:text-gray-200 font-medium italic text-lg leading-relaxed mb-4">
                                                    "Being the part of an organization clustering eighty plus educational institutions with serene vision, set to adapt the latest educational challenges with the motto 'Think globally acts locally' is our strength. Our alumni have proved their commitment by contributing to the industrial and commercial sector and supporting the society."
                                                </p>
                                                <p className="text-right font-bold text-primary dark:text-accent">- Dr. Nisha Kuruvilla</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-white/5 transition-colors">
                                                <h4 className="text-lg font-bold text-primary dark:text-secondary border-b-2 border-secondary dark:border-accent inline-block mb-3 transition-colors">Qualifications</h4>
                                                <p className="text-gray-500 dark:text-gray-400 italic text-sm">Information being collected...</p>
                                            </div>
                                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-white/5 transition-colors">
                                                <h4 className="text-lg font-bold text-primary dark:text-secondary border-b-2 border-secondary dark:border-accent inline-block mb-3 transition-colors">Experience</h4>
                                                <p className="text-gray-500 dark:text-gray-400 italic text-sm">Information being collected...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'office' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-primary dark:text-accent mb-8 flex items-center gap-3 transition-colors">
                                <FaBuilding className="text-secondary" /> Office Administration
                            </h2>
                            <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-800 text-primary dark:text-accent uppercase text-sm font-bold">
                                            <th className="px-6 py-4">Sl No</th>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Designation</th>
                                            <th className="px-6 py-4">Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-white/10 bg-white dark:bg-gray-900/50">
                                        {officeData.map((row) => (
                                            <tr key={row.sl} className="hover:bg-blue-50/30 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">{row.sl}</td>
                                                <td className="px-6 py-4 font-bold text-gray-800 dark:text-white transition-colors">{row.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold border dark:border-blue-800">
                                                        {row.designation}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <FaPhone className="text-secondary dark:text-accent" />
                                                        <span>{row.contact}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Administration;
