import { FaUsers, FaGlobe, FaLightbulb, FaCog, FaCar, FaLaptopCode, FaMicrochip, FaChargingStation, FaComments, FaMusic, FaWalking, FaFilm, FaBasketballBall, FaPalette } from 'react-icons/fa';

export const activitiesData = {
    majorActivities: [
        {
            id: 'nss',
            title: 'National Service Scheme (NSS)',
            icon: <FaUsers />,
            color: 'from-blue-600 to-blue-400',
            content: 'Content will be added later.',
            image: 'https://images.unsplash.com/photo-1559027615-cd26712423ca?auto=format&fit=crop&q=80&w=800',
            subActivities: []
        },
        {
            id: 'ieee',
            title: 'IEEE Student Branch',
            icon: <FaGlobe />,
            color: 'from-sky-700 to-sky-500',
            content: 'Content will be added later.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
            subActivities: []
        },
        {
            id: 'iedc',
            title: 'IEDC (Innovation and Entrepreneurship Development Centre)',
            icon: <FaLightbulb />,
            color: 'from-amber-500 to-yellow-400',
            content: 'Content will be added later.',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
            subActivities: []
        },
        {
            id: 'asme',
            title: 'ASME (American Society of Mechanical Engineers)',
            icon: <FaCog />,
            color: 'from-red-600 to-red-400',
            content: 'Content will be added later.',
            image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800',
            subActivities: []
        },
        {
            id: 'sae-cea',
            title: 'SAE CEA',
            icon: <FaCar />,
            color: 'from-slate-700 to-slate-500',
            content: 'Content will be added later.',
            image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=800',
            subActivities: [
                { id: 'aagneya', title: 'AAGNEYA', content: 'Content for AAGNEYA will be added later.' },
                { id: 'astra', title: 'ASTRA', content: 'Content for ASTRA will be added later.' }
            ]
        }
    ],
    departmentClubs: [
        {
            id: 'trace',
            title: 'TRACE',
            icon: <FaLaptopCode />,
            color: 'from-indigo-600 to-purple-500',
            content: 'Content will be added later.',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'eesa',
            title: 'EESA',
            icon: <FaChargingStation />,
            color: 'from-green-600 to-emerald-500',
            content: 'Content will be added later.',
            image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'pulse',
            title: 'PULSE',
            icon: <FaMicrochip />,
            color: 'from-rose-600 to-pink-500',
            content: 'Content will be added later.',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'forum',
            title: 'FORUM',
            icon: <FaComments />,
            color: 'from-violet-600 to-fuchsia-500',
            content: 'Content will be added later.',
            image: 'https://images.unsplash.com/photo-1475721027187-4024733923f6?auto=format&fit=crop&q=80&w=800'
        }
    ],
    studentClubs: [
        { id: 'pranah', title: 'Pranah (Music Club)', icon: <FaMusic />, color: 'from-pink-500 to-rose-400' },
        { id: 'atharva', title: 'Atharva (Dance Club)', icon: <FaWalking />, color: 'from-orange-500 to-amber-400' },
        { id: 'navarasa', title: 'Navarasa (Film Club)', icon: <FaFilm />, color: 'from-blue-500 to-sky-400' },
        { id: 'sports', title: 'Sports Club', icon: <FaBasketballBall />, color: 'from-green-500 to-emerald-400' },
        { id: 'arts', title: 'Arts Club', icon: <FaPalette />, color: 'from-purple-500 to-violet-400' }
    ]
};
