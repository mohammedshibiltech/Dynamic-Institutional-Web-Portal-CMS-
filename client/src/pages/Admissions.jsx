import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsTicker from '../components/NewsTicker';
import { FaGraduationCap, FaInfoCircle, FaUsers, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const Admissions = () => {
    const [activeTab, setActiveTab] = useState('btech');

    const tabs = [
        { id: 'btech', label: 'B.Tech' },
        { id: 'lateral', label: 'B.Tech Lateral Entry' },
        { id: 'bba', label: 'BBA' },
    ];

    const content = {
        btech: {
            title: "UG Courses (B.TECH)",
            intake: [
                { name: 'Electronics & Communication Engineering', intake: 60 },
                { name: 'Mechanical Engineering', intake: 60 },
                { name: 'Electrical & Electronics Engineering', intake: 60 },
                { name: 'Computer Science and Engineering', intake: 120 },
                { name: 'Computer Science and Engineering (Data Science)', intake: 60 },
            ],
            sections: [
                {
                    title: "Regulated Fee Merit Seats",
                    color: "primary",
                    icon: <FaMoneyBillWave />,
                    details: [
                        { label: "Allotment", text: "Managed by CEE, Govt. of Kerala (KEAM rank list)." },
                        { label: "Fees", text: "Rs. 40,000/- per annum" },
                        {
                            label: "Academic Eligibility",
                            text: (
                                <ul className="list-disc ml-4 mt-2 space-y-1">
                                    <li>50% in Math separately.</li>
                                    <li>50% aggregate in Math, Physics & Chemistry (MPC).</li>
                                    <li>Chemistry can be replaced by Computer Science &gt; Biotech &gt; Biology if not studied.</li>
                                    <li>SEBC: 5% relaxation (45% in Math/MPC).</li>
                                    <li>SC/ST: Pass in qualifying exam.</li>
                                </ul>
                            )
                        }
                    ]
                },
                {
                    title: "Merit Full Fee Seat",
                    color: "secondary",
                    icon: <FaMoneyBillWave />,
                    details: [
                        { label: "Allotment", text: "Managed by CEE, Govt. of Kerala (KEAM rank list)." },
                        { label: "Fees", text: "Rs. 65,000/- per annum" },
                        {
                            label: "Academic Eligibility",
                            text: (
                                <ul className="list-disc ml-4 mt-2 space-y-1">
                                    <li>45% aggregate in Math, Physics & Chemistry (MPC).</li>
                                </ul>
                            )
                        }
                    ]
                },
                {
                    title: "NRI Seat",
                    color: "accent",
                    icon: <FaUsers />,
                    details: [
                        { label: "Allotment", text: "Managed by IHRD. Candidates need not clear entrance exam." },
                        { label: "Fees", text: "Rs. 1,25,000/- (CS) / 1,00,000/- (others) per annum + one-time deposit." },
                        {
                            label: "Academic Eligibility",
                            text: (
                                <ul className="list-disc ml-4 mt-2 space-y-1">
                                    <li>Passed HS & eligible as per KEAM prospectus.</li>
                                    <li>Admission based on PCM marks.</li>
                                    <li>Apply via IHRD website (April-May).</li>
                                    <li>Must be child/ward/dependent of NRI + Declaration required.</li>
                                </ul>
                            )
                        }
                    ]
                }
            ]
        },
        lateral: {
            title: "B.Tech Lateral Entry",
            intake: [
                { name: 'All Engineering Branches', intake: "10% of sanctioned strength per course" },
            ],
            sections: [
                {
                    title: "Regulated Fee Merit Seats",
                    color: "primary",
                    icon: <FaMoneyBillWave />,
                    details: [
                        { label: "Allotment", text: "Managed by CEE, Govt. of Kerala (KEAM rank list)." },
                        { label: "Fees", text: "Rs. 40,000/- per annum" },
                        {
                            label: "Academic Eligibility",
                            text: (
                                <ul className="list-disc ml-4 mt-2 space-y-1">
                                    <li>50% in Math separately.</li>
                                    <li>50% aggregate in Math, Physics & Chemistry (MPC).</li>
                                    <li>Chemistry can be replaced by Computer Science &gt; Biotech &gt; Biology if not studied.</li>
                                    <li>SEBC: 5% relaxation (45% in Math/MPC).</li>
                                    <li>SC/ST: Pass in qualifying exam.</li>
                                    <li className="font-bold text-primary italic">Must have passed 3-year Engineering Diploma.</li>
                                </ul>
                            )
                        }
                    ]
                },
                {
                    title: "Admission Criteria",
                    color: "secondary",
                    icon: <FaGraduationCap />,
                    details: [
                        { label: "Direct Entry", text: "Admission directly to the 3rd semester (second year)." },
                        { label: "Entrance Exam", text: "Conducted by DTE / LBS Centre / CEE Kerala." },
                        { label: "Links", text: "Visit cee-kerala.org or lbscentre.kerala.gov.in" }
                    ]
                }
            ]
        },
        bba: {
            title: "BBA (Bachelor of Business Administration)",
            intake: [
                { name: 'Business Administration', intake: 60 },
            ],
            sections: [
                {
                    title: "General Information",
                    color: "secondary",
                    icon: <FaInfoCircle />,
                    details: [
                        { label: "Admission", text: "Based on marks obtained in qualifying examination (Higher Secondary)." },
                        { label: "Eligibility", text: "A pass in Plus Two or equivalent examination." },
                        { label: "Fees", text: "Contact office for updated fee structure." }
                    ]
                }
            ]
        }
    };

    const activeContent = content[activeTab];

    return (
        <div className="flex flex-col min-h-screen bg-light dark:bg-dark transition-colors duration-300">
            <Header />
            <Navbar />

            <main className="flex-grow">
                <NewsTicker />

                {/* Hero Section */}
                <section className="relative py-16 md:py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 dark:bg-accent/5 -skew-y-3 origin-top-left -z-10 transition-colors"></div>
                    <div className="container mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent font-semibold text-sm mb-6 animate-fade-in transition-colors">
                            <FaGraduationCap /> Admissions 2024-25
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-white mb-6 tracking-tight transition-colors">
                            Build Your Future <span className="text-secondary dark:text-accent">At CE Adoor</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors">
                            Join a community of innovators and achievers. Explore our diverse engineering and business programs designed to propel your career.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-6 pb-20">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform ${activeTab === tab.id
                                    ? 'bg-primary dark:bg-accent text-white dark:text-dark shadow-lg scale-105'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Left Column: General Info & Intake */}
                        <div className="lg:col-span-7 space-y-10">
                            {/* Admission Info */}
                            <div className="glass-card p-8 rounded-3xl animate-slide-up">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-2xl bg-secondary/10 dark:bg-accent/10 text-secondary dark:text-accent text-2xl transition-colors">
                                        <FaInfoCircle />
                                    </div>
                                    <h2 className="text-2xl font-bold text-dark dark:text-white transition-colors">Admission Information</h2>
                                </div>
                                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
                                    {activeTab === 'btech' ? (
                                        <>
                                            <p>
                                                Admission to UG programmes except in NRI seats is on the basis of the
                                                <strong> Kerala Common Entrance Examination</strong>, conducted by the Commissioner for Entrance Examinations (CEE), Govt. of Kerala.
                                            </p>
                                            <p className="bg-primary/5 dark:bg-gray-800/50 p-4 rounded-xl border-l-4 border-primary dark:border-accent italic transition-colors">
                                                The criteria for B.Tech degree admission is prescribed by the CEE, Govt. of Kerala and concerned university, and is issued every year by Govt. of Kerala through common prospectus.
                                            </p>
                                            <div className="pt-4">
                                                <a href="http://cee-kerala.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary dark:text-accent font-semibold hover:underline transition-colors">
                                                    Visit cee-kerala.org for more details <FaCheckCircle className="text-sm" />
                                                </a>
                                            </div>
                                        </>
                                    ) : activeTab === 'lateral' ? (
                                        <>
                                            <p>
                                                Admission to B.Tech Lateral Entry programs (directly to third sem course) is on the basis of the entrance examination conducted by <strong>Directorate of Technical Education</strong> or agency entrusted by Govt of Kerala.
                                            </p>
                                            <p className="bg-primary/5 dark:bg-gray-800/50 p-4 rounded-xl border-l-4 border-primary dark:border-accent italic transition-colors">
                                                Presently conducted by LBS Centre for Science and Technology Thiruvananthapuram / CEE Kerala. The candidate must have passed three year engineering diploma conducted by DTE or equivalent agency.
                                            </p>
                                            <ul className="list-disc ml-6 space-y-2">
                                                <li>Number of seats: 10% of sanctioned strength for each course.</li>
                                                <li>Admission to 3rd semester directly.</li>
                                            </ul>
                                            <div className="pt-4 flex flex-wrap gap-4">
                                                <a href="http://cee-kerala.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary dark:text-accent font-semibold hover:underline transition-colors">
                                                    cee-kerala.org <FaCheckCircle className="text-sm" />
                                                </a>
                                                <a href="http://lbscentre.kerala.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary dark:text-accent font-semibold hover:underline transition-colors">
                                                    lbscentre.kerala.gov.in <FaCheckCircle className="text-sm" />
                                                </a>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p>
                                                Admission to the <strong>Bachelor of Business Administration (BBA)</strong> program is based on the merit of marks obtained in the qualifying examination.
                                            </p>
                                            <p className="bg-primary/5 dark:bg-gray-800/50 p-4 rounded-xl border-l-4 border-primary dark:border-accent italic transition-colors">
                                                Candidates must have passed Plus Two or equivalent examination from a recognized board.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Intake Table */}
                            <div className="glass-card p-8 rounded-3xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-accent/10 text-accent dark:text-accent text-2xl transition-colors">
                                        <FaUsers />
                                    </div>
                                    <h2 className="text-2xl font-bold text-dark dark:text-white transition-colors">{activeContent.title} Intake</h2>
                                </div>
                                <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm transition-colors">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-primary dark:bg-secondary text-white transition-colors">
                                                <th className="py-4 px-6 font-semibold">PROGRAMS</th>
                                                <th className="py-4 px-6 font-semibold text-center">INTAKE</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-white/10 bg-white dark:bg-gray-900/50">
                                            {activeContent.intake.map((course, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                    <td className="py-4 px-6 font-medium text-gray-700 dark:text-gray-300">{course.name}</td>
                                                    <td className="py-4 px-6 text-center text-primary dark:text-accent font-bold">{course.intake}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Fee Categories / Details */}
                        <div className="lg:col-span-5 space-y-8">
                            {activeContent.sections.map((section, sidx) => (
                                <div
                                    key={sidx}
                                    className={`relative group overflow-hidden glass-card p-8 rounded-3xl border border-${section.color}/10 hover:border-${section.color}/30 transition-all duration-500 animate-slide-up dark:bg-gray-800/40`}
                                    style={{ animationDelay: `${0.2 + sidx * 0.1}s` }}
                                >
                                    <div className={`absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity text-6xl text-${section.color}`}>
                                        {section.icon}
                                    </div>
                                    <h3 className={`text-xl font-bold text-${section.color} mb-6 flex items-center gap-3`}>
                                        <span className={`w-2 h-8 bg-${section.color} rounded-full`}></span>
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-4">
                                        {section.details.map((detail, didx) => (
                                            <li key={didx} className="flex gap-3">
                                                <div className="mt-1.5"><div className={`w-2 h-2 rounded-full bg-${section.color}`}></div></div>
                                                <div className="text-gray-700 dark:text-gray-300 text-sm transition-colors">
                                                    <p className="font-bold mb-1">{detail.label}:</p>
                                                    <div>{detail.text}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.8s ease-out forwards; opacity: 0; }
            `}} />
        </div>
    );
};

export default Admissions;
