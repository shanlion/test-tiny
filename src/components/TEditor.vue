<template>
    <editor v-model="content" :init="init" :disabled="disabled" :id="tinyID"></editor>
</template>
 
 
<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/icons/default/icons";
import "tinymce/themes/silver";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/preview";
import "tinymce/plugins/code";
import "tinymce/plugins/link";
import "tinymce/plugins/advlist";
import "tinymce/plugins/codesample";
import "tinymce/plugins/hr";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/autolink";
import "tinymce/plugins/directionality";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/template";
import "tinymce/plugins/charmap";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/autosave";
import "tinymce/plugins/autoresize";

import "../../public/tinymce/plugins/kityformula-editor/plugin.js";
 
export default {
  components: {
    Editor
  },
  props: {
    tinyID: {
      type: String,
      default: "tinymce"
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default:
        "preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr nonbreaking insertdatetime advlist lists wordcount imagetools textpattern autosave autoresize  kityformula-editor"
    },
    toolbar: {
      type: [String, Array],
      default:
        "code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link codesample | alignleft aligncenter alignright alignjustify outdent indent formatpainter | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap hr pagebreak insertdatetime | fullscreen preview"
    }
  },
  data() {
    return {
      //初始化配置
      init: {
        selector: `#tinymce`,
        statusbar: false,
        language_url: "tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "tinymce/skins/ui/oxide",
        height: 770,
        min_height: 770,
        max_height: 770,
        toolbar_mode: "wrap",
        plugins: this.plugins,
        toolbar: this.toolbar,
        content_style: "p {margin: 5px 0;}",
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
        branding: false,
        // 图片上传
        images_upload_handler: (blobInfo, success, failure) => {
          // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          // success(img)
 
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          reserveTableFoodDescribe(formData).then(res => {
            if (res.code === '10000') {
              const file = res.data
              success(file.url)
              return
            }
            failure('上传失败')
          }).catch(() => {
            failure('上传出错')
          })
        },
        setup: function (editor) {
          editor.on('click', function () {
            // 判断是否加粗
            var isBold = editor.queryCommandState('bold');
            console.log('是否加粗:', isBold);

            // 判断是否斜体
            var isItalic = editor.queryCommandState('italic');
            // console.log('是否斜体:', isItalic);

            // 判断是否下划线
            var isUnderline = editor.queryCommandState('underline');
            // console.log('是否下划线:', isUnderline);

            // 判断是否删除线
            var isStrikeThrough = editor.queryCommandState('strikeThrough');
            // console.log('是否删除线:', isStrikeThrough);
            // editor.selection.getNode()：获取当前选区的节点信息。
            // editor.selection.getRng()：获取当前选区的 Range 对象，可以进一步分析选区的内容
            const fontColor = editor.queryCommandValue('forecolor');
            // console.log(`选区的字体颜色: ${fontColor}`);
          });
        }
      },
      content: this.value
    };
  },
  mounted() {
    tinymce.init({})

  },
  methods: {
    // 加粗文本
    boldContent(){ 
      tinyMCE.editors[this.tinyID].execCommand('bold')
    },
    // 插入内容
    insertContent(){
      tinyMCE.editors[this.tinyID].insertContent('<b>插入内容</b>')
    },
    // 同步内容到textarea
    saveContent(){ 
      tinyMCE.editors[this.tinyID].save()
    },
    // 标红文字
    colorContent(){ 
      tinyMCE.editors[this.tinyID].execCommand('ForeColor',false,'#f33')
    },
    // 文字大小
    fontSize(){ 
      tinyMCE.editors[this.tinyID].execCommand('FontSize',false,'24px')
    },
    // 复制选中文字
    copyContent(){ 
      tinyMCE.editors[this.tinyID].execCommand('copy')
    },
    // 粘贴
    pasteContent(){ 
      tinyMCE.editors[this.tinyID].execCommand('paste')
    },
    // 打开图片对话框
    mceImage(){ 
      tinyMCE.editors[this.tinyID].execCommand('mceImage')
    },
    // 获取字体信息 
    getFontInfo(){ 
      // tinyMCE.editors[this.tinyID] === tinyMCE.activeEditor;
      const editor = tinyMCE.activeEditor;
      const selectionNode = editor.selection.getNode(); // 获取选区的节点
      const style = window.getComputedStyle(selectionNode); // 获取节点的样式信息

      const fontSize = style.fontSize;
      const color = style.color;
      console.log('选区的字体信息', fontSize, color)
    },
    addkityformula() {
      const editor = tinyMCE.editors[this.tinyID]; // 获取当前活动的编辑器实例
      // 调用插件内的函数
      if (editor && editor.addkityformula) {
        editor.addkityformula();
      }
    }
  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
    content(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>
