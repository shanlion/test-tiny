tinymce.PluginManager.add("kityformula-editor", function (editor, url) {
    // var baseURL = tinymce.baseURL+'/plugins/kityformula-editor/kityFormula.html';
    // var baseURL = '/tinymce/plugins/kityformula-editor/kityFormula.html';
    var baseURL = "./kityFormula.html";

    editor.on("dblclick", function () {
        let sel = editor.selection.getContent();
        console.log("dblclick", sel);
        let parser = new DOMParser();
        let doc = parser.parseFromString(sel, "text/html");
        let dom = doc.body.firstChild;
        if (dom.getAttribute("data-latex") !== null) {
            // 定义正则表达式
            const latexPattern = /data-latex="([^"]*)"/;
            const colorPattern = /data-color="([^"]*)"/;
            const familyPattern = /data-family="([^"]*)"/;
            const zoomPattern = /data-zoom="([^"]*)"/;
            const boldPattern = /data-bold="([^"]*)"/;
            const italicPattern = /data-italic="([^"]*)"/;

            // 提取数据
            const dataLatexMatch = latexPattern.exec(sel);
            const dataColorMatch = colorPattern.exec(sel);
            const dataFamilyMatch = familyPattern.exec(sel);
            const dataZoomMatch = zoomPattern.exec(sel);
            const dataBoldMatch = boldPattern.exec(sel);
            const dataItalicMatch = italicPattern.exec(sel);

            // 获取值
            const dataLatex = dataLatexMatch ? dataLatexMatch[1] : undefined;
            const dataColor = dataColorMatch ? dataColorMatch[1] : undefined;
            const dataFamily = dataFamilyMatch ? dataFamilyMatch[1] : undefined;
            const dataZoom = dataZoomMatch ? dataZoomMatch[1] : undefined;
            const dataBold = dataBoldMatch ? dataBoldMatch[1] : undefined;

            const dataItalic = dataItalicMatch ? dataItalicMatch[1] : undefined;

            openDialog({
                latex: dataLatex,
                color: dataColor,
                family: dataFamily,
                zoom: dataZoom,
                bold: dataBold,
                italic: dataItalic
            });
        }
    });

    var openDialog = function (params) {
        // {latex, color, family}
        var url = baseURL;
        if (params) {
            url =
                baseURL +
                "?latex=" +
                encodeURIComponent(params.latex) +
                "&color=" +
                encodeURIComponent(params.color) +
                "&family=" +
                encodeURIComponent(params.family) +
                "&zoom=" +
                params.zoom +
                "&bold=" +
                params.bold +
                "&italic=" +
                params.italic;
        } else {
            url =
                baseURL +
                "?color=" +
                encodeURIComponent("#000000") +
                "&family=" +
                encodeURIComponent("times new roman") +
                "&bold=" +
                "0" +
                "&italic=" +
                "1";
        }
        return editor.windowManager.openUrl({
            title: "插入公式",
            size: "large",
            width: 785,
            height: 500,
            url,
            buttons: [
                {
                    type: "cancel",
                    text: "Close"
                },
                {
                    type: "custom",
                    text: "Save",
                    name: "save",
                    primary: true
                }
            ],
            onAction: function (api, details) {
                switch (details.name) {
                    case "save":
                        api.sendMessage("save");
                        break;
                    default:
                        break;
                }
            }
        });
    };

    var formulaNode = {};

    var editFunc = function (api, details) {
        var latex = formulaNode.attributes["data-latex"].value;
        var color =
            formulaNode.attributes["data-color"]?.value || "#000000";
        var family =
            formulaNode.attributes["data-family"]?.value || "KF AMS MAIN";
        var zoom = formulaNode.attributes["data-zoom"]?.value || "1";
        var bold = formulaNode.attributes["data-bold"]?.value || "0";
        var italic = formulaNode.attributes["data-italic"]?.value || "0";

        openDialog({ latex, color, family, zoom, bold, italic });
    }
    var deleteFunc = function (api, details) {
        editor.dom.remove(formulaNode);
        editor.getBody().dispatchEvent(new Event("input"));
    }
    editor.addkityformula = openDialog
    editor.editkityformula = editFunc
    editor.deletekityformula = deleteFunc
});
