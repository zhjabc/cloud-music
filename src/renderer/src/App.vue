<script setup lang="ts">
import Sidebar from "@/layouts/Sidebar/index.vue";
import Navbar from "@/layouts/Navbar/index.vue";
</script>

<template>
  <div class="flex h-screen flex-nowrap overflow-hidden">
    <div class="w-[200px]">
      <Sidebar />
    </div>
    <div class="flex flex-1 flex-col">
      <Navbar />
      <div class="flex-1 overflow-hidden">
        <router-view />
      </div>
    </div>
  </div>
</template>
