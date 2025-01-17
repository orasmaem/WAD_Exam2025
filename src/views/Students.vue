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
            <td>{{ grade.final }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Students",
  data() {
    return {
      grades: [],
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/grades`)
        .then((response) => response.json())
        .then((data) => (this.grades = data))
        .catch((err) => console.log(err.message));
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
  justify-content: center;
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




</style>
