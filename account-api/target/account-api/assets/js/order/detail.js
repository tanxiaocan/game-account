$(function() {
	detail.init();
});

var detail={
		
	init :function(){
		var me = detail;
		me.renderBody();
	},
	
	renderBody : function(){
		var me = detail;
		var aj = $.ajax({
			url : "/orderManage/detail?orderId=" + $("#orderId").val(),
			type : "GET",
			dataType : "json",
			contentType : "application/json",
			success : function(data) {
				if (data.code==0) {
					if(data.data){
						var result = data.data;
						$("#price").text((result.price/1000).toFixed(2));
						$("#hourFee").text((result.hourFee/1000).toFixed(2));
						$("#meterialCost").text((result.meterialCost/1000).toFixed(2));
						$("#pushTime").text(result.pushTime);
						$("#createTime").text(result.createTime);
						
						if(result.content && result.content.plan){
							var plan = result.content.plan;
							var planContent="";
							$.each(plan, function(key, values) {
								planContent += '<p style="margin-top:10px;margin-left:10px;"><strong>'+values.name+'</strong></p>'
								var typesContent="";
								if(values.types){
									$.each(values.types, function(key, value) {
										if(value.isSelect==1){
											typesContent +='<div class="col-sm-3"><span>'+value.itemName+'</span></div>';
										}
									});
								}
								planContent += typesContent;
								planContent += '</div><div class="clearfix" style="margin-bottom: 10px;"></div>'
													
							});
							$("#maintainTypes").empty();
							$("#maintainTypes").append(planContent);
						}
					}
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