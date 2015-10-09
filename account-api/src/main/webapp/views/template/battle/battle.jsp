<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/tag/tag-lib.tag"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-CN">
<head>
<link rel="shortcut icon" type="image/ico" href="/assets/images/favicon.ico">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<title>用户查询</title>
<!-- Bootstrap -->
<link href="${contextPath}/assets/css/bootstrap.min.css"
	rel="stylesheet">
	
<link href="${contextPath}/assets/css/jquery-confirm.min.css"
	rel="stylesheet">
<link href="${contextPath}/assets/css/daterangepicker-bs3.css"
	rel="stylesheet" type="text/css" media="all" />
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media
        queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file://
        -->
<!--[if lt IE 9]>
            <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js">
            </script>
            <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js">
            </script>
        <![endif]-->
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="${contextPath}/assets/js/jquery-1.11.3.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files
        as needed -->
<script src="${contextPath}/assets/js/bootstrap.min.js"></script>
<script src="${contextPath}/assets/js/common.js"></script>
<!-- 时间控件 -->
<script src="${contextPath}/assets/js/moment.js"></script>
<script src="${contextPath}/assets/js/daterangepicker.js"></script>

<!-- 弹窗控件 -->
<script src="${contextPath}/assets/js/jquery-confirm.min.js"></script>
<!-- 当前页js -->
<script src="${contextPath}/assets/js/battle/battle.js"></script>

<!-- 校验js -->
<script src="${contextPath}/assets/js/valid/valid.js"></script>
<script>
	//var rootPath;
	//	var url_getList = "${contextPath}/business/getList";
	$(document).ready(function() {
		$("#battleManager").addClass("active");
		$("#userManager").removeClass("active");
		var paramJson = {"battleSessionId":$("#battleSessionId").val()};
		comJs.setParams(paramJson)
		comJs.createTable(1);
	});
</script>
</head>

<body>
	<c:import url="/views/template/head.jsp"></c:import>
	<div class="row-fluid ">
		<!--左侧导航栏-->
		<c:import url="/views/template/customerleft.jsp"></c:import>
		<!--右侧内容面板-->
		<div class="col-md-10">
			<h3>
				<span class="glyphicon glyphicon-align-left" aria-hidden="true">
				</span> 用户信息管理
			</h3>
			<!--检索面板-->
			<div class="panel panel-info">
				<div class="bootstrap-admin-panel-content">
					<div class="row">
						
						<!-- /.col-lg-6 -->
						<div class="col-lg-2">
							<div>
								<button type="button" class="btn btn-info"
									aria-label="Right Align"
									onclick="battleJs.getSettleModal()">
									<span class="glyphicon glyphicon-plus" aria-hidden="true">
									</span> 结算
								</button>
							</div>
						</div>
						<!-- /.col-lg-6 -->
					</div>
					<div class="clearfix" style="margin-bottom: 10px;"></div>
					<!-- 清除浮动增加面板间间隔 -->
					<!-- /.row -->
				</div>
			</div>
			<!--检索面板结束-->


			<!-- 添加分页信息 
			<div class="panel panel-default">
			<div class="bootstrap-admin-panel-content">
			<nav class="pull-right"><span>当前第10页，共100页，500条</span></nav>
			</div>
			</div>
			<!-- 添加分页信息结束-->

			<!--table面板-->
			<div class="panel panel-info">
				<div class="panel-heading">用户列表</div>
				<div class="bootstrap-admin-panel-content">

					<table class="table table-bordered" id="page_table"
						table_url="${contextPath}/account/session/current">
						<thead>
							<tr>
								<th id='userId'>用户ID</th>
								<th id='userName'>姓名</th>
								<th id='balance'>金额</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
			<!--table面板结束-->


		</div>
		<!--右侧内容面板结束-->

		<!-- 禁用弹出框 -->
		<div class="container"></div>
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">默认值</h4>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary">确认</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消
						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
			<!-- 禁用弹出框结束 -->
		</div>
		
		<input id="battleSessionId" value="${battleSessionId }" style="display:none">
</body>

</html>