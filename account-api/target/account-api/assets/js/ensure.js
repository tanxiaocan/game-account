/**
 * 承诺保证JS
 */

var ensure = {
	/**
	 * 状态转换
	 * 
	 * @param isSelect
	 * @returns {String}
	 */
	isSelectTransfer : function(isSelect) {
		if (isSelect === "true") {
			return "是";
		}
		return "否";
	},

	/**
	 * 删除转换
	 * 
	 * @param id
	 * @returns {String}
	 */
	deleteTransfer : function(id) {
		return "<a onclick='ensure.deleteById(" + id + ")' style='cursor:pointer'>删除</a>";
	},

	/**
	 * 根据ID删除
	 * 
	 * @param id
	 */
	deleteById : function(id) {
		
		if(confirm("确定要删除吗？"))
		{
			var condi = {
					"id" : id
				};
				var url = "/ensure/delete";
				$.post(url, condi, function(data, status) {
					if (status == "success") {
						alert("删除成功");
						comJs.setParams(condi);
						getClickPage(1);
					} else {
						alert("未知错误")
					}
				});
		}
		
	},

	/**
	 * 新增模态框
	 */
	addModelDialog : function() {
		$('#myModal').modal('show');
	},

	/**
	 * 添加新的承诺
	 */
	addEnsure : function() {
		var isSelect = $('#isSelectCheckBox').prop('checked');
		var name = $("#ensureName4Add").val();
		var description = $('#content').val();
		
		if(name == ""){
			alert("标签不能为空");
			return;
		}
		if(description == ""){
			alert("内容不能为空");
			return;
		}

		var condi = {
			"name" : name,
			"description" : description,
			"isSelect" : isSelect
		};
		var aj = $.ajax({
			url : "/ensure/create",
			type : "POST",
			dataType : "json",
			contentType : "application/json",
			data : JSON.stringify(condi),
			success : function(data) {
				if (data.code == 0) {
					alert("添加成功");
					$("#ensureName4Add").val("");
					$('#content').val("");
					$('#isSelectCheckBox').attr("checked", false);
					comJs.setParams(condi);
					getClickPage(1);
					$('#cancelButton').click()
				} else {
					alert(data.message);
				}
			},
			error : function() {
				alert("异常！");
			}
		});
	}
}