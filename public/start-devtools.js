(() => {
	chrome.devtools.panels.create(
		'Example Extension',
		'',
		'devtools.html',
		function (panel) {
			console.log(panel);
		},
	);
})()