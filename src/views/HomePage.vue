<template>
  <div>
    <h1>Dobrodošli u TaskIt</h1>
    <TaskList />
    <router-link to="/about">O aplikaciji</router-link>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';

export default {
  name: 'HomePage',
  components: {
    TaskList,
  },
};
</script>
