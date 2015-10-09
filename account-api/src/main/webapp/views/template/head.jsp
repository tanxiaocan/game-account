<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<html>

<body>
<nav class="navbar navbar-inverse">
	<div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<a class="navbar-brand" href="#">管理后台 </a>
		</div>
		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse"
			id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown" role="button" aria-haspopup="true"
					aria-expanded="false"> 管理 <span class="caret"> </span>
				</a>
					<ul class="dropdown-menu">
						<li><a href="${contextPath}/user/view"> 用戶管理 </a></li>
						<li><a href="${contextPath}/battleSession/view/manage"> 对战管理 </a></li>
					</ul></li>
			</ul>
			<!--右边导航栏-->
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#"> hello,txc </a></li>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown" role="button" aria-haspopup="true"
					aria-expanded="false"> 设置 <span class="caret"> </span>
				</a>
					<ul class="dropdown-menu">
						<li><a href="#"> 设置账户 </a></li>
						<li><a href="#"> 注销 </a></li>
					</ul></li>
			</ul>
		</div>
		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container-fluid --> </nav>
</body>
</html>