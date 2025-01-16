<template>
  <li class="task-item" @click="$emit('toggle-status', task.id)">
    <span>{{ task.title }} ({{ task.status }})</span>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.task-item {
  list-style: none;
  padding: 5px 0;
  cursor: pointer;
}
.task-item:hover {
  text-decoration: underline;
}
</style>
