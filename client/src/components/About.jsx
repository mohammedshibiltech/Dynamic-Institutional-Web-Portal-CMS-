import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBullseye, FaEye } from 'react-icons/fa';

const About = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const fullContent = (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p className="text-white/90 text-lg leading-relaxed mb-4 text-justify">
                The College of Engineering, Adoor, was set up in October 1995 by the Institute of Human Resource Development (IHRD), a Government of Kerala undertaking. Admissions are carried out on the basis of the ranks obtained in the All Kerala Common Entrance Examinations, conducted by the Controller of Entrance Examinations, Government of Kerala. CEA is a center of academic excellence that provides undergraduate studies to about 1000 students in four disciplines. It imparts technical education and training in the fields of Computer Science Engineering, Electronics and Communication Engineering, Electrical and Electronics Engineering and Mechanical Engineering. The college is affiliated to APJ Abdul Kalam Technological University (KTU) known internationally for its academic excellence. CEA is recognized by the All India Council for Technical Education, New Delhi.
            </p>
            <p className="text-white/90 text-lg leading-relaxed text-justify">
                The college is magnificently spread up in 12.7acres of scenic paradise. The College has excellent infrastructure facilities, which includes an exhaustive central library, department libraries, well equipped laboratories and workshop. CEA also has a modern computer centre with high speed internet connection. The college’s power requirement is catered by the 11kV substation by a stand by 75kW generator. Since the very first year of inception, CEA has achieved many a milestone both in academic and co-curricular pursuits. It has always provided an able platform for the students to turn into excellent engineers paving the path for a successful career.
            </p>
        </motion.div>
    );

    const checkContent = (
        <p className="text-white/90 text-lg leading-relaxed mb-4 text-justify">
            The College of Engineering, Adoor, was set up in October 1995 by the Institute of Human Resource Development (IHRD), a Government of Kerala undertaking. Admissions are carried out on the basis of the ranks obtained in the All Kerala Common Entrance Examinations, conducted by the Controller of Entrance Examinations, Government of Kerala. CEA is a center of academic excellence that provides undergraduate studies to about 1000 students in four disciplines...
        </p>
    );

    return (
        <section className="relative py-20 min-h-[600px] flex items-center overflow-hidden">
            {/* Background Image with Parallax effect and Overlay */}
            <div
                className="absolute inset-0 z-0 scale-110"
                style={{
                    backgroundImage: 'url("/assets/college-bg.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* About Us Glass Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[40px] shadow-2xl p-8 md:p-12 mb-16 max-w-5xl mx-auto overflow-hidden group hover:bg-white/15 transition-all duration-500"
                >
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 text-center tracking-tight">
                        About <span className="text-primary">CEA</span>
                    </h2>

                    <div className="relative z-10">
                        <AnimatePresence mode="wait">
                            {isExpanded ? fullContent : checkContent}
                        </AnimatePresence>
                    </div>

                    <div className="text-center mt-8 relative z-10">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-all shadow-lg hover:shadow-primary/40 transform hover:-translate-y-1"
                        >
                            {isExpanded ? 'Show Less' : 'Explore Detailed Story'}
                        </button>
                    </div>
                </motion.div>

                {/* Mission & Vision Glass Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -10 }}
                        viewport={{ once: true }}
                        className="backdrop-blur-xl bg-primary/20 border border-white/20 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group min-h-[300px] flex flex-col items-center justify-center"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-black select-none">M</div>
                        <h3 className="text-3xl font-black text-white mb-6 z-10 flex items-center gap-3">
                            <span className="w-12 h-12 bg-primary/30 rounded-2xl flex items-center justify-center text-primary text-xl shadow-lg border border-white/20">
                                <FaBullseye />
                            </span>
                            Mission
                        </h3>
                        <div className="text-white/80 z-10 leading-relaxed text-left">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                                    To provide quality education and foster research and development in the field of engineering.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                                    To encourage innovation and entrepreneurship for the betterment of society.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                                    To develop professional and leadership skills and encourage lifelong learning.
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -10 }}
                        viewport={{ once: true }}
                        className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group min-h-[300px] flex flex-col items-center justify-center text-center"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-black select-none">V</div>
                        <h3 className="text-3xl font-black text-white mb-6 z-10 flex items-center gap-3">
                            <span className="w-12 h-12 bg-secondary/30 rounded-2xl flex items-center justify-center text-secondary text-xl shadow-lg border border-white/20">
                                <FaEye />
                            </span>
                            Vision
                        </h3>
                        <p className="text-2xl font-medium text-white/90 z-10 italic leading-relaxed px-4">
                            “Develop into a premier institution, creating socially committed and globally competent engineering professionals.”
                        </p>
                        <div className="mt-8 w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
