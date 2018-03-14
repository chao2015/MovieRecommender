/*
* @Author: chao2015
* @Date:   2018-03-09 18:26:52
* @Last Modified by:   chao2015
* @Last Modified time: 2018-03-09 15:32:17
*/

'use strict';

var _mm = require('util/mm.js');

var _product = {
    // 获取电影列表
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取电影详细信息
    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;