<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
                border-gray-400 text-gray-400 transition duration-500 hover:text-white
                hover:bg-green-400 hover:border-green-400 hover:border-solid"
          :class="{'bg-green-400 border-green-400 border-solid': isDragover}"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="isDragover=true"
          @dragover.prevent.stop="isDragover=true"
          @dragenter.prevent.stop="isDragover=true"
          @dragleave.prevent.stop="isDragover=false"
          @drop.prevent.stop="upload($event)"
        >
          <h5>Drop your files here</h5>
        </div>
        <input type="file" multiple @change="upload($event)">
        <hr class="my-6" />
        <!-- Progess Bars -->
        <div class="mb-4" v-for="file in uploads" :key="file.name">
          <!-- File Name -->
          <div class="font-bold text-sm" :class="file.textClass">
            <i :class="file.icon"></i>{{ file.name }}
          </div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar"
              :class="file.variants"
              :style="{width: file.currentProgress + '%'}"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, songsCollection, storage } from '@/includes/firebase';

export default {
  name: 'Upload',
  data() {
    return {
      isDragover: false,
      uploads: [],
    };
  },
  props: ['addSong'],
  methods: {
    upload($event) {
      this.isDragover = false;
      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];
      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') return;

        const storageRef = storage.ref();
        const songsRef = storageRef.child(`songs/${file.name}`);
        const task = songsRef.put(file);

        const uploadIndex = this.uploads.push({
          task,
          currentProgress: 0,
          name: file.name,
          variants: 'bg-blue-400',
          icon: 'fas fa-spinner fa-spin',
          textClass: '',
        }) - 1;

        task.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploads[uploadIndex].currentProgress = progress;
        }, () => {
          this.uploads[uploadIndex].variants = 'bg-red-400';
          this.uploads[uploadIndex].icon = 'fas fa-times';
          this.uploads[uploadIndex].textClass = 'text-red-400';
        },
        async () => {
          const song = {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            originalName: task.snapshot.ref.name,
            modifiedName: task.snapshot.ref.name,
            genre: '',
            commentsCount: 0,
          };

          song.url = await task.snapshot.ref.getDownloadURL();
          const songRef = await songsCollection.add(song);
          const songSnapshot = await songRef.get();

          this.addSong(songSnapshot);

          this.uploads[uploadIndex].variants = 'bg-green-400';
          this.uploads[uploadIndex].icon = 'fas fa-check';
          this.uploads[uploadIndex].textClass = 'text-green-400';
        });
      });
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },
};
</script>
