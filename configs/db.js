const sql = require('mssql/msnodesqlv8');

const config = {
    server: 'localhost',       // or .\SQLEXPRESS if needed
    database: 'EXAT',
    driver: 'msnodesqlv8',     // must use this driver
    options: {
        trustedConnection: true // uses current Windows user (asus)
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server (Windows Auth)');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed!', err));

module.exports = { sql, poolPromise };
