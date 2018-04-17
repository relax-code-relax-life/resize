import resizeBlock from './resizeBlock';
import $ from 'wwl-dom';


var getUrl = function (img) {

    if (typeof img === 'string') {
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
var getCoverSize = function (imgSize, containerSize) {

    //按照宽度 求高
    var tarH = containerSize.width / imgSize.width * imgSize.height

    if (tarH <= containerSize.height) {
        return {
            width: containerSize.width,
            height: tarH
        }
    }

    //按照高度求宽
    var tarW = containerSize.height / imgSize.height * imgSize.width;
    return {
        width: tarW,
        height: containerSize.height
    };


}


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

export default function resize(ele, img, opt) {

    var $tar = $(ele);
    var url,
        scale;  //  w/h

    var expandoProp = '__resize_dispose__';

    if (ele[expandoProp]) ele[expandoProp]();

    return getUrl(img).then(function (_url) {
        url = _url;
        return getNatureSize(url);

    }).then(function ({width, height}) {
        scale = width / height;
        var containerSize = getSize($tar);
        var converSize = getCoverSize({width, height}, containerSize);

        $tar.style({
            width: converSize.width + 'px',
            height: converSize.height + 'px',
            background: `url(${url}) 0/100% no-repeat`,
            backgroundClip: 'border-box',
            boxSizing: 'border-box'
        })

        opt.scale = scale;

        var dispose = resizeBlock($tar[0], opt);

        ele[expandoProp] = dispose;

        return dispose;
    });

}


// resize('.resize', 'http://pic-bucket.nosdn.127.net/photo/0001/2018-04-15/DFEV9E9M00AO0001NOS.jpg','.container')
// resize('.resize', 'http://pic-bucket.nosdn.127.net/photo/0001/2018-04-15/DFEV9E9M00AO0001NOS.jpg')
