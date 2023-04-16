<script setup lang="ts">
import { useVideosStore, type Video } from '@/stores/videos';
import { computed } from '@vue/reactivity';

const videosStore = useVideosStore();
videosStore.prepareVideoMap();
videosStore.recieveVideoInfo();

const videoMap = computed((): Map<string, Video> => videosStore.videoMap);

function embedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
}
</script>

<template>
    <h1>キャブヘイトラッカー</h1>
    <ul>
        <li v-for="[id, video] in videoMap" :key="id">
            <p>タイトル：{{ video.title }}</p>
            <p>日付：{{ video.date }}</p>
            <p>動画ID：{{ video.id }}</p>
            <!-- <img :src="video.thumnail_m_url" :alt="video.title"> -->
            <iframe width="560" height="315" :src="embedUrl(id)" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </li>
    </ul>
</template>