<script setup lang="ts">
import Sidebar from "@/layouts/Sidebar/index.vue";
import Navbar from "@/layouts/Navbar/index.vue";
import PlayerPanel from "@/components/PlayerPanel/index.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { usePlayerStore } from "@/store";

const playerStore = usePlayerStore();
</script>

<template>
  <div class="relative flex h-screen flex-nowrap">
    <div class="w-[200px]">
      <Sidebar />
    </div>
    <div class="flex flex-1 flex-col">
      <Navbar />
      <div
        class="flex-1 overflow-hidden"
        :class="{ 'pb-[80px]': playerStore.currentSong }"
      >
        <router-view />
      </div>
    </div>
  </div>
  <PlayerPanel class="fixed bottom-0 left-0 right-0 z-10" />
  <Toaster />
</template>
