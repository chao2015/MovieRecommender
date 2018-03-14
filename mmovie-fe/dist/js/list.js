webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(133);


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

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: chao2015
	* @Date:   2018-03-09 18:26:52
	* @Last Modified by:   chao2015
	* @Last Modified time: 2018-03-09 15:32:17
	*/

	'use strict';

	var _mm = __webpack_require__(10);

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

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: 异火电影
	* @Date:   2018-03-09 17:57:49
	* @Last Modified by:   chao2015
	* @Last Modified time: 2018-03-11 21:23:35
	*/

	'use strict';
	__webpack_require__(134);
	__webpack_require__(7);
	__webpack_require__(16);
	var _mm             = __webpack_require__(10);
	var _product        = __webpack_require__(114);
	var Pagination      = __webpack_require__(136);
	var templateIndex   = __webpack_require__(140);

	var page = {
	    data : {
	        listParam : {
	            keyword         : _mm.getUrlParam('keyword')    || '',
	            categoryId      : _mm.getUrlParam('categoryId') || '',
	            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
	            pageNum         : _mm.getUrlParam('pageNum')    || 1,
	            pageSize        : _mm.getUrlParam('pageSize')   || 20
	        }
	    },
	    init : function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad : function(){
	        this.loadList();
	    },
	    bindEvent : function(){
	        var _this = this;
	        // 排序的点击事件
	        $('.sort-item').click(function(){
	            var $this = $(this);
	            _this.data.listParam.pageNum = 1;
	            // 点击默认排序
	            if($this.data('type') === 'default'){
	                // 已经是active样式
	                if($this.hasClass('active')) {
	                    return;
	                }
	                // 其他
	                else{
	                    $this.addClass('active').siblings('.sort-item')
	                        .removeClass('active asc desc');
	                    _this.data.listParam.orderBy = 'default';
	                }
	            }
	            // 点击评分排序
	            else if($this.data('type') === 'price'){
	                // active class 的处理
	                $this.addClass('active').siblings('.sort-item')
	                        .removeClass('active asc desc');
	                // 升序、降序的处理
	                if(!$this.hasClass('asc')){
	                    $this.addClass('asc').removeClass('desc');
	                    _this.data.listParam.orderBy = 'price_asc';
	                }else{
	                    $this.addClass('desc').removeClass('asc');
	                    _this.data.listParam.orderBy = 'price_desc';
	                }
	            }
	            // 重新加载列表
	            _this.loadList();
	        });
	    },
	    // 加载list数据
	    loadList : function(){
	        var _this       = this,
	            listHtml    = '',
	            listParam   = this.data.listParam,
	            $pListCon   = $('.p-list-con');
	        $pListCon.html('<div class="loading"></div>');
	        // 删除参数中不必要的字段
	        listParam.categoryId 
	            ? (delete listParam.keyword) : (delete listParam.categoryId);
	        // 请求接口
	        _product.getProductList(listParam, function(res){
	            listHtml = _mm.renderHtml(templateIndex, {
	                list :  res.list
	            });
	            $pListCon.html(listHtml);
	            _this.loadPagination({
	                hasPreviousPage : res.hasPreviousPage,
	                prePage         : res.prePage,
	                hasNextPage     : res.hasNextPage,
	                nextPage        : res.nextPage,
	                pageNum         : res.pageNum,
	                pages           : res.pages
	            });
	        }, function(errMsg){
	            _mm.errorTips(errMsg);
	        });
	    },
	    //加载分页信息
	    loadPagination : function(pageInfo){
	        var _this = this;
	        this.pagination ? '' : (this.pagination = new Pagination());
	        this.pagination.render($.extend({}, pageInfo, {
	            container : $('.pagination'),
	            onSelectPage : function(pageNum){
	                _this.data.listParam.pageNum = pageNum;
	                _this.loadList();
	            }
	        }));
	    }
	};
	$(function(){
	    page.init();
	})

/***/ }),

