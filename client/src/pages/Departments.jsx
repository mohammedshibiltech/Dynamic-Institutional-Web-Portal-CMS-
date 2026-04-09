import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsTicker from '../components/NewsTicker';
import { useNavigate } from 'react-router-dom';
import { FaTools, FaMicrochip, FaLightbulb, FaDesktop, FaDatabase, FaAtom } from 'react-icons/fa';

const Departments = () => {
    const navigate = useNavigate();
    const departments = [
        {
            id: "mechanical-engineering",
            name: "Department Of Mechanical Engineering",
            icon: <FaTools />,
            color: "from-blue-500 to-cyan-400"
        },
        {
            id: "electronics-communication",
            name: "Department Of Electronics & Communication Engineering",
            icon: <FaMicrochip />,
            color: "from-indigo-500 to-purple-400"
        },
        {
            id: "electrical-electronics",
            name: "Department Of Electrical & Electronics Engineering",
            icon: <FaLightbulb />,
            color: "from-yellow-400 to-orange-400"
        },
        {
            id: "computer-science",
            name: "Department Of Computer Science Engineering",
            icon: <FaDesktop />,
            color: "from-primary to-secondary"
        },
        {
            id: "data-science",
            name: "Department Of Computer Science Engineering - (Data Science)",
            icon: <FaDatabase />,
            color: "from-emerald-500 to-teal-400"
        },
        {
            id: "applied-science",
            name: "Department Of Applied Science",
            icon: <FaAtom />,
            color: "from-rose-500 to-pink-400"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-light dark:bg-dark transition-colors duration-300">
            <Header />
            <Navbar />
            <NewsTicker />

            <main className="flex-grow py-16 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-accent mb-4 tracking-tight transition-colors">
                            Our Departments
                        </h1>
                        <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed transition-colors">
                            Discover our center for academic excellence and innovation across various engineering and science disciplines.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {departments.map((dept, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/department/${dept.id}`)}
                                className="group relative flex flex-col items-center p-8 rounded-[32px] transition-all duration-500 hover:-translate-y-2 cursor-pointer glass-card overflow-hidden"
                            >
                                {/* Decorative Glow */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${dept.color} blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>

                                {/* Icon Container */}
                                <div className={`relative mb-8 p-6 rounded-3xl bg-gradient-to-br ${dept.color} text-white text-5xl shadow-lg ring-8 ring-white/30 dark:ring-white/5 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                    {dept.icon}
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-dark dark:text-light text-center leading-snug group-hover:text-primary dark:group-hover:text-accent transition-colors duration-300">
                                    {dept.name}
                                </h3>

                                {/* Bottom Accent */}
                                <div className="mt-8 flex gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-300"></span>
                                    <span className="w-8 h-2 rounded-full bg-primary/10 group-hover:bg-primary/40 transition-colors duration-300"></span>
                                    <span className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-300"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Departments;
