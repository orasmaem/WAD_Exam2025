<template>
  <div>
    <h3> Students grades </h3>

    <div class="container">
      <table>
        <thead>
          <tr>
            <th>St. Code</th>
            <th>St. Level</th>
            <th>Homeworks</th>
            <th>Exam</th>
            <th>Final grade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grade in grades" :key="grade.id">
            <td>{{ grade.studentcode }}</td>
            <td>{{ grade.studentlevel }}</td>
            <td>{{ grade.hws }}</td>
            <td>{{ grade.exam }}</td>
            <td :class="getResult(grade)" @click="showFeedback(grade.examfeedback)">
              {{ grade.final }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="selectedDescription" class="description-container">
        <p>
          <strong>Exam feedback:</strong> {{ selectedDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Students",
  data() {
    return {
      grades: [],
      selectedDescription: null, 
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/grades`)
        .then((response) => response.json())
        .then((data) => (this.grades = data))
        .catch((err) => console.log(err.message));
    },
    getResult(grade) {
      if (grade.hws <= 20 || grade.exam <= 20 || grade.final <= 50) {
        return "fail";
      }
      return "pass";
    },
    showFeedback(feedback) {
      this.selectedDescription = feedback; 
    },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  },
};
</script>

<style scoped>
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  background: #e9ecef;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

thead th {
  background: #4a5568;
  color: #ffffff;
  font-weight: bold;
  padding: 10px;
}

tbody td {
  background: #edf2f7;
  padding: 10px;
  border: 1px solid #cbd5e0;
}

.fail {
  background-color: #ff0000;
  color: white;
  font-weight: bold;
}

.pass {
  background-color: #35e07c;
  color: white;
  font-weight: bold;
}

.description-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #ff9efa; 
  color: #2d3748;
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}
</style>
