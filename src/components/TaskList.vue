<template>
  <div class="task-list">
    <h2>Task List</h2>
    <ul>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />
    </ul>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  name: 'TaskList',
  components: {
    TaskItem,
  },
  data() {
    return {
      tasks: [
        { id: 1, title: 'Learn Vue.js', status: 'pending' },
        { id: 2, title: 'Complete the project', status: 'in progress' },
        { id: 3, title: 'Review the code', status: 'completed' },
      ],
    };
  },
};
</script>

<style scoped>
.task-list {
  margin: 20px;
}
</style>
