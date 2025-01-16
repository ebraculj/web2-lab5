<template>
  <div id="app">
    <nav>
      <router-link to="/">Naslovnica</router-link> |
      <router-link to="/about">O aplikaciji</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
</style>
