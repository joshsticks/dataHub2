define([
	'jquery',
	'backbone'
], function ( $, Backbone ) {
	var App = Backbone.Router.extend({     
		routes: {
			"": "login",
			"login": "login",
			":id/age": "age",
			":id/:age/activities": "activities",
			":id/:age/activity/:activity": "activity",
			":id/:age/activity/:activity/me": "me",
			":id/:age/activity/:activity/compare": "compare" 
		},

		initialize: function () { },
		
		// user enters in their code
		login: function () {
			var self = this;
			require(['views/Login'], function ( LoginView ) {
				self.showView( new LoginView() );
			});
		},

		// user specifies their age
		age: function ( id ) {
			var self = this;
			require(['views/Age'], function ( AgeView ) {
				self.showView( new AgeView() );
			});
		},

		// user can show you a list of activities and then can select an activity
		activities: function ( id, age ) {
			var self = this;
			require(['views/Activities'], function ( ActivitiesView ) {
				self.showView( new ActivitiesView() );
			});
		},

		// user sees activity name, selects to view own results or compare
		activity: function ( id, age, activity ) {
			var self = this;
			require(['views/Activity'], function ( ActivityView ) {
				self.showView( new ActivityView() );
			});
		},

		// user is shown a graph of their own stats
		me: function ( id, age, activity ) {
			var self = this;
			require(['views/Me'], function ( MeView ) {
				self.showView( new MeView() );
			});
		},

		// user is show a graph comparing vs. their age group
		compare: function ( id, age, activity ) {
			var self = this;
			require(['views/Compare'], function ( CompareView ) {
				self.showView( new CompareView() );
			});
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