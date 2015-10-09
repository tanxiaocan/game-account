/**
 * 重写common.js的getClickPage方法
 */
var params_list;
var BUSINESSID;
var getClickPage = function(pageNo) {
	$(".commitPanel ").empty();
	$(".commitPanel").append('<input id="page_table" style="display: none;">');
	$("#com_list_nav").remove();
	$("#com_list_msg").remove();
	businessCommitJs.setParams(BUSINESSID, pageNo)
	businessCommitJs.createCommitPanel();
}

var businessCommitJs = {
	doCommit : function(commitId, flag) {
		var url_commit;
		if (flag == 'delete') {
			url_commit = "/commit/delete";
		} else {
			url_commit = "/commit/approve";
		}
		var fData = {
			id : commitId
		};
		var aj = $.post(url_commit, fData, function(result) {
			if (!result.code) {
				alert("success", 1);
			} else {
				alert(result.message);
			}
		});
	},
	query : function() {
		getClickPage(null);
	},
	createCommitPanel : function() {
		var url_list = "/commit/getByCondi";
		url_list += params_list;
		var aj = $.ajax({
			url : url_list,
			contentType : 'application/json',
			type : 'get',
			success : function(data) {
				if (data.code == 0) {
					businessCommitJs.getPanel(data.data.items);
					comJs.getPage(data.data);
				} else {
					alert("create dropDownMenu error");
				}
			},
			error : function() {
				// view("异常！");
				alert("异常！");
			}
		});
	},

	setParams : function(businessId, pageIndex) {
		var params = "?timestamp=" + new Date().getTime();
		if (pageIndex != null && pageIndex != "") {
			params += "&pageIndex=" + pageIndex;
		}
		if (businessId != null && businessId != "") {
			params += "&businessId=" + businessId;
		}
		if ($("#query-mobile").val() != null && $("#query-mobile").val() != "") {
			params += "&mobile=" + $("#query-mobile").val();
		}
		if ($("#query-content").val() != null
				&& $("#query-content").val() != "") {
			params += "&content=" + $("#query-content").val();
		}
		params_list = params;
		BUSINESSID = businessId;
	},

	getPanel : function(data) {
		var $panelContent = $(".commitPanel");
		$
				.each(
						data,
						function(name, value) {
							var content = '<div class="row"><div class="col-md-12" style="padding-left: 20px"><b>';
							content += value['userName'] + '('
									+ value['mobile'] + ')';
							content += '</b></div></div>';
							content += '<div class="clearfix" style="margin-bottom: 10px;"></div>';
							content += '<div class="row"><div class="col-md-2" style="padding-left: 30px"><b>';
							content += '保养质量</b><b style="color: red">';
							content += value['bquality'] + "星";
							content += '</b></div>';
							content += '<div class="col-md-2"><b>';
							content += '服务态度</b><b style="color: red">';
							content += value['battitude'] + "星";
							content += '</b></div>';
							content += '<div class="col-md-2"><b>';
							content += '保养价格</b><b style="color: red">';
							content += value['bprice'] + "星";
							content += '</b></div>';
							content += '<div class="col-md-2"><b>';
							content += '接送速度</b><b style="color: red">';
							content += value['espeed'] + "星";
							content += '</b></div>';
							content += '<div class="col-md-2"><b>';
							content += '代驾服务</b><b style="color: red">';
							content += value['eattitude'] + "星";
							content += '</b></div></div>';
							content += '<div class="clearfix" style="margin-bottom: 10px;"></div>';
							content += '<div class="row"><div class="col-md-12" style="padding-left: 30px"><p>';
							content += value['content'];
							content += '</p></div></div>'
							content += '<div class="row"><div class="col-md-3" style="padding-left: 30px"><b>'
							content += comJs.formmatDate(value['gmtCreated']);
							content += '</b></div>';
							content += '<div class="col-md-9"><b>订单号：</b><b>';
							content += value['orderNo'];
							content += '</b></div></div>';
							content += '<div class="row"><div class="col-md-2 pull-right"><a href="javascript:businessCommitJs.doCommit('
									+ value["id"]
									+ ",'delete'"
									+ ')" style="color: red;">删除评价</a></div>';
							if (value.status == 1) {
								content += '<div class="col-md-2 pull-right"><a href="" style="color: blue;">审核通过</a></div></div><hr>';
							} else {
								content += '<div class="col-md-2 pull-right"><a href="javascript:businessCommitJs.doCommit('
										+ value["id"]
										+ ",'approve'"
										+ ')" style="color: red;">审核通过</a></div></div><hr>';
							}

							$panelContent.append(content);
						});
	}
}