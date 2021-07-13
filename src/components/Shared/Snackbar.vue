<template>
  <v-snackbar v-model="$store.state.snackbar.show">
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="closeSnackbar"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data() {
    return {
      text: "works for now",
    };
  },
  methods: {
    closeSnackbar() {
      this.$store.commit("closeSnackbar");
    },
  },
};
</script>

<style lang="scss" scoped>
div.v-snack:not(.v-snack--absolute) {
  height: 100%;
}
</style>