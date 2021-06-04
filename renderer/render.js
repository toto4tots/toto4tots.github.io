"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var Bitmap = /** @class */ (function () {
    function Bitmap(width, height, flipped) {
        if (flipped === void 0) { flipped = false; }
        this.data = new Uint32Array(width * height);
        this.width = width;
        this.height = height;
        this.flipped = flipped;
    }
    /**
     * Sets the color of specified pixel
     * @param coord coordinate of the pixel
     * @param color rgb values
     */
    Bitmap.prototype.set = function (coord, color, ignoreOutOfBounds) {
        if (ignoreOutOfBounds === void 0) { ignoreOutOfBounds = false; }
        // console.log("SETTING", color, colorToInt(color));
        var _a = __read(coord, 2), x = _a[0], y0 = _a[1];
        var y = this.flipped ? this.height - 1 - y0 : y0;
        if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
            var i = (y | 0) * this.width + (x | 0);
            this.data[i] = colorToInt(color);
        }
        else if (!ignoreOutOfBounds) {
            throw new Error("Out of bounds: (" + x + ", " + y + ")");
        }
    };
    Bitmap.prototype.getColor = function (coord, ignore) {
        if (ignore === void 0) { ignore = false; }
        var _a = __read(coord, 2), x = _a[0], y0 = _a[1];
        var y = this.flipped ? this.height - 1 - y0 : y0;
        if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
            var i = (y | 0) * this.width + (x | 0);
            return intToColor(this.data[i]);
        }
        else if (!ignore) {
            throw new Error("Out of bounds: (" + x + ", " + y + ")");
        }
    };
    Bitmap.prototype.getBuffer = function () {
        var e_1, _a;
        var startOfPixelData = 14 + 40;
        var fileSize = startOfPixelData + 4 * this.width * this.height;
        var buffer = new Buffer2(fileSize);
        // File header
        buffer.int16(0x4d42); // magic number BM
        buffer.int32(fileSize);
        buffer.int16(0); // Reserved 1
        buffer.int16(0); // Reversed 2
        buffer.int32(startOfPixelData);
        // DIB header
        buffer.int32(40); // dib header size
        buffer.int32(this.width);
        buffer.int32(this.height);
        buffer.int16(1); // color planes
        buffer.int16(32); // bits per pixel
        buffer.int32(0); // compression
        buffer.int32(0); // image size (important for compresssion)
        buffer.int32(2835); // horizontal resolution
        buffer.int32(2835); // vertical resolution
        buffer.int32(0); // number of colors in color palette
        buffer.int32(0); // num of impt colors used
        try {
            for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                var x = _c.value;
                buffer.uint32(x);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return buffer;
    };
    /**
     * Saves the current data to bitmap file
     * @param path name of bitmap file to save to
     */
    Bitmap.prototype.write = function (path) {
        var buffer = this.getBuffer();
        return buffer;
    };
    return Bitmap;
}());
var Buffer2 = /** @class */ (function () {
    function Buffer2(size) {
        this.buffer = new ArrayBuffer(size);
        this.view = new DataView(this.buffer);
        this.i = 0;
    }
    Buffer2.prototype.int16 = function (x) {
        this.view.setInt16(this.i, x, true);
        this.i += 2;
    };
    Buffer2.prototype.int32 = function (x) {
        this.view.setInt32(this.i, x, true);
        this.i += 4;
    };
    Buffer2.prototype.uint32 = function (x) {
        this.view.setUint32(this.i, x, true);
        this.i += 4;
    };
    return Buffer2;
}());
function channel(ratio) {
    return Math.min(255, (256 * ratio) | 0);
}
function colorToInt(color) {
    var _a = __read(color, 3), r = _a[0], g = _a[1], b = _a[2];
    // return 0xFFFFFFFF;
    return ((channel(b) << 0) |
        (channel(g) << 8) |
        (channel(r) << 16) |
        (channel(1) << 24));
}
function invertChannel(num) {
    return num === 255 ? 1 : num / 256;
}
function intToColor(num) {
    var b = invertChannel(num >> 0 & 0xFF);
    var g = invertChannel(num >> 8 & 0xFF);
    var r = invertChannel(num >> 16 & 0xFF);
    // const g = (num >> 8 & 0xFF) === 255 ? 1 : (num >> 8 & 0xFF) / 256;
    // const r = (num >> 16 & 0xFF) === 255 ? 1 : (num >> 16 & 0xFF) / 256;
    // const a = (num >> 24 & 0xFF) === 255 ? 1 : (num >> 24 & 0xFF) / 256;
    return [r, g, b];
}
function intersections() {
    var ret = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ret[_i] = arguments[_i];
    }
    return ret;
}
function hit(intersects) {
    var smallest = null;
    for (var i = 0; i < intersects.length; i++) {
        var temp = intersects[i].t;
        if (temp < 0) {
            continue;
        }
        smallest = smallest === null || temp < smallest.t ? intersects[i] : smallest;
    }
    return smallest;
}
var Intersection = /** @class */ (function () {
    function Intersection(t, object) {
        this.t = t;
        this.object = object;
    }
    return Intersection;
}());
function newTuple(x, y, z, w) {
    return new Matrix(1, new Float64Array([x, y, z, w]));
}
function newPoint(x, y, z) {
    return newTuple(x, y, z, 1);
}
function newVector(x, y, z) {
    return newTuple(x, y, z, 0);
}
function newColor(r, g, b) {
    return Matrix.of([[r], [g], [b]]);
}
function normalize(v) {
    return v.scale(1.0 / v.magnitude());
}
function minor(M, r, c) {
    return M.submatrix(r, c).determinant();
}
function translation(x, y, z) {
    var M = identityMatrix();
    M._set(0, 3, x);
    M._set(1, 3, y);
    M._set(2, 3, z);
    return M;
}
function scaling(x, y, z) {
    var M = identityMatrix();
    M._set(0, 0, x);
    M._set(1, 1, y);
    M._set(2, 2, z);
    return M;
}
function rotateX(r) {
    var ret = identityMatrix();
    ret._set(1, 1, Math.cos(r));
    ret._set(1, 2, -Math.sin(r));
    ret._set(2, 1, Math.sin(r));
    ret._set(2, 2, Math.cos(r));
    return ret;
}
function rotateY(r) {
    var ret = identityMatrix();
    ret._set(0, 0, Math.cos(r));
    ret._set(2, 0, -Math.sin(r));
    ret._set(0, 2, Math.sin(r));
    ret._set(2, 2, Math.cos(r));
    return ret;
}
function rotateZ(r) {
    var ret = identityMatrix();
    ret._set(0, 0, Math.cos(r));
    ret._set(0, 1, -Math.sin(r));
    ret._set(1, 0, Math.sin(r));
    ret._set(1, 1, Math.cos(r));
    return ret;
}
function shearing(xy, xz, yx, yz, zx, zy) {
    var ret = identityMatrix();
    ret._set(0, 1, xy);
    ret._set(0, 2, xz);
    ret._set(1, 0, yx);
    ret._set(1, 2, yz);
    ret._set(2, 0, zx);
    ret._set(2, 1, zy);
    return ret;
}
function assertAppxNumEqual(num1, num2) {
    if (!closeEnough(num1, num2)) {
        throw new Error("Not approx equal.\n This " + num1 + ", Other " + num2 + "}");
    }
}
/**
 *
 * @param M 3 by 3 matrix
 * @param r row
 * @param c col
 */
