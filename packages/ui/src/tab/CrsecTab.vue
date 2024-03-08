<template>
  <div class="tab-warp">tab</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    console.log('CrsecTab created')
  },
  methods: {
    init() {
      console.log('CrsecTab init')
      return 'CrsecTab init'
    },
  },
}
</script>
<style scoped lang="less">
.tab-warp {
  width: 20px;
  height: 20px;
  background-color: #f00;
}
</style>
