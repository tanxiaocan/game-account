/**
 * shuang.xiao
 */
$(function() {
	updateBrand.init();
});

updateBrand = {
	init : function() {
		var me = updateBrand;
		var brandDetails;
		me.renderBrandSet();
		me.renderBrandList();

		$("#brandset_buttom").click(me.saveBrandMaker);
		$(document).on("click",".brand-delete",me.deleteBrandMaker);
		$(document).on("click","input[name='inlineRadioOptions']:checked",me.reRenderMakerList);

	},
	
	reRenderMakerList :function(){
		var brandId = $(this).val();
		var makerInfo = '厂商选择：';
		var url='/carMaker/getByBrandId?brandId='+brandId;
		$.get(url, function(result) {
			if (!result.code) {
				if (result.data) {
					$.each(result.data, function(i, e) {
						makerInfo +='&nbsp;&nbsp;<label class="checkbox-inline"><input \
							type="checkbox" id="inlineCheckbox1" value="'+e.id+'"> '+e.name+' </label>';
					})
				}
			}
			$("#selectMaker").empty();
			$("#selectMaker").append(makerInfo);
		})
	},
	
	saveBrandMaker : function(){
		if(!$('input:radio:checked').val()){
			alert("请选择品牌！");
			return;
		}
		
		var me = updateBrand;
		var url = "/business/brand/add";
		var makerIds = "";
		
		var flag = false;
		$("#selectMaker :checkbox").each(function() {
			if ($(this)[0].checked) {
				var brand = "#brand" + $('input:radio:checked').val();
				var maker = "#maker" + $(this).val();
				if($(brand).length == 1 && $(maker).length == 1){
					flag = true;
				}
				
				makerIds += $(this).val() + ","
			}
		});
		if(flag){
			alert("重复添加，请重新选择");
			return;
		}
		if(!makerIds){
			alert("请选择厂商！");
			return;
		}
		var parm = {
			businessId : $("#businessId").val(),
			brandId : $('input:radio:checked').val(),
			makerids :	makerIds
		}
		$.post(url, parm, function(result) {
			if (!result.code) {
				alert("添加成功！");
				me.renderBrandList();
			} else {
				alert(result.message);
			}
		})
	},
	
	renderBrandSet : function(){
		var url = "/brand/getAll";
		var brandInfo = '品牌选择：';
		var makerInfo = '厂商选择：';
		$.get(url, function(result) {
			if (!result.code) {
				if (result.data) {
					brandDetails = result.data;
					$.each(brandDetails, function(index, entity) {
						brandInfo += '&nbsp;&nbsp;<label class="radio-inline"> <input type="radio" \
							name="inlineRadioOptions" id="inlineRadio1" value="'+entity.id+'"> '+entity.name+' </label>';
						if(index==0){
							$.each(entity.carMakers, function(i, e) {
								makerInfo +='&nbsp;&nbsp;<label class="checkbox-inline"> <input \
									type="checkbox" id="inlineCheckbox1" value="'+e.id+'"> '+e.name+' </label>';
							})
						}
					});
				}
			}
			
			$("#selectBrand").empty();
			$("#selectBrand").append(brandInfo);
			$("#selectMaker").empty();
			$("#selectMaker").append(makerInfo);
		})
	},

	renderBrandList : function() {
		var url = "/business/brand/get?businessId=" + $("#businessId").val();
		var info = '<thead><tr><td><label>品牌名称</label></td><td><label>厂商名称</label></td><td><label>操作</label></td></tr></thead>';
		$.get(url, function(result) {
			if (!result.code) {
				if (result.data) {
					var data = result.data;
					$.each(data, function(index, entity) {
						info += '<tr> \
							<td><span id=brand' + entity.brandId + '>'+entity.brandIdName+'</span></td> \
							<td><span id=maker' + entity.makerId + '>'+entity.makerName+'</span></td> \
							<td><input class="btn btn-default brand-delete"  makerId="'+entity.makerId+'"  brandId="'
							+entity.brandId+'"  id="'+entity.id+'" type="text" value="删除"></td> \
						</tr>';
					});
				}
			}
			
			$("#brand_table_list").empty();
			$("#brand_table_list").append(info);
		})
	},
	
	deleteBrandMaker : function(){
		var me = updateBrand;
		var id = $(this).attr("id");
		var brandId = $(this).attr("brandId");
		var makerId = $(this).attr("makerId");
		if(confirm("确定要删除吗？"))
		 {
			var url = "/business/brand/delete";
			var parm = {
				businessId : $("#businessId").val(),
				id : id,
				brandId : brandId,
				makerId : makerId
			}
			$.post(url, parm, function(result) {
				if (!result.code) {
					alert("删除成功！");
					me.renderBrandList();
				} else {
					alert(result.message);
				}
			})
		 }
	}
}