function cofactor(M, r, c) {
    var sign = (r + c) % 2 === 0 ? 1 : -1;
    switch (M.R) {
        case 2:
            return sign * M.get(1 - r, 1 - c);
        case 3: {
            var arr = [];
            for (var i = 0; i < M.R; i++) {
                for (var j = 0; j < M.C; j++) {
                    if (i !== r && j !== c) {
                        arr.push(M.get(i, j));
                    }
                }
            }
            {
                var _a = __read(arr, 4), a = _a[0], b = _a[1], c_1 = _a[2], d = _a[3];
                return sign * (a * d - b * c_1);
            }
        }
        case 4: {
            var arr = [];
            for (var i = 0; i < M.R; i++) {
                for (var j = 0; j < M.C; j++) {
                    if (i !== r && j !== c) {
                        arr.push(M.get(i, j));
                    }
                }
            }
            {
                var _b = __read(arr, 9), a = _b[0], b = _b[1], c_2 = _b[2], d = _b[3], e = _b[4], f = _b[5], g = _b[6], h = _b[7], k = _b[8];
                return sign * det3x3(a, b, c_2, d, e, f, g, h, k);
            }
        }
    }
    return sign * minor(M, r, c);
}
function det3x3(a, b, c, d, e, f, g, h, k) {
    return (a * (e * k - f * h)
        - b * (d * k - f * g)
        + c * (d * h - e * g));
}
function identityMatrix(size) {
    if (size === void 0) { size = 4; }
    var data = new Float64Array(size * size);
    data[0] = 1;
    var curr = 0;
    for (var i = 0; i < size; i++) {
        data[curr] = 1;
        curr += size + 1;
    }
    return new Matrix(size, data);
}
/**
 *
 * @param M Matrix of dimension 2x2 only
 */
