<script src="https://cdn.bootcss.com/fancybox/3.5.7/jquery.fancybox.js"></script>
<script src="https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js"></script>
<script src="https://blog-static.cnblogs.com/files/gshang/gshang.owo.2020.01.05.1.js"></script>
<script src="https://blog-static.cnblogs.com/files/ctgu/perfect-scrollbar.min.js"></script>
<script src="//cdnjs.loli.net/ajax/libs/mdui/0.4.3/js/mdui.min.js"></script>
<script src="https://blog-static.cnblogs.com/files/gshang/sidebarContent.js"></script>
<script src="https://blog-static.cnblogs.com/files/gshang/notiflix-2.0.0.min.js"></script>
<script src="https://blog-static.cnblogs.com/files/RioTian/highlight.pack.js"></script>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
<script type="text/javascript" src="https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js"></script>
<script type="text/javascript" src="https://files.cnblogs.com/files/gshang/51La.min.js"></script>

<script>
	// 运行脚本
	$('code.language-runCode').each(function() {
		window.eval($(this).text());
		$(this).parent('pre').remove();
	});


	//$('link[href^="/skins/"],link[href^="/css/blog-common"]').remove();
	$('#mainContent').prepend($('#header'));
	$('#sideBar').append($('#footer'));
	$('#header').prepend(
		'<div class="hd-menu"><ul><li><a id="sidebar-toggler" href="javascript:sidebarToggle()"></a></li><li><a id="theme" href="javascript:changeTheme()"></a></li></ul></div>'
	);
	$('#sidebar-toggler').click(function() {
		$('#main').toggleClass('main-widthout-sidebar')
	});

	// 初始化主题
	$(function() {
		if ($.cookie('is-side-open') == null) {
			$.cookie('is-side-open', 'open', {
				expires: 30,
				path: '/',
				domain: 'cnblogs.com'
			});
			$('#main').removeClass('main-widthout-sidebar')
		}
		if ($.cookie('is-side-open') == 'close') {
			$('#main').addClass('main-widthout-sidebar')
		}
	})
	// 初始化主题
	$(function() {
		if ($.cookie('theme') == null) {
			$.cookie('theme', 'light', {
				expires: 30,
				path: '/',
				domain: 'cnblogs.com'
			});
		}
		if ($.cookie('theme') == 'dark') {
			//$('.theme').addClass('theme-dark');
			document.documentElement.setAttribute('theme', 'dark');
		}
	})
	// 切换主题
	changeTheme = function() {
		if ($.cookie('theme') == 'light') {
			$.cookie('theme', 'dark', {
				expires: 30,
				path: '/',
				domain: 'cnblogs.com'
			});
			document.documentElement.setAttribute('theme', 'dark');
		} else {
			$.cookie('theme', 'light', {
				expires: 30,
				path: '/',
				domain: 'cnblogs.com'
			});
			document.documentElement.removeAttribute('theme', 'dark');
		}
	}

	sidebarToggle = function() {
		if ($.cookie('is-side-open') == 'open') {
			$.cookie('is-side-open', 'close', {
				expires: 30,
				path: '/',
				domain: 'cnblogs.com'
			});
			$('#main').addClass('main-widthout-sidebar')
		} else {
			$.cookie('is-side-open', 'open', {
				expires: 30,
				path: '/',
				domain: 'cnblogs.com'
			});
			$('#main').removeClass('main-widthout-sidebar')
		}
	}

	showSide = function() {
		$('#sideBarMain').fadeIn();
		$('#myside').addClass('active');
		$('#mycontent').removeClass('active');
		$('#sidebar_scroller').fadeOut();
	}

	showContent = function() {
		$('#sideBarMain').fadeOut();
		$('#myside').removeClass('active');
		$('#mycontent').addClass('active');
		$('#sidebar_scroller').fadeIn();
	}


	$(function() {
		// 博文
		if ($("#topics").length > 0) {
			//$('.btn-top').after('<li class="btn-comment"><a href="#commentform_title"></a></li>');
			//$('#main').toggleClass('main-hide');
			//$('.btn-main').addClass('btn-main-open');

			//高亮
			$('pre code').each(function(i, block) {
				hljs.highlightBlock(block);
			});

			// 表格滚动
			$("table").each(function() {
				$(this).css('cssText', 'width:100%!important;display:table;');
				$(this).wrapAll('<div class="tablebox"></div>');
				$(".tablebox").css('overflow', 'auto');
			});


			// 新窗口打开
			$('#cnblogs_post_body a[href^="http"]').each(function() {
				$(this).attr('target', '_blank');
			});

			// fancybox
			$(".cnblogs-markdown img").each(function() {
				var element = document.createElement("a");
				$(element).attr("data-fancybox", "gallery");
				$(element).attr("href", $(this).attr("src"));
				$(element).attr('data-caption', $(this).attr("alt"));
				$(this).wrap(element);
				if ($(this).attr("alt") != "") {
					$(this).parent().after('<div class="img-caption">' + $(this).attr("alt") + '</div>');
				}
			})

			// 代码复制
			for (i = 0; i <= $('pre').length; i++) {
				$('pre').eq(i).wrapAll('<div class="copyItem"></div>');
				$(".copyItem").css('position', 'relative');

				if ($('pre').eq(i).children('code').length > 0) {
					var codeType = $('pre').eq(i).children('code').attr('class').split(' ')[0].split('-')[1];
					if (codeType == null) {
						codeType = ''
					} else {
						codeType = codeType.toLowerCase()
					}
					$('pre').eq(i).before('<div class="codeType">' + codeType + '</div>')
				}



				$('pre').eq(i).before('<div class="clipboard-button" id="copy_btn_' + i +
					' " data-clipboard-target="#copy_target_' +
					i + '"title="复制"></div>');
				$('pre').eq(i).attr('id', 'copy_target_' + i);
			}

			$('pre code').each(function() {
				var lines = $(this).text().split('\n').length - 1;
				var $numbering = $('<ul/>').addClass('pre-numbering');
				$(this)
					.addClass('has-numbering')
					.parent()
					.append($numbering);
				for (i = 1; i <= lines; i++) {
					$numbering.append($('<li/>').attr('data-number', i));
				}
			});

			var clipboard = new ClipboardJS('.clipboard-button');
			clipboard.on('success', function(e) {
				e.trigger.innerHTML = '成功';
				setTimeout(function() {
					e.trigger.innerHTML = '';
				}, 2 * 1000);
				e.clearSelection();
			});
			clipboard.on('error', function(e) {
				e.trigger.innerHTML = '失败';
				setTimeout(function() {
					e.trigger.innerHTML = '';
				}, 2 * 1000);
				e.clearSelection();
			});

			// 设置评论区头像
			$(document).ajaxComplete(function(event, xhr, option) {
				//评论头像
				if (option.url.indexOf("GetComments") > -1) {
					setTimeout(function() {

						owoEmoji();
						$.each($(".feedbackItem"), function(index, ele) {
							var self = $(ele);
							var obj = self.find(".blog_comment_body");
							var id = obj.attr("id").split("_")[2];
							var blog = self.find('a[id^="a_comment_author"]');
							var blogUrl = blog.attr("href");
							var imgSrc = $("#comment_" + id + "_avatar").html() || "http://pic.cnblogs.com/avatar/simple_avatar.gif";
							self.prepend('<a href="' + blogUrl + '"><img src="' + imgSrc +
								'" style="float:left;" class="comment_avatar"></a');
							$(".feedbackListSubtitle").addClass("feedbackListSubtitle_right");
							$(".feedbackCon").addClass("feedbackCon_right");
						});

						//myscroll();

					}, 300)
				}
			})

			// 引入owo插件
			owoEmoji = function() {
				$(".commentbox_footer").before(
					'<div class="OwO" onclick="load_face(this)"><div class="OwO-logo"><i class="fa fa-smile-o" aria-hidden="true"></i></div></div>'
				);
			}

			// 表情按钮按下
			load_face = function(b) {
				var c = new OwO({
					logo: '<i class="fa fa-smile-o" aria-hidden="true"></i>',
					container: document.getElementsByClassName("OwO")[0],
					target: document.getElementById("tbCommentBody"),
					api: "https://cdn.jsdelivr.net/gh/gshang2018/home/gshang.owo.json",
					position: "up",
					width: "100%",
					maxHeight: "250px"
				});
				b.classList.add("OwO-open");
				b.onclick = null
			}

		}



		// 侧边目录
		if ($("#topics").length > 0) {
			//先获取第一个h标签, 之后循环时作为上一个h标签
			var $ph = $('#cnblogs_post_body :header:eq(0)');
			if ($ph.length > 0) {


				//设置层级为1
				$ph.attr('offset', '1');
				//添加导航目录的内容
				$('#sideBar').prepend(
					'<div id="sidebar_scroller" class="sidebar-block"><ul class="nav"></ul></div>'
				);
				$('#sideBar').prepend(
					'<div class="side-choose"><a id="myside" href="javascript:showSide()">侧边</a><a id="mycontent" href="javascript:showContent()">大纲</a></div>'
				)
				$('#sideBarMain').hide();
				showContent();
				//取当前边栏的宽度
				//$('#sidebar_scroller').css('width', ($('#sideBarMain').width()) + 'px');
				//让导航目录停留在页面顶端
				//  $('#sidebar_scroller').stickUp();
				//遍历文章里每个h标签
				$('#cnblogs_post_body :header').each(function(i) {
					var $h = $(this);
					//设置h标签的id, 编号从0开始
					$h.attr('id', 'scroller-' + i);
					//比上一个h标签层级小, 级数加1
					if ($h[0].tagName > $ph[0].tagName) {
						$h.attr('offset', parseInt($ph.attr('offset')) + 1);
					} //比上一个h标签层级大, 级数减1
					else if ($h[0].tagName < $ph[0].tagName) {

						var h = parseInt($h[0].tagName.substring(1));
						var ph = parseInt($ph[0].tagName.substring(1));

						var offset = parseInt($ph.attr('offset')) - (ph - h);
						if (offset < 1) {
							offset = 1
						};
						$h.attr('offset', offset);
					} //和上一个h标签层级相等时, 级数不变
					else {
						$h.attr('offset', $ph.attr('offset'));
					}
					//添加h标签的目录内容
					$('#sidebar_scroller ul').append('<li class="scroller-offset' + $h.attr('offset') + '"><a href="#scroller-' +
						i +
						'">' + $h.text() + '</a></li>');
					//最后设置自己为上一个h标签
					$ph = $h;
				});

				//开启滚动监听, 监听所有在.nav类下的li
				$('body').scrollspy();

				//  侧边
				/*
				$(document).ajaxComplete(function(event, xhr, option) {
					if (option.url.indexOf("TopLists") > -1) {
						setTimeout(function() {
							$('#sidebar_scroller').toggle();
							toggleContent();
							toggleMain();
						}, 300)
					}
				})*/



				//Notiflix.Notify.Success('已生成博文目录，点击右下角图标查看')
				/*当前目录激活监听*/
				$(window).scroll(function() {
					var now = $('#sidebar_scroller').find('.active');
					var prevNum = now.prevAll().length + 1;
					var basicHeight = now.outerHeight();
					$('#sideBar').scrollTop(prevNum * basicHeight)
				});
			}
		}
		
		// 侧边悬浮按钮
		$('#home').append(
			'<div class="float-btn"><ul>' +
			'<li class="btn-top"><a href="#header"></a></li>' +
			'<li class="btn-theme"><a href="javascript:changeTheme()"></a></li>' +
			'<li class="btn-main"><a href="javascript:sidebarToggle()"></a></li>' +
			'</ul></div>'
		)
				/*评论模块的滚动隐藏效果*/
		var windowTop = 0;
		$(window).scroll(function() {
			var scrolls = $(this).scrollTop();
			if (scrolls >= windowTop) { //当scrolls>windowTop时，表示页面在向下滑动
				//$('#header').addClass('header-hide');
				$('.float-btn').addClass('float-btn-hide');
				windowTop = scrolls;
			} else {
				//$('#header').removeClass('header-hide');
				$('.float-btn').removeClass('float-btn-hide');
				windowTop = scrolls;
			}
		});
		// 平滑滚动控制
		myscroll = function() {
			$('a[href*=\\#],area[href*=\\#]').click(function() {
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					var $target = $(this.hash);
					$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
					if ($target.length) {
						var targetOffset = $target.offset().top;
						$('html,body').animate({
								scrollTop: targetOffset
							},
							500);
						return false;
					}
				}
			})
		}
		myscroll()
	})
    <!-- 地址栏logo-->
    $(function () {
    // change the browser tab icon
    var links = document.getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
      if (links[i].rel.toUpperCase() == 'SHORTCUT ICON') {
        links[i].href = 'https://gitee.com/riotian/blogimage/raw/master/img/20200528214553.png';
        break;
      }
    }
  });
</script>