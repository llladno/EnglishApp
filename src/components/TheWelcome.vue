<script lang="ts">
export default {
  props: ['test'],
  data() {
    return {
      message: 'Hello World'
  }
  },
  mounted() {
    console.log(this.test)
  },
  methods: {

  }
}

</script>

<template>
  <h1>{{message}}, {{test}}</h1>
</template>
