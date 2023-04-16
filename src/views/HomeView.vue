<script setup lang="ts">
import VideoComponent from '@/components/VideoComponent.vue';
import { useVideosStore, type Video } from '@/stores/videos';
import { computed } from '@vue/reactivity';

const videosStore = useVideosStore();
videosStore.prepareVideoMap();
videosStore.recieveVideoInfo();

const videoMap = computed((): Map<string, Video> => videosStore.videoMap);
</script>

<template>
    <h1>キャブヘイトラッカー</h1>
    <ul>
        <li v-for="[id, video] in videoMap" :key="id">
            <VideoComponent :video="video" />
        </li>
    </ul>
</template>