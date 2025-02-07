const sql = require("mssql");

const config = {
    server: "ZBC-S-6BN17\\SQLEXPRESS",
    database: "test",
    options: {
        trustServerCertificate: true,
        enableArithAbort: true
    },
    driver: "msnodesqlv8", // Brug Native driver til Windows Authentication
    authentication: {
        type: "default"
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log("Forbundet til SQL Server!");
    } catch (err) {
        console.error("Databaseforbindelsefejl:", err);
    }
}

connectDB();