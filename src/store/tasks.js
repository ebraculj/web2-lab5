import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      // Simulacija dohvaćanja zadataka s backenda
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve([{ id: 1, text: 'Prvi zadatak', completed: false }]), 1000)
      );
      this.tasks = response;
    },
    addTask(task) {
      this.tasks.push({ id: Date.now(), text: task, completed: false });
    },
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});
