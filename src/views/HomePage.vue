<template>
  <div class="homepage-container">
    <h1 class="homepage-title">Dobrodošli u TaskIt</h1>
    <TaskList />
    <router-link to="/about" class="about-link">O aplikaciji</router-link>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";

export default {
  name: "HomePage",
  components: {
    TaskList,
  },
};
</script>

<style scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; 
  padding: 20px;
  font-family: Arial, sans-serif;
}
.homepage-title {
  font-size: 36px; 
  font-weight: bold;
  color: #2c3e50; 
  margin-bottom: 20px; 
}
.about-link {
  margin-top: 20px; 
  font-size: 18px;
  color: #3498db; 
  text-decoration: none;
  transition: color 0.3s;
}
.about-link:hover {
  color: #1abc9c;
}
</style>
