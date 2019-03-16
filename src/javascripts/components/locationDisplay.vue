<template lang="pug">
.location
  div {{area}}
  div {{country}}
</template>

<script>
  export default {
    props: [
      'location'
    ],
    computed: {
      area() {
        const result = [];

        if (this.location.city) {
          result.push(this.location.city);
        } else if (this.location.village) {
          result.push(this.location.village);
        }

        if (this.location.state) {
          result.push(this.location.state);
        }

        return result.join(', ');
      },
      country() {
        return this.location.country;
      }
    },
  };
</script>
