<template>
  <v-container class="py-8">
    <div class="d-sm-flex justify-space-between mb-5">
      <h1 class="display-1 font-weight-bold mb-5">
        Дабавить сотрудника
      </h1>
      <v-btn
        color="secondary"
        @click="$router.go(-1)"
      >
        <v-icon left>
          mdi-cancel
        </v-icon>
        Отмена
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="mt-5"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="firstName"
            :counter="20"
            :rules="firstNameRules"
            label="Имя"
            required
          ></v-text-field>

          <v-text-field
            v-model="lastName"
            :counter="20"
            :rules="lastNameRules"
            label="Фамилия"
            required
          ></v-text-field>

          <v-text-field
            v-model="middleName"
            :counter="20"
            :rules="middleNameRules"
            label="Отчество"
            required
          ></v-text-field>

          <v-text-field
            v-model="address"
            :counter="40"
            :rules="addressRules"
            label="Адрес"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Дата рождения"
                hint="ДД/ММ/ГГГГ"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu = false"
            ></v-date-picker>
          </v-menu>

          <v-select
            v-model="division"
            :items="divisionItems"
            :rules="[v => !!v || 'Отдел обязателен']"
            label="Отдел"
            required
          ></v-select>

          <v-textarea
            v-model="aboutMe"
            :counter="250"
            :rules="aboutMeRules"
            outlined
            rows="4"
            label="О себе"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="submit"
      >
        Добавить
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Очистить
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    data: (vm) => ({
      valid: true,
      firstName: '',
      lastName: '',
      middleName: '',
      address: '',
      division: null,
      aboutMe: '',
      firstNameRules: [
        v => !!v || 'Имя обязательно',
        v => (v && v.length <= 20) || 'Имя не более 20 символов',
      ],
      lastNameRules: [
        v => !!v || 'Фамилия обязательна',
        v => (v && v.length <= 20) || 'Фамилия не более 20 символов',
      ],
      middleNameRules: [
        v => !!v || 'Отчество обязательно',
        v => (v && v.length <= 20) || 'Отчество не более 20 символов',
      ],
      addressRules: [
        v => !!v || 'Адрес обязательнен',
        v => (v && v.length <= 20) || 'Не более 40 символов',
      ],
      aboutMeRules: [
        v => !!v || 'Поле "О себе" обязательно',
        v => (v && v.length <= 250) || 'Не более 250 символов',
      ],
      divisionItems: [
        'Контроль качества',
        'Цех',
        'Разработка',
        'Бухгалтерия',
      ],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu: false,
    }),
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date);
      },
    },
    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date);
      },
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      async submit () {
        if (this.$refs.form.validate()) {
          const newWorker = {
            id: Date.now(),
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            address: this.address,
            dateOfBirth: this.date,
            division: this.division,
            aboutMe: this.aboutMe,
          };

          try {
            // await this.$axios.$post('/add-worker', newWorker);
            await this.$store.dispatch('addWorker', newWorker);

            this.$router.push('/workers');
          } catch (err) {
            this.error = err.response.data.message;
          }  
        }
      },
      reset () {
        this.$refs.form.reset()
      }
    },
  }
</script>