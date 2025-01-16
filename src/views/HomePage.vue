<template>
  <div>
    <h1>Welcome to Task Manager</h1>
    <TaskList />
    <router-link to="/about">Go to About Page</router-link>
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
