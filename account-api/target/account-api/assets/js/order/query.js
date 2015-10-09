/**
 * shuang.xiao
 */

var businessQueryJs = {
		
		/**
		 * 删除操作列
		 * 
		 * @param id
		 * @returns {String}
		 */
		deleteTransfer : function(id) {
			if(id.split(",")[1] === "取消订单"){
				return "-";
			}
			return "<a onclick='businessQueryJs.deleteById(" + id.split(",")[0] + ")' style='cursor:pointer'>取消</a>";
		},
		
		transferPrice : function(price){
			return (price/1000).toFixed(2).toString();
		},
		
		orderDetail : function(orderId){
			if(orderId.split(",")[1]>0){
				return '<a href="/orderManage/detail/view?orderId='+orderId.split(",")[0]+'">'+orderId.split(",")[0]+'</a>';
			}else{
				return orderId.split(",")[0];
			}
		},

		deleteById : function(id) {
			if(confirm("确定要取消吗？"))
			{
				var condi = {
						"orderId" : id
					};
					var url = "/orderManage/cancel";
					$.post(url, condi, function(data, status) {
						if (!data.code) {
							alert("订单取消成功");
							businessQueryJs.doConditionQuery();
						} else {
							alert(data.message)
						}
					});
			}
		},

		//构造查询条件的json串
		getQueryParams : function() {
			var params = {
				"pageSize" : 5,
				"mobile" : $("#query-creatorMobile").val(),
				"orderId" : $("#query-id").val(),
				"businessId" : $("#query-customerId").attr("menu-value"),
				"address" : $("#query-pickupAddress").attr("menu-value"),
				"channel" : $("#query-source").attr("menu-value"),
				"status" : $("#query-status").attr("menu-value")
			};
			var openTime = comJs.getTimeOfTimePicker();
			params.gmtCreatedBeginDate = openTime.startDate;
			params.gmtCreatedEndDate = openTime.endDate;
			return params;
		},
		doConditionQuery : function() {
			if (!validJs.triggerValid()) {
				return;
			}
			var params = businessQueryJs.getQueryParams();
			comJs.setParams(params);
			getClickPage(1);
		}
		
	}