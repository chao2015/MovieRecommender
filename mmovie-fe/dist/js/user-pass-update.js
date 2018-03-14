webpackJsonp([12],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(164);


/***/ }),

/***/ 7:
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

/***/ 8:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 14:
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

/***/ 15:
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

/***/ 16:
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

/***/ 17:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: chao2015
	* @Date:   2018-03-09 17:39:14
	* @Last Modified by:   chao2015
	* @Last Modified time: 2018-03-09 15:37:25
	*/
	'use strict';
	__webpack_require__(124);
	var _mm             = __webpack_require__(10);
	var templateIndex   = __webpack_require__(126);
	// 侧边导航
	var navSide = {
	    option : {
	        name : '',
	        navList : [
	            {name : 'user-center', desc : '个人中心', href: './user-center.html'},
	            {name : 'order-list', desc : '我的订单', href: './order-list.html'},
	            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
	            {name : 'about', desc : '关于我们', href: './about.html'}
	        ]
	    },
	    init : function(option){
	        // 合并选项
	        $.extend(this.option, option);
	        this.renderNav();
	    },
	    // 渲染导航菜单
	    renderNav : function(){
	        // 计算active数据
	        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
	            if(this.option.navList[i].name === this.option.name){
	                this.option.navList[i].isActive = true;
	            }
	        };
	        // 渲染list数据
	        var navHtml = _mm.renderHtml(templateIndex, {
	            navList : this.option.navList
	        });
	        // 把html放入容器
	        $('.nav-side').html(navHtml);
	    }
	};

	module.exports = navSide;

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\n{{#isActive}}\n<li class=\"nav-item active\">\n{{/isActive}}\n{{^isActive}}\n<li class=\"nav-item\">\n{{/isActive}}\n    <a class=\"link\" href=\"{{href}}\">{{desc}}</a>\n</li>\n{{/navList}} ";

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: chao2015
	* @Date:   2018-03-09 11:03:57
	* @Last Modified by:   chao2015
	* @Last Modified time: 2018-03-09 15:29:01
	*/

	'use strict';
	__webpack_require__(165);
	__webpack_require__(7);
	__webpack_require__(16);
	var navSide         = __webpack_require__(123);
	var _mm             = __webpack_require__(10);
	var _user           = __webpack_require__(14);

	// page 逻辑部分
	var page = {
	    init: function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad : function(){
	        // 初始化左侧菜单
	        navSide.init({
	            name: 'user-pass-update'
	        });
	    },
	    bindEvent : function(){
	        var _this = this;
	        // 点击提交按钮后的动作
	        $(document).on('click', '.btn-submit', function(){
	            var userInfo = {
	                password        : $.trim($('#password').val()),
	                passwordNew     : $.trim($('#password-new').val()),
	                passwordConfirm : $.trim($('#password-confirm').val())
	            },
	            validateResult = _this.validateForm(userInfo);
	            if(validateResult.status){
	                // 更改用户密码
	                _user.updatePassword({
	                    passwordOld : userInfo.password,
	                    passwordNew : userInfo.passwordNew
	                }, function(res, msg){
	                    _mm.successTips(msg);
	                }, function(errMsg){
	                    _mm.errorTips(errMsg);
	                });
	            }
	            else{
	                _mm.errorTips(validateResult.msg);
	            }
	        });
	    },
	    // 验证字段信息
	    validateForm : function(formData){
	        var result = {
	            status  : false,
	            msg     : ''
	        };
	        // 验证原密码是否为空
	        if(!_mm.validate(formData.password, 'require')){
	            result.msg = '原密码不能为空';
	            return result;
	        }
	        // 验证新密码长度
	        if(!formData.passwordNew || formData.passwordNew.length < 6){
	            result.msg = '密码长度不得少于6位';
	            return result;
	        }
	        // 验证两次输入的密码是否一致
	        if(formData.passwordNew !== formData.passwordConfirm){
	            result.msg = '两次输入的密码不一致';
	            return result;
	        }
	        // 通过验证，返回正确提示
	        result.status   = true;
	        result.msg      = '验证通过';
	        return result;
	    }
	};
	$(function(){
	    page.init();
	});

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});