import { defineStore } from "pinia";
import { db } from "@/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
  }),  
  actions: {
    async fetchTasks() {
      try {
        const taskCollection = collection(db, "tasks");
        const taskSnapshot = await getDocs(taskCollection);
        this.tasks = taskSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Greška prilikom dohvaćanja zadataka:", error);
      }
    },
    async addTask(task) {
      try {
        const taskCollection = collection(db, "tasks");
        const docRef = await addDoc(taskCollection, task);
        this.tasks.push({ id: docRef.id, ...task });
      } catch (error) {
        console.error("Greška prilikom dodavanja zadatka:", error);
      }
    },
    async updateTaskStatus(taskId, newStatus) {
      try {
        const taskDoc = doc(db, "tasks", taskId);
        await updateDoc(taskDoc, { status: newStatus });
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) task.status = newStatus;
      } catch (error) {
        console.error("Greška prilikom ažuriranja statusa zadatka:", error);
      }
    },
  },
});
