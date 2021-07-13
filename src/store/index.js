import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";

let db = new Localbase("db");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: "Vuetify Todo",
    search: null,
    tasks: [
      // { id: 1, title: "Vuex State works", done: false, dueDate: "2021-07-01" },
      // {
      //   id: 2,
      //   title: "So iShould eat banana",
      //   done: false,
      //   dueDate: "2021-08-01",
      // },
      // {
      //   id: 3,
      //   title: "Why is this banana not eaten?",
      //   done: false,
      //   dueDate: "2021-08-02",
      // },
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
    addTask(state, newTask) {
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
      console.log(payload);
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
      console.log("this works too");
    },
  },
  actions: {
    //Composing Snackbar with Title of added Task
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      db.collection("tasks")
        .add(newTask)
        .then(() => {
          commit("addTask", newTask);
          commit("showSnackbar", `Task: '${newTaskTitle}' Added`);
        });
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      db.collection("tasks")
        .doc({ id: id })
        .update({
          done: task.done,
        })
        .then(() => {
          commit("doneTask", id);
        });
    },
    //That kind of message could be a bit harder on delete so I'l leave it for now
    deleteTask({ commit }, id) {
      db.collection("tasks")
        .doc({ id })
        .delete()
        .then(() => {
          commit("deleteTask", id);
          commit("showSnackbar", "Task Deleted");
        });
    },
    editTask({ commit }, payload) {
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({ title: payload.title })
        .then(() => {
          commit("updateTaskTitle", payload);
          commit("showSnackbar", "Task updated!");
        });
    },
    updateTaskDueDate({ commit }, payload) {
      console.log(payload);
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({ dueDate: payload.dueDate })
        .then(() => {
          commit("updateTaskDueDate", payload);
          commit("showSnackbar", "Due Date updated!");
        });
    },
    getTasks({ commit }) {
      db.collection("tasks")
        .get()
        .then((tasks) => {
          commit("setTasks", tasks);
          console.log("works", tasks);
        });
    },
    setTasks({ commit }, tasks) {
      db.collection("tasks").set(tasks);
      commit("setTasks", tasks);
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
