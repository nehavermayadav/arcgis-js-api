// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.

define(["require","dojo/aspect","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","dojox/form/CheckedMultiSelect","../../kernel","../../lang","./AnalysisBase","./utils","./CreditEstimator","./_AnalysisOptions","../CalculateField","dojo/i18n!../../nls/jsapi","dojo/text!./templates/DetectIncidents.html"],function(t,e,i,s,a,n,o,l,r,h,d,c,u,p,_,y,m,f,g,b,L,S,v,x,w,F,I,C,j,k,A,E,D,B,N,T,M,U,P,O,R){var H=i([m,f,g,b,L,U,N],{declaredClass:"esri.dijit.analysis.DetectIncidents",templateString:R,widgetsInTemplate:!0,inputLayer:null,outputLayerName:null,i18n:null,toolName:"DetectIncidents",helpFileName:"DetectIncidents",resultParameter:"output",constructor:function(t){this._pbConnects=[],t.containerNode&&(this.container=t.containerNode),t.trackFields&&"string"==typeof t.trackFields&&(t.trackFields=t.trackFields.split(","))},destroy:function(){this.inherited(arguments),a.forEach(this._pbConnects,n.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,O.detectTrackIncidentsTool)},postCreate:function(){this.inherited(arguments),_.add(this._form.domNode,"esriSimpleForm"),d.set(this._trackFieldSelect.selectNode,"width","90%"),this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(t){this._aspectHandle&&(this._aspectHandle.remove(),this._aspectHandle=null),t&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:t})},_handleSaveBtnClick:function(){if(this._form.validate()){this._saveBtn.set("disabled",!0);var t={};t.jobParams=this._buildJobParams(),t.itemParams={description:h.substitute(this.i18n.itemDescription,{inputLayername:this.inputLayer.name}),tags:h.substitute(this.i18n.itemTags,{inputLayername:this.inputLayer.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(t.itemParams.folder=this.get("folderId")),this.showGeoAnalyticsParams&&(t.isSpatioTemporalDataStore=!0),console.log(t),this.execute(t)}},_handleShowCreditsClick:function(t){t.preventDefault();var e=this._buildJobParams();this._form.validate()&&this.getCreditsEstimate(this.toolName,e).then(s.hitch(this,function(t){this._usageForm.set("content",t),this._usageDialog.show()}))},_buildJobParams:function(){var t={},e=this.constructAnalysisInputLyrObj(this.inputLayer,!0);return t.inputLayer=e,t.trackFields=this._trackFieldSelect.get("value").toString(),this._bufStartInput.get("value")&&(t.startConditionExpression="= "+this._bufStartInput.get("value")),this._bufEndInput.get("value")&&(t.endConditionExpression="= "+this._bufEndInput.get("value")),t.outputMode=this._allFeaturesCheck.get("checked")?"AllFeatures":"Incidents",this.returnFeatureCollection||(t.OutputName=o.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.context=o.toJson({extent:this.map.extent._normalize(!0)})),t},_handleBrowseItemsSelect:function(t){t&&t.selection&&T.addAnalysisReadyLayer({item:t.selection,layers:this._isAnalysisSelect?this.inputLayers:this.polygonLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._layersSelect,browseDialog:t.dialog||this._browsedlg,widget:this}).always(s.hitch(this,this._updateAnalysisLayerUI,!0))},_handleAttrSelectChange:function(t){var e,i,a,n;"0"!==t&&(e=this.get("statisticSelect"),n=this.getOptions(t),n&&n.type&&T.addStatisticsOptions({selectWidget:e,type:n.type,showGeoAnalyticsParams:this.showGeoAnalyticsParams}),"0"!==e.get("value")&&(e.get("isnewRowAdded")||(i=e.get("removeTd"),d.set(i,"display","block"),a=e.get("referenceWidget"),s.hitch(a,a._createStatsRow)(),e.set("isnewRowAdded",!0))))},_handleStatsValueUpdate:function(t,e,i){var a,n,o;this.get("attributeSelect")&&(a=this.get("attributeSelect"),a.get("value")&&"0"!==a.get("value")&&i&&"0"!==i&&(this.get("isnewRowAdded")||(n=this.get("removeTd"),d.set(n,"display","block"),o=this.get("referenceWidget"),s.hitch(o,o._createStatsRow)(),this.set("isnewRowAdded",!0))))},_handleDistUnitsChange:function(t){},_handleDurSplitValue:function(t){},_save:function(){},_buildUI:function(){var t=!0;T.initHelpLinks(this.domNode,this.showHelp),this.get("showSelectAnalysisLayer")&&(this.get("inputLayer")||!this.get("inputLayers")||this.rerun||this.set("inputLayer",this.inputLayers[0]),T.populateAnalysisLayers(this,"inputLayer","inputLayers")),T.addReadyToUseLayerOption(this,[this._analysisSelect]),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),d.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,function(t){this.folderStore=t,T.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),d.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),d.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),this._updateAnalysisLayerUI(t),this._loadConnections()},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1))},_handleAnalysisLayerChange:function(t){var e;"browse"===t?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._isAnalysisSelect=!0,this._browsedlg.show()):"browselayers"===t?(this.showGeoAnalyticsParams&&(e=this._browseLyrsdlg.browseItems.get("query"),e.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",e)),this._isAnalysisSelect=!0,this._browseLyrsdlg.show()):(this.inputLayer=this.inputLayers[t],this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(t){if(this._expStartBtn.set("disabled",!this.inputLayer),this._expEndBtn.set("disabled",!this.inputLayer),this._bufStartInput.set("disabled",!this.inputLayer),this._bufEndInput.set("disabled",!this.inputLayer),this.inputLayer)if(T.addAttributeOptions({selectWidget:this._trackFieldSelect,layer:this.inputLayer,allowStringType:!0,allowSelectLabel:!1}),!t&&this.trackFields&&this.trackFields.length>0&&this._trackFieldSelect.set("value",this.trackFields),t&&(this.outputLayerName=h.substitute(this.i18n.outputLayerName,{inputLayername:this.inputLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this._calcField)this._calcField&&this._calcField.layer!==this.inputLayer&&(this._bufStartInput.set("value",""),this._bufEndInput.set("value",""),this._calcField.reset(),this._calcField.set("layer",this.inputLayer));else{var i=T.getExprFunctions();this._calcField=new P({expressionMode:P.MODE_ARCADE,arcadeEditor:this.arcadeEditor,map:this.map,layer:this.inputLayer,field:this.i18n.bufField,baseClass:"esriBufFieldExp",helperMethods:i,showHelp:!0,helpUrl:T.getHelpUrl({widget:this,topic:"BufferExpression"}),css:{base:"esriBufFieldExp",addButton:"btn calcite primary",closeButton:"btn calcite cancel"},helperType:"numeric",showHeader:!1,calculateLabel:this.i18n.add},this._expressionCtr),this._calcField.startup(),this._calcField.expressionMode===P.MODE_SQL?(d.set(this._calcField._validateBtn.domNode,"display","none"),this._calcField._handleHelperTypeChange("value",null,{functionType:"NumType"}),this._aspectHandle=e.around(this._calcField,"_handleAddButtonClick",s.hitch(this,function(t){return s.hitch(this,function(t,e){var i=this._calcField.get("expression")[0];"start"===this._expType?this._bufStartInput.set("value",i.sqlExpression):"end"===this._expType&&this._bufEndInput.set("value",i.sqlExpression),this._exprDialog.hide()})}))):this._calcField.expressionMode===P.MODE_ARCADE&&this._calcField.on("expression-add",s.hitch(this,function(t){"start"===this._expType?this._bufStartInput.set("value",t.expression):"end"===this._expType&&this._bufEndInput.set("value",t.expression)})),this._calcField.on("close",s.hitch(this,function(){this._exprDialog.hide()}))}},_handleExpBtnClick:function(t){this._expType=t,this._calcField.set("expression","start"===t?this._bufStartInput.get("value"):this._bufEndInput.get("value")),D.show(this._calcField.domNode),this._exprDialog.show()},_handleStartExpBtnClick:function(){this._handleExpBtnClick("start")},_handleEndExpBtnClick:function(){this._handleExpBtnClick("end")},_setAnalysisGpServerAttr:function(t){t&&(this.analysisGpServer=t,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(t){B.isDefined(t)&&T.isTimeInstantLayer(t)?this.inputLayer=t:this.inputLayer=null},_setDisableRunAnalysisAttr:function(t){this._saveBtn.set("disabled",t)},validateServiceName:function(t){return T.validateServiceName(t,{textInput:this._outputLayerInput})},_setInputLayersAttr:function(t){B.isDefined(t)&&(this.inputLayers=t)},_connect:function(t,e,i){this._pbConnects.push(n.connect(t,e,i))}});return l("extend-esri")&&s.setObject("dijit.analysis.DetectIncidents",H,D),H});