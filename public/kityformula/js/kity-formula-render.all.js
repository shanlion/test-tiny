/*!
 * ====================================================
 * Kity Formula Render - v1.0.0 - 2014-07-30
 * https://github.com/kitygraph/formula
 * GitHub: https://github.com/kitygraph/formula.git
 * Copyright (c) 2014 Baidu Kity Group; Licensed MIT
 * ====================================================
 */

(function () {
    var _p = {
        r: function (index) {
            if (_p[index].inited) {
                return _p[index].value;
            }
            if (typeof _p[index].value === "function") {
                var module = {
                        exports: {}
                    },
                    returnValue = _p[index].value(null, module.exports, module);
                _p[index].inited = true;
                _p[index].value = returnValue;
                if (returnValue !== undefined) {
                    return returnValue;
                } else {
                    for (var key in module.exports) {
                        if (module.exports.hasOwnProperty(key)) {
                            _p[index].inited = true;
                            _p[index].value = module.exports;
                            return module.exports;
                        }
                    }
                }
            } else {
                _p[index].inited = true;
                return _p[index].value;
            }
        }
    };
    window.__p = _p;

    /*!
     * canvg库封装
     * canvg官网： https://code.google.com/p/canvg/
     */
    _p[0] = {
        value: function (require) {
            /**
             * A class to parse color values
             * @author Stoyan Stefanov <sstoo@gmail.com>
             * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
             * @license Use it if you like it
             */
            function RGBColor(color_string) {
                this.ok = false;
                // strip any leading #
                if (color_string.charAt(0) == "#") {
                    // remove # if any
                    color_string = color_string.substr(1, 6);
                }
                color_string = color_string.replace(/ /g, "");
                color_string = color_string.toLowerCase();
                // before getting into regexps, try simple matches
                // and overwrite the input
                var simple_colors = {
                    aliceblue: "f0f8ff",
                    antiquewhite: "faebd7",
                    aqua: "00ffff",
                    aquamarine: "7fffd4",
                    azure: "f0ffff",
                    beige: "f5f5dc",
                    bisque: "ffe4c4",
                    black: "000000",
                    blanchedalmond: "ffebcd",
                    blue: "0000ff",
                    blueviolet: "8a2be2",
                    brown: "a52a2a",
                    burlywood: "deb887",
                    cadetblue: "5f9ea0",
                    chartreuse: "7fff00",
                    chocolate: "d2691e",
                    coral: "ff7f50",
                    cornflowerblue: "6495ed",
                    cornsilk: "fff8dc",
                    crimson: "dc143c",
                    cyan: "00ffff",
                    darkblue: "00008b",
                    darkcyan: "008b8b",
                    darkgoldenrod: "b8860b",
                    darkgray: "a9a9a9",
                    darkgreen: "006400",
                    darkkhaki: "bdb76b",
                    darkmagenta: "8b008b",
                    darkolivegreen: "556b2f",
                    darkorange: "ff8c00",
                    darkorchid: "9932cc",
                    darkred: "8b0000",
                    darksalmon: "e9967a",
                    darkseagreen: "8fbc8f",
                    darkslateblue: "483d8b",
                    darkslategray: "2f4f4f",
                    darkturquoise: "00ced1",
                    darkviolet: "9400d3",
                    deeppink: "ff1493",
                    deepskyblue: "00bfff",
                    dimgray: "696969",
                    dodgerblue: "1e90ff",
                    feldspar: "d19275",
                    firebrick: "b22222",
                    floralwhite: "fffaf0",
                    forestgreen: "228b22",
                    fuchsia: "ff00ff",
                    gainsboro: "dcdcdc",
                    ghostwhite: "f8f8ff",
                    gold: "ffd700",
                    goldenrod: "daa520",
                    gray: "808080",
                    green: "008000",
                    greenyellow: "adff2f",
                    honeydew: "f0fff0",
                    hotpink: "ff69b4",
                    indianred: "cd5c5c",
                    indigo: "4b0082",
                    ivory: "fffff0",
                    khaki: "f0e68c",
                    lavender: "e6e6fa",
                    lavenderblush: "fff0f5",
                    lawngreen: "7cfc00",
                    lemonchiffon: "fffacd",
                    lightblue: "add8e6",
                    lightcoral: "f08080",
                    lightcyan: "e0ffff",
                    lightgoldenrodyellow: "fafad2",
                    lightgrey: "d3d3d3",
                    lightgreen: "90ee90",
                    lightpink: "ffb6c1",
                    lightsalmon: "ffa07a",
                    lightseagreen: "20b2aa",
                    lightskyblue: "87cefa",
                    lightslateblue: "8470ff",
                    lightslategray: "778899",
                    lightsteelblue: "b0c4de",
                    lightyellow: "ffffe0",
                    lime: "00ff00",
                    limegreen: "32cd32",
                    linen: "faf0e6",
                    magenta: "ff00ff",
                    maroon: "800000",
                    mediumaquamarine: "66cdaa",
                    mediumblue: "0000cd",
                    mediumorchid: "ba55d3",
                    mediumpurple: "9370d8",
                    mediumseagreen: "3cb371",
                    mediumslateblue: "7b68ee",
                    mediumspringgreen: "00fa9a",
                    mediumturquoise: "48d1cc",
                    mediumvioletred: "c71585",
                    midnightblue: "191970",
                    mintcream: "f5fffa",
                    mistyrose: "ffe4e1",
                    moccasin: "ffe4b5",
                    navajowhite: "ffdead",
                    navy: "000080",
                    oldlace: "fdf5e6",
                    olive: "808000",
                    olivedrab: "6b8e23",
                    orange: "ffa500",
                    orangered: "ff4500",
                    orchid: "da70d6",
                    palegoldenrod: "eee8aa",
                    palegreen: "98fb98",
                    paleturquoise: "afeeee",
                    palevioletred: "d87093",
                    papayawhip: "ffefd5",
                    peachpuff: "ffdab9",
                    peru: "cd853f",
                    pink: "ffc0cb",
                    plum: "dda0dd",
                    powderblue: "b0e0e6",
                    purple: "800080",
                    red: "ff0000",
                    rosybrown: "bc8f8f",
                    royalblue: "4169e1",
                    saddlebrown: "8b4513",
                    salmon: "fa8072",
                    sandybrown: "f4a460",
                    seagreen: "2e8b57",
                    seashell: "fff5ee",
                    sienna: "a0522d",
                    silver: "c0c0c0",
                    skyblue: "87ceeb",
                    slateblue: "6a5acd",
                    slategray: "708090",
                    snow: "fffafa",
                    springgreen: "00ff7f",
                    steelblue: "4682b4",
                    tan: "d2b48c",
                    teal: "008080",
                    thistle: "d8bfd8",
                    tomato: "ff6347",
                    turquoise: "40e0d0",
                    violet: "ee82ee",
                    violetred: "d02090",
                    wheat: "f5deb3",
                    white: "ffffff",
                    whitesmoke: "f5f5f5",
                    yellow: "ffff00",
                    yellowgreen: "9acd32"
                };
                for (var key in simple_colors) {
                    if (color_string == key) {
                        color_string = simple_colors[key];
                    }
                }
                // emd of simple type-in colors
                // array of color definition objects
                var color_defs = [
                    {
                        re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                        example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
                        process: function (bits) {
                            return [
                                parseInt(bits[1]),
                                parseInt(bits[2]),
                                parseInt(bits[3])
                            ];
                        }
                    },
                    {
                        re: /^(\w{2})(\w{2})(\w{2})$/,
                        example: ["#00ff00", "336699"],
                        process: function (bits) {
                            return [
                                parseInt(bits[1], 16),
                                parseInt(bits[2], 16),
                                parseInt(bits[3], 16)
                            ];
                        }
                    },
                    {
                        re: /^(\w{1})(\w{1})(\w{1})$/,
                        example: ["#fb0", "f0f"],
                        process: function (bits) {
                            return [
                                parseInt(bits[1] + bits[1], 16),
                                parseInt(bits[2] + bits[2], 16),
                                parseInt(bits[3] + bits[3], 16)
                            ];
                        }
                    }
                ];
                // search through the definitions to find a match
                for (var i = 0; i < color_defs.length; i++) {
                    var re = color_defs[i].re;
                    var processor = color_defs[i].process;
                    var bits = re.exec(color_string);
                    if (bits) {
                        channels = processor(bits);
                        this.r = channels[0];
                        this.g = channels[1];
                        this.b = channels[2];
                        this.ok = true;
                    }
                }
                // validate/cleanup values
                this.r =
                    this.r < 0 || isNaN(this.r)
                        ? 0
                        : this.r > 255
                        ? 255
                        : this.r;
                this.g =
                    this.g < 0 || isNaN(this.g)
                        ? 0
                        : this.g > 255
                        ? 255
                        : this.g;
                this.b =
                    this.b < 0 || isNaN(this.b)
                        ? 0
                        : this.b > 255
                        ? 255
                        : this.b;
                // some getters
                this.toRGB = function () {
                    return (
                        "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
                    );
                };
                this.toHex = function () {
                    var r = this.r.toString(16);
                    var g = this.g.toString(16);
                    var b = this.b.toString(16);
                    if (r.length == 1) r = "0" + r;
                    if (g.length == 1) g = "0" + g;
                    if (b.length == 1) b = "0" + b;
                    return "#" + r + g + b;
                };
                // help
                this.getHelpXML = function () {
                    var examples = new Array();
                    // add regexps
                    for (var i = 0; i < color_defs.length; i++) {
                        var example = color_defs[i].example;
                        for (var j = 0; j < example.length; j++) {
                            examples[examples.length] = example[j];
                        }
                    }
                    // add type-in colors
                    for (var sc in simple_colors) {
                        examples[examples.length] = sc;
                    }
                    var xml = document.createElement("ul");
                    xml.setAttribute("id", "rgbcolor-examples");
                    for (var i = 0; i < examples.length; i++) {
                        try {
                            var list_item = document.createElement("li");
                            var list_color = new RGBColor(examples[i]);
                            var example_div = document.createElement("div");
                            example_div.style.cssText =
                                "margin: 3px; " +
                                "border: 1px solid black; " +
                                "background:" +
                                list_color.toHex() +
                                "; " +
                                "color:" +
                                list_color.toHex();
                            example_div.appendChild(
                                document.createTextNode("test")
                            );
                            var list_item_value = document.createTextNode(
                                " " +
                                    examples[i] +
                                    " -> " +
                                    list_color.toRGB() +
                                    " -> " +
                                    list_color.toHex()
                            );
                            list_item.appendChild(example_div);
                            list_item.appendChild(list_item_value);
                            xml.appendChild(list_item);
                        } catch (e) {}
                    }
                    return xml;
                };
            }
            /*

     StackBlur - a fast almost Gaussian Blur For Canvas

     Version: 	0.5
     Author:		Mario Klingemann
     Contact: 	mario@quasimondo.com
     Website:	http://www.quasimondo.com/StackBlurForCanvas
     Twitter:	@quasimondo

     In case you find this class useful - especially in commercial projects -
     I am not totally unhappy for a small donation to my PayPal account
     mario@quasimondo.de

     Or support me on flattr:
     https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

     Copyright (c) 2010 Mario Klingemann

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without
     restriction, including without limitation the rights to use,
     copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the
     Software is furnished to do so, subject to the following
     conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     OTHER DEALINGS IN THE SOFTWARE.
     */
            var mul_table = [
                512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388,
                335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388,
                360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345,
                328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388,
                374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497,
                482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345,
                337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507,
                496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388,
                381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307,
                302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497,
                489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411,
                405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345,
                341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294,
                291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507,
                501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442,
                437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
                385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344,
                341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307,
                304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275,
                273, 271, 269, 267, 265, 263, 261, 259
            ];
            var shg_table = [
                9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
                17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
                19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
                20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
                23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
            ];
            function stackBlurImage(
                imageID,
                canvasID,
                radius,
                blurAlphaChannel
            ) {
                var img = document.getElementById(imageID);
                var w = img.naturalWidth;
                var h = img.naturalHeight;
                var canvas = document.getElementById(canvasID);
                canvas.style.width = w + "px";
                canvas.style.height = h + "px";
                canvas.width = w;
                canvas.height = h;
                var context = canvas.getContext("2d");
                context.clearRect(0, 0, w, h);
                context.drawImage(img, 0, 0);
                if (isNaN(radius) || radius < 1) return;
                if (blurAlphaChannel)
                    stackBlurCanvasRGBA(canvasID, 0, 0, w, h, radius);
                else stackBlurCanvasRGB(canvasID, 0, 0, w, h, radius);
            }
            function stackBlurCanvasRGBA(
                id,
                top_x,
                top_y,
                width,
                height,
                radius
            ) {
                if (isNaN(radius) || radius < 1) return;
                radius |= 0;
                var canvas = document.getElementById(id);
                var context = canvas.getContext("2d");
                var imageData;
                try {
                    try {
                        imageData = context.getImageData(
                            top_x,
                            top_y,
                            width,
                            height
                        );
                    } catch (e) {
                        // NOTE: this part is supposedly only needed if you want to work with local files
                        // so it might be okay to remove the whole try/catch block and just use
                        // imageData = context.getImageData( top_x, top_y, width, height );
                        try {
                            netscape.security.PrivilegeManager.enablePrivilege(
                                "UniversalBrowserRead"
                            );
                            imageData = context.getImageData(
                                top_x,
                                top_y,
                                width,
                                height
                            );
                        } catch (e) {
                            alert("Cannot access local image");
                            throw new Error(
                                "unable to access local image data: " + e
                            );
                            return;
                        }
                    }
                } catch (e) {
                    alert("Cannot access image");
                    throw new Error("unable to access image data: " + e);
                }
                var pixels = imageData.data;
                var x,
                    y,
                    i,
                    p,
                    yp,
                    yi,
                    yw,
                    r_sum,
                    g_sum,
                    b_sum,
                    a_sum,
                    r_out_sum,
                    g_out_sum,
                    b_out_sum,
                    a_out_sum,
                    r_in_sum,
                    g_in_sum,
                    b_in_sum,
                    a_in_sum,
                    pr,
                    pg,
                    pb,
                    pa,
                    rbs;
                var div = radius + radius + 1;
                var w4 = width << 2;
                var widthMinus1 = width - 1;
                var heightMinus1 = height - 1;
                var radiusPlus1 = radius + 1;
                var sumFactor = (radiusPlus1 * (radiusPlus1 + 1)) / 2;
                var stackStart = new BlurStack();
                var stack = stackStart;
                for (i = 1; i < div; i++) {
                    stack = stack.next = new BlurStack();
                    if (i == radiusPlus1) var stackEnd = stack;
                }
                stack.next = stackStart;
                var stackIn = null;
                var stackOut = null;
                yw = yi = 0;
                var mul_sum = mul_table[radius];
                var shg_sum = shg_table[radius];
                for (y = 0; y < height; y++) {
                    r_in_sum =
                        g_in_sum =
                        b_in_sum =
                        a_in_sum =
                        r_sum =
                        g_sum =
                        b_sum =
                        a_sum =
                            0;
                    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
                    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
                    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
                    a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
                    r_sum += sumFactor * pr;
                    g_sum += sumFactor * pg;
                    b_sum += sumFactor * pb;
                    a_sum += sumFactor * pa;
                    stack = stackStart;
                    for (i = 0; i < radiusPlus1; i++) {
                        stack.r = pr;
                        stack.g = pg;
                        stack.b = pb;
                        stack.a = pa;
                        stack = stack.next;
                    }
                    for (i = 1; i < radiusPlus1; i++) {
                        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
                        r_sum +=
                            (stack.r = pr = pixels[p]) *
                            (rbs = radiusPlus1 - i);
                        g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
                        b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
                        a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
                        r_in_sum += pr;
                        g_in_sum += pg;
                        b_in_sum += pb;
                        a_in_sum += pa;
                        stack = stack.next;
                    }
                    stackIn = stackStart;
                    stackOut = stackEnd;
                    for (x = 0; x < width; x++) {
                        pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
                        if (pa != 0) {
                            pa = 255 / pa;
                            pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
                            pixels[yi + 1] =
                                ((g_sum * mul_sum) >> shg_sum) * pa;
                            pixels[yi + 2] =
                                ((b_sum * mul_sum) >> shg_sum) * pa;
                        } else {
                            pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
                        }
                        r_sum -= r_out_sum;
                        g_sum -= g_out_sum;
                        b_sum -= b_out_sum;
                        a_sum -= a_out_sum;
                        r_out_sum -= stackIn.r;
                        g_out_sum -= stackIn.g;
                        b_out_sum -= stackIn.b;
                        a_out_sum -= stackIn.a;
                        p =
                            (yw +
                                ((p = x + radius + 1) < widthMinus1
                                    ? p
                                    : widthMinus1)) <<
                            2;
                        r_in_sum += stackIn.r = pixels[p];
                        g_in_sum += stackIn.g = pixels[p + 1];
                        b_in_sum += stackIn.b = pixels[p + 2];
                        a_in_sum += stackIn.a = pixels[p + 3];
                        r_sum += r_in_sum;
                        g_sum += g_in_sum;
                        b_sum += b_in_sum;
                        a_sum += a_in_sum;
                        stackIn = stackIn.next;
                        r_out_sum += pr = stackOut.r;
                        g_out_sum += pg = stackOut.g;
                        b_out_sum += pb = stackOut.b;
                        a_out_sum += pa = stackOut.a;
                        r_in_sum -= pr;
                        g_in_sum -= pg;
                        b_in_sum -= pb;
                        a_in_sum -= pa;
                        stackOut = stackOut.next;
                        yi += 4;
                    }
                    yw += width;
                }
                for (x = 0; x < width; x++) {
                    g_in_sum =
                        b_in_sum =
                        a_in_sum =
                        r_in_sum =
                        g_sum =
                        b_sum =
                        a_sum =
                        r_sum =
                            0;
                    yi = x << 2;
                    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
                    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
                    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
                    a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
                    r_sum += sumFactor * pr;
                    g_sum += sumFactor * pg;
                    b_sum += sumFactor * pb;
                    a_sum += sumFactor * pa;
                    stack = stackStart;
                    for (i = 0; i < radiusPlus1; i++) {
                        stack.r = pr;
                        stack.g = pg;
                        stack.b = pb;
                        stack.a = pa;
                        stack = stack.next;
                    }
                    yp = width;
                    for (i = 1; i <= radius; i++) {
                        yi = (yp + x) << 2;
                        r_sum +=
                            (stack.r = pr = pixels[yi]) *
                            (rbs = radiusPlus1 - i);
                        g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
                        b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
                        a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
                        r_in_sum += pr;
                        g_in_sum += pg;
                        b_in_sum += pb;
                        a_in_sum += pa;
                        stack = stack.next;
                        if (i < heightMinus1) {
                            yp += width;
                        }
                    }
                    yi = x;
                    stackIn = stackStart;
                    stackOut = stackEnd;
                    for (y = 0; y < height; y++) {
                        p = yi << 2;
                        pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
                        if (pa > 0) {
                            pa = 255 / pa;
                            pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
                            pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                            pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
                        } else {
                            pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
                        }
                        r_sum -= r_out_sum;
                        g_sum -= g_out_sum;
                        b_sum -= b_out_sum;
                        a_sum -= a_out_sum;
                        r_out_sum -= stackIn.r;
                        g_out_sum -= stackIn.g;
                        b_out_sum -= stackIn.b;
                        a_out_sum -= stackIn.a;
                        p =
                            (x +
                                ((p = y + radiusPlus1) < heightMinus1
                                    ? p
                                    : heightMinus1) *
                                    width) <<
                            2;
                        r_sum += r_in_sum += stackIn.r = pixels[p];
                        g_sum += g_in_sum += stackIn.g = pixels[p + 1];
                        b_sum += b_in_sum += stackIn.b = pixels[p + 2];
                        a_sum += a_in_sum += stackIn.a = pixels[p + 3];
                        stackIn = stackIn.next;
                        r_out_sum += pr = stackOut.r;
                        g_out_sum += pg = stackOut.g;
                        b_out_sum += pb = stackOut.b;
                        a_out_sum += pa = stackOut.a;
                        r_in_sum -= pr;
                        g_in_sum -= pg;
                        b_in_sum -= pb;
                        a_in_sum -= pa;
                        stackOut = stackOut.next;
                        yi += width;
                    }
                }
                context.putImageData(imageData, top_x, top_y);
            }
            function stackBlurCanvasRGB(
                id,
                top_x,
                top_y,
                width,
                height,
                radius
            ) {
                if (isNaN(radius) || radius < 1) return;
                radius |= 0;
                var canvas = document.getElementById(id);
                var context = canvas.getContext("2d");
                var imageData;
                try {
                    try {
                        imageData = context.getImageData(
                            top_x,
                            top_y,
                            width,
                            height
                        );
                    } catch (e) {
                        // NOTE: this part is supposedly only needed if you want to work with local files
                        // so it might be okay to remove the whole try/catch block and just use
                        // imageData = context.getImageData( top_x, top_y, width, height );
                        try {
                            netscape.security.PrivilegeManager.enablePrivilege(
                                "UniversalBrowserRead"
                            );
                            imageData = context.getImageData(
                                top_x,
                                top_y,
                                width,
                                height
                            );
                        } catch (e) {
                            alert("Cannot access local image");
                            throw new Error(
                                "unable to access local image data: " + e
                            );
                            return;
                        }
                    }
                } catch (e) {
                    alert("Cannot access image");
                    throw new Error("unable to access image data: " + e);
                }
                var pixels = imageData.data;
                var x,
                    y,
                    i,
                    p,
                    yp,
                    yi,
                    yw,
                    r_sum,
                    g_sum,
                    b_sum,
                    r_out_sum,
                    g_out_sum,
                    b_out_sum,
                    r_in_sum,
                    g_in_sum,
                    b_in_sum,
                    pr,
                    pg,
                    pb,
                    rbs;
                var div = radius + radius + 1;
                var w4 = width << 2;
                var widthMinus1 = width - 1;
                var heightMinus1 = height - 1;
                var radiusPlus1 = radius + 1;
                var sumFactor = (radiusPlus1 * (radiusPlus1 + 1)) / 2;
                var stackStart = new BlurStack();
                var stack = stackStart;
                for (i = 1; i < div; i++) {
                    stack = stack.next = new BlurStack();
                    if (i == radiusPlus1) var stackEnd = stack;
                }
                stack.next = stackStart;
                var stackIn = null;
                var stackOut = null;
                yw = yi = 0;
                var mul_sum = mul_table[radius];
                var shg_sum = shg_table[radius];
                for (y = 0; y < height; y++) {
                    r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;
                    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
                    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
                    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
                    r_sum += sumFactor * pr;
                    g_sum += sumFactor * pg;
                    b_sum += sumFactor * pb;
                    stack = stackStart;
                    for (i = 0; i < radiusPlus1; i++) {
                        stack.r = pr;
                        stack.g = pg;
                        stack.b = pb;
                        stack = stack.next;
                    }
                    for (i = 1; i < radiusPlus1; i++) {
                        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
                        r_sum +=
                            (stack.r = pr = pixels[p]) *
                            (rbs = radiusPlus1 - i);
                        g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
                        b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
                        r_in_sum += pr;
                        g_in_sum += pg;
                        b_in_sum += pb;
                        stack = stack.next;
                    }
                    stackIn = stackStart;
                    stackOut = stackEnd;
                    for (x = 0; x < width; x++) {
                        pixels[yi] = (r_sum * mul_sum) >> shg_sum;
                        pixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
                        pixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;
                        r_sum -= r_out_sum;
                        g_sum -= g_out_sum;
                        b_sum -= b_out_sum;
                        r_out_sum -= stackIn.r;
                        g_out_sum -= stackIn.g;
                        b_out_sum -= stackIn.b;
                        p =
                            (yw +
                                ((p = x + radius + 1) < widthMinus1
                                    ? p
                                    : widthMinus1)) <<
                            2;
                        r_in_sum += stackIn.r = pixels[p];
                        g_in_sum += stackIn.g = pixels[p + 1];
                        b_in_sum += stackIn.b = pixels[p + 2];
                        r_sum += r_in_sum;
                        g_sum += g_in_sum;
                        b_sum += b_in_sum;
                        stackIn = stackIn.next;
                        r_out_sum += pr = stackOut.r;
                        g_out_sum += pg = stackOut.g;
                        b_out_sum += pb = stackOut.b;
                        r_in_sum -= pr;
                        g_in_sum -= pg;
                        b_in_sum -= pb;
                        stackOut = stackOut.next;
                        yi += 4;
                    }
                    yw += width;
                }
                for (x = 0; x < width; x++) {
                    g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;
                    yi = x << 2;
                    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
                    g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
                    b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
                    r_sum += sumFactor * pr;
                    g_sum += sumFactor * pg;
                    b_sum += sumFactor * pb;
                    stack = stackStart;
                    for (i = 0; i < radiusPlus1; i++) {
                        stack.r = pr;
                        stack.g = pg;
                        stack.b = pb;
                        stack = stack.next;
                    }
                    yp = width;
                    for (i = 1; i <= radius; i++) {
                        yi = (yp + x) << 2;
                        r_sum +=
                            (stack.r = pr = pixels[yi]) *
                            (rbs = radiusPlus1 - i);
                        g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
                        b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
                        r_in_sum += pr;
                        g_in_sum += pg;
                        b_in_sum += pb;
                        stack = stack.next;
                        if (i < heightMinus1) {
                            yp += width;
                        }
                    }
                    yi = x;
                    stackIn = stackStart;
                    stackOut = stackEnd;
                    for (y = 0; y < height; y++) {
                        p = yi << 2;
                        pixels[p] = (r_sum * mul_sum) >> shg_sum;
                        pixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
                        pixels[p + 2] = (b_sum * mul_sum) >> shg_sum;
                        r_sum -= r_out_sum;
                        g_sum -= g_out_sum;
                        b_sum -= b_out_sum;
                        r_out_sum -= stackIn.r;
                        g_out_sum -= stackIn.g;
                        b_out_sum -= stackIn.b;
                        p =
                            (x +
                                ((p = y + radiusPlus1) < heightMinus1
                                    ? p
                                    : heightMinus1) *
                                    width) <<
                            2;
                        r_sum += r_in_sum += stackIn.r = pixels[p];
                        g_sum += g_in_sum += stackIn.g = pixels[p + 1];
                        b_sum += b_in_sum += stackIn.b = pixels[p + 2];
                        stackIn = stackIn.next;
                        r_out_sum += pr = stackOut.r;
                        g_out_sum += pg = stackOut.g;
                        b_out_sum += pb = stackOut.b;
                        r_in_sum -= pr;
                        g_in_sum -= pg;
                        b_in_sum -= pb;
                        stackOut = stackOut.next;
                        yi += width;
                    }
                }
                context.putImageData(imageData, top_x, top_y);
            }
            function BlurStack() {
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.a = 0;
                this.next = null;
            }
            /*
             * canvg.js - Javascript SVG parser and renderer on Canvas
             * MIT Licensed
             * Gabe Lerner (gabelerner@gmail.com)
             * http://code.google.com/p/canvg/
             *
             * Requires: rgbcolor.js - http://www.phpied.com/rgb-color-parser-in-javascript/
             */
            (function () {
                // canvg(target, s)
                // empty parameters: replace all 'svg' elements on page with 'canvas' elements
                // target: canvas element or the id of a canvas element
                // s: svg string, url to svg file, or xml document
                // opts: optional hash of options
                //		 ignoreMouse: true => ignore mouse events
                //		 ignoreAnimation: true => ignore animations
                //		 ignoreDimensions: true => does not try to resize canvas
                //		 ignoreClear: true => does not clear canvas
                //		 offsetX: int => draws at a x offset
                //		 offsetY: int => draws at a y offset
                //		 scaleWidth: int => scales horizontally to width
                //		 scaleHeight: int => scales vertically to height
                //		 renderCallback: function => will call the function after the first render is completed
                //		 forceRedraw: function => will call the function on every frame, if it returns true, will redraw
                this.canvg = function (target, s, opts) {
                    // no parameters
                    if (target == null && s == null && opts == null) {
                        var svgTags = document.getElementsByTagName("svg");
                        for (var i = 0; i < svgTags.length; i++) {
                            var svgTag = svgTags[i];
                            var c = document.createElement("canvas");
                            c.width = svgTag.clientWidth;
                            c.height = svgTag.clientHeight;
                            svgTag.parentNode.insertBefore(c, svgTag);
                            svgTag.parentNode.removeChild(svgTag);
                            var div = document.createElement("div");
                            div.appendChild(svgTag);
                            canvg(c, div.innerHTML);
                        }
                        return;
                    }
                    opts = opts || {};
                    if (typeof target == "string") {
                        target = document.getElementById(target);
                    }
                    // store class on canvas
                    if (target.svg != null) target.svg.stop();
                    var svg = build();
                    // on i.e. 8 for flash canvas, we can't assign the property so check for it
                    if (
                        !(
                            target.childNodes.length == 1 &&
                            target.childNodes[0].nodeName == "OBJECT"
                        )
                    )
                        target.svg = svg;
                    svg.opts = opts;
                    var ctx = target.getContext("2d");
                    if (typeof s.documentElement != "undefined") {
                        // load from xml doc
                        svg.loadXmlDoc(ctx, s);
                    } else if (s.substr(0, 1) == "<") {
                        // load from xml string
                        svg.loadXml(ctx, s);
                    } else {
                        // load from url
                        svg.load(ctx, s);
                    }
                };
                function build() {
                    var svg = {};
                    svg.FRAMERATE = 30;
                    svg.MAX_VIRTUAL_PIXELS = 3e4;
                    // globals
                    svg.init = function (ctx) {
                        var uniqueId = 0;
                        svg.UniqueId = function () {
                            uniqueId++;
                            return "canvg" + uniqueId;
                        };
                        svg.Definitions = {};
                        svg.Styles = {};
                        svg.Animations = [];
                        svg.Images = [];
                        svg.ctx = ctx;
                        svg.ViewPort = new (function () {
                            this.viewPorts = [];
                            this.Clear = function () {
                                this.viewPorts = [];
                            };
                            this.SetCurrent = function (width, height) {
                                this.viewPorts.push({
                                    width: width,
                                    height: height
                                });
                            };
                            this.RemoveCurrent = function () {
                                this.viewPorts.pop();
                            };
                            this.Current = function () {
                                return this.viewPorts[
                                    this.viewPorts.length - 1
                                ];
                            };
                            this.width = function () {
                                return this.Current().width;
                            };
                            this.height = function () {
                                return this.Current().height;
                            };
                            this.ComputeSize = function (d) {
                                if (d != null && typeof d == "number") return d;
                                if (d == "x") return this.width();
                                if (d == "y") return this.height();
                                return (
                                    Math.sqrt(
                                        Math.pow(this.width(), 2) +
                                            Math.pow(this.height(), 2)
                                    ) / Math.sqrt(2)
                                );
                            };
                        })();
                    };
                    svg.init();
                    // images loaded
                    svg.ImagesLoaded = function () {
                        for (var i = 0; i < svg.Images.length; i++) {
                            if (!svg.Images[i].loaded) return false;
                        }
                        return true;
                    };
                    // trim
                    svg.trim = function (s) {
                        return s.replace(/^\s+|\s+$/g, "");
                    };
                    // compress spaces
                    svg.compressSpaces = function (s) {
                        return s.replace(/[\s\r\t\n]+/gm, " ");
                    };
                    // ajax
                    svg.ajax = function (url) {
                        var AJAX;
                        if (window.XMLHttpRequest) {
                            AJAX = new XMLHttpRequest();
                        } else {
                            AJAX = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        if (AJAX) {
                            AJAX.open("GET", url, false);
                            AJAX.send(null);
                            return AJAX.responseText;
                        }
                        return null;
                    };
                    // parse xml
                    svg.parseXml = function (xml) {
                        if (window.DOMParser) {
                            var parser = new DOMParser();
                            return parser.parseFromString(xml, "text/xml");
                        } else {
                            xml = xml.replace(/<!DOCTYPE svg[^>]*>/, "");
                            var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                            xmlDoc.async = "false";
                            xmlDoc.loadXML(xml);
                            return xmlDoc;
                        }
                    };
                    svg.Property = function (name, value) {
                        this.name = name;
                        this.value = value;
                    };
                    svg.Property.prototype.getValue = function () {
                        return this.value;
                    };
                    svg.Property.prototype.hasValue = function () {
                        return this.value != null && this.value !== "";
                    };
                    // return the numerical value of the property
                    svg.Property.prototype.numValue = function () {
                        if (!this.hasValue()) return 0;
                        var n = parseFloat(this.value);
                        if ((this.value + "").match(/%$/)) {
                            n = n / 100;
                        }
                        return n;
                    };
                    svg.Property.prototype.valueOrDefault = function (def) {
                        if (this.hasValue()) return this.value;
                        return def;
                    };
                    svg.Property.prototype.numValueOrDefault = function (def) {
                        if (this.hasValue()) return this.numValue();
                        return def;
                    };
                    // color extensions
                    // augment the current color value with the opacity
                    svg.Property.prototype.addOpacity = function (opacity) {
                        var newValue = this.value;
                        if (
                            opacity != null &&
                            opacity != "" &&
                            typeof this.value == "string"
                        ) {
                            // can only add opacity to colors, not patterns
                            var color = new RGBColor(this.value);
                            if (color.ok) {
                                newValue =
                                    "rgba(" +
                                    color.r +
                                    ", " +
                                    color.g +
                                    ", " +
                                    color.b +
                                    ", " +
                                    opacity +
                                    ")";
                            }
                        }
                        return new svg.Property(this.name, newValue);
                    };
                    // definition extensions
                    // get the definition from the definitions table
                    svg.Property.prototype.getDefinition = function () {
                        var name = this.value.match(/#([^\)'"]+)/);
                        if (name) {
                            name = name[1];
                        }
                        if (!name) {
                            name = this.value;
                        }
                        return svg.Definitions[name];
                    };
                    svg.Property.prototype.isUrlDefinition = function () {
                        return this.value.indexOf("url(") == 0;
                    };
                    svg.Property.prototype.getFillStyleDefinition = function (
                        e,
                        opacityProp
                    ) {
                        var def = this.getDefinition();
                        // gradient
                        if (def != null && def.createGradient) {
                            return def.createGradient(svg.ctx, e, opacityProp);
                        }
                        // pattern
                        if (def != null && def.createPattern) {
                            if (def.getHrefAttribute().hasValue()) {
                                var pt = def.attribute("patternTransform");
                                def = def.getHrefAttribute().getDefinition();
                                if (pt.hasValue()) {
                                    def.attribute(
                                        "patternTransform",
                                        true
                                    ).value = pt.value;
                                }
                            }
                            return def.createPattern(svg.ctx, e);
                        }
                        return null;
                    };
                    // length extensions
                    svg.Property.prototype.getDPI = function (viewPort) {
                        return 96;
                    };
                    svg.Property.prototype.getEM = function (viewPort) {
                        var em = 12;
                        var fontSize = new svg.Property(
                            "fontSize",
                            svg.Font.Parse(svg.ctx.font).fontSize
                        );
                        if (fontSize.hasValue())
                            em = fontSize.toPixels(viewPort);
                        return em;
                    };
                    svg.Property.prototype.getUnits = function () {
                        var s = this.value + "";
                        return s.replace(/[0-9\.\-]/g, "");
                    };
                    // get the length as pixels
                    svg.Property.prototype.toPixels = function (
                        viewPort,
                        processPercent
                    ) {
                        if (!this.hasValue()) return 0;
                        var s = this.value + "";
                        if (s.match(/em$/))
                            return this.numValue() * this.getEM(viewPort);
                        if (s.match(/ex$/))
                            return (this.numValue() * this.getEM(viewPort)) / 2;
                        if (s.match(/px$/)) return this.numValue();
                        if (s.match(/pt$/))
                            return (
                                this.numValue() *
                                this.getDPI(viewPort) *
                                (1 / 72)
                            );
                        if (s.match(/pc$/)) return this.numValue() * 15;
                        if (s.match(/cm$/))
                            return (
                                (this.numValue() * this.getDPI(viewPort)) / 2.54
                            );
                        if (s.match(/mm$/))
                            return (
                                (this.numValue() * this.getDPI(viewPort)) / 25.4
                            );
                        if (s.match(/in$/))
                            return this.numValue() * this.getDPI(viewPort);
                        if (s.match(/%$/))
                            return (
                                this.numValue() *
                                svg.ViewPort.ComputeSize(viewPort)
                            );
                        var n = this.numValue();
                        if (processPercent && n < 1)
                            return n * svg.ViewPort.ComputeSize(viewPort);
                        return n;
                    };
                    // time extensions
                    // get the time as milliseconds
                    svg.Property.prototype.toMilliseconds = function () {
                        if (!this.hasValue()) return 0;
                        var s = this.value + "";
                        if (s.match(/s$/)) return this.numValue() * 1e3;
                        if (s.match(/ms$/)) return this.numValue();
                        return this.numValue();
                    };
                    // angle extensions
                    // get the angle as radians
                    svg.Property.prototype.toRadians = function () {
                        if (!this.hasValue()) return 0;
                        var s = this.value + "";
                        if (s.match(/deg$/))
                            return this.numValue() * (Math.PI / 180);
                        if (s.match(/grad$/))
                            return this.numValue() * (Math.PI / 200);
                        if (s.match(/rad$/)) return this.numValue();
                        return this.numValue() * (Math.PI / 180);
                    };
                    // fonts
                    svg.Font = new (function () {
                        this.Styles = "normal|italic|oblique|inherit";
                        this.Variants = "normal|small-caps|inherit";
                        this.Weights =
                            "normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit";
                        this.CreateFont = function (
                            fontStyle,
                            fontVariant,
                            fontWeight,
                            fontSize,
                            fontFamily,
                            inherit
                        ) {
                            var f =
                                inherit != null
                                    ? this.Parse(inherit)
                                    : this.CreateFont(
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          svg.ctx.font
                                      );
                            return {
                                fontFamily: fontFamily || f.fontFamily,
                                fontSize: fontSize || f.fontSize,
                                fontStyle: fontStyle || f.fontStyle,
                                fontWeight: fontWeight || f.fontWeight,
                                fontVariant: fontVariant || f.fontVariant,
                                toString: function () {
                                    return [
                                        this.fontStyle,
                                        this.fontVariant,
                                        this.fontWeight,
                                        this.fontSize,
                                        this.fontFamily
                                    ].join(" ");
                                }
                            };
                        };
                        var that = this;
                        this.Parse = function (s) {
                            var f = {};
                            var d = svg
                                .trim(svg.compressSpaces(s || ""))
                                .split(" ");
                            var set = {
                                fontSize: false,
                                fontStyle: false,
                                fontWeight: false,
                                fontVariant: false
                            };
                            var ff = "";
                            for (var i = 0; i < d.length; i++) {
                                if (
                                    !set.fontStyle &&
                                    that.Styles.indexOf(d[i]) != -1
                                ) {
                                    if (d[i] != "inherit") f.fontStyle = d[i];
                                    set.fontStyle = true;
                                } else if (
                                    !set.fontVariant &&
                                    that.Variants.indexOf(d[i]) != -1
                                ) {
                                    if (d[i] != "inherit") f.fontVariant = d[i];
                                    set.fontStyle = set.fontVariant = true;
                                } else if (
                                    !set.fontWeight &&
                                    that.Weights.indexOf(d[i]) != -1
                                ) {
                                    if (d[i] != "inherit") f.fontWeight = d[i];
                                    set.fontStyle =
                                        set.fontVariant =
                                        set.fontWeight =
                                            true;
                                } else if (!set.fontSize) {
                                    if (d[i] != "inherit")
                                        f.fontSize = d[i].split("/")[0];
                                    set.fontStyle =
                                        set.fontVariant =
                                        set.fontWeight =
                                        set.fontSize =
                                            true;
                                } else {
                                    if (d[i] != "inherit") ff += d[i];
                                }
                            }
                            if (ff != "") f.fontFamily = ff;
                            return f;
                        };
                    })();
                    // points and paths
                    svg.ToNumberArray = function (s) {
                        var a = svg
                            .trim(
                                svg.compressSpaces((s || "").replace(/,/g, " "))
                            )
                            .split(" ");
                        for (var i = 0; i < a.length; i++) {
                            a[i] = parseFloat(a[i]);
                        }
                        return a;
                    };
                    svg.Point = function (x, y) {
                        this.x = x;
                        this.y = y;
                    };
                    svg.Point.prototype.angleTo = function (p) {
                        return Math.atan2(p.y - this.y, p.x - this.x);
                    };
                    svg.Point.prototype.applyTransform = function (v) {
                        var xp = this.x * v[0] + this.y * v[2] + v[4];
                        var yp = this.x * v[1] + this.y * v[3] + v[5];
                        this.x = xp;
                        this.y = yp;
                    };
                    svg.CreatePoint = function (s) {
                        var a = svg.ToNumberArray(s);
                        return new svg.Point(a[0], a[1]);
                    };
                    svg.CreatePath = function (s) {
                        var a = svg.ToNumberArray(s);
                        var path = [];
                        for (var i = 0; i < a.length; i += 2) {
                            path.push(new svg.Point(a[i], a[i + 1]));
                        }
                        return path;
                    };
                    // bounding box
                    svg.BoundingBox = function (x1, y1, x2, y2) {
                        // pass in initial points if you want
                        this.x1 = Number.NaN;
                        this.y1 = Number.NaN;
                        this.x2 = Number.NaN;
                        this.y2 = Number.NaN;
                        this.x = function () {
                            return this.x1;
                        };
                        this.y = function () {
                            return this.y1;
                        };
                        this.width = function () {
                            return this.x2 - this.x1;
                        };
                        this.height = function () {
                            return this.y2 - this.y1;
                        };
                        this.addPoint = function (x, y) {
                            if (x != null) {
                                if (isNaN(this.x1) || isNaN(this.x2)) {
                                    this.x1 = x;
                                    this.x2 = x;
                                }
                                if (x < this.x1) this.x1 = x;
                                if (x > this.x2) this.x2 = x;
                            }
                            if (y != null) {
                                if (isNaN(this.y1) || isNaN(this.y2)) {
                                    this.y1 = y;
                                    this.y2 = y;
                                }
                                if (y < this.y1) this.y1 = y;
                                if (y > this.y2) this.y2 = y;
                            }
                        };
                        this.addX = function (x) {
                            this.addPoint(x, null);
                        };
                        this.addY = function (y) {
                            this.addPoint(null, y);
                        };
                        this.addBoundingBox = function (bb) {
                            this.addPoint(bb.x1, bb.y1);
                            this.addPoint(bb.x2, bb.y2);
                        };
                        this.addQuadraticCurve = function (
                            p0x,
                            p0y,
                            p1x,
                            p1y,
                            p2x,
                            p2y
                        ) {
                            var cp1x = p0x + (2 / 3) * (p1x - p0x);
                            // CP1 = QP0 + 2/3 *(QP1-QP0)
                            var cp1y = p0y + (2 / 3) * (p1y - p0y);
                            // CP1 = QP0 + 2/3 *(QP1-QP0)
                            var cp2x = cp1x + (1 / 3) * (p2x - p0x);
                            // CP2 = CP1 + 1/3 *(QP2-QP0)
                            var cp2y = cp1y + (1 / 3) * (p2y - p0y);
                            // CP2 = CP1 + 1/3 *(QP2-QP0)
                            this.addBezierCurve(
                                p0x,
                                p0y,
                                cp1x,
                                cp2x,
                                cp1y,
                                cp2y,
                                p2x,
                                p2y
                            );
                        };
                        this.addBezierCurve = function (
                            p0x,
                            p0y,
                            p1x,
                            p1y,
                            p2x,
                            p2y,
                            p3x,
                            p3y
                        ) {
                            // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
                            var p0 = [p0x, p0y],
                                p1 = [p1x, p1y],
                                p2 = [p2x, p2y],
                                p3 = [p3x, p3y];
                            this.addPoint(p0[0], p0[1]);
                            this.addPoint(p3[0], p3[1]);
                            for (i = 0; i <= 1; i++) {
                                var f = function (t) {
                                    return (
                                        Math.pow(1 - t, 3) * p0[i] +
                                        3 * Math.pow(1 - t, 2) * t * p1[i] +
                                        3 * (1 - t) * Math.pow(t, 2) * p2[i] +
                                        Math.pow(t, 3) * p3[i]
                                    );
                                };
                                var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
                                var a =
                                    -3 * p0[i] +
                                    9 * p1[i] -
                                    9 * p2[i] +
                                    3 * p3[i];
                                var c = 3 * p1[i] - 3 * p0[i];
                                if (a == 0) {
                                    if (b == 0) continue;
                                    var t = -c / b;
                                    if (0 < t && t < 1) {
                                        if (i == 0) this.addX(f(t));
                                        if (i == 1) this.addY(f(t));
                                    }
                                    continue;
                                }
                                var b2ac = Math.pow(b, 2) - 4 * c * a;
                                if (b2ac < 0) continue;
                                var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
                                if (0 < t1 && t1 < 1) {
                                    if (i == 0) this.addX(f(t1));
                                    if (i == 1) this.addY(f(t1));
                                }
                                var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
                                if (0 < t2 && t2 < 1) {
                                    if (i == 0) this.addX(f(t2));
                                    if (i == 1) this.addY(f(t2));
                                }
                            }
                        };
                        this.isPointInBox = function (x, y) {
                            return (
                                this.x1 <= x &&
                                x <= this.x2 &&
                                this.y1 <= y &&
                                y <= this.y2
                            );
                        };
                        this.addPoint(x1, y1);
                        this.addPoint(x2, y2);
                    };
                    // transforms
                    svg.Transform = function (v) {
                        var that = this;
                        this.Type = {};
                        // translate
                        this.Type.translate = function (s) {
                            this.p = svg.CreatePoint(s);
                            this.apply = function (ctx) {
                                ctx.translate(this.p.x || 0, this.p.y || 0);
                            };
                            this.unapply = function (ctx) {
                                ctx.translate(
                                    -1 * this.p.x || 0,
                                    -1 * this.p.y || 0
                                );
                            };
                            this.applyToPoint = function (p) {
                                p.applyTransform([
                                    1,
                                    0,
                                    0,
                                    1,
                                    this.p.x || 0,
                                    this.p.y || 0
                                ]);
                            };
                        };
                        // rotate
                        this.Type.rotate = function (s) {
                            var a = svg.ToNumberArray(s);
                            this.angle = new svg.Property("angle", a[0]);
                            this.cx = a[1] || 0;
                            this.cy = a[2] || 0;
                            this.apply = function (ctx) {
                                ctx.translate(this.cx, this.cy);
                                ctx.rotate(this.angle.toRadians());
                                ctx.translate(-this.cx, -this.cy);
                            };
                            this.unapply = function (ctx) {
                                ctx.translate(this.cx, this.cy);
                                ctx.rotate(-1 * this.angle.toRadians());
                                ctx.translate(-this.cx, -this.cy);
                            };
                            this.applyToPoint = function (p) {
                                var a = this.angle.toRadians();
                                p.applyTransform([
                                    1,
                                    0,
                                    0,
                                    1,
                                    this.p.x || 0,
                                    this.p.y || 0
                                ]);
                                p.applyTransform([
                                    Math.cos(a),
                                    Math.sin(a),
                                    -Math.sin(a),
                                    Math.cos(a),
                                    0,
                                    0
                                ]);
                                p.applyTransform([
                                    1,
                                    0,
                                    0,
                                    1,
                                    -this.p.x || 0,
                                    -this.p.y || 0
                                ]);
                            };
                        };
                        this.Type.scale = function (s) {
                            this.p = svg.CreatePoint(s);
                            this.apply = function (ctx) {
                                ctx.scale(
                                    this.p.x || 1,
                                    this.p.y || this.p.x || 1
                                );
                            };
                            this.unapply = function (ctx) {
                                ctx.scale(
                                    1 / this.p.x || 1,
                                    1 / this.p.y || this.p.x || 1
                                );
                            };
                            this.applyToPoint = function (p) {
                                p.applyTransform([
                                    this.p.x || 0,
                                    0,
                                    0,
                                    this.p.y || 0,
                                    0,
                                    0
                                ]);
                            };
                        };
                        this.Type.matrix = function (s) {
                            this.m = svg.ToNumberArray(s);
                            this.apply = function (ctx) {
                                ctx.transform(
                                    this.m[0],
                                    this.m[1],
                                    this.m[2],
                                    this.m[3],
                                    this.m[4],
                                    this.m[5]
                                );
                            };
                            this.applyToPoint = function (p) {
                                p.applyTransform(this.m);
                            };
                        };
                        this.Type.SkewBase = function (s) {
                            this.base = that.Type.matrix;
                            this.base(s);
                            this.angle = new svg.Property("angle", s);
                        };
                        this.Type.SkewBase.prototype = new this.Type.matrix();
                        this.Type.skewX = function (s) {
                            this.base = that.Type.SkewBase;
                            this.base(s);
                            this.m = [
                                1,
                                0,
                                Math.tan(this.angle.toRadians()),
                                1,
                                0,
                                0
                            ];
                        };
                        this.Type.skewX.prototype = new this.Type.SkewBase();
                        this.Type.skewY = function (s) {
                            this.base = that.Type.SkewBase;
                            this.base(s);
                            this.m = [
                                1,
                                Math.tan(this.angle.toRadians()),
                                0,
                                1,
                                0,
                                0
                            ];
                        };
                        this.Type.skewY.prototype = new this.Type.SkewBase();
                        this.transforms = [];
                        this.apply = function (ctx) {
                            for (var i = 0; i < this.transforms.length; i++) {
                                this.transforms[i].apply(ctx);
                            }
                        };
                        this.unapply = function (ctx) {
                            for (
                                var i = this.transforms.length - 1;
                                i >= 0;
                                i--
                            ) {
                                this.transforms[i].unapply(ctx);
                            }
                        };
                        this.applyToPoint = function (p) {
                            for (var i = 0; i < this.transforms.length; i++) {
                                this.transforms[i].applyToPoint(p);
                            }
                        };
                        var data = svg
                            .trim(svg.compressSpaces(v))
                            .replace(/\)(\s?,\s?)/g, ") ")
                            .split(/\s(?=[a-z])/);
                        for (var i = 0; i < data.length; i++) {
                            var type = svg.trim(data[i].split("(")[0]);
                            var s = data[i].split("(")[1].replace(")", "");
                            var transform = new this.Type[type](s);
                            transform.type = type;
                            this.transforms.push(transform);
                        }
                    };
                    // aspect ratio
                    svg.AspectRatio = function (
                        ctx,
                        aspectRatio,
                        width,
                        desiredWidth,
                        height,
                        desiredHeight,
                        minX,
                        minY,
                        refX,
                        refY
                    ) {
                        // aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
                        aspectRatio = svg.compressSpaces(aspectRatio);
                        aspectRatio = aspectRatio.replace(/^defer\s/, "");
                        // ignore defer
                        var align = aspectRatio.split(" ")[0] || "xMidYMid";
                        var meetOrSlice = aspectRatio.split(" ")[1] || "meet";
                        // calculate scale
                        var scaleX = width / desiredWidth;
                        var scaleY = height / desiredHeight;
                        var scaleMin = Math.min(scaleX, scaleY);
                        var scaleMax = Math.max(scaleX, scaleY);
                        if (meetOrSlice == "meet") {
                            desiredWidth *= scaleMin;
                            desiredHeight *= scaleMin;
                        }
                        if (meetOrSlice == "slice") {
                            desiredWidth *= scaleMax;
                            desiredHeight *= scaleMax;
                        }
                        refX = new svg.Property("refX", refX);
                        refY = new svg.Property("refY", refY);
                        if (refX.hasValue() && refY.hasValue()) {
                            ctx.translate(
                                -scaleMin * refX.toPixels("x"),
                                -scaleMin * refY.toPixels("y")
                            );
                        } else {
                            // align
                            if (
                                align.match(/^xMid/) &&
                                ((meetOrSlice == "meet" &&
                                    scaleMin == scaleY) ||
                                    (meetOrSlice == "slice" &&
                                        scaleMax == scaleY))
                            )
                                ctx.translate(width / 2 - desiredWidth / 2, 0);
                            if (
                                align.match(/YMid$/) &&
                                ((meetOrSlice == "meet" &&
                                    scaleMin == scaleX) ||
                                    (meetOrSlice == "slice" &&
                                        scaleMax == scaleX))
                            )
                                ctx.translate(
                                    0,
                                    height / 2 - desiredHeight / 2
                                );
                            if (
                                align.match(/^xMax/) &&
                                ((meetOrSlice == "meet" &&
                                    scaleMin == scaleY) ||
                                    (meetOrSlice == "slice" &&
                                        scaleMax == scaleY))
                            )
                                ctx.translate(width - desiredWidth, 0);
                            if (
                                align.match(/YMax$/) &&
                                ((meetOrSlice == "meet" &&
                                    scaleMin == scaleX) ||
                                    (meetOrSlice == "slice" &&
                                        scaleMax == scaleX))
                            )
                                ctx.translate(0, height - desiredHeight);
                        }
                        // scale
                        if (align == "none") ctx.scale(scaleX, scaleY);
                        else if (meetOrSlice == "meet")
                            ctx.scale(scaleMin, scaleMin);
                        else if (meetOrSlice == "slice")
                            ctx.scale(scaleMax, scaleMax);
                        // translate
                        ctx.translate(
                            minX == null ? 0 : -minX,
                            minY == null ? 0 : -minY
                        );
                    };
                    // elements
                    svg.Element = {};
                    svg.EmptyProperty = new svg.Property("EMPTY", "");
                    svg.Element.ElementBase = function (node) {
                        this.attributes = {};
                        this.styles = {};
                        this.children = [];
                        // get or create attribute
                        this.attribute = function (name, createIfNotExists) {
                            var a = this.attributes[name];
                            if (a != null) return a;
                            if (createIfNotExists == true) {
                                a = new svg.Property(name, "");
                                this.attributes[name] = a;
                            }
                            return a || svg.EmptyProperty;
                        };
                        this.getHrefAttribute = function () {
                            for (var a in this.attributes) {
                                if (a.match(/:href$/)) {
                                    return this.attributes[a];
                                }
                            }
                            return svg.EmptyProperty;
                        };
                        // get or create style, crawls up node tree
                        this.style = function (name, createIfNotExists) {
                            var s = this.styles[name];
                            if (s != null) return s;
                            var a = this.attribute(name);
                            if (a != null && a.hasValue()) {
                                this.styles[name] = a;
                                // move up to me to cache
                                return a;
                            }
                            var p = this.parent;
                            if (p != null) {
                                var ps = p.style(name);
                                if (ps != null && ps.hasValue()) {
                                    return ps;
                                }
                            }
                            if (createIfNotExists == true) {
                                s = new svg.Property(name, "");
                                this.styles[name] = s;
                            }
                            return s || svg.EmptyProperty;
                        };
                        // base render
                        this.render = function (ctx) {
                            // don't render display=none
                            if (this.style("display").value == "none") return;
                            // don't render visibility=hidden
                            if (this.attribute("visibility").value == "hidden")
                                return;
                            ctx.save();
                            if (this.attribute("mask").hasValue()) {
                                // mask
                                var mask =
                                    this.attribute("mask").getDefinition();
                                if (mask != null) mask.apply(ctx, this);
                            } else if (this.style("filter").hasValue()) {
                                // filter
                                var filter =
                                    this.style("filter").getDefinition();
                                if (filter != null) filter.apply(ctx, this);
                            } else {
                                this.setContext(ctx);
                                this.renderChildren(ctx);
                                this.clearContext(ctx);
                            }
                            ctx.restore();
                        };
                        // base set context
                        this.setContext = function (ctx) {};
                        // base clear context
                        this.clearContext = function (ctx) {};
                        // base render children
                        this.renderChildren = function (ctx) {
                            for (var i = 0; i < this.children.length; i++) {
                                this.children[i].render(ctx);
                            }
                        };
                        this.addChild = function (childNode, create) {
                            var child = childNode;
                            if (create) child = svg.CreateElement(childNode);
                            child.parent = this;
                            this.children.push(child);
                        };
                        if (node != null && node.nodeType == 1) {
                            //ELEMENT_NODE
                            // add children
                            for (var i = 0; i < node.childNodes.length; i++) {
                                var childNode = node.childNodes[i];
                                if (childNode.nodeType == 1)
                                    this.addChild(childNode, true);
                                //ELEMENT_NODE
                                if (
                                    this.captureTextNodes &&
                                    childNode.nodeType == 3
                                ) {
                                    var text =
                                        childNode.nodeValue ||
                                        childNode.text ||
                                        "";
                                    if (
                                        svg.trim(svg.compressSpaces(text)) != ""
                                    ) {
                                        this.addChild(
                                            new svg.Element.tspan(childNode),
                                            false
                                        );
                                    }
                                }
                            }
                            // add attributes
                            for (var i = 0; i < node.attributes.length; i++) {
                                var attribute = node.attributes[i];
                                this.attributes[attribute.nodeName] =
                                    new svg.Property(
                                        attribute.nodeName,
                                        attribute.nodeValue
                                    );
                            }
                            // add tag styles
                            var styles = svg.Styles[node.nodeName];
                            if (styles != null) {
                                for (var name in styles) {
                                    this.styles[name] = styles[name];
                                }
                            }
                            // add class styles
                            if (this.attribute("class").hasValue()) {
                                var classes = svg
                                    .compressSpaces(
                                        this.attribute("class").value
                                    )
                                    .split(" ");
                                for (var j = 0; j < classes.length; j++) {
                                    styles = svg.Styles["." + classes[j]];
                                    if (styles != null) {
                                        for (var name in styles) {
                                            this.styles[name] = styles[name];
                                        }
                                    }
                                    styles =
                                        svg.Styles[
                                            node.nodeName + "." + classes[j]
                                        ];
                                    if (styles != null) {
                                        for (var name in styles) {
                                            this.styles[name] = styles[name];
                                        }
                                    }
                                }
                            }
                            // add id styles
                            if (this.attribute("id").hasValue()) {
                                var styles =
                                    svg.Styles[
                                        "#" + this.attribute("id").value
                                    ];
                                if (styles != null) {
                                    for (var name in styles) {
                                        this.styles[name] = styles[name];
                                    }
                                }
                            }
                            // add inline styles
                            if (this.attribute("style").hasValue()) {
                                var styles =
                                    this.attribute("style").value.split(";");
                                for (var i = 0; i < styles.length; i++) {
                                    if (svg.trim(styles[i]) != "") {
                                        var style = styles[i].split(":");
                                        var name = svg.trim(style[0]);
                                        var value = svg.trim(style[1]);
                                        this.styles[name] = new svg.Property(
                                            name,
                                            value
                                        );
                                    }
                                }
                            }
                            // add id
                            if (this.attribute("id").hasValue()) {
                                if (
                                    svg.Definitions[
                                        this.attribute("id").value
                                    ] == null
                                ) {
                                    svg.Definitions[
                                        this.attribute("id").value
                                    ] = this;
                                }
                            }
                        }
                    };
                    svg.Element.RenderedElementBase = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.setContext = function (ctx) {
                            // fill
                            if (this.style("fill").isUrlDefinition()) {
                                var fs = this.style(
                                    "fill"
                                ).getFillStyleDefinition(
                                    this,
                                    this.style("fill-opacity")
                                );
                                if (fs != null) ctx.fillStyle = fs;
                            } else if (this.style("fill").hasValue()) {
                                var fillStyle = this.style("fill");
                                if (fillStyle.value == "currentColor")
                                    fillStyle.value = this.style("color").value;
                                ctx.fillStyle =
                                    fillStyle.value == "none"
                                        ? "rgba(0,0,0,0)"
                                        : fillStyle.value;
                            }
                            if (this.style("fill-opacity").hasValue()) {
                                var fillStyle = new svg.Property(
                                    "fill",
                                    ctx.fillStyle
                                );
                                fillStyle = fillStyle.addOpacity(
                                    this.style("fill-opacity").value
                                );
                                ctx.fillStyle = fillStyle.value;
                            }
                            // stroke
                            if (this.style("stroke").isUrlDefinition()) {
                                var fs = this.style(
                                    "stroke"
                                ).getFillStyleDefinition(
                                    this,
                                    this.style("stroke-opacity")
                                );
                                if (fs != null) ctx.strokeStyle = fs;
                            } else if (this.style("stroke").hasValue()) {
                                var strokeStyle = this.style("stroke");
                                if (strokeStyle.value == "currentColor")
                                    strokeStyle.value =
                                        this.style("color").value;
                                ctx.strokeStyle =
                                    strokeStyle.value == "none"
                                        ? "rgba(0,0,0,0)"
                                        : strokeStyle.value;
                            }
                            if (this.style("stroke-opacity").hasValue()) {
                                var strokeStyle = new svg.Property(
                                    "stroke",
                                    ctx.strokeStyle
                                );
                                strokeStyle = strokeStyle.addOpacity(
                                    this.style("stroke-opacity").value
                                );
                                ctx.strokeStyle = strokeStyle.value;
                            }
                            if (this.style("stroke-width").hasValue()) {
                                var newLineWidth =
                                    this.style("stroke-width").toPixels();
                                ctx.lineWidth =
                                    newLineWidth == 0 ? 0.001 : newLineWidth;
                            }
                            if (this.style("stroke-linecap").hasValue())
                                ctx.lineCap =
                                    this.style("stroke-linecap").value;
                            if (this.style("stroke-linejoin").hasValue())
                                ctx.lineJoin =
                                    this.style("stroke-linejoin").value;
                            if (this.style("stroke-miterlimit").hasValue())
                                ctx.miterLimit =
                                    this.style("stroke-miterlimit").value;
                            if (this.style("stroke-dasharray").hasValue()) {
                                var gaps = svg.ToNumberArray(
                                    this.style("stroke-dasharray").value
                                );
                                if (typeof ctx.setLineDash != "undefined") {
                                    ctx.setLineDash(gaps);
                                } else if (
                                    typeof ctx.webkitLineDash != "undefined"
                                ) {
                                    ctx.webkitLineDash = gaps;
                                } else if (typeof ctx.mozDash != "undefined") {
                                    ctx.mozDash = gaps;
                                }
                                var offset =
                                    this.style(
                                        "stroke-dashoffset"
                                    ).numValueOrDefault(1);
                                if (typeof ctx.lineDashOffset != "undefined") {
                                    ctx.lineDashOffset = offset;
                                } else if (
                                    typeof ctx.webkitLineDashOffset !=
                                    "undefined"
                                ) {
                                    ctx.webkitLineDashOffset = offset;
                                } else if (
                                    typeof ctx.mozDashOffset != "undefined"
                                ) {
                                    ctx.mozDashOffset = offset;
                                }
                            }
                            // font
                            if (typeof ctx.font != "undefined") {
                                ctx.font = svg.Font.CreateFont(
                                    this.style("font-style").value,
                                    this.style("font-variant").value,
                                    this.style("font-weight").value,
                                    this.style("font-size").hasValue()
                                        ? this.style("font-size").toPixels() +
                                              "px"
                                        : "",
                                    this.style("font-family").value
                                ).toString();
                            }
                            // transform
                            if (this.attribute("transform").hasValue()) {
                                var transform = new svg.Transform(
                                    this.attribute("transform").value
                                );
                                transform.apply(ctx);
                            }
                            // clip
                            if (this.style("clip-path").hasValue()) {
                                var clip =
                                    this.style("clip-path").getDefinition();
                                if (clip != null) clip.apply(ctx);
                            }
                            // opacity
                            if (this.style("opacity").hasValue()) {
                                ctx.globalAlpha =
                                    this.style("opacity").numValue();
                            }
                        };
                    };
                    svg.Element.RenderedElementBase.prototype =
                        new svg.Element.ElementBase();
                    svg.Element.PathElementBase = function (node) {
                        this.base = svg.Element.RenderedElementBase;
                        this.base(node);
                        this.path = function (ctx) {
                            if (ctx != null) ctx.beginPath();
                            return new svg.BoundingBox();
                        };
                        this.renderChildren = function (ctx) {
                            this.path(ctx);
                            svg.Mouse.checkPath(this, ctx);
                            if (ctx.fillStyle != "") {
                                if (this.attribute("fill-rule").hasValue()) {
                                    ctx.fill(this.attribute("fill-rule").value);
                                } else {
                                    ctx.fill();
                                }
                            }
                            if (ctx.strokeStyle != "") ctx.stroke();
                            var markers = this.getMarkers();
                            if (markers != null) {
                                if (
                                    this.style("marker-start").isUrlDefinition()
                                ) {
                                    var marker =
                                        this.style(
                                            "marker-start"
                                        ).getDefinition();
                                    marker.render(
                                        ctx,
                                        markers[0][0],
                                        markers[0][1]
                                    );
                                }
                                if (
                                    this.style("marker-mid").isUrlDefinition()
                                ) {
                                    var marker =
                                        this.style(
                                            "marker-mid"
                                        ).getDefinition();
                                    for (
                                        var i = 1;
                                        i < markers.length - 1;
                                        i++
                                    ) {
                                        marker.render(
                                            ctx,
                                            markers[i][0],
                                            markers[i][1]
                                        );
                                    }
                                }
                                if (
                                    this.style("marker-end").isUrlDefinition()
                                ) {
                                    var marker =
                                        this.style(
                                            "marker-end"
                                        ).getDefinition();
                                    marker.render(
                                        ctx,
                                        markers[markers.length - 1][0],
                                        markers[markers.length - 1][1]
                                    );
                                }
                            }
                        };
                        this.getBoundingBox = function () {
                            return this.path();
                        };
                        this.getMarkers = function () {
                            return null;
                        };
                    };
                    svg.Element.PathElementBase.prototype =
                        new svg.Element.RenderedElementBase();
                    // svg element
                    svg.Element.svg = function (node) {
                        this.base = svg.Element.RenderedElementBase;
                        this.base(node);
                        this.baseClearContext = this.clearContext;
                        this.clearContext = function (ctx) {
                            this.baseClearContext(ctx);
                            svg.ViewPort.RemoveCurrent();
                        };
                        this.baseSetContext = this.setContext;
                        this.setContext = function (ctx) {
                            // initial values
                            ctx.strokeStyle = "rgba(0,0,0,0)";
                            ctx.lineCap = "butt";
                            ctx.lineJoin = "miter";
                            ctx.miterLimit = 4;
                            this.baseSetContext(ctx);
                            // create new view port
                            if (!this.attribute("x").hasValue())
                                this.attribute("x", true).value = 0;
                            if (!this.attribute("y").hasValue())
                                this.attribute("y", true).value = 0;
                            ctx.translate(
                                this.attribute("x").toPixels("x"),
                                this.attribute("y").toPixels("y")
                            );
                            var width = svg.ViewPort.width();
                            var height = svg.ViewPort.height();
                            if (!this.attribute("width").hasValue())
                                this.attribute("width", true).value = "100%";
                            if (!this.attribute("height").hasValue())
                                this.attribute("height", true).value = "100%";
                            if (typeof this.root == "undefined") {
                                width = this.attribute("width").toPixels("x");
                                height = this.attribute("height").toPixels("y");
                                var x = 0;
                                var y = 0;
                                if (
                                    this.attribute("refX").hasValue() &&
                                    this.attribute("refY").hasValue()
                                ) {
                                    x = -this.attribute("refX").toPixels("x");
                                    y = -this.attribute("refY").toPixels("y");
                                }
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(width, y);
                                ctx.lineTo(width, height);
                                ctx.lineTo(x, height);
                                ctx.closePath();
                                ctx.clip();
                            }
                            svg.ViewPort.SetCurrent(width, height);
                            // viewbox
                            if (this.attribute("viewBox").hasValue()) {
                                var viewBox = svg.ToNumberArray(
                                    this.attribute("viewBox").value
                                );
                                var minX = viewBox[0];
                                var minY = viewBox[1];
                                width = viewBox[2];
                                height = viewBox[3];
                                svg.AspectRatio(
                                    ctx,
                                    this.attribute("preserveAspectRatio").value,
                                    svg.ViewPort.width(),
                                    width,
                                    svg.ViewPort.height(),
                                    height,
                                    minX,
                                    minY,
                                    this.attribute("refX").value,
                                    this.attribute("refY").value
                                );
                                svg.ViewPort.RemoveCurrent();
                                svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);
                            }
                        };
                    };
                    svg.Element.svg.prototype =
                        new svg.Element.RenderedElementBase();
                    // rect element
                    svg.Element.rect = function (node) {
                        this.base = svg.Element.PathElementBase;
                        this.base(node);
                        this.path = function (ctx) {
                            var x = this.attribute("x").toPixels("x");
                            var y = this.attribute("y").toPixels("y");
                            var width = this.attribute("width").toPixels("x");
                            var height = this.attribute("height").toPixels("y");
                            var rx = this.attribute("rx").toPixels("x");
                            var ry = this.attribute("ry").toPixels("y");
                            if (
                                this.attribute("rx").hasValue() &&
                                !this.attribute("ry").hasValue()
                            )
                                ry = rx;
                            if (
                                this.attribute("ry").hasValue() &&
                                !this.attribute("rx").hasValue()
                            )
                                rx = ry;
                            rx = Math.min(rx, width / 2);
                            ry = Math.min(ry, height / 2);
                            if (ctx != null) {
                                ctx.beginPath();
                                ctx.moveTo(x + rx, y);
                                ctx.lineTo(x + width - rx, y);
                                ctx.quadraticCurveTo(
                                    x + width,
                                    y,
                                    x + width,
                                    y + ry
                                );
                                ctx.lineTo(x + width, y + height - ry);
                                ctx.quadraticCurveTo(
                                    x + width,
                                    y + height,
                                    x + width - rx,
                                    y + height
                                );
                                ctx.lineTo(x + rx, y + height);
                                ctx.quadraticCurveTo(
                                    x,
                                    y + height,
                                    x,
                                    y + height - ry
                                );
                                ctx.lineTo(x, y + ry);
                                ctx.quadraticCurveTo(x, y, x + rx, y);
                                ctx.closePath();
                            }
                            return new svg.BoundingBox(
                                x,
                                y,
                                x + width,
                                y + height
                            );
                        };
                    };
                    svg.Element.rect.prototype =
                        new svg.Element.PathElementBase();
                    // circle element
                    svg.Element.circle = function (node) {
                        this.base = svg.Element.PathElementBase;
                        this.base(node);
                        this.path = function (ctx) {
                            var cx = this.attribute("cx").toPixels("x");
                            var cy = this.attribute("cy").toPixels("y");
                            var r = this.attribute("r").toPixels();
                            if (ctx != null) {
                                ctx.beginPath();
                                ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
                                ctx.closePath();
                            }
                            return new svg.BoundingBox(
                                cx - r,
                                cy - r,
                                cx + r,
                                cy + r
                            );
                        };
                    };
                    svg.Element.circle.prototype =
                        new svg.Element.PathElementBase();
                    // ellipse element
                    svg.Element.ellipse = function (node) {
                        this.base = svg.Element.PathElementBase;
                        this.base(node);
                        this.path = function (ctx) {
                            var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
                            var rx = this.attribute("rx").toPixels("x");
                            var ry = this.attribute("ry").toPixels("y");
                            var cx = this.attribute("cx").toPixels("x");
                            var cy = this.attribute("cy").toPixels("y");
                            if (ctx != null) {
                                ctx.beginPath();
                                ctx.moveTo(cx, cy - ry);
                                ctx.bezierCurveTo(
                                    cx + KAPPA * rx,
                                    cy - ry,
                                    cx + rx,
                                    cy - KAPPA * ry,
                                    cx + rx,
                                    cy
                                );
                                ctx.bezierCurveTo(
                                    cx + rx,
                                    cy + KAPPA * ry,
                                    cx + KAPPA * rx,
                                    cy + ry,
                                    cx,
                                    cy + ry
                                );
                                ctx.bezierCurveTo(
                                    cx - KAPPA * rx,
                                    cy + ry,
                                    cx - rx,
                                    cy + KAPPA * ry,
                                    cx - rx,
                                    cy
                                );
                                ctx.bezierCurveTo(
                                    cx - rx,
                                    cy - KAPPA * ry,
                                    cx - KAPPA * rx,
                                    cy - ry,
                                    cx,
                                    cy - ry
                                );
                                ctx.closePath();
                            }
                            return new svg.BoundingBox(
                                cx - rx,
                                cy - ry,
                                cx + rx,
                                cy + ry
                            );
                        };
                    };
                    svg.Element.ellipse.prototype =
                        new svg.Element.PathElementBase();
                    // line element
                    svg.Element.line = function (node) {
                        this.base = svg.Element.PathElementBase;
                        this.base(node);
                        this.getPoints = function () {
                            return [
                                new svg.Point(
                                    this.attribute("x1").toPixels("x"),
                                    this.attribute("y1").toPixels("y")
                                ),
                                new svg.Point(
                                    this.attribute("x2").toPixels("x"),
                                    this.attribute("y2").toPixels("y")
                                )
                            ];
                        };
                        this.path = function (ctx) {
                            var points = this.getPoints();
                            if (ctx != null) {
                                ctx.beginPath();
                                ctx.moveTo(points[0].x, points[0].y);
                                ctx.lineTo(points[1].x, points[1].y);
                            }
                            return new svg.BoundingBox(
                                points[0].x,
                                points[0].y,
                                points[1].x,
                                points[1].y
                            );
                        };
                        this.getMarkers = function () {
                            var points = this.getPoints();
                            var a = points[0].angleTo(points[1]);
                            return [
                                [points[0], a],
                                [points[1], a]
                            ];
                        };
                    };
                    svg.Element.line.prototype =
                        new svg.Element.PathElementBase();
                    // polyline element
                    svg.Element.polyline = function (node) {
                        this.base = svg.Element.PathElementBase;
                        this.base(node);
                        this.points = svg.CreatePath(
                            this.attribute("points").value
                        );
                        this.path = function (ctx) {
                            var bb = new svg.BoundingBox(
                                this.points[0].x,
                                this.points[0].y
                            );
                            if (ctx != null) {
                                ctx.beginPath();
                                ctx.moveTo(this.points[0].x, this.points[0].y);
                            }
                            for (var i = 1; i < this.points.length; i++) {
                                bb.addPoint(this.points[i].x, this.points[i].y);
                                if (ctx != null)
                                    ctx.lineTo(
                                        this.points[i].x,
                                        this.points[i].y
                                    );
                            }
                            return bb;
                        };
                        this.getMarkers = function () {
                            var markers = [];
                            for (var i = 0; i < this.points.length - 1; i++) {
                                markers.push([
                                    this.points[i],
                                    this.points[i].angleTo(this.points[i + 1])
                                ]);
                            }
                            markers.push([
                                this.points[this.points.length - 1],
                                markers[markers.length - 1][1]
                            ]);
                            return markers;
                        };
                    };
                    svg.Element.polyline.prototype =
                        new svg.Element.PathElementBase();
                    // polygon element
                    svg.Element.polygon = function (node) {
                        this.base = svg.Element.polyline;
                        this.base(node);
                        this.basePath = this.path;
                        this.path = function (ctx) {
                            var bb = this.basePath(ctx);
                            if (ctx != null) {
                                ctx.lineTo(this.points[0].x, this.points[0].y);
                                ctx.closePath();
                            }
                            return bb;
                        };
                    };
                    svg.Element.polygon.prototype = new svg.Element.polyline();
                    // path element
                    svg.Element.path = function (node) {
                        this.base = svg.Element.PathElementBase;
                        this.base(node);
                        var d = this.attribute("d").value;
                        // TODO: convert to real lexer based on http://www.w3.org/TR/SVG11/paths.html#PathDataBNF
                        d = d.replace(/,/gm, " ");
                        // get rid of all commas
                        d = d.replace(
                            /([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,
                            "$1 $2"
                        );
                        // separate commands from commands
                        d = d.replace(
                            /([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,
                            "$1 $2"
                        );
                        // separate commands from commands
                        d = d.replace(
                            /([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm,
                            "$1 $2"
                        );
                        // separate commands from points
                        d = d.replace(
                            /([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm,
                            "$1 $2"
                        );
                        // separate commands from points
                        d = d.replace(/([0-9])([+\-])/gm, "$1 $2");
                        // separate digits when no comma
                        d = d.replace(/(\.[0-9]*)(\.)/gm, "$1 $2");
                        // separate digits when no comma
                        d = d.replace(
                            /([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,
                            "$1 $3 $4 "
                        );
                        // shorthand elliptical arc path syntax
                        d = svg.compressSpaces(d);
                        // compress multiple spaces
                        d = svg.trim(d);
                        this.PathParser = new (function (d) {
                            this.tokens = d.split(" ");
                            this.reset = function () {
                                this.i = -1;
                                this.command = "";
                                this.previousCommand = "";
                                this.start = new svg.Point(0, 0);
                                this.control = new svg.Point(0, 0);
                                this.current = new svg.Point(0, 0);
                                this.points = [];
                                this.angles = [];
                            };
                            this.isEnd = function () {
                                return this.i >= this.tokens.length - 1;
                            };
                            this.isCommandOrEnd = function () {
                                if (this.isEnd()) return true;
                                return (
                                    this.tokens[this.i + 1].match(
                                        /^[A-Za-z]$/
                                    ) != null
                                );
                            };
                            this.isRelativeCommand = function () {
                                switch (this.command) {
                                    case "m":
                                    case "l":
                                    case "h":
                                    case "v":
                                    case "c":
                                    case "s":
                                    case "q":
                                    case "t":
                                    case "a":
                                    case "z":
                                        return true;
                                        break;
                                }
                                return false;
                            };
                            this.getToken = function () {
                                this.i++;
                                return this.tokens[this.i];
                            };
                            this.getScalar = function () {
                                return parseFloat(this.getToken());
                            };
                            this.nextCommand = function () {
                                this.previousCommand = this.command;
                                this.command = this.getToken();
                            };
                            this.getPoint = function () {
                                var p = new svg.Point(
                                    this.getScalar(),
                                    this.getScalar()
                                );
                                return this.makeAbsolute(p);
                            };
                            this.getAsControlPoint = function () {
                                var p = this.getPoint();
                                this.control = p;
                                return p;
                            };
                            this.getAsCurrentPoint = function () {
                                var p = this.getPoint();
                                this.current = p;
                                return p;
                            };
                            this.getReflectedControlPoint = function () {
                                if (
                                    this.previousCommand.toLowerCase() != "c" &&
                                    this.previousCommand.toLowerCase() != "s" &&
                                    this.previousCommand.toLowerCase() != "q" &&
                                    this.previousCommand.toLowerCase() != "t"
                                ) {
                                    return this.current;
                                }
                                // reflect point
                                var p = new svg.Point(
                                    2 * this.current.x - this.control.x,
                                    2 * this.current.y - this.control.y
                                );
                                return p;
                            };
                            this.makeAbsolute = function (p) {
                                if (this.isRelativeCommand()) {
                                    p.x += this.current.x;
                                    p.y += this.current.y;
                                }
                                return p;
                            };
                            this.addMarker = function (p, from, priorTo) {
                                // if the last angle isn't filled in because we didn't have this point yet ...
                                if (
                                    priorTo != null &&
                                    this.angles.length > 0 &&
                                    this.angles[this.angles.length - 1] == null
                                ) {
                                    this.angles[this.angles.length - 1] =
                                        this.points[
                                            this.points.length - 1
                                        ].angleTo(priorTo);
                                }
                                this.addMarkerAngle(
                                    p,
                                    from == null ? null : from.angleTo(p)
                                );
                            };
                            this.addMarkerAngle = function (p, a) {
                                this.points.push(p);
                                this.angles.push(a);
                            };
                            this.getMarkerPoints = function () {
                                return this.points;
                            };
                            this.getMarkerAngles = function () {
                                for (var i = 0; i < this.angles.length; i++) {
                                    if (this.angles[i] == null) {
                                        for (
                                            var j = i + 1;
                                            j < this.angles.length;
                                            j++
                                        ) {
                                            if (this.angles[j] != null) {
                                                this.angles[i] = this.angles[j];
                                                break;
                                            }
                                        }
                                    }
                                }
                                return this.angles;
                            };
                        })(d);
                        this.path = function (ctx) {
                            var pp = this.PathParser;
                            pp.reset();
                            var bb = new svg.BoundingBox();
                            if (ctx != null) ctx.beginPath();
                            while (!pp.isEnd()) {
                                pp.nextCommand();
                                switch (pp.command) {
                                    case "M":
                                    case "m":
                                        var p = pp.getAsCurrentPoint();
                                        pp.addMarker(p);
                                        bb.addPoint(p.x, p.y);
                                        if (ctx != null) ctx.moveTo(p.x, p.y);
                                        pp.start = pp.current;
                                        while (!pp.isCommandOrEnd()) {
                                            var p = pp.getAsCurrentPoint();
                                            pp.addMarker(p, pp.start);
                                            bb.addPoint(p.x, p.y);
                                            if (ctx != null)
                                                ctx.lineTo(p.x, p.y);
                                        }
                                        break;

                                    case "L":
                                    case "l":
                                        while (!pp.isCommandOrEnd()) {
                                            var c = pp.current;
                                            var p = pp.getAsCurrentPoint();
                                            pp.addMarker(p, c);
                                            bb.addPoint(p.x, p.y);
                                            if (ctx != null)
                                                ctx.lineTo(p.x, p.y);
                                        }
                                        break;

                                    case "H":
                                    case "h":
                                        while (!pp.isCommandOrEnd()) {
                                            var newP = new svg.Point(
                                                (pp.isRelativeCommand()
                                                    ? pp.current.x
                                                    : 0) + pp.getScalar(),
                                                pp.current.y
                                            );
                                            pp.addMarker(newP, pp.current);
                                            pp.current = newP;
                                            bb.addPoint(
                                                pp.current.x,
                                                pp.current.y
                                            );
                                            if (ctx != null)
                                                ctx.lineTo(
                                                    pp.current.x,
                                                    pp.current.y
                                                );
                                        }
                                        break;

                                    case "V":
                                    case "v":
                                        while (!pp.isCommandOrEnd()) {
                                            var newP = new svg.Point(
                                                pp.current.x,
                                                (pp.isRelativeCommand()
                                                    ? pp.current.y
                                                    : 0) + pp.getScalar()
                                            );
                                            pp.addMarker(newP, pp.current);
                                            pp.current = newP;
                                            bb.addPoint(
                                                pp.current.x,
                                                pp.current.y
                                            );
                                            if (ctx != null)
                                                ctx.lineTo(
                                                    pp.current.x,
                                                    pp.current.y
                                                );
                                        }
                                        break;

                                    case "C":
                                    case "c":
                                        while (!pp.isCommandOrEnd()) {
                                            var curr = pp.current;
                                            var p1 = pp.getPoint();
                                            var cntrl = pp.getAsControlPoint();
                                            var cp = pp.getAsCurrentPoint();
                                            pp.addMarker(cp, cntrl, p1);
                                            bb.addBezierCurve(
                                                curr.x,
                                                curr.y,
                                                p1.x,
                                                p1.y,
                                                cntrl.x,
                                                cntrl.y,
                                                cp.x,
                                                cp.y
                                            );
                                            if (ctx != null)
                                                ctx.bezierCurveTo(
                                                    p1.x,
                                                    p1.y,
                                                    cntrl.x,
                                                    cntrl.y,
                                                    cp.x,
                                                    cp.y
                                                );
                                        }
                                        break;

                                    case "S":
                                    case "s":
                                        while (!pp.isCommandOrEnd()) {
                                            var curr = pp.current;
                                            var p1 =
                                                pp.getReflectedControlPoint();
                                            var cntrl = pp.getAsControlPoint();
                                            var cp = pp.getAsCurrentPoint();
                                            pp.addMarker(cp, cntrl, p1);
                                            bb.addBezierCurve(
                                                curr.x,
                                                curr.y,
                                                p1.x,
                                                p1.y,
                                                cntrl.x,
                                                cntrl.y,
                                                cp.x,
                                                cp.y
                                            );
                                            if (ctx != null)
                                                ctx.bezierCurveTo(
                                                    p1.x,
                                                    p1.y,
                                                    cntrl.x,
                                                    cntrl.y,
                                                    cp.x,
                                                    cp.y
                                                );
                                        }
                                        break;

                                    case "Q":
                                    case "q":
                                        while (!pp.isCommandOrEnd()) {
                                            var curr = pp.current;
                                            var cntrl = pp.getAsControlPoint();
                                            var cp = pp.getAsCurrentPoint();
                                            pp.addMarker(cp, cntrl, cntrl);
                                            bb.addQuadraticCurve(
                                                curr.x,
                                                curr.y,
                                                cntrl.x,
                                                cntrl.y,
                                                cp.x,
                                                cp.y
                                            );
                                            if (ctx != null)
                                                ctx.quadraticCurveTo(
                                                    cntrl.x,
                                                    cntrl.y,
                                                    cp.x,
                                                    cp.y
                                                );
                                        }
                                        break;

                                    case "T":
                                    case "t":
                                        while (!pp.isCommandOrEnd()) {
                                            var curr = pp.current;
                                            var cntrl =
                                                pp.getReflectedControlPoint();
                                            pp.control = cntrl;
                                            var cp = pp.getAsCurrentPoint();
                                            pp.addMarker(cp, cntrl, cntrl);
                                            bb.addQuadraticCurve(
                                                curr.x,
                                                curr.y,
                                                cntrl.x,
                                                cntrl.y,
                                                cp.x,
                                                cp.y
                                            );
                                            if (ctx != null)
                                                ctx.quadraticCurveTo(
                                                    cntrl.x,
                                                    cntrl.y,
                                                    cp.x,
                                                    cp.y
                                                );
                                        }
                                        break;

                                    case "A":
                                    case "a":
                                        while (!pp.isCommandOrEnd()) {
                                            var curr = pp.current;
                                            var rx = pp.getScalar();
                                            var ry = pp.getScalar();
                                            var xAxisRotation =
                                                pp.getScalar() *
                                                (Math.PI / 180);
                                            var largeArcFlag = pp.getScalar();
                                            var sweepFlag = pp.getScalar();
                                            var cp = pp.getAsCurrentPoint();
                                            // Conversion from endpoint to center parameterization
                                            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
                                            // x1', y1'
                                            var currp = new svg.Point(
                                                (Math.cos(xAxisRotation) *
                                                    (curr.x - cp.x)) /
                                                    2 +
                                                    (Math.sin(xAxisRotation) *
                                                        (curr.y - cp.y)) /
                                                        2,
                                                (-Math.sin(xAxisRotation) *
                                                    (curr.x - cp.x)) /
                                                    2 +
                                                    (Math.cos(xAxisRotation) *
                                                        (curr.y - cp.y)) /
                                                        2
                                            );
                                            // adjust radii
                                            var l =
                                                Math.pow(currp.x, 2) /
                                                    Math.pow(rx, 2) +
                                                Math.pow(currp.y, 2) /
                                                    Math.pow(ry, 2);
                                            if (l > 1) {
                                                rx *= Math.sqrt(l);
                                                ry *= Math.sqrt(l);
                                            }
                                            // cx', cy'
                                            var s =
                                                (largeArcFlag == sweepFlag
                                                    ? -1
                                                    : 1) *
                                                Math.sqrt(
                                                    (Math.pow(rx, 2) *
                                                        Math.pow(ry, 2) -
                                                        Math.pow(rx, 2) *
                                                            Math.pow(
                                                                currp.y,
                                                                2
                                                            ) -
                                                        Math.pow(ry, 2) *
                                                            Math.pow(
                                                                currp.x,
                                                                2
                                                            )) /
                                                        (Math.pow(rx, 2) *
                                                            Math.pow(
                                                                currp.y,
                                                                2
                                                            ) +
                                                            Math.pow(ry, 2) *
                                                                Math.pow(
                                                                    currp.x,
                                                                    2
                                                                ))
                                                );
                                            if (isNaN(s)) s = 0;
                                            var cpp = new svg.Point(
                                                (s * rx * currp.y) / ry,
                                                (s * -ry * currp.x) / rx
                                            );
                                            // cx, cy
                                            var centp = new svg.Point(
                                                (curr.x + cp.x) / 2 +
                                                    Math.cos(xAxisRotation) *
                                                        cpp.x -
                                                    Math.sin(xAxisRotation) *
                                                        cpp.y,
                                                (curr.y + cp.y) / 2 +
                                                    Math.sin(xAxisRotation) *
                                                        cpp.x +
                                                    Math.cos(xAxisRotation) *
                                                        cpp.y
                                            );
                                            // vector magnitude
                                            var m = function (v) {
                                                return Math.sqrt(
                                                    Math.pow(v[0], 2) +
                                                        Math.pow(v[1], 2)
                                                );
                                            };
                                            // ratio between two vectors
                                            var r = function (u, v) {
                                                return (
                                                    (u[0] * v[0] +
                                                        u[1] * v[1]) /
                                                    (m(u) * m(v))
                                                );
                                            };
                                            // angle between two vectors
                                            var a = function (u, v) {
                                                return (
                                                    (u[0] * v[1] < u[1] * v[0]
                                                        ? -1
                                                        : 1) *
                                                    Math.acos(r(u, v))
                                                );
                                            };
                                            // initial angle
                                            var a1 = a(
                                                [1, 0],
                                                [
                                                    (currp.x - cpp.x) / rx,
                                                    (currp.y - cpp.y) / ry
                                                ]
                                            );
                                            // angle delta
                                            var u = [
                                                (currp.x - cpp.x) / rx,
                                                (currp.y - cpp.y) / ry
                                            ];
                                            var v = [
                                                (-currp.x - cpp.x) / rx,
                                                (-currp.y - cpp.y) / ry
                                            ];
                                            var ad = a(u, v);
                                            if (r(u, v) <= -1) ad = Math.PI;
                                            if (r(u, v) >= 1) ad = 0;
                                            // for markers
                                            var dir = 1 - sweepFlag ? 1 : -1;
                                            var ah = a1 + dir * (ad / 2);
                                            var halfWay = new svg.Point(
                                                centp.x + rx * Math.cos(ah),
                                                centp.y + ry * Math.sin(ah)
                                            );
                                            pp.addMarkerAngle(
                                                halfWay,
                                                ah - (dir * Math.PI) / 2
                                            );
                                            pp.addMarkerAngle(
                                                cp,
                                                ah - dir * Math.PI
                                            );
                                            bb.addPoint(cp.x, cp.y);
                                            // TODO: this is too naive, make it better
                                            if (ctx != null) {
                                                var r = rx > ry ? rx : ry;
                                                var sx = rx > ry ? 1 : rx / ry;
                                                var sy = rx > ry ? ry / rx : 1;
                                                ctx.translate(centp.x, centp.y);
                                                ctx.rotate(xAxisRotation);
                                                ctx.scale(sx, sy);
                                                ctx.arc(
                                                    0,
                                                    0,
                                                    r,
                                                    a1,
                                                    a1 + ad,
                                                    1 - sweepFlag
                                                );
                                                ctx.scale(1 / sx, 1 / sy);
                                                ctx.rotate(-xAxisRotation);
                                                ctx.translate(
                                                    -centp.x,
                                                    -centp.y
                                                );
                                            }
                                        }
                                        break;

                                    case "Z":
                                    case "z":
                                        if (ctx != null) ctx.closePath();
                                        pp.current = pp.start;
                                }
                            }
                            return bb;
                        };
                        this.getMarkers = function () {
                            var points = this.PathParser.getMarkerPoints();
                            var angles = this.PathParser.getMarkerAngles();
                            var markers = [];
                            for (var i = 0; i < points.length; i++) {
                                markers.push([points[i], angles[i]]);
                            }
                            return markers;
                        };
                    };
                    svg.Element.path.prototype =
                        new svg.Element.PathElementBase();
                    // pattern element
                    svg.Element.pattern = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.createPattern = function (ctx, element) {
                            var width = this.attribute("width").toPixels(
                                "x",
                                true
                            );
                            var height = this.attribute("height").toPixels(
                                "y",
                                true
                            );
                            // render me using a temporary svg element
                            var tempSvg = new svg.Element.svg();
                            tempSvg.attributes["viewBox"] = new svg.Property(
                                "viewBox",
                                this.attribute("viewBox").value
                            );
                            tempSvg.attributes["width"] = new svg.Property(
                                "width",
                                width + "px"
                            );
                            tempSvg.attributes["height"] = new svg.Property(
                                "height",
                                height + "px"
                            );
                            tempSvg.attributes["transform"] = new svg.Property(
                                "transform",
                                this.attribute("patternTransform").value
                            );
                            tempSvg.children = this.children;
                            var c = document.createElement("canvas");
                            c.width = width;
                            c.height = height;
                            var cctx = c.getContext("2d");
                            if (
                                this.attribute("x").hasValue() &&
                                this.attribute("y").hasValue()
                            ) {
                                cctx.translate(
                                    this.attribute("x").toPixels("x", true),
                                    this.attribute("y").toPixels("y", true)
                                );
                            }
                            // render 3x3 grid so when we transform there's no white space on edges
                            for (var x = -1; x <= 1; x++) {
                                for (var y = -1; y <= 1; y++) {
                                    cctx.save();
                                    cctx.translate(x * c.width, y * c.height);
                                    tempSvg.render(cctx);
                                    cctx.restore();
                                }
                            }
                            var pattern = ctx.createPattern(c, "repeat");
                            return pattern;
                        };
                    };
                    svg.Element.pattern.prototype =
                        new svg.Element.ElementBase();
                    // marker element
                    svg.Element.marker = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.baseRender = this.render;
                        this.render = function (ctx, point, angle) {
                            ctx.translate(point.x, point.y);
                            if (
                                this.attribute("orient").valueOrDefault(
                                    "auto"
                                ) == "auto"
                            )
                                ctx.rotate(angle);
                            if (
                                this.attribute("markerUnits").valueOrDefault(
                                    "strokeWidth"
                                ) == "strokeWidth"
                            )
                                ctx.scale(ctx.lineWidth, ctx.lineWidth);
                            ctx.save();
                            // render me using a temporary svg element
                            var tempSvg = new svg.Element.svg();
                            tempSvg.attributes["viewBox"] = new svg.Property(
                                "viewBox",
                                this.attribute("viewBox").value
                            );
                            tempSvg.attributes["refX"] = new svg.Property(
                                "refX",
                                this.attribute("refX").value
                            );
                            tempSvg.attributes["refY"] = new svg.Property(
                                "refY",
                                this.attribute("refY").value
                            );
                            tempSvg.attributes["width"] = new svg.Property(
                                "width",
                                this.attribute("markerWidth").value
                            );
                            tempSvg.attributes["height"] = new svg.Property(
                                "height",
                                this.attribute("markerHeight").value
                            );
                            tempSvg.attributes["fill"] = new svg.Property(
                                "fill",
                                this.attribute("fill").valueOrDefault("black")
                            );
                            tempSvg.attributes["stroke"] = new svg.Property(
                                "stroke",
                                this.attribute("stroke").valueOrDefault("none")
                            );
                            tempSvg.children = this.children;
                            tempSvg.render(ctx);
                            ctx.restore();
                            if (
                                this.attribute("markerUnits").valueOrDefault(
                                    "strokeWidth"
                                ) == "strokeWidth"
                            )
                                ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth);
                            if (
                                this.attribute("orient").valueOrDefault(
                                    "auto"
                                ) == "auto"
                            )
                                ctx.rotate(-angle);
                            ctx.translate(-point.x, -point.y);
                        };
                    };
                    svg.Element.marker.prototype =
                        new svg.Element.ElementBase();
                    // definitions element
                    svg.Element.defs = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.render = function (ctx) {};
                    };
                    svg.Element.defs.prototype = new svg.Element.ElementBase();
                    // base for gradients
                    svg.Element.GradientBase = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.gradientUnits =
                            this.attribute("gradientUnits").valueOrDefault(
                                "objectBoundingBox"
                            );
                        this.stops = [];
                        for (var i = 0; i < this.children.length; i++) {
                            var child = this.children[i];
                            if (child.type == "stop") this.stops.push(child);
                        }
                        this.getGradient = function () {};
                        this.createGradient = function (
                            ctx,
                            element,
                            parentOpacityProp
                        ) {
                            var stopsContainer = this;
                            if (this.getHrefAttribute().hasValue()) {
                                stopsContainer =
                                    this.getHrefAttribute().getDefinition();
                            }
                            var addParentOpacity = function (color) {
                                if (parentOpacityProp.hasValue()) {
                                    var p = new svg.Property("color", color);
                                    return p.addOpacity(parentOpacityProp.value)
                                        .value;
                                }
                                return color;
                            };
                            var g = this.getGradient(ctx, element);
                            if (g == null)
                                return addParentOpacity(
                                    stopsContainer.stops[
                                        stopsContainer.stops.length - 1
                                    ].color
                                );
                            for (
                                var i = 0;
                                i < stopsContainer.stops.length;
                                i++
                            ) {
                                g.addColorStop(
                                    stopsContainer.stops[i].offset,
                                    addParentOpacity(
                                        stopsContainer.stops[i].color
                                    )
                                );
                            }
                            if (
                                this.attribute("gradientTransform").hasValue()
                            ) {
                                // render as transformed pattern on temporary canvas
                                var rootView = svg.ViewPort.viewPorts[0];
                                var rect = new svg.Element.rect();
                                rect.attributes["x"] = new svg.Property(
                                    "x",
                                    -svg.MAX_VIRTUAL_PIXELS / 3
                                );
                                rect.attributes["y"] = new svg.Property(
                                    "y",
                                    -svg.MAX_VIRTUAL_PIXELS / 3
                                );
                                rect.attributes["width"] = new svg.Property(
                                    "width",
                                    svg.MAX_VIRTUAL_PIXELS
                                );
                                rect.attributes["height"] = new svg.Property(
                                    "height",
                                    svg.MAX_VIRTUAL_PIXELS
                                );
                                var group = new svg.Element.g();
                                group.attributes["transform"] =
                                    new svg.Property(
                                        "transform",
                                        this.attribute(
                                            "gradientTransform"
                                        ).value
                                    );
                                group.children = [rect];
                                var tempSvg = new svg.Element.svg();
                                tempSvg.attributes["x"] = new svg.Property(
                                    "x",
                                    0
                                );
                                tempSvg.attributes["y"] = new svg.Property(
                                    "y",
                                    0
                                );
                                tempSvg.attributes["width"] = new svg.Property(
                                    "width",
                                    rootView.width
                                );
                                tempSvg.attributes["height"] = new svg.Property(
                                    "height",
                                    rootView.height
                                );
                                tempSvg.children = [group];
                                var c = document.createElement("canvas");
                                c.width = rootView.width;
                                c.height = rootView.height;
                                var tempCtx = c.getContext("2d");
                                tempCtx.fillStyle = g;
                                tempSvg.render(tempCtx);
                                return tempCtx.createPattern(c, "no-repeat");
                            }
                            return g;
                        };
                    };
                    svg.Element.GradientBase.prototype =
                        new svg.Element.ElementBase();
                    // linear gradient element
                    svg.Element.linearGradient = function (node) {
                        this.base = svg.Element.GradientBase;
                        this.base(node);
                        this.getGradient = function (ctx, element) {
                            var bb = element.getBoundingBox();
                            if (
                                !this.attribute("x1").hasValue() &&
                                !this.attribute("y1").hasValue() &&
                                !this.attribute("x2").hasValue() &&
                                !this.attribute("y2").hasValue()
                            ) {
                                this.attribute("x1", true).value = 0;
                                this.attribute("y1", true).value = 0;
                                this.attribute("x2", true).value = 1;
                                this.attribute("y2", true).value = 0;
                            }
                            var x1 =
                                this.gradientUnits == "objectBoundingBox"
                                    ? bb.x() +
                                      bb.width() *
                                          this.attribute("x1").numValue()
                                    : this.attribute("x1").toPixels("x");
                            var y1 =
                                this.gradientUnits == "objectBoundingBox"
                                    ? bb.y() +
                                      bb.height() *
                                          this.attribute("y1").numValue()
                                    : this.attribute("y1").toPixels("y");
                            var x2 =
                                this.gradientUnits == "objectBoundingBox"
                                    ? bb.x() +
                                      bb.width() *
                                          this.attribute("x2").numValue()
                                    : this.attribute("x2").toPixels("x");
                            var y2 =
                                this.gradientUnits == "objectBoundingBox"
                                    ? bb.y() +
                                      bb.height() *
                                          this.attribute("y2").numValue()
                                    : this.attribute("y2").toPixels("y");
                            if (x1 == x2 && y1 == y2) return null;
                            return ctx.createLinearGradient(x1, y1, x2, y2);
                        };
                    };
                    svg.Element.linearGradient.prototype =
                        new svg.Element.GradientBase();
                    // radial gradient element
                    svg.Element.radialGradient = function (node) {
                        this.base = svg.Element.GradientBase;
                        this.base(node);
                        this.getGradient = function (ctx, element) {
                            var bb = element.getBoundingBox();
                            if (!this.attribute("cx").hasValue())
                                this.attribute("cx", true).value = "50%";
                            if (!this.attribute("cy").hasValue())
                                this.attribute("cy", true).value = "50%";
                            if (!this.attribute("r").hasValue())
                                this.attribute("r", true).value = "50%";
                            var cx =
                                this.gradientUnits == "objectBoundingBox"
                                    ? bb.x() +
                                      bb.width() *
                                          this.attribute("cx").numValue()
                                    : this.attribute("cx").toPixels("x");
                            var cy =
                                this.gradientUnits == "objectBoundingBox"
                                    ? bb.y() +
                                      bb.height() *
                                          this.attribute("cy").numValue()
                                    : this.attribute("cy").toPixels("y");
                            var fx = cx;
                            var fy = cy;
                            if (this.attribute("fx").hasValue()) {
                                fx =
                                    this.gradientUnits == "objectBoundingBox"
                                        ? bb.x() +
                                          bb.width() *
                                              this.attribute("fx").numValue()
                                        : this.attribute("fx").toPixels("x");
                            }
                            if (this.attribute("fy").hasValue()) {
                                fy =
                                    this.gradientUnits == "objectBoundingBox"
                                        ? bb.y() +
                                          bb.height() *
                                              this.attribute("fy").numValue()
                                        : this.attribute("fy").toPixels("y");
                            }
                            var r =
                                this.gradientUnits == "objectBoundingBox"
                                    ? ((bb.width() + bb.height()) / 2) *
                                      this.attribute("r").numValue()
                                    : this.attribute("r").toPixels();
                            return ctx.createRadialGradient(
                                fx,
                                fy,
                                0,
                                cx,
                                cy,
                                r
                            );
                        };
                    };
                    svg.Element.radialGradient.prototype =
                        new svg.Element.GradientBase();
                    // gradient stop element
                    svg.Element.stop = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.offset = this.attribute("offset").numValue();
                        if (this.offset < 0) this.offset = 0;
                        if (this.offset > 1) this.offset = 1;
                        var stopColor = this.style("stop-color");
                        if (this.style("stop-opacity").hasValue())
                            stopColor = stopColor.addOpacity(
                                this.style("stop-opacity").value
                            );
                        this.color = stopColor.value;
                    };
                    svg.Element.stop.prototype = new svg.Element.ElementBase();
                    // animation base element
                    svg.Element.AnimateBase = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        svg.Animations.push(this);
                        this.duration = 0;
                        this.begin = this.attribute("begin").toMilliseconds();
                        this.maxDuration =
                            this.begin + this.attribute("dur").toMilliseconds();
                        this.getProperty = function () {
                            var attributeType =
                                this.attribute("attributeType").value;
                            var attributeName =
                                this.attribute("attributeName").value;
                            if (attributeType == "CSS") {
                                return this.parent.style(attributeName, true);
                            }
                            return this.parent.attribute(attributeName, true);
                        };
                        this.initialValue = null;
                        this.initialUnits = "";
                        this.removed = false;
                        this.calcValue = function () {
                            // OVERRIDE ME!
                            return "";
                        };
                        this.update = function (delta) {
                            // set initial value
                            if (this.initialValue == null) {
                                this.initialValue = this.getProperty().value;
                                this.initialUnits =
                                    this.getProperty().getUnits();
                            }
                            // if we're past the end time
                            if (this.duration > this.maxDuration) {
                                // loop for indefinitely repeating animations
                                if (
                                    this.attribute("repeatCount").value ==
                                        "indefinite" ||
                                    this.attribute("repeatDur").value ==
                                        "indefinite"
                                ) {
                                    this.duration = 0;
                                } else if (
                                    this.attribute("fill").valueOrDefault(
                                        "remove"
                                    ) == "remove" &&
                                    !this.removed
                                ) {
                                    this.removed = true;
                                    this.getProperty().value =
                                        this.initialValue;
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                            this.duration = this.duration + delta;
                            // if we're past the begin time
                            var updated = false;
                            if (this.begin < this.duration) {
                                var newValue = this.calcValue();
                                // tween
                                if (this.attribute("type").hasValue()) {
                                    // for transform, etc.
                                    var type = this.attribute("type").value;
                                    newValue = type + "(" + newValue + ")";
                                }
                                this.getProperty().value = newValue;
                                updated = true;
                            }
                            return updated;
                        };
                        this.from = this.attribute("from");
                        this.to = this.attribute("to");
                        this.values = this.attribute("values");
                        if (this.values.hasValue())
                            this.values.value = this.values.value.split(";");
                        // fraction of duration we've covered
                        this.progress = function () {
                            var ret = {
                                progress:
                                    (this.duration - this.begin) /
                                    (this.maxDuration - this.begin)
                            };
                            if (this.values.hasValue()) {
                                var p =
                                    ret.progress *
                                    (this.values.value.length - 1);
                                var lb = Math.floor(p),
                                    ub = Math.ceil(p);
                                ret.from = new svg.Property(
                                    "from",
                                    parseFloat(this.values.value[lb])
                                );
                                ret.to = new svg.Property(
                                    "to",
                                    parseFloat(this.values.value[ub])
                                );
                                ret.progress = (p - lb) / (ub - lb);
                            } else {
                                ret.from = this.from;
                                ret.to = this.to;
                            }
                            return ret;
                        };
                    };
                    svg.Element.AnimateBase.prototype =
                        new svg.Element.ElementBase();
                    // animate element
                    svg.Element.animate = function (node) {
                        this.base = svg.Element.AnimateBase;
                        this.base(node);
                        this.calcValue = function () {
                            var p = this.progress();
                            // tween value linearly
                            var newValue =
                                p.from.numValue() +
                                (p.to.numValue() - p.from.numValue()) *
                                    p.progress;
                            return newValue + this.initialUnits;
                        };
                    };
                    svg.Element.animate.prototype =
                        new svg.Element.AnimateBase();
                    // animate color element
                    svg.Element.animateColor = function (node) {
                        this.base = svg.Element.AnimateBase;
                        this.base(node);
                        this.calcValue = function () {
                            var p = this.progress();
                            var from = new RGBColor(p.from.value);
                            var to = new RGBColor(p.to.value);
                            if (from.ok && to.ok) {
                                // tween color linearly
                                var r = from.r + (to.r - from.r) * p.progress;
                                var g = from.g + (to.g - from.g) * p.progress;
                                var b = from.b + (to.b - from.b) * p.progress;
                                return (
                                    "rgb(" +
                                    parseInt(r, 10) +
                                    "," +
                                    parseInt(g, 10) +
                                    "," +
                                    parseInt(b, 10) +
                                    ")"
                                );
                            }
                            return this.attribute("from").value;
                        };
                    };
                    svg.Element.animateColor.prototype =
                        new svg.Element.AnimateBase();
                    // animate transform element
                    svg.Element.animateTransform = function (node) {
                        this.base = svg.Element.AnimateBase;
                        this.base(node);
                        this.calcValue = function () {
                            var p = this.progress();
                            // tween value linearly
                            var from = svg.ToNumberArray(p.from.value);
                            var to = svg.ToNumberArray(p.to.value);
                            var newValue = "";
                            for (var i = 0; i < from.length; i++) {
                                newValue +=
                                    from[i] +
                                    (to[i] - from[i]) * p.progress +
                                    " ";
                            }
                            return newValue;
                        };
                    };
                    svg.Element.animateTransform.prototype =
                        new svg.Element.animate();
                    // font element
                    svg.Element.font = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.horizAdvX =
                            this.attribute("horiz-adv-x").numValue();
                        this.isRTL = false;
                        this.isArabic = false;
                        this.fontFace = null;
                        this.missingGlyph = null;
                        this.glyphs = [];
                        for (var i = 0; i < this.children.length; i++) {
                            var child = this.children[i];
                            if (child.type == "font-face") {
                                this.fontFace = child;
                                if (child.style("font-family").hasValue()) {
                                    svg.Definitions[
                                        child.style("font-family").value
                                    ] = this;
                                }
                            } else if (child.type == "missing-glyph")
                                this.missingGlyph = child;
                            else if (child.type == "glyph") {
                                if (child.arabicForm != "") {
                                    this.isRTL = true;
                                    this.isArabic = true;
                                    if (
                                        typeof this.glyphs[child.unicode] ==
                                        "undefined"
                                    )
                                        this.glyphs[child.unicode] = [];
                                    this.glyphs[child.unicode][
                                        child.arabicForm
                                    ] = child;
                                } else {
                                    this.glyphs[child.unicode] = child;
                                }
                            }
                        }
                    };
                    svg.Element.font.prototype = new svg.Element.ElementBase();
                    // font-face element
                    svg.Element.fontface = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.ascent = this.attribute("ascent").value;
                        this.descent = this.attribute("descent").value;
                        this.unitsPerEm =
                            this.attribute("units-per-em").numValue();
                    };
                    svg.Element.fontface.prototype =
                        new svg.Element.ElementBase();
                    // missing-glyph element
                    svg.Element.missingglyph = function (node) {
                        this.base = svg.Element.path;
                        this.base(node);
                        this.horizAdvX = 0;
                    };
                    svg.Element.missingglyph.prototype = new svg.Element.path();
                    // glyph element
                    svg.Element.glyph = function (node) {
                        this.base = svg.Element.path;
                        this.base(node);
                        this.horizAdvX =
                            this.attribute("horiz-adv-x").numValue();
                        this.unicode = this.attribute("unicode").value;
                        this.arabicForm = this.attribute("arabic-form").value;
                    };
                    svg.Element.glyph.prototype = new svg.Element.path();
                    // text element
                    svg.Element.text = function (node) {
                        this.captureTextNodes = true;
                        this.base = svg.Element.RenderedElementBase;
                        this.base(node);
                        this.baseSetContext = this.setContext;
                        this.setContext = function (ctx) {
                            this.baseSetContext(ctx);
                            if (this.style("dominant-baseline").hasValue())
                                ctx.textBaseline =
                                    this.style("dominant-baseline").value;
                            if (this.style("alignment-baseline").hasValue())
                                ctx.textBaseline =
                                    this.style("alignment-baseline").value;
                        };
                        this.getBoundingBox = function () {
                            // TODO: implement
                            return new svg.BoundingBox(
                                this.attribute("x").toPixels("x"),
                                this.attribute("y").toPixels("y"),
                                0,
                                0
                            );
                        };
                        this.renderChildren = function (ctx) {
                            this.x = this.attribute("x").toPixels("x");
                            this.y = this.attribute("y").toPixels("y");
                            this.x += this.getAnchorDelta(ctx, this, 0);
                            for (var i = 0; i < this.children.length; i++) {
                                this.renderChild(ctx, this, i);
                            }
                        };
                        this.getAnchorDelta = function (ctx, parent, startI) {
                            var textAnchor =
                                this.style("text-anchor").valueOrDefault(
                                    "start"
                                );
                            if (textAnchor != "start") {
                                var width = 0;
                                for (
                                    var i = startI;
                                    i < parent.children.length;
                                    i++
                                ) {
                                    var child = parent.children[i];
                                    if (
                                        i > startI &&
                                        child.attribute("x").hasValue()
                                    )
                                        break;
                                    // new group
                                    width += child.measureTextRecursive(ctx);
                                }
                                return (
                                    -1 *
                                    (textAnchor == "end" ? width : width / 2)
                                );
                            }
                            return 0;
                        };
                        this.renderChild = function (ctx, parent, i) {
                            var child = parent.children[i];
                            if (child.attribute("x").hasValue()) {
                                child.x =
                                    child.attribute("x").toPixels("x") +
                                    this.getAnchorDelta(ctx, parent, i);
                            } else {
                                if (this.attribute("dx").hasValue())
                                    this.x +=
                                        this.attribute("dx").toPixels("x");
                                if (child.attribute("dx").hasValue())
                                    this.x += child
                                        .attribute("dx")
                                        .toPixels("x");
                                child.x = this.x;
                            }
                            this.x = child.x + child.measureText(ctx);
                            if (child.attribute("y").hasValue()) {
                                child.y = child.attribute("y").toPixels("y");
                            } else {
                                if (this.attribute("dy").hasValue())
                                    this.y +=
                                        this.attribute("dy").toPixels("y");
                                if (child.attribute("dy").hasValue())
                                    this.y += child
                                        .attribute("dy")
                                        .toPixels("y");
                                child.y = this.y;
                            }
                            this.y = child.y;
                            child.render(ctx);
                            for (var i = 0; i < child.children.length; i++) {
                                this.renderChild(ctx, child, i);
                            }
                        };
                    };
                    svg.Element.text.prototype =
                        new svg.Element.RenderedElementBase();
                    // text base
                    svg.Element.TextElementBase = function (node) {
                        this.base = svg.Element.RenderedElementBase;
                        this.base(node);
                        this.getGlyph = function (font, text, i) {
                            var c = text[i];
                            var glyph = null;
                            if (font.isArabic) {
                                var arabicForm = "isolated";
                                if (
                                    (i == 0 || text[i - 1] == " ") &&
                                    i < text.length - 2 &&
                                    text[i + 1] != " "
                                )
                                    arabicForm = "terminal";
                                if (
                                    i > 0 &&
                                    text[i - 1] != " " &&
                                    i < text.length - 2 &&
                                    text[i + 1] != " "
                                )
                                    arabicForm = "medial";
                                if (
                                    i > 0 &&
                                    text[i - 1] != " " &&
                                    (i == text.length - 1 || text[i + 1] == " ")
                                )
                                    arabicForm = "initial";
                                if (typeof font.glyphs[c] != "undefined") {
                                    glyph = font.glyphs[c][arabicForm];
                                    if (
                                        glyph == null &&
                                        font.glyphs[c].type == "glyph"
                                    )
                                        glyph = font.glyphs[c];
                                }
                            } else {
                                glyph = font.glyphs[c];
                            }
                            if (glyph == null) glyph = font.missingGlyph;
                            return glyph;
                        };
                        this.renderChildren = function (ctx) {
                            var customFont = this.parent
                                .style("font-family")
                                .getDefinition();
                            if (customFont != null) {
                                var fontSize = this.parent
                                    .style("font-size")
                                    .numValueOrDefault(
                                        svg.Font.Parse(svg.ctx.font).fontSize
                                    );
                                var fontStyle = this.parent
                                    .style("font-style")
                                    .valueOrDefault(
                                        svg.Font.Parse(svg.ctx.font).fontStyle
                                    );
                                var text = this.getText();
                                if (customFont.isRTL)
                                    text = text.split("").reverse().join("");
                                var dx = svg.ToNumberArray(
                                    this.parent.attribute("dx").value
                                );
                                for (var i = 0; i < text.length; i++) {
                                    var glyph = this.getGlyph(
                                        customFont,
                                        text,
                                        i
                                    );
                                    var scale =
                                        fontSize /
                                        customFont.fontFace.unitsPerEm;
                                    ctx.translate(this.x, this.y);
                                    ctx.scale(scale, -scale);
                                    var lw = ctx.lineWidth;
                                    ctx.lineWidth =
                                        (ctx.lineWidth *
                                            customFont.fontFace.unitsPerEm) /
                                        fontSize;
                                    if (fontStyle == "italic")
                                        ctx.transform(1, 0, 0.4, 1, 0, 0);
                                    glyph.render(ctx);
                                    if (fontStyle == "italic")
                                        ctx.transform(1, 0, -0.4, 1, 0, 0);
                                    ctx.lineWidth = lw;
                                    ctx.scale(1 / scale, -1 / scale);
                                    ctx.translate(-this.x, -this.y);
                                    this.x +=
                                        (fontSize *
                                            (glyph.horizAdvX ||
                                                customFont.horizAdvX)) /
                                        customFont.fontFace.unitsPerEm;
                                    if (
                                        typeof dx[i] != "undefined" &&
                                        !isNaN(dx[i])
                                    ) {
                                        this.x += dx[i];
                                    }
                                }
                                return;
                            }
                            if (ctx.fillStyle != "")
                                ctx.fillText(
                                    svg.compressSpaces(this.getText()),
                                    this.x,
                                    this.y
                                );
                            if (ctx.strokeStyle != "")
                                ctx.strokeText(
                                    svg.compressSpaces(this.getText()),
                                    this.x,
                                    this.y
                                );
                        };
                        this.getText = function () {};
                        this.measureTextRecursive = function (ctx) {
                            var width = this.measureText(ctx);
                            for (var i = 0; i < this.children.length; i++) {
                                width +=
                                    this.children[i].measureTextRecursive(ctx);
                            }
                            return width;
                        };
                        this.measureText = function (ctx) {
                            var customFont = this.parent
                                .style("font-family")
                                .getDefinition();
                            if (customFont != null) {
                                var fontSize = this.parent
                                    .style("font-size")
                                    .numValueOrDefault(
                                        svg.Font.Parse(svg.ctx.font).fontSize
                                    );
                                var measure = 0;
                                var text = this.getText();
                                if (customFont.isRTL)
                                    text = text.split("").reverse().join("");
                                var dx = svg.ToNumberArray(
                                    this.parent.attribute("dx").value
                                );
                                for (var i = 0; i < text.length; i++) {
                                    var glyph = this.getGlyph(
                                        customFont,
                                        text,
                                        i
                                    );
                                    measure +=
                                        ((glyph.horizAdvX ||
                                            customFont.horizAdvX) *
                                            fontSize) /
                                        customFont.fontFace.unitsPerEm;
                                    if (
                                        typeof dx[i] != "undefined" &&
                                        !isNaN(dx[i])
                                    ) {
                                        measure += dx[i];
                                    }
                                }
                                return measure;
                            }
                            var textToMeasure = svg.compressSpaces(
                                this.getText()
                            );
                            if (!ctx.measureText)
                                return textToMeasure.length * 10;
                            ctx.save();
                            this.setContext(ctx);
                            var width = ctx.measureText(textToMeasure).width;
                            ctx.restore();
                            return width;
                        };
                    };
                    svg.Element.TextElementBase.prototype =
                        new svg.Element.RenderedElementBase();
                    // tspan
                    svg.Element.tspan = function (node) {
                        this.captureTextNodes = true;
                        this.base = svg.Element.TextElementBase;
                        this.base(node);
                        this.text = node.nodeValue || node.text || "";
                        this.getText = function () {
                            return this.text;
                        };
                    };
                    svg.Element.tspan.prototype =
                        new svg.Element.TextElementBase();
                    // tref
                    svg.Element.tref = function (node) {
                        this.base = svg.Element.TextElementBase;
                        this.base(node);
                        this.getText = function () {
                            var element =
                                this.getHrefAttribute().getDefinition();
                            if (element != null)
                                return element.children[0].getText();
                        };
                    };
                    svg.Element.tref.prototype =
                        new svg.Element.TextElementBase();
                    // a element
                    svg.Element.a = function (node) {
                        this.base = svg.Element.TextElementBase;
                        this.base(node);
                        this.hasText = true;
                        for (var i = 0; i < node.childNodes.length; i++) {
                            if (node.childNodes[i].nodeType != 3)
                                this.hasText = false;
                        }
                        // this might contain text
                        this.text = this.hasText
                            ? node.childNodes[0].nodeValue
                            : "";
                        this.getText = function () {
                            return this.text;
                        };
                        this.baseRenderChildren = this.renderChildren;
                        this.renderChildren = function (ctx) {
                            if (this.hasText) {
                                // render as text element
                                this.baseRenderChildren(ctx);
                                var fontSize = new svg.Property(
                                    "fontSize",
                                    svg.Font.Parse(svg.ctx.font).fontSize
                                );
                                svg.Mouse.checkBoundingBox(
                                    this,
                                    new svg.BoundingBox(
                                        this.x,
                                        this.y - fontSize.toPixels("y"),
                                        this.x + this.measureText(ctx),
                                        this.y
                                    )
                                );
                            } else {
                                // render as temporary group
                                var g = new svg.Element.g();
                                g.children = this.children;
                                g.parent = this;
                                g.render(ctx);
                            }
                        };
                        this.onclick = function () {
                            window.open(this.getHrefAttribute().value);
                        };
                        this.onmousemove = function () {
                            svg.ctx.canvas.style.cursor = "pointer";
                        };
                    };
                    svg.Element.a.prototype = new svg.Element.TextElementBase();
                    // image element
                    svg.Element.image = function (node) {
                        this.base = svg.Element.RenderedElementBase;
                        this.base(node);
                        var href = this.getHrefAttribute().value;
                        var isSvg = href.match(/\.svg$/);
                        svg.Images.push(this);
                        this.loaded = false;
                        if (!isSvg) {
                            this.img = document.createElement("img");
                            var self = this;
                            this.img.onload = function () {
                                self.loaded = true;
                            };
                            this.img.onerror = function () {
                                if (typeof console != "undefined") {
                                    console.log(
                                        'ERROR: image "' + href + '" not found'
                                    );
                                    self.loaded = true;
                                }
                            };
                            this.img.src = href;
                        } else {
                            this.img = svg.ajax(href);
                            this.loaded = true;
                        }
                        this.renderChildren = function (ctx) {
                            var x = this.attribute("x").toPixels("x");
                            var y = this.attribute("y").toPixels("y");
                            var width = this.attribute("width").toPixels("x");
                            var height = this.attribute("height").toPixels("y");
                            if (width == 0 || height == 0) return;
                            ctx.save();
                            if (isSvg) {
                                ctx.drawSvg(this.img, x, y, width, height);
                            } else {
                                ctx.translate(x, y);
                                svg.AspectRatio(
                                    ctx,
                                    this.attribute("preserveAspectRatio").value,
                                    width,
                                    this.img.width,
                                    height,
                                    this.img.height,
                                    0,
                                    0
                                );
                                ctx.drawImage(this.img, 0, 0);
                            }
                            ctx.restore();
                        };
                        this.getBoundingBox = function () {
                            var x = this.attribute("x").toPixels("x");
                            var y = this.attribute("y").toPixels("y");
                            var width = this.attribute("width").toPixels("x");
                            var height = this.attribute("height").toPixels("y");
                            return new svg.BoundingBox(
                                x,
                                y,
                                x + width,
                                y + height
                            );
                        };
                    };
                    svg.Element.image.prototype =
                        new svg.Element.RenderedElementBase();
                    // group element
                    svg.Element.g = function (node) {
                        this.base = svg.Element.RenderedElementBase;
                        this.base(node);
                        this.getBoundingBox = function () {
                            var bb = new svg.BoundingBox();
                            for (var i = 0; i < this.children.length; i++) {
                                bb.addBoundingBox(
                                    this.children[i].getBoundingBox()
                                );
                            }
                            return bb;
                        };
                    };
                    svg.Element.g.prototype =
                        new svg.Element.RenderedElementBase();
                    // symbol element
                    svg.Element.symbol = function (node) {
                        this.base = svg.Element.RenderedElementBase;
                        this.base(node);
                        this.baseSetContext = this.setContext;
                        this.setContext = function (ctx) {
                            this.baseSetContext(ctx);
                            // viewbox
                            if (this.attribute("viewBox").hasValue()) {
                                var viewBox = svg.ToNumberArray(
                                    this.attribute("viewBox").value
                                );
                                var minX = viewBox[0];
                                var minY = viewBox[1];
                                width = viewBox[2];
                                height = viewBox[3];
                                svg.AspectRatio(
                                    ctx,
                                    this.attribute("preserveAspectRatio").value,
                                    this.attribute("width").toPixels("x"),
                                    width,
                                    this.attribute("height").toPixels("y"),
                                    height,
                                    minX,
                                    minY
                                );
                                svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);
                            }
                        };
                    };
                    svg.Element.symbol.prototype =
                        new svg.Element.RenderedElementBase();
                    // style element
                    svg.Element.style = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        // text, or spaces then CDATA
                        var css = "";
                        for (var i = 0; i < node.childNodes.length; i++) {
                            css += node.childNodes[i].nodeValue;
                        }
                        css = css.replace(
                            /(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm,
                            ""
                        );
                        // remove comments
                        css = svg.compressSpaces(css);
                        // replace whitespace
                        var cssDefs = css.split("}");
                        for (var i = 0; i < cssDefs.length; i++) {
                            if (svg.trim(cssDefs[i]) != "") {
                                var cssDef = cssDefs[i].split("{");
                                var cssClasses = cssDef[0].split(",");
                                var cssProps = cssDef[1].split(";");
                                for (var j = 0; j < cssClasses.length; j++) {
                                    var cssClass = svg.trim(cssClasses[j]);
                                    if (cssClass != "") {
                                        var props = {};
                                        for (
                                            var k = 0;
                                            k < cssProps.length;
                                            k++
                                        ) {
                                            var prop = cssProps[k].indexOf(":");
                                            var name = cssProps[k].substr(
                                                0,
                                                prop
                                            );
                                            var value = cssProps[k].substr(
                                                prop + 1,
                                                cssProps[k].length - prop
                                            );
                                            if (name != null && value != null) {
                                                props[svg.trim(name)] =
                                                    new svg.Property(
                                                        svg.trim(name),
                                                        svg.trim(value)
                                                    );
                                            }
                                        }
                                        svg.Styles[cssClass] = props;
                                        if (cssClass == "@font-face") {
                                            var fontFamily = props[
                                                "font-family"
                                            ].value.replace(/"/g, "");
                                            var srcs =
                                                props["src"].value.split(",");
                                            for (
                                                var s = 0;
                                                s < srcs.length;
                                                s++
                                            ) {
                                                if (
                                                    srcs[s].indexOf(
                                                        'format("svg")'
                                                    ) > 0
                                                ) {
                                                    var urlStart =
                                                        srcs[s].indexOf("url");
                                                    var urlEnd = srcs[
                                                        s
                                                    ].indexOf(")", urlStart);
                                                    var url = srcs[s].substr(
                                                        urlStart + 5,
                                                        urlEnd - urlStart - 6
                                                    );
                                                    var doc = svg.parseXml(
                                                        svg.ajax(url)
                                                    );
                                                    var fonts =
                                                        doc.getElementsByTagName(
                                                            "font"
                                                        );
                                                    for (
                                                        var f = 0;
                                                        f < fonts.length;
                                                        f++
                                                    ) {
                                                        var font =
                                                            svg.CreateElement(
                                                                fonts[f]
                                                            );
                                                        svg.Definitions[
                                                            fontFamily
                                                        ] = font;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };
                    svg.Element.style.prototype = new svg.Element.ElementBase();
                    // use element
                    svg.Element.use = function (node) {
                        this.base = svg.Element.RenderedElementBase;
                        this.base(node);
                        this.baseSetContext = this.setContext;
                        this.setContext = function (ctx) {
                            this.baseSetContext(ctx);
                            if (this.attribute("x").hasValue())
                                ctx.translate(
                                    this.attribute("x").toPixels("x"),
                                    0
                                );
                            if (this.attribute("y").hasValue())
                                ctx.translate(
                                    0,
                                    this.attribute("y").toPixels("y")
                                );
                        };
                        this.getDefinition = function () {
                            var element =
                                this.getHrefAttribute().getDefinition();
                            if (this.attribute("width").hasValue())
                                element.attribute("width", true).value =
                                    this.attribute("width").value;
                            if (this.attribute("height").hasValue())
                                element.attribute("height", true).value =
                                    this.attribute("height").value;
                            return element;
                        };
                        this.path = function (ctx) {
                            var element = this.getDefinition();
                            if (element != null) element.path(ctx);
                        };
                        this.getBoundingBox = function () {
                            var element = this.getDefinition();
                            if (element != null)
                                return element.getBoundingBox();
                        };
                        this.renderChildren = function (ctx) {
                            var element = this.getDefinition();
                            if (element != null) {
                                // temporarily detach from parent and render
                                var oldParent = element.parent;
                                element.parent = null;
                                element.render(ctx);
                                element.parent = oldParent;
                            }
                        };
                    };
                    svg.Element.use.prototype =
                        new svg.Element.RenderedElementBase();
                    // mask element
                    svg.Element.mask = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.apply = function (ctx, element) {
                            // render as temp svg
                            var x = this.attribute("x").toPixels("x");
                            var y = this.attribute("y").toPixels("y");
                            var width = this.attribute("width").toPixels("x");
                            var height = this.attribute("height").toPixels("y");
                            if (width == 0 && height == 0) {
                                var bb = new svg.BoundingBox();
                                for (var i = 0; i < this.children.length; i++) {
                                    bb.addBoundingBox(
                                        this.children[i].getBoundingBox()
                                    );
                                }
                                var x = Math.floor(bb.x1);
                                var y = Math.floor(bb.y1);
                                var width = Math.floor(bb.width());
                                var height = Math.floor(bb.height());
                            }
                            // temporarily remove mask to avoid recursion
                            var mask = element.attribute("mask").value;
                            element.attribute("mask").value = "";
                            var cMask = document.createElement("canvas");
                            cMask.width = x + width;
                            cMask.height = y + height;
                            var maskCtx = cMask.getContext("2d");
                            this.renderChildren(maskCtx);
                            var c = document.createElement("canvas");
                            c.width = x + width;
                            c.height = y + height;
                            var tempCtx = c.getContext("2d");
                            element.render(tempCtx);
                            tempCtx.globalCompositeOperation = "destination-in";
                            tempCtx.fillStyle = maskCtx.createPattern(
                                cMask,
                                "no-repeat"
                            );
                            tempCtx.fillRect(0, 0, x + width, y + height);
                            ctx.fillStyle = tempCtx.createPattern(
                                c,
                                "no-repeat"
                            );
                            ctx.fillRect(0, 0, x + width, y + height);
                            // reassign mask
                            element.attribute("mask").value = mask;
                        };
                        this.render = function (ctx) {};
                    };
                    svg.Element.mask.prototype = new svg.Element.ElementBase();
                    // clip element
                    svg.Element.clipPath = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.apply = function (ctx) {
                            for (var i = 0; i < this.children.length; i++) {
                                var child = this.children[i];
                                if (typeof child.path != "undefined") {
                                    var transform = null;
                                    if (
                                        child.attribute("transform").hasValue()
                                    ) {
                                        transform = new svg.Transform(
                                            child.attribute("transform").value
                                        );
                                        transform.apply(ctx);
                                    }
                                    child.path(ctx);
                                    ctx.clip();
                                    if (transform) {
                                        transform.unapply(ctx);
                                    }
                                }
                            }
                        };
                        this.render = function (ctx) {};
                    };
                    svg.Element.clipPath.prototype =
                        new svg.Element.ElementBase();
                    // filters
                    svg.Element.filter = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.apply = function (ctx, element) {
                            // render as temp svg
                            var bb = element.getBoundingBox();
                            var x = Math.floor(bb.x1);
                            var y = Math.floor(bb.y1);
                            var width = Math.floor(bb.width());
                            var height = Math.floor(bb.height());
                            // temporarily remove filter to avoid recursion
                            var filter = element.style("filter").value;
                            element.style("filter").value = "";
                            var px = 0,
                                py = 0;
                            for (var i = 0; i < this.children.length; i++) {
                                var efd =
                                    this.children[i].extraFilterDistance || 0;
                                px = Math.max(px, efd);
                                py = Math.max(py, efd);
                            }
                            var c = document.createElement("canvas");
                            c.width = width + 2 * px;
                            c.height = height + 2 * py;
                            var tempCtx = c.getContext("2d");
                            tempCtx.translate(-x + px, -y + py);
                            element.render(tempCtx);
                            // apply filters
                            for (var i = 0; i < this.children.length; i++) {
                                this.children[i].apply(
                                    tempCtx,
                                    0,
                                    0,
                                    width + 2 * px,
                                    height + 2 * py
                                );
                            }
                            // render on me
                            ctx.drawImage(
                                c,
                                0,
                                0,
                                width + 2 * px,
                                height + 2 * py,
                                x - px,
                                y - py,
                                width + 2 * px,
                                height + 2 * py
                            );
                            // reassign filter
                            element.style("filter", true).value = filter;
                        };
                        this.render = function (ctx) {};
                    };
                    svg.Element.filter.prototype =
                        new svg.Element.ElementBase();
                    svg.Element.feMorphology = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.apply = function (ctx, x, y, width, height) {};
                    };
                    svg.Element.feMorphology.prototype =
                        new svg.Element.ElementBase();
                    svg.Element.feColorMatrix = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        function imGet(img, x, y, width, height, rgba) {
                            return img[y * width * 4 + x * 4 + rgba];
                        }
                        function imSet(img, x, y, width, height, rgba, val) {
                            img[y * width * 4 + x * 4 + rgba] = val;
                        }
                        this.apply = function (ctx, x, y, width, height) {
                            // only supporting grayscale for now per Issue 195, need to extend to all matrix
                            // assuming x==0 && y==0 for now
                            var srcData = ctx.getImageData(0, 0, width, height);
                            for (var y = 0; y < height; y++) {
                                for (var x = 0; x < width; x++) {
                                    var r = imGet(
                                        srcData.data,
                                        x,
                                        y,
                                        width,
                                        height,
                                        0
                                    );
                                    var g = imGet(
                                        srcData.data,
                                        x,
                                        y,
                                        width,
                                        height,
                                        1
                                    );
                                    var b = imGet(
                                        srcData.data,
                                        x,
                                        y,
                                        width,
                                        height,
                                        2
                                    );
                                    var gray = (r + g + b) / 3;
                                    imSet(
                                        srcData.data,
                                        x,
                                        y,
                                        width,
                                        height,
                                        0,
                                        gray
                                    );
                                    imSet(
                                        srcData.data,
                                        x,
                                        y,
                                        width,
                                        height,
                                        1,
                                        gray
                                    );
                                    imSet(
                                        srcData.data,
                                        x,
                                        y,
                                        width,
                                        height,
                                        2,
                                        gray
                                    );
                                }
                            }
                            ctx.clearRect(0, 0, width, height);
                            ctx.putImageData(srcData, 0, 0);
                        };
                    };
                    svg.Element.feColorMatrix.prototype =
                        new svg.Element.ElementBase();
                    svg.Element.feGaussianBlur = function (node) {
                        this.base = svg.Element.ElementBase;
                        this.base(node);
                        this.blurRadius = Math.floor(
                            this.attribute("stdDeviation").numValue()
                        );
                        this.extraFilterDistance = this.blurRadius;
                        this.apply = function (ctx, x, y, width, height) {
                            if (typeof stackBlurCanvasRGBA == "undefined") {
                                if (typeof console != "undefined") {
                                    console.log(
                                        "ERROR: StackBlur.js must be included for blur to work"
                                    );
                                }
                                return;
                            }
                            // StackBlur requires canvas be on document
                            ctx.canvas.id = svg.UniqueId();
                            ctx.canvas.style.display = "none";
                            document.body.appendChild(ctx.canvas);
                            stackBlurCanvasRGBA(
                                ctx.canvas.id,
                                x,
                                y,
                                width,
                                height,
                                this.blurRadius
                            );
                            document.body.removeChild(ctx.canvas);
                        };
                    };
                    svg.Element.feGaussianBlur.prototype =
                        new svg.Element.ElementBase();
                    // title element, do nothing
                    svg.Element.title = function (node) {};
                    svg.Element.title.prototype = new svg.Element.ElementBase();
                    // desc element, do nothing
                    svg.Element.desc = function (node) {};
                    svg.Element.desc.prototype = new svg.Element.ElementBase();
                    svg.Element.MISSING = function (node) {
                        if (typeof console != "undefined") {
                            console.log(
                                "ERROR: Element '" +
                                    node.nodeName +
                                    "' not yet implemented."
                            );
                        }
                    };
                    svg.Element.MISSING.prototype =
                        new svg.Element.ElementBase();
                    // element factory
                    svg.CreateElement = function (node) {
                        var className = node.nodeName.replace(/^[^:]+:/, "");
                        // remove namespace
                        className = className.replace(/\-/g, "");
                        // remove dashes
                        var e = null;
                        if (typeof svg.Element[className] != "undefined") {
                            e = new svg.Element[className](node);
                        } else {
                            e = new svg.Element.MISSING(node);
                        }
                        e.type = node.nodeName;
                        return e;
                    };
                    // load from url
                    svg.load = function (ctx, url) {
                        svg.loadXml(ctx, svg.ajax(url));
                    };
                    // load from xml
                    svg.loadXml = function (ctx, xml) {
                        svg.loadXmlDoc(ctx, svg.parseXml(xml));
                    };
                    svg.loadXmlDoc = function (ctx, dom) {
                        svg.init(ctx);
                        var mapXY = function (p) {
                            var e = ctx.canvas;
                            while (e) {
                                p.x -= e.offsetLeft;
                                p.y -= e.offsetTop;
                                e = e.offsetParent;
                            }
                            if (window.scrollX) p.x += window.scrollX;
                            if (window.scrollY) p.y += window.scrollY;
                            return p;
                        };
                        // bind mouse
                        if (svg.opts["ignoreMouse"] != true) {
                            ctx.canvas.onclick = function (e) {
                                var p = mapXY(
                                    new svg.Point(
                                        e != null ? e.clientX : event.clientX,
                                        e != null ? e.clientY : event.clientY
                                    )
                                );
                                svg.Mouse.onclick(p.x, p.y);
                            };
                            ctx.canvas.onmousemove = function (e) {
                                var p = mapXY(
                                    new svg.Point(
                                        e != null ? e.clientX : event.clientX,
                                        e != null ? e.clientY : event.clientY
                                    )
                                );
                                svg.Mouse.onmousemove(p.x, p.y);
                            };
                        }
                        var e = svg.CreateElement(dom.documentElement);
                        e.root = true;
                        // render loop
                        var isFirstRender = true;
                        var draw = function () {
                            svg.ViewPort.Clear();
                            if (ctx.canvas.parentNode)
                                svg.ViewPort.SetCurrent(
                                    ctx.canvas.parentNode.clientWidth,
                                    ctx.canvas.parentNode.clientHeight
                                );
                            if (svg.opts["ignoreDimensions"] != true) {
                                // set canvas size
                                if (e.style("width").hasValue()) {
                                    ctx.canvas.width = e
                                        .style("width")
                                        .toPixels("x");
                                    ctx.canvas.style.width =
                                        ctx.canvas.width + "px";
                                }
                                if (e.style("height").hasValue()) {
                                    ctx.canvas.height = e
                                        .style("height")
                                        .toPixels("y");
                                    ctx.canvas.style.height =
                                        ctx.canvas.height + "px";
                                }
                            }
                            var cWidth =
                                ctx.canvas.clientWidth || ctx.canvas.width;
                            var cHeight =
                                ctx.canvas.clientHeight || ctx.canvas.height;
                            if (
                                svg.opts["ignoreDimensions"] == true &&
                                e.style("width").hasValue() &&
                                e.style("height").hasValue()
                            ) {
                                cWidth = e.style("width").toPixels("x");
                                cHeight = e.style("height").toPixels("y");
                            }
                            svg.ViewPort.SetCurrent(cWidth, cHeight);
                            if (svg.opts["offsetX"] != null)
                                e.attribute("x", true).value =
                                    svg.opts["offsetX"];
                            if (svg.opts["offsetY"] != null)
                                e.attribute("y", true).value =
                                    svg.opts["offsetY"];
                            if (
                                svg.opts["scaleWidth"] != null &&
                                svg.opts["scaleHeight"] != null
                            ) {
                                var xRatio = 1,
                                    yRatio = 1,
                                    viewBox = svg.ToNumberArray(
                                        e.attribute("viewBox").value
                                    );
                                if (e.attribute("width").hasValue())
                                    xRatio =
                                        e.attribute("width").toPixels("x") /
                                        svg.opts["scaleWidth"];
                                else if (!isNaN(viewBox[2]))
                                    xRatio =
                                        viewBox[2] / svg.opts["scaleWidth"];
                                if (e.attribute("height").hasValue())
                                    yRatio =
                                        e.attribute("height").toPixels("y") /
                                        svg.opts["scaleHeight"];
                                else if (!isNaN(viewBox[3]))
                                    yRatio =
                                        viewBox[3] / svg.opts["scaleHeight"];
                                e.attribute("width", true).value =
                                    svg.opts["scaleWidth"];
                                e.attribute("height", true).value =
                                    svg.opts["scaleHeight"];
                                e.attribute("viewBox", true).value =
                                    "0 0 " +
                                    cWidth * xRatio +
                                    " " +
                                    cHeight * yRatio;
                                e.attribute("preserveAspectRatio", true).value =
                                    "none";
                            }
                            // clear and render
                            if (svg.opts["ignoreClear"] != true) {
                                ctx.clearRect(0, 0, cWidth, cHeight);
                            }
                            e.render(ctx);
                            if (isFirstRender) {
                                isFirstRender = false;
                                if (
                                    typeof svg.opts["renderCallback"] ==
                                    "function"
                                )
                                    svg.opts["renderCallback"](dom);
                            }
                        };
                        var waitingForImages = true;
                        if (svg.ImagesLoaded()) {
                            waitingForImages = false;
                            draw();
                        }
                        svg.intervalID = setInterval(function () {
                            var needUpdate = false;
                            if (waitingForImages && svg.ImagesLoaded()) {
                                waitingForImages = false;
                                needUpdate = true;
                            }
                            // need update from mouse events?
                            if (svg.opts["ignoreMouse"] != true) {
                                needUpdate = needUpdate | svg.Mouse.hasEvents();
                            }
                            // need update from animations?
                            if (svg.opts["ignoreAnimation"] != true) {
                                for (
                                    var i = 0;
                                    i < svg.Animations.length;
                                    i++
                                ) {
                                    needUpdate =
                                        needUpdate |
                                        svg.Animations[i].update(
                                            1e3 / svg.FRAMERATE
                                        );
                                }
                            }
                            // need update from redraw?
                            if (typeof svg.opts["forceRedraw"] == "function") {
                                if (svg.opts["forceRedraw"]() == true)
                                    needUpdate = true;
                            }
                            // render if needed
                            if (needUpdate) {
                                draw();
                                svg.Mouse.runEvents();
                            }
                        }, 1e3 / svg.FRAMERATE);
                    };
                    svg.stop = function () {
                        if (svg.intervalID) {
                            clearInterval(svg.intervalID);
                        }
                    };
                    svg.Mouse = new (function () {
                        this.events = [];
                        this.hasEvents = function () {
                            return this.events.length != 0;
                        };
                        this.onclick = function (x, y) {
                            this.events.push({
                                type: "onclick",
                                x: x,
                                y: y,
                                run: function (e) {
                                    if (e.onclick) e.onclick();
                                }
                            });
                        };
                        this.onmousemove = function (x, y) {
                            this.events.push({
                                type: "onmousemove",
                                x: x,
                                y: y,
                                run: function (e) {
                                    if (e.onmousemove) e.onmousemove();
                                }
                            });
                        };
                        this.eventElements = [];
                        this.checkPath = function (element, ctx) {
                            for (var i = 0; i < this.events.length; i++) {
                                var e = this.events[i];
                                if (
                                    ctx.isPointInPath &&
                                    ctx.isPointInPath(e.x, e.y)
                                )
                                    this.eventElements[i] = element;
                            }
                        };
                        this.checkBoundingBox = function (element, bb) {
                            for (var i = 0; i < this.events.length; i++) {
                                var e = this.events[i];
                                if (bb.isPointInBox(e.x, e.y))
                                    this.eventElements[i] = element;
                            }
                        };
                        this.runEvents = function () {
                            svg.ctx.canvas.style.cursor = "";
                            for (var i = 0; i < this.events.length; i++) {
                                var e = this.events[i];
                                var element = this.eventElements[i];
                                while (element) {
                                    e.run(element);
                                    element = element.parent;
                                }
                            }
                            // done running, clear
                            this.events = [];
                            this.eventElements = [];
                        };
                    })();
                    return svg;
                }
            })();
            if (typeof CanvasRenderingContext2D != "undefined") {
                CanvasRenderingContext2D.prototype.drawSvg = function (
                    s,
                    dx,
                    dy,
                    dw,
                    dh
                ) {
                    canvg(this.canvas, s, {
                        ignoreMouse: true,
                        ignoreAnimation: true,
                        ignoreDimensions: true,
                        ignoreClear: true,
                        offsetX: dx,
                        offsetY: dy,
                        scaleWidth: dw,
                        scaleHeight: dh
                    });
                };
            }
            return canvg;
        }
    };

    /*!
     * 输出转换器，提供输出支持
     */
    _p[1] = {
        value: function (require) {
            var kity = _p.r(34),
                canvg = _p.r(0);
            return kity.createClass("Output", {
                constructor: function (formula) {
                    this.formula = formula;
                },
                toJPG: function (cb) {
                    toImage(this.formula, "image/jpeg", cb);
                },
                toPNG: function (cb) {
                    toImage(this.formula, "image/png", cb);
                }
            });
            function toImage(formula, type, cb) {
                var rectSpace = formula.container.getRenderBox();
                // 这里处理输出的宽高缩放
                var curZoom = formula.container.container?.viewport?.zoom || 1;
                return getBase64DataURL(
                    formula.node.ownerDocument,
                    {
                        width: rectSpace.width * curZoom,
                        height: rectSpace.height * curZoom,
                        content: getSVGContent(formula.node)
                    },
                    type,
                    cb
                );
            }
            function getBase64DataURL(doc, data, type, cb) {
                var canvas = null,
                    args = arguments,
                    ctx = null;
                if (false) {
                    drawToCanvas.apply(null, args);
                } else {
                    canvas = getImageCanvas(doc, data.width, data.height, type);
                    ctx = canvas.getContext("2d");
                    var image = new Image();
                    image.onload = function () {
                        try {
                            ctx.drawImage(image, 0, 0);
                            // cb(canvas.toDataURL(type));
                            cb(image.src);
                        } catch (e) {
                            drawToCanvas.apply(null, args);
                        }
                    };
                    image.setAttribute("data-scale", 2);
                    image.src = getSVGDataURL(data.content);
                }
            }
            function getSVGContent(svgNode) {
                var tmp = svgNode.ownerDocument.createElement("div"),
                    start = [
                        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="',
                        svgNode.getAttribute("width"),
                        '" height="',
                        svgNode.getAttribute("height"),
                        '">'
                    ];
                tmp.appendChild(svgNode.cloneNode(true));
                return tmp.innerHTML
                    .replace(/<svg[^>]+?>/i, start.join(""))
                    .replace(/&nbsp;/g, "");
            }
            function getSVGDataURL(data) {
                return (
                    "data:image/svg+xml;base64," +
                    window.btoa(unescape(encodeURIComponent(data)))
                );
            }
            function getImageCanvas(doc, width, height, type) {
                var canvas = doc.createElement("canvas"),
                    ctx = canvas.getContext("2d");
                canvas.width = width;
                canvas.height = height;
                if (type !== "image/png") {
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                return canvas;
            }
            function drawToCanvas(doc, data, type, cb) {
                var canvas = getImageCanvas(doc, data.width, data.height, type);
                canvas.style.cssText =
                    "position: absolute; top: 0; left: 100000px; z-index: -1;";
                window.setTimeout(function () {
                    doc.body.appendChild(canvas);
                    canvg(canvas, data.content);
                    doc.body.removeChild(canvas);
                    cb(canvas.toDataURL(type));
                }, 0);
            }
        }
    };

    /*!
     * 所有字符的列表
     */
    _p[2] = {
        value: function () {
            return [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z",
                "&#x237;",
                "&#x131;",
                "&#x3b1;",
                "&#x3b2;",
                "&#x3b3;",
                "&#x3b4;",
                "&#x3b5;",
                "&#x3b6;",
                "&#x3b7;",
                "&#x3b8;",
                "&#x3b9;",
                "&#x3ba;",
                "&#x3bb;",
                "&#x3bc;",
                "&#x3bd;",
                "&#x3be;",
                "&#x3bf;",
                "&#x3c0;",
                "&#x3c1;",
                "&#x3c2;",
                "&#x3c3;",
                "&#x3c4;",
                "&#x3c5;",
                "&#x3c6;",
                "&#x3c7;",
                "&#x3c8;",
                "&#x3c9;",
                "&#x3d1;",
                "&#x3d5;",
                "&#x3d6;",
                "&#x3de;",
                "&#x3dc;",
                "&#x3f5;",
                "&#x3f1;",
                "&#x3f9;",
                "&#x211c;",
                "&#x2135;",
                "&#x2111;",
                "&#x2127;",
                "&#x2136;",
                "&#x2137;",
                "&#x2138;",
                "&#xf0;",
                "&#x210f;",
                "&#x2141;",
                "&#x210e;",
                "&#x2202;",
                "&#x2118;",
                "&#x214c;",
                "&#x2132;",
                "&#x2201;",
                "&#x2113;",
                "&#x24c8;",
                "(",
                ")",
                "&#x393;",
                "&#x394;",
                "&#x395;",
                "&#x396;",
                "&#x397;",
                "&#x398;",
                "&#x399;",
                "&#x39a;",
                "&#x39b;",
                "&#x39c;",
                "&#x39d;",
                "&#x39e;",
                "&#x39f;",
                "&#x3a0;",
                "&#x3a1;",
                "&#x3a3;",
                "&#x3a4;",
                "&#x3a5;",
                "&#x3a6;",
                "&#x3a7;",
                "&#x3a8;",
                "&#x3a9;",
                "&#x391;",
                "&#x392;",
                "#",
                "!",
                "$",
                "%",
                "&#x26;",
                "&#x2220;",
                "&#x2032;",
                "&#x2035;",
                "&#x2605;",
                "&#x25c6;",
                "&#x25a0;",
                "&#x25b2;",
                "&#x25bc;",
                "&#x22a4;",
                "&#x22a5;",
                "&#x2663;",
                "&#x2660;",
                "&#x2662;",
                "&#x2661;",
                "&#x2203;",
                "&#x2204;",
                "&#x266d;",
                "&#x266e;",
                "&#x266f;",
                "&#x2200;",
                "&#x221e;",
                "&#x2221;",
                "&#x2207;",
                "&#xac;",
                "&#x2222;",
                "&#x221a;",
                "&#x25b3;",
                "&#x25bd;",
                "&#x2205;",
                "&#xf8;",
                "&#x25c7;",
                "&#x25c0;",
                "&#x25b8;",
                "[",
                "]",
                "{",
                "}",
                "&#x3008;",
                "&#x3009;",
                "&#x3f0;",
                ",",
                ".",
                "/",
                ":",
                ";",
                "?",
                "\\",
                "&#x22ee;",
                "&#x22ef;",
                "&#x22f0;",
                "&#x2026;",
                "@",
                "&#x22;",
                "'",
                "|",
                "^",
                "`",
                "&#x201c;",
                "_",
                "*",
                "+",
                "-",
                "&#x2210;",
                "&#x22bc;",
                "&#x22bb;",
                "&#x25ef;",
                "&#x22a1;",
                "&#x229f;",
                "&#x229e;",
                "&#x22a0;",
                "&#x2022;",
                "&#x2229;",
                "&#x222a;",
                "&#x22d2;",
                "&#x22d3;",
                "&#x22d0;",
                "&#x22d1;",
                "&#xb7;",
                "&#x25aa;",
                "&#x25e6;",
                "&#x229b;",
                "&#x229a;",
                "&#x2296;",
                "&#x2299;",
                "&#x229d;",
                "&#x2295;",
                "&#x2297;",
                "&#x2298;",
                "&#xb1;",
                "&#x2213;",
                "&#x22cf;",
                "&#x22ce;",
                "&#x2020;",
                "&#x2021;",
                "&#x22c4;",
                "&#xf7;",
                "&#x22c7;",
                "&#x2214;",
                "&#x232d;",
                "&#x22d7;",
                "&#x22d6;",
                "&#x22c9;",
                "&#x22ca;",
                "&#x22cb;",
                "&#x22cc;",
                "&#x2293;",
                "&#x2294;",
                "&#x2291;",
                "&#x2292;",
                "&#x228f;",
                "&#x2290;",
                "&#x22c6;",
                "&#xd7;",
                "&#x22b3;",
                "&#x22b2;",
                "&#x22b5;",
                "&#x22b4;",
                "&#x228e;",
                "&#x2228;",
                "&#x2227;",
                "&#x2240;",
                "&#x3c;",
                "=",
                "&#x3e;",
                "&#x2248;",
                "&#x2247;",
                "&#x224d;",
                "&#x2252;",
                "&#x2253;",
                "&#x224a;",
                "&#x223d;",
                "&#x2241;",
                "&#x2242;",
                "&#x2243;",
                "&#x22cd;",
                "&#x224f;",
                "&#x224e;",
                "&#x2257;",
                "&#x2245;",
                "&#x22de;",
                "&#x22df;",
                "&#x2250;",
                "&#x2251;",
                "&#x2256;",
                "&#x2a96;",
                "&#x2a95;",
                "&#x2261;",
                "&#x2265;",
                "&#x2264;",
                "&#x2266;",
                "&#x2267;",
                "&#x2a7e;",
                "&#x2a7d;",
                "&#x226b;",
                "&#x226a;",
                "&#x2268;",
                "&#x2269;",
                "&#x22d8;",
                "&#x22d9;",
                "&#x2a87;",
                "&#x2a88;",
                "&#x2a89;",
                "&#x2a8a;",
                "&#x22e7;",
                "&#x22e6;",
                "&#x2a86;",
                "&#x2a85;",
                "&#x22db;",
                "&#x22da;",
                "&#x2a8b;",
                "&#x2a8c;",
                "&#x2277;",
                "&#x2276;",
                "&#x2273;",
                "&#x2272;",
                "&#x232e;",
                "&#x232f;",
                "&#x226f;",
                "&#x2271;",
                "&#x2270;",
                "&#x226e;",
                "&#x2331;",
                "&#x2330;",
                "&#x2332;",
                "&#x2333;",
                "&#x226c;",
                "&#x2280;",
                "&#x2281;",
                "&#x22e0;",
                "&#x22e1;",
                "&#x227a;",
                "&#x227b;",
                "&#x227c;",
                "&#x227d;",
                "&#x227e;",
                "&#x227f;",
                "&#x2282;",
                "&#x2283;",
                "&#x2288;",
                "&#x2289;",
                "&#x2286;",
                "&#x2287;",
                "&#x228a;",
                "&#x228b;",
                "&#x2ab7;",
                "&#x2ab8;",
                "&#x2aaf;",
                "&#x2ab0;",
                "&#x2ab9;",
                "&#x2aba;",
                "&#x2ab5;",
                "&#x2ab6;",
                "&#x22e8;",
                "&#x22e9;",
                "&#x223c;",
                "&#x225c;",
                "&#x21b6;",
                "&#x21b7;",
                "&#x21ba;",
                "&#x21bb;",
                "&#x21be;",
                "&#x21bf;",
                "&#x21c2;",
                "&#x21c3;",
                "&#x21c4;",
                "&#x21c6;",
                "&#x21c8;",
                "&#x21ca;",
                "&#x21cb;",
                "&#x21cc;",
                "&#x21cd;",
                "&#x21ce;",
                "&#x21cf;",
                "&#x21d0;",
                "&#x21d1;",
                "&#x21d2;",
                "&#x21d3;",
                "&#x21d4;",
                "&#x21d5;",
                "&#x21da;",
                "&#x21db;",
                "&#x21dd;",
                "&#x21ab;",
                "&#x21ac;",
                "&#x21ad;",
                "&#x21ae;",
                "&#x2190;",
                "&#x2191;",
                "&#x2192;",
                "&#x2193;",
                "&#x2194;",
                "&#x2195;",
                "&#x2196;",
                "&#x2197;",
                "&#x2198;",
                "&#x2199;",
                "&#x219e;",
                "&#x21a0;",
                "&#x21a2;",
                "&#x21a3;",
                "&#x21b0;",
                "&#x21b1;",
                "&#x22a2;",
                "&#x22a3;",
                "&#x22a8;",
                "&#x22a9;",
                "&#x22aa;",
                "&#x22ad;",
                "&#x22af;",
                "&#x22b8;",
                "&#x22ba;",
                "&#x22d4;",
                "&#x22ea;",
                "&#x22eb;",
                "&#x22ec;",
                "&#x22ed;",
                "&#x2308;",
                "&#x2309;",
                "&#x230a;",
                "&#x230b;",
                "&#x2acb;",
                "&#x2acc;",
                "&#x2ac5;",
                "&#x2ac6;",
                "&#x2208;",
                "&#x220b;",
                "&#x221d;",
                "&#x2224;",
                "&#x2226;",
                "&#x2234;",
                "&#x2235;",
                "&#x220d;",
                "&#x22c8;",
                "&#x2322;",
                "&#x2323;",
                "&#x2223;",
                "&#x2225;",
                "&#x23d0;",
                "&#x23d1;",
                "&#x23d2;",
                "&#x23d3;",
                "&#x2ac7;",
                "&#x2ac8;",
                "&#x22ae;",
                "&#x22ac;",
                "&#x2ac9;",
                "&#x23d4;",
                "&#x23d5;",
                "&#x23d6;",
                "&#x23d7;",
                "&#x21c7;",
                "&#x21c9;",
                "&#x21bc;",
                "&#x21bd;",
                "&#x21c0;",
                "&#x21c1;",
                "&#x219a;",
                "&#x219b;",
                "&#x27f5;",
                "&#x27f6;",
                "&#x27f7;",
                "&#x27f9;",
                "&#x27f8;",
                "&#x27fa;",
                "&#x2262;",
                "&#x2260;",
                "&#x2209;"
            ];
        }
    };

    /*!
     * 字符配置
     */
    _p[3] = {
        value: function () {
            return {
                // 默认字体
                defaultFont: "KF AMS MAIN"
            };
        }
    };

    /*!
     * 工厂方法，创建兼容各浏览器的text实现
     */
    _p[4] = {
        value: function (require) {
            var kity = _p.r(34),
                divNode = document.createElement("div"),
                NAMESPACE = "http://www.w3.org/XML/1998/namespace";
            function createText(content) {
                var text = new kity.Text();
                // Non-IE
                if ("innerHTML" in text.node) {
                    text.node.setAttributeNS(
                        NAMESPACE,
                        "xml:space",
                        "preserve"
                    );
                } else {
                    if (content.indexOf(" ") != -1) {
                        content = convertContent(content);
                    }
                }
                text.setContent(content);
                return text;
            }
            /**
             * 构建节点来转换内容
             */
            function convertContent(content) {
                divNode.innerHTML =
                    '<svg><text gg="asfdas">' +
                    content.replace(/\s/gi, "&nbsp;") +
                    "</text></svg>";
                return divNode.firstChild.firstChild.textContent;
            }
            return {
                create: function (content) {
                    return createText(content);
                }
            };
        }
    };

    /**
     * 文本
     */
    _p[5] = {
        value: function (require) {
            var kity = _p.r(34),
                FONT_CONF = _p.r(47).font,
                FontManager = _p.r(25),
                TextFactory = _p.r(4);
            return kity.createClass("Text", {
                base: _p.r(46),
                constructor: function (content, fontFamily) {
                    this.callBase();
                    this.fontFamily = fontFamily;
                    this.fontSize = 50;
                    this.content = content || "";
                    // 移除多余的节点
                    this.box.remove();
                    this.translationContent = this.translation(this.content);
                    this.contentShape = new kity.Group();
                    this.contentNode = this.createContent();
                    this.contentShape.addShape(this.contentNode);
                    this.addShape(this.contentShape);
                },
                createContent: function () {
                    var contentNode = TextFactory.create(
                        this.translationContent
                    );
                    contentNode.setAttr({
                        "font-family": this.fontFamily,
                        "font-size": 50,
                        x: 0,
                        y: FONT_CONF.offset
                    });
                    return contentNode;
                },
                setFamily: function (fontFamily) {
                    this.fontFamily = fontFamily;
                    this.contentNode.setAttr("font-family", fontFamily);
                    this.contentNode.setAttr("data-not-default-font", true);
                },
                setFontSize: function (fontSize) {
                    this.fontSize = fontSize;
                    this.contentNode.setAttr("font-size", fontSize + "px");
                    this.contentNode.setAttr(
                        "y",
                        (fontSize / 50) * FONT_CONF.offset
                    );
                },
                getBaseHeight: function () {
                    var chars = this.contentShape.getItems(),
                        currentChar = null,
                        index = 0,
                        height = 0;
                    while ((currentChar = chars[index])) {
                        height = Math.max(height, currentChar.getHeight());
                        index++;
                    }
                    return height;
                },
                translation: function (content) {
                    var fontFamily = this.fontFamily;
                    // 首先特殊处理掉两个相连的"`"符号
                    return content
                        .replace(/``/g, "“")
                        .replace(/\\([a-zA-Z,]+)\\/g, function (match, input) {
                            if (input === ",") {
                                return " ";
                            }
                            var data = FontManager.getCharacterValue(
                                input,
                                fontFamily
                            );
                            if (!data) {
                                return "";
                            }
                            return data;
                        });
                }
            });
        }
    };

    /**
     * 定义公式中各种对象的类型
     */
    _p[6] = {
        value: function () {
            return {
                UNKNOWN: -1,
                EXP: 0,
                COMPOUND_EXP: 1,
                OP: 2
            };
        }
    };

    /**
     * 定义公式中上下标的类型
     */
    _p[7] = {
        value: function () {
            return {
                SIDE: "side",
                FOLLOW: "follow"
            };
        }
    };

    /**
     * 下标表达式
     */
    _p[8] = {
        value: function (require) {
            var kity = _p.r(34);
            return kity.createClass("SubscriptExpression", {
                base: _p.r(17),
                constructor: function (operand, subscript) {
                    this.callBase(operand, null, subscript);
                    this.setFlag("Subscript");
                }
            });
        }
    };

    /**
     * 上标表达式
     */
    _p[9] = {
        value: function (require) {
            var kity = _p.r(34);
            return kity.createClass("SuperscriptExpression", {
                base: _p.r(17),
                constructor: function (operand, superscript) {
                    this.callBase(operand, superscript, null);
                    this.setFlag("Superscript");
                }
            });
        }
    };

    /**
     * 二元操作表达式
     */
    _p[10] = {
        value: function (require) {
            var kity = _p.r(34);
            return kity.createClass("BinaryExpression", {
                base: _p.r(19),
                constructor: function (firstOperand, lastOperand) {
                    this.callBase();
                    this.setFirstOperand(firstOperand);
                    this.setLastOperand(lastOperand);
                },
                setFirstOperand: function (operand) {
                    return this.setOperand(operand, 0);
                },
                getFirstOperand: function () {
                    return this.getOperand(0);
                },
                setLastOperand: function (operand) {
                    return this.setOperand(operand, 1);
                },
                getLastOperand: function () {
                    return this.getOperand(1);
                }
            });
        }
    };

    /**
     * 自动增长括号表达式
     */
    _p[11] = {
        value: function (require) {
            var kity = _p.r(34),
                BracketsOperator = _p.r(35);
            return kity.createClass("BracketsExpression", {
                base: _p.r(19),
                /**
                 * 构造函数调用方式：
                 *  new Constructor( 左括号, 右括号, 表达式 )
                 *  或者
                 *  new Constructor( 括号, 表达式 ), 该构造函数转换成上面的构造函数，是： new Constructor( 括号, 括号, 表达式 )
                 * @param left 左括号
                 * @param right 右括号
                 * @param exp 表达式
                 */
                constructor: function (left, right, exp) {
                    this.callBase();
                    this.setFlag("Brackets");
                    // 参数整理
                    if (arguments.length === 2) {
                        exp = right;
                        right = left;
                    }
                    this.leftSymbol = left;
                    this.rightSymbol = right;
                    this.setOperator(new BracketsOperator());
                    this.setOperand(exp, 0);
                },
                getLeftSymbol: function () {
                    return this.leftSymbol;
                },
                getRightSymbol: function () {
                    return this.rightSymbol;
                }
            });
        }
    };

    /**
     * 组合表达式
     * 可以组合多个表达式
     */
    _p[12] = {
        value: function (require) {
            var kity = _p.r(34),
                FONT_CONF = _p.r(47).font,
                CombinationOperator = _p.r(36);
            return kity.createClass("CombinationExpression", {
                base: _p.r(19),
                constructor: function () {
                    this.callBase();
                    this.setFlag("Combination");
                    this.setOperator(new CombinationOperator());
                    kity.Utils.each(
                        arguments,
                        function (operand, index) {
                            this.setOperand(operand, index);
                        },
                        this
                    );
                },
                getRenderBox: function (refer) {
                    var rectBox = this.callBase(refer);
                    if (this.getOperands().length === 0) {
                        rectBox.height = FONT_CONF.spaceHeight;
                    }
                    return rectBox;
                },
                getBaseline: function (refer) {
                    var maxBaseline = 0,
                        operands = this.getOperands();
                    if (operands.length === 0) {
                        return this.callBase(refer);
                    }
                    kity.Utils.each(operands, function (operand) {
                        maxBaseline = Math.max(
                            operand.getBaseline(refer),
                            maxBaseline
                        );
                    });
                    return maxBaseline;
                },
                getMeanline: function (refer) {
                    var minMeanline = 1e7,
                        operands = this.getOperands();
                    if (operands.length === 0) {
                        return this.callBase(refer);
                    }
                    kity.Utils.each(operands, function (operand) {
                        minMeanline = Math.min(
                            operand.getMeanline(refer),
                            minMeanline
                        );
                    });
                    return minMeanline;
                }
            });
        }
    };

    /**
     * 分数表达式
     */
    _p[13] = {
        value: function (require) {
            var kity = _p.r(34),
                FractionOperator = _p.r(38);
            return kity.createClass("FractionExpression", {
                base: _p.r(10),
                constructor: function (upOperand, downOperand) {
                    this.callBase(upOperand, downOperand);
                    this.setFlag("Fraction");
                    this.setOperator(new FractionOperator());
                },
                /*------- 重写分数结构的baseline和mealine计算方式 */
                getBaseline: function (refer) {
                    var downOperand = this.getOperand(1),
                        rectBox = downOperand.getRenderBox(refer);
                    return (
                        rectBox.y +
                        downOperand.getBaselineProportion() * rectBox.height
                    );
                },
                getMeanline: function (refer) {
                    var upOperand = this.getOperand(0),
                        rectBox = upOperand.getRenderBox(refer);
                    return upOperand.getMeanlineProportion() * rectBox.height;
                }
            });
        }
    };

    /**
     * 函数表达式
     */
    _p[14] = {
        value: function (require) {
            var kity = _p.r(34),
                FUNC_CONF = _p.r(47).func,
                FunctionOperator = _p.r(39);
            return kity.createClass("FunctionExpression", {
                base: _p.r(19),
                /**
                 * function表达式构造函数
                 * @param funcName function名称
                 * @param expr 函数表达式
                 * @param sup 上标
                 * @param sub 下标
                 */
                constructor: function (funcName, expr, sup, sub) {
                    this.callBase();
                    this.setFlag("Func");
                    this.funcName = funcName;
                    this.setOperator(new FunctionOperator(funcName));
                    this.setExpr(expr);
                    this.setSuperscript(sup);
                    this.setSubscript(sub);
                },
                // 当前函数应用的script位置是否是在侧面
                isSideScript: function () {
                    return !FUNC_CONF["ud-script"][this.funcName];
                },
                setExpr: function (expr) {
                    return this.setOperand(expr, 0);
                },
                setSuperscript: function (sub) {
                    return this.setOperand(sub, 1);
                },
                setSubscript: function (sub) {
                    return this.setOperand(sub, 2);
                }
            });
        }
    };

    /**
     * 积分表达式
     */
    _p[15] = {
        value: function (require) {
            var kity = _p.r(34),
                IntegrationOperator = _p.r(40),
                IntegrationExpression = kity.createClass(
                    "IntegrationExpression",
                    {
                        base: _p.r(19),
                        /**
                         * 构造积分表达式
                         * @param integrand 被积函数
                         * @param supOperand 上限
                         * @param subOperand 下限
                         */
                        constructor: function (
                            integrand,
                            superscript,
                            subscript
                        ) {
                            this.callBase();
                            this.setFlag("Integration");
                            this.setOperator(new IntegrationOperator());
                            this.setIntegrand(integrand);
                            this.setSuperscript(superscript);
                            this.setSubscript(subscript);
                        },
                        setType: function (type) {
                            this.getOperator().setType(type);
                            return this;
                        },
                        resetType: function () {
                            this.getOperator().resetType();
                            return this;
                        },
                        setIntegrand: function (integrand) {
                            this.setOperand(integrand, 0);
                        },
                        setSuperscript: function (sup) {
                            this.setOperand(sup, 1);
                        },
                        setSubscript: function (sub) {
                            this.setOperand(sub, 2);
                        }
                    }
                );
            return IntegrationExpression;
        }
    };

    /**
     * 方根表达式
     */
    _p[16] = {
        value: function (require) {
            var kity = _p.r(34),
                RadicalOperator = _p.r(42);
            return kity.createClass("RadicalExpression", {
                base: _p.r(10),
                /**
                 * 构造开方表达式
                 * @param radicand 被开方数
                 * @param exponent 指数
                 */
                constructor: function (radicand, exponent) {
                    this.callBase(radicand, exponent);
                    this.setFlag("Radicand");
                    this.setOperator(new RadicalOperator());
                },
                setRadicand: function (operand) {
                    return this.setFirstOperand(operand);
                },
                getRadicand: function () {
                    return this.getFirstOperand();
                },
                setExponent: function (operand) {
                    return this.setLastOperand(operand);
                },
                getExponent: function () {
                    return this.getLastOperand();
                }
            });
        }
    };

    /**
     * 上标表达式
     */
    _p[17] = {
        value: function (require) {
            var kity = _p.r(34),
                ScriptOperator = _p.r(43);
            return kity.createClass("ScriptExpression", {
                base: _p.r(19),
                constructor: function (operand, superscript, subscript) {
                    this.callBase();
                    this.setFlag("Script");
                    this.setOperator(new ScriptOperator());
                    this.setOpd(operand);
                    this.setSuperscript(superscript);
                    this.setSubscript(subscript);
                },
                setOpd: function (operand) {
                    this.setOperand(operand, 0);
                },
                setSuperscript: function (sup) {
                    this.setOperand(sup, 1);
                },
                setSubscript: function (sub) {
                    this.setOperand(sub, 2);
                }
            });
        }
    };

    /**
     * 求和表达式
     */
    _p[18] = {
        value: function (require) {
            var kity = _p.r(34),
                SummationOperator = _p.r(44);
            return kity.createClass("SummationExpression", {
                base: _p.r(19),
                /**
                 * 构造求和表达式
                 * @param expr 求和表达式
                 * @param upOperand 上标
                 * @param downOperand 下标
                 */
                constructor: function (expr, superscript, subscript) {
                    this.callBase();
                    this.setFlag("Summation");
                    this.setOperator(new SummationOperator());
                    this.setExpr(expr);
                    this.setSuperscript(superscript);
                    this.setSubscript(subscript);
                },
                setExpr: function (expr) {
                    this.setOperand(expr, 0);
                },
                setSuperscript: function (sup) {
                    this.setOperand(sup, 1);
                },
                setSubscript: function (sub) {
                    this.setOperand(sub, 2);
                }
            });
        }
    };

    /**
     * 复合表达式
     * @abstract
     */
    _p[19] = {
        value: function (require) {
            var kity = _p.r(34),
                GTYPE = _p.r(6),
                Expression = _p.r(21);
            return kity.createClass("CompoundExpression", {
                base: _p.r(21),
                constructor: function () {
                    this.callBase();
                    this.type = GTYPE.COMPOUND_EXP;
                    this.operands = [];
                    this.operator = null;
                    this.operatorBox = new kity.Group();
                    this.operatorBox.setAttr(
                        "data-type",
                        "kf-editor-exp-op-box"
                    );
                    this.operandBox = new kity.Group();
                    this.operandBox.setAttr(
                        "data-type",
                        "kf-editor-exp-operand-box"
                    );
                    this.setChildren(0, this.operatorBox);
                    this.setChildren(1, this.operandBox);
                },
                // 操作符存储在第1位置
                setOperator: function (operator) {
                    if (operator === undefined) {
                        return this;
                    }
                    if (this.operator) {
                        this.operator.remove();
                    }
                    this.operatorBox.addShape(operator);
                    this.operator = operator;
                    this.operator.setParentExpression(this);
                    // 表达式关联到操作符
                    operator.expression = this;
                    return this;
                },
                getOperator: function () {
                    return this.operator;
                },
                // 操作数存储位置是从1开始
                setOperand: function (operand, index, isWrap) {
                    // 不包装操作数
                    if (isWrap === false) {
                        this.operands[index] = operand;
                        return this;
                    }
                    operand = Expression.wrap(operand);
                    if (this.operands[index]) {
                        this.operands[index].remove();
                    }
                    this.operands[index] = operand;
                    this.operandBox.addShape(operand);
                    return this;
                },
                getOperand: function (index) {
                    return this.operands[index];
                },
                getOperands: function () {
                    return this.operands;
                },
                addedCall: function () {
                    this.operator.applyOperand.apply(
                        this.operator,
                        this.operands
                    );
                    return this;
                }
            });
        }
    };

    /**
     * 空表达式
     * 该表达式主要用途是用于站位
     */
    _p[20] = {
        value: function (require) {
            var kity = _p.r(34),
                FONT_CONF = _p.r(47).font,
                Expression = _p.r(21),
                EmptyExpression = kity.createClass("EmptyExpression", {
                    base: Expression,
                    constructor: function () {
                        this.callBase();
                        this.setFlag("Empty");
                    },
                    getRenderBox: function () {
                        return {
                            width: 0,
                            height: FONT_CONF.spaceHeight,
                            x: 0,
                            y: 0
                        };
                    }
                });
            EmptyExpression.isEmpty = function (target) {
                return target instanceof EmptyExpression;
            };
            // 注册打包函数
            Expression.registerWrap("empty", function (operand) {
                if (operand === null || operand === undefined) {
                    return new EmptyExpression();
                }
            });
            return EmptyExpression;
        }
    };

    /**
     * 基础表达式， 该类是表达式和操作数的高层抽象
     * @abstract
     */
    _p[21] = {
        value: function (require) {
            var kity = _p.r(34),
                GTYPE = _p.r(6),
                FONT_CONF = _p.r(47).font, // 打包函数列表
                WRAP_FN = [], // 注册的打包函数的名称与其在注册器列表中的索引之间的对应关系
                WRAP_FN_INDEX = {},
                Expression = kity.createClass("Expression", {
                    base: _p.r(46),
                    constructor: function () {
                        this.callBase();
                        this.type = GTYPE.EXP;
                        // 表达式的上下偏移
                        this._offset = {
                            top: 0,
                            bottom: 0
                        };
                        this.children = [];
                        this.box
                            .fill("transparent")
                            .setAttr("data-type", "kf-editor-exp-box");
                        this.box.setAttr("data-type", "kf-editor-exp-bg-box");
                        this.expContent = new kity.Group();
                        this.expContent.setAttr(
                            "data-type",
                            "kf-editor-exp-content-box"
                        );
                        this.addShape(this.expContent);
                    },
                    getChildren: function () {
                        return this.children;
                    },
                    getChild: function (index) {
                        return this.children[index] || null;
                    },
                    getTopOffset: function () {
                        return this._offset.top;
                    },
                    getBottomOffset: function () {
                        return this._offset.bottom;
                    },
                    getOffset: function () {
                        return this._offset;
                    },
                    setTopOffset: function (val) {
                        this._offset.top = val;
                    },
                    setBottomOffset: function (val) {
                        this._offset.bottom = val;
                    },
                    setOffset: function (top, bottom) {
                        this._offset.top = top;
                        this._offset.bottom = bottom;
                    },
                    setFlag: function (flag) {
                        this.setAttr("data-flag", flag || "Expression");
                    },
                    setChildren: function (index, exp) {
                        // 首先清理掉之前的表达式
                        if (this.children[index]) {
                            this.children[index].remove();
                        }
                        this.children[index] = exp;
                        this.expContent.addShape(exp);
                    },
                    getBaselineProportion: function () {
                        return FONT_CONF.baselinePosition;
                    },
                    getMeanlineProportion: function () {
                        return FONT_CONF.meanlinePosition;
                    },
                    getBaseline: function (refer) {
                        // 上偏移3px
                        return (
                            this.getRenderBox(refer).height *
                                FONT_CONF.baselinePosition -
                            3
                        );
                    },
                    getMeanline: function (refer) {
                        // 上偏移1px
                        return (
                            this.getRenderBox(refer).height *
                                FONT_CONF.meanlinePosition -
                            1
                        );
                    },
                    getAscenderline: function () {
                        return (
                            this.getFixRenderBox().height *
                            FONT_CONF.ascenderPosition
                        );
                    },
                    getDescenderline: function () {
                        return (
                            this.getFixRenderBox().height *
                            FONT_CONF.descenderPosition
                        );
                    },
                    translateElement: function (x, y) {
                        this.expContent.translate(x, y);
                    },
                    expand: function (width, height) {
                        var renderBox = this.getFixRenderBox();
                        this.setBoxSize(
                            renderBox.width + width,
                            renderBox.height + height
                        );
                    },
                    getBaseWidth: function () {
                        return this.getWidth();
                    },
                    getBaseHeight: function () {
                        return this.getHeight();
                    },
                    updateBoxSize: function () {
                        var renderBox = this.expContent.getFixRenderBox();
                        this.setBoxSize(renderBox.width, renderBox.height);
                    },
                    getBox: function () {
                        return this.box;
                    }
                });
            // 表达式自动打包
            kity.Utils.extend(Expression, {
                registerWrap: function (name, fn) {
                    WRAP_FN_INDEX[name] = WRAP_FN.length;
                    WRAP_FN.push(fn);
                },
                revokeWrap: function (name) {
                    var fn = null;
                    if (name in WRAP_FN_INDEX) {
                        fn = WRAP_FN[WRAP_FN_INDEX[name]];
                        WRAP_FN[WRAP_FN_INDEX[name]] = null;
                        delete WRAP_FN_INDEX[name];
                    }
                    return fn;
                },
                // 打包函数
                wrap: function (operand) {
                    var result;
                    kity.Utils.each(WRAP_FN, function (fn) {
                        if (!fn) {
                            return;
                        }
                        result = fn(operand);
                        if (result) {
                            return false;
                        }
                    });
                    return result;
                }
            });
            return Expression;
        }
    };

    /**
     * Text表达式
     */
    _p[22] = {
        value: function (require) {
            var Text = _p.r(5),
                kity = _p.r(34),
                FONT_CONF = _p.r(3),
                Expression = _p.r(21),
                TextExpression = kity.createClass("TextExpression", {
                    base: _p.r(21),
                    constructor: function (content, fontFamily) {
                        this.callBase();
                        this.fontFamily = fontFamily || FONT_CONF.defaultFont;
                        this.setFlag("Text");
                        this.content = content + "";
                        this.textContent = new Text(
                            this.content,
                            this.fontFamily
                        );
                        this.setChildren(0, this.textContent);
                        this.setChildren(
                            1,
                            new kity.Rect(0, 0, 0, 0).fill("transparent")
                        );
                    },
                    setFamily: function (fontFamily) {
                        this.textContent.setFamily(fontFamily);
                    },
                    setFontSize: function (fontSize) {
                        this.textContent.setFontSize(fontSize);
                    },
                    addedCall: function () {
                        var box = this.textContent.getFixRenderBox();
                        this.getChild(1).setSize(box.width, box.height);
                        this.updateBoxSize();
                        return this;
                    }
                });
            // 注册文本表达式的打包函数
            Expression.registerWrap("text", function (operand) {
                var operandType = typeof operand;
                if (operandType === "number" || operandType === "string") {
                    operand = new TextExpression(operand);
                }
                return operand;
            });
            return TextExpression;
        }
    };

    /*!
     * 字体信息检测模板，用于检测浏览器的字体信息
     */
    _p[23] = {
        value: function () {
            return [
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
                '<text id="abcd" font-family="KF AMS MAIN" font-size="50" x="0" y="0">x</text>',
                "</svg>"
            ];
        }
    };

    /*!
     * 字体安装器
     */
    _p[24] = {
        value: function (require) {
            var kity = _p.r(34),
                FontManager = _p.r(25),
                $ = _p.r(33),
                FONT_CONF = _p.r(47).font,
                CHAR_LIST = _p.r(2),
                NODE_LIST = [];
            return kity.createClass("FontInstaller", {
                constructor: function (doc, resource) {
                    this.callBase();
                    this.resource = resource || "../src/resource/";
                    this.doc = doc;
                },
                // 挂载字体
                mount: function (callback) {
                    var fontList = FontManager.getFontList(),
                        count = 0,
                        _self = this;
                    kity.Utils.each(fontList, function (fontInfo) {
                        count++;
                        // todo 字体嵌入 防止字体丢失
                        // fontInfo.meta.src = _self.resource + fontInfo.meta.src;
                        console.log("字体嵌入 防止字体丢失", fontInfo.meta);
                        _self.createFontStyle(fontInfo);
                        preload(_self.doc, fontInfo, function () {
                            count--;
                            if (count === 0) {
                                complete(_self.doc, callback);
                            }
                        });
                    });
                },
                createFontStyle: function (fontInfo) {
                    var stylesheet = this.doc.createElement("style"),
                        tpl =
                            '@font-face{\nfont-family: "${fontFamily}";\nsrc: url("${src}");\n}';
                    stylesheet.setAttribute("type", "text/css");
                    stylesheet.innerHTML = tpl
                        .replace("${fontFamily}", fontInfo.meta.fontFamily)
                        .replace("${src}", fontInfo.meta.src);
                    this.doc.head.appendChild(stylesheet);
                }
            });
            function preload(doc, fontInfo, callback) {
                $.get(fontInfo.meta.src, function (data, state) {
                    if (state === "success") {
                        applyFonts(doc, fontInfo);
                    }
                    callback();
                });
            }
            function complete(doc, callback) {
                window.setTimeout(function () {
                    initFontSystemInfo(doc);
                    removeTmpNode();
                    callback();
                }, 100);
            }
            function applyFonts(doc, fontInfo) {
                var node = document.createElement("div"),
                    fontFamily = fontInfo.meta.fontFamily;
                node.style.cssText =
                    "position: absolute; top: -10000px; left: -100000px;";
                node.style.fontFamily = fontFamily;
                node.innerHTML = CHAR_LIST.join("");
                doc.body.appendChild(node);
                NODE_LIST.push(node);
            }
            /**
             * 计算字体系统信息
             */
            function initFontSystemInfo(doc) {
                var tmpNode = doc.createElement("div");
                tmpNode.style.cssText =
                    "position: absolute; top: 0; left: -100000px;";
                tmpNode.innerHTML = _p.r(23).join("");
                doc.body.appendChild(tmpNode);
                var rectBox = tmpNode.getElementsByTagName("text")[0].getBBox();
                // text实际占用空间
                FONT_CONF.spaceHeight = rectBox.height;
                // text顶部空间
                FONT_CONF.topSpace = -rectBox.y - FONT_CONF.baseline;
                FONT_CONF.bottomSpace =
                    FONT_CONF.spaceHeight -
                    FONT_CONF.topSpace -
                    FONT_CONF.baseHeight;
                // text偏移值
                FONT_CONF.offset = FONT_CONF.baseline + FONT_CONF.topSpace;
                // baseline比例
                FONT_CONF.baselinePosition =
                    (FONT_CONF.topSpace + FONT_CONF.baseline) /
                    FONT_CONF.spaceHeight;
                // meanline比例
                FONT_CONF.meanlinePosition =
                    (FONT_CONF.topSpace + FONT_CONF.meanline) /
                    FONT_CONF.spaceHeight;
                // 上下延伸性比例
                FONT_CONF.ascenderPosition =
                    FONT_CONF.topSpace / FONT_CONF.spaceHeight;
                FONT_CONF.descenderPosition =
                    (FONT_CONF.topSpace + FONT_CONF.baseHeight) /
                    FONT_CONF.spaceHeight;
                doc.body.removeChild(tmpNode);
            }
            function removeTmpNode() {
                kity.Utils.each(NODE_LIST, function (node) {
                    node.parentNode.removeChild(node);
                });
                NODE_LIST = [];
            }
        }
    };

    /*!
     * 字体管理器
     */
    _p[25] = {
        value: function (require) {
            var FONT_LIST = {},
                kity = _p.r(34),
                CONF = _p.r(47).font.list;
            // init
            (function () {
                kity.Utils.each(CONF, function (fontData) {
                    FONT_LIST[fontData.meta.fontFamily] = fontData;
                });
            })();
            return {
                getFontList: function () {
                    return FONT_LIST;
                },
                getCharacterValue: function (key, fontFamily) {
                    if (!FONT_LIST[fontFamily]) {
                        return null;
                    }
                    return FONT_LIST[fontFamily].map[key] || null;
                }
            };
        }
    };

    /*!
     * 双线字体
     */
    _p[26] = {
        value: function () {
            return {
                meta: {
                    fontFamily: "KF AMS BB",
                    // src: "KF_AMS_BB.woff"
                    src: "data:font/woff2;base64,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"
                }
            };
        }
    };

    /*!
     * 手写体
     */
    _p[27] = {
        value: function () {
            return {
                meta: {
                    fontFamily: "KF AMS CAL",
                    // src: "KF_AMS_CAL.woff"
                    src: "data:font/woff2;base64,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"
                }
            };
        }
    };

    /*!
     * 花体
     */
    _p[28] = {
        value: function () {
            return {
                meta: {
                    fontFamily: "KF AMS FRAK",
                    // src: "KF_AMS_FRAK.woff"
                    src: "data:font/woff2;base64,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"
                }
            };
        }
    };

    /*!
     * 字体主文件
     */
    _p[29] = {
        value: function () {
            return {
                meta: {
                    fontFamily: "KF AMS MAIN",
                    // src: "KF_AMS_MAIN.woff"
                    src: "data:font/woff2;base64,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"
                },
                map: {
                    // char
                    Alpha: "Α",
                    Beta: "Β",
                    Gamma: "Γ",
                    Delta: "Δ",
                    Epsilon: "Ε",
                    Zeta: "Ζ",
                    Eta: "Η",
                    Theta: "Θ",
                    Iota: "Ι",
                    Kappa: "Κ",
                    Lambda: "Λ",
                    Mu: "Μ",
                    Nu: "Ν",
                    Xi: "Ξ",
                    Omicron: "Ο",
                    Pi: "Π",
                    Rho: "Ρ",
                    Sigma: "Σ",
                    Tau: "Τ",
                    Upsilon: "Υ",
                    Phi: "Φ",
                    Chi: "Χ",
                    Psi: "Ψ",
                    Omega: "Ω",
                    alpha: "α",
                    beta: "β",
                    gamma: "γ",
                    delta: "δ",
                    epsilon: "ε",
                    zeta: "ζ",
                    eta: "η",
                    theta: "θ",
                    iota: "ι",
                    kappa: "κ",
                    lambda: "λ",
                    mu: "μ",
                    nu: "ν",
                    xi: "ξ",
                    omicron: "ο",
                    pi: "π",
                    rho: "ρ",
                    sigma: "σ",
                    tau: "τ",
                    upsilon: "υ",
                    phi: "φ",
                    varkappa: "ϰ",
                    chi: "χ",
                    psi: "ψ",
                    omega: "ω",
                    digamma: "Ϝ",
                    varepsilon: "ϵ",
                    varrho: "ϱ",
                    varphi: "ϕ",
                    vartheta: "ϑ",
                    varpi: "ϖ",
                    varsigma: "Ϲ",
                    aleph: "ℵ",
                    beth: "ℶ",
                    daleth: "ℸ",
                    gimel: "ℷ",
                    eth: "ð",
                    hbar: "ℎ",
                    hslash: "ℏ",
                    mho: "℧",
                    partial: "∂",
                    wp: "℘",
                    Game: "⅁",
                    Bbbk: "⅌",
                    Finv: "Ⅎ",
                    Im: "ℑ",
                    Re: "ℜ",
                    complement: "∁",
                    ell: "ℓ",
                    circledS: "Ⓢ",
                    imath: "ı",
                    jmath: "ȷ",
                    // symbol
                    doublecap: "⋒",
                    Cap: "⋒",
                    doublecup: "⋓",
                    Cup: "⋓",
                    ast: "*",
                    divideontimes: "⋇",
                    rightthreetimes: "⋌",
                    leftthreetimes: "⋋",
                    cdot: "·",
                    odot: "⊙",
                    dotplus: "∔",
                    rtimes: "⋊",
                    ltimes: "⋉",
                    centerdot: "▪",
                    doublebarwedge: "⌭",
                    setminus: "⒁",
                    amalg: "∐",
                    circ: "◦",
                    bigcirc: "◯",
                    gtrdot: "⋗",
                    lessdot: "⋖",
                    smallsetminus: "⒅",
                    circledast: "⊛",
                    circledcirc: "⊚",
                    sqcap: "⊓",
                    sqcup: "⊔",
                    barwedge: "⊼",
                    circleddash: "⊝",
                    star: "⋆",
                    bigtriangledown: "▽",
                    bigtriangleup: "△",
                    cup: "∪",
                    cap: "∩",
                    times: "×",
                    mp: "∓",
                    pm: "±",
                    triangleleft: "⊲",
                    triangleright: "⊳",
                    boxdot: "⊡",
                    curlyvee: "⋏",
                    curlywedge: "⋎",
                    boxminus: "⊟",
                    boxtimes: "⊠",
                    ominus: "⊖",
                    oplus: "⊕",
                    oslash: "⊘",
                    otimes: "⊗",
                    uplus: "⊎",
                    boxplus: "⊞",
                    dagger: "†",
                    ddagger: "‡",
                    vee: "∨",
                    lor: "∨",
                    veebar: "⊻",
                    bullet: "•",
                    diamond: "⋄",
                    wedge: "∧",
                    land: "∧",
                    div: "÷",
                    wr: "≀",
                    geqq: "≧",
                    lll: "⋘",
                    llless: "⋘",
                    ggg: "⋙",
                    gggtr: "⋙",
                    preccurlyeq: "≼",
                    geqslant: "⩾",
                    lnapprox: "⪉",
                    preceq: "⪯",
                    gg: "≫",
                    lneq: "⪇",
                    precnapprox: "⪹",
                    approx: "≈",
                    lneqq: "≨",
                    precneqq: "⪵",
                    approxeq: "≊",
                    gnapprox: "⪊",
                    lnsim: "⋦",
                    precnsim: "⋨",
                    asymp: "≍",
                    gneq: "⪈",
                    lvertneqq: "⌮",
                    precsim: "≾",
                    backsim: "∽",
                    gneqq: "≩",
                    ncong: "≇",
                    risingdotseq: "≓",
                    backsimeq: "⋍",
                    gnsim: "⋧",
                    sim: "∼",
                    simeq: "≃",
                    bumpeq: "≏",
                    gtrapprox: "⪆",
                    ngeq: "≱",
                    Bumpeq: "≎",
                    gtreqless: "⋛",
                    ngeqq: "⌱",
                    succ: "≻",
                    circeq: "≗",
                    gtreqqless: "⪌",
                    ngeqslant: "⌳",
                    succapprox: "⪸",
                    cong: "≅",
                    gtrless: "≷",
                    ngtr: "≯",
                    succcurlyeq: "≽",
                    curlyeqprec: "⋞",
                    gtrsim: "≳",
                    nleq: "≰",
                    succeq: "⪰",
                    curlyeqsucc: "⋟",
                    gvertneqq: "⌯",
                    neq: "≠",
                    ne: "≠",
                    nequiv: "≢",
                    nleqq: "⌰",
                    succnapprox: "⪺",
                    doteq: "≐",
                    leq: "≤",
                    le: "≤",
                    nleqslant: "⌲",
                    succneqq: "⪶",
                    doteqdot: "≑",
                    Doteq: "≑",
                    leqq: "≦",
                    nless: "≮",
                    succnsim: "⋩",
                    leqslant: "⩽",
                    nprec: "⊀",
                    succsim: "≿",
                    eqsim: "≂",
                    lessapprox: "⪅",
                    npreceq: "⋠",
                    eqslantgtr: "⪖",
                    lesseqgtr: "⋚",
                    nsim: "≁",
                    eqslantless: "⪕",
                    lesseqqgtr: "⪋",
                    nsucc: "⊁",
                    triangleq: "≜",
                    eqcirc: "≖",
                    equiv: "≡",
                    lessgtr: "≶",
                    nsucceq: "⋡",
                    fallingdotseq: "≒",
                    lesssim: "≲",
                    prec: "≺",
                    geq: "≥",
                    ge: "≥",
                    ll: "≪",
                    precapprox: "⪷",
                    // arrows
                    uparrow: "↑",
                    downarrow: "↓",
                    updownarrow: "↕",
                    Uparrow: "⇑",
                    Downarrow: "⇓",
                    Updownarrow: "⇕",
                    circlearrowleft: "↺",
                    circlearrowright: "↻",
                    curvearrowleft: "↶",
                    curvearrowright: "↷",
                    downdownarrows: "⇊",
                    downharpoonleft: "⇃",
                    downharpoonright: "⇂",
                    leftarrow: "←",
                    gets: "←",
                    Leftarrow: "⇐",
                    leftarrowtail: "↢",
                    leftharpoondown: "↽",
                    leftharpoonup: "↼",
                    leftleftarrows: "⇇",
                    leftrightarrow: "↔",
                    Leftrightarrow: "⇔",
                    leftrightarrows: "⇄",
                    leftrightharpoons: "⇋",
                    leftrightsquigarrow: "↭",
                    Lleftarrow: "⇚",
                    looparrowleft: "↫",
                    looparrowright: "↬",
                    multimap: "⊸",
                    nLeftarrow: "⇍",
                    nRightarrow: "⇏",
                    nLeftrightarrow: "⇎",
                    nearrow: "↗",
                    nleftarrow: "↚",
                    nleftrightarrow: "↮",
                    nrightarrow: "↛",
                    nwarrow: "↖",
                    rightarrow: "→",
                    to: "→",
                    Rightarrow: "⇒",
                    rightarrowtail: "↣",
                    rightharpoondown: "⇁",
                    rightharpoonup: "⇀",
                    rightleftarrows: "⇆",
                    rightleftharpoons: "⇌",
                    rightrightarrows: "⇉",
                    rightsquigarrow: "⇝",
                    Rrightarrow: "⇛",
                    searrow: "↘",
                    swarrow: "↙",
                    twoheadleftarrow: "↞",
                    twoheadrightarrow: "↠",
                    upharpoonleft: "↿",
                    upharpoonright: "↾",
                    restriction: "↾",
                    upuparrows: "⇈",
                    Lsh: "↰",
                    Rsh: "↱",
                    longleftarrow: "⟵",
                    longrightarrow: "⟶",
                    Longleftarrow: "⟸",
                    Longrightarrow: "⟹",
                    implies: "⟹",
                    longleftrightarrow: "⟷",
                    Longleftrightarrow: "⟺",
                    // relation
                    backepsilon: "∍",
                    because: "∵",
                    therefore: "∴",
                    between: "≬",
                    blacktriangleleft: "◀",
                    blacktriangleright: "▸",
                    dashv: "⊣",
                    bowtie: "⋈",
                    frown: "⌢",
                    in: "∈",
                    notin: "∉",
                    mid: "∣",
                    parallel: "∥",
                    models: "⊨",
                    ni: "∋",
                    owns: "∋",
                    nmid: "∤",
                    nparallel: "∦",
                    nshortmid: "⏒",
                    nshortparallel: "⏓",
                    nsubseteq: "⊈",
                    nsubseteqq: "⫇",
                    nsupseteq: "⊉",
                    nsupseteqq: "⫈",
                    ntriangleleft: "⋪",
                    ntrianglelefteq: "⋬",
                    ntriangleright: "⋫",
                    ntrianglerighteq: "⋭",
                    nvdash: "⊬",
                    nVdash: "⊮",
                    nvDash: "⊭",
                    nVDash: "⊯",
                    perp: "⊥",
                    pitchfork: "⋔",
                    propto: "∝",
                    shortmid: "⏐",
                    shortparallel: "⏑",
                    smile: "⌣",
                    sqsubset: "⊏",
                    sqsubseteq: "⊑",
                    sqsupset: "⊐",
                    sqsupseteq: "⊒",
                    subset: "⊂",
                    Subset: "⋐",
                    subseteq: "⊆",
                    subseteqq: "⫅",
                    subsetneq: "⊊",
                    subsetneqq: "⫋",
                    supset: "⊃",
                    Supset: "⋑",
                    supseteq: "⊇",
                    supseteqq: "⫆",
                    supsetneq: "⊋",
                    supsetneqq: "⫌",
                    trianglelefteq: "⊴",
                    trianglerighteq: "⊵",
                    varpropto: "⫉",
                    varsubsetneq: "⏔",
                    varsubsetneqq: "⏖",
                    varsupsetneq: "⏕",
                    varsupsetneqq: "⏗",
                    vdash: "⊢",
                    Vdash: "⊩",
                    vDash: "⊨",
                    Vvdash: "⊪",
                    vert: "|",
                    Vert: "ǁ",
                    "|": "ǁ",
                    "{": "{",
                    "}": "}",
                    backslash: "\\",
                    langle: "〈",
                    rangle: "〉",
                    lceil: "⌈",
                    rceil: "⌉",
                    lbrace: "{",
                    rbrace: "}",
                    lfloor: "⌊",
                    rfloor: "⌋",
                    cdots: "⋯",
                    ddots: "⋰",
                    vdots: "⋮",
                    dots: "…",
                    ldots: "…",
                    "#": "#",
                    bot: "⊥",
                    angle: "∠",
                    backprime: "‵",
                    bigstar: "★",
                    blacklozenge: "◆",
                    blacksquare: "■",
                    blacktriangle: "▲",
                    blacktriangledown: "▼",
                    clubsuit: "♣",
                    diagdown: "⒁",
                    diagup: "⒂",
                    diamondsuit: "♢",
                    emptyset: "ø",
                    exists: "∃",
                    flat: "♭",
                    forall: "∀",
                    heartsuit: "♡",
                    infty: "∞",
                    lozenge: "◇",
                    measuredangle: "∡",
                    nabla: "∇",
                    natural: "♮",
                    neg: "¬",
                    lnot: "¬",
                    nexists: "∄",
                    prime: "′",
                    sharp: "♯",
                    spadesuit: "♠",
                    sphericalangle: "∢",
                    surd: "√",
                    top: "⊤",
                    varnothing: "∅",
                    triangle: "△",
                    triangledown: "▽"
                }
            };
        }
    };

    /*!
     * 罗马字体
     */
    _p[30] = {
        value: function () {
            return {
                meta: {
                    fontFamily: "KF AMS ROMAN",
                    // src: "KF_AMS_ROMAN.woff"
                    src: "data:font/woff2;base64,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"
                }
            };
        }
    };

    /**
     * 公式对象，表达式容器
     */
    _p[31] = {
        value: function (require) {
            var kity = _p.r(34),
                GTYPE = _p.r(6),
                FontManager = _p.r(25),
                FontInstaller = _p.r(24),
                DEFAULT_OPTIONS = {
                    fontsize: 50,
                    autoresize: true,
                    padding: [0]
                },
                Output = _p.r(1),
                EXPRESSION_INTERVAL = 10,
                ExpressionWrap = kity.createClass("ExpressionWrap", {
                    constructor: function (exp, config) {
                        this.wrap = new kity.Group();
                        this.bg = new kity.Rect(0, 0, 0, 0).fill("transparent");
                        this.exp = exp;
                        this.config = config;
                        this.wrap.setAttr("data-type", "kf-exp-wrap");
                        this.bg.setAttr("data-type", "kf-exp-wrap-bg");
                        this.wrap.addShape(this.bg);
                        this.wrap.addShape(this.exp);
                    },
                    getWrapShape: function () {
                        return this.wrap;
                    },
                    getExpression: function () {
                        return this.exp;
                    },
                    getBackground: function () {
                        return this.bg;
                    },
                    resize: function () {
                        var padding = this.config.padding,
                            expBox = this.exp.getFixRenderBox();
                        if (padding.length === 1) {
                            padding[1] = padding[0];
                        }
                        this.bg.setSize(
                            padding[1] * 2 + expBox.width,
                            padding[0] * 2 + expBox.height
                        );
                        this.exp.translate(padding[1], padding[0]);
                    }
                }),
                Formula = kity.createClass("Formula", {
                    base: _p.r(32),
                    constructor: function (container, config) {
                        this.callBase(container);
                        this.expressions = [];
                        this.fontInstaller = new FontInstaller(this);
                        this.config = kity.Utils.extend(
                            {},
                            DEFAULT_OPTIONS,
                            config
                        );
                        this.initEnvironment();
                        this.initInnerFont();
                    },
                    getContentContainer: function () {
                        return this.container;
                    },
                    initEnvironment: function () {
                        this.zoom = this.config.fontsize / 50;
                        if ("width" in this.config) {
                            this.setWidth(this.config.width);
                        }
                        if ("height" in this.config) {
                            this.setHeight(this.config.height);
                        }
                        this.node.setAttribute(
                            "font-size",
                            DEFAULT_OPTIONS.fontsize
                        );
                    },
                    initInnerFont: function () {
                        var fontList = FontManager.getFontList(),
                            _self = this;
                        kity.Utils.each(fontList, function (fontInfo) {
                            createFontStyle(fontInfo);
                        });
                        function createFontStyle(fontInfo) {
                            var stylesheet = _self.doc.createElement("style"),
                                tpl =
                                    '@font-face{font-family: "${fontFamily}";font-style: normal;src: url("${src}") format("woff");}';
                            stylesheet.setAttribute("type", "text/css");
                            stylesheet.innerHTML = tpl
                                .replace(
                                    "${fontFamily}",
                                    fontInfo.meta.fontFamily
                                )
                                .replace("${src}", fontInfo.meta.src);
                            _self.resourceNode.appendChild(stylesheet);
                        }
                    },
                    insertExpression: function (expression, index) {
                        var expWrap = this.wrap(expression);
                        // clear zoom
                        this.container.clearTransform();
                        this.expressions.splice(
                            index,
                            0,
                            expWrap.getWrapShape()
                        );
                        this.addShape(expWrap.getWrapShape());
                        notifyExpression.call(this, expWrap.getExpression());
                        expWrap.resize();
                        correctOffset.call(this);
                        this.resetZoom();
                        this.config.autoresize && this.resize();
                    },
                    appendExpression: function (expression) {
                        this.insertExpression(
                            expression,
                            this.expressions.length
                        );
                    },
                    resize: function () {
                        var renderBox = this.container.getRenderBox("paper");
                        this.node.setAttribute("width", renderBox.width);
                        this.node.setAttribute("height", renderBox.height);
                    },
                    resetZoom: function () {
                        var zoomLevel = this.zoom / this.getBaseZoom();
                        if (zoomLevel !== 0) {
                            this.container.scale(zoomLevel);
                        }
                    },
                    wrap: function (exp) {
                        return new ExpressionWrap(exp, this.config);
                    },
                    clear: function () {
                        this.callBase();
                        this.expressions = [];
                    },
                    clearExpressions: function () {
                        kity.Utils.each(this.expressions, function (exp) {
                            exp.remove();
                        });
                        this.expressions = [];
                    },
                    toJPG: function (cb) {
                        new Output(this).toJPG(cb);
                    },
                    toPNG: function (cb) {
                        new Output(this).toPNG(cb);
                    }
                });
            kity.Utils.extend(Formula, {
                registerFont: function (fontData) {
                    FontManager.registerFont(fontData);
                }
            });
            // 调整表达式之间的偏移
            function correctOffset() {
                var exprOffset = 0;
                kity.Utils.each(this.expressions, function (expr) {
                    var box = null;
                    if (!expr) {
                        return;
                    }
                    expr.setMatrix(new kity.Matrix(1, 0, 0, 1, 0, 0));
                    box = expr.getFixRenderBox();
                    expr.translate(0 - box.x, exprOffset);
                    exprOffset += box.height + EXPRESSION_INTERVAL;
                });
                return this;
            }
            // 通知表达式已接入到paper
            function notifyExpression(expression) {
                var len = 0;
                if (!expression) {
                    return;
                }
                if (expression.getType() === GTYPE.EXP) {
                    for (
                        var i = 0, len = expression.getChildren().length;
                        i < len;
                        i++
                    ) {
                        notifyExpression(expression.getChild(i));
                    }
                } else if (expression.getType() === GTYPE.COMPOUND_EXP) {
                    // 操作数处理
                    for (
                        var i = 0, len = expression.getOperands().length;
                        i < len;
                        i++
                    ) {
                        notifyExpression(expression.getOperand(i));
                    }
                    // 处理操作符
                    notifyExpression(expression.getOperator());
                }
                expression.addedCall && expression.addedCall();
            }
            return Formula;
        }
    };

    /**
     * 公式专用paper
     */
    _p[32] = {
        value: function (require) {
            var kity = _p.r(34);
            return kity.createClass("FPaper", {
                base: kity.Paper,
                constructor: function (container) {
                    this.callBase(container);
                    this.doc = container.ownerDocument;
                    this.container = new kity.Group();
                    this.container.setAttr("data-type", "kf-container");
                    this.background = new kity.Group();
                    this.background.setAttr("data-type", "kf-bg");
                    this.baseZoom = 1;
                    this.zoom = 1;
                    this.base("addShape", this.background);
                    this.base("addShape", this.container);
                },
                getZoom: function () {
                    return this.zoom;
                },
                getBaseZoom: function () {
                    return this.baseZoom;
                },
                addShape: function (shape, pos) {
                    return this.container.addShape(shape, pos);
                },
                getBackground: function () {
                    return this.background;
                },
                removeShape: function (pos) {
                    return this.container.removeShape(pos);
                },
                clear: function () {
                    return this.container.clear();
                }
            });
        }
    };

    /**
     * jquery
     */
    _p[33] = {
        value: function () {
            if (!window.jQuery) {
                throw new Error("Missing jQuery");
            }
            return window.jQuery;
        }
    };

    /**
     * kity库封包
     */
    _p[34] = {
        value: function () {
            if (!window.kity) {
                throw new Error("Missing Kity Graphic Lib");
            }
            return window.kity;
        }
    };

    /**
     * 小括号操作符：()
     */
    _p[35] = {
        value: function (require) {
            var kity = _p.r(34),
                Text = _p.r(5);
            return kity.createClass("BracketsOperator", {
                base: _p.r(41),
                constructor: function () {
                    this.callBase("Brackets");
                },
                applyOperand: function (exp) {
                    generate.call(this, exp);
                }
            });
            function generate(exp) {
                var left = this.getParentExpression().getLeftSymbol(),
                    right = this.getParentExpression().getRightSymbol(),
                    fontSize = exp.getFixRenderBox().height,
                    group = new kity.Group(),
                    offset = 0,
                    leftOp = new Text(left, "KF AMS MAIN").fill("black"),
                    rightOp = new Text(right, "KF AMS MAIN").fill("black");
                leftOp.setFontSize(fontSize);
                rightOp.setFontSize(fontSize);
                this.addOperatorShape(group.addShape(leftOp).addShape(rightOp));
                offset += leftOp.getFixRenderBox().width;
                exp.translate(offset, 0);
                offset += exp.getFixRenderBox().width;
                rightOp.translate(offset, 0);
            }
        }
    };

    /**
     * 组合操作符
     * 操作多个表达式组合在一起
     */
    _p[36] = {
        value: function (require) {
            var kity = _p.r(34);
            return kity.createClass("CombinationOperator", {
                base: _p.r(41),
                constructor: function () {
                    this.callBase("Combination");
                },
                applyOperand: function () {
                    // 偏移量
                    var offsetX = 0, // 操作数
                        operands = arguments, // 操作对象最大高度
                        maxHeight = 0, // 垂直距离最大偏移
                        maxOffsetTop = 0,
                        maxOffsetBottom = 0,
                        cached = [], // 偏移集合
                        offsets = [];
                    kity.Utils.each(operands, function (operand) {
                        var box = operand.getFixRenderBox(),
                            offsetY = operand.getOffset();
                        box.height -= offsetY.top + offsetY.bottom;
                        cached.push(box);
                        offsets.push(offsetY);
                        maxOffsetTop = Math.max(offsetY.top, maxOffsetTop);
                        maxOffsetBottom = Math.max(
                            offsetY.bottom,
                            maxOffsetBottom
                        );
                        maxHeight = Math.max(box.height, maxHeight);
                    });
                    kity.Utils.each(operands, function (operand, index) {
                        var box = cached[index];
                        operand.translate(
                            offsetX - box.x,
                            (maxHeight - (box.y + box.height)) / 2 +
                                maxOffsetBottom -
                                offsets[index].bottom
                        );
                        offsetX += box.width;
                    });
                    this.parentExpression.setOffset(
                        maxOffsetTop,
                        maxOffsetBottom
                    );
                    this.parentExpression.updateBoxSize();
                }
            });
        }
    };

    /*!
     * 上下标控制器
     */
    _p[37] = {
        value: function (require) {
            var kity = _p.r(34),
                EmptyExpression = _p.r(20),
                defaultOptions = {
                    subOffset: 0,
                    supOffset: 0,
                    // 上下标的默认缩放值
                    zoom: 0.66
                };
            return kity.createClass("ScriptController", {
                constructor: function (opObj, target, sup, sub, options) {
                    this.observer = opObj.getParentExpression();
                    this.target = target;
                    this.sup = sup;
                    this.sub = sub;
                    this.options = kity.Utils.extend(
                        {},
                        defaultOptions,
                        options
                    );
                },
                // 上下标记
                applyUpDown: function () {
                    var target = this.target,
                        sup = this.sup,
                        sub = this.sub,
                        options = this.options;
                    sup.scale(options.zoom);
                    sub.scale(options.zoom);
                    var targetBox = target.getFixRenderBox();
                    if (
                        EmptyExpression.isEmpty(sup) &&
                        EmptyExpression.isEmpty(sub)
                    ) {
                        return {
                            width: targetBox.width,
                            height: targetBox.height,
                            top: 0,
                            bottom: 0
                        };
                    } else {
                        // 上标
                        if (
                            !EmptyExpression.isEmpty(sup) &&
                            EmptyExpression.isEmpty(sub)
                        ) {
                            return this.applyUp(target, sup);
                        } else if (
                            EmptyExpression.isEmpty(sup) &&
                            !EmptyExpression.isEmpty(sub)
                        ) {
                            return this.applyDown(target, sub);
                        } else {
                            return this.applyUpDownScript(target, sup, sub);
                        }
                    }
                },
                /**
                 * 返回应用上下标后的空间占用情况，其中的key各自的意义是：
                 * top: 上空间偏移
                 * bottom: 下空间偏移
                 * width: 当前整个图形的实际占用空间的width
                 * height: 当前整个图形的实际占用空间的height
                 * @returns {*}
                 */
                applySide: function () {
                    var target = this.target,
                        sup = this.sup,
                        sub = this.sub;
                    if (
                        EmptyExpression.isEmpty(sup) &&
                        EmptyExpression.isEmpty(sub)
                    ) {
                        var targetRectBox = target.getRenderBox(this.observer);
                        return {
                            width: targetRectBox.width,
                            height: targetRectBox.height,
                            top: 0,
                            bottom: 0
                        };
                    } else {
                        // 下标处理
                        if (
                            EmptyExpression.isEmpty(sup) &&
                            !EmptyExpression.isEmpty(sub)
                        ) {
                            return this.applySideSub(target, sub);
                        } else if (
                            !EmptyExpression.isEmpty(sup) &&
                            EmptyExpression.isEmpty(sub)
                        ) {
                            return this.applySideSuper(target, sup);
                        } else {
                            return this.applySideScript(target, sup, sub);
                        }
                    }
                },
                applySideSuper: function (target, sup) {
                    sup.scale(this.options.zoom);
                    var targetRectBox = target.getRenderBox(this.observer),
                        supRectBox = sup.getRenderBox(this.observer),
                        targetMeanline = target.getMeanline(this.observer),
                        supBaseline = sup.getBaseline(this.observer),
                        positionline = targetMeanline,
                        diff = supBaseline - positionline,
                        space = {
                            top: 0,
                            bottom: 0,
                            width: targetRectBox.width + supRectBox.width,
                            height: targetRectBox.height
                        };
                    sup.translate(targetRectBox.width, 0);
                    if (this.options.supOffset) {
                        sup.translate(this.options.supOffset, 0);
                    }
                    if (diff > 0) {
                        target.translate(0, diff);
                        space.bottom = diff;
                        space.height += diff;
                    } else {
                        sup.translate(0, -diff);
                    }
                    return space;
                },
                applySideSub: function (target, sub) {
                    sub.scale(this.options.zoom);
                    var targetRectBox = target.getRenderBox(this.observer),
                        subRectBox = sub.getRenderBox(this.observer),
                        subOffset = sub.getOffset(),
                        targetBaseline = target.getBaseline(this.observer), // 下标定位线
                        subPosition =
                            (subRectBox.height +
                                subOffset.top +
                                subOffset.bottom) /
                            2,
                        diff =
                            targetRectBox.height - targetBaseline - subPosition,
                        space = {
                            top: 0,
                            bottom: 0,
                            width: targetRectBox.width + subRectBox.width,
                            height: targetRectBox.height
                        };
                    // 定位下标位置
                    sub.translate(
                        targetRectBox.width,
                        subOffset.top + targetBaseline - subPosition
                    );
                    if (this.options.subOffset) {
                        sub.translate(this.options.subOffset, 0);
                    }
                    if (diff < 0) {
                        space.top = -diff;
                        space.height -= diff;
                    }
                    return space;
                },
                applySideScript: function (target, sup, sub) {
                    sup.scale(this.options.zoom);
                    sub.scale(this.options.zoom);
                    var targetRectBox = target.getRenderBox(this.observer),
                        subRectBox = sub.getRenderBox(this.observer),
                        supRectBox = sup.getRenderBox(this.observer),
                        targetMeanline = target.getMeanline(this.observer),
                        targetBaseline = target.getBaseline(this.observer),
                        supBaseline = sup.getBaseline(this.observer), // 上下标都存在时， 下标的定位以上伸线为准
                        subAscenderline = sub.getAscenderline(this.observer),
                        supPosition = targetMeanline,
                        subPosition =
                            targetMeanline +
                            ((targetBaseline - targetMeanline) * 2) / 3,
                        topDiff = supPosition - supBaseline,
                        bottomDiff =
                            targetRectBox.height -
                            subPosition -
                            (subRectBox.height - subAscenderline),
                        space = {
                            top: 0,
                            bottom: 0,
                            width:
                                targetRectBox.width +
                                Math.max(subRectBox.width, supRectBox.width),
                            height: targetRectBox.height
                        };
                    sup.translate(targetRectBox.width, topDiff);
                    sub.translate(
                        targetRectBox.width,
                        subPosition - subAscenderline
                    );
                    if (this.options.supOffset) {
                        sup.translate(this.options.supOffset, 0);
                    }
                    if (this.options.subOffset) {
                        sub.translate(this.options.subOffset, 0);
                    }
                    // 定位纠正
                    if (topDiff > 0) {
                        if (bottomDiff < 0) {
                            targetRectBox.height -= bottomDiff;
                            space.top = -bottomDiff;
                        }
                    } else {
                        target.translate(0, -topDiff);
                        sup.translate(0, -topDiff);
                        sub.translate(0, -topDiff);
                        space.height -= topDiff;
                        if (bottomDiff > 0) {
                            space.bottom = -topDiff;
                        } else {
                            space.height -= bottomDiff;
                            // 比较上下偏移， 获取正确的偏移值
                            topDiff = -topDiff;
                            bottomDiff = -bottomDiff;
                            if (topDiff > bottomDiff) {
                                space.bottom = topDiff - bottomDiff;
                            } else {
                                space.top = bottomDiff - topDiff;
                            }
                        }
                    }
                    return space;
                },
                applyUp: function (target, sup) {
                    var supBox = sup.getFixRenderBox(),
                        targetBox = target.getFixRenderBox(),
                        space = {
                            width: Math.max(targetBox.width, supBox.width),
                            height: supBox.height + targetBox.height,
                            top: 0,
                            bottom: supBox.height
                        };
                    sup.translate((space.width - supBox.width) / 2, 0);
                    target.translate(
                        (space.width - targetBox.width) / 2,
                        supBox.height
                    );
                    return space;
                },
                applyDown: function (target, sub) {
                    var subBox = sub.getFixRenderBox(),
                        targetBox = target.getFixRenderBox(),
                        space = {
                            width: Math.max(targetBox.width, subBox.width),
                            height: subBox.height + targetBox.height,
                            top: subBox.height,
                            bottom: 0
                        };
                    sub.translate(
                        (space.width - subBox.width) / 2,
                        targetBox.height
                    );
                    target.translate((space.width - targetBox.width) / 2, 0);
                    return space;
                },
                applyUpDownScript: function (target, sup, sub) {
                    var supBox = sup.getFixRenderBox(),
                        subBox = sub.getFixRenderBox(),
                        targetBox = target.getFixRenderBox(),
                        space = {
                            width: Math.max(
                                targetBox.width,
                                supBox.width,
                                subBox.width
                            ),
                            height:
                                supBox.height +
                                subBox.height +
                                targetBox.height,
                            top: 0,
                            bottom: 0
                        };
                    sup.translate((space.width - supBox.width) / 2, 0);
                    target.translate(
                        (space.width - targetBox.width) / 2,
                        supBox.height
                    );
                    sub.translate(
                        (space.width - subBox.width) / 2,
                        supBox.height + targetBox.height
                    );
                    return space;
                }
            });
        }
    };

    /**
     * 分数操作符
     */
    _p[38] = {
        value: function (require) {
            var kity = _p.r(34),
                ZOOM = _p.r(47).zoom;
            return kity.createClass("FractionOperator", {
                base: _p.r(41),
                constructor: function () {
                    this.callBase("Fraction");
                },
                applyOperand: function (upOperand, downOperand) {
                    upOperand.scale(ZOOM);
                    downOperand.scale(ZOOM);
                    var upWidth = Math.ceil(upOperand.getWidth()),
                        downWidth = Math.ceil(downOperand.getWidth()),
                        upHeight = Math.ceil(upOperand.getHeight()),
                        downHeight = Math.ceil(downOperand.getHeight()), // 分数线overflow值
                        overflow = 3, // 整体padding
                        padding = 1,
                        maxWidth = Math.max(upWidth, downWidth),
                        maxHeight = Math.max(upHeight, downHeight),
                        operatorShape = generateOperator(maxWidth, overflow);
                    this.addOperatorShape(operatorShape);
                    upOperand.translate((maxWidth - upWidth) / 2 + overflow, 0);
                    operatorShape.translate(0, upHeight + 1);
                    // 下部不需要偏移
                    downOperand.translate(
                        (maxWidth - downWidth) / 2 + overflow,
                        upHeight + operatorShape.getHeight() + 1 * 2
                    );
                    this.parentExpression.setOffset(
                        maxHeight - upHeight,
                        maxHeight - downHeight
                    );
                    this.parentExpression.expand(padding * 2, padding * 2);
                    this.parentExpression.translateElement(padding, padding);
                }
            });
            function generateOperator(width, overflow) {
                return new kity.Rect(width + overflow * 2, 1).fill("black");
            }
        }
    };

    /**
     * 函数操作符
     */
    _p[39] = {
        value: function (require) {
            var kity = _p.r(34),
                Text = _p.r(5),
                ScriptController = _p.r(37);
            return kity.createClass("FunctionOperator", {
                base: _p.r(41),
                constructor: function (funcName) {
                    this.callBase("Function: " + funcName);
                    this.funcName = funcName;
                },
                /*
                 * 积分操作符应用操作数
                 * @param expr 函数表达式
                 * @param sup 上限
                 * @param sub 下限
                 */
                applyOperand: function (expr, sup, sub) {
                    var opShape = generateOperator.call(this),
                        expBox = expr.getFixRenderBox(),
                        scriptHanlder = this.parentExpression.isSideScript()
                            ? "applySide"
                            : "applyUpDown",
                        space = new ScriptController(this, opShape, sup, sub, {
                            zoom: 0.5
                        })[scriptHanlder](),
                        padding = 5,
                        diff =
                            (space.height +
                                space.top +
                                space.bottom -
                                expBox.height) /
                            2;
                    // 应用偏移， 使图形在正确的位置上
                    opShape.translate(0, space.top);
                    sup.translate(0, space.top);
                    sub.translate(0, space.top);
                    if (diff >= 0) {
                        expr.translate(space.width + padding, diff);
                    } else {
                        diff = -diff;
                        opShape.translate(0, diff);
                        sup.translate(0, diff);
                        sub.translate(0, diff);
                        expr.translate(space.width + padding, 0);
                    }
                    // 只扩展左边， 不扩展右边， 所以padding不 *2
                    this.parentExpression.expand(padding, padding * 2);
                    this.parentExpression.translateElement(padding, padding);
                }
            });
            /* 返回操作符对象 */
            function generateOperator() {
                var opShape = new Text(this.funcName, "KF AMS ROMAN");
                this.addOperatorShape(opShape);
                // 为操作符图形创建baseline和meanline方法
                opShape.getBaseline = function () {
                    return opShape.getFixRenderBox().height;
                };
                opShape.getMeanline = function () {
                    return 0;
                };
                return opShape;
            }
        }
    };

    /**
     * 积分操作符：∫
     */
    _p[40] = {
        value: function (require) {
            var kity = _p.r(34),
                ScriptController = _p.r(37);
            return kity.createClass("IntegrationOperator", {
                base: _p.r(41),
                constructor: function (type) {
                    this.callBase("Integration");
                    // 默认是普通单重积分
                    this.opType = type || 1;
                },
                setType: function (type) {
                    this.opType = type | 0;
                },
                // 重置类型
                resetType: function () {
                    this.opType = 1;
                },
                applyOperand: function (exp, sup, sub) {
                    var opShape = this.getOperatorShape(),
                        padding = 3,
                        expBox = exp.getFixRenderBox(),
                        space = new ScriptController(this, opShape, sup, sub, {
                            supOffset: 3,
                            subOffset: -15
                        }).applySide(),
                        diff = (space.height + space.top - expBox.height) / 2;
                    opShape.translate(0, space.top);
                    sup.translate(0, space.top);
                    sub.translate(0, space.top);
                    if (diff >= 0) {
                        exp.translate(space.width + padding, diff);
                    } else {
                        diff = -diff;
                        opShape.translate(0, diff);
                        sup.translate(0, diff);
                        sub.translate(0, diff);
                        exp.translate(space.width + padding, 0);
                    }
                    this.parentExpression.expand(padding, padding * 2);
                    this.parentExpression.translateElement(padding, padding);
                },
                getOperatorShape: function () {
                    var pathData =
                            "M1.318,48.226c0,0,0.044,0.066,0.134,0.134c0.292,0.313,0.626,0.447,1.006,0.447c0.246,0.022,0.358-0.044,0.604-0.268   c0.782-0.782,1.497-2.838,2.324-6.727c0.514-2.369,0.938-4.693,1.586-8.448C8.559,24.068,9.9,17.878,11.978,9.52   c0.917-3.553,1.922-7.576,3.866-8.983C16.247,0.246,16.739,0,17.274,0c1.564,0,2.503,1.162,2.592,2.57   c0,0.827-0.424,1.386-1.273,1.386c-0.671,0-1.229-0.514-1.229-1.251c0-0.805,0.514-1.095,1.185-1.274   c0.022,0-0.291-0.29-0.425-0.379c-0.201-0.134-0.514-0.224-0.737-0.224c-0.067,0-0.112,0-0.157,0.022   c-0.469,0.134-0.983,0.939-1.453,2.234c-0.537,1.475-0.961,3.174-1.631,6.548c-0.424,2.101-0.693,3.464-1.229,6.727   c-1.608,9.185-2.949,15.487-5.006,23.756c-0.514,2.034-0.849,3.24-1.207,4.335c-0.559,1.698-1.162,2.95-1.811,3.799   c-0.514,0.715-1.385,1.408-2.436,1.408c-1.363,0-2.391-1.185-2.458-2.592c0-0.804,0.447-1.363,1.273-1.363   c0.671,0,1.229,0.514,1.229,1.251C2.503,47.757,1.989,48.047,1.318,48.226z",
                        group = new kity.Group(),
                        opGroup = new kity.Group(),
                        opShape = new kity.Path(pathData).fill("black"),
                        opBox = new kity.Rect(0, 0, 0, 0).fill("transparent"),
                        tmpShape = null;
                    opGroup.addShape(opShape);
                    group.addShape(opBox);
                    group.addShape(opGroup);
                    this.addOperatorShape(group);
                    for (var i = 1; i < this.opType; i++) {
                        tmpShape = new kity.Use(opShape).translate(
                            (opShape.getWidth() / 2) * i,
                            0
                        );
                        opGroup.addShape(tmpShape);
                    }
                    opGroup.scale(1.6);
                    tmpShape = null;
                    // 为操作符图形创建baseline和meanline方法
                    group.getBaseline = function () {
                        return opGroup.getFixRenderBox().height;
                    };
                    group.getMeanline = function () {
                        return 10;
                    };
                    return group;
                }
            });
        }
    };

    /**
     * 操作符抽象类
     * @abstract
     */
    _p[41] = {
        value: function (require) {
            var kity = _p.r(34),
                GTYPE = _p.r(6);
            return kity.createClass("Operator", {
                base: _p.r(46),
                constructor: function (operatorName) {
                    this.callBase();
                    this.type = GTYPE.OP;
                    // 该操作符所属的表达式
                    this.parentExpression = null;
                    // 操作符名称
                    this.operatorName = operatorName;
                    // 操作符图形
                    this.operatorShape = new kity.Group();
                    this.addShape(this.operatorShape);
                },
                applyOperand: function () {
                    throw new Error("applyOperand is abstract");
                },
                setParentExpression: function (exp) {
                    this.parentExpression = exp;
                },
                getParentExpression: function () {
                    return this.parentExpression;
                },
                clearParentExpression: function () {
                    this.parentExpression = null;
                },
                // 提供给具体实现类附加其绘制的操作符图形的接口
                addOperatorShape: function (shpae) {
                    return this.operatorShape.addShape(shpae);
                },
                getOperatorShape: function () {
                    return this.operatorShape;
                }
            });
        }
    };

    /**
     * 开方操作符
     */
    _p[42] = {
        value: function (require) {
            var kity = _p.r(34), // 符号图形属性
                // 线条宽度
                SHAPE_DATA_WIDTH = 1, // 计算公式
                radians = (2 * Math.PI) / 360,
                sin15 = Math.sin(15 * radians),
                cos15 = Math.cos(15 * radians),
                tan15 = Math.tan(15 * radians);
            return kity.createClass("RadicalOperator", {
                base: _p.r(41),
                constructor: function () {
                    this.callBase("Radical");
                },
                applyOperand: function (radicand, exponent) {
                    generateOperator.call(this, radicand, exponent);
                }
            });
            // 根据给定的操作数生成操作符的pathData
            // radicand 表示被开方数
            // exponent 表示指数
            function generateOperator(radicand, exponent) {
                var decoration = generateDecoration(radicand),
                    vLine = generateVLine(radicand),
                    padding = 5,
                    hLine = generateHLine(radicand);
                this.addOperatorShape(decoration);
                this.addOperatorShape(vLine);
                this.addOperatorShape(hLine);
                adjustmentPosition.call(
                    this,
                    mergeShape(decoration, vLine, hLine),
                    this.operatorShape,
                    radicand,
                    exponent
                );
                this.parentExpression.expand(0, padding * 2);
                this.parentExpression.translateElement(0, padding);
            }
            // 生成根号中的左边装饰部分
            function generateDecoration(radicand) {
                var shape = new kity.Path(), // 命名为a以便于精简表达式
                    a = SHAPE_DATA_WIDTH,
                    h = radicand.getHeight() / 3,
                    drawer = shape.getDrawer();
                // 根号尾部左上角开始
                drawer.moveTo(0, cos15 * a * 6);
                drawer.lineBy(sin15 * a, cos15 * a);
                drawer.lineBy(cos15 * a * 3, -sin15 * a * 3);
                drawer.lineBy(tan15 * h, h);
                drawer.lineBy(sin15 * a * 3, -cos15 * a * 3);
                drawer.lineBy(-sin15 * h, -h);
                drawer.close();
                return shape.fill("black");
            }
            // 根据操作数生成根号的竖直线部分
            function generateVLine(operand) {
                var shape = new kity.Path(), // * 0.9 是为了在视觉上使斜线部分不至于太高
                    h = operand.getHeight() * 0.9,
                    drawer = shape.getDrawer();
                drawer.moveTo(tan15 * h, 0);
                drawer.lineTo(0, h);
                drawer.lineBy(
                    sin15 * SHAPE_DATA_WIDTH * 3,
                    cos15 * SHAPE_DATA_WIDTH * 3
                );
                drawer.lineBy(
                    tan15 * h + sin15 * SHAPE_DATA_WIDTH * 3,
                    -(h + 3 * SHAPE_DATA_WIDTH * cos15)
                );
                drawer.close();
                return shape.fill("black");
            }
            // 根据操作数生成根号的水平线部分
            function generateHLine(operand) {
                // 表达式宽度
                var w = operand.getWidth() + 2 * SHAPE_DATA_WIDTH;
                return new kity.Rect(w, 2 * SHAPE_DATA_WIDTH).fill("black");
            }
            // 合并根号的各个部分， 并返回根号的关键点位置数据
            function mergeShape(decoration, vLine, hLine) {
                var decoBox = decoration.getFixRenderBox(),
                    vLineBox = vLine.getFixRenderBox();
                vLine.translate(
                    decoBox.width - sin15 * SHAPE_DATA_WIDTH * 3,
                    0
                );
                decoration.translate(0, vLineBox.height - decoBox.height);
                vLineBox = vLine.getFixRenderBox();
                hLine.translate(
                    vLineBox.x + vLineBox.width - SHAPE_DATA_WIDTH / cos15,
                    0
                );
                // 返回关键点数据
                return {
                    x: vLineBox.x + vLineBox.width - SHAPE_DATA_WIDTH / cos15,
                    y: 0
                };
            }
            // 调整整个根号表达式的各个部分： 位置、操作符、被开方数、指数
            function adjustmentPosition(
                position,
                operator,
                radicand,
                exponent
            ) {
                var exponentBox = null,
                    opOffset = {
                        x: 0,
                        y: 0
                    },
                    opBox = operator.getFixRenderBox();
                exponent.scale(0.66);
                exponentBox = exponent.getFixRenderBox();
                if (exponentBox.width > 0 && exponentBox.height > 0) {
                    opOffset.y = exponentBox.height - opBox.height / 2;
                    // 指数不超出根号， 则移动指数
                    if (opOffset.y < 0) {
                        exponent.translate(0, -opOffset.y);
                        opOffset.y = 0;
                    }
                    opOffset.x =
                        exponentBox.width +
                        (opBox.height / 2) * tan15 -
                        position.x;
                }
                operator.translate(opOffset.x, opOffset.y);
                radicand.translate(
                    opOffset.x + position.x + SHAPE_DATA_WIDTH,
                    opOffset.y + 2 * SHAPE_DATA_WIDTH
                );
            }
        }
    };

    /**
     * 上下标操作符
     */
    _p[43] = {
        value: function (require) {
            var kity = _p.r(34),
                ScriptController = _p.r(37);
            return kity.createClass("ScriptOperator", {
                base: _p.r(41),
                constructor: function (operatorName) {
                    this.callBase(operatorName || "Script");
                },
                applyOperand: function (operand, sup, sub) {
                    var padding = 1,
                        parent = this.parentExpression,
                        space = new ScriptController(
                            this,
                            operand,
                            sup,
                            sub
                        ).applySide();
                    this.getOperatorShape();
                    space && parent.setOffset(space.top, space.bottom);
                    parent.expand(4, padding * 2);
                    parent.translateElement(2, padding);
                }
            });
        }
    };

    /**
     * 求和操作符：∑
     */
    _p[44] = {
        value: function (require) {
            var kity = _p.r(34),
                ScriptController = _p.r(37);
            return kity.createClass("SummationOperator", {
                base: _p.r(41),
                constructor: function () {
                    this.callBase("Summation");
                    this.displayType = "equation";
                },
                applyOperand: function (expr, sup, sub) {
                    var opShape = this.getOperatorShape(),
                        expBox = expr.getFixRenderBox(),
                        padding = 0,
                        space = new ScriptController(
                            this,
                            opShape,
                            sup,
                            sub
                        ).applyUpDown(),
                        diff =
                            (space.height -
                                space.top -
                                space.bottom -
                                expBox.height) /
                            2;
                    if (diff >= 0) {
                        expr.translate(
                            space.width + padding,
                            diff + space.bottom
                        );
                    } else {
                        diff = -diff;
                        opShape.translate(0, diff);
                        sup.translate(0, diff);
                        sub.translate(0, diff);
                        expr.translate(space.width + padding, space.bottom);
                    }
                    this.parentExpression.setOffset(space.top, space.bottom);
                    this.parentExpression.expand(padding, padding * 2);
                    this.parentExpression.translateElement(padding, padding);
                },
                getOperatorShape: function () {
                    var pathData =
                            "M0.672,33.603c-0.432,0-0.648,0-0.648-0.264c0-0.024,0-0.144,0.24-0.432l12.433-14.569L0,0.96c0-0.264,0-0.72,0.024-0.792   C0.096,0.024,0.12,0,0.672,0h28.371l2.904,6.745h-0.6C30.531,4.8,28.898,3.72,28.298,3.336c-1.896-1.2-3.984-1.608-5.28-1.8   c-0.216-0.048-2.4-0.384-5.617-0.384H4.248l11.185,15.289c0.168,0.24,0.168,0.312,0.168,0.36c0,0.12-0.048,0.192-0.216,0.384   L3.168,31.515h14.474c4.608,0,6.96-0.624,7.464-0.744c2.76-0.72,5.305-2.352,6.241-4.848h0.6l-2.904,7.681H0.672z",
                        operatorShape = new kity.Path(pathData).fill("black"),
                        opBgShape = new kity.Rect(0, 0, 0, 0).fill(
                            "transparent"
                        ),
                        group = new kity.Group(),
                        opRenderBox = null;
                    group.addShape(opBgShape);
                    group.addShape(operatorShape);
                    operatorShape.scale(1.6);
                    this.addOperatorShape(group);
                    opRenderBox = operatorShape.getFixRenderBox();
                    if (this.displayType === "inline") {
                        operatorShape.translate(5, 15);
                        opBgShape.setSize(
                            opRenderBox.width + 10,
                            opRenderBox.height + 25
                        );
                    } else {
                        operatorShape.translate(2, 5);
                        opBgShape.setSize(
                            opRenderBox.width + 4,
                            opRenderBox.height + 8
                        );
                    }
                    return group;
                }
            });
        }
    };

    /*!
     * 资源管理器
     * 负责管理资源的加载，并在资源ready之后提供Formula构造器
     */
    _p[45] = {
        value: function (require) {
            var kity = _p.r(34),
                cbList = [],
                RES_CONF = _p.r(47).resource,
                FontInstall = _p.r(24),
                Formula = _p.r(31), // 资源管理器就绪状态
                __readyState = false, // 资源管理器是否已启动
                inited = false;
            return {
                // 初始化
                ready: function (cb, options) {
                    if (!inited) {
                        inited = true;
                        init(options);
                    }
                    if (__readyState) {
                        window.setTimeout(function () {
                            cb(Formula);
                        }, 0);
                    } else {
                        cbList.push(cb);
                    }
                }
            };
            /**
             * 资源初始化
             */
            function init(options) {
                options = kity.Utils.extend({}, RES_CONF, options);
                if (!/^(https?:)?\/\//.test(options.path)) {
                    options.path = getFullPath(options.path);
                }
                new FontInstall(document, options.path).mount(complete);
            }
            function complete() {
                kity.Utils.each(cbList, function (cb) {
                    cb(Formula);
                });
            }
            function getFullPath(path) {
                var pathname = location.pathname.split("/"),
                    pathPart;
                pathname.length -= 1;
                pathname = pathname.join("/") + "/";
                pathPart = [
                    location.protocol,
                    "//",
                    location.host,
                    pathname,
                    path.replace(/^\//, "")
                ];
                return pathPart.join("");
            }
        }
    };

    /*!
     * 所有符号的基类
     * @abstract
     */
    _p[46] = {
        value: function (require) {
            var kity = _p.r(34),
                GTYPE = _p.r(6);
            return kity.createClass("SignGroup", {
                base: kity.Group,
                constructor: function () {
                    this.callBase();
                    this.box = new kity.Rect(0, 0, 0, 0);
                    this.type = GTYPE.UNKNOWN;
                    this.addShape(this.box);
                    this.zoom = 1;
                },
                setZoom: function (zoom) {
                    this.zoom = zoom;
                },
                getZoom: function () {
                    return this.zoom;
                },
                setBoxSize: function (w, h) {
                    return this.box.setSize(w, h);
                },
                setBoxWidth: function (w) {
                    return this.box.setWidth(w);
                },
                setBoxHeight: function (h) {
                    return this.box.setHeight(h);
                },
                getType: function () {
                    return this.type;
                },
                getBaseHeight: function () {
                    return this.getHeight();
                },
                getBaseWidth: function () {
                    return this.getWidth();
                },
                addedCall: function () {}
            });
        }
    };
    let fonts = [
        {
            name: "微软雅黑",
            value: "Microsoft YaHei"
        },
        { name: "华文隶书", value: "STLiti" },
        {
            name: "苹果苹方",
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
        { name: "FZBSJW", value: "FZBSJW" },
        { name: " FZBWKSFW", value: "FZBWKSFW" },
        { name: " FZBWKSJW", value: "FZBWKSJW" },
        { name: " FZCCHFW", value: "FZCCHFW" },
        { name: " FZCCHJW", value: "FZCCHJW" },
        { name: " FZCHYFW", value: "FZCHYFW" },
        { name: " FZCHYJW", value: "FZCHYJW" },
        { name: " FZCQFW", value: "FZCQFW" },
        { name: " FZCQJW", value: "FZCQJW" },
        { name: " FZCSFW", value: "FZCSFW" },
        { name: " FZCSJW", value: "FZCSJW" },
        { name: " FZCYFW", value: "FZCYFW" },
        { name: " FZCYJW", value: "FZCYJW" },
        { name: " FZDBSFW", value: "FZDBSFW" },
        { name: " FZDBSJW", value: "FZDBSJW" },
        { name: " FZDHTFW", value: "FZDHTFW" },
        { name: " FZDHTJW", value: "FZDHTJW" },
        { name: " FZFSFW", value: "FZFSFW" },
        { name: " FZFSJW", value: "FZFSJW" },
        { name: " FZGLFW", value: "FZGLFW" },
        { name: " FZGLJW", value: "FZGLJW" },
        { name: " FZH4FW", value: "FZH4FW" },
        { name: " FZHCJW", value: "FZHCJW" },
        { name: " FZHLFW", value: "FZHLFW" },
        { name: " FZHLJW", value: "FZHLJW" },
        { name: " FZHPFW", value: "FZHPFW" },
        { name: " FZHPJW", value: "FZHPJW" },
        { name: " FZHTFW", value: "FZHTFW" },
        { name: " FZHTJW", value: "FZHTJW" },
        { name: " FZJZFW", value: "FZJZFW" },
        { name: " FZJZJW", value: "FZJZJW" },
        { name: " FZKANGFW", value: "FZKANGFW" },
        { name: " FZKANGJW", value: "FZKANGJW" },
        { name: " FZKATFW", value: "FZKATFW" },
        { name: " FZKATJW", value: "FZKATJW" },
        { name: " FZKTFW", value: "FZKTFW" },
        { name: " FZKTJW", value: "FZKTJW" },
        { name: " FZL2FW", value: "FZL2FW" },
        { name: " FZL2JW", value: "FZL2JW" },
        { name: " FZLBFW", value: "FZLBFW" },
        { name: " FZLBJW", value: "FZLBJW" },
        { name: " FZLSFW", value: "FZLSFW" },
        { name: " FZLSJW", value: "FZLSJW" },
        { name: " FZLXTFW", value: "FZLXTFW" },
        { name: " FZLXTJW", value: "FZLXTJW" },
        { name: " FZMHFW", value: "FZMHFW" },
        { name: " FZMHJW", value: "FZMHJW" },
        { name: " FZNBSJW", value: "FZNBSJW" },
        { name: " FZNSTFW", value: "FZNSTFW" },
        { name: " FZNSTJW", value: "FZNSTJW" },
        { name: " FZPHFW", value: "FZPHFW" },
        { name: " FZPHTFW", value: "FZPHTFW" },
        { name: " FZPHTJW", value: "FZPHTJW" },
        { name: " FZPTYJW", value: "FZPTYJW" },
        { name: " FZPWFW", value: "FZPWFW" },
        { name: " FZPWJW", value: "FZPWJW" },
        { name: " FZQTFW", value: "FZQTFW" },
        { name: " FZQTJW", value: "FZQTJW" },
        { name: " FZS3JW", value: "FZS3JW" },
        { name: " FZSEFW", value: "FZSEFW" },
        { name: " FZSEJW", value: "FZSEJW" },
        { name: " FZSHFW", value: "FZSHFW" },
        { name: " FZSHHFW", value: "FZSHHFW" },
        { name: " FZSHHJW", value: "FZSHHJW" },
        { name: " FZSHJW", value: "FZSHJW" },
        { name: " FZSJSFW", value: "FZSJSFW" },
        { name: " FZSJSJW", value: "FZSJSJW" },
        { name: " FZSSFW", value: "FZSSFW" },
        { name: " FZSSJW", value: "FZSSJW" },
        { name: " FZSTFW", value: "FZSTFW" },
        { name: " FZSTJW", value: "FZSTJW" },
        { name: " FZSYFW", value: "FZSYFW" },
        { name: " FZSYJW", value: "FZSYJW" },
        { name: " FZSZFW", value: "FZSZFW" },
        { name: " FZSZJW", value: "FZSZJW" },
        { name: " FZTJLSFW", value: "FZTJLSFW" },
        { name: " FZTJLSJW", value: "FZTJLSJW" },
        { name: " FZWBFW", value: "FZWBFW" },
        { name: " FZWBJW", value: "FZWBJW" },
        { name: " FZXBSFW", value: "FZXBSFW" },
        { name: " FZXBSJW", value: "FZXBSJW" },
        { name: " FZXDXJW", value: "FZXDXJW" },
        { name: " FZXH1FW", value: "FZXH1FW" },
        { name: " FZXH1JW", value: "FZXH1JW" },
        { name: " FZXIANGLFW", value: "FZXIANGLFW" },
        { name: " FZXIANGLJW", value: "FZXIANGLJW" },
        { name: " FZXKFW", value: "FZXKFW" },
        { name: " FZXKJW", value: "FZXKJW" },
        { name: " FZXLFW", value: "FZXLFW" },
        { name: " FZXQFW", value: "FZXQFW" },
        { name: " FZXQJW", value: "FZXQJW" },
        { name: " FZXSHFW", value: "FZXSHFW" },
        { name: " FZXSHJW", value: "FZXSHJW" },
        { name: " FZXSSFW", value: "FZXSSFW" },
        { name: " FZXXLFW", value: "FZXXLFW" },
        { name: " FZXZTFW", value: "FZXZTFW" },
        { name: " FZY1FW", value: "FZY1FW" },
        { name: " FZY1JW", value: "FZY1JW" },
        { name: " FZY3FW", value: "FZY3FW" },
        { name: " FZY3JW", value: "FZY3JW" },
        { name: " FZY4FW", value: "FZY4FW" },
        { name: " FZY4JW", value: "FZY4JW" },
        { name: " FZYBKSFW", value: "FZYBKSFW" },
        { name: " FZYBKSJW", value: "FZYBKSJW" },
        { name: " FZYBXSFW", value: "FZYBXSFW" },
        { name: " FZYBXSJW", value: "FZYBXSJW" },
        { name: " FZYHFW", value: "FZYHFW" },
        { name: " FZYHJW", value: "FZYHJW" },
        { name: " FZYTFW", value: "FZYTFW" },
        { name: " FZYTJW", value: "FZYTJW" },
        { name: " FZYXFW", value: "FZYXFW" },
        { name: " FZYXJW", value: "FZYXJW" },
        { name: " FZZBHFW", value: "FZZBHFW" },
        { name: " FZZBHJW", value: "FZZBHJW" },
        { name: " FZZDXFW", value: "FZZDXFW" },
        { name: " FZZDXJW", value: "FZZDXJW" },
        { name: " FZZHYFW", value: "FZZHYFW" },
        { name: " FZZHYJW", value: "FZZHYJW" },
        { name: " FZZKFW", value: "FZZKFW" },
        { name: " FZZQFW", value: "FZZQFW" },
        { name: " FZZQJW", value: "FZZQJW" },
        { name: " FZZYFW", value: "FZZYFW" },
        { name: " FZZYJW", value: "FZZYJW" }
    ];
    /*!
     * 系统项目配置文件.
     */
    _p[47] = {
        value: function (require) {
            return {
                zoom: 0.66,
                font: {
                    meanline: Math.round((380 / 1e3) * 50),
                    baseline: Math.round((800 / 1e3) * 50),
                    baseHeight: 50,
                    // 系统字体列表
                    list: [
                        _p.r(29),
                        _p.r(27),
                        _p.r(28),
                        _p.r(26),
                        _p.r(30),
                        // _p.r(49),
                        // ...fonts.map((item,index) => {
                        //     return _p.r(50 + index)
                        // })
                        
                    ]
                },
                /*------------------------- 资源配置*/
                resource: {
                    path: "src/resource/"
                },
                // 函数相关配置
                func: {
                    // 上下标在函数名上下两侧的函数列表
                    "ud-script": {
                        lim: true
                    }
                }
            };
        }
    };

    /*!
     * 启动代码
     */
    _p[48] = {
        value: function (require) {
            window.kf = {
                // base
                ResourceManager: _p.r(45),
                Operator: _p.r(41),
                // expression
                Expression: _p.r(21),
                CompoundExpression: _p.r(19),
                TextExpression: _p.r(22),
                EmptyExpression: _p.r(20),
                CombinationExpression: _p.r(12),
                FunctionExpression: _p.r(14),
                FractionExpression: _p.r(13),
                IntegrationExpression: _p.r(15),
                RadicalExpression: _p.r(16),
                ScriptExpression: _p.r(17),
                SuperscriptExpression: _p.r(9),
                SubscriptExpression: _p.r(8),
                SummationExpression: _p.r(18),
                // Brackets expressoin
                BracketsExpression: _p.r(11)
            };
        }
    };

  

    
    /*!
     */
    _p[49] = {
        value: function () {
            return {
                meta: {
                    fontFamily: "fzssk",
                    // src: "KF_AMS_ROMAN.woff"
                    src:"https://etextbook-kingchannels.oss-cn-zhangjiakou.aliyuncs.com/etextbook/public/fonts/fzssk.ttf"}
            };
        }
    };

    // fonts.forEach((font, index) => {
    //     _p[50 + index] = {
    //         value: function () {
    //             return {
    //                 meta: {
    //                     fontFamily: font.value,
    //                     src: `https://etextbook-kingchannels.oss-cn-zhangjiakou.aliyuncs.com/etextbook/public/fonts/${font.value}.TTF`
    //                 }
    //             };
    //         }
    //     };
    // });
    var moduleMapping = {
        "kf.start": 48
    };

    function use(name) {
        _p.r([moduleMapping[name]]);
    }
    /**
     * 模块暴露
     */

    (function (global) {
        var oldGetRenderBox = kity.Shape.getRenderBox;

        kity.extendClass(kity.Shape, {
            getFixRenderBox: function () {
                return this.getRenderBox(this.container.container);
            },

            getTranslate: function () {
                return this.transform.translate;
            }
        });

        // build环境中才含有use
        try {
            use("kf.start");
        } catch (e) {}
    })(this);
})();
