<script>
export default {
  name: 'job-details',
  props: ['job'],
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
