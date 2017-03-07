require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AdaptiveSprite":[function(require,module,exports){
"use strict";
cc._RF.push(module, '4edf1JTF/BHIKZVY3FaAqsT', 'AdaptiveSprite');
// start-scene/scripts/Global/AdaptiveSprite.js

cc.Class({
    "extends": cc.Component,

    properties: {

        padding: 20,

        label: {
            "default": null,
            type: cc.Node
        },

        backgroup: {
            "default": null,
            type: cc.Node
        }

    },

    update: function update() {
        if (this.backgroup.width !== this.label.width) {
            this.backgroup.width = this.label.width + this.padding;
        }
        if (this.backgroup.height !== this.label.height) {
            this.backgroup.height = this.label.height + this.padding;
        }
    }

});

cc._RF.pop();
},{}],"Helpers":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'c8640M3ozRErrV/Go3uTknt', 'Helpers');
// start-scene/scripts/Global/Helpers.js

if (CC_JSB && cc.runtime) {
    // fix cocos-creator/fireball#3578
    cc.LoaderLayer.setUseDefaultSource(false);
    cc.Dialog.setUseDefaultSource(false);
}

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    getRandomInt: getRandomInt
};

cc._RF.pop();
},{}],"Instruction":[function(require,module,exports){
"use strict";
cc._RF.push(module, '6a871gy73FDLap3Eje/2h6i', 'Instruction');
// start-scene/scripts/Global/Instruction.js

cc.Class({
    'extends': cc.Component,

    properties: {
        text: {
            'default': '',
            multiline: true
        }
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame
// update: function (dt) {

// },

cc._RF.pop();
},{}],"LabelLocalized":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'e4f88adp3hERoJ48DZ2PSAl', 'LabelLocalized');
// i18n/LabelLocalized.js

var i18n = require('i18n');
cc.Class({
    'extends': cc.Label,

    properties: {
        textKey: {
            'default': 'TEXT_KEY',
            multiline: true,
            tooltip: 'Enter i18n key here',
            notify: function notify() {
                if (this._sgNode) {
                    this._sgNode.setString(this.string);
                    this._updateNodeSize();
                }
            }
        },
        string: {
            override: true,
            tooltip: 'Here shows the localized string of Text Key',
            get: function get() {
                return i18n.t(this.textKey);
            },
            set: function set(value) {
                this.textKey = value;
                cc.warn('Please set label text key in Text Key property.');
            }
        }
    }
});

cc._RF.pop();
},{"i18n":"i18n"}],"ListItem":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'aa63bWNE8hBf4P4Sp0X2uT0', 'ListItem');
// start-scene/scripts/Global/ListItem.js

cc.Class({
    'extends': cc.Component,

    properties: {
        label: {
            'default': null,
            type: cc.Label
        },
        url: '',
        bg: cc.Sprite,
        btn: cc.Button
    },

    init: function init(menu) {
        this.index = -1;
        this.menu = menu;
    },

    loadExample: function loadExample() {
        if (this.url) {
            this.menu.loadScene(this.url);
        }
    },

    updateItem: function updateItem(idx, y, name, url) {
        var isDir = !url;
        this.index = idx;
        this.node.y = y;
        this.node.x = isDir ? 50 : 100;
        this.label.string = name;
        this.url = url;
        this.bg.enabled = !isDir;
        this.btn.interactable = !isDir;
    }
});

cc._RF.pop();
},{}],"Menu":[function(require,module,exports){
"use strict";
cc._RF.push(module, '04525pyYBlN26SWawaUF3dA', 'Menu');
// start-scene/scripts/Global/Menu.js

var i18n = require('i18n');
var SceneList = require('SceneList');

var emptyFunc = function emptyFunc(event) {
    event.stopPropagation();
};

cc.Class({
    'extends': cc.Component,

    properties: {
        text: {
            'default': null,
            type: cc.Label
        },
        readme: {
            'default': null,
            type: cc.Node
        },
        mask: {
            'default': null,
            type: cc.Node
        },
        btnInfo: {
            'default': null,
            type: cc.Button
        },
        btnBack: {
            'default': null,
            type: cc.Button
        },
        testList: {
            'default': null,
            type: cc.ScrollView
        }
    },

    onLoad: function onLoad() {
        this._isLoadingScene = false;
        this.showDebugDraw = false;
        cc.game.addPersistRootNode(this.node);
        this.currentSceneUrl = 'TestList.fire';
        this.contentPos = null;
        this.isMenu = true;
        this.loadInstruction(this.currentSceneUrl);
        this.node.zIndex = 999;

        cc.game.addPersistRootNode(this.testList.node);
        if (this.testList && this.testList.content) {
            // in main scene
            this.sceneList = this.testList.content.getComponent('SceneList');
            this.sceneList.init(this);
        }
    },

    backToList: function backToList() {
        if (this._isLoadingScene) {
            return;
        }
        this._isLoadingScene = true;
        this.showReadme(null, false);
        this.currentSceneUrl = 'TestList.fire';
        this.isMenu = true;
        cc.director.loadScene('TestList', this.onLoadSceneFinish.bind(this));
    },

    loadScene: function loadScene(url) {
        this._isLoadingScene = true;
        this.contentPos = this.testList.getContentPosition();
        this.currentSceneUrl = url;
        this.isMenu = false;
        this.testList.node.active = false;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
    },

    onLoadSceneFinish: function onLoadSceneFinish() {
        var url = this.currentSceneUrl;
        this.loadInstruction(url);
        this.testList.node.active = false;
        if (this.isMenu && this.contentPos) {
            this.testList.node.active = true;
            this.testList.setContentPosition(this.contentPos);
        }
        this._isLoadingScene = false;
    },

    loadInstruction: function loadInstruction(url) {
        var self = this;
        var urlArr = url.split('/');
        var fileName = urlArr[urlArr.length - 1].replace('.fire', '');
        cc.loader.loadRes('readme/' + fileName, function (err, txt) {
            if (err) {
                self.text.string = i18n.t("scripts/Global/Menu.js.1");
                return;
            }
            self.text.string = txt;
        });
    },

    showReadme: function showReadme(event, active) {
        if (active === undefined) {
            this.readme.active = !this.readme.active;
        } else {
            this.readme.active = active;
        }
        if (this.readme.active) {
            this.mask.on('touchstart', emptyFunc, this);
        } else {
            this.mask.off('touchstart', emptyFunc, this);
        }
        var labelTxt = this.readme.active ? '关闭说明' : '查看说明';
        cc.find('label', this.btnInfo.node).getComponent(cc.Label).textKey = labelTxt;

        // en: fix Collider DebugDraw always displayed on top of the problem.
        // zh：解决 Collider DebugDraw 一直显示在最上层的问题。
        var enabledDebugDraw = cc.director.getCollisionManager().enabledDebugDraw;
        if (this.readme.active) {
            this.showDebugDraw = enabledDebugDraw;
            cc.director.getCollisionManager().enabledDebugDraw = false;
        } else {
            cc.director.getCollisionManager().enabledDebugDraw = this.showDebugDraw;
        }
        // en: fix Video Player always displayed on top of the problem.
        // zh：修复 Video Player 一直显示在最上层的问题。
        var videoPlayer = cc.find('Canvas/VideoPlayer');
        if (videoPlayer) {
            videoPlayer.active = !this.readme.active;
        }
    }
});

cc._RF.pop();
},{"SceneList":"SceneList","i18n":"i18n"}],"SceneList":[function(require,module,exports){
"use strict";
cc._RF.push(module, '473b8wxs55OsJvoxVdYCzTF', 'SceneList');
// start-scene/scripts/Global/SceneList.js

cc.Class({
    'extends': cc.Component,

    properties: {
        itemPrefab: {
            'default': null,
            type: cc.Prefab
        },
        initItemCount: 0,
        scrollView: cc.ScrollView,
        bufferZone: 0 },

    // when item is away from bufferZone, we relocate it
    createItem: function createItem(x, y, name, url) {
        var item = cc.instantiate(this.itemPrefab);
        var itemComp = item.getComponent('ListItem');
        var label = itemComp.label;
        label.string = name;

        if (url) {
            itemComp.url = url;
        }

        // item.width = w;
        item.x = x;
        item.y = y;
        this.node.addChild(item);
        return item;
    },

    init: function init(menu) {
        this.menu = menu;
        this.sceneList = [];
        this.itemList = [];
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
        this.initList();
    },

    // use this for initialization
    initList: function initList() {
        var scenes = cc.game._sceneInfos;
        var dict = {};

        if (scenes) {
            var i, j;
            for (i = 0; i < scenes.length; ++i) {
                var url = scenes[i].url;
                var dirname = cc.path.dirname(url).replace('db://assets/cases/', '');
                if (dirname === 'db://assets/resources/test assets') {
                    continue;
                }
                var scenename = cc.path.basename(url, '.fire');
                if (scenename === 'TestList') continue;

                if (!dirname) dirname = '_root';
                if (!dict[dirname]) {
                    dict[dirname] = {};
                }
                dict[dirname][scenename] = url;
            }
        } else {
            cc.log('failed to get scene list!');
        }
        // compile scene dict to an array
        var dirs = Object.keys(dict);
        dirs.sort();
        for (var _i = 0; _i < dirs.length; ++_i) {
            this.sceneList.push({
                name: dirs[_i],
                url: null
            });
            var scenenames = Object.keys(dict[dirs[_i]]);
            scenenames.sort();
            for (var _j = 0; _j < scenenames.length; ++_j) {
                var _name = scenenames[_j];
                this.sceneList.push({
                    name: _name,
                    url: dict[dirs[_i]][_name]
                });
            }
        }
        var y = 0;
        this.node.height = (this.sceneList.length + 1) * 50;
        for (var _i2 = 0; _i2 < this.initItemCount; ++_i2) {
            var item = cc.instantiate(this.itemPrefab).getComponent('ListItem');
            var itemInfo = this.sceneList[_i2];
            item.init(this.menu);
            this.node.addChild(item.node);
            y -= 50;
            item.updateItem(_i2, y, itemInfo.name, itemInfo.url);
            this.itemList.push(item);
        }
    },

    getPositionInView: function getPositionInView(item) {
        // get item position in scrollview's node space
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update: function update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
        }
        this.updateTimer = 0;
        var items = this.itemList;
        var buffer = this.bufferZone;
        var isDown = this.node.y < this.lastContentPosY; // scrolling direction
        var curItemCount = this.itemList.length;
        var offset = 50 * curItemCount;
        for (var i = 0; i < curItemCount; ++i) {
            var item = items[i];
            var itemNode = item.node;
            var viewPos = this.getPositionInView(itemNode);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && itemNode.y + offset < 0) {
                    var newIdx = item.index - curItemCount;
                    var newInfo = this.sceneList[newIdx];
                    item.updateItem(newIdx, itemNode.y + offset, newInfo.name, newInfo.url);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && itemNode.y - offset > -this.node.height) {
                    var newIdx = item.index + curItemCount;
                    var newInfo = this.sceneList[newIdx];
                    item.updateItem(newIdx, itemNode.y - offset, newInfo.name, newInfo.url);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.node.y;
    }
});

cc._RF.pop();
},{}],"TipsManager":[function(require,module,exports){
"use strict";
cc._RF.push(module, '6c9bezFtu5AHZUcydh+6QJj', 'TipsManager');
// start-scene/scripts/Global/TipsManager.js

//
// 用于提示用户哪些范例不支持平台
//
var i18n = require('i18n');

// 平台检查
var PlatformType = cc.Enum({
    Node: 0,
    Native: 1,
    Native_Desktop: 2,

    Mobile: 10,
    Mobile_Android: 11,

    Runtime: 20,

    WebGl: 30,
    Canvas: 31,

    Native_Browser_Chrome: 100
});

var canvas = null;

cc.Class({
    'extends': cc.Component,

    properties: {
        support: false,
        // 需要检测的平台
        platform: {
            'default': PlatformType.Node,
            type: PlatformType
        }
    },

    onLoad: function onLoad() {
        this._showTips();
    },

    _checkNonSupport: function _checkNonSupport() {
        var showed = false,
            textKey = '';
        switch (this.platform) {
            case PlatformType.Native_Desktop:
                showed = cc.sys.isNative && (cc.sys.platform === cc.sys.WIN32 || cc.sys.platform === cc.sys.MACOS);
                textKey = i18n.t("example_case_nonsupport_native_desktop_tips");
                break;
            case PlatformType.Mobile:
                showed = cc.sys.isMobile;
                textKey = i18n.t("example_case_nonsupport_mobile_tips");
                break;
            case PlatformType.Runtime:
                showed = cc.runtime;
                textKey = i18n.t("example_case_nonsupport_runtime_tips");
                break;
            case PlatformType.Canvas:
                showed = cc._renderType === cc.game.RENDER_TYPE_CANVAS;
                textKey = i18n.t("example_case_nonsupport_web_canvas_tips");
                break;
        }
        return {
            showed: showed,
            textKey: textKey
        };
    },

    _checkSupport: function _checkSupport() {
        var showed = false,
            textKey = '';
        switch (this.platform) {
            case PlatformType.Mobile:
                showed = !cc.sys.isMobile || cc.runtime;
                textKey = i18n.t("example_case_support_mobile_tips");
                break;
            case PlatformType.WebGl:
                showed = cc._renderType !== cc.game.RENDER_TYPE_WEBGL;
                textKey = i18n.t("example_case_support_webGl_tips");
                break;
            case PlatformType.Mobile_Android:
                showed = !(cc.sys.isMobile && cc.sys.platform === cc.sys.ANDROID) || cc.runtime;
                textKey = i18n.t("example_case_support_mobile_android_tips");
                break;
            case PlatformType.Native_Browser_Chrome:
                showed = !(!cc.sys.isMobile && cc.sys.isBrowser && cc.sys.browserType === cc.sys.BROWSER_TYPE_CHROME);
                textKey = i18n.t("example_case_support_native_chrome_tips");
                break;
        }
        return {
            showed: showed,
            textKey: textKey
        };
    },

    _showTips: function _showTips() {
        if (this.type === PlatformType.Node) {
            return;
        }
        var info = this.support ? this._checkSupport() : this._checkNonSupport();
        var bg = this.node.getComponent(cc.Sprite);
        bg.enabled = info.showed;
        if (info.showed) {
            var content = this.node.getChildByName('Content').getComponent(cc.Label);
            content.textKey = info.textKey;
        }
    }
});

cc._RF.pop();
},{"i18n":"i18n"}],"arrow":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'f1da5Mv4hpN2Zx3pmtKOGSd', 'arrow');
// cases/stick-arrow/arrow.js

// http://www.iforce2d.net/b2dtut/sticky-projectiles
// http://www.emanueleferonato.com/2012/12/14/box2d-flying-arrow-engine-first-attempt/

cc.Class({
    "extends": cc.Component,

    onPostSolve: function onPostSolve(contact, selfCollider, otherCollider, impulse) {
        if (impulse.normalImpulses[0] < 1) return;

        var colliderA = contact.colliderA;
        var colliderB = contact.colliderB;

        var weldJoint = selfCollider.body.weldJoint;
        if (weldJoint) {
            weldJoint.destroy();
            selfCollider.body.weldJoint = null;
            return;
        }

        var arrowBody = selfCollider.body;
        var targetBody = otherCollider.body;
        var worldCoordsAnchorPoint = arrowBody.getWorldPoint(cc.v2(0.6, 0));

        var joint = new cc.WeldJoint();
        joint.connectedBody = targetBody;
        joint.anchor = arrowBody.getLocalPoint(worldCoordsAnchorPoint);
        joint.connectedAnchor = targetBody.getLocalPoint(worldCoordsAnchorPoint);
        joint.referenceAngle = targetBody.node.rotation - arrowBody.node.rotation;

        addComponent(arrowBody.node, joint);

        arrowBody.weldJoint = joint;
    }
});

cc._RF.pop();
},{}],"blob-emit":[function(require,module,exports){
"use strict";
cc._RF.push(module, '11e48Geo5JDBIVpJkHK7DFw', 'blob-emit');
// cases/blob/blob-emit.js

var Blob = require('./blob');

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        blob: {
            'default': null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
    },

    onTouchBegan: function onTouchBegan(event) {
        var touchLoc = event.touch.getLocation();

        var node = cc.instantiate(this.blob);
        node.active = true;
        cc.director.getScene().addChild(node);

        node.getComponent(Blob).emitTo(touchLoc);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RF.pop();
},{"./blob":"blob"}],"blob":[function(require,module,exports){
"use strict";
cc._RF.push(module, '4960bicKTtO84ujLGfekh0N', 'blob');
// cases/blob/blob.js


var smooth = require('smooth');

cc.Class({
    'extends': cc.Component,

    properties: {
        particleNumber: 12,
        particleDistance: 32,
        sphereSize: 12
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.ctx = this.getComponent(cc.Graphics);

        this.ctx.lineWidth = 6;
        this.ctx.strokeColor = cc.hexToColor('#495069');
        this.ctx.fillColor = cc.hexToColor('#ffde59');

        var x = this.node.x;
        var y = this.node.y;

        var particleNumber = this.particleNumber;
        var particleDistance = this.particleDistance;
        var sphereSize = this.sphereSize;

        var spheres = [];
        spheres.push(this._createSphere(0, 0, sphereSize, this.node));

        for (var i = 0; i < particleNumber; i++) {
            var angle = 2 * Math.PI / particleNumber * i;
            var posX = particleDistance * Math.cos(angle);
            var posY = particleDistance * Math.sin(angle);
            var sphere = this._createSphere(posX, posY, sphereSize, null, this.node);
            spheres.push(sphere);

            var joint = new cc.DistanceJoint();
            joint.connectedBody = spheres[0];
            joint.distance = particleDistance;
            joint.dampingRatio = 0.5;
            joint.frequency = 4;
            addComponent(spheres[spheres.length - 1].node, joint);

            if (i > 0) {
                var distanceX = posX - spheres[spheres.length - 2].node.x;
                var distanceY = posY - spheres[spheres.length - 2].node.y;
                var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                joint = new cc.DistanceJoint();
                joint.connectedBody = spheres[spheres.length - 2];
                joint.distance = distance;
                joint.dampingRatio = 1;
                joint.frequency = 0;
                addComponent(spheres[spheres.length - 1].node, joint);
            }
            if (i === particleNumber - 1) {
                var distanceX = posX - spheres[1].node.x;
                var distanceY = posY - spheres[1].node.y;
                var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                joint = new cc.DistanceJoint();
                joint.connectedBody = spheres[spheres.length - 1];
                joint.distance = distance;
                joint.dampingRatio = 1;
                joint.frequency = 0;
                addComponent(spheres[1].node, joint);
            }
        }

        this.spheres = spheres;
    },

    _createSphere: function _createSphere(x, y, r, node, parent) {
        if (!node) {
            node = new cc.Node();
            node.x = x;
            node.y = y;
        }

        if (parent) {
            parent.addChild(node);
        }

        var body = new cc.RigidBody();
        body.type = b2.Body.b2_dynamicBody;
        addComponent(node, body);

        var collider = new cc.PhysicsCircleCollider();
        collider.density = 1;
        collider.restitution = 0.4;
        collider.friction = 0.5;
        collider.radius = r;
        addComponent(node, collider);

        return body;
    },

    emitTo: function emitTo(target) {
        var x = target.x;
        var y = target.y;

        var distance = Math.sqrt((x - 2) * (x - 2) + (y - 200) * (y - 200));
        var velocity = cc.v2(x - 2, y - 200);
        velocity.normalize();
        velocity.mul(distance * 2);

        this.spheres.forEach(function (sphere) {
            sphere.linearVelocity = velocity;
        });
    },

    update: function update(dt) {
        var _this = this;

        var ctx = this.ctx;

        var points = this.spheres.map(function (sphere) {
            return _this.expandPosition(sphere.node.position);
        });

        points.shift();

        var result = smooth(points);
        var firstControlPoints = result[0];
        var secondControlPoints = result[1];

        var pos = points[0];

        ctx.clear();
        ctx.moveTo(pos.x, pos.y);

        for (var i = 1, len = points.length; i < len; i++) {
            var firstControlPoint = firstControlPoints[i - 1],
                secondControlPoint = secondControlPoints[i - 1];

            ctx.bezierCurveTo(firstControlPoint.x, firstControlPoint.y, secondControlPoint.x, secondControlPoint.y, points[i].x, points[i].y);
        }

        ctx.close();
        ctx.fill();
        ctx.stroke();
    },

    expandPosition: function expandPosition(pos) {
        return pos.mul(1.3);
    }
});

cc._RF.pop();
},{"smooth":"smooth"}],"cases-settings":[function(require,module,exports){
"use strict";
cc._RF.push(module, '5d3b4anjGFIT4XGoqU9b6ri', 'cases-settings');
// cases/cases-settings.js

if (!CC_EDITOR) {
    cc.director.setClearColor(cc.hexToColor('#2f69d2'));
}

cc._RF.pop();
},{}],"chain":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'b66ddrAwGdIDL2ef4BiAnew', 'chain');
// cases/chain.js

cc.Class({
    "extends": cc.Component,

    // use this for initialization
    onLoad: function onLoad() {
        var itemWidth = 30;
        var itemHeight = 8;
        var y = 250;
        var prevBody = this.getComponent(cc.RigidBody);
        for (var i = 0; i < 15; ++i) {
            var node = new cc.Node();
            node.position = cc.v2((0.5 + i) * itemWidth, y);
            var body = node.addComponent(cc.RigidBody);

            var collider = new cc.PhysicsBoxCollider();
            collider.size = cc.size(itemWidth, itemHeight);
            collider.density = 20;

            addComponent(node, collider);

            var joint = new cc.RevoluteJoint();
            joint.collideConnected = false;
            joint.anchor = cc.v2(-itemWidth / 2, 0);
            joint.connectedAnchor = i === 0 ? cc.v2(0, y) : cc.v2(itemWidth / 2, 0);
            joint.connectedBody = prevBody;

            addComponent(node, joint);

            this.node.addChild(node);

            prevBody = body;
        }
    }
});

cc._RF.pop();
},{}],"conveyor-belt":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'b5747o+SsRLR6PWbHULtK4Z', 'conveyor-belt');
// cases/conveyor-belt.js

cc.Class({
    "extends": cc.Component,

    properties: {
        tangentSpeed: 5
    },

    onPreSolve: function onPreSolve(contact) {
        contact.setTangentSpeed(this.tangentSpeed);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
},{}],"cutting-objects":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'c822aYVtBVMBo4yXF/8n8eH', 'cutting-objects');
// cases/cutting-objects.js

cc.Class({
    "extends": cc.Component,

    onEnable: function onEnable() {
        this.debugDrawFlags = cc.director.getPhysicsManager().debugDrawFlags;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
    },

    onDisable: function onDisable() {
        cc.director.getPhysicsManager().debugDrawFlags = this.debugDrawFlags;
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    },

    onTouchStart: function onTouchStart(event) {},

    onTouchMove: function onTouchMove(event) {},

    onTouchEnd: function onTouchEnd(event) {}

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
},{}],"en":[function(require,module,exports){
"use strict";
cc._RF.push(module, '920c5VLzJxKjYCAoIUwUHym', 'en');
// i18n/data/en.js

module.exports = {
  "example_case_nonsupport_native_desktop_tips": "The example case nonsupport the Mac platform and Windows platform",
  "example_case_nonsupport_runtime_tips": "The example case does not support the runtime platform",
  "example_case_nonsupport_mobile_tips": "The example case nonsupport mobile platforms",
  "example_case_nonsupport_web_canvas_tips": "The example case nonsupport Canvas mode",
  "example_case_support_webGl_tips": "The example case only supports WebGL mode",
  "example_case_support_mobile_tips": "The example case only supports mobile platforms",
  "example_case_support_mobile_android_tips": "The example case only supports Android mobile platform",
  "example_case_support_native_chrome_tips": "The example case only supports Chrome browser (Native)",
  "example_case_support_native_desktop_tips": "The example case only supports the Mac platform and Windows platform",
  "TestList.fire.30": "Back list",
  "TestList.fire.37": "View intro",
  "cases/01_graphics/01_sprite/AtlasSprite.fire.7": "This is Spirte Single.",
  "cases/01_graphics/01_sprite/AtlasSprite.fire.11": "This is Spirte From Atlas.",
  "cases/01_graphics/01_sprite/FilledSprite.fire.9": "Fill Type: HORIZONTAL",
  "cases/01_graphics/01_sprite/FilledSprite.fire.15": "Fill Type: VERTICAL",
  "cases/01_graphics/01_sprite/FilledSprite.fire.23": "FILL Type: RADIAL",
  "cases/01_graphics/01_sprite/SimpleSprite.fire.7": "This is Simple Sprite.",
  "cases/01_graphics/01_sprite/SlicedSprite.fire.7": "This is Sliced Sprite.",
  "cases/01_graphics/01_sprite/TiledSprite.fire.6": "This is Tiled Sprite.",
  "cases/01_graphics/01_sprite/TrimmedSprite.fire.7": "TRIMMED ",
  "cases/01_graphics/01_sprite/TrimmedSprite.fire.12": "No TRIMMED",
  "cases/01_graphics/02_particle/AutoRemoveParticle.fire.9": "Particle 1\n\"Auto Remove On Finish\" disabled",
  "cases/01_graphics/02_particle/AutoRemoveParticle.fire.13": "Particle 2\n\"Auto Remove On Finish\" enabled",
  "cases/01_graphics/02_particle/ToggleParticle.fire.6": "Press \"Button\" to toggle particle play",
  "cases/02_ui/01_widget/AdvancedWidget.fire.7": "Top Left",
  "cases/02_ui/01_widget/AdvancedWidget.fire.9": "top: 10% left: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.14": "Top Left",
  "cases/02_ui/01_widget/AdvancedWidget.fire.16": "top: -34px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.21": "Top Right",
  "cases/02_ui/01_widget/AdvancedWidget.fire.23": "top: 10% right: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.28": "Left",
  "cases/02_ui/01_widget/AdvancedWidget.fire.30": "left: -50px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.35": "Right",
  "cases/02_ui/01_widget/AdvancedWidget.fire.37": "right: -50px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.42": "Bottom Left",
  "cases/02_ui/01_widget/AdvancedWidget.fire.44": "bottom: 10% left: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.49": "Bottom",
  "cases/02_ui/01_widget/AdvancedWidget.fire.51": "bottom: -34px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.56": "Bottom Right",
  "cases/02_ui/01_widget/AdvancedWidget.fire.58": "bottom:10% right:6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.63": "This is Advanced WIdget.",
  "cases/02_ui/01_widget/AlignOnceWidget.fire.1": "AlignOne is false, It is always aligns",
  "cases/02_ui/01_widget/AlignOnceWidget.fire.2": "AlignOne is true, It aligns only once",
  "cases/02_ui/01_widget/AnimatedWidget.fire.9": "This is Animation Widget.",
  "cases/02_ui/01_widget/AutoResize.fire.13": "This is Widget Auto Resize.",
  "cases/02_ui/01_widget/WidgetAlign.fire.18": "This is Widget Align.",
  "cases/02_ui/02_label/GoldBeatingAnime.js.1": "0",
  "cases/02_ui/02_label/AlignFontLabel.fire.6": "Align Label",
  "cases/02_ui/02_label/AlignFontLabel.fire.9": "Horizontal Align",
  "cases/02_ui/02_label/AlignFontLabel.fire.14": "Hello! \nWelcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.16": "Align: LEFT",
  "cases/02_ui/02_label/AlignFontLabel.fire.21": "Hello! \nWelcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.23": "Align: CENTER",
  "cases/02_ui/02_label/AlignFontLabel.fire.28": "Hello! \nWelcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.30": "Align: RIGHT",
  "cases/02_ui/02_label/AlignFontLabel.fire.33": "Vertical Align",
  "cases/02_ui/02_label/AlignFontLabel.fire.38": "Welcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.40": "Align: TOP",
  "cases/02_ui/02_label/AlignFontLabel.fire.45": "Welcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.47": "Align: CENTER",
  "cases/02_ui/02_label/AlignFontLabel.fire.52": "Welcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.54": "Align: BOTTOM",
  "cases/02_ui/02_label/SystemFontLabel.fire.6": "System Font",
  "cases/02_ui/02_label/SystemFontLabel.fire.9": "Wrap",
  "cases/02_ui/02_label/SystemFontLabel.fire.14": "This is System Font",
  "cases/02_ui/02_label/SystemFontLabel.fire.16": "Overflow: CLAMP",
  "cases/02_ui/02_label/SystemFontLabel.fire.21": "This is System Font",
  "cases/02_ui/02_label/SystemFontLabel.fire.23": "Overflow: SHRINK",
  "cases/02_ui/02_label/SystemFontLabel.fire.26": "No Wrap",
  "cases/02_ui/02_label/SystemFontLabel.fire.31": "This is System Font",
  "cases/02_ui/02_label/SystemFontLabel.fire.33": "Overflow: CLAMP",
  "cases/02_ui/02_label/SystemFontLabel.fire.38": "This is System Font",
  "cases/02_ui/02_label/SystemFontLabel.fire.40": "Overflow: SHRINK",
  "cases/02_ui/02_label/SystemFontLabel.fire.45": "Hello! Welcome Come To Cocos Creator",
  "cases/02_ui/02_label/SystemFontLabel.fire.47": "Overflow: RESZIE_HEIGHT",
  "cases/02_ui/03_button/ButtonInScroll.js.1": "Top button clicked!",
  "cases/02_ui/03_button/ButtonInScroll.js.2": "Bottom button clicked!",
  "cases/02_ui/03_button/ButtonInScroll.fire.21": "Which button is clicked?",
  "cases/02_ui/03_button/ButtonInScroll.fire.27": "drag to reveal more buttons\n\n",
  "cases/02_ui/03_button/SimpleButton.js.1": "Left button clicked!",
  "cases/02_ui/03_button/SimpleButton.js.2": "Right button clicked!",
  "cases/02_ui/03_button/ButtonInteractable.fire.7": "PLAY",
  "cases/02_ui/03_button/ButtonInteractable.fire.16": "STOP",
  "cases/02_ui/03_button/ButtonInteractable.fire.21": "interactable: true",
  "cases/02_ui/03_button/ButtonInteractable.fire.23": "interactable: false",
  "cases/02_ui/03_button/ButtonInteractable.js.1": "interactable: ",
  "cases/02_ui/03_button/ButtonInteractable.js.2": "interactable: ",
  "cases/02_ui/03_button/SimpleButton.fire.6": "Which button is clicked?",
  "cases/02_ui/04_progressbar/progressbar.fire.7": "Horizontal bar with progress 0.3",
  "cases/02_ui/04_progressbar/progressbar.fire.11": "Horizontal bar reverse with progress 1.0",
  "cases/02_ui/04_progressbar/progressbar.fire.15": "Vertical bar \nfrom bottom",
  "cases/02_ui/04_progressbar/progressbar.fire.19": "Vertical bar \nfrom top",
  "cases/02_ui/04_progressbar/progressbar.fire.23": "Progress bar with sprite",
  "cases/02_ui/04_progressbar/progressbar.fire.28": "Progress bar with child sprite",
  "cases/02_ui/05_scrollView/Item.js.1": "Tmpl#",
  "cases/02_ui/05_scrollView/ListView.fire.23": "Item #00",
  "cases/02_ui/05_scrollView/ScrollView.fire.7": "Scrollview full functionality",
  "cases/02_ui/05_scrollView/ScrollView.fire.30": "Scrollview without inertia",
  "cases/02_ui/05_scrollView/ScrollView.fire.53": "Scrollview without elastic",
  "cases/02_ui/05_scrollView/ScrollView.fire.76": "Scrollview horizontal scroll only",
  "cases/02_ui/05_scrollView/ScrollView.fire.93": "Scrollview vertical only",
  "cases/02_ui/05_scrollView/ScrollView.fire.110": "Scrollview no scrollbar",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.6": "Basic",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.31": "Horizontal",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.36": "Vertical",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.41": "Grid Layout Axis horizontal",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.46": "Grid Layout Axis vertical",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.6": "Horizontal layout none",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.31": "Vertical layout none",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.48": "Grid start axis horizontal none",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.85": "Grid start axis vertical none",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.6": "ScrollView with vertical  layout",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.40": "ScrollView with horizontal layout",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.74": "ScrollView with Grid Layout\nstart axis: horizontal ",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.144": "ScrollView with Grid Layout\nstart axis: vertical ",
  "cases/02_ui/06_layout/LayoutNone.fire.6": "Basic layout, Type: None\nResize container",
  "cases/02_ui/06_layout/LayoutNone.fire.35": "Horizontal layout None\nNo resize",
  "cases/02_ui/06_layout/LayoutNone.fire.60": "Vertical layout, Type: None\nNo resize",
  "cases/02_ui/06_layout/LayoutNone.fire.77": "Grid start axis: horizontal, Type: None\nNo resize",
  "cases/02_ui/06_layout/LayoutNone.fire.142": "Grid start axis: vertical, Type: None\nNo resize",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.8": "x:0, y:0",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.12": "x:480, y:320",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.16": "x:960, y:640",
  "cases/02_ui/07_editBox/editbox.js.1": "Enter Text: ",
  "cases/02_ui/07_editBox/EditBox.fire.25": "Single Line Password:",
  "cases/02_ui/07_editBox/EditBox.fire.27": "Single Line Text:",
  "cases/02_ui/07_editBox/EditBox.fire.29": "Mutiple Line Text:",
  "cases/02_ui/07_editBox/EditBox.fire.32": "Click",
  "cases/02_ui/07_editBox/EditBox.fire.38": "Button must be on top of EditBox, \nand it should enable click.",
  "cases/03_gameplay/01_player_control/EventManager/KeyboardInput.fire.6": "Press 'A' or 'D' to control sheep",
  "cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1": "touch (",
  "cases/03_gameplay/01_player_control/On/OnTouchInput.fire.10": "Try touching anywhere.",
  "cases/03_gameplay/01_player_control/On/OnMultiTouchInput.fire.20": "The sample can only be effective on mobile platforms!",
  "cases/03_gameplay/01_player_control/On/OnMultiTouchInput.fire.21": "Use your fingers to zoom image!",
  "cases/03_gameplay/02_actions/SimpleAction.fire.13": "This is Simple Action.",
  "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.14": "Label",
  "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.18": "This is Animate Custom Property.",
  "cases/03_gameplay/03_animation/AnimationEvent.fire.6": "Start the first animation",
  "cases/03_gameplay/03_animation/AnimationEvent.fire.14": "This is Animation Event.",
  "cases/03_gameplay/03_animation/AnimationEvent.js.1": "Start the",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.11": "Linear",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.17": "Case In Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.23": "Case Out Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.29": "Case Out In Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.35": "Back Forward",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.41": "This is Move Animation.",
  "cases/03_gameplay/03_animation/SpriteAnimation.fire.9": "This is SprieFrame Animation.",
  "cases/03_gameplay/03_animation/CreateClip.fire.1": "Dynamic Creating AnimationClip",
  "cases/04_audio/SimpleAudio.fire.6": "Enjoy the music!",
  "cases/05_scripting/01_properties/NodeArray.fire.14": "This is Node Array.",
  "cases/05_scripting/01_properties/NonSerialized.fire.6": "Label",
  "cases/05_scripting/01_properties/NonSerialized.fire.8": "Label",
  "cases/05_scripting/01_properties/NonSerialized.fire.10": "This is Non Serialized.",
  "cases/05_scripting/01_properties/ReferenceType.fire.8": "Label",
  "cases/05_scripting/01_properties/ReferenceType.fire.11": "This example does not include the runtime demonstration",
  "cases/05_scripting/01_properties/ValueType.fire.6": "This example does not include the runtime demonstration",
  "cases/05_scripting/02_prefab/InstantiatePrefab.fire.7": "This is Instantiate Prefab.",
  "cases/05_scripting/03_events/EventInMask.fire.23": "Change order of nodes",
  "cases/05_scripting/03_events/SimpleEvent.fire.19": "Touch event can support click",
  "cases/05_scripting/03_events/SimpleEvent.fire.21": "Mouse event can support click, hover, wheel",
  "cases/05_scripting/03_events/SimpleEvent.fire.23": "Custom event can be triggered manually\n(Click button above)",
  "cases/05_scripting/03_events/SimpleEvent.fire.25": "This is Simple Event.",
  "cases/05_scripting/03_events/TouchPropagation.fire.15": "This is Touch Propagation.",
  "cases/05_scripting/04_scheduler/scheduleCallbacks.js.1": "5.00 s",
  "cases/05_scripting/04_scheduler/scheduler.fire.9": "5.00 s",
  "cases/05_scripting/04_scheduler/scheduler.fire.12": "Repeat Schedule",
  "cases/05_scripting/04_scheduler/scheduler.fire.18": "Cancel Schedules",
  "cases/05_scripting/04_scheduler/scheduler.fire.24": "Schedule Once",
  "cases/05_scripting/04_scheduler/scheduler.fire.29": "Counter use update function to change string value each frame",
  "cases/05_scripting/04_scheduler/scheduler.fire.31": "This is Scheduler.",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.7": "Label",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.12": "Label",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.14": "This is Cross Reference.",
  "cases/05_scripting/06_life_cycle/life_cycle.fire.6": "This is Life cycle.",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.5": "Asset Loading",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.9": "Load SpriteFrame",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.15": "Load Texture",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.21": "Load Audio",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.27": "Load Txt",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.33": "Load Font",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.39": "Load Plist",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.45": "Load Prefab",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.51": "Load Scene",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.57": "Load Animation",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.59": "Load Spine",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.65": "Not currently loaded Entity.",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.1": "Loaded ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.2": "Play ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.3": "Create ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.4": "Playing Music.",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.5": "This is Font!",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.7": "By Type",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.10": "Load SpriteFrame",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.17": "By Url",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.20": "Load Prefab",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.6": "LoadResDir",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.24": "Load All",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.30": "Load SpriteFrame All",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.36": "Clear All",
  "cases/05_scripting/08_module/load_module.fire.6": "Load Module",
  "cases/05_scripting/08_module/load_module.fire.10": "Create Monster",
  "cases/05_scripting/09_singleton/Singleton.fire.6": "This example does not include the runtime demonstration",
  "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.1": "download complete!!",
  "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.2": "dowloading: ",
  "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.3": "click anywhere to download...",
  "cases/05_scripting/10_loadingBar/loadingBar.fire.7": "Loading Completed",
  "cases/05_scripting/10_loadingBar/loadingBar.fire.18": "Dowloading",
  "cases/05_scripting/11_network/NetworkCtrl.js.1": "waiting...",
  "cases/05_scripting/11_network/NetworkCtrl.js.2": "waiting...",
  "cases/05_scripting/11_network/NetworkCtrl.js.3": "waiting...",
  "cases/05_scripting/11_network/NetworkCtrl.js.4": "waiting...",
  "cases/05_scripting/11_network/NetworkCtrl.js.5": "WebSocket\\nSend Binary WS was opened.",
  "cases/05_scripting/11_network/NetworkCtrl.js.6": "WebSocket\\nResponse get.",
  "cases/05_scripting/11_network/NetworkCtrl.js.7": "WebSocket\\nsendBinary Error was fired.",
  "cases/05_scripting/11_network/NetworkCtrl.js.8": "WebSocket\\nwebsocket instance closed.",
  "cases/05_scripting/11_network/NetworkCtrl.js.9": "WebSocket\\nSend Binary WS is waiting...",
  "cases/05_scripting/11_network/NetworkCtrl.js.10": "WebSocket\\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.11": "SocketIO\\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.12": "SocketIO\\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.13": "SocketIO\\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.14": "SocketIO\\n",
  "cases/05_scripting/11_network/network.fire.7": "Label",
  "cases/05_scripting/11_network/network.fire.6": "XMLHttpRequest",
  "cases/05_scripting/11_network/network.fire.11": "Label",
  "cases/05_scripting/11_network/network.fire.10": "XMLHttpRequest (ArrayBuffer)",
  "cases/05_scripting/11_network/network.fire.15": "Label",
  "cases/05_scripting/11_network/network.fire.14": "WebSocket",
  "cases/05_scripting/11_network/network.fire.19": "Label",
  "cases/05_scripting/11_network/network.fire.18": "SocketIO",
  "cases/native_call/native_call.fire.1": "JS to JAVA reflection only works Android mobile platform!",
  "cases/native_call/native_call.fire.2": "Click on the button calls the static method!",
  "cases/native_call/native_call.fire.3": "Click",
  "cases/collider/Category.fire.3": "Group: Collider",
  "cases/collider/Category.fire.5": "Group: Collider",
  "cases/collider/Category.fire.7": "Group: Collider",
  "cases/collider/Category.fire.9": "Group: Default",
  "cases/collider/Shape.fire.20": "Show Polygon",
  "cases/collider/Shape.fire.27": "Show Circle",
  "cases/collider/Shape.fire.34": "Show Box",
  "cases/collider/Shape.fire.43": "Show Polygon",
  "cases/collider/Shape.fire.50": "Show Circle",
  "cases/collider/Shape.fire.57": "Show Box",
  "cases/motionStreak/MotionStreak.fire.1": "Change MotionStreak",
  "cases/spine/SpineBoy.fire.11": "Debug Slots",
  "cases/spine/SpineBoy.fire.18": "Debug Bones",
  "cases/spine/SpineBoy.fire.25": "Time Scale",
  "cases/spine/SpineBoy.fire.36": "Stop",
  "cases/spine/SpineBoy.fire.43": "Walk",
  "cases/spine/SpineBoy.fire.50": "Run",
  "cases/spine/SpineBoy.fire.58": "Jump",
  "cases/spine/SpineBoy.fire.65": "Shoot",
  "cases/tiledmap/Puzzle.fire.18": "You Win",
  "cases/tiledmap/Puzzle.fire.21": "Restart",
  "res/prefabs/ListItem.prefab.2": "Label ssss",
  "res/prefabs/Monster.prefab.3": "Name:",
  "res/prefabs/Monster.prefab.11": "Level :",
  "res/prefabs/Monster.prefab.19": "Hp :",
  "res/prefabs/Monster.prefab.27": "Attack :",
  "res/prefabs/Monster.prefab.35": "Defense :",
  "res/prefabs/loadItem.prefab.1": "Label",
  "resources/test assets/prefab.prefab.2": "This is Prefab",
  "resources/test assets/scene.fire.3": "Return Asset Loading Scene",
  "resources/test assets/scene.fire.6": "Return",
  "scripts/Global/Menu.js.1": "Temporary lack of introduction",
  "cases/anysdk/1": "Only works in the Android or iOS or Web-Mobile platforms",
  "cases/anysdk/2": "Only works in the Android or iOS platforms"
};

cc._RF.pop();
},{}],"gravity-radial":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'c8f672xHMpAeZdZzF0f7fa9', 'gravity-radial');
// cases/gravity-radial.js

