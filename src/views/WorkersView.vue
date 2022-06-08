<template>
  <v-container class="py-8">
    <div class="d-sm-flex justify-space-between mb-5">
      <h1 class="display-1 font-weight-bold mb-5">
        Сотрудники
      </h1>
      <v-btn
        color="primary"
        dark
        link
        to="/workers/add"
      >
        <v-icon left>
          mdi-plus-thick
        </v-icon>
        Добавить сотрудника
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="workers"
      :items-per-page="10"
      :loading="loading"
      loading-text="Идет загрузка... Пожалуйста подождите"
      class="elevation-1"
      :header-props="{
        sortByText: 'Сортировать по'
      }"
      :footer-props="{
        'items-per-page-text':'Элементов на странице',
      }"
    >
      <template v-slot:top>
        <DialogDelete
          :dialogDelete="dialogDelete"
          :item="item"
          @close-delete="closeDelete"
          @delete-item-confirm="deleteItemConfirm"
        />
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="mr-4"
              v-bind="attrs"
              v-on="on"
              @click="openItem(item)"
            >
              mdi-file-outline
            </v-icon>
          </template>
          <span>Просмотреть</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="mr-4"
              v-bind="attrs"
              v-on="on"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Редактировать</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              v-bind="attrs"
              v-on="on"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Удалить</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DialogDelete from '@/components/DialogDelete';

export default {
  components: {
    DialogDelete,
  },
  data: () => ({
    drawer: false,
    dialogDelete: false,
    editedIndex: -1,
    item: {},
    headers: [
      { text: 'Имя', align: 'start', value: 'firstName' },
      { text: 'Фамилия', value: 'lastName' },
      { text: 'Дата рождения', value: 'dateOfBirth' },
      { text: 'Отдел', value: 'division' },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
  }),
  computed: mapGetters(['workers', 'loading']),
  async mounted() {
    if (this.$store.getters['workers'].length === 0) {
      this.fetchWorkers();
    }
  },
  methods: {
    ...mapActions(['fetchWorkers']),
    openItem(item) {
      this.$router.push(`/workers/${item.id}`);
    },
    editItem(item) {
      this.$router.push(`/workers/${item.id}/edit`);
    },
    deleteItem(item) {
      this.item = item;
      this.editedIndex = this.workers.indexOf(item);
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      })
    },
    async deleteItemConfirm(item) {
      await this.$store.dispatch('deleteWorker', item);
      this.closeDelete();
    }
  }
}
</script>