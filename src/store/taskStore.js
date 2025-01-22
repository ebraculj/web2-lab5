import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    toggleTaskStatus(taskId) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        if (task.status === "na čekanju") {
          task.status = "u tijeku";
        } else if (task.status === "u tijeku") {
          task.status = "završeno";
        } else {
          task.status = "na čekanju";
        }
      }
    },
    async fetchTasks() {
      if (this.tasks.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulacija kašnjenja
        this.tasks = [
          { id: 1, title: "Predati projekt", status: "na čekanju" },
          { id: 2, title: "Obnoviti putovnicu", status: "u tijeku" },
          { id: 3, title: "Odnijeti odijelo na kemijsko čišćenje", status: "završeno" },
        ];
      }
    },
  },
});
