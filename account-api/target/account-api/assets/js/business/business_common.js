var businessCommonJs = {

	/**
	 * 设置结算账户下拉框外围
	 * <li>标签单击事件
	 */
	setSettleOnclick : function() {
		var lis = $(".myDrop.forSettle").children();
		$(lis).click(function() {
			var settle = $(this).children().attr("attrId");
			if (settle == "1") {
				var groupId = $("#groupId").attr("menu-value");
				$.ajax({
					url : "/group/getVipByGroupId?groupId="+groupId,
					type : 'get',
					contentType : "application/json",
					dataType : 'json',
					success : function(data) {
						if (data.code == 0) {
							$("#vipId").val(data.data.vipId);
							$("#vipId").attr("readonly","readonly");
							$("#vipTelephone").val(data.data.vipTelephone);
							$("#vipTelephone").attr("readonly","readonly");
							$("#vip-apply").attr("disabled","disabled");
						} else {
							alert(data.message);
						}
					}
				});
			} else {
				$("#vipId").val("");
				$("#vipId").attr("readonly",null);
				$("#vipTelephone").val("");
				$("#vipTelephone").attr("readonly",null);
				$("#vip-apply").attr("disabled",null);
			}
		});
	},
	/**
	 * 设置集团下拉框外围
	 * <li>标签单击事件
	 */
	setGroupOnclick : function() {
		var lis = $(".myDrop.forGroup").children();
		$(lis).click(function() {
			var groupId = $(this).children().attr("attrId");
			if (groupId == "") {
				$("#forbid-settle").attr("disabled", true);
				$("#settleType").attr("menu-text", "自付");
				$("#settleType").attr("menu-value", 0);
				$("#settleType").html('自付<span class="caret"> </span>');
				$("#vipId").val("");
				$("#vipId").attr("readonly",null);
				$("#vipTelephone").val("");
				$("#vipTelephone").attr("readonly",null);
				$("#vip-apply").attr("disabled",null);
			} else {
				$("#forbid-settle").attr("disabled", null);
				var settleType = $("#settleType").attr("menu-value");
				if(settleType== '1'){
					var groupId = $("#groupId").attr("menu-value");
					$.ajax({
						url : "/group/getVipByGroupId?groupId="+groupId,
						type : 'get',
						contentType : "application/json",
						dataType : 'json',
						success : function(data) {
							if (data.code == 0) {
								$("#vipId").val(data.data.vipId);
								$("#vipId").attr("readonly","readonly");
								$("#vipTelephone").val(data.data.vipTelephone);
								$("#vipTelephone").attr("readonly","readonly");
								$("#vip-apply").attr("disabled","disabled");
							} else {
								alert(data.message);
							}
						}
					});
				}
				
			}
		});
	},
	/**
	 * 右选择框点击事件
	 * 
	 * @param actionTarget
	 */
	removeItem : function(actionTarget) {
		var sltSrc = document.getElementById('sltSrc' + actionTarget);
		var sltTarget = document.getElementById('sltTarget' + actionTarget);
		for (var i = 0; i < sltSrc.options.length; i++) {
			var tempOption = sltSrc.options[i];
			if (tempOption.selected) {
				sltSrc.removeChild(tempOption);
				sltTarget.appendChild(tempOption);
			}
		}
		businessCommonJs.showSelectOptions(actionTarget);
	},

	/**
	 * 
	 * @param actionTarget
	 */
	addItem : function(actionTarget) {
		var sltSrc = document.getElementById('sltSrc' + actionTarget);
		var sltTarget = document.getElementById('sltTarget' + actionTarget);
		for (var i = 0; i < sltTarget.options.length; i++) {
			var tempOption = sltTarget.options[i];
			if (tempOption.selected) {
				sltTarget.removeChild(tempOption);
				sltSrc.appendChild(tempOption);
			}
		}
		businessCommonJs.showSelectOptions(actionTarget);
	},
	showSelectOptions : function(actionTarget) {
		var sltTarget = document.getElementById('sltTarget' + actionTarget);
		var content = businessCommonJs.getSelectedOptionsCN(actionTarget);
		var myhtml = '<textarea readonly="readonly"  style="width: 305px" required>'
				+ content + '</textarea>';
		document.getElementById("showInfo" + actionTarget).innerHTML = myhtml;
	},
	/**
	 * 获取target选择框城市名称code，以","分隔
	 * 
	 * @param actionTarget
	 * @returns {String}
	 */
	getSelectedOptions : function(actionTarget) {
		var sltTarget = document.getElementById('sltTarget' + actionTarget);
		var result = "";
		for (var i = 0; i < sltTarget.options.length; i++) {
			result += sltTarget.options[i].value + ",";
		}
		if (result != "") {
			var end = result.lastIndexOf(",");
			result = result.substring(0, end);
		}

		return result;
	},
	/**
	 * 获取target选择框城市名称汉字展示，以","分隔
	 * 
	 * @param actionTarget
	 */
	getSelectedOptionsCN : function(actionTarget) {
		var sltTarget = document.getElementById('sltTarget' + actionTarget);
		var result = "";
		for (var i = 0; i < sltTarget.options.length; i++) {
			result += sltTarget.options[i].text + ",";
		}
		if (result != "") {
			var end = result.lastIndexOf(",");
			result = result.substring(0, end);
		}

		return result;
	},
	/**
	 * 初始化左右选择框
	 */
	getOptionsInit : function() {
		var url = "";
		var $select = "";
		url = "/business/service/getAll";
		$select = $("#sltSrc-service");
		businessCommonJs.getOptionsSupport(url, $select);
		url = "/city/get_all";
		$select = $("#sltSrc-city");
		businessCommonJs.getOptionsSupport(url, $select);
	},
	getOptionsSupport : function(url_list, $select) {
		var aj = $.ajax({
			url : url_list,
			type : 'get',
			async : false, // 设置为同步
			contentType : "application/json",
			dataType : 'json',
			success : function(data) {
				if (data.code == 0) {
					businessCommonJs.setLeftOptions(data.data, $select);
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
	 * set left options
	 * 
	 * @param data
	 * @param $select
	 */
	setLeftOptions : function(data, $select) {
		var options = "";
		$.each(data, function(name, value) {
			if (value["id"] != null) {
				if (value["code"] != null) {
					value["id"] = value["code"];
				}
				if (value["name"] == null) {
					value["name"] = value["serviceName"];
				}
				options += '<option value="' + value["id"] + '">'
						+ value["name"] + '</option>';
			}
		});
		$select.append(options);
	},
	/**
	 * 设置右方options
	 * 
	 * @param data
	 * @param $selectSrc
	 * @param $selectSource
	 */
	setRightOptions : function(data, $selectSrc, $selectSource) {
		if (data != null && data != "") {
			var codes = data.split(",");
			$.each(codes, function(n, value) {
				var srcOptions = $selectSrc.children();
				srcOptions.each(function() {
					var srcVal = $(this).val();
					var selectionHtml = $(this).prop('outerHTML')
					if (value == srcVal) {
						$selectSource.append(selectionHtml);
						$(this).remove();
					}
				});
			});
		}
	},
	/**
	 * 结算方式下拉框构建
	 */
	setSettleMenu : function() {
		var url = "/business/settle/getInfo";
		var aj = $.ajax({
			url : url,
			type : 'get',
			async : false,// 设置为同步请求
			contentType : "application/json",
			dataType : 'json',
			success : function(data) {
				if (data.code == 0) {
					businessCommonJs.setSettleSupport(data.data);
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
	setSettleSupport : function(data) {
		var $menu = $("#payType").next();
		businessCommonJs.createDropForSettle(data.payType, $menu);
		$menu = $("#payMethod").next();
		businessCommonJs.createDropForSettle(data.payMethod, $menu);
		// $menu = $("#settleType").next();
		// businessCommonJs.createDropForSettle(data.settleType, $menu);
	},
	createDropForSettle : function(data, $menu) {
		var liTabs = "";
		$.each(data, function(name, value) {
			liTabs += '<li><a onclick="comJs.menuOnclick(this)" attrId='
					+ value["id"] + '>' + value["name"] + '</a></li>';
		});
		$menu.append(liTabs);
	},
	/**
	 * 获取新增或者更新时的所有数据
	 * 
	 * @returns {___anonymous5796_5800}
	 */
	getCommitData : function() {
		var fData = $(".form-control").serializeJSON();
		fData.status = null;
		fData.onlineStatus = $("#onlineStatus").attr("menu-value");
		fData.businessType = $("#businessType").attr("menu-value");
		fData.city = $("#city").attr("menu-value");
		fData.longitude = $("#poiSet").val().split(",")[0];
		fData.latitude = $("#poiSet").val().split(",")[1];
		fData.groupId = $("#groupId").attr("menu-value");
		fData.payType = $("#payType").attr("menu-value");
		fData.payMethod = $("#payMethod").attr("menu-value");
		fData.settleType = $("#settleType").attr("menu-value");
		fData.allowanceType = $("#allowanceType").attr("menu-value");
		fData.openBeginTime = $("#openBeginTime").attr("menu-value");
		fData.openEndTime = $("#openEndTime").attr("menu-value");
		fData.openCity = businessCommonJs.getSelectedOptions("-city");
		fData.openService = businessCommonJs.getSelectedOptions("-service");
		return fData;
	}

}