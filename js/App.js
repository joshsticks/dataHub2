define([
	'jquery',
	'backbone'
], function ( $, Backbone ) {
	var App = Backbone.Router.extend({     
		routes: {
			"": "login",
			"login": "login",
			":id/age": "age",
			":id/:age/:gender/activities": "activities",
			":id/:age/:gender/activity/tight-wire": "tightWire",
			":id/:age/:gender/activity/pedal": "pedal",
			":id/:age/:gender/activity/yoga": "yoga",
			":id/:age/:gender/activity/reaction": "reaction",
			":id/:age/:gender/activity/shrink": "shrink",
			":id/:age/:gender/activity/recipe": "recipe",
			":id/:age/:gender/activity/happiness-scale": "happinessScale",
			":id/:age/:gender/activity/sleep": "sleep",
			":id/:age/:gender/activity/speed-match": "speedMatch",
			":id/:age/:gender/activity/mind": "mind",
			":id/:age/:gender/activity/creativity": "creativity",
			":id/:age/:gender/activity/happiness-is": "happinessIs",
			":id/:age/:gender/activity/looking": "looking",
			":id/:age/:gender/activity/spatial-memory": "spatialMemory",
			":id/:age/:gender/activity/what-passion": "whatPassion",
			":id/:age/:gender/activity/lip-service": "lipService",
			":id/:age/:gender/activity/hit-the-note": "hitTheNote",
			":id/:age/:gender/activity/vertical-leap": "verticalLeap",
			":id/:age/:gender/activity/bench-press": "benchPress",
			":id/:age/:gender/activity/appreciation": "appreciation",
			":id/:age/:gender/activity/find-passion": "findPassion",
			":id/:age/:gender/activity/hobby": "hobby"
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
		activities: function ( id, age, gender ) {
			var self = this;
			require(['views/Activities'], function ( ActivitiesView ) {
				self.showView( new ActivitiesView() );
			});
		},
		
		tightWire: function ( id, age, gender ) {
			var self = this;
			require(['views/TightWire'], function ( TightWireView ) {
				self.showView( new TightWireView() );
			});
		},

		pedal: function ( id, age, gender ) {
			var self = this;
			require(['views/Pedal'], function ( PedalView ) {
				self.showView( new PedalView() );
			});
		},
		
		yoga: function ( id, age, gender ) {
			var self = this;
			require(['views/Yoga'], function ( YogaView ) {
				self.showView( new YogaView() );
			});
		},
		
		reaction: function ( id, age, gender ) {
			var self = this;
			require(['views/Reaction'], function ( ReactionView ) {
				self.showView( new ReactionView() );
			});
		},
		
		shrink: function ( id, age, gender ) {
			var self = this;
			require(['views/Shrink'], function ( ShrinkView ) {
				self.showView( new ShrinkView() );
			});
		},
		
		recipe: function ( id, age, gender ) {
			var self = this;
			require(['views/Recipe'], function ( RecipeView ) {
				self.showView( new RecipeView() );
			});
		},
		
		happinessScale: function ( id, age, gender ) {
			var self = this;
			require(['views/HappinessScale'], function ( HappinessScaleView ) {
				self.showView( new HappinessScaleView() );
			});
		},

		sleep: function ( id, age, gender ) {
			var self = this;
			require(['views/Sleep'], function ( SleepView ) {
				self.showView( new SleepView() );
			});
		},

		speedMatch: function ( id, age, gender ) {
			var self = this;
			require(['views/SpeedMatch'], function ( SpeedMatchView ) {
				self.showView( new SpeedMatchView() );
			});
		},

		mind: function ( id, age, gender ) {
			var self = this;
			require(['views/Mind'], function ( MindView ) {
				self.showView( new MindView() );
			});
		},

		creativity: function ( id, age, gender ) {
			var self = this;
			require(['views/Creativity'], function ( CreativityView ) {
				self.showView( new CreativityView() );
			});
		},

		happinessIs: function ( id, age, gender ) {
			var self = this;
			require(['views/HappinessIs'], function ( HappinessIsView ) {
				self.showView( new HappinessIsView() );
			});
		},
		
		looking: function ( id, age, gender ) {
			var self = this;
			require(['views/Looking'], function ( LookingView ) {
				self.showView( new LookingView() );
			});
		},

		spatialMemory: function ( id, age, gender ) {
			var self = this;
			require(['views/SpatialMemory'], function ( SpatialMemoryView ) {
				self.showView( new SpatialMemoryView() );
			});
		},

		whatPassion: function ( id, age, gender ) {
			var self = this;
			require(['views/WhatPassion'], function ( WhatPassionView ) {
				self.showView( new WhatPassionView() );
			});
		},

		lipService: function ( id, age, gender ) {
			var self = this;
			require(['views/LipService'], function ( LipServiceView ) {
				self.showView( new LipServiceView() );
			});
		},

		hitTheNote: function ( id, age, gender ) {
			var self = this;
			require(['views/HitTheNote'], function ( HitTheNoteView ) {
				self.showView( new HitTheNoteView() );
			});
		},

		verticalLeap: function ( id, age, gender ) {
			var self = this;
			require(['views/VerticalLeap'], function ( VerticalLeapView ) {
				self.showView( new VerticalLeapView() );
			});
		},

		benchPress: function ( id, age, gender ) {
			var self = this;
			require(['views/BenchPress'], function ( BenchPressView ) {
				self.showView( new BenchPressView() );
			});
		},

		appreciation: function ( id, age, gender ) {
			var self = this;
			require(['views/Appreciation'], function ( AppreciationView ) {
				self.showView( new AppreciationView() );
			});
		},

		findPassion: function ( id, age, gender ) {
			var self = this;
			require(['views/FindPassion'], function ( FindPassionView ) {
				self.showView( new FindPassionView() );
			});
		},

		hobby: function ( id, age, gender ) {
			var self = this;
			require(['views/Hobby'], function ( HobbyView ) {
				self.showView( new HobbyView() );
			});
		},

		showView: function ( view ) {

			if (this.currentView){
				this.currentView.remove();
			}

			this.currentView = view;
			this.currentView.render();

			$('body').html(this.currentView.el);

			window.scrollTo(0,0);
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