<template>
  <v-container class="py-8">
    <h1 class="display-1 font-weight-bold mb-5">
      Удалить сотрудника
    </h1>
    <v-divider></v-divider>
    <div class="font-weight-bold my-5 text-h5">Вы действительно хотите удалить данного сотрудника?</div>
    <v-btn
      color="success"
      class="mr-4"
      @click="submit"
      >
      Удалить
    </v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="$router.go(-1)"
      >
      Отмена
    </v-btn>
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
  methods: {
    ...mapActions(['getWorker']),
    async submit() {
      try {
        // await this.$axios.$delete('/delete-worker', this.worker);
        await this.$store.dispatch('deleteWorker', this.worker);

        this.$router.push('/workers');
      } catch (err) {
        this.error = err.response.data.message;
      }
    },
  },
}
</script>