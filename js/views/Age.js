define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/Age.html',
], function ( $, _, Backbone, Template ) {
	var AgeView = Backbone.View.extend({
		template: _.template(Template),

		events: {
			"submit #age-form ": "submit"
		 },

		initialize: function () { },

		render: function () {
			this.$el.html(this.template(/*pass in a models attributes*/));
			return this;
		},

		submit: function ( eventName ) {
			eventName.preventDefault();
			$("#error").hide();
			if ( $("#age").val() != "") {
				var id = Backbone.history.fragment;
				id = id.replace("age", "");
				window.location = "#" + id + $("#age").val() + "/" + $("#gender option:selected").val() + "/activities";
			} else {
				$("#error").show();
			}
			return false;
		}
	});

	return AgeView;
});