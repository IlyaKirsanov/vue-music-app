<template>
  <main>
    <section class="relative py-20 mb-8 text-center text-white">
      <div
        class="absolute inset-0 w-full h-full bg-repeat bg-auto introduction-bg"
        style="background-image: url(assets/img/header.png)"
      />
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="mb-5 text-5xl font-bold">
            Listen to Great Music!
          </h1>
          <p class="w-full mx-auto md:w-8/12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis, congue
            augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
            sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block w-auto max-w-full mx-auto mt-5 -mb-20 "
        src="assets/img/introduction-music.png"
      >
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="relative flex flex-col bg-white border border-gray-200 rounded">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <i class="float-right text-xl text-green-400 fa fa-headphones-alt" />
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <app-song-item
            v-for="song in songs"
            :key="song.docId"
            :song="song"
          />
        </ol>
      <!-- .. end Playlist -->
      </div>
    </section>
  </main>
  <!-- Introduction -->
</template>

<script>
import { songsCollection } from '@/includes/firebase';
import AppSongItem from '@/components/SongItem.vue';

export default {
  name: 'Home',
  components: { AppSongItem },
  data() {
    return {
      songs: [],
      maxPerPage: 3,
      pendingRequest: false,
    };
  },
  async created() {
    await this.getSongs();
    window.addEventListener('scroll', this.handleScrolls);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScrolls);
  },
  methods: {
    handleScrolls() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const isBottomOfWindow = (Math.round(scrollTop) + innerHeight) === offsetHeight;

      if (isBottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let snapshots;

      if (this.songs.length) {
        const lasDocument = await songsCollection
          .doc(this.songs[this.songs.length - 1].docId)
          .get();
        snapshots = await songsCollection
          .orderBy('modifiedName')
          .startAfter(lasDocument)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy('modifiedName')
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((doc) => {
        this.songs.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      this.pendingRequest = false;
    },
  },
};
</script>
