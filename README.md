拖动改变元素大小。目前仅支持鼠标操作，不支持手势。

# 使用

## npm

`npm install -S wwl-resize`

- resizeBlock: `var resizeBlock = require('wwl-resize/resizeblock')`
- resizeImage: `var resizeImage = require('wwl-resize/resizeimage')`

## 直接下载


- resizeBlock: `http://wangwl.net/static/demo/resize/resizeblock.js`
- resizeImage: `http://wangwl.net/static/demo/resize/resizeimage.js`

# resizeBlock
function( node , options? ) : function

示例:
```javascript
var dispose = resizeBlock( document.getElementById('#div1') );
```

将一个元素块变成可拖动控制尺寸，返回一个`dispose`函数，调用该函数释放相关资源(取消事件回调等)。

### node
{node|string} 元素或选择器
改变尺寸的目标元素

### options.scale
{number} 限制宽高比例

默认可随意拖动，传入scale参数，限制拖动时的宽高比例

### options.container
{node|string} 拖动范围

传入元素节点或选择器，控制拖动范围。

### options.targetClass
{string}

对目标元素设置一个样式类，默认不设置。

### options.pointClass
{string}

对目标元素拖动滑块设置样式类，默认不设置

### options.resizeActive
function(node,size)
node为目标节点。
size: {width,height} 当前元素尺寸。

在即将触发拖动时(即mousedown事件中)，调用resizeActive事件。


### options.resizeStart
resizeStart(node,size)

在第一次改变尺寸前，触发resizeStart事件。

如果该回调返回布尔值false，则不允许改变尺寸。

### options.resizeMove
resizeMove(node,size)

改变尺寸过程中触发。

### options.resizeEnd
resizeEnd(node,size)

在改变尺寸完成后触发。

# resizeImage
function(node, img, options) : function

示例:

```javascript
var dispose=resizeImage('.resize', 'http://pic-bucket.nosdn.127.net/photo/0001/2018-04-15/DFEV9E9M00AO0001NOS.jpg')
```

提供一个简便方法，用于针对改变图片尺寸。

### node
{node|string} 元素或选择器
改变尺寸的目标元素

### img
{file|string}
传入图片,可以File类型，或者url

### options
该options会传给`resizeBlock`。

在传给`resizeBlock`前，`resizeImage`会自动计算scale值，并覆盖原options.scale。

通过设置`options.disableScale`，则不计算scale值，options不做任何处理，直接传给`resizeBlock`