var Gravity = require('./gravity');

cc.Class({
    'extends': Gravity,

    properties: {
        gravityForce: 500
    },

    _applyForce: function _applyForce(body) {
        var position = body.getPosition();
        var center = this.body.getPosition();

        var f = center.sub(position).normalize().mul(this.gravityForce * body.mass);

        body.applyForce(f, position, false);
    }
});

cc._RF.pop();
},{"./gravity":"gravity"}],"gravity":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'db6f0HR8SZFa5tEwXjbivXZ', 'gravity');
// cases/gravity.js

cc.Class({
    "extends": cc.Component,

    // use this for initialization
    onEnable: function onEnable() {
        var manager = cc.director.getPhysicsManager();

        this.bodies = [];
        this.body = this.getComponent(cc.RigidBody);
        this.originGravity = manager.gravity;
        manager.gravity = cc.v2();
    },

    onDisable: function onDisable() {
        cc.director.getPhysicsManager().gravity = this.originGravity;
    },

    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        this.bodies.push(otherCollider.body);
    },

    onEndContact: function onEndContact(contact, selfCollider, otherCollider) {
        var index = this.bodies.indexOf(otherCollider.body);
        if (index !== -1) {
            this.bodies.splice(index, 1);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (!this.body) {
            return;
        }

        var bodies = this.bodies;
        for (var i = 0; i < bodies.length; i++) {
            this._applyForce(bodies[i]);
        }
    },

    _applyForce: function _applyForce(body) {}
});

cc._RF.pop();
},{}],"i18n":[function(require,module,exports){
"use strict";
cc._RF.push(module, '93789C/shtIL6entYsZPjee', 'i18n');
// i18n/i18n.js

var Polyglot = require('polyglot');
var lang = cc.sys.language;
if (lang !== 'zh') {
    lang = 'en';
}
var data = require(lang); // update this to set your default displaying language in editor
// let polyglot = null;
var polyglot = new Polyglot({ phrases: data, allowMissing: true });

module.exports = {
    /**
     * This method allow you to switch language during runtime, language argument should be the same as your data file name
     * such as when language is 'zh', it will load your 'zh.js' data source.
     * @method init
     * @param language - the language specific data file name, such as 'zh' to load 'zh.js'
     */
    init: function init(language) {
        lang = language;
        data = require(lang);
        polyglot.replace(data);
    },
    /**
     * this method takes a text key as input, and return the localized string
     * Please read https://github.com/airbnb/polyglot.js for details
     * @method t
     * @return {String} localized string
     * @example
     *
     * var myText = i18n.t('MY_TEXT_KEY');
     *
     * // if your data source is defined as
     * // {"hello_name": "Hello, %{name}"}
     * // you can use the following to interpolate the text
     * var greetingText = i18n.t('hello_name', {name: 'nantas'}); // Hello, nantas
     */
    t: function t(key, opt) {
        return polyglot.t(key, opt);
    }
};

cc._RF.pop();
},{"polyglot":"polyglot"}],"manifold":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'fc197NwJqFAXpztnO3O1if7', 'manifold');
// cases/manifold.js

cc.Class({
    "extends": cc.Component,

    properties: {
        pointTemp: {
            type: cc.Node,
            "default": null
        }
    },

    onPreSolve: function onPreSolve(contact) {
        var worldManifold = contact.getWorldManifold();
        var points = worldManifold.points;
        var scene = cc.director.getScene();

        function removeSelf() {
            this.parent = null;
        }

        for (var i = 0; i < points.length; i++) {
            var p = points[i];

            var node = cc.instantiate(this.pointTemp);
            node.active = true;

            var fadeOut = cc.fadeOut(0.2);
            var remove = cc.callFunc(removeSelf, node);
            var action = cc.sequence(fadeOut, remove);

            node.runAction(action);
            node.x = p.x;
            node.y = p.y;

            node.parent = scene;
        }
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RF.pop();
},{}],"one-side-platform":[function(require,module,exports){
"use strict";
cc._RF.push(module, '18aa1UEm79FlIskk/BhE5v3', 'one-side-platform');
// cases/one-side-platform.js

// http://www.iforce2d.net/b2dtut/one-way-walls

cc.Class({
    "extends": cc.Component,

    properties: {},

    onEnable: function onEnable() {
        this.debugDrawFlags = cc.director.getPhysicsManager().debugDrawFlags;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
    },

    onDisable: function onDisable() {
        cc.director.getPhysicsManager().debugDrawFlags = this.debugDrawFlags;
    },

    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        var otherBody = otherCollider.body;
        var platformBody = selfCollider.body;

        var worldManifold = contact.getWorldManifold();
        var points = worldManifold.points;

        //check if contact points are moving into platform
        for (var i = 0; i < points.length; i++) {
            var pointVelPlatform = platformBody.getLinearVelocityFromWorldPoint(points[i]);
            var pointVelOther = otherBody.getLinearVelocityFromWorldPoint(points[i]);
            var relativeVel = platformBody.getLocalVector(pointVelOther - pointVelPlatform);

            if (relativeVel.y < -1) //if moving down faster than 1 m/s, handle as before
                return; //point is moving into platform, leave contact solid and exit
            else if (relativeVel.y < 1) {
                    //if moving slower than 1 m/s
                    //borderline case, moving only slightly out of platform
                    var relativePoint = platformBody.getLocalPoint(points[i]);
                    var platformFaceY = 0.5; //front of platform, from fixture definition :(
                    if (relativePoint.y > platformFaceY - 0.05) return; //contact point is less than 5cm inside front face of platfrom
                } else {
                        //moving up faster than 1 m/s
                    }
        }

        // store disabled state to contact
        contact.disabled = true;
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RF.pop();
},{}],"physics-bound":[function(require,module,exports){
"use strict";
cc._RF.push(module, '8bb59G9YJZM663ZrZZZSww8', 'physics-bound');
// cases/physics-bound.js


window.addComponent = function (node, component) {
    component.node = node;
    node._components.push(component);

    if (node._activeInHierarchy) {
        if (typeof component.__preload === 'function') {
            cc.director._compScheduler.doPreloadComp(component);
        }
        // call onLoad/onEnable
        cc.director._compScheduler.activateComp(component);
    }

    return component;
};

cc.Class({
    'extends': cc.Component,

    properties: {
        size: cc.size(0, 0)
    },

    // use this for initialization
    onLoad: function onLoad() {
        var width = this.size.width || this.node.width;
        var height = this.size.height || this.node.height;

        var body = new cc.RigidBody();
        body.type = b2.Body.b2_staticBody;
        addComponent(this.node, body);

        this.addComponent(cc.MouseJoint);

        this._addBound(0, height / 2, width, 20);
        this._addBound(0, -height / 2, width, 20);
        this._addBound(-width / 2, 0, 20, height);
        this._addBound(width / 2, 0, 20, height);
    },

    _addBound: function _addBound(x, y, width, height) {
        var collider = new cc.PhysicsBoxCollider();
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;
        addComponent(this.node, collider);
    }
});

cc._RF.pop();
},{}],"physics-settings":[function(require,module,exports){
"use strict";
cc._RF.push(module, '9d86a1b/aNL8JDqJ7+E0XIU', 'physics-settings');
// physics-settings/physics-settings.js

var physicsManager = cc.director.getPhysicsManager();
physicsManager.enabled = true;

physicsManager.debugDrawFlags = 0;
// // cc.PhysicsManager.DrawBits.e_aabbBit |
// // cc.PhysicsManager.DrawBits.e_pairBit |
// // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
// cc.PhysicsManager.DrawBits.e_jointBit |
// cc.PhysicsManager.DrawBits.e_shapeBit
// ;

cc._RF.pop();
},{}],"polyglot":[function(require,module,exports){
(function (global){
"use strict";
cc._RF.push(module, '69decSgpRlE1rzEKp0RzG3V', 'polyglot');
// i18n/polyglot.js

//     (c) 2012-2016 Airbnb, Inc.
//
//     polyglot.js may be freely distributed under the terms of the BSD
//     license. For all licensing information, details, and documention:
//     http://airbnb.github.com/polyglot.js
//
//
// Polyglot.js is an I18n helper library written in JavaScript, made to
// work both in the browser and in Node. It provides a simple solution for
// interpolation and pluralization, based off of Airbnb's
// experience adding I18n functionality to its Backbone.js and Node apps.
//
// Polylglot is agnostic to your translation backend. It doesn't perform any
// translation; it simply gives you a way to manage translated phrases from
// your client- or server-side JavaScript application.

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.Polyglot = factory(root);
  }
})(typeof global !== 'undefined' ? global : this, function (root) {
  'use strict';

  var replace = String.prototype.replace;

  // ### Polyglot class constructor
  function Polyglot(options) {
    options = options || {};
    this.phrases = {};
    this.extend(options.phrases || {});
    this.currentLocale = options.locale || 'en';
    this.allowMissing = !!options.allowMissing;
    this.warn = options.warn || warn;
  }

  // ### Version
  Polyglot.VERSION = '1.0.0';

  // ### polyglot.locale([locale])
  //
  // Get or set locale. Internally, Polyglot only uses locale for pluralization.
  Polyglot.prototype.locale = function (newLocale) {
    if (newLocale) this.currentLocale = newLocale;
    return this.currentLocale;
  };

  // ### polyglot.extend(phrases)
  //
  // Use `extend` to tell Polyglot how to translate a given key.
  //
  //     polyglot.extend({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     });
  //
  // The key can be any string.  Feel free to call `extend` multiple times;
  // it will override any phrases with the same key, but leave existing phrases
  // untouched.
  //
  // It is also possible to pass nested phrase objects, which get flattened
  // into an object with the nested keys concatenated using dot notation.
  //
  //     polyglot.extend({
  //       "nav": {
  //         "hello": "Hello",
  //         "hello_name": "Hello, %{name}",
  //         "sidebar": {
  //           "welcome": "Welcome"
  //         }
  //       }
  //     });
  //
  //     console.log(polyglot.phrases);
  //     // {
  //     //   'nav.hello': 'Hello',
  //     //   'nav.hello_name': 'Hello, %{name}',
  //     //   'nav.sidebar.welcome': 'Welcome'
  //     // }
  //
  // `extend` accepts an optional second argument, `prefix`, which can be used
  // to prefix every key in the phrases object with some string, using dot
  // notation.
  //
  //     polyglot.extend({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     }, "nav");
  //
  //     console.log(polyglot.phrases);
  //     // {
  //     //   'nav.hello': 'Hello',
  //     //   'nav.hello_name': 'Hello, %{name}'
  //     // }
  //
  // This feature is used internally to support nested phrase objects.
  Polyglot.prototype.extend = function (morePhrases, prefix) {
    var phrase;

    for (var key in morePhrases) {
      if (morePhrases.hasOwnProperty(key)) {
        phrase = morePhrases[key];
        if (prefix) key = prefix + '.' + key;
        if (typeof phrase === 'object') {
          this.extend(phrase, key);
        } else {
          this.phrases[key] = phrase;
        }
      }
    }
  };

  // ### polyglot.unset(phrases)
  // Use `unset` to selectively remove keys from a polyglot instance.
  //
  //     polyglot.unset("some_key");
  //     polyglot.unset({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     });
  //
  // The unset method can take either a string (for the key), or an object hash with
  // the keys that you would like to unset.
  Polyglot.prototype.unset = function (morePhrases, prefix) {
    var phrase;

    if (typeof morePhrases === 'string') {
      delete this.phrases[morePhrases];
    } else {
      for (var key in morePhrases) {
        if (morePhrases.hasOwnProperty(key)) {
          phrase = morePhrases[key];
          if (prefix) key = prefix + '.' + key;
          if (typeof phrase === 'object') {
            this.unset(phrase, key);
          } else {
            delete this.phrases[key];
          }
        }
      }
    }
  };

  // ### polyglot.clear()
  //
  // Clears all phrases. Useful for special cases, such as freeing
  // up memory if you have lots of phrases but no longer need to
  // perform any translation. Also used internally by `replace`.
  Polyglot.prototype.clear = function () {
    this.phrases = {};
  };

  // ### polyglot.replace(phrases)
  //
  // Completely replace the existing phrases with a new set of phrases.
  // Normally, just use `extend` to add more phrases, but under certain
  // circumstances, you may want to make sure no old phrases are lying around.
  Polyglot.prototype.replace = function (newPhrases) {
    this.clear();
    this.extend(newPhrases);
  };

  // ### polyglot.t(key, options)
  //
  // The most-used method. Provide a key, and `t` will return the
  // phrase.
  //
  //     polyglot.t("hello");
  //     => "Hello"
  //
  // The phrase value is provided first by a call to `polyglot.extend()` or
  // `polyglot.replace()`.
  //
  // Pass in an object as the second argument to perform interpolation.
  //
  //     polyglot.t("hello_name", {name: "Spike"});
  //     => "Hello, Spike"
  //
  // If you like, you can provide a default value in case the phrase is missing.
  // Use the special option key "_" to specify a default.
  //
  //     polyglot.t("i_like_to_write_in_language", {
  //       _: "I like to write in %{language}.",
  //       language: "JavaScript"
  //     });
  //     => "I like to write in JavaScript."
  //
  Polyglot.prototype.t = function (key, options) {
    var phrase, result;
    options = options == null ? {} : options;
    // allow number as a pluralization shortcut
    if (typeof options === 'number') {
      options = { smart_count: options };
    }
    if (typeof this.phrases[key] === 'string') {
      phrase = this.phrases[key];
    } else if (typeof options._ === 'string') {
      phrase = options._;
    } else if (this.allowMissing) {
      phrase = key;
    } else {
      this.warn('Missing translation for key: "' + key + '"');
      result = key;
    }
    if (typeof phrase === 'string') {
      options = clone(options);
      result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
      result = interpolate(result, options);
    }
    return result;
  };

  // ### polyglot.has(key)
  //
  // Check if polyglot has a translation for given key
  Polyglot.prototype.has = function (key) {
    return key in this.phrases;
  };

  // #### Pluralization methods
  // The string that separates the different phrase possibilities.
  var delimeter = '||||';

  // Mapping from pluralization group plural logic.
  var pluralTypes = {
    chinese: function chinese(n) {
      return 0;
    },
    german: function german(n) {
      return n !== 1 ? 1 : 0;
    },
    french: function french(n) {
      return n > 1 ? 1 : 0;
    },
    russian: function russian(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    czech: function czech(n) {
      return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
    },
    polish: function polish(n) {
      return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    icelandic: function icelandic(n) {
      return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
    }
  };

  // Mapping from pluralization group to individual locales.
  var pluralTypeToLanguages = {
    chinese: ['fa', 'id', 'ja', 'ko', 'lo', 'ms', 'th', 'tr', 'zh'],
    german: ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv'],
    french: ['fr', 'tl', 'pt-br'],
    russian: ['hr', 'ru'],
    czech: ['cs', 'sk'],
    polish: ['pl'],
    icelandic: ['is']
  };

  function langToTypeMap(mapping) {
    var type,
        langs,
        l,
        ret = {};
    for (type in mapping) {
      if (mapping.hasOwnProperty(type)) {
        langs = mapping[type];
        for (l in langs) {
          ret[langs[l]] = type;
        }
      }
    }
    return ret;
  }

  // Trim a string.
  var trimRe = /^\s+|\s+$/g;
  function trim(str) {
    return replace.call(str, trimRe, '');
  }

  // Based on a phrase text that contains `n` plural forms separated
  // by `delimeter`, a `locale`, and a `count`, choose the correct
  // plural form, or none if `count` is `null`.
  function choosePluralForm(text, locale, count) {
    var ret, texts, chosenText;
    if (count != null && text) {
      texts = text.split(delimeter);
      chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
      ret = trim(chosenText);
    } else {
      ret = text;
    }
    return ret;
  }

  function pluralTypeName(locale) {
    var langToPluralType = langToTypeMap(pluralTypeToLanguages);
    return langToPluralType[locale] || langToPluralType.en;
  }

  function pluralTypeIndex(locale, count) {
    return pluralTypes[pluralTypeName(locale)](count);
  }

  // ### interpolate
  //
  // Does the dirty work. Creates a `RegExp` object for each
  // interpolation placeholder.
  var dollarRegex = /\$/g;
  var dollarBillsYall = '$$$$';
  function interpolate(phrase, options) {
    for (var arg in options) {
      if (arg !== '_' && options.hasOwnProperty(arg)) {
        // Ensure replacement value is escaped to prevent special $-prefixed
        // regex replace tokens. the "$$$$" is needed because each "$" needs to
        // be escaped with "$" itself, and we need two in the resulting output.
        var replacement = options[arg];
        if (typeof replacement === 'string') {
          replacement = replace.call(options[arg], dollarRegex, dollarBillsYall);
        }
        // We create a new `RegExp` each time instead of using a more-efficient
        // string replace so that the same argument can be replaced multiple times
        // in the same phrase.
        phrase = replace.call(phrase, new RegExp('%\\{' + arg + '\\}', 'g'), replacement);
      }
    }
    return phrase;
  }

  // ### warn
  //
  // Provides a warning in the console if a phrase key is missing.
  function warn(message) {
    root.console && root.console.warn && root.console.warn('WARNING: ' + message);
  }

  // ### clone
  //
  // Clone an object.
  function clone(source) {
    var ret = {};
    for (var prop in source) {
      ret[prop] = source[prop];
    }
    return ret;
  }

  return Polyglot;
});
//

cc._RF.pop();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"ray-cast-reflection":[function(require,module,exports){
"use strict";
cc._RF.push(module, '42cf8MpDYNJzZAXam4qVOMI', 'ray-cast-reflection');
// cases/ray-cast-reflection.js

cc.Class({
    "extends": cc.Component,

    properties: {
        radius: 1000
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.ctx = this.getComponent(cc.Graphics);
        this.angle = 0;
        this.center = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.angle += Math.PI / 20 * dt;

        var p1 = this.center;
        var p2 = cc.v2(Math.cos(this.angle), Math.sin(this.angle)).mulSelf(this.radius).addSelf(this.center);

        this.ctx.clear();

        this.remainLength = this.radius;
        this.rayCast(p1, p2);
    },

    rayCast: function rayCast(p1, p2) {
        var manager = cc.director.getPhysicsManager();
        var result = manager.rayCast(p1, p2);

        if (result) {
            p2 = result.point;
            this.ctx.circle(p2.x, p2.y, 5);
            this.ctx.fill();
        }

        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();

        if (!result) return;

        this.remainLength = this.remainLength - p2.sub(p1).mag();
        if (this.remainLength < 1) return;

        result.normal.mul(this.remainLength);

        p1 = p2;
        p2 = result.normal.mul(this.remainLength).add(p1);
        this.rayCast(p1, p2);
    }
});

cc._RF.pop();
},{}],"ray-cast":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'b0ac7pO5kxGfbsNUATZzFfK', 'ray-cast');
// cases/ray-cast.js

cc.Class({
    "extends": cc.Component,

    properties: {
        rayCastType: {
            "default": cc.RayCastType.Closest,
            type: cc.RayCastType
        },

        radius: 1000
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.ctx = this.getComponent(cc.Graphics);
        this.angle = 0;
        this.center = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        var _this = this;

        this.angle += Math.PI / 10 * dt;

        var p1 = this.center;
        var p2 = cc.v2(Math.cos(this.angle), Math.sin(this.angle)).mulSelf(this.radius).addSelf(this.center);

        var manager = cc.director.getPhysicsManager();
        var results = manager.rayCast(p1, p2, this.rayCastType);

        this.ctx.clear();

        if (this.rayCastType === cc.RayCastType.Closest || this.rayCastType === cc.RayCastType.Any) {
            if (results) {
                p2 = results.point;
            }
            this.ctx.circle(p2.x, p2.y, 5);
        } else {
            results.forEach(function (result) {
                _this.ctx.circle(result.point.x, result.point.y, 5);
            });
        }

        this.ctx.fill();

        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    },

    onClosestBtnClick: function onClosestBtnClick() {
        this.rayCastType = cc.RayCastType.Closest;
    },

    onAnyBtnClick: function onAnyBtnClick() {
        this.rayCastType = cc.RayCastType.Any;
    },

    onAllBtnClick: function onAllBtnClick() {
        this.rayCastType = cc.RayCastType.All;
    }
});

cc._RF.pop();
},{}],"shoot-arrow":[function(require,module,exports){
"use strict";
cc._RF.push(module, '6ac60G/olhOy7Kbp3Jz4Kon', 'shoot-arrow');
// cases/stick-arrow/shoot-arrow.js

// http://www.iforce2d.net/b2dtut/sticky-projectiles
// http://www.emanueleferonato.com/2012/12/14/box2d-flying-arrow-engine-first-attempt/

cc.Class({
    "extends": cc.Component,

    properties: {
        arrow: {
            type: cc.Node,
            "default": null
        }
    },

    onEnable: function onEnable() {
        this.debugDrawFlags = cc.director.getPhysicsManager().debugDrawFlags;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
    },

    onDisable: function onDisable() {
        cc.director.getPhysicsManager().debugDrawFlags = this.debugDrawFlags;
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
        this.arrowBodies = [];
    },

    onTouchBegan: function onTouchBegan(event) {
        var touchLoc = event.touch.getLocation();

        var node = cc.instantiate(this.arrow);
        node.active = true;

        var vec = cc.v2(touchLoc).sub(node.position);
        node.rotation = -Math.atan2(vec.y, vec.x) * 180 / Math.PI;

        cc.director.getScene().addChild(node);

        var distance = vec.mag();
        var velocity = vec.normalize().mulSelf(800);

        var arrowBody = node.getComponent(cc.RigidBody);
        arrowBody.linearVelocity = velocity;

        this.arrowBodies.push(arrowBody);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        var dragConstant = 0.1;
        var arrowBodies = this.arrowBodies;
        for (var i = 0; i < arrowBodies.length; i++) {
            var arrowBody = arrowBodies[i];
            var velocity = arrowBody.linearVelocity;
            var speed = velocity.mag();
            if (speed === 0) continue;
            var direction = velocity.normalize();

            var pointingDirection = arrowBody.getWorldVector(cc.v2(1, 0));
            var flightDirection = arrowBody.linearVelocity;
            var flightSpeed = flightDirection.mag();
            flightDirection.normalizeSelf();

            var dot = cc.pDot(flightDirection, pointingDirection);
            var dragForceMagnitude = (1 - Math.abs(dot)) * flightSpeed * flightSpeed * dragConstant * arrowBody.mass;

            var arrowTailPosition = arrowBody.getWorldPoint(cc.v2(-80, 0));
            arrowBody.applyForce(flightDirection.mul(-dragForceMagnitude), arrowTailPosition);
        }
    }
});

cc._RF.pop();
},{}],"smooth":[function(require,module,exports){
"use strict";
cc._RF.push(module, '728adjSVu9P25Kw0adaz7UV', 'smooth');
// cases/blob/smooth.js

'use strict';

// smooth helper
function getFirstControlPoints(rhs) {
    var n = rhs.length,
        x = [],
        // Solution vector.
    tmp = [],
        // Temp workspace.
    b = 2.0,
        i;

    x[0] = rhs[0] / b;

    for (i = 1; i < n; i++) {
        // Decomposition and forward substitution.
        tmp[i] = 1 / b;
        b = (i < n - 1 ? 4.0 : 2.0) - tmp[i];
        x[i] = (rhs[i] - x[i - 1]) / b;
    }

    for (i = 1; i < n; i++) {
        x[n - i - 1] -= tmp[n - i] * x[n - i]; // Backsubstitution.
    }
    return x;
}

function getCubicBezierCurvePoints(points, firstControlPoints, secondControlPoints) {
    var size = points.length,
        closed = points[size - 1].x === points[0].x && points[size - 1].y === points[0].y,
        n = size,

    // Add overlapping ends for averaging handles in closed paths
    overlap = 0;

    if (closed) {
        size = n = size - 1;
    }

    if (size <= 2) return;
    if (closed) {
        // Overlap up to 4 points since averaging beziers affect the 4
        // neighboring points
        overlap = Math.min(size, 4);
        n += Math.min(size, overlap) * 2;
    }

    var knots = [];
    for (var i = 0; i < size; i++) knots[i + overlap] = points[i];
    if (closed) {
        // If we're averaging, add the 4 last points again at the
        // beginning, and the 4 first ones at the end.
        for (var i = 0; i < overlap; i++) {
            knots[i] = points[i + size - overlap];
            knots[i + size + overlap] = points[i];
        }
    } else {
        n--;
    }
    // Calculate first Bezier control points
    // Right hand side vector
    var rhs = [];

    // Set right hand side X values
    for (var i = 1; i < n - 1; i++) rhs[i] = 4 * knots[i].x + 2 * knots[i + 1].x;
    rhs[0] = knots[0].x + 2 * knots[1].x;
    rhs[n - 1] = 3 * knots[n - 1].x;
    // Get first control points X-values
    var x = getFirstControlPoints(rhs);

    // Set right hand side Y values
    for (var i = 1; i < n - 1; i++) rhs[i] = 4 * knots[i].y + 2 * knots[i + 1].y;
    rhs[0] = knots[0].y + 2 * knots[1].y;
    rhs[n - 1] = 3 * knots[n - 1].y;
    // Get first control points Y-values
    var y = getFirstControlPoints(rhs);

    if (closed) {
        // Do the actual averaging simply by linearly fading between the
        // overlapping values.
        for (var i = 0, j = size; i < overlap; i++, j++) {
            var f1 = i / overlap,
                f2 = 1 - f1,
                ie = i + overlap,
                je = j + overlap;
            // Beginning
            x[j] = x[i] * f1 + x[j] * f2;
            y[j] = y[i] * f1 + y[j] * f2;
            // End
            x[je] = x[ie] * f2 + x[je] * f1;
            y[je] = y[ie] * f2 + y[je] * f1;
        }
        n--;
    }

    // Now set the calculated handles
    for (var i = overlap; i <= n - overlap; i++) {

        firstControlPoints[i - overlap] = {
            x: x[i],
            y: y[i]
        };

        if (i < n - 1) {
            secondControlPoints[i - overlap] = {
                x: 2 * knots[i + 1].x - x[i + 1],
                y: 2 * knots[i + 1].y - y[i + 1]
            };
        } else {
            secondControlPoints[i - overlap] = {
                x: (knots[n].x + x[n - 1]) / 2,
                y: (knots[n].y + y[n - 1]) / 2
            };
        }
    }
}

function getCubicBezierCurvePath(knots) {
    var firstControlPoints = [],
        secondControlPoints = [];

    getCubicBezierCurvePoints(knots, firstControlPoints, secondControlPoints);

    return [firstControlPoints, secondControlPoints];
}

module.exports = getCubicBezierCurvePath;

cc._RF.pop();
},{}],"zh":[function(require,module,exports){
"use strict";
cc._RF.push(module, '87f1fs0gohHDIfNg4aePXbt', 'zh');
// i18n/data/zh.js

module.exports = {
  "example_case_nonsupport_native_desktop_tips": "该测试用例不支持 Mac 平台和 Windows 平台",
  "example_case_nonsupport_runtime_tips": "该测试用例不支持 Runtime 平台",
  "example_case_nonsupport_mobile_tips": "该测试用例不支持移动平台",
  "example_case_nonsupport_web_canvas_tips": "该测试用例不支持 Canvas 模式",
  "example_case_support_webGl_tips": "该测试用例只支持 WebGL 模式",
  "example_case_support_mobile_tips": "该测试用例只支持移动平台",
  "example_case_support_mobile_android_tips": "该测试用例只支持 Android 移动平台",
  "example_case_support_native_chrome_tips": "该测试用例只支持 PC 平台上的 Chrome 浏览器",
  "example_case_support_native_desktop_tips": "该测试用例只支持 Mac 平台和 Windows 平台",
  "TestList.fire.30": "返回列表",
  "TestList.fire.37": "查看说明",
  "cases/01_graphics/01_sprite/AtlasSprite.fire.7": "这个精灵来自单张图片",
  "cases/01_graphics/01_sprite/AtlasSprite.fire.11": "这个精灵来自图集",
  "cases/01_graphics/01_sprite/FilledSprite.fire.9": "填充类型：水平",
  "cases/01_graphics/01_sprite/FilledSprite.fire.15": "填充类型：垂直",
  "cases/01_graphics/01_sprite/FilledSprite.fire.23": "填充类型：圆形",
  "cases/01_graphics/01_sprite/SimpleSprite.fire.7": "这是普通精灵",
  "cases/01_graphics/01_sprite/SlicedSprite.fire.7": "这是九宫格精灵",
  "cases/01_graphics/01_sprite/TiledSprite.fire.6": "这是平铺精灵",
  "cases/01_graphics/01_sprite/TrimmedSprite.fire.7": "自动剪裁 ",
  "cases/01_graphics/01_sprite/TrimmedSprite.fire.12": "未自动剪裁",
  "cases/01_graphics/02_particle/AutoRemoveParticle.fire.9": "粒子 1\n\"完成时自动移除\" 禁止",
  "cases/01_graphics/02_particle/AutoRemoveParticle.fire.13": "粒子 2\n\"完成时自动移除\" 开启",
  "cases/01_graphics/02_particle/ToggleParticle.fire.6": "按 \"按钮\" 进行开关粒子播放",
  "cases/02_ui/01_widget/AdvancedWidget.fire.7": "左上",
  "cases/02_ui/01_widget/AdvancedWidget.fire.9": "top: 10% left: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.14": "上",
  "cases/02_ui/01_widget/AdvancedWidget.fire.16": "top: -34px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.21": "右上",
  "cases/02_ui/01_widget/AdvancedWidget.fire.23": "top: 10% right: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.28": "左",
  "cases/02_ui/01_widget/AdvancedWidget.fire.30": "left: -50px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.35": "右",
  "cases/02_ui/01_widget/AdvancedWidget.fire.37": "right: -50px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.42": "左下",
  "cases/02_ui/01_widget/AdvancedWidget.fire.44": "bottom: 10% left: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.49": "下",
  "cases/02_ui/01_widget/AdvancedWidget.fire.51": "bottom: -34px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.56": "右下",
  "cases/02_ui/01_widget/AdvancedWidget.fire.58": "bottom:10% right:6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.63": "高级挂件",
  "cases/02_ui/01_widget/AlignOnceWidget.fire.1": "AlignOne 为 false 时，会一直保持对齐",
  "cases/02_ui/01_widget/AlignOnceWidget.fire.2": "AlignOne 为 true 时，只在 Widget 生效时对齐一次",
  "cases/02_ui/01_widget/AnimatedWidget.fire.9": "动画挂件。",
  "cases/02_ui/01_widget/WidgetAlign.fire.18": "挂件对齐方式。",
  "cases/02_ui/01_widget/AutoResize.fire.13": "挂件自动调整大小。",
  "cases/02_ui/02_label/GoldBeatingAnime.js.1": "0",
  "cases/02_ui/02_label/AlignFontLabel.fire.6": "文本对齐",
  "cases/02_ui/02_label/AlignFontLabel.fire.9": "水平对齐",
  "cases/02_ui/02_label/AlignFontLabel.fire.14": "哈啰！\n欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.16": "对齐: 靠左",
  "cases/02_ui/02_label/AlignFontLabel.fire.21": "哈啰！\n欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.23": "对齐: 居中",
  "cases/02_ui/02_label/AlignFontLabel.fire.28": "哈啰！\n欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.30": "对齐: 靠右",
  "cases/02_ui/02_label/AlignFontLabel.fire.33": "垂直对齐",
  "cases/02_ui/02_label/AlignFontLabel.fire.38": "欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.40": "对齐: 顶部",
  "cases/02_ui/02_label/AlignFontLabel.fire.45": "欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.47": "对齐: 居中",
  "cases/02_ui/02_label/AlignFontLabel.fire.52": "欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.54": "对齐: 底部",
  "cases/02_ui/02_label/SystemFontLabel.fire.6": "系统字体",
  "cases/02_ui/02_label/SystemFontLabel.fire.9": "换行",
  "cases/02_ui/02_label/SystemFontLabel.fire.14": "这是系统默认字体",
  "cases/02_ui/02_label/SystemFontLabel.fire.16": "Overflow: CLAMP",
  "cases/02_ui/02_label/SystemFontLabel.fire.21": "这是系统默认字体",
  "cases/02_ui/02_label/SystemFontLabel.fire.23": "Overflow: SHRINK",
  "cases/02_ui/02_label/SystemFontLabel.fire.26": "不换行",
  "cases/02_ui/02_label/SystemFontLabel.fire.31": "这是系统默认字体",
  "cases/02_ui/02_label/SystemFontLabel.fire.33": "Overflow: CLAMP",
  "cases/02_ui/02_label/SystemFontLabel.fire.38": "这是系统默认字体",
  "cases/02_ui/02_label/SystemFontLabel.fire.40": "Overflow: SHRINK",
  "cases/02_ui/02_label/SystemFontLabel.fire.45": "哈喽! 欢迎使用 Cocos Creator",
  "cases/02_ui/02_label/SystemFontLabel.fire.47": "Overflow: RESZIE_HEIGHT",
  "cases/02_ui/03_button/ButtonInScroll.js.1": "顶部按钮被点击！",
  "cases/02_ui/03_button/ButtonInScroll.js.2": "底部按钮被点击！",
  "cases/02_ui/03_button/ButtonInScroll.fire.21": "哪个按钮被点击？",
  "cases/02_ui/03_button/ButtonInScroll.fire.27": "拖动显示更多按钮\n\n",
  "cases/02_ui/03_button/SimpleButton.js.1": "左边的按钮被点击！",
  "cases/02_ui/03_button/SimpleButton.js.2": "右边的按钮被点击！",
  "cases/02_ui/03_button/ButtonInteractable.fire.7": "播放",
  "cases/02_ui/03_button/ButtonInteractable.fire.16": "停止",
  "cases/02_ui/03_button/ButtonInteractable.fire.21": "交互(interactable): true",
  "cases/02_ui/03_button/ButtonInteractable.fire.23": "交互(interactable): false",
  "cases/02_ui/03_button/ButtonInteractable.js.1": "交互(interactable): ",
  "cases/02_ui/03_button/ButtonInteractable.js.2": "交互(interactable): ",
  "cases/02_ui/03_button/SimpleButton.fire.6": "哪个按钮被点击？",
  "cases/02_ui/05_scrollView/Item.js.1": "Tmpl#",
  "cases/02_ui/04_progressbar/progressbar.fire.7": "水平进度条，进度 0.3",
  "cases/02_ui/04_progressbar/progressbar.fire.11": "反向水平进度条，进度 1.0",
  "cases/02_ui/04_progressbar/progressbar.fire.15": "垂直进度条 \n从下向上",
  "cases/02_ui/04_progressbar/progressbar.fire.19": "垂直进度条 \n从上向下",
  "cases/02_ui/04_progressbar/progressbar.fire.23": "设置了精灵的进度条",
  "cases/02_ui/04_progressbar/progressbar.fire.28": "设置了精灵（子控件）的进度条",
  "cases/02_ui/05_scrollView/ListView.fire.23": "Item #00",
  "cases/02_ui/05_scrollView/ScrollView.fire.7": "Scrollview 完整功能",
  "cases/02_ui/05_scrollView/ScrollView.fire.30": "Scrollview 没有惯性",
  "cases/02_ui/05_scrollView/ScrollView.fire.53": "Scrollview 没有弹性",
  "cases/02_ui/05_scrollView/ScrollView.fire.76": "Scrollview 只能水平滚动",
  "cases/02_ui/05_scrollView/ScrollView.fire.93": "Scrollview 只能垂直滚动",
  "cases/02_ui/05_scrollView/ScrollView.fire.110": "Scrollview 没有滚动条",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.6": "ScrollView 和垂直布局容器",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.40": "ScrollView 和水平布局容器",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.74": "ScrollView 和横向网格布局容器 ",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.144": "ScrollView 和纵向网格布局容器 ",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.6": "水平布局容器",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.31": "垂直布局容器",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.48": "横向网格布局容器",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.85": "纵向网格布局容器",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.6": "基本",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.31": "水平",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.36": "垂直",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.41": "横向网格布局容器",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.46": "纵向网格布局容器",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.8": "x:0, y:0",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.12": "x:480, y:320",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.16": "x:960, y:640",
  "cases/02_ui/07_editBox/editbox.js.1": "输入文本: ",
  "cases/02_ui/06_layout/LayoutNone.fire.6": "基本布局容器, 类型: None\n自动调整大小",
  "cases/02_ui/06_layout/LayoutNone.fire.35": "水平布局容器，类型: None\n不自动调整大小",
  "cases/02_ui/06_layout/LayoutNone.fire.60": "垂直布局容器，类型: None\n不自动调整大小",
  "cases/02_ui/06_layout/LayoutNone.fire.77": "横向网格布局容器，类型: None\n不自动调整大小",
  "cases/02_ui/06_layout/LayoutNone.fire.142": "纵向网格布局容器，类型: None\n不自动调整大小",
  "cases/02_ui/07_editBox/EditBox.fire.25": "单行密码框:",
  "cases/02_ui/07_editBox/EditBox.fire.27": "单行文本框:",
  "cases/02_ui/07_editBox/EditBox.fire.29": "多行文本框:",
  "cases/02_ui/07_editBox/EditBox.fire.32": "点击",
  "cases/02_ui/07_editBox/EditBox.fire.38": "按钮必须在 EditBox 的上面, \n并且它应该允许点击.",
  "cases/03_gameplay/01_player_control/EventManager/KeyboardInput.fire.6": "按 'A' 或 'D' 键控制小绵羊",
  "cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1": "touch (",
  "cases/03_gameplay/01_player_control/On/OnTouchInput.fire.10": "请触摸任意位置试试",
  "cases/03_gameplay/01_player_control/On/OnMultiTouchInput.fire.20": "用你的手指放缩图片！",
  "cases/03_gameplay/02_actions/SimpleAction.fire.13": "简单的动作",
  "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.14": "Label",
  "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.18": "自定义动画属性",
  "cases/03_gameplay/03_animation/AnimationEvent.js.1": "开始第",
  "cases/03_gameplay/03_animation/AnimationEvent.fire.6": "开始第1个动画",
  "cases/03_gameplay/03_animation/AnimationEvent.fire.14": "动画事件",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.11": "Linear",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.17": "Case In Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.23": "Case Out Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.29": "Case Out In Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.35": "Back Forward",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.41": "这是一个移动动画。",
  "cases/03_gameplay/03_animation/SpriteAnimation.fire.9": "这是精灵帧动画",
  "cases/03_gameplay/03_animation/CreateClip.fire.1": "动态创建动画剪辑",
  "cases/04_audio/SimpleAudio.fire.6": "享受音乐!",
  "cases/05_scripting/01_properties/NodeArray.fire.14": "这是节点数组",
  "cases/05_scripting/01_properties/NonSerialized.fire.6": "Label",
  "cases/05_scripting/01_properties/NonSerialized.fire.8": "Label",
  "cases/05_scripting/01_properties/NonSerialized.fire.10": "这是非序列化",
  "cases/05_scripting/01_properties/ReferenceType.fire.8": "Label",
  "cases/05_scripting/01_properties/ReferenceType.fire.11": "这个例子不包括运行时演示",
  "cases/05_scripting/01_properties/ValueType.fire.6": "这个例子不包括运行时演示",
  "cases/05_scripting/02_prefab/InstantiatePrefab.fire.7": "实例化预制资源",
  "cases/05_scripting/03_events/EventInMask.fire.23": "更改节点排序",
  "cases/05_scripting/03_events/SimpleEvent.fire.19": "触摸事件可以支持点击",
  "cases/05_scripting/03_events/SimpleEvent.fire.21": "鼠标事件可以支持单击、悬停、滚轮",
  "cases/05_scripting/03_events/SimpleEvent.fire.23": "自定义事件可以手动触发\n(点击上面的按钮)",
  "cases/05_scripting/03_events/SimpleEvent.fire.25": "基本事件",
  "cases/05_scripting/03_events/TouchPropagation.fire.15": "触摸事件冒泡",
  "cases/05_scripting/04_scheduler/scheduleCallbacks.js.1": "5.00 s",
  "cases/05_scripting/04_scheduler/scheduler.fire.9": "5.00 s",
  "cases/05_scripting/04_scheduler/scheduler.fire.12": "重复定时器",
  "cases/05_scripting/04_scheduler/scheduler.fire.18": "取消定时器",
  "cases/05_scripting/04_scheduler/scheduler.fire.24": "定时执行1次",
  "cases/05_scripting/04_scheduler/scheduler.fire.29": "使用 update 函数每帧更新计数",
  "cases/05_scripting/04_scheduler/scheduler.fire.31": "定时器",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.7": "Label",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.12": "Label",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.14": "交叉引用",
  "cases/05_scripting/06_life_cycle/life_cycle.fire.6": "生命周期",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.5": "资源加载",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.9": "加载 SpriteFrame",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.15": "加载 Texture",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.21": "加载 Audio",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.27": "加载 Txt",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.33": "加载 Font",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.39": "加载 Plist",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.45": "加载 Prefab",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.51": "加载 Scene",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.57": "加载 Animation",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.59": "加载 Spine",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.65": "当前尚无加载。",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.1": "已加载 ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.2": "播放 ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.3": "创建 ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.4": "播放音乐。",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.5": "这是字体！",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.7": "按类型",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.10": "加载 SpriteFrame",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.17": "按 Url",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.20": "加载预制资源",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.6": "这个例子不包括运行时演示",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.24": "全部加载",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.30": "加载全部的SpriteFrame",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.36": "清空",
  "cases/05_scripting/08_module/load_module.fire.6": "加载模块",
  "cases/05_scripting/08_module/load_module.fire.10": "创建怪物",
  "cases/05_scripting/09_singleton/Singleton.fire.6": "这例子不包含运行时演示",
  "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.1": "下载完成!!",
  "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.2": "正在下载: ",
  "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.3": "点击任意地方进行下载...",
  "cases/05_scripting/10_loadingBar/loadingBar.fire.7": "加载完成",
  "cases/05_scripting/10_loadingBar/loadingBar.fire.18": "正在下载",
  "cases/05_scripting/11_network/NetworkCtrl.js.1": "请稍等...",
  "cases/05_scripting/11_network/NetworkCtrl.js.2": "请稍等...",
  "cases/05_scripting/11_network/NetworkCtrl.js.3": "请稍等...",
  "cases/05_scripting/11_network/NetworkCtrl.js.4": "请稍等...",
  "cases/05_scripting/11_network/NetworkCtrl.js.5": "WebSocket\n发送二进制WS已打开.",
  "cases/05_scripting/11_network/NetworkCtrl.js.6": "WebSocket\n收到响应.",
  "cases/05_scripting/11_network/NetworkCtrl.js.7": "WebSocket\n发送二进制遇到错误.",
  "cases/05_scripting/11_network/NetworkCtrl.js.8": "WebSocket\nwebsocket 实例已关闭.",
  "cases/05_scripting/11_network/NetworkCtrl.js.9": "WebSocket\n发送二进制WS等待中...",
  "cases/05_scripting/11_network/NetworkCtrl.js.10": "WebSocket\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.11": "SocketIO\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.12": "SocketIO\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.13": "SocketIO\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.14": "SocketIO\n",
  "cases/05_scripting/11_network/network.fire.7": "Label",
  "cases/05_scripting/11_network/network.fire.6": "XMLHttpRequest",
  "cases/05_scripting/11_network/network.fire.11": "Label",
  "cases/05_scripting/11_network/network.fire.10": "XMLHttpRequest (ArrayBuffer)",
  "cases/05_scripting/11_network/network.fire.15": "Label",
  "cases/05_scripting/11_network/network.fire.14": "WebSocket",
  "cases/05_scripting/11_network/network.fire.19": "Label",
  "cases/05_scripting/11_network/network.fire.18": "SocketIO",
  "cases/native_call/native_call.fire.1": "点击按钮调用静态方法！",
  "cases/native_call/native_call.fire.2": "点击",
  "cases/collider/Category.fire.3": "组: 碰撞",
  "cases/collider/Category.fire.5": "组: 碰撞",
  "cases/collider/Category.fire.7": "组: 碰撞",
  "cases/collider/Category.fire.9": "组: 默认",
  "cases/collider/Shape.fire.20": "显示多边形",
  "cases/collider/Shape.fire.27": "显示圆",
  "cases/collider/Shape.fire.34": "显示盒子",
  "cases/collider/Shape.fire.43": "显示多边形",
  "cases/collider/Shape.fire.50": "显示圆",
  "cases/collider/Shape.fire.57": "显示盒子",
  "cases/motionStreak/MotionStreak.fire.1": "改变拖尾",
  "cases/spine/SpineBoy.fire.11": "调试插槽",
  "cases/spine/SpineBoy.fire.18": "调试关节",
  "cases/spine/SpineBoy.fire.25": "时间缩放",
  "cases/spine/SpineBoy.fire.36": "停止",
  "cases/spine/SpineBoy.fire.43": "走",
  "cases/spine/SpineBoy.fire.50": "跑",
  "cases/spine/SpineBoy.fire.58": "跳",
  "cases/spine/SpineBoy.fire.65": "射击",
  "cases/tiledmap/Puzzle.fire.18": "你赢了",
  "cases/tiledmap/Puzzle.fire.21": "重新开始",
  "res/prefabs/ListItem.prefab.2": "Label ssss",
  "res/prefabs/Monster.prefab.3": "名字:",
  "res/prefabs/Monster.prefab.11": "等级 :",
  "res/prefabs/Monster.prefab.19": "血量 :",
  "res/prefabs/Monster.prefab.27": "攻击 :",
  "res/prefabs/Monster.prefab.35": "防御 :",
  "res/prefabs/loadItem.prefab.1": "Label",
  "resources/test assets/prefab.prefab.2": "这是一个预制",
  "resources/test assets/scene.fire.3": "返回资源加载场景",
  "resources/test assets/scene.fire.6": "返回",
  "scripts/Global/Menu.js.1": "说明暂缺",
  "cases/anysdk/1": "该类型只在Android、iOS、Web-Mobile上有效果",
  "cases/anysdk/2": "该类型只在Android、iOS上有效果"
};

cc._RF.pop();
},{}]},{},["blob-emit","blob","smooth","cases-settings","chain","conveyor-belt","cutting-objects","gravity-radial","gravity","manifold","one-side-platform","physics-bound","ray-cast-reflection","ray-cast","arrow","shoot-arrow","LabelLocalized","en","zh","i18n","polyglot","physics-settings","AdaptiveSprite","Helpers","Instruction","ListItem","Menu","SceneList","TipsManager"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NjLWRldi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3RhcnQtc2NlbmUvc2NyaXB0cy9HbG9iYWwvQWRhcHRpdmVTcHJpdGUuanMiLCJzdGFydC1zY2VuZS9zY3JpcHRzL0dsb2JhbC9IZWxwZXJzLmpzIiwic3RhcnQtc2NlbmUvc2NyaXB0cy9HbG9iYWwvSW5zdHJ1Y3Rpb24uanMiLCJpMThuL0xhYmVsTG9jYWxpemVkLmpzIiwic3RhcnQtc2NlbmUvc2NyaXB0cy9HbG9iYWwvTGlzdEl0ZW0uanMiLCJzdGFydC1zY2VuZS9zY3JpcHRzL0dsb2JhbC9NZW51LmpzIiwic3RhcnQtc2NlbmUvc2NyaXB0cy9HbG9iYWwvU2NlbmVMaXN0LmpzIiwic3RhcnQtc2NlbmUvc2NyaXB0cy9HbG9iYWwvVGlwc01hbmFnZXIuanMiLCJjYXNlcy9zdGljay1hcnJvdy9hcnJvdy5qcyIsImNhc2VzL2Jsb2IvYmxvYi1lbWl0LmpzIiwiY2FzZXMvYmxvYi9ibG9iLmpzIiwiY2FzZXMvY2FzZXMtc2V0dGluZ3MuanMiLCJjYXNlcy9jaGFpbi5qcyIsImNhc2VzL2NvbnZleW9yLWJlbHQuanMiLCJjYXNlcy9jdXR0aW5nLW9iamVjdHMuanMiLCJpMThuL2RhdGEvZW4uanMiLCJjYXNlcy9ncmF2aXR5LXJhZGlhbC5qcyIsImNhc2VzL2dyYXZpdHkuanMiLCJpMThuL2kxOG4uanMiLCJjYXNlcy9tYW5pZm9sZC5qcyIsImNhc2VzL29uZS1zaWRlLXBsYXRmb3JtLmpzIiwiY2FzZXMvcGh5c2ljcy1ib3VuZC5qcyIsInBoeXNpY3Mtc2V0dGluZ3MvcGh5c2ljcy1zZXR0aW5ncy5qcyIsImkxOG4vcG9seWdsb3QuanMiLCJjYXNlcy9yYXktY2FzdC1yZWZsZWN0aW9uLmpzIiwiY2FzZXMvcmF5LWNhc3QuanMiLCJjYXNlcy9zdGljay1hcnJvdy9zaG9vdC1hcnJvdy5qcyIsImNhc2VzL2Jsb2Ivc21vb3RoLmpzIiwiaTE4bi9kYXRhL3poLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3pXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJzRlZGYxSlRGL0JISUtaVlkzRmFBcXNUJywgJ0FkYXB0aXZlU3ByaXRlJyk7XG4vLyBzdGFydC1zY2VuZS9zY3JpcHRzL0dsb2JhbC9BZGFwdGl2ZVNwcml0ZS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICBwYWRkaW5nOiAyMCxcblxuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgYmFja2dyb3VwOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5iYWNrZ3JvdXAud2lkdGggIT09IHRoaXMubGFiZWwud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VwLndpZHRoID0gdGhpcy5sYWJlbC53aWR0aCArIHRoaXMucGFkZGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5iYWNrZ3JvdXAuaGVpZ2h0ICE9PSB0aGlzLmxhYmVsLmhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdXAuaGVpZ2h0ID0gdGhpcy5sYWJlbC5oZWlnaHQgKyB0aGlzLnBhZGRpbmc7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICdjODY0ME0zb3pSRXJyVi9HbzN1VGtudCcsICdIZWxwZXJzJyk7XG4vLyBzdGFydC1zY2VuZS9zY3JpcHRzL0dsb2JhbC9IZWxwZXJzLmpzXG5cbmlmIChDQ19KU0IgJiYgY2MucnVudGltZSkge1xuICAgIC8vIGZpeCBjb2Nvcy1jcmVhdG9yL2ZpcmViYWxsIzM1NzhcbiAgICBjYy5Mb2FkZXJMYXllci5zZXRVc2VEZWZhdWx0U291cmNlKGZhbHNlKTtcbiAgICBjYy5EaWFsb2cuc2V0VXNlRGVmYXVsdFNvdXJjZShmYWxzZSk7XG59XG5cbi8vIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVkZWQpIGFuZCBtYXggKGV4Y2x1ZGVkKVxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0UmFuZG9tSW50OiBnZXRSYW5kb21JbnRcbn07XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJzZhODcxZ3k3M0ZETGFwM0VqZS8yaDZpJywgJ0luc3RydWN0aW9uJyk7XG4vLyBzdGFydC1zY2VuZS9zY3JpcHRzL0dsb2JhbC9JbnN0cnVjdGlvbi5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogJycsXG4gICAgICAgICAgICBtdWx0aWxpbmU6IHRydWVcbiAgICAgICAgfVxuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZVxuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGLnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGLnB1c2gobW9kdWxlLCAnZTRmODhhZHAzaEVSb0o0OERaMlBTQWwnLCAnTGFiZWxMb2NhbGl6ZWQnKTtcbi8vIGkxOG4vTGFiZWxMb2NhbGl6ZWQuanNcblxudmFyIGkxOG4gPSByZXF1aXJlKCdpMThuJyk7XG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5MYWJlbCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGV4dEtleToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiAnVEVYVF9LRVknLFxuICAgICAgICAgICAgbXVsdGlsaW5lOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcDogJ0VudGVyIGkxOG4ga2V5IGhlcmUnLFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiBub3RpZnkoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NnTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZ05vZGUuc2V0U3RyaW5nKHRoaXMuc3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTm9kZVNpemUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN0cmluZzoge1xuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwOiAnSGVyZSBzaG93cyB0aGUgbG9jYWxpemVkIHN0cmluZyBvZiBUZXh0IEtleScsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTE4bi50KHRoaXMudGV4dEtleSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBjYy53YXJuKCdQbGVhc2Ugc2V0IGxhYmVsIHRleHQga2V5IGluIFRleHQgS2V5IHByb3BlcnR5LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJ2FhNjNiV05FOGhCZjRQNFNwMFgydVQwJywgJ0xpc3RJdGVtJyk7XG4vLyBzdGFydC1zY2VuZS9zY3JpcHRzL0dsb2JhbC9MaXN0SXRlbS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICB1cmw6ICcnLFxuICAgICAgICBiZzogY2MuU3ByaXRlLFxuICAgICAgICBidG46IGNjLkJ1dHRvblxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KG1lbnUpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IC0xO1xuICAgICAgICB0aGlzLm1lbnUgPSBtZW51O1xuICAgIH0sXG5cbiAgICBsb2FkRXhhbXBsZTogZnVuY3Rpb24gbG9hZEV4YW1wbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybCkge1xuICAgICAgICAgICAgdGhpcy5tZW51LmxvYWRTY2VuZSh0aGlzLnVybCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlSXRlbTogZnVuY3Rpb24gdXBkYXRlSXRlbShpZHgsIHksIG5hbWUsIHVybCkge1xuICAgICAgICB2YXIgaXNEaXIgPSAhdXJsO1xuICAgICAgICB0aGlzLmluZGV4ID0gaWR4O1xuICAgICAgICB0aGlzLm5vZGUueSA9IHk7XG4gICAgICAgIHRoaXMubm9kZS54ID0gaXNEaXIgPyA1MCA6IDEwMDtcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBuYW1lO1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5iZy5lbmFibGVkID0gIWlzRGlyO1xuICAgICAgICB0aGlzLmJ0bi5pbnRlcmFjdGFibGUgPSAhaXNEaXI7XG4gICAgfVxufSk7XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJzA0NTI1cHlZQmxOMjZTV2F3YVVGM2RBJywgJ01lbnUnKTtcbi8vIHN0YXJ0LXNjZW5lL3NjcmlwdHMvR2xvYmFsL01lbnUuanNcblxudmFyIGkxOG4gPSByZXF1aXJlKCdpMThuJyk7XG52YXIgU2NlbmVMaXN0ID0gcmVxdWlyZSgnU2NlbmVMaXN0Jyk7XG5cbnZhciBlbXB0eUZ1bmMgPSBmdW5jdGlvbiBlbXB0eUZ1bmMoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbn07XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZG1lOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIG1hc2s6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYnRuSW5mbzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uXG4gICAgICAgIH0sXG4gICAgICAgIGJ0bkJhY2s6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxuICAgICAgICB9LFxuICAgICAgICB0ZXN0TGlzdDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU2Nyb2xsVmlld1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLl9pc0xvYWRpbmdTY2VuZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dEZWJ1Z0RyYXcgPSBmYWxzZTtcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmVVcmwgPSAnVGVzdExpc3QuZmlyZSc7XG4gICAgICAgIHRoaXMuY29udGVudFBvcyA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNNZW51ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2FkSW5zdHJ1Y3Rpb24odGhpcy5jdXJyZW50U2NlbmVVcmwpO1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gOTk5O1xuXG4gICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMudGVzdExpc3Qubm9kZSk7XG4gICAgICAgIGlmICh0aGlzLnRlc3RMaXN0ICYmIHRoaXMudGVzdExpc3QuY29udGVudCkge1xuICAgICAgICAgICAgLy8gaW4gbWFpbiBzY2VuZVxuICAgICAgICAgICAgdGhpcy5zY2VuZUxpc3QgPSB0aGlzLnRlc3RMaXN0LmNvbnRlbnQuZ2V0Q29tcG9uZW50KCdTY2VuZUxpc3QnKTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmVMaXN0LmluaXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYmFja1RvTGlzdDogZnVuY3Rpb24gYmFja1RvTGlzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzTG9hZGluZ1NjZW5lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNMb2FkaW5nU2NlbmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dSZWFkbWUobnVsbCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZVVybCA9ICdUZXN0TGlzdC5maXJlJztcbiAgICAgICAgdGhpcy5pc01lbnUgPSB0cnVlO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ1Rlc3RMaXN0JywgdGhpcy5vbkxvYWRTY2VuZUZpbmlzaC5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgbG9hZFNjZW5lOiBmdW5jdGlvbiBsb2FkU2NlbmUodXJsKSB7XG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1NjZW5lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250ZW50UG9zID0gdGhpcy50ZXN0TGlzdC5nZXRDb250ZW50UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmVVcmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaXNNZW51ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGVzdExpc3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHVybCwgdGhpcy5vbkxvYWRTY2VuZUZpbmlzaC5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgb25Mb2FkU2NlbmVGaW5pc2g6IGZ1bmN0aW9uIG9uTG9hZFNjZW5lRmluaXNoKCkge1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5jdXJyZW50U2NlbmVVcmw7XG4gICAgICAgIHRoaXMubG9hZEluc3RydWN0aW9uKHVybCk7XG4gICAgICAgIHRoaXMudGVzdExpc3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuaXNNZW51ICYmIHRoaXMuY29udGVudFBvcykge1xuICAgICAgICAgICAgdGhpcy50ZXN0TGlzdC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnRlc3RMaXN0LnNldENvbnRlbnRQb3NpdGlvbih0aGlzLmNvbnRlbnRQb3MpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzTG9hZGluZ1NjZW5lID0gZmFsc2U7XG4gICAgfSxcblxuICAgIGxvYWRJbnN0cnVjdGlvbjogZnVuY3Rpb24gbG9hZEluc3RydWN0aW9uKHVybCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB1cmxBcnIgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gdXJsQXJyW3VybEFyci5sZW5ndGggLSAxXS5yZXBsYWNlKCcuZmlyZScsICcnKTtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoJ3JlYWRtZS8nICsgZmlsZU5hbWUsIGZ1bmN0aW9uIChlcnIsIHR4dCkge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHNlbGYudGV4dC5zdHJpbmcgPSBpMThuLnQoXCJzY3JpcHRzL0dsb2JhbC9NZW51LmpzLjFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50ZXh0LnN0cmluZyA9IHR4dDtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNob3dSZWFkbWU6IGZ1bmN0aW9uIHNob3dSZWFkbWUoZXZlbnQsIGFjdGl2ZSkge1xuICAgICAgICBpZiAoYWN0aXZlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZG1lLmFjdGl2ZSA9ICF0aGlzLnJlYWRtZS5hY3RpdmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRtZS5hY3RpdmUgPSBhY3RpdmU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVhZG1lLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5tYXNrLm9uKCd0b3VjaHN0YXJ0JywgZW1wdHlGdW5jLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWFzay5vZmYoJ3RvdWNoc3RhcnQnLCBlbXB0eUZ1bmMsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYWJlbFR4dCA9IHRoaXMucmVhZG1lLmFjdGl2ZSA/ICflhbPpl63or7TmmI4nIDogJ+afpeeci+ivtOaYjic7XG4gICAgICAgIGNjLmZpbmQoJ2xhYmVsJywgdGhpcy5idG5JbmZvLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCkudGV4dEtleSA9IGxhYmVsVHh0O1xuXG4gICAgICAgIC8vIGVuOiBmaXggQ29sbGlkZXIgRGVidWdEcmF3IGFsd2F5cyBkaXNwbGF5ZWQgb24gdG9wIG9mIHRoZSBwcm9ibGVtLlxuICAgICAgICAvLyB6aO+8muino+WGsyBDb2xsaWRlciBEZWJ1Z0RyYXcg5LiA55u05pi+56S65Zyo5pyA5LiK5bGC55qE6Zeu6aKY44CCXG4gICAgICAgIHZhciBlbmFibGVkRGVidWdEcmF3ID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXc7XG4gICAgICAgIGlmICh0aGlzLnJlYWRtZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0RlYnVnRHJhdyA9IGVuYWJsZWREZWJ1Z0RyYXc7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXcgPSB0aGlzLnNob3dEZWJ1Z0RyYXc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW46IGZpeCBWaWRlbyBQbGF5ZXIgYWx3YXlzIGRpc3BsYXllZCBvbiB0b3Agb2YgdGhlIHByb2JsZW0uXG4gICAgICAgIC8vIHpo77ya5L+u5aSNIFZpZGVvIFBsYXllciDkuIDnm7TmmL7npLrlnKjmnIDkuIrlsYLnmoTpl67popjjgIJcbiAgICAgICAgdmFyIHZpZGVvUGxheWVyID0gY2MuZmluZCgnQ2FudmFzL1ZpZGVvUGxheWVyJyk7XG4gICAgICAgIGlmICh2aWRlb1BsYXllcikge1xuICAgICAgICAgICAgdmlkZW9QbGF5ZXIuYWN0aXZlID0gIXRoaXMucmVhZG1lLmFjdGl2ZTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICc0NzNiOHd4czU1T3NKdm94VmRZQ3pURicsICdTY2VuZUxpc3QnKTtcbi8vIHN0YXJ0LXNjZW5lL3NjcmlwdHMvR2xvYmFsL1NjZW5lTGlzdC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGl0ZW1QcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBpbml0SXRlbUNvdW50OiAwLFxuICAgICAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3LFxuICAgICAgICBidWZmZXJab25lOiAwIH0sXG5cbiAgICAvLyB3aGVuIGl0ZW0gaXMgYXdheSBmcm9tIGJ1ZmZlclpvbmUsIHdlIHJlbG9jYXRlIGl0XG4gICAgY3JlYXRlSXRlbTogZnVuY3Rpb24gY3JlYXRlSXRlbSh4LCB5LCBuYW1lLCB1cmwpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmYWIpO1xuICAgICAgICB2YXIgaXRlbUNvbXAgPSBpdGVtLmdldENvbXBvbmVudCgnTGlzdEl0ZW0nKTtcbiAgICAgICAgdmFyIGxhYmVsID0gaXRlbUNvbXAubGFiZWw7XG4gICAgICAgIGxhYmVsLnN0cmluZyA9IG5hbWU7XG5cbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgaXRlbUNvbXAudXJsID0gdXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaXRlbS53aWR0aCA9IHc7XG4gICAgICAgIGl0ZW0ueCA9IHg7XG4gICAgICAgIGl0ZW0ueSA9IHk7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChpdGVtKTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQobWVudSkge1xuICAgICAgICB0aGlzLm1lbnUgPSBtZW51O1xuICAgICAgICB0aGlzLnNjZW5lTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLml0ZW1MaXN0ID0gW107XG4gICAgICAgIHRoaXMudXBkYXRlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gMC4yO1xuICAgICAgICB0aGlzLmxhc3RDb250ZW50UG9zWSA9IDA7IC8vIHVzZSB0aGlzIHZhcmlhYmxlIHRvIGRldGVjdCBpZiB3ZSBhcmUgc2Nyb2xsaW5nIHVwIG9yIGRvd25cbiAgICAgICAgdGhpcy5pbml0TGlzdCgpO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBpbml0TGlzdDogZnVuY3Rpb24gaW5pdExpc3QoKSB7XG4gICAgICAgIHZhciBzY2VuZXMgPSBjYy5nYW1lLl9zY2VuZUluZm9zO1xuICAgICAgICB2YXIgZGljdCA9IHt9O1xuXG4gICAgICAgIGlmIChzY2VuZXMpIHtcbiAgICAgICAgICAgIHZhciBpLCBqO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNjZW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBzY2VuZXNbaV0udXJsO1xuICAgICAgICAgICAgICAgIHZhciBkaXJuYW1lID0gY2MucGF0aC5kaXJuYW1lKHVybCkucmVwbGFjZSgnZGI6Ly9hc3NldHMvY2FzZXMvJywgJycpO1xuICAgICAgICAgICAgICAgIGlmIChkaXJuYW1lID09PSAnZGI6Ly9hc3NldHMvcmVzb3VyY2VzL3Rlc3QgYXNzZXRzJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNjZW5lbmFtZSA9IGNjLnBhdGguYmFzZW5hbWUodXJsLCAnLmZpcmUnKTtcbiAgICAgICAgICAgICAgICBpZiAoc2NlbmVuYW1lID09PSAnVGVzdExpc3QnKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmICghZGlybmFtZSkgZGlybmFtZSA9ICdfcm9vdCc7XG4gICAgICAgICAgICAgICAgaWYgKCFkaWN0W2Rpcm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpY3RbZGlybmFtZV0gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGljdFtkaXJuYW1lXVtzY2VuZW5hbWVdID0gdXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2MubG9nKCdmYWlsZWQgdG8gZ2V0IHNjZW5lIGxpc3QhJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29tcGlsZSBzY2VuZSBkaWN0IHRvIGFuIGFycmF5XG4gICAgICAgIHZhciBkaXJzID0gT2JqZWN0LmtleXMoZGljdCk7XG4gICAgICAgIGRpcnMuc29ydCgpO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZGlycy5sZW5ndGg7ICsrX2kpIHtcbiAgICAgICAgICAgIHRoaXMuc2NlbmVMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IGRpcnNbX2ldLFxuICAgICAgICAgICAgICAgIHVybDogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgc2NlbmVuYW1lcyA9IE9iamVjdC5rZXlzKGRpY3RbZGlyc1tfaV1dKTtcbiAgICAgICAgICAgIHNjZW5lbmFtZXMuc29ydCgpO1xuICAgICAgICAgICAgZm9yICh2YXIgX2ogPSAwOyBfaiA8IHNjZW5lbmFtZXMubGVuZ3RoOyArK19qKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9uYW1lID0gc2NlbmVuYW1lc1tfal07XG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGRpY3RbZGlyc1tfaV1dW19uYW1lXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB5ID0gMDtcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9ICh0aGlzLnNjZW5lTGlzdC5sZW5ndGggKyAxKSAqIDUwO1xuICAgICAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCB0aGlzLmluaXRJdGVtQ291bnQ7ICsrX2kyKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbVByZWZhYikuZ2V0Q29tcG9uZW50KCdMaXN0SXRlbScpO1xuICAgICAgICAgICAgdmFyIGl0ZW1JbmZvID0gdGhpcy5zY2VuZUxpc3RbX2kyXTtcbiAgICAgICAgICAgIGl0ZW0uaW5pdCh0aGlzLm1lbnUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGl0ZW0ubm9kZSk7XG4gICAgICAgICAgICB5IC09IDUwO1xuICAgICAgICAgICAgaXRlbS51cGRhdGVJdGVtKF9pMiwgeSwgaXRlbUluZm8ubmFtZSwgaXRlbUluZm8udXJsKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbUxpc3QucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRQb3NpdGlvbkluVmlldzogZnVuY3Rpb24gZ2V0UG9zaXRpb25JblZpZXcoaXRlbSkge1xuICAgICAgICAvLyBnZXQgaXRlbSBwb3NpdGlvbiBpbiBzY3JvbGx2aWV3J3Mgbm9kZSBzcGFjZVxuICAgICAgICB2YXIgd29ybGRQb3MgPSBpdGVtLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoaXRlbS5wb3NpdGlvbik7XG4gICAgICAgIHZhciB2aWV3UG9zID0gdGhpcy5zY3JvbGxWaWV3Lm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xuICAgICAgICByZXR1cm4gdmlld1BvcztcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lciArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlVGltZXIgPCB0aGlzLnVwZGF0ZUludGVydmFsKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIHdlIGRvbid0IG5lZWQgdG8gZG8gdGhlIG1hdGggZXZlcnkgZnJhbWVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVyID0gMDtcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5pdGVtTGlzdDtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyWm9uZTtcbiAgICAgICAgdmFyIGlzRG93biA9IHRoaXMubm9kZS55IDwgdGhpcy5sYXN0Q29udGVudFBvc1k7IC8vIHNjcm9sbGluZyBkaXJlY3Rpb25cbiAgICAgICAgdmFyIGN1ckl0ZW1Db3VudCA9IHRoaXMuaXRlbUxpc3QubGVuZ3RoO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gNTAgKiBjdXJJdGVtQ291bnQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VySXRlbUNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgICB2YXIgaXRlbU5vZGUgPSBpdGVtLm5vZGU7XG4gICAgICAgICAgICB2YXIgdmlld1BvcyA9IHRoaXMuZ2V0UG9zaXRpb25JblZpZXcoaXRlbU5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzRG93bikge1xuICAgICAgICAgICAgICAgIC8vIGlmIGF3YXkgZnJvbSBidWZmZXIgem9uZSBhbmQgbm90IHJlYWNoaW5nIHRvcCBvZiBjb250ZW50XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdQb3MueSA8IC1idWZmZXIgJiYgaXRlbU5vZGUueSArIG9mZnNldCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0lkeCA9IGl0ZW0uaW5kZXggLSBjdXJJdGVtQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdJbmZvID0gdGhpcy5zY2VuZUxpc3RbbmV3SWR4XTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS51cGRhdGVJdGVtKG5ld0lkeCwgaXRlbU5vZGUueSArIG9mZnNldCwgbmV3SW5mby5uYW1lLCBuZXdJbmZvLnVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBhd2F5IGZyb20gYnVmZmVyIHpvbmUgYW5kIG5vdCByZWFjaGluZyBib3R0b20gb2YgY29udGVudFxuICAgICAgICAgICAgICAgIGlmICh2aWV3UG9zLnkgPiBidWZmZXIgJiYgaXRlbU5vZGUueSAtIG9mZnNldCA+IC10aGlzLm5vZGUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdJZHggPSBpdGVtLmluZGV4ICsgY3VySXRlbUNvdW50O1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3SW5mbyA9IHRoaXMuc2NlbmVMaXN0W25ld0lkeF07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlSXRlbShuZXdJZHgsIGl0ZW1Ob2RlLnkgLSBvZmZzZXQsIG5ld0luZm8ubmFtZSwgbmV3SW5mby51cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgbGFzdENvbnRlbnRQb3NZXG4gICAgICAgIHRoaXMubGFzdENvbnRlbnRQb3NZID0gdGhpcy5ub2RlLnk7XG4gICAgfVxufSk7XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJzZjOWJlekZ0dTVBSFpVY3lkaCs2UUpqJywgJ1RpcHNNYW5hZ2VyJyk7XG4vLyBzdGFydC1zY2VuZS9zY3JpcHRzL0dsb2JhbC9UaXBzTWFuYWdlci5qc1xuXG4vL1xuLy8g55So5LqO5o+Q56S655So5oi35ZOq5Lqb6IyD5L6L5LiN5pSv5oyB5bmz5Y+wXG4vL1xudmFyIGkxOG4gPSByZXF1aXJlKCdpMThuJyk7XG5cbi8vIOW5s+WPsOajgOafpVxudmFyIFBsYXRmb3JtVHlwZSA9IGNjLkVudW0oe1xuICAgIE5vZGU6IDAsXG4gICAgTmF0aXZlOiAxLFxuICAgIE5hdGl2ZV9EZXNrdG9wOiAyLFxuXG4gICAgTW9iaWxlOiAxMCxcbiAgICBNb2JpbGVfQW5kcm9pZDogMTEsXG5cbiAgICBSdW50aW1lOiAyMCxcblxuICAgIFdlYkdsOiAzMCxcbiAgICBDYW52YXM6IDMxLFxuXG4gICAgTmF0aXZlX0Jyb3dzZXJfQ2hyb21lOiAxMDBcbn0pO1xuXG52YXIgY2FudmFzID0gbnVsbDtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzdXBwb3J0OiBmYWxzZSxcbiAgICAgICAgLy8g6ZyA6KaB5qOA5rWL55qE5bmz5Y+wXG4gICAgICAgIHBsYXRmb3JtOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFBsYXRmb3JtVHlwZS5Ob2RlLFxuICAgICAgICAgICAgdHlwZTogUGxhdGZvcm1UeXBlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuX3Nob3dUaXBzKCk7XG4gICAgfSxcblxuICAgIF9jaGVja05vblN1cHBvcnQ6IGZ1bmN0aW9uIF9jaGVja05vblN1cHBvcnQoKSB7XG4gICAgICAgIHZhciBzaG93ZWQgPSBmYWxzZSxcbiAgICAgICAgICAgIHRleHRLZXkgPSAnJztcbiAgICAgICAgc3dpdGNoICh0aGlzLnBsYXRmb3JtKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtVHlwZS5OYXRpdmVfRGVza3RvcDpcbiAgICAgICAgICAgICAgICBzaG93ZWQgPSBjYy5zeXMuaXNOYXRpdmUgJiYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldJTjMyIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLk1BQ09TKTtcbiAgICAgICAgICAgICAgICB0ZXh0S2V5ID0gaTE4bi50KFwiZXhhbXBsZV9jYXNlX25vbnN1cHBvcnRfbmF0aXZlX2Rlc2t0b3BfdGlwc1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm1UeXBlLk1vYmlsZTpcbiAgICAgICAgICAgICAgICBzaG93ZWQgPSBjYy5zeXMuaXNNb2JpbGU7XG4gICAgICAgICAgICAgICAgdGV4dEtleSA9IGkxOG4udChcImV4YW1wbGVfY2FzZV9ub25zdXBwb3J0X21vYmlsZV90aXBzXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybVR5cGUuUnVudGltZTpcbiAgICAgICAgICAgICAgICBzaG93ZWQgPSBjYy5ydW50aW1lO1xuICAgICAgICAgICAgICAgIHRleHRLZXkgPSBpMThuLnQoXCJleGFtcGxlX2Nhc2Vfbm9uc3VwcG9ydF9ydW50aW1lX3RpcHNcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtVHlwZS5DYW52YXM6XG4gICAgICAgICAgICAgICAgc2hvd2VkID0gY2MuX3JlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTO1xuICAgICAgICAgICAgICAgIHRleHRLZXkgPSBpMThuLnQoXCJleGFtcGxlX2Nhc2Vfbm9uc3VwcG9ydF93ZWJfY2FudmFzX3RpcHNcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNob3dlZDogc2hvd2VkLFxuICAgICAgICAgICAgdGV4dEtleTogdGV4dEtleVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBfY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiBfY2hlY2tTdXBwb3J0KCkge1xuICAgICAgICB2YXIgc2hvd2VkID0gZmFsc2UsXG4gICAgICAgICAgICB0ZXh0S2V5ID0gJyc7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wbGF0Zm9ybSkge1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybVR5cGUuTW9iaWxlOlxuICAgICAgICAgICAgICAgIHNob3dlZCA9ICFjYy5zeXMuaXNNb2JpbGUgfHwgY2MucnVudGltZTtcbiAgICAgICAgICAgICAgICB0ZXh0S2V5ID0gaTE4bi50KFwiZXhhbXBsZV9jYXNlX3N1cHBvcnRfbW9iaWxlX3RpcHNcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtVHlwZS5XZWJHbDpcbiAgICAgICAgICAgICAgICBzaG93ZWQgPSBjYy5fcmVuZGVyVHlwZSAhPT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9XRUJHTDtcbiAgICAgICAgICAgICAgICB0ZXh0S2V5ID0gaTE4bi50KFwiZXhhbXBsZV9jYXNlX3N1cHBvcnRfd2ViR2xfdGlwc1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm1UeXBlLk1vYmlsZV9BbmRyb2lkOlxuICAgICAgICAgICAgICAgIHNob3dlZCA9ICEoY2Muc3lzLmlzTW9iaWxlICYmIGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkFORFJPSUQpIHx8IGNjLnJ1bnRpbWU7XG4gICAgICAgICAgICAgICAgdGV4dEtleSA9IGkxOG4udChcImV4YW1wbGVfY2FzZV9zdXBwb3J0X21vYmlsZV9hbmRyb2lkX3RpcHNcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtVHlwZS5OYXRpdmVfQnJvd3Nlcl9DaHJvbWU6XG4gICAgICAgICAgICAgICAgc2hvd2VkID0gISghY2Muc3lzLmlzTW9iaWxlICYmIGNjLnN5cy5pc0Jyb3dzZXIgJiYgY2Muc3lzLmJyb3dzZXJUeXBlID09PSBjYy5zeXMuQlJPV1NFUl9UWVBFX0NIUk9NRSk7XG4gICAgICAgICAgICAgICAgdGV4dEtleSA9IGkxOG4udChcImV4YW1wbGVfY2FzZV9zdXBwb3J0X25hdGl2ZV9jaHJvbWVfdGlwc1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2hvd2VkOiBzaG93ZWQsXG4gICAgICAgICAgICB0ZXh0S2V5OiB0ZXh0S2V5XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIF9zaG93VGlwczogZnVuY3Rpb24gX3Nob3dUaXBzKCkge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSBQbGF0Zm9ybVR5cGUuTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmZvID0gdGhpcy5zdXBwb3J0ID8gdGhpcy5fY2hlY2tTdXBwb3J0KCkgOiB0aGlzLl9jaGVja05vblN1cHBvcnQoKTtcbiAgICAgICAgdmFyIGJnID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBiZy5lbmFibGVkID0gaW5mby5zaG93ZWQ7XG4gICAgICAgIGlmIChpbmZvLnNob3dlZCkge1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0NvbnRlbnQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgY29udGVudC50ZXh0S2V5ID0gaW5mby50ZXh0S2V5O1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJ2YxZGE1TXY0aHBOMlp4M3BtdEtPR1NkJywgJ2Fycm93Jyk7XG4vLyBjYXNlcy9zdGljay1hcnJvdy9hcnJvdy5qc1xuXG4vLyBodHRwOi8vd3d3Lmlmb3JjZTJkLm5ldC9iMmR0dXQvc3RpY2t5LXByb2plY3RpbGVzXG4vLyBodHRwOi8vd3d3LmVtYW51ZWxlZmVyb25hdG8uY29tLzIwMTIvMTIvMTQvYm94MmQtZmx5aW5nLWFycm93LWVuZ2luZS1maXJzdC1hdHRlbXB0L1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIG9uUG9zdFNvbHZlOiBmdW5jdGlvbiBvblBvc3RTb2x2ZShjb250YWN0LCBzZWxmQ29sbGlkZXIsIG90aGVyQ29sbGlkZXIsIGltcHVsc2UpIHtcbiAgICAgICAgaWYgKGltcHVsc2Uubm9ybWFsSW1wdWxzZXNbMF0gPCAxKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGNvbGxpZGVyQSA9IGNvbnRhY3QuY29sbGlkZXJBO1xuICAgICAgICB2YXIgY29sbGlkZXJCID0gY29udGFjdC5jb2xsaWRlckI7XG5cbiAgICAgICAgdmFyIHdlbGRKb2ludCA9IHNlbGZDb2xsaWRlci5ib2R5LndlbGRKb2ludDtcbiAgICAgICAgaWYgKHdlbGRKb2ludCkge1xuICAgICAgICAgICAgd2VsZEpvaW50LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHNlbGZDb2xsaWRlci5ib2R5LndlbGRKb2ludCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXJyb3dCb2R5ID0gc2VsZkNvbGxpZGVyLmJvZHk7XG4gICAgICAgIHZhciB0YXJnZXRCb2R5ID0gb3RoZXJDb2xsaWRlci5ib2R5O1xuICAgICAgICB2YXIgd29ybGRDb29yZHNBbmNob3JQb2ludCA9IGFycm93Qm9keS5nZXRXb3JsZFBvaW50KGNjLnYyKDAuNiwgMCkpO1xuXG4gICAgICAgIHZhciBqb2ludCA9IG5ldyBjYy5XZWxkSm9pbnQoKTtcbiAgICAgICAgam9pbnQuY29ubmVjdGVkQm9keSA9IHRhcmdldEJvZHk7XG4gICAgICAgIGpvaW50LmFuY2hvciA9IGFycm93Qm9keS5nZXRMb2NhbFBvaW50KHdvcmxkQ29vcmRzQW5jaG9yUG9pbnQpO1xuICAgICAgICBqb2ludC5jb25uZWN0ZWRBbmNob3IgPSB0YXJnZXRCb2R5LmdldExvY2FsUG9pbnQod29ybGRDb29yZHNBbmNob3JQb2ludCk7XG4gICAgICAgIGpvaW50LnJlZmVyZW5jZUFuZ2xlID0gdGFyZ2V0Qm9keS5ub2RlLnJvdGF0aW9uIC0gYXJyb3dCb2R5Lm5vZGUucm90YXRpb247XG5cbiAgICAgICAgYWRkQ29tcG9uZW50KGFycm93Qm9keS5ub2RlLCBqb2ludCk7XG5cbiAgICAgICAgYXJyb3dCb2R5LndlbGRKb2ludCA9IGpvaW50O1xuICAgIH1cbn0pO1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICcxMWU0OEdlbzVKREJJVnBKa0hLN0RGdycsICdibG9iLWVtaXQnKTtcbi8vIGNhc2VzL2Jsb2IvYmxvYi1lbWl0LmpzXG5cbnZhciBCbG9iID0gcmVxdWlyZSgnLi9ibG9iJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgYmxvYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaEJlZ2FuLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgb25Ub3VjaEJlZ2FuOiBmdW5jdGlvbiBvblRvdWNoQmVnYW4oZXZlbnQpIHtcbiAgICAgICAgdmFyIHRvdWNoTG9jID0gZXZlbnQudG91Y2guZ2V0TG9jYXRpb24oKTtcblxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmxvYik7XG4gICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChub2RlKTtcblxuICAgICAgICBub2RlLmdldENvbXBvbmVudChCbG9iKS5lbWl0VG8odG91Y2hMb2MpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGLnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGLnB1c2gobW9kdWxlLCAnNDk2MGJpY0tUdE84NHVqTEdmZWtoME4nLCAnYmxvYicpO1xuLy8gY2FzZXMvYmxvYi9ibG9iLmpzXG5cblxudmFyIHNtb290aCA9IHJlcXVpcmUoJ3Ntb290aCcpO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHBhcnRpY2xlTnVtYmVyOiAxMixcbiAgICAgICAgcGFydGljbGVEaXN0YW5jZTogMzIsXG4gICAgICAgIHNwaGVyZVNpemU6IDEyXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcblxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSA2O1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VDb2xvciA9IGNjLmhleFRvQ29sb3IoJyM0OTUwNjknKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbENvbG9yID0gY2MuaGV4VG9Db2xvcignI2ZmZGU1OScpO1xuXG4gICAgICAgIHZhciB4ID0gdGhpcy5ub2RlLng7XG4gICAgICAgIHZhciB5ID0gdGhpcy5ub2RlLnk7XG5cbiAgICAgICAgdmFyIHBhcnRpY2xlTnVtYmVyID0gdGhpcy5wYXJ0aWNsZU51bWJlcjtcbiAgICAgICAgdmFyIHBhcnRpY2xlRGlzdGFuY2UgPSB0aGlzLnBhcnRpY2xlRGlzdGFuY2U7XG4gICAgICAgIHZhciBzcGhlcmVTaXplID0gdGhpcy5zcGhlcmVTaXplO1xuXG4gICAgICAgIHZhciBzcGhlcmVzID0gW107XG4gICAgICAgIHNwaGVyZXMucHVzaCh0aGlzLl9jcmVhdGVTcGhlcmUoMCwgMCwgc3BoZXJlU2l6ZSwgdGhpcy5ub2RlKSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0aWNsZU51bWJlcjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYW5nbGUgPSAyICogTWF0aC5QSSAvIHBhcnRpY2xlTnVtYmVyICogaTtcbiAgICAgICAgICAgIHZhciBwb3NYID0gcGFydGljbGVEaXN0YW5jZSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIHZhciBwb3NZID0gcGFydGljbGVEaXN0YW5jZSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgICAgIHZhciBzcGhlcmUgPSB0aGlzLl9jcmVhdGVTcGhlcmUocG9zWCwgcG9zWSwgc3BoZXJlU2l6ZSwgbnVsbCwgdGhpcy5ub2RlKTtcbiAgICAgICAgICAgIHNwaGVyZXMucHVzaChzcGhlcmUpO1xuXG4gICAgICAgICAgICB2YXIgam9pbnQgPSBuZXcgY2MuRGlzdGFuY2VKb2ludCgpO1xuICAgICAgICAgICAgam9pbnQuY29ubmVjdGVkQm9keSA9IHNwaGVyZXNbMF07XG4gICAgICAgICAgICBqb2ludC5kaXN0YW5jZSA9IHBhcnRpY2xlRGlzdGFuY2U7XG4gICAgICAgICAgICBqb2ludC5kYW1waW5nUmF0aW8gPSAwLjU7XG4gICAgICAgICAgICBqb2ludC5mcmVxdWVuY3kgPSA0O1xuICAgICAgICAgICAgYWRkQ29tcG9uZW50KHNwaGVyZXNbc3BoZXJlcy5sZW5ndGggLSAxXS5ub2RlLCBqb2ludCk7XG5cbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZVggPSBwb3NYIC0gc3BoZXJlc1tzcGhlcmVzLmxlbmd0aCAtIDJdLm5vZGUueDtcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2VZID0gcG9zWSAtIHNwaGVyZXNbc3BoZXJlcy5sZW5ndGggLSAyXS5ub2RlLnk7XG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlWCAqIGRpc3RhbmNlWCArIGRpc3RhbmNlWSAqIGRpc3RhbmNlWSk7XG5cbiAgICAgICAgICAgICAgICBqb2ludCA9IG5ldyBjYy5EaXN0YW5jZUpvaW50KCk7XG4gICAgICAgICAgICAgICAgam9pbnQuY29ubmVjdGVkQm9keSA9IHNwaGVyZXNbc3BoZXJlcy5sZW5ndGggLSAyXTtcbiAgICAgICAgICAgICAgICBqb2ludC5kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIGpvaW50LmRhbXBpbmdSYXRpbyA9IDE7XG4gICAgICAgICAgICAgICAgam9pbnQuZnJlcXVlbmN5ID0gMDtcbiAgICAgICAgICAgICAgICBhZGRDb21wb25lbnQoc3BoZXJlc1tzcGhlcmVzLmxlbmd0aCAtIDFdLm5vZGUsIGpvaW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09PSBwYXJ0aWNsZU51bWJlciAtIDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2VYID0gcG9zWCAtIHNwaGVyZXNbMV0ubm9kZS54O1xuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZVkgPSBwb3NZIC0gc3BoZXJlc1sxXS5ub2RlLnk7XG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlWCAqIGRpc3RhbmNlWCArIGRpc3RhbmNlWSAqIGRpc3RhbmNlWSk7XG5cbiAgICAgICAgICAgICAgICBqb2ludCA9IG5ldyBjYy5EaXN0YW5jZUpvaW50KCk7XG4gICAgICAgICAgICAgICAgam9pbnQuY29ubmVjdGVkQm9keSA9IHNwaGVyZXNbc3BoZXJlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBqb2ludC5kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIGpvaW50LmRhbXBpbmdSYXRpbyA9IDE7XG4gICAgICAgICAgICAgICAgam9pbnQuZnJlcXVlbmN5ID0gMDtcbiAgICAgICAgICAgICAgICBhZGRDb21wb25lbnQoc3BoZXJlc1sxXS5ub2RlLCBqb2ludCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNwaGVyZXMgPSBzcGhlcmVzO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlU3BoZXJlOiBmdW5jdGlvbiBfY3JlYXRlU3BoZXJlKHgsIHksIHIsIG5vZGUsIHBhcmVudCkge1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgbm9kZS54ID0geDtcbiAgICAgICAgICAgIG5vZGUueSA9IHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQuYWRkQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYm9keSA9IG5ldyBjYy5SaWdpZEJvZHkoKTtcbiAgICAgICAgYm9keS50eXBlID0gYjIuQm9keS5iMl9keW5hbWljQm9keTtcbiAgICAgICAgYWRkQ29tcG9uZW50KG5vZGUsIGJvZHkpO1xuXG4gICAgICAgIHZhciBjb2xsaWRlciA9IG5ldyBjYy5QaHlzaWNzQ2lyY2xlQ29sbGlkZXIoKTtcbiAgICAgICAgY29sbGlkZXIuZGVuc2l0eSA9IDE7XG4gICAgICAgIGNvbGxpZGVyLnJlc3RpdHV0aW9uID0gMC40O1xuICAgICAgICBjb2xsaWRlci5mcmljdGlvbiA9IDAuNTtcbiAgICAgICAgY29sbGlkZXIucmFkaXVzID0gcjtcbiAgICAgICAgYWRkQ29tcG9uZW50KG5vZGUsIGNvbGxpZGVyKTtcblxuICAgICAgICByZXR1cm4gYm9keTtcbiAgICB9LFxuXG4gICAgZW1pdFRvOiBmdW5jdGlvbiBlbWl0VG8odGFyZ2V0KSB7XG4gICAgICAgIHZhciB4ID0gdGFyZ2V0Lng7XG4gICAgICAgIHZhciB5ID0gdGFyZ2V0Lnk7XG5cbiAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KCh4IC0gMikgKiAoeCAtIDIpICsgKHkgLSAyMDApICogKHkgLSAyMDApKTtcbiAgICAgICAgdmFyIHZlbG9jaXR5ID0gY2MudjIoeCAtIDIsIHkgLSAyMDApO1xuICAgICAgICB2ZWxvY2l0eS5ub3JtYWxpemUoKTtcbiAgICAgICAgdmVsb2NpdHkubXVsKGRpc3RhbmNlICogMik7XG5cbiAgICAgICAgdGhpcy5zcGhlcmVzLmZvckVhY2goZnVuY3Rpb24gKHNwaGVyZSkge1xuICAgICAgICAgICAgc3BoZXJlLmxpbmVhclZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjdHggPSB0aGlzLmN0eDtcblxuICAgICAgICB2YXIgcG9pbnRzID0gdGhpcy5zcGhlcmVzLm1hcChmdW5jdGlvbiAoc3BoZXJlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuZXhwYW5kUG9zaXRpb24oc3BoZXJlLm5vZGUucG9zaXRpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBwb2ludHMuc2hpZnQoKTtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gc21vb3RoKHBvaW50cyk7XG4gICAgICAgIHZhciBmaXJzdENvbnRyb2xQb2ludHMgPSByZXN1bHRbMF07XG4gICAgICAgIHZhciBzZWNvbmRDb250cm9sUG9pbnRzID0gcmVzdWx0WzFdO1xuXG4gICAgICAgIHZhciBwb3MgPSBwb2ludHNbMF07XG5cbiAgICAgICAgY3R4LmNsZWFyKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocG9zLngsIHBvcy55KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gcG9pbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZmlyc3RDb250cm9sUG9pbnQgPSBmaXJzdENvbnRyb2xQb2ludHNbaSAtIDFdLFxuICAgICAgICAgICAgICAgIHNlY29uZENvbnRyb2xQb2ludCA9IHNlY29uZENvbnRyb2xQb2ludHNbaSAtIDFdO1xuXG4gICAgICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyhmaXJzdENvbnRyb2xQb2ludC54LCBmaXJzdENvbnRyb2xQb2ludC55LCBzZWNvbmRDb250cm9sUG9pbnQueCwgc2Vjb25kQ29udHJvbFBvaW50LnksIHBvaW50c1tpXS54LCBwb2ludHNbaV0ueSk7XG4gICAgICAgIH1cblxuICAgICAgICBjdHguY2xvc2UoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0sXG5cbiAgICBleHBhbmRQb3NpdGlvbjogZnVuY3Rpb24gZXhwYW5kUG9zaXRpb24ocG9zKSB7XG4gICAgICAgIHJldHVybiBwb3MubXVsKDEuMyk7XG4gICAgfVxufSk7XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJzVkM2I0YW5qR0ZJVDRYR29xVTliNnJpJywgJ2Nhc2VzLXNldHRpbmdzJyk7XG4vLyBjYXNlcy9jYXNlcy1zZXR0aW5ncy5qc1xuXG5pZiAoIUNDX0VESVRPUikge1xuICAgIGNjLmRpcmVjdG9yLnNldENsZWFyQ29sb3IoY2MuaGV4VG9Db2xvcignIzJmNjlkMicpKTtcbn1cblxuY2MuX1JGLnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGLnB1c2gobW9kdWxlLCAnYjY2ZGRyQXdHZElETDJlZjRCaUFuZXcnLCAnY2hhaW4nKTtcbi8vIGNhc2VzL2NoYWluLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBpdGVtV2lkdGggPSAzMDtcbiAgICAgICAgdmFyIGl0ZW1IZWlnaHQgPSA4O1xuICAgICAgICB2YXIgeSA9IDI1MDtcbiAgICAgICAgdmFyIHByZXZCb2R5ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgKytpKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY2MudjIoKDAuNSArIGkpICogaXRlbVdpZHRoLCB5KTtcbiAgICAgICAgICAgIHZhciBib2R5ID0gbm9kZS5hZGRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcblxuICAgICAgICAgICAgdmFyIGNvbGxpZGVyID0gbmV3IGNjLlBoeXNpY3NCb3hDb2xsaWRlcigpO1xuICAgICAgICAgICAgY29sbGlkZXIuc2l6ZSA9IGNjLnNpemUoaXRlbVdpZHRoLCBpdGVtSGVpZ2h0KTtcbiAgICAgICAgICAgIGNvbGxpZGVyLmRlbnNpdHkgPSAyMDtcblxuICAgICAgICAgICAgYWRkQ29tcG9uZW50KG5vZGUsIGNvbGxpZGVyKTtcblxuICAgICAgICAgICAgdmFyIGpvaW50ID0gbmV3IGNjLlJldm9sdXRlSm9pbnQoKTtcbiAgICAgICAgICAgIGpvaW50LmNvbGxpZGVDb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGpvaW50LmFuY2hvciA9IGNjLnYyKC1pdGVtV2lkdGggLyAyLCAwKTtcbiAgICAgICAgICAgIGpvaW50LmNvbm5lY3RlZEFuY2hvciA9IGkgPT09IDAgPyBjYy52MigwLCB5KSA6IGNjLnYyKGl0ZW1XaWR0aCAvIDIsIDApO1xuICAgICAgICAgICAgam9pbnQuY29ubmVjdGVkQm9keSA9IHByZXZCb2R5O1xuXG4gICAgICAgICAgICBhZGRDb21wb25lbnQobm9kZSwgam9pbnQpO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XG5cbiAgICAgICAgICAgIHByZXZCb2R5ID0gYm9keTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICdiNTc0N28rU3NSTFI2UFdiSFVMdEs0WicsICdjb252ZXlvci1iZWx0Jyk7XG4vLyBjYXNlcy9jb252ZXlvci1iZWx0LmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0YW5nZW50U3BlZWQ6IDVcbiAgICB9LFxuXG4gICAgb25QcmVTb2x2ZTogZnVuY3Rpb24gb25QcmVTb2x2ZShjb250YWN0KSB7XG4gICAgICAgIGNvbnRhY3Quc2V0VGFuZ2VudFNwZWVkKHRoaXMudGFuZ2VudFNwZWVkKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJ2M4MjJhWVZ0QlZNQm80eVhGLzhuOGVIJywgJ2N1dHRpbmctb2JqZWN0cycpO1xuLy8gY2FzZXMvY3V0dGluZy1vYmplY3RzLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uIG9uRW5hYmxlKCkge1xuICAgICAgICB0aGlzLmRlYnVnRHJhd0ZsYWdzID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncztcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9IGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfam9pbnRCaXQgfCBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3NoYXBlQml0O1xuICAgIH0sXG5cbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9IHRoaXMuZGVidWdEcmF3RmxhZ3M7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvblRvdWNoU3RhcnQ6IGZ1bmN0aW9uIG9uVG91Y2hTdGFydChldmVudCkge30sXG5cbiAgICBvblRvdWNoTW92ZTogZnVuY3Rpb24gb25Ub3VjaE1vdmUoZXZlbnQpIHt9LFxuXG4gICAgb25Ub3VjaEVuZDogZnVuY3Rpb24gb25Ub3VjaEVuZChldmVudCkge31cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcblxuY2MuX1JGLnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGLnB1c2gobW9kdWxlLCAnOTIwYzVWTHpKeEtqWUNBb0lVd1VIeW0nLCAnZW4nKTtcbi8vIGkxOG4vZGF0YS9lbi5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJleGFtcGxlX2Nhc2Vfbm9uc3VwcG9ydF9uYXRpdmVfZGVza3RvcF90aXBzXCI6IFwiVGhlIGV4YW1wbGUgY2FzZSBub25zdXBwb3J0IHRoZSBNYWMgcGxhdGZvcm0gYW5kIFdpbmRvd3MgcGxhdGZvcm1cIixcbiAgXCJleGFtcGxlX2Nhc2Vfbm9uc3VwcG9ydF9ydW50aW1lX3RpcHNcIjogXCJUaGUgZXhhbXBsZSBjYXNlIGRvZXMgbm90IHN1cHBvcnQgdGhlIHJ1bnRpbWUgcGxhdGZvcm1cIixcbiAgXCJleGFtcGxlX2Nhc2Vfbm9uc3VwcG9ydF9tb2JpbGVfdGlwc1wiOiBcIlRoZSBleGFtcGxlIGNhc2Ugbm9uc3VwcG9ydCBtb2JpbGUgcGxhdGZvcm1zXCIsXG4gIFwiZXhhbXBsZV9jYXNlX25vbnN1cHBvcnRfd2ViX2NhbnZhc190aXBzXCI6IFwiVGhlIGV4YW1wbGUgY2FzZSBub25zdXBwb3J0IENhbnZhcyBtb2RlXCIsXG4gIFwiZXhhbXBsZV9jYXNlX3N1cHBvcnRfd2ViR2xfdGlwc1wiOiBcIlRoZSBleGFtcGxlIGNhc2Ugb25seSBzdXBwb3J0cyBXZWJHTCBtb2RlXCIsXG4gIFwiZXhhbXBsZV9jYXNlX3N1cHBvcnRfbW9iaWxlX3RpcHNcIjogXCJUaGUgZXhhbXBsZSBjYXNlIG9ubHkgc3VwcG9ydHMgbW9iaWxlIHBsYXRmb3Jtc1wiLFxuICBcImV4YW1wbGVfY2FzZV9zdXBwb3J0X21vYmlsZV9hbmRyb2lkX3RpcHNcIjogXCJUaGUgZXhhbXBsZSBjYXNlIG9ubHkgc3VwcG9ydHMgQW5kcm9pZCBtb2JpbGUgcGxhdGZvcm1cIixcbiAgXCJleGFtcGxlX2Nhc2Vfc3VwcG9ydF9uYXRpdmVfY2hyb21lX3RpcHNcIjogXCJUaGUgZXhhbXBsZSBjYXNlIG9ubHkgc3VwcG9ydHMgQ2hyb21lIGJyb3dzZXIgKE5hdGl2ZSlcIixcbiAgXCJleGFtcGxlX2Nhc2Vfc3VwcG9ydF9uYXRpdmVfZGVza3RvcF90aXBzXCI6IFwiVGhlIGV4YW1wbGUgY2FzZSBvbmx5IHN1cHBvcnRzIHRoZSBNYWMgcGxhdGZvcm0gYW5kIFdpbmRvd3MgcGxhdGZvcm1cIixcbiAgXCJUZXN0TGlzdC5maXJlLjMwXCI6IFwiQmFjayBsaXN0XCIsXG4gIFwiVGVzdExpc3QuZmlyZS4zN1wiOiBcIlZpZXcgaW50cm9cIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvQXRsYXNTcHJpdGUuZmlyZS43XCI6IFwiVGhpcyBpcyBTcGlydGUgU2luZ2xlLlwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9BdGxhc1Nwcml0ZS5maXJlLjExXCI6IFwiVGhpcyBpcyBTcGlydGUgRnJvbSBBdGxhcy5cIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvRmlsbGVkU3ByaXRlLmZpcmUuOVwiOiBcIkZpbGwgVHlwZTogSE9SSVpPTlRBTFwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9GaWxsZWRTcHJpdGUuZmlyZS4xNVwiOiBcIkZpbGwgVHlwZTogVkVSVElDQUxcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvRmlsbGVkU3ByaXRlLmZpcmUuMjNcIjogXCJGSUxMIFR5cGU6IFJBRElBTFwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9TaW1wbGVTcHJpdGUuZmlyZS43XCI6IFwiVGhpcyBpcyBTaW1wbGUgU3ByaXRlLlwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9TbGljZWRTcHJpdGUuZmlyZS43XCI6IFwiVGhpcyBpcyBTbGljZWQgU3ByaXRlLlwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9UaWxlZFNwcml0ZS5maXJlLjZcIjogXCJUaGlzIGlzIFRpbGVkIFNwcml0ZS5cIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvVHJpbW1lZFNwcml0ZS5maXJlLjdcIjogXCJUUklNTUVEIFwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9UcmltbWVkU3ByaXRlLmZpcmUuMTJcIjogXCJObyBUUklNTUVEXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDJfcGFydGljbGUvQXV0b1JlbW92ZVBhcnRpY2xlLmZpcmUuOVwiOiBcIlBhcnRpY2xlIDFcXG5cXFwiQXV0byBSZW1vdmUgT24gRmluaXNoXFxcIiBkaXNhYmxlZFwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAyX3BhcnRpY2xlL0F1dG9SZW1vdmVQYXJ0aWNsZS5maXJlLjEzXCI6IFwiUGFydGljbGUgMlxcblxcXCJBdXRvIFJlbW92ZSBPbiBGaW5pc2hcXFwiIGVuYWJsZWRcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMl9wYXJ0aWNsZS9Ub2dnbGVQYXJ0aWNsZS5maXJlLjZcIjogXCJQcmVzcyBcXFwiQnV0dG9uXFxcIiB0byB0b2dnbGUgcGFydGljbGUgcGxheVwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjdcIjogXCJUb3AgTGVmdFwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjlcIjogXCJ0b3A6IDEwJSBsZWZ0OiA2JVwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjE0XCI6IFwiVG9wIExlZnRcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4xNlwiOiBcInRvcDogLTM0cHhcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4yMVwiOiBcIlRvcCBSaWdodFwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjIzXCI6IFwidG9wOiAxMCUgcmlnaHQ6IDYlXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMjhcIjogXCJMZWZ0XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMzBcIjogXCJsZWZ0OiAtNTBweFwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjM1XCI6IFwiUmlnaHRcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4zN1wiOiBcInJpZ2h0OiAtNTBweFwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjQyXCI6IFwiQm90dG9tIExlZnRcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS40NFwiOiBcImJvdHRvbTogMTAlIGxlZnQ6IDYlXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuNDlcIjogXCJCb3R0b21cIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS41MVwiOiBcImJvdHRvbTogLTM0cHhcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS41NlwiOiBcIkJvdHRvbSBSaWdodFwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjU4XCI6IFwiYm90dG9tOjEwJSByaWdodDo2JVwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjYzXCI6IFwiVGhpcyBpcyBBZHZhbmNlZCBXSWRnZXQuXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FsaWduT25jZVdpZGdldC5maXJlLjFcIjogXCJBbGlnbk9uZSBpcyBmYWxzZSwgSXQgaXMgYWx3YXlzIGFsaWduc1wiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BbGlnbk9uY2VXaWRnZXQuZmlyZS4yXCI6IFwiQWxpZ25PbmUgaXMgdHJ1ZSwgSXQgYWxpZ25zIG9ubHkgb25jZVwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BbmltYXRlZFdpZGdldC5maXJlLjlcIjogXCJUaGlzIGlzIEFuaW1hdGlvbiBXaWRnZXQuXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0F1dG9SZXNpemUuZmlyZS4xM1wiOiBcIlRoaXMgaXMgV2lkZ2V0IEF1dG8gUmVzaXplLlwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9XaWRnZXRBbGlnbi5maXJlLjE4XCI6IFwiVGhpcyBpcyBXaWRnZXQgQWxpZ24uXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvR29sZEJlYXRpbmdBbmltZS5qcy4xXCI6IFwiMFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuNlwiOiBcIkFsaWduIExhYmVsXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvQWxpZ25Gb250TGFiZWwuZmlyZS45XCI6IFwiSG9yaXpvbnRhbCBBbGlnblwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMTRcIjogXCJIZWxsbyEgXFxuV2VsY29tZSBDb21lIFRvIFxcbkNvY29zIENyZWF0b3JcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjE2XCI6IFwiQWxpZ246IExFRlRcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjIxXCI6IFwiSGVsbG8hIFxcbldlbGNvbWUgQ29tZSBUbyBcXG5Db2NvcyBDcmVhdG9yXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvQWxpZ25Gb250TGFiZWwuZmlyZS4yM1wiOiBcIkFsaWduOiBDRU5URVJcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjI4XCI6IFwiSGVsbG8hIFxcbldlbGNvbWUgQ29tZSBUbyBcXG5Db2NvcyBDcmVhdG9yXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvQWxpZ25Gb250TGFiZWwuZmlyZS4zMFwiOiBcIkFsaWduOiBSSUdIVFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMzNcIjogXCJWZXJ0aWNhbCBBbGlnblwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMzhcIjogXCJXZWxjb21lIENvbWUgVG8gXFxuQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuNDBcIjogXCJBbGlnbjogVE9QXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvQWxpZ25Gb250TGFiZWwuZmlyZS40NVwiOiBcIldlbGNvbWUgQ29tZSBUbyBcXG5Db2NvcyBDcmVhdG9yXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvQWxpZ25Gb250TGFiZWwuZmlyZS40N1wiOiBcIkFsaWduOiBDRU5URVJcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjUyXCI6IFwiV2VsY29tZSBDb21lIFRvIFxcbkNvY29zIENyZWF0b3JcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjU0XCI6IFwiQWxpZ246IEJPVFRPTVwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjZcIjogXCJTeXN0ZW0gRm9udFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjlcIjogXCJXcmFwXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMTRcIjogXCJUaGlzIGlzIFN5c3RlbSBGb250XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMTZcIjogXCJPdmVyZmxvdzogQ0xBTVBcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS4yMVwiOiBcIlRoaXMgaXMgU3lzdGVtIEZvbnRcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS4yM1wiOiBcIk92ZXJmbG93OiBTSFJJTktcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS4yNlwiOiBcIk5vIFdyYXBcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS4zMVwiOiBcIlRoaXMgaXMgU3lzdGVtIEZvbnRcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS4zM1wiOiBcIk92ZXJmbG93OiBDTEFNUFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjM4XCI6IFwiVGhpcyBpcyBTeXN0ZW0gRm9udFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjQwXCI6IFwiT3ZlcmZsb3c6IFNIUklOS1wiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjQ1XCI6IFwiSGVsbG8hIFdlbGNvbWUgQ29tZSBUbyBDb2NvcyBDcmVhdG9yXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuNDdcIjogXCJPdmVyZmxvdzogUkVTWklFX0hFSUdIVFwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JblNjcm9sbC5qcy4xXCI6IFwiVG9wIGJ1dHRvbiBjbGlja2VkIVwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JblNjcm9sbC5qcy4yXCI6IFwiQm90dG9tIGJ1dHRvbiBjbGlja2VkIVwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JblNjcm9sbC5maXJlLjIxXCI6IFwiV2hpY2ggYnV0dG9uIGlzIGNsaWNrZWQ/XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkluU2Nyb2xsLmZpcmUuMjdcIjogXCJkcmFnIHRvIHJldmVhbCBtb3JlIGJ1dHRvbnNcXG5cXG5cIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vU2ltcGxlQnV0dG9uLmpzLjFcIjogXCJMZWZ0IGJ1dHRvbiBjbGlja2VkIVwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9TaW1wbGVCdXR0b24uanMuMlwiOiBcIlJpZ2h0IGJ1dHRvbiBjbGlja2VkIVwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JbnRlcmFjdGFibGUuZmlyZS43XCI6IFwiUExBWVwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JbnRlcmFjdGFibGUuZmlyZS4xNlwiOiBcIlNUT1BcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmZpcmUuMjFcIjogXCJpbnRlcmFjdGFibGU6IHRydWVcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmZpcmUuMjNcIjogXCJpbnRlcmFjdGFibGU6IGZhbHNlXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkludGVyYWN0YWJsZS5qcy4xXCI6IFwiaW50ZXJhY3RhYmxlOiBcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmpzLjJcIjogXCJpbnRlcmFjdGFibGU6IFwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9TaW1wbGVCdXR0b24uZmlyZS42XCI6IFwiV2hpY2ggYnV0dG9uIGlzIGNsaWNrZWQ/XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDRfcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuZmlyZS43XCI6IFwiSG9yaXpvbnRhbCBiYXIgd2l0aCBwcm9ncmVzcyAwLjNcIixcbiAgXCJjYXNlcy8wMl91aS8wNF9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5maXJlLjExXCI6IFwiSG9yaXpvbnRhbCBiYXIgcmV2ZXJzZSB3aXRoIHByb2dyZXNzIDEuMFwiLFxuICBcImNhc2VzLzAyX3VpLzA0X3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmZpcmUuMTVcIjogXCJWZXJ0aWNhbCBiYXIgXFxuZnJvbSBib3R0b21cIixcbiAgXCJjYXNlcy8wMl91aS8wNF9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5maXJlLjE5XCI6IFwiVmVydGljYWwgYmFyIFxcbmZyb20gdG9wXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDRfcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuZmlyZS4yM1wiOiBcIlByb2dyZXNzIGJhciB3aXRoIHNwcml0ZVwiLFxuICBcImNhc2VzLzAyX3VpLzA0X3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmZpcmUuMjhcIjogXCJQcm9ncmVzcyBiYXIgd2l0aCBjaGlsZCBzcHJpdGVcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L0l0ZW0uanMuMVwiOiBcIlRtcGwjXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9MaXN0Vmlldy5maXJlLjIzXCI6IFwiSXRlbSAjMDBcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS43XCI6IFwiU2Nyb2xsdmlldyBmdWxsIGZ1bmN0aW9uYWxpdHlcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS4zMFwiOiBcIlNjcm9sbHZpZXcgd2l0aG91dCBpbmVydGlhXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9TY3JvbGxWaWV3LmZpcmUuNTNcIjogXCJTY3JvbGx2aWV3IHdpdGhvdXQgZWxhc3RpY1wiLFxuICBcImNhc2VzLzAyX3VpLzA1X3Njcm9sbFZpZXcvU2Nyb2xsVmlldy5maXJlLjc2XCI6IFwiU2Nyb2xsdmlldyBob3Jpem9udGFsIHNjcm9sbCBvbmx5XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9TY3JvbGxWaWV3LmZpcmUuOTNcIjogXCJTY3JvbGx2aWV3IHZlcnRpY2FsIG9ubHlcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS4xMTBcIjogXCJTY3JvbGx2aWV3IG5vIHNjcm9sbGJhclwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRSZXNpemVDb250YWluZXIuZmlyZS42XCI6IFwiQmFzaWNcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0UmVzaXplQ29udGFpbmVyLmZpcmUuMzFcIjogXCJIb3Jpem9udGFsXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lci5maXJlLjM2XCI6IFwiVmVydGljYWxcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0UmVzaXplQ29udGFpbmVyLmZpcmUuNDFcIjogXCJHcmlkIExheW91dCBBeGlzIGhvcml6b250YWxcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0UmVzaXplQ29udGFpbmVyLmZpcmUuNDZcIjogXCJHcmlkIExheW91dCBBeGlzIHZlcnRpY2FsXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNoaWxkcmVuLmZpcmUuNlwiOiBcIkhvcml6b250YWwgbGF5b3V0IG5vbmVcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0UmVzaXplQ2hpbGRyZW4uZmlyZS4zMVwiOiBcIlZlcnRpY2FsIGxheW91dCBub25lXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNoaWxkcmVuLmZpcmUuNDhcIjogXCJHcmlkIHN0YXJ0IGF4aXMgaG9yaXpvbnRhbCBub25lXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNoaWxkcmVuLmZpcmUuODVcIjogXCJHcmlkIHN0YXJ0IGF4aXMgdmVydGljYWwgbm9uZVwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRJblNjcm9sbFZpZXcuZmlyZS42XCI6IFwiU2Nyb2xsVmlldyB3aXRoIHZlcnRpY2FsICBsYXlvdXRcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0SW5TY3JvbGxWaWV3LmZpcmUuNDBcIjogXCJTY3JvbGxWaWV3IHdpdGggaG9yaXpvbnRhbCBsYXlvdXRcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0SW5TY3JvbGxWaWV3LmZpcmUuNzRcIjogXCJTY3JvbGxWaWV3IHdpdGggR3JpZCBMYXlvdXRcXG5zdGFydCBheGlzOiBob3Jpem9udGFsIFwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRJblNjcm9sbFZpZXcuZmlyZS4xNDRcIjogXCJTY3JvbGxWaWV3IHdpdGggR3JpZCBMYXlvdXRcXG5zdGFydCBheGlzOiB2ZXJ0aWNhbCBcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0Tm9uZS5maXJlLjZcIjogXCJCYXNpYyBsYXlvdXQsIFR5cGU6IE5vbmVcXG5SZXNpemUgY29udGFpbmVyXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dE5vbmUuZmlyZS4zNVwiOiBcIkhvcml6b250YWwgbGF5b3V0IE5vbmVcXG5ObyByZXNpemVcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0Tm9uZS5maXJlLjYwXCI6IFwiVmVydGljYWwgbGF5b3V0LCBUeXBlOiBOb25lXFxuTm8gcmVzaXplXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dE5vbmUuZmlyZS43N1wiOiBcIkdyaWQgc3RhcnQgYXhpczogaG9yaXpvbnRhbCwgVHlwZTogTm9uZVxcbk5vIHJlc2l6ZVwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXROb25lLmZpcmUuMTQyXCI6IFwiR3JpZCBzdGFydCBheGlzOiB2ZXJ0aWNhbCwgVHlwZTogTm9uZVxcbk5vIHJlc2l6ZVwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2NoYW5nZV9jYW52YXNfYW5jaG9yL0JvdHRvbUxlZnRBbmNob3IuZmlyZS44XCI6IFwieDowLCB5OjBcIixcbiAgXCJjYXNlcy8wMl91aS8wN19jaGFuZ2VfY2FudmFzX2FuY2hvci9Cb3R0b21MZWZ0QW5jaG9yLmZpcmUuMTJcIjogXCJ4OjQ4MCwgeTozMjBcIixcbiAgXCJjYXNlcy8wMl91aS8wN19jaGFuZ2VfY2FudmFzX2FuY2hvci9Cb3R0b21MZWZ0QW5jaG9yLmZpcmUuMTZcIjogXCJ4Ojk2MCwgeTo2NDBcIixcbiAgXCJjYXNlcy8wMl91aS8wN19lZGl0Qm94L2VkaXRib3guanMuMVwiOiBcIkVudGVyIFRleHQ6IFwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvRWRpdEJveC5maXJlLjI1XCI6IFwiU2luZ2xlIExpbmUgUGFzc3dvcmQ6XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfZWRpdEJveC9FZGl0Qm94LmZpcmUuMjdcIjogXCJTaW5nbGUgTGluZSBUZXh0OlwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvRWRpdEJveC5maXJlLjI5XCI6IFwiTXV0aXBsZSBMaW5lIFRleHQ6XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfZWRpdEJveC9FZGl0Qm94LmZpcmUuMzJcIjogXCJDbGlja1wiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvRWRpdEJveC5maXJlLjM4XCI6IFwiQnV0dG9uIG11c3QgYmUgb24gdG9wIG9mIEVkaXRCb3gsIFxcbmFuZCBpdCBzaG91bGQgZW5hYmxlIGNsaWNrLlwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAxX3BsYXllcl9jb250cm9sL0V2ZW50TWFuYWdlci9LZXlib2FyZElucHV0LmZpcmUuNlwiOiBcIlByZXNzICdBJyBvciAnRCcgdG8gY29udHJvbCBzaGVlcFwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAxX3BsYXllcl9jb250cm9sL09uL09uVG91Y2hDdHJsLmpzLjFcIjogXCJ0b3VjaCAoXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDFfcGxheWVyX2NvbnRyb2wvT24vT25Ub3VjaElucHV0LmZpcmUuMTBcIjogXCJUcnkgdG91Y2hpbmcgYW55d2hlcmUuXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDFfcGxheWVyX2NvbnRyb2wvT24vT25NdWx0aVRvdWNoSW5wdXQuZmlyZS4yMFwiOiBcIlRoZSBzYW1wbGUgY2FuIG9ubHkgYmUgZWZmZWN0aXZlIG9uIG1vYmlsZSBwbGF0Zm9ybXMhXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDFfcGxheWVyX2NvbnRyb2wvT24vT25NdWx0aVRvdWNoSW5wdXQuZmlyZS4yMVwiOiBcIlVzZSB5b3VyIGZpbmdlcnMgdG8gem9vbSBpbWFnZSFcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wMl9hY3Rpb25zL1NpbXBsZUFjdGlvbi5maXJlLjEzXCI6IFwiVGhpcyBpcyBTaW1wbGUgQWN0aW9uLlwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9BbmltYXRlQ3VzdG9tUHJvcGVydHkuZmlyZS4xNFwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL0FuaW1hdGVDdXN0b21Qcm9wZXJ0eS5maXJlLjE4XCI6IFwiVGhpcyBpcyBBbmltYXRlIEN1c3RvbSBQcm9wZXJ0eS5cIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vQW5pbWF0aW9uRXZlbnQuZmlyZS42XCI6IFwiU3RhcnQgdGhlIGZpcnN0IGFuaW1hdGlvblwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9BbmltYXRpb25FdmVudC5maXJlLjE0XCI6IFwiVGhpcyBpcyBBbmltYXRpb24gRXZlbnQuXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL0FuaW1hdGlvbkV2ZW50LmpzLjFcIjogXCJTdGFydCB0aGVcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjExXCI6IFwiTGluZWFyXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL01vdmVBbmltYXRpb24uZmlyZS4xN1wiOiBcIkNhc2UgSW4gRXhwb1wiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9Nb3ZlQW5pbWF0aW9uLmZpcmUuMjNcIjogXCJDYXNlIE91dCBFeHBvXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL01vdmVBbmltYXRpb24uZmlyZS4yOVwiOiBcIkNhc2UgT3V0IEluIEV4cG9cIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjM1XCI6IFwiQmFjayBGb3J3YXJkXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL01vdmVBbmltYXRpb24uZmlyZS40MVwiOiBcIlRoaXMgaXMgTW92ZSBBbmltYXRpb24uXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL1Nwcml0ZUFuaW1hdGlvbi5maXJlLjlcIjogXCJUaGlzIGlzIFNwcmllRnJhbWUgQW5pbWF0aW9uLlwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9DcmVhdGVDbGlwLmZpcmUuMVwiOiBcIkR5bmFtaWMgQ3JlYXRpbmcgQW5pbWF0aW9uQ2xpcFwiLFxuICBcImNhc2VzLzA0X2F1ZGlvL1NpbXBsZUF1ZGlvLmZpcmUuNlwiOiBcIkVuam95IHRoZSBtdXNpYyFcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9Ob2RlQXJyYXkuZmlyZS4xNFwiOiBcIlRoaXMgaXMgTm9kZSBBcnJheS5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9Ob25TZXJpYWxpemVkLmZpcmUuNlwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvTm9uU2VyaWFsaXplZC5maXJlLjhcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL05vblNlcmlhbGl6ZWQuZmlyZS4xMFwiOiBcIlRoaXMgaXMgTm9uIFNlcmlhbGl6ZWQuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvUmVmZXJlbmNlVHlwZS5maXJlLjhcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL1JlZmVyZW5jZVR5cGUuZmlyZS4xMVwiOiBcIlRoaXMgZXhhbXBsZSBkb2VzIG5vdCBpbmNsdWRlIHRoZSBydW50aW1lIGRlbW9uc3RyYXRpb25cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9WYWx1ZVR5cGUuZmlyZS42XCI6IFwiVGhpcyBleGFtcGxlIGRvZXMgbm90IGluY2x1ZGUgdGhlIHJ1bnRpbWUgZGVtb25zdHJhdGlvblwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wMl9wcmVmYWIvSW5zdGFudGlhdGVQcmVmYWIuZmlyZS43XCI6IFwiVGhpcyBpcyBJbnN0YW50aWF0ZSBQcmVmYWIuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAzX2V2ZW50cy9FdmVudEluTWFzay5maXJlLjIzXCI6IFwiQ2hhbmdlIG9yZGVyIG9mIG5vZGVzXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAzX2V2ZW50cy9TaW1wbGVFdmVudC5maXJlLjE5XCI6IFwiVG91Y2ggZXZlbnQgY2FuIHN1cHBvcnQgY2xpY2tcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1NpbXBsZUV2ZW50LmZpcmUuMjFcIjogXCJNb3VzZSBldmVudCBjYW4gc3VwcG9ydCBjbGljaywgaG92ZXIsIHdoZWVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAzX2V2ZW50cy9TaW1wbGVFdmVudC5maXJlLjIzXCI6IFwiQ3VzdG9tIGV2ZW50IGNhbiBiZSB0cmlnZ2VyZWQgbWFudWFsbHlcXG4oQ2xpY2sgYnV0dG9uIGFib3ZlKVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wM19ldmVudHMvU2ltcGxlRXZlbnQuZmlyZS4yNVwiOiBcIlRoaXMgaXMgU2ltcGxlIEV2ZW50LlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wM19ldmVudHMvVG91Y2hQcm9wYWdhdGlvbi5maXJlLjE1XCI6IFwiVGhpcyBpcyBUb3VjaCBQcm9wYWdhdGlvbi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDRfc2NoZWR1bGVyL3NjaGVkdWxlQ2FsbGJhY2tzLmpzLjFcIjogXCI1LjAwIHNcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDRfc2NoZWR1bGVyL3NjaGVkdWxlci5maXJlLjlcIjogXCI1LjAwIHNcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDRfc2NoZWR1bGVyL3NjaGVkdWxlci5maXJlLjEyXCI6IFwiUmVwZWF0IFNjaGVkdWxlXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA0X3NjaGVkdWxlci9zY2hlZHVsZXIuZmlyZS4xOFwiOiBcIkNhbmNlbCBTY2hlZHVsZXNcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDRfc2NoZWR1bGVyL3NjaGVkdWxlci5maXJlLjI0XCI6IFwiU2NoZWR1bGUgT25jZVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVyLmZpcmUuMjlcIjogXCJDb3VudGVyIHVzZSB1cGRhdGUgZnVuY3Rpb24gdG8gY2hhbmdlIHN0cmluZyB2YWx1ZSBlYWNoIGZyYW1lXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA0X3NjaGVkdWxlci9zY2hlZHVsZXIuZmlyZS4zMVwiOiBcIlRoaXMgaXMgU2NoZWR1bGVyLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNV9jcm9zc19yZWZlcmVuY2UvQ3Jvc3NSZWZlcmVuY2UuZmlyZS43XCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDVfY3Jvc3NfcmVmZXJlbmNlL0Nyb3NzUmVmZXJlbmNlLmZpcmUuMTJcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNV9jcm9zc19yZWZlcmVuY2UvQ3Jvc3NSZWZlcmVuY2UuZmlyZS4xNFwiOiBcIlRoaXMgaXMgQ3Jvc3MgUmVmZXJlbmNlLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNl9saWZlX2N5Y2xlL2xpZmVfY3ljbGUuZmlyZS42XCI6IFwiVGhpcyBpcyBMaWZlIGN5Y2xlLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjVcIjogXCJBc3NldCBMb2FkaW5nXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuOVwiOiBcIkxvYWQgU3ByaXRlRnJhbWVcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS4xNVwiOiBcIkxvYWQgVGV4dHVyZVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjIxXCI6IFwiTG9hZCBBdWRpb1wiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjI3XCI6IFwiTG9hZCBUeHRcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS4zM1wiOiBcIkxvYWQgRm9udFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjM5XCI6IFwiTG9hZCBQbGlzdFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjQ1XCI6IFwiTG9hZCBQcmVmYWJcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS41MVwiOiBcIkxvYWQgU2NlbmVcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS41N1wiOiBcIkxvYWQgQW5pbWF0aW9uXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuNTlcIjogXCJMb2FkIFNwaW5lXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuNjVcIjogXCJOb3QgY3VycmVudGx5IGxvYWRlZCBFbnRpdHkuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjFcIjogXCJMb2FkZWQgXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjJcIjogXCJQbGF5IFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5qcy4zXCI6IFwiQ3JlYXRlIFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5qcy40XCI6IFwiUGxheWluZyBNdXNpYy5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuanMuNVwiOiBcIlRoaXMgaXMgRm9udCFcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Mb2FkUmVzLmZpcmUuN1wiOiBcIkJ5IFR5cGVcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Mb2FkUmVzLmZpcmUuMTBcIjogXCJMb2FkIFNwcml0ZUZyYW1lXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlcy5maXJlLjE3XCI6IFwiQnkgVXJsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlcy5maXJlLjIwXCI6IFwiTG9hZCBQcmVmYWJcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Mb2FkUmVzQWxsLmZpcmUuNlwiOiBcIkxvYWRSZXNEaXJcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Mb2FkUmVzQWxsLmZpcmUuMjRcIjogXCJMb2FkIEFsbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXNBbGwuZmlyZS4zMFwiOiBcIkxvYWQgU3ByaXRlRnJhbWUgQWxsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlc0FsbC5maXJlLjM2XCI6IFwiQ2xlYXIgQWxsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA4X21vZHVsZS9sb2FkX21vZHVsZS5maXJlLjZcIjogXCJMb2FkIE1vZHVsZVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wOF9tb2R1bGUvbG9hZF9tb2R1bGUuZmlyZS4xMFwiOiBcIkNyZWF0ZSBNb25zdGVyXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA5X3NpbmdsZXRvbi9TaW5nbGV0b24uZmlyZS42XCI6IFwiVGhpcyBleGFtcGxlIGRvZXMgbm90IGluY2x1ZGUgdGhlIHJ1bnRpbWUgZGVtb25zdHJhdGlvblwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMF9sb2FkaW5nQmFyL0xvYWRpbmdCYXJDdHJsLmpzLjFcIjogXCJkb3dubG9hZCBjb21wbGV0ZSEhXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzEwX2xvYWRpbmdCYXIvTG9hZGluZ0JhckN0cmwuanMuMlwiOiBcImRvd2xvYWRpbmc6IFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMF9sb2FkaW5nQmFyL0xvYWRpbmdCYXJDdHJsLmpzLjNcIjogXCJjbGljayBhbnl3aGVyZSB0byBkb3dubG9hZC4uLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMF9sb2FkaW5nQmFyL2xvYWRpbmdCYXIuZmlyZS43XCI6IFwiTG9hZGluZyBDb21wbGV0ZWRcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTBfbG9hZGluZ0Jhci9sb2FkaW5nQmFyLmZpcmUuMThcIjogXCJEb3dsb2FkaW5nXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuMVwiOiBcIndhaXRpbmcuLi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4yXCI6IFwid2FpdGluZy4uLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjNcIjogXCJ3YWl0aW5nLi4uXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuNFwiOiBcIndhaXRpbmcuLi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy41XCI6IFwiV2ViU29ja2V0XFxcXG5TZW5kIEJpbmFyeSBXUyB3YXMgb3BlbmVkLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjZcIjogXCJXZWJTb2NrZXRcXFxcblJlc3BvbnNlIGdldC5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy43XCI6IFwiV2ViU29ja2V0XFxcXG5zZW5kQmluYXJ5IEVycm9yIHdhcyBmaXJlZC5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy44XCI6IFwiV2ViU29ja2V0XFxcXG53ZWJzb2NrZXQgaW5zdGFuY2UgY2xvc2VkLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjlcIjogXCJXZWJTb2NrZXRcXFxcblNlbmQgQmluYXJ5IFdTIGlzIHdhaXRpbmcuLi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xMFwiOiBcIldlYlNvY2tldFxcXFxuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuMTFcIjogXCJTb2NrZXRJT1xcXFxuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuMTJcIjogXCJTb2NrZXRJT1xcXFxuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuMTNcIjogXCJTb2NrZXRJT1xcXFxuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuMTRcIjogXCJTb2NrZXRJT1xcXFxuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjdcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL25ldHdvcmsuZmlyZS42XCI6IFwiWE1MSHR0cFJlcXVlc3RcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9uZXR3b3JrLmZpcmUuMTFcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL25ldHdvcmsuZmlyZS4xMFwiOiBcIlhNTEh0dHBSZXF1ZXN0IChBcnJheUJ1ZmZlcilcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9uZXR3b3JrLmZpcmUuMTVcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL25ldHdvcmsuZmlyZS4xNFwiOiBcIldlYlNvY2tldFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL25ldHdvcmsuZmlyZS4xOVwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjE4XCI6IFwiU29ja2V0SU9cIixcbiAgXCJjYXNlcy9uYXRpdmVfY2FsbC9uYXRpdmVfY2FsbC5maXJlLjFcIjogXCJKUyB0byBKQVZBIHJlZmxlY3Rpb24gb25seSB3b3JrcyBBbmRyb2lkIG1vYmlsZSBwbGF0Zm9ybSFcIixcbiAgXCJjYXNlcy9uYXRpdmVfY2FsbC9uYXRpdmVfY2FsbC5maXJlLjJcIjogXCJDbGljayBvbiB0aGUgYnV0dG9uIGNhbGxzIHRoZSBzdGF0aWMgbWV0aG9kIVwiLFxuICBcImNhc2VzL25hdGl2ZV9jYWxsL25hdGl2ZV9jYWxsLmZpcmUuM1wiOiBcIkNsaWNrXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvQ2F0ZWdvcnkuZmlyZS4zXCI6IFwiR3JvdXA6IENvbGxpZGVyXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvQ2F0ZWdvcnkuZmlyZS41XCI6IFwiR3JvdXA6IENvbGxpZGVyXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvQ2F0ZWdvcnkuZmlyZS43XCI6IFwiR3JvdXA6IENvbGxpZGVyXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvQ2F0ZWdvcnkuZmlyZS45XCI6IFwiR3JvdXA6IERlZmF1bHRcIixcbiAgXCJjYXNlcy9jb2xsaWRlci9TaGFwZS5maXJlLjIwXCI6IFwiU2hvdyBQb2x5Z29uXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvU2hhcGUuZmlyZS4yN1wiOiBcIlNob3cgQ2lyY2xlXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvU2hhcGUuZmlyZS4zNFwiOiBcIlNob3cgQm94XCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvU2hhcGUuZmlyZS40M1wiOiBcIlNob3cgUG9seWdvblwiLFxuICBcImNhc2VzL2NvbGxpZGVyL1NoYXBlLmZpcmUuNTBcIjogXCJTaG93IENpcmNsZVwiLFxuICBcImNhc2VzL2NvbGxpZGVyL1NoYXBlLmZpcmUuNTdcIjogXCJTaG93IEJveFwiLFxuICBcImNhc2VzL21vdGlvblN0cmVhay9Nb3Rpb25TdHJlYWsuZmlyZS4xXCI6IFwiQ2hhbmdlIE1vdGlvblN0cmVha1wiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuMTFcIjogXCJEZWJ1ZyBTbG90c1wiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuMThcIjogXCJEZWJ1ZyBCb25lc1wiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuMjVcIjogXCJUaW1lIFNjYWxlXCIsXG4gIFwiY2FzZXMvc3BpbmUvU3BpbmVCb3kuZmlyZS4zNlwiOiBcIlN0b3BcIixcbiAgXCJjYXNlcy9zcGluZS9TcGluZUJveS5maXJlLjQzXCI6IFwiV2Fsa1wiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuNTBcIjogXCJSdW5cIixcbiAgXCJjYXNlcy9zcGluZS9TcGluZUJveS5maXJlLjU4XCI6IFwiSnVtcFwiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuNjVcIjogXCJTaG9vdFwiLFxuICBcImNhc2VzL3RpbGVkbWFwL1B1enpsZS5maXJlLjE4XCI6IFwiWW91IFdpblwiLFxuICBcImNhc2VzL3RpbGVkbWFwL1B1enpsZS5maXJlLjIxXCI6IFwiUmVzdGFydFwiLFxuICBcInJlcy9wcmVmYWJzL0xpc3RJdGVtLnByZWZhYi4yXCI6IFwiTGFiZWwgc3Nzc1wiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjNcIjogXCJOYW1lOlwiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjExXCI6IFwiTGV2ZWwgOlwiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjE5XCI6IFwiSHAgOlwiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjI3XCI6IFwiQXR0YWNrIDpcIixcbiAgXCJyZXMvcHJlZmFicy9Nb25zdGVyLnByZWZhYi4zNVwiOiBcIkRlZmVuc2UgOlwiLFxuICBcInJlcy9wcmVmYWJzL2xvYWRJdGVtLnByZWZhYi4xXCI6IFwiTGFiZWxcIixcbiAgXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvcHJlZmFiLnByZWZhYi4yXCI6IFwiVGhpcyBpcyBQcmVmYWJcIixcbiAgXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvc2NlbmUuZmlyZS4zXCI6IFwiUmV0dXJuIEFzc2V0IExvYWRpbmcgU2NlbmVcIixcbiAgXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvc2NlbmUuZmlyZS42XCI6IFwiUmV0dXJuXCIsXG4gIFwic2NyaXB0cy9HbG9iYWwvTWVudS5qcy4xXCI6IFwiVGVtcG9yYXJ5IGxhY2sgb2YgaW50cm9kdWN0aW9uXCIsXG4gIFwiY2FzZXMvYW55c2RrLzFcIjogXCJPbmx5IHdvcmtzIGluIHRoZSBBbmRyb2lkIG9yIGlPUyBvciBXZWItTW9iaWxlIHBsYXRmb3Jtc1wiLFxuICBcImNhc2VzL2FueXNkay8yXCI6IFwiT25seSB3b3JrcyBpbiB0aGUgQW5kcm9pZCBvciBpT1MgcGxhdGZvcm1zXCJcbn07XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJ2M4ZjY3MnhITXBBZVpkWnpGMGY3ZmE5JywgJ2dyYXZpdHktcmFkaWFsJyk7XG4vLyBjYXNlcy9ncmF2aXR5LXJhZGlhbC5qc1xuXG52YXIgR3Jhdml0eSA9IHJlcXVpcmUoJy4vZ3Jhdml0eScpO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBHcmF2aXR5LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBncmF2aXR5Rm9yY2U6IDUwMFxuICAgIH0sXG5cbiAgICBfYXBwbHlGb3JjZTogZnVuY3Rpb24gX2FwcGx5Rm9yY2UoYm9keSkge1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBib2R5LmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBjZW50ZXIgPSB0aGlzLmJvZHkuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgICB2YXIgZiA9IGNlbnRlci5zdWIocG9zaXRpb24pLm5vcm1hbGl6ZSgpLm11bCh0aGlzLmdyYXZpdHlGb3JjZSAqIGJvZHkubWFzcyk7XG5cbiAgICAgICAgYm9keS5hcHBseUZvcmNlKGYsIHBvc2l0aW9uLCBmYWxzZSk7XG4gICAgfVxufSk7XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJ2RiNmYwSFI4U1pGYTV0RXdYamJpdlhaJywgJ2dyYXZpdHknKTtcbi8vIGNhc2VzL2dyYXZpdHkuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gb25FbmFibGUoKSB7XG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcblxuICAgICAgICB0aGlzLmJvZGllcyA9IFtdO1xuICAgICAgICB0aGlzLmJvZHkgPSB0aGlzLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xuICAgICAgICB0aGlzLm9yaWdpbkdyYXZpdHkgPSBtYW5hZ2VyLmdyYXZpdHk7XG4gICAgICAgIG1hbmFnZXIuZ3Jhdml0eSA9IGNjLnYyKCk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gb25EaXNhYmxlKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmdyYXZpdHkgPSB0aGlzLm9yaWdpbkdyYXZpdHk7XG4gICAgfSxcblxuICAgIG9uQmVnaW5Db250YWN0OiBmdW5jdGlvbiBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWxmQ29sbGlkZXIsIG90aGVyQ29sbGlkZXIpIHtcbiAgICAgICAgdGhpcy5ib2RpZXMucHVzaChvdGhlckNvbGxpZGVyLmJvZHkpO1xuICAgIH0sXG5cbiAgICBvbkVuZENvbnRhY3Q6IGZ1bmN0aW9uIG9uRW5kQ29udGFjdChjb250YWN0LCBzZWxmQ29sbGlkZXIsIG90aGVyQ29sbGlkZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5ib2RpZXMuaW5kZXhPZihvdGhlckNvbGxpZGVyLmJvZHkpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmJvZGllcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBib2RpZXMgPSB0aGlzLmJvZGllcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5Rm9yY2UoYm9kaWVzW2ldKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfYXBwbHlGb3JjZTogZnVuY3Rpb24gX2FwcGx5Rm9yY2UoYm9keSkge31cbn0pO1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICc5Mzc4OUMvc2h0SUw2ZW50WXNaUGplZScsICdpMThuJyk7XG4vLyBpMThuL2kxOG4uanNcblxudmFyIFBvbHlnbG90ID0gcmVxdWlyZSgncG9seWdsb3QnKTtcbnZhciBsYW5nID0gY2Muc3lzLmxhbmd1YWdlO1xuaWYgKGxhbmcgIT09ICd6aCcpIHtcbiAgICBsYW5nID0gJ2VuJztcbn1cbnZhciBkYXRhID0gcmVxdWlyZShsYW5nKTsgLy8gdXBkYXRlIHRoaXMgdG8gc2V0IHlvdXIgZGVmYXVsdCBkaXNwbGF5aW5nIGxhbmd1YWdlIGluIGVkaXRvclxuLy8gbGV0IHBvbHlnbG90ID0gbnVsbDtcbnZhciBwb2x5Z2xvdCA9IG5ldyBQb2x5Z2xvdCh7IHBocmFzZXM6IGRhdGEsIGFsbG93TWlzc2luZzogdHJ1ZSB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgYWxsb3cgeW91IHRvIHN3aXRjaCBsYW5ndWFnZSBkdXJpbmcgcnVudGltZSwgbGFuZ3VhZ2UgYXJndW1lbnQgc2hvdWxkIGJlIHRoZSBzYW1lIGFzIHlvdXIgZGF0YSBmaWxlIG5hbWVcbiAgICAgKiBzdWNoIGFzIHdoZW4gbGFuZ3VhZ2UgaXMgJ3poJywgaXQgd2lsbCBsb2FkIHlvdXIgJ3poLmpzJyBkYXRhIHNvdXJjZS5cbiAgICAgKiBAbWV0aG9kIGluaXRcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgLSB0aGUgbGFuZ3VhZ2Ugc3BlY2lmaWMgZGF0YSBmaWxlIG5hbWUsIHN1Y2ggYXMgJ3poJyB0byBsb2FkICd6aC5qcydcbiAgICAgKi9cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGxhbmd1YWdlKSB7XG4gICAgICAgIGxhbmcgPSBsYW5ndWFnZTtcbiAgICAgICAgZGF0YSA9IHJlcXVpcmUobGFuZyk7XG4gICAgICAgIHBvbHlnbG90LnJlcGxhY2UoZGF0YSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiB0aGlzIG1ldGhvZCB0YWtlcyBhIHRleHQga2V5IGFzIGlucHV0LCBhbmQgcmV0dXJuIHRoZSBsb2NhbGl6ZWQgc3RyaW5nXG4gICAgICogUGxlYXNlIHJlYWQgaHR0cHM6Ly9naXRodWIuY29tL2FpcmJuYi9wb2x5Z2xvdC5qcyBmb3IgZGV0YWlsc1xuICAgICAqIEBtZXRob2QgdFxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gbG9jYWxpemVkIHN0cmluZ1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgbXlUZXh0ID0gaTE4bi50KCdNWV9URVhUX0tFWScpO1xuICAgICAqXG4gICAgICogLy8gaWYgeW91ciBkYXRhIHNvdXJjZSBpcyBkZWZpbmVkIGFzXG4gICAgICogLy8ge1wiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJ9XG4gICAgICogLy8geW91IGNhbiB1c2UgdGhlIGZvbGxvd2luZyB0byBpbnRlcnBvbGF0ZSB0aGUgdGV4dFxuICAgICAqIHZhciBncmVldGluZ1RleHQgPSBpMThuLnQoJ2hlbGxvX25hbWUnLCB7bmFtZTogJ25hbnRhcyd9KTsgLy8gSGVsbG8sIG5hbnRhc1xuICAgICAqL1xuICAgIHQ6IGZ1bmN0aW9uIHQoa2V5LCBvcHQpIHtcbiAgICAgICAgcmV0dXJuIHBvbHlnbG90LnQoa2V5LCBvcHQpO1xuICAgIH1cbn07XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJ2ZjMTk3TndKcUZBWHB6dG5PM08xaWY3JywgJ21hbmlmb2xkJyk7XG4vLyBjYXNlcy9tYW5pZm9sZC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcG9pbnRUZW1wOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblByZVNvbHZlOiBmdW5jdGlvbiBvblByZVNvbHZlKGNvbnRhY3QpIHtcbiAgICAgICAgdmFyIHdvcmxkTWFuaWZvbGQgPSBjb250YWN0LmdldFdvcmxkTWFuaWZvbGQoKTtcbiAgICAgICAgdmFyIHBvaW50cyA9IHdvcmxkTWFuaWZvbGQucG9pbnRzO1xuICAgICAgICB2YXIgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZVNlbGYoKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHAgPSBwb2ludHNbaV07XG5cbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wb2ludFRlbXApO1xuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgZmFkZU91dCA9IGNjLmZhZGVPdXQoMC4yKTtcbiAgICAgICAgICAgIHZhciByZW1vdmUgPSBjYy5jYWxsRnVuYyhyZW1vdmVTZWxmLCBub2RlKTtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBjYy5zZXF1ZW5jZShmYWRlT3V0LCByZW1vdmUpO1xuXG4gICAgICAgICAgICBub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAgICAgICAgbm9kZS54ID0gcC54O1xuICAgICAgICAgICAgbm9kZS55ID0gcC55O1xuXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHNjZW5lO1xuICAgICAgICB9XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICcxOGFhMVVFbTc5RmxJc2trL0JoRTV2MycsICdvbmUtc2lkZS1wbGF0Zm9ybScpO1xuLy8gY2FzZXMvb25lLXNpZGUtcGxhdGZvcm0uanNcblxuLy8gaHR0cDovL3d3dy5pZm9yY2UyZC5uZXQvYjJkdHV0L29uZS13YXktd2FsbHNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiBvbkVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5kZWJ1Z0RyYXdGbGFncyA9IGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZGVidWdEcmF3RmxhZ3M7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZGVidWdEcmF3RmxhZ3MgPSBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX2pvaW50Qml0IHwgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9zaGFwZUJpdDtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiBvbkRpc2FibGUoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZGVidWdEcmF3RmxhZ3MgPSB0aGlzLmRlYnVnRHJhd0ZsYWdzO1xuICAgIH0sXG5cbiAgICBvbkJlZ2luQ29udGFjdDogZnVuY3Rpb24gb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZkNvbGxpZGVyLCBvdGhlckNvbGxpZGVyKSB7XG4gICAgICAgIHZhciBvdGhlckJvZHkgPSBvdGhlckNvbGxpZGVyLmJvZHk7XG4gICAgICAgIHZhciBwbGF0Zm9ybUJvZHkgPSBzZWxmQ29sbGlkZXIuYm9keTtcblxuICAgICAgICB2YXIgd29ybGRNYW5pZm9sZCA9IGNvbnRhY3QuZ2V0V29ybGRNYW5pZm9sZCgpO1xuICAgICAgICB2YXIgcG9pbnRzID0gd29ybGRNYW5pZm9sZC5wb2ludHM7XG5cbiAgICAgICAgLy9jaGVjayBpZiBjb250YWN0IHBvaW50cyBhcmUgbW92aW5nIGludG8gcGxhdGZvcm1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwb2ludFZlbFBsYXRmb3JtID0gcGxhdGZvcm1Cb2R5LmdldExpbmVhclZlbG9jaXR5RnJvbVdvcmxkUG9pbnQocG9pbnRzW2ldKTtcbiAgICAgICAgICAgIHZhciBwb2ludFZlbE90aGVyID0gb3RoZXJCb2R5LmdldExpbmVhclZlbG9jaXR5RnJvbVdvcmxkUG9pbnQocG9pbnRzW2ldKTtcbiAgICAgICAgICAgIHZhciByZWxhdGl2ZVZlbCA9IHBsYXRmb3JtQm9keS5nZXRMb2NhbFZlY3Rvcihwb2ludFZlbE90aGVyIC0gcG9pbnRWZWxQbGF0Zm9ybSk7XG5cbiAgICAgICAgICAgIGlmIChyZWxhdGl2ZVZlbC55IDwgLTEpIC8vaWYgbW92aW5nIGRvd24gZmFzdGVyIHRoYW4gMSBtL3MsIGhhbmRsZSBhcyBiZWZvcmVcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vcG9pbnQgaXMgbW92aW5nIGludG8gcGxhdGZvcm0sIGxlYXZlIGNvbnRhY3Qgc29saWQgYW5kIGV4aXRcbiAgICAgICAgICAgIGVsc2UgaWYgKHJlbGF0aXZlVmVsLnkgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbW92aW5nIHNsb3dlciB0aGFuIDEgbS9zXG4gICAgICAgICAgICAgICAgICAgIC8vYm9yZGVybGluZSBjYXNlLCBtb3Zpbmcgb25seSBzbGlnaHRseSBvdXQgb2YgcGxhdGZvcm1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlbGF0aXZlUG9pbnQgPSBwbGF0Zm9ybUJvZHkuZ2V0TG9jYWxQb2ludChwb2ludHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGxhdGZvcm1GYWNlWSA9IDAuNTsgLy9mcm9udCBvZiBwbGF0Zm9ybSwgZnJvbSBmaXh0dXJlIGRlZmluaXRpb24gOihcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aXZlUG9pbnQueSA+IHBsYXRmb3JtRmFjZVkgLSAwLjA1KSByZXR1cm47IC8vY29udGFjdCBwb2ludCBpcyBsZXNzIHRoYW4gNWNtIGluc2lkZSBmcm9udCBmYWNlIG9mIHBsYXRmcm9tXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbW92aW5nIHVwIGZhc3RlciB0aGFuIDEgbS9zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3JlIGRpc2FibGVkIHN0YXRlIHRvIGNvbnRhY3RcbiAgICAgICAgY29udGFjdC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICc4YmI1OUc5WUpaTTY2M1pyWlpaU3d3OCcsICdwaHlzaWNzLWJvdW5kJyk7XG4vLyBjYXNlcy9waHlzaWNzLWJvdW5kLmpzXG5cblxud2luZG93LmFkZENvbXBvbmVudCA9IGZ1bmN0aW9uIChub2RlLCBjb21wb25lbnQpIHtcbiAgICBjb21wb25lbnQubm9kZSA9IG5vZGU7XG4gICAgbm9kZS5fY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICBpZiAobm9kZS5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQuX19wcmVsb2FkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5fY29tcFNjaGVkdWxlci5kb1ByZWxvYWRDb21wKGNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsbCBvbkxvYWQvb25FbmFibGVcbiAgICAgICAgY2MuZGlyZWN0b3IuX2NvbXBTY2hlZHVsZXIuYWN0aXZhdGVDb21wKGNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn07XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2l6ZTogY2Muc2l6ZSgwLCAwKVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5zaXplLndpZHRoIHx8IHRoaXMubm9kZS53aWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuc2l6ZS5oZWlnaHQgfHwgdGhpcy5ub2RlLmhlaWdodDtcblxuICAgICAgICB2YXIgYm9keSA9IG5ldyBjYy5SaWdpZEJvZHkoKTtcbiAgICAgICAgYm9keS50eXBlID0gYjIuQm9keS5iMl9zdGF0aWNCb2R5O1xuICAgICAgICBhZGRDb21wb25lbnQodGhpcy5ub2RlLCBib2R5KTtcblxuICAgICAgICB0aGlzLmFkZENvbXBvbmVudChjYy5Nb3VzZUpvaW50KTtcblxuICAgICAgICB0aGlzLl9hZGRCb3VuZCgwLCBoZWlnaHQgLyAyLCB3aWR0aCwgMjApO1xuICAgICAgICB0aGlzLl9hZGRCb3VuZCgwLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIDIwKTtcbiAgICAgICAgdGhpcy5fYWRkQm91bmQoLXdpZHRoIC8gMiwgMCwgMjAsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuX2FkZEJvdW5kKHdpZHRoIC8gMiwgMCwgMjAsIGhlaWdodCk7XG4gICAgfSxcblxuICAgIF9hZGRCb3VuZDogZnVuY3Rpb24gX2FkZEJvdW5kKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdmFyIGNvbGxpZGVyID0gbmV3IGNjLlBoeXNpY3NCb3hDb2xsaWRlcigpO1xuICAgICAgICBjb2xsaWRlci5vZmZzZXQueCA9IHg7XG4gICAgICAgIGNvbGxpZGVyLm9mZnNldC55ID0geTtcbiAgICAgICAgY29sbGlkZXIuc2l6ZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjb2xsaWRlci5zaXplLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYWRkQ29tcG9uZW50KHRoaXMubm9kZSwgY29sbGlkZXIpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICc5ZDg2YTFiL2FOTDhKRHFKNytFMFhJVScsICdwaHlzaWNzLXNldHRpbmdzJyk7XG4vLyBwaHlzaWNzLXNldHRpbmdzL3BoeXNpY3Mtc2V0dGluZ3MuanNcblxudmFyIHBoeXNpY3NNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcbnBoeXNpY3NNYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xuXG5waHlzaWNzTWFuYWdlci5kZWJ1Z0RyYXdGbGFncyA9IDA7XG4vLyAvLyBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX2FhYmJCaXQgfFxuLy8gLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9wYWlyQml0IHxcbi8vIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfY2VudGVyT2ZNYXNzQml0IHxcbi8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfam9pbnRCaXQgfFxuLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9zaGFwZUJpdFxuLy8gO1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICc2OWRlY1NncFJsRTFyekVLcDBSekczVicsICdwb2x5Z2xvdCcpO1xuLy8gaTE4bi9wb2x5Z2xvdC5qc1xuXG4vLyAgICAgKGMpIDIwMTItMjAxNiBBaXJibmIsIEluYy5cbi8vXG4vLyAgICAgcG9seWdsb3QuanMgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEJTRFxuLy8gICAgIGxpY2Vuc2UuIEZvciBhbGwgbGljZW5zaW5nIGluZm9ybWF0aW9uLCBkZXRhaWxzLCBhbmQgZG9jdW1lbnRpb246XG4vLyAgICAgaHR0cDovL2FpcmJuYi5naXRodWIuY29tL3BvbHlnbG90LmpzXG4vL1xuLy9cbi8vIFBvbHlnbG90LmpzIGlzIGFuIEkxOG4gaGVscGVyIGxpYnJhcnkgd3JpdHRlbiBpbiBKYXZhU2NyaXB0LCBtYWRlIHRvXG4vLyB3b3JrIGJvdGggaW4gdGhlIGJyb3dzZXIgYW5kIGluIE5vZGUuIEl0IHByb3ZpZGVzIGEgc2ltcGxlIHNvbHV0aW9uIGZvclxuLy8gaW50ZXJwb2xhdGlvbiBhbmQgcGx1cmFsaXphdGlvbiwgYmFzZWQgb2ZmIG9mIEFpcmJuYidzXG4vLyBleHBlcmllbmNlIGFkZGluZyBJMThuIGZ1bmN0aW9uYWxpdHkgdG8gaXRzIEJhY2tib25lLmpzIGFuZCBOb2RlIGFwcHMuXG4vL1xuLy8gUG9seWxnbG90IGlzIGFnbm9zdGljIHRvIHlvdXIgdHJhbnNsYXRpb24gYmFja2VuZC4gSXQgZG9lc24ndCBwZXJmb3JtIGFueVxuLy8gdHJhbnNsYXRpb247IGl0IHNpbXBseSBnaXZlcyB5b3UgYSB3YXkgdG8gbWFuYWdlIHRyYW5zbGF0ZWQgcGhyYXNlcyBmcm9tXG4vLyB5b3VyIGNsaWVudC0gb3Igc2VydmVyLXNpZGUgSmF2YVNjcmlwdCBhcHBsaWNhdGlvbi5cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KHJvb3QpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290KTtcbiAgfSBlbHNlIHtcbiAgICByb290LlBvbHlnbG90ID0gZmFjdG9yeShyb290KTtcbiAgfVxufSkodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB0aGlzLCBmdW5jdGlvbiAocm9vdCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG5cbiAgLy8gIyMjIFBvbHlnbG90IGNsYXNzIGNvbnN0cnVjdG9yXG4gIGZ1bmN0aW9uIFBvbHlnbG90KG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLnBocmFzZXMgPSB7fTtcbiAgICB0aGlzLmV4dGVuZChvcHRpb25zLnBocmFzZXMgfHwge30pO1xuICAgIHRoaXMuY3VycmVudExvY2FsZSA9IG9wdGlvbnMubG9jYWxlIHx8ICdlbic7XG4gICAgdGhpcy5hbGxvd01pc3NpbmcgPSAhIW9wdGlvbnMuYWxsb3dNaXNzaW5nO1xuICAgIHRoaXMud2FybiA9IG9wdGlvbnMud2FybiB8fCB3YXJuO1xuICB9XG5cbiAgLy8gIyMjIFZlcnNpb25cbiAgUG9seWdsb3QuVkVSU0lPTiA9ICcxLjAuMCc7XG5cbiAgLy8gIyMjIHBvbHlnbG90LmxvY2FsZShbbG9jYWxlXSlcbiAgLy9cbiAgLy8gR2V0IG9yIHNldCBsb2NhbGUuIEludGVybmFsbHksIFBvbHlnbG90IG9ubHkgdXNlcyBsb2NhbGUgZm9yIHBsdXJhbGl6YXRpb24uXG4gIFBvbHlnbG90LnByb3RvdHlwZS5sb2NhbGUgPSBmdW5jdGlvbiAobmV3TG9jYWxlKSB7XG4gICAgaWYgKG5ld0xvY2FsZSkgdGhpcy5jdXJyZW50TG9jYWxlID0gbmV3TG9jYWxlO1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRMb2NhbGU7XG4gIH07XG5cbiAgLy8gIyMjIHBvbHlnbG90LmV4dGVuZChwaHJhc2VzKVxuICAvL1xuICAvLyBVc2UgYGV4dGVuZGAgdG8gdGVsbCBQb2x5Z2xvdCBob3cgdG8gdHJhbnNsYXRlIGEgZ2l2ZW4ga2V5LlxuICAvL1xuICAvLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbiAgLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4gIC8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbiAgLy8gICAgIH0pO1xuICAvL1xuICAvLyBUaGUga2V5IGNhbiBiZSBhbnkgc3RyaW5nLiAgRmVlbCBmcmVlIHRvIGNhbGwgYGV4dGVuZGAgbXVsdGlwbGUgdGltZXM7XG4gIC8vIGl0IHdpbGwgb3ZlcnJpZGUgYW55IHBocmFzZXMgd2l0aCB0aGUgc2FtZSBrZXksIGJ1dCBsZWF2ZSBleGlzdGluZyBwaHJhc2VzXG4gIC8vIHVudG91Y2hlZC5cbiAgLy9cbiAgLy8gSXQgaXMgYWxzbyBwb3NzaWJsZSB0byBwYXNzIG5lc3RlZCBwaHJhc2Ugb2JqZWN0cywgd2hpY2ggZ2V0IGZsYXR0ZW5lZFxuICAvLyBpbnRvIGFuIG9iamVjdCB3aXRoIHRoZSBuZXN0ZWQga2V5cyBjb25jYXRlbmF0ZWQgdXNpbmcgZG90IG5vdGF0aW9uLlxuICAvL1xuICAvLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbiAgLy8gICAgICAgXCJuYXZcIjoge1xuICAvLyAgICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuICAvLyAgICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCIsXG4gIC8vICAgICAgICAgXCJzaWRlYmFyXCI6IHtcbiAgLy8gICAgICAgICAgIFwid2VsY29tZVwiOiBcIldlbGNvbWVcIlxuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgfVxuICAvLyAgICAgfSk7XG4gIC8vXG4gIC8vICAgICBjb25zb2xlLmxvZyhwb2x5Z2xvdC5waHJhc2VzKTtcbiAgLy8gICAgIC8vIHtcbiAgLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4gIC8vICAgICAvLyAgICduYXYuaGVsbG9fbmFtZSc6ICdIZWxsbywgJXtuYW1lfScsXG4gIC8vICAgICAvLyAgICduYXYuc2lkZWJhci53ZWxjb21lJzogJ1dlbGNvbWUnXG4gIC8vICAgICAvLyB9XG4gIC8vXG4gIC8vIGBleHRlbmRgIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50LCBgcHJlZml4YCwgd2hpY2ggY2FuIGJlIHVzZWRcbiAgLy8gdG8gcHJlZml4IGV2ZXJ5IGtleSBpbiB0aGUgcGhyYXNlcyBvYmplY3Qgd2l0aCBzb21lIHN0cmluZywgdXNpbmcgZG90XG4gIC8vIG5vdGF0aW9uLlxuICAvL1xuICAvLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbiAgLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4gIC8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbiAgLy8gICAgIH0sIFwibmF2XCIpO1xuICAvL1xuICAvLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4gIC8vICAgICAvLyB7XG4gIC8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuICAvLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nXG4gIC8vICAgICAvLyB9XG4gIC8vXG4gIC8vIFRoaXMgZmVhdHVyZSBpcyB1c2VkIGludGVybmFsbHkgdG8gc3VwcG9ydCBuZXN0ZWQgcGhyYXNlIG9iamVjdHMuXG4gIFBvbHlnbG90LnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICAgIHZhciBwaHJhc2U7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gbW9yZVBocmFzZXMpIHtcbiAgICAgIGlmIChtb3JlUGhyYXNlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHBocmFzZSA9IG1vcmVQaHJhc2VzW2tleV07XG4gICAgICAgIGlmIChwcmVmaXgpIGtleSA9IHByZWZpeCArICcuJyArIGtleTtcbiAgICAgICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhpcy5leHRlbmQocGhyYXNlLCBrZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGhyYXNlc1trZXldID0gcGhyYXNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vICMjIyBwb2x5Z2xvdC51bnNldChwaHJhc2VzKVxuICAvLyBVc2UgYHVuc2V0YCB0byBzZWxlY3RpdmVseSByZW1vdmUga2V5cyBmcm9tIGEgcG9seWdsb3QgaW5zdGFuY2UuXG4gIC8vXG4gIC8vICAgICBwb2x5Z2xvdC51bnNldChcInNvbWVfa2V5XCIpO1xuICAvLyAgICAgcG9seWdsb3QudW5zZXQoe1xuICAvLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbiAgLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuICAvLyAgICAgfSk7XG4gIC8vXG4gIC8vIFRoZSB1bnNldCBtZXRob2QgY2FuIHRha2UgZWl0aGVyIGEgc3RyaW5nIChmb3IgdGhlIGtleSksIG9yIGFuIG9iamVjdCBoYXNoIHdpdGhcbiAgLy8gdGhlIGtleXMgdGhhdCB5b3Ugd291bGQgbGlrZSB0byB1bnNldC5cbiAgUG9seWdsb3QucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgICB2YXIgcGhyYXNlO1xuXG4gICAgaWYgKHR5cGVvZiBtb3JlUGhyYXNlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbbW9yZVBocmFzZXNdO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gbW9yZVBocmFzZXMpIHtcbiAgICAgICAgaWYgKG1vcmVQaHJhc2VzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBwaHJhc2UgPSBtb3JlUGhyYXNlc1trZXldO1xuICAgICAgICAgIGlmIChwcmVmaXgpIGtleSA9IHByZWZpeCArICcuJyArIGtleTtcbiAgICAgICAgICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMudW5zZXQocGhyYXNlLCBrZXkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5waHJhc2VzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vICMjIyBwb2x5Z2xvdC5jbGVhcigpXG4gIC8vXG4gIC8vIENsZWFycyBhbGwgcGhyYXNlcy4gVXNlZnVsIGZvciBzcGVjaWFsIGNhc2VzLCBzdWNoIGFzIGZyZWVpbmdcbiAgLy8gdXAgbWVtb3J5IGlmIHlvdSBoYXZlIGxvdHMgb2YgcGhyYXNlcyBidXQgbm8gbG9uZ2VyIG5lZWQgdG9cbiAgLy8gcGVyZm9ybSBhbnkgdHJhbnNsYXRpb24uIEFsc28gdXNlZCBpbnRlcm5hbGx5IGJ5IGByZXBsYWNlYC5cbiAgUG9seWdsb3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucGhyYXNlcyA9IHt9O1xuICB9O1xuXG4gIC8vICMjIyBwb2x5Z2xvdC5yZXBsYWNlKHBocmFzZXMpXG4gIC8vXG4gIC8vIENvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgcGhyYXNlcyB3aXRoIGEgbmV3IHNldCBvZiBwaHJhc2VzLlxuICAvLyBOb3JtYWxseSwganVzdCB1c2UgYGV4dGVuZGAgdG8gYWRkIG1vcmUgcGhyYXNlcywgYnV0IHVuZGVyIGNlcnRhaW5cbiAgLy8gY2lyY3Vtc3RhbmNlcywgeW91IG1heSB3YW50IHRvIG1ha2Ugc3VyZSBubyBvbGQgcGhyYXNlcyBhcmUgbHlpbmcgYXJvdW5kLlxuICBQb2x5Z2xvdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChuZXdQaHJhc2VzKSB7XG4gICAgdGhpcy5jbGVhcigpO1xuICAgIHRoaXMuZXh0ZW5kKG5ld1BocmFzZXMpO1xuICB9O1xuXG4gIC8vICMjIyBwb2x5Z2xvdC50KGtleSwgb3B0aW9ucylcbiAgLy9cbiAgLy8gVGhlIG1vc3QtdXNlZCBtZXRob2QuIFByb3ZpZGUgYSBrZXksIGFuZCBgdGAgd2lsbCByZXR1cm4gdGhlXG4gIC8vIHBocmFzZS5cbiAgLy9cbiAgLy8gICAgIHBvbHlnbG90LnQoXCJoZWxsb1wiKTtcbiAgLy8gICAgID0+IFwiSGVsbG9cIlxuICAvL1xuICAvLyBUaGUgcGhyYXNlIHZhbHVlIGlzIHByb3ZpZGVkIGZpcnN0IGJ5IGEgY2FsbCB0byBgcG9seWdsb3QuZXh0ZW5kKClgIG9yXG4gIC8vIGBwb2x5Z2xvdC5yZXBsYWNlKClgLlxuICAvL1xuICAvLyBQYXNzIGluIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHBlcmZvcm0gaW50ZXJwb2xhdGlvbi5cbiAgLy9cbiAgLy8gICAgIHBvbHlnbG90LnQoXCJoZWxsb19uYW1lXCIsIHtuYW1lOiBcIlNwaWtlXCJ9KTtcbiAgLy8gICAgID0+IFwiSGVsbG8sIFNwaWtlXCJcbiAgLy9cbiAgLy8gSWYgeW91IGxpa2UsIHlvdSBjYW4gcHJvdmlkZSBhIGRlZmF1bHQgdmFsdWUgaW4gY2FzZSB0aGUgcGhyYXNlIGlzIG1pc3NpbmcuXG4gIC8vIFVzZSB0aGUgc3BlY2lhbCBvcHRpb24ga2V5IFwiX1wiIHRvIHNwZWNpZnkgYSBkZWZhdWx0LlxuICAvL1xuICAvLyAgICAgcG9seWdsb3QudChcImlfbGlrZV90b193cml0ZV9pbl9sYW5ndWFnZVwiLCB7XG4gIC8vICAgICAgIF86IFwiSSBsaWtlIHRvIHdyaXRlIGluICV7bGFuZ3VhZ2V9LlwiLFxuICAvLyAgICAgICBsYW5ndWFnZTogXCJKYXZhU2NyaXB0XCJcbiAgLy8gICAgIH0pO1xuICAvLyAgICAgPT4gXCJJIGxpa2UgdG8gd3JpdGUgaW4gSmF2YVNjcmlwdC5cIlxuICAvL1xuICBQb2x5Z2xvdC5wcm90b3R5cGUudCA9IGZ1bmN0aW9uIChrZXksIG9wdGlvbnMpIHtcbiAgICB2YXIgcGhyYXNlLCByZXN1bHQ7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgPT0gbnVsbCA/IHt9IDogb3B0aW9ucztcbiAgICAvLyBhbGxvdyBudW1iZXIgYXMgYSBwbHVyYWxpemF0aW9uIHNob3J0Y3V0XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnbnVtYmVyJykge1xuICAgICAgb3B0aW9ucyA9IHsgc21hcnRfY291bnQ6IG9wdGlvbnMgfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnBocmFzZXNba2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBocmFzZSA9IHRoaXMucGhyYXNlc1trZXldO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuXyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBocmFzZSA9IG9wdGlvbnMuXztcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWxsb3dNaXNzaW5nKSB7XG4gICAgICBwaHJhc2UgPSBrZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud2FybignTWlzc2luZyB0cmFuc2xhdGlvbiBmb3Iga2V5OiBcIicgKyBrZXkgKyAnXCInKTtcbiAgICAgIHJlc3VsdCA9IGtleTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBvcHRpb25zID0gY2xvbmUob3B0aW9ucyk7XG4gICAgICByZXN1bHQgPSBjaG9vc2VQbHVyYWxGb3JtKHBocmFzZSwgdGhpcy5jdXJyZW50TG9jYWxlLCBvcHRpb25zLnNtYXJ0X2NvdW50KTtcbiAgICAgIHJlc3VsdCA9IGludGVycG9sYXRlKHJlc3VsdCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gIyMjIHBvbHlnbG90LmhhcyhrZXkpXG4gIC8vXG4gIC8vIENoZWNrIGlmIHBvbHlnbG90IGhhcyBhIHRyYW5zbGF0aW9uIGZvciBnaXZlbiBrZXlcbiAgUG9seWdsb3QucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4ga2V5IGluIHRoaXMucGhyYXNlcztcbiAgfTtcblxuICAvLyAjIyMjIFBsdXJhbGl6YXRpb24gbWV0aG9kc1xuICAvLyBUaGUgc3RyaW5nIHRoYXQgc2VwYXJhdGVzIHRoZSBkaWZmZXJlbnQgcGhyYXNlIHBvc3NpYmlsaXRpZXMuXG4gIHZhciBkZWxpbWV0ZXIgPSAnfHx8fCc7XG5cbiAgLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgcGx1cmFsIGxvZ2ljLlxuICB2YXIgcGx1cmFsVHlwZXMgPSB7XG4gICAgY2hpbmVzZTogZnVuY3Rpb24gY2hpbmVzZShuKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9LFxuICAgIGdlcm1hbjogZnVuY3Rpb24gZ2VybWFuKG4pIHtcbiAgICAgIHJldHVybiBuICE9PSAxID8gMSA6IDA7XG4gICAgfSxcbiAgICBmcmVuY2g6IGZ1bmN0aW9uIGZyZW5jaChuKSB7XG4gICAgICByZXR1cm4gbiA+IDEgPyAxIDogMDtcbiAgICB9LFxuICAgIHJ1c3NpYW46IGZ1bmN0aW9uIHJ1c3NpYW4obikge1xuICAgICAgcmV0dXJuIG4gJSAxMCA9PT0gMSAmJiBuICUgMTAwICE9PSAxMSA/IDAgOiBuICUgMTAgPj0gMiAmJiBuICUgMTAgPD0gNCAmJiAobiAlIDEwMCA8IDEwIHx8IG4gJSAxMDAgPj0gMjApID8gMSA6IDI7XG4gICAgfSxcbiAgICBjemVjaDogZnVuY3Rpb24gY3plY2gobikge1xuICAgICAgcmV0dXJuIG4gPT09IDEgPyAwIDogbiA+PSAyICYmIG4gPD0gNCA/IDEgOiAyO1xuICAgIH0sXG4gICAgcG9saXNoOiBmdW5jdGlvbiBwb2xpc2gobikge1xuICAgICAgcmV0dXJuIG4gPT09IDEgPyAwIDogbiAlIDEwID49IDIgJiYgbiAlIDEwIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyO1xuICAgIH0sXG4gICAgaWNlbGFuZGljOiBmdW5jdGlvbiBpY2VsYW5kaWMobikge1xuICAgICAgcmV0dXJuIG4gJSAxMCAhPT0gMSB8fCBuICUgMTAwID09PSAxMSA/IDEgOiAwO1xuICAgIH1cbiAgfTtcblxuICAvLyBNYXBwaW5nIGZyb20gcGx1cmFsaXphdGlvbiBncm91cCB0byBpbmRpdmlkdWFsIGxvY2FsZXMuXG4gIHZhciBwbHVyYWxUeXBlVG9MYW5ndWFnZXMgPSB7XG4gICAgY2hpbmVzZTogWydmYScsICdpZCcsICdqYScsICdrbycsICdsbycsICdtcycsICd0aCcsICd0cicsICd6aCddLFxuICAgIGdlcm1hbjogWydkYScsICdkZScsICdlbicsICdlcycsICdmaScsICdlbCcsICdoZScsICdodScsICdpdCcsICdubCcsICdubycsICdwdCcsICdzdiddLFxuICAgIGZyZW5jaDogWydmcicsICd0bCcsICdwdC1iciddLFxuICAgIHJ1c3NpYW46IFsnaHInLCAncnUnXSxcbiAgICBjemVjaDogWydjcycsICdzayddLFxuICAgIHBvbGlzaDogWydwbCddLFxuICAgIGljZWxhbmRpYzogWydpcyddXG4gIH07XG5cbiAgZnVuY3Rpb24gbGFuZ1RvVHlwZU1hcChtYXBwaW5nKSB7XG4gICAgdmFyIHR5cGUsXG4gICAgICAgIGxhbmdzLFxuICAgICAgICBsLFxuICAgICAgICByZXQgPSB7fTtcbiAgICBmb3IgKHR5cGUgaW4gbWFwcGluZykge1xuICAgICAgaWYgKG1hcHBpbmcuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcbiAgICAgICAgbGFuZ3MgPSBtYXBwaW5nW3R5cGVdO1xuICAgICAgICBmb3IgKGwgaW4gbGFuZ3MpIHtcbiAgICAgICAgICByZXRbbGFuZ3NbbF1dID0gdHlwZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gVHJpbSBhIHN0cmluZy5cbiAgdmFyIHRyaW1SZSA9IC9eXFxzK3xcXHMrJC9nO1xuICBmdW5jdGlvbiB0cmltKHN0cikge1xuICAgIHJldHVybiByZXBsYWNlLmNhbGwoc3RyLCB0cmltUmUsICcnKTtcbiAgfVxuXG4gIC8vIEJhc2VkIG9uIGEgcGhyYXNlIHRleHQgdGhhdCBjb250YWlucyBgbmAgcGx1cmFsIGZvcm1zIHNlcGFyYXRlZFxuICAvLyBieSBgZGVsaW1ldGVyYCwgYSBgbG9jYWxlYCwgYW5kIGEgYGNvdW50YCwgY2hvb3NlIHRoZSBjb3JyZWN0XG4gIC8vIHBsdXJhbCBmb3JtLCBvciBub25lIGlmIGBjb3VudGAgaXMgYG51bGxgLlxuICBmdW5jdGlvbiBjaG9vc2VQbHVyYWxGb3JtKHRleHQsIGxvY2FsZSwgY291bnQpIHtcbiAgICB2YXIgcmV0LCB0ZXh0cywgY2hvc2VuVGV4dDtcbiAgICBpZiAoY291bnQgIT0gbnVsbCAmJiB0ZXh0KSB7XG4gICAgICB0ZXh0cyA9IHRleHQuc3BsaXQoZGVsaW1ldGVyKTtcbiAgICAgIGNob3NlblRleHQgPSB0ZXh0c1twbHVyYWxUeXBlSW5kZXgobG9jYWxlLCBjb3VudCldIHx8IHRleHRzWzBdO1xuICAgICAgcmV0ID0gdHJpbShjaG9zZW5UZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0ID0gdGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsdXJhbFR5cGVOYW1lKGxvY2FsZSkge1xuICAgIHZhciBsYW5nVG9QbHVyYWxUeXBlID0gbGFuZ1RvVHlwZU1hcChwbHVyYWxUeXBlVG9MYW5ndWFnZXMpO1xuICAgIHJldHVybiBsYW5nVG9QbHVyYWxUeXBlW2xvY2FsZV0gfHwgbGFuZ1RvUGx1cmFsVHlwZS5lbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsdXJhbFR5cGVJbmRleChsb2NhbGUsIGNvdW50KSB7XG4gICAgcmV0dXJuIHBsdXJhbFR5cGVzW3BsdXJhbFR5cGVOYW1lKGxvY2FsZSldKGNvdW50KTtcbiAgfVxuXG4gIC8vICMjIyBpbnRlcnBvbGF0ZVxuICAvL1xuICAvLyBEb2VzIHRoZSBkaXJ0eSB3b3JrLiBDcmVhdGVzIGEgYFJlZ0V4cGAgb2JqZWN0IGZvciBlYWNoXG4gIC8vIGludGVycG9sYXRpb24gcGxhY2Vob2xkZXIuXG4gIHZhciBkb2xsYXJSZWdleCA9IC9cXCQvZztcbiAgdmFyIGRvbGxhckJpbGxzWWFsbCA9ICckJCQkJztcbiAgZnVuY3Rpb24gaW50ZXJwb2xhdGUocGhyYXNlLCBvcHRpb25zKSB7XG4gICAgZm9yICh2YXIgYXJnIGluIG9wdGlvbnMpIHtcbiAgICAgIGlmIChhcmcgIT09ICdfJyAmJiBvcHRpb25zLmhhc093blByb3BlcnR5KGFyZykpIHtcbiAgICAgICAgLy8gRW5zdXJlIHJlcGxhY2VtZW50IHZhbHVlIGlzIGVzY2FwZWQgdG8gcHJldmVudCBzcGVjaWFsICQtcHJlZml4ZWRcbiAgICAgICAgLy8gcmVnZXggcmVwbGFjZSB0b2tlbnMuIHRoZSBcIiQkJCRcIiBpcyBuZWVkZWQgYmVjYXVzZSBlYWNoIFwiJFwiIG5lZWRzIHRvXG4gICAgICAgIC8vIGJlIGVzY2FwZWQgd2l0aCBcIiRcIiBpdHNlbGYsIGFuZCB3ZSBuZWVkIHR3byBpbiB0aGUgcmVzdWx0aW5nIG91dHB1dC5cbiAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gb3B0aW9uc1thcmddO1xuICAgICAgICBpZiAodHlwZW9mIHJlcGxhY2VtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJlcGxhY2VtZW50ID0gcmVwbGFjZS5jYWxsKG9wdGlvbnNbYXJnXSwgZG9sbGFyUmVnZXgsIGRvbGxhckJpbGxzWWFsbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgY3JlYXRlIGEgbmV3IGBSZWdFeHBgIGVhY2ggdGltZSBpbnN0ZWFkIG9mIHVzaW5nIGEgbW9yZS1lZmZpY2llbnRcbiAgICAgICAgLy8gc3RyaW5nIHJlcGxhY2Ugc28gdGhhdCB0aGUgc2FtZSBhcmd1bWVudCBjYW4gYmUgcmVwbGFjZWQgbXVsdGlwbGUgdGltZXNcbiAgICAgICAgLy8gaW4gdGhlIHNhbWUgcGhyYXNlLlxuICAgICAgICBwaHJhc2UgPSByZXBsYWNlLmNhbGwocGhyYXNlLCBuZXcgUmVnRXhwKCclXFxcXHsnICsgYXJnICsgJ1xcXFx9JywgJ2cnKSwgcmVwbGFjZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGhyYXNlO1xuICB9XG5cbiAgLy8gIyMjIHdhcm5cbiAgLy9cbiAgLy8gUHJvdmlkZXMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGEgcGhyYXNlIGtleSBpcyBtaXNzaW5nLlxuICBmdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgICByb290LmNvbnNvbGUgJiYgcm9vdC5jb25zb2xlLndhcm4gJiYgcm9vdC5jb25zb2xlLndhcm4oJ1dBUk5JTkc6ICcgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIC8vICMjIyBjbG9uZVxuICAvL1xuICAvLyBDbG9uZSBhbiBvYmplY3QuXG4gIGZ1bmN0aW9uIGNsb25lKHNvdXJjZSkge1xuICAgIHZhciByZXQgPSB7fTtcbiAgICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZSkge1xuICAgICAgcmV0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgcmV0dXJuIFBvbHlnbG90O1xufSk7XG4vL1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICc0MmNmOE1wRFlOSnpaQVhhbTRxVk9NSScsICdyYXktY2FzdC1yZWZsZWN0aW9uJyk7XG4vLyBjYXNlcy9yYXktY2FzdC1yZWZsZWN0aW9uLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICByYWRpdXM6IDEwMDBcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBjYy52MihjYy53aW5TaXplLndpZHRoIC8gMiwgY2Mud2luU2l6ZS5oZWlnaHQgLyAyKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLmFuZ2xlICs9IE1hdGguUEkgLyAyMCAqIGR0O1xuXG4gICAgICAgIHZhciBwMSA9IHRoaXMuY2VudGVyO1xuICAgICAgICB2YXIgcDIgPSBjYy52MihNYXRoLmNvcyh0aGlzLmFuZ2xlKSwgTWF0aC5zaW4odGhpcy5hbmdsZSkpLm11bFNlbGYodGhpcy5yYWRpdXMpLmFkZFNlbGYodGhpcy5jZW50ZXIpO1xuXG4gICAgICAgIHRoaXMuY3R4LmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy5yZW1haW5MZW5ndGggPSB0aGlzLnJhZGl1cztcbiAgICAgICAgdGhpcy5yYXlDYXN0KHAxLCBwMik7XG4gICAgfSxcblxuICAgIHJheUNhc3Q6IGZ1bmN0aW9uIHJheUNhc3QocDEsIHAyKSB7XG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG1hbmFnZXIucmF5Q2FzdChwMSwgcDIpO1xuXG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHAyID0gcmVzdWx0LnBvaW50O1xuICAgICAgICAgICAgdGhpcy5jdHguY2lyY2xlKHAyLngsIHAyLnksIDUpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdHgubW92ZVRvKHAxLngsIHAxLnkpO1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8ocDIueCwgcDIueSk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIGlmICghcmVzdWx0KSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5yZW1haW5MZW5ndGggPSB0aGlzLnJlbWFpbkxlbmd0aCAtIHAyLnN1YihwMSkubWFnKCk7XG4gICAgICAgIGlmICh0aGlzLnJlbWFpbkxlbmd0aCA8IDEpIHJldHVybjtcblxuICAgICAgICByZXN1bHQubm9ybWFsLm11bCh0aGlzLnJlbWFpbkxlbmd0aCk7XG5cbiAgICAgICAgcDEgPSBwMjtcbiAgICAgICAgcDIgPSByZXN1bHQubm9ybWFsLm11bCh0aGlzLnJlbWFpbkxlbmd0aCkuYWRkKHAxKTtcbiAgICAgICAgdGhpcy5yYXlDYXN0KHAxLCBwMik7XG4gICAgfVxufSk7XG5cbmNjLl9SRi5wb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRi5wdXNoKG1vZHVsZSwgJ2IwYWM3cE81a3hHZmJzTlVBVFp6RmZLJywgJ3JheS1jYXN0Jyk7XG4vLyBjYXNlcy9yYXktY2FzdC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcmF5Q2FzdFR5cGU6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBjYy5SYXlDYXN0VHlwZS5DbG9zZXN0LFxuICAgICAgICAgICAgdHlwZTogY2MuUmF5Q2FzdFR5cGVcbiAgICAgICAgfSxcblxuICAgICAgICByYWRpdXM6IDEwMDBcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBjYy52MihjYy53aW5TaXplLndpZHRoIC8gMiwgY2Mud2luU2l6ZS5oZWlnaHQgLyAyKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuYW5nbGUgKz0gTWF0aC5QSSAvIDEwICogZHQ7XG5cbiAgICAgICAgdmFyIHAxID0gdGhpcy5jZW50ZXI7XG4gICAgICAgIHZhciBwMiA9IGNjLnYyKE1hdGguY29zKHRoaXMuYW5nbGUpLCBNYXRoLnNpbih0aGlzLmFuZ2xlKSkubXVsU2VsZih0aGlzLnJhZGl1cykuYWRkU2VsZih0aGlzLmNlbnRlcik7XG5cbiAgICAgICAgdmFyIG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IG1hbmFnZXIucmF5Q2FzdChwMSwgcDIsIHRoaXMucmF5Q2FzdFR5cGUpO1xuXG4gICAgICAgIHRoaXMuY3R4LmNsZWFyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucmF5Q2FzdFR5cGUgPT09IGNjLlJheUNhc3RUeXBlLkNsb3Nlc3QgfHwgdGhpcy5yYXlDYXN0VHlwZSA9PT0gY2MuUmF5Q2FzdFR5cGUuQW55KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgIHAyID0gcmVzdWx0cy5wb2ludDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3R4LmNpcmNsZShwMi54LCBwMi55LCA1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY3R4LmNpcmNsZShyZXN1bHQucG9pbnQueCwgcmVzdWx0LnBvaW50LnksIDUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XG5cbiAgICAgICAgdGhpcy5jdHgubW92ZVRvKHAxLngsIHAxLnkpO1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8ocDIueCwgcDIueSk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIH0sXG5cbiAgICBvbkNsb3Nlc3RCdG5DbGljazogZnVuY3Rpb24gb25DbG9zZXN0QnRuQ2xpY2soKSB7XG4gICAgICAgIHRoaXMucmF5Q2FzdFR5cGUgPSBjYy5SYXlDYXN0VHlwZS5DbG9zZXN0O1xuICAgIH0sXG5cbiAgICBvbkFueUJ0bkNsaWNrOiBmdW5jdGlvbiBvbkFueUJ0bkNsaWNrKCkge1xuICAgICAgICB0aGlzLnJheUNhc3RUeXBlID0gY2MuUmF5Q2FzdFR5cGUuQW55O1xuICAgIH0sXG5cbiAgICBvbkFsbEJ0bkNsaWNrOiBmdW5jdGlvbiBvbkFsbEJ0bkNsaWNrKCkge1xuICAgICAgICB0aGlzLnJheUNhc3RUeXBlID0gY2MuUmF5Q2FzdFR5cGUuQWxsO1xuICAgIH1cbn0pO1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICc2YWM2MEcvb2xoT3k3S2JwM0p6NEtvbicsICdzaG9vdC1hcnJvdycpO1xuLy8gY2FzZXMvc3RpY2stYXJyb3cvc2hvb3QtYXJyb3cuanNcblxuLy8gaHR0cDovL3d3dy5pZm9yY2UyZC5uZXQvYjJkdHV0L3N0aWNreS1wcm9qZWN0aWxlc1xuLy8gaHR0cDovL3d3dy5lbWFudWVsZWZlcm9uYXRvLmNvbS8yMDEyLzEyLzE0L2JveDJkLWZseWluZy1hcnJvdy1lbmdpbmUtZmlyc3QtYXR0ZW1wdC9cblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGFycm93OiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMuZGVidWdEcmF3RmxhZ3MgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmRlYnVnRHJhd0ZsYWdzO1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmRlYnVnRHJhd0ZsYWdzID0gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9qb2ludEJpdCB8IGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfc2hhcGVCaXQ7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gb25EaXNhYmxlKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmRlYnVnRHJhd0ZsYWdzID0gdGhpcy5kZWJ1Z0RyYXdGbGFncztcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLmFycm93Qm9kaWVzID0gW107XG4gICAgfSxcblxuICAgIG9uVG91Y2hCZWdhbjogZnVuY3Rpb24gb25Ub3VjaEJlZ2FuKGV2ZW50KSB7XG4gICAgICAgIHZhciB0b3VjaExvYyA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XG5cbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmFycm93KTtcbiAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHZhciB2ZWMgPSBjYy52Mih0b3VjaExvYykuc3ViKG5vZGUucG9zaXRpb24pO1xuICAgICAgICBub2RlLnJvdGF0aW9uID0gLU1hdGguYXRhbjIodmVjLnksIHZlYy54KSAqIDE4MCAvIE1hdGguUEk7XG5cbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChub2RlKTtcblxuICAgICAgICB2YXIgZGlzdGFuY2UgPSB2ZWMubWFnKCk7XG4gICAgICAgIHZhciB2ZWxvY2l0eSA9IHZlYy5ub3JtYWxpemUoKS5tdWxTZWxmKDgwMCk7XG5cbiAgICAgICAgdmFyIGFycm93Qm9keSA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XG4gICAgICAgIGFycm93Qm9keS5saW5lYXJWZWxvY2l0eSA9IHZlbG9jaXR5O1xuXG4gICAgICAgIHRoaXMuYXJyb3dCb2RpZXMucHVzaChhcnJvd0JvZHkpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIHZhciBkcmFnQ29uc3RhbnQgPSAwLjE7XG4gICAgICAgIHZhciBhcnJvd0JvZGllcyA9IHRoaXMuYXJyb3dCb2RpZXM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyb3dCb2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBhcnJvd0JvZHkgPSBhcnJvd0JvZGllc1tpXTtcbiAgICAgICAgICAgIHZhciB2ZWxvY2l0eSA9IGFycm93Qm9keS5saW5lYXJWZWxvY2l0eTtcbiAgICAgICAgICAgIHZhciBzcGVlZCA9IHZlbG9jaXR5Lm1hZygpO1xuICAgICAgICAgICAgaWYgKHNwZWVkID09PSAwKSBjb250aW51ZTtcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSB2ZWxvY2l0eS5ub3JtYWxpemUoKTtcblxuICAgICAgICAgICAgdmFyIHBvaW50aW5nRGlyZWN0aW9uID0gYXJyb3dCb2R5LmdldFdvcmxkVmVjdG9yKGNjLnYyKDEsIDApKTtcbiAgICAgICAgICAgIHZhciBmbGlnaHREaXJlY3Rpb24gPSBhcnJvd0JvZHkubGluZWFyVmVsb2NpdHk7XG4gICAgICAgICAgICB2YXIgZmxpZ2h0U3BlZWQgPSBmbGlnaHREaXJlY3Rpb24ubWFnKCk7XG4gICAgICAgICAgICBmbGlnaHREaXJlY3Rpb24ubm9ybWFsaXplU2VsZigpO1xuXG4gICAgICAgICAgICB2YXIgZG90ID0gY2MucERvdChmbGlnaHREaXJlY3Rpb24sIHBvaW50aW5nRGlyZWN0aW9uKTtcbiAgICAgICAgICAgIHZhciBkcmFnRm9yY2VNYWduaXR1ZGUgPSAoMSAtIE1hdGguYWJzKGRvdCkpICogZmxpZ2h0U3BlZWQgKiBmbGlnaHRTcGVlZCAqIGRyYWdDb25zdGFudCAqIGFycm93Qm9keS5tYXNzO1xuXG4gICAgICAgICAgICB2YXIgYXJyb3dUYWlsUG9zaXRpb24gPSBhcnJvd0JvZHkuZ2V0V29ybGRQb2ludChjYy52MigtODAsIDApKTtcbiAgICAgICAgICAgIGFycm93Qm9keS5hcHBseUZvcmNlKGZsaWdodERpcmVjdGlvbi5tdWwoLWRyYWdGb3JjZU1hZ25pdHVkZSksIGFycm93VGFpbFBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICc3MjhhZGpTVnU5UDI1S3cwYWRhejdVVicsICdzbW9vdGgnKTtcbi8vIGNhc2VzL2Jsb2Ivc21vb3RoLmpzXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gc21vb3RoIGhlbHBlclxuZnVuY3Rpb24gZ2V0Rmlyc3RDb250cm9sUG9pbnRzKHJocykge1xuICAgIHZhciBuID0gcmhzLmxlbmd0aCxcbiAgICAgICAgeCA9IFtdLFxuICAgICAgICAvLyBTb2x1dGlvbiB2ZWN0b3IuXG4gICAgdG1wID0gW10sXG4gICAgICAgIC8vIFRlbXAgd29ya3NwYWNlLlxuICAgIGIgPSAyLjAsXG4gICAgICAgIGk7XG5cbiAgICB4WzBdID0gcmhzWzBdIC8gYjtcblxuICAgIGZvciAoaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgLy8gRGVjb21wb3NpdGlvbiBhbmQgZm9yd2FyZCBzdWJzdGl0dXRpb24uXG4gICAgICAgIHRtcFtpXSA9IDEgLyBiO1xuICAgICAgICBiID0gKGkgPCBuIC0gMSA/IDQuMCA6IDIuMCkgLSB0bXBbaV07XG4gICAgICAgIHhbaV0gPSAocmhzW2ldIC0geFtpIC0gMV0pIC8gYjtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHhbbiAtIGkgLSAxXSAtPSB0bXBbbiAtIGldICogeFtuIC0gaV07IC8vIEJhY2tzdWJzdGl0dXRpb24uXG4gICAgfVxuICAgIHJldHVybiB4O1xufVxuXG5mdW5jdGlvbiBnZXRDdWJpY0JlemllckN1cnZlUG9pbnRzKHBvaW50cywgZmlyc3RDb250cm9sUG9pbnRzLCBzZWNvbmRDb250cm9sUG9pbnRzKSB7XG4gICAgdmFyIHNpemUgPSBwb2ludHMubGVuZ3RoLFxuICAgICAgICBjbG9zZWQgPSBwb2ludHNbc2l6ZSAtIDFdLnggPT09IHBvaW50c1swXS54ICYmIHBvaW50c1tzaXplIC0gMV0ueSA9PT0gcG9pbnRzWzBdLnksXG4gICAgICAgIG4gPSBzaXplLFxuXG4gICAgLy8gQWRkIG92ZXJsYXBwaW5nIGVuZHMgZm9yIGF2ZXJhZ2luZyBoYW5kbGVzIGluIGNsb3NlZCBwYXRoc1xuICAgIG92ZXJsYXAgPSAwO1xuXG4gICAgaWYgKGNsb3NlZCkge1xuICAgICAgICBzaXplID0gbiA9IHNpemUgLSAxO1xuICAgIH1cblxuICAgIGlmIChzaXplIDw9IDIpIHJldHVybjtcbiAgICBpZiAoY2xvc2VkKSB7XG4gICAgICAgIC8vIE92ZXJsYXAgdXAgdG8gNCBwb2ludHMgc2luY2UgYXZlcmFnaW5nIGJlemllcnMgYWZmZWN0IHRoZSA0XG4gICAgICAgIC8vIG5laWdoYm9yaW5nIHBvaW50c1xuICAgICAgICBvdmVybGFwID0gTWF0aC5taW4oc2l6ZSwgNCk7XG4gICAgICAgIG4gKz0gTWF0aC5taW4oc2l6ZSwgb3ZlcmxhcCkgKiAyO1xuICAgIH1cblxuICAgIHZhciBrbm90cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSBrbm90c1tpICsgb3ZlcmxhcF0gPSBwb2ludHNbaV07XG4gICAgaWYgKGNsb3NlZCkge1xuICAgICAgICAvLyBJZiB3ZSdyZSBhdmVyYWdpbmcsIGFkZCB0aGUgNCBsYXN0IHBvaW50cyBhZ2FpbiBhdCB0aGVcbiAgICAgICAgLy8gYmVnaW5uaW5nLCBhbmQgdGhlIDQgZmlyc3Qgb25lcyBhdCB0aGUgZW5kLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG92ZXJsYXA7IGkrKykge1xuICAgICAgICAgICAga25vdHNbaV0gPSBwb2ludHNbaSArIHNpemUgLSBvdmVybGFwXTtcbiAgICAgICAgICAgIGtub3RzW2kgKyBzaXplICsgb3ZlcmxhcF0gPSBwb2ludHNbaV07XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBuLS07XG4gICAgfVxuICAgIC8vIENhbGN1bGF0ZSBmaXJzdCBCZXppZXIgY29udHJvbCBwb2ludHNcbiAgICAvLyBSaWdodCBoYW5kIHNpZGUgdmVjdG9yXG4gICAgdmFyIHJocyA9IFtdO1xuXG4gICAgLy8gU2V0IHJpZ2h0IGhhbmQgc2lkZSBYIHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbiAtIDE7IGkrKykgcmhzW2ldID0gNCAqIGtub3RzW2ldLnggKyAyICoga25vdHNbaSArIDFdLng7XG4gICAgcmhzWzBdID0ga25vdHNbMF0ueCArIDIgKiBrbm90c1sxXS54O1xuICAgIHJoc1tuIC0gMV0gPSAzICoga25vdHNbbiAtIDFdLng7XG4gICAgLy8gR2V0IGZpcnN0IGNvbnRyb2wgcG9pbnRzIFgtdmFsdWVzXG4gICAgdmFyIHggPSBnZXRGaXJzdENvbnRyb2xQb2ludHMocmhzKTtcblxuICAgIC8vIFNldCByaWdodCBoYW5kIHNpZGUgWSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IG4gLSAxOyBpKyspIHJoc1tpXSA9IDQgKiBrbm90c1tpXS55ICsgMiAqIGtub3RzW2kgKyAxXS55O1xuICAgIHJoc1swXSA9IGtub3RzWzBdLnkgKyAyICoga25vdHNbMV0ueTtcbiAgICByaHNbbiAtIDFdID0gMyAqIGtub3RzW24gLSAxXS55O1xuICAgIC8vIEdldCBmaXJzdCBjb250cm9sIHBvaW50cyBZLXZhbHVlc1xuICAgIHZhciB5ID0gZ2V0Rmlyc3RDb250cm9sUG9pbnRzKHJocyk7XG5cbiAgICBpZiAoY2xvc2VkKSB7XG4gICAgICAgIC8vIERvIHRoZSBhY3R1YWwgYXZlcmFnaW5nIHNpbXBseSBieSBsaW5lYXJseSBmYWRpbmcgYmV0d2VlbiB0aGVcbiAgICAgICAgLy8gb3ZlcmxhcHBpbmcgdmFsdWVzLlxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHNpemU7IGkgPCBvdmVybGFwOyBpKyssIGorKykge1xuICAgICAgICAgICAgdmFyIGYxID0gaSAvIG92ZXJsYXAsXG4gICAgICAgICAgICAgICAgZjIgPSAxIC0gZjEsXG4gICAgICAgICAgICAgICAgaWUgPSBpICsgb3ZlcmxhcCxcbiAgICAgICAgICAgICAgICBqZSA9IGogKyBvdmVybGFwO1xuICAgICAgICAgICAgLy8gQmVnaW5uaW5nXG4gICAgICAgICAgICB4W2pdID0geFtpXSAqIGYxICsgeFtqXSAqIGYyO1xuICAgICAgICAgICAgeVtqXSA9IHlbaV0gKiBmMSArIHlbal0gKiBmMjtcbiAgICAgICAgICAgIC8vIEVuZFxuICAgICAgICAgICAgeFtqZV0gPSB4W2llXSAqIGYyICsgeFtqZV0gKiBmMTtcbiAgICAgICAgICAgIHlbamVdID0geVtpZV0gKiBmMiArIHlbamVdICogZjE7XG4gICAgICAgIH1cbiAgICAgICAgbi0tO1xuICAgIH1cblxuICAgIC8vIE5vdyBzZXQgdGhlIGNhbGN1bGF0ZWQgaGFuZGxlc1xuICAgIGZvciAodmFyIGkgPSBvdmVybGFwOyBpIDw9IG4gLSBvdmVybGFwOyBpKyspIHtcblxuICAgICAgICBmaXJzdENvbnRyb2xQb2ludHNbaSAtIG92ZXJsYXBdID0ge1xuICAgICAgICAgICAgeDogeFtpXSxcbiAgICAgICAgICAgIHk6IHlbaV1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaSA8IG4gLSAxKSB7XG4gICAgICAgICAgICBzZWNvbmRDb250cm9sUG9pbnRzW2kgLSBvdmVybGFwXSA9IHtcbiAgICAgICAgICAgICAgICB4OiAyICoga25vdHNbaSArIDFdLnggLSB4W2kgKyAxXSxcbiAgICAgICAgICAgICAgICB5OiAyICoga25vdHNbaSArIDFdLnkgLSB5W2kgKyAxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlY29uZENvbnRyb2xQb2ludHNbaSAtIG92ZXJsYXBdID0ge1xuICAgICAgICAgICAgICAgIHg6IChrbm90c1tuXS54ICsgeFtuIC0gMV0pIC8gMixcbiAgICAgICAgICAgICAgICB5OiAoa25vdHNbbl0ueSArIHlbbiAtIDFdKSAvIDJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEN1YmljQmV6aWVyQ3VydmVQYXRoKGtub3RzKSB7XG4gICAgdmFyIGZpcnN0Q29udHJvbFBvaW50cyA9IFtdLFxuICAgICAgICBzZWNvbmRDb250cm9sUG9pbnRzID0gW107XG5cbiAgICBnZXRDdWJpY0JlemllckN1cnZlUG9pbnRzKGtub3RzLCBmaXJzdENvbnRyb2xQb2ludHMsIHNlY29uZENvbnRyb2xQb2ludHMpO1xuXG4gICAgcmV0dXJuIFtmaXJzdENvbnRyb2xQb2ludHMsIHNlY29uZENvbnRyb2xQb2ludHNdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEN1YmljQmV6aWVyQ3VydmVQYXRoO1xuXG5jYy5fUkYucG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkYucHVzaChtb2R1bGUsICc4N2YxZnMwZ29oSERJZk5nNGFlUFhidCcsICd6aCcpO1xuLy8gaTE4bi9kYXRhL3poLmpzXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBcImV4YW1wbGVfY2FzZV9ub25zdXBwb3J0X25hdGl2ZV9kZXNrdG9wX3RpcHNcIjogXCLor6XmtYvor5XnlKjkvovkuI3mlK/mjIEgTWFjIOW5s+WPsOWSjCBXaW5kb3dzIOW5s+WPsFwiLFxuICBcImV4YW1wbGVfY2FzZV9ub25zdXBwb3J0X3J1bnRpbWVfdGlwc1wiOiBcIuivpea1i+ivleeUqOS+i+S4jeaUr+aMgSBSdW50aW1lIOW5s+WPsFwiLFxuICBcImV4YW1wbGVfY2FzZV9ub25zdXBwb3J0X21vYmlsZV90aXBzXCI6IFwi6K+l5rWL6K+V55So5L6L5LiN5pSv5oyB56e75Yqo5bmz5Y+wXCIsXG4gIFwiZXhhbXBsZV9jYXNlX25vbnN1cHBvcnRfd2ViX2NhbnZhc190aXBzXCI6IFwi6K+l5rWL6K+V55So5L6L5LiN5pSv5oyBIENhbnZhcyDmqKHlvI9cIixcbiAgXCJleGFtcGxlX2Nhc2Vfc3VwcG9ydF93ZWJHbF90aXBzXCI6IFwi6K+l5rWL6K+V55So5L6L5Y+q5pSv5oyBIFdlYkdMIOaooeW8j1wiLFxuICBcImV4YW1wbGVfY2FzZV9zdXBwb3J0X21vYmlsZV90aXBzXCI6IFwi6K+l5rWL6K+V55So5L6L5Y+q5pSv5oyB56e75Yqo5bmz5Y+wXCIsXG4gIFwiZXhhbXBsZV9jYXNlX3N1cHBvcnRfbW9iaWxlX2FuZHJvaWRfdGlwc1wiOiBcIuivpea1i+ivleeUqOS+i+WPquaUr+aMgSBBbmRyb2lkIOenu+WKqOW5s+WPsFwiLFxuICBcImV4YW1wbGVfY2FzZV9zdXBwb3J0X25hdGl2ZV9jaHJvbWVfdGlwc1wiOiBcIuivpea1i+ivleeUqOS+i+WPquaUr+aMgSBQQyDlubPlj7DkuIrnmoQgQ2hyb21lIOa1j+iniOWZqFwiLFxuICBcImV4YW1wbGVfY2FzZV9zdXBwb3J0X25hdGl2ZV9kZXNrdG9wX3RpcHNcIjogXCLor6XmtYvor5XnlKjkvovlj6rmlK/mjIEgTWFjIOW5s+WPsOWSjCBXaW5kb3dzIOW5s+WPsFwiLFxuICBcIlRlc3RMaXN0LmZpcmUuMzBcIjogXCLov5Tlm57liJfooahcIixcbiAgXCJUZXN0TGlzdC5maXJlLjM3XCI6IFwi5p+l55yL6K+05piOXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL0F0bGFzU3ByaXRlLmZpcmUuN1wiOiBcIui/meS4queyvueBteadpeiHquWNleW8oOWbvueJh1wiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9BdGxhc1Nwcml0ZS5maXJlLjExXCI6IFwi6L+Z5Liq57K+54G15p2l6Ieq5Zu+6ZuGXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL0ZpbGxlZFNwcml0ZS5maXJlLjlcIjogXCLloavlhYXnsbvlnovvvJrmsLTlubNcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvRmlsbGVkU3ByaXRlLmZpcmUuMTVcIjogXCLloavlhYXnsbvlnovvvJrlnoLnm7RcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvRmlsbGVkU3ByaXRlLmZpcmUuMjNcIjogXCLloavlhYXnsbvlnovvvJrlnIblvaJcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvU2ltcGxlU3ByaXRlLmZpcmUuN1wiOiBcIui/meaYr+aZrumAmueyvueBtVwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9TbGljZWRTcHJpdGUuZmlyZS43XCI6IFwi6L+Z5piv5Lmd5a6r5qC857K+54G1XCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL1RpbGVkU3ByaXRlLmZpcmUuNlwiOiBcIui/meaYr+W5s+mTuueyvueBtVwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9UcmltbWVkU3ByaXRlLmZpcmUuN1wiOiBcIuiHquWKqOWJquijgSBcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvVHJpbW1lZFNwcml0ZS5maXJlLjEyXCI6IFwi5pyq6Ieq5Yqo5Ymq6KOBXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDJfcGFydGljbGUvQXV0b1JlbW92ZVBhcnRpY2xlLmZpcmUuOVwiOiBcIueykuWtkCAxXFxuXFxcIuWujOaIkOaXtuiHquWKqOenu+mZpFxcXCIg56aB5q2iXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDJfcGFydGljbGUvQXV0b1JlbW92ZVBhcnRpY2xlLmZpcmUuMTNcIjogXCLnspLlrZAgMlxcblxcXCLlrozmiJDml7boh6rliqjnp7vpmaRcXFwiIOW8gOWQr1wiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAyX3BhcnRpY2xlL1RvZ2dsZVBhcnRpY2xlLmZpcmUuNlwiOiBcIuaMiSBcXFwi5oyJ6ZKuXFxcIiDov5vooYzlvIDlhbPnspLlrZDmkq3mlL5cIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS43XCI6IFwi5bem5LiKXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuOVwiOiBcInRvcDogMTAlIGxlZnQ6IDYlXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMTRcIjogXCLkuIpcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4xNlwiOiBcInRvcDogLTM0cHhcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4yMVwiOiBcIuWPs+S4ilwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjIzXCI6IFwidG9wOiAxMCUgcmlnaHQ6IDYlXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMjhcIjogXCLlt6ZcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4zMFwiOiBcImxlZnQ6IC01MHB4XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMzVcIjogXCLlj7NcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4zN1wiOiBcInJpZ2h0OiAtNTBweFwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjQyXCI6IFwi5bem5LiLXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuNDRcIjogXCJib3R0b206IDEwJSBsZWZ0OiA2JVwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjQ5XCI6IFwi5LiLXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuNTFcIjogXCJib3R0b206IC0zNHB4XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuNTZcIjogXCLlj7PkuItcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS41OFwiOiBcImJvdHRvbToxMCUgcmlnaHQ6NiVcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS42M1wiOiBcIumrmOe6p+aMguS7tlwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BbGlnbk9uY2VXaWRnZXQuZmlyZS4xXCI6IFwiQWxpZ25PbmUg5Li6IGZhbHNlIOaXtu+8jOS8muS4gOebtOS/neaMgeWvuem9kFwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BbGlnbk9uY2VXaWRnZXQuZmlyZS4yXCI6IFwiQWxpZ25PbmUg5Li6IHRydWUg5pe277yM5Y+q5ZyoIFdpZGdldCDnlJ/mlYjml7blr7npvZDkuIDmrKFcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQW5pbWF0ZWRXaWRnZXQuZmlyZS45XCI6IFwi5Yqo55S75oyC5Lu244CCXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L1dpZGdldEFsaWduLmZpcmUuMThcIjogXCLmjILku7blr7npvZDmlrnlvI/jgIJcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQXV0b1Jlc2l6ZS5maXJlLjEzXCI6IFwi5oyC5Lu26Ieq5Yqo6LCD5pW05aSn5bCP44CCXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvR29sZEJlYXRpbmdBbmltZS5qcy4xXCI6IFwiMFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuNlwiOiBcIuaWh+acrOWvuem9kFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuOVwiOiBcIuawtOW5s+Wvuem9kFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMTRcIjogXCLlk4jllbDvvIFcXG7mrKLov47kvb/nlKggXFxuQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMTZcIjogXCLlr7npvZA6IOmdoOW3plwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMjFcIjogXCLlk4jllbDvvIFcXG7mrKLov47kvb/nlKggXFxuQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMjNcIjogXCLlr7npvZA6IOWxheS4rVwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMjhcIjogXCLlk4jllbDvvIFcXG7mrKLov47kvb/nlKggXFxuQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMzBcIjogXCLlr7npvZA6IOmdoOWPs1wiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMzNcIjogXCLlnoLnm7Tlr7npvZBcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjM4XCI6IFwi5qyi6L+O5L2/55SoIFxcbkNvY29zIENyZWF0b3JcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjQwXCI6IFwi5a+56b2QOiDpobbpg6hcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjQ1XCI6IFwi5qyi6L+O5L2/55SoIFxcbkNvY29zIENyZWF0b3JcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjQ3XCI6IFwi5a+56b2QOiDlsYXkuK1cIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjUyXCI6IFwi5qyi6L+O5L2/55SoIFxcbkNvY29zIENyZWF0b3JcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjU0XCI6IFwi5a+56b2QOiDlupXpg6hcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS42XCI6IFwi57O757uf5a2X5L2TXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuOVwiOiBcIuaNouihjFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjE0XCI6IFwi6L+Z5piv57O757uf6buY6K6k5a2X5L2TXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMTZcIjogXCJPdmVyZmxvdzogQ0xBTVBcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS4yMVwiOiBcIui/meaYr+ezu+e7n+m7mOiupOWtl+S9k1wiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjIzXCI6IFwiT3ZlcmZsb3c6IFNIUklOS1wiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjI2XCI6IFwi5LiN5o2i6KGMXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMzFcIjogXCLov5nmmK/ns7vnu5/pu5jorqTlrZfkvZNcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS4zM1wiOiBcIk92ZXJmbG93OiBDTEFNUFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjM4XCI6IFwi6L+Z5piv57O757uf6buY6K6k5a2X5L2TXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuNDBcIjogXCJPdmVyZmxvdzogU0hSSU5LXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuNDVcIjogXCLlk4jllr0hIOasoui/juS9v+eUqCBDb2NvcyBDcmVhdG9yXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuNDdcIjogXCJPdmVyZmxvdzogUkVTWklFX0hFSUdIVFwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JblNjcm9sbC5qcy4xXCI6IFwi6aG26YOo5oyJ6ZKu6KKr54K55Ye777yBXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkluU2Nyb2xsLmpzLjJcIjogXCLlupXpg6jmjInpkq7ooqvngrnlh7vvvIFcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW5TY3JvbGwuZmlyZS4yMVwiOiBcIuWTquS4quaMiemSruiiq+eCueWHu++8n1wiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JblNjcm9sbC5maXJlLjI3XCI6IFwi5ouW5Yqo5pi+56S65pu05aSa5oyJ6ZKuXFxuXFxuXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL1NpbXBsZUJ1dHRvbi5qcy4xXCI6IFwi5bem6L6555qE5oyJ6ZKu6KKr54K55Ye777yBXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL1NpbXBsZUJ1dHRvbi5qcy4yXCI6IFwi5Y+z6L6555qE5oyJ6ZKu6KKr54K55Ye777yBXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkludGVyYWN0YWJsZS5maXJlLjdcIjogXCLmkq3mlL5cIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmZpcmUuMTZcIjogXCLlgZzmraJcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmZpcmUuMjFcIjogXCLkuqTkupIoaW50ZXJhY3RhYmxlKTogdHJ1ZVwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JbnRlcmFjdGFibGUuZmlyZS4yM1wiOiBcIuS6pOS6kihpbnRlcmFjdGFibGUpOiBmYWxzZVwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JbnRlcmFjdGFibGUuanMuMVwiOiBcIuS6pOS6kihpbnRlcmFjdGFibGUpOiBcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmpzLjJcIjogXCLkuqTkupIoaW50ZXJhY3RhYmxlKTogXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL1NpbXBsZUJ1dHRvbi5maXJlLjZcIjogXCLlk6rkuKrmjInpkq7ooqvngrnlh7vvvJ9cIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L0l0ZW0uanMuMVwiOiBcIlRtcGwjXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDRfcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuZmlyZS43XCI6IFwi5rC05bmz6L+b5bqm5p2h77yM6L+b5bqmIDAuM1wiLFxuICBcImNhc2VzLzAyX3VpLzA0X3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmZpcmUuMTFcIjogXCLlj43lkJHmsLTlubPov5vluqbmnaHvvIzov5vluqYgMS4wXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDRfcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuZmlyZS4xNVwiOiBcIuWeguebtOi/m+W6puadoSBcXG7ku47kuIvlkJHkuIpcIixcbiAgXCJjYXNlcy8wMl91aS8wNF9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5maXJlLjE5XCI6IFwi5Z6C55u06L+b5bqm5p2hIFxcbuS7juS4iuWQkeS4i1wiLFxuICBcImNhc2VzLzAyX3VpLzA0X3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmZpcmUuMjNcIjogXCLorr7nva7kuobnsr7ngbXnmoTov5vluqbmnaFcIixcbiAgXCJjYXNlcy8wMl91aS8wNF9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5maXJlLjI4XCI6IFwi6K6+572u5LqG57K+54G177yI5a2Q5o6n5Lu277yJ55qE6L+b5bqm5p2hXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9MaXN0Vmlldy5maXJlLjIzXCI6IFwiSXRlbSAjMDBcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS43XCI6IFwiU2Nyb2xsdmlldyDlrozmlbTlip/og71cIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS4zMFwiOiBcIlNjcm9sbHZpZXcg5rKh5pyJ5oOv5oCnXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9TY3JvbGxWaWV3LmZpcmUuNTNcIjogXCJTY3JvbGx2aWV3IOayoeacieW8ueaAp1wiLFxuICBcImNhc2VzLzAyX3VpLzA1X3Njcm9sbFZpZXcvU2Nyb2xsVmlldy5maXJlLjc2XCI6IFwiU2Nyb2xsdmlldyDlj6rog73msLTlubPmu5rliqhcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS45M1wiOiBcIlNjcm9sbHZpZXcg5Y+q6IO95Z6C55u05rua5YqoXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9TY3JvbGxWaWV3LmZpcmUuMTEwXCI6IFwiU2Nyb2xsdmlldyDmsqHmnInmu5rliqjmnaFcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0SW5TY3JvbGxWaWV3LmZpcmUuNlwiOiBcIlNjcm9sbFZpZXcg5ZKM5Z6C55u05biD5bGA5a655ZmoXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dEluU2Nyb2xsVmlldy5maXJlLjQwXCI6IFwiU2Nyb2xsVmlldyDlkozmsLTlubPluIPlsYDlrrnlmahcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0SW5TY3JvbGxWaWV3LmZpcmUuNzRcIjogXCJTY3JvbGxWaWV3IOWSjOaoquWQkee9keagvOW4g+WxgOWuueWZqCBcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0SW5TY3JvbGxWaWV3LmZpcmUuMTQ0XCI6IFwiU2Nyb2xsVmlldyDlkoznurXlkJHnvZHmoLzluIPlsYDlrrnlmaggXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNoaWxkcmVuLmZpcmUuNlwiOiBcIuawtOW5s+W4g+WxgOWuueWZqFwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRSZXNpemVDaGlsZHJlbi5maXJlLjMxXCI6IFwi5Z6C55u05biD5bGA5a655ZmoXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNoaWxkcmVuLmZpcmUuNDhcIjogXCLmqKrlkJHnvZHmoLzluIPlsYDlrrnlmahcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0UmVzaXplQ2hpbGRyZW4uZmlyZS44NVwiOiBcIue6teWQkee9keagvOW4g+WxgOWuueWZqFwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRSZXNpemVDb250YWluZXIuZmlyZS42XCI6IFwi5Z+65pysXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lci5maXJlLjMxXCI6IFwi5rC05bmzXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lci5maXJlLjM2XCI6IFwi5Z6C55u0XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lci5maXJlLjQxXCI6IFwi5qiq5ZCR572R5qC85biD5bGA5a655ZmoXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lci5maXJlLjQ2XCI6IFwi57q15ZCR572R5qC85biD5bGA5a655ZmoXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfY2hhbmdlX2NhbnZhc19hbmNob3IvQm90dG9tTGVmdEFuY2hvci5maXJlLjhcIjogXCJ4OjAsIHk6MFwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2NoYW5nZV9jYW52YXNfYW5jaG9yL0JvdHRvbUxlZnRBbmNob3IuZmlyZS4xMlwiOiBcIng6NDgwLCB5OjMyMFwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2NoYW5nZV9jYW52YXNfYW5jaG9yL0JvdHRvbUxlZnRBbmNob3IuZmlyZS4xNlwiOiBcIng6OTYwLCB5OjY0MFwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvZWRpdGJveC5qcy4xXCI6IFwi6L6T5YWl5paH5pysOiBcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0Tm9uZS5maXJlLjZcIjogXCLln7rmnKzluIPlsYDlrrnlmagsIOexu+WeizogTm9uZVxcbuiHquWKqOiwg+aVtOWkp+Wwj1wiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXROb25lLmZpcmUuMzVcIjogXCLmsLTlubPluIPlsYDlrrnlmajvvIznsbvlnos6IE5vbmVcXG7kuI3oh6rliqjosIPmlbTlpKflsI9cIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0Tm9uZS5maXJlLjYwXCI6IFwi5Z6C55u05biD5bGA5a655Zmo77yM57G75Z6LOiBOb25lXFxu5LiN6Ieq5Yqo6LCD5pW05aSn5bCPXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dE5vbmUuZmlyZS43N1wiOiBcIuaoquWQkee9keagvOW4g+WxgOWuueWZqO+8jOexu+WeizogTm9uZVxcbuS4jeiHquWKqOiwg+aVtOWkp+Wwj1wiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXROb25lLmZpcmUuMTQyXCI6IFwi57q15ZCR572R5qC85biD5bGA5a655Zmo77yM57G75Z6LOiBOb25lXFxu5LiN6Ieq5Yqo6LCD5pW05aSn5bCPXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfZWRpdEJveC9FZGl0Qm94LmZpcmUuMjVcIjogXCLljZXooYzlr4bnoIHmoYY6XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfZWRpdEJveC9FZGl0Qm94LmZpcmUuMjdcIjogXCLljZXooYzmlofmnKzmoYY6XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfZWRpdEJveC9FZGl0Qm94LmZpcmUuMjlcIjogXCLlpJrooYzmlofmnKzmoYY6XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfZWRpdEJveC9FZGl0Qm94LmZpcmUuMzJcIjogXCLngrnlh7tcIixcbiAgXCJjYXNlcy8wMl91aS8wN19lZGl0Qm94L0VkaXRCb3guZmlyZS4zOFwiOiBcIuaMiemSruW/hemhu+WcqCBFZGl0Qm94IOeahOS4iumdoiwgXFxu5bm25LiU5a6D5bqU6K+l5YWB6K6454K55Ye7LlwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAxX3BsYXllcl9jb250cm9sL0V2ZW50TWFuYWdlci9LZXlib2FyZElucHV0LmZpcmUuNlwiOiBcIuaMiSAnQScg5oiWICdEJyDplK7mjqfliLblsI/nu7XnvopcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wMV9wbGF5ZXJfY29udHJvbC9Pbi9PblRvdWNoQ3RybC5qcy4xXCI6IFwidG91Y2ggKFwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAxX3BsYXllcl9jb250cm9sL09uL09uVG91Y2hJbnB1dC5maXJlLjEwXCI6IFwi6K+36Kem5pG45Lu75oSP5L2N572u6K+V6K+VXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDFfcGxheWVyX2NvbnRyb2wvT24vT25NdWx0aVRvdWNoSW5wdXQuZmlyZS4yMFwiOiBcIueUqOS9oOeahOaJi+aMh+aUvue8qeWbvueJh++8gVwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAyX2FjdGlvbnMvU2ltcGxlQWN0aW9uLmZpcmUuMTNcIjogXCLnroDljZXnmoTliqjkvZxcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vQW5pbWF0ZUN1c3RvbVByb3BlcnR5LmZpcmUuMTRcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9BbmltYXRlQ3VzdG9tUHJvcGVydHkuZmlyZS4xOFwiOiBcIuiHquWumuS5ieWKqOeUu+WxnuaAp1wiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9BbmltYXRpb25FdmVudC5qcy4xXCI6IFwi5byA5aeL56ysXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL0FuaW1hdGlvbkV2ZW50LmZpcmUuNlwiOiBcIuW8gOWni+esrDHkuKrliqjnlLtcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vQW5pbWF0aW9uRXZlbnQuZmlyZS4xNFwiOiBcIuWKqOeUu+S6i+S7tlwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9Nb3ZlQW5pbWF0aW9uLmZpcmUuMTFcIjogXCJMaW5lYXJcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjE3XCI6IFwiQ2FzZSBJbiBFeHBvXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL01vdmVBbmltYXRpb24uZmlyZS4yM1wiOiBcIkNhc2UgT3V0IEV4cG9cIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjI5XCI6IFwiQ2FzZSBPdXQgSW4gRXhwb1wiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9Nb3ZlQW5pbWF0aW9uLmZpcmUuMzVcIjogXCJCYWNrIEZvcndhcmRcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjQxXCI6IFwi6L+Z5piv5LiA5Liq56e75Yqo5Yqo55S744CCXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL1Nwcml0ZUFuaW1hdGlvbi5maXJlLjlcIjogXCLov5nmmK/nsr7ngbXluKfliqjnlLtcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vQ3JlYXRlQ2xpcC5maXJlLjFcIjogXCLliqjmgIHliJvlu7rliqjnlLvliarovpFcIixcbiAgXCJjYXNlcy8wNF9hdWRpby9TaW1wbGVBdWRpby5maXJlLjZcIjogXCLkuqvlj5fpn7PkuZAhXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvTm9kZUFycmF5LmZpcmUuMTRcIjogXCLov5nmmK/oioLngrnmlbDnu4RcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9Ob25TZXJpYWxpemVkLmZpcmUuNlwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvTm9uU2VyaWFsaXplZC5maXJlLjhcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL05vblNlcmlhbGl6ZWQuZmlyZS4xMFwiOiBcIui/meaYr+mdnuW6j+WIl+WMllwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL1JlZmVyZW5jZVR5cGUuZmlyZS44XCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9SZWZlcmVuY2VUeXBlLmZpcmUuMTFcIjogXCLov5nkuKrkvovlrZDkuI3ljIXmi6zov5DooYzml7bmvJTnpLpcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9WYWx1ZVR5cGUuZmlyZS42XCI6IFwi6L+Z5Liq5L6L5a2Q5LiN5YyF5ous6L+Q6KGM5pe25ryU56S6XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAyX3ByZWZhYi9JbnN0YW50aWF0ZVByZWZhYi5maXJlLjdcIjogXCLlrp7kvovljJbpooTliLbotYTmupBcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL0V2ZW50SW5NYXNrLmZpcmUuMjNcIjogXCLmm7TmlLnoioLngrnmjpLluo9cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1NpbXBsZUV2ZW50LmZpcmUuMTlcIjogXCLop6bmkbjkuovku7blj6/ku6XmlK/mjIHngrnlh7tcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1NpbXBsZUV2ZW50LmZpcmUuMjFcIjogXCLpvKDmoIfkuovku7blj6/ku6XmlK/mjIHljZXlh7vjgIHmgqzlgZzjgIHmu5rova5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1NpbXBsZUV2ZW50LmZpcmUuMjNcIjogXCLoh6rlrprkuYnkuovku7blj6/ku6XmiYvliqjop6blj5FcXG4o54K55Ye75LiK6Z2i55qE5oyJ6ZKuKVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wM19ldmVudHMvU2ltcGxlRXZlbnQuZmlyZS4yNVwiOiBcIuWfuuacrOS6i+S7tlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wM19ldmVudHMvVG91Y2hQcm9wYWdhdGlvbi5maXJlLjE1XCI6IFwi6Kem5pG45LqL5Lu25YaS5rOhXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA0X3NjaGVkdWxlci9zY2hlZHVsZUNhbGxiYWNrcy5qcy4xXCI6IFwiNS4wMCBzXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA0X3NjaGVkdWxlci9zY2hlZHVsZXIuZmlyZS45XCI6IFwiNS4wMCBzXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA0X3NjaGVkdWxlci9zY2hlZHVsZXIuZmlyZS4xMlwiOiBcIumHjeWkjeWumuaXtuWZqFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVyLmZpcmUuMThcIjogXCLlj5bmtojlrprml7blmahcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDRfc2NoZWR1bGVyL3NjaGVkdWxlci5maXJlLjI0XCI6IFwi5a6a5pe25omn6KGMMeasoVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVyLmZpcmUuMjlcIjogXCLkvb/nlKggdXBkYXRlIOWHveaVsOavj+W4p+abtOaWsOiuoeaVsFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVyLmZpcmUuMzFcIjogXCLlrprml7blmahcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDVfY3Jvc3NfcmVmZXJlbmNlL0Nyb3NzUmVmZXJlbmNlLmZpcmUuN1wiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA1X2Nyb3NzX3JlZmVyZW5jZS9Dcm9zc1JlZmVyZW5jZS5maXJlLjEyXCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDVfY3Jvc3NfcmVmZXJlbmNlL0Nyb3NzUmVmZXJlbmNlLmZpcmUuMTRcIjogXCLkuqTlj4nlvJXnlKhcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDZfbGlmZV9jeWNsZS9saWZlX2N5Y2xlLmZpcmUuNlwiOiBcIueUn+WRveWRqOacn1wiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjVcIjogXCLotYTmupDliqDovb1cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS45XCI6IFwi5Yqg6L29IFNwcml0ZUZyYW1lXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuMTVcIjogXCLliqDovb0gVGV4dHVyZVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjIxXCI6IFwi5Yqg6L29IEF1ZGlvXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuMjdcIjogXCLliqDovb0gVHh0XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuMzNcIjogXCLliqDovb0gRm9udFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjM5XCI6IFwi5Yqg6L29IFBsaXN0XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuNDVcIjogXCLliqDovb0gUHJlZmFiXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuNTFcIjogXCLliqDovb0gU2NlbmVcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS41N1wiOiBcIuWKoOi9vSBBbmltYXRpb25cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS41OVwiOiBcIuWKoOi9vSBTcGluZVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjY1XCI6IFwi5b2T5YmN5bCa5peg5Yqg6L2944CCXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjFcIjogXCLlt7LliqDovb0gXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjJcIjogXCLmkq3mlL4gXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjNcIjogXCLliJvlu7ogXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjRcIjogXCLmkq3mlL7pn7PkuZDjgIJcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuanMuNVwiOiBcIui/meaYr+Wtl+S9k++8gVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXMuZmlyZS43XCI6IFwi5oyJ57G75Z6LXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlcy5maXJlLjEwXCI6IFwi5Yqg6L29IFNwcml0ZUZyYW1lXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlcy5maXJlLjE3XCI6IFwi5oyJIFVybFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXMuZmlyZS4yMFwiOiBcIuWKoOi9vemihOWItui1hOa6kFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXNBbGwuZmlyZS42XCI6IFwi6L+Z5Liq5L6L5a2Q5LiN5YyF5ous6L+Q6KGM5pe25ryU56S6XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlc0FsbC5maXJlLjI0XCI6IFwi5YWo6YOo5Yqg6L29XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlc0FsbC5maXJlLjMwXCI6IFwi5Yqg6L295YWo6YOo55qEU3ByaXRlRnJhbWVcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Mb2FkUmVzQWxsLmZpcmUuMzZcIjogXCLmuIXnqbpcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDhfbW9kdWxlL2xvYWRfbW9kdWxlLmZpcmUuNlwiOiBcIuWKoOi9veaooeWdl1wiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wOF9tb2R1bGUvbG9hZF9tb2R1bGUuZmlyZS4xMFwiOiBcIuWIm+W7uuaAqueJqVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wOV9zaW5nbGV0b24vU2luZ2xldG9uLmZpcmUuNlwiOiBcIui/meS+i+WtkOS4jeWMheWQq+i/kOihjOaXtua8lOekulwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMF9sb2FkaW5nQmFyL0xvYWRpbmdCYXJDdHJsLmpzLjFcIjogXCLkuIvovb3lrozmiJAhIVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMF9sb2FkaW5nQmFyL0xvYWRpbmdCYXJDdHJsLmpzLjJcIjogXCLmraPlnKjkuIvovb06IFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMF9sb2FkaW5nQmFyL0xvYWRpbmdCYXJDdHJsLmpzLjNcIjogXCLngrnlh7vku7vmhI/lnLDmlrnov5vooYzkuIvovb0uLi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTBfbG9hZGluZ0Jhci9sb2FkaW5nQmFyLmZpcmUuN1wiOiBcIuWKoOi9veWujOaIkFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMF9sb2FkaW5nQmFyL2xvYWRpbmdCYXIuZmlyZS4xOFwiOiBcIuato+WcqOS4i+i9vVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjFcIjogXCLor7fnqI3nrYkuLi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4yXCI6IFwi6K+356iN562JLi4uXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuM1wiOiBcIuivt+eojeetiS4uLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjRcIjogXCLor7fnqI3nrYkuLi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy41XCI6IFwiV2ViU29ja2V0XFxu5Y+R6YCB5LqM6L+b5Yi2V1Plt7LmiZPlvIAuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuNlwiOiBcIldlYlNvY2tldFxcbuaUtuWIsOWTjeW6lC5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy43XCI6IFwiV2ViU29ja2V0XFxu5Y+R6YCB5LqM6L+b5Yi26YGH5Yiw6ZSZ6K+vLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjhcIjogXCJXZWJTb2NrZXRcXG53ZWJzb2NrZXQg5a6e5L6L5bey5YWz6ZetLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjlcIjogXCJXZWJTb2NrZXRcXG7lj5HpgIHkuozov5vliLZXU+etieW+heS4rS4uLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjEwXCI6IFwiV2ViU29ja2V0XFxuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuMTFcIjogXCJTb2NrZXRJT1xcblwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjEyXCI6IFwiU29ja2V0SU9cXG5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xM1wiOiBcIlNvY2tldElPXFxuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuMTRcIjogXCJTb2NrZXRJT1xcblwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL25ldHdvcmsuZmlyZS43XCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9uZXR3b3JrLmZpcmUuNlwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjExXCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9uZXR3b3JrLmZpcmUuMTBcIjogXCJYTUxIdHRwUmVxdWVzdCAoQXJyYXlCdWZmZXIpXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjE1XCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9uZXR3b3JrLmZpcmUuMTRcIjogXCJXZWJTb2NrZXRcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9uZXR3b3JrLmZpcmUuMTlcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL25ldHdvcmsuZmlyZS4xOFwiOiBcIlNvY2tldElPXCIsXG4gIFwiY2FzZXMvbmF0aXZlX2NhbGwvbmF0aXZlX2NhbGwuZmlyZS4xXCI6IFwi54K55Ye75oyJ6ZKu6LCD55So6Z2Z5oCB5pa55rOV77yBXCIsXG4gIFwiY2FzZXMvbmF0aXZlX2NhbGwvbmF0aXZlX2NhbGwuZmlyZS4yXCI6IFwi54K55Ye7XCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvQ2F0ZWdvcnkuZmlyZS4zXCI6IFwi57uEOiDnorDmkp5cIixcbiAgXCJjYXNlcy9jb2xsaWRlci9DYXRlZ29yeS5maXJlLjVcIjogXCLnu4Q6IOeisOaSnlwiLFxuICBcImNhc2VzL2NvbGxpZGVyL0NhdGVnb3J5LmZpcmUuN1wiOiBcIue7hDog56Kw5pKeXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvQ2F0ZWdvcnkuZmlyZS45XCI6IFwi57uEOiDpu5jorqRcIixcbiAgXCJjYXNlcy9jb2xsaWRlci9TaGFwZS5maXJlLjIwXCI6IFwi5pi+56S65aSa6L655b2iXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvU2hhcGUuZmlyZS4yN1wiOiBcIuaYvuekuuWchlwiLFxuICBcImNhc2VzL2NvbGxpZGVyL1NoYXBlLmZpcmUuMzRcIjogXCLmmL7npLrnm5LlrZBcIixcbiAgXCJjYXNlcy9jb2xsaWRlci9TaGFwZS5maXJlLjQzXCI6IFwi5pi+56S65aSa6L655b2iXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvU2hhcGUuZmlyZS41MFwiOiBcIuaYvuekuuWchlwiLFxuICBcImNhc2VzL2NvbGxpZGVyL1NoYXBlLmZpcmUuNTdcIjogXCLmmL7npLrnm5LlrZBcIixcbiAgXCJjYXNlcy9tb3Rpb25TdHJlYWsvTW90aW9uU3RyZWFrLmZpcmUuMVwiOiBcIuaUueWPmOaLluWwvlwiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuMTFcIjogXCLosIPor5Xmj5Lmp71cIixcbiAgXCJjYXNlcy9zcGluZS9TcGluZUJveS5maXJlLjE4XCI6IFwi6LCD6K+V5YWz6IqCXCIsXG4gIFwiY2FzZXMvc3BpbmUvU3BpbmVCb3kuZmlyZS4yNVwiOiBcIuaXtumXtOe8qeaUvlwiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuMzZcIjogXCLlgZzmraJcIixcbiAgXCJjYXNlcy9zcGluZS9TcGluZUJveS5maXJlLjQzXCI6IFwi6LWwXCIsXG4gIFwiY2FzZXMvc3BpbmUvU3BpbmVCb3kuZmlyZS41MFwiOiBcIui3kVwiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuNThcIjogXCLot7NcIixcbiAgXCJjYXNlcy9zcGluZS9TcGluZUJveS5maXJlLjY1XCI6IFwi5bCE5Ye7XCIsXG4gIFwiY2FzZXMvdGlsZWRtYXAvUHV6emxlLmZpcmUuMThcIjogXCLkvaDotaLkuoZcIixcbiAgXCJjYXNlcy90aWxlZG1hcC9QdXp6bGUuZmlyZS4yMVwiOiBcIumHjeaWsOW8gOWni1wiLFxuICBcInJlcy9wcmVmYWJzL0xpc3RJdGVtLnByZWZhYi4yXCI6IFwiTGFiZWwgc3Nzc1wiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjNcIjogXCLlkI3lrZc6XCIsXG4gIFwicmVzL3ByZWZhYnMvTW9uc3Rlci5wcmVmYWIuMTFcIjogXCLnrYnnuqcgOlwiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjE5XCI6IFwi6KGA6YePIDpcIixcbiAgXCJyZXMvcHJlZmFicy9Nb25zdGVyLnByZWZhYi4yN1wiOiBcIuaUu+WHuyA6XCIsXG4gIFwicmVzL3ByZWZhYnMvTW9uc3Rlci5wcmVmYWIuMzVcIjogXCLpmLLlvqEgOlwiLFxuICBcInJlcy9wcmVmYWJzL2xvYWRJdGVtLnByZWZhYi4xXCI6IFwiTGFiZWxcIixcbiAgXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvcHJlZmFiLnByZWZhYi4yXCI6IFwi6L+Z5piv5LiA5Liq6aKE5Yi2XCIsXG4gIFwicmVzb3VyY2VzL3Rlc3QgYXNzZXRzL3NjZW5lLmZpcmUuM1wiOiBcIui/lOWbnui1hOa6kOWKoOi9veWcuuaZr1wiLFxuICBcInJlc291cmNlcy90ZXN0IGFzc2V0cy9zY2VuZS5maXJlLjZcIjogXCLov5Tlm55cIixcbiAgXCJzY3JpcHRzL0dsb2JhbC9NZW51LmpzLjFcIjogXCLor7TmmI7mmoLnvLpcIixcbiAgXCJjYXNlcy9hbnlzZGsvMVwiOiBcIuivpeexu+Wei+WPquWcqEFuZHJvaWTjgIFpT1PjgIFXZWItTW9iaWxl5LiK5pyJ5pWI5p6cXCIsXG4gIFwiY2FzZXMvYW55c2RrLzJcIjogXCLor6Xnsbvlnovlj6rlnKhBbmRyb2lk44CBaU9T5LiK5pyJ5pWI5p6cXCJcbn07XG5cbmNjLl9SRi5wb3AoKTsiXX0=