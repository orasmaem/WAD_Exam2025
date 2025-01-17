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
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-for="grade in grades" :key="grade.id">
            <td><input name="studentcode" type="text" id="studentcode" required v-model="grade.studentcode" readonly /></td>
            <td><input name="studentlevel" type="text" id="studentlevel" required v-model="grade.studentlevel" readonly /></td>
            <td><input name="hws" type="number" id="hws" required v-model="grade.hws" @input="updateFinalGrade(grade)" /></td>
            <td><input name="exam" type="number" id="exam" required v-model="grade.exam" @input="updateFinalGrade(grade)" /></td>
            <td><input name="examfeedback" type="textarea" id="examfeedback" required v-model="grade.examfeedback" /></td>
            <td><input name="final" type="number" id="final" required v-model="grade.final" readonly class="final-grade" /></td>
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

.final-grade {
  background-color: #d6d6f8;
  color: #1a202c;
  font-weight: bold;
}
</style>
