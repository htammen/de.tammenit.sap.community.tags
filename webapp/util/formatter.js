sap.ui.define([], function() {
	"use strict";
	var _baseLink = "https://go.sap.com/community/tag.html";

	return {

		formatTag: function(level, name) {
			if(level === 1) {
				return ""
			} else {
				return name;
			}
		},
		
		formatHREF: function(level, guid) {
			if(level > 1) {
				if(guid !== "") {
					return _baseLink + "?id=" + guid;
				} else {
					return "";
				}				

			}
		},
		
		/**
		 * @private
		 */
		_formatLinkText: function(readOnly, text) {
			if(!readOnly) {
				return text;
			} else {
				return "";
			} 
		},
		
		formatLinkTextAnswers: function(readOnly) {
			return this.formatter._formatLinkText(readOnly, 'Q&A');
		},
		formatLinkTextBlogs: function(readOnly) {
			return this.formatter._formatLinkText(readOnly, 'Blogs');
		},
		formatLinkTextUnanswered: function(readOnly) {
			return this.formatter._formatLinkText(readOnly, 'Unanswered');
		},
		
		formatHREFAnswers: function(guid) {
			if(guid !== "") {
				return "https://answers.sap.com/tags/" + guid;
			} else {
				return "";
			}
		},

		formatHREFBlogs: function(guid) {
			if(guid !== "") {
				return "https://blogs.sap.com/tags/" + guid;
			} else {
				return "";
			}
		},

		formatHREFUnanswered: function(guid) {
			if(guid !== "") {
				return "https://answers.sap.com/tags/" + guid + "?sort=newest&filter=unanswered";
			} else {
				return "";
			}
		},
		
		
		__extractIdFromLink: function(link) {
			var start = link.indexOf("id=") + 3;
			var end = link.length;
			return link.substring(start, end);
		},

		formatArea: function(level, name) {
			if(level === 1) {
				return name;
			} else {
				return "";
			}
		},

		formatUsage: function(level, primaryTag) {
			if(level === 1) return "";
			
			if(primaryTag) {
				return "Primary"
			} else {
				return "Secondary"
			}
		}
	};

});