// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.25/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/has","../base/InputBase","../base/OptionsMixin","dojo/text!./templates/InputSelectMany.html","../../../kernel"],function(t,e,i,n,o,s,c,r,a){var h=t([s,c],{_supportsMultipleValues:!0,checkBoxes:null,templateString:r,subTarget:null,postCreate:function(){this.inherited(arguments),this.checkBoxes=[]},startup:function(){this._started||(this.inherited(arguments),this.initializeOptions())},addOption:function(t,e){var i=this,o=this.id+"_chk"+e,s=n.create("div",{class:"gxeOption"},this.optionsNode),c=t.label,r=t.value,a={id:o,type:"checkbox",value:r};t.selected&&(a.checked="checked"),a.onclick=function(){i._onClick(this)};var h=n.create("input",a,s);h.xtnLabel=c,this.checkBoxes.push(h);var u=n.create("label",{for:o},s);this.setNodeText(u,c)},filterOptions:function(t){if(!this.parentXNode)return t;if(!this.parentXNode.optionsFilter)return t;var e=this.parentXNode.optionsFilter.split(",");return i.filter(t,function(t){return i.some(e,function(e){return t.value===e})})},getDisplayValue:function(){var t=[];return i.forEach(this.checkBoxes,function(e){e.checked&&t.push(e.xtnLabel)}),1===t.length?t[0]:t.length>1?t:null},getInputValue:function(){var t=[];return i.forEach(this.checkBoxes,function(e){e.checked&&t.push(e.value)}),1===t.length?t[0]:t.length>1?t:null},importValues:function(t,n){i.forEach(this.checkBoxes,function(t){var o,s=i.some(n,function(i){if(null!=i)return(o=e.trim(i))===t.value});t.checked=s}),this.applyViewOnly()},initializeOptions:function(){this.fetchOptionWidgets().then(e.hitch(this,function(t){var e=this.filterOptions(t);this.populateOptions(e)}),e.hitch(this,function(t){console.error(t)}),e.hitch(this,function(t){}))},_onClick:function(t){this.emitInteractionOccurred()},populateOptions:function(t){i.forEach(t,function(t,e){this.addOption(t,e)},this);var e=this.containerNode;this.destroyDescendants(!1),setTimeout(function(){n.destroy(e)},5e3)}});return o("extend-esri")&&e.setObject("dijit.metadata.form.InputSelectMany",h,a),h});