<template>
  <div class="">
    <toolbar @onChange="onChange"/>
    <TEditor ref="editor" v-model="content" toolbar=""/>
  </div>
</template>

<script>
import toolbar from './components/toolbar.vue'
import TEditor from './components/TEditor.vue'
export default {
  data () {
    return {
      content: ''
    }
  },
  components: {
    toolbar,
    TEditor
  },
  computed: {},
  methods: {
    onChange(func, ...args) {
      this.$refs.editor[func](...args);
    }
  }
}
</script>

<style scoped lang="scss"></style>
