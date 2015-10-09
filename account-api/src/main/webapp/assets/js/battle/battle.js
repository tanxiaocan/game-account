var battleJs = {
		openSession : function($aTab){
			var tds = $aTab.parent().parent().children();
			var battleSessionId = $(tds[0]).html();
			var url_create = "/battleSession/open?battleSessionId="+battleSessionId;
			var aj = $.ajax({
				url : url_create,
				type : 'get',
				contentType : "application/json",
				dataType : 'json',
				success : function(data) {
					if (data.code == 0) {
						window.location.href = "/battleSession/view?battleSessionId="+battleSessionId;
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
		getSettleModal : function(){
			$("#myModal").attr("data-battleSessionId",$("#battleSessionId").val());
			$("#myModal").modal({
			    remote: "/views/template/battle/settle_modal.jsp"
			});
		},
		constructBodyDetail : function(data){
			var $panel = $(".settleModal");
			$panel.empty();
			var rowStart = '<div class="row" style="margin-bottom:10px">';
			var rowEnd = '</div>';
			var colStart = '<div class="col-md-4">';
			var colEnd = '</div>';
			var inputGroupStart = '<div class="input-group">';
			var inputGroupEnd = '</div>';
			var spanStart = '<span class="input-group-addon">';
			var spanEnd = '</span>';
			var input = '<input type="text" class="form-control" aria-label="...">';
			$.each(data,function(index,value){
				var row = '';
				row += rowStart;
				row += colStart;
				row += spanStart;
				row += value.userName;
				row += spanEnd;
				row += colEnd;
				row += colStart;
				row += inputGroupStart;
				row += spanStart;
				row += '几炸';
				row += spanEnd;
				row += input;
				row += inputGroupEnd;
				row += colEnd;
				row += colStart;
				row += inputGroupStart;
				row += spanStart;
				row += '剩余几张';
				row += spanEnd;
				row += input;
				var userIdInput = '<input type="text" style="display:none"';
				userIdInput += 'value='+value.userId;
				userIdInput += ' class="form-control commitInput" aria-label="...">';
				row += userIdInput;
				row += inputGroupEnd;
				row += colEnd;	
				row += rowEnd;
				$panel.append(row);
			});			
		},
		commitSettle : function(){
			var fmData = battleJs.getCommitData();
			if(!fmData){
				return;
			}
			var url_create = "/trade/dotrade";
			var aj = $.ajax({
				url : url_create,
				type : 'post',
				contentType : "application/json",
				dataType : 'json',
				data : JSON.stringify(fmData),
				success : function(data) {
					if (data.code == 0) {
						window.location.reload();
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
		getCommitData : function(){
			var arr = new Array();
			var fmData = new Array();
			var $inputs = $("input.commitInput");
			var count = 0;
			var toUserId = "";
			var flag = false;
			$inputs.each(function(){
				var obj = new Object();
				obj.userId = $(this).val();
				obj.num = $($(this).prev()).val();
				if(obj.num==""){
					if(toUserId!=""){					
						flag = true;
					}
					toUserId = obj.userId;
				}else{
					var twiceTab = $(this).parent().parent().prev().children().children();
					var twice = $(twiceTab[1]).val();
					obj.twice = twice;
					arr[count] = obj;
					count++;
				}			
			});
			if(flag){
				alert("只能有一个获胜者，获胜者不填！");
				return false;
			}
			if(toUserId==""){
				alert("胜利者不用填！");
				return false;
			}
			count = 0;
			$.each(arr,function(index,value){
				var trade = new Object();
				trade.amount = -value.num*Math.pow(2, value.twice);
				trade.toUserId = toUserId;
				trade.fromUserId = value.userId;
				trade.battleSessionId = $("#battleSessionId").val();
				fmData[count] = trade;
				count++;
			});
			return fmData;
		}
}