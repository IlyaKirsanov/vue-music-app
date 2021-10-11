<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <Upload ref="upload" :addSong="addSong"/>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem v-for="(song, index) in songs"
                             :key="song.docId"
                             :song="song"
                             :updateSong="updateSong"
                             :index="index"
                             :removeSong="removeSong"
                             :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import Upload from '@/components/Upload.vue';
import CompositionItem from '@/components/CompositionItem.vue';
import { auth, songsCollection } from '@/includes/firebase';

export default {
  name: 'Manage',
  components: {
    Upload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].modifiedName = values.modifiedName;
      this.songs[index].genre = values.genre;
    },
    removeSong(index) {
      this.songs.splice(index, 1);
    },
    addSong(document) {
      const song = {
        docId: document.id,
        ...document.data(),
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.updateUnsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-restricted-globals,no-alert
      const leave = confirm('Do you want to leave?');
      next(leave);
    }
  },
};

</script>
