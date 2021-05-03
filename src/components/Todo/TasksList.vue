<template>
  <v-list class="pt-0" flat>
    <task v-for="task in $store.state.tasks" :key="task.id" :task="task"></task>
  </v-list>
</template>

<script>
export default {
  components: {
    task: require("./Task.vue").default,
  },
};
</script>

<style lang="scss" scoped>
</style>