<template>
  <div>
    <h2>Protected Page</h2>
    <p>Only logged-in users can see this page.</p>
    <button @click="goBack">Back to Home</button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>
