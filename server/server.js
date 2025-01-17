
const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/api/grades', async(req, res) => {
    try {
        console.log("A GET all request has arrived");
        const grades = await pool.query(
            "SELECT * FROM wadcourse"
        );
        res.json(grades.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/api/grades/:id', async (req, res) => {
    try {
        console.log(`A PUT request has arrived to update grade with ID ${req.params.id}`);
        const { id } = req.params;
        const { studentcode, studentlevel, hws, exam, examfeedback, final } = req.body;

        const updatedGrade = await pool.query(
            "UPDATE wadcourse SET studentcode = $1, studentlevel = $2, hws = $3, exam = $4, examfeedback = $5, final = $6 WHERE id = $7 RETURNING *",
            [studentcode, studentlevel, hws, exam, examfeedback, final, id]
        );

        if (updatedGrade.rowCount === 0) {
            return res.status(404).json({ error: "Grade not found" });
        }

        res.json(updatedGrade.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


