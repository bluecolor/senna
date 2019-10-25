<template lang="pug">
.welcome.flex.flex-center
  .img-container.flex.flex-center.opacity
    img(src='~assets/helmet.svg' width='216px;' height='216px;')
  .command-container.flex.flex-center.q-mt-xl.opacity-2
    .row(style='min-width: 300px;')
      .col-6
        | Show all commands
      .col-6
        | Ctrl + Shift + P

</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.welcome {
  flex-direction: column;
  align-content: center;
  align-content: space-around;
  height: 100%;
}

.welcome, .img-container {
  width: 100%;
}
.command-container {
  width: 100%;

}

.opacity {
  opacity: 0.1;
}

.opacity-2 {
  opacity: 0.4;
}
</style>
