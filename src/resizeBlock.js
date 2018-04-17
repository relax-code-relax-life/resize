import $ from 'wwl-dom';
import borderBg from './borderbg.gif';

var docEle = document.documentElement;

var createFloatPoint = function (pointClass, defaultPointStyle) {

    var style = {
        position: 'absolute',
        width: '5px',
        height: '5px',
        right: '-3px',
        bottom: '-3px'
    }
    if (!defaultPointStyle) {
        Object.assign(style, {
            opacity: 0.5,
            backgroundColor: '#333',
            border: '1px #eee solid',
            cursor: 'nwse-resize',
        });
    }

    return $.create(`<div class="${pointClass}"></div>`).style(style);

}
var setTargetStyle = function ($target, targetClass, defaultTargetStyle) {
    var targetStyle = defaultTargetStyle ? {
        border: '1px solid transparent',
        borderImage: `url(${borderBg}) 1 1 1 repeat`,
        userSelect: 'none'
    } : {};
    if ($target.computeStyle().position === 'static') {
        targetStyle.position = 'relative';
    }

    if (targetClass) {
        $target.addClass(targetClass);
    }

    return $target.style(targetStyle);

}
var getSize = function ($tar) {

    var width = parseFloat($tar.style('width')),
        height = parseFloat($tar.style('height'));


    if (isNaN(width) || isNaN(height)) {
        var computed = $tar.computeStyle();
        width = parseFloat(computed.width);
        height = parseFloat(computed.height);
    }

    return {
        width, height
    }

};


/**
 *
 * @param ele           selector|node
 * @param scale {number} width/height
 * @param container     selector|node
 */
export default function resizeEle(ele, {scale, container, targetClass, pointClass, defaultTargetStyle = true, defaultPointStyle = true} = {}) {

    var $target = $(ele);

    if ($target.length === 0) return;

    var $container = $(container);
    if ($container.length === 0) $container = undefined;

    if (typeof scale !== 'number') scale = undefined;

    var $floatPoint = createFloatPoint(pointClass, defaultPointStyle);

    setTargetStyle($target, targetClass, defaultTargetStyle).append($floatPoint);

    var isDrag = false,
        startSize,
        startPos,
        deltaPos,
        moveSize,

        moveValidSize,
        moveRange;

    function onMouseDown(e) {
        isDrag = true;
        startPos = {
            top: e.pageY,
            left: e.pageX
        };

        startSize = getSize($target);

        if ($container) {
            var containerSize = getSize($container);

            var containerBox = $container[0].getBoundingClientRect();
            var tarBox = $target[0].getBoundingClientRect();

            // debugger;

            moveRange = {
                width: containerBox.right - tarBox.left,
                height: containerBox.bottom - tarBox.top
            };
        }

        e.stopPropagation();
    }

    function onMouseMove(e) {
        if (!isDrag) return;
        deltaPos = {
            top: e.pageY - startPos.top,
            left: e.pageX - startPos.left
        };

        moveSize = {
            width: Math.max(startSize.width + deltaPos.left, 5),
            height: Math.max(startSize.height + deltaPos.top, 5)
        };

        if (scale) {
            moveSize.width = scale * moveSize.height;
        }

        if (moveRange) {
            moveValidSize = {
                width: Math.min(moveSize.width, moveRange.width),
                height: Math.min(moveSize.height, moveRange.height)
            };

            if (scale) {
                if (moveValidSize.width < moveSize.width) {
                    moveValidSize.height = moveValidSize.width / scale;
                }
                else {
                    moveValidSize.width = moveValidSize.height * scale;
                }
            }

            moveSize = moveValidSize;

        }

        // console.log(moveSize);

        $target.style({
            width: moveSize.width + 'px',
            height: moveSize.height + 'px'
        });

        e.stopPropagation();

    }

    function onMouseUp(e) {

        if (isDrag) {
            isDrag = false;
        }
        e.stopPropagation();
    }

    $floatPoint.on('mousedown', onMouseDown);

    $(docEle).on('mousemove', onMouseMove)
        .on('mouseup', onMouseUp);

    var dispose = function () {
        $floatPoint.off('mousedown', onMouseDown);
        $(docEle).off('mousemove', onMouseMove).off('mouseup', onMouseUp);
        dispose = null;
    }

    return function () {
        dispose && dispose();
    }

};


// resizeEle('.resize')

