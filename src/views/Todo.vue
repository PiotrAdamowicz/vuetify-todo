<template>
  <div class="home">
    <add-task-input />
    <tasks-list v-if="$store.state.tasks.length" />
  </div>
</template>

<script>
export default {
  name: "Todo",

  components: {
    "add-task-input": require("../components/Todo/AddTaskInput.vue").default,
    "tasks-list": require("../components/Todo/TasksList.vue").default,
  },
};
</script>
