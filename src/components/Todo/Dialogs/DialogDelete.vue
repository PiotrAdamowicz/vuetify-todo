<template>
  <v-row justify="center">
    <v-dialog :value="true" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"> DELETE this task?</v-card-title>
        <v-card-text>Are you sure you want to delete this task?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('close')">
            Cancle
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="$store.dispatch('deleteTask', task.id)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["task"],
};
</script>

<style lang="scss" scoped>
</style>