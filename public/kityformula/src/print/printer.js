/*!
 * 打印服务
 */

define( function ( require ) {

    var kity = require( "kity" );

    return kity.createClass( "Printer", {

        constructor: function ( kfEditor ) {

            this.kfEditor = kfEditor;

            this.initServices();

            this.initCommands();

        },

        initServices: function () {

            this.kfEditor.registerService( "print.image", this, {
                printImage: this.printImage
            } );

        },

        initCommands: function () {

            this.kfEditor.registerCommand( "get.image.data", this, this.getImageData );

        },

        printImage: function ( type ) {

            var formula = this.kfEditor.requestService( "render.get.paper" );

            this._formatCanvas();

            formula.toPNG( function ( dataUrl ) {

                document.body.innerHTML = '<img style="background: red;" src="'+ dataUrl +'">';

            } );

            this._restoreCanvas();

        },

        getImageData: function ( cb ) {

            var canvas = this.kfEditor.requestService( "render.get.canvas" ),
                formula = this.kfEditor.requestService( "render.get.paper" );

                rect = canvas.container.getRenderBox();

                var curZoom = this.kfEditor.requestService( "render.get.canvas.zoom" );

                var canvasWidth = rect.width * curZoom;
                var canvasHeight = rect.height * curZoom;

            this._formatCanvas({width: canvasWidth, height: canvasHeight });
            var fill = window.svgColor
            var fontFamily = window.svgFontFamily
            formula.toPNG( function ( dataUrl ) {

                cb( {
                    width: canvasWidth,
                    height: canvasHeight,
                    img: dataUrl,
                    zoom: curZoom,
                    fill,
                    fontFamily,
                    bold:window.svgFontBold ? window.svgFontBold : '0',
                    italic:window.svgFontItalic ? window.svgFontItalic : '0',
                } );

            } );

            this._restoreCanvas();

        },

        _formatCanvas: function ({width, height}) {

            var canvas = this.kfEditor.requestService( "render.get.canvas" );

            canvas.node.setAttribute( "width", width );
            canvas.node.setAttribute( "height", height );

            this.kfEditor.requestService( "render.clear.canvas.transform" );
            this.kfEditor.requestService( "control.cursor.hide" );
            this.kfEditor.requestService( "render.clear.select" );

        },

        _restoreCanvas: function () {

            var canvas = this.kfEditor.requestService( "render.get.canvas" );

            canvas.node.setAttribute( "width", "100%" );
            canvas.node.setAttribute( "height", "100%" );

            this.kfEditor.requestService( "render.revert.canvas.transform" );
            this.kfEditor.requestService( "control.cursor.relocation" );
            this.kfEditor.requestService( "render.reselect" );

        }

    } );

} );


