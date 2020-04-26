import { _init } from './common'

export default {
  data() {
    return {
      mixinTimer: null
    }
  },
  created() {
    this.init && _init(this.init, (initTimer) => {
      this.mixinTimer = initTimer
    })
  },
  beforeMount() {
    this.nextInit && _init(this.nextInit, (initTimer) => {
      this.mixinTimer = initTimer
    })
  },
  mounted() {
    this.mountInit && _init(this.mountInit, (initTimer) => {
      this.mixinTimer = initTimer
    })
  },
  beforeDestroy() {
    window.clearInterval(this.mixinTimer)
  }
}
