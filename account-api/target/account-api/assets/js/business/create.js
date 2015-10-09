var businessCreateJs = {
		
		/**
		 * 提交新建
		 */
		commit : function() {
			if(!validJs.triggerValid()){
				return;
			}
			var url_create = "/business/create";
			var fData = businessCommonJs.getCommitData();
			var aj = $.ajax({
				url : url_create,
				type : 'post',
				contentType : "application/json",
				dataType : 'json',
				data : JSON.stringify(fData),
				success : function(data) {
					if (data.code == 0) {
						alert("创建成功",2);
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
		/**
		 * 如果是从集团下属商家跳过来的页面，对group限定住
		 */
		limitGroupName : function(groupId,groupName){
			$button = $("#groupId");
			$button.attr("menu-value",groupId);
			$button.attr("menu-text",groupName);
			$button.html(groupName+'<span class="caret"> </span>');
			$("#shenqi").attr("disabled",true);
		},
		/**
		 * 弹出vip modal
		 */
		getCreateVIPModal : function(){
			$("#myModal").attr("data-businessId",$("#businessId").val());
			$("#myModal").attr("data-mobile",$("#telephone").val());
			$("#myModal").modal({
			    remote: "/views/template/business/vip_modal.jsp"
			});
		},		
	}