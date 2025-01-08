/**
 * Created by hn on 14-3-17.
 */

define(function (require) {
    var kity = require("kity"),
        // UiUitls
        $$ = require("ui/ui-impl/ui-utils"),
        Utils = require("base/utils"),
        VIEW_STATE = require("ui/def").VIEW_STATE,
        Scrollbar = require("ui/ui-impl/scrollbar/scrollbar"),
        Toolbar = require("ui/toolbar/toolbar"),
        // 控制组件
        ScrollZoom = require("ui/control/zoom"),
        ELEMENT_LIST = require("ui/toolbar-ele-list"),
        UIComponent = kity.createClass("UIComponent", {
            constructor: function (kfEditor, options) {
                var currentDocument = null;

                this.options = options;

                this.container = kfEditor.getContainer();

                currentDocument = this.container.ownerDocument;

                // ui组件实例集合
                this.components = {};

                this.canvasRect = null;
                this.viewState = VIEW_STATE.NO_OVERFLOW;

                this.kfEditor = kfEditor;

                this.toolbarWrap = createToolbarWrap(currentDocument);
                this.toolbarContainer = createToolbarContainer(currentDocument);
                this.editArea = createEditArea(currentDocument);
                this.canvasContainer = createCanvasContainer(currentDocument);
                this.canvasOptions = createCanvasOptions(
                    currentDocument,
                    kfEditor
                );
                this.scrollbarContainer =
                    createScrollbarContainer(currentDocument);

                this.toolbarWrap.appendChild(this.toolbarContainer);
                this.container.appendChild(this.toolbarWrap);
                this.editArea.appendChild(this.canvasContainer);
                this.container.appendChild(this.canvasOptions);
                this.container.appendChild(this.editArea);
                this.container.appendChild(this.scrollbarContainer);

                this.initComponents();

                this.initServices();

                this.initEvent();

                this.updateContainerSize(
                    this.container,
                    this.toolbarWrap,
                    this.editArea,
                    this.canvasContainer
                );

                this.initScrollEvent();
            },

            // 组件实例化
            initComponents: function () {
                // 工具栏组件
                this.components.toolbar = new Toolbar(
                    this,
                    this.kfEditor,
                    ELEMENT_LIST
                );

                // TODO 禁用缩放, 留待后面再重新开启
                if (false) {
                    if (this.options.zoom) {
                        this.components.scrollZoom = new ScrollZoom(
                            this,
                            this.kfEditor,
                            this.canvasContainer,
                            {
                                max: this.options.maxzoom,
                                min: this.options.minzoom
                            }
                        );
                    }
                }

                this.components.scrollbar = new Scrollbar(this, this.kfEditor);
            },

            updateContainerSize: function (container, toolbar, editArea) {
                var containerBox = container.getBoundingClientRect(),
                    toolbarBox = toolbar.getBoundingClientRect();

                editArea.style.width = containerBox.width + "px";
                editArea.style.height =
                    containerBox.bottom - toolbarBox.bottom + "px";
            },

            // 初始化服务
            initServices: function () {
                this.kfEditor.registerService("ui.get.canvas.container", this, {
                    getCanvasContainer: this.getCanvasContainer
                });

                this.kfEditor.registerService("ui.update.canvas.view", this, {
                    updateCanvasView: this.updateCanvasView
                });

                this.kfEditor.registerService(
                    "ui.canvas.container.event",
                    this,
                    {
                        on: this.addEvent,
                        off: this.removeEvent,
                        trigger: this.trigger,
                        fire: this.trigger
                    }
                );
            },

            initEvent: function () {
                //                Utils.addEvent( this.container, 'mousewheel', function ( e ) {
                //                    e.preventDefault();
                //                } );
            },

            initScrollEvent: function () {
                var _self = this;

                this.kfEditor.requestService(
                    "ui.set.scrollbar.update.handler",
                    function (proportion, offset, values) {
                        offset = Math.floor(
                            proportion *
                                (values.contentWidth - values.viewWidth)
                        );
                        _self.kfEditor.requestService(
                            "render.set.canvas.offset",
                            offset
                        );
                    }
                );
            },

            getCanvasContainer: function () {
                return this.canvasContainer;
            },

            addEvent: function (type, handler) {
                Utils.addEvent(this.canvasContainer, type, handler);
            },

            removeEvent: function () {},

            trigger: function (type) {
                Utils.trigger(this.canvasContainer, type);
            },

            // 更新画布视窗， 决定是否出现滚动条
            updateCanvasView: function () {
                var canvas = this.kfEditor.requestService("render.get.canvas"),
                    contentContainer = canvas.getContentContainer(),
                    contentRect = null;

                if (this.canvasRect === null) {
                    // 兼容firfox， 获取容器大小，而不是获取画布大小
                    this.canvasRect =
                        this.canvasContainer.getBoundingClientRect();
                }

                contentRect = contentContainer.getRenderBox("paper");

                if (contentRect.width > this.canvasRect.width) {
                    if (this.viewState === VIEW_STATE.NO_OVERFLOW) {
                        this.toggleViewState();
                        this.kfEditor.requestService("ui.show.scrollbar");
                        this.kfEditor.requestService(
                            "render.disable.relocation"
                        );
                    }

                    this.kfEditor.requestService("render.relocation");

                    // 更新滚动条， 参数是：滚动条所控制的内容长度
                    this.kfEditor.requestService(
                        "ui.update.scrollbar",
                        contentRect.width
                    );
                    this.kfEditor.requestService("ui.relocation.scrollbar");
                } else {
                    if (this.viewState === VIEW_STATE.OVERFLOW) {
                        this.toggleViewState();
                        this.kfEditor.requestService("ui.hide.scrollbar");
                        this.kfEditor.requestService(
                            "render.enable.relocation"
                        );
                    }

                    this.kfEditor.requestService("render.relocation");
                }
            },

            toggleViewState: function () {
                this.viewState =
                    this.viewState === VIEW_STATE.NO_OVERFLOW
                        ? VIEW_STATE.OVERFLOW
                        : VIEW_STATE.NO_OVERFLOW;
            }
        });

    function createToolbarWrap(doc) {
        return $$.ele(doc, "div", {
            className: "kf-editor-toolbar"
        });
    }

    function createToolbarContainer(doc) {
        return $$.ele(doc, "div", {
            className: "kf-editor-inner-toolbar"
        });
    }

    function createEditArea(doc) {
        var container = doc.createElement("div");
        container.className = "kf-editor-edit-area";
        container.style.width = "80%";
        container.style.height = "800px";
        return container;
    }
    function createCanvasOptions(doc, kfEditor) {
        var container = doc.createElement("div");
        container.className = "kf-editor-canvas-option";
        // 创建一个 input 输入框
        var input = document.createElement("input");
        input.type = "number"; // 设置为文本输入框
        input.setAttribute("min", 5);
        input.placeholder = "请输入字体大小"; // 占位符
        let fontSize = 16;
        // var curZoom = kfEditor.requestService( "render.get.canvas.zoom" );
        console.log("window.svgZoomwindow.svgZoom", window.svgZoom);
        if (window.svgZoom) {
            fontSize = 50 * 0.32 * window.svgZoom;
        }
        input.value = fontSize;
        container.appendChild(input);
        input.addEventListener("input", function () {
            let scale = (input.value || 16) / 0.32 / 50;
            kfEditor.requestService("render.set.canvas.zoom", scale);
        });
        // 使用颜色选择器
        createColorPicker(container, kfEditor);
        createFrontPicker(container, kfEditor);
        createBoldBtn(container, kfEditor);
        createItalicBtn(container, kfEditor);
        return container;
    }
    function createBoldBtn(parentElement, kfEditor) {
        const button = document.createElement("div");
        if (window.svgFontBold == "1") {
            button.classList.add("kf-custom-active");
        } else {
            button.classList.remove("kf-custom-active");
        }
        button.classList.add('kf-editor-ui-button')
        button.classList.add('kf-editor-ui-enabled')
        button.style.height = 'unset'
        // 创建按钮

        button.textContent = "加粗";
        // 点击按钮切换下拉框显示
        button.addEventListener("click", () => {
            button.classList.toggle("kf-custom-active");
            if (button.classList.contains("kf-custom-active")) {
                kfEditor.execCommand("render.set.front.bold", "1");
            } else {
                kfEditor.execCommand("render.set.front.bold", "0");
            }
        });
        parentElement.appendChild(button);
    }

    function createItalicBtn(parentElement, kfEditor) {
        // 创建按钮
        const button = document.createElement("div");
        button.classList.add('kf-editor-ui-button')
        button.classList.add('kf-editor-ui-enabled')


        
        button.style.height = 'unset'
        if (window.svgFontItalic == "1") {
            button.classList.add("kf-custom-active");
        } else {
            button.classList.remove("kf-custom-active");
        }

        button.textContent = "斜体";

        // 点击按钮切换下拉框显示
        button.addEventListener("click", (event) => {
            button.classList.toggle("kf-custom-active");
            if (button.classList.contains("kf-custom-active")) {
                kfEditor.execCommand("render.set.front.italic", "1");
            } else {
                kfEditor.execCommand("render.set.front.italic", "0");
            }
            event.stopPropagation();
        });
        parentElement.appendChild(button);
    }
    // 创建颜色选择器
    function createColorPicker(parentElement, kfEditor) {
        const colors = [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
            "#000000",
            "#ffffff",
            "#808080",
            "#800000",
            "#808000",
            "#008000",
            "#800080",
            "#008080",
            "#000080",
            "#ffa500"
        ];

        // 创建按钮
        const button = document.createElement("div");

        button.textContent = "选择颜色";
        button.style.position = "relative";
        button.classList.add('kf-editor-ui-button')
        button.classList.add('kf-editor-ui-enabled')
        button.style.height = 'unset'
        

        if(window.svgColor) {
            button.style.background =decodeURIComponent(window.svgColor);

            if(window.svgColor = '#000000') {
                button.style.color = '#ffffff'
            }
            else {
                button.style.color = '#000000'
            }
        }


        // 创建下拉容器
        const dropdown = document.createElement("div");
        dropdown.className = "kf-editor-dropdown";
        dropdown.style.display = "none";

        // 创建颜色方块
        colors.forEach((color) => {
            const colorBlock = document.createElement("div");
            colorBlock.style.background = color;
            colorBlock.style.width = "30px";
            colorBlock.style.height = "30px";
            colorBlock.style.cursor = "pointer";
            colorBlock.style.border = "1px solid #ccc";
            colorBlock.addEventListener("click", () => {
                kfEditor.execCommand("render.set.front.color", color);
                button.style.background = color; // 改变按钮颜色
                if(color = '#000000') {
                    button.style.color = '#ffffff'
                }
                else {
                    button.style.color = '#000000'
                }
                /* var textElements = document.querySelectorAll('.kf-editor-canvas-container svg text');
                let range = kfEditor.services['syntax.update.selection'].provider.record.cursor
                let startOffset = range.startOffset
                let endOffset = range.endOffset
                if (!(endOffset - startOffset)) {
                    var svgElement = document.querySelectorAll(
                        ".kf-editor-canvas-container svg"
                    );
                    svgElement.forEach(function (svg) {
                        svg.setAttribute("fill", color);
                    });
                } else {
                    textElements.forEach(function (text, index) {
                        if (index >= startOffset && index < endOffset) {
                            text.setAttribute("fill", color);
                        }
                    })
                } */
            });
            dropdown.appendChild(colorBlock);
        });

        // 点击按钮切换下拉框显示
        button.addEventListener("click", () => {
            dropdown.style.display =
                dropdown.style.display === "none" ? "grid" : "none";
        });

        // 点击其他地方关闭下拉框
        document.addEventListener("click", (e) => {
            if (!button.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });

        // 将按钮和下拉框添加到父元素
        parentElement.appendChild(button);
        button.appendChild(dropdown);
    }
    // 创建字体选择器
    function createFrontPicker(parentElement, kfEditor) {
        let fonts = [
            // {
            //     name: "默认",
            //     value: "KF AMS MAIN"
            // },
            // {
            //     name: "花体",
            //     value: "KF AMS FRAK"
            // },
            // {
            //     name: "手写体",
            //     value: "KF AMS CAL"
            // },
            // {
            //     name: "双线",
            //     value: "KF AMS BB"
            // },
            {
                name: "微软雅黑",
                value: "Microsoft YaHei"
            },
            { name: " 华文隶书", value: "STLiti" },
            {
                name: " 苹果苹方",
                value: "PingFang SC"
            },
            { name: " 宋体", value: "simsun" },
            { name: " 仿宋体", value: "FangSong" },
            { name: " 黑体", value: "SimHei" },
            { name: " 方正书宋", value: "fzssk" },
            { name: " Arial", value: "arial" },
            { name: " Arial Black", value: "arial black" },
            { name: " Andale Mono", value: "andale mono" },
            { name: " Book Antiqua", value: "book antiqua" },
            { name: " Symbol", value: "symbol" },
            { name: " Times New Roman", value: "times new roman" },

            // { name: "FZBSJW", value: "FZBSJW" },
            // { name: " FZBWKSFW", value: "FZBWKSFW" },
            // { name: " FZBWKSJW", value: "FZBWKSJW" },
            // { name: " FZCCHFW", value: "FZCCHFW" },
            // { name: " FZCCHJW", value: "FZCCHJW" },
            // { name: " FZCHYFW", value: "FZCHYFW" },
            // { name: " FZCHYJW", value: "FZCHYJW" },
            // { name: " FZCQFW", value: "FZCQFW" },
            // { name: " FZCQJW", value: "FZCQJW" },
            // { name: " FZCSFW", value: "FZCSFW" },
            // { name: " FZCSJW", value: "FZCSJW" },
            // { name: " FZCYFW", value: "FZCYFW" },
            // { name: " FZCYJW", value: "FZCYJW" },
            // { name: " FZDBSFW", value: "FZDBSFW" },
            // { name: " FZDBSJW", value: "FZDBSJW" },
            // { name: " FZDHTFW", value: "FZDHTFW" },
            // { name: " FZDHTJW", value: "FZDHTJW" },
            // { name: " FZFSFW", value: "FZFSFW" },
            // { name: " FZFSJW", value: "FZFSJW" },
            // { name: " FZGLFW", value: "FZGLFW" },
            // { name: " FZGLJW", value: "FZGLJW" },
            // { name: " FZH4FW", value: "FZH4FW" },
            // { name: " FZHCJW", value: "FZHCJW" },
            // { name: " FZHLFW", value: "FZHLFW" },
            // { name: " FZHLJW", value: "FZHLJW" },
            // { name: " FZHPFW", value: "FZHPFW" },
            // { name: " FZHPJW", value: "FZHPJW" },
            // { name: " FZHTFW", value: "FZHTFW" },
            // { name: " FZHTJW", value: "FZHTJW" },
            // { name: " FZJZFW", value: "FZJZFW" },
            // { name: " FZJZJW", value: "FZJZJW" },
            // { name: " FZKANGFW", value: "FZKANGFW" },
            // { name: " FZKANGJW", value: "FZKANGJW" },
            // { name: " FZKATFW", value: "FZKATFW" },
            // { name: " FZKATJW", value: "FZKATJW" },
            // { name: " FZKTFW", value: "FZKTFW" },
            // { name: " FZKTJW", value: "FZKTJW" },
            // { name: " FZL2FW", value: "FZL2FW" },
            // { name: " FZL2JW", value: "FZL2JW" },
            // { name: " FZLBFW", value: "FZLBFW" },
            // { name: " FZLBJW", value: "FZLBJW" },
            // { name: " FZLSFW", value: "FZLSFW" },
            // { name: " FZLSJW", value: "FZLSJW" },
            // { name: " FZLXTFW", value: "FZLXTFW" },
            // { name: " FZLXTJW", value: "FZLXTJW" },
            // { name: " FZMHFW", value: "FZMHFW" },
            // { name: " FZMHJW", value: "FZMHJW" },
            // { name: " FZNBSJW", value: "FZNBSJW" },
            // { name: " FZNSTFW", value: "FZNSTFW" },
            // { name: " FZNSTJW", value: "FZNSTJW" },
            // { name: " FZPHFW", value: "FZPHFW" },
            // { name: " FZPHTFW", value: "FZPHTFW" },
            // { name: " FZPHTJW", value: "FZPHTJW" },
            // { name: " FZPTYJW", value: "FZPTYJW" },
            // { name: " FZPWFW", value: "FZPWFW" },
            // { name: " FZPWJW", value: "FZPWJW" },
            // { name: " FZQTFW", value: "FZQTFW" },
            // { name: " FZQTJW", value: "FZQTJW" },
            // { name: " FZS3JW", value: "FZS3JW" },
            // { name: " FZSEFW", value: "FZSEFW" },
            // { name: " FZSEJW", value: "FZSEJW" },
            // { name: " FZSHFW", value: "FZSHFW" },
            // { name: " FZSHHFW", value: "FZSHHFW" },
            // { name: " FZSHHJW", value: "FZSHHJW" },
            // { name: " FZSHJW", value: "FZSHJW" },
            // { name: " FZSJSFW", value: "FZSJSFW" },
            // { name: " FZSJSJW", value: "FZSJSJW" },
            // { name: " FZSSFW", value: "FZSSFW" },
            // { name: " FZSSJW", value: "FZSSJW" },
            // { name: " FZSTFW", value: "FZSTFW" },
            // { name: " FZSTJW", value: "FZSTJW" },
            // { name: " FZSYFW", value: "FZSYFW" },
            // { name: " FZSYJW", value: "FZSYJW" },
            // { name: " FZSZFW", value: "FZSZFW" },
            // { name: " FZSZJW", value: "FZSZJW" },
            // { name: " FZTJLSFW", value: "FZTJLSFW" },
            // { name: " FZTJLSJW", value: "FZTJLSJW" },
            // { name: " FZWBFW", value: "FZWBFW" },
            // { name: " FZWBJW", value: "FZWBJW" },
            // { name: " FZXBSFW", value: "FZXBSFW" },
            // { name: " FZXBSJW", value: "FZXBSJW" },
            // { name: " FZXDXJW", value: "FZXDXJW" },
            // { name: " FZXH1FW", value: "FZXH1FW" },
            // { name: " FZXH1JW", value: "FZXH1JW" },
            // { name: " FZXIANGLFW", value: "FZXIANGLFW" },
            // { name: " FZXIANGLJW", value: "FZXIANGLJW" },
            // { name: " FZXKFW", value: "FZXKFW" },
            // { name: " FZXKJW", value: "FZXKJW" },
            // { name: " FZXLFW", value: "FZXLFW" },
            // { name: " FZXQFW", value: "FZXQFW" },
            // { name: " FZXQJW", value: "FZXQJW" },
            // { name: " FZXSHFW", value: "FZXSHFW" },
            // { name: " FZXSHJW", value: "FZXSHJW" },
            // { name: " FZXSSFW", value: "FZXSSFW" },
            // { name: " FZXXLFW", value: "FZXXLFW" },
            // { name: " FZXZTFW", value: "FZXZTFW" },
            // { name: " FZY1FW", value: "FZY1FW" },
            // { name: " FZY1JW", value: "FZY1JW" },
            // { name: " FZY3FW", value: "FZY3FW" },
            // { name: " FZY3JW", value: "FZY3JW" },
            // { name: " FZY4FW", value: "FZY4FW" },
            // { name: " FZY4JW", value: "FZY4JW" },
            // { name: " FZYBKSFW", value: "FZYBKSFW" },
            // { name: " FZYBKSJW", value: "FZYBKSJW" },
            // { name: " FZYBXSFW", value: "FZYBXSFW" },
            // { name: " FZYBXSJW", value: "FZYBXSJW" },
            // { name: " FZYHFW", value: "FZYHFW" },
            // { name: " FZYHJW", value: "FZYHJW" },
            // { name: " FZYTFW", value: "FZYTFW" },
            // { name: " FZYTJW", value: "FZYTJW" },
            // { name: " FZYXFW", value: "FZYXFW" },
            // { name: " FZYXJW", value: "FZYXJW" },
            // { name: " FZZBHFW", value: "FZZBHFW" },
            // { name: " FZZBHJW", value: "FZZBHJW" },
            // { name: " FZZDXFW", value: "FZZDXFW" },
            // { name: " FZZDXJW", value: "FZZDXJW" },
            // { name: " FZZHYFW", value: "FZZHYFW" },
            // { name: " FZZHYJW", value: "FZZHYJW" },
            // { name: " FZZKFW", value: "FZZKFW" },
            // { name: " FZZQFW", value: "FZZQFW" },
            // { name: " FZZQJW", value: "FZZQJW" },
            // { name: " FZZYFW", value: "FZZYFW" },
            // { name: " FZZYJW", value: "FZZYJW" }
        ];
        // 创建按钮
        const button = document.createElement("div");
        button.classList.add('kf-editor-ui-button')
        button.classList.add('kf-editor-ui-enabled')
        button.style.height = 'unset'
       

        
        button.style.position = "relative";
        const buttonLabel = document.createElement("span");
        buttonLabel.textContent = "选择字体";
        if(window.svgFontFamily) {
            let findItem = fonts.find(f => f.value === decodeURIComponent(window.svgFontFamily));
            if(findItem) {
                buttonLabel.textContent = findItem.name;
            }
        }
        button.appendChild(buttonLabel);

        // 创建下拉容器
        const fontDropdown = document.createElement("div");
        fontDropdown.className = "kf-editor-font-dropdown";
        fontDropdown.style.display = "none";
        fontDropdown.style.height = "200px";
        fontDropdown.style.overflowY = "auto";

        fonts.forEach((font) => {
            const block = document.createElement("div");
            block.className = "font-block";
            block.textContent = font.name;
            block.addEventListener("click", () => {
                buttonLabel.textContent = font.name; // 改变按钮颜色
                kfEditor.execCommand("render.set.front.family", font.value);
            });
            fontDropdown.appendChild(block);
        });

        // 点击按钮切换下拉框显示
        button.addEventListener("click", () => {
            fontDropdown.style.display =
                fontDropdown.style.display === "none" ? "block" : "none";
        });

        // 点击其他地方关闭下拉框
        document.addEventListener("click", (e) => {
            if (!button.contains(e.target)) {
                fontDropdown.style.display = "none";
            }
        });

        // 将按钮和下拉框添加到父元素
        parentElement.appendChild(button);
        button.appendChild(fontDropdown);
    }

    function createCanvasContainer(doc) {
        var container = doc.createElement("div");
        container.className = "kf-editor-canvas-container";
        return container;
    }

    function createScrollbarContainer(doc) {
        var container = doc.createElement("div");
        container.className = "kf-editor-edit-scrollbar";
        return container;
    }

    return UIComponent;
});
