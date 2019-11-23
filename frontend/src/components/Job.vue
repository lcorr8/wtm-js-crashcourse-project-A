<script>
export default {
  name: 'job',
  props: ['job'],
};
</script>

<template lang="pug">
div.wrapper
  div.main-text
    p Job summary view
    h2 {{job.title}}
    p {{job.description}}
  div.top-left date
  div.text-center {{job._id}}
  div.bottom-left {{job.zipcode}}
  div.top-right {{job.category}}
  div.bottom-right {{job.jobType}}
  <router-link :to="`/job/${job._id}`">See more details</router-link>
</template>

<style>
.wrapper {
    padding: 10px;
    border: 5px solid red;
    border-radius: 30px;
    margin: 10px;
    position: relative;
}
.top-left {
  position: absolute;
  top: 10px;
  left: 10px;
}
.top-right {
  position: absolute;
  top: 10px;
  right: 10px;
}
.bottom-left {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.bottom-right {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.text-center {
  text-align: center;
}
</style>
