<template>
  <li class="task-item">
    <span>{{ task.title }}</span>
    <small>({{ task.status }})</small>
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
}
</style>
