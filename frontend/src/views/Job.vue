<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'job',
  created() {
    this.fetchJob(this.$route.params.id);
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
  h1 Title: {{job.title}}
  h2 Description: {{job.description}}
  p id: {{job._id}}
  p Employer: {{job.employer}}
  p Zipcode: {{job.zipcode}}
  p Category: {{job.category}}
  p Job type: {{job.jobType}}
  p Tips: {{job.tips}}
</template>

<style>

</style>
