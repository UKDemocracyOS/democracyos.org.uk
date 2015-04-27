/* define the application */
var app = new Backbone.Marionette.Application();

/* add the main region to the application */
app.addRegions({
	appRegion: '#AppBase'
});

/* define the module we will be using to create this app */
app.module('RouteTest', function(module, App, Backbone, Marionette, $, _){
	"use strict";

	/* the layout for the main view */
	module.AppLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'AppLayoutView',
		template: '#template-AppLayoutView',

		regions: {
			'contentRegion' : '#ContentRegion'
		},
		ui: {
			'navHome' : '#nav-home',
			'navSkills' : '#nav-skills',
			'navResources' : '#nav-resources',
			'navPeople' : '#nav-people',
			'navContact' : '#nav-contact',
			'navAbout' : '#nav-about'
		},
		events: {
			'click #nav-home' : 'onNavHomeClicked',
			'click #nav-skills' : 'onNavSkillsClicked',
			'click #nav-resources' : 'onNavResourcesClicked',
			'click #nav-people' : 'onNavPeopleClicked',
			'click #nav-contact' : 'onNavContactClicked',
			'click #nav-about' : 'onNavAboutClicked'
		},

		/* when the view initializes, call initRouter to */
		initialize: function() {
			this.initRouter();
		},

		/* once the DOM is ready, start the Backbone history manager.
			This will cause the application to synch up with the
			current route of the browser, e.g. #home or #info.
			This must be called onRender instead of on initialize
			because it immediately tries to render the appropriate view
			into the contentRegion. Also: If you don't start the backbone
			history, the router won't work. */
		onRender: function() {
			if (!Backbone.History.started) Backbone.history.start();
		},

		/* initialize the AppRouter, which synchs the application
			to the browser navigation */
		initRouter: function() {

			// cache reference to 'this' in the module scope
			var capturedThis = this;

			// create a new instance of the AppRouter
			// and assign the routes and controller
			var appRouter = new Marionette.AppRouter({
				appRoutes: {
    					'' : 'onHomeRoute',
    				'home' : 'onHomeRoute',
    				'skills' : 'onSkillsRoute',
    				'resources' : 'onResourcesRoute',
    				'people' : 'onPeopleRoute',
    				'contact' : 'onContactRoute',
    				'about' : 'onAboutRoute'
    			},
				controller: {
    				onHomeRoute: function() {
    					capturedThis.onHomeNavigated();
    				},
    				onSkillsRoute: function() {
    					capturedThis.onSkillsNavigated();
    				},
    				onResourcesRoute: function() {
    					capturedThis.onResourcesNavigated();
    				},
    				onPeopleRoute: function() {
    					capturedThis.onPeopleNavigated();
    				},
    				onContactRoute: function() {
    					capturedThis.onContactNavigated();
    				},
    				onAboutRoute: function() {
    					capturedThis.onAboutNavigated();
    				}
    			}
			});
		},

		/* called when the router sees that we have met the criteria
			to trigger the 'onHomeRoute' handler */
		onHomeNavigated: function() {

			// define and display an instance of the HomeLayoutView
			var homeLayoutView = new module.HomeLayoutView();
			this.contentRegion.show(homeLayoutView);

			// update the navigation
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navHome.addClass('active');
		},

		onSkillsNavigated: function() {
			var layoutView = new module.SkillsLayoutView();
			this.contentRegion.show(layoutView);
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navSkills.addClass('active');
		},
		onResourcesNavigated: function() {
			var layoutView = new module.ResourcesLayoutView();
			this.contentRegion.show(layoutView);
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navResources.addClass('active');
		},
		onContactNavigated: function() {
			var layoutView = new module.ContactLayoutView();
			this.contentRegion.show(layoutView);
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navContact.addClass('active');
		},
		onPeopleNavigated: function() {
			var layoutView = new module.PeopleLayoutView();
			this.contentRegion.show(layoutView);
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navPeople.addClass('active');
		},
		onAboutNavigated: function() {
			var layoutView = new module.AboutLayoutView();
			this.contentRegion.show(layoutView);
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navAbout.addClass('active');
		}
	});

	module.HomeLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'HomeLayoutView',
		className: 'contentLayout',
		template: '#template-HomeLayoutView'
	});

	module.SkillsLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'SkillsLayoutView',
		className: 'contentLayout',
		template: '#template-SkillsLayoutView'
	});

	module.ResourcesLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'ResourcesLayoutView',
		className: 'contentLayout',
		template: '#template-ResourcesLayoutView'
	});

	module.PeopleLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'PeopleLayoutView',
		className: 'contentLayout',
		template: '#template-PeopleLayoutView'
	});

	module.ContactLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'ContactLayoutView',
		className: 'contentLayout',
		template: '#template-ContactLayoutView'
	});

	module.AboutLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'AboutLayoutView',
		className: 'contentLayout',
		template: '#template-AboutLayoutView'
	});

	/* add initializer, which fires when the app starts */
	module.addInitializer(function(){
		var layout = new module.AppLayoutView();

		/* show the layout in the region we created at the top of this file */
		app.appRegion.show(layout);
	});
});

/* when the DOM for this page is available, start the application */
$(document).ready(function() {
	app.start();
});
