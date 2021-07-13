<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-delete
      @close="dialogs.delete = false"
      :task="task"
      v-if="dialogs.delete"
    />
    <dialog-edit
      @close="dialogs.edit = false"
      :task="task"
      v-if="dialogs.edit"
    />
    <dialog-due-date
      @close="dialogs.dueDate = false"
      :task="task"
      v-if="dialogs.dueDate"
    />
  </div>
</template>

<script>
import DialogDelete from "./Dialogs/DialogDelete.vue";
import DialogEdit from "./Dialogs/DialogEdit.vue";
import DialogDueDate from "./Dialogs/DialogDueDate.vue";
export default {
  props: ["task"],
  components: {
    DialogDelete,
    DialogEdit,
    DialogDueDate,
  },
  data() {
    return {
      items: [
        {
          title: "Edit",
          icon: "mdi-pencil",
          click() {
            this.dialogs.edit = true;
          },
        },
        {
          title: "Due Date",
          icon: "mdi-calendar",
          click() {
            this.dialogs.dueDate = true;
          },
        },
        {
          title: "Delete",
          icon: "mdi-delete",
          click() {
            this.dialogs.delete = true;
          },
        },
        {
          title: "Sort",
          icon: "mdi-drag-horizontal-variant",
          click() {
            if (!this.$store.state.search) {
              this.$store.commit("toggleSorting", this.$store.state.sort);
            } else {
              this.$store.commit(
                "showSnackbar",
                "How Drae you try to sort while searching"
              );
            }
          },
        },
      ],
      dialogs: {
        dueDate: false,
        edit: false,
        delete: false,
      },
    };
  },
  methods: {
    handleClick(i) {
      this.items[i].click.call(this);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>