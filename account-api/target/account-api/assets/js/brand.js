/**
 * 品牌JS
 */

$(function() {
	brand.init();
});

/**
 * 保存当前选择的品牌名称，用于编辑和删除
 */
var currentBrandName = "";
var currentBrandId = "";

var brand = {
	init : function() {
		var me = brand;
		$(document).on("click", "#brand_create_buttom", me.saveBrand);
		$(document).on("click", ".deleteCarMaker", me.deleteCarType);
	},

	// 删除车系
	deleteCarType : function() {
		var me = brand;
		var carMakerId = $(this).attr("carmaker_id");
		var brandId = $(this).attr("_brandId");
		var carTypeIds = "";
		$(this).parent().find(':checkbox').each(function() {
			if ($(this)[0].checked) {
				carTypeIds += $(this).val() + ","
			}
		});

		if (carTypeIds === "") {
			alert("请选择需删除的车系");
			return false;
		}

		var delete_url = "/carType/delete";
		var fData = {
			carMakerId : carMakerId,
			ids : carTypeIds
		};

		if (confirm("确定要删除这些车系吗？")) {
			$.post(delete_url, fData, function(result) {
				if (!result.code) {
					me.getBrandDetails(brandId);
					alert("删除成功！");
				} else {
					alert(result.message);
				}
			})
		}
		return false;
	},

	// 新建品牌
	saveBrand : function() {
		var me = brand;
		var re = new RegExp("[a-z0-9A-Z_]");
		var brandName = $("#brandName").val();
		var brandNameZn = $("#brandNameZn").val();
		if (!brandName) {
			alert("请填写品牌名称");
			return;
		}
		if (!brandNameZn || !re.test(brandNameZn)) {
			alert("请填写品牌名称拼音")
			return;
		}
		if (!$("#brandLogofile").val()) {
			alert("请选择上传文件");
			return;
		}

		var uploadImage = {
			brandName : brandName,
			brandNameZn : brandNameZn
		}
		var url = "/brand/create";
		$.ajaxFileUpload({
			url : url,
			secureuri : false,
			data : uploadImage,
			fileElementId : [ "brandLogofile" ],
			dataType : 'text',
			success : function(data, status) {
				if (data.indexOf("success") > 0) {
					//me.loadBrandData();
					alert("添加成功");
					$('#myModal').modal('hide');
					location.reload();
				} else {
					alert(data.split('"message":"')[1].split('","')[0]);
				}
			},
			error : function(data) {
				alert("上传失败");
			}
		});
	},

	/**
	 * 构造品牌树状菜单
	 */
	loadBrandData : function() {
		var aj = $.ajax({
			url : "/brand/getBrandGroup",
			type : "GET",
			dataType : "json",
			async : false,
			contentType : "application/json",
			success : function(data) {
				if (data.code == 0) {
					itemList = brand.tranferDataForItemList(data);
					$('#tree1').tree({
						data : itemList,
						autoOpen : true,
						dragAndDrop : true
					});
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
	 * 将服务端获取的数据进行组合，构造成符合树状菜单的数据格式
	 * 
	 * @param data
	 * @returns {Array}
	 */
	tranferDataForItemList : function(data) {
		var itemList = [];
		$.each(data.data, function(key, values) {
			var item = {};
			var childreList = [];
			item.label = key;
			$(values).each(function(key, value) {
				childreList.push({
					"id" : value.id,
					"label" : value.name
				});
			});
			item.children = childreList;
			itemList.push(item);
		});
		return itemList;
	},

	/**
	 * 绑定单击事件
	 */
	clickEvent : function() {
		$("#tree1 .makerdiv").bind(
				'click',
				function(event) {
					var eventNodeName = event.target.innerText;
					var eventNodeValue = $(this).attr("nodeId");
					if (!event.target.classList.contains("jqtree-title-folder")
							&& !event.target.classList
									.contains("jqtree-toggler")
							&& event.target.childNodes.length != 2) {
						currentBrandName = eventNodeName;
						currentBrandId = eventNodeValue;
						brand.getBrandDetails(currentBrandId);
					}
				});
	},
	getBrandDetails : function(brandId) {
		var aj = $.ajax({
			url : "/brand/getBrandsById?id=" + brandId,
			type : "GET",
			dataType : "json",
			contentType : "application/json",
			success : function(data) {
				if (data.code == 0) {
					brand.drawBrandDetails(data.data);
				} else {
					alert(data.message);
				}
			},
			error : function() {
				alert("异常！");
			}
		});
	},
	drawBrandDetails : function(data) {
		var $panelContent = $(".commitPanel");
		$panelContent.empty();
		var content = '<div class="row" style="color: blue; margin-bottom: 10px;">'
		content += '<div class="col-md-3" style="padding-left: 30px; margin-top: 10px;"><img src="'
				+ data.url + '" alt="品牌LOGO" class="img-thumbnail"></div>'
		content += '<div class="col-md-3" style="padding-left: 30px; color: red; margin-top: 10px;"><H1 style="font-size: 30px;">'
				+ data.name + '</H1></div>'
		content += '<div class="col-md-6" style="padding-left: 30px; color: red; margin-top: 30px;">'
		content += '<a class="btn btn-default" href="javascript:brand.updateBrand('
				+ data.id
				+ ",'"
				+ data.name
				+ "'"
				+ ",'"
				+ data.nameZn
				+ "'"
				+ ')" role="button">修改品牌</a> '
		content += '<a class="btn btn-default btn-danger" href="javascript:brand.deleteBrand('
				+ data.id + ')" role="button">删除品牌</a> '
		content += '<a class="btn btn-default" href="javascript:brand.createCarMaker('
				+ data.id
				+ ",'"
				+ data.name
				+ "'"
				+ ')" role="button">新建厂商</a>'
		content += '</div></div>';
		var carMakers = data.carMakers;
		if (carMakers) {
			$
					.each(
							data.carMakers,
							function(index, value) {
								content += '<div class="row" style="margin-bottom: 10px;">'
								content += '<div class="col-md-3" style="padding-left: 30px;"><H2 style="font-size: 20px;">'
										+ value.name + '</H2></div>'
								content += '<div class="col-md-1" style="margin-top: 20px;"><a href="javascript:brand.updateCarMaker('
										+ value.id
										+ ",'"
										+ data.name
										+ "'"
										+ ",'"
										+ value.name
										+ "'"
										+ ",'"
										+ data.id
										+ "'"
										+ ')" class="btn btn-default btn-sm">修改厂商</a></div>'
								content += '<div class="col-md-1" style="margin-top: 20px;margin-left:10px;"><a href="javascript:brand.deleteCarMaker('
										+ value.id
										+ ",'"
										+ data.id
										+ "'"
										+ ')" class="btn btn-sm btn-danger">删除厂商</a></div>';
								content += '<div class="col-md-1" style="margin-top: 20px;margin-left:10px;"><a href="javascript:brand.createCarType('
										+ value.id
										+ ",'"
										+ data.name
										+ "'"
										+ ",'"
										+ value.name
										+ "'"
										+ ",'"
										+ data.id
										+ "'"
										+ ')" class="btn btn-default btn-sm">新建车系</a></div></div>'
								var carTypes = value.carTypes;
								if (carTypes) {
									content += '<div class="row" style="margin-bottom: 10px;">'
									content += '<div class="col-md-12" style="padding-left: 50px; margin-top: 20px;">'
									$
											.each(
													carTypes,
													function(index, value) {
														content += '<label class="checkbox-inline"><input type="checkbox" value="'
																+ value.id
																+ '">'
																+ value.name
																+ '</label>'
													});
									content += '<a href="" _brandId="'
											+ value.brandId
											+ '" carmaker_id="'
											+ value.id
											+ '" class="btn btn-default btn-xs btn-warning deleteCarMaker" style="margin-left: 20px;">删除车系</a></div></div></div>'
									content += '</div></div>'
								}
							});
		}
		$panelContent.append(content);

	},
	createCarMaker : function(brandId, brandName) {
		$("#myModal").attr("data-brandName", brandName);
		$("#myModal").attr("data-brandId", brandId);
		$("#myModal").modal({
			remote : "/views/template/brand/modal_create_carMaker.jsp"
		});
		$('#myModal').modal('show');
	},
	deleteCarMaker : function(id, brandId) {
		if (confirm("确定要删除该厂商吗？")) {
			var delete_url = "/carMaker/delete";
			var fData = {
				id : id
			};
			var aj = $.post(delete_url, fData, function(result) {
				if (!result.code) {
					alert("删除成功！");
					brand.getBrandDetails(brandId);
				} else {
					alert(result.message);
				}
			});
		}
	},
	deleteBrand : function(id) {
		if (confirm("确定要删除该品牌吗？")) {
			var delete_url = "/brand/delete";
			var fData = {
				id : id
			};
			var aj = $.post(delete_url, fData, function(result) {
				if (!result.code) {
					alert("删除成功！");
					//brand.loadBrandData();
					location.reload();
				} else {
					alert(result.message);
				}
			});
		}
	},
	updateCarMaker : function(carMakerId, brandName, carMakerName, brandId) {
		$("#myModal").modal({
			remote : "/views/template/brand/modal_update_carMaker.jsp"
		});
		$("#myModal").attr("data-brandId", brandId);
		$("#myModal").attr("data-carMakerId", carMakerId);
		$("#myModal").attr("data-carMakerName", carMakerName);
		$("#myModal").attr("data-brandName", brandName);
		$('#myModal').modal('show');
	},

	updateBrand : function(brandId, brandName, brandNameZn) {
		$("#myModal").modal({
			remote : "/views/template/brand/modal_update_brand.jsp"
		});
		$("#myModal").attr("data-brandId", brandId);
		$("#myModal").attr("data-brandName", brandName);
		$("#myModal").attr("data-brandNameZn", brandNameZn);

		$('#myModal').modal('show');
	},
	createCarType : function(carMakerId, brandName, carMakerName, brandId) {
		$("#myModal").modal({
			remote : "/views/template/brand/modal_create_carType.jsp"
		});
		$("#myModal").attr("data-brandId", brandId);
		$("#myModal").attr("data-carMakerId", carMakerId);
		$("#myModal").attr("data-carMakerName", carMakerName);
		$("#myModal").attr("data-brandName", brandName);
		$('#myModal').modal('show');
	},
}