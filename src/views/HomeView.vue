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
    <div>
        <h1>ひばちまなトラッカー</h1>
        <div class="row" v-for="[id, video] in videoMap" :key="id">
            <VideoComponent :video="video" class="col-5"/>        
        </div>        
    </div>
</template>

<style scoped>
html {
    font-family: "Lucida Sans", sans-serif;
}

* {
    box-sizing: border-box;
}

/* For desktop: */
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}

@media only screen and (max-width: 600px) {
    #route-view {
        background-color: lightblue;
    }

    [class*="col-"] {
        width: 100%;
    }
}
</style>