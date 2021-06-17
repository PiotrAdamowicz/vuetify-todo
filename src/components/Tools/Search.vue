<template>
  <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    class="expanding-search mt-2"
    :class="{ closed: searchClosed && !$store.state.search }"
    dense
    clearable
    prepend-inner-icon="mdi-magnify"
    placeholder="Search"
    filled
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      search: null,
      searchClosed: true,
    };
  },
};
</script>

<style lang="scss">
.expanding-search {
  transition: max-width 0.3s;
  .v-input__slot {
    &::before,
    &::after {
      border-color: transparent !important;
      border-style: none !important;
    }
  }
  &.closed {
    max-width: 45px;
    .v-input__slot {
      cursor: pointer !important;
      background: transparent !important;
    }
  }
}
</style>