<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Naslovnica</router-link>
      <router-link to="/about" class="nav-link">O aplikaciji</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3498db;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  margin: 0 15px; 
  transition: color 0.3s;
}

.nav-link:hover {
  color: #f1c40f; 
}

.nav-link.router-link-active {
  border-bottom: 2px solid #f1c40f;
}
</style>
