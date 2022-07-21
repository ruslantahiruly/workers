<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item class="pa-2">
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            EGAR Technology
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list
        nav
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(page, i) in pages"
            :key="i"
            link
            :to="page.url"
          >
            <v-list-item-icon>
              <v-icon v-text="page.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="page.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <TheAppBarUser :user="user" />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <SimpleChatbot />
  </v-app>
</template>

<script>
import TheAppBarUser from '@/components/TheAppBarUser';
// Test comment
import SimpleChatbot from '@/components/SimpleChatbot/SimpleChatbot.vue';

export default {
  components: {
    TheAppBarUser,
    SimpleChatbot
  },
  data: () => ({
    drawer: true,
    selectedItem: 0,
    pages: [
      { text: 'Главная', icon: 'mdi-home', url: '/' },
      { text: 'Проекты', icon: 'mdi-briefcase', url: '/projects' },
      { text: 'Документы', icon: 'mdi-folder', url: '/documents' },
      { text: 'Отделы', icon: 'mdi-folder-account', url: '/departments' },
      { text: 'Сотрудники', icon: 'mdi-account-multiple', url: '/workers' },
    ],
    user: {
      initials: 'АР',
      fullName: 'Анастасия Роднина',
      email: 'anast.rodn@egar.com',
    },
  }),
  computed: {
    pageTitle() {
      return this.$route.meta.title;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || 'EGAR';
      }
    },
  }
}
</script>