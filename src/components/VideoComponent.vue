<script setup lang="ts">
import { defineProps } from 'vue';
import type { Video } from '@/stores/videos';

defineProps<{
    video: Video
}>();
</script>

<template>
    <p>タイトル：{{ video.title }}</p>
    <p>日付：{{ video.date }}</p>
    <p>動画ID：{{ video.id }}</p>
    <!-- <img :src="video.thumnail_m_url" :alt="video.title"> -->
    <iframe width="560" height="315" :src="video.embed_url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</template>