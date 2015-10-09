var businessQueryJs = {

	/**
	 * 
	 */
	getConfirm : function(aTab) {

		var statusTd = aTab.parent().parent().parent().parent().prev().prev();
		var status = $(statusTd).text();
		var alertText = "禁用";
		if (status == "禁用") {
			status = 1;
			alertText = "启用";
		} else {
			status = 0;
		}
		var busiInfo = businessQueryJs.getBusinissInfo(aTab);
		var modalText = '确认要' + alertText + busiInfo.businessId
				+ busiInfo.businessName + "吗?";
		$.confirm({
			animation : 'RotateY',
			theme : 'black',
			title : false,
			content : modalText,
			confirmButton : '确认',
			cancelButton : '取消',
			confirmButtonClass : 'btn-info',
			cancelButtonClass : 'btn-danger',
			confirm : function() {
				businessQueryJs.updateStatus(busiInfo.businessId, $(statusTd),
						status);
			}
		});
	},
	updateStatus : function(businessId, statusTd, status) {
		var updateStatusUrl = "/business/status/update"
		var vData = {
			"businessId" : businessId,
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
					if (status == 0) {
						statusTd.text("禁用");
					} else {
						statusTd.text("正常");
					}

				} else {
					alert("update status faild");
				}
			},
			error : function() {
				// view("异常！");
				alert("异常！");
			}
		});
	},
	/**
	 * 获取当前行的businessid和name
	 */
	getBusinissInfo : function(aTab) {
		var buIn = new Object();
		var tds = aTab.parent().parent().parent().parent().parent().children();
		var td = tds[1];
		buIn.businessId = $(td).html();
		td = tds[2];
		buIn.businessName = $(td).text();
		return buIn;
	},

	// 构造查询条件的json串
	getQueryParams : function() {
		var params = {
			"pageSize" : 5,
			"businessId" : $("#query-businessId").val(),
			"businessName" : $("#query-businessName").val(),
			"city" : $("#query-city").attr("menu-value"),
			"businessType" : $("#query-businessType").attr("menu-value"),
			"telephone" : $("#query-telephone").val(),
			"makerId" : $("#query-makerId").attr("menu-value"),
			"status" : $("#query-status").attr("menu-value")
		};
		var openTime = comJs.getTimeOfTimePicker();
		params.gmtCreatedBeginDate = openTime.startDate;
		params.gmtCreatedEndDate = openTime.endDate;
		return params;
	},
	doConditionQuery : function() {
		var params = businessQueryJs.getQueryParams();
		comJs.setParams(params);
		getClickPage(1);
	},
	/**
	 * 集团下属商家查询
	 * 
	 * @param groupId
	 */
	doConditionQuery4Group : function(groupId) {
		var params = businessQueryJs.getQueryParams();
		params.groupId = groupId;
		comJs.setParams(params);
		getClickPage(1);
	},
	createBusinessView : function(groupId, groupName) {
		location.href = "/business/createView?groupId=" + groupId
				+ "&groupName=" + groupName;
	},
	getDetail : function($a, detailUrl) {
		var tds = $a.parent().parent().parent().parent().parent().children();
		var td = tds[1];
		var businessId = $(td).html();
		td = tds[2];
		var businessName = $(td).html();
		td = tds[3];// 拿到vipId
		var vipId = $(td).html();
		location.href = detailUrl + "?businessId=" + businessId
				+ "&businessName=" + businessName + "&vipId=" + vipId;
	},
}