var globalObject = "undefined" != typeof global ? global : "undefined" != typeof window ? window : this,
    babylonDependency = globalObject && globalObject.BABYLON || BABYLON || "undefined" != typeof require && require("babylonjs"),
    BABYLON = babylonDependency,
    __decorate = this && this.__decorate || function(t, e, i, r) {
        var s, n = arguments.length,
            o = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, r);
        else
            for (var h = t.length - 1; h >= 0; h--)(s = t[h]) && (o = (n < 3 ? s(o) : n > 3 ? s(e, i, o) : s(e, i)) || o);
        return n > 3 && o && Object.defineProperty(e, i, o), o
    },
    __extends = this && this.__extends || (function() {
        var t = Object.setPrototypeOf || { __proto__: [] }
        instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]) };
        return function(e, i) {
            function r() { this.constructor = e }
            t(e, i), e.prototype = null === i ? Object.create(i) : (r.prototype = i.prototype, new r)
        }
    })(),
    BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function(i) {
            function r(r, s, n, o, h, a) { void 0 === s && (s = 0), void 0 === n && (n = 0), void 0 === h && (h = !1), void 0 === a && (a = t.Texture.NEAREST_SAMPLINGMODE); var u = i.call(this, r, { width: s, height: n }, o, h, a, t.Engine.TEXTUREFORMAT_RGBA) || this; return u._isDirty = !1, u._rootContainer = new e.Container("root"), u._linkedControls = new Array, u._isFullscreen = !1, u._fullscreenViewport = new t.Viewport(0, 0, 1, 1), u._idealWidth = 0, u._idealHeight = 0, u._renderAtIdealSize = !1, u._blockNextFocusCheck = !1, (o = u.getScene()) && u._texture ? (u._renderObserver = o.onBeforeCameraRenderObservable.add((function(t) { return u._checkUpdate(t) })), u._preKeyboardObserver = o.onPreKeyboardObservable.add((function(e) { u._focusedControl && (e.type === t.KeyboardEventTypes.KEYDOWN && u._focusedControl.processKeyboard(e.event), e.skipOnPointerObservable = !0) })), u._rootContainer._link(null, u), u.hasAlpha = !0, s && n || (u._resizeObserver = o.getEngine().onResizeObservable.add((function() { return u._onResize() })), u._onResize()), u._texture.isReady = !0, u) : u }
            return __extends(r, i), Object.defineProperty(r.prototype, "background", { get: function() { return this._background }, set: function(t) { this._background !== t && (this._background = t, this.markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "idealWidth", { get: function() { return this._idealWidth }, set: function(t) { this._idealWidth !== t && (this._idealWidth = t, this.markAsDirty(), this._rootContainer._markAllAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "idealHeight", { get: function() { return this._idealHeight }, set: function(t) { this._idealHeight !== t && (this._idealHeight = t, this.markAsDirty(), this._rootContainer._markAllAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "renderAtIdealSize", { get: function() { return this._renderAtIdealSize }, set: function(t) { this._renderAtIdealSize !== t && (this._renderAtIdealSize = t, this._onResize()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "layer", { get: function() { return this._layerToDispose }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "rootContainer", { get: function() { return this._rootContainer }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "focusedControl", { get: function() { return this._focusedControl }, set: function(t) { this._focusedControl != t && (this._focusedControl && this._focusedControl.onBlur(), t && t.onFocus(), this._focusedControl = t) }, enumerable: !0, configurable: !0 }), r.prototype.executeOnAllControls = function(t, e) {
                e || (e = this._rootContainer);
                for (var i = 0, r = e.children; i < r.length; i++) {
                    var s = r[i];
                    s.children ? this.executeOnAllControls(t, s) : t(s)
                }
            }, r.prototype.markAsDirty = function() { this._isDirty = !0 }, r.prototype.addControl = function(t) { return this._rootContainer.addControl(t), this }, r.prototype.removeControl = function(t) { return this._rootContainer.removeControl(t), this }, r.prototype.dispose = function() {
                var t = this.getScene();
                t && (t.onBeforeCameraRenderObservable.remove(this._renderObserver), this._resizeObserver && t.getEngine().onResizeObservable.remove(this._resizeObserver), this._pointerMoveObserver && t.onPrePointerObservable.remove(this._pointerMoveObserver), this._pointerObserver && t.onPointerObservable.remove(this._pointerObserver), this._canvasPointerOutObserver && t.getEngine().onCanvasPointerOutObservable.remove(this._canvasPointerOutObserver), this._layerToDispose && (this._layerToDispose.texture = null, this._layerToDispose.dispose(), this._layerToDispose = null), this._rootContainer.dispose(), i.prototype.dispose.call(this))
            }, r.prototype._onResize = function() {
                var t = this.getScene();
                if (t) {
                    var e = t.getEngine(),
                        i = this.getSize(),
                        r = e.getRenderWidth(),
                        s = e.getRenderHeight();
                    this._renderAtIdealSize && (this._idealWidth ? (s = s * this._idealWidth / r, r = this._idealWidth) : this._idealHeight && (r = r * this._idealHeight / s, s = this._idealHeight)), i.width === r && i.height === s || (this.scaleTo(r, s), this.markAsDirty(), (this._idealWidth || this._idealHeight) && this._rootContainer._markAllAsDirty())
                }
            }, r.prototype._getGlobalViewport = function(t) { var e = t.getEngine(); return this._fullscreenViewport.toGlobal(e.getRenderWidth(), e.getRenderHeight()) }, r.prototype._checkUpdate = function(e) {
                if (!this._layerToDispose || 0 != (e.layerMask & this._layerToDispose.layerMask)) {
                    if (this._isFullscreen && this._linkedControls.length) {
                        var i = this.getScene();
                        if (!i) return;
                        for (var r = this._getGlobalViewport(i), s = 0, n = this._linkedControls; s < n.length; s++) {
                            var o = n[s];
                            if (o.isVisible) {
                                var h = o._linkedMesh;
                                if (h && !h.isDisposed()) {
                                    var a = h.getBoundingInfo().boundingSphere.center,
                                        u = t.Vector3.Project(a, h.getWorldMatrix(), i.getTransformMatrix(), r);
                                    u.z < 0 || u.z > 1 ? o.notRenderable = !0 : (o.notRenderable = !1, o._moveToProjectedPosition(u))
                                } else t.Tools.SetImmediate((function() { o.linkWithMesh(null) }))
                            }
                        }
                    }(this._isDirty || this._rootContainer.isDirty) && (this._isDirty = !1, this._render(), this.update())
                }
            }, r.prototype._render = function() {
                var t = this.getSize(),
                    i = t.width,
                    r = t.height,
                    s = this.getContext();
                s.clearRect(0, 0, i, r), this._background && (s.save(), s.fillStyle = this._background, s.fillRect(0, 0, i, r), s.restore()), s.font = "18px Arial", s.strokeStyle = "white";
                var n = new e.Measure(0, 0, i, r);
                this._rootContainer._draw(n, s)
            }, r.prototype._doPicking = function(e, i, r, s) {
                var n = this.getScene();
                if (n) {
                    var o = n.getEngine(),
                        h = this.getSize();
                    if (this._isFullscreen && (e *= h.width / o.getRenderWidth(), i *= h.height / o.getRenderHeight()), this._capturingControl) return void this._capturingControl._processObservables(r, e, i, s);
                    this._rootContainer._processPicking(e, i, r, s) || r === t.PointerEventTypes.POINTERMOVE && (this._lastControlOver && this._lastControlOver._onPointerOut(this._lastControlOver), this._lastControlOver = null), this._manageFocus()
                }
            }, r.prototype.attach = function() {
                var e = this,
                    i = this.getScene();
                i && (this._pointerMoveObserver = i.onPrePointerObservable.add((function(r, s) {
                    if ((r.type === t.PointerEventTypes.POINTERMOVE || r.type === t.PointerEventTypes.POINTERUP || r.type === t.PointerEventTypes.POINTERDOWN) && i) {
                        var n = i.cameraToUseForPointers || i.activeCamera;
                        if (n) {
                            var o = i.getEngine(),
                                h = n.viewport,
                                a = (i.pointerX / o.getHardwareScalingLevel() - h.x * o.getRenderWidth()) / h.width,
                                u = (i.pointerY / o.getHardwareScalingLevel() - h.y * o.getRenderHeight()) / h.height;
                            e._shouldBlockPointer = !1, e._doPicking(a, u, r.type, r.event.button), r.skipOnPointerObservable = e._shouldBlockPointer
                        }
                    }
                })), this._attachToOnPointerOut(i))
            }, r.prototype.attachToMesh = function(e, i) {
                var r = this;
                void 0 === i && (i = !0);
                var s = this.getScene();
                s && (this._pointerObserver = s.onPointerObservable.add((function(i, s) {
                    if (i.type === t.PointerEventTypes.POINTERMOVE || i.type === t.PointerEventTypes.POINTERUP || i.type === t.PointerEventTypes.POINTERDOWN)
                        if (i.pickInfo && i.pickInfo.hit && i.pickInfo.pickedMesh === e) {
                            var n = i.pickInfo.getTextureCoordinates();
                            if (n) {
                                var o = r.getSize();
                                r._doPicking(n.x * o.width, (1 - n.y) * o.height, i.type, i.event.button)
                            }
                        } else i.type === t.PointerEventTypes.POINTERUP ? (r._lastControlDown && r._lastControlDown.forcePointerUp(), r._lastControlDown = null, r.focusedControl = null) : i.type === t.PointerEventTypes.POINTERMOVE && (r._lastControlOver && r._lastControlOver._onPointerOut(r._lastControlOver), r._lastControlOver = null)
                })), e.enablePointerMoveEvents = i, this._attachToOnPointerOut(s))
            }, r.prototype.moveFocusToControl = function(t) { this.focusedControl = t, this._lastPickedControl = t, this._blockNextFocusCheck = !0 }, r.prototype._manageFocus = function() {
                if (this._blockNextFocusCheck) return this._blockNextFocusCheck = !1, void(this._lastPickedControl = this._focusedControl);
                if (this._focusedControl && this._focusedControl !== this._lastPickedControl) {
                    if (this._lastPickedControl.isFocusInvisible) return;
                    this.focusedControl = null
                }
            }, r.prototype._attachToOnPointerOut = function(t) {
                var e = this;
                this._canvasPointerOutObserver = t.getEngine().onCanvasPointerOutObservable.add((function() { e._lastControlOver && e._lastControlOver._onPointerOut(e._lastControlOver), e._lastControlOver = null, e._lastControlDown && e._lastControlDown.forcePointerUp(), e._lastControlDown = null }))
            }, r.CreateForMesh = function(e, i, s, n) {
                void 0 === i && (i = 1024), void 0 === s && (s = 1024), void 0 === n && (n = !0);
                var o = new r(e.name + " AdvancedDynamicTexture", i, s, e.getScene(), !0, t.Texture.TRILINEAR_SAMPLINGMODE),
                    h = new t.StandardMaterial("AdvancedDynamicTextureMaterial", e.getScene());
                return h.backFaceCulling = !1, h.diffuseColor = t.Color3.Black(), h.specularColor = t.Color3.Black(), h.emissiveTexture = o, h.opacityTexture = o, e.material = h, o.attachToMesh(e, n), o
            }, r.CreateFullscreenUI = function(e, i, s) {
                void 0 === i && (i = !0), void 0 === s && (s = null);
                var n = new r(e, 0, 0, s),
                    o = new t.Layer(e + "_layer", null, s, !i);
                return o.texture = n, n._layerToDispose = o, n._isFullscreen = !0, n.attach(), n
            }, r
        })(t.DynamicTexture);
        e.AdvancedDynamicTexture = i
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(t) {
        var e = (function() {
            function t(t, e, i, r) { this.left = t, this.top = e, this.width = i, this.height = r }
            return t.prototype.copyFrom = function(t) { this.left = t.left, this.top = t.top, this.width = t.width, this.height = t.height }, t.prototype.isEqualsTo = function(t) { return this.left === t.left && (this.top === t.top && (this.width === t.width && this.height === t.height)) }, t.Empty = function() { return new t(0, 0, 0, 0) }, t
        })();
        t.Measure = e
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function(t) {
            function e(e, i) { void 0 === i && (i = 0); var r = t.call(this, e.x, e.y) || this; return r.buttonIndex = i, r }
            return __extends(e, t), e
        })(t.Vector2);
        e.Vector2WithInfo = i;
        var r = (function() {
            function e(t, e, i, r, s, n) { this.m = new Float32Array(6), this.fromValues(t, e, i, r, s, n) }
            return e.prototype.fromValues = function(t, e, i, r, s, n) { return this.m[0] = t, this.m[1] = e, this.m[2] = i, this.m[3] = r, this.m[4] = s, this.m[5] = n, this }, e.prototype.determinant = function() { return this.m[0] * this.m[3] - this.m[1] * this.m[2] }, e.prototype.invertToRef = function(e) {
                var i = this.m[0],
                    r = this.m[1],
                    s = this.m[2],
                    n = this.m[3],
                    o = this.m[4],
                    h = this.m[5],
                    a = this.determinant();
                if (a < t.Epsilon * t.Epsilon) return e.m[0] = 0, e.m[1] = 0, e.m[2] = 0, e.m[3] = 0, e.m[4] = 0, e.m[5] = 0, this;
                var u = 1 / a,
                    l = s * h - n * o,
                    c = r * o - i * h;
                return e.m[0] = n * u, e.m[1] = -r * u, e.m[2] = -s * u, e.m[3] = i * u, e.m[4] = l * u, e.m[5] = c * u, this
            }, e.prototype.multiplyToRef = function(t, e) {
                var i = this.m[0],
                    r = this.m[1],
                    s = this.m[2],
                    n = this.m[3],
                    o = this.m[4],
                    h = this.m[5],
                    a = t.m[0],
                    u = t.m[1],
                    l = t.m[2],
                    c = t.m[3],
                    _ = t.m[4],
                    f = t.m[5];
                return e.m[0] = i * a + r * l, e.m[1] = i * u + r * c, e.m[2] = s * a + n * l, e.m[3] = s * u + n * c, e.m[4] = o * a + h * l + _, e.m[5] = o * u + h * c + f, this
            }, e.prototype.transformCoordinates = function(t, e, i) { return i.x = t * this.m[0] + e * this.m[2] + this.m[4], i.y = t * this.m[1] + e * this.m[3] + this.m[5], this }, e.Identity = function() { return new e(1, 0, 0, 1, 0, 0) }, e.TranslationToRef = function(t, e, i) { i.fromValues(1, 0, 0, 1, t, e) }, e.ScalingToRef = function(t, e, i) { i.fromValues(t, 0, 0, e, 0, 0) }, e.RotationToRef = function(t, e) {
                var i = Math.sin(t),
                    r = Math.cos(t);
                e.fromValues(r, i, -i, r, 0, 0)
            }, e.ComposeToRef = function(t, i, r, s, n, o, h) { e.TranslationToRef(t, i, e._TempPreTranslationMatrix), e.ScalingToRef(s, n, e._TempScalingMatrix), e.RotationToRef(r, e._TempRotationMatrix), e.TranslationToRef(-t, -i, e._TempPostTranslationMatrix), e._TempPreTranslationMatrix.multiplyToRef(e._TempScalingMatrix, e._TempCompose0), e._TempCompose0.multiplyToRef(e._TempRotationMatrix, e._TempCompose1), o ? (e._TempCompose1.multiplyToRef(e._TempPostTranslationMatrix, e._TempCompose2), e._TempCompose2.multiplyToRef(o, h)) : e._TempCompose1.multiplyToRef(e._TempPostTranslationMatrix, h) }, e._TempPreTranslationMatrix = e.Identity(), e._TempPostTranslationMatrix = e.Identity(), e._TempRotationMatrix = e.Identity(), e._TempScalingMatrix = e.Identity(), e._TempCompose0 = e.Identity(), e._TempCompose1 = e.Identity(), e._TempCompose2 = e.Identity(), e
        })();
        e.Matrix2D = r
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(t) {
        var e = (function() {
            function t(e, i, r) { void 0 === i && (i = t.UNITMODE_PIXEL), void 0 === r && (r = !0), this.unit = i, this.negativeValueAllowed = r, this._value = 1, this.ignoreAdaptiveScaling = !1, this._value = e }
            return Object.defineProperty(t.prototype, "isPercentage", { get: function() { return this.unit === t.UNITMODE_PERCENTAGE }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "isPixel", { get: function() { return this.unit === t.UNITMODE_PIXEL }, enumerable: !0, configurable: !0 }), Object.defineProperty(t.prototype, "internalValue", { get: function() { return this._value }, enumerable: !0, configurable: !0 }), t.prototype.getValueInPixel = function(t, e) { return this.isPixel ? this.getValue(t) : this.getValue(t) * e }, t.prototype.getValue = function(e) { if (e && !this.ignoreAdaptiveScaling && this.unit !== t.UNITMODE_PERCENTAGE) { if (e.idealWidth) return this._value * e.getSize().width / e.idealWidth; if (e.idealHeight) return this._value * e.getSize().height / e.idealHeight } return this._value }, t.prototype.toString = function(e) {
                switch (this.unit) {
                    case t.UNITMODE_PERCENTAGE:
                        return 100 * this.getValue(e) + "%";
                    case t.UNITMODE_PIXEL:
                        return this.getValue(e) + "px"
                }
                return this.unit.toString()
            }, t.prototype.fromString = function(e) {
                var i = t._Regex.exec(e.toString());
                if (!i || 0 === i.length) return !1;
                var r = parseFloat(i[1]),
                    s = this.unit;
                if (this.negativeValueAllowed || r < 0 && (r = 0), 4 === i.length) switch (i[3]) {
                    case "px":
                        s = t.UNITMODE_PIXEL;
                        break;
                    case "%":
                        s = t.UNITMODE_PERCENTAGE, r /= 100
                }
                return (r !== this._value || s !== this.unit) && (this._value = r, this.unit = s, !0)
            }, Object.defineProperty(t, "UNITMODE_PERCENTAGE", { get: function() { return t._UNITMODE_PERCENTAGE }, enumerable: !0, configurable: !0 }), Object.defineProperty(t, "UNITMODE_PIXEL", { get: function() { return t._UNITMODE_PIXEL }, enumerable: !0, configurable: !0 }), t._Regex = /(^-?\d*(\.\d+)?)(%|px)?/, t._UNITMODE_PERCENTAGE = 0, t._UNITMODE_PIXEL = 1, t
        })();
        t.ValueAndUnit = e
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function() {
            function i(r) { this.name = r, this._alpha = 1, this._alphaSet = !1, this._zIndex = 0, this._currentMeasure = e.Measure.Empty(), this._fontFamily = "Arial", this._fontStyle = "", this._fontSize = new e.ValueAndUnit(18, e.ValueAndUnit.UNITMODE_PIXEL, !1), this._width = new e.ValueAndUnit(1, e.ValueAndUnit.UNITMODE_PERCENTAGE, !1), this._height = new e.ValueAndUnit(1, e.ValueAndUnit.UNITMODE_PERCENTAGE, !1), this._color = "", this._horizontalAlignment = i.HORIZONTAL_ALIGNMENT_CENTER, this._verticalAlignment = i.VERTICAL_ALIGNMENT_CENTER, this._isDirty = !0, this._cachedParentMeasure = e.Measure.Empty(), this._paddingLeft = new e.ValueAndUnit(0), this._paddingRight = new e.ValueAndUnit(0), this._paddingTop = new e.ValueAndUnit(0), this._paddingBottom = new e.ValueAndUnit(0), this._left = new e.ValueAndUnit(0), this._top = new e.ValueAndUnit(0), this._scaleX = 1, this._scaleY = 1, this._rotation = 0, this._transformCenterX = .5, this._transformCenterY = .5, this._transformMatrix = e.Matrix2D.Identity(), this._invertTransformMatrix = e.Matrix2D.Identity(), this._transformedPosition = t.Vector2.Zero(), this._isMatrixDirty = !0, this._isVisible = !0, this._fontSet = !1, this._dummyVector2 = t.Vector2.Zero(), this._downCount = 0, this._enterCount = 0, this._doNotRender = !1, this.isHitTestVisible = !0, this.isPointerBlocker = !1, this.isFocusInvisible = !1, this.shadowOffsetX = 0, this.shadowOffsetY = 0, this.shadowBlur = 0, this.shadowColor = "#000", this._linkOffsetX = new e.ValueAndUnit(0), this._linkOffsetY = new e.ValueAndUnit(0), this.onPointerMoveObservable = new t.Observable, this.onPointerOutObservable = new t.Observable, this.onPointerDownObservable = new t.Observable, this.onPointerUpObservable = new t.Observable, this.onPointerEnterObservable = new t.Observable, this.onDirtyObservable = new t.Observable, this.onAfterDrawObservable = new t.Observable }
            return Object.defineProperty(i.prototype, "typeName", { get: function() { return this._getTypeName() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "alpha", { get: function() { return this._alpha }, set: function(t) { this._alpha !== t && (this._alphaSet = !0, this._alpha = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "scaleX", { get: function() { return this._scaleX }, set: function(t) { this._scaleX !== t && (this._scaleX = t, this._markAsDirty(), this._markMatrixAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "scaleY", { get: function() { return this._scaleY }, set: function(t) { this._scaleY !== t && (this._scaleY = t, this._markAsDirty(), this._markMatrixAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "rotation", { get: function() { return this._rotation }, set: function(t) { this._rotation !== t && (this._rotation = t, this._markAsDirty(), this._markMatrixAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "transformCenterY", { get: function() { return this._transformCenterY }, set: function(t) { this._transformCenterY !== t && (this._transformCenterY = t, this._markAsDirty(), this._markMatrixAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "transformCenterX", { get: function() { return this._transformCenterX }, set: function(t) { this._transformCenterX !== t && (this._transformCenterX = t, this._markAsDirty(), this._markMatrixAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "horizontalAlignment", { get: function() { return this._horizontalAlignment }, set: function(t) { this._horizontalAlignment !== t && (this._horizontalAlignment = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "verticalAlignment", { get: function() { return this._verticalAlignment }, set: function(t) { this._verticalAlignment !== t && (this._verticalAlignment = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "width", { get: function() { return this._width.toString(this._host) }, set: function(t) { this._width.toString(this._host) !== t && this._width.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "widthInPixels", { get: function() { return this._width.getValueInPixel(this._host, this._cachedParentMeasure.width) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "height", { get: function() { return this._height.toString(this._host) }, set: function(t) { this._height.toString(this._host) !== t && this._height.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "heightInPixels", { get: function() { return this._height.getValueInPixel(this._host, this._cachedParentMeasure.height) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "fontFamily", { get: function() { return this._fontFamily }, set: function(t) { this._fontFamily !== t && (this._fontFamily = t, this._fontSet = !0) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "fontStyle", { get: function() { return this._fontStyle }, set: function(t) { this._fontStyle !== t && (this._fontStyle = t, this._fontSet = !0) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "fontSizeInPixels", { get: function() { return this._fontSize.getValueInPixel(this._host, 100) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "fontSize", { get: function() { return this._fontSize.toString(this._host) }, set: function(t) { this._fontSize.toString(this._host) !== t && this._fontSize.fromString(t) && (this._markAsDirty(), this._fontSet = !0) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "color", { get: function() { return this._color }, set: function(t) { this._color !== t && (this._color = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "zIndex", { get: function() { return this._zIndex }, set: function(t) { this.zIndex !== t && (this._zIndex = t, this._root && this._root._reOrderControl(this)) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "notRenderable", { get: function() { return this._doNotRender }, set: function(t) { this._doNotRender !== t && (this._doNotRender = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "isVisible", { get: function() { return this._isVisible }, set: function(t) { this._isVisible !== t && (this._isVisible = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "isDirty", { get: function() { return this._isDirty }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "paddingLeft", { get: function() { return this._paddingLeft.toString(this._host) }, set: function(t) { this._paddingLeft.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "paddingLeftInPixels", { get: function() { return this._paddingLeft.getValueInPixel(this._host, this._cachedParentMeasure.width) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "paddingRight", { get: function() { return this._paddingRight.toString(this._host) }, set: function(t) { this._paddingRight.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "paddingRightInPixels", { get: function() { return this._paddingRight.getValueInPixel(this._host, this._cachedParentMeasure.width) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "paddingTop", { get: function() { return this._paddingTop.toString(this._host) }, set: function(t) { this._paddingTop.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "paddingTopInPixels", { get: function() { return this._paddingTop.getValueInPixel(this._host, this._cachedParentMeasure.height) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "paddingBottom", { get: function() { return this._paddingBottom.toString(this._host) }, set: function(t) { this._paddingBottom.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "paddingBottomInPixels", { get: function() { return this._paddingBottom.getValueInPixel(this._host, this._cachedParentMeasure.height) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "left", { get: function() { return this._left.toString(this._host) }, set: function(t) { this._left.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "leftInPixels", { get: function() { return this._left.getValueInPixel(this._host, this._cachedParentMeasure.width) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "top", { get: function() { return this._top.toString(this._host) }, set: function(t) { this._top.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "topInPixels", { get: function() { return this._top.getValueInPixel(this._host, this._cachedParentMeasure.height) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "linkOffsetX", { get: function() { return this._linkOffsetX.toString(this._host) }, set: function(t) { this._linkOffsetX.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "linkOffsetXInPixels", { get: function() { return this._linkOffsetX.getValueInPixel(this._host, this._cachedParentMeasure.width) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "linkOffsetY", { get: function() { return this._linkOffsetY.toString(this._host) }, set: function(t) { this._linkOffsetY.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "linkOffsetYInPixels", { get: function() { return this._linkOffsetY.getValueInPixel(this._host, this._cachedParentMeasure.height) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "centerX", { get: function() { return this._currentMeasure.left + this._currentMeasure.width / 2 }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "centerY", { get: function() { return this._currentMeasure.top + this._currentMeasure.height / 2 }, enumerable: !0, configurable: !0 }), i.prototype._getTypeName = function() { return "Control" }, i.prototype.getLocalCoordinates = function(e) { var i = t.Vector2.Zero(); return this.getLocalCoordinatesToRef(e, i), i }, i.prototype.getLocalCoordinatesToRef = function(t, e) { return e.x = t.x - this._currentMeasure.left, e.y = t.y - this._currentMeasure.top, this }, i.prototype.getParentLocalCoordinates = function(e) { var i = t.Vector2.Zero(); return i.x = e.x - this._cachedParentMeasure.left, i.y = e.y - this._cachedParentMeasure.top, i }, i.prototype.moveToVector3 = function(e, i) {
                if (!this._host || this._root !== this._host._rootContainer) return void t.Tools.Error("Cannot move a control to a vector3 if the control is not at root level");
                this.horizontalAlignment = t.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, this.verticalAlignment = t.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                var r = this._host._getGlobalViewport(i),
                    s = t.Vector3.Project(e, t.Matrix.Identity(), i.getTransformMatrix(), r);
                if (this._moveToProjectedPosition(s), s.z < 0 || s.z > 1) return void(this.notRenderable = !0);
                this.notRenderable = !1
            }, i.prototype.linkWithMesh = function(e) {
                if (!this._host || this._root !== this._host._rootContainer) return void t.Tools.Error("Cannot link a control to a mesh if the control is not at root level");
                var i = this._host._linkedControls.indexOf(this);
                if (-1 !== i) return this._linkedMesh = e, void(e || this._host._linkedControls.splice(i, 1));
                this.horizontalAlignment = t.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, this.verticalAlignment = t.GUI.Control.VERTICAL_ALIGNMENT_TOP, this._linkedMesh = e, this._host._linkedControls.push(this)
            }, i.prototype._moveToProjectedPosition = function(t) { this.left = t.x + this._linkOffsetX.getValue(this._host) - this._currentMeasure.width / 2 + "px", this.top = t.y + this._linkOffsetY.getValue(this._host) - this._currentMeasure.height / 2 + "px", this._left.ignoreAdaptiveScaling = !0, this._top.ignoreAdaptiveScaling = !0 }, i.prototype._markMatrixAsDirty = function() { this._isMatrixDirty = !0, this._markAsDirty() }, i.prototype._markAsDirty = function() { this._isDirty = !0, this._host && this._host.markAsDirty() }, i.prototype._markAllAsDirty = function() { this._markAsDirty(), this._font && this._prepareFont() }, i.prototype._link = function(t, e) { this._root = t, this._host = e }, i.prototype._transform = function(t) {
                if (this._isMatrixDirty || 1 !== this._scaleX || 1 !== this._scaleY || 0 !== this._rotation) {
                    var i = this._currentMeasure.width * this._transformCenterX + this._currentMeasure.left,
                        r = this._currentMeasure.height * this._transformCenterY + this._currentMeasure.top;
                    t.translate(i, r), t.rotate(this._rotation), t.scale(this._scaleX, this._scaleY), t.translate(-i, -r), (this._isMatrixDirty || this._cachedOffsetX !== i || this._cachedOffsetY !== r) && (this._cachedOffsetX = i, this._cachedOffsetY = r, this._isMatrixDirty = !1, e.Matrix2D.ComposeToRef(-i, -r, this._rotation, this._scaleX, this._scaleY, this._root ? this._root._transformMatrix : null, this._transformMatrix), this._transformMatrix.invertToRef(this._invertTransformMatrix))
                }
            }, i.prototype._applyStates = function(t) { this._fontSet && (this._prepareFont(), this._fontSet = !1), this._font && (t.font = this._font), this._color && (t.fillStyle = this._color), this._alphaSet && (t.globalAlpha = this._alpha) }, i.prototype._processMeasures = function(t, e) { return !this._isDirty && this._cachedParentMeasure.isEqualsTo(t) || (this._isDirty = !1, this._currentMeasure.copyFrom(t), this._preMeasure(t, e), this._measure(), this._computeAlignment(t, e), this._currentMeasure.left = 0 | this._currentMeasure.left, this._currentMeasure.top = 0 | this._currentMeasure.top, this._currentMeasure.width = 0 | this._currentMeasure.width, this._currentMeasure.height = 0 | this._currentMeasure.height, this._additionalProcessing(t, e), this._cachedParentMeasure.copyFrom(t), this.onDirtyObservable.hasObservers() && this.onDirtyObservable.notifyObservers(this)), !(this._currentMeasure.left > t.left + t.width) && (!(this._currentMeasure.left + this._currentMeasure.width < t.left) && (!(this._currentMeasure.top > t.top + t.height) && (!(this._currentMeasure.top + this._currentMeasure.height < t.top) && (this._transform(e), this._clip(e), e.clip(), !0)))) }, i.prototype._clip = function(t) {
                if (t.beginPath(), this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
                    var e = this.shadowOffsetX,
                        i = this.shadowOffsetY,
                        r = this.shadowBlur,
                        s = Math.min(Math.min(e, 0) - 2 * r, 0),
                        n = Math.max(Math.max(e, 0) + 2 * r, 0),
                        o = Math.min(Math.min(i, 0) - 2 * r, 0),
                        h = Math.max(Math.max(i, 0) + 2 * r, 0);
                    t.rect(this._currentMeasure.left + s, this._currentMeasure.top + o, this._currentMeasure.width + n - s, this._currentMeasure.height + h - o)
                } else t.rect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height)
            }, i.prototype._measure = function() { this._width.isPixel ? this._currentMeasure.width = this._width.getValue(this._host) : this._currentMeasure.width *= this._width.getValue(this._host), this._height.isPixel ? this._currentMeasure.height = this._height.getValue(this._host) : this._currentMeasure.height *= this._height.getValue(this._host) }, i.prototype._computeAlignment = function(t, e) {
                var r = this._currentMeasure.width,
                    s = this._currentMeasure.height,
                    n = t.width,
                    o = t.height,
                    h = 0,
                    a = 0;
                switch (this.horizontalAlignment) {
                    case i.HORIZONTAL_ALIGNMENT_LEFT:
                        h = 0;
                        break;
                    case i.HORIZONTAL_ALIGNMENT_RIGHT:
                        h = n - r;
                        break;
                    case i.HORIZONTAL_ALIGNMENT_CENTER:
                        h = (n - r) / 2
                }
                switch (this.verticalAlignment) {
                    case i.VERTICAL_ALIGNMENT_TOP:
                        a = 0;
                        break;
                    case i.VERTICAL_ALIGNMENT_BOTTOM:
                        a = o - s;
                        break;
                    case i.VERTICAL_ALIGNMENT_CENTER:
                        a = (o - s) / 2
                }
                this._paddingLeft.isPixel ? (this._currentMeasure.left += this._paddingLeft.getValue(this._host), this._currentMeasure.width -= this._paddingLeft.getValue(this._host)) : (this._currentMeasure.left += n * this._paddingLeft.getValue(this._host), this._currentMeasure.width -= n * this._paddingLeft.getValue(this._host)), this._paddingRight.isPixel ? this._currentMeasure.width -= this._paddingRight.getValue(this._host) : this._currentMeasure.width -= n * this._paddingRight.getValue(this._host), this._paddingTop.isPixel ? (this._currentMeasure.top += this._paddingTop.getValue(this._host), this._currentMeasure.height -= this._paddingTop.getValue(this._host)) : (this._currentMeasure.top += o * this._paddingTop.getValue(this._host), this._currentMeasure.height -= o * this._paddingTop.getValue(this._host)), this._paddingBottom.isPixel ? this._currentMeasure.height -= this._paddingBottom.getValue(this._host) : this._currentMeasure.height -= o * this._paddingBottom.getValue(this._host), this._left.isPixel ? this._currentMeasure.left += this._left.getValue(this._host) : this._currentMeasure.left += n * this._left.getValue(this._host), this._top.isPixel ? this._currentMeasure.top += this._top.getValue(this._host) : this._currentMeasure.top += o * this._top.getValue(this._host), this._currentMeasure.left += h, this._currentMeasure.top += a
            }, i.prototype._preMeasure = function(t, e) {}, i.prototype._additionalProcessing = function(t, e) {}, i.prototype._draw = function(t, e) {}, i.prototype.contains = function(t, e) { return this._invertTransformMatrix.transformCoordinates(t, e, this._transformedPosition), t = this._transformedPosition.x, e = this._transformedPosition.y, !(t < this._currentMeasure.left) && (!(t > this._currentMeasure.left + this._currentMeasure.width) && (!(e < this._currentMeasure.top) && (!(e > this._currentMeasure.top + this._currentMeasure.height) && (this.isPointerBlocker && (this._host._shouldBlockPointer = !0), !0)))) }, i.prototype._processPicking = function(t, e, i, r) { return !(!this.isHitTestVisible || !this.isVisible || this._doNotRender) && (!!this.contains(t, e) && (this._processObservables(i, t, e, r), !0)) }, i.prototype._onPointerMove = function(t, e) { this.onPointerMoveObservable.notifyObservers(e, -1, t, this) && null != this.parent && this.parent._onPointerMove(t, e) }, i.prototype._onPointerEnter = function(t) { return 0 === this._enterCount && (this._enterCount++, this.onPointerEnterObservable.notifyObservers(this, -1, t, this) && null != this.parent && this.parent._onPointerEnter(t), !0) }, i.prototype._onPointerOut = function(t) { this._enterCount = 0, this.onPointerOutObservable.notifyObservers(this, -1, t, this) && null != this.parent && this.parent._onPointerOut(t) }, i.prototype._onPointerDown = function(t, i, r) { return 0 === this._downCount && (this._downCount++, this.onPointerDownObservable.notifyObservers(new e.Vector2WithInfo(i, r), -1, t, this) && null != this.parent && this.parent._onPointerDown(t, i, r), !0) }, i.prototype._onPointerUp = function(t, i, r) {
                this._downCount = 0,
                    this.onPointerUpObservable.notifyObservers(new e.Vector2WithInfo(i, r), -1, t, this) && null != this.parent && this.parent._onPointerUp(t, i, r)
            }, i.prototype.forcePointerUp = function() { this._onPointerUp(this, t.Vector2.Zero(), 0) }, i.prototype._processObservables = function(e, i, r, s) { if (this._dummyVector2.copyFromFloats(i, r), e === t.PointerEventTypes.POINTERMOVE) { this._onPointerMove(this, this._dummyVector2); var n = this._host._lastControlOver; return n && n !== this && n._onPointerOut(this), n !== this && this._onPointerEnter(this), this._host._lastControlOver = this, !0 } return e === t.PointerEventTypes.POINTERDOWN ? (this._onPointerDown(this, this._dummyVector2, s), this._host._lastControlDown = this, this._host._lastPickedControl = this, !0) : e === t.PointerEventTypes.POINTERUP && (this._host._lastControlDown && this._host._lastControlDown._onPointerUp(this, this._dummyVector2, s), this._host._lastControlDown = null, !0) }, i.prototype._prepareFont = function() {
                (this._font || this._fontSet) && (this._font = this._fontStyle + " " + this._fontSize.getValue(this._host) + "px " + this._fontFamily, this._fontOffset = i._GetFontOffset(this._font))
            }, i.prototype.dispose = function() { this.onDirtyObservable.clear(), this.onAfterDrawObservable.clear(), this.onPointerDownObservable.clear(), this.onPointerEnterObservable.clear(), this.onPointerMoveObservable.clear(), this.onPointerOutObservable.clear(), this.onPointerUpObservable.clear(), this._root && (this._root.removeControl(this), this._root = null), this._host._linkedControls.indexOf(this) > -1 && this.linkWithMesh(null) }, Object.defineProperty(i, "HORIZONTAL_ALIGNMENT_LEFT", { get: function() { return i._HORIZONTAL_ALIGNMENT_LEFT }, enumerable: !0, configurable: !0 }), Object.defineProperty(i, "HORIZONTAL_ALIGNMENT_RIGHT", { get: function() { return i._HORIZONTAL_ALIGNMENT_RIGHT }, enumerable: !0, configurable: !0 }), Object.defineProperty(i, "HORIZONTAL_ALIGNMENT_CENTER", { get: function() { return i._HORIZONTAL_ALIGNMENT_CENTER }, enumerable: !0, configurable: !0 }), Object.defineProperty(i, "VERTICAL_ALIGNMENT_TOP", { get: function() { return i._VERTICAL_ALIGNMENT_TOP }, enumerable: !0, configurable: !0 }), Object.defineProperty(i, "VERTICAL_ALIGNMENT_BOTTOM", { get: function() { return i._VERTICAL_ALIGNMENT_BOTTOM }, enumerable: !0, configurable: !0 }), Object.defineProperty(i, "VERTICAL_ALIGNMENT_CENTER", { get: function() { return i._VERTICAL_ALIGNMENT_CENTER }, enumerable: !0, configurable: !0 }), i._GetFontOffset = function(t) {
                if (i._FontHeightSizes[t]) return i._FontHeightSizes[t];
                var e = document.createElement("span");
                e.innerHTML = "Hg", e.style.font = t;
                var r = document.createElement("div");
                r.style.display = "inline-block", r.style.width = "1px", r.style.height = "0px", r.style.verticalAlign = "bottom";
                var s = document.createElement("div");
                s.appendChild(e), s.appendChild(r), document.body.appendChild(s);
                var n = 0,
                    o = 0;
                try { o = r.getBoundingClientRect().top - e.getBoundingClientRect().top, r.style.verticalAlign = "baseline", n = r.getBoundingClientRect().top - e.getBoundingClientRect().top } finally { document.body.removeChild(s) }
                var h = { ascent: n, height: o, descent: o - n };
                return i._FontHeightSizes[t] = h, h
            }, i.AddHeader = function(e, r, s, n) {
                var o = new t.GUI.StackPanel("panel"),
                    h = !n || n.isHorizontal,
                    a = !n || n.controlFirst;
                o.isVertical = !h;
                var u = new t.GUI.TextBlock("header");
                return u.text = r, u.textHorizontalAlignment = i.HORIZONTAL_ALIGNMENT_LEFT, h ? u.width = s : u.height = s, a ? (o.addControl(e), o.addControl(u), u.paddingLeft = "5px") : (o.addControl(u), o.addControl(e), u.paddingRight = "5px"), u.shadowBlur = e.shadowBlur, u.shadowColor = e.shadowColor, u.shadowOffsetX = e.shadowOffsetX, u.shadowOffsetY = e.shadowOffsetY, o
            }, i.drawEllipse = function(t, e, i, r, s) { s.translate(t, e), s.scale(i, r), s.beginPath(), s.arc(0, 0, 1, 0, 2 * Math.PI), s.closePath(), s.scale(1 / i, 1 / r), s.translate(-t, -e) }, i._HORIZONTAL_ALIGNMENT_LEFT = 0, i._HORIZONTAL_ALIGNMENT_RIGHT = 1, i._HORIZONTAL_ALIGNMENT_CENTER = 2, i._VERTICAL_ALIGNMENT_TOP = 0, i._VERTICAL_ALIGNMENT_BOTTOM = 1, i._VERTICAL_ALIGNMENT_CENTER = 2, i._FontHeightSizes = {}, i
        })();
        e.Control = i
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(t) {
        var e = (function(e) {
            function i(i) { var r = e.call(this, i) || this; return r.name = i, r._children = new Array, r._measureForChildren = t.Measure.Empty(), r }
            return __extends(i, e), Object.defineProperty(i.prototype, "background", { get: function() { return this._background }, set: function(t) { this._background !== t && (this._background = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "children", { get: function() { return this._children }, enumerable: !0, configurable: !0 }), i.prototype._getTypeName = function() { return "Container" }, i.prototype.getChildByName = function(t) { for (var e = 0, i = this._children; e < i.length; e++) { var r = i[e]; if (r.name === t) return r } return null }, i.prototype.getChildByType = function(t, e) { for (var i = 0, r = this._children; i < r.length; i++) { var s = r[i]; if (s.typeName === e) return s } return null }, i.prototype.containsControl = function(t) { return -1 !== this._children.indexOf(t) }, i.prototype.addControl = function(t) { return -1 !== this._children.indexOf(t) ? this : (t._link(this, this._host), t._markAllAsDirty(), this._reOrderControl(t), this._markAsDirty(), this) }, i.prototype.removeControl = function(t) { var e = this._children.indexOf(t); return -1 !== e && (this._children.splice(e, 1), t.parent = null), this._markAsDirty(), this }, i.prototype._reOrderControl = function(t) {
                this.removeControl(t);
                for (var e = 0; e < this._children.length; e++)
                    if (this._children[e].zIndex > t.zIndex) return void this._children.splice(e, 0, t);
                this._children.push(t), t.parent = this, this._markAsDirty()
            }, i.prototype._markMatrixAsDirty = function() { e.prototype._markMatrixAsDirty.call(this); for (var t = 0; t < this._children.length; t++) this._children[t]._markMatrixAsDirty() }, i.prototype._markAllAsDirty = function() { e.prototype._markAllAsDirty.call(this); for (var t = 0; t < this._children.length; t++) this._children[t]._markAllAsDirty() }, i.prototype._localDraw = function(t) { this._background && ((this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (t.shadowColor = this.shadowColor, t.shadowBlur = this.shadowBlur, t.shadowOffsetX = this.shadowOffsetX, t.shadowOffsetY = this.shadowOffsetY), t.fillStyle = this._background, t.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0)) }, i.prototype._link = function(t, i) { e.prototype._link.call(this, t, i); for (var r = 0, s = this._children; r < s.length; r++) { s[r]._link(t, i) } }, i.prototype._draw = function(t, e) {
                if (this.isVisible && !this.notRenderable) {
                    if (e.save(), this._applyStates(e), this._processMeasures(t, e)) {
                        this._localDraw(e), this._clipForChildren(e);
                        for (var i = 0, r = this._children; i < r.length; i++) {
                            var s = r[i];
                            s.isVisible && !s.notRenderable && (s._draw(this._measureForChildren, e), s.onAfterDrawObservable.hasObservers() && s.onAfterDrawObservable.notifyObservers(s))
                        }
                    }
                    e.restore(), this.onAfterDrawObservable.hasObservers() && this.onAfterDrawObservable.notifyObservers(this)
                }
            }, i.prototype._processPicking = function(t, i, r, s) { if (!this.isHitTestVisible || !this.isVisible || this.notRenderable) return !1; if (!e.prototype.contains.call(this, t, i)) return !1; for (var n = this._children.length - 1; n >= 0; n--) { if (this._children[n]._processPicking(t, i, r, s)) return !0 } return this._processObservables(r, t, i, s) }, i.prototype._clipForChildren = function(t) {}, i.prototype._additionalProcessing = function(t, i) { e.prototype._additionalProcessing.call(this, t, i), this._measureForChildren.copyFrom(this._currentMeasure) }, i.prototype.dispose = function() { e.prototype.dispose.call(this); for (var t = 0, i = this._children; t < i.length; t++) { i[t].dispose() } }, i
        })(t.Control);
        t.Container = e
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function(i) {
            function r(t) { var r = i.call(this, t) || this; return r.name = t, r._isVertical = !0, r._manualWidth = !1, r._manualHeight = !1, r._doNotTrackManualChanges = !1, r._tempMeasureStore = e.Measure.Empty(), r }
            return __extends(r, i), Object.defineProperty(r.prototype, "isVertical", { get: function() { return this._isVertical }, set: function(t) { this._isVertical !== t && (this._isVertical = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "width", { get: function() { return this._width.toString(this._host) }, set: function(t) { this._doNotTrackManualChanges || (this._manualWidth = !0), this._width.toString(this._host) !== t && this._width.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "height", { get: function() { return this._height.toString(this._host) }, set: function(t) { this._doNotTrackManualChanges || (this._manualHeight = !0), this._height.toString(this._host) !== t && this._height.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), r.prototype._getTypeName = function() { return "StackPanel" }, r.prototype._preMeasure = function(e, r) {
                for (var s = 0, n = 0, o = 0, h = this._children; o < h.length; o++) {
                    var a = h[o];
                    this._tempMeasureStore.copyFrom(a._currentMeasure), a._currentMeasure.copyFrom(e), a._measure(), this._isVertical ? (a.top = n + "px", a._top.ignoreAdaptiveScaling || a._markAsDirty(), a._top.ignoreAdaptiveScaling = !0, n += a._currentMeasure.height, a._currentMeasure.width > s && (s = a._currentMeasure.width), a.verticalAlignment = t.GUI.Control.VERTICAL_ALIGNMENT_TOP) : (a.left = s + "px", a._left.ignoreAdaptiveScaling || a._markAsDirty(), a._left.ignoreAdaptiveScaling = !0, s += a._currentMeasure.width, a._currentMeasure.height > n && (n = a._currentMeasure.height), a.horizontalAlignment = t.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT), a._currentMeasure.copyFrom(this._tempMeasureStore)
                }
                this._doNotTrackManualChanges = !0;
                var u = !1,
                    l = !1,
                    c = this.height,
                    _ = this.width;
                this._manualHeight || (this.height = n + "px"), this._manualWidth || (this.width = s + "px"), u = _ !== this.width || !this._width.ignoreAdaptiveScaling, l = c !== this.height || !this._height.ignoreAdaptiveScaling, l && (this._height.ignoreAdaptiveScaling = !0), u && (this._width.ignoreAdaptiveScaling = !0), this._doNotTrackManualChanges = !1, (u || l) && this._markAllAsDirty(), i.prototype._preMeasure.call(this, e, r)
            }, r
        })(e.Container);
        e.StackPanel = i
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(t) {
        var e = (function(t) {
            function e(e) { var i = t.call(this, e) || this; return i.name = e, i._thickness = 1, i._cornerRadius = 0, i }
            return __extends(e, t), Object.defineProperty(e.prototype, "thickness", { get: function() { return this._thickness }, set: function(t) { this._thickness !== t && (this._thickness = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "cornerRadius", { get: function() { return this._cornerRadius }, set: function(t) { t < 0 && (t = 0), this._cornerRadius !== t && (this._cornerRadius = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), e.prototype._getTypeName = function() { return "Rectangle" }, e.prototype._localDraw = function(t) { t.save(), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (t.shadowColor = this.shadowColor, t.shadowBlur = this.shadowBlur, t.shadowOffsetX = this.shadowOffsetX, t.shadowOffsetY = this.shadowOffsetY), this._background && (t.fillStyle = this._background, this._cornerRadius ? (this._drawRoundedRect(t, this._thickness / 2), t.fill()) : t.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height)), this._thickness && ((this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0), this.color && (t.strokeStyle = this.color), t.lineWidth = this._thickness, this._cornerRadius ? (this._drawRoundedRect(t, this._thickness / 2), t.stroke()) : t.strokeRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, this._currentMeasure.width - this._thickness, this._currentMeasure.height - this._thickness)), t.restore() }, e.prototype._additionalProcessing = function(e, i) { t.prototype._additionalProcessing.call(this, e, i), this._measureForChildren.width -= 2 * this._thickness, this._measureForChildren.height -= 2 * this._thickness, this._measureForChildren.left += this._thickness, this._measureForChildren.top += this._thickness }, e.prototype._drawRoundedRect = function(t, e) {
                void 0 === e && (e = 0);
                var i = this._currentMeasure.left + e,
                    r = this._currentMeasure.top + e,
                    s = this._currentMeasure.width - 2 * e,
                    n = this._currentMeasure.height - 2 * e,
                    o = Math.min(n / 2 - 2, Math.min(s / 2 - 2, this._cornerRadius));
                t.beginPath(), t.moveTo(i + o, r), t.lineTo(i + s - o, r), t.quadraticCurveTo(i + s, r, i + s, r + o), t.lineTo(i + s, r + n - o), t.quadraticCurveTo(i + s, r + n, i + s - o, r + n), t.lineTo(i + o, r + n), t.quadraticCurveTo(i, r + n, i, r + n - o), t.lineTo(i, r + o), t.quadraticCurveTo(i, r, i + o, r), t.closePath()
            }, e.prototype._clipForChildren = function(t) { this._cornerRadius && (this._drawRoundedRect(t, this._thickness), t.clip()) }, e
        })(t.Container);
        t.Rectangle = e
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(t) {
        var e = (function(e) {
            function i(t) { var i = e.call(this, t) || this; return i.name = t, i._thickness = 1, i }
            return __extends(i, e), Object.defineProperty(i.prototype, "thickness", { get: function() { return this._thickness }, set: function(t) { this._thickness !== t && (this._thickness = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), i.prototype._getTypeName = function() { return "Ellipse" }, i.prototype._localDraw = function(e) { e.save(), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowColor = this.shadowColor, e.shadowBlur = this.shadowBlur, e.shadowOffsetX = this.shadowOffsetX, e.shadowOffsetY = this.shadowOffsetY), t.Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2 - this._thickness / 2, this._currentMeasure.height / 2 - this._thickness / 2, e), this._background && (e.fillStyle = this._background, e.fill()), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0), this._thickness && (this.color && (e.strokeStyle = this.color), e.lineWidth = this._thickness, e.stroke()), e.restore() }, i.prototype._additionalProcessing = function(t, i) { e.prototype._additionalProcessing.call(this, t, i), this._measureForChildren.width -= 2 * this._thickness, this._measureForChildren.height -= 2 * this._thickness, this._measureForChildren.left += this._thickness, this._measureForChildren.top += this._thickness }, i.prototype._clipForChildren = function(e) { t.Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2, this._currentMeasure.height / 2, e), e.clip() }, i
        })(t.Container);
        t.Ellipse = e
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(t) {
        var e = (function(e) {
            function i(i) { var r = e.call(this, i) || this; return r.name = i, r._lineWidth = 1, r._x1 = new t.ValueAndUnit(0), r._y1 = new t.ValueAndUnit(0), r._x2 = new t.ValueAndUnit(0), r._y2 = new t.ValueAndUnit(0), r._dash = new Array, r.isHitTestVisible = !1, r._horizontalAlignment = t.Control.HORIZONTAL_ALIGNMENT_LEFT, r._verticalAlignment = t.Control.VERTICAL_ALIGNMENT_TOP, r }
            return __extends(i, e), Object.defineProperty(i.prototype, "dash", { get: function() { return this._dash }, set: function(t) { this._dash !== t && (this._dash = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "connectedControl", {
                get: function() { return this._connectedControl },
                set: function(t) {
                    var e = this;
                    this._connectedControl !== t && (this._connectedControlDirtyObserver && this._connectedControl && (this._connectedControl.onDirtyObservable.remove(this._connectedControlDirtyObserver), this._connectedControlDirtyObserver = null), t && (this._connectedControlDirtyObserver = t.onDirtyObservable.add((function() { return e._markAsDirty() }))), this._connectedControl = t, this._markAsDirty())
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(i.prototype, "x1", { get: function() { return this._x1.toString(this._host) }, set: function(t) { this._x1.toString(this._host) !== t && this._x1.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "y1", { get: function() { return this._y1.toString(this._host) }, set: function(t) { this._y1.toString(this._host) !== t && this._y1.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "x2", { get: function() { return this._x2.toString(this._host) }, set: function(t) { this._x2.toString(this._host) !== t && this._x2.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "y2", { get: function() { return this._y2.toString(this._host) }, set: function(t) { this._y2.toString(this._host) !== t && this._y2.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "lineWidth", { get: function() { return this._lineWidth }, set: function(t) { this._lineWidth !== t && (this._lineWidth = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "horizontalAlignment", { set: function(t) {}, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "verticalAlignment", { set: function(t) {}, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "_effectiveX2", { get: function() { return (this._connectedControl ? this._connectedControl.centerX : 0) + this._x2.getValue(this._host) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "_effectiveY2", { get: function() { return (this._connectedControl ? this._connectedControl.centerY : 0) + this._y2.getValue(this._host) }, enumerable: !0, configurable: !0 }), i.prototype._getTypeName = function() { return "Line" }, i.prototype._draw = function(t, e) { e.save(), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowColor = this.shadowColor, e.shadowBlur = this.shadowBlur, e.shadowOffsetX = this.shadowOffsetX, e.shadowOffsetY = this.shadowOffsetY), this._applyStates(e), this._processMeasures(t, e) && (e.strokeStyle = this.color, e.lineWidth = this._lineWidth, e.setLineDash(this._dash), e.beginPath(), e.moveTo(this._x1.getValue(this._host), this._y1.getValue(this._host)), e.lineTo(this._effectiveX2, this._effectiveY2), e.stroke()), e.restore() }, i.prototype._measure = function() { this._currentMeasure.width = Math.abs(this._x1.getValue(this._host) - this._effectiveX2) + this._lineWidth, this._currentMeasure.height = Math.abs(this._y1.getValue(this._host) - this._effectiveY2) + this._lineWidth }, i.prototype._computeAlignment = function(t, e) { this._currentMeasure.left = Math.min(this._x1.getValue(this._host), this._effectiveX2) - this._lineWidth / 2, this._currentMeasure.top = Math.min(this._y1.getValue(this._host), this._effectiveY2) - this._lineWidth / 2 }, i.prototype._moveToProjectedPosition = function(t) { this.x1 = t.x + this._linkOffsetX.getValue(this._host) + "px", this.y1 = t.y + this._linkOffsetY.getValue(this._host) + "px", this._x1.ignoreAdaptiveScaling = !0, this._y1.ignoreAdaptiveScaling = !0 }, i
        })(t.Control);
        t.Line = e
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function(i) {
            function r(r) { var s = i.call(this, r) || this; return s.name = r, s._thumbWidth = new e.ValueAndUnit(30, e.ValueAndUnit.UNITMODE_PIXEL, !1), s._minimum = 0, s._maximum = 100, s._value = 50, s._background = "black", s._borderColor = "white", s._barOffset = new e.ValueAndUnit(5, e.ValueAndUnit.UNITMODE_PIXEL, !1), s._isThumbCircle = !1, s.onValueChangedObservable = new t.Observable, s._pointerIsDown = !1, s.isPointerBlocker = !0, s }
            return __extends(r, i), Object.defineProperty(r.prototype, "borderColor", { get: function() { return this._borderColor }, set: function(t) { this._borderColor !== t && (this._borderColor = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "background", { get: function() { return this._background }, set: function(t) { this._background !== t && (this._background = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "barOffset", { get: function() { return this._barOffset.toString(this._host) }, set: function(t) { this._barOffset.toString(this._host) !== t && this._barOffset.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "barOffsetInPixels", { get: function() { return this._barOffset.getValueInPixel(this._host, this._cachedParentMeasure.width) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "thumbWidth", { get: function() { return this._thumbWidth.toString(this._host) }, set: function(t) { this._thumbWidth.toString(this._host) !== t && this._thumbWidth.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "thumbWidthInPixels", { get: function() { return this._thumbWidth.getValueInPixel(this._host, this._cachedParentMeasure.width) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "minimum", { get: function() { return this._minimum }, set: function(t) { this._minimum !== t && (this._minimum = t, this._markAsDirty(), this.value = Math.max(Math.min(this.value, this._maximum), this._minimum)) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "maximum", { get: function() { return this._maximum }, set: function(t) { this._maximum !== t && (this._maximum = t, this._markAsDirty(), this.value = Math.max(Math.min(this.value, this._maximum), this._minimum)) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "value", { get: function() { return this._value }, set: function(t) { t = Math.max(Math.min(t, this._maximum), this._minimum), this._value !== t && (this._value = t, this._markAsDirty(), this.onValueChangedObservable.notifyObservers(this._value)) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "isThumbCircle", { get: function() { return this._isThumbCircle }, set: function(t) { this._isThumbCircle !== t && (this._isThumbCircle = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), r.prototype._getTypeName = function() { return "Slider" }, r.prototype._draw = function(t, e) {
                if (e.save(), this._applyStates(e), this._processMeasures(t, e)) {
                    var i, r;
                    (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowColor = this.shadowColor, e.shadowBlur = this.shadowBlur, e.shadowOffsetX = this.shadowOffsetX, e.shadowOffsetY = this.shadowOffsetY), i = this._thumbWidth.isPixel ? Math.min(this._thumbWidth.getValue(this._host), this._currentMeasure.height) : this._currentMeasure.height * this._thumbWidth.getValue(this._host), r = this._barOffset.isPixel ? Math.min(this._barOffset.getValue(this._host), this._currentMeasure.height) : this._currentMeasure.height * this._barOffset.getValue(this._host);
                    var s = this._currentMeasure.left + i / 2,
                        n = this._currentMeasure.width - i,
                        o = (this._value - this._minimum) / (this._maximum - this._minimum) * n;
                    e.fillStyle = this._background, e.fillRect(s, this._currentMeasure.top + r, n, this._currentMeasure.height - 2 * r), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0), e.fillStyle = this.color, e.fillRect(s, this._currentMeasure.top + r, o, this._currentMeasure.height - 2 * r), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowColor = this.shadowColor, e.shadowBlur = this.shadowBlur, e.shadowOffsetX = this.shadowOffsetX, e.shadowOffsetY = this.shadowOffsetY), this._isThumbCircle ? (e.beginPath(), e.arc(s + o, this._currentMeasure.top + this._currentMeasure.height / 2, i / 2, 0, 2 * Math.PI), e.fill(), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0), e.strokeStyle = this._borderColor, e.stroke()) : (e.fillRect(s + o - i / 2, this._currentMeasure.top, i, this._currentMeasure.height), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0), e.strokeStyle = this._borderColor, e.strokeRect(s + o - i / 2, this._currentMeasure.top, i, this._currentMeasure.height))
                }
                e.restore()
            }, r.prototype._updateValueFromPointer = function(t) { this.value = this._minimum + (t - this._currentMeasure.left) / this._currentMeasure.width * (this._maximum - this._minimum) }, r.prototype._onPointerDown = function(t, e, r) { return !!i.prototype._onPointerDown.call(this, t, e, r) && (this._pointerIsDown = !0, this._updateValueFromPointer(e.x), this._host._capturingControl = this, !0) }, r.prototype._onPointerMove = function(t, e) { this._pointerIsDown && this._updateValueFromPointer(e.x), i.prototype._onPointerMove.call(this, t, e) }, r.prototype._onPointerUp = function(t, e, r) { this._pointerIsDown = !1, this._host._capturingControl = null, i.prototype._onPointerUp.call(this, t, e, r) }, r
        })(e.Control);
        e.Slider = i
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function(e) {
            function i(i) { var r = e.call(this, i) || this; return r.name = i, r._isChecked = !1, r._background = "black", r._checkSizeRatio = .8, r._thickness = 1, r.onIsCheckedChangedObservable = new t.Observable, r.isPointerBlocker = !0, r }
            return __extends(i, e), Object.defineProperty(i.prototype, "thickness", { get: function() { return this._thickness }, set: function(t) { this._thickness !== t && (this._thickness = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "checkSizeRatio", { get: function() { return this._checkSizeRatio }, set: function(t) { t = Math.max(Math.min(1, t), 0), this._checkSizeRatio !== t && (this._checkSizeRatio = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "background", { get: function() { return this._background }, set: function(t) { this._background !== t && (this._background = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "isChecked", { get: function() { return this._isChecked }, set: function(t) { this._isChecked !== t && (this._isChecked = t, this._markAsDirty(), this.onIsCheckedChangedObservable.notifyObservers(t)) }, enumerable: !0, configurable: !0 }), i.prototype._getTypeName = function() { return "CheckBox" }, i.prototype._draw = function(t, e) {
                if (e.save(), this._applyStates(e), this._processMeasures(t, e)) {
                    var i = this._currentMeasure.width - this._thickness,
                        r = this._currentMeasure.height - this._thickness;
                    if ((this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowColor = this.shadowColor, e.shadowBlur = this.shadowBlur, e.shadowOffsetX = this.shadowOffsetX, e.shadowOffsetY = this.shadowOffsetY), e.fillStyle = this._background, e.fillRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, i, r), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0), this._isChecked) {
                        e.fillStyle = this.color;
                        var s = i * this._checkSizeRatio,
                            n = r * this._checkSizeRatio;
                        e.fillRect(this._currentMeasure.left + this._thickness / 2 + (i - s) / 2, this._currentMeasure.top + this._thickness / 2 + (r - n) / 2, s, n)
                    }
                    e.strokeStyle = this.color, e.lineWidth = this._thickness, e.strokeRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, i, r)
                }
                e.restore()
            }, i.prototype._onPointerDown = function(t, i, r) { return !!e.prototype._onPointerDown.call(this, t, i, r) && (this.isChecked = !this.isChecked, !0) }, i
        })(e.Control);
        e.Checkbox = i
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function(i) {
            function r(e) { var r = i.call(this, e) || this; return r.name = e, r._isChecked = !1, r._background = "black", r._checkSizeRatio = .8, r._thickness = 1, r.group = "", r.onIsCheckedChangedObservable = new t.Observable, r.isPointerBlocker = !0, r }
            return __extends(r, i), Object.defineProperty(r.prototype, "thickness", { get: function() { return this._thickness }, set: function(t) { this._thickness !== t && (this._thickness = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "checkSizeRatio", { get: function() { return this._checkSizeRatio }, set: function(t) { t = Math.max(Math.min(1, t), 0), this._checkSizeRatio !== t && (this._checkSizeRatio = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "background", { get: function() { return this._background }, set: function(t) { this._background !== t && (this._background = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "isChecked", {
                get: function() { return this._isChecked },
                set: function(t) {
                    var e = this;
                    this._isChecked !== t && (this._isChecked = t, this._markAsDirty(), this.onIsCheckedChangedObservable.notifyObservers(t), this._isChecked && this._host.executeOnAllControls((function(t) {
                        if (t !== e && void 0 !== t.group) {
                            var i = t;
                            i.group === e.group && (i.isChecked = !1)
                        }
                    })))
                },
                enumerable: !0,
                configurable: !0
            }), r.prototype._getTypeName = function() { return "RadioButton" }, r.prototype._draw = function(t, i) {
                if (i.save(), this._applyStates(i), this._processMeasures(t, i)) {
                    var r = this._currentMeasure.width - this._thickness,
                        s = this._currentMeasure.height - this._thickness;
                    if ((this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (i.shadowColor = this.shadowColor, i.shadowBlur = this.shadowBlur, i.shadowOffsetX = this.shadowOffsetX, i.shadowOffsetY = this.shadowOffsetY), e.Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2 - this._thickness / 2, this._currentMeasure.height / 2 - this._thickness / 2, i), i.fillStyle = this._background, i.fill(), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (i.shadowBlur = 0, i.shadowOffsetX = 0, i.shadowOffsetY = 0), i.strokeStyle = this.color, i.lineWidth = this._thickness, i.stroke(), this._isChecked) {
                        i.fillStyle = this.color;
                        var n = r * this._checkSizeRatio,
                            o = s * this._checkSizeRatio;
                        e.Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, n / 2 - this._thickness / 2, o / 2 - this._thickness / 2, i), i.fill()
                    }
                }
                i.restore()
            }, r.prototype._onPointerDown = function(t, e, r) { return !!i.prototype._onPointerDown.call(this, t, e, r) && (this.isChecked = !this.isChecked, !0) }, r
        })(e.Control);
        e.RadioButton = i
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function(i) {
            function r(r, s) { void 0 === s && (s = ""); var n = i.call(this, r) || this; return n.name = r, n._text = "", n._textWrapping = !1, n._textHorizontalAlignment = e.Control.HORIZONTAL_ALIGNMENT_CENTER, n._textVerticalAlignment = e.Control.VERTICAL_ALIGNMENT_CENTER, n._resizeToFit = !1, n.onTextChangedObservable = new t.Observable, n.text = s, n }
            return __extends(r, i), Object.defineProperty(r.prototype, "resizeToFit", { get: function() { return this._resizeToFit }, set: function(t) { this._resizeToFit = t, this._resizeToFit && (this._width.ignoreAdaptiveScaling = !0, this._height.ignoreAdaptiveScaling = !0) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "textWrapping", { get: function() { return this._textWrapping }, set: function(t) { this._textWrapping !== t && (this._textWrapping = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "text", { get: function() { return this._text }, set: function(t) { this._text !== t && (this._text = t, this._markAsDirty(), this.onTextChangedObservable.notifyObservers(this)) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "textHorizontalAlignment", { get: function() { return this._textHorizontalAlignment }, set: function(t) { this._textHorizontalAlignment !== t && (this._textHorizontalAlignment = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "textVerticalAlignment", { get: function() { return this._textVerticalAlignment }, set: function(t) { this._textVerticalAlignment !== t && (this._textVerticalAlignment = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), r.prototype._getTypeName = function() { return "TextBlock" }, r.prototype._drawText = function(t, i, r, s) {
                var n = this._currentMeasure.width,
                    o = 0;
                switch (this._textHorizontalAlignment) {
                    case e.Control.HORIZONTAL_ALIGNMENT_LEFT:
                        o = 0;
                        break;
                    case e.Control.HORIZONTAL_ALIGNMENT_RIGHT:
                        o = n - i;
                        break;
                    case e.Control.HORIZONTAL_ALIGNMENT_CENTER:
                        o = (n - i) / 2
                }(this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (s.shadowColor = this.shadowColor, s.shadowBlur = this.shadowBlur, s.shadowOffsetX = this.shadowOffsetX, s.shadowOffsetY = this.shadowOffsetY), s.fillText(t, this._currentMeasure.left + o, r)
            }, r.prototype._draw = function(t, e) { e.save(), this._applyStates(e), this._processMeasures(t, e) && this._renderLines(e), e.restore() }, r.prototype._additionalProcessing = function(t, e) {
                this._lines = [];
                var i = this.text.split("\n");
                if (this._textWrapping && !this._resizeToFit)
                    for (var r = 0, s = i; r < s.length; r++) {
                        var n = s[r];
                        this._lines.push(this._parseLineWithTextWrapping(n, e))
                    } else
                        for (var o = 0, h = i; o < h.length; o++) {
                            var n = h[o];
                            this._lines.push(this._parseLine(n, e))
                        }
            }, r.prototype._parseLine = function(t, e) { return void 0 === t && (t = ""), { text: t, width: e.measureText(t).width } }, r.prototype._parseLineWithTextWrapping = function(t, e) {
                void 0 === t && (t = "");
                for (var i = t.split(" "), r = this._currentMeasure.width, s = 0, n = 0; n < i.length; n++) {
                    var o = n > 0 ? t + " " + i[n] : i[0],
                        h = e.measureText(o),
                        a = h.width;
                    a > r && n > 0 ? (this._lines.push({ text: t, width: s }), t = i[n], s = e.measureText(t).width) : (s = a, t = o)
                }
                return { text: t, width: s }
            }, r.prototype._renderLines = function(t) {
                var i = this._currentMeasure.height;
                this._fontOffset || (this._fontOffset = e.Control._GetFontOffset(t.font));
                var r = 0;
                switch (this._textVerticalAlignment) {
                    case e.Control.VERTICAL_ALIGNMENT_TOP:
                        r = this._fontOffset.ascent;
                        break;
                    case e.Control.VERTICAL_ALIGNMENT_BOTTOM:
                        r = i - this._fontOffset.height * (this._lines.length - 1) - this._fontOffset.descent;
                        break;
                    case e.Control.VERTICAL_ALIGNMENT_CENTER:
                        r = this._fontOffset.ascent + (i - this._fontOffset.height * this._lines.length) / 2
                }
                r += this._currentMeasure.top;
                for (var s = 0, n = 0, o = this._lines; n < o.length; n++) {
                    var h = o[n];
                    this._drawText(h.text, h.width, r, t), r += this._fontOffset.height, h.width > s && (s = h.width)
                }
                this._resizeToFit && (this.width = this.paddingLeftInPixels + this.paddingRightInPixels + s + "px", this.height = this.paddingTopInPixels + this.paddingBottomInPixels + this._fontOffset.height * this._lines.length + "px")
            }, r.prototype.dispose = function() { i.prototype.dispose.call(this), this.onTextChangedObservable.clear() }, r
        })(e.Control);
        e.TextBlock = i
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var DOMImage = Image,
    BABYLON;
!(function(t) {
    !(function(t) {
        var e = (function(t) {
            function e(i, r) { void 0 === r && (r = null); var s = t.call(this, i) || this; return s.name = i, s._loaded = !1, s._stretch = e.STRETCH_FILL, s._autoScale = !1, s._sourceLeft = 0, s._sourceTop = 0, s._sourceWidth = 0, s._sourceHeight = 0, s._cellWidth = 0, s._cellHeight = 0, s._cellId = -1, s.source = r, s }
            return __extends(e, t), Object.defineProperty(e.prototype, "sourceLeft", { get: function() { return this._sourceLeft }, set: function(t) { this._sourceLeft !== t && (this._sourceLeft = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "sourceTop", { get: function() { return this._sourceTop }, set: function(t) { this._sourceTop !== t && (this._sourceTop = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "sourceWidth", { get: function() { return this._sourceWidth }, set: function(t) { this._sourceWidth !== t && (this._sourceWidth = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "sourceHeight", { get: function() { return this._sourceHeight }, set: function(t) { this._sourceHeight !== t && (this._sourceHeight = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "autoScale", { get: function() { return this._autoScale }, set: function(t) { this._autoScale !== t && (this._autoScale = t, t && this._loaded && this.synchronizeSizeWithContent()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "stretch", { get: function() { return this._stretch }, set: function(t) { this._stretch !== t && (this._stretch = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "domImage", {
                get: function() { return this._domImage },
                set: function(t) {
                    var e = this;
                    this._domImage = t, this._loaded = !1, this._domImage.width ? this._onImageLoaded() : this._domImage.onload = function() { e._onImageLoaded() }
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype._onImageLoaded = function() { this._imageWidth = this._domImage.width, this._imageHeight = this._domImage.height, this._loaded = !0, this._autoScale && this.synchronizeSizeWithContent(), this._markAsDirty() }, Object.defineProperty(e.prototype, "source", {
                set: function(t) {
                    var e = this;
                    this._source !== t && (this._loaded = !1, this._source = t, this._domImage = new DOMImage, this._domImage.onload = function() { e._onImageLoaded() }, t && (this._domImage.crossOrigin = "anonymous", this._domImage.src = t))
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "cellWidth", { get: function() { return this._cellWidth }, set: function(t) { this._cellWidth = t }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "cellHeight", { get: function() { return this._cellHeight }, set: function(t) { this._cellHeight = t }, enumerable: !0, configurable: !0 }), Object.defineProperty(e.prototype, "cellId", { get: function() { return this._cellId }, set: function(t) { this._cellId = t }, enumerable: !0, configurable: !0 }), e.prototype._getTypeName = function() { return "Image" }, e.prototype.synchronizeSizeWithContent = function() { this._loaded && (this.width = this._domImage.width + "px", this.height = this._domImage.height + "px") }, e.prototype._draw = function(t, i) {
                i.save(), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (i.shadowColor = this.shadowColor, i.shadowBlur = this.shadowBlur, i.shadowOffsetX = this.shadowOffsetX, i.shadowOffsetY = this.shadowOffsetY);
                var r, s, n, o;
                if (-1 == this.cellId) r = this._sourceLeft, s = this._sourceTop, n = this._sourceWidth ? this._sourceWidth : this._imageWidth, o = this._sourceHeight ? this._sourceHeight : this._imageHeight;
                else {
                    var h = this._domImage.naturalWidth / this.cellWidth,
                        a = this.cellId / h >> 0,
                        u = this.cellId % h;
                    r = this.cellWidth * u, s = this.cellHeight * a, n = this.cellWidth, o = this.cellHeight
                }
                if (this._applyStates(i), this._processMeasures(t, i) && this._loaded) switch (this._stretch) {
                    case e.STRETCH_NONE:
                    case e.STRETCH_FILL:
                        i.drawImage(this._domImage, r, s, n, o, this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
                        break;
                    case e.STRETCH_UNIFORM:
                        var l = this._currentMeasure.width / n,
                            c = this._currentMeasure.height / o,
                            _ = Math.min(l, c),
                            f = (this._currentMeasure.width - n * _) / 2,
                            d = (this._currentMeasure.height - o * _) / 2;
                        i.drawImage(this._domImage, r, s, n, o, this._currentMeasure.left + f, this._currentMeasure.top + d, n * _, o * _);
                        break;
                    case e.STRETCH_EXTEND:
                        i.drawImage(this._domImage, r, s, n, o, this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height), this._autoScale && this.synchronizeSizeWithContent(), this._root && this._root.parent && (this._root.width = this.width, this._root.height = this.height)
                }
                i.restore()
            }, Object.defineProperty(e, "STRETCH_NONE", { get: function() { return e._STRETCH_NONE }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "STRETCH_FILL", { get: function() { return e._STRETCH_FILL }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "STRETCH_UNIFORM", { get: function() { return e._STRETCH_UNIFORM }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "STRETCH_EXTEND", { get: function() { return e._STRETCH_EXTEND }, enumerable: !0, configurable: !0 }), e._STRETCH_NONE = 0, e._STRETCH_FILL = 1, e._STRETCH_UNIFORM = 2, e._STRETCH_EXTEND = 3, e
        })(t.Control);
        t.Image = e
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function(e) {
            function i(t) { var i = e.call(this, t) || this; return i.name = t, i.thickness = 1, i.isPointerBlocker = !0, i.pointerEnterAnimation = function() { i.alpha -= .1 }, i.pointerOutAnimation = function() { i.alpha += .1 }, i.pointerDownAnimation = function() { i.scaleX -= .05, i.scaleY -= .05 }, i.pointerUpAnimation = function() { i.scaleX += .05, i.scaleY += .05 }, i }
            return __extends(i, e), i.prototype._getTypeName = function() { return "Button" }, i.prototype._processPicking = function(t, i, r, s) { return !(!this.isHitTestVisible || !this.isVisible || this.notRenderable) && (!!e.prototype.contains.call(this, t, i) && (this._processObservables(r, t, i, s), !0)) }, i.prototype._onPointerEnter = function(t) { return !!e.prototype._onPointerEnter.call(this, t) && (this.pointerEnterAnimation && this.pointerEnterAnimation(), !0) }, i.prototype._onPointerOut = function(t) { this.pointerOutAnimation && this.pointerOutAnimation(), e.prototype._onPointerOut.call(this, t) }, i.prototype._onPointerDown = function(t, i, r) { return !!e.prototype._onPointerDown.call(this, t, i, r) && (this.pointerDownAnimation && this.pointerDownAnimation(), !0) }, i.prototype._onPointerUp = function(t, i, r) { this.pointerUpAnimation && this.pointerUpAnimation(), e.prototype._onPointerUp.call(this, t, i, r) }, i.CreateImageButton = function(e, r, s) {
                var n = new i(e),
                    o = new t.GUI.TextBlock(e + "_button", r);
                o.textWrapping = !0, o.textHorizontalAlignment = t.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER, o.paddingLeft = "20%", n.addControl(o);
                var h = new t.GUI.Image(e + "_icon", s);
                return h.width = "20%", h.stretch = t.GUI.Image.STRETCH_UNIFORM, h.horizontalAlignment = t.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, n.addControl(h), n
            }, i.CreateImageOnlyButton = function(e, r) {
                var s = new i(e),
                    n = new t.GUI.Image(e + "_icon", r);
                return n.stretch = t.GUI.Image.STRETCH_FILL, n.horizontalAlignment = t.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT, s.addControl(n), s
            }, i.CreateSimpleButton = function(e, r) {
                var s = new i(e),
                    n = new t.GUI.TextBlock(e + "_button", r);
                return n.textWrapping = !0, n.textHorizontalAlignment = t.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER, s.addControl(n), s
            }, i.CreateImageWithCenterTextButton = function(e, r, s) {
                var n = new i(e),
                    o = new t.GUI.Image(e + "_icon", s);
                o.stretch = t.GUI.Image.STRETCH_FILL, n.addControl(o);
                var h = new t.GUI.TextBlock(e + "_button", r);
                return h.textWrapping = !0, h.textHorizontalAlignment = t.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER, n.addControl(h), n
            }, i
        })(e.Rectangle);
        e.Button = i
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function(e) {
            function i(i) { var r = e.call(this, i) || this; return r.name = i, r._value = t.Color3.Red(), r._tmpColor = new t.Color3, r._pointerStartedOnSquare = !1, r._pointerStartedOnWheel = !1, r._squareLeft = 0, r._squareTop = 0, r._squareSize = 0, r._h = 360, r._s = 1, r._v = 1, r.onValueChangedObservable = new t.Observable, r._pointerIsDown = !1, r.value = new t.Color3(.88, .1, .1), r.size = "200px", r.isPointerBlocker = !0, r }
            return __extends(i, e), Object.defineProperty(i.prototype, "value", { get: function() { return this._value }, set: function(t) { this._value.equals(t) || (this._value.copyFrom(t), this._RGBtoHSV(this._value, this._tmpColor), this._h = this._tmpColor.r, this._s = Math.max(this._tmpColor.g, 1e-5), this._v = Math.max(this._tmpColor.b, 1e-5), this._markAsDirty(), this.onValueChangedObservable.notifyObservers(this._value)) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "width", { set: function(t) { this._width.toString(this._host) !== t && this._width.fromString(t) && (this._height.fromString(t), this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "height", { set: function(t) { this._height.toString(this._host) !== t && this._height.fromString(t) && (this._width.fromString(t), this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(i.prototype, "size", { get: function() { return this.width }, set: function(t) { this.width = t }, enumerable: !0, configurable: !0 }), i.prototype._getTypeName = function() { return "ColorPicker" }, i.prototype._updateSquareProps = function() {
                var t = .5 * Math.min(this._currentMeasure.width, this._currentMeasure.height),
                    e = .2 * t,
                    i = 2 * (t - e),
                    r = i / Math.sqrt(2),
                    s = t - .5 * r;
                this._squareLeft = this._currentMeasure.left + s, this._squareTop = this._currentMeasure.top + s, this._squareSize = r
            }, i.prototype._drawGradientSquare = function(t, e, i, r, s, n) {
                var o = n.createLinearGradient(e, i, r + e, i);
                o.addColorStop(0, "#fff"), o.addColorStop(1, "hsl(" + t + ", 100%, 50%)"), n.fillStyle = o, n.fillRect(e, i, r, s);
                var h = n.createLinearGradient(e, i, e, s + i);
                h.addColorStop(0, "rgba(0,0,0,0)"), h.addColorStop(1, "#000"), n.fillStyle = h, n.fillRect(e, i, r, s)
            }, i.prototype._drawCircle = function(t, e, i, r) { r.beginPath(), r.arc(t, e, i + 1, 0, 2 * Math.PI, !1), r.lineWidth = 3, r.strokeStyle = "#333333", r.stroke(), r.beginPath(), r.arc(t, e, i, 0, 2 * Math.PI, !1), r.lineWidth = 3, r.strokeStyle = "#ffffff", r.stroke() }, i.prototype._createColorWheelCanvas = function(t, e) {
                var i = document.createElement("canvas");
                i.width = 2 * t, i.height = 2 * t;
                for (var r = i.getContext("2d"), s = r.getImageData(0, 0, 2 * t, 2 * t), n = s.data, o = this._tmpColor, h = t * t, a = t - e, u = a * a, l = -t; l < t; l++)
                    for (var c = -t; c < t; c++) {
                        var _ = l * l + c * c;
                        if (!(_ > h || _ < u)) {
                            var f = Math.sqrt(_),
                                d = Math.atan2(c, l);
                            this._HSVtoRGB(180 * d / Math.PI + 180, f / t, 1, o);
                            var p = 4 * (l + t + 2 * (c + t) * t);
                            n[p] = 255 * o.r, n[p + 1] = 255 * o.g, n[p + 2] = 255 * o.b;
                            var g = (f - a) / (t - a),
                                m = .2;
                            m = t < 50 ? .2 : t > 150 ? .04 : -.16 * (t - 50) / 100 + .2;
                            var g = (f - a) / (t - a);
                            n[p + 3] = g < m ? g / m * 255 : g > 1 - m ? 255 * (1 - (g - (1 - m)) / m) : 255
                        }
                    }
                return r.putImageData(s, 0, 0), i
            }, i.prototype._RGBtoHSV = function(t, e) {
                var i = t.r,
                    r = t.g,
                    s = t.b,
                    n = Math.max(i, r, s),
                    o = Math.min(i, r, s),
                    h = 0,
                    a = 0,
                    u = n,
                    l = n - o;
                0 !== n && (a = l / n), n != o && (n == i ? (h = (r - s) / l, r < s && (h += 6)) : n == r ? h = (s - i) / l + 2 : n == s && (h = (i - r) / l + 4), h *= 60), e.r = h, e.g = a, e.b = u
            }, i.prototype._HSVtoRGB = function(t, e, i, r) {
                var s = i * e,
                    n = t / 60,
                    o = s * (1 - Math.abs(n % 2 - 1)),
                    h = 0,
                    a = 0,
                    u = 0;
                n >= 0 && n <= 1 ? (h = s, a = o) : n >= 1 && n <= 2 ? (h = o, a = s) : n >= 2 && n <= 3 ? (a = s, u = o) : n >= 3 && n <= 4 ? (a = o, u = s) : n >= 4 && n <= 5 ? (h = o, u = s) : n >= 5 && n <= 6 && (h = s, u = o);
                var l = i - s;
                r.set(h + l, a + l, u + l)
            }, i.prototype._draw = function(t, e) {
                if (e.save(), this._applyStates(e), this._processMeasures(t, e)) {
                    var i = .5 * Math.min(this._currentMeasure.width, this._currentMeasure.height),
                        r = .2 * i,
                        s = this._currentMeasure.left,
                        n = this._currentMeasure.top;
                    this._colorWheelCanvas && this._colorWheelCanvas.width == 2 * i || (this._colorWheelCanvas = this._createColorWheelCanvas(i, r)), this._updateSquareProps(), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowColor = this.shadowColor, e.shadowBlur = this.shadowBlur, e.shadowOffsetX = this.shadowOffsetX, e.shadowOffsetY = this.shadowOffsetY, e.fillRect(this._squareLeft, this._squareTop, this._squareSize, this._squareSize)), e.drawImage(this._colorWheelCanvas, s, n), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0), this._drawGradientSquare(this._h, this._squareLeft, this._squareTop, this._squareSize, this._squareSize, e);
                    var o = this._squareLeft + this._squareSize * this._s,
                        h = this._squareTop + this._squareSize * (1 - this._v);
                    this._drawCircle(o, h, .04 * i, e);
                    var a = i - .5 * r;
                    o = s + i + Math.cos((this._h - 180) * Math.PI / 180) * a, h = n + i + Math.sin((this._h - 180) * Math.PI / 180) * a, this._drawCircle(o, h, .35 * r, e)
                }
                e.restore()
            }, i.prototype._updateValueFromPointer = function(t, e) {
                if (this._pointerStartedOnWheel) {
                    var i = .5 * Math.min(this._currentMeasure.width, this._currentMeasure.height),
                        r = i + this._currentMeasure.left,
                        s = i + this._currentMeasure.top;
                    this._h = 180 * Math.atan2(e - s, t - r) / Math.PI + 180
                } else this._pointerStartedOnSquare && (this._updateSquareProps(), this._s = (t - this._squareLeft) / this._squareSize, this._v = 1 - (e - this._squareTop) / this._squareSize, this._s = Math.min(this._s, 1), this._s = Math.max(this._s, 1e-5), this._v = Math.min(this._v, 1), this._v = Math.max(this._v, 1e-5));
                this._HSVtoRGB(this._h, this._s, this._v, this._tmpColor), this.value = this._tmpColor
            }, i.prototype._isPointOnSquare = function(t) {
                this._updateSquareProps();
                var e = this._squareLeft,
                    i = this._squareTop,
                    r = this._squareSize;
                return t.x >= e && t.x <= e + r && t.y >= i && t.y <= i + r
            }, i.prototype._isPointOnWheel = function(t) {
                var e = .5 * Math.min(this._currentMeasure.width, this._currentMeasure.height),
                    i = e + this._currentMeasure.left,
                    r = e + this._currentMeasure.top,
                    s = .2 * e,
                    n = e - s,
                    o = e * e,
                    h = n * n,
                    a = t.x - i,
                    u = t.y - r,
                    l = a * a + u * u;
                return l <= o && l >= h
            }, i.prototype._onPointerDown = function(t, i, r) { return !!e.prototype._onPointerDown.call(this, t, i, r) && (this._pointerIsDown = !0, this._pointerStartedOnSquare = !1, this._pointerStartedOnWheel = !1, this._isPointOnSquare(i) ? this._pointerStartedOnSquare = !0 : this._isPointOnWheel(i) && (this._pointerStartedOnWheel = !0), this._updateValueFromPointer(i.x, i.y), this._host._capturingControl = this, !0) }, i.prototype._onPointerMove = function(t, i) { this._pointerIsDown && this._updateValueFromPointer(i.x, i.y), e.prototype._onPointerMove.call(this, t, i) }, i.prototype._onPointerUp = function(t, i, r) { this._pointerIsDown = !1, this._host._capturingControl = null, e.prototype._onPointerUp.call(this, t, i, r) }, i
        })(e.Control);
        e.ColorPicker = i
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function(i) {
            function r(r, s) { void 0 === s && (s = ""); var n = i.call(this, r) || this; return n.name = r, n._text = "", n._placeholderText = "", n._background = "#222222", n._focusedBackground = "#000000", n._placeholderColor = "gray", n._thickness = 1, n._margin = new e.ValueAndUnit(10, e.ValueAndUnit.UNITMODE_PIXEL), n._autoStretchWidth = !0, n._maxWidth = new e.ValueAndUnit(1, e.ValueAndUnit.UNITMODE_PERCENTAGE, !1), n._isFocused = !1, n._blinkIsEven = !1, n._cursorOffset = 0, n.promptMessage = "Please enter text:", n.onTextChangedObservable = new t.Observable, n.onFocusObservable = new t.Observable, n.onBlurObservable = new t.Observable, n.text = s, n }
            return __extends(r, i), Object.defineProperty(r.prototype, "maxWidth", { get: function() { return this._maxWidth.toString(this._host) }, set: function(t) { this._maxWidth.toString(this._host) !== t && this._maxWidth.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "maxWidthInPixels", { get: function() { return this._maxWidth.getValueInPixel(this._host, this._cachedParentMeasure.width) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "margin", { get: function() { return this._margin.toString(this._host) }, set: function(t) { this._margin.toString(this._host) !== t && this._margin.fromString(t) && this._markAsDirty() }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "marginInPixels", { get: function() { return this._margin.getValueInPixel(this._host, this._cachedParentMeasure.width) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "autoStretchWidth", { get: function() { return this._autoStretchWidth }, set: function(t) { this._autoStretchWidth !== t && (this._autoStretchWidth = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "thickness", { get: function() { return this._thickness }, set: function(t) { this._thickness !== t && (this._thickness = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "focusedBackground", { get: function() { return this._focusedBackground }, set: function(t) { this._focusedBackground !== t && (this._focusedBackground = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "background", { get: function() { return this._background }, set: function(t) { this._background !== t && (this._background = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "placeholderColor", { get: function() { return this._placeholderColor }, set: function(t) { this._placeholderColor !== t && (this._placeholderColor = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "placeholderText", { get: function() { return this._placeholderText }, set: function(t) { this._placeholderText !== t && (this._placeholderText = t, this._markAsDirty()) }, enumerable: !0, configurable: !0 }), Object.defineProperty(r.prototype, "text", { get: function() { return this._text }, set: function(t) { this._text !== t && (this._text = t, this._markAsDirty(), this.onTextChangedObservable.notifyObservers(this)) }, enumerable: !0, configurable: !0 }), r.prototype.onBlur = function() { this._isFocused = !1, this._scrollLeft = null, this._cursorOffset = 0, clearTimeout(this._blinkTimeout), this._markAsDirty(), this.onBlurObservable.notifyObservers(this) }, r.prototype.onFocus = function() { if (this._scrollLeft = null, this._isFocused = !0, this._blinkIsEven = !1, this._cursorOffset = 0, this._markAsDirty(), this.onFocusObservable.notifyObservers(this), -1 !== navigator.userAgent.indexOf("Mobile")) { var t = prompt(this.promptMessage); return null !== t && (this.text = t), void(this._host.focusedControl = null) } }, r.prototype._getTypeName = function() { return "InputText" }, r.prototype.processKey = function(t, e) {
                switch (t) {
                    case 8:
                        if (this._text && this._text.length > 0)
                            if (0 === this._cursorOffset) this.text = this._text.substr(0, this._text.length - 1);
                            else {
                                var i = this._text.length - this._cursorOffset;
                                i > 0 && (this.text = this._text.slice(0, i - 1) + this._text.slice(i))
                            }
                        return;
                    case 46:
                        if (this._text && this._text.length > 0) {
                            var i = this._text.length - this._cursorOffset;
                            this.text = this._text.slice(0, i) + this._text.slice(i + 1), this._cursorOffset--
                        }
                        return;
                    case 13:
                        return void(this._host.focusedControl = null);
                    case 35:
                        return this._cursorOffset = 0, this._blinkIsEven = !1, void this._markAsDirty();
                    case 36:
                        return this._cursorOffset = this._text.length, this._blinkIsEven = !1, void this._markAsDirty();
                    case 37:
                        return this._cursorOffset++, this._cursorOffset > this._text.length && (this._cursorOffset = this._text.length), this._blinkIsEven = !1, void this._markAsDirty();
                    case 39:
                        return this._cursorOffset--, this._cursorOffset < 0 && (this._cursorOffset = 0), this._blinkIsEven = !1, void this._markAsDirty()
                }
                if (-1 === t || 32 === t || t > 47 && t < 58 || t > 64 && t < 91 || t > 185 && t < 193 || t > 218 && t < 223 || t > 95 && t < 112)
                    if (0 === this._cursorOffset) this.text += e;
                    else {
                        var r = this._text.length - this._cursorOffset;
                        this.text = this._text.slice(0, r) + e + this._text.slice(r)
                    }
            }, r.prototype.processKeyboard = function(t) { this.processKey(t.keyCode, t.key) }, r.prototype._draw = function(t, i) {
                var r = this;
                if (i.save(), this._applyStates(i), this._processMeasures(t, i)) {
                    (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (i.shadowColor = this.shadowColor, i.shadowBlur = this.shadowBlur, i.shadowOffsetX = this.shadowOffsetX, i.shadowOffsetY = this.shadowOffsetY), this._isFocused ? this._focusedBackground && (i.fillStyle = this._focusedBackground, i.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height)) : this._background && (i.fillStyle = this._background, i.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height)), (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) && (i.shadowBlur = 0, i.shadowOffsetX = 0, i.shadowOffsetY = 0), this._fontOffset || (this._fontOffset = e.Control._GetFontOffset(i.font));
                    var s = this._currentMeasure.left + this._margin.getValueInPixel(this._host, t.width);
                    this.color && (i.fillStyle = this.color);
                    var n = this._text;
                    this._isFocused || this._text || !this._placeholderText || (n = this._placeholderText, this._placeholderColor && (i.fillStyle = this._placeholderColor)), this._textWidth = i.measureText(n).width;
                    var o = 2 * this._margin.getValueInPixel(this._host, t.width);
                    this._autoStretchWidth && (this.width = Math.min(this._maxWidth.getValueInPixel(this._host, t.width), this._textWidth + o) + "px");
                    var h = this._fontOffset.ascent + (this._currentMeasure.height - this._fontOffset.height) / 2,
                        a = this._width.getValueInPixel(this._host, t.width) - o;
                    if (i.save(), i.beginPath(), i.rect(s, this._currentMeasure.top + (this._currentMeasure.height - this._fontOffset.height) / 2, a + 2, this._currentMeasure.height), i.clip(), this._isFocused && this._textWidth > a) {
                        var u = s - this._textWidth + a;
                        this._scrollLeft || (this._scrollLeft = u)
                    } else this._scrollLeft = s;
                    if (i.fillText(n, this._scrollLeft, this._currentMeasure.top + h), this._isFocused) {
                        if (this._clickedCoordinate) {
                            var l = this._scrollLeft + this._textWidth,
                                c = l - this._clickedCoordinate,
                                _ = 0;
                            this._cursorOffset = 0;
                            var f = 0;
                            do { this._cursorOffset && (f = Math.abs(c - _)), this._cursorOffset++, _ = i.measureText(n.substr(n.length - this._cursorOffset, this._cursorOffset)).width } while (_ < c);
                            Math.abs(c - _) > f && this._cursorOffset--, this._blinkIsEven = !1, this._clickedCoordinate = null
                        }
                        if (!this._blinkIsEven) {
                            var d = this.text.substr(this._text.length - this._cursorOffset),
                                p = i.measureText(d).width,
                                g = this._scrollLeft + this._textWidth - p;
                            g < s ? (this._scrollLeft += s - g, g = s, this._markAsDirty()) : g > s + a && (this._scrollLeft += s + a - g, g = s + a, this._markAsDirty()), i.fillRect(g, this._currentMeasure.top + (this._currentMeasure.height - this._fontOffset.height) / 2, 2, this._fontOffset.height)
                        }
                        clearTimeout(this._blinkTimeout), this._blinkTimeout = setTimeout((function() { r._blinkIsEven = !r._blinkIsEven, r._markAsDirty() }), 500)
                    }
                    i.restore(), this._thickness && (this.color && (i.strokeStyle = this.color), i.lineWidth = this._thickness, i.strokeRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, this._currentMeasure.width - this._thickness, this._currentMeasure.height - this._thickness))
                }
                i.restore()
            }, r.prototype._onPointerDown = function(t, e, r) { return !!i.prototype._onPointerDown.call(this, t, e, r) && (this._clickedCoordinate = e.x, this._host.focusedControl === this ? (clearTimeout(this._blinkTimeout), this._markAsDirty(), !0) : (this._host.focusedControl = this, !0)) }, r.prototype._onPointerUp = function(t, e, r) { i.prototype._onPointerUp.call(this, t, e, r) }, r.prototype.dispose = function() { i.prototype.dispose.call(this), this.onBlurObservable.clear(), this.onFocusObservable.clear(), this.onTextChangedObservable.clear() }, r
        })(e.Control);
        e.InputText = i
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {}));
var BABYLON;
!(function(t) {
    !(function(e) {
        var i = (function() {
            function t() {}
            return t
        })();
        e.KeyPropertySet = i;
        var r = (function(i) {
            function r() { var e = null !== i && i.apply(this, arguments) || this; return e.onKeyPressObservable = new t.Observable, e.defaultButtonWidth = "40px", e.defaultButtonHeight = "40px", e.defaultButtonPaddingLeft = "2px", e.defaultButtonPaddingRight = "2px", e.defaultButtonPaddingTop = "2px", e.defaultButtonPaddingBottom = "2px", e.defaultButtonColor = "#DDD", e.defaultButtonBackground = "#070707", e }
            return __extends(r, i), r.prototype._getTypeName = function() { return "VirtualKeyboard" }, r.prototype._createKey = function(t, i) {
                var r = this,
                    s = e.Button.CreateSimpleButton(t, t);
                return s.width = i && i.width ? i.width : this.defaultButtonWidth, s.height = i && i.height ? i.height : this.defaultButtonHeight, s.color = i && i.color ? i.color : this.defaultButtonColor, s.background = i && i.background ? i.background : this.defaultButtonBackground, s.paddingLeft = i && i.paddingLeft ? i.paddingLeft : this.defaultButtonPaddingLeft, s.paddingRight = i && i.paddingRight ? i.paddingRight : this.defaultButtonPaddingRight, s.paddingTop = i && i.paddingTop ? i.paddingTop : this.defaultButtonPaddingTop, s.paddingBottom = i && i.paddingBottom ? i.paddingBottom : this.defaultButtonPaddingBottom, s.thickness = 0, s.isFocusInvisible = !0, s.shadowColor = this.shadowColor, s.shadowBlur = this.shadowBlur, s.shadowOffsetX = this.shadowOffsetX, s.shadowOffsetY = this.shadowOffsetY, s.onPointerUpObservable.add((function() { r.onKeyPressObservable.notifyObservers(t) })), s
            }, r.prototype.addKeysRow = function(t, i) {
                var r = new e.StackPanel;
                r.isVertical = !1, r.isFocusInvisible = !0;
                for (var s = 0; s < t.length; s++) {
                    var n = null;
                    i && i.length === t.length && (n = i[s]), r.addControl(this._createKey(t[s], n))
                }
                this.addControl(r)
            }, Object.defineProperty(r.prototype, "connectedInputText", { get: function() { return this._connectedInputText }, enumerable: !0, configurable: !0 }), r.prototype.connect = function(t) {
                var e = this;
                this.isVisible = !1, this._connectedInputText = t, this._onFocusObserver = t.onFocusObservable.add((function() { e.isVisible = !0 })), this._onBlurObserver = t.onBlurObservable.add((function() { e.isVisible = !1 })), this._onKeyPressObserver = this.onKeyPressObservable.add((function(t) {
                    if (e._connectedInputText) {
                        switch (t) {
                            case "←":
                                return void e._connectedInputText.processKey(8);
                            case "↵":
                                return void e._connectedInputText.processKey(13)
                        }
                        e._connectedInputText.processKey(-1, t)
                    }
                }))
            }, r.prototype.disconnect = function() { this._connectedInputText && (this._connectedInputText.onFocusObservable.remove(this._onFocusObserver), this._connectedInputText.onBlurObservable.remove(this._onBlurObserver), this.onKeyPressObservable.remove(this._onKeyPressObserver), this._connectedInputText = null) }, r.CreateDefaultLayout = function() { var t = new r; return t.addKeysRow(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "←"]), t.addKeysRow(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]), t.addKeysRow(["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "↵"]), t.addKeysRow(["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]), t.addKeysRow([" "], [{ width: "200px" }]), t }, r
        })(e.StackPanel);
        e.VirtualKeyboard = r
    })(t.GUI || (t.GUI = {}))
})(BABYLON || (BABYLON = {})), (function(t, e) {
    var i = e();
    t && t.BABYLON || ("object" == typeof exports && "object" == typeof module ? module.exports = i : "function" == typeof define && define.amd ? define(["GUI"], e) : "object" == typeof exports ? exports.GUI = i : t.BABYLON.GUI = i)
})(this, (function() { return BABYLON.GUI }));