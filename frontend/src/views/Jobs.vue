<script>
import { mapActions, mapState } from 'vuex';
import Job from '@/components/Job.vue';
import JobDetails from '@/components/JobDetails.vue';

export default {
  name: 'jobs',
  created() {
    this.fetchJobs();
  },
  components: {
    Job,
    JobDetails,
  },
  computed: {
    ...mapState({
      jobs: state => state.jobs.data,
      likes: state => state.jobs.likes,
    }),
  },
  methods: {
    ...mapActions(['fetchJobs', 'addLike']),
    goToJobdetails(id) {
      console.log(`opening/closing the job details id: ${id}`);
      // this.$router.push({ name: 'job', params: { id } });
    },
  },
};
</script>

<template lang="pug">
div
  h1 Jobs result page!
  button(@click="addLike") Like!
  p(:likes="likes") Number of likes: {{likes}}
  div(v-if="jobs.length")
    div.jobs-list
      div.job(v-for="job in jobs")
        div(@click="goToJobdetails(job._id)")
          job(:job="job")
          div.expand(v-if="true")
            p Hello i'm content that expands
            job-details(:job="job")
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
.expand {
  background-color: blue;
  color: white;
}
</style>