function determinant2x2(M) {
    if (M.R !== M.C) {
        throw new Error("Row and column dimensions are not the same");
    }
    if (M.R > 2 || M.C > 2) {
        throw new Error("Invalid dimensions for 2x2 determinant. Row, Col: " + M.R + ", " + M.C);
    }
    var total = 0;
    total += M.get(0, 0) * M.get(1, 1) - M.get(0, 1) * M.get(1, 0);
    return total;
}
function closeEnough(a, b) {
    return Math.abs(a - b) < Math.pow(10, -5);
}
var Matrix = /** @class */ (function () {
    function Matrix(C, data) {
        if (data.length % C !== 0) {
            throw new Error();
        }
        this.C = C;
        this.R = data.length / C;
        this._data = data;
    }
    Matrix.of = function (rows) {
        var _a;
        var C = rows[0].length;
        var data = Float64Array.from((_a = []).concat.apply(_a, __spread(rows)));
        return new Matrix(C, data);
    };
    Matrix.prototype.get = function (r, c) {
        return this._data[r * this.C + c];
    };
    Object.defineProperty(Matrix.prototype, "x", {
        get: function () {
            return this.get(0, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "y", {
        get: function () {
            return this.get(1, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "z", {
        get: function () {
            return this.get(2, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "w", {
        get: function () {
            return this.get(3, 0);
        },
        set: function (value) {
            this._set(3, 0, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "red", {
        get: function () {
            return this.get(0, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "green", {
        get: function () {
            return this.get(1, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "blue", {
        get: function () {
            return this.get(2, 0);
        },
        enumerable: false,
        configurable: true
    });
    Matrix.prototype[Symbol.iterator] = function () {
        return this._data[Symbol.iterator]();
    };
    Matrix.prototype._set = function (r, c, value) {
        this._data[r * this.C + c] = value;
    };
    Matrix.prototype.toString = function () {
        var s = "Matrix.of([";
        for (var r = 0; r < this.R; r++) {
            if (r > 0) {
                s += ", ";
            }
            s += "[";
            for (var c = 0; c < this.C; c++) {
                if (c > 0) {
                    s += ", ";
                }
                s += this.get(r, c);
            }
            s += "]";
        }
        s += "])";
        return s;
    };
    Matrix.prototype.fromDimensions = function (R, C) {
        return new Matrix(C, new Float64Array(R * C));
    };
    Matrix.prototype.equals = function (other) {
        if (this.R !== other.R || this.C !== other.C) {
            return false;
        }
        var len = this._data.length;
        for (var i = 0; i < len; i++) {
            if (this._data[i] !== other._data[i]) {
                return false;
            }
        }
        return true;
    };
    Matrix.prototype.isTuple = function () {
        return this.R === 4 && this.C === 1;
    };
    Matrix.prototype.isPoint = function () {
        return this.isTuple() && this._data[3] === 1;
    };
    Matrix.prototype.isVector = function () {
        return this.isTuple() && Math.abs(this._data[3]) < 1e-10;
    };
    Matrix.prototype.magnitude = function () {
        var total = 0;
        var len = this._data.length;
        for (var i = 0; i < len; i++) {
            total += this._data[i] * this._data[i] * 1.0;
        }
        return Math.sqrt(total);
    };
    Matrix.prototype._pairwise = function (other, f) {
        var len = this._data.length;
        if (this.R !== other.R || this.C !== other.C) {
            throw new Error("Dimensions don't match");
        }
        var result = new Float64Array(len);
        for (var i = 0; i < len; i++) {
            result[i] = f(this._data[i], other._data[i]);
        }
        return new Matrix(this.C, result);
    };
    Matrix.prototype.dot = function (other) {
        if (!this.isTuple() || !other.isTuple()) {
            throw new Error("Not a tuple");
        }
        var temp = this.hadamard(other);
        var len = this._data.length;
        var result = 0;
        for (var i = 0; i < len; i++) {
            result += temp._data[i];
        }
        return result;
    };
    Matrix.prototype.cross = function (b) {
        if (!this.isVector() || !b.isVector()) {
            console.log("" + this);
            throw new Error("Invalid cross product: Not a vector");
        }
        var a = this;
        return newVector(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    };
    Matrix.prototype.multiply = function (other) {
        if (this.C !== other.R) {
            console.log("THIS C", this.C, "OTHER R", other.R);
            throw new Error("Invalid dimensions for multiplication " + (this, other));
        }
        var newR = this.R;
        var newC = other.C;
        var ret = this.fromDimensions(newR, newC);
        for (var r = 0; r < newR; r++) {
            for (var c = 0; c < newC; c++) {
                var total = 0;
                for (var i = 0; i < this.C; i++) {
                    total += (this.get(r, i) * other.get(i, c));
                }
                ret._set(r, c, total);
            }
        }
        return ret;
    };
    Matrix.prototype.transpose = function () {
        var ret = new Matrix(this.C, new Float64Array(this.R * this.C));
        for (var c = 0; c < this.C; c++) {
            for (var r = 0; r < this.R; r++) {
                ret._set(c, r, this.get(r, c));
            }
        }
        return ret;
    };
    Matrix.prototype.hadamard = function (other) {
        return this._pairwise(other, function (a, b) { return a * b; });
    };
    Matrix.prototype.add = function (other) {
        return this._pairwise(other, function (a, b) { return a + b; });
    };
    Matrix.prototype.subtract = function (other) {
        return this._pairwise(other, function (a, b) { return a - b; });
    };
    Matrix.prototype.negate = function () {
        return this.scale(-1);
    };
    Matrix.prototype.scale = function (num) {
        var len = this._data.length;
        var result = new Float64Array(len);
        for (var i = 0; i < len; i++) {
            result[i] = this._data[i] * num;
        }
        return new Matrix(this.C, result);
    };
    Matrix.prototype.appxEqual = function (other) {
        if (this.R !== other.R || this.C !== other.C) {
            return false;
        }
        var len = this._data.length;
        for (var i = 0; i < len; i++) {
            if (!closeEnough(this._data[i], other._data[i])) {
                console.log("ERROR", this._data[i], other._data[i]);
                console.log("ERROR MARGIN", Math.abs(this._data[i] - other._data[i]));
                return false;
            }
        }
        return true;
    };
    Matrix.prototype.assertAppxEqual = function (other) {
        if (!this.appxEqual(other)) {
            throw new Error("Not approx equal.\n This " + this + ", Other " + other + "}");
        }
    };
    Matrix.prototype.submatrix = function (ignoreR, ignoreC) {
        var newDim = this.C - 1;
        var data = new Float64Array(newDim * newDim);
        var i = 0;
        for (var r = 0; r < this.R; r++) {
            for (var c = 0; c < this.C; c++) {
                if (r === ignoreR) {
                    break;
                }
                else if (c === ignoreC) {
                    continue;
                }
                data[i] = this.get(r, c);
                i += 1;
            }
        }
        return new Matrix(newDim, data);
    };
    Matrix.prototype.determinant = function () {
        if (this.R !== this.C) {
            throw new Error("Cannot find determinant of non-square matrix");
        }
        switch (this.R) {
            case 1:
                return this._data[0];
            case 2: {
                var _a = __read(this._data, 4), a11 = _a[0], a12 = _a[1], a21 = _a[2], a22 = _a[3];
                return a11 * a22 - a12 * a21;
            }
            case 3: {
                var _b = __read(this._data, 9), a = _b[0], b = _b[1], c = _b[2], d = _b[3], e = _b[4], f = _b[5], g = _b[6], h = _b[7], k = _b[8];
                return det3x3(a, b, c, d, e, f, g, h, k);
            }
            case 4: {
                var _c = __read(this._data, 16), a11 = _c[0], a12 = _c[1], a13 = _c[2], a14 = _c[3], a21 = _c[4], a22 = _c[5], a23 = _c[6], a24 = _c[7], a31 = _c[8], a32 = _c[9], a33 = _c[10], a34 = _c[11], a41 = _c[12], a42 = _c[13], a43 = _c[14], a44 = _c[15];
                return (a11 * a22 * a33 * a44
                    + a11 * a23 * a34 * a42
                    + a11 * a24 * a32 * a43
                    - a11 * a24 * a33 * a42
                    - a11 * a23 * a32 * a44
                    - a11 * a22 * a34 * a43
                    - a12 * a21 * a33 * a44
                    - a13 * a21 * a34 * a42
                    - a14 * a21 * a32 * a43
                    + a14 * a21 * a33 * a42
                    + a13 * a21 * a32 * a44
                    + a12 * a21 * a34 * a43
                    + a12 * a23 * a31 * a44
                    + a13 * a24 * a31 * a42
                    + a14 * a22 * a31 * a43
                    - a14 * a23 * a31 * a42
                    - a13 * a22 * a31 * a44
                    - a12 * a24 * a31 * a43
                    - a12 * a23 * a34 * a41
                    - a13 * a24 * a32 * a41
                    - a14 * a22 * a33 * a41
                    + a14 * a23 * a32 * a41
                    + a13 * a22 * a34 * a41
                    + a12 * a24 * a33 * a41);
            }
        }
        if (this.R === 2) {
            return determinant2x2(this);
        }
        var total = 0;
        for (var c = 0; c < this.C; c++) {
            total += cofactor(this, 0, c) * this.get(0, c);
        }
        return total;
    };
    Matrix.prototype.inverse = function () {
        var det = this.determinant();
        if (det === 0) {
            throw new Error("Not invertible");
        }
        var M2 = new Matrix(this.C, new Float64Array(this.R * this.C));
        for (var r = 0; r < this.R; r++) {
            for (var c = 0; c < this.C; c++) {
                M2._set(c, r, cofactor(this, r, c) / det);
            }
        }
        return M2;
    };
    return Matrix;
}());
function read(fileName) {
    var fs = require("fs");
    var text = fs.readFileSync("/Users/toto4tot/git/ray/src/objFiles/" + fileName + ".obj").toString('utf-8');
    var textByLine = text.split("\n");
    return textByLine;
}
function getTrianglesFromString(data) {
    var textByLine = data.split("\n");
    var vertices = [];
    var triangles = [];
    for (var i = 0; i < textByLine.length - 1; i++) {
        var line = textByLine[i].split(/ +/g);
        if (line[0] === "v") {
            var nums = line.map(parseFloat);
            vertices.push(newPoint(nums[1], nums[2], nums[3]));
        }
        else if (line[0] === "f") {
            var _a = __read(line.map(function (i) { return +i - 1; }), 4), i0 = _a[0], i1 = _a[1], i2 = _a[2], i3 = _a[3];
            var temp = newTriangle(vertices[i1], vertices[i2], vertices[i3]);
            triangles.push(temp);
        }
    }
    return triangles;
}
function getTriangles(fileName) {
    var textByLine = read(fileName);
    var vertices = [];
    var triangles = [];
    for (var i = 0; i < textByLine.length - 1; i++) {
        var line = textByLine[i].split(" ");
        if (line[0] === "v") {
            var pt = newPoint(line[1], line[2], line[3]);
            vertices.push(newPoint(line[1], line[2], line[3]));
        }
        else if (line[0] === "f") {
            var _a = __read(line.map(function (i) { return +i - 1; }), 4), i0 = _a[0], i1 = _a[1], i2 = _a[2], i3 = _a[3];
            var temp = newTriangle(vertices[i1], vertices[i2], vertices[i3]);
            triangles.push(temp);
        }
    }
    return triangles;
}
function main(fileName) {
    var triangles = getTriangles(fileName);
    var worldLight = new PointLight(newPoint(-10, 10, -10), newColor(1, 1, 1));
    var world = new World(worldLight, triangles);
    var camera = newCamera(100, 100, Math.PI / 3);
    camera.transform = viewTransform(newPoint(0, 1.5, -5), newPoint(0, 1, 0), newVector(0, 1, 0));
    var canvas = camera.render(world);
    canvas.write("out/" + fileName + ".bmp");
}
function create(data, width, height, lightCoord, f) {
    var triangles = getTrianglesFromString(data);
    var worldLight = new PointLight(newPoint(lightCoord[0], lightCoord[1], -10), newColor(1, 1, 1));
    var world = new World(worldLight, triangles);
    var camera = newCamera(width, height, Math.PI / 3);
    camera.transform = viewTransform(newPoint(0, 1.5, -5), newPoint(0, 1, 0), newVector(0, 1, 0));
    // const canvas = camera.render(world);
    camera.asyncRender(world, f);
    // return canvas;
}
// main("teapot");
function tick(env, proj) {
    var position = proj.pos.add(proj.vel);
    var velocity = proj.vel.add(env.gravity.add(env.wind));
    return new Projectile(position, velocity);
}
var Projectile = /** @class */ (function () {
    function Projectile(pos, vel) {
        if (!pos.isPoint() || !vel.isVector()) {
            throw new Error("Projectile Invalid Type");
        }
        this.pos = pos;
        this.vel = vel;
    }
    return Projectile;
}());
var Environment = /** @class */ (function () {
    function Environment(gravity, wind) {
        if (!gravity.isVector() || !wind.isVector()) {
            throw new Error("Environment Invalid Type");
        }
        this.gravity = gravity;
        this.wind = wind;
    }
    return Environment;
}());
function intersect(s, r) {
    return s.intersect(r);
}
var Ray = /** @class */ (function () {
    function Ray(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }
    Ray.prototype.position = function (t) {
        return this.origin.add(this.direction.scale(t));
    };
    Ray.prototype.transform = function (tran) {
        if (tran === void 0) { tran = identityMatrix(); }
        return new Ray(tran.multiply(this.origin), tran.multiply(this.direction));
    };
    return Ray;
}());
function newMaterial() {
    return new Material(newColor(1, 1, 1), 0.1, 0.9, 0.9, 200.0);
}
function lighting(material, light, point, eyev, normalv) {
    var effectiveColor = material.color.hadamard(light.intensity);
    var lightv = normalize(light.position.subtract(point));
    var ambient = effectiveColor.scale(material.ambient);
    var lightDotNormal = lightv.dot(normalv);
    var diffuse;
    var specular;
    if (lightDotNormal <= 0) {
        diffuse = newColor(0, 0, 0);
        specular = newColor(0, 0, 0);
    }
    else {
        diffuse = effectiveColor.scale(material.diffuse * lightDotNormal);
        var reflectv = reflect(lightv.scale(-1), normalv);
        var reflectDotEye = reflectv.dot(eyev);
        if (reflectDotEye <= 0) {
            specular = newColor(0, 0, 0);
        }
        else {
            var factor = Math.pow(reflectDotEye, material.shininess);
            specular = light.intensity.scale(material.specular * factor);
        }
    }
    return ambient.add(diffuse.add(specular));
}
var Material = /** @class */ (function () {
    function Material(c, a, d, spec, shin) {
        // must only be + floats
        this.color = c;
        this.ambient = a;
        this.specular = spec;
        this.diffuse = d;
        this.shininess = shin;
    }
    return Material;
}());
var PointLight = /** @class */ (function () {
    function PointLight(pos, intensity) {
        this.position = pos;
        this.intensity = intensity;
    }
    return PointLight;
}());
var Shape = /** @class */ (function () {
    function Shape() {
        this.material = newMaterial();
    }
    return Shape;
}());
function newTriangle(p1, p2, p3) {
    return new Triangle(p1, p2, p3);
}
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(p1, p2, p3) {
        var _this = _super.call(this) || this;
        _this.p1 = p1;
        _this.p2 = p2;
        _this.p3 = p3;
        _this.e1 = p2.subtract(p1);
        _this.e2 = p3.subtract(p1);
        _this.normal = normalize(_this.e2.cross(_this.e1));
        return _this;
    }
    // localNormalAt
    Triangle.prototype.normalAt = function (p) {
        return this.normal;
    };
    // localIntersect
    Triangle.prototype.intersect = function (ray) {
        var dircrosse2 = ray.direction.cross(this.e2);
        var det = this.e1.dot(dircrosse2);
        if (closeEnough(Math.abs(det), 0)) {
            return intersections();
        }
        var f = 1.0 / det;
        var p1ToOrigin = ray.origin.subtract(this.p1);
        var u = f * p1ToOrigin.dot(dircrosse2);
        if (u < 0 || u > 1) {
            return intersections();
        }
        var origincrosse1 = p1ToOrigin.cross(this.e1);
        var v = f * ray.direction.dot(origincrosse1);
        if (v < 0 || (u + v) > 1) {
            return intersections();
        }
        var t = f * this.e2.dot(origincrosse1);
        var i = new Intersection(t, this);
        return intersections(i);
    };
    return Triangle;
}(Shape));
function newSphere() {
    return new Sphere();
}
function reflect(entering, normal) {
    return entering.subtract(normal.scale(2 * entering.dot(normal)));
}
function discriminant(s, r) {
    var stor = r.origin.add(newPoint(0, 0, 0).scale(-1));
    var a = r.direction.dot(r.direction);
    var b = (r.direction.dot(stor)) * 2;
    var c = stor.dot(stor) - 1;
    return b * b - 4 * a * c; // 4
}
var Sphere = /** @class */ (function (_super) {
    __extends(Sphere, _super);
    function Sphere() {
        var _this = _super.call(this) || this;
        _this.transform = identityMatrix();
        return _this;
    }
    Sphere.prototype.setTransform = function (t) {
        this.transform = t;
    };
    Sphere.prototype.normalAt = function (worldP) {
        var objP = this.transform.inverse().multiply(worldP);
        var objNorm = objP.subtract(newPoint(0, 0, 0));
        var worldNorm = this.transform.inverse().transpose().multiply(objNorm);
        worldNorm.w = 0;
        return normalize(worldNorm);
    };
    Sphere.prototype.intersect = function (r) {
        var s = this;
        var r2 = r.transform(s.transform.inverse());
        var d = discriminant(s, r2);
        if (d < 0) {
            return intersections();
        }
        var stor = r2.origin.add(newPoint(0, 0, 0).scale(-1));
        var a = r2.direction.dot(r2.direction);
        var b = (r2.direction.dot(stor)) * 2;
        var i1 = new Intersection((-b - Math.sqrt(d)) / (2 * a), s);
        var i2 = new Intersection((-b + Math.sqrt(d)) / (2 * a), s);
        return intersections(i1, i2);
    };
    return Sphere;
}(Shape));
function defaultWorld() {
    var light = new PointLight(newPoint(-10, 10, -10), newColor(1, 1, 1));
    var s1 = newSphere();
    s1.material.color = newColor(0.8, 1.0, 0.6);
    s1.material.diffuse = 0.7;
    s1.material.specular = 0.2;
    var s2 = newSphere();
    s2.transform = scaling(0.5, 0.5, 0.5);
    var objects = [s1, s2];
    // const lightSources = [light];
    return new World(light, objects);
}
function intersectWorld(w, r) {
    var ret = intersections();
    for (var i = 0; i < w.objects.length; i++) {
        var temp = intersect(w.objects[i], r);
        ret.push.apply(ret, __spread(temp));
    }
    ret.sort(function (a, b) { return a.t - b.t; });
    return ret;
}
function prepareComputations(i, r) {
    var comps = new Computations();
    comps.t = i.t;
    comps.object = i.object;
    comps.point = r.position(comps.t);
    comps.eyev = r.direction.scale(-1);
    comps.normalv = comps.object.normalAt(comps.point);
    if (comps.normalv.dot(comps.eyev) < 0) {
        comps.inside = true;
        comps.normalv = comps.normalv.scale(-1);
    }
    return comps;
}
function shadeHit(world, comps) {
    return lighting(comps.object.material, world.light, comps.point, comps.eyev, comps.normalv);
}
function colorAt(w, r) {
    var intersects = intersectWorld(w, r);
    var h = hit(intersects);
    if (!h) {
        return newColor(0, 0, 0);
    }
    var comps = prepareComputations(h, r);
    return shadeHit(w, comps);
}
function viewTransform(from, to, up) {
    if (!from.isPoint() || !to.isPoint()) {
        throw new Error("viewTransform Error: Not a point");
    }
    if (!up.isVector()) {
        throw new Error("viewTransform Error: Not a vector");
    }
    var forward = normalize(to.subtract(from));
    var upn = normalize(up);
    var left = forward.cross(upn);
    var trueUp = left.cross(forward);
    var orientation = Matrix.of([
        [left.x, left.y, left.z, 0],
        [trueUp.x, trueUp.y, trueUp.z, 0],
        [-forward.x, -forward.y, -forward.z, 0],
        [0, 0, 0, 1]
    ]);
    return orientation.multiply(translation(-from.x, -from.y, -from.z));
}
function newCamera(hsize, vsize, fieldOfView) {
    var transform = identityMatrix();
    return new Camera(hsize, vsize, fieldOfView, transform);
}
var World = /** @class */ (function () {
    function World(lightSources, objects) {
        this.light = lightSources;
        this.objects = objects;
    }
    return World;
}());
/**
 * default orientation
 * from: (0, 0, 0)
 * to: (0, 0, -1)
 * up: (0, 1, 0)
 */
var Camera = /** @class */ (function () {
    function Camera(hsize, vsize, fieldOfView, transform) {
        this.hsize = hsize;
        this.vsize = vsize;
        this.fieldOfView = fieldOfView;
        this.transform = transform;
        var halfView = Math.tan(this.fieldOfView / 2);
        var aspect = this.hsize / this.vsize;
        if (aspect >= 1) {
            this.halfWidth = halfView;
            this.halfHeight = halfView / aspect;
        }
        else {
            this.halfWidth = halfView * aspect;
            this.halfHeight = halfView;
        }
        this.pixelSize = (this.halfWidth * 2) / this.hsize;
    }
    Camera.prototype.rayForPixel = function (px, py) {
        var xoffset = (px + 0.5) * this.pixelSize;
        var yoffset = (py + 0.5) * this.pixelSize;
        var worldX = this.halfWidth - xoffset;
        var worldY = this.halfHeight - yoffset;
        var pixel = this.transform.inverse().multiply(newPoint(worldX, worldY, -1));
        var origin = this.transform.inverse().multiply(newPoint(0, 0, 0));
        var direction = normalize(pixel.subtract(origin));
        return new Ray(origin, direction);
    };
    Camera.prototype.render = function (world) {
        var image = new Bitmap(this.hsize, this.vsize, true);
        this.renderPixels(world, function (x, y, color) {
            image.set([x, y], [color.x, color.y, color.z], true);
        });
        return image;
    };
    Camera.prototype.renderPixels = function (world, f) {
        for (var y = 0; y < this.vsize; y++) {
            for (var x = 0; x < this.hsize; x++) {
                var ray = this.rayForPixel(x, y);
                var color = colorAt(world, ray);
                f(x, y, color);
            }
        }
    };
    Camera.prototype.asyncRender = function (world, f) {
        return __awaiter(this, void 0, void 0, function () {
            var lastAwaitTime, pixelsRendered, y, x, ray, color;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lastAwaitTime = Date.now();
                        pixelsRendered = 0;
                        y = 0;
                        _a.label = 1;
                    case 1:
                        if (!(y < this.vsize)) return [3 /*break*/, 6];
                        x = 0;
                        _a.label = 2;
                    case 2:
                        if (!(x < this.hsize)) return [3 /*break*/, 5];
                        ray = this.rayForPixel(x, y);
                        color = colorAt(world, ray);
                        f(x, y, color);
                        pixelsRendered++;
                        if (!(Date.now() - lastAwaitTime >= 100)) return [3 /*break*/, 4];
                        return [4 /*yield*/, awaitHelper()];
                    case 3:
                        _a.sent();
                        lastAwaitTime = Date.now();
                        pixelsRendered = 0;
                        _a.label = 4;
                    case 4:
                        x++;
                        return [3 /*break*/, 2];
                    case 5:
                        y++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Camera;
}());
function awaitHelper() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, 0);
    });
}
var Computations = /** @class */ (function () {
    function Computations() {
        this.t = 0;
        this.object = newSphere();
        this.point = identityMatrix();
        this.eyev = identityMatrix();
        this.normalv = identityMatrix();
        this.inside = false;
    }
    return Computations;
}());
//# sourceMappingURL=web.js.map