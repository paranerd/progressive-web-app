<?php

$request      = (isset($_REQUEST['request'])) ? $_REQUEST['request'] : null;
$args         = ($request) ? explode('/', rtrim($request, '/')) : array();
$controller   = (sizeof($args) > 0) ? array_shift($args) : '';
$action       = (sizeof($args) > 0) ? array_shift($args) : '';
$api = isset($_REQUEST['api']);
$dir = (isset($_REQUEST['dir'])) ? $_REQUEST['dir'] : null;

file_put_contents('log', print_r($_REQUEST, true) . "\n", FILE_APPEND);

if ($api) {
	if ($controller == "core" && $action == "version") {
		$version = array('build' => 1234, 'version' => '1.2.3.4');
		exit(json_encode($version));
	}
	else {
		header('HTTP/1.1 404 None here');
		exit();
	}
}
else if ($dir) {
	$link = "This is the link for " . $dir;
	exit(json_encode($link));
}
else if ($controller == "first") {
	require_once 'templates/first.php';
}
else if ($controller == "second") {
	require_once 'templates/second.php';
}
else {
	require_once 'templates/first.php';
}
