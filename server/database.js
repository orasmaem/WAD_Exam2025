const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "sql", // Enter your password here
    database: "testWAD", //Try to use the same name for your database
    host: "localhost",
    port: "5432"
});

const execute = async(createTblQuery, insertDataQuery) => {
    try {
        await pool.connect();
        await pool.query(createTblQuery);
        await pool.query(insertDataQuery);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery = ` 
    CREATE TABLE IF NOT EXISTS "wadcourse" (
        "id" SERIAL PRIMARY KEY, 
        "studentcode" VARCHAR(200) NOT NULL,
        "studentlevel" VARCHAR(200) NOT NULL,
        "hws" integer,
        "exam" integer,
        "examfeedback" VARCHAR(200) NOT NULL, 
        "final" integer
        );`;

const insertDataQuery = `WITH data (studentcode, studentlevel, hws, exam, examfeedback, final) AS 
    (
    VALUES
        ('C001', 'BA',  20, 40, '-30 in HWs and -10 in exam', 60),
        ('C002', 'MA',  22, 45, '-28 in HWs and  -5 in exam', 77),
        ('B001', 'BA',  12, 15, '-38 in HWs and -35 in exam', 27),
        ('C003', 'PHD', 50, 50, ' -0 in HWs and  -0 in exam', 100),
        ('B002', 'BA',  22, 18, '-28 in HWs and -32 in exam', 40)
    )

    
    INSERT INTO wadcourse(studentcode, studentlevel, hws, exam, examfeedback, final) 
    SELECT  d.studentcode, d.studentlevel, d.hws,  d.exam, d.examfeedback, d.final
    FROM data d
    WHERE NOT EXISTS (SELECT * FROM wadcourse WHERE id = 1);
`

execute(createTblQuery, insertDataQuery).then(result => {
    if (result) {
        console.log('If does not exists, table "wadcourse" is created');
    }
});

module.exports = pool;