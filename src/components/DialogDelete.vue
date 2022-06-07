<template>
  <v-dialog v-model="dialogActive" persistent max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Вы действительно хотите удалить данного сотрудника?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close-delete')">Отмена</v-btn>
        <v-btn color="blue darken-1" text @click="$emit('delete-item-confirm', item)">Удалить</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialogDelete', 'item'],
  data: () => ({
  }),
  computed: {
    dialogActive() {
      return this.dialogDelete;
    }
  }
}
</script>