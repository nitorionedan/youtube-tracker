<script setup lang="ts">
import type { Channel } from '@/stores/channels';

defineProps<{
    channel: Channel
}>();

</script>

<template>
    <div>
        <div>{{ channel.name }}</div>
    </div>
</template>