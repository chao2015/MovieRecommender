/*
* @Author: chao2015
* @Date:   2018-03-09 15:19:12
* @Last Modified by:   chao2015
* @Last Modified time: 2018-03-09 15:28:59
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm             = require('util/mm.js');

$(function() {
    // 渲染banner的html
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
