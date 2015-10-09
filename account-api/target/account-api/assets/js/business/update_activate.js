/**
 * shuang.xiao
 */
$(function() {
	updateActivate.init();
});

updateActivate = {
		init : function() {
			var me = updateActivate;
			me.renderActivate();
			$("#activate_buttom").click(me.saveActivate);
		},

		renderActivate : function(){
			var url = "/business/getExtraById?businessId=" + $("#businessId").val();
			$.get(url, function(result) {
				if (!result.code) {
					if (result.data) {
						var data = result.data;
						$("#inputTitle").val(data.actTitle);
						$("#inputContent").val(data.actContent);
					}
				}
			})
		},
		
		saveActivate : function(){
			var url = "/business/extra/update";

			var parm = {
				businessId : $("#businessId").val(),
				actTitle : $("#inputTitle").val(),
				actContent : $("#inputContent").val()
			}
			$.post(url, parm, function(result) {
				if (!result.code) {
					alert("保存成功！");
				} else {
					alert(result.message);
				}
			})
		}
}