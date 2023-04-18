<script setup lang="ts">
import { ref } from 'vue';
import { useChannelsStore, type Channel } from '@/stores/channels';
import { computed } from '@vue/reactivity';
import ChannelComponent from '@/components/ChannelComponent.vue';

const searchWord = ref("");
const channelStore = useChannelsStore();

const channels = computed((): Map<string, Channel> => channelStore.channelMap);
const onSearch = ():void => {
    channelStore.receiveChannelInfo(searchWord.value);
}
</script>

<template>
    <h1>検索</h1>
    <input type="text" v-model="searchWord" placeholder="検索">
    <button @click="onSearch">検索</button>
    <ul v-if="channels">
        <li v-for="[id, channel] in channels" :key="id">
            <ChannelComponent :channel="channel"/>
        </li>
    </ul>
</template>