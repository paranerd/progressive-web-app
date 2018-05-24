<!DOCTYPE html>
<html>
<head>
	<base href="/rest/">
	<link rel="manifest" href="/rest/manifest.json">
</head>
<body>
	First<br>
	Action: <?php echo $action; ?><br>
	<a href="/rest/second">Second</a><br>
	<a href="/rest/second?dir=123">Second 123</a><br>
	<button id="button">Button</button><br>
	<input id="dir" />
	<button id="link">Link</button>

	<span id="version">No version</span>

	<script type="text/javascript" src="assets/js/jquery.min.js"></script>
	<script type="text/javascript" src="assets/js/app.js"></script>
</body>
</html>
