<script>
import { mapActions, mapState } from 'vuex';
import Job from '@/components/Job.vue';

export default {
  name: 'jobs',
  created() {
    this.fetchJobs();
  },
  components: {
    Job,
  },
  computed: {
    ...mapState({
      jobs: state => state.jobs.data,
      likes: state => state.jobs.likes,
    }),
  },
  methods: {
    ...mapActions(['fetchJobs', 'addLike']),
  },
};
</script>

<template lang="pug">
div
  h1 Jobs result page!
  button(@click="addLike") Like!
  p(:likes="likes") Number of likes: {{likes}}
  div(v-if="jobs.length")
    p Here are the jobs:
    div.jobs-list
      div.job(v-for="job in jobs")
        job.jobs-list(:job="job")
  div(v-else)
    p There's no one yet :(
</template>

<style>
.jobs-list {
  display: block;
}
.job {
  margin: 30px;
}
</style>
