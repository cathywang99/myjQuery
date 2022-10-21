(function (global, factory) {
    //严格模式
    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        //支持commonJS模块规范走这里（例如：NODE.JS）
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        //这里可以初步理解为是浏览器环境或者WEB-WIEW环境
        //global===window;
        //factory===function(window,noGlobal){}
        factory(global);
    }
    //传参利用typeof暂时性死区的特性，浏览器下window一定存在，所以将window赋值给global
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    //window===window
    //noGlobal===undefined

    "use strict";

    var version = "3.6.1",
        // Define a local copy of jQuery
        jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context);
        };
    //jQuery是一个类，jQuery.fn只是给prototype设置一别名
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        length: 0,
        //将类数组转换为数组的方法
        toArray: function () {
            //this一般是当前类jQuery 的实例
            return slice.call(this);
        },
        //把JQ对象转换为原生JS对象
        get: function (num) {
            if (num == null) {
                return slice.call(this);
            }
            return num < 0 ? this[num + this.length] : this[num];
        },

        pushStack: function (elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;

            return ret;
        },
        /* JQ中只有一个each：用来遍历数组、对象、类数组中的每一项，当用$a.each()最后也会转换为$.each($a)这种模式 */
        each: function( obj, callback ) {
            var length, i = 0;
    
            if ( isArrayLike( obj ) ) {
                length = obj.length;
                for ( ; i < length; i++ ) {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        //每循环一次，就执行一次函数，把函数中this设置为循环项，传递索引和循环项。
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            }
    
            return obj;
        },
    };

    //jQuery是一个普通对象
    jQuery.ajax=function(url,options){

    };

	var init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

    if ( typeof noGlobal === "undefined" ) {
        //下面这行代码必然执行
        //把JQ赋值给window下的JQ和$，暴露出来供全局使用
        //JQ是一个私有函数，也是类，也是普通对象
        window.jQuery = window.$ = jQuery;
    }
});
//外面可以调用了
$();
jQuery();

/* jQuery给我们提供的方法放到了两个位置上：
   1.原型上 jQuery.prototype={...}
     $().get()
     只有jQuery的实力才可以调用
   2.对象上 jQuery.ajax=... 
     $.ajax()
     直接调取使用
*/



//检测对象是不是数组或者类数组
function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}