const pool = require('./config/db');

pool.query('SELECT * FROM queries', (err, results) => {
    if (err) {
        console.error('Error querying queries table:', err.message);
        process.exit(1);
    }
    console.log('Queries Table Content:');
    console.log(JSON.stringify(results, null, 2));

    pool.query('SHOW TABLES', (err2, tables) => {
        if (err2) {
            console.error('Error showing tables:', err2.message);
            process.exit(1);
        }
        console.log('Tables in database:');
        console.log(JSON.stringify(tables, null, 2));
        process.exit(0);
    });
});
