<template>
  <v-row justify="center">
    <v-dialog :value="true" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"> EDIT task</v-card-title>
        <v-card-text
          >Edit the title of this task:
          <v-text-field v-model="taskTitle" @keyup.enter="saveTask" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="$emit('close')"
            @keyup.esc="$emit('close')"
          >
            Cancle
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="saveTask"
            :disabled="taskTitleInvalid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      taskTitle: null,
    };
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle || this.taskTitle === this.task.title;
    },
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        let paylode = {
          id: this.task.id,
          title: this.taskTitle,
        };
        this.$store.dispatch("editTask", paylode);
        this.$emit("close");
      }
    },
  },
  mounted() {
    this.taskTitle = this.task.title;
  },
};
</script>

<style lang="scss" scoped>
</style>