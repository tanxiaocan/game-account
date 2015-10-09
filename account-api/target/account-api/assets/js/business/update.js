var businessUpdateJs = {
	/**
	 * 初始化集团和付款账户
	 */
	initGroupAndSettle : function(){
		var groupId = $("#group").attr('menu-value');
		if(groupId!=""){
			$("#forbid-settle").attr("disabled", null);
			$("#vip-apply").attr("disabled","disabled");
			$("#vipId").attr("readonly","readonly");
			$("#vipTelephone").attr("readonly","readonly");
		}
	},
	getInit : function(businessId) {
		businessUpdateJs.getBusinessById(businessId);
	},
	startEdit : function() {
		$(".shenqi").attr("disabled", null);
		$(".update-ensure").attr("disabled", null);
	},
	/**
	 * init left-right options
	 */
	getOptionsInit : function(data) {
		businessCommonJs.getOptionsInit();
		var $selectSrc = $("#sltSrc-service"); // 取出"开通服务"左侧selection
		var $selectTarget = $("#sltTarget-service"); // 取出"开通服务"右侧selection
		businessCommonJs.setRightOptions(data["openService"], $selectSrc,
				$selectTarget);
		$selectSrc = $("#sltSrc-city"); // 取出"开通city"左侧selection
		$selectTarget = $("#sltTarget-city"); // 取出"开通city"右侧selection
		businessCommonJs.setRightOptions(data["openCity"], $selectSrc,
				$selectTarget);
		businessCommonJs.showSelectOptions("-city");
		businessCommonJs.showSelectOptions("-service");
	},

	getBusinessById : function(businessId) {
		var url_getDetail = "/business/getById?businessId=" + businessId;
		var aj = $.ajax({
			url : url_getDetail,
			type : 'get',
			contentType : "application/json",
			dataType : 'json',
			success : function(data) {
				if (data.code == 0) {
					businessUpdateJs.constructFormAndDropMenu(data.data);
					businessUpdateJs.getOptionsInit(data.data);
					// 设置group单机事件
					businessCommonJs.setGroupOnclick();
					// 设置结算账户单击事件
					businessCommonJs.setSettleOnclick();
					//初始化集团和付款账户下拉框关联关系
					businessUpdateJs.initGroupAndSettle();
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

	constructFormAndDropMenu : function(data) {
		var $inputs = $("input.form-control");
		$inputs.each(function() {
			var key = $(this).attr("name");
			$(this).val(data[key]);
		});

		$("#poiSet").val(data["longitude"] + "," + data["latitude"]);
		if (data["status"] == 0) {
			$("#status").val("禁用")
		} else {
			$("#status").val("正常");
		}
		comJs.createDropDownMenu();// set common dropmenu
		businessCommonJs.setSettleMenu();// set settleMenu
		var menus = $(".myDrop");// get all dropmenu
		menus.each(function() {
			var buttonObj = $(this).prev();// get button pre of menu
			var fi_key = $(buttonObj).attr("id");// get id of button,this id
													// is the field of bean
			var select_text = "";// selected menu-text
			var detail_val = data[fi_key];// current record filed value
			var lis = $(this).children();// get li tag of current menu(ul)
			$(lis).each(function() {
				var thisValue = $(this).children().attr("attrId");// get <a>
																	// attrId
																	// value
				if (thisValue == detail_val) {// if this li's attrId value is
												// the same to current
												// filed,this li is selected
					select_text = $(this).text();
					$(buttonObj).attr("menu-text", select_text);// set the attr
																// 'menu-text'
																// of this
																// button
					$(buttonObj).attr("menu-value", thisValue);
					select_text += '<span class="caret"> </span>';// construct
																	// button
																	// text
					$(buttonObj).html(select_text);
				}
			});
		});
		// businessUpdateJs.createDropDownMenu(data);
		// businessUpdateJs.setSettleMenu(data);
	},
	commit : function() {
		if (!validJs.triggerValid()) {
			return;
		}
		var url_create = "/business/update";
		var fData = businessCommonJs.getCommitData();
		var aj = $.ajax({
			url : url_create,
			type : 'post',
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(fData),
			success : function(data) {
				if (data.code == 0) {
					alert("更新成功",1);
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
	getCreateVIPModal : function() {
		$("#myModal").attr("data-businessId", $("#businessId").val());
		$("#myModal").attr("data-mobile", $("#telephone").val());
		$("#myModal").modal({
			remote : "/views/template/business/vip_modal.jsp"
		});
	},
}