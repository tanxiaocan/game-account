/**
 * shuang.xiao
 */

$(function() {
	updateLogo.init();
});

var updateLogo = {
	init : function() {
		var me = updateLogo;
		me.renderBody();
		$("#logo_buttom").click(me.saveLogo);
		$("#label_buttom").click(me.saveLabel);
		$("#ensure_buttom").click(me.saveEnsure);
		$("#images_buttom").click(me.saveImage);
		$(document).on("click",".delete_image",me.deleteBusinessImage);
		$(document).on("click",".edit_image",me.editBusinessImage);
	},
	
	editBusinessImage : function(){
		var url = "/businessImg/update";
		var parm = {
			businessId : $(this).attr("business_id"),
			id : $(this).attr("image_id"),
			title : $(this).parent().parent().find(".image_title").val(),
			description : $(this).parent().parent().find(".image_description").val(),
			orderNo :$(this).parent().parent().find(".image_orderNo").val()
		}
		$.post(url, parm, function(result) {
			if (!result.code) {
				alert("编辑成功！");
				updateLogo.renderImages();
			} else {
				alert(result.message);
			}
		})
	},

	deleteBusinessImage : function(){
		var me = updateLogo;
		if(confirm("确定要删除吗？"))
		 {
			var url = "/businessImg/delete";
			var parm = {
				businessId : $(this).attr("business_id"),
				id : $(this).attr("image_id")
			}
			$.post(url, parm, function(result) {
				if (!result.code) {
					alert("删除成功！");
					me.renderImages();
				} else {
					alert(result.message);
				}
			})
		 }
	},
	
	renderBody : function() {
		var me = updateLogo;
		me.renderAllEnsure();
		me.renderLogoAndEnsure();
		me.renderLabel();
		me.renderImages();
	},

	renderAllEnsure : function() {
		var url = "/ensure/getList";
		$.get(url, function(result) {
			if (!result.code) {
				if (result.data) {
					var data = result.data;
					var info = "";
					$.each(data, function(index, entity) {
						info += '<div class="checkbox"><label> <input id="ensure'
								+ entity.id + '" type="checkbox" value=""'; 
						if(entity.isSelect){
							info += 'checked = "true" disabled';
						}
						info += '>' + entity.name + '</label></div>';
					});
					$("#ensure_id").empty();
					$("#ensure_id").append(info);
				}
			}
		})
	},

	renderLogoAndEnsure : function() {
		var url = "/business/getExtraById?businessId=" + $("#businessId").val();
		$.get(url, function(result) {
			if (!result.code) {
				if (result.data) {
					var data = result.data;
					$("#busi_logo_image").attr("src", data.logoUrl);
					var ensureList = data.ensureList;
					$.each(ensureList, function(index, ensure) {
						jid = '#ensure' + ensure.id;
						$(jid)[0].checked = true;
					});
				}
			}
		})
	},

	renderLabel : function() {
		var url = "/businessLabel/getListByBusinessId?businessId="
				+ $("#businessId").val();
		$.get(url, function(result) {
			if (result.code == 0) {
				if (result.data) {
					var data = result.data;
					$("#business_label0").val(data[0].content);
					$("#business_label1").val(data[1].content);
					$("#business_label2").val(data[2].content);
				}
			}
		})
	},

	renderImages : function() {
		var url = "/businessImg/getListByBusinessId?businessId=" + $("#businessId").val();
		$.get(url, function(result) {
			if (!result.code) {
				if (result.data) {
					var data = result.data;
					var info="";
					$.each(data, function(index, entity) {
						info +='<tr> \
							<td><img src="'+entity.url+'" alt="商家宣传图片" class="img-thumbnail"  /></td> \
							<td> \
							<div class="form-group">  \
							<label for="images_title_'+index+'">标题</label> \
							<input type="text" class="form-control image_title" id="images_title_'+index+'" placeholder="" value="'+entity.title+'"> \
							</div> \
							<div class="form-group"> \
							<label for="images_desc_'+index+'">描述</label> \
							<input type="text" class="form-control image_description" id="images_desc_'+index+'" placeholder="" value="'+entity.description+'"> \
							</div> \
							<div class="form-group">  \
							<label for="images_order_'+index+'">顺序</label> \
							<input type="text" class="form-control image_orderNo" id="images_order_'+index+'" placeholder="" value="'+entity.orderNo+'"> \
							</div> \
							<div class="form-group">  \
							<input class="btn btn-success edit_image" type="button" image_id='+entity.id+' business_id='+entity.businessId+' value="编辑"> \
							<input class="btn btn-warning delete_image" type="button" image_id='+entity.id+' business_id='+entity.businessId+' value="删除"> \
							</div>  \
							</td>	\
							</tr>';
					});
					
					$("#images_id").empty();
					$("#images_id").append(info);
				}
			}
		})
	},

	saveLogo : function() {
		
		if(!$("#logofile").val()){
			alert("请选择上传文件！");
			return;
		}
		
		var uploadImage = {
			businessId : $("#businessId").val()
		}
		var url = "/business/upload/logo";

		$
				.ajaxFileUpload({
					url : url,
					secureuri : false,
					data : uploadImage,
					fileElementId : [ "logofile" ],
					dataType : 'text',
					success : function(data, status) {
						if (data.indexOf("success") > 0) {
							var url;
							if(data.split('"data":"')[1] && data.split('"data":"')[1].split('","')[0]){
								url = data.split('"data":"')[1].split('","')[0];
								$("#logo_image_div")
								.html(
										'<img src="'
												+ url
												+ '" alt="商家logo" id="busi_logo_image" class="img-thumbnail" />');
							}

							alert("添加成功");
						} else {
							alert(data.split('"message":"')[1].split('","')[0]);
						}
					},
					error : function(data) {
						alert("上传失败");
					}
				});

	},
	
	saveImage : function() {
		if(!($("#imageTitle").val() && $("#imageDesc").val())){
			alert("请填写标题，描述");
			return;
		}
		if(!$("#imagesfile").val()){
			alert("请选择上传文件！");
			return;
		}
		
		var me=updateLogo;
		var uploadImage = {
				businessId : $("#businessId").val(),
				imageTitle : $("#imageTitle").val(),
				imageDesc : $("#imageDesc").val()
		}
		var url = "/businessImg/create";

		$
				.ajaxFileUpload({
					url : url,
					secureuri : false,
					data : uploadImage,
					fileElementId : [ "imagesfile" ],
					dataType : 'text',
					success : function(data, status) {
						if (data.indexOf("success") > 0) {
							me.renderImages();
							alert("添加成功");
						} else {
							alert(data.split('"message":"')[1].split('","')[0]);
						}
					},
					error : function(data) {
						alert("上传失败");
					}
				});

	},

	saveLabel : function() {
		if(!validJs.triggerValid()){
			return;
		}
		var url = "/businessLabel/update";
		var parm = {
			businessId : $("#businessId").val(),
			label0 : $("#business_label0").val(),
			label1 : $("#business_label1").val(),
			label2 : $("#business_label2").val()
		}
		$.post(url, parm, function(result) {
			if (!result.code) {
				alert("保存成功！");
			} else {
				alert(result.message);
			}
		})
	},

	saveEnsure : function() {
		var url = "/business/extra/update";
		var ensurestr = "";
		$("#ensure_id :checkbox").each(function() {
			if ($(this)[0].checked) {
				var ensureId = $(this).attr("id").substring(6);
				ensurestr += ensureId + ","
			}
		});

		var parm = {
			businessId : $("#businessId").val(),
			ensure : ensurestr
		}
		$.post(url, parm, function(result) {
			if (!result.code) {
				alert("保存成功！");
			} else {
				alert(result.message);
			}
		})
	}

}