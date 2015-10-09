var financeCommonJs = {
	doQuery : function(vipId, tradeType) {
		if ($("#com_tbody") != null) {
			$("#com_tbody").remove();
		}
		financeCommonJs.createTable(vipId, tradeType);
	},
	doDownload : function(vipId, tradeType) {
		var appendParams = this.getCondi();
		var getTimestamp = new Date().getTime();
		var list_url = "/trade/export?accountType=3&accountId=" + vipId
				+ "&timeStamp=" + getTimestamp + "&tradeType=" + tradeType
				+ appendParams;
		window.location.href = list_url;
	},
	doDownload4Business : function(vipId, tradeType) {
		var appendParams = this.getCondi();
		var getTimestamp = new Date().getTime();
		var list_url = "/trade/exportBusiness?accountType=3&accountId=" + vipId
				+ "&timeStamp=" + getTimestamp + "&tradeType=" + tradeType
				+ appendParams;
		window.location.href = list_url;
	},
	getCondi : function() {
		var fmData = comJs.getTimeOfTimePicker();
		var appendParams = "";
		if (fmData.startDate != "") {
			appendParams += "&dateStart=" + fmData.startDate;
		}
		if (fmData.endDate != "") {
			appendParams += "&dateEnd=" + fmData.endDate;
		}
		return appendParams;
	},
	createTable : function(vipId, tradeType) {
		var appendParams = this.getCondi();
		var getTimestamp = new Date().getTime();
		var list_url = "/trade/list?accountType=3&accountId=" + vipId
				+ "&timeStamp=" + getTimestamp + "&tradeType=" + tradeType
				+ appendParams;
		var aj = $.ajax({
			url : list_url,
			contentType : 'application/json',
			type : 'get',
			success : function(data) {
				if (data.code == 0) {
					comJs.getTable(data.data.items);
				} else {
					alert(data.message);
				}
			},
			error : function() {
				// view("异常！");
				alert("异常！");
			}
		});
	}
}