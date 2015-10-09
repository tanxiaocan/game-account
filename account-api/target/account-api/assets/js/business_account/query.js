var businessAccountQueryJs = {
	createTable : function(businessId) {
		var getTimestamp = new Date().getTime();
		var list_url = "/businessAccount/getListAll?businessId=" + businessId
				+ "&timeStamp=" + getTimestamp;
		var aj = $.ajax({
			url : list_url,
			contentType : 'application/json',
			type : 'get',
			success : function(data) {
				if (data.code == 0) {
					comJs.getTable(data.data);
					businessAccountQueryJs.getOperationButton();
				} else {
					alert(data.message);
				}
			},
			error : function() {
				// view("异常！");
				alert("异常！");
			}
		});
	},
	
	getOperationButton : function() {
		var buttonText = '<a class="btn btn-default" onclick="businessAccountQueryJs.getConfirm($(this))" role="button">禁用</a>';
		var trs = $("#com_tbody").children();
		$(trs).each(function() {
			var tds = $(this).children();
			$(tds[7]).html(buttonText);
		});
	},
	/**
	 * 
	 */
	getConfirm : function(aTab) {

		var statusTd = aTab.parent().prev().prev();
		var busiInfo = businessAccountQueryJs.getBusinissAccountInfo(aTab);
		var modalText = '确认要禁用' + busiInfo.userName + "吗?";
		$.confirm({
			animation : 'RotateX',
			theme : 'black',
			title : false,
			content : modalText,
			confirmButton : '确认',
			cancelButton : '取消',
			confirmButtonClass : 'btn-info',
			cancelButtonClass : 'btn-danger',
			confirm : function() {
				businessAccountQueryJs.updateStatus(busiInfo.id, $(statusTd));
			},
			cancle : function() {
				return;
			}
		});
	},
	updateStatus : function(id, statusTd) {
		var updateStatusUrl = "/businessAccount/status/update"
		var vData = {
			"id" : id,
			"status" : status
		};
		var aj = $.ajax({
			url : updateStatusUrl,
			type : 'post',
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(vData),
			success : function(data) {
				if (data.code == 0) {
					statusTd.text("禁用");
				} else {
					alert(data.message);
				}
			},
			error : function() {
				// view("异常！");
				alert("异常！");
			}
		});
	},
	/**
	 * 获取当前行的id和name
	 */
	getBusinissAccountInfo : function(aTab) {
		var buIn = new Object();
		var tds = aTab.parent().parent().children();
		var td = tds[1];
		buIn.id = $(td).html();
		td = tds[2];
		buIn.userName = $(td).text();
		return buIn;
	},
	/**
	 * 提交新建
	 */
	create : function(businessId) {
		if(!validJs.triggerValid()){
			return;
		}
		var url_create = "/businessAccount/create";
		var fData = new Object();
		fData.userName = $("#create-userName").val();
		fData.mobile = $("#create-mobile").val();
		fData.position = $("#create-position").val();
		fData.businessId = businessId;
		var aj = $.ajax({
			url : url_create,
			type : 'post',
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(fData),
			success : function(data) {
				if (data.code == 0) {					
					alert("成功",1);
				} else {
					alert(data.message);
				}
			},
			error : function() {
				// view("异常！");
				alert("异常！");
			}
		});
	},
}