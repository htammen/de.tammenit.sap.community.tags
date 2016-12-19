sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"de/tammenit/sap/community/tags/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("de.tammenit.sap.community.tags.Component", {
		// metadata is explained in document "SAP Fiori Launchpad for Developers - Architecture Overview.pdf"
		metadata: {
			manifest: "json",
			name: "Sample Component", 
			library : " mycompany.abc", 
			includes : [
				"css/style.css" 
			],
            dependencies : {
            },
            config : {
				"resourceBundle" : "i18n/i18n.properties",
				"titleResource" : "appTitle"
				// The following properties reference dedicated image files. Note
				// that relative links are always relative to the location of the
				// Component.js of the app, NOT to the location of the HTML file that // is displayed in the web browser (typically: FioriLaunchpad.html). "favIcon" : "img/favicon.ico",
				//"homeScreenIconPhone" : "img/57_iPhone_Desktop_Launch.png", 
				//"homeScreenIconPhone@2" : "img/114_iPhone-Retina_Web_Clip.png ", 
				//"homeScreenIconTablet" : "img/72_iPad_Desktop_Launch.png", 
				//"homeScreenIconTablet@2" : "img/144_iPad_Retina_Web_Clip.png"
			}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// Polyfill for String.startsWith
			if (!String.prototype.startsWith) {
			    String.prototype.startsWith = function(searchString, position){
			      position = position || 0;
			      return this.substr(position, searchString.length) === searchString;
			  };
			}			
			
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();
			
			this.oMessageProcessor = new sap.ui.core.message.ControlMessageProcessor();
			var oMessageManager = sap.ui.getCore().getMessageManager();
			oMessageManager.registerMessageProcessor(this.oMessageProcessor);
	 			
		},

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}

	});
});