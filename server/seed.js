const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const seed = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'college_db'
        });

        console.log('Connected to database.');

        // Check if admin exists
        const [rows] = await connection.execute('SELECT * FROM admins WHERE email = ?', ['admin@college.edu']);

        if (rows.length === 0) {
            const password = 'admin';
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            await connection.execute('INSERT INTO admins (email, password) VALUES (?, ?)', ['admin@college.edu', hash]);
            console.log('Admin user created successfully.');
            console.log('Email: admin@college.edu');
            console.log('Password: admin');
        } else {
            console.log('Admin user already exists.');
        }

        await connection.end();
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seed();
