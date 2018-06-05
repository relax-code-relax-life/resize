import resizeBlock from './resizeBlock';
import $ from 'wwl-dom';

const reg_isUrl = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i;
const isUrl = function (url) {
    return reg_isUrl.test(url);
}

//将图片转化为url
var getUrl = function (img) {
    if (typeof img === 'string') {
        if (!isUrl(img)) return Promise.reject();
        return Promise.resolve(img);
    }
    else {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function () {
                resolve(reader.result);
            }
        })
    }
}

//获取图片原始大小
var getNatureSize = function (url) {
    var img = new Image();
    return new Promise(function (resolve, reject) {
        img.onload = function () {
            resolve({
                width: img.width,
                height: img.height
            })
        };
        img.onerror = reject;
        img.src = url;
    })
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
var getCoverSize = function (scale, containerSize) {

    //按照宽度 求高
    var tarH = containerSize.width / scale

    if (tarH <= containerSize.height) {
        return {
            width: containerSize.width,
            height: tarH
        }
    }

    //按照高度求宽
    var tarW = containerSize.height * scale;
    return {
        width: tarW,
        height: containerSize.height
    };


}


/**
 *
 * @param ele
 * @param img
 * @param disableScale
 * @param opt
 * @returns {PromiseLike<T>}
 */
export default function resize(ele, img, opt={}) {

    var disableScale = opt.disableScale;

    var $tar = $(ele);
    var url;

    return getUrl(img).then(function (_url) {
        url = _url;
        return getNatureSize(url);

    }).then(function ({width, height}) {

        //  w/h
        var scale;

        if (!disableScale) {
            scale = width / height;
            opt.scale = scale;
        }

        var containerSize = getSize($tar);

        var converSize = scale ? getCoverSize(scale, containerSize) : containerSize;

        $tar.style({
            width: converSize.width + 'px',
            height: converSize.height + 'px',
            background: `url(${url}) 0/100% 100% no-repeat`,
            backgroundClip: 'border-box',
            boxSizing: 'border-box'
        })

        var resizeBlockDispose = resizeBlock($tar[0], opt);

        var dispose = function () {

            resizeBlockDispose();
            $tar.removeStyle('width', 'height', 'backgroud', 'backgroundClip', 'boxSizing');

            dispose = null;
        };

        return function () {
            dispose && dispose();
        };

    }, (err) => {
        return Promise.reject(err);
    });

}


// resize('.resize', 'http://pic-bucket.nosdn.127.net/photo/0001/2018-04-15/DFEV9E9M00AO0001NOS.jpg','.container')
// resize('.resize', 'http://pic-bucket.nosdn.127.net/photo/0001/2018-04-15/DFEV9E9M00AO0001NOS.jpg')
