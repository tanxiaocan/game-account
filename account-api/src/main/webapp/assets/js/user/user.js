var userJs = {
	addBattleSession : function() {
		var userIds="";
		var userNames="";
		var trs = $("#com_tbody").children();
		
		$(trs).each(function(){
			var tds = $(this).children();
			var status = $(tds[3]).html();
			if(status=="参战"){
				userIds += $(tds[0]).html()+",";
				userNames += $(tds[1]).html()+",";
			}
		});
		if(userIds==""){
			alert("请先激活用户!");
			return;
		}
		userIds = userIds.substr(0,userIds.length-1);
		userNames = userNames.substr(0,userNames.length-1);		
		var modalText = "确认"+userNames+"参战?";
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
				var fmData = new Object();
				fmData.users = userIds;
				userJs.addBattleSessionCommit(fmData);
			},
			cancle : function() {
				return;
			}
		});

	},
	
	addBattleSessionCommit : function(fmData){
		var url_add = "/battleSession/add";
		var aj = $.ajax({
			url : url_add,
			type : 'post',
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(fmData),
			success : function(data) {
				if (data.code == 0) {
					alert("创建对战成功");
					userJs.goBattleSessionView(data.data);
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
	
	goBattleSessionView : function(battleSessionId){
		window.location.href = "/battleSession/view?battleSessionId="+battleSessionId;
	},
	
	updateStatus : function(aTab) {
		var tds = aTab.parent().parent().children();
		var userId = $(tds[0]).html();
		var status = $(aTab.parent().prev()).html();
		if (status == "参战") {
			status = 1;
		} else {
			status = 0;
		}
		if (userId == null) {
			alert("userId NOT NULL");
			return;
		}
		var fmData = new Object();
		fmData.id = userId;
		fmData.status = status;
		var url_update = "/user/modify";
		var aj = $.ajax({
			url : url_update,
			type : 'post',
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(fmData),
			success : function(data) {
				if (data.code == 0) {
					alert("修改成功", 1);
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
	statusFormat : function(status) {
		if (status == 1)
			return "休眠";
		return "参战";
	},

	addUser : function() {
		if (!validJs.triggerValid()) {
			return;
		}
		var fmData = new Object();
		fmData.name = $("#create-name").val();
		fmData.alias = $("#create-alias").val();
		var url_create = "/user/add";
		var aj = $.ajax({
			url : url_create,
			type : 'post',
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(fmData),
			success : function(data) {
				if (data.code == 0) {
					alert("创建成功", 1);
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