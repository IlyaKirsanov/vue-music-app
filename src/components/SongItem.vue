<template>
  <li
    class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
  >
    <div>
      <router-link
        :to="{ name:'song', params: { id: song.docId } }"
        class="block font-bold text-gray-600"
      >
        {{ song.modifiedName }}
      </router-link>
      <span class="text-sm text-gray-500">{{ song.name }}</span>
    </div>

    <div class="text-lg text-gray-600">
      <router-link
        custom
        :to="{ name:'song', params: { id: song.docId }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <span
          class="comments"
          @click="navigate"
        >
          <i class="text-gray-600 fa fa-comments" />
          {{ song.commentsCount }}
        </span>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SongItem',
  props: ['song'],
};
</script>

<style scoped>

</style>
