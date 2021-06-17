<template>
  <div class="home">
    <add-task-input />
    <tasks-list v-if="$store.state.tasks.length" />
    <no-tasks v-else />
    <button-done-sorting v-if="$store.state.sorting" />
  </div>
</template>

<script>
export default {
  name: "Todo",
  components: {
    "add-task-input": require("../components/Todo/AddTaskInput.vue").default,
    "tasks-list": require("../components/Todo/TasksList.vue").default,
    "no-tasks": require("../components/Todo/NoTasks.vue").default,
    "button-done-sorting": require("../components/Todo/ButtonDoneSorting.vue")
      .default,
  },
};
</script>
