/**
 * 集团JS
 */

/**
 * 绘制表格时，记录当前集团ID和名称，用于设置下属商家跳转参数
 */
var currentGroupId = "";
var currentGroupName = "";

var group = {
	/**
	 * 根据条件进行查询
	 * 
	 * @param pageNo
	 */
	getByCondi : function(pageNo) {
		var time = $('#reservation').val();
		var startDate = "";
		var endDate = "";

		if (time != null && time != "") {
			startDate = time.split("-")[0].split("/")[2].substring(0, 4) + "-"
					+ time.split("-")[0].split("/")[0] + "-"
					+ time.split("-")[0].split("/")[1];
			endDate = time.split("-")[1].split("/")[2] + "-"
					+ time.split("-")[1].split("/")[0].substring(1, 3) + "-"
					+ time.split("-")[1].split("/")[1];
		}

		var city = $("#query-groupcity").attr("menu-value");
		if (city == "" || city == "全部") {
			city = "";
		}

		var status = $("#query-groupstatus").attr("menu-value");
		if (status == "" || status == "-1") {
			status = "";
		}

		var condi = {
			"groupId" : $("#groupId").val(),
			"groupName" : $("#groupName").val(),
			"mobile" : $("#mobile").val(),
			"startTime" : startDate,
			"endTime" : endDate,
			"city" : city,
			"status" : status
		};

		comJs.setParams(condi);
		getClickPage(1);
	},

	/**
	 * 获取表单所有属性
	 * 
	 * @returns {___anonymous1364_1999}
	 */
	getAllFields : function() {
		var city = $("#city").attr("menu-value");
		var payType = parseInt($("#payType").attr("menu-value"));
		var payMethod = parseInt($("#payMethod").attr("menu-value"));
		// var allowanceType = parseInt($("#allowanceType").attr("menu-value"));
		var settleType = parseInt($("#settleType").attr("menu-value"));

		var condi = {
			"groupName" : $("#groupName").val(),
			"city" : city,
			"email" : $("#email").val(),
			"address" : $("#address").val(),
			"postcode" : $("#postcode").val(),
			"contactor" : $("#contactor").val(),
			"mobile" : $("#mobile").val(),
			"payType" : payType,
			"payMethod" : payMethod,
			// "allowanceType" : allowanceType,
			"settleType" : 0,
			"vipId" : $("#vipId").val(),
			"vipTelephone" : $("#vipTelephone").val(),
			"weixinId" : $("#weixinid").val(),
			"weixinName" : $("#weixinname").val(),
			"alipayId" : $("#alipayid").val(),
			"alipayName" : $("#alipayname").val(),
			"salerMobile" : $("#salermobile").val(),
			"salerName" : $("#salername").val()
		};
		return condi;
	},

	/**
	 * 添加集团
	 */
	addGroup : function() {
		if (!validJs.triggerValid()) {
			return;
		}
		var addUrl = "/group/create";
		var condi = group.getAllFields();
		
		if(condi.city === '全部'){
			alert("城市不能选择全部");
			return;
		}

		var aj = $.ajax({
			url : addUrl,
			type : "POST",
			dataType : "json",
			contentType : "application/json",
			data : JSON.stringify(condi),
			success : function(data) {
				if (data.code == 0) {
					alert("添加成功");
					window.history.back(-1);
				} else {
					alert(data.message);
				}
			},
			error : function() {
				alert("异常！");
			}
		});
	},

	/**
	 * 根据集团ID进行更新
	 */
	updateGroup : function() {
		if (!validJs.triggerValid()) {
			return;
		}
		var updateUrl = "/group/updateByGroupId";
		var condi = group.getAllFields();
		condi.groupId = $("#groupId").val();
		condi.vipId = $("#vipId").val();

		if(condi.city === '全部'){
			alert("城市不能选择全部");
			return;
		}
		
		if(condi.payType === -1){
			alert("请选择结算方式");
			return;
		}
		if(condi.payMethod == -1){
			alert("请选择付费方式 ");
			return;
		}		
		
		var aj = $.ajax({
			url : updateUrl,
			type : "POST",
			dataType : "json",
			contentType : "application/json",
			data : JSON.stringify(condi),
			success : function(data) {
				if (data.code == 0) {
					alert("更新成功");
					window.history.back(-1);
				} else {
					alert(data.message);
				}
			},
			error : function() {
				alert("异常！");
			}
		});
	},

	/**
	 * 重置按钮
	 */
	resetGroup : function() {
		$("#groupName").val("");
		// city,
		$("#email").val("");
		$("#address").val("");
		$("#postcode").val("");
		$("#contactor").val("");
		$("#mobile").val("");
		// "payType" : payType,
		// "payMethod" : payMethod,
		// "allowanceType" : allowanceType,
		// "settleType" : settleType,
		$("#vipId").val("");
		$("#vipTelephone").val("");
		$("#weixinid").val("");
		$("#weixinname").val("");
		$("#alipayid").val("");
		$("#alipayname").val("");
		$("#salername").val("");
		$("#salermobile").val("");
	},

	/**
	 * 禁用集团所有表单域
	 */
	disableGroup : function() {
		$("#groupName").attr('readonly', true);
		// city,
		$("#email").attr('readonly', true);
		$("#address").attr('readonly', true);
		$("#postcode").attr('readonly', true);
		$("#contactor").attr('readonly', true);
		$("#mobile").attr('readonly', true);
		$("#vipId").attr('readonly', true);
		$("#vipTelephone").attr('readonly', true);
		// "payType" : payType,
		// "payMethod" : payMethod,
		// "allowanceType" : allowanceType,
		// "settleType" : settleType,
		$("#weixinid").attr('readonly', true);
		$("#weixinname").attr('readonly', true);
		$("#alipayid").attr('readonly', true);
		$("#alipayname").attr('readonly', true);
		$("#salername").attr('readonly', true);
		$("#salermobile").attr('readonly', true);
		$("#updateButton").attr({
			"disabled" : true
		});
	},

	/**
	 * 激活集团所有表单域
	 */
	activeGroup : function() {
		$("#groupName").attr('readonly', false);
		// city,
		$("#email").attr('readonly', false);
		$("#address").attr('readonly', false);
		$("#postcode").attr('readonly', false);
		$("#contactor").attr('readonly', false);
		$("#mobile").attr('readonly', false);
		// "payType" : payType,
		// "payMethod" : payMethod,
		// "allowanceType" : allowanceType,
		// "settleType" : settleType,
		$("#vipId").attr('readonly', false);
		$("#weixinid").attr('readonly', false);
		$("#weixinname").attr('readonly', false);
		$("#alipayid").attr('readonly', false);
		$("#alipayname").attr('readonly', false);
		$("#salername").attr('readonly', false);
		$("#salermobile").attr('readonly', false);
		$("#vipId").attr('readonly', false);
		$("#vipTelephone").attr('readonly', false);
		$("#updateButton").attr({
			"disabled" : false
		});
		$("#resetButton").attr({
			"disabled" : false
		});
	},

	/**
	 * 设置跳转到集团下属商家onclick事件
	 * 
	 * @param num
	 * @returns {String}
	 */
	businesses : function(num) {
		return "<a onclick='group.tranferToBusiness(\"" + currentGroupId
				+ "\",\"" + currentGroupName + "\")'>" + num + "家</a>";
	},
	/**
	 * 跳转至下属集团
	 */
	tranferToBusiness : function(groupId, groupName) {
		window.location.href = "/group/belongBusiness?groupId=" + groupId
				+ "&groupName=" + groupName;
	},
	/**
	 * 绘制表格时记录当前集团ID
	 * 
	 * @param groupId
	 * @returns
	 */
	setCurrentGroupId : function(groupId) {
		currentGroupId = groupId;
		return groupId;
	},
	/**
	 * 绘制表格时记录当前集团名称
	 * 
	 * @param groupName
	 * @returns
	 */
	setCurrentGroupName : function(groupName) {
		currentGroupName = groupName;
		return groupName;
	},

	/**
	 * 若VIP没有设置，则展示位空
	 * 
	 * @param vipid
	 * @returns
	 */
	vipFormat : function(vipid) {
		if (vipid === "null") {
			return "";
		}
		return vipid;
	},

	/**
	 * 创建VIP
	 */
	getCreateVIPModal : function() {
		$("#myModal").attr("data-businessId", $("#groupId").val());
		$("#myModal").attr("data-mobile", $("#mobile").val());
		$("#myModal").modal({
			remote : "/views/template/business/vip_modal.jsp"
		});
	},
}