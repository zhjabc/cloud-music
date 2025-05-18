<script setup lang="ts">
import Sidebar from "@/layouts/Sidebar/index.vue";
import Navbar from "@/layouts/Navbar/index.vue";
</script>

<template>
  <div class="flex h-full overflow-hidden">
    <Sidebar />
    <div class="flex flex-1 flex-col">
      <Navbar />
      <div class="flex-1 overflow-hidden">
        <router-view />
      </div>
    </div>
  </div>
</template>