/***/ 134:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: chao2015
	* @Date:   2018-03-09 11:58:08
	* @Last Modified by:   chao2015
	* @Last Modified time: 2018-03-09 15:29:03
	*/

	'use strict';
	__webpack_require__(137);
	var _mm                 = __webpack_require__(10);
	var templatePagination  = __webpack_require__(139);

	var Pagination = function(){
	    var _this = this;
	    this.defaultOption = {
	        container       : null,
	        pageNum         : 1,
	        pageRange       : 3,
	        onSelectPage    : null
	    };
	    // 事件的处理
	    $(document).on('click', '.pg-item', function(){
	        var $this = $(this);
	        // 对于active和disabled按钮点击，不做处理
	        if($this.hasClass('active') || $this.hasClass('disabled')){
	            return;
	        }
	        typeof _this.option.onSelectPage === 'function' 
	            ? _this.option.onSelectPage($this.data('value')) : null;
	    });
	};
	// 渲染分页组件
	Pagination.prototype.render = function(userOption){
	    // 合并选项
	    this.option = $.extend({}, this.defaultOption, userOption);
	    // 判断容器是否为合法的jquery对象
	    if(!(this.option.container instanceof jQuery)){
	        return;
	    }
	    // 判断是否只有1页
	    if(this.option.pages <= 1){
	        return;
	    }
	    // 渲染分页内容
	    this.option.container.html(this.getPaginationHtml());
	};
	// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
	Pagination.prototype.getPaginationHtml = function(){
	    var html        = '',
	        option      = this.option,
	        pageArray   = [],
	        start       = option.pageNum - option.pageRange > 0 
	            ? option.pageNum - option.pageRange : 1,
	        end         = option.pageNum + option.pageRange < option.pages
	            ? option.pageNum + option.pageRange : option.pages;
	    // 上一页按钮的数据
	    pageArray.push({
	        name : '上一页',
	        value : this.option.prePage,
	        disabled : !this.option.hasPreviousPage
	    });
	    // 数字按钮的处理
	    for(var i = start; i <= end; i++){
	        pageArray.push({
	            name : i,
	            value : i,
	            active : (i === option.pageNum)
	        });
	    };
	    // 下一页按钮的数据
	    pageArray.push({
	        name : '下一页',
	        value : this.option.nextPage,
	        disabled : !this.option.hasNextPage
	    });
	    html = _mm.renderHtml(templatePagination, {
	        pageArray   : pageArray,
	        pageNum     : option.pageNum,
	        pages       : option.pages
	    });
	    return html;
	};

	module.exports = Pagination;

/***/ }),

/***/ 137:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

	module.exports = "<div class=\"pg-content\">\n    {{#pageArray}}\n    {{#disabled}}\n        <span class=\"pg-item disabled\" data-value=\"{{value}}\">{{name}}</span>\n    {{/disabled}}\n    {{^disabled}}\n        {{#active}}\n            <span class=\"pg-item active\" data-value=\"{{value}}\">{{name}}</span>\n        {{/active}}\n        {{^active}}\n            <span class=\"pg-item\" data-value=\"{{value}}\">{{name}}</span>\n        {{/active}}\n    {{/disabled}}\n    {{/pageArray}}\n    <span class=\"pg-total\">{{pageNum}} / {{pages}}</span>\n</div>";

/***/ }),

/***/ 140:
/***/ (function(module, exports) {

	module.exports = " {{#list}}\n    <li class=\"p-item\">\n        <div class=\"p-img-con\">\n            <a class=\"link\" href=\"./detail.html?productId={{id}}\" target=\"_blank\">\n                <img class=\"p-img\" src=\"{{mainImage}}\" alt=\"{{name}}\" />\n            </a>\n        </div>\n        <div class=\"p-price-con\">\n            <span class=\"p-price\">{{price}}</span>\n        </div>\n        <div class=\"p-name-con\">\n            <a class=\"p-name\" href=\"./detail.html?productId={{id}}\" target=\"_blank\">{{name}}</a>\n        </div>\n    </li>\n{{/list}}\n{{^list}}\n    <p class=\"err-tip\">很抱歉，实在找不到您要的电影。</p>\n{{/list}}";

/***/ })

});