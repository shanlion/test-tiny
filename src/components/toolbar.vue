<template>
  <div class="">
    <input type="button" @click="onFunc('boldContent')" value="撤销" >
    <input type="button" @click="onFunc('boldContent')" value="恢复" >
    <input type="button" @click="onFunc('boldContent')" value="加粗文本" >
    <input type="button" @click="onFunc('insertContent')" value="插入内容" >
    <input type="button" @click="onFunc('saveContent')" value="同步内容到textarea" >
    <input type="button" @click="onFunc('colorContent')" value="标红文字" >
    <input type="button" @click="onFunc('fontSize')" value="文字大小" >
    <input type="button" @click="onFunc('copyContent')" value="复制选中文字" >
    <input type="button" @click="onFunc('pasteContent')" value="粘贴" >
    <input type="button" @click="onFunc('mceImage')" value="打开图片对话框" >
    <input type="button" @click="onFunc('getFontInfo')" value="获取字体相关信息" >
    <input type="button" @click="onFunc('addkityformula')" value="增加公式" >
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  methods: {
    onFunc(func, ...args) {
      this.$emit('onChange', func, ...args)
    }
  }
}
</script>

<style scoped lang="scss"></style>
