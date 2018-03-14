/*
* @Author: chao2015
* @Date:   2018-03-09 21:52:46
* @Last Modified by:   chao2015
* @Last Modified time: 2018-03-09 15:29:00
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})