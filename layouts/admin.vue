<template>
  <v-layout>
    <div class="w-full">
      <div v-if="spinner" class="h-screen flex justify-center items-center">
        <img src="@/assets/img/loader.webp" width="100" alt="" />
      </div>
      <div v-else>
        <UtilsDashboardHeader :drawer="OpenDrawer"></UtilsDashboardHeader>
        <slot />
      </div>
    </div>
  
  </v-layout>
</template>

<script>

export default {
  data: () => ({
    spinner: false,
    drawer: false,
  }),
  methods: {
    OpenDrawer() {
      this.drawer = !this.drawer;
    },
  },
  mounted() {
   
  },
  created() {},
};
</script>

<style></style>
