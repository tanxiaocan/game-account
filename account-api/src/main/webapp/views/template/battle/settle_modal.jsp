<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<html>
<body>
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">&times;</button>
		<h4 class="modal-title" id="myModalLabel">结算</h4>
	</div>
	<div class="modal-body">
		<!--商家基本信息面板-->
		<div class="panel panel-info">
			<div class="bootstrap-admin-panel-content settleModal">
				
			</div>
		</div>


	</div>
	<!-- content end -->
	<div class="modal-footer">
		<button type="button" class="btn btn-primary" onclick="battleJs.commitSettle()">确认</button>
		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	</div>
	<!-- 校验js -->
	<script type="text/javascript">
		$(document)
				.ready(
						function() {
							constructModalBody();
						});
		
		function constructModalBody(){
			var url_current_session = "/account/session/current?battleSessionId="+$("#myModal").attr("data-battleSessionId");
			$.get(url_current_session, function(result) {
				if (!result.code) {
					battleJs.constructBodyDetail(result.data);
				} else {
					alert(result.message);
				}
			});
		}
		
		function constructBodyDetail(data){
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
				row += inputGroupEnd;
				row += colEnd;	
				row += rowEnd;
				$panel.append(row);
			});			
		}
		
	</script>
</body>
</html>