/* Copyright (c) 2006 Yahoo! Inc. All rights reserved. */YAHOO.util.CustomEvent=function(_1,_2){this.type=_1;this.scope=_2||window;this.subscribers=[];if(YAHOO.util["Event"]){YAHOO.util.Event.regCE(this);}};YAHOO.util.CustomEvent.prototype={subscribe:function(fn,_4,_5){this.subscribers.push(new YAHOO.util.Subscriber(fn,_4,_5));},unsubscribe:function(fn,_6){var _7=false;for(var i=0;i<this.subscribers.length;++i){var s=this.subscribers[i];if(s&&s.contains(fn,_6)){this._delete(i);_7=true;}}return _7;},fire:function(){for(var i=0;i<this.subscribers.length;++i){var s=this.subscribers[i];if(s){var _10=(s.override)?s.obj:this.scope;s.fn.call(_10,this.type,arguments,s.obj);}}},unsubscribeAll:function(){for(var i=0;i<this.subscribers.length;++i){this._delete(i);}},_delete:function(_11){var s=this.subscribers[_11];if(s){delete s.fn;delete s.obj;}delete this.subscribers[_11];}};YAHOO.util.Subscriber=function(fn,obj,_13){this.fn=fn;this.obj=obj||null;this.override=(_13);};YAHOO.util.Subscriber.prototype.contains=function(fn,obj){return (this.fn==fn&&this.obj==obj);};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var _14=false;var _15=[];var _16=[];var _17=[];var _18=[];var _19=[];var _20=[];return {EL:0,TYPE:1,FN:2,WFN:3,SCOPE:3,ADJ_SCOPE:4,isSafari:(navigator.userAgent.match(/safari/gi)),isIE:(!this.isSafari&&navigator.userAgent.match(/msie/gi)),addListener:function(el,_22,fn,_23,_24){if(this._isValidCollection(el)){var ok=true;for(var i=0;i<el.length;++i){ok=(this.on(el[i],_22,fn,_23,_24)&&ok);}return ok;}else{if(typeof el=="string"){if(_14){el=this.getEl(el);}else{_16[_16.length]=[el,_22,fn,_23,_24];return true;}}}if(!el){return false;}if("unload"==_22&&_23!==this){_17[_17.length]=[el,_22,fn,_23,_24];return true;}var _26=(_24)?_23:el;var _27=function(e){return fn.call(_26,YAHOO.util.Event.getEvent(e),_23);};var li=[el,_22,fn,_27,_26];var _30=_15.length;_15[_30]=li;if(this.useLegacyEvent(el,_22)){var _31=this.getLegacyIndex(el,_22);if(_31==-1){_31=_19.length;_19[_31]=[el,_22,el["on"+_22]];_20[_31]=[];el["on"+_22]=function(e){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(e),_31);};}_20[_31].push(_30);}else{if(el.addEventListener){el.addEventListener(_22,_27,false);}else{if(el.attachEvent){el.attachEvent("on"+_22,_27);}}}return true;},fireLegacyEvent:function(e,_32){var ok=true;var le=_20[_32];for(i=0;i<le.length;++i){var _34=le[i];if(_34){var li=_15[_34];if(li&&li[this.WFN]){var _35=li[this.ADJ_SCOPE];var ret=li[this.WFN].call(_35,e);ok=(ok&&ret);}else{delete le[i];}}}return ok;},getLegacyIndex:function(el,_37){for(var i=0;i<_19.length;++i){var le=_19[i];if(le&&le[0]==el&&le[1]==_37){return i;}}return -1;},useLegacyEvent:function(el,_38){return ((!el.addEventListener&&!el.attachEvent)||(_38=="click"&&this.isSafari));},removeListener:function(el,_39,fn){if(typeof el=="string"){el=this.getEl(el);}else{if(this._isValidCollection(el)){var ok=true;for(var i=0;i<el.length;++i){ok=(this.removeListener(el[i],_39,fn)&&ok);}return ok;}}var _40=null;var _41=this._getCacheIndex(el,_39,fn);if(_41>=0){_40=_15[_41];}if(!el||!_40){return false;}if(el.removeEventListener){el.removeEventListener(_39,_40[this.WFN],false);}else{if(el.detachEvent){el.detachEvent("on"+_39,_40[this.WFN]);}}delete _15[_41][this.WFN];delete _15[_41][this.FN];delete _15[_41];return true;},getTarget:function(ev,_43){var t=ev.target||ev.srcElement;if(_43&&t&&"#text"==t.nodeName){return t.parentNode;}else{return t;}},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}return y;},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else{if(ev.type=="mouseover"){t=ev.fromElement;}}}return t;},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(e){return t;}}return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}c=c.caller;}}return ev;},getCharCode:function(ev){return ev.charCode||(ev.type=="keypress")?ev.keyCode:0;},_getCacheIndex:function(el,_48,fn){for(var i=0;i<_15.length;++i){var li=_15[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==_48){return i;}}return -1;},_isValidCollection:function(o){return (o&&o.length&&typeof o!="string"&&!o.tagName&&!o.alert&&typeof o[0]!="undefined");},elCache:{},getEl:function(id){return document.getElementById(id);},clearCache:function(){for(i in this.elCache){delete this.elCache[i];}},regCE:function(ce){_18.push(ce);},_load:function(e){_14=true;},_tryPreloadAttach:function(){var _52=!_14;for(var i=0;i<_16.length;++i){var d=_16[i];if(d){var el=this.getEl(d[this.EL]);if(el){this.on(el,d[this.TYPE],d[this.FN],d[this.SCOPE],d[this.ADJ_SCOPE]);delete _16[i];}}}if(_52){setTimeout("YAHOO.util.Event._tryPreloadAttach()",50);}},_unload:function(e,me){for(var i=0;i<_17.length;++i){var l=_17[i];if(l){var _56=(l[this.ADJ_SCOPE])?l[this.SCOPE]:window;l[this.FN].call(_56,this.getEvent(e),l[this.SCOPE]);}}if(_15&&_15.length>0){for(i=0;i<_15.length;++i){l=_15[i];if(l){this.removeListener(l[this.EL],l[this.TYPE],l[this.FN]);}}this.clearCache();}for(i=0;i<_18.length;++i){_18[i].unsubscribeAll();delete _18[i];}for(i=0;i<_19.length;++i){delete _19[i][0];delete _19[i];}},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement;db=document.body;if(dd&&dd.scrollTop){return [dd.scrollTop,dd.scrollLeft];}else{if(db){return [db.scrollTop,db.scrollLeft];}else{return [0,0];}}}};}();YAHOO.util.Event.on=YAHOO.util.Event.addListener;if(document&&document.body){YAHOO.util.Event._load();}else{YAHOO.util.Event.on(window,"load",YAHOO.util.Event._load,YAHOO.util.Event,true);}YAHOO.util.Event.on(window,"unload",YAHOO.util.Event._unload,YAHOO.util.Event,true);YAHOO.util.Event._tryPreloadAttach();}