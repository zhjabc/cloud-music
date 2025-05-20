<script setup lang="ts">
import Sidebar from "@/layouts/Sidebar/index.vue";
import Navbar from "@/layouts/Navbar/index.vue";
import PlayerPanel from "@/components/PlayerPanel/index.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <div class="relative flex h-screen flex-nowrap overflow-hidden">
    <div class="w-[200px]">
      <Sidebar />
    </div>
    <div class="flex flex-1 flex-col">
      <Navbar />
      <div class="flex-1">
        <router-view />
      </div>
    </div>
  </div>
  <PlayerPanel class="fixed bottom-0 left-0 right-0 z-10" />
  <Toaster />
</template>
