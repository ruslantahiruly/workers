<template>
  <v-container class="py-8">
    <div class="d-md-flex justify-space-between mb-5">
      <h1 class="display-1 font-weight-bold mb-5">
        Сотрудник
      </h1>
      <div class="d-md-flex align-start">
        <v-btn
          color="primary"
          dark
          link
          :to="`/workers/${worker.id}/edit`"
          class="mr-3"
        >
          <v-icon left>
            mdi-pencil
          </v-icon>
          Редактировать
        </v-btn>
        <v-btn
          color="warning"
          dark
          link
          :to="`/workers/${worker.id}/delete`"
        >
          <v-icon left>
            mdi-delete
          </v-icon>
          Удалить
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
    <section class="mt-5">
      <div class="mb-3 text-h6"><span class="font-weight-bold">Имя</span>: {{ worker.firstName }}</div>
      <div class="mb-3 text-h6"><span class="font-weight-bold">Фамилия</span>: {{ worker.lastName }}</div>
      <div class="mb-3 text-h6"><span class="font-weight-bold">Отчество</span>: {{ worker.middleName }}</div>
      <div class="mb-3 text-h6"><span class="font-weight-bold">Дата рождения</span>: {{ worker.dateOfBirth }}</div>
      <div class="mb-3 text-h6"><span class="font-weight-bold">Отдел</span>: {{ worker.division }}</div>
      <div class="mb-3 text-h6"><span class="font-weight-bold">О себе</span>: {{ worker.aboutMe }}</div>
    </section>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters(['worker']),
  async mounted() {
    if (this.$store.getters['workers'].length > 0) {
      const workerID = this.$route.params.id;
      this.getWorker(workerID);
    } else {
      try {
        const response = await axios.get(`https://my-json-server.typicode.com/ruslantahiruly/fake-api/workers/${this.$route.params.id}`);
        this.worker = response.data;
      } catch (err) {
        this.error = err.response.data.message;
      }  
    }
  },
  methods: mapActions(['getWorker']),
}
</script>