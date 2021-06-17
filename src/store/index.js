import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: "Vuetify Todo",
    search: null,
    tasks: [
      { id: 1, title: "Vuex State works", done: false, dueDate: "2021-07-01" },
    ],
    snackbar: {
      show: false,
      text: "",
    },
    sorting: false,
  },
  mutations: {
    toggleSorting(state, value) {
      state.sorting = !value;
    },
    setSearch(state, value) {
      state.search = value;
    },
    addTask(state, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    closeSnackbar(state) {
      state.snackbar.show = false;
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
  },
  actions: {
    //Composing Snackbar with Title of added Task
    addTask({ commit }, newTaskTitle) {
      commit("addTask", newTaskTitle);
      commit("showSnackbar", `Task: '${newTaskTitle}' Added`);
    },
    //That kind of message could be a bit harder on delete so I'l leave it for now
    deleteTask({ commit }, id) {
      commit("deleteTask", id);
      commit("showSnackbar", "Task Deleted");
    },
    editTask({ commit }, payload) {
      commit("updateTaskTitle", payload);
      commit("showSnackbar", "Task updated!");
    },
    updateTaskDueDate({ commit }, payload) {
      commit("updateTaskDueDate", payload);
      commit("showSnackbar", "Due Date updated!");
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks;
      }
      return state.tasks.filter((task) =>
        task.title
          .toLocaleLowerCase()
          .includes(state.search.toLocaleLowerCase())
      );
    },
  },
});
