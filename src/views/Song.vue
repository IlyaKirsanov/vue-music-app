<template>
  <main>
    <!-- Music Header -->
    <section class="relative w-full mb-8 text-center text-white py-14">
      <div
        class="box-border absolute inset-0 w-full h-full bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      />
      <div class="container flex items-center mx-auto">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="NEW_SONG(song)"
          type="button"
          class="z-50 w-24 h-24 text-3xl text-black bg-white rounded-full focus:outline-none"
        >
          <i class="fas fa-play" />
        </button>
        <div class="z-50 ml-8 text-left">
          <!-- Song Info -->
          <div class="text-3xl font-bold">
            {{ song.modifiedName }}
          </div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section
      class="container mx-auto mt-6"
      id="comments"
    >
      <div class="relative flex flex-col bg-white border border-gray-200 rounded">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments {{ song.commentsCount }}</span>
          <i class="float-right text-2xl text-green-400 fa fa-comments" />
        </div>
        <div class="p-6">
          <div
            class="p-4 mb-4 font-bold text-center text-white"
            v-if="commentShowAlert"
            :class="commentAlertVariant"
          >
            {{ commentAlertMessage }}
          </div>
          <VeeForm
            :validation-schema="schema"
            @submit="addComment"
            v-if="userLoggedIn"
          >
            <VeeField
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
              duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            />
            <ErrorMessage
              class="text-red-600"
              name="comment"
            />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="commentInSubmission"
            >
              Submit
            </button>
          </VeeForm>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">
              Latest
            </option>
            <option value="2">
              Oldest
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 border border-gray-200 bg-gray-50"
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <div class="mb-5">
          <div class="font-bold">
            {{ comment.name }}
          </div>
          <time>{{ comment.datePosted }}</time>
        </div>
        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { songsCollection, auth, commentsCollection } from '@/includes/firebase';
import { NEW_SONG } from '@/state/actions';

export default {
  name: 'Song',
  computed: {
    ...mapState(['userLoggedIn']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }

        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },
  data() {
    return {
      song: {},
      schema: {
        comment: 'required|min:3',
      },
      sort: '1', // Lattes to Oldest
      comments: [],
      commentInSubmission: false,
      commentShowAlert: false,
      commentAlertVariant: 'bg-blue-500',
      commentAlertMessage: 'Please wait! Your Comment is being submitted',
    };
  },
  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();

    if (!docSnapshot.exists) {
      await this.$router.push({ name: 'home' });
      return;
    }

    const { sort } = this.$route.query;

    this.sort = sort === '1' || sort === '2' ? sort : '1';

    this.song = docSnapshot.data();
    await this.getComments();
  },
  methods: {
    ...mapActions([NEW_SONG]),
    async getComments() {
      const snapshots = await commentsCollection.where('sid', '==', this.$route.params.id).get();

      this.comments = [];
      snapshots.forEach((doc) => {
        this.comments.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    },
    async addComment(values, context) {
      this.commentInSubmission = true;
      this.commentShowAlert = true;
      this.commentAlertVariant = 'bg-blue-500';
      this.commentAlertMessage = 'Please wait! Your Comment is being submitted';

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);

      this.song.commentsCount += 1;

      await songsCollection.doc(this.$route.params.id).update({
        commentsCount: this.song.commentsCount,
      });

      await this.getComments();

      this.commentInSubmission = false;
      this.commentAlertVariant = 'bg-green-500';
      this.commentAlertMessage = 'Comment added';
      context.resetForm();
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },

};
</script>
