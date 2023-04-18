import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Keys } from "@/keys";

// Youtube channel
export interface Channel {
  name: string,
  id: string,
}

interface State {
  channelMap: Map<string, Channel>
}

export const useChannelsStore = defineStore({
    id: "channels",
    state: (): State => {
        return {
            channelMap: new Map<string, Channel>
        }
    },
    getters: {

    },
    actions: {
        prepareChannelMap() {
            this.channelMap = new Map<string, Channel>();
        },
        async receiveChannelInfo(searchWord: string) {
            const url = "https://www.googleapis.com/youtube/v3/search";
            const params: {
                part: string,
                channelType: string,
                maxResults: string,
                q: string,
                type: string,
                key: string
            } = {
                part: "snippet",
                channelType: "any",
                maxResults: "10",
                q: searchWord,
                type: "channel",
                key: Keys.youtubeAPI
            };
            const qparams = new URLSearchParams(params);
            const fullUrl = `${url}?${qparams}`;
            const response = await fetch(fullUrl);
            const json = await response.json();
            const channelArray = json.items;
            Object.keys(channelArray).forEach(key => {

                const channel: Channel = {
                    id: channelArray[key]["id"]["channelId"] as string,
                    name: channelArray[key]["snippet"]["channelTitle"] as string
                };

                this.channelMap.set(channel.id, channel);
            });
        }
    }
});