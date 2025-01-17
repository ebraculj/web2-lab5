<template>
  <li>
    <span :style="{ textDecoration: task.status === 'završeno' ? 'line-through' : 'none' }">
      {{ task.title }} ({{ task.status }})
    </span>
    <button @click="$emit('toggle-status', task.id)">
      {{ task.status === "na čekanju" ? "Označi kao u tijeku" : task.status === "u tijeku" ? "Označi kao završeno" : "Označi kao na čekanju" }}
    </button>
  </li>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}
</style>
