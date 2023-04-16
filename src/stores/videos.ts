import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Keys } from "@/keys";

// Youtube video
export interface Video {
  title: string,
  id: string,
  date: string,
  thumnail_m_url: string,
}

interface State {
  videoMap: Map<string, Video>
}

export const useVideosStore = defineStore({
  id: "videos",
  state: (): State => {
    return {
      videoMap: new Map<string, Video>()
    }
  },
  getters: {
  },
  actions: {
    prepareVideoMap() {
      this.videoMap = new Map<string, Video>();
    },
    async recieveVideoInfo() {
      const url = "https://www.googleapis.com/youtube/v3/search?";
      // const url = "https://youtube.googleapis.com/youtube/v3/activities?";

      const params: {
        part: string,
        channelId: string,
        maxResults: string,
        order: string,
        key: string
      } = {
        part: "snippet",
        channelId: Keys.channelID,
        maxResults: "5",
        order: "date",
        key: Keys.youtubeAPI
      };

      // クエリパラメータを生成
      const queryParams = new URLSearchParams(params);

      // URLを作成
      const urlFull = `${url}${queryParams}`;

      // JSONを取得
      const response: Response = await fetch(urlFull);
      const json = await response.json();

      // 動画情報を抽出
      const videoArray = json.items;
      console.log(videoArray);

      Object.keys(videoArray).forEach(key => {
        const id = videoArray[key]["id"]["videoId"] as string;
        const name = videoArray[key]["snippet"]["title"] as string;
        const date = videoArray[key]["snippet"]["publishedAt"] as string;
        const thumnail_m_url = videoArray[key]["snippet"]["thumbnails"]["medium"]["url"] as string;

        const video: Video = {
          id: id,
          title: name,
          date: date,
          thumnail_m_url: thumnail_m_url
        };
        
        this.videoMap.set(video.id, video);
      });
    }
  }
});
