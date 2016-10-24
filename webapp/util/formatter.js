sap.ui.define([], function() {
	"use strict";

	return {

		formatTag: function(level, tagL1, tagL2, tagL3, link) {
			var retValue = "";
			switch (level) {
				case '(level 1)':
					retValue = tagL1;
					break;
				case '(level 2)':
					retValue = tagL2;
					break;
				case '(level 3)':
					retValue = tagL3;
					break;
				default:
			}
			return retValue;
		},
		
		formatHREF: function(link) {
			if(link !== "" && link.startsWith("http")) {
				return link;
			} else {
				return "";
			}
		}

	};

});