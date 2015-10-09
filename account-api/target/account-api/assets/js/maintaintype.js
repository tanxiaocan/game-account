/**
 * 保养项目设置JS
 */
var maintaintype = {
	/**
	 * 新增模态框
	 */
	addModelDialog : function() {
		$('#myModal').modal('show');
	},

	/**
	 * 选择数字到文字的转换
	 * 
	 * @param isSelect
	 * @returns {String}
	 */
	isSelectTransfer : function(isSelect) {
		if (isSelect == 1)
			return "必选";
		return "非必选";
	},

	/**
	 * 删除操作列
	 * 
	 * @param id
	 * @returns {String}
	 */
	deleteTransfer : function(id) {
		return "<a onclick='maintaintype.deleteById(" + id + ")' style='cursor:pointer'>删除</a>";
	},

	/**
	 * 根据条件进行查询
	 */
	getByCondi : function() {
		var condi = {};
		var type = $("#type").attr("menu-value");
		var itemName = $("#maintainTypeName").val();
		if (itemName != "")
			condi.itemName = itemName;
		if (type != "" && type != "-1")
			condi.type = parseInt(type);

		comJs.setParams(condi);
		getClickPage(1)
	},

	/**
	 * 根据Id删除
	 * 
	 * @param id
	 */
	deleteById : function(id) {
		if(confirm("确定要删除吗？"))
		{
			var condi = {
					"id" : id
				};
				var url = "/maintain_type/delete";
				$.post(url, condi, function(data, status) {
					if (status == "success") {
						alert("删除成功");
						maintaintype.getByCondi();
					} else {
						alert("未知错误")
					}
				});
		}
	},

	/**
	 * 新增
	 */
	add : function() {
		var itemName = $("#maintainTypeName4Add").val();
		if (itemName == "") {
			alert("保养项目不能为空");
			return;
		}
		var type = $("#type4Add").attr("menu-value");
		if (type == "" || type == -1) {
			alert("请选择类型");
			return;
		}
		var isSelect = $('#isSelectCheckBox').prop('checked') ? 1 : 0;

		var condi = {
			"itemName" : itemName,
			"type" : type,
			"isSelect" : isSelect
		};
		var aj = $.ajax({
			url : "/maintain_type/add",
			type : "POST",
			dataType : "json",
			contentType : "application/json",
			data : JSON.stringify(condi),
			success : function(data) {
				if (data.code == 0) {
					alert("添加成功");
					$("#maintainTypeName4Add").val("");
					$('#isSelectCheckBox').attr("checked", false);
					maintaintype.getByCondi();
					$('#cancelButton').click();
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