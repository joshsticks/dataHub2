requirejs.config({
	baseUrl: "js", 
	paths: {
		'jquery':  'lib/jquery-1.10.2.min',
		'underscore': 'lib/underscore-1.5.2.min',
		'backbone': 'lib/backbone-1.1.0.min',
		//'chart': 'lib/chart.min',
		'chart': 'lib/chartnew',
		'text': 'lib/text',
		'async': 'lib/asynce',
		'templates': '../templates'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require([
	'jquery',
	'App',
	'backbone'
], function ( $, App, Backbone ) { 
	$(function () {
		App.initialize();
	});
});
