<template lang="pug">
  .activity-bar.bg-grey-9
    q-btn(flat round :color="color(1)" icon="fas fa-database" @click='onDatabaseNav')
    q-btn.q-mt-sm(flat round :color="color(2)" icon="o_folder" @click='onFiles')
    q-btn.settings(flat round icon="fas fa-cog" color='white' @click='onDatabaseNav')
</template>

<script>
export default {
  data () {
    return {
      active: 1
    }
  },
  methods: {
    color (i) {
      return this.active === i ? 'white' : 'grey-5'
    },
    onDatabaseNav () {
      this.onClick(1)
    },
    onFiles () {
      this.onClick(2)
    },
    onClick (i) {
      if (this.active === i) {
        this.$emit('toggle')
      }
      this.active = i
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-bar {
  padding-top: 10px;
  padding-left: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50px;
  .settings {
    margin-top: auto;
    margin-bottom: 10px;
  }
}
</style>
