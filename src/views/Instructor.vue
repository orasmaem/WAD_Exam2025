<template>
  <div>
    <h1>Instructor Management Panel</h1>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>St. Code</th>
            <th>St. Level</th>
            <th>Homeworks</th>
            <th>Exam</th>
            <th>Exam feedback</th>
            <th>Final grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grade in grades" :key="grade.id">
            <td><input name="studentcode" type="text" id="studentcode" required v-model="grade.studentcode" readonly></td>
            <td><input name="studentlevel" type="text" id="studentlevel" required v-model="grade.studentlevel" readonly></td>
            <td><input name="hws" type="number" id="hws" required v-model="grade.hws" @input="updateFinalGrade(grade)"></td>
            <td>
              <input
                name="exam"
                type="number"
                id="exam"
                required
                v-model="grade.exam"
                @input="resetExamFeedback(grade)"
              />
            </td>
            <td><input name="examfeedback" type="textarea" id="examfeedback" required v-model="grade.examfeedback"></td>
            <td :class="'final-grade-cell'"><input name="final" type="number" id="final" required v-model="grade.final" readonly></td>
            <td><button @click="updateGrade(grade)">Update</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Instructor",
  data() {
    return {
      grades: [],
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/grades`)
        .then((response) => response.json())
        .then((data) => {
          this.grades = data.map((grade) => ({
            ...grade,
            final: grade.hws + grade.exam,
          }));
        })
        .catch((err) => console.log(err.message));
    },
    updateFinalGrade(grade) {
      grade.final = grade.hws + grade.exam; 
    },
    resetExamFeedback(grade) {
      grade.examfeedback = ""; 
      this.updateFinalGrade(grade); 
    },
    updateGrade(grade) {
      fetch(`http://localhost:3000/api/grades/${grade.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentcode: grade.studentcode,
          studentlevel: grade.studentlevel,
          hws: grade.hws,
          exam: grade.exam,
          examfeedback: grade.examfeedback,
          final: grade.final,
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Grade updated successfully!");
          } else {
            alert("Failed to update grade.");
          }
        })
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.fetchRecords();
  },
};
</script>

<style scoped>
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 80%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
}

input {
  width: 100px;
  text-align: center;
}

button {
  background-color: #7f8cfa;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #5a6bf1;
}

.final-grade-cell input {
  background-color: #d6d6f8;
  color: #1a202c;
  font-weight: bold;
  border: none;
}
</style>
