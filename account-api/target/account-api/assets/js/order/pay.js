var payCommonJs = {
		//构造查询条件的json串
	getQueryParams : function() {
		var params = {
			"pageSize" : 5,
			"businessName" : $("#query-businessName").val(),
			"channel" : $("#query-source").attr("menu-value"),
			"orderId" : $("#query-orderId").val()
		};
		var openTime = comJs.getTimeOfTimePicker();
		params.gmtCreatedBeginDate = openTime.startDate;
		params.gmtCreatedEndDate = openTime.endDate;
		return params;
	},
	
	transferPrice : function(price){
		return (price/1000).toFixed(2).toString();
	},
		
	doConditionQuery : function(businessId) {
		if (!validJs.triggerValid()) {
			return;
		}
		var params = payCommonJs.getQueryParams();
		comJs.setParams(params);
		getClickPage(1);
	}
	
}