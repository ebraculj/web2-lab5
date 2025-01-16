<template>
  <div class="task-list">
    <h2>Task List (Total: {{ tasks.length }})</h2>

    <form @submit.prevent="addTask">
      <input
        type="text"
        v-model="newTaskTitle"
        placeholder="Enter new task"
        required
      />
      <select v-model="newTaskStatus">
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>

    <!-- Filter Options -->
    <div>
      <label>
        <input
          type="radio"
          value="all"
          v-model="filter"
        />
        All
      </label>
      <label>
        <input
          type="radio"
          value="pending"
          v-model="filter"
        />
        Pending
      </label>
      <label>
        <input
          type="radio"
          value="in progress"
          v-model="filter"
        />
        In Progress
      </label>
      <label>
        <input
          type="radio"
          value="completed"
          v-model="filter"
        />
        Completed
      </label>
    </div>

    <ul>
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-status="toggleTaskStatus"
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
      newTaskTitle: '',
      newTaskStatus: 'pending',
      filter: 'all', // Filter status
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === 'all') {
        return this.tasks;
      }
      return this.tasks.filter((task) => task.status === this.filter);
    },
  },
  methods: {
    addTask() {
      const newTask = {
        id: this.tasks.length + 1,
        title: this.newTaskTitle,
        status: this.newTaskStatus,
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
      this.newTaskStatus = 'pending';
    },
    toggleTaskStatus(taskId) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status =
          task.status === 'pending'
            ? 'in progress'
            : task.status === 'in progress'
            ? 'completed'
            : 'pending';
      }
    },
  },
};
</script>
