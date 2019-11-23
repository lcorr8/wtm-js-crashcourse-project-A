<script>
/* eslint-disable no-unused-vars */
import { mapState, mapActions } from 'vuex';
import JobDetails from '@/components/JobDetails.vue';

export default {
  name: 'job',
  created() {
    this.fetchJob(this.$route.params.id);
  },
  components: {
    JobDetails,
  },
  computed: {
    ...mapState({
      job: state => state.jobs.job,
    }),
  },
  methods: {
    ...mapActions(['fetchJob']),
  },
};
</script>

<template lang="pug">
div
  h1 Job Details View, job below:
  div
    job-details(:job="job")
</template>

<style>

</style>
