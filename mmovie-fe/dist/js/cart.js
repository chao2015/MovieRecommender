webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: chao2015
	* @Date:   2018-03-09 14:17:01
	* @Last Modified by:   chao2015
	* @Last Modified time: 2018-03-09 15:25:49
	*/

	'use strict';
	__webpack_require__(8);
	var _mm     = __webpack_require__(10);
	var _user   = __webpack_require__(14);
	var _cart   = __webpack_require__(15);
	// 导航
	var nav = {
	    init : function(){
	        this.bindEvent();
	        this.loadUserInfo();
	        this.loadCartCount();
	        return this;
	    },
	    bindEvent : function(){
	        // 登录点击事件
	        $('.js-login').click(function(){
	            _mm.doLogin();
	        });
	        // 注册点击事件
	        $('.js-register').click(function(){
	            window.location.href = './user-register.html';
	        });
	        // 退出点击事件
	        $('.js-logout').click(function(){
	            _user.logout(function(res){
	                window.location.reload();
	            }, function(errMsg){
	                _mm.errorTips(errMsg);
	            });
	        });
	    },
	    // 加载用户信息
	    loadUserInfo : function(){
	        _user.checkLogin(function(res){
	            $('.user.not-login').hide().siblings('.user.login').show()
	                .find('.username').text(res.username);
	        }, function(errMsg){
	            // do nothing
	        });
	    },
	    // 加载购物车数量
	    loadCartCount : function(){
	        _cart.getCartCount(function(res){
	            $('.nav .cart-count').text(res || 0);
	        }, function(errMsg){
	            $('.nav .cart-count').text(0);
	        });
	    }
	};

	module.exports = nav.init();

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: chao2015
	* @Date:   2018-03-09 17:04:32
	* @Last Modified by:   chao2015
	* @Last Modified time: 2018-03-09 15:25:48
	*/

	'use strict';

	var _mm = __webpack_require__(10);

	var _user = {
	    // 用户登录
	    login : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/login.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查用户名
	    checkUsername : function(username, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/check_valid.do'),
	            data    : {
	                type    : 'username',
	                str     : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 用户注册
	    register : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/register.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查登录状态
	    checkLogin : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/get_user_info.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户密码提示问题
	    getQuestion : function(username, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_get_question.do'),
	            data    : {
	                username : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查密码提示问题答案
	    checkAnswer : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 重置密码
	    resetPassword : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户信息
	    getUserInfo : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/get_information.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新个人信息
	    updateUserInfo : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/update_information.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登录状态下更新密码
	    updatePassword : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登出
	    logout : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/logout.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    }
	}
	module.exports = _user;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: chao2015
	* @Date:   2018-03-09 18:55:04
	* @Last Modified by:   chao2015
	* @Last Modified time: 2018-03-09 15:32:17
	*/

	'use strict';

	var _mm = __webpack_require__(10);

	var _cart = {
	    // 获取购物车数量
	    getCartCount : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 添加到购物车
	    addToCart : function(productInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/add.do'),
	            data    : productInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取购物车列表
	    getCartList : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/list.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 选择购物车电影
	    selectProduct : function(productId, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/select.do'),
	            data    : {
	                productId : productId
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 取消选择购物车电影
	    unselectProduct : function(productId, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/un_select.do'),
	            data    : {
	                productId : productId
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 选中全部电影
	    selectAllProduct : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/select_all.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 取消选中全部电影
	    unselectAllProduct : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/un_select_all.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新购物车电影数量
	    updateProduct : function(productInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/update.do'),
	            data    : productInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 删除指定电影
	    deleteProduct : function(productIds, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/delete_product.do'),
	            data    : {
	                productIds : productIds
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	}
	module.exports = _cart;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: chao2015
	* @Date:   2017-05-18 19:30:12
	* @Last Modified by:   chao2015
	* @Last Modified time: 2018-03-09 15:25:17
	*/

	'use strict';
	__webpack_require__(17);
	var _mm     = __webpack_require__(10);
	// 通用页面头部
	var header = {
	    init : function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad : function(){
	        var keyword = _mm.getUrlParam('keyword');
	        // keyword存在，则回填输入框
	        if(keyword){
	            $('#search-input').val(keyword);
	        };
	    },
	    bindEvent : function(){
	        var _this = this;
	        // 点击搜索按钮以后，做搜索提交
	        $('#search-btn').click(function(){
	            _this.searchSubmit();
	        });
	        // 输入会车后，做搜索提交
	        $('#search-input').keyup(function(e){
	            // 13是回车键的keyCode
	            if(e.keyCode === 13){
	                _this.searchSubmit();
	            }
	        });
	    },
	    // 搜索的提交
	    searchSubmit : function(){
	        var keyword = $.trim($('#search-input').val());
	        // 如果提交的时候有keyword,正常跳转到list页
	        if(keyword){
	            window.location.href = './list.html?keyword=' + keyword;
	        }
	        // 如果keyword为空，直接返回首页
	        else{
	            _mm.goHome();
	        }
	    }
	};

	header.init();

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: chao2015
	* @Date:   2018-03-09 16:51:25
	* @Last Modified by:   chao2015
	* @Last Modified time: 2018-03-09 15:32:17
	*/

	'use strict';
	__webpack_require__(20);
	__webpack_require__(16);
	var nav             = __webpack_require__(7);
	var _mm             = __webpack_require__(10);
	var _cart           = __webpack_require__(15);
	var templateIndex   = __webpack_require__(22);

	var page = {
	    data : {
	        
	    },
	    init : function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad : function(){
	        this.loadCart();
	    },
	    bindEvent : function(){
	        var _this = this;
	        // 电影的选择 / 取消选择
	        $(document).on('click', '.cart-select', function(){
	            var $this = $(this),
	                productId = $this.parents('.cart-table').data('product-id');
	            // 选中
	            if($this.is(':checked')){
	                _cart.selectProduct(productId, function(res){
	                    _this.renderCart(res);
	                }, function(errMsg){
	                    _this.showCartError();
	                });
	            }
	            // 取消选中
	            else{
	                _cart.unselectProduct(productId, function(res){
	                    _this.renderCart(res);
	                }, function(errMsg){
	                    _this.showCartError();
	                });
	            }
	        });
	        // 电影的全选 / 取消全选
	        $(document).on('click', '.cart-select-all', function(){
	            var $this = $(this);
	            // 全选
	            if($this.is(':checked')){
	                _cart.selectAllProduct(function(res){
	                    _this.renderCart(res);
	                }, function(errMsg){
	                    _this.showCartError();
	                });
	            }
	            // 取消全选
	            else{
	                _cart.unselectAllProduct(function(res){
	                    _this.renderCart(res);
	                }, function(errMsg){
	                    _this.showCartError();
	                });
	            }
	        });
	        // 电影数量的变化
	        $(document).on('click', '.count-btn', function(){
	            var $this       = $(this),
	                $pCount     = $this.siblings('.count-input'),
	                currCount   = parseInt($pCount.val()),
	                type        = $this.hasClass('plus') ? 'plus' : 'minus',
	                productId   = $this.parents('.cart-table').data('product-id'),
	                minCount    = 1,
	                maxCount    = parseInt($pCount.data('max')),
	                newCount    = 0;
	            if(type === 'plus'){
	                if(currCount >= maxCount){
	                    _mm.errorTips('该电影数量已达到上限');
	                    return;
	                }
	                newCount = currCount + 1;
	            }else if(type === 'minus'){
	                if(currCount <= minCount){
	                    return;
	                }
	                newCount = currCount - 1;
	            }
	            // 更新购物车电影数量
	            _cart.updateProduct({
	                productId : productId,
	                count : newCount
	            }, function(res){
	                _this.renderCart(res);
	            }, function(errMsg){
	                _this.showCartError();
	            });
	        });
	        // 删除单个电影
	        $(document).on('click', '.cart-delete', function(){
	            if(window.confirm('确认要删除该电影？')){
	                var productId = $(this).parents('.cart-table')
	                    .data('product-id');
	                _this.deleteCartProduct(productId);
	            }
	        });
	        // 删除选中电影
	        $(document).on('click', '.delete-selected', function(){
	            if(window.confirm('确认要删除选中的电影？')){
	                var arrProductIds = [],
	                    $selectedItem = $('.cart-select:checked');
	                // 循环查找选中的productIds
	                for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
	                    arrProductIds
	                        .push($($selectedItem[i]).parents('.cart-table').data('product-id'));
	                }
	                if(arrProductIds.length){
	                    _this.deleteCartProduct(arrProductIds.join(','));
	                }
	                else{
	                    _mm.errorTips('您还没有选中要删除的电影');
	                }  
	            }
	        });
	        // 提交购物车
	        $(document).on('click', '.btn-submit', function(){
	            // 总价大于0，进行提交
	            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
	                window.location.href = './confirm.html';
	            }else{
	                _mm.errorTips('请选择电影后再提交');
	            }
	        });
	    },
	    // 加载购物车信息
	    loadCart : function(){
	        var _this       = this;
	        // 获取购物车列表
	        _cart.getCartList(function(res){
	            _this.renderCart(res);
	        }, function(errMsg){
	            _this.showCartError();
	        })
	    },
	    // 渲染购物车
	    renderCart : function(data){
	        this.filter(data);
	        // 缓存购物车信息
	        this.data.cartInfo = data;
	        // 生成HTML
	        var cartHtml = _mm.renderHtml(templateIndex, data);
	        $('.page-wrap').html(cartHtml);
	        // 通知导航的购物车更新数量
	        nav.loadCartCount();
	    },
	    // 删除指定电影，支持批量，productId用逗号分割
	    deleteCartProduct : function(productIds){
	        var _this = this;
	        _cart.deleteProduct(productIds, function(res){
	            _this.renderCart(res);
	        }, function(errMsg){
	            _this.showCartError();
	        });
	    },
	    // 数据匹配
	    filter : function(data){
	        data.notEmpty = !!data.cartProductVoList.length;
	    },
	    // 显示错误信息
	    showCartError: function(){
	        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
	    }
	};
	$(function(){
	    page.init();
	})

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports) {

	module.exports = "{{#notEmpty}}\n<div class=\"cart-header\">\n    <table class=\"cart-table\">\n        <tr>\n            <th class=\"cart-cell cell-check\">\n                <label class=\"cart-label\">\n                    {{#allChecked}}\n                    <input type=\"checkbox\" class=\"cart-select-all\" checked/>\n                    {{/allChecked}}\n                    {{^allChecked}}\n                    <input type=\"checkbox\" class=\"cart-select-all\" />\n                    {{/allChecked}}\n                    <span>全选</span>\n                </label>\n            </th>\n            <th class=\"cart-cell cell-info\">电影信息</th>\n            <th class=\"cart-cell cell-price\">单价</th>\n            <th class=\"cart-cell cell-count\">数量</th>\n            <th class=\"cart-cell cell-total\">合计</th>\n            <th class=\"cart-cell cell-opera\">操作</th>\n        </tr>\n    </table>\n</div>\n<div class=\"cart-list\">\n    {{#cartProductVoList}}\n    <table class=\"cart-table\" data-product-id=\"{{productId}}\">\n        <tr>\n            <td class=\"cart-cell cell-check\">\n                <label class=\"cart-label\">\n                    {{#productChecked}}\n                    <input type=\"checkbox\" class=\"cart-select\" checked/>\n                    {{/productChecked}}\n                    {{^productChecked}}\n                    <input type=\"checkbox\" class=\"cart-select\" />\n                    {{/productChecked}}\n                </label>\n            </td>\n            <td class=\"cart-cell cell-img\">\n                <a class=\"link\" href=\"./detail.html?productId={{productId}}\">\n                    <img class=\"p-img\" src=\"{{imageHost}}{{productMainImage}}\" alt=\"{{productName}}\" />\n                </a>\n            </td>\n            <td class=\"cart-cell cell-info\">\n                <a class=\"link\" href=\"./detail.html?productId={{productId}}\">{{productName}}</a>\n            </td>\n            <td class=\"cart-cell cell-price\">￥{{productPrice}}</td>\n            <td class=\"cart-cell cell-count\">\n                <span class=\"count-btn minus\">-</span>\n                <input class=\"count-input\" value=\"{{quantity}}\" data-max=\"{{productStock}}\"/>  \n                <span class=\"count-btn plus\">+</span>\n            </td>\n            <td class=\"cart-cell cell-total\">￥{{productTotalPrice}}</td>\n            <td class=\"cart-cell cell-opera\">\n                <span class=\"link cart-delete\">删除</span>\n            </td>\n        </tr>\n    </table>\n    {{/cartProductVoList}}\n</div>\n<div class=\"cart-footer\">\n    <div class=\"select-con\">\n        <label>\n            {{#allChecked}}\n            <input type=\"checkbox\" class=\"cart-select-all\" checked/>\n            {{/allChecked}}\n            {{^allChecked}}\n            <input type=\"checkbox\" class=\"cart-select-all\" />\n            {{/allChecked}}\n            <span>全选</span>\n        </label>\n    </div>\n    <div class=\"delete-con\">\n        <span class=\"link delete-selected\">\n            <i class=\"fa fa-trash-o\"></i>\n            <span>删除选中</span>\n        </span>\n    </div>\n    <div class=\"submit-con\">\n        <span>总价：</span>\n        <span class=\"submit-total\">￥{{cartTotalPrice}}</span>\n        <span class=\"btn btn-submit\">去结算</span>\n    </div>\n</div>\n{{/notEmpty}}\n{{^notEmpty}}\n<p class=\"err-tip\">\n    <span>您的购物车空空如也，</span>\n    <a href=\"./index.html\">立即去购物</a>\n</p>\n{{/notEmpty}}";

/***/ })
]);