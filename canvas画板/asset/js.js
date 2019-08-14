/*
* @Author: YOYO
* @Date:   2018-07-17 10:03:08
* @Last Modified by:   YOYO
* @Last Modified time: 2018-07-18 09:38:22
*/
$(function () {
	/* 获取绘图上下文 */
	var canvas = document.getElementById('draws');
	var ctx = canvas.getContext('2d');
	// 颜色盘-形状盘-粗细
	var color = ['#000', '#FFFFFF', '#880015', '#ED1C24', '#FF7F27', '#FFF200', '#22B14C', '#00A2E8', '#3F48CC', '#A349A4', '#7F7F7F', '#C3C3C3', '#B97A57', '#FFAEC9', '#FFC90E', '#EFE4B0', '#B5E61D', '#99D9EA', '#7092BE', '#C8BFE7']
	var shape = ['~', '—', '△', '□', '○', '∟'];
	var lineWidth = [1, 3, 5, 7, 10];
	/* 操作工具栏 */
	function Init() {
		this.color = color[0]
		this.shape = shape[0]
		this.lineWidth = lineWidth[0]
	}
	var init = new Init()
	var toolbar = function () {
		/*工具栏的显示隐藏*/
		$('.arrowTop').click(function () {
			if ($('.tools').hasClass('toolshidden')) {
	      $('.tools').removeClass('toolshidden')
			} else {
	      $('.tools').addClass('toolshidden')
			}
		})
		/*工具栏颜色*/
		for (var i = 0; i < color.length; i++) {
      $('.colorArr').append('<span class="color-item" style="background-color: ' + color[i] + '" data-color="'+ i +'"></span>')
		}
		$('.color-item').click(function(e) {
			init.color = color[e.target.dataset.color]
			$('.color-item').each(function(index, val) {
				if (index != e.target.dataset.color) {
				 $(this).removeClass('active')
				} else {
				 $(this).addClass('active')
				}
			});
		});
		/*工具栏形状*/
		for (var i = 0; i < shape.length; i++) {
      $('.shapeArr').append('<span class="shape-item" data-shape="'+ i +'">'+ shape[i] +'</span>')
		}
		$('.shape-item').click(function(e) {
			init.shape = shape[e.target.dataset.shape]
			$('.shape-item').each(function(index, val) {
				if (index != e.target.dataset.shape) {
				 $(this).removeClass('active')
				} else {
				 $(this).addClass('active')
				}
			});
		});
	  /*线条*/
	  $('.lines').click(function(e) {
			init.lineWidth = lineWidth[e.target.dataset.line]
			$('.lines').each(function(index, val) {
				if (index != e.target.dataset.line) {
				 $(this).removeClass('active')
				} else {
				 $(this).addClass('active')
				}
			});
		});
	}
	/* 绘图 */
	var draw = function () {
		canvas.onmousedown = function (e) {
			ctx.beginPath();
			ctx.moveTo(e.offsetX, e.offsetY + 20);
			document.onmousemove = function (em) {
				ctx.lineTo(em.offsetX,em.offsetY + 20);
				ctx.strokeStyle = init.color
				ctx.lineWidth = init.lineWidth;
		    ctx.stroke();
			}
	    document.onmouseup = function (eu) {
				document.onmousemove = document.onmouseup = null;
				ctx.closePath();
	    }
		}
	}
	toolbar()
	draw()
})