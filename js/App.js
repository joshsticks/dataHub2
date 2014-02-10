define([
	'jquery',
	'backbone'
], function ( $, Backbone ) {
	var App = Backbone.Router.extend({     
		routes: {
			"": "login",
			"login": "login",
			":id/activities": "activities"
		},

		initialize: function () { },
		
		login: function () {
			var self = this;
			require(['views/Login'], function ( LoginView ) {
				self.showView( new LoginView() );
			});
		},

		activities: function ( id ) {

		},

		showView: function ( view ) {

			if (this.currentView){
				this.currentView.remove();
			}

			this.currentView = view;
			this.currentView.render();

			$('body').html(this.currentView.el);
		}
	});

	var initialize = function () {
		new App();
		Backbone.history.start();
	};

	return {	
		initialize: initialize
	};
});