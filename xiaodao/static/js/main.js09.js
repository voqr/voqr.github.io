var clipboard = new Clipboard(".copy-btn");
clipboard.on("success",
function(e) {
	layer.msg("复制成功")
});
clipboard.on("error",
function(e) {
	layer.msg("复制失败，请长按链接后手动复制")
});
$(function() {
	$("#toUploaded").append("<span class='file_multiple'><span class='glyphicon glyphicon-cloud-upload'></span> 拖拽或选择您的图片到这里(??▽?)?</span>");
	$('input[name="file"]').change(function(event) {
		var filePaths = $(this)[0].files;
		$(".file_multiple").remove();
		if (filePaths.length > 20) {
			layer.alert("别贪心，一次最多选择20张图片喔ヾ(=?ω?=)o", {
				closeBtn: 0,
				maxWidth: 320,
				title: "温馨提示 ?(?ω?)?",
				btn: ["知道了"]
			},
			function() {
				window.location.href = "index.php"
			})
		}
		$("#toUploaded").append("<span class='file_multiple'><span class='glyphicon glyphicon-check'></span> 您选择了" + filePaths.length + "个文件(/≧▽≦)/~</span>")
	})
});
function doUpload() {
	var formData = new FormData();
	var files = $("#file")[0].files;
	if (files.length == 0) {
		layer.alert("请选择文件后再操作！", {
			closeBtn: 0,
			maxWidth: 320,
			title: "温馨提示 ?(?ω?)?",
			btn: ["知道了"]
		})
	}
	var flag = 0;
	for (var i = 0; i < files.length; i++) {
		formData.append("file", files[i]);
		var ii = layer.msg("上传中，请稍等...", {
			icon: 16,
			shade: 0.1,
			time: false
		});
		var type = $('input:radio[name="type"]:checked').val();
		$.ajax({
			url: "/uppic.php?type=" + type,
			type: "post",
			data: formData,
			cache: false,
			processData: false,
			contentType: false,
			async: true,
			dataType: "json",
			success: function(data) {
				flag++;
				if (flag == files.length) {
					layer.close(ii);
					layer.msg("上传完成")
				}
				if (data.code == 200) {
					$("#image").append("<div class='row mb-2'><div class='col-9 form-inline'><input type='text' class='form-control' value='" + data.url + "'\'></div><div class='col-3 form-inline'><button class='btn btn-primary col-12 copy-btn' data-clipboard-text=" + data.url + " type='button'>复制</button></div></div>")
				} else {
					layer.close(ii);
					layer.alert('上传失败', {
						closeBtn: 0,
						maxWidth: 320,
						title: "温馨提示 ?(?ω?)?",
						btn: ["知道了"]
					})
				}
			}
		})
	}
}; !
function(e, t, a) {
	function r() {
		for (var e = 0; e < s.length; e++) {
			s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e, 1)) : (s[e].y--, s[e].scale += 0.004, s[e].alpha -= 0.013, s[e].el.style.cssText = "left:" + s[e].x + "px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale + "," + s[e].scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999")
		}
		requestAnimationFrame(r)
	}
	function n() {
		var t = "function" == typeof e.onclick && e.onclick;
		e.onclick = function(e) {
			t && t(),
			o(e)
		}
	}
	function o(e) {
		var a = t.createElement("div");
		a.className = "heart",
		s.push({
			el: a,
			x: e.clientX - 5,
			y: e.clientY - 5,
			scale: 1,
			alpha: 1,
			color: c()
		}),
		t.body.appendChild(a)
	}
	function i(e) {
		var a = t.createElement("style");
		a.type = "text/css";
		try {
			a.appendChild(t.createTextNode(e))
		} catch(t) {
			a.styleSheet.cssText = e
		}
		t.getElementsByTagName("head")[0].appendChild(a)
	}
	function c() {
		return "rgb(" + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + ")"
	}
	var s = [];
	e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame ||
	function(e) {
		setTimeout(e, 1000 / 60)
	},
	i(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),
	n(),
	r()
} (window, document);