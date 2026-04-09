const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const migrate = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'college_db'
        });

        console.log('Connected to database for migration.');

        // Create placement_slides table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS placement_slides (
                id INT AUTO_INCREMENT PRIMARY KEY,
                image_url VARCHAR(255) NOT NULL,
                title VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Table placement_slides created or already exists.');

        // Seed initial images from uploads/placement
        const initialImages = [
            'CGPU1-min-2048x1538.jpg',
            'CGPU3-min-2048x1538.jpg',
            'placementresult1.jpeg',
            'placementresult2.jpeg',
            'placementresult3.jpeg',
            'placementresult4.jpeg',
            'placementresult5.jpeg'
        ];

        const [existing] = await connection.execute('SELECT COUNT(*) as count FROM placement_slides');
        if (existing[0].count === 0) {
            for (const img of initialImages) {
                const url = `http://localhost:5000/uploads/placement/${img}`;
                await connection.execute('INSERT INTO placement_slides (image_url, title) VALUES (?, ?)', [url, img]);
            }
            console.log('Initial placement slides seeded.');
        } else {
            console.log('Placement slides already seeded.');
        }

        await connection.end();
        console.log('Migration completed.');
        process.exit();
    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
};

migrate();
