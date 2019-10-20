<template lang="pug">
q-bar.bg-grey-8.text-white.status-bar(dense style='height:25px;')
  q-icon(name='fas fa-signal')
  div mobi-net
  div 4G
  q-icon(name='fas fa-wifi')
  q-space
  q-icon(name='near_me')
  div 100%
  q-icon(name='fas fa-battery-full')
</template>

<script>
export default {
  name: 'StatusBar'
}
</script>

<style lang="scss">
.status-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 99999;
}
</style>
