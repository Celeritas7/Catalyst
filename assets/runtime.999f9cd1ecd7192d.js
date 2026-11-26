/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){'use strict';(function(c,x){"object"===typeof exports&&"undefined"!==typeof module?x(exports):"function"===typeof define&&define.amd?define(["exports"],x):(c=c||self,x(c.React={}))})(this,function(c){function x(a){if(null===a||"object"!==typeof a)return null;a=V&&a[V]||a["@@iterator"];return"function"===typeof a?a:null}function w(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Y(){}function K(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Z(a,b,
e){var m,d={},c=null,h=null;if(null!=b)for(m in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(c=""+b.key),b)aa.call(b,m)&&!ba.hasOwnProperty(m)&&(d[m]=b[m]);var l=arguments.length-2;if(1===l)d.children=e;else if(1<l){for(var f=Array(l),k=0;k<l;k++)f[k]=arguments[k+2];d.children=f}if(a&&a.defaultProps)for(m in l=a.defaultProps,l)void 0===d[m]&&(d[m]=l[m]);return{$$typeof:y,type:a,key:c,ref:h,props:d,_owner:L.current}}function oa(a,b){return{$$typeof:y,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}
function M(a){return"object"===typeof a&&null!==a&&a.$$typeof===y}function pa(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?pa(""+a.key):b.toString(36)}function B(a,b,e,m,d){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;var h=!1;if(null===a)h=!0;else switch(c){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case y:case qa:h=!0}}if(h)return h=a,d=d(h),a=""===m?"."+
N(h,0):m,ca(d)?(e="",null!=a&&(e=a.replace(da,"$&/")+"/"),B(d,b,e,"",function(a){return a})):null!=d&&(M(d)&&(d=oa(d,e+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(da,"$&/")+"/")+a)),b.push(d)),1;h=0;m=""===m?".":m+":";if(ca(a))for(var l=0;l<a.length;l++){c=a[l];var f=m+N(c,l);h+=B(c,b,e,f,d)}else if(f=x(a),"function"===typeof f)for(a=f.call(a),l=0;!(c=a.next()).done;)c=c.value,f=m+N(c,l++),h+=B(c,b,e,f,d);else if("object"===c)throw b=String(a),Error("Objects are not valid as a React child (found: "+
("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}function C(a,b,e){if(null==a)return a;var c=[],d=0;B(a,c,"","",function(a){return b.call(e,a,d++)});return c}function ra(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=
0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}function O(a,b){var e=a.length;a.push(b);a:for(;0<e;){var c=e-1>>>1,d=a[c];if(0<D(d,b))a[c]=b,a[e]=d,e=c;else break a}}function p(a){return 0===a.length?null:a[0]}function E(a){if(0===a.length)return null;var b=a[0],e=a.pop();if(e!==b){a[0]=e;a:for(var c=0,d=a.length,k=d>>>1;c<k;){var h=2*(c+1)-1,l=a[h],f=h+1,g=a[f];if(0>D(l,e))f<d&&0>D(g,l)?(a[c]=g,a[f]=e,c=f):(a[c]=l,a[h]=e,c=h);else if(f<d&&0>D(g,e))a[c]=g,a[f]=e,c=f;else break a}}return b}
function D(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}function P(a){for(var b=p(r);null!==b;){if(null===b.callback)E(r);else if(b.startTime<=a)E(r),b.sortIndex=b.expirationTime,O(q,b);else break;b=p(r)}}function Q(a){z=!1;P(a);if(!u)if(null!==p(q))u=!0,R(S);else{var b=p(r);null!==b&&T(Q,b.startTime-a)}}function S(a,b){u=!1;z&&(z=!1,ea(A),A=-1);F=!0;var c=k;try{P(b);for(n=p(q);null!==n&&(!(n.expirationTime>b)||a&&!fa());){var m=n.callback;if("function"===typeof m){n.callback=null;
k=n.priorityLevel;var d=m(n.expirationTime<=b);b=v();"function"===typeof d?n.callback=d:n===p(q)&&E(q);P(b)}else E(q);n=p(q)}if(null!==n)var g=!0;else{var h=p(r);null!==h&&T(Q,h.startTime-b);g=!1}return g}finally{n=null,k=c,F=!1}}function fa(){return v()-ha<ia?!1:!0}function R(a){G=a;H||(H=!0,I())}function T(a,b){A=ja(function(){a(v())},b)}function ka(a){throw Error("act(...) is not supported in production builds of React.");}var y=Symbol.for("react.element"),qa=Symbol.for("react.portal"),sa=Symbol.for("react.fragment"),
ta=Symbol.for("react.strict_mode"),ua=Symbol.for("react.profiler"),va=Symbol.for("react.provider"),wa=Symbol.for("react.context"),xa=Symbol.for("react.forward_ref"),ya=Symbol.for("react.suspense"),za=Symbol.for("react.memo"),Aa=Symbol.for("react.lazy"),V=Symbol.iterator,X={isMounted:function(a){return!1},enqueueForceUpdate:function(a,b,c){},enqueueReplaceState:function(a,b,c,m){},enqueueSetState:function(a,b,c,m){}},la=Object.assign,W={};w.prototype.isReactComponent={};w.prototype.setState=function(a,
b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};w.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};Y.prototype=w.prototype;var t=K.prototype=new Y;t.constructor=K;la(t,w.prototype);t.isPureReactComponent=!0;var ca=Array.isArray,aa=Object.prototype.hasOwnProperty,L={current:null},
ba={key:!0,ref:!0,__self:!0,__source:!0},da=/\/+/g,g={current:null},J={transition:null};if("object"===typeof performance&&"function"===typeof performance.now){var Ba=performance;var v=function(){return Ba.now()}}else{var ma=Date,Ca=ma.now();v=function(){return ma.now()-Ca}}var q=[],r=[],Da=1,n=null,k=3,F=!1,u=!1,z=!1,ja="function"===typeof setTimeout?setTimeout:null,ea="function"===typeof clearTimeout?clearTimeout:null,na="undefined"!==typeof setImmediate?setImmediate:null;"undefined"!==typeof navigator&&
void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var H=!1,G=null,A=-1,ia=5,ha=-1,U=function(){if(null!==G){var a=v();ha=a;var b=!0;try{b=G(!0,a)}finally{b?I():(H=!1,G=null)}}else H=!1};if("function"===typeof na)var I=function(){na(U)};else if("undefined"!==typeof MessageChannel){t=new MessageChannel;var Ea=t.port2;t.port1.onmessage=U;I=function(){Ea.postMessage(null)}}else I=function(){ja(U,0)};t={ReactCurrentDispatcher:g,
ReactCurrentOwner:L,ReactCurrentBatchConfig:J,Scheduler:{__proto__:null,unstable_ImmediatePriority:1,unstable_UserBlockingPriority:2,unstable_NormalPriority:3,unstable_IdlePriority:5,unstable_LowPriority:4,unstable_runWithPriority:function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=k;k=a;try{return b()}finally{k=c}},unstable_next:function(a){switch(k){case 1:case 2:case 3:var b=3;break;default:b=k}var c=k;k=b;try{return a()}finally{k=c}},unstable_scheduleCallback:function(a,
b,c){var e=v();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?e+c:e):c=e;switch(a){case 1:var d=-1;break;case 2:d=250;break;case 5:d=1073741823;break;case 4:d=1E4;break;default:d=5E3}d=c+d;a={id:Da++,callback:b,priorityLevel:a,startTime:c,expirationTime:d,sortIndex:-1};c>e?(a.sortIndex=c,O(r,a),null===p(q)&&a===p(r)&&(z?(ea(A),A=-1):z=!0,T(Q,c-e))):(a.sortIndex=d,O(q,a),u||F||(u=!0,R(S)));return a},unstable_cancelCallback:function(a){a.callback=null},unstable_wrapCallback:function(a){var b=
k;return function(){var c=k;k=b;try{return a.apply(this,arguments)}finally{k=c}}},unstable_getCurrentPriorityLevel:function(){return k},unstable_shouldYield:fa,unstable_requestPaint:function(){},unstable_continueExecution:function(){u||F||(u=!0,R(S))},unstable_pauseExecution:function(){},unstable_getFirstCallbackNode:function(){return p(q)},get unstable_now(){return v},unstable_forceFrameRate:function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):
ia=0<a?Math.floor(1E3/a):5},unstable_Profiling:null}};c.Children={map:C,forEach:function(a,b,c){C(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;C(a,function(){b++});return b},toArray:function(a){return C(a,function(a){return a})||[]},only:function(a){if(!M(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};c.Component=w;c.Fragment=sa;c.Profiler=ua;c.PureComponent=K;c.StrictMode=ta;c.Suspense=ya;c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=
t;c.act=ka;c.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var e=la({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=L.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(f in b)aa.call(b,f)&&!ba.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==l?l[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){l=
Array(f);for(var g=0;g<f;g++)l[g]=arguments[g+2];e.children=l}return{$$typeof:y,type:a.type,key:d,ref:k,props:e,_owner:h}};c.createContext=function(a){a={$$typeof:wa,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:va,_context:a};return a.Consumer=a};c.createElement=Z;c.createFactory=function(a){var b=Z.bind(null,a);b.type=a;return b};c.createRef=function(){return{current:null}};c.forwardRef=function(a){return{$$typeof:xa,
render:a}};c.isValidElement=M;c.lazy=function(a){return{$$typeof:Aa,_payload:{_status:-1,_result:a},_init:ra}};c.memo=function(a,b){return{$$typeof:za,type:a,compare:void 0===b?null:b}};c.startTransition=function(a,b){b=J.transition;J.transition={};try{a()}finally{J.transition=b}};c.unstable_act=ka;c.useCallback=function(a,b){return g.current.useCallback(a,b)};c.useContext=function(a){return g.current.useContext(a)};c.useDebugValue=function(a,b){};c.useDeferredValue=function(a){return g.current.useDeferredValue(a)};
c.useEffect=function(a,b){return g.current.useEffect(a,b)};c.useId=function(){return g.current.useId()};c.useImperativeHandle=function(a,b,c){return g.current.useImperativeHandle(a,b,c)};c.useInsertionEffect=function(a,b){return g.current.useInsertionEffect(a,b)};c.useLayoutEffect=function(a,b){return g.current.useLayoutEffect(a,b)};c.useMemo=function(a,b){return g.current.useMemo(a,b)};c.useReducer=function(a,b,c){return g.current.useReducer(a,b,c)};c.useRef=function(a){return g.current.useRef(a)};
c.useState=function(a){return g.current.useState(a)};c.useSyncExternalStore=function(a,b,c){return g.current.useSyncExternalStore(a,b,c)};c.useTransition=function(){return g.current.useTransition()};c.version="18.3.1"});
})();

;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';(function(Q,zb){"object"===typeof exports&&"undefined"!==typeof module?zb(exports,require("react")):"function"===typeof define&&define.amd?define(["exports","react"],zb):(Q=Q||self,zb(Q.ReactDOM={},Q.React))})(this,function(Q,zb){function m(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
function mb(a,b){Ab(a,b);Ab(a+"Capture",b)}function Ab(a,b){$b[a]=b;for(a=0;a<b.length;a++)cg.add(b[a])}function bj(a){if(Zd.call(dg,a))return!0;if(Zd.call(eg,a))return!1;if(cj.test(a))return dg[a]=!0;eg[a]=!0;return!1}function dj(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function ej(a,b,c,d){if(null===
b||"undefined"===typeof b||dj(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function Y(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}function $d(a,b,c,d){var e=R.hasOwnProperty(b)?R[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==
b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])ej(b,c,e,d)&&(c=null),d||null===e?bj(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}function ac(a){if(null===a||"object"!==typeof a)return null;a=fg&&a[fg]||a["@@iterator"];return"function"===typeof a?a:null}function bc(a,b,
c){if(void 0===ae)try{throw Error();}catch(d){ae=(b=d.stack.trim().match(/\n( *(at )?)/))&&b[1]||""}return"\n"+ae+a}function be(a,b){if(!a||ce)return"";ce=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(n){var d=n}Reflect.construct(a,[],b)}else{try{b.call()}catch(n){d=n}a.call(b.prototype)}else{try{throw Error();
}catch(n){d=n}a()}}catch(n){if(n&&d&&"string"===typeof n.stack){for(var e=n.stack.split("\n"),f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{ce=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?bc(a):
""}function fj(a){switch(a.tag){case 5:return bc(a.type);case 16:return bc("Lazy");case 13:return bc("Suspense");case 19:return bc("SuspenseList");case 0:case 2:case 15:return a=be(a.type,!1),a;case 11:return a=be(a.type.render,!1),a;case 1:return a=be(a.type,!0),a;default:return""}}function de(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case Bb:return"Fragment";case Cb:return"Portal";case ee:return"Profiler";case fe:return"StrictMode";
case ge:return"Suspense";case he:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case gg:return(a.displayName||"Context")+".Consumer";case hg:return(a._context.displayName||"Context")+".Provider";case ie:var b=a.render;a=a.displayName;a||(a=b.displayName||b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case je:return b=a.displayName||null,null!==b?b:de(a.type)||"Memo";case Ta:b=a._payload;a=a._init;try{return de(a(b))}catch(c){}}return null}function gj(a){var b=a.type;
switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return de(b);case 8:return b===fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";
case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Ua(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}function ig(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===
b)}function hj(a){var b=ig(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Pc(a){a._valueTracker||(a._valueTracker=hj(a))}function jg(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ig(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Qc(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function ke(a,b){var c=b.checked;return E({},b,{defaultChecked:void 0,defaultValue:void 0,
value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function kg(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Ua(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function lg(a,b){b=b.checked;null!=b&&$d(a,"checked",b,!1)}function le(a,b){lg(a,b);var c=Ua(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=
c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?me(a,b.type,c):b.hasOwnProperty("defaultValue")&&me(a,b.type,Ua(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}function mg(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;
c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}function me(a,b,c){if("number"!==b||Qc(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function Db(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=
!0)}else{c=""+Ua(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}function ne(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(m(91));return E({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function ng(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(m(92));if(cc(c)){if(1<c.length)throw Error(m(93));
c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Ua(c)}}function og(a,b){var c=Ua(b.value),d=Ua(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function pg(a,b){b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function qg(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function oe(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?qg(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}function rg(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||dc.hasOwnProperty(a)&&dc[a]?(""+b).trim():b+"px"}function sg(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rg(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}function pe(a,b){if(b){if(ij[a]&&
(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(m(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(m(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(m(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(m(62));}}function qe(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;
default:return!0}}function re(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function tg(a){if(a=ec(a)){if("function"!==typeof se)throw Error(m(280));var b=a.stateNode;b&&(b=Rc(b),se(a.stateNode,a.type,b))}}function ug(a){Eb?Fb?Fb.push(a):Fb=[a]:Eb=a}function vg(){if(Eb){var a=Eb,b=Fb;Fb=Eb=null;tg(a);if(b)for(a=0;a<b.length;a++)tg(b[a])}}function wg(a,b,c){if(te)return a(b,c);te=!0;try{return xg(a,b,c)}finally{if(te=
!1,null!==Eb||null!==Fb)yg(),vg()}}function fc(a,b){var c=a.stateNode;if(null===c)return null;var d=Rc(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;
if(c&&"function"!==typeof c)throw Error(m(231,b,typeof c));return c}function jj(a,b,c,d,e,f,g,h,k){gc=!1;Sc=null;kj.apply(lj,arguments)}function mj(a,b,c,d,e,f,g,h,k){jj.apply(this,arguments);if(gc){if(gc){var n=Sc;gc=!1;Sc=null}else throw Error(m(198));Tc||(Tc=!0,ue=n)}}function nb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function zg(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,
null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Ag(a){if(nb(a)!==a)throw Error(m(188));}function nj(a){var b=a.alternate;if(!b){b=nb(a);if(null===b)throw Error(m(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Ag(e),a;if(f===d)return Ag(e),b;f=f.sibling}throw Error(m(188));}if(c.return!==d.return)c=e,d=f;
else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(m(189));}}if(c.alternate!==d)throw Error(m(190));}if(3!==c.tag)throw Error(m(188));return c.stateNode.current===c?a:b}function Bg(a){a=nj(a);return null!==a?Cg(a):null}function Cg(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=Cg(a);if(null!==b)return b;a=a.sibling}return null}
function oj(a,b){if(Ca&&"function"===typeof Ca.onCommitFiberRoot)try{Ca.onCommitFiberRoot(Uc,a,void 0,128===(a.current.flags&128))}catch(c){}}function pj(a){a>>>=0;return 0===a?32:31-(qj(a)/rj|0)|0}function hc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&
4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return a}}function Vc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=hc(h):(f&=g,0!==f&&(d=hc(f)))}else g=c&~e,0!==g?d=hc(g):0!==f&&(d=hc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&
(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-ta(b),e=1<<c,d|=a[c],b&=~e;return d}function sj(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;
case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tj(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-ta(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=sj(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function ve(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Dg(){var a=Wc;Wc<<=1;0===(Wc&4194240)&&(Wc=64);return a}function we(a){for(var b=[],c=0;31>c;c++)b.push(a);
return b}function ic(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-ta(b);a[b]=c}function uj(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-ta(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}function xe(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-ta(c),e=1<<d;e&b|a[d]&
b&&(a[d]|=b);c&=~e}}function Eg(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}function Fg(a,b){switch(a){case "focusin":case "focusout":Va=null;break;case "dragenter":case "dragleave":Wa=null;break;case "mouseover":case "mouseout":Xa=null;break;case "pointerover":case "pointerout":jc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":kc.delete(b.pointerId)}}function lc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,
nativeEvent:f,targetContainers:[e]},null!==b&&(b=ec(b),null!==b&&Gg(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}function vj(a,b,c,d,e){switch(b){case "focusin":return Va=lc(Va,a,b,c,d,e),!0;case "dragenter":return Wa=lc(Wa,a,b,c,d,e),!0;case "mouseover":return Xa=lc(Xa,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;jc.set(f,lc(jc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,kc.set(f,lc(kc.get(f)||null,a,b,
c,d,e)),!0}return!1}function Hg(a){var b=ob(a.target);if(null!==b){var c=nb(b);if(null!==c)if(b=c.tag,13===b){if(b=zg(c),null!==b){a.blockedOn=b;wj(a.priority,function(){xj(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=ye(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;
var d=new c.constructor(c.type,c);ze=d;c.target.dispatchEvent(d);ze=null}else return b=ec(c),null!==b&&Gg(b),a.blockedOn=c,!1;b.shift()}return!0}function Ig(a,b,c){Xc(a)&&c.delete(b)}function yj(){Ae=!1;null!==Va&&Xc(Va)&&(Va=null);null!==Wa&&Xc(Wa)&&(Wa=null);null!==Xa&&Xc(Xa)&&(Xa=null);jc.forEach(Ig);kc.forEach(Ig)}function mc(a,b){a.blockedOn===b&&(a.blockedOn=null,Ae||(Ae=!0,Jg(Kg,yj)))}function nc(a){if(0<Yc.length){mc(Yc[0],a);for(var b=1;b<Yc.length;b++){var c=Yc[b];c.blockedOn===a&&(c.blockedOn=
null)}}null!==Va&&mc(Va,a);null!==Wa&&mc(Wa,a);null!==Xa&&mc(Xa,a);b=function(b){return mc(b,a)};jc.forEach(b);kc.forEach(b);for(b=0;b<Ya.length;b++)c=Ya[b],c.blockedOn===a&&(c.blockedOn=null);for(;0<Ya.length&&(b=Ya[0],null===b.blockedOn);)Hg(b),null===b.blockedOn&&Ya.shift()}function zj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=1,Be(a,b,c,d)}finally{z=e,Gb.transition=f}}function Aj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=4,Be(a,b,c,d)}finally{z=e,Gb.transition=
f}}function Be(a,b,c,d){if(Zc){var e=ye(a,b,c,d);if(null===e)Ce(a,b,d,$c,c),Fg(a,d);else if(vj(e,a,b,c,d))d.stopPropagation();else if(Fg(a,d),b&4&&-1<Bj.indexOf(a)){for(;null!==e;){var f=ec(e);null!==f&&Cj(f);f=ye(a,b,c,d);null===f&&Ce(a,b,d,$c,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else Ce(a,b,d,null,c)}}function ye(a,b,c,d){$c=null;a=re(d);a=ob(a);if(null!==a)if(b=nb(a),null===b)a=null;else if(c=b.tag,13===c){a=zg(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===
b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);$c=a;return null}function Lg(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;
case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;case "message":switch(Dj()){case De:return 1;case Mg:return 4;case ad:case Ej:return 16;case Ng:return 536870912;default:return 16}default:return 16}}function Og(){if(bd)return bd;
var a,b=Ee,c=b.length,d,e="value"in Za?Za.value:Za.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return bd=e.slice(a,1<d?1-d:void 0)}function cd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function dd(){return!0}function Pg(){return!1}function ka(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;
for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?dd:Pg;this.isPropagationStopped=Pg;return this}E(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=dd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():
"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=dd)},persist:function(){},isPersistent:dd});return b}function Fj(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Gj[a])?!!b[a]:!1}function Fe(a){return Fj}function Qg(a,b){switch(a){case "keyup":return-1!==Hj.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function Rg(a){a=a.detail;return"object"===typeof a&&
"data"in a?a.data:null}function Ij(a,b){switch(a){case "compositionend":return Rg(b);case "keypress":if(32!==b.which)return null;Sg=!0;return Tg;case "textInput":return a=b.data,a===Tg&&Sg?null:a;default:return null}}function Jj(a,b){if(Hb)return"compositionend"===a||!Ge&&Qg(a,b)?(a=Og(),bd=Ee=Za=null,Hb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;
case "compositionend":return Ug&&"ko"!==b.locale?null:b.data;default:return null}}function Vg(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Kj[a.type]:"textarea"===b?!0:!1}function Lj(a){if(!Ia)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function Wg(a,b,c,d){ug(d);b=ed(b,"onChange");0<b.length&&(c=new He("onChange","change",null,c,d),a.push({event:c,listeners:b}))}function Mj(a){Xg(a,
0)}function fd(a){var b=Ib(a);if(jg(b))return a}function Nj(a,b){if("change"===a)return b}function Yg(){oc&&(oc.detachEvent("onpropertychange",Zg),pc=oc=null)}function Zg(a){if("value"===a.propertyName&&fd(pc)){var b=[];Wg(b,pc,a,re(a));wg(Mj,b)}}function Oj(a,b,c){"focusin"===a?(Yg(),oc=b,pc=c,oc.attachEvent("onpropertychange",Zg)):"focusout"===a&&Yg()}function Pj(a,b){if("selectionchange"===a||"keyup"===a||"keydown"===a)return fd(pc)}function Qj(a,b){if("click"===a)return fd(b)}function Rj(a,b){if("input"===
a||"change"===a)return fd(b)}function Sj(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}function qc(a,b){if(ua(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!Zd.call(b,e)||!ua(a[e],b[e]))return!1}return!0}function $g(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function ah(a,b){var c=$g(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;
if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=$g(c)}}function bh(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?bh(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function ch(){for(var a=window,b=Qc();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;
b=Qc(a.document)}return b}function Ie(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}function Tj(a){var b=ch(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&bh(c.ownerDocument.documentElement,c)){if(null!==d&&Ie(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);
else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=ah(c,f);var g=ah(c,d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),
a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}function dh(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Je||null==Jb||Jb!==Qc(d)||(d=Jb,"selectionStart"in d&&Ie(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d=
{anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),rc&&qc(rc,d)||(rc=d,d=ed(Ke,"onSelect"),0<d.length&&(b=new He("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Jb)))}function gd(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}function hd(a){if(Le[a])return Le[a];if(!Kb[a])return a;var b=Kb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in eh)return Le[a]=b[c];return a}function $a(a,
b){fh.set(a,b);mb(b,[a])}function gh(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;mj(d,b,void 0,a);a.currentTarget=null}function Xg(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;gh(e,h,n);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;
gh(e,h,n);f=k}}}if(Tc)throw a=ue,Tc=!1,ue=null,a;}function B(a,b){var c=b[Me];void 0===c&&(c=b[Me]=new Set);var d=a+"__bubble";c.has(d)||(hh(b,a,2,!1),c.add(d))}function Ne(a,b,c){var d=0;b&&(d|=4);hh(c,a,d,b)}function sc(a){if(!a[id]){a[id]=!0;cg.forEach(function(b){"selectionchange"!==b&&(Uj.has(b)||Ne(b,!1,a),Ne(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[id]||(b[id]=!0,Ne("selectionchange",!1,b))}}function hh(a,b,c,d,e){switch(Lg(b)){case 1:e=zj;break;case 4:e=Aj;break;default:e=
Be}c=e.bind(null,b,c,a);e=void 0;!Oe||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}function Ce(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;
if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=ob(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}wg(function(){var d=f,e=re(c),g=[];a:{var h=fh.get(a);if(void 0!==h){var k=He,m=a;switch(a){case "keypress":if(0===cd(c))break a;case "keydown":case "keyup":k=Vj;break;case "focusin":m="focus";k=Pe;break;case "focusout":m="blur";k=Pe;break;case "beforeblur":case "afterblur":k=Pe;break;
case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=ih;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=Wj;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Xj;break;case jh:case kh:case lh:k=Yj;break;case mh:k=Zj;break;case "scroll":k=ak;break;case "wheel":k=bk;break;case "copy":case "cut":case "paste":k=
ck;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=nh}var l=0!==(b&4),p=!l&&"scroll"===a,w=l?null!==h?h+"Capture":null:h;l=[];for(var A=d,t;null!==A;){t=A;var M=t.stateNode;5===t.tag&&null!==M&&(t=M,null!==w&&(M=fc(A,w),null!=M&&l.push(tc(A,M,t))));if(p)break;A=A.return}0<l.length&&(h=new k(h,m,null,c,e),g.push({event:h,listeners:l}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===
a;k="mouseout"===a||"pointerout"===a;if(h&&c!==ze&&(m=c.relatedTarget||c.fromElement)&&(ob(m)||m[Ja]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(m=c.relatedTarget||c.toElement,k=d,m=m?ob(m):null,null!==m&&(p=nb(m),m!==p||5!==m.tag&&6!==m.tag))m=null}else k=null,m=d;if(k!==m){l=ih;M="onMouseLeave";w="onMouseEnter";A="mouse";if("pointerout"===a||"pointerover"===a)l=nh,M="onPointerLeave",w="onPointerEnter",A="pointer";p=null==k?h:Ib(k);t=null==
m?h:Ib(m);h=new l(M,A+"leave",k,c,e);h.target=p;h.relatedTarget=t;M=null;ob(e)===d&&(l=new l(w,A+"enter",m,c,e),l.target=t,l.relatedTarget=p,M=l);p=M;if(k&&m)b:{l=k;w=m;A=0;for(t=l;t;t=Lb(t))A++;t=0;for(M=w;M;M=Lb(M))t++;for(;0<A-t;)l=Lb(l),A--;for(;0<t-A;)w=Lb(w),t--;for(;A--;){if(l===w||null!==w&&l===w.alternate)break b;l=Lb(l);w=Lb(w)}l=null}else l=null;null!==k&&oh(g,h,k,l,!1);null!==m&&null!==p&&oh(g,p,m,l,!0)}}}a:{h=d?Ib(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===
k&&"file"===h.type)var ma=Nj;else if(Vg(h))if(ph)ma=Rj;else{ma=Pj;var va=Oj}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(ma=Qj);if(ma&&(ma=ma(a,d))){Wg(g,ma,c,e);break a}va&&va(a,h,d);"focusout"===a&&(va=h._wrapperState)&&va.controlled&&"number"===h.type&&me(h,"number",h.value)}va=d?Ib(d):window;switch(a){case "focusin":if(Vg(va)||"true"===va.contentEditable)Jb=va,Ke=d,rc=null;break;case "focusout":rc=Ke=Jb=null;break;case "mousedown":Je=!0;break;case "contextmenu":case "mouseup":case "dragend":Je=
!1;dh(g,c,e);break;case "selectionchange":if(dk)break;case "keydown":case "keyup":dh(g,c,e)}var ab;if(Ge)b:{switch(a){case "compositionstart":var da="onCompositionStart";break b;case "compositionend":da="onCompositionEnd";break b;case "compositionupdate":da="onCompositionUpdate";break b}da=void 0}else Hb?Qg(a,c)&&(da="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(da="onCompositionStart");da&&(Ug&&"ko"!==c.locale&&(Hb||"onCompositionStart"!==da?"onCompositionEnd"===da&&Hb&&(ab=Og()):(Za=e,Ee=
"value"in Za?Za.value:Za.textContent,Hb=!0)),va=ed(d,da),0<va.length&&(da=new qh(da,a,null,c,e),g.push({event:da,listeners:va}),ab?da.data=ab:(ab=Rg(c),null!==ab&&(da.data=ab))));if(ab=ek?Ij(a,c):Jj(a,c))d=ed(d,"onBeforeInput"),0<d.length&&(e=new fk("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=ab)}Xg(g,b)})}function tc(a,b,c){return{instance:a,listener:b,currentTarget:c}}function ed(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==
f&&(e=f,f=fc(a,c),null!=f&&d.unshift(tc(a,f,e)),f=fc(a,b),null!=f&&d.push(tc(a,f,e)));a=a.return}return d}function Lb(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}function oh(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,n=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==n&&(h=n,e?(k=fc(c,f),null!=k&&g.unshift(tc(c,k,h))):e||(k=fc(c,f),null!=k&&g.push(tc(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function rh(a){return("string"===
typeof a?a:""+a).replace(gk,"\n").replace(hk,"")}function jd(a,b,c,d){b=rh(b);if(rh(a)!==b&&c)throw Error(m(425));}function kd(){}function Qe(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}function ik(a){setTimeout(function(){throw a;})}function Re(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=
e.data,"/$"===c){if(0===d){a.removeChild(e);nc(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);nc(b)}function Ka(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}function sh(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}function ob(a){var b=a[Da];
if(b)return b;for(var c=a.parentNode;c;){if(b=c[Ja]||c[Da]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sh(a);null!==a;){if(c=a[Da])return c;a=sh(a)}return b}a=c;c=a.parentNode}return null}function ec(a){a=a[Da]||a[Ja];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function Ib(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(m(33));}function Rc(a){return a[uc]||null}function bb(a){return{current:a}}function v(a,b){0>Mb||(a.current=Se[Mb],Se[Mb]=null,Mb--)}
function y(a,b,c){Mb++;Se[Mb]=a.current;a.current=b}function Nb(a,b){var c=a.type.contextTypes;if(!c)return cb;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function ea(a){a=a.childContextTypes;return null!==a&&void 0!==a}function th(a,b,c){if(J.current!==cb)throw Error(m(168));
y(J,b);y(S,c)}function uh(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(m(108,gj(a)||"Unknown",e));return E({},c,d)}function ld(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||cb;pb=J.current;y(J,a);y(S,S.current);return!0}function vh(a,b,c){var d=a.stateNode;if(!d)throw Error(m(169));c?(a=uh(a,b,pb),d.__reactInternalMemoizedMergedChildContext=a,v(S),v(J),y(J,a)):v(S);
y(S,c)}function wh(a){null===La?La=[a]:La.push(a)}function jk(a){md=!0;wh(a)}function db(){if(!Te&&null!==La){Te=!0;var a=0,b=z;try{var c=La;for(z=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}La=null;md=!1}catch(e){throw null!==La&&(La=La.slice(a+1)),xh(De,db),e;}finally{z=b,Te=!1}}return null}function qb(a,b){Ob[Pb++]=nd;Ob[Pb++]=od;od=a;nd=b}function yh(a,b,c){na[oa++]=Ma;na[oa++]=Na;na[oa++]=rb;rb=a;var d=Ma;a=Na;var e=32-ta(d)-1;d&=~(1<<e);c+=1;var f=32-ta(b)+e;if(30<f){var g=e-e%5;
f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;Ma=1<<32-ta(b)+e|c<<e|d;Na=f+a}else Ma=1<<f|c<<e|d,Na=a}function Ue(a){null!==a.return&&(qb(a,1),yh(a,1,0))}function Ve(a){for(;a===od;)od=Ob[--Pb],Ob[Pb]=null,nd=Ob[--Pb],Ob[Pb]=null;for(;a===rb;)rb=na[--oa],na[oa]=null,Na=na[--oa],na[oa]=null,Ma=na[--oa],na[oa]=null}function zh(a,b){var c=pa(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}function Ah(a,b){switch(a.tag){case 5:var c=
a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,la=a,fa=Ka(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,la=a,fa=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==rb?{id:Ma,overflow:Na}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=pa(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,la=a,fa=null,!0):!1;default:return!1}}function We(a){return 0!==
(a.mode&1)&&0===(a.flags&128)}function Xe(a){if(D){var b=fa;if(b){var c=b;if(!Ah(a,b)){if(We(a))throw Error(m(418));b=Ka(c.nextSibling);var d=la;b&&Ah(a,b)?zh(d,c):(a.flags=a.flags&-4097|2,D=!1,la=a)}}else{if(We(a))throw Error(m(418));a.flags=a.flags&-4097|2;D=!1;la=a}}}function Bh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;la=a}function pd(a){if(a!==la)return!1;if(!D)return Bh(a),D=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Qe(a.type,
a.memoizedProps));if(b&&(b=fa)){if(We(a)){for(a=fa;a;)a=Ka(a.nextSibling);throw Error(m(418));}for(;b;)zh(a,b),b=Ka(b.nextSibling)}Bh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(m(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){fa=Ka(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}fa=null}}else fa=la?Ka(a.stateNode.nextSibling):null;return!0}function Qb(){fa=la=null;D=!1}function Ye(a){null===
wa?wa=[a]:wa.push(a)}function vc(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(m(309));var d=c.stateNode}if(!d)throw Error(m(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(m(284));if(!c._owner)throw Error(m(290,a));}return a}function qd(a,b){a=
Object.prototype.toString.call(b);throw Error(m(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ch(a){var b=a._init;return b(a._payload)}function Dh(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=eb(a,b);a.index=
0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ze(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===Bb)return l(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ta&&
Ch(f)===b.type))return d=e(b,c.props),d.ref=vc(a,b,c),d.return=a,d;d=rd(c.type,c.key,c.props,null,a.mode,d);d.ref=vc(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=$e(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function l(a,b,c,d,f){if(null===b||7!==b.tag)return b=sb(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function u(a,b,c){if("string"===
typeof b&&""!==b||"number"===typeof b)return b=Ze(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sd:return c=rd(b.type,b.key,b.props,null,a.mode,c),c.ref=vc(a,null,b),c.return=a,c;case Cb:return b=$e(b,a.mode,c),b.return=a,b;case Ta:var d=b._init;return u(a,d(b._payload),c)}if(cc(b)||ac(b))return b=sb(b,a.mode,c,null),b.return=a,b;qd(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==
e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sd:return c.key===e?k(a,b,c,d):null;case Cb:return c.key===e?n(a,b,c,d):null;case Ta:return e=c._init,r(a,b,e(c._payload),d)}if(cc(c)||ac(c))return null!==e?null:l(a,b,c,d,null);qd(a,c)}return null}function p(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sd:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,
e);case Cb:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e);case Ta:var f=d._init;return p(a,b,c,f(d._payload),e)}if(cc(d)||ac(d))return a=a.get(c)||null,l(b,a,d,e,null);qd(b,d)}return null}function x(e,g,h,k){for(var n=null,m=null,l=g,t=g=0,q=null;null!==l&&t<h.length;t++){l.index>t?(q=l,l=null):q=l.sibling;var A=r(e,l,h[t],k);if(null===A){null===l&&(l=q);break}a&&l&&null===A.alternate&&b(e,l);g=f(A,g,t);null===m?n=A:m.sibling=A;m=A;l=q}if(t===h.length)return c(e,l),D&&qb(e,t),n;if(null===l){for(;t<
h.length;t++)l=u(e,h[t],k),null!==l&&(g=f(l,g,t),null===m?n=l:m.sibling=l,m=l);D&&qb(e,t);return n}for(l=d(e,l);t<h.length;t++)q=p(l,e,t,h[t],k),null!==q&&(a&&null!==q.alternate&&l.delete(null===q.key?t:q.key),g=f(q,g,t),null===m?n=q:m.sibling=q,m=q);a&&l.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function I(e,g,h,k){var n=ac(h);if("function"!==typeof n)throw Error(m(150));h=n.call(h);if(null==h)throw Error(m(151));for(var l=n=null,q=g,t=g=0,A=null,w=h.next();null!==q&&!w.done;t++,w=
h.next()){q.index>t?(A=q,q=null):A=q.sibling;var x=r(e,q,w.value,k);if(null===x){null===q&&(q=A);break}a&&q&&null===x.alternate&&b(e,q);g=f(x,g,t);null===l?n=x:l.sibling=x;l=x;q=A}if(w.done)return c(e,q),D&&qb(e,t),n;if(null===q){for(;!w.done;t++,w=h.next())w=u(e,w.value,k),null!==w&&(g=f(w,g,t),null===l?n=w:l.sibling=w,l=w);D&&qb(e,t);return n}for(q=d(e,q);!w.done;t++,w=h.next())w=p(q,e,t,w.value,k),null!==w&&(a&&null!==w.alternate&&q.delete(null===w.key?t:w.key),g=f(w,g,t),null===l?n=w:l.sibling=
w,l=w);a&&q.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function v(a,d,f,h){"object"===typeof f&&null!==f&&f.type===Bb&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case sd:a:{for(var k=f.key,n=d;null!==n;){if(n.key===k){k=f.type;if(k===Bb){if(7===n.tag){c(a,n.sibling);d=e(n,f.props.children);d.return=a;a=d;break a}}else if(n.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ta&&Ch(k)===n.type){c(a,n.sibling);d=e(n,f.props);d.ref=vc(a,
n,f);d.return=a;a=d;break a}c(a,n);break}else b(a,n);n=n.sibling}f.type===Bb?(d=sb(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=rd(f.type,f.key,f.props,null,a.mode,h),h.ref=vc(a,d,f),h.return=a,a=h)}return g(a);case Cb:a:{for(n=f.key;null!==d;){if(d.key===n)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=$e(f,a.mode,h);d.return=a;
a=d}return g(a);case Ta:return n=f._init,v(a,d,n(f._payload),h)}if(cc(f))return x(a,d,f,h);if(ac(f))return I(a,d,f,h);qd(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ze(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return v}function af(){bf=Rb=td=null}function cf(a,b){b=ud.current;v(ud);a._currentValue=b}function df(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=
b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}function Sb(a,b){td=a;bf=Rb=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ha=!0),a.firstContext=null)}function qa(a){var b=a._currentValue;if(bf!==a)if(a={context:a,memoizedValue:b,next:null},null===Rb){if(null===td)throw Error(m(308));Rb=a;td.dependencies={lanes:0,firstContext:a}}else Rb=Rb.next=a;return b}function ef(a){null===tb?tb=[a]:tb.push(a)}function Eh(a,b,c,d){var e=b.interleaved;
null===e?(c.next=c,ef(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Oa(a,d)}function Oa(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}function ff(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue=
{baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function Pa(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function fb(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(p&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return kk(a,c)}e=d.interleaved;null===e?(b.next=b,ef(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Oa(a,c)}function vd(a,b,c){b=
b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function Gh(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,
shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=b;c.lastBaseUpdate=b}function wd(a,b,c,d){var e=a.updateQueue;gb=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,n=k.next;k.next=null;null===g?f=n:g.next=n;g=k;var l=a.alternate;null!==l&&(l=l.updateQueue,h=l.lastBaseUpdate,h!==g&&(null===h?l.firstBaseUpdate=n:h.next=n,l.lastBaseUpdate=k))}if(null!==f){var m=e.baseState;g=0;l=
n=k=null;h=f;do{var r=h.lane,p=h.eventTime;if((d&r)===r){null!==l&&(l=l.next={eventTime:p,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});a:{var x=a,v=h;r=b;p=c;switch(v.tag){case 1:x=v.payload;if("function"===typeof x){m=x.call(p,m,r);break a}m=x;break a;case 3:x.flags=x.flags&-65537|128;case 0:x=v.payload;r="function"===typeof x?x.call(p,m,r):x;if(null===r||void 0===r)break a;m=E({},m,r);break a;case 2:gb=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=
[h]:r.push(h))}else p={eventTime:p,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===l?(n=l=p,k=m):l=l.next=p,g|=r;h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===l&&(k=m);e.baseState=k;e.firstBaseUpdate=n;e.lastBaseUpdate=l;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);ra|=g;a.lanes=g;a.memoizedState=m}}function Hh(a,
b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(m(191,e));e.call(d)}}}function ub(a){if(a===wc)throw Error(m(174));return a}function gf(a,b){y(xc,b);y(yc,a);y(Ea,wc);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:oe(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=oe(b,a)}v(Ea);y(Ea,b)}function Tb(a){v(Ea);v(yc);v(xc)}function Ih(a){ub(xc.current);
var b=ub(Ea.current);var c=oe(b,a.type);b!==c&&(y(yc,a),y(Ea,c))}function hf(a){yc.current===a&&(v(Ea),v(yc))}function xd(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=
b.return;b=b.sibling}return null}function jf(){for(var a=0;a<kf.length;a++)kf[a]._workInProgressVersionPrimary=null;kf.length=0}function V(){throw Error(m(321));}function lf(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!ua(a[c],b[c]))return!1;return!0}function mf(a,b,c,d,e,f){vb=f;C=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;yd.current=null===a||null===a.memoizedState?lk:mk;a=c(d,e);if(zc){f=0;do{zc=!1;Ac=0;if(25<=f)throw Error(m(301));f+=1;N=K=null;b.updateQueue=null;
yd.current=nk;a=c(d,e)}while(zc)}yd.current=zd;b=null!==K&&null!==K.next;vb=0;N=K=C=null;Ad=!1;if(b)throw Error(m(300));return a}function nf(){var a=0!==Ac;Ac=0;return a}function Fa(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===N?C.memoizedState=N=a:N=N.next=a;return N}function sa(){if(null===K){var a=C.alternate;a=null!==a?a.memoizedState:null}else a=K.next;var b=null===N?C.memoizedState:N.next;if(null!==b)N=b,K=a;else{if(null===a)throw Error(m(310));K=a;
a={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null};null===N?C.memoizedState=N=a:N=N.next=a}return N}function Bc(a,b){return"function"===typeof b?b(a):b}function of(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=K,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,n=f;do{var l=n.lane;if((vb&
l)===l)null!==k&&(k=k.next={lane:0,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null}),d=n.hasEagerState?n.eagerState:a(d,n.action);else{var u={lane:l,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null};null===k?(h=k=u,g=d):k=k.next=u;C.lanes|=l;ra|=l}n=n.next}while(null!==n&&n!==f);null===k?g=d:k.next=h;ua(d,b.memoizedState)||(ha=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=
e.lane,C.lanes|=f,ra|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}function pf(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);ua(f,b.memoizedState)||(ha=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Jh(a,b,c){}function Kh(a,b,c){c=C;var d=sa(),
e=b(),f=!ua(d.memoizedState,e);f&&(d.memoizedState=e,ha=!0);d=d.queue;qf(Lh.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==N&&N.memoizedState.tag&1){c.flags|=2048;Cc(9,Mh.bind(null,c,d,e,b),void 0,null);if(null===O)throw Error(m(349));0!==(vb&30)||Nh(c,b,e)}return e}function Nh(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}function Mh(a,b,c,d){b.value=c;b.getSnapshot=
d;Oh(b)&&Ph(a)}function Lh(a,b,c){return c(function(){Oh(b)&&Ph(a)})}function Oh(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!ua(a,c)}catch(d){return!0}}function Ph(a){var b=Oa(a,1);null!==b&&xa(b,a,1,-1)}function Qh(a){var b=Fa();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bc,lastRenderedState:a};b.queue=a;a=a.dispatch=ok.bind(null,C,a);return[b.memoizedState,a]}function Cc(a,b,c,d){a={tag:a,create:b,
destroy:c,deps:d,next:null};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Rh(a){return sa().memoizedState}function Bd(a,b,c,d){var e=Fa();C.flags|=a;e.memoizedState=Cc(1|b,c,void 0,void 0===d?null:d)}function Cd(a,b,c,d){var e=sa();d=void 0===d?null:d;var f=void 0;if(null!==K){var g=K.memoizedState;f=g.destroy;if(null!==d&&lf(d,g.deps)){e.memoizedState=
Cc(b,c,f,d);return}}C.flags|=a;e.memoizedState=Cc(1|b,c,f,d)}function Sh(a,b){return Bd(8390656,8,a,b)}function qf(a,b){return Cd(2048,8,a,b)}function Th(a,b){return Cd(4,2,a,b)}function Uh(a,b){return Cd(4,4,a,b)}function Vh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function Wh(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Cd(4,4,Vh.bind(null,b,a),c)}function rf(a,b){}function Xh(a,b){var c=
sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function Yh(a,b){var c=sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Zh(a,b,c){if(0===(vb&21))return a.baseState&&(a.baseState=!1,ha=!0),a.memoizedState=c;ua(c,b)||(c=Dg(),C.lanes|=c,ra|=c,a.baseState=!0);return b}function pk(a,b,c){c=z;z=0!==c&&4>c?c:4;a(!0);var d=sf.transition;sf.transition=
{};try{a(!1),b()}finally{z=c,sf.transition=d}}function $h(){return sa().memoizedState}function qk(a,b,c){var d=hb(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,c);else if(c=Eh(a,b,c,d),null!==c){var e=Z();xa(c,a,d,e);ci(c,b,d)}}function ok(a,b,c){var d=hb(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,
h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(ua(h,g)){var k=b.interleaved;null===k?(e.next=e,ef(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(n){}finally{}c=Eh(a,b,e,d);null!==c&&(e=Z(),xa(c,a,d,e),ci(c,b,d))}}function ai(a){var b=a.alternate;return a===C||null!==b&&b===C}function bi(a,b){zc=Ad=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function ci(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function ya(a,b){if(a&&
a.defaultProps){b=E({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function tf(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:E({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}function di(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!qc(c,d)||!qc(e,f):!0}function ei(a,b,c){var d=!1,e=cb;var f=b.contextType;"object"===typeof f&&
null!==f?f=qa(f):(e=ea(b)?pb:J.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Nb(a,e):cb);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Dd;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}function fi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&
b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Dd.enqueueReplaceState(b,b.state,null)}function uf(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};ff(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=qa(f):(f=ea(b)?pb:J.current,e.context=Nb(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(tf(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==
typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Dd.enqueueReplaceState(e,e.state,null),wd(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ub(a,b){try{var c="",d=b;do c+=fj(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+
"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}function vf(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function wf(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}function gi(a,b,c){c=Pa(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Ed||(Ed=!0,xf=d);wf(a,b)};return c}function hi(a,b,c){c=Pa(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};
c.callback=function(){wf(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){wf(a,b);"function"!==typeof d&&(null===ib?ib=new Set([this]):ib.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}function ii(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new rk;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=sk.bind(null,a,b,c),b.then(a,a))}function ji(a){do{var b;
if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}function ki(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=Pa(-1,1),b.tag=2,fb(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}function aa(a,b,c,d){b.child=null===a?li(b,null,c,d):Vb(b,a.child,c,d)}function mi(a,b,c,d,e){c=c.render;var f=b.ref;Sb(b,e);d=mf(a,b,c,d,f,
e);c=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&c&&Ue(b);b.flags|=1;aa(a,b,d,e);return b.child}function ni(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!yf(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,oi(a,b,f,d,e);a=rd(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:qc;if(c(g,d)&&a.ref===
b.ref)return Qa(a,b,e)}b.flags|=1;a=eb(f,d);a.ref=b.ref;a.return=b;return b.child=a}function oi(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(qc(f,d)&&a.ref===b.ref)if(ha=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(ha=!0);else return b.lanes=a.lanes,Qa(a,b,e)}return zf(a,b,c,d,e)}function pi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},y(Ga,ba),ba|=c;
else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,y(Ga,ba),ba|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;y(Ga,ba);ba|=d}else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,y(Ga,ba),ba|=d;aa(a,b,e,c);return b.child}function qi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function zf(a,
b,c,d,e){var f=ea(c)?pb:J.current;f=Nb(b,f);Sb(b,e);c=mf(a,b,c,d,f,e);d=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&d&&Ue(b);b.flags|=1;aa(a,b,c,e);return b.child}function ri(a,b,c,d,e){if(ea(c)){var f=!0;ld(b)}else f=!1;Sb(b,e);if(null===b.stateNode)Fd(a,b),ei(b,c,d),uf(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,n=c.contextType;"object"===typeof n&&null!==n?n=qa(n):(n=ea(c)?pb:J.current,n=Nb(b,
n));var l=c.getDerivedStateFromProps,m="function"===typeof l||"function"===typeof g.getSnapshotBeforeUpdate;m||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==n)&&fi(b,g,d,n);gb=!1;var r=b.memoizedState;g.state=r;wd(b,d,g,e);k=b.memoizedState;h!==d||r!==k||S.current||gb?("function"===typeof l&&(tf(b,c,l,d),k=b.memoizedState),(h=gb||di(b,c,h,d,r,k,n))?(m||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||
("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=n,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;Fh(a,b);h=b.memoizedProps;n=b.type===b.elementType?h:ya(b.type,h);g.props=
n;m=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=qa(k):(k=ea(c)?pb:J.current,k=Nb(b,k));var p=c.getDerivedStateFromProps;(l="function"===typeof p||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==m||r!==k)&&fi(b,g,d,k);gb=!1;r=b.memoizedState;g.state=r;wd(b,d,g,e);var x=b.memoizedState;h!==m||r!==x||S.current||gb?("function"===typeof p&&(tf(b,c,p,d),x=b.memoizedState),
(n=gb||di(b,c,n,d,r,x,k)||!1)?(l||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=
4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=n):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return Af(a,b,c,d,f,e)}function Af(a,b,c,d,e,f){qi(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&vh(b,c,!1),
Qa(a,b,f);d=b.stateNode;tk.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Vb(b,a.child,null,f),b.child=Vb(b,null,h,f)):aa(a,b,h,f);b.memoizedState=d.state;e&&vh(b,c,!0);return b.child}function si(a){var b=a.stateNode;b.pendingContext?th(a,b.pendingContext,b.pendingContext!==b.context):b.context&&th(a,b.context,!1);gf(a,b.containerInfo)}function ti(a,b,c,d,e){Qb();Ye(e);b.flags|=256;aa(a,b,c,d);return b.child}function Bf(a){return{baseLanes:a,
cachePool:null,transitions:null}}function ui(a,b,c){var d=b.pendingProps,e=F.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;y(F,e&1);if(null===a){Xe(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==
f?(f.childLanes=0,f.pendingProps=g):f=Gd(g,d,0,null),a=sb(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=Bf(c),b.memoizedState=Cf,a):Df(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return uk(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=eb(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=eb(h,f):(f=
sb(f,g,c,null),f.flags|=2);f.return=b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?Bf(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=Cf;return d}f=a.child;a=f.sibling;d=eb(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function Df(a,b,c){b=Gd({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function Hd(a,b,c,d){null!==d&&Ye(d);Vb(b,a.child,null,c);a=Df(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}function uk(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=vf(Error(m(422))),Hd(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=Gd({mode:"visible",children:d.children},e,0,null);f=sb(f,e,g,null);f.flags|=2;d.return=
b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Vb(b,a.child,null,g);b.child.memoizedState=Bf(g);b.memoizedState=Cf;return f}if(0===(b.mode&1))return Hd(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;if(d)var h=d.dgst;d=h;f=Error(m(419));d=vf(f,d,void 0);return Hd(a,b,g,d)}h=0!==(g&a.childLanes);if(ha||h){d=O;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=
32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;0!==e&&e!==f.retryLane&&(f.retryLane=e,Oa(a,e),xa(d,a,e,-1))}Ef();d=vf(Error(m(421)));return Hd(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=vk.bind(null,a),e._reactRetry=b,null;a=f.treeContext;fa=Ka(e.nextSibling);la=b;D=!0;wa=null;null!==a&&(na[oa++]=Ma,na[oa++]=Na,na[oa++]=rb,Ma=a.id,Na=a.overflow,rb=b);b=Df(b,d.children);b.flags|=4096;return b}function vi(a,b,c){a.lanes|=b;var d=a.alternate;
null!==d&&(d.lanes|=b);df(a.return,b,c)}function Ff(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}function wi(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;aa(a,b,d.children,c);d=F.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&
vi(a,c,b);else if(19===a.tag)vi(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}y(F,d);if(0===(b.mode&1))b.memoizedState=null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===xd(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);Ff(b,!1,e,c,f);break;case "backwards":c=
null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===xd(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}Ff(b,!0,c,null,f);break;case "together":Ff(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}function Fd(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Qa(a,b,c){null!==a&&(b.dependencies=a.dependencies);ra|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(m(153));if(null!==
b.child){a=b.child;c=eb(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=eb(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}function wk(a,b,c){switch(b.tag){case 3:si(b);Qb();break;case 5:Ih(b);break;case 1:ea(b.type)&&ld(b);break;case 4:gf(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;y(ud,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return y(F,F.current&
1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return ui(a,b,c);y(F,F.current&1);a=Qa(a,b,c);return null!==a?a.sibling:null}y(F,F.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&128)){if(d)return wi(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);y(F,F.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,pi(a,b,c)}return Qa(a,b,c)}function Dc(a,b){if(!D)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==
b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}function W(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,
d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}function xk(a,b,c){var d=b.pendingProps;Ve(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(b),null;case 1:return ea(b.type)&&(v(S),v(J)),W(b),null;case 3:d=b.stateNode;Tb();v(S);v(J);jf();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)pd(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&
256)||(b.flags|=1024,null!==wa&&(Gf(wa),wa=null));xi(a,b);W(b);return null;case 5:hf(b);var e=ub(xc.current);c=b.type;if(null!==a&&null!=b.stateNode)yk(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(m(166));W(b);return null}a=ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Da]=b;d[uc]=f;a=0!==(b.mode&1);switch(c){case "dialog":B("cancel",d);B("close",d);break;case "iframe":case "object":case "embed":B("load",d);break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],d);break;case "source":B("error",d);break;case "img":case "image":case "link":B("error",d);B("load",d);break;case "details":B("toggle",d);break;case "input":kg(d,f);B("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};B("invalid",d);break;case "textarea":ng(d,f),B("invalid",d)}pe(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&
jd(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&jd(d.textContent,h,a),e=["children",""+h]):$b.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&B("scroll",d)}switch(c){case "input":Pc(d);mg(d,f,!0);break;case "textarea":Pc(d);pg(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=kd)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===
a&&(a=qg(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Da]=b;a[uc]=d;zk(a,b,!1,!1);b.stateNode=a;a:{g=qe(c,d);switch(c){case "dialog":B("cancel",a);B("close",a);e=d;break;case "iframe":case "object":case "embed":B("load",a);e=d;break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],a);e=d;break;case "source":B("error",a);e=d;break;case "img":case "image":case "link":B("error",a);B("load",a);e=d;break;case "details":B("toggle",a);e=d;break;case "input":kg(a,d);e=ke(a,d);B("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=E({},d,{value:void 0});B("invalid",a);break;case "textarea":ng(a,d);e=ne(a,d);B("invalid",a);break;default:e=d}pe(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=
h[f];"style"===f?sg(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&yi(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&Fc(a,k):"number"===typeof k&&Fc(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&($b.hasOwnProperty(f)?null!=k&&"onScroll"===f&&B("scroll",a):null!=k&&$d(a,f,k,g))}switch(c){case "input":Pc(a);mg(a,d,!1);break;case "textarea":Pc(a);pg(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Ua(d.value));
break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?Db(a,!!d.multiple,f,!1):null!=d.defaultValue&&Db(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=kd)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}W(b);return null;case 6:if(a&&null!=b.stateNode)Ak(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===
b.stateNode)throw Error(m(166));c=ub(xc.current);ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.memoizedProps;d[Da]=b;if(f=d.nodeValue!==c)if(a=la,null!==a)switch(a.tag){case 3:jd(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&jd(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Da]=b,b.stateNode=d}W(b);return null;case 13:v(F);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(D&&
null!==fa&&0!==(b.mode&1)&&0===(b.flags&128)){for(f=fa;f;)f=Ka(f.nextSibling);Qb();b.flags|=98560;f=!1}else if(f=pd(b),null!==d&&null!==d.dehydrated){if(null===a){if(!f)throw Error(m(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(m(317));f[Da]=b}else Qb(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;W(b);f=!1}else null!==wa&&(Gf(wa),wa=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&
d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(F.current&1)?0===L&&(L=3):Ef()));null!==b.updateQueue&&(b.flags|=4);W(b);return null;case 4:return Tb(),xi(a,b),null===a&&sc(b.stateNode.containerInfo),W(b),null;case 10:return cf(b.type._context),W(b),null;case 17:return ea(b.type)&&(v(S),v(J)),W(b),null;case 19:v(F);f=b.memoizedState;if(null===f)return W(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dc(f,!1);else{if(0!==L||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=
xd(a);if(null!==g){b.flags|=128;Dc(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,
f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;y(F,F.current&1|2);return b.child}a=a.sibling}null!==f.tail&&P()>Hf&&(b.flags|=128,d=!0,Dc(f,!1),b.lanes=4194304)}else{if(!d)if(a=xd(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dc(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!D)return W(b),null}else 2*P()-f.renderingStartTime>Hf&&1073741824!==c&&(b.flags|=
128,d=!0,Dc(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=b,f.tail=b.sibling,f.renderingStartTime=P(),b.sibling=null,c=F.current,y(F,d?c&1|2:c&1),b;W(b);return null;case 22:case 23:return ba=Ga.current,v(Ga),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(ba&1073741824)&&(W(b),b.subtreeFlags&6&&(b.flags|=8192)):W(b),null;case 24:return null;
case 25:return null}throw Error(m(156,b.tag));}function Bk(a,b,c){Ve(b);switch(b.tag){case 1:return ea(b.type)&&(v(S),v(J)),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return Tb(),v(S),v(J),jf(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return hf(b),null;case 13:v(F);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(m(340));Qb()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return v(F),null;case 4:return Tb(),
null;case 10:return cf(b.type._context),null;case 22:case 23:return ba=Ga.current,v(Ga),null;case 24:return null;default:return null}}function Wb(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){G(a,b,d)}else c.current=null}function If(a,b,c){try{c()}catch(d){G(a,b,d)}}function Ck(a,b){Jf=Zc;a=ch();if(Ie(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();
if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(M){c=null;break a}var g=0,h=-1,k=-1,n=0,q=0,u=a,r=null;b:for(;;){for(var p;;){u!==c||0!==e&&3!==u.nodeType||(h=g+e);u!==f||0!==d&&3!==u.nodeType||(k=g+d);3===u.nodeType&&(g+=u.nodeValue.length);if(null===(p=u.firstChild))break;r=u;u=p}for(;;){if(u===a)break b;r===c&&++n===e&&(h=g);r===f&&++q===d&&(k=g);if(null!==(p=u.nextSibling))break;u=r;r=u.parentNode}u=p}c=-1===h||-1===k?null:
{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Kf={focusedElem:a,selectionRange:c};Zc=!1;for(l=b;null!==l;)if(b=l,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,l=a;else for(;null!==l;){b=l;try{var x=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;case 1:if(null!==x){var v=x.memoizedProps,z=x.memoizedState,w=b.stateNode,A=w.getSnapshotBeforeUpdate(b.elementType===b.type?v:ya(b.type,v),z);w.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var t=
b.stateNode.containerInfo;1===t.nodeType?t.textContent="":9===t.nodeType&&t.documentElement&&t.removeChild(t.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(m(163));}}catch(M){G(b,b.return,M)}a=b.sibling;if(null!==a){a.return=b.return;l=a;break}l=b.return}x=zi;zi=!1;return x}function Gc(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&If(b,c,f)}e=e.next}while(e!==d)}}
function Id(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Lf(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}function Ai(a){var b=a.alternate;null!==b&&(a.alternate=null,Ai(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Da],delete b[uc],delete b[Me],delete b[Dk],
delete b[Ek]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Bi(a){return 5===a.tag||3===a.tag||4===a.tag}function Ci(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Bi(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&
2))return a.stateNode}}function Mf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=kd));else if(4!==d&&(a=a.child,null!==a))for(Mf(a,b,c),a=a.sibling;null!==a;)Mf(a,b,c),a=a.sibling}function Nf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);
else if(4!==d&&(a=a.child,null!==a))for(Nf(a,b,c),a=a.sibling;null!==a;)Nf(a,b,c),a=a.sibling}function jb(a,b,c){for(c=c.child;null!==c;)Di(a,b,c),c=c.sibling}function Di(a,b,c){if(Ca&&"function"===typeof Ca.onCommitFiberUnmount)try{Ca.onCommitFiberUnmount(Uc,c)}catch(h){}switch(c.tag){case 5:X||Wb(c,b);case 6:var d=T,e=za;T=null;jb(a,b,c);T=d;za=e;null!==T&&(za?(a=T,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):T.removeChild(c.stateNode));break;case 18:null!==T&&(za?
(a=T,c=c.stateNode,8===a.nodeType?Re(a.parentNode,c):1===a.nodeType&&Re(a,c),nc(a)):Re(T,c.stateNode));break;case 4:d=T;e=za;T=c.stateNode.containerInfo;za=!0;jb(a,b,c);T=d;za=e;break;case 0:case 11:case 14:case 15:if(!X&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?If(c,b,g):0!==(f&4)&&If(c,b,g));e=e.next}while(e!==d)}jb(a,b,c);break;case 1:if(!X&&(Wb(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=
c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){G(c,b,h)}jb(a,b,c);break;case 21:jb(a,b,c);break;case 22:c.mode&1?(X=(d=X)||null!==c.memoizedState,jb(a,b,c),X=d):jb(a,b,c);break;default:jb(a,b,c)}}function Ei(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Fk);b.forEach(function(b){var d=Gk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}function Aa(a,b,c){c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=
c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:T=h.stateNode;za=!1;break a;case 3:T=h.stateNode.containerInfo;za=!0;break a;case 4:T=h.stateNode.containerInfo;za=!0;break a}h=h.return}if(null===T)throw Error(m(160));Di(f,g,e);T=null;za=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(n){G(e,b,n)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)Fi(b,a),b=b.sibling}function Fi(a,b,c){var d=a.alternate;c=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:Aa(b,a);
Ha(a);if(c&4){try{Gc(3,a,a.return),Id(3,a)}catch(I){G(a,a.return,I)}try{Gc(5,a,a.return)}catch(I){G(a,a.return,I)}}break;case 1:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);break;case 5:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);if(a.flags&32){var e=a.stateNode;try{Fc(e,"")}catch(I){G(a,a.return,I)}}if(c&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==d?d.memoizedProps:f,h=a.type,k=a.updateQueue;a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&lg(e,f);
qe(h,g);var n=qe(h,f);for(g=0;g<k.length;g+=2){var q=k[g],u=k[g+1];"style"===q?sg(e,u):"dangerouslySetInnerHTML"===q?yi(e,u):"children"===q?Fc(e,u):$d(e,q,u,n)}switch(h){case "input":le(e,f);break;case "textarea":og(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var p=f.value;null!=p?Db(e,!!f.multiple,p,!1):r!==!!f.multiple&&(null!=f.defaultValue?Db(e,!!f.multiple,f.defaultValue,!0):Db(e,!!f.multiple,f.multiple?[]:"",!1))}e[uc]=f}catch(I){G(a,a.return,
I)}}break;case 6:Aa(b,a);Ha(a);if(c&4){if(null===a.stateNode)throw Error(m(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(I){G(a,a.return,I)}}break;case 3:Aa(b,a);Ha(a);if(c&4&&null!==d&&d.memoizedState.isDehydrated)try{nc(b.containerInfo)}catch(I){G(a,a.return,I)}break;case 4:Aa(b,a);Ha(a);break;case 13:Aa(b,a);Ha(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||null!==e.alternate&&null!==e.alternate.memoizedState||(Of=P()));c&4&&Ei(a);break;case 22:q=
null!==d&&null!==d.memoizedState;a.mode&1?(X=(n=X)||q,Aa(b,a),X=n):Aa(b,a);Ha(a);if(c&8192){n=null!==a.memoizedState;if((a.stateNode.isHidden=n)&&!q&&0!==(a.mode&1))for(l=a,q=a.child;null!==q;){for(u=l=q;null!==l;){r=l;p=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Gc(4,r,r.return);break;case 1:Wb(r,r.return);var x=r.stateNode;if("function"===typeof x.componentWillUnmount){c=r;b=r.return;try{d=c,x.props=d.memoizedProps,x.state=d.memoizedState,x.componentWillUnmount()}catch(I){G(c,b,I)}}break;
case 5:Wb(r,r.return);break;case 22:if(null!==r.memoizedState){Gi(u);continue}}null!==p?(p.return=r,l=p):Gi(u)}q=q.sibling}a:for(q=null,u=a;;){if(5===u.tag){if(null===q){q=u;try{e=u.stateNode,n?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=u.stateNode,k=u.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=rg("display",g))}catch(I){G(a,a.return,I)}}}else if(6===u.tag){if(null===q)try{u.stateNode.nodeValue=
n?"":u.memoizedProps}catch(I){G(a,a.return,I)}}else if((22!==u.tag&&23!==u.tag||null===u.memoizedState||u===a)&&null!==u.child){u.child.return=u;u=u.child;continue}if(u===a)break a;for(;null===u.sibling;){if(null===u.return||u.return===a)break a;q===u&&(q=null);u=u.return}q===u&&(q=null);u.sibling.return=u.return;u=u.sibling}}break;case 19:Aa(b,a);Ha(a);c&4&&Ei(a);break;case 21:break;default:Aa(b,a),Ha(a)}}function Ha(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Bi(c)){var d=c;
break a}c=c.return}throw Error(m(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(Fc(e,""),d.flags&=-33);var f=Ci(a);Nf(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Ci(a);Mf(a,h,g);break;default:throw Error(m(161));}}catch(k){G(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function Hk(a,b,c){l=a;Hi(a,b,c)}function Hi(a,b,c){for(var d=0!==(a.mode&1);null!==l;){var e=l,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jd;if(!g){var h=e.alternate,k=null!==h&&null!==
h.memoizedState||X;h=Jd;var n=X;Jd=g;if((X=k)&&!n)for(l=e;null!==l;)g=l,k=g.child,22===g.tag&&null!==g.memoizedState?Ii(e):null!==k?(k.return=g,l=k):Ii(e);for(;null!==f;)l=f,Hi(f,b,c),f=f.sibling;l=e;Jd=h;X=n}Ji(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,l=f):Ji(a,b,c)}}function Ji(a,b,c){for(;null!==l;){b=l;if(0!==(b.flags&8772)){c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:X||Id(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!X)if(null===c)d.componentDidMount();
else{var e=b.elementType===b.type?c.memoizedProps:ya(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&Hh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=b.child.stateNode;break;case 1:c=b.child.stateNode}Hh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&
c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var n=b.alternate;if(null!==n){var q=n.memoizedState;if(null!==q){var p=q.dehydrated;null!==p&&nc(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(m(163));}X||b.flags&512&&Lf(b)}catch(r){G(b,b.return,r)}}if(b===a){l=null;break}c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Gi(a){for(;null!==l;){var b=l;if(b===
a){l=null;break}var c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Ii(a){for(;null!==l;){var b=l;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Id(4,b)}catch(k){G(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){G(b,e,k)}}var f=b.return;try{Lf(b)}catch(k){G(b,f,k)}break;case 5:var g=b.return;try{Lf(b)}catch(k){G(b,g,k)}}}catch(k){G(b,b.return,k)}if(b===a){l=null;break}var h=b.sibling;
if(null!==h){h.return=b.return;l=h;break}l=b.return}}function Hc(){Hf=P()+500}function Z(){return 0!==(p&6)?P():-1!==Kd?Kd:Kd=P()}function hb(a){if(0===(a.mode&1))return 1;if(0!==(p&2)&&0!==U)return U&-U;if(null!==Ik.transition)return 0===Ld&&(Ld=Dg()),Ld;a=z;if(0!==a)return a;a=window.event;a=void 0===a?16:Lg(a.type);return a}function xa(a,b,c,d){if(50<Ic)throw Ic=0,Pf=null,Error(m(185));ic(a,c,d);if(0===(p&2)||a!==O)a===O&&(0===(p&2)&&(Md|=c),4===L&&kb(a,U)),ia(a,d),1===c&&0===p&&0===(b.mode&1)&&
(Hc(),md&&db())}function ia(a,b){var c=a.callbackNode;tj(a,b);var d=Vc(a,a===O?U:0);if(0===d)null!==c&&Ki(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&Ki(c);if(1===b)0===a.tag?jk(Li.bind(null,a)):wh(Li.bind(null,a)),Jk(function(){0===(p&6)&&db()}),c=null;else{switch(Eg(d)){case 1:c=De;break;case 4:c=Mg;break;case 16:c=ad;break;case 536870912:c=Ng;break;default:c=ad}c=Mi(c,Ni.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}function Ni(a,b){Kd=-1;
Ld=0;if(0!==(p&6))throw Error(m(327));var c=a.callbackNode;if(Xb()&&a.callbackNode!==c)return null;var d=Vc(a,a===O?U:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Nd(a,d);else{b=d;var e=p;p|=2;var f=Oi();if(O!==a||U!==b)Ra=null,Hc(),wb(a,b);do try{Kk();break}catch(h){Pi(a,h)}while(1);af();Od.current=f;p=e;null!==H?b=0:(O=null,U=0,b=L)}if(0!==b){2===b&&(e=ve(a),0!==e&&(d=e,b=Qf(a,e)));if(1===b)throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;if(6===b)kb(a,d);else{e=a.current.alternate;
if(0===(d&30)&&!Lk(e)&&(b=Nd(a,d),2===b&&(f=ve(a),0!==f&&(d=f,b=Qf(a,f))),1===b))throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(m(345));case 2:xb(a,ja,Ra);break;case 3:kb(a,d);if((d&130023424)===d&&(b=Of+500-P(),10<b)){if(0!==Vc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){Z();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),b);break}xb(a,ja,Ra);break;case 4:kb(a,d);if((d&4194240)===d)break;b=a.eventTimes;
for(e=-1;0<d;){var g=31-ta(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=P()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*Mk(d/1960))-d;if(10<d){a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),d);break}xb(a,ja,Ra);break;case 5:xb(a,ja,Ra);break;default:throw Error(m(329));}}}ia(a,P());return a.callbackNode===c?Ni.bind(null,a):null}function Qf(a,b){var c=Kc;a.current.memoizedState.isDehydrated&&(wb(a,b).flags|=256);a=Nd(a,b);2!==a&&(b=ja,ja=c,null!==b&&Gf(b));return a}function Gf(a){null===
ja?ja=a:ja.push.apply(ja,a)}function Lk(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!ua(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}function kb(a,b){b&=~Sf;b&=~Md;a.suspendedLanes|=b;a.pingedLanes&=
~b;for(a=a.expirationTimes;0<b;){var c=31-ta(b),d=1<<c;a[c]=-1;b&=~d}}function Li(a){if(0!==(p&6))throw Error(m(327));Xb();var b=Vc(a,0);if(0===(b&1))return ia(a,P()),null;var c=Nd(a,b);if(0!==a.tag&&2===c){var d=ve(a);0!==d&&(b=d,c=Qf(a,d))}if(1===c)throw c=Jc,wb(a,0),kb(a,b),ia(a,P()),c;if(6===c)throw Error(m(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;xb(a,ja,Ra);ia(a,P());return null}function Tf(a,b){var c=p;p|=1;try{return a(b)}finally{p=c,0===p&&(Hc(),md&&db())}}function yb(a){null!==
lb&&0===lb.tag&&0===(p&6)&&Xb();var b=p;p|=1;var c=ca.transition,d=z;try{if(ca.transition=null,z=1,a)return a()}finally{z=d,ca.transition=c,p=b,0===(p&6)&&db()}}function wb(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Nk(c));if(null!==H)for(c=H.return;null!==c;){var d=c;Ve(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&(v(S),v(J));break;case 3:Tb();v(S);v(J);jf();break;case 5:hf(d);break;case 4:Tb();break;case 13:v(F);break;
case 19:v(F);break;case 10:cf(d.type._context);break;case 22:case 23:ba=Ga.current,v(Ga)}c=c.return}O=a;H=a=eb(a.current,null);U=ba=b;L=0;Jc=null;Sf=Md=ra=0;ja=Kc=null;if(null!==tb){for(b=0;b<tb.length;b++)if(c=tb[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}tb=null}return a}function Pi(a,b){do{var c=H;try{af();yd.current=zd;if(Ad){for(var d=C.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ad=
!1}vb=0;N=K=C=null;zc=!1;Ac=0;Uf.current=null;if(null===c||null===c.return){L=1;Jc=b;H=null;break}a:{var f=a,g=c.return,h=c,k=b;b=U;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var n=k,l=h,p=l.tag;if(0===(l.mode&1)&&(0===p||11===p||15===p)){var r=l.alternate;r?(l.updateQueue=r.updateQueue,l.memoizedState=r.memoizedState,l.lanes=r.lanes):(l.updateQueue=null,l.memoizedState=null)}var v=ji(g);if(null!==v){v.flags&=-257;ki(v,g,h,f,b);v.mode&1&&ii(f,n,b);b=v;k=n;var x=b.updateQueue;
if(null===x){var z=new Set;z.add(k);b.updateQueue=z}else x.add(k);break a}else{if(0===(b&1)){ii(f,n,b);Ef();break a}k=Error(m(426))}}else if(D&&h.mode&1){var y=ji(g);if(null!==y){0===(y.flags&65536)&&(y.flags|=256);ki(y,g,h,f,b);Ye(Ub(k,h));break a}}f=k=Ub(k,h);4!==L&&(L=2);null===Kc?Kc=[f]:Kc.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;b&=-b;f.lanes|=b;var w=gi(f,k,b);Gh(f,w);break a;case 1:h=k;var A=f.type,t=f.stateNode;if(0===(f.flags&128)&&("function"===typeof A.getDerivedStateFromError||
null!==t&&"function"===typeof t.componentDidCatch&&(null===ib||!ib.has(t)))){f.flags|=65536;b&=-b;f.lanes|=b;var B=hi(f,h,b);Gh(f,B);break a}}f=f.return}while(null!==f)}Qi(c)}catch(ma){b=ma;H===c&&null!==c&&(H=c=c.return);continue}break}while(1)}function Oi(){var a=Od.current;Od.current=zd;return null===a?zd:a}function Ef(){if(0===L||3===L||2===L)L=4;null===O||0===(ra&268435455)&&0===(Md&268435455)||kb(O,U)}function Nd(a,b){var c=p;p|=2;var d=Oi();if(O!==a||U!==b)Ra=null,wb(a,b);do try{Ok();break}catch(e){Pi(a,
e)}while(1);af();p=c;Od.current=d;if(null!==H)throw Error(m(261));O=null;U=0;return L}function Ok(){for(;null!==H;)Ri(H)}function Kk(){for(;null!==H&&!Pk();)Ri(H)}function Ri(a){var b=Qk(a.alternate,a,ba);a.memoizedProps=a.pendingProps;null===b?Qi(a):H=b;Uf.current=null}function Qi(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=xk(c,b,ba),null!==c){H=c;return}}else{c=Bk(c,b);if(null!==c){c.flags&=32767;H=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;
else{L=6;H=null;return}}b=b.sibling;if(null!==b){H=b;return}H=b=a}while(null!==b);0===L&&(L=5)}function xb(a,b,c){var d=z,e=ca.transition;try{ca.transition=null,z=1,Rk(a,b,c,d)}finally{ca.transition=e,z=d}return null}function Rk(a,b,c,d){do Xb();while(null!==lb);if(0!==(p&6))throw Error(m(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(m(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;
uj(a,f);a===O&&(H=O=null,U=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||Pd||(Pd=!0,Mi(ad,function(){Xb();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ca.transition;ca.transition=null;var g=z;z=1;var h=p;p|=4;Uf.current=null;Ck(a,c);Fi(c,a);Tj(Kf);Zc=!!Jf;Kf=Jf=null;a.current=c;Hk(c,a,e);Sk();p=h;z=g;ca.transition=f}else a.current=c;Pd&&(Pd=!1,lb=a,Qd=e);f=a.pendingLanes;0===f&&(ib=null);oj(c.stateNode,d);ia(a,P());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=
b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Ed)throw Ed=!1,a=xf,xf=null,a;0!==(Qd&1)&&0!==a.tag&&Xb();f=a.pendingLanes;0!==(f&1)?a===Pf?Ic++:(Ic=0,Pf=a):Ic=0;db();return null}function Xb(){if(null!==lb){var a=Eg(Qd),b=ca.transition,c=z;try{ca.transition=null;z=16>a?16:a;if(null===lb)var d=!1;else{a=lb;lb=null;Qd=0;if(0!==(p&6))throw Error(m(331));var e=p;p|=4;for(l=a.current;null!==l;){var f=l,g=f.child;if(0!==(l.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var n=
h[k];for(l=n;null!==l;){var q=l;switch(q.tag){case 0:case 11:case 15:Gc(8,q,f)}var u=q.child;if(null!==u)u.return=q,l=u;else for(;null!==l;){q=l;var r=q.sibling,v=q.return;Ai(q);if(q===n){l=null;break}if(null!==r){r.return=v;l=r;break}l=v}}}var x=f.alternate;if(null!==x){var y=x.child;if(null!==y){x.child=null;do{var C=y.sibling;y.sibling=null;y=C}while(null!==y)}}l=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,l=g;else b:for(;null!==l;){f=l;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Gc(9,
f,f.return)}var w=f.sibling;if(null!==w){w.return=f.return;l=w;break b}l=f.return}}var A=a.current;for(l=A;null!==l;){g=l;var t=g.child;if(0!==(g.subtreeFlags&2064)&&null!==t)t.return=g,l=t;else b:for(g=A;null!==l;){h=l;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Id(9,h)}}catch(ma){G(h,h.return,ma)}if(h===g){l=null;break b}var B=h.sibling;if(null!==B){B.return=h.return;l=B;break b}l=h.return}}p=e;db();if(Ca&&"function"===typeof Ca.onPostCommitFiberRoot)try{Ca.onPostCommitFiberRoot(Uc,
a)}catch(ma){}d=!0}return d}finally{z=c,ca.transition=b}}return!1}function Si(a,b,c){b=Ub(c,b);b=gi(a,b,1);a=fb(a,b,1);b=Z();null!==a&&(ic(a,1,b),ia(a,b))}function G(a,b,c){if(3===a.tag)Si(a,a,c);else for(;null!==b;){if(3===b.tag){Si(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===ib||!ib.has(d))){a=Ub(c,a);a=hi(b,a,1);b=fb(b,a,1);a=Z();null!==b&&(ic(b,1,a),ia(b,a));break}}b=b.return}}function sk(a,
b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Z();a.pingedLanes|=a.suspendedLanes&c;O===a&&(U&c)===c&&(4===L||3===L&&(U&130023424)===U&&500>P()-Of?wb(a,0):Sf|=c);ia(a,b)}function Ti(a,b){0===b&&(0===(a.mode&1)?b=1:(b=Rd,Rd<<=1,0===(Rd&130023424)&&(Rd=4194304)));var c=Z();a=Oa(a,b);null!==a&&(ic(a,b,c),ia(a,c))}function vk(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Ti(a,c)}function Gk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);
break;case 19:d=a.stateNode;break;default:throw Error(m(314));}null!==d&&d.delete(b);Ti(a,c)}function Mi(a,b){return xh(a,b)}function Tk(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function yf(a){a=
a.prototype;return!(!a||!a.isReactComponent)}function Uk(a){if("function"===typeof a)return yf(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===ie)return 11;if(a===je)return 14}return 2}function eb(a,b){var c=a.alternate;null===c?(c=pa(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=
a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}function rd(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)yf(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case Bb:return sb(c.children,e,f,b);case fe:g=8;e|=8;break;case ee:return a=pa(12,c,b,e|2),a.elementType=ee,a.lanes=f,a;case ge:return a=
pa(13,c,b,e),a.elementType=ge,a.lanes=f,a;case he:return a=pa(19,c,b,e),a.elementType=he,a.lanes=f,a;case Ui:return Gd(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case hg:g=10;break a;case gg:g=9;break a;case ie:g=11;break a;case je:g=14;break a;case Ta:g=16;d=null;break a}throw Error(m(130,null==a?a:typeof a,""));}b=pa(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function sb(a,b,c,d){a=pa(7,a,d,b);a.lanes=c;return a}function Gd(a,b,c,d){a=pa(22,a,d,b);a.elementType=
Ui;a.lanes=c;a.stateNode={isHidden:!1};return a}function Ze(a,b,c){a=pa(6,a,null,b);a.lanes=c;return a}function $e(a,b,c){b=pa(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function Vk(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=
0;this.eventTimes=we(0);this.expirationTimes=we(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=we(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=null}function Vf(a,b,c,d,e,f,g,h,k,l){a=new Vk(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=pa(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,
pendingSuspenseBoundaries:null};ff(f);return a}function Wk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Cb,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}function Vi(a){if(!a)return cb;a=a._reactInternals;a:{if(nb(a)!==a||1!==a.tag)throw Error(m(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(ea(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(m(171));
}if(1===a.tag){var c=a.type;if(ea(c))return uh(a,c,b)}return b}function Wi(a,b,c,d,e,f,g,h,k,l){a=Vf(c,d,!0,a,e,f,g,h,k);a.context=Vi(null);c=a.current;d=Z();e=hb(c);f=Pa(d,e);f.callback=void 0!==b&&null!==b?b:null;fb(c,f,e);a.current.lanes=e;ic(a,e,d);ia(a,d);return a}function Sd(a,b,c,d){var e=b.current,f=Z(),g=hb(e);c=Vi(c);null===b.context?b.context=c:b.pendingContext=c;b=Pa(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=fb(e,b,g);null!==a&&(xa(a,e,g,f),vd(a,e,g));return g}
function Td(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function Xi(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function Wf(a,b){Xi(a,b);(a=a.alternate)&&Xi(a,b)}function Xk(a){a=Bg(a);return null===a?null:a.stateNode}function Yk(a){return null}function Xf(a){this._internalRoot=a}function Ud(a){this._internalRoot=a}function Yf(a){return!(!a||1!==a.nodeType&&9!==
a.nodeType&&11!==a.nodeType)}function Vd(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function Yi(){}function Zk(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=Td(g);f.call(a)}}var g=Wi(b,d,a,0,null,!1,!1,"",Yi);a._reactRootContainer=g;a[Ja]=g.current;sc(8===a.nodeType?a.parentNode:a);yb();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=Td(k);
h.call(a)}}var k=Vf(a,0,!1,null,null,!1,!1,"",Yi);a._reactRootContainer=k;a[Ja]=k.current;sc(8===a.nodeType?a.parentNode:a);yb(function(){Sd(b,k,c,d)});return k}function Wd(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=Td(g);h.call(a)}}Sd(b,g,a,e)}else g=Zk(c,b,a,e,d);return Td(g)}var cg=new Set,$b={},Ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Zd=Object.prototype.hasOwnProperty,
cj=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,eg={},dg={},R={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){R[a]=
new Y(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];R[b]=new Y(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){R[a]=new Y(a,2,!1,a.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){R[a]=new Y(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){R[a]=
new Y(a,3,!1,a.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(a){R[a]=new Y(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){R[a]=new Y(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){R[a]=new Y(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){R[a]=new Y(a,5,!1,a.toLowerCase(),null,!1,!1)});var Zf=/[\-:]([a-z])/g,$f=function(a){return a[1].toUpperCase()};"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=
a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!1,!1)});R.xlinkHref=new Y("xlinkHref",
1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!0,!0)});var Sa=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sd=Symbol.for("react.element"),Cb=Symbol.for("react.portal"),Bb=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),ee=Symbol.for("react.profiler"),hg=Symbol.for("react.provider"),gg=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),ge=Symbol.for("react.suspense"),
he=Symbol.for("react.suspense_list"),je=Symbol.for("react.memo"),Ta=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Ui=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var fg=Symbol.iterator,E=Object.assign,ae,ce=!1,cc=Array.isArray,Xd,yi=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,
c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{Xd=Xd||document.createElement("div");Xd.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=Xd.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}}),Fc=function(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b},dc={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,
borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,
strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$k=["Webkit","ms","Moz","O"];Object.keys(dc).forEach(function(a){$k.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);dc[b]=dc[a]})});var ij=E({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),ze=null,se=null,Eb=null,Fb=null,xg=function(a,b){return a(b)},yg=function(){},te=!1,Oe=!1;if(Ia)try{var Lc={};Object.defineProperty(Lc,
"passive",{get:function(){Oe=!0}});window.addEventListener("test",Lc,Lc);window.removeEventListener("test",Lc,Lc)}catch(a){Oe=!1}var kj=function(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(q){this.onError(q)}},gc=!1,Sc=null,Tc=!1,ue=null,lj={onError:function(a){gc=!0;Sc=a}},Ba=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler,Jg=Ba.unstable_scheduleCallback,Kg=Ba.unstable_NormalPriority,xh=Jg,Ki=Ba.unstable_cancelCallback,Pk=Ba.unstable_shouldYield,
Sk=Ba.unstable_requestPaint,P=Ba.unstable_now,Dj=Ba.unstable_getCurrentPriorityLevel,De=Ba.unstable_ImmediatePriority,Mg=Ba.unstable_UserBlockingPriority,ad=Kg,Ej=Ba.unstable_LowPriority,Ng=Ba.unstable_IdlePriority,Uc=null,Ca=null,ta=Math.clz32?Math.clz32:pj,qj=Math.log,rj=Math.LN2,Wc=64,Rd=4194304,z=0,Ae=!1,Yc=[],Va=null,Wa=null,Xa=null,jc=new Map,kc=new Map,Ya=[],Bj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),
Gb=Sa.ReactCurrentBatchConfig,Zc=!0,$c=null,Za=null,Ee=null,bd=null,Yb={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},He=ka(Yb),Mc=E({},Yb,{view:0,detail:0}),ak=ka(Mc),ag,bg,Nc,Yd=E({},Mc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fe,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:
a.relatedTarget},movementX:function(a){if("movementX"in a)return a.movementX;a!==Nc&&(Nc&&"mousemove"===a.type?(ag=a.screenX-Nc.screenX,bg=a.screenY-Nc.screenY):bg=ag=0,Nc=a);return ag},movementY:function(a){return"movementY"in a?a.movementY:bg}}),ih=ka(Yd),al=E({},Yd,{dataTransfer:0}),Wj=ka(al),bl=E({},Mc,{relatedTarget:0}),Pe=ka(bl),cl=E({},Yb,{animationName:0,elapsedTime:0,pseudoElement:0}),Yj=ka(cl),dl=E({},Yb,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),
ck=ka(dl),el=E({},Yb,{data:0}),qh=ka(el),fk=qh,fl={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gl={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",
112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Gj={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},hl=E({},Mc,{key:function(a){if(a.key){var b=fl[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=cd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?gl[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,
metaKey:0,repeat:0,locale:0,getModifierState:Fe,charCode:function(a){return"keypress"===a.type?cd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?cd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Vj=ka(hl),il=E({},Yd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),nh=ka(il),jl=E({},Mc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,
ctrlKey:0,shiftKey:0,getModifierState:Fe}),Xj=ka(jl),kl=E({},Yb,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zj=ka(kl),ll=E({},Yd,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),bk=ka(ll),Hj=[9,13,27,32],Ge=Ia&&"CompositionEvent"in window,Oc=null;Ia&&"documentMode"in document&&(Oc=document.documentMode);var ek=Ia&&"TextEvent"in
window&&!Oc,Ug=Ia&&(!Ge||Oc&&8<Oc&&11>=Oc),Tg=String.fromCharCode(32),Sg=!1,Hb=!1,Kj={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},oc=null,pc=null,ph=!1;Ia&&(ph=Lj("input")&&(!document.documentMode||9<document.documentMode));var ua="function"===typeof Object.is?Object.is:Sj,dk=Ia&&"documentMode"in document&&11>=document.documentMode,Jb=null,Ke=null,rc=null,Je=!1,Kb={animationend:gd("Animation","AnimationEnd"),
animationiteration:gd("Animation","AnimationIteration"),animationstart:gd("Animation","AnimationStart"),transitionend:gd("Transition","TransitionEnd")},Le={},eh={};Ia&&(eh=document.createElement("div").style,"AnimationEvent"in window||(delete Kb.animationend.animation,delete Kb.animationiteration.animation,delete Kb.animationstart.animation),"TransitionEvent"in window||delete Kb.transitionend.transition);var jh=hd("animationend"),kh=hd("animationiteration"),lh=hd("animationstart"),mh=hd("transitionend"),
fh=new Map,Zi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
(function(){for(var a=0;a<Zi.length;a++){var b=Zi[a],c=b.toLowerCase();b=b[0].toUpperCase()+b.slice(1);$a(c,"on"+b)}$a(jh,"onAnimationEnd");$a(kh,"onAnimationIteration");$a(lh,"onAnimationStart");$a("dblclick","onDoubleClick");$a("focusin","onFocus");$a("focusout","onBlur");$a(mh,"onTransitionEnd")})();Ab("onMouseEnter",["mouseout","mouseover"]);Ab("onMouseLeave",["mouseout","mouseover"]);Ab("onPointerEnter",["pointerout","pointerover"]);Ab("onPointerLeave",["pointerout","pointerover"]);mb("onChange",
"change click focusin focusout input keydown keyup selectionchange".split(" "));mb("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mb("onBeforeInput",["compositionend","keypress","textInput","paste"]);mb("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ec="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Uj=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ec)),id="_reactListening"+Math.random().toString(36).slice(2),gk=/\r\n?/g,hk=/\u0000|\uFFFD/g,Jf=null,Kf=null,Rf="function"===typeof setTimeout?setTimeout:void 0,Nk="function"===typeof clearTimeout?
clearTimeout:void 0,$i="function"===typeof Promise?Promise:void 0,Jk="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof $i?function(a){return $i.resolve(null).then(a).catch(ik)}:Rf,Zb=Math.random().toString(36).slice(2),Da="__reactFiber$"+Zb,uc="__reactProps$"+Zb,Ja="__reactContainer$"+Zb,Me="__reactEvents$"+Zb,Dk="__reactListeners$"+Zb,Ek="__reactHandles$"+Zb,Se=[],Mb=-1,cb={},J=bb(cb),S=bb(!1),pb=cb,La=null,md=!1,Te=!1,Ob=[],Pb=0,od=null,nd=0,na=[],oa=0,rb=null,Ma=1,Na="",la=
null,fa=null,D=!1,wa=null,Ik=Sa.ReactCurrentBatchConfig,Vb=Dh(!0),li=Dh(!1),ud=bb(null),td=null,Rb=null,bf=null,tb=null,kk=Oa,gb=!1,wc={},Ea=bb(wc),yc=bb(wc),xc=bb(wc),F=bb(0),kf=[],yd=Sa.ReactCurrentDispatcher,sf=Sa.ReactCurrentBatchConfig,vb=0,C=null,K=null,N=null,Ad=!1,zc=!1,Ac=0,ml=0,zd={readContext:qa,useCallback:V,useContext:V,useEffect:V,useImperativeHandle:V,useInsertionEffect:V,useLayoutEffect:V,useMemo:V,useReducer:V,useRef:V,useState:V,useDebugValue:V,useDeferredValue:V,useTransition:V,
useMutableSource:V,useSyncExternalStore:V,useId:V,unstable_isNewReconciler:!1},lk={readContext:qa,useCallback:function(a,b){Fa().memoizedState=[a,void 0===b?null:b];return a},useContext:qa,useEffect:Sh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Bd(4194308,4,Vh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Bd(4194308,4,a,b)},useInsertionEffect:function(a,b){return Bd(4,2,a,b)},useMemo:function(a,b){var c=Fa();b=void 0===b?null:b;a=a();c.memoizedState=
[a,b];return a},useReducer:function(a,b,c){var d=Fa();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=qk.bind(null,C,a);return[d.memoizedState,a]},useRef:function(a){var b=Fa();a={current:a};return b.memoizedState=a},useState:Qh,useDebugValue:rf,useDeferredValue:function(a){return Fa().memoizedState=a},useTransition:function(){var a=Qh(!1),b=a[0];a=pk.bind(null,a[1]);Fa().memoizedState=
a;return[b,a]},useMutableSource:function(a,b,c){},useSyncExternalStore:function(a,b,c){var d=C,e=Fa();if(D){if(void 0===c)throw Error(m(407));c=c()}else{c=b();if(null===O)throw Error(m(349));0!==(vb&30)||Nh(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;Sh(Lh.bind(null,d,f,a),[a]);d.flags|=2048;Cc(9,Mh.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Fa(),b=O.identifierPrefix;if(D){var c=Na;var d=Ma;c=(d&~(1<<32-ta(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Ac++;0<c&&
(b+="H"+c.toString(32));b+=":"}else c=ml++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},mk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:of,useRef:Rh,useState:function(a){return of(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return Zh(b,K.memoizedState,a)},useTransition:function(){var a=of(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,
useSyncExternalStore:Kh,useId:$h,unstable_isNewReconciler:!1},nk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:pf,useRef:Rh,useState:function(a){return pf(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return null===K?b.memoizedState=a:Zh(b,K.memoizedState,a)},useTransition:function(){var a=pf(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,useSyncExternalStore:Kh,useId:$h,
unstable_isNewReconciler:!1},Dd={isMounted:function(a){return(a=a._reactInternals)?nb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;
var c=Z(),d=hb(a),e=Pa(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=fb(a,e,d);null!==b&&(xa(b,a,d,c),vd(b,a,d))}},rk="function"===typeof WeakMap?WeakMap:Map,tk=Sa.ReactCurrentOwner,ha=!1,Cf={dehydrated:null,treeContext:null,retryLane:0};var zk=function(a,b,c,d){for(c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=
c.return;c=c.sibling}};var xi=function(a,b){};var yk=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){a=b.stateNode;ub(Ea.current);e=null;switch(c){case "input":f=ke(a,f);d=ke(a,d);e=[];break;case "select":f=E({},f,{value:void 0});d=E({},d,{value:void 0});e=[];break;case "textarea":f=ne(a,f);d=ne(a,d);e=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(a.onclick=kd)}pe(c,d);var g;c=null;for(l in f)if(!d.hasOwnProperty(l)&&f.hasOwnProperty(l)&&null!=f[l])if("style"===
l){var h=f[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&($b.hasOwnProperty(l)?e||(e=[]):(e=e||[]).push(l,null));for(l in d){var k=d[l];h=null!=f?f[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(e||(e=[]),e.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(e=e||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(e=e||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&($b.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&B("scroll",a),e||h===k||(e=[])):(e=e||[]).push(l,k))}c&&(e=e||[]).push("style",c);var l=e;if(b.updateQueue=l)b.flags|=4}};var Ak=function(a,
b,c,d){c!==d&&(b.flags|=4)};var Jd=!1,X=!1,Fk="function"===typeof WeakSet?WeakSet:Set,l=null,zi=!1,T=null,za=!1,Mk=Math.ceil,Od=Sa.ReactCurrentDispatcher,Uf=Sa.ReactCurrentOwner,ca=Sa.ReactCurrentBatchConfig,p=0,O=null,H=null,U=0,ba=0,Ga=bb(0),L=0,Jc=null,ra=0,Md=0,Sf=0,Kc=null,ja=null,Of=0,Hf=Infinity,Ra=null,Ed=!1,xf=null,ib=null,Pd=!1,lb=null,Qd=0,Ic=0,Pf=null,Kd=-1,Ld=0;var Qk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||S.current)ha=!0;else{if(0===(a.lanes&c)&&0===(b.flags&
128))return ha=!1,wk(a,b,c);ha=0!==(a.flags&131072)?!0:!1}else ha=!1,D&&0!==(b.flags&1048576)&&yh(b,nd,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;Fd(a,b);a=b.pendingProps;var e=Nb(b,J.current);Sb(b,c);e=mf(null,b,d,a,e,c);var f=nf();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=null,ea(d)?(f=!0,ld(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,ff(b),e.updater=Dd,b.stateNode=
e,e._reactInternals=b,uf(b,d,a,c),b=Af(null,b,d,!0,f,c)):(b.tag=0,D&&f&&Ue(b),aa(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{Fd(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Uk(d);a=ya(d,a);switch(e){case 0:b=zf(null,b,d,a,c);break a;case 1:b=ri(null,b,d,a,c);break a;case 11:b=mi(null,b,d,a,c);break a;case 14:b=ni(null,b,d,ya(d.type,a),c);break a}throw Error(m(306,d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),zf(a,b,d,e,c);
case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),ri(a,b,d,e,c);case 3:a:{si(b);if(null===a)throw Error(m(387));d=b.pendingProps;f=b.memoizedState;e=f.element;Fh(a,b);wd(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=f,b.memoizedState=f,b.flags&256){e=Ub(Error(m(423)),b);b=ti(a,b,d,c,e);break a}else if(d!==e){e=
Ub(Error(m(424)),b);b=ti(a,b,d,c,e);break a}else for(fa=Ka(b.stateNode.containerInfo.firstChild),la=b,D=!0,wa=null,c=li(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Qb();if(d===e){b=Qa(a,b,c);break a}aa(a,b,d,c)}b=b.child}return b;case 5:return Ih(b),null===a&&Xe(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Qe(d,e)?g=null:null!==f&&Qe(d,f)&&(b.flags|=32),qi(a,b),aa(a,b,g,c),b.child;case 6:return null===a&&Xe(b),null;case 13:return ui(a,b,c);case 4:return gf(b,
b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Vb(b,null,d,c):aa(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),mi(a,b,d,e,c);case 7:return aa(a,b,b.pendingProps,c),b.child;case 8:return aa(a,b,b.pendingProps.children,c),b.child;case 12:return aa(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;g=e.value;y(ud,d._currentValue);d._currentValue=g;if(null!==f)if(ua(f.value,g)){if(f.children===
e.children&&!S.current){b=Qa(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=Pa(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var p=l.pending;null===p?k.next=k:(k.next=p.next,p.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);df(f.return,c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===
f.tag){g=f.return;if(null===g)throw Error(m(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);df(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}aa(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,Sb(b,c),e=qa(e),d=d(e),b.flags|=1,aa(a,b,d,c),b.child;case 14:return d=b.type,e=ya(d,b.pendingProps),e=ya(d.type,e),ni(a,b,d,e,c);case 15:return oi(a,
b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),Fd(a,b),b.tag=1,ea(d)?(a=!0,ld(b)):a=!1,Sb(b,c),ei(b,d,e),uf(b,d,e,c),Af(null,b,d,!0,a,c);case 19:return wi(a,b,c);case 22:return pi(a,b,c)}throw Error(m(156,b.tag));};var pa=function(a,b,c,d){return new Tk(a,b,c,d)},aj="function"===typeof reportError?reportError:function(a){console.error(a)};Ud.prototype.render=Xf.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(m(409));
Sd(a,b,null,null)};Ud.prototype.unmount=Xf.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;yb(function(){Sd(null,a,null,null)});b[Ja]=null}};Ud.prototype.unstable_scheduleHydration=function(a){if(a){var b=nl();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Ya.length&&0!==b&&b<Ya[c].priority;c++);Ya.splice(c,0,a);0===c&&Hg(a)}};var Cj=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=
hc(b.pendingLanes);0!==c&&(xe(b,c|1),ia(b,P()),0===(p&6)&&(Hc(),db()))}break;case 13:yb(function(){var b=Oa(a,1);if(null!==b){var c=Z();xa(b,a,1,c)}}),Wf(a,1)}};var Gg=function(a){if(13===a.tag){var b=Oa(a,134217728);if(null!==b){var c=Z();xa(b,a,134217728,c)}Wf(a,134217728)}};var xj=function(a){if(13===a.tag){var b=hb(a),c=Oa(a,b);if(null!==c){var d=Z();xa(c,a,b,d)}Wf(a,b)}};var nl=function(){return z};var wj=function(a,b){var c=z;try{return z=a,b()}finally{z=c}};se=function(a,b,c){switch(b){case "input":le(a,
c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Rc(d);if(!e)throw Error(m(90));jg(d);le(d,e)}}}break;case "textarea":og(a,c);break;case "select":b=c.value,null!=b&&Db(a,!!c.multiple,b,!1)}};(function(a,b,c){xg=a;yg=c})(Tf,function(a,b,c,d,e){var f=z,g=ca.transition;try{return ca.transition=null,z=1,a(b,c,d,e)}finally{z=f,ca.transition=
g,0===p&&Hc()}},yb);var ol={usingClientEntryPoint:!1,Events:[ec,Ib,Rc,ug,vg,Tf]};(function(a){a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sa.ReactCurrentDispatcher,findHostInstanceByFiber:Xk,
findFiberByHostInstance:a.findFiberByHostInstance||Yk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1"};if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)a=!1;else{var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)a=!0;else{try{Uc=b.inject(a),Ca=b}catch(c){}a=b.checkDCE?!0:!1}}return a})({findFiberByHostInstance:ob,bundleType:0,version:"18.3.1-next-f1338f8080-20240426",
rendererPackageName:"react-dom"});Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ol;Q.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Yf(b))throw Error(m(200));return Wk(a,b,null,c)};Q.createRoot=function(a,b){if(!Yf(a))throw Error(m(299));var c=!1,d="",e=aj;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=Vf(a,1,!1,null,null,
c,!1,d,e);a[Ja]=b.current;sc(8===a.nodeType?a.parentNode:a);return new Xf(b)};Q.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(m(188));a=Object.keys(a).join(",");throw Error(m(268,a));}a=Bg(b);a=null===a?null:a.stateNode;return a};Q.flushSync=function(a){return yb(a)};Q.hydrate=function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!0,c)};Q.hydrateRoot=function(a,b,c){if(!Yf(a))throw Error(m(405));
var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=aj;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=Wi(b,null,a,1,null!=c?c:null,e,!1,f,g);a[Ja]=b.current;sc(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,e);return new Ud(b)};Q.render=
function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!1,c)};Q.unmountComponentAtNode=function(a){if(!Vd(a))throw Error(m(40));return a._reactRootContainer?(yb(function(){Wd(null,null,a,!1,function(){a._reactRootContainer=null;a[Ja]=null})}),!0):!1};Q.unstable_batchedUpdates=Tf;Q.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!Vd(c))throw Error(m(200));if(null==a||void 0===a._reactInternals)throw Error(m(38));return Wd(a,b,c,!1,d)};Q.version="18.3.1-next-f1338f8080-20240426"});
})();

;
var supabase=(function(e){function t(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function n(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})}let r=e=>e?(...t)=>e(...t):(...e)=>fetch(...e);var i=class extends Error{constructor(e,t=`FunctionsError`,n){super(e),this.name=t,this.context=n}toJSON(){return{name:this.name,message:this.message,context:this.context}}},a=class extends i{constructor(e){super(`Failed to send a request to the Edge Function`,`FunctionsFetchError`,e)}},o=class extends i{constructor(e){super(`Relay Error invoking the Edge Function`,`FunctionsRelayError`,e)}},s=class extends i{constructor(e){super(`Edge Function returned a non-2xx status code`,`FunctionsHttpError`,e)}},c;(function(e){e.Any=`any`,e.ApNortheast1=`ap-northeast-1`,e.ApNortheast2=`ap-northeast-2`,e.ApSouth1=`ap-south-1`,e.ApSoutheast1=`ap-southeast-1`,e.ApSoutheast2=`ap-southeast-2`,e.CaCentral1=`ca-central-1`,e.EuCentral1=`eu-central-1`,e.EuWest1=`eu-west-1`,e.EuWest2=`eu-west-2`,e.EuWest3=`eu-west-3`,e.SaEast1=`sa-east-1`,e.UsEast1=`us-east-1`,e.UsWest1=`us-west-1`,e.UsWest2=`us-west-2`})(c||={});var l=class{constructor(e,{headers:t={},customFetch:n,region:i=c.Any}={}){this.url=e,this.headers=t,this.region=i,this.fetch=r(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return n(this,arguments,void 0,function*(e,t={}){var n;let r,i,c;try{let{headers:n,method:l,body:u,signal:d,timeout:f}=t,p={},{region:m}=t;m||=this.region;let h=new URL(`${this.url}/${e}`);m&&m!==`any`&&(p[`x-region`]=m,h.searchParams.set(`forceFunctionRegion`,m));let g,ee=!!n&&Object.keys(n).some(e=>e.toLowerCase()===`content-type`);u&&!ee?typeof Blob<`u`&&u instanceof Blob||u instanceof ArrayBuffer?(p[`Content-Type`]=u.type||`application/octet-stream`,g=u):typeof u==`string`?(p[`Content-Type`]=`text/plain`,g=u):typeof FormData<`u`&&u instanceof FormData?g=u:(p[`Content-Type`]=`application/json`,g=JSON.stringify(u)):g=u&&typeof u!=`string`&&!(typeof Blob<`u`&&u instanceof Blob)&&!(u instanceof ArrayBuffer)&&!(typeof FormData<`u`&&u instanceof FormData)?JSON.stringify(u):u;let te=d;f&&(i=new AbortController,r=setTimeout(()=>i.abort(),f),d?(te=i.signal,c=()=>i.abort(),d.addEventListener(`abort`,c)):te=i.signal);let _=yield this.fetch(h.toString(),{method:l||`POST`,headers:Object.assign(Object.assign(Object.assign({},p),this.headers),n),body:g,signal:te}).catch(e=>{throw new a(e)}),ne=_.headers.get(`x-relay-error`);if(ne&&ne===`true`)throw new o(_);if(!_.ok)throw new s(_);let re=(_.headers.get(`Content-Type`)??`text/plain`).split(`;`)[0].trim().toLowerCase(),ie;return ie=re===`application/json`?yield _.json():re===`application/octet-stream`||re===`application/pdf`?yield _.blob():re===`text/event-stream`?_:re===`multipart/form-data`?yield _.formData():yield _.text(),{data:ie,error:null,response:_}}catch(e){return{data:null,error:e,response:e instanceof s||e instanceof o?e.context:void 0}}finally{r&&clearTimeout(r),c&&((n=t.signal)==null||n.removeEventListener(`abort`,c))}})}},u=class extends Error{constructor(e){super(e.message),this.name=`PostgrestError`,this.details=e.details,this.hint=e.hint,this.code=e.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};let d=e=>Math.min(1e3*2**e,3e4),f=[520,503],p=[`GET`,`HEAD`,`OPTIONS`];function m(e){"@babel/helpers - typeof";return m=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},m(e)}function h(e,t){if(m(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(m(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function g(e){var t=h(e,`string`);return m(t)==`symbol`?t:t+``}function ee(e,t,n){return(t=g(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function te(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?te(Object(n),!0).forEach(function(t){ee(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):te(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ne(e,t){return new Promise(n=>{if(t?.aborted){n();return}let r=setTimeout(()=>{t?.removeEventListener(`abort`,i),n()},e);function i(){clearTimeout(r),n()}t?.addEventListener(`abort`,i)})}function re(e,t,n,r){return!(!r||n>=3||!p.includes(e)||!f.includes(t))}async function ie(e,t,n,r){let i=0;for(;;){let a=_({},n.headers);i>0&&(a[`X-Retry-Count`]=String(i));let o;try{o=await e(t,{method:n.method,headers:a,body:n.body,signal:n.signal})}catch(e){if(e?.name===`AbortError`||e?.code===`ABORT_ERR`||e?.name===`TimeoutError`&&n.signal?.aborted||!p.includes(n.method))throw e;if(r&&i<3){let e=d(i);i++,await ne(e,n.signal);continue}throw e}if(re(n.method,o.status,i,r)){let e=o.headers?.get(`Retry-After`)??null,t=e===null?d(i):Math.max(0,parseInt(e,10)||0)*1e3;await o.text(),i++,await ne(t,n.signal);continue}return o}}var ae=class{constructor(e){this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError??!1,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle??!1,this.shouldStripNulls=e.shouldStripNulls??!1,this.urlLengthLimit=e.urlLengthLimit??8e3,this.retryEnabled=e.retry??!0,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get(`Accept`)===`text/csv`)throw Error(`stripNulls() cannot be used with csv()`);return this.shouldStripNulls=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}retry(e){return this.retryEnabled=e,this}then(e,t){var n=this;if(this.schema===void 0||([`GET`,`HEAD`].includes(this.method)?this.headers.set(`Accept-Profile`,this.schema):this.headers.set(`Content-Profile`,this.schema)),this.method!==`GET`&&this.method!==`HEAD`&&this.headers.set(`Content-Type`,`application/json`),this.shouldStripNulls){let e=this.headers.get(`Accept`);e===`application/vnd.pgrst.object+json`?this.headers.set(`Accept`,`application/vnd.pgrst.object+json;nulls=stripped`):(!e||e===`application/json`)&&this.headers.set(`Accept`,`application/vnd.pgrst.array+json;nulls=stripped`)}let r=this.fetch,i=(async()=>{let e={};n.headers.forEach((t,n)=>{e[n]=t});let t=await ie(r,n.url.toString(),{method:n.method,headers:e,body:JSON.stringify(n.body,(e,t)=>typeof t==`bigint`?t.toString():t),signal:n.signal},n.retryEnabled);return await n.processResponse(t)})();return this.shouldThrowOnError||(i=i.catch(e=>{let t=``,n=``,r=``,i=e?.cause;if(i){let n=i?.message??``,r=i?.code??``;t=`${e?.name??`FetchError`}: ${e?.message}`,t+=`\n\nCaused by: ${i?.name??`Error`}: ${n}`,r&&(t+=` (${r})`),i?.stack&&(t+=`\n${i.stack}`)}else t=e?.stack??``;let a=this.url.toString().length;return e?.name===`AbortError`||e?.code===`ABORT_ERR`?(r=``,n=`Request was aborted (timeout or manual cancellation)`,a>this.urlLengthLimit&&(n+=`. Note: Your request URL is ${a} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):(i?.name===`HeadersOverflowError`||i?.code===`UND_ERR_HEADERS_OVERFLOW`)&&(r=``,n=`HTTP headers exceeded server limits (typically 16KB)`,a>this.urlLengthLimit&&(n+=`. Your request URL is ${a} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${e?.name??`FetchError`}: ${e?.message}`,details:t,hint:n,code:r},data:null,count:null,status:0,statusText:``}})),i.then(e,t)}async processResponse(e){var t=this;let n=null,r=null,i=null,a=e.status,o=e.statusText;if(e.ok){if(t.method!==`HEAD`){let i=await e.text();if(i!==``)if(t.headers.get(`Accept`)===`text/csv`)r=i;else if(t.headers.get(`Accept`)&&t.headers.get(`Accept`)?.includes(`application/vnd.pgrst.plan+text`))r=i;else try{r=JSON.parse(i)}catch{if(n={message:i},r=null,t.shouldThrowOnError)throw new u({message:i,details:``,hint:``,code:``})}}let s=t.headers.get(`Prefer`)?.match(/count=(exact|planned|estimated)/),c=e.headers.get(`content-range`)?.split(`/`);if(s&&c&&c.length>1&&(i=parseInt(c[1])),t.isMaybeSingle&&Array.isArray(r))if(r.length>1){if(n={code:`PGRST116`,details:`Results contain ${r.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:`JSON object requested, multiple (or no) rows returned`},r=null,i=null,a=406,o=`Not Acceptable`,t.shouldThrowOnError)throw new u(_(_({},n),{},{hint:n.hint??``}))}else r=r.length===1?r[0]:null}else{let i=await e.text();try{n=JSON.parse(i),Array.isArray(n)&&e.status===404&&(r=[],n=null,a=200,o=`OK`)}catch{e.status===404&&i===``?(a=204,o=`No Content`):n={message:i}}if(n&&t.shouldThrowOnError)throw new u(n)}return{success:n===null,error:n,data:r,count:i,status:a,statusText:o}}returns(){return this}overrideTypes(){return this}},oe=class extends ae{throwOnError(){return super.throwOnError()}select(e){let t=!1,n=(e??`*`).split(``).map(e=>/\s/.test(e)&&!t?``:(e===`"`&&(t=!t),e)).join(``);return this.url.searchParams.set(`select`,n),this.headers.append(`Prefer`,`return=representation`),this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:r,referencedTable:i=r}={}){let a=i?`${i}.order`:`order`,o=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${o?`${o},`:``}${e}.${t?`asc`:`desc`}${n===void 0?``:n?`.nullsfirst`:`.nullslast`}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){let r=n===void 0?`limit`:`${n}.limit`;return this.url.searchParams.set(r,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:r=n}={}){let i=r===void 0?`offset`:`${r}.offset`,a=r===void 0?`limit`:`${r}.limit`;return this.url.searchParams.set(i,`${e}`),this.url.searchParams.set(a,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set(`Accept`,`application/vnd.pgrst.object+json`),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set(`Accept`,`text/csv`),this}geojson(){return this.headers.set(`Accept`,`application/geo+json`),this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:r=!1,wal:i=!1,format:a=`text`}={}){let o=[e?`analyze`:null,t?`verbose`:null,n?`settings`:null,r?`buffers`:null,i?`wal`:null].filter(Boolean).join(`|`),s=this.headers.get(`Accept`)??`application/json`;return this.headers.set(`Accept`,`application/vnd.pgrst.plan+${a}; for="${s}"; options=${o};`),this}rollback(){return this.headers.append(`Prefer`,`tx=rollback`),this}returns(){return this}maxAffected(e){return this.headers.append(`Prefer`,`handling=strict`),this.headers.append(`Prefer`,`max-affected=${e}`),this}};let se=RegExp(`[,()]`);var ce=class extends oe{throwOnError(){return super.throwOnError()}eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(`,`)}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(`,`)}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(`,`)}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(`,`)}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&se.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`in.(${n})`),this}notIn(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&se.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`not.in.(${n})`),this}contains(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t==`string`?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(`,`)}}`),this}textSearch(e,t,{config:n,type:r}={}){let i=``;r===`plain`?i=`pl`:r===`phrase`?i=`ph`:r===`websearch`&&(i=`w`);let a=n===void 0?``:`(${n})`;return this.url.searchParams.append(e,`${i}fts${a}.${t}`),this}match(e){return Object.entries(e).filter(([e,t])=>t!==void 0).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){let r=n?`${n}.or`:`or`;return this.url.searchParams.append(r,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}},le=class{constructor(e,{headers:t={},schema:n,fetch:r,urlLengthLimit:i=8e3,retry:a}){this.url=e,this.headers=new Headers(t),this.schema=n,this.fetch=r,this.urlLengthLimit=i,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){let{head:n=!1,count:r}=t??{},i=n?`HEAD`:`GET`,a=!1,o=(e??`*`).split(``).map(e=>/\s/.test(e)&&!a?``:(e===`"`&&(a=!a),e)).join(``),{url:s,headers:c}=this.cloneRequestState();return s.searchParams.set(`select`,o),r&&c.append(`Prefer`,`count=${r}`),new ce({method:i,url:s,headers:c,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(e,{count:t,defaultToNull:n=!0}={}){let{url:r,headers:i}=this.cloneRequestState();if(t&&i.append(`Prefer`,`count=${t}`),n||i.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);r.searchParams.set(`columns`,e.join(`,`))}}return new ce({method:`POST`,url:r,headers:i,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:r,defaultToNull:i=!0}={}){let{url:a,headers:o}=this.cloneRequestState();if(o.append(`Prefer`,`resolution=${n?`ignore`:`merge`}-duplicates`),t!==void 0&&a.searchParams.set(`on_conflict`,t),r&&o.append(`Prefer`,`count=${r}`),i||o.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);a.searchParams.set(`columns`,e.join(`,`))}}return new ce({method:`POST`,url:a,headers:o,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(e,{count:t}={}){let{url:n,headers:r}=this.cloneRequestState();return t&&r.append(`Prefer`,`count=${t}`),new ce({method:`PATCH`,url:n,headers:r,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:e}={}){let{url:t,headers:n}=this.cloneRequestState();return e&&n.append(`Prefer`,`count=${e}`),new ce({method:`DELETE`,url:t,headers:n,schema:this.schema,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function ue(e,t){try{let t=JSON.parse(e);if(t&&typeof t==`object`&&!Array.isArray(t))return new u({message:String(t.message??e),details:t.details??``,hint:t.hint??``,code:t.code??``})}catch{}return new u({message:e||t,details:``,hint:``,code:``})}function de(e,t,n){let r=e;return{success:!1,error:new u({message:`${r?.name??`FetchError`}: ${r?.message}`,details:``,hint:``,code:``}),data:null,count:null,status:t,statusText:n}}function fe(e,t){return t===void 0||t<=0?e:(n,r)=>{let i=new AbortController,a=setTimeout(()=>i.abort(),t),o=r?.signal;if(o){if(o.aborted)return clearTimeout(a),e(n,r);let t=()=>{clearTimeout(a),i.abort()};return o.addEventListener(`abort`,t,{once:!0}),e(n,_(_({},r),{},{signal:i.signal})).finally(()=>{clearTimeout(a),o.removeEventListener(`abort`,t)})}return e(n,_(_({},r),{},{signal:i.signal})).finally(()=>clearTimeout(a))}}var pe=class e{constructor(e,{headers:t={},schema:n,fetch:r,timeout:i,urlLengthLimit:a=8e3,retry:o,wrapFetch:s}={}){this.url=e,this.headers=new Headers(t),this.schemaName=n,this.urlLengthLimit=a,this.timeout=i,this.wrapFetch=s,this.baseFetch=r??globalThis.fetch,this.fetch=this.baseFetch?this.decorateFetch(this.baseFetch):void 0,this.retry=o}decorateFetch(e){return fe(this.wrapFetch?this.wrapFetch(e):e,this.timeout)}from(e,t){if(!e||typeof e!=`string`||e.trim()===``)throw Error(`Invalid relation name: relation must be a non-empty string.`);return new le(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:t?.fetch?this.decorateFetch(t.fetch):this.fetch,urlLengthLimit:t?.urlLengthLimit??this.urlLengthLimit,retry:t?.retry??this.retry})}schema(t){return new e(this.url,{headers:this.headers,schema:t,fetch:this.baseFetch,timeout:this.timeout,wrapFetch:this.wrapFetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}async getOpenApiSpec(){var e=this;let t=new Headers(e.headers);t.set(`Accept`,`application/openapi+json`),e.schemaName&&t.set(`Accept-Profile`,e.schemaName);let n={};t.forEach((e,t)=>{n[t]=e});let r=e.fetch??globalThis.fetch,i;try{i=await ie(r,`${e.url}/`,{method:`GET`,headers:n},e.retry??!0)}catch(e){return de(e,0,``)}let a;try{a=await i.text()}catch(e){return de(e,i.status,i.statusText)}if(i.ok)try{return{success:!0,error:null,data:JSON.parse(a),count:null,status:i.status,statusText:i.statusText}}catch{}return{success:!1,error:ue(a,i.statusText),data:null,count:null,status:i.status,statusText:i.statusText}}rpc(e,t={},{head:n=!1,get:r=!1,count:i}={}){let a,o=new URL(`${this.url}/rpc/${e}`),s,c=e=>typeof e==`object`&&!!e&&(!Array.isArray(e)||e.some(c)),l=n&&Object.values(t).some(c);l?(a=`POST`,s=t):n||r?(a=n?`HEAD`:`GET`,Object.entries(t).filter(([e,t])=>t!==void 0).map(([e,t])=>[e,Array.isArray(t)?`{${t.join(`,`)}}`:`${t}`]).forEach(([e,t])=>{o.searchParams.append(e,t)})):(a=`POST`,s=t);let u=new Headers(this.headers);return l?u.set(`Prefer`,i?`count=${i},return=minimal`:`return=minimal`):i&&u.set(`Prefer`,`count=${i}`),new ce({method:a,url:o,headers:u,schema:this.schemaName,body:s,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},me=class{constructor(){}static detectEnvironment(){if(typeof WebSocket<`u`)return{type:`native`,wsConstructor:WebSocket};let e=globalThis;if(typeof globalThis<`u`&&e.WebSocket!==void 0)return{type:`native`,wsConstructor:e.WebSocket};let t=typeof global<`u`?global:void 0;if(t&&t.WebSocket!==void 0)return{type:`native`,wsConstructor:t.WebSocket};if(typeof globalThis<`u`&&e.WebSocketPair!==void 0&&globalThis.WebSocket===void 0)return{type:`cloudflare`,error:`Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.`,workaround:`Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.`};if(typeof globalThis<`u`&&e.EdgeRuntime||typeof navigator<`u`&&navigator.userAgent?.includes(`Vercel-Edge`))return{type:`unsupported`,error:`Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.`,workaround:`Use serverless functions or a different deployment target for WebSocket functionality.`};let n=globalThis.process;if(n){let e=n.versions;if(e&&e.node)return{type:`unsupported`,error:`Node.js detected but native WebSocket not found.`,workaround:`Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option.`}}return{type:`unsupported`,error:`Unknown JavaScript runtime without WebSocket support.`,workaround:`Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.`}}static getWebSocketConstructor(){let e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let t=e.error||`WebSocket not supported in this environment.`;throw e.workaround&&(t+=`\n\nSuggested solution: ${e.workaround}`),Error(t)}static isWebSocketSupported(){try{return this.detectEnvironment().type===`native`}catch{return!1}}};let he=`1.0.0`,v={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},ge={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`,access_token:`access_token`},_e={connecting:`connecting`,open:`open`,closing:`closing`,closed:`closed`};var ve=class e{constructor(t){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT=`broadcast`,this.allowedMetadataKeys=e.DEFAULT_METADATA_KEYS,this.allowedMetadataKeys=t??e.DEFAULT_METADATA_KEYS}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event==`string`)return t(this._binaryEncodeUserBroadcastPush(e));let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}_binaryEncodeUserBroadcastPush(e){return this._isArrayBuffer(e.payload?.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){let t=e.payload?.payload??new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,t)}_encodeJsonUserBroadcastPush(e){let t=e.payload?.payload??{},n=new TextEncoder().encode(JSON.stringify(t)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,t,n){let r=new TextEncoder,i=r.encode(e.topic),a=r.encode(e.ref??``),o=r.encode(e.join_ref??``),s=r.encode(e.payload.event),c=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},l=r.encode(Object.keys(c).length===0?``:JSON.stringify(c));if(o.length>255)throw Error(`joinRef length ${o.length} exceeds maximum of 255`);if(a.length>255)throw Error(`ref length ${a.length} exceeds maximum of 255`);if(i.length>255)throw Error(`topic length ${i.length} exceeds maximum of 255`);if(s.length>255)throw Error(`userEvent length ${s.length} exceeds maximum of 255`);if(l.length>255)throw Error(`metadata length ${l.length} exceeds maximum of 255`);let u=this.USER_BROADCAST_PUSH_META_LENGTH+o.length+a.length+i.length+s.length+l.length,d=new ArrayBuffer(this.HEADER_LENGTH+u),f=new DataView(d),p=new Uint8Array(d),m=0;f.setUint8(m++,this.KINDS.userBroadcastPush),f.setUint8(m++,o.length),f.setUint8(m++,a.length),f.setUint8(m++,i.length),f.setUint8(m++,s.length),f.setUint8(m++,l.length),f.setUint8(m++,t),p.set(o,m),m+=o.length,p.set(a,m),m+=a.length,p.set(i,m),m+=i.length,p.set(s,m),m+=s.length,p.set(l,m),m+=l.length;var h=new Uint8Array(d.byteLength+n.byteLength);return h.set(new Uint8Array(d),0),h.set(new Uint8Array(n),d.byteLength),h.buffer}decode(e,t){if(this._isArrayBuffer(e))return t(this._binaryDecode(e));if(typeof e==`string`){let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}return t({})}_binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,r)}}_decodeUserBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+4,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=e.slice(s,e.byteLength),f=o===this.JSON_ENCODING?JSON.parse(n.decode(d)):d,p={type:this.BROADCAST_EVENT,event:l,payload:f};return a>0&&(p.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){return e instanceof ArrayBuffer||e?.constructor?.name===`ArrayBuffer`}_pick(e,t){return!e||typeof e!=`object`?{}:Object.fromEntries(Object.entries(e).filter(([e])=>t.includes(e)))}};ve.DEFAULT_METADATA_KEYS=[`persist`];var ye=ve,y;(function(e){e.abstime=`abstime`,e.bool=`bool`,e.date=`date`,e.daterange=`daterange`,e.float4=`float4`,e.float8=`float8`,e.int2=`int2`,e.int4=`int4`,e.int4range=`int4range`,e.int8=`int8`,e.int8range=`int8range`,e.json=`json`,e.jsonb=`jsonb`,e.money=`money`,e.numeric=`numeric`,e.oid=`oid`,e.reltime=`reltime`,e.text=`text`,e.time=`time`,e.timestamp=`timestamp`,e.timestamptz=`timestamptz`,e.timetz=`timetz`,e.tsrange=`tsrange`,e.tstzrange=`tstzrange`})(y||={});let be=(e,t,n={})=>{let r=n.skipTypes??[];return t?Object.keys(t).reduce((n,i)=>(n[i]=xe(i,e,t,r),n),{}):{}},xe=(e,t,n,r)=>{let i=t.find(t=>t.name===e)?.type,a=n[e];return i&&!r.includes(i)?Se(i,a):Ce(a)},Se=(e,t)=>{if(e.charAt(0)===`_`)return De(t,e.slice(1,e.length));switch(e){case y.bool:return we(t);case y.float4:case y.float8:case y.int2:case y.int4:case y.int8:case y.numeric:case y.oid:return Te(t);case y.json:case y.jsonb:return Ee(t);case y.timestamp:return Oe(t);case y.abstime:case y.date:case y.daterange:case y.int4range:case y.int8range:case y.money:case y.reltime:case y.text:case y.time:case y.timestamptz:case y.timetz:case y.tsrange:case y.tstzrange:return Ce(t);default:return Ce(t)}},Ce=e=>e,we=e=>{switch(e){case`t`:return!0;case`f`:return!1;default:return e}},Te=e=>{if(typeof e==`string`){let t=parseFloat(e);if(!Number.isNaN(t))return t}return e},Ee=e=>{if(typeof e==`string`)try{return JSON.parse(e)}catch{return e}return e},De=(e,t)=>{if(typeof e!=`string`)return e;let n=e.length-1,r=e[n];if(e[0]===`{`&&r===`}`){let r,i=e.slice(1,n);try{r=JSON.parse(`[`+i+`]`)}catch{r=i?i.split(`,`):[]}return r.map(e=>Se(t,e))}return e},Oe=e=>typeof e==`string`?e.replace(` `,`T`):e,ke=e=>{let t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,`http`),t.pathname=t.pathname.replace(/\/+$/,``).replace(/\/socket\/websocket$/i,``).replace(/\/socket$/i,``).replace(/\/websocket$/i,``),t.pathname===``||t.pathname===`/`?t.pathname=`/api/broadcast`:t.pathname+=`/api/broadcast`,t.href};var b=e=>typeof e==`function`?e:function(){return e},Ae=typeof self<`u`?self:null,je=typeof window<`u`?window:null,x=Ae||je||globalThis,Me=`2.0.0`,Ne=1e4,Pe=1e3,Fe=100,S={connecting:0,open:1,closing:2,closed:3},C={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},w={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`},Ie={longpoll:`longpoll`,websocket:`websocket`},Le={complete:4},Re=`base64url.bearer.phx.`,ze=class{constructor(e,t,n,r){this.channel=e,this.event=t,this.payload=n||function(){return{}},this.receivedResp=null,this.timeout=r,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(e){this.timeout=e,this.reset(),this.send()}send(){this.hasReceived(`timeout`)||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:e,response:t,_ref:n}){this.recHooks.filter(t=>t.status===e).forEach(e=>e.callback(t))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger(`timeout`,{})},this.timeout)}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}},Be=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries+=1,this.callback()},this.timerCalc(this.tries+1))}},Ve=class{constructor(e,t,n){this.state=C.closed,this.topic=e,this.params=b(t||{}),this.socket=n,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new ze(this,w.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new Be(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive(`ok`,()=>{this.state=C.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(e=>e.send()),this.pushBuffer=[]}),this.joinPush.receive(`error`,e=>{this.state=C.errored,this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log(`channel`,`close ${this.topic}`),this.state=C.closed,this.socket.remove(this)}),this.onError(e=>{this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.isJoining()&&this.joinPush.reset(),this.state=C.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive(`timeout`,()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`timeout ${this.topic}`,this.joinPush.timeout),new ze(this,w.leave,b({}),this.timeout).send(),this.state=C.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(w.reply,(e,t)=>{this.trigger(this.replyEventName(t),e)})}join(e=this.timeout){if(this.joinedOnce)throw Error(`tried to join multiple times. 'join' can only be called a single time per channel instance`);return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=C.closed,this.bindings=[]}onClose(e){this.on(w.close,e)}onError(e){return this.on(w.error,t=>e(t))}on(e,t){let n=this.bindingRef++;return this.bindings.push({event:e,ref:n,callback:t}),n}off(e,t){this.bindings=this.bindings.filter(n=>!(n.event===e&&(t===void 0||t===n.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,n=this.timeout){if(t||={},!this.joinedOnce)throw Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let r=new ze(this,e,function(){return t},n);return this.canPush()?r.send():(r.startTimeout(),this.pushBuffer.push(r)),r}leave(e=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=C.leaving;let t=()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`leave ${this.topic}`),this.trigger(w.close,`leave`)},n=new ze(this,w.leave,b({}),e);return n.receive(`ok`,()=>t()).receive(`timeout`,()=>t()),n.send(),this.canPush()||n.trigger(`ok`,{}),n}onMessage(e,t,n){return t}filterBindings(e,t,n){return!0}isMember(e,t,n,r){return this.topic===e?r&&r!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log(`channel`,`dropping outdated message`,{topic:e,event:t,payload:n,joinRef:r}),!1):!0:!1}joinRef(){return this.joinPush.ref}rejoin(e=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=C.joining,this.joinPush.resend(e))}trigger(e,t,n,r){let i=this.onMessage(e,t,n,r);if(t&&!i)throw Error(`channel onMessage callbacks must return the payload, modified or unmodified`);let a=this.bindings.filter(r=>r.event===e&&this.filterBindings(r,t,n));for(let e=0;e<a.length;e++)a[e].callback(i,n,r||this.joinRef())}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===C.closed}isErrored(){return this.state===C.errored}isJoined(){return this.state===C.joined}isJoining(){return this.state===C.joining}isLeaving(){return this.state===C.leaving}},He=class{static request(e,t,n,r,i,a,o){if(x.XDomainRequest){let n=new x.XDomainRequest;return this.xdomainRequest(n,e,t,r,i,a,o)}else if(x.XMLHttpRequest){let s=new x.XMLHttpRequest;return this.xhrRequest(s,e,t,n,r,i,a,o)}else if(x.fetch&&x.AbortController)return this.fetchRequest(e,t,n,r,i,a,o);else throw Error(`No suitable XMLHttpRequest implementation found`)}static fetchRequest(e,t,n,r,i,a,o){let s={method:e,headers:n,body:r},c=null;return i&&(c=new AbortController,setTimeout(()=>c.abort(),i),s.signal=c.signal),x.fetch(t,s).then(e=>e.text()).then(e=>this.parseJSON(e)).then(e=>o&&o(e)).catch(e=>{e.name===`AbortError`&&a?a():o&&o(null)}),c}static xdomainRequest(e,t,n,r,i,a,o){return e.timeout=i,e.open(t,n),e.onload=()=>{let t=this.parseJSON(e.responseText);o&&o(t)},a&&(e.ontimeout=a),e.onprogress=()=>{},e.send(r),e}static xhrRequest(e,t,n,r,i,a,o,s){e.open(t,n,!0),e.timeout=a;for(let[t,n]of Object.entries(r))e.setRequestHeader(t,n);return e.onerror=()=>s&&s(null),e.onreadystatechange=()=>{e.readyState===Le.complete&&s&&s(this.parseJSON(e.responseText))},o&&(e.ontimeout=o),e.send(i),e}static parseJSON(e){if(!e||e===``)return null;try{return JSON.parse(e)}catch{return console&&console.log(`failed to parse JSON response`,e),null}}static serialize(e,t){let n=[];for(var r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;let i=t?`${t}[${r}]`:r,a=e[r];typeof a==`object`?n.push(this.serialize(a,i)):n.push(encodeURIComponent(i)+`=`+encodeURIComponent(a))}return n.join(`&`)}static appendParams(e,t){return Object.keys(t).length===0?e:`${e}${e.match(/\?/)?`&`:`?`}${this.serialize(t)}`}},Ue=e=>{let t=``,n=new Uint8Array(e),r=n.byteLength;for(let e=0;e<r;e++)t+=String.fromCharCode(n[e]);return btoa(t)},We=class{constructor(e,t){t&&t.length===2&&t[1].startsWith(Re)&&(this.authToken=atob(t[1].slice(Re.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=S.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(e){return e.replace(`ws://`,`http://`).replace(`wss://`,`https://`).replace(RegExp(`(.*)/`+Ie.websocket),`$1/`+Ie.longpoll)}endpointURL(){return He.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(e,t,n){this.close(e,t,n),this.readyState=S.connecting}ontimeout(){this.onerror(`timeout`),this.closeAndRetry(1005,`timeout`,!1)}isActive(){return this.readyState===S.open||this.readyState===S.connecting}poll(){let e={Accept:`application/json`};this.authToken&&(e[`X-Phoenix-AuthToken`]=this.authToken),this.ajax(`GET`,e,null,()=>this.ontimeout(),e=>{if(e){var{status:t,token:n,messages:r}=e;if(t===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,`session_gone`,!1);return}this.token=n}else t=0;switch(t){case 200:r.forEach(e=>{setTimeout(()=>this.onmessage({data:e}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=S.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,`forbidden`,!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,`internal server error`,500);break;default:throw Error(`unhandled poll status ${t}`)}})}send(e){typeof e!=`string`&&(e=Ue(e)),this.currentBatch?this.currentBatch.push(e):this.awaitingBatchAck?this.batchBuffer.push(e):(this.currentBatch=[e],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(e,t=0){this.awaitingBatchAck=!0;let n=t+Fe,r=e.slice(t,n);this.ajax(`POST`,{"Content-Type":`application/x-ndjson`},r.join(`
`),()=>this.onerror(`timeout`),t=>{!t||t.status!==200?(this.awaitingBatchAck=!1,this.onerror(t&&t.status),this.closeAndRetry(1011,`internal server error`,!1)):n<e.length?this.batchSend(e,n):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(e,t,n){for(let e of this.reqs)e.abort();this.readyState=S.closed;let r=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:e,reason:t,wasClean:n});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<`u`?this.onclose(new CloseEvent(`close`,r)):this.onclose(r)}ajax(e,t,n,r,i){let a;a=He.request(e,this.endpointURL(),t,n,this.timeout,()=>{this.reqs.delete(a),r()},e=>{this.reqs.delete(a),this.isActive()&&i(e)}),this.reqs.add(a)}},Ge=class e{constructor(t,n={}){let r=n.events||{state:`presence_state`,diff:`presence_diff`};this.state=Object.create(null),this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(r.state,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.joinRef=this.channel.joinRef(),this.state=e.syncState(this.state,t,n,r),this.pendingDiffs.forEach(t=>{this.state=e.syncDiff(this.state,t,n,r)}),this.pendingDiffs=[],i()}),this.channel.on(r.diff,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(t):(this.state=e.syncDiff(this.state,t,n,r),i())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(t){return e.list(this.state,t)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,t,n,r){let i=this.toNullProtoObj(this.clone(e));t=this.toNullProtoObj(t);let a=Object.create(null),o=Object.create(null);return this.map(i,(e,n)=>{t[e]||(o[e]=n)}),this.map(t,(e,t)=>{let n=i[e];if(n){let r=t.metas.map(e=>e.phx_ref),i=n.metas.map(e=>e.phx_ref),s=t.metas.filter(e=>i.indexOf(e.phx_ref)<0),c=n.metas.filter(e=>r.indexOf(e.phx_ref)<0);s.length>0&&(a[e]=t,a[e].metas=s),c.length>0&&(o[e]=this.clone(n),o[e].metas=c)}else a[e]=t}),this.syncDiff(i,{joins:a,leaves:o},n,r)}static syncDiff(e,t,n,r){e=this.toNullProtoObj(e);let{joins:i,leaves:a}=this.clone(t);return n||=function(){},r||=function(){},this.map(i,(t,r)=>{let i=e[t];if(e[t]=this.clone(r),i){let n=e[t].metas.map(e=>e.phx_ref),r=i.metas.filter(e=>n.indexOf(e.phx_ref)<0);e[t].metas.unshift(...r)}n(t,i,r)}),this.map(a,(t,n)=>{let i=e[t];if(!i)return;let a=n.metas.map(e=>e.phx_ref);i.metas=i.metas.filter(e=>a.indexOf(e.phx_ref)<0),r(t,i,n),i.metas.length===0&&delete e[t]}),e}static list(e,t){return t||=function(e,t){return t},this.map(e,(e,n)=>t(e,n))}static map(e,t){return Object.getOwnPropertyNames(e).map(n=>t(n,e[n]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let t=Object.create(null);return Object.getOwnPropertyNames(e).forEach(n=>{t[n]=e[n]}),t}static clone(e){return JSON.parse(JSON.stringify(e))}},Ke={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(e,t){if(e.payload.constructor===ArrayBuffer)return t(this.binaryEncode(e));{let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}},decode(e,t){if(e.constructor===ArrayBuffer)return t(this.binaryDecode(e));{let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}},binaryEncode(e){let{join_ref:t,ref:n,event:r,topic:i,payload:a}=e,o=new TextEncoder,s=o.encode(t),c=o.encode(n),l=o.encode(i),u=o.encode(r);this.assertFieldSize(s.byteLength,`join_ref`),this.assertFieldSize(c.byteLength,`ref`),this.assertFieldSize(l.byteLength,`topic`),this.assertFieldSize(u.byteLength,`event`);let d=this.META_LENGTH+s.byteLength+c.byteLength+l.byteLength+u.byteLength,f=new ArrayBuffer(this.HEADER_LENGTH+d),p=new Uint8Array(f),m=new DataView(f),h=0;m.setUint8(h++,this.KINDS.push),m.setUint8(h++,s.byteLength),m.setUint8(h++,c.byteLength),m.setUint8(h++,l.byteLength),m.setUint8(h++,u.byteLength),p.set(s,h),h+=s.byteLength,p.set(c,h),h+=c.byteLength,p.set(l,h),h+=l.byteLength,p.set(u,h),h+=u.byteLength;var g=new Uint8Array(f.byteLength+a.byteLength);return g.set(p,0),g.set(new Uint8Array(a),f.byteLength),g.buffer},assertFieldSize(e,t){if(e>255)throw Error(`unable to convert ${t} to binary: must be less than or equal to 255 bytes, but is ${e} bytes`)},binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.push:return this.decodePush(e,t,r);case this.KINDS.reply:return this.decodeReply(e,t,r);case this.KINDS.broadcast:return this.decodeBroadcast(e,t,r)}},decodePush(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,s=n.decode(e.slice(o,o+r));o+=r;let c=n.decode(e.slice(o,o+i));o+=i;let l=n.decode(e.slice(o,o+a));return o+=a,{join_ref:s,ref:null,topic:c,event:l,payload:e.slice(o,e.byteLength)}},decodeReply(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+this.META_LENGTH,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=n.decode(e.slice(s,s+o));s+=o;let f={status:d,response:e.slice(s,e.byteLength)};return{join_ref:c,ref:l,topic:u,event:w.reply,payload:f}},decodeBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=this.HEADER_LENGTH+2,o=n.decode(e.slice(a,a+r));a+=r;let s=n.decode(e.slice(a,a+i));return a+=i,{join_ref:null,ref:null,topic:o,event:s,payload:e.slice(a,e.byteLength)}}},qe=class{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=t.timeout||Ne,this.transport=t.transport||x.WebSocket||We,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=t.longPollFallbackMs,this.fallbackTimer=null;let n=null;try{n=x&&x.sessionStorage}catch{}this.sessionStore=t.sessionStorage||n,this.establishedConnections=0,this.defaultEncoder=Ke.encode.bind(Ke),this.defaultDecoder=Ke.decode.bind(Ke),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=t.binaryType||`arraybuffer`,this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport===We?(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder):(this.encode=t.encode||this.defaultEncoder,this.decode=t.decode||this.defaultDecoder);let r=null;je&&je.addEventListener&&(je.addEventListener(`pagehide`,e=>{this.conn&&(this.disconnect(),r=this.connectClock)}),je.addEventListener(`pageshow`,e=>{r===this.connectClock&&(r=null,this.connect())}),je.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=t.autoSendHeartbeat??!0,this.heartbeatCallback=t.heartbeatCallback??(()=>{}),this.rejoinAfterMs=e=>t.rejoinAfterMs?t.rejoinAfterMs(e):[1e3,2e3,5e3][e-1]||1e4,this.reconnectAfterMs=e=>t.reconnectAfterMs?t.reconnectAfterMs(e):[10,50,100,150,200,250,500,1e3,2e3][e-1]||5e3,this.logger=t.logger||null,!this.logger&&t.debug&&(this.logger=(e,t,n)=>{console.log(`${e}: ${t}`,n)}),this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=b(t.params||{}),this.endPoint=`${e}/${Ie.websocket}`,this.vsn=t.vsn||Me,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new Be(()=>{if(this.pageHidden){this.log(`Not reconnecting as page is hidden!`),this.teardown();return}this.teardown(async()=>{t.beforeReconnect&&await t.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=t.authToken&&b(t.authToken)}getLongPollTransport(){return We}replaceTransport(e){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&=(this.conn.close(),null),this.transport=e}protocol(){return location.protocol.match(/^https/)?`wss`:`ws`}endPointURL(){let e=He.appendParams(He.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return e.charAt(0)===`/`?e.charAt(1)===`/`?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`:e}disconnect(e,t,n){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,e&&e()},t,n)}connect(e){e&&(console&&console.log(`passing params to connect is deprecated. Instead pass :params to the Socket constructor`),this.params=b(e)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==We?this.connectWithFallback(We,this.longPollFallbackMs):this.transportConnect())}log(e,t,n){this.logger&&this.logger(e,t,n)}hasLogger(){return this.logger!==null}onOpen(e){let t=this.makeRef();return this.stateChangeCallbacks.open.push([t,e]),t}onClose(e){let t=this.makeRef();return this.stateChangeCallbacks.close.push([t,e]),t}onError(e){let t=this.makeRef();return this.stateChangeCallbacks.error.push([t,e]),t}onMessage(e){let t=this.makeRef();return this.stateChangeCallbacks.message.push([t,e]),t}onHeartbeat(e){this.heartbeatCallback=e}ping(e){if(!this.isConnected())return!1;let t=this.makeRef(),n=Date.now();this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:t});let r=this.onMessage(i=>{i.ref===t&&(this.off([r]),e(Date.now()-n))});return!0}transportName(e){switch(e){case We:return`LongPoll`;default:return e.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let e;this.authToken&&(e=[`phoenix`,`${Re}${btoa(this.authToken()).replace(/=/g,``)}`]),this.conn=new this.transport(this.endPointURL(),e),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(e){return this.sessionStore&&this.sessionStore.getItem(e)}storeSession(e,t){this.sessionStore&&this.sessionStore.setItem(e,t)}connectWithFallback(e,t=2500){clearTimeout(this.fallbackTimer);let n=!1,r=!0,i,a=this.transportName(e),o=t=>{this.log(`transport`,`falling back to ${a}...`,t),this.off([void 0,i]),r=!1,this.replaceTransport(e),this.transportConnect()};if(this.getSession(`phx:fallback:${a}`))return o(`memorized`);this.fallbackTimer=setTimeout(o,t),i=this.onError(e=>{this.log(`transport`,`error`,e),r&&!n&&(clearTimeout(this.fallbackTimer),o(e))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(n=!0,!r){let t=this.transportName(e);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${t}`,`true`),this.log(`transport`,`established ${t} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,t),this.ping(e=>{this.log(`transport`,`connected to primary after`,e),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log(`transport`,`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks(`open`)}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log(`transport`,`heartbeat timeout. Attempting to re-establish connection`);try{this.heartbeatCallback(`timeout`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.triggerChanError(Error(`heartbeat timeout`)),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),Pe,`heartbeat timeout`)}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(e,t,n){if(!this.conn)return e&&e();let r=this.conn;this.waitForBufferDone(r,()=>{t?r.close(t,n||``):r.close(),this.waitForSocketClosed(r,()=>{this.conn===r&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),e&&e()})})}waitForBufferDone(e,t,n=1){if(n===5||!e.bufferedAmount){t();return}setTimeout(()=>{this.waitForBufferDone(e,t,n+1)},150*n)}waitForSocketClosed(e,t,n=1){if(n===5||e.readyState===S.closed){t();return}setTimeout(()=>{this.waitForSocketClosed(e,t,n+1)},150*n)}onConnClose(e){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log(`transport`,`close`,e),this.triggerChanError(e),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks(`close`,e)}onConnError(e){this.hasLogger()&&this.log(`transport`,`error`,e);let t=this.transport,n=this.establishedConnections;this.triggerStateCallbacks(`error`,e,t,n),(t===this.transport||n>0)&&this.triggerChanError(e)}triggerChanError(e){this.channels.forEach(t=>{t.isErrored()||t.isLeaving()||t.isClosed()||t.trigger(w.error,e)})}connectionState(){switch(this.conn&&this.conn.readyState){case S.connecting:return`connecting`;case S.open:return`open`;case S.closing:return`closing`;default:return`closed`}}isConnected(){return this.connectionState()===`open`}remove(e){this.off(e.stateChangeRefs),this.channels=this.channels.filter(t=>t!==e)}off(e){for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t]=this.stateChangeCallbacks[t].filter(([t])=>e.indexOf(t)===-1)}channel(e,t={}){let n=new Ve(e,t,this);return this.channels.push(n),n}push(e){if(this.hasLogger()){let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;this.log(`push`,`${t} ${n} (${a}, ${i})`,r)}this.isConnected()?this.encode(e,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(e,e=>this.conn.send(e)))}makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback(`disconnected`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback(`sent`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}onConnMessage(e){this.decode(e.data,e=>{let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;if(i&&i===this.pendingHeartbeatRef){let e=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(r.status===`ok`?`ok`:`error`,e)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log(`receive`,`${r.status||``} ${t} ${n} ${i&&`(`+i+`)`||``}`.trim(),r);for(let e=0;e<this.channels.length;e++){let o=this.channels[e];o.isMember(t,n,r,a)&&o.trigger(n,r,i,a)}this.triggerStateCallbacks(`message`,e)})}triggerStateCallbacks(e,...t){try{this.stateChangeCallbacks[e].forEach(([n,r])=>{try{r(...t)}catch(t){this.log(`error`,`error in ${e} callback`,t)}})}catch(t){this.log(`error`,`error triggering ${e} callbacks`,t)}}leaveOpenTopic(e){let t=this.channels.find(t=>t.topic===e&&(t.isJoined()||t.isJoining()));t&&(this.hasLogger()&&this.log(`transport`,`leaving duplicate topic "${e}"`),t.leave())}},Je=class e{constructor(t,n){let r=Ze(n);this.presence=new Ge(t.getChannel(),r),this.presence.onJoin((n,r,i)=>{let a=e.onJoinPayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onLeave((n,r,i)=>{let a=e.onLeavePayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onSync(()=>{t.getChannel().trigger(`presence`,{event:`sync`})})}get state(){return e.transformState(this.presence.state)}static transformState(e){return e=Xe(e),Object.getOwnPropertyNames(e).reduce((t,n)=>{let r=e[n];return t[n]=Ye(r),t},{})}static onJoinPayload(e,t,n){return{event:`join`,key:e,currentPresences:Qe(t),newPresences:Ye(n)}}static onLeavePayload(e,t,n){return{event:`leave`,key:e,currentPresences:Qe(t),leftPresences:Ye(n)}}};function Ye(e){return e.metas.map(e=>{let t=Object.getOwnPropertyDescriptors(e),n=Object.defineProperties({},t);return n.presence_ref=n.phx_ref,delete n.phx_ref,delete n.phx_ref_prev,n})}function Xe(e){return JSON.parse(JSON.stringify(e))}function Ze(e){return e?.events&&{events:e.events}}function Qe(e){return e?.metas?Ye(e):[]}var $e;(function(e){e.SYNC=`sync`,e.JOIN=`join`,e.LEAVE=`leave`})($e||={});var et=class{get state(){return this.presenceAdapter.state}constructor(e,t){this.channel=e,this.presenceAdapter=new Je(this.channel.channelAdapter,t)}};function tt(e){if(e instanceof Error)return e;if(typeof e==`string`)return Error(e);if(e&&typeof e==`object`){let t=e;if(typeof t.code==`number`){let n=typeof t.reason==`string`&&t.reason?` (${t.reason})`:``;return Error(`socket closed: ${t.code}${n}`,{cause:e})}return Error(`channel error: transport failure`,{cause:e})}return Error(`channel error: connection lost`)}var nt=class{constructor(e,t,n){let r=rt(n);this.channel=e.getSocket().channel(t,r),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,t){return this.channel.on(e,t)}off(e,t){this.channel.off(e,t)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,t,n){let r;try{r=this.channel.push(e,t,n)}catch{throw Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>100){let e=this.channel.pushBuffer.shift();e.cancelTimeout(),this.socket.log(`channel`,`discarded push due to buffer overflow: ${e.event}`,e.payload())}return r}updateJoinPayload(e){let t=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},t),e)}canPush(){return this.socket.isConnected()&&this.state===v.joined}isJoined(){return this.state===v.joined}isJoining(){return this.state===v.joining}isClosed(){return this.state===v.closed}isLeaving(){return this.state===v.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}};function rt(e){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},e.config)}}let it=/[,()"\\]/,at=e=>it.test(e)||e!==e.trim(),ot=e=>`"${e.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`)}"`,st=e=>{let t=e===null?`null`:String(e);return at(t)?ot(t):t},ct=e=>e===null?`null`:String(e),lt=(e,t)=>{if(e===`in`){let e=Array.isArray(t)?t:[t];if(e.length===0)throw Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(e)).map(e=>st(e)).join(`,`)})`}return e===`is`?`is.${ct(t)}`:`${e}.${st(t)}`};var ut=class{constructor(){this.filters=[]}add(e,t,n,r=!1){let i=r?`not.`:``;return this.filters.push(`${e}=${i}${lt(t,n)}`),this}eq(e,t){return this.add(e,`eq`,t)}neq(e,t){return this.add(e,`neq`,t)}gt(e,t){return this.add(e,`gt`,t)}gte(e,t){return this.add(e,`gte`,t)}lt(e,t){return this.add(e,`lt`,t)}lte(e,t){return this.add(e,`lte`,t)}in(e,t){return this.add(e,`in`,t)}like(e,t){return this.add(e,`like`,t)}ilike(e,t){return this.add(e,`ilike`,t)}match(e,t){return this.add(e,`match`,t)}imatch(e,t){return this.add(e,`imatch`,t)}is(e,t){return this.add(e,`is`,t)}isDistinct(e,t){return this.add(e,`isdistinct`,t)}not(e,t,n){return this.add(e,t,n,!0)}build(){return this.filters.join(`,`)}toString(){return this.build()}};let dt=()=>new ut;var ft;(function(e){e.ALL=`*`,e.INSERT=`INSERT`,e.UPDATE=`UPDATE`,e.DELETE=`DELETE`})(ft||={});var T;(function(e){e.BROADCAST=`broadcast`,e.PRESENCE=`presence`,e.POSTGRES_CHANGES=`postgres_changes`,e.SYSTEM=`system`})(T||={});var E;(function(e){e.SUBSCRIBED=`SUBSCRIBED`,e.TIMED_OUT=`TIMED_OUT`,e.CLOSED=`CLOSED`,e.CHANNEL_ERROR=`CHANNEL_ERROR`})(E||={});let pt=v;var mt=class e{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,t={config:{}},n){if(this.topic=e,this.params=t,this.socket=n,this.bindings={},this.subTopic=e.replace(/^realtime:/i,``),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},t.config),this.channelAdapter=new nt(this.socket.socketAdapter,e,this.params),this.presence=new et(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=ke(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&this.params.config?.broadcast?.replay)throw Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,t=this.timeout){if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){let{config:{broadcast:n,presence:r,private:i,postgres_changes_options:a}}=this.params,o=this.bindings.postgres_changes?.map(e=>e.filter)??[],s=!!this.bindings[T.PRESENCE]&&this.bindings[T.PRESENCE].length>0||this.params.config.presence?.enabled===!0,c={},l=Object.assign({broadcast:n,presence:Object.assign(Object.assign({},r),{enabled:s}),postgres_changes:o,private:i},a?{postgres_changes_options:a}:{});this.socket.accessTokenValue&&(c.access_token=this.socket.accessTokenValue),this._onError(t=>{e?.(E.CHANNEL_ERROR,tt(t))}),this._onClose(()=>e?.(E.CLOSED)),this.updateJoinPayload(Object.assign({config:l},c)),this._updateFilterMessage();let u=a?.wait&&o.length>0?Math.max(t,(a.timeout??15e3)+1e4):t;this.channelAdapter.subscribe(u).receive(`ok`,async({postgres_changes:t})=>{if(this.socket._isManualToken()||this.socket.setAuth(),t===void 0){e?.(E.SUBSCRIBED);return}this._updatePostgresBindings(t,e)}).receive(`error`,t=>{this.state=v.errored;let n=Object.values(t).join(`, `)||`error`;e?.(E.CHANNEL_ERROR,Error(n,{cause:t}))}).receive(`timeout`,()=>{e?.(E.TIMED_OUT)})}return this}_updatePostgresBindings(t,n){let r=this.bindings.postgres_changes,i=r?.length??0,a=[];for(let o=0;o<i;o++){let i=r[o],{filter:{event:s,schema:c,table:l,filter:u}}=i,d=t&&t[o];if(d&&d.event===s&&e.isFilterValueEqual(d.schema,c)&&e.isFilterValueEqual(d.table,l)&&e.isFilterValueEqual(d.filter,u))a.push(Object.assign(Object.assign({},i),{id:d.id}));else{this.unsubscribe(),this.state=v.errored,n?.(E.CHANNEL_ERROR,Error(`mismatch between server and client bindings for postgres changes`));return}}this.bindings.postgres_changes=a,this.state!=v.errored&&n&&n(E.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:`presence`,event:`track`,payload:e},t)}async untrack(e={}){return await this.send({type:`presence`,event:`untrack`},e)}on(e,t,n){let r=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=e===T.PRESENCE||e===T.POSTGRES_CHANGES;if(r&&i)throw this.socket.log(`channel`,`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,t,n)}async httpSend(e,t,n={}){if(t==null)return Promise.reject(Error(`Payload is required for httpSend()`));let r=t instanceof ArrayBuffer||ArrayBuffer.isView(t),i={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":r?`application/octet-stream`:`application/json`};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);let a=new URL(this.broadcastEndpointURL);if(a.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&a.searchParams.set(`private`,`true`),n.persist){if(!this.private)return Promise.reject(Error(`Realtime httpSend() cannot store a message on a public channel.`));let e=typeof n.persist==`object`?n.persist.ttl:void 0;e===void 0?a.searchParams.set(`persist`,`true`):a.searchParams.set(`persist[ttl]`,String(e))}let o={method:`POST`,headers:i,body:r?t:JSON.stringify(t)},s=await this._fetchWithTimeout(a.toString(),o,n.timeout??this.timeout);if(s.status===202)return{success:!0};if(s.status===404)return Promise.reject(Error(`httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md`));let c=s.statusText;try{let e=await s.json();c=e.error||e.message||c}catch{}return Promise.reject(Error(c))}async send(e,t={}){if(e.type===`broadcast`&&e.persist&&(!this.private||this.socket.vsn===he)){let e=this.private?`Realtime send() cannot store a message with protocol 1.0.0. Use httpSend() or connect with vsn 2.0.0.`:`Realtime send() cannot store a message on a public channel.`;return this.socket.hasLogger()?this.socket.log(`channel`,e):console.error(e),`error`}if(!this.channelAdapter.canPush()&&e.type===`broadcast`){let n=`Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.`;this.socket.hasLogger()?this.socket.log(`channel`,n):console.warn(n);let{event:r,payload:i}=e;if(e.persist){let e=`Realtime send() fell back to REST and cannot store this message. The batch endpoint does not support persistence. Use httpSend() or send after the channel is connected and subscribed.`;return this.socket.hasLogger()?this.socket.log(`channel`,e):console.error(e),`error`}let a={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":`application/json`};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);let o={method:`POST`,headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:i,private:this.private}]})};try{let e=await this._fetchWithTimeout(this.broadcastEndpointURL,o,t.timeout??this.timeout);return await e.body?.cancel(),e.ok?`ok`:`error`}catch(e){return e instanceof Error&&e.name===`AbortError`?`timed out`:`error`}}else return new Promise(n=>{let r=this.channelAdapter.push(e.type,e,t.timeout||this.timeout);e.type===`broadcast`&&!this.params?.config?.broadcast?.ack&&n(`ok`),r.receive(`ok`,()=>n(`ok`)),r.receive(`error`,t=>n(e.persist&&typeof t?.error==`string`?t.error:`error`)),r.receive(`timeout`,()=>n(`timed out`))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(t=>{this.channelAdapter.unsubscribe(e).receive(`ok`,()=>t(`ok`)).receive(`timeout`,()=>t(`timed out`)).receive(`error`,()=>t(`error`))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,t,n){let r=new AbortController,i=setTimeout(()=>r.abort(),n),a=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:r.signal}));return clearTimeout(i),a}_on(t,n,r){let i=t.toLocaleLowerCase(),a=n?.filter;if((a instanceof ut||typeof a==`object`&&a&&typeof a.build==`function`)&&(n=Object.assign(Object.assign({},n),{filter:a.build()})),i===T.POSTGRES_CHANGES&&this.bindings[i]?.find(t=>e.isSamePostgresFilter(t.filter,n)))return this.socket.log(`error`,`duplicate \`postgres_changes\` binding for ${this.topic} ignored`,n),this;let o=this.channelAdapter.on(t,r),s={type:i,filter:n,callback:r,ref:o};return this.bindings[i]?this.bindings[i].push(s):this.bindings[i]=[s],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,t,n)=>{let r=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(r,n))return!1;let i=this.bindings[r]?.find(t=>t.ref===e.ref);if(!i)return!0;if([`broadcast`,`presence`,`postgres_changes`].includes(r))if(`id`in i){let e=i.id,n=i.filter?.event;return e&&t.ids?.includes(e)&&(n===`*`||n?.toLocaleLowerCase()===t.data?.type.toLocaleLowerCase())}else{let e=(i?.filter?.event)?.toLocaleLowerCase();return e===`*`||e===(t?.event)?.toLocaleLowerCase()}else return i.type.toLocaleLowerCase()===r})}_notThisChannelEvent(e,t){let{close:n,error:r,leave:i,join:a}=ge;return t&&[n,r,i,a].includes(e)&&t!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,t,n)=>{if(typeof t==`object`&&`ids`in t){let e=t.data,{schema:n,table:r,commit_timestamp:i,type:a,errors:o}=e,s={schema:n,table:r,commit_timestamp:i,eventType:a,new:{},old:{},errors:o};return Object.assign(Object.assign({},s),this._getPayloadRecords(e))}return t})}copyBindings(e){if(this.joinedOnce)throw Error(`cannot copy bindings into joined channel`);for(let t in e.bindings)for(let n of e.bindings[t])this._on(n.type,n.filter,n.callback)}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}static isSamePostgresFilter(t,n){let r=(t?.select)?.join()??void 0,i=(n?.select)?.join()??void 0;return t?.event===n?.event&&e.isFilterValueEqual(t?.schema,n?.schema)&&e.isFilterValueEqual(t?.table,n?.table)&&e.isFilterValueEqual(t?.filter,n?.filter)&&r===i}_getPayloadRecords(e){let t={new:{},old:{}};return(e.type===`INSERT`||e.type===`UPDATE`)&&(t.new=be(e.columns,e.record)),(e.type===`UPDATE`||e.type===`DELETE`)&&(t.old=be(e.columns,e.old_record)),t}},ht=class{constructor(e,t){this.socket=new qe(e,t)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,t,n,r=1e4){return new Promise(i=>{setTimeout(()=>i(`timeout`),r),this.socket.disconnect(()=>{e(),i(`ok`)},t,n)})}push(e){this.socket.push(e)}log(e,t,n){this.socket.log(e,t,n)}hasLogger(){return this.socket.hasLogger()}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==_e.connecting}isDisconnecting(){return this.socket.connectionState()==_e.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}};let gt={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},_t=[1e3,2e3,5e3,1e4];function vt(){let e=new Map;return{get length(){return e.size},clear(){e.clear()},getItem(t){return e.has(t)?e.get(t):null},key(t){return Array.from(e.keys())[t]??null},removeItem(t){e.delete(t)},setItem(t,n){e.set(t,String(n))}}}function yt(){try{if(typeof globalThis<`u`&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return vt()}var bt=class{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,t){if(this.channels=[],this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint=``,this.headers={},this.params={},this.ref=0,this.serializer=new ye,this._manuallySetToken=!1,this._authPromise=null,this._authGeneration=0,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),!t?.params?.apikey)throw Error(`API key is required to connect to Realtime`);this.apiKey=t.params.apikey,this.socketAdapter=new ht(e,this._initializeOptions(t)),this.httpEndpoint=ke(e),this.fetch=this._resolveFetch(t?.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely(`connect`),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){let t=e.message;throw Error(`WebSocket not available: ${t}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,t){return this._cancelPendingDisconnect(),this.isDisconnecting()?`ok`:await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,t)}getChannels(){return this.channels}async removeChannel(e){let t=await e.unsubscribe();return t===`ok`&&e.teardown(),t}async removeAllChannels(){let e=this.channels.map(async e=>{let t=await e.unsubscribe();return e.teardown(),t}),t=await Promise.all(e);return await this.disconnect(),t}log(e,t,n){this.socketAdapter.log(e,t,n)}hasLogger(){return this.socketAdapter.hasLogger()}connectionState(){return this.socketAdapter.connectionState()||_e.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,t={config:{}}){let n=`realtime:${e}`,r=this.getChannels().find(e=>e.topic===n);if(r)return r;{let n=new mt(`realtime:${e}`,t,this);return this._cancelPendingDisconnect(),this.channels.push(n),n}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){let t=++this._authGeneration,n=this._performAuth(e,t);t===this._authGeneration&&(this._authPromise=n);try{await n}finally{this._authPromise===n&&(this._authPromise=null)}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic),this.channels.length===0&&(this.log(`transport`,`no channels remaining, scheduling disconnect`),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log(`transport`,`disconnecting immediately - no channels`),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log(`transport`,`deferred disconnect fired - no channels, disconnecting`),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log(`transport`,`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log(`transport`,`pending disconnect cancelled - channel activity detected`),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e,t){let n,r=!1;if(e)n=e,r=!0;else if(this.accessToken)try{n=await this.accessToken()}catch(e){this.log(`error`,`Error fetching access token from callback`,e),n=this.accessTokenValue}else n=this.accessTokenValue;t===this._authGeneration&&(this.accessToken?this._manuallySetToken=!1:r&&(this._manuallySetToken=!0),this.accessTokenValue!=n&&(this.accessTokenValue=n,this.channels.forEach(e=>{let t={access_token:n,version:`realtime-js/2.119.2`};e.updateJoinPayload(t),e.joinedOnce&&e.channelAdapter.isJoined()&&e.channelAdapter.push(ge.access_token,{access_token:n})})))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e=`general`){this._isManualToken()||this.setAuth().catch(t=>{this.log(`error`,`Error setting auth in ${e}`,t)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(e=>{this.log(`error`,`error waiting for auth on connect`,e)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(t,n)=>{t!==`disconnected`&&(t==`sent`&&this._setAuthSafely(),e&&e(t,n))}}_startWorkerHeartbeat(){this.workerUrl?this.log(`worker`,`starting worker for from ${this.workerUrl}`):this.log(`worker`,`starting default worker`);let e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=e=>{this.log(`worker`,`worker error`,e.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=e=>{e.data.event===`keepAlive`&&this.sendHeartbeat()},this.workerRef.postMessage({event:`start`,interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&=(this.log(`worker`,`terminating worker`),this.workerRef.terminate(),void 0)}_workerObjectUrl(e){let t;if(e)t=e;else{let e=new Blob([`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`],{type:`application/javascript`});t=URL.createObjectURL(e)}return t}_initializeOptions(e){this.worker=e?.worker??!1,this.accessToken=e?.accessToken??null;let t={};t.timeout=e?.timeout??1e4,t.heartbeatIntervalMs=e?.heartbeatIntervalMs??gt.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=e?.disconnectOnEmptyChannelsAfterMs??2*(e?.heartbeatIntervalMs??gt.HEARTBEAT_INTERVAL),t.transport=e?.transport??me.getWebSocketConstructor(),t.params=e?.params,t.logger=e?.logger,t.heartbeatCallback=this._wrapHeartbeatCallback(e?.heartbeatCallback),t.sessionStorage=e?.sessionStorage??yt(),t.reconnectAfterMs=e?.reconnectAfterMs??(e=>_t[e-1]||1e4);let n,r,i=e?.vsn??`2.0.0`;switch(i){case he:n=(e,t)=>t(JSON.stringify(e)),r=(e,t)=>t(JSON.parse(e));break;case`2.0.0`:n=this.serializer.encode.bind(this.serializer),r=this.serializer.decode.bind(this.serializer);break;default:throw Error(`Unsupported serializer version: ${i}`)}if(t.vsn=i,t.encode=e?.encode??n,t.decode=e?.decode??r,t.beforeReconnect=this._reconnectAuth.bind(this),(e?.logLevel||e?.log_level)&&(this.logLevel=e.logLevel||e.log_level,t.params=Object.assign(Object.assign({},t.params),{log_level:this.logLevel})),this.worker){if(typeof window<`u`&&!window.Worker)throw Error(`Web Worker is not supported`);this.workerUrl=e?.workerUrl,t.autoSendHeartbeat=!this.worker}return t}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}},xt=class extends Error{constructor(e,t){super(e),this.name=`IcebergError`,this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType===`CommitStateUnknownException`||[500,502,504].includes(t.status)&&t.icebergType?.includes(`CommitState`)===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function St(e,t,n){let r=new URL(t,e);if(n)for(let[e,t]of Object.entries(n))t!==void 0&&r.searchParams.set(e,t);return r.toString()}async function Ct(e){return!e||e.type===`none`?{}:e.type===`bearer`?{Authorization:`Bearer ${e.token}`}:e.type===`header`?{[e.name]:e.value}:e.type===`custom`?await e.getHeaders():{}}function wt(e){let t=e.fetchImpl??globalThis.fetch;return{async request({method:n,path:r,query:i,body:a,headers:o}){let s=St(e.baseUrl,r,i),c=await Ct(e.auth),l=await t(s,{method:n,headers:{...a?{"Content-Type":`application/json`}:{},...c,...o},body:a?JSON.stringify(a):void 0}),u=await l.text(),d=(l.headers.get(`content-type`)||``).includes(`application/json`),f=d&&u?JSON.parse(u):u;if(!l.ok){let e=d?f:void 0,t=e?.error;throw new xt(t?.message??`Request failed with status ${l.status}`,{status:l.status,icebergType:t?.type,icebergCode:t?.code,details:e})}return{status:l.status,headers:l.headers,data:f}}}}function Tt(e){return e.join(``)}var Et=class{constructor(e,t=``){this.client=e,this.prefix=t}async listNamespaces(e){let t=e?{parent:Tt(e.namespace)}:void 0;return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(e=>({namespace:e}))}async createNamespace(e,t){let n={namespace:e.namespace,properties:t?.properties};return(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces`,body:n})).data}async dropNamespace(e){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${Tt(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Tt(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${Tt(e.namespace)}`}),!0}catch(e){if(e instanceof xt&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(e){if(e instanceof xt&&e.status===409)return;throw e}}};function Dt(e){return e.join(``)}var Ot=class{constructor(e,t=``,n){this.client=e,this.prefix=t,this.accessDelegation=n}async listTables(e){return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Dt(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){let n={};return this.accessDelegation&&(n[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${Dt(e.namespace)}/tables`,body:t,headers:n})).data.metadata}async updateTable(e,t){let n=await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${Dt(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":n.data[`metadata-location`],metadata:n.data.metadata}}async dropTable(e,t){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${Dt(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String(t?.purge??!1)}})}async loadTable(e){let t={};return this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Dt(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){let t={};this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation);try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${Dt(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(e){if(e instanceof xt&&e.status===404)return!1;throw e}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(n){if(n instanceof xt&&n.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw n}}},kt=class{constructor(e){let t=`v1`;e.catalogName&&(t+=`/${e.catalogName}`),this.client=wt({baseUrl:e.baseUrl.endsWith(`/`)?e.baseUrl:`${e.baseUrl}/`,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=e.accessDelegation?.join(`,`),this.namespaceOps=new Et(this.client,t),this.tableOps=new Ot(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}};function At(e){"@babel/helpers - typeof";return At=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},At(e)}function jt(e,t){if(At(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(At(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Mt(e){var t=jt(e,`string`);return At(t)==`symbol`?t:t+``}function Nt(e,t,n){return(t=Mt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Pt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Pt(Object(n),!0).forEach(function(t){Nt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Pt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Ft=class extends Error{constructor(e,t=`storage`,n,r){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t===`vectors`?`StorageVectorsError`:`StorageError`,this.status=n,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function It(e){return typeof e==`object`&&!!e&&`__isStorageError`in e}var Lt=class extends Ft{constructor(e,t,n,r=`storage`,i){super(e,r,t,n),this.name=r===`vectors`?`StorageVectorsApiError`:`StorageApiError`,this.status=t,this.statusCode=n,this.code=i}toJSON(){return D(D({},super.toJSON()),{},{code:this.code})}},Rt=class extends Ft{constructor(e,t,n=`storage`){super(e,n),this.name=n===`vectors`?`StorageVectorsUnknownError`:`StorageUnknownError`,this.originalError=t}};function zt(e,t,n){let r=D({},e),i=t.toLowerCase();for(let e of Object.keys(r))e.toLowerCase()===i&&delete r[e];return r[i]=n,r}function Bt(e){let t={};for(let[n,r]of Object.entries(e))t[n.toLowerCase()]=r;return t}let Vt=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),Ht=e=>{if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Ut=e=>{if(Array.isArray(e))return e.map(e=>Ut(e));if(typeof e==`function`||e!==Object(e))return e;let t={};return Object.entries(e).forEach(([e,n])=>{let r=e.replace(/([-_][a-z])/gi,e=>e.toUpperCase().replace(/[-_]/g,``));t[r]=Ut(n)}),t},Wt=e=>!e||typeof e!=`string`||e.length===0||e.length>100||e.trim()!==e||e.includes(`/`)||e.includes(`\\`)?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e),Gt=e=>e.split(`/`).map(encodeURIComponent).join(`/`),Kt=e=>{if(typeof e==`object`&&e){let t=e;if(typeof t.msg==`string`)return t.msg;if(typeof t.message==`string`)return t.message;if(typeof t.error_description==`string`)return t.error_description;if(typeof t.error==`string`)return t.error;if(typeof t.error==`object`&&t.error!==null){let e=t.error;if(typeof e.message==`string`)return e.message}}return JSON.stringify(e)},qt=async(e,t,n,r)=>{if(typeof e==`object`&&e&&`json`in e&&typeof e.json==`function`){let n=e,i=parseInt(String(n.status),10);Number.isFinite(i)||(i=500),n.json().then(e=>{let n=e?.statusCode||e?.code||i+``;t(new Lt(Kt(e),i,n,r,e?.code))}).catch(()=>{let e=i+``;t(new Lt(n.statusText||`HTTP ${i} error`,i,e,r))})}else t(new Rt(Kt(e),e,r))},Jt=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};if(e===`GET`||e===`HEAD`||!r)return D(D({},i),n);if(Ht(r)){let e=t?.headers||{},n;for(let[t,r]of Object.entries(e))t.toLowerCase()===`content-type`&&(n=r);i.headers=zt(e,`Content-Type`,n??`application/json`),i.body=JSON.stringify(r)}else i.body=r;return t?.duplex&&(i.duplex=t.duplex),D(D({},i),n)};async function Yt(e,t,n,r,i,a,o){return new Promise((s,c)=>{e(n,Jt(t,r,i,a)).then(e=>{if(!e.ok)throw e;if(r?.noResolveJson)return e;if(o===`vectors`){let t=e.headers.get(`content-type`);if(e.headers.get(`content-length`)===`0`||e.status===204||!t||!t.includes(`application/json`))return{}}return e.json()}).then(e=>s(e)).catch(e=>qt(e,c,r,o))})}function Xt(e=`storage`){return{get:async(t,n,r,i)=>Yt(t,`GET`,n,r,i,void 0,e),post:async(t,n,r,i,a)=>Yt(t,`POST`,n,i,a,r,e),put:async(t,n,r,i,a)=>Yt(t,`PUT`,n,i,a,r,e),head:async(t,n,r,i)=>Yt(t,`HEAD`,n,D(D({},r),{},{noResolveJson:!0}),i,void 0,e),remove:async(t,n,r,i,a)=>Yt(t,`DELETE`,n,i,a,r,e)}}let{get:O,post:k,put:Zt,head:Qt,remove:A}=Xt(`storage`),j=Xt(`vectors`);var $t=class{constructor(e,t={},n,r=`storage`){this.shouldThrowOnError=!1,this.url=e,this.headers=Bt(t),this.fetch=Vt(n),this.namespace=r}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=zt(this.headers,e,t),this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(It(e))return{data:null,error:e};throw e}}};let en;en=Symbol.toStringTag;var tn=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[en]=`StreamDownloadBuilder`,this.promise=null}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(It(t))return{data:null,error:t};throw t}}};let nn;nn=Symbol.toStringTag;var rn=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[nn]=`BlobDownloadBuilder`,this.promise=null}asStream(){return new tn(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(It(t))return{data:null,error:t};throw t}}};function an(e,t){let n=new URL(e),r=t.pathname.endsWith(`/`)?t.pathname:`${t.pathname}/`;if(n.origin!==t.origin||!n.pathname.startsWith(r))throw new Ft(`Object path escapes the intended bucket endpoint`);return n.href}let on={limit:100,offset:0,sortBy:{column:`name`,order:`asc`}},sn={cacheControl:`3600`,contentType:`text/plain;charset=UTF-8`,upsert:!1};function cn(e){let t=Object.fromEntries(Object.entries(e??{}).filter(([,e])=>e!==void 0));return D(D({},sn),t)}var ln=class extends $t{constructor(e,t={},n,r){super(e,t,r,`storage`),this.bucketId=n}async uploadOrUpdate(e,t,n,r){var i=this;return i.handleOperation(async()=>{let a,o=cn(r),s=D(D({},i.headers),e===`POST`&&{"x-upsert":String(o.upsert)}),c=o.metadata;if(typeof Blob<`u`&&n instanceof Blob||typeof FormData<`u`&&n instanceof FormData?a=i.prepareUploadFormData(n,o):(a=n,s[`cache-control`]=`max-age=${o.cacheControl}`,s[`content-type`]=o.contentType,o.contentEncoding&&(s[`content-encoding`]=o.contentEncoding),c&&(s[`x-metadata`]=i.toBase64(i.encodeMetadata(c))),(typeof ReadableStream<`u`&&a instanceof ReadableStream||a&&typeof a==`object`&&`pipe`in a&&typeof a.pipe==`function`)&&!o.duplex&&(o.duplex=`half`)),r?.headers)for(let[e,t]of Object.entries(r.headers))s=zt(s,e,t);let l=i._removeEmptyFolders(t),u=await(e==`PUT`?Zt:k)(i.fetch,i._getRequestUrl(`object`,l),a,D({headers:s},o?.duplex?{duplex:o.duplex}:{}));return{path:l,id:u.Id,fullPath:u.Key}})}async upload(e,t,n){return this.uploadOrUpdate(`POST`,e,t,n)}async uploadToSignedUrl(e,t,n,r){var i=this;let a=i._removeEmptyFolders(e);return i.handleOperation(async()=>{let e=new URL(i._getRequestUrl(`object/upload/sign`,a));e.searchParams.set(`token`,t);let o,s=cn(r),c=D(D({},i.headers),{"x-upsert":String(s.upsert)}),l=s.metadata;if(typeof Blob<`u`&&n instanceof Blob||typeof FormData<`u`&&n instanceof FormData?o=i.prepareUploadFormData(n,s):(o=n,c[`cache-control`]=`max-age=${s.cacheControl}`,c[`content-type`]=s.contentType,s.contentEncoding&&(c[`content-encoding`]=s.contentEncoding),l&&(c[`x-metadata`]=i.toBase64(i.encodeMetadata(l))),(typeof ReadableStream<`u`&&o instanceof ReadableStream||o&&typeof o==`object`&&`pipe`in o&&typeof o.pipe==`function`)&&!s.duplex&&(s.duplex=`half`)),r?.headers)for(let[e,t]of Object.entries(r.headers))c=zt(c,e,t);return{path:a,fullPath:(await Zt(i.fetch,e.toString(),o,D({headers:c},s?.duplex?{duplex:s.duplex}:{}))).Key}})}async createSignedUploadUrl(e,t){var n=this;return n.handleOperation(async()=>{let r=D({},n.headers);t?.upsert&&(r[`x-upsert`]=`true`);let i=await k(n.fetch,n._getRequestUrl(`object/upload/sign`,e),{},{headers:r}),a=new URL(n.url+i.url),o=a.searchParams.get(`token`);if(!o)throw new Ft(`No token returned by API`);return{signedUrl:a.toString(),path:e,token:o}})}async update(e,t,n){return this.uploadOrUpdate(`PUT`,e,t,n)}async move(e,t,n){var r=this;return r.handleOperation(async()=>await k(r.fetch,`${r.url}/object/move`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket,sourceVersionId:n?.sourceVersionId},{headers:r.headers}))}async copy(e,t,n){var r=this;return r.handleOperation(async()=>{let i=n;return{path:(await k(r.fetch,`${r.url}/object/copy`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket,sourceVersionId:n?.sourceVersionId,copyMetadata:typeof i?.copyMetadata==`boolean`?i.copyMetadata:void 0,metadata:i?.copyMetadata===!1?i.metadata:void 0},{headers:r.headers})).Key}})}async createSignedUrl(e,t,n){var r=this;return r.handleOperation(async()=>{let i=typeof n?.transform==`object`&&n.transform!==null&&Object.keys(n.transform).length>0,a=await k(r.fetch,r._getRequestUrl(`object/sign`,e),D(D({expiresIn:t},i?{transform:n.transform}:{}),n?.versionId==null?{}:{versionId:n.versionId}),{headers:r.headers}),o=new URLSearchParams;n?.download&&o.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&o.set(`cacheNonce`,String(n.cacheNonce));let s=o.toString();return{signedUrl:encodeURI(`${r.url}${a.signedURL}${s?`&${s}`:``}`)}})}async createSignedUrls(e,t,n){var r=this;return r.handleOperation(async()=>{let i=await k(r.fetch,`${r.url}/object/sign/${r.bucketId}`,{expiresIn:t,paths:e},{headers:r.headers}),a=new URLSearchParams;n?.download&&a.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&a.set(`cacheNonce`,String(n.cacheNonce));let o=a.toString();return i.map(e=>D(D({},e),{},{signedUrl:e.signedURL?encodeURI(`${r.url}${e.signedURL}${o?`&${o}`:``}`):null}))})}download(e,t,n){let r=typeof t?.transform==`object`&&t.transform!==null&&Object.keys(t.transform).length>0?`render/image/authenticated`:`object`,i=new URLSearchParams;t?.transform&&this.applyTransformOptsToQuery(i,t.transform),t?.cacheNonce!=null&&i.set(`cacheNonce`,String(t.cacheNonce)),t?.versionId!=null&&i.set(`versionId`,String(t.versionId));let a=i.toString();return new rn(()=>O(this.fetch,this._getRequestUrl(r,e,{queryString:a}),{headers:this.headers,noResolveJson:!0},n),this.shouldThrowOnError)}async info(e,t){var n=this;let r=new URLSearchParams;t?.versionId!=null&&r.set(`versionId`,String(t.versionId));let i=r.toString();return n.handleOperation(async()=>Ut(await O(n.fetch,n._getRequestUrl(`object/info`,e,{queryString:i}),{headers:n.headers})))}async exists(e){let{error:t}=await this.info(e);if(!t)return{data:!0,error:null};if(t instanceof Lt&&(t.code===`NoSuchKey`||t.status===404&&t.code===void 0))return{data:!1,error:t};throw t}getPublicUrl(e,t){let n=this._getFinalPath(e),r=new URLSearchParams;t?.download&&r.set(`download`,t.download===!0?``:t.download),t?.transform&&this.applyTransformOptsToQuery(r,t.transform),t?.cacheNonce!=null&&r.set(`cacheNonce`,String(t.cacheNonce)),t?.versionId!=null&&r.set(`versionId`,String(t.versionId));let i=r.toString(),a=typeof t?.transform==`object`&&t.transform!==null&&Object.keys(t.transform).length>0?`render/image`:`object`;return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}`)+(i?`?${i}`:``)}}}async remove(e){var t=this;return t.handleOperation(async()=>await A(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async purgeCache(e,t,n){var r=this;return r.handleOperation(async()=>{let i=new URLSearchParams;t?.transformations&&i.set(`transformations`,`true`);let a=i.toString();return await A(r.fetch,r._getRequestUrl(`cdn`,e,{encodePath:!0,queryString:a}),{},{headers:r.headers},n)})}async list(e,t,n){var r=this;return r.handleOperation(async()=>{let i=t?.sortBy?D(D({},on.sortBy),t.sortBy):on.sortBy,a=D(D(D({},on),t),{},{sortBy:i,prefix:e||``});return await k(r.fetch,`${r.url}/object/list/${r.bucketId}`,a,{headers:r.headers},n)})}async listV2(e,t){var n=this;return n.handleOperation(async()=>{let r=D({},e);return await k(n.fetch,`${n.url}/object/list-v2/${n.bucketId}`,r,{headers:n.headers},t)})}prepareUploadFormData(e,t){let n=new FormData,r=[];e instanceof FormData?e.forEach((e,t)=>{typeof e==`string`?n.append(t,e):r.push([t,e])}):r.push([``,e]),n.has(`cacheControl`)||n.append(`cacheControl`,t.cacheControl),t.metadata&&!n.has(`metadata`)&&n.append(`metadata`,this.encodeMetadata(t.metadata)),t.contentEncoding&&!n.has(`contentEncoding`)&&n.append(`contentEncoding`,t.contentEncoding);for(let[e,t]of r)n.append(e,t);return n}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<`u`?Buffer.from(e).toString(`base64`):btoa(e)}_getRequestUrl(e,t,{encodePath:n=!1,queryString:r=``}={}){let i=this._getFinalPath(t),a=n?Gt(String(this.bucketId)):this.bucketId,o=`${this.url}/${e}/${n?Gt(i):i}${r?`?${r}`:``}`,s=new URL(`${this.url}/${e}/`),c=an(o,s),l=new URL(`${this.url}/${e}/${a}/`);if(l.pathname.startsWith(s.pathname)){let e=l.pathname.slice(s.pathname.length).split(`/`)[0];e&&(l.pathname=`${s.pathname}${e}/`)}return an(c,l)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,``)}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,``).replace(/\/+/g,`/`)}applyTransformOptsToQuery(e,t){return t.width&&e.set(`width`,t.width.toString()),t.height&&e.set(`height`,t.height.toString()),t.resize&&e.set(`resize`,t.resize),t.format&&e.set(`format`,t.format),t.quality&&e.set(`quality`,t.quality.toString()),e}};let un={"X-Client-Info":`storage-js/2.119.2`};var dn=class extends $t{constructor(e,t={},n,r){let i=new URL(e);r?.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes(`storage.supabase.`)&&(i.hostname=i.hostname.replace(`supabase.`,`storage.supabase.`));let a=i.href.replace(/\/$/,``),o=D(D({},un),t);super(a,o,n,`storage`)}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=t.listBucketOptionsToQueryString(e);return await O(t.fetch,`${t.url}/bucket${n}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await O(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var n=this;return n.handleOperation(async()=>await k(n.fetch,`${n.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes,versioning_status:t.versioningStatus},{headers:n.headers}))}async updateBucket(e,t){var n=this;return n.handleOperation(async()=>await Zt(n.fetch,`${n.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes,versioning_status:t.versioningStatus},{headers:n.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await k(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await A(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}async getBucketLifecycle(e){var t=this;return t.handleOperation(async()=>await O(t.fetch,t.bucketLifecycleUrl(e),{headers:t.headers}))}async updateBucketLifecycle(e,t){var n=this;return n.handleOperation(async()=>await Zt(n.fetch,n.bucketLifecycleUrl(e),t,{headers:n.headers}))}async deleteBucketLifecycle(e){var t=this;return t.handleOperation(async()=>await A(t.fetch,t.bucketLifecycleUrl(e),{},{headers:t.headers}))}async purgeBucketCache(e,t,n){var r=this;return r.handleOperation(async()=>{let i=new URLSearchParams;t?.transformations&&i.set(`transformations`,`true`);let a=i.toString();return await A(r.fetch,`${r.url}/cdn/${Gt(e)}${a?`?${a}`:``}`,{},{headers:r.headers},n)})}bucketLifecycleUrl(e){return`${this.url}/bucket/${Gt(e)}/lifecycle`}listBucketOptionsToQueryString(e){let t={};return e&&(`limit`in e&&(t.limit=String(e.limit)),`offset`in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?`?`+new URLSearchParams(t).toString():``}},fn=class extends $t{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=D(D({},un),t);super(r,i,n,`storage`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await k(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=new URLSearchParams;e?.limit!==void 0&&n.set(`limit`,e.limit.toString()),e?.offset!==void 0&&n.set(`offset`,e.offset.toString()),e?.sortColumn&&n.set(`sortColumn`,e.sortColumn),e?.sortOrder&&n.set(`sortOrder`,e.sortOrder),e?.search&&n.set(`search`,e.search);let r=n.toString(),i=r?`${t.url}/bucket?${r}`:`${t.url}/bucket`;return await O(t.fetch,i,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await A(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!Wt(e))throw new Ft(`Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.`);let n=new kt({baseUrl:this.url,catalogName:e,auth:{type:`custom`,getHeaders:async()=>t.headers},fetch:this.fetch}),r=this.shouldThrowOnError;return new Proxy(n,{get(e,t){let n=e[t];return typeof n==`function`?async(...t)=>{try{return{data:await n.apply(e,t),error:null}}catch(e){if(r)throw e;return{data:null,error:e}}}:n}})}},pn=class extends $t{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=D(D({},un),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createIndex(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var n=this;return n.handleOperation(async()=>await j.post(n.fetch,`${n.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var n=this;return n.handleOperation(async()=>await j.post(n.fetch,`${n.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers})||{})}},mn=class extends $t{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=D(D({},un),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw Error(`Vector batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw Error(`segmentCount must be between 1 and 16`);if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw Error(`Keys batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},hn=class extends $t{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=D(D({},un),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await j.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},gn=class extends hn{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new _n(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,n=this;return t().call(n,e)}async getBucket(e){var t=()=>super.getBucket,n=this;return t().call(n,e)}async listBuckets(e={}){var t=()=>super.listBuckets,n=this;return t().call(n,e)}async deleteBucket(e){var t=()=>super.deleteBucket,n=this;return t().call(n,e)}},_n=class extends pn{constructor(e,t,n,r){super(e,t,r),this.vectorBucketName=n}async createIndex(e){var t=()=>super.createIndex,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,n=this;return t().call(n,n.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,n=this;return t().call(n,n.vectorBucketName,e)}index(e){return new vn(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},vn=class extends mn{constructor(e,t,n,r,i){super(e,t,i),this.vectorBucketName=n,this.indexName=r}async putVectors(e){var t=()=>super.putVectors,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async getVectors(e){var t=()=>super.getVectors,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,n=this;return t().call(n,D(D({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}},yn=class extends dn{constructor(e,t={},n,r){super(e,t,n,r)}from(e){return new ln(this.url,this.headers,e,this.fetch)}get vectors(){return new gn(this.url+`/vector`,{headers:this.headers,fetch:this.fetch})}get analytics(){return new fn(this.url+`/iceberg`,this.headers,this.fetch)}};function bn(e){return typeof e==`string`&&e.length>0?e:void 0}function xn(e){return typeof e.EdgeRuntime==`object`&&e.EdgeRuntime!==null?{platform:`edge-runtime`,platformVersion:bn(e.SUPABASE_VERSION)}:e.Netlify===void 0?{}:{platform:`netlify-edge`}}function Sn(e){let t=e?.match(/\bElectron\/([\w.-]+)/)?.[1];return t?{framework:`electron`,frameworkVersion:t}:{}}function Cn(e=globalThis){let t=bn(e.navigator?.userAgent);if(t===`Cloudflare-Workers`)return{platform:`cloudflare-workers`};if(e.Deno!==void 0)return{...xn(e),runtime:`deno`,runtimeVersion:bn(e.Deno.version?.deno)};if(e.Bun!==void 0)return{runtime:`bun`,runtimeVersion:bn(e.Bun.version)};if(typeof e.EdgeRuntime==`string`)return{platform:`vercel-edge-runtime`};if(e.navigator?.product===`ReactNative`)return{framework:`react-native`};if(e.document!==void 0||e.WorkerGlobalScope!==void 0)return{platform:`browser`,...Sn(t)};let n=e.process?.versions,r=bn(n?.electron);return{runtime:`node`,runtimeVersion:bn(e.process?.version)?.replace(/^v/,``),...r?{framework:`electron`,frameworkVersion:r}:{}}}function wn(e){return[[`platform`,e.platform],[`platform-version`,e.platformVersion],[`runtime`,e.runtime],[`runtime-version`,e.runtimeVersion],[`framework`,e.framework],[`framework-version`,e.frameworkVersion]].filter(([,e])=>e).map(([e,t])=>`${e}=${t}`)}let Tn={headers:{"X-Client-Info":[`supabase-js/2.119.2`,...wn(Cn())].join(`; `)}},En={schema:`public`},Dn={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:`implicit`},On={},kn={enabled:!1,respectSamplingDecision:!0};function An(e){if(!e||typeof e!=`string`)return null;let t=e.split(`-`);if(t.length!==4)return null;let[n,r,i,a]=t;if(n.length!==2||r.length!==32||i.length!==16||a.length!==2)return null;let o=/^[0-9a-f]+$/i;return!o.test(n)||!o.test(r)||!o.test(i)||!o.test(a)||r===`00000000000000000000000000000000`||i===`0000000000000000`?null:{version:n,traceId:r,parentId:i,traceFlags:a,isSampled:(parseInt(a,16)&1)==1}}function jn(e,t){if(!e||!t||t.length===0)return!1;let n;if(e instanceof URL)n=e;else try{n=new URL(e)}catch{return!1}for(let e of t)try{if(typeof e==`string`){if(Mn(n.hostname,e))return!0}else if(e instanceof RegExp){if(e.test(n.hostname))return!0}else if(typeof e==`function`&&e(n))return!0}catch{continue}return!1}function Mn(e,t){if(t===e)return!0;if(t.startsWith(`*.`)){let n=t.slice(2);if(e.endsWith(n)&&(e===n||e.endsWith(`.`+n)))return!0}return!1}function Nn(e){let t=[];try{let n=new URL(e);t.push(n.hostname)}catch{}return t.push(`*.supabase.co`,`*.supabase.in`),t.push(`localhost`,`127.0.0.1`,`[::1]`),t}let Pn=Symbol.for(`@supabase/supabase-js.traceContextExtractor`);function Fn(){return globalThis[Pn]}let In=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),Ln=()=>Headers,Rn=e=>e.startsWith(`sb_publishable_`)||e.startsWith(`sb_secret_`),zn=new Set,Bn=e=>{if(!e.startsWith(`sb_`)||Rn(e)||e.startsWith(`sb_temp_`))return;let t=e.match(/^sb_[a-zA-Z0-9]+_/)?.[0]??`unknown`;zn.has(t)||(zn.add(t),console.warn(`@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type.`))},Vn=(e,t,n,r,i,a)=>{let o=In(r),s=Ln(),c=i?.enabled===!0,l=i?.respectSamplingDecision!==!1,u=c?Nn(t):null,d=!(a?.omitApiKeyAsBearer&&Rn(e));return async(t,r)=>{let i=await n(),a=new s(r?.headers);if(a.has(`apikey`)||a.set(`apikey`,e),!a.has(`Authorization`)){let t=i??(d?e:null);t&&a.set(`Authorization`,`Bearer ${t}`)}if(u){let e=Wn(t,u,l);e&&(e.traceparent&&!a.has(`traceparent`)&&a.set(`traceparent`,e.traceparent),e.tracestate&&!a.has(`tracestate`)&&a.set(`tracestate`,e.tracestate),e.baggage&&!a.has(`baggage`)&&a.set(`baggage`,e.baggage))}return o(t,{...r,headers:a})}},Hn=!1,Un=!1;function Wn(e,t,n){let r=Fn();if(!r)return Hn||(Hn=!0,console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")),null;if(!jn(typeof e==`string`||e instanceof URL?e:e.url,t))return null;let i=r();if(!i||!i.traceparent){if(i?.carrierKeys?.length&&!Un){Un=!0;let e=i.carrierKeys.includes(`sentry-trace`)?" Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it.":` Configure your tracing SDK to emit W3C trace context on outgoing requests.`;console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${i.carrierKeys.join(`, `)}] and no W3C traceparent header, so trace headers will not be attached.`+e)}return null}if(n){let e=An(i.traceparent);if(e&&!e.isSampled)return{traceparent:i.traceparent}}return i}function Gn(e){return typeof e==`boolean`?{enabled:e}:e}function Kn(e){return e.endsWith(`/`)?e:e+`/`}let qn=!1;function Jn(e){qn||typeof e!=`object`||!e||!(`schema`in e)||e.schema===void 0||(qn=!0,console.warn(`@supabase/supabase-js: The "schema" option must be nested under "db", e.g. createClient(url, key, { db: { schema: 'myschema' } }). A top-level "schema" is ignored and queries go to the default schema.`))}function Yn(e,t){let{db:n,auth:r,realtime:i,global:a}=e,{db:o,auth:s,realtime:c,global:l}=t,u=Gn(e.tracePropagation),d=Gn(t.tracePropagation),f={db:{...o,...n},auth:{...s,...r},realtime:{...c,...i},storage:{},global:{...l,...a,headers:{...l?.headers??{},...a?.headers??{}}},tracePropagation:{enabled:u?.enabled??d?.enabled??!1,respectSamplingDecision:u?.respectSamplingDecision??d?.respectSamplingDecision??!0},accessToken:async()=>``};return e.accessToken?f.accessToken=e.accessToken:delete f.accessToken,f}function Xn(e){let t=e?.trim();if(!t)throw Error(`supabaseUrl is required.`);if(!t.match(/^https?:\/\//i))throw Error(`Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.`);try{return new URL(Kn(t))}catch{throw Error(`Invalid supabaseUrl: Provided URL is malformed.`)}}let Zn=`2.119.2`,M=30*1e3,Qn=3*M;2*M;let $n={"X-Client-Info":`gotrue-js/${Zn}`},er=`X-Supabase-Api-Version`,tr={"2024-01-01":{timestamp:Date.parse(`2024-01-01T00:00:00.0Z`),name:`2024-01-01`}},nr=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,N=`sb_flow_id`;var rr=class extends Error{constructor(e,t,n){super(e),this.__isAuthError=!0,this.name=`AuthError`,this.status=t,this.code=n}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}};function P(e){return typeof e==`object`&&!!e&&`__isAuthError`in e}var ir=class extends rr{constructor(e,t,n){super(e,t,n),this.name=`AuthApiError`,this.status=t,this.code=n}};function ar(e){return P(e)&&e.name===`AuthApiError`}var F=class extends rr{constructor(e,t){super(e),this.name=`AuthUnknownError`,this.originalError=t}},I=class extends rr{constructor(e,t,n,r){super(e,n,r),this.name=t,this.status=n}},L=class extends I{constructor(){super(`Auth session missing!`,`AuthSessionMissingError`,400,void 0)}};function or(e){return P(e)&&e.name===`AuthSessionMissingError`}var R=class extends I{constructor(){super(`Auth session or user missing`,`AuthInvalidTokenResponseError`,500,void 0)}},sr=class extends I{constructor(e){super(e,`AuthInvalidCredentialsError`,400,void 0)}},cr=class extends I{constructor(e,t=null){super(e,`AuthImplicitGrantRedirectError`,500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}};function lr(e){return P(e)&&e.name===`AuthImplicitGrantRedirectError`}var ur=class extends I{constructor(e,t=null){super(e,`AuthPKCEGrantCodeExchangeError`,500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}},dr=class extends I{constructor(){super(`PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.`,`AuthPKCECodeVerifierMissingError`,400,`pkce_code_verifier_not_found`)}};function fr(e){return P(e)&&e.name===`AuthPKCECodeVerifierMissingError`}var pr=class extends I{constructor(e,t){super(e,`AuthRetryableFetchError`,t,void 0)}};function mr(e){return P(e)&&e.name===`AuthRetryableFetchError`}var hr=class extends I{constructor(e=`Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)`){super(e,`AuthRefreshDiscardedError`,409,void 0)}};function gr(e){return P(e)&&e.name===`AuthRefreshDiscardedError`}var _r=class extends I{constructor(e,t,n){super(e,`AuthWeakPasswordError`,t,`weak_password`),this.reasons=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}};function vr(e){return P(e)&&e.name===`AuthWeakPasswordError`}var yr=class extends I{constructor(e){super(e,`AuthInvalidJwtError`,400,`invalid_jwt`)}};let br=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`.split(``),xr=` 	
\r=`.split(``),Sr=(()=>{let e=Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<xr.length;t+=1)e[xr[t].charCodeAt(0)]=-2;for(let t=0;t<br.length;t+=1)e[br[t].charCodeAt(0)]=t;return e})();function Cr(e,t,n){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;)n(br[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6;else if(t.queuedBits>0)for(t.queue<<=6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;)n(br[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6}function wr(e,t,n){let r=Sr[e];if(r>-1)for(t.queue=t.queue<<6|r,t.queuedBits+=6;t.queuedBits>=8;)n(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else if(r===-2)return;else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}function Tr(e){let t=[],n=e=>{t.push(String.fromCodePoint(e))},r={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},a=e=>{Or(e,r,n)};for(let t=0;t<e.length;t+=1)wr(e.charCodeAt(t),i,a);return t.join(``)}function Er(e,t){if(e<=127){t(e);return}else if(e<=2047){t(192|e>>6),t(128|e&63);return}else if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}else if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function Dr(e,t){for(let n=0;n<e.length;n+=1){let r=e.charCodeAt(n);if(r>55295&&r<=56319){let t=(r-55296)*1024&65535;r=(e.charCodeAt(n+1)-56320&65535|t)+65536,n+=1}Er(r,t)}}function Or(e,t,n){if(t.utf8seq===0){if(e<=127){n(e);return}for(let n=1;n<6;n+=1)if(!(e>>7-n&1)){t.utf8seq=n;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw Error(`Invalid UTF-8 sequence`);--t.utf8seq}else if(t.utf8seq>0){if(e<=127)throw Error(`Invalid UTF-8 sequence`);t.codepoint=t.codepoint<<6|e&63,--t.utf8seq,t.utf8seq===0&&n(t.codepoint)}}function kr(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};for(let t=0;t<e.length;t+=1)wr(e.charCodeAt(t),n,r);return new Uint8Array(t)}function Ar(e){let t=[];return Dr(e,e=>t.push(e)),new Uint8Array(t)}function z(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};return e.forEach(e=>Cr(e,n,r)),Cr(null,n,r),t.join(``)}function jr(e){return Math.round(Date.now()/1e3)+e}function Mr(){return Symbol(`auth-callback`)}let B=()=>typeof window<`u`&&typeof document<`u`,V={tested:!1,writable:!1},Nr=()=>{if(!B())return!1;try{if(typeof globalThis.localStorage!=`object`)return!1}catch{return!1}if(V.tested)return V.writable;let e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),V.tested=!0,V.writable=!0}catch{V.tested=!0,V.writable=!1}return V.writable};function Pr(e){let t={},n=new URL(e);if(n.hash&&n.hash[0]===`#`)try{new URLSearchParams(n.hash.substring(1)).forEach((e,n)=>{t[n]=e})}catch{}return n.searchParams.forEach((e,n)=>{t[n]=e}),t}let Fr=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),Ir=e=>typeof e==`object`&&!!e&&`status`in e&&`ok`in e&&`json`in e&&typeof e.json==`function`,H=async(e,t,n)=>{await e.setItem(t,JSON.stringify(n))},U=async(e,t)=>{let n=await e.getItem(t);if(!n)return null;try{return JSON.parse(n)}catch{return null}},W=async(e,t)=>{await e.removeItem(t)};var Lr=class e{constructor(){this.promise=new e.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}};Lr.promiseConstructor=Promise;function Rr(e){let t=e.split(`.`);if(t.length!==3)throw new yr(`Invalid JWT structure`);for(let e=0;e<t.length;e++)if(!nr.test(t[e]))throw new yr(`JWT not in base64url format`);return{header:JSON.parse(Tr(t[0])),payload:JSON.parse(Tr(t[1])),signature:kr(t[2]),raw:{header:t[0],payload:t[1]}}}async function zr(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function Br(e,t){return new Promise((n,r)=>{(async()=>{for(let i=0;i<1/0;i++)try{let r=await e(i);if(!t(i,null,r)){n(r);return}}catch(e){if(!t(i,e)){r(e);return}}})()})}function Vr(e){return(`0`+e.toString(16)).substr(-2)}function Hr(){let e=new Uint32Array(56);if(typeof crypto>`u`){let e=``;for(let t=0;t<56;t++)e+=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~`.charAt(Math.floor(Math.random()*66));return e}return crypto.getRandomValues(e),Array.from(e,Vr).join(``)}async function Ur(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest(`SHA-256`,t),r=new Uint8Array(n);return Array.from(r).map(e=>String.fromCharCode(e)).join(``)}async function Wr(e){if(!(typeof crypto<`u`&&crypto.subtle!==void 0&&typeof TextEncoder<`u`))return console.warn(`WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.`),e;let t=await Ur(e);return btoa(t).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}let Gr=/^[a-zA-Z0-9_-]{8,64}$/;function Kr(e){return typeof e==`string`&&Gr.test(e)?e:null}function qr(){if(typeof crypto<`u`&&typeof crypto.getRandomValues==`function`){let e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,Vr).join(``)}let e=``;for(let t=0;t<32;t++)e+=Math.floor(Math.random()*16).toString(16);return e}let Jr=(e,t)=>`${e}-flow-${t}-code-verifier`,Yr=e=>`${e}-flows-code-verifier`;async function Xr(e,t){let n=await U(e,Yr(t));return Array.isArray(n)?n.filter(e=>Kr(e)!==null):[]}async function Zr(e,t,n,r,i){await H(e,Jr(t,n),r);let a=(await Xr(e,t)).filter(e=>e!==n);for(a.push(n);a.length>5;){let n=a.shift();await W(e,Jr(t,n)),i?.(n)}await H(e,Yr(t),a),await H(e,`${t}-code-verifier`,r)}async function Qr(e,t,n){if(n){let r=await U(e,Jr(t,n));return{verifier:typeof r==`string`?r:null,flowId:n}}let r=await U(e,`${t}-code-verifier`);return{verifier:typeof r==`string`?r:null,flowId:null}}async function G(e,t,n){let r=`${t}-code-verifier`;if(!n){await W(e,r);return}let i=Jr(t,n),a=await U(e,i);await W(e,i);let o=await Xr(e,t),s=o.filter(e=>e!==n);s.length!==o.length&&(s.length>0?await H(e,Yr(t),s):await W(e,Yr(t))),a!=null&&a===await U(e,r)&&await W(e,r)}async function $r(e,t){let n=await Xr(e,t);for(let r of n)await W(e,Jr(t,r));await W(e,Yr(t)),await W(e,`${t}-code-verifier`)}function ei(e,t){let n=e.indexOf(`#`),r=n===-1?e:e.slice(0,n),i=n===-1?``:e.slice(n),a=r.indexOf(`?`);if(a!==-1){let e=r.slice(0,a),t=r.slice(a+1).split(`&`).filter(e=>e!==``&&e!==N&&!e.startsWith(`${N}=`));r=t.length>0?`${e}?${t.join(`&`)}`:e}let o=r.includes(`?`)?`&`:`?`;return`${r}${o}${N}=${encodeURIComponent(t)}${i}`}async function ti(e,t,n=!1,r){let i=Hr(),a=i;n&&(a+=`/recovery`);let o=qr();await Zr(e,t,o,a,r);let s=await Wr(i);return[s,i===s?`plain`:`s256`,o]}let ni=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function ri(e){let t=e.headers.get(er);if(!t||!t.match(ni))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function ii(e){if(!e)throw Error(`Missing exp claim`);if(e<=Math.floor(Date.now()/1e3))throw Error(`JWT has expired`)}function ai(e){switch(e){case`RS256`:return{name:`RSASSA-PKCS1-v1_5`,hash:{name:`SHA-256`}};case`ES256`:return{name:`ECDSA`,namedCurve:`P-256`,hash:{name:`SHA-256`}};default:throw Error(`Invalid alg claim`)}}let oi=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function K(e){if(!oi.test(e))throw Error(`@supabase/auth-js: Expected parameter to be UUID but is not`)}function si(e){if(!e.recoveryCodes)throw Error("@supabase/auth-js: the MFA recovery codes API is experimental and disabled by default. Enable it by passing `auth: { experimental: { recoveryCodes: true } }` to createClient (or to the GoTrueClient constructor).")}function ci(){return new Proxy({},{get:(e,t)=>{if(t===`__isUserNotAvailableProxy`)return!0;if(typeof t==`symbol`){let e=t.toString();if(e===`Symbol(Symbol.toPrimitive)`||e===`Symbol(Symbol.toStringTag)`||e===`Symbol(util.inspect.custom)`)return}throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function li(e,t){return new Proxy(e,{get:(e,n,r)=>{if(n===`__isInsecureUserWarningProxy`)return!0;if(typeof n==`symbol`){let t=n.toString();if(t===`Symbol(Symbol.toPrimitive)`||t===`Symbol(Symbol.toStringTag)`||t===`Symbol(util.inspect.custom)`||t===`Symbol(nodejs.util.inspect.custom)`)return Reflect.get(e,n,r)}return!t.value&&typeof n==`string`&&(console.warn(`Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.`),t.value=!0),Reflect.get(e,n,r)}})}function ui(e){return JSON.parse(JSON.stringify(e))}let q=e=>{if(typeof e==`object`&&e){let t=e;if(typeof t.msg==`string`)return t.msg;if(typeof t.message==`string`)return t.message;if(typeof t.error_description==`string`)return t.error_description;if(typeof t.error==`string`)return t.error}return JSON.stringify(e)},di=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function fi(e){if(!Ir(e))throw new pr(q(e),0);let t;try{t=await e.json()}catch(t){throw di.includes(e.status)?new pr(e.statusText||`HTTP ${e.status}`,e.status):new F(q(t),t)}if(di.includes(e.status))throw new pr(q(t),e.status);let n,r=ri(e);if(r&&r.getTime()>=tr[`2024-01-01`].timestamp&&typeof t==`object`&&t&&typeof t.code==`string`?n=t.code:typeof t==`object`&&t&&typeof t.error_code==`string`&&(n=t.error_code),n){if(n===`weak_password`)throw new _r(q(t),e.status,t.weak_password?.reasons||[]);if(n===`session_not_found`)throw new L}else if(typeof t==`object`&&t&&typeof t.weak_password==`object`&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0))throw new _r(q(t),e.status,t.weak_password.reasons);throw new ir(q(t),e.status||500,n)}let pi=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};return e===`GET`?i:(i.headers=Object.assign({"Content-Type":`application/json;charset=UTF-8`},t?.headers),i.body=JSON.stringify(r),Object.assign(Object.assign({},i),n))};async function J(e,t,n,r){let i=Object.assign({},r?.headers);i[er]||(i[er]=tr[`2024-01-01`].name),r?.jwt&&(i.Authorization=`Bearer ${r.jwt}`);let a=r?.query??{};r?.redirectTo&&(a.redirect_to=r.redirectTo);let o=await mi(e,t,n+(Object.keys(a).length?`?`+new URLSearchParams(a).toString():``),{headers:i,noResolveJson:r?.noResolveJson},{},r?.body);return r?.xform?r?.xform(o):{data:Object.assign({},o),error:null}}async function mi(e,t,n,r,i,a){let o=pi(t,r,i,a),s;try{s=await e(n,Object.assign({},o))}catch(e){throw new pr(q(e),0)}if(s.ok||await fi(s),r?.noResolveJson)return s;try{return await s.json()}catch(e){await fi(e)}}function Y(e){let t=null;yi(e)&&(t=Object.assign({},e),e.expires_at||(t.expires_at=jr(e.expires_in)));let n=e.user??(typeof e?.id==`string`?e:null);return{data:{session:t,user:n},error:null}}function hi(e){let t=Y(e);return!t.error&&e.weak_password&&typeof e.weak_password==`object`&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message==`string`&&e.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0)&&(t.data.weak_password=e.weak_password),t}function X(e){return{data:{user:e.user??e},error:null}}function gi(e){return{data:e,error:null}}function _i(e){let{action_link:n,email_otp:r,hashed_token:i,redirect_to:a,verification_type:o}=e,s=t(e,[`action_link`,`email_otp`,`hashed_token`,`redirect_to`,`verification_type`]);return{data:{properties:{action_link:n,email_otp:r,hashed_token:i,redirect_to:a,verification_type:o},user:Object.assign({},s)},error:null}}function vi(e){return e}function yi(e){return!!e.access_token&&!!e.refresh_token&&!!e.expires_in}let bi=[`global`,`local`,`others`];var xi=class{constructor({url:e=``,headers:t={},fetch:n,experimental:r}){this.url=e,this.headers=t,this.fetch=Fr(n),this.experimental=r??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,t=bi[0]){if(bi.indexOf(t)<0)throw Error(`@supabase/auth-js: Parameter scope must be one of ${bi.join(`, `)}`);try{return await J(this.fetch,`POST`,`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(e){if(P(e))return{data:null,error:e};throw e}}async inviteUserByEmail(e,t={}){try{return await J(this.fetch,`POST`,`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:X})}catch(e){if(P(e))return{data:{user:null},error:e};throw e}}async generateLink(e){try{let{options:n}=e,r=t(e,[`options`]),i=Object.assign(Object.assign({},r),n);return`newEmail`in r&&(i.new_email=r?.newEmail,delete i.newEmail),await J(this.fetch,`POST`,`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:_i,redirectTo:n?.redirectTo})}catch(e){if(P(e))return{data:{properties:null,user:null},error:e};throw e}}async createUser(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/users`,{body:e,headers:this.headers,xform:X})}catch(e){if(P(e))return{data:{user:null},error:e};throw e}}async listUsers(e){try{let t={nextPage:null,lastPage:0,total:0},n=await J(this.fetch,`GET`,`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:vi});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(P(e))return{data:{users:[]},error:e};throw e}}async getUserById(e){K(e);try{return await J(this.fetch,`GET`,`${this.url}/admin/users/${e}`,{headers:this.headers,xform:X})}catch(e){if(P(e))return{data:{user:null},error:e};throw e}}async updateUserById(e,t){K(e);try{return await J(this.fetch,`PUT`,`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:X})}catch(e){if(P(e))return{data:{user:null},error:e};throw e}}async deleteUser(e,t=!1){K(e);try{let{data:n,error:r}=await this.getUserById(e);return r?{data:{user:null},error:r}:(await J(this.fetch,`DELETE`,`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},noResolveJson:!0}),{data:n,error:null})}catch(e){if(P(e))return{data:{user:null},error:e};throw e}}async _listFactors(e){K(e.userId);try{let{data:t,error:n}=await J(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:e=>({data:{factors:e},error:null})});return{data:t,error:n}}catch(e){if(P(e))return{data:null,error:e};throw e}}async _deleteFactor(e){K(e.userId),K(e.id);try{return{data:await J(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(e){if(P(e))return{data:null,error:e};throw e}}async _listOAuthClients(e){try{let t={nextPage:null,lastPage:0,total:0},n=await J(this.fetch,`GET`,`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:vi});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(P(e))return{data:{clients:[]},error:e};throw e}}async _createOAuthClient(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _getOAuthClient(e){try{return await J(this.fetch,`GET`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _updateOAuthClient(e,t){try{return await J(this.fetch,`PUT`,`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _deleteOAuthClient(e){try{return await J(this.fetch,`DELETE`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(P(e))return{data:null,error:e};throw e}}async _regenerateOAuthClientSecret(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _listCustomProviders(e){try{let t={};return e?.type&&(t.type=e.type),await J(this.fetch,`GET`,`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:e=>({data:{providers:e?.providers??[]},error:null})})}catch(e){if(P(e))return{data:{providers:[]},error:e};throw e}}async _createCustomProvider(e){try{return await J(this.fetch,`POST`,`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _getCustomProvider(e){try{return await J(this.fetch,`GET`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _updateCustomProvider(e,t){try{return await J(this.fetch,`PUT`,`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _deleteCustomProvider(e){try{return await J(this.fetch,`DELETE`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(P(e))return{data:null,error:e};throw e}}async _adminListPasskeys(e){K(e.userId);try{return await J(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(P(e))return{data:null,error:e};throw e}}async _adminDeletePasskey(e){K(e.userId),K(e.passkeyId);try{return await J(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(P(e))return{data:null,error:e};throw e}}};function Si(e={}){return{getItem:t=>e[t]||null,setItem:(t,n)=>{e[t]=n},removeItem:t=>{delete e[t]}}}let Z={debug:!!(globalThis&&Nr()&&globalThis.localStorage&&globalThis.localStorage.getItem(`supabase.gotrue-js.locks.debug`)===`true`)};var Ci=class extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}},wi=class extends Ci{},Ti=class extends Ci{};async function Ei(e,t,n){Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquire lock`,e,t);let r=new globalThis.AbortController,i;t>0&&(i=setTimeout(()=>{r.abort(),Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock acquire timed out`,e)},t)),await Promise.resolve();try{return await globalThis.navigator.locks.request(e,t===0?{mode:`exclusive`,ifAvailable:!0}:{mode:`exclusive`,signal:r.signal},async r=>{if(r){clearTimeout(i),Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquired`,e,r.name);try{return await n()}finally{Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: released`,e,r.name)}}else if(t===0)throw Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: not immediately available`,e),new wi(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);else{if(Z.debug)try{let e=await globalThis.navigator.locks.query();console.log(`@supabase/gotrue-js: Navigator LockManager state`,JSON.stringify(e,null,`  `))}catch(e){console.warn(`@supabase/gotrue-js: Error when querying Navigator LockManager state`,e)}return console.warn(`@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request`),clearTimeout(i),await n()}})}catch(a){if(clearTimeout(i),typeof a==`object`&&a&&`name`in a&&a.name===`AbortError`){if(r.signal.aborted)return Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock`,e),console.warn(`@supabase/gotrue-js: Lock "${e}" was not released within ${t}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,{mode:`exclusive`,steal:!0},async t=>{if(t){Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: recovered (stolen)`,e,t.name);try{return await n()}finally{Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: released (stolen)`,e,t.name)}}else return console.warn(`@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true`),await n()}));throw Z.debug&&console.log(`@supabase/gotrue-js: navigatorLock: lock was stolen by another request`,e),new wi(`Lock "${e}" was released because another request stole it`)}throw a}}let Di={};async function Oi(e,t,n){let r=Di[e]??Promise.resolve(),i=(async()=>{try{return await r,null}catch{return null}})(),a=(async()=>{let r=null;try{let n=t>=0?new Promise((n,i)=>{r=setTimeout(()=>{console.warn(`@supabase/gotrue-js: Lock "${e}" acquisition timed out after ${t}ms. This may be caused by another operation holding the lock. Consider increasing lockAcquireTimeout or checking for stuck operations.`),i(new Ti(`Acquiring process lock with name "${e}" timed out`))},t)}):null;await Promise.race([i,n].filter(e=>e)),r!==null&&clearTimeout(r)}catch(e){if(r!==null&&clearTimeout(r),e instanceof Ci)throw e}return await n()})();return Di[e]=(async()=>{try{return await a}catch(e){if(e instanceof Ci){try{await r}catch{}return null}throw e}})(),await a}function ki(){if(typeof globalThis!=`object`)try{Object.defineProperty(Object.prototype,`__magic__`,{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<`u`&&(self.globalThis=self)}}function Ai(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function ji(e){return parseInt(e,16)}function Mi(e){let t=new TextEncoder().encode(e);return`0x`+Array.from(t,e=>e.toString(16).padStart(2,`0`)).join(``)}function Ni(e){let{chainId:t,domain:n,expirationTime:r,issuedAt:i=new Date,nonce:a,notBefore:o,requestId:s,resources:c,scheme:l,uri:u,version:d}=e;if(!Number.isInteger(t))throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!n)throw Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);if(a&&a.length<8)throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!u)throw Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);if(d!==`1`)throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d}`);if(e.statement?.includes(`
`))throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`);let f=Ai(e.address),p=`${l?`${l}://${n}`:n} wants you to sign in with your Ethereum account:\n${f}\n\n${e.statement?`${e.statement}\n`:``}`,m=`URI: ${u}\nVersion: ${d}\nChain ID: ${t}${a?`\nNonce: ${a}`:``}\nIssued At: ${i.toISOString()}`;if(r&&(m+=`\nExpiration Time: ${r.toISOString()}`),o&&(m+=`\nNot Before: ${o.toISOString()}`),s&&(m+=`\nRequest ID: ${s}`),c){let e=`
Resources:`;for(let t of c){if(!t||typeof t!=`string`)throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t}`);e+=`\n- ${t}`}m+=e}return`${p}\n${m}`}var Q=class extends Error{constructor({message:e,code:t,cause:n,name:r}){super(e,{cause:n}),this.__isWebAuthnError=!0,this.name=r??(n instanceof Error?n.name:void 0)??`Unknown Error`,this.code=t}toJSON(){return{name:this.name,message:this.message,code:this.code}}},Pi=class extends Q{constructor(e,t){super({code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:t,message:e}),this.name=`WebAuthnUnknownError`,this.originalError=t}};function Fi({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new Q({message:`Registration ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`ConstraintError`){if(n.authenticatorSelection?.requireResidentKey===!0)return new Q({message:`Discoverable credentials were required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT`,cause:e});if(t.mediation===`conditional`&&n.authenticatorSelection?.userVerification===`required`)return new Q({message:`User verification was required during automatic registration but it could not be performed`,code:`ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE`,cause:e});if(n.authenticatorSelection?.userVerification===`required`)return new Q({message:`User verification was required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT`,cause:e})}else if(e.name===`InvalidStateError`)return new Q({message:`The authenticator was previously registered`,code:`ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED`,cause:e});else if(e.name===`NotAllowedError`)return new Q({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`NotSupportedError`)return n.pubKeyCredParams.filter(e=>e.type===`public-key`).length===0?new Q({message:`No entry in pubKeyCredParams was of type "public-key"`,code:`ERROR_MALFORMED_PUBKEYCREDPARAMS`,cause:e}):new Q({message:`No available authenticator supported any of the specified pubKeyCredParams algorithms`,code:`ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(Hi(t)){if(n.rp.id!==t)return new Q({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else return new Q({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e})}else if(e.name===`TypeError`){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new Q({message:`User ID was not between 1 and 64 characters`,code:`ERROR_INVALID_USER_ID_LENGTH`,cause:e})}else if(e.name===`UnknownError`)return new Q({message:`The authenticator was unable to process the specified options, or could not create a new credential`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new Q({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}function Ii({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new Q({message:`Authentication ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`NotAllowedError`)return new Q({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(Hi(t)){if(n.rpId!==t)return new Q({message:`The RP ID "${n.rpId}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else return new Q({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e})}else if(e.name===`UnknownError`)return new Q({message:`The authenticator was unable to process the specified options, or could not create a new assertion signature`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new Q({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}let Li=new class{createNewAbortSignal(){if(this.controller){let e=Error(`Cancelling existing WebAuthn API call for new one`);e.name=`AbortError`,this.controller.abort(e)}let e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){let e=Error(`Manually cancelling existing WebAuthn API call`);e.name=`AbortError`,this.controller.abort(e),this.controller=void 0}}};function Ri(e){if(!e)throw Error(`Credential creation options are required`);if(typeof PublicKeyCredential<`u`&&`parseCreationOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON==`function`)return PublicKeyCredential.parseCreationOptionsFromJSON(e);let{challenge:n,user:r,excludeCredentials:i}=e,a=t(e,[`challenge`,`user`,`excludeCredentials`]),o=kr(n).buffer,s=Object.assign(Object.assign({},r),{id:kr(r.id).buffer}),c=Object.assign(Object.assign({},a),{challenge:o,user:s});if(i&&i.length>0){c.excludeCredentials=Array(i.length);for(let e=0;e<i.length;e++){let t=i[e];c.excludeCredentials[e]=Object.assign(Object.assign({},t),{id:kr(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return c}function zi(e){if(!e)throw Error(`Credential request options are required`);if(typeof PublicKeyCredential<`u`&&`parseRequestOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON==`function`)return PublicKeyCredential.parseRequestOptionsFromJSON(e);let{challenge:n,allowCredentials:r}=e,i=t(e,[`challenge`,`allowCredentials`]),a=kr(n).buffer,o=Object.assign(Object.assign({},i),{challenge:a});if(r&&r.length>0){o.allowCredentials=Array(r.length);for(let e=0;e<r.length;e++){let t=r[e];o.allowCredentials[e]=Object.assign(Object.assign({},t),{id:kr(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return o}function Bi(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e;return{id:e.id,rawId:e.id,response:{attestationObject:z(new Uint8Array(e.response.attestationObject)),clientDataJSON:z(new Uint8Array(e.response.clientDataJSON))},type:`public-key`,clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:t.authenticatorAttachment??void 0}}function Vi(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e,n=e.getClientExtensionResults(),r=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:z(new Uint8Array(r.authenticatorData)),clientDataJSON:z(new Uint8Array(r.clientDataJSON)),signature:z(new Uint8Array(r.signature)),userHandle:r.userHandle?z(new Uint8Array(r.userHandle)):void 0},type:`public-key`,clientExtensionResults:n,authenticatorAttachment:t.authenticatorAttachment??void 0}}function Hi(e){return e===`localhost`||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function Ui(){return!!(B()&&`PublicKeyCredential`in window&&window.PublicKeyCredential&&`credentials`in navigator&&typeof(navigator==null?void 0:navigator.credentials)?.create==`function`&&typeof(navigator==null?void 0:navigator.credentials)?.get==`function`)}async function Wi(e){try{let t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Pi(`Browser returned unexpected credential type`,t)}:{data:null,error:new Pi(`Empty credential response`,t)}}catch(t){return{data:null,error:Fi({error:t,options:e})}}}async function Gi(e){try{let t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Pi(`Browser returned unexpected credential type`,t)}:{data:null,error:new Pi(`Empty credential response`,t)}}catch(t){return{data:null,error:Ii({error:t,options:e})}}}let Ki={hints:[`security-key`],authenticatorSelection:{authenticatorAttachment:`cross-platform`,requireResidentKey:!1,userVerification:`preferred`,residentKey:`discouraged`},attestation:`direct`},qi={userVerification:`preferred`,hints:[`security-key`],attestation:`direct`};function Ji(...e){let t=e=>typeof e==`object`&&!!e&&!Array.isArray(e),n=e=>e instanceof ArrayBuffer||ArrayBuffer.isView(e),r={};for(let i of e)if(i)for(let e in i){let a=i[e];if(a!==void 0)if(Array.isArray(a))r[e]=a;else if(n(a))r[e]=a;else if(t(a)){let n=r[e];t(n)?r[e]=Ji(n,a):r[e]=Ji(a)}else r[e]=a}return r}function Yi(e,t){return Ji(Ki,e,t||{})}function Xi(e,t){return Ji(qi,e,t||{})}var Zi=class{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:`webauthn`}))}async _challenge({factorId:e,webauthn:t,friendlyName:n,signal:r},i){try{let{data:a,error:o}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!a)return{data:null,error:o};let s=r??Li.createNewAbortSignal();if(a.webauthn.type===`create`){let{user:e}=a.webauthn.credential_options.publicKey;if(!e.name){let t=n;if(t)e.name=`${e.id}:${t}`;else{let t=(await this.client.getUser()).data.user,n=t?.user_metadata?.name||t?.email||t?.id||`User`;e.name=`${e.id}:${n}`}}e.displayName||=e.name}switch(a.webauthn.type){case`create`:{let{data:t,error:n}=await Wi({publicKey:Yi(a.webauthn.credential_options.publicKey,i?.create),signal:s});return t?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:t}},error:null}:{data:null,error:n}}case`request`:{let t=Xi(a.webauthn.credential_options.publicKey,i?.request),{data:n,error:r}=await Gi(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:t,signal:s}));return n?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:n}},error:null}:{data:null,error:r}}}}catch(e){return P(e)?{data:null,error:e}:{data:null,error:new F(`Unexpected error in challenge`,e)}}}async _verify({challengeId:e,factorId:t,webauthn:n}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:n})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new rr(`rpId is required for WebAuthn authentication`)};try{if(!Ui())return{data:null,error:new F(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:n},signal:r},{request:i});if(!a)return{data:null,error:o};let{webauthn:s}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:s.type,rpId:t,rpOrigins:n,credential_response:s.credential_response}})}catch(e){return P(e)?{data:null,error:e}:{data:null,error:new F(`Unexpected error in authenticate`,e)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new rr(`rpId is required for WebAuthn registration`)};try{if(!Ui())return{data:null,error:new F(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(t=>t.data?.all.find(t=>t.factor_type===`webauthn`&&t.friendly_name===e&&t.status===`unverified`)).then(e=>e?this.client.mfa.unenroll({factorId:e?.id}):void 0),{data:null,error:o};let{data:s,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:t,rpOrigins:n},signal:r},{create:i});return s?this._verify({factorId:a.id,challengeId:s.challengeId,webauthn:{rpId:t,rpOrigins:n,type:s.webauthn.type,credential_response:s.webauthn.credential_response}}):{data:null,error:c}}catch(e){return P(e)?{data:null,error:e}:{data:null,error:new F(`Unexpected error in register`,e)}}}};ki();let Qi={url:`http://localhost:9999`,storageKey:`supabase.auth.token`,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:$n,flowType:`implicit`,debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},$={},$i=!1;var ea=class e{get jwks(){return $[this.storageKey]?.jwks??{keys:[]}}set jwks(e){$[this.storageKey]=Object.assign(Object.assign({},$[this.storageKey]),{jwks:e})}get jwks_cached_at(){return $[this.storageKey]?.cachedAt??-(2**53-1)}set jwks_cached_at(e){$[this.storageKey]=Object.assign(Object.assign({},$[this.storageKey]),{cachedAt:e})}constructor(t){var n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;let r=Object.assign(Object.assign({},Qi),t);if(this.storageKey=r.storageKey,this.instanceID=e.nextInstanceID[this.storageKey]??0,e.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!r.debug,typeof r.debug==`function`&&(this.logger=r.debug),this.instanceID>0&&B()){let e=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(e),this.logDebugMessages&&console.trace(e)}if(this.persistSession=r.persistSession,this.autoRefreshToken=r.autoRefreshToken,this.experimental=r.experimental??{},this.admin=new xi({url:r.url,headers:r.headers,fetch:r.fetch,experimental:this.experimental}),this.url=r.url,this.headers=r.headers,this.fetch=Fr(r.fetch),this.detectSessionInUrl=r.detectSessionInUrl,this.flowType=r.flowType,this.hasCustomAuthorizationHeader=r.hasCustomAuthorizationHeader,this.throwOnError=r.throwOnError,this.lockAcquireTimeout=r.lockAcquireTimeout,r.lock!=null&&(this.lock=r.lock,$i||($i=!0,console.warn(`${this._logPrefix()} The "lock" option is deprecated and will be removed in v3. The client now coordinates session refreshes without a lock, so most apps can drop the option. See https://github.com/supabase/supabase-js/blob/master/packages/core/auth-js/migrations/lockless-coordination.md`))),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=-(2**53-1)),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Zi(this),recoveryCodes:{getStatus:this._getRecoveryCodesStatus.bind(this),generate:this._generateRecoveryCodes.bind(this),verify:this._verifyRecoveryCode.bind(this),regenerate:this._regenerateRecoveryCodes.bind(this),unenroll:this._unenrollRecoveryCodes.bind(this)}},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(r.storage?this.storage=r.storage:Nr()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Si(this.memoryStorage)),r.userStorage&&(this.userStorage=r.userStorage)):(this.memoryStorage={},this.storage=Si(this.memoryStorage)),B()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(e){console.error(`Failed to create a new BroadcastChannel, multi-tab state changes will not be available`,e)}(n=this.broadcastChannel)==null||n.addEventListener(`message`,async e=>{this._debug(`received broadcast notification from other tab or client`,e),(e.data.event===`TOKEN_REFRESHED`||e.data.event===`SIGNED_IN`)&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(e.data.event,e.data.session,!1)}catch(e){this._debug(`#broadcastChannel`,`error`,e)}})}r.skipAutoInitialize||this.initialize().catch(e=>{this._debug(`#initialize()`,`error`,e)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Zn}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock==null?await this._initialize():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))();let e=await this.initializePromise,t=this._pendingInitNotifications??[];this._pendingInitNotifications=null;for(let e of t)await this._notifyAllSubscribers(e.event,e.session,e.broadcast);return e}async _initialize(){try{let e={},t=`none`;if(B()&&(e=Pr(window.location.href),this._isImplicitGrantCallback(e)?t=`implicit`:await this._isPKCECallback(e)&&(t=`pkce`)),B()&&this.detectSessionInUrl&&t!==`none`){let{data:n,error:r}=await this._getSessionFromURL(e,t);if(r){if(this._debug(`#_initialize()`,`error detecting session from URL`,r),lr(r)){let e=r.details?.code;if(e===`identity_already_exists`||e===`identity_not_found`||e===`single_identity_not_deletable`)return{error:r}}return{error:r}}let{session:i,redirectType:a}=n;return this._debug(`#_initialize()`,`detected session in URL`,i,`redirect type`,a),await this._saveSession(i),setTimeout(async()=>{a===`recovery`?await this._notifyAllSubscribers(`PASSWORD_RECOVERY`,i):await this._notifyAllSubscribers(`SIGNED_IN`,i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return P(e)?this._returnResult({error:e}):this._returnResult({error:new F(`Unexpected error during initialization`,e)})}finally{await this._handleVisibilityChange(),this._debug(`#_initialize()`,`end`)}}async signInAnonymously(e){try{let{data:t,error:n}=await J(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{data:e?.options?.data??{},gotrue_meta_security:{captcha_token:e?.options?.captchaToken}},xform:Y});if(n||!t)return this._returnResult({data:{user:null,session:null},error:n});let r=t.session,i=t.user;return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,r)),this._returnResult({data:{user:i,session:r},error:null})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signUp(e){let t=null;try{let n;if(`email`in e){let{email:r,password:i,options:a}=e,o=null,s=null;this.flowType===`pkce`&&([o,s,t]=await this._getCodeChallengeAndMethod()),n=await J(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(a?.emailRedirectTo,t),body:{email:r,password:i,data:a?.data??{},gotrue_meta_security:{captcha_token:a?.captchaToken},code_challenge:o,code_challenge_method:s},xform:Y})}else if(`phone`in e){let{phone:t,password:r,options:i}=e;n=await J(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{phone:t,password:r,data:i?.data??{},channel:i?.channel??`sms`,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Y})}else throw new sr(`You must provide either an email or phone number and a password`);let{data:r,error:i}=n;if(i||!r)return await G(this.storage,this.storageKey,t),this._returnResult({data:{user:null,session:null},error:i});let a=r.session,o=r.user;return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,a)),this._returnResult({data:{user:o,session:a},error:null})}catch(e){if(await G(this.storage,this.storageKey,t),P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithPassword(e){try{let t;if(`email`in e){let{email:n,password:r,options:i}=e;t=await J(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:hi})}else if(`phone`in e){let{phone:n,password:r,options:i}=e;t=await J(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:hi})}else throw new sr(`You must provide either an email or phone number and a password`);let{data:n,error:r}=t;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!n||!n.session||!n.user){let e=new R;return this._returnResult({data:{user:null,session:null},error:e})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers(`SIGNED_IN`,n.session)),this._returnResult({data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:r})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOAuth(e){return await this._handleProviderSignIn(e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:e.options?.skipBrowserRedirect})}async exchangeCodeForSession(e,t){return await this.initializePromise,this.lock==null?this._exchangeCodeForSession(e,t):this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,t))}async signInWithWeb3(e){let{chain:t}=e;switch(t){case`ethereum`:return await this.signInWithEthereum(e);case`solana`:return await this.signInWithSolana(e);default:throw Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(B())if(typeof i==`object`)s=i;else{let e=window;if(`ethereum`in e&&typeof e.ethereum==`object`&&`request`in e.ethereum&&typeof e.ethereum.request==`function`)s=e.ethereum;else throw Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`)}else{if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}let c=new URL(o?.url??window.location.href),l=await s.request({method:`eth_requestAccounts`}).then(e=>e).catch(()=>{throw Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`)});if(!l||l.length===0)throw Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);let u=Ai(l[0]),d=o?.signInWithEthereum?.chainId;d||=ji(await s.request({method:`eth_chainId`})),t=Ni({domain:c.host,address:u,statement:a,uri:c.href,version:`1`,chainId:d,nonce:o?.signInWithEthereum?.nonce,issuedAt:o?.signInWithEthereum?.issuedAt??new Date,expirationTime:o?.signInWithEthereum?.expirationTime,notBefore:o?.signInWithEthereum?.notBefore,requestId:o?.signInWithEthereum?.requestId,resources:o?.signInWithEthereum?.resources}),n=await s.request({method:`personal_sign`,params:[Mi(t),u]})}try{let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`ethereum`,message:t,signature:n},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Y});if(i)throw i;if(!r||!r.session||!r.user){let e=new R;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSolana(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(B())if(typeof i==`object`)s=i;else{let e=window;if(`solana`in e&&typeof e.solana==`object`&&(`signIn`in e.solana&&typeof e.solana.signIn==`function`||`signMessage`in e.solana&&typeof e.solana.signMessage==`function`))s=e.solana;else throw Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`)}else{if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}let c=new URL(o?.url??window.location.href);if(`signIn`in s&&s.signIn){let e=await s.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},o?.signInWithSolana),{version:`1`,domain:c.host,uri:c.href}),a?{statement:a}:null)),r;if(Array.isArray(e)&&e[0]&&typeof e[0]==`object`)r=e[0];else if(e&&typeof e==`object`&&`signedMessage`in e&&`signature`in e)r=e;else throw Error(`@supabase/auth-js: Wallet method signIn() returned unrecognized value`);if(`signedMessage`in r&&`signature`in r&&(typeof r.signedMessage==`string`||r.signedMessage instanceof Uint8Array)&&r.signature instanceof Uint8Array)t=typeof r.signedMessage==`string`?r.signedMessage:new TextDecoder().decode(r.signedMessage),n=r.signature;else throw Error(`@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields`)}else{if(!(`signMessage`in s)||typeof s.signMessage!=`function`||!(`publicKey`in s)||typeof s!=`object`||!s.publicKey||!(`toBase58`in s.publicKey)||typeof s.publicKey.toBase58!=`function`)throw Error(`@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API`);t=[`${c.host} wants you to sign in with your Solana account:`,s.publicKey.toBase58(),...a?[``,a,``]:[``],`Version: 1`,`URI: ${c.href}`,`Issued At: ${o?.signInWithSolana?.issuedAt??new Date().toISOString()}`,...o?.signInWithSolana?.notBefore?[`Not Before: ${o.signInWithSolana.notBefore}`]:[],...o?.signInWithSolana?.expirationTime?[`Expiration Time: ${o.signInWithSolana.expirationTime}`]:[],...o?.signInWithSolana?.chainId?[`Chain ID: ${o.signInWithSolana.chainId}`]:[],...o?.signInWithSolana?.nonce?[`Nonce: ${o.signInWithSolana.nonce}`]:[],...o?.signInWithSolana?.requestId?[`Request ID: ${o.signInWithSolana.requestId}`]:[],...o?.signInWithSolana?.resources?.length?[`Resources`,...o.signInWithSolana.resources.map(e=>`- ${e}`)]:[]].join(`
`);let e=await s.signMessage(new TextEncoder().encode(t),`utf8`);if(!e||!(e instanceof Uint8Array))throw Error(`@supabase/auth-js: Wallet signMessage() API returned an recognized value`);n=e}}try{let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`solana`,message:t,signature:z(n)},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Y});if(i)throw i;if(!r||!r.session||!r.user){let e=new R;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _exchangeCodeForSession(e,t){let n=t?.flowId!=null,r=n?Kr(t?.flowId):B()?Kr(Pr(window.location.href)[N]):null;n&&!r&&this._debug(`#_exchangeCodeForSession()`,`provided flowId is not a valid flow id`,t?.flowId);let{verifier:i,flowId:a}=n&&!r?{verifier:null,flowId:null}:await Qr(this.storage,this.storageKey,r),[o,s]=(i??``).split(`/`);try{if(!o&&this.flowType===`pkce`)throw new dr;let{data:t,error:n}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:o},xform:Y});if(await G(this.storage,this.storageKey,a),n)throw n;if(!t||!t.session||!t.user){let e=new R;return this._returnResult({data:{user:null,session:null,redirectType:null},error:e})}return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(s===`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,t.session)),this._returnResult({data:Object.assign(Object.assign({},t),{redirectType:s??null}),error:n})}catch(e){if(await G(this.storage,this.storageKey,a),P(e))return this._returnResult({data:{user:null,session:null,redirectType:null},error:e});throw e}}async signInWithIdToken(e){try{let{options:t,provider:n,token:r,access_token:i,nonce:a}=e,{data:o,error:s}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:r,access_token:i,nonce:a,gotrue_meta_security:{captcha_token:t?.captchaToken}},xform:Y});if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!o||!o.session||!o.user){let e=new R;return this._returnResult({data:{user:null,session:null},error:e})}return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers(`SIGNED_IN`,o.session)),this._returnResult({data:o,error:s})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOtp(e){let t=null;try{if(`email`in e){let{email:n,options:r}=e,i=null,a=null;this.flowType===`pkce`&&([i,a,t]=await this._getCodeChallengeAndMethod());let{error:o}=await J(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{email:n,data:r?.data??{},create_user:r?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:r?.captchaToken},code_challenge:i,code_challenge_method:a},redirectTo:this._maybeAppendFlowIdToRedirect(r?.emailRedirectTo,t)});return this._returnResult({data:{user:null,session:null},error:o})}if(`phone`in e){let{phone:t,options:n}=e,{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{phone:t,data:n?.data??{},create_user:n?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:n?.captchaToken},channel:n?.channel??`sms`}});return this._returnResult({data:{user:null,session:null,messageId:r?.message_id},error:i})}throw new sr(`You must provide either an email or phone number.`)}catch(e){if(await G(this.storage,this.storageKey,t),P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async verifyOtp(e){try{let t,n;`options`in e&&(t=e.options?.redirectTo,n=e.options?.captchaToken);let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:t,xform:Y});if(i)throw i;if(!r)throw Error(`An error occurred on token verification.`);let a=r.session,o=r.user;return a?.access_token&&(await this._saveSession(a),await this._notifyAllSubscribers(e.type==`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,a)),this._returnResult({data:{user:o,session:a},error:null})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSSO(e){let t=null;try{let n=null,r=null;this.flowType===`pkce`&&([n,r,t]=await this._getCodeChallengeAndMethod());let i=await J(this.fetch,`POST`,`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},`providerId`in e?{provider_id:e.providerId}:null),`domain`in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect(e.options?.redirectTo,t)}),e?.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:n,code_challenge_method:r}),headers:this.headers,xform:gi});return i.data?.url&&B()&&!e.options?.skipBrowserRedirect&&window.location.assign(i.data.url),this._returnResult(i)}catch(e){if(await G(this.storage,this.storageKey,t),P(e))return this._returnResult({data:null,error:e});throw e}}async reauthenticate(){return await this.initializePromise,this.lock==null?await this._reauthenticate():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)throw n;if(!t)throw new L;let{error:r}=await J(this.fetch,`GET`,`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let t=null;try{let n=`${this.url}/resend`;if(`email`in e){let{email:r,type:i,options:a}=e,o=null,s=null;this.flowType===`pkce`&&([o,s,t]=await this._getCodeChallengeAndMethod());let{error:c}=await J(this.fetch,`POST`,n,{headers:this.headers,body:{email:r,type:i,gotrue_meta_security:{captcha_token:a?.captchaToken},code_challenge:o,code_challenge_method:s},redirectTo:this._maybeAppendFlowIdToRedirect(a?.emailRedirectTo,t)});return c&&await G(this.storage,this.storageKey,t),this._returnResult({data:{user:null,session:null},error:c})}else if(`phone`in e){let{phone:t,type:r,options:i}=e,{data:a,error:o}=await J(this.fetch,`POST`,n,{headers:this.headers,body:{phone:t,type:r,gotrue_meta_security:{captcha_token:i?.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a?.message_id},error:o})}throw new sr(`You must provide either an email or phone number and a type`)}catch(e){if(await G(this.storage,this.storageKey,t),P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async getSession(){return await this.initializePromise,this.lock==null?await this._useSession(async e=>e):await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e))}async _acquireLock(e,t){this._debug(`#_acquireLock`,`begin`,e);try{if(this.lockAcquired){let e=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await e,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug(`#_acquireLock`,`lock acquired for storage key`,this.storageKey);try{this.lockAcquired=!0;let e=t();for(this.pendingInLock.push((async()=>{try{await e}catch{}})()),await e;this.pendingInLock.length;){let e=[...this.pendingInLock];await Promise.all(e),this.pendingInLock.splice(0,e.length)}return await e}finally{this._debug(`#_acquireLock`,`lock released for storage key`,this.storageKey),this.lockAcquired=!1}})}finally{this._debug(`#_acquireLock`,`end`)}}async _useSession(e){this._debug(`#_useSession`,`begin`);try{return await e(await this.__loadSession())}finally{this._debug(`#_useSession`,`end`)}}async __loadSession(){this._debug(`#__loadSession()`,`begin`),this.lock!=null&&!this.lockAcquired&&this._debug(`#__loadSession()`,`used outside of an acquired lock!`,Error().stack);try{let e=null,t=await U(this.storage,this.storageKey);if(this._debug(`#getSession()`,`session from storage`,t),t!==null&&(this._isValidSession(t)?e=t:(this._debug(`#getSession()`,`session from storage is not valid`),await this._removeSession())),!e)return{data:{session:null},error:null};let n=e.expires_at?e.expires_at*1e3-Date.now()<Qn:!1;if(this._debug(`#__loadSession()`,`session has${n?``:` not`} expired`,`expires_at`,e.expires_at),!n)return{data:{session:await this._hydrateSessionUser(e)},error:null};let{data:r,error:i}=await this._callRefreshToken(e.refresh_token);if(i){let e=await U(this.storage,this.storageKey);return e&&this._isValidSession(e)&&e.expires_at&&e.expires_at*1e3>Date.now()?this._returnResult({data:{session:await this._hydrateSessionUser(e)},error:null}):this._returnResult({data:{session:null},error:i})}return this._returnResult({data:{session:r},error:null})}finally{this._debug(`#__loadSession()`,`end`)}}async _hydrateSessionUser(e){if(this.userStorage){let t=await U(this.userStorage,this.storageKey+`-user`);e.user=t?.user?t.user:ci()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){let t={value:this.suppressGetSessionWarning};e.user=li(e.user,t),t.value&&(this.suppressGetSessionWarning=!0)}return e}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let t;return t=this.lock==null?await this._getUser():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()),t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await J(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:e,xform:X}):await this._useSession(async e=>{let{data:t,error:n}=e;if(n)throw n;return!t.session?.access_token&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new L}:await J(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:t.session?.access_token??void 0,xform:X})})}catch(e){if(P(e))return or(e)&&await this._removeSession(),this._returnResult({data:{user:null},error:e});throw e}}async updateUser(e,t={}){return await this.initializePromise,this.lock==null?await this._updateUser(e,t):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){let n=null;try{return await this._useSession(async r=>{let{data:i,error:a}=r;if(a)throw a;if(!i.session)throw new L;let o=i.session,s=null,c=null;this.flowType===`pkce`&&e.email!=null&&([s,c,n]=await this._getCodeChallengeAndMethod());let{data:l,error:u}=await J(this.fetch,`PUT`,`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(t?.emailRedirectTo,n),body:Object.assign(Object.assign({},e),{code_challenge:s,code_challenge_method:c}),jwt:o.access_token,xform:X});if(u)throw u;return o.user=l.user,await this._saveSession(o),await this._notifyAllSubscribers(`USER_UPDATED`,o),this._returnResult({data:{user:o.user},error:null})})}catch(e){if(await G(this.storage,this.storageKey,n),P(e))return this._returnResult({data:{user:null},error:e});throw e}}async setSession(e){return await this.initializePromise,this.lock==null?await this._setSession(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new L;let t=Date.now()/1e3,n=t,r=!0,i=null,{payload:a}=Rr(e.access_token);if(a.exp&&(n=a.exp,r=n<=t),r){let{data:t,error:n}=await this._callRefreshToken(e.refresh_token);if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!t)return{data:{user:null,session:null},error:null};i=t}else{let{data:r,error:a}=await this._getUser(e.access_token);if(a)return this._returnResult({data:{user:null,session:null},error:a});i={access_token:e.access_token,refresh_token:e.refresh_token,user:r.user,token_type:`bearer`,expires_in:n-t,expires_at:n},await this._saveSession(i),await this._notifyAllSubscribers(`SIGNED_IN`,i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(e){if(P(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}}async refreshSession(e){return await this.initializePromise,this.lock==null?await this._refreshSession(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{if(!e){let{data:n,error:r}=t;if(r)throw r;e=n.session??void 0}if(!e?.refresh_token)throw new L;let{data:n,error:r}=await this._callRefreshToken(e.refresh_token);return r?this._returnResult({data:{user:null,session:null},error:r}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(e){if(P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _getSessionFromURL(e,t){try{if(!B())throw new cr(`No browser detected.`);if(e.error||e.error_description||e.error_code)throw new cr(e.error_description||`Error in URL with unspecified error_description`,{error:e.error||`unspecified_error`,code:e.error_code||`unspecified_code`});switch(t){case`implicit`:if(this.flowType===`pkce`)throw new ur(`Not a valid PKCE flow url.`);break;case`pkce`:if(this.flowType===`implicit`)throw new cr(`Not a valid implicit grant flow url.`);break;default:}if(t===`pkce`){if(this._debug(`#_initialize()`,`begin`,`is PKCE flow`,!0),!e.code)throw new ur(`No code detected.`);let{data:t,error:n}=await this._exchangeCodeForSession(e.code,{flowId:e[N]});if(n)throw n;let r=new URL(window.location.href);return r.searchParams.delete(`code`),r.searchParams.delete(N),window.history.replaceState(window.history.state,``,r.toString()),{data:{session:t.session,redirectType:t.redirectType??null},error:null}}let{provider_token:n,provider_refresh_token:r,access_token:i,refresh_token:a,expires_in:o,expires_at:s,token_type:c}=e;if(!i||!o||!a||!c)throw new cr(`No session defined in URL`);let l=Math.round(Date.now()/1e3),u=parseInt(o),d=l+u;s&&(d=parseInt(s));let f=d-l;f*1e3<=M&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${f}s, should have been closer to ${u}s`);let p=d-u;l-p>=120?console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale`,p,d,l):l-p<0&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew`,p,d,l);let{data:m,error:h}=await this._getUser(i);if(h)throw h;let g={provider_token:n,provider_refresh_token:r,access_token:i,expires_in:u,expires_at:d,refresh_token:a,token_type:c,user:m.user};return window.location.hash=``,this._debug(`#_getSessionFromURL()`,`clearing window.location.hash`),this._returnResult({data:{session:g,redirectType:e.type},error:null})}catch(e){if(P(e))return this._returnResult({data:{session:null,redirectType:null},error:e});throw e}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl==`function`?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;let t=Kr(e[N]);return t&&await U(this.storage,Jr(this.storageKey,t))?!0:!!await U(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:`global`}){return await this.initializePromise,this.lock==null?await this._signOut(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e=`global`}={}){return await this._useSession(async t=>{let n=async()=>{await this._removeSession()},{data:r,error:i}=t;if(i&&!or(i))return e===`local`&&mr(i)&&await n(),this._returnResult({error:i});let a=r.session?.access_token,o=null,s=e=>{if(o)throw o.thrown;return e};if(e===`local`)try{await n()}catch(e){o={thrown:e}}if(a){let{error:t}=await this.admin.signOut(a,e);if(t&&!(ar(t)&&(t.status===404||t.status===401||t.status===403)||or(t)))return s(this._returnResult({error:t}))}return e===`global`&&await n(),s(this._returnResult({error:null}))})}onAuthStateChange(e){let t=Mr(),n={id:t,callback:e,unsubscribe:()=>{this._debug(`#unsubscribe()`,`state change callback with id removed`,t),this.stateChangeEmitters.delete(t)}};return this._debug(`#onAuthStateChange()`,`registered callback with id`,t),this.stateChangeEmitters.set(t,n),(async()=>{await this.initializePromise,this.lock==null?await this._emitInitialSession(t):await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)})})(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async t=>{try{let{data:{session:n},error:r}=t;if(r)throw r;await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,n),this._debug(`INITIAL_SESSION`,`callback id`,e,`session`,n)}catch(t){if(await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,null),this._debug(`INITIAL_SESSION`,`callback id`,e,`error`,t),gr(t))return;or(t)||mr(t)||ar(t)&&(t.code===`refresh_token_not_found`||t.code===`refresh_token_already_used`||t.code===`session_expired`)?console.warn(t):console.error(t)}})}async resetPasswordForEmail(e,t={}){let n=null,r=null,i=null;this.flowType===`pkce`&&([n,r,i]=await this._getCodeChallengeAndMethod(!0));try{return await J(this.fetch,`POST`,`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:r,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(t.redirectTo,i)})}catch(e){if(await G(this.storage,this.storageKey,i),P(e))return this._returnResult({data:null,error:e});throw e}}async getUserIdentities(){try{let{data:e,error:t}=await this.getUser();if(t)throw t;return this._returnResult({data:{identities:e.user.identities??[]},error:null})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async linkIdentity(e){return`token`in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){let t=null;try{let{data:n,error:r}=await this._useSession(async n=>{let{data:r,error:i}=n;if(i)throw i;let{url:a,flowId:o}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:!0});return t=o,await J(this.fetch,`GET`,a,{headers:this.headers,jwt:r.session?.access_token??void 0})});if(r)throw r;return B()&&!e.options?.skipBrowserRedirect&&window.location.assign(n?.url),this._returnResult({data:{provider:e.provider,url:n?.url,flowId:t},error:null})}catch(n){if(P(n))return this._returnResult({data:{provider:e.provider,url:null,flowId:t},error:n});throw n}}async linkIdentityIdToken(e){return await this._useSession(async t=>{try{let{error:n,data:{session:r}}=t;if(n)throw n;let{options:i,provider:a,token:o,access_token:s,nonce:c}=e,{data:l,error:u}=await J(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:r?.access_token??void 0,body:{provider:a,id_token:o,access_token:s,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Y});return u?this._returnResult({data:{user:null,session:null},error:u}):!l||!l.session||!l.user?this._returnResult({data:{user:null,session:null},error:new R}):(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers(`USER_UPDATED`,l.session)),this._returnResult({data:l,error:u}))}catch(e){if(await G(this.storage,this.storageKey,null),P(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)throw r;return await J(this.fetch,`DELETE`,`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:n.session?.access_token??void 0})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _refreshAccessToken(e){let t=`#_refreshAccessToken()`;this._debug(t,`begin`);try{let n=Date.now();return await Br(async n=>(n>0&&await zr(200*2**(n-1)),this._debug(t,`refreshing attempt`,n),await J(this.fetch,`POST`,`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Y})),(e,t)=>{let r=200*2**e;return t&&mr(t)&&Date.now()+r-n<M})}catch(e){if(this._debug(t,`error`,e),P(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}finally{this._debug(t,`end`)}}_isValidSession(e){return typeof e==`object`&&!!e&&`access_token`in e&&`refresh_token`in e&&`expires_at`in e}async _handleProviderSignIn(e,t){let{url:n,flowId:r}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug(`#_handleProviderSignIn()`,`provider`,e,`options`,t,`url`,n),B()&&!t.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n,flowId:r},error:null}}async _recoverAndRefresh(){let e=`#_recoverAndRefresh()`;this._debug(e,`begin`);try{let t=await U(this.storage,this.storageKey);if(t&&this.userStorage){let e=await U(this.userStorage,this.storageKey+`-user`);!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!e&&(e={user:t.user},await H(this.userStorage,this.storageKey+`-user`,e)),t.user=e?.user??ci()}else if(t&&!t.user&&!t.user){let e=await U(this.storage,this.storageKey+`-user`);e&&e?.user?(t.user=e.user,await W(this.storage,this.storageKey+`-user`),await H(this.storage,this.storageKey,t)):t.user=ci()}if(this._debug(e,`session from storage`,t),!this._isValidSession(t)){this._debug(e,`session is not valid`),t!==null&&await this._removeSession();return}let n=(t.expires_at??1/0)*1e3-Date.now()<Qn;if(this._debug(e,`session has${n?``:` not`} expired with margin of ${Qn}s`),n){if(this.autoRefreshToken&&t.refresh_token){let{error:n}=await this._callRefreshToken(t.refresh_token);n&&(gr(n)?this._debug(e,`refresh discarded by commit guard`,n):this._debug(e,`refresh failed`,n))}}else if(t.user&&t.user.__isUserNotAvailableProxy===!0)try{let{data:n,error:r}=await this._getUser(t.access_token);!r&&n?.user?(t.user=n.user,await this._saveSession(t),await this._notifyAllSubscribers(`SIGNED_IN`,t)):this._debug(e,`could not get user data, skipping SIGNED_IN notification`)}catch(t){console.error(`Error getting user data:`,t),this._debug(e,`error getting user data, skipping SIGNED_IN notification`,t)}else await this._notifyAllSubscribers(`SIGNED_IN`,t)}catch(t){this._debug(e,`error`,t),mr(t)?console.warn(t):console.error(t);return}finally{this._debug(e,`end`)}}async _callRefreshToken(e){var t,n;if(!e)throw new L;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug(`#_callRefreshToken()`,`returning cached failure (cooldown active)`),this.lastRefreshFailure.result;let r=`#_callRefreshToken()`;this._debug(r,`begin`);try{this.refreshingDeferred=new Lr,this.refreshingDeferred.promise.then(void 0,()=>{});let t=await U(this.storage,this.storageKey),{data:n,error:i}=await this._refreshAccessToken(e);if(i)throw i;if(!n.session)throw new L;let a=await U(this.storage,this.storageKey);if(t!==null&&(a===null||a.refresh_token!==t.refresh_token)){this._debug(r,`commit guard: storage changed since refresh started, discarding rotated tokens`,{startedWith:`present`,nowHolds:a?`replaced`:`cleared`});let e={data:null,error:new hr};return this.refreshingDeferred.resolve(e),e}let o=this._sessionRemovalEpoch;if(await this._saveSession(n.session),this._sessionRemovalEpoch!==o){this._debug(r,`commit guard (post-save): _removeSession ran during _saveSession, undoing write`),await W(this.storage,this.storageKey),this.userStorage&&await W(this.userStorage,this.storageKey+`-user`);let e={data:null,error:new hr};return this.refreshingDeferred.resolve(e),e}await this._notifyAllSubscribers(`TOKEN_REFRESHED`,n.session);let s={data:n.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(s),s}catch(i){if(this._debug(r,`error`,i),P(i)){let n={data:null,error:i};if(!mr(i)){let e=await U(this.storage,this.storageKey);e?.expires_at&&e.expires_at*1e3>Date.now()?this._debug(r,`proactive refresh failed, access token still valid — preserving session`):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:n,expiresAt:Date.now()+6e4},(t=this.refreshingDeferred)==null||t.resolve(n),n}throw(n=this.refreshingDeferred)==null||n.reject(i),i}finally{this.refreshingDeferred=null,this._debug(r,`end`)}}async _notifyAllSubscribers(e,t,n=!0){if(this._pendingInitNotifications!==null&&n){this._pendingInitNotifications.push({event:e,session:t,broadcast:n});return}let r=`#_notifyAllSubscribers(${e})`;this._debug(r,`begin`,t,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:t});let r=[],i=Array.from(this.stateChangeEmitters.values()).map(async n=>{try{await n.callback(e,t)}catch(e){r.push(e)}});if(await Promise.all(i),r.length>0){for(let e=0;e<r.length;e+=1)console.error(r[e]);throw r[0]}}finally{this._debug(r,`end`)}}async _saveSession(e){this._debug(`#_saveSession()`,e),this.suppressGetSessionWarning=!0;let t=Object.assign({},e),n=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&t.user&&await H(this.userStorage,this.storageKey+`-user`,{user:t.user});let e=Object.assign({},t);delete e.user;let r=ui(e);await H(this.storage,this.storageKey,r)}else{let e=ui(t);await H(this.storage,this.storageKey,e)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug(`#_removeSession()`),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await W(this.storage,this.storageKey),await $r(this.storage,this.storageKey),await W(this.storage,this.storageKey+`-user`),this.userStorage&&await W(this.userStorage,this.storageKey+`-user`),await this._notifyAllSubscribers(`SIGNED_OUT`,null)}_removeVisibilityChangedCallback(){this._debug(`#_removeVisibilityChangedCallback()`);let e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&B()&&window!=null&&window.removeEventListener&&window.removeEventListener(`visibilitychange`,e)}catch(e){console.error(`removing visibilitychange callback failed`,e)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug(`#_startAutoRefresh()`);let e=setInterval(()=>this._autoRefreshTokenTick(),M);this.autoRefreshTicker=e,e&&typeof e==`object`&&typeof e.unref==`function`?e.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(e);let t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t==`object`&&typeof t.unref==`function`?t.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug(`#_stopAutoRefresh()`);let e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);let t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)==null||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug(`#_autoRefreshTokenTick()`,`begin`),this.lock!=null){try{await this._acquireLock(0,async()=>{try{let e=Date.now();try{return await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug(`#_autoRefreshTokenTick()`,`no session`);return}let r=Math.floor((n.expires_at*1e3-e)/M);this._debug(`#_autoRefreshTokenTick()`,`access token expires in ${r} ticks, a tick lasts ${M}ms, refresh threshold is 3 ticks`),r<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error(`Auto refresh tick failed with error. This is likely a transient error.`,e)}}finally{this._debug(`#_autoRefreshTokenTick()`,`end`)}})}catch(e){if(e instanceof Ci)this._debug(`auto refresh token tick lock not available`);else throw e}return}if(this.refreshingDeferred!==null){this._debug(`#_autoRefreshTokenTick()`,`refresh already in flight, skipping`);return}try{let e=Date.now();try{await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug(`#_autoRefreshTokenTick()`,`no session`);return}let r=Math.floor((n.expires_at*1e3-e)/M);this._debug(`#_autoRefreshTokenTick()`,`access token expires in ${r} ticks, a tick lasts ${M}ms, refresh threshold is 3 ticks`),r<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error(`Auto refresh tick failed with error. This is likely a transient error.`,e)}}finally{this._debug(`#_autoRefreshTokenTick()`,`end`)}}async _handleVisibilityChange(){if(this._debug(`#_handleVisibilityChange()`),!B()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug(`#visibilityChangedCallback`,`error`,e)}},window==null||window.addEventListener(`visibilitychange`,this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error(`_handleVisibilityChange`,e)}}async _onVisibilityChanged(e){let t=`#_onVisibilityChanged(${e})`;if(this._debug(t,`visibilityState`,document.visibilityState),document.visibilityState===`visible`){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!==`visible`){this._debug(t,`acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting`);return}await this._recoverAndRefresh()});else{if(document.visibilityState!==`visible`){this._debug(t,`visibilityState is no longer visible, skipping recovery`);return}await this._recoverAndRefresh()}}else document.visibilityState===`hidden`&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,n){let r=n?.redirectTo,i=null,a=null,o=null;this.flowType===`pkce`&&([i,a,o]=await this._getCodeChallengeAndMethod(),r=this._maybeAppendFlowIdToRedirect(r,o));let s=[`provider=${encodeURIComponent(t)}`];if(r&&s.push(`redirect_to=${encodeURIComponent(r)}`),n?.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),i!=null&&a!=null){let e=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(a)}`});s.push(e.toString())}if(n?.queryParams){let e=new URLSearchParams(n.queryParams);s.push(e.toString())}return n?.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),{url:`${e}?${s.join(`&`)}`,flowId:o}}_maybeAppendFlowIdToRedirect(e,t){return!e||!t||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:ei(e,t)}async _getCodeChallengeAndMethod(e=!1){return ti(this.storage,this.storageKey,e,e=>this._debug(`#_getCodeChallengeAndMethod()`,`evicted oldest pending PKCE verifier slot`,e))}async _unenroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;return r?this._returnResult({data:null,error:r}):await J(this.fetch,`DELETE`,`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:n?.session?.access_token})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _enroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType===`phone`?{phone:e.phone}:e.factorType===`totp`?{issuer:e.issuer}:{}),{data:a,error:o}=await J(this.fetch,`POST`,`${this.url}/factors`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(e.factorType===`totp`&&a.type===`totp`&&a?.totp?.qr_code&&(a.totp.qr_code=`data:image/svg+xml;utf-8,${a.totp.qr_code}`),this._returnResult({data:a,error:null}))})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _verify(e){let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({challenge_id:e.challengeId},`webauthn`in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type===`create`?Bi(e.webauthn.credential_response):Vi(e.webauthn.credential_response)})}:{code:e.code}),{data:a,error:o}=await J(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers(`MFA_CHALLENGE_VERIFIED`,a),this._returnResult({data:a,error:o}))})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _challenge(e){let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=await J(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:n?.session?.access_token});if(i.error)return i;let{data:a}=i;if(a.type!==`webauthn`)return{data:a,error:null};switch(a.webauthn.type){case`create`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Ri(a.webauthn.credential_options.publicKey)})})}),error:null};case`request`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:zi(a.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _challengeAndVerify(e){let{data:t,error:n}=await this._challenge({factorId:e.factorId});return n?this._returnResult({data:null,error:n}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){let{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};let n={all:[],phone:[],totp:[],webauthn:[],recovery_code:[]};for(let t of e?.factors??[])n.all.push(t),t.status===`verified`&&t.factor_type in n&&Array.isArray(n[t.factor_type])&&n[t.factor_type].push(t);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){if(e)try{let{payload:t}=Rr(e),n=null;t.aal&&(n=t.aal);let r=n,{data:{user:i},error:a}=await this.getUser(e);if(a)return this._returnResult({data:null,error:a});((i?.factors)?.filter(e=>e.status===`verified`)??[]).length>0&&(r=`aal2`);let o=t.amr||[];return{data:{currentLevel:n,nextLevel:r,currentAuthenticationMethods:o},error:null}}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}let{data:{session:t},error:n}=await this.getSession();if(n)return this._returnResult({data:null,error:n});if(!t)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};let{payload:r}=Rr(t.access_token),i=null;r.aal&&(i=r.aal);let a=i;(t.user.factors?.filter(e=>e.status===`verified`)??[]).length>0&&(a=`aal2`);let o=r.amr||[];return{data:{currentLevel:i,nextLevel:a,currentAuthenticationMethods:o},error:null}}async _getRecoveryCodesStatus(){si(this.experimental);try{return await this._useSession(async e=>{let{data:t,error:n}=e;if(n)return this._returnResult({data:null,error:n});let{data:r,error:i}=await J(this.fetch,`GET`,`${this.url}/factors/recovery-codes`,{headers:this.headers,jwt:t?.session?.access_token});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _generateRecoveryCodes(e){si(this.experimental);try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let{data:i,error:a}=await J(this.fetch,`POST`,`${this.url}/factors/recovery-codes`,{body:e?.friendlyName?{friendly_name:e.friendlyName}:void 0,headers:this.headers,jwt:n?.session?.access_token});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _verifyRecoveryCode(e){si(this.experimental);let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let{data:i,error:a}=await J(this.fetch,`POST`,`${this.url}/factors/recovery-codes/verify`,{body:{code:e.code},headers:this.headers,jwt:n?.session?.access_token});if(a)return this._returnResult({data:null,error:a});let o=Object.assign({expires_at:jr(i.expires_in)},i);return await this._saveSession(o),await this._notifyAllSubscribers(`MFA_CHALLENGE_VERIFIED`,o),this._returnResult({data:i,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _regenerateRecoveryCodes(){si(this.experimental);try{return await this._useSession(async e=>{let{data:t,error:n}=e;if(n)return this._returnResult({data:null,error:n});let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/factors/recovery-codes/regenerate`,{headers:this.headers,jwt:t?.session?.access_token});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _unenrollRecoveryCodes(){si(this.experimental);try{return await this._useSession(async e=>{let{data:t,error:n}=e;if(n)return this._returnResult({data:null,error:n});let{data:r,error:i}=await J(this.fetch,`DELETE`,`${this.url}/factors/recovery-codes`,{headers:this.headers,jwt:t?.session?.access_token});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?await J(this.fetch,`GET`,`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:n.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new L})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _approveAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new L});let a=await J(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`approve`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&B()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _denyAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new L});let a=await J(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`deny`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&B()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _listOAuthGrants(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;return n?this._returnResult({data:null,error:n}):t?await J(this.fetch,`GET`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new L})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?(await J(this.fetch,`DELETE`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new L})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async fetchJwk(e,t={keys:[]}){let n=t.keys.find(t=>t.kid===e);if(n)return n;let r=Date.now();if(n=this.jwks.keys.find(t=>t.kid===e),n&&this.jwks_cached_at+6e5>r)return n;let{data:i,error:a}=await J(this.fetch,`GET`,`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=r,n=i.keys.find(t=>t.kid===e),!n)?null:n}async getClaims(e,t={}){try{let n=e;if(!n){let{data:e,error:t}=await this.getSession();if(t||!e.session)return this._returnResult({data:null,error:t});n=e.session.access_token}let{header:r,payload:i,signature:a,raw:{header:o,payload:s}}=Rr(n);if(!t?.allowExpired)try{ii(i.exp)}catch(e){throw new yr(e instanceof Error?e.message:`JWT validation failed`)}let c=!r.alg||r.alg.startsWith(`HS`)||!r.kid||!(`crypto`in globalThis&&`subtle`in globalThis.crypto)?null:await this.fetchJwk(r.kid,t?.keys?{keys:t.keys}:t?.jwks);if(!c){let{error:e}=await this.getUser(n);if(e)throw e;return{data:{claims:i,header:r,signature:a},error:null}}let l=ai(r.alg),u=await crypto.subtle.importKey(`jwk`,c,l,!0,[`verify`]);if(!await crypto.subtle.verify(l,u,a,Ar(`${o}.${s}`)))throw new yr(`Invalid JWT signature`);return{data:{claims:i,header:r,signature:a},error:null}}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async signInWithPasskey(e){try{if(!Ui())return this._returnResult({data:null,error:new F(`Browser does not support WebAuthn`,null)});let{data:t,error:n}=await this._startPasskeyAuthentication({options:{captchaToken:e?.options?.captchaToken}});if(n||!t)return this._returnResult({data:null,error:n});let{data:r,error:i}=await Gi({publicKey:zi(t.options),signal:e?.options?.signal??Li.createNewAbortSignal(),mediation:e?.options?.mediation});if(i||!r)return this._returnResult({data:null,error:i??new F(`WebAuthn ceremony failed`,null)});let a=Vi(r);return this._verifyPasskeyAuthentication({challengeId:t.challenge_id,credential:a})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async registerPasskey(e){try{if(!Ui())return this._returnResult({data:null,error:new F(`Browser does not support WebAuthn`,null)});let{data:t,error:n}=await this._startPasskeyRegistration();if(n||!t)return this._returnResult({data:null,error:n});let{data:r,error:i}=await Wi({publicKey:Ri(t.options),signal:e?.options?.signal??Li.createNewAbortSignal()});if(i||!r)return this._returnResult({data:null,error:i??new F(`WebAuthn ceremony failed`,null)});let a=Bi(r);return this._verifyPasskeyRegistration({challengeId:t.challenge_id,credential:a})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _startPasskeyRegistration(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!t)return this._returnResult({data:null,error:new L});let{data:r,error:i}=await J(this.fetch,`POST`,`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:t.access_token,body:{}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new L});let{data:i,error:a}=await J(this.fetch,`POST`,`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:n.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _startPasskeyAuthentication(e){try{let{data:t,error:n}=await J(this.fetch,`POST`,`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:e?.options?.captchaToken}}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:t,error:null})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyAuthentication(e){try{let{data:t,error:n}=await J(this.fetch,`POST`,`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:Y});return n?this._returnResult({data:null,error:n}):(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,t.session)),this._returnResult({data:t,error:null}))}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _listPasskeys(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!t)return this._returnResult({data:null,error:new L});let{data:r,error:i}=await J(this.fetch,`GET`,`${this.url}/passkeys`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new L});let{data:i,error:a}=await J(this.fetch,`PATCH`,`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,body:{friendly_name:e.friendlyName}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}async _deletePasskey(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new L});let{error:i}=await J(this.fetch,`DELETE`,`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,noResolveJson:!0});return i?this._returnResult({data:null,error:i}):this._returnResult({data:null,error:null})})}catch(e){if(P(e))return this._returnResult({data:null,error:e});throw e}}};ea.nextInstanceID={};var ta=ea,na=xi,ra=ta,ia=class extends ra{constructor(e){super(e)}},aa=class{constructor(e,t,n){this.supabaseUrl=e,this.supabaseKey=t;let r=Xn(e);if(!t)throw Error(`supabaseKey is required.`);Bn(t),Jn(n),this.realtimeUrl=new URL(`realtime/v1`,r),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace(`http`,`ws`),this.authUrl=new URL(`auth/v1`,r),this.storageUrl=new URL(`storage/v1`,r),this.functionsUrl=new URL(`functions/v1`,r);let i=`sb-${r.hostname.split(`.`)[0]}-auth-token`,a={db:En,realtime:On,auth:{...Dn,storageKey:i},global:Tn,tracePropagation:kn},o=Yn(n??{},a);this.settings=o,this.storageKey=o.auth.storageKey??``,this.headers=o.global.headers??{},o.accessToken?(this.accessToken=o.accessToken,this.auth=new Proxy({},{get:(e,t)=>{throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`)}})):this.auth=this._initSupabaseAuthClient(o.auth??{},this.headers,o.global.fetch),this.fetch=Vn(t,e,this._getSessionToken.bind(this),o.global.fetch,o.tracePropagation),this.functionsFetch=Vn(t,e,this._getSessionToken.bind(this),o.global.fetch,o.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch,...o.realtime}),this.accessToken&&Promise.resolve(this.accessToken()).then(e=>this.realtime.setAuth(e)).catch(e=>console.warn(`Failed to set initial Realtime auth token:`,e)),this.rest=new pe(new URL(`rest/v1`,r).href,{headers:this.headers,schema:o.db.schema,fetch:In(o.global.fetch),wrapFetch:n=>Vn(t,e,this._getSessionToken.bind(this),n,o.tracePropagation),timeout:o.db.timeout,urlLengthLimit:o.db.urlLengthLimit,retry:o.db.retry}),this.storage=new yn(this.storageUrl.href,this.headers,this.fetch,n?.storage),o.accessToken||this._listenForAuthEvents()}get functions(){return new l(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(e,t){return this.rest.from(e,t)}schema(e){return this.rest.schema(e)}getOpenApiSpec(){return this.rest.getOpenApiSpec()}rpc(e,t={},n={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){if(this.accessToken)return await this.accessToken();let{data:e}=await this.auth.getSession();return e.session?.access_token??null}async _getAccessToken(){return await this._getSessionToken()??this.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,storageKey:a,flowType:o,lock:s,debug:c,throwOnError:l,experimental:u,lockAcquireTimeout:d,skipAutoInitialize:f},p,m){let h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new ia({url:this.authUrl.href,headers:{...h,...p},storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,flowType:o,lock:s,debug:c,throwOnError:l,experimental:u,fetch:m,lockAcquireTimeout:d,skipAutoInitialize:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(e=>e.toLowerCase()===`authorization`)})}_initRealtimeClient(e){return new bt(this.realtimeUrl.href,{...e,params:{apikey:this.supabaseKey,...e?.params}})}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,`CLIENT`,t?.access_token)})}_handleTokenChanged(e,t,n){(e===`TOKEN_REFRESHED`||e===`SIGNED_IN`||e===`INITIAL_SESSION`)&&this.changedAccessToken!==n?(this.changedAccessToken=n,this.realtime.setAuth(n)):e===`SIGNED_OUT`&&(this.realtime.setAuth(),t==`STORAGE`&&this.auth.signOut(),this.changedAccessToken=void 0)}};let oa=(e,t,n)=>new aa(e,t,n);function sa(){if(typeof window<`u`||globalThis.Deno!==void 0)return!1;let e=globalThis.process;if(!e)return!1;let t=e.version;if(t==null)return!1;let n=t.match(/^v(\d+)\./);return n?parseInt(n[1],10)<=20:!1}return sa()&&console.warn(`⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715`),e.AuthAdminApi=na,e.AuthApiError=ir,e.AuthClient=ra,e.AuthError=rr,e.AuthImplicitGrantRedirectError=cr,e.AuthInvalidCredentialsError=sr,e.AuthInvalidJwtError=yr,e.AuthInvalidTokenResponseError=R,e.AuthPKCECodeVerifierMissingError=dr,e.AuthPKCEGrantCodeExchangeError=ur,e.AuthRefreshDiscardedError=hr,e.AuthRetryableFetchError=pr,e.AuthSessionMissingError=L,e.AuthUnknownError=F,e.AuthWeakPasswordError=_r,e.CustomAuthError=I,Object.defineProperty(e,`FunctionRegion`,{enumerable:!0,get:function(){return c}}),e.FunctionsError=i,e.FunctionsFetchError=a,e.FunctionsHttpError=s,e.FunctionsRelayError=o,e.GoTrueAdminApi=xi,e.GoTrueClient=ta,e.NavigatorLockAcquireTimeoutError=wi,e.PostgrestError=u,e.REALTIME_CHANNEL_STATES=pt,Object.defineProperty(e,`REALTIME_LISTEN_TYPES`,{enumerable:!0,get:function(){return T}}),Object.defineProperty(e,`REALTIME_POSTGRES_CHANGES_LISTEN_EVENT`,{enumerable:!0,get:function(){return ft}}),Object.defineProperty(e,`REALTIME_PRESENCE_LISTEN_EVENTS`,{enumerable:!0,get:function(){return $e}}),Object.defineProperty(e,`REALTIME_SUBSCRIBE_STATES`,{enumerable:!0,get:function(){return E}}),e.RealtimeChannel=mt,e.RealtimeClient=bt,e.RealtimePostgresFilterBuilder=ut,e.RealtimePresence=et,e.SIGN_OUT_SCOPES=bi,e.StorageApiError=Lt,e.SupabaseClient=aa,e.WebSocketFactory=me,e.createClient=oa,e.isAuthApiError=ar,e.isAuthError=P,e.isAuthImplicitGrantRedirectError=lr,e.isAuthPKCECodeVerifierMissingError=fr,e.isAuthRefreshDiscardedError=gr,e.isAuthRetryableFetchError=mr,e.isAuthSessionMissingError=or,e.isAuthWeakPasswordError=vr,e.lockInternals=Z,e.navigatorLock=Ei,e.postgresChangesFilter=dt,e.processLock=Oi,e})({});
;
window.CatalystConverters = {
"my": (function(){
const module = {exports:{}}; const exports = module.exports;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breakSyllables = breakSyllables;
exports.sandhi = sandhi;
exports.toDev = toDev;
exports.toPronunciation = toPronunciation;
// ═══ BURMESE TRANSLITERATION ENGINE ═══
// Single source of truth for Burmese → Devanagari conversion
// Uses longest-match-first algorithm
// R007: handles stacking mark ္ (U+1039), kinzi င်္, great-sa ဿ; tone marks no longer emit digits.
// R009: independent vowels ဥ ဦ ဣ ဤ ဧ ဩ ဪ, ဉ/ဉ်, ေါ forms, ုံ → ों, kinzi → िं, अ+vowel → independent vowel, final after a killed consonant → consonant+virama.
// R008: modern pronunciation — ရ → य, ြ medial = ျ (y), စ/ဆ → स, final nasals -န် -မ် -င် → nasalised vowel (ं),
//        ော် → ो, -က် after inherent a → ेक्, ိ before a stacked consonant → े.
//        Velar + ျ/ြ is palatalised: ကျ/ကြ → च, ချ/ခြ → छ, ဂျ/ဂြ → ज (ကျောင်း → चाउं).
// R011: sandhi (voicing) restored in toPronunciation — see sandhi() below. toDev stays letter-by-letter.
// R012: stop finals -က် -စ် -တ် -ပ် are a glottal stop, not a consonant: written as the vowel + ʼ (အနက်ရောင် → अनेʼयाउं).
//        A killed consonant before the next syllable used to join it (क्+या → क्या, "kyaung").

const CM = {
  // Consonant Map
  'က': 'क',
  'ခ': 'ख',
  'ဂ': 'ग',
  'ဃ': 'घ',
  'င': 'ङ',
  'စ': 'स',
  'ဆ': 'स',
  'ဇ': 'ज',
  'ဈ': 'झ',
  'ည': 'ञ',
  'ဋ': 'ट',
  'ဌ': 'ठ',
  'ဍ': 'ड',
  'ဎ': 'ढ',
  'ဏ': 'ण',
  'တ': 'त',
  'ထ': 'थ',
  'ဒ': 'द',
  'ဓ': 'ध',
  'န': 'न',
  'ပ': 'प',
  'ဖ': 'फ',
  'ဗ': 'ब',
  'ဘ': 'भ',
  'မ': 'म',
  'ယ': 'य',
  'ရ': 'य',
  'လ': 'ल',
  'ဝ': 'व',
  'သ': 'थ',
  'ဟ': 'ह',
  'ဠ': 'ळ',
  'အ': 'अ',
  'ဿ': 'थ्थ',
  'ဉ': 'ञ',
  'ဣ': 'इ',
  'ဤ': 'ई',
  'ဥ': 'उ',
  'ဦ': 'ऊ',
  'ဦ': 'ऊ',
  'ဧ': 'ए',
  'ဩ': 'ओ',
  'ဪ': 'औ'
};
const CC = {
  // Conjunct Clusters
  'ကျ': 'च',
  'ကြ': 'च',
  'ကွ': 'क्व',
  'ကျွ': 'च्व',
  'ချ': 'छ',
  'ခြ': 'छ',
  'ခွ': 'ख्व',
  'ဂျ': 'ज',
  'ဂြ': 'ज',
  'ဂွ': 'ग्व',
  'စျ': 'स्य',
  'ဆွ': 'स्व',
  'တျ': 'त्य',
  'တြ': 'त्य',
  'တွ': 'त्व',
  'ထွ': 'थ्व',
  'ဒွ': 'द्व',
  'ပျ': 'प्य',
  'ပြ': 'प्य',
  'ပွ': 'प्व',
  'ဖျ': 'फ्य',
  'ဖြ': 'फ्य',
  'ဗျ': 'ब्य',
  'ဗြ': 'ब्य',
  'ဗွ': 'ब्व',
  'ဘျ': 'भ्य',
  'ဘွ': 'भ्व',
  'မျ': 'म्य',
  'မြ': 'म्य',
  'မွ': 'म्व',
  'လျ': 'ल्य',
  'လွ': 'ल्व',
  'သျ': 'थ्य',
  'သြ': 'थ्य',
  'သွ': 'थ्व',
  'ဟွ': 'ह्व',
  'ရွ': 'य्व',
  'ကြွ': 'च्व',
  'ချွ': 'छ्व',
  'ပြွ': 'प्य्व',
  'မြွ': 'म्य्व',
  // Medial ha ှ (stored after the consonant): voiceless / sh sounds
  'ရှ': 'श',
  'ယှ': 'श',
  'လျှ': 'श',
  'မှ': 'ह्म',
  'နှ': 'ह्न',
  'လှ': 'ह्ल',
  'ငှ': 'ह्ङ',
  'ညှ': 'ह्ञ',
  'ဝှ': 'ह्व',
  'ှ': 'ह',
  // Medial wa on any other consonant; ရွှ = shw
  'ရွှ': 'श्व',
  'ွ': '्व'
};
const VM = {
  // Vowel Map
  'ာ': 'ा',
  'ါ': 'ा',
  'ိ': 'ि',
  'ီ': 'ी',
  'ု': 'ु',
  'ူ': 'ू',
  'ေ': 'े',
  'ဲ': 'ै',
  'ော': 'ो',
  'ို': 'ो',
  'ံ': 'ं',
  '်': '्',
  'ွန်': 'ुं',
  'ွတ်': 'ुʼ',
  'ွပ': 'ुप',
  'ွက်': 'ुʼ',
  'ိုက်': 'ाइʼ',
  'ည်': 'ी',
  'ည့်': 'ी',
  'စ်': 'िʼ',
  'ောက်': 'ाउʼ',
  // Final nasals = nasalised vowel, not a consonant
  'န်': 'ं',
  'မ်': 'ं',
  'ိန်': 'ें',
  'ိမ်': 'ें',
  'ုန်': 'ों',
  'ုမ်': 'ों',
  'င်': 'िं',
  'ောင်': 'ाउं',
  'ိုင်': 'ाइं',
  // ော + asat (လိမ္မော်) is just the vowel ो
  'ော်': 'ो',
  // ေ + tall ါ behaves like ော
  'ေါ': 'ो',
  'ေါ်': 'ो',
  'ေါက်': 'ाउʼ',
  'ေါင်': 'ाउं',
  'ုံ': 'ों',
  // ဉ် (and ဥ် typed in its place) is the final -in (ချဉ် → छिं)
  'ဉ်': 'िं',
  'ဥ်': 'िं',
  'ာဉ်': 'िं',
  // Final -ယ် is the open vowel /ɛ/ (ဘယ် → भै); ိတ်/ိပ် = /eɪʔ/, ုတ်/ုပ် = /oʊʔ/; -တ်/-ပ် after inherent a = /aʔ/, ာတ် too (ဓာတ်)
  'ယ်': 'ै',
  'ိတ်': 'ेʼ',
  'ိပ်': 'ेʼ',
  'ုတ်': 'ोʼ',
  'ုပ်': 'ोʼ',
  'တ်': 'ʼ',
  'ပ်': 'ʼ',
  'ာတ်': 'ाʼ',
  // Creaky-tone finals (dot below sits before asat after NFC): same vowel as the plain final
  'န့်': 'ं',
  'မ့်': 'ं',
  'င့်': 'िं',
  'ုန့်': 'ों',
  'ိန့်': 'ें',
  'ောင့်': 'ाउं',
  'ိုင့်': 'ाइं',
  // Punctuation
  '။': '',
  '၊': '',
  // Glottal-stop finals: -က် after inherent a is /ɛʔ/ (အနက် → अनेʼ); ိက် /eɪʔ/, ုက် /oʊʔ/
  'က်': 'ेʼ',
  'ိက်': 'ेʼ',
  'ုက်': 'ोʼ',
  // ိ before a stacked consonant is /eɪ/ → े (လိမ္မော် → लेम्मो)
  'ိက္': 'ेक्',
  'ိစ္': 'ेस्',
  'ိတ္': 'ेत्',
  'ိဒ္': 'ेद्',
  'ိန္': 'ेन्',
  'ိပ္': 'ेप्',
  'ိမ္': 'ेम्',
  // Stacking
  'င်္': 'िं',
  // kinzi — nasal carried onto the next (stacked) consonant
  '္': '्',
  // stacking mark — lower consonant joins as a conjunct
  // Tone marks — no Devanagari equivalent; drop instead of emitting digits
  'း': '',
  '့': ''
};
const DIGITS = {
  '၀': '०',
  '၁': '१',
  '၂': '२',
  '၃': '३',
  '၄': '४',
  '၅': '५',
  '၆': '६',
  '၇': '७',
  '၈': '८',
  '၉': '९'
};
const OVR = {
  // Common overrides (colloquial voicing)
  'မြန်မာ': 'म्यन्मा',
  'ပါ': 'बा',
  'တယ်': 'दे',
  'လဲ': 'ले',
  'ပြီ': 'प्यी',
  'ဘူး': 'बू',
  'လား': 'ला',
  'ဒယ်': 'दे',
  // voiced တယ် (after sandhi) keeps the same colloquial vowel
  'ကောင်း': 'काउं',
  'ဟုတ်': 'होʼ',
  'ရောက်': 'याउʼ',
  'ချင်': 'छिं',
  'သွား': 'थ्वा',
  'စား': 'सा'
};

// Build sorted key list (longest first) for each map
const allKeys = {};
for (const map of [OVR, CC, VM, CM, DIGITS]) {
  for (const k of Object.keys(map)) {
    allKeys[k] = map[k];
  }
}
const sortedKeys = Object.keys(allKeys).sort((a, b) => b.length - a.length);
function toDev(burmese) {
  if (!burmese) return '';
  let result = '';
  let i = 0;
  const text = burmese.normalize('NFC').trim();
  while (i < text.length) {
    let matched = false;
    for (const key of sortedKeys) {
      if (text.startsWith(key, i)) {
        let out = allKeys[key];
        // A final right after another final (ကပ်စ်) or an explicit vowel (ဆော့စ်) is a loanword consonant, killed
        if (key.length === 2 && key[1] === '်' && CM[key[0]] && /[्ािीुूेैोौʼ]$/.test(result)) out = CM[key[0]] + '्';
        result += out;
        i += key.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += text[i];
      i++;
    }
  }
  // Collapse virama doubled by asat + stacking (e.g. ်္)
  return result.replace(/््+/g, '्').replace(/अ([ािीुूेैोौ])/g, (m, v) => ({
    'ा': 'आ',
    'ि': 'इ',
    'ी': 'ई',
    'ु': 'उ',
    'ू': 'ऊ',
    'े': 'ए',
    'ै': 'ऐ',
    'ो': 'ओ',
    'ौ': 'औ'
  })[v]).replace(/्(?=[ािीुूेैोौ])/g, '');
}

// Syllable breakdown - splits a Burmese word into syllable components
function breakSyllables(word) {
  if (!word) return [];
  const syllables = [];
  let current = '';
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    const code = ch.charCodeAt(0);

    // Myanmar consonant range: U+1000 - U+1021 (+ ဿ U+103F)
    if ((code >= 0x1000 && code <= 0x1021 || code === 0x103F) && current.length > 0) {
      // A consonant followed by asat (်) or stacking mark (္) closes the previous syllable;
      // a consonant after ္ is the stacked lower half and stays in the cluster.
      const next = word[i + 1];
      if (next !== '်' && next !== '္' && !current.endsWith('္')) {
        syllables.push(current);
        current = ch;
        continue;
      }
    }
    current += ch;
  }
  if (current) syllables.push(current);
  return syllables;
}

// ═══ SANDHI (voicing) ═══
// Inside a word, a syllable's voiceless initial becomes voiced when the syllable before it
// ends in a vowel or nasal: ပင်ပန်းတယ် → ပင်ဗန်းဒယ် → पिंबंदे, ဒါ လုံချည်ပါ → … जीबा.
// Not voiced: the first syllable of a word, after a glottal-stop final (-က် -စ် -တ် -ပ်),
// after the prefixes မ (negation) / အ, or when the consonant carries medial ha (ှ).
// Words are space-separated chunks; voicing never crosses a space.
const VOICE = {
  'က': 'ဂ',
  'ခ': 'ဂ',
  'စ': 'ဇ',
  'ဆ': 'ဇ',
  'တ': 'ဒ',
  'ထ': 'ဒ',
  'ပ': 'ဗ',
  'ဖ': 'ဗ',
  'သ': 'ဒ'
};
const STOP_FINAL = /[ကစတပ]့?်[့း]*$/;
const NO_VOICE_AFTER = new Set(['မ', 'အ']);
const NO_SANDHI = new Set([]); // whole words that must stay unvoiced (add as found)
const isCons = ch => {
  const c = ch.charCodeAt(0);
  return c >= 0x1000 && c <= 0x1021 || c === 0x103F;
};

// Like breakSyllables, but keeps creaky finals (န့် — dot below before asat) inside their syllable.
function sylls(w) {
  const out = [];
  let cur = '';
  for (let i = 0; i < w.length; i++) {
    const ch = w[i];
    if (isCons(ch) && cur) {
      let j = i + 1;
      while (w[j] === '့') j++;
      if (w[j] !== '်' && w[j] !== '္' && !cur.endsWith('္')) {
        out.push(cur);
        cur = ch;
        continue;
      }
    }
    cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}
function sandhi(burmese) {
  if (!burmese) return '';
  return burmese.normalize('NFC').split(/(\s+)/).map(word => {
    if (!word.trim() || NO_SANDHI.has(word)) return word;
    const s = sylls(word);
    for (let i = 1; i < s.length; i++) {
      const v = VOICE[s[i][0]],
        prev = s[i - 1];
      if (!v || /^.[ျြွ]*ှ/.test(s[i]) || STOP_FINAL.test(prev) || NO_VOICE_AFTER.has(prev)) continue;
      s[i] = v + s[i].slice(1);
    }
    return s.join('');
  }).join('');
}

// Learner-reported pronunciation preferences for individual vocabulary items.
// These are deliberately NOT changes to CM/VM or sandhi(): several are
// approximations heard by a Devanagari-reading learner rather than productive
// Burmese sound rules. In particular, a final apostrophe here is a display
// preference and must not change the general nasal/glottal-stop distinction.
const LEARNER_PRONUNCIATION_OVERRIDES = new Map([['ပီဇာ', 'पीझा'], ['ဒိန်ခဲ', 'देंघे'], ['ကြက်ဥ', "च'ऊ"], ['ဒိန်ချဥ်', "देंछ'"], ['ဟမ်ဘာဂါ', 'हॅभागा']]);

// What the app shows on the pronunciation line: spoken form, with voicing and
// explicit learner preferences. These overrides match complete whitespace-
// separated words only, so unrelated words retain the general rules.
// Pass { sandhi: false } for the literal letter-by-letter reading (same as toDev),
// or { learnerOverrides: false } for rule-based pronunciation without preferences.
function toPronunciation(burmese, opts = {}) {
  if (!burmese) return '';
  if (opts.sandhi === false) return toDev(burmese);
  const text = burmese.normalize('NFC').trim();
  if (opts.learnerOverrides === false) return toDev(sandhi(text));
  return text.split(/(\s+)/).map(word => {
    if (!word.trim()) return word;
    return LEARNER_PRONUNCIATION_OVERRIDES.get(word) ?? toDev(sandhi(word));
  }).join('');
}
return module.exports.toDev;
})(),
"zh": (function(){
const module = {exports:{}}; const exports = module.exports;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breakSyllables = breakSyllables;
exports.toDev = toDev;
// ═══ CHINESE (MANDARIN) TRANSLITERATION ENGINE — compositional ═══
// A syllable's Devanagari is built by rule:  INITIAL + FINAL.
// Anything in the EXCEPTIONS tables OVERRIDES that rule.
//
// HOW IT WORKS
//   pinyin 'Hóngsède' → strip tones → segment ['hong','se','de']
//   → each syllable: EXCEPTIONS[syl]  ??  INITIALS[initial] + FINALS[final]
//   → re-attach tone suffix (´ ˇ ` -)
//
// ┌─────────────────────────────────────────────────────────────────┐
// │ TO ADD AN EXCEPTION: put  'pinyin': 'देवनागरी'  in USER_EXCEPTIONS │
// │ Use the TONELESS pinyin (e.g. 'si', not 'sì'). Tone is added auto. │
// └─────────────────────────────────────────────────────────────────┘

// ─── USER EXCEPTIONS — edit freely, these win over everything ───
const USER_EXCEPTIONS = {
  'si': 'सु' // 四 sì — heard as "su" (apical buzzing vowel, not "see")
  // 'zi': 'ज़ु',   // dental buzz examples — uncomment / tune to taste
  // 'ci': 'त्सु',
  // 'shi': 'षर',  // retroflex buzz — r-coloured, not "u"
  // 'chi': 'छ्षर',
  // 'zhi': 'ज्षर',
  // 'ri':  'रर',
  // add your own below as you collect them ...
};

// ─── AUTO-PRESERVED IRREGULARS — generated from the old table; editable ───
const BASE_EXCEPTIONS = {
  'juan': 'जुवन',
  'jun': 'ज्विन',
  'quan': 'छुवन',
  'qun': 'छ्विन',
  'xuan': 'शुवन',
  'xun': 'श्विन'
};

// ─── TONE MARKS (pinyin diacritics → base vowel + tone number) ───
const TONE_MARKS = {
  'ā': {
    base: 'a',
    tone: 1
  },
  'á': {
    base: 'a',
    tone: 2
  },
  'ǎ': {
    base: 'a',
    tone: 3
  },
  'à': {
    base: 'a',
    tone: 4
  },
  'ē': {
    base: 'e',
    tone: 1
  },
  'é': {
    base: 'e',
    tone: 2
  },
  'ě': {
    base: 'e',
    tone: 3
  },
  'è': {
    base: 'e',
    tone: 4
  },
  'ī': {
    base: 'i',
    tone: 1
  },
  'í': {
    base: 'i',
    tone: 2
  },
  'ǐ': {
    base: 'i',
    tone: 3
  },
  'ì': {
    base: 'i',
    tone: 4
  },
  'ō': {
    base: 'o',
    tone: 1
  },
  'ó': {
    base: 'o',
    tone: 2
  },
  'ǒ': {
    base: 'o',
    tone: 3
  },
  'ò': {
    base: 'o',
    tone: 4
  },
  'ū': {
    base: 'u',
    tone: 1
  },
  'ú': {
    base: 'u',
    tone: 2
  },
  'ǔ': {
    base: 'u',
    tone: 3
  },
  'ù': {
    base: 'u',
    tone: 4
  },
  'ǖ': {
    base: 'ü',
    tone: 1
  },
  'ǘ': {
    base: 'ü',
    tone: 2
  },
  'ǚ': {
    base: 'ü',
    tone: 3
  },
  'ǜ': {
    base: 'ü',
    tone: 4
  }
};
const TONE_SUFFIXES = {
  1: '-',
  2: '´',
  3: 'ˇ',
  4: '`'
};

// ─── INITIALS (pinyin onset → Devanagari) ───
const INITIALS = {
  'b': 'ब',
  'p': 'फ्फ',
  'm': 'म',
  'f': 'फ',
  'd': 'द',
  't': 'थ',
  'n': 'न',
  'l': 'ल',
  'g': 'ग',
  'k': 'ख',
  'h': 'ह',
  'j': 'ज',
  // Three families: palatal j q x use plain letters; retroflex zh ch sh add ष
  // ("curl the tongue back"); dental z c s sit at the teeth. Aspirated q and ch use छ.
  'q': 'छ',
  'x': 'श',
  'zh': 'ज्ष',
  'ch': 'छ्ष',
  'sh': 'ष',
  'r': 'र',
  'z': 'ज़',
  'c': 'त्स',
  's': 'स'
};

// ─── FINALS (pinyin rime → Devanagari) ───
const FINALS = {
  'a': 'ा',
  'ai': 'ाय',
  'an': 'ान',
  'ang': 'ांग',
  'ao': 'ाव',
  'e': '',
  'ei': 'ै',
  'en': 'न्',
  'eng': 'ंग',
  'er': 'ार्र',
  'i': 'ि',
  'ia': '्या',
  'ian': '्येन',
  'iang': '्यांग',
  'iao': '्याव',
  'ie': 'िये',
  'in': 'िन',
  'ing': 'ियंग',
  'iong': '्योंग',
  'iu': '्योउ',
  'o': 'ो',
  'ong': 'ोंग',
  'ou': 'ोउ',
  'u': 'ु',
  'ua': '्वा',
  'uai': '्वाय',
  'uan': '्वान',
  'uang': 'ुआंग',
  'ue': 'ुए',
  'ueng': 'ुअंग',
  'ui': '्वै',
  'un': '्वन',
  'uo': '्वॉ',
  'ü': '्यू',
  'üan': '्यूआन',
  'üe': '्यूअ',
  'ün': '्यून'
};

// ─── INDEPENDENT (zero-initial syllables: a, ya, wu, er, …) ───
const INDEPENDENT = {
  'a': 'आ',
  'ai': 'आय',
  'an': 'आन',
  'ang': 'आंग',
  'ao': 'आव',
  'e': 'अ',
  'ei': 'अै',
  'en': 'अन',
  'eng': 'अंग',
  'er': 'अर्र',
  'i': 'इ',
  'ia': '्या',
  'ian': '्येन',
  'iang': 'यांग',
  'iao': 'इयाव',
  'ie': 'इये',
  'in': 'इन',
  'ing': 'यंग',
  'iong': '्योंग',
  'iu': 'इयोउ',
  'o': 'ओ',
  'ong': 'ओंग',
  'ou': 'ओउ',
  'u': 'उ',
  'ua': 'वा',
  'uai': 'वाय',
  'uan': 'वान',
  'uang': 'उआंग',
  'ue': 'उये',
  'ueng': 'उअंग',
  'ui': 'वै',
  'un': 'उअन',
  'uo': 'वॉ',
  'wa': 'वा',
  'wai': 'वाय',
  'wan': 'वान',
  'wang': 'वांग',
  'wao': 'वाव',
  'we': 'व',
  'wei': 'वै',
  'wen': 'वन्',
  'weng': 'वंग',
  'wer': 'वार्र',
  'wi': 'वि',
  'wia': 'व्या',
  'wian': 'व्येन',
  'wiang': 'व्यांग',
  'wiao': 'व्याव',
  'wie': 'विये',
  'win': 'विन',
  'wing': 'वियंग',
  'wiong': 'व्योंग',
  'wiu': 'व्योउ',
  'wo': 'वो',
  'wong': 'वोंग',
  'wou': 'वोउ',
  'wu': 'उ',
  'wua': 'वा',
  'wuai': 'वाय',
  'wuan': 'वान',
  'wuang': 'उआंग',
  'wue': 'उये',
  'wueng': 'उअंग',
  'wui': 'वै',
  'wun': 'उअन',
  'wuo': 'वॉ',
  'wü': 'व्यू',
  'wüan': 'व्यूआन',
  'wüe': 'व्यूअ',
  'wün': 'व्यून',
  'ya': 'या',
  'yai': 'याय',
  'yan': 'यान',
  'yang': 'यांग',
  'yao': 'याव',
  'ye': 'ये',
  'yei': 'यै',
  'yen': 'यन्',
  'yeng': 'यंग',
  'yer': 'यार्र',
  'yi': 'इ',
  'yia': '्या',
  'yian': '्येन',
  'yiang': 'यांग',
  'yiao': 'इयाव',
  'yie': 'इये',
  'yin': 'इन',
  'ying': 'यंग',
  'yiong': '्योंग',
  'yiu': 'इयोउ',
  'yo': 'यो',
  'yong': 'योंग',
  'you': 'योउ',
  'yu': 'यु',
  'yua': 'य्वा',
  'yuai': 'य्वाय',
  'yuan': 'य्वान',
  'yuang': 'युआंग',
  'yue': 'युए',
  'yueng': 'युअंग',
  'yui': 'य्वै',
  'yun': 'विन',
  'yuo': 'य्वॉ',
  'yü': 'य्यू',
  'yüan': 'य्यूआन',
  'yüe': 'य्यूअ',
  'yün': 'य्यून',
  'ü': 'यू',
  'üan': 'यूआन',
  'üe': 'यूअ',
  'ün': 'यून'
};

// onsets, longest-first (zh/ch/sh before single letters)
const INIT_LIST = ["zh", "ch", "sh", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "z", "c", "s", "r"];

// valid syllable inventory, longest-first — used for segmenting run-together pinyin
const VALID = ["chiang", "chiong", "chuang", "chueng", "shiang", "shiong", "shuang", "shueng", "zhiang", "zhiong", "zhuang", "zhueng", "biang", "biong", "buang", "bueng", "chang", "cheng", "chian", "chiao", "ching", "chong", "chuai", "chuan", "ch\u00fcan", "ciang", "ciong", "cuang", "cueng", "diang", "diong", "duang", "dueng", "fiang", "fiong", "fuang", "fueng", "giang", "giong", "guang", "gueng", "hiang", "hiong", "huang", "hueng", "jiang", "jiong", "juang", "jueng", "kiang", "kiong", "kuang", "kueng", "liang", "liong", "luang", "lueng", "miang", "miong", "muang", "mueng", "niang", "niong", "nuang", "nueng", "piang", "piong", "puang", "pueng", "qiang", "qiong", "quang", "queng", "riang", "riong", "ruang", "rueng", "shang", "sheng", "shian", "shiao", "shing", "shong", "shuai", "shuan", "sh\u00fcan", "siang", "siong", "suang", "sueng", "tiang", "tiong", "tuang", "tueng", "wiang", "wiong", "wuang", "wueng", "xiang", "xiong", "xuang", "xueng", "yiang", "yiong", "yuang", "yueng", "zhang", "zheng", "zhian", "zhiao", "zhing", "zhong", "zhuai", "zhuan", "zh\u00fcan", "ziang", "ziong", "zuang", "zueng", "bang", "beng", "bian", "biao", "bing", "bong", "buai", "buan", "b\u00fcan", "cang", "ceng", "chai", "chan", "chao", "chei", "chen", "cher", "chia", "chie", "chin", "chiu", "chou", "chua", "chue", "chui", "chun", "chuo", "ch\u00fce", "ch\u00fcn", "cian", "ciao", "cing", "cong", "cuai", "cuan", "c\u00fcan", "dang", "deng", "dian", "diao", "ding", "dong", "duai", "duan", "d\u00fcan", "fang", "feng", "fian", "fiao", "fing", "fong", "fuai", "fuan", "f\u00fcan", "gang", "geng", "gian", "giao", "ging", "gong", "guai", "guan", "g\u00fcan", "hang", "heng", "hian", "hiao", "hing", "hong", "huai", "huan", "h\u00fcan", "iang", "iong", "jang", "jeng", "jian", "jiao", "jing", "jong", "juai", "juan", "j\u00fcan", "kang", "keng", "kian", "kiao", "king", "kong", "kuai", "kuan", "k\u00fcan", "lang", "leng", "lian", "liao", "ling", "long", "luai", "luan", "l\u00fcan", "mang", "meng", "mian", "miao", "ming", "mong", "muai", "muan", "m\u00fcan", "nang", "neng", "nian", "niao", "ning", "nong", "nuai", "nuan", "n\u00fcan", "pang", "peng", "pian", "piao", "ping", "pong", "puai", "puan", "p\u00fcan", "qang", "qeng", "qian", "qiao", "qing", "qong", "quai", "quan", "q\u00fcan", "rang", "reng", "rian", "riao", "ring", "rong", "ruai", "ruan", "r\u00fcan", "sang", "seng", "shai", "shan", "shao", "shei", "shen", "sher", "shia", "shie", "shin", "shiu", "shou", "shua", "shue", "shui", "shun", "shuo", "sh\u00fce", "sh\u00fcn", "sian", "siao", "sing", "song", "suai", "suan", "s\u00fcan", "tang", "teng", "tian", "tiao", "ting", "tong", "tuai", "tuan", "t\u00fcan", "uang", "ueng", "wang", "weng", "wian", "wiao", "wing", "wong", "wuai", "wuan", "w\u00fcan", "xang", "xeng", "xian", "xiao", "xing", "xong", "xuai", "xuan", "x\u00fcan", "yang", "yeng", "yian", "yiao", "ying", "yong", "yuai", "yuan", "y\u00fcan", "zang", "zeng", "zhai", "zhan", "zhao", "zhei", "zhen", "zher", "zhia", "zhie", "zhin", "zhiu", "zhou", "zhua", "zhue", "zhui", "zhun", "zhuo", "zh\u00fce", "zh\u00fcn", "zian", "ziao", "zing", "zong", "zuai", "zuan", "z\u00fcan", "ang", "bai", "ban", "bao", "bei", "ben", "ber", "bia", "bie", "bin", "biu", "bou", "bua", "bue", "bui", "bun", "buo", "b\u00fce", "b\u00fcn", "cai", "can", "cao", "cei", "cen", "cer", "cha", "che", "chi", "cho", "chu", "ch\u00fc", "cia", "cie", "cin", "ciu", "cou", "cua", "cue", "cui", "cun", "cuo", "c\u00fce", "c\u00fcn", "dai", "dan", "dao", "dei", "den", "der", "dia", "die", "din", "diu", "dou", "dua", "due", "dui", "dun", "duo", "d\u00fce", "d\u00fcn", "eng", "fai", "fan", "fao", "fei", "fen", "fer", "fia", "fie", "fin", "fiu", "fou", "fua", "fue", "fui", "fun", "fuo", "f\u00fce", "f\u00fcn", "gai", "gan", "gao", "gei", "gen", "ger", "gia", "gie", "gin", "giu", "gou", "gua", "gue", "gui", "gun", "guo", "g\u00fce", "g\u00fcn", "hai", "han", "hao", "hei", "hen", "her", "hia", "hie", "hin", "hiu", "hou", "hua", "hue", "hui", "hun", "huo", "h\u00fce", "h\u00fcn", "ian", "iao", "ing", "jai", "jan", "jao", "jei", "jen", "jer", "jia", "jie", "jin", "jiu", "jou", "jua", "jue", "jui", "jun", "juo", "j\u00fce", "j\u00fcn", "kai", "kan", "kao", "kei", "ken", "ker", "kia", "kie", "kin", "kiu", "kou", "kua", "kue", "kui", "kun", "kuo", "k\u00fce", "k\u00fcn", "lai", "lan", "lao", "lei", "len", "ler", "lia", "lie", "lin", "liu", "lou", "lua", "lue", "lui", "lun", "luo", "l\u00fce", "l\u00fcn", "mai", "man", "mao", "mei", "men", "mer", "mia", "mie", "min", "miu", "mou", "mua", "mue", "mui", "mun", "muo", "m\u00fce", "m\u00fcn", "nai", "nao", "nei", "nen", "ner", "nia", "nie", "nin", "niu", "nou", "nua", "nue", "nui", "nun", "nuo", "n\u00fce", "n\u00fcn", "ong", "pai", "pan", "pao", "pei", "pen", "per", "pia", "pie", "pin", "piu", "pou", "pua", "pue", "pui", "pun", "puo", "p\u00fce", "p\u00fcn", "qai", "qan", "qao", "qei", "qen", "qer", "qia", "qie", "qin", "qiu", "qou", "qua", "que", "qui", "qun", "quo", "q\u00fce", "q\u00fcn", "rai", "ran", "rao", "rei", "ren", "rer", "ria", "rie", "rin", "riu", "rou", "rua", "rue", "rui", "run", "ruo", "r\u00fce", "r\u00fcn", "sai", "san", "sao", "sei", "sen", "ser", "sha", "she", "shi", "sho", "shu", "sh\u00fc", "sia", "sie", "sin", "siu", "sou", "sua", "sue", "sui", "sun", "suo", "s\u00fce", "s\u00fcn", "tai", "tan", "tao", "tei", "ten", "ter", "tia", "tie", "tin", "tiu", "tou", "tua", "tue", "tui", "tun", "tuo", "t\u00fce", "t\u00fcn", "uai", "uan", "wai", "wan", "wao", "wei", "wen", "wer", "wia", "wie", "win", "wiu", "wou", "wua", "wue", "wui", "wun", "wuo", "w\u00fce", "w\u00fcn", "xai", "xan", "xao", "xei", "xen", "xer", "xia", "xie", "xin", "xiu", "xou", "xua", "xue", "xui", "xun", "xuo", "x\u00fce", "x\u00fcn", "yai", "yan", "yao", "yei", "yen", "yer", "yia", "yie", "yin", "yiu", "you", "yua", "yue", "yui", "yun", "yuo", "y\u00fce", "y\u00fcn", "zai", "zan", "zao", "zei", "zen", "zer", "zha", "zhe", "zhi", "zho", "zhu", "zh\u00fc", "zia", "zie", "zin", "ziu", "zou", "zua", "zue", "zui", "zun", "zuo", "z\u00fce", "z\u00fcn", "\u00fcan", "ai", "an", "ao", "ba", "be", "bi", "bo", "bu", "b\u00fc", "ca", "ce", "ci", "co", "cu", "c\u00fc", "da", "de", "di", "do", "du", "d\u00fc", "ei", "en", "er", "fa", "fe", "fi", "fo", "fu", "f\u00fc", "ga", "ge", "gi", "go", "gu", "g\u00fc", "ha", "he", "hi", "ho", "hu", "h\u00fc", "ia", "ie", "in", "iu", "ja", "je", "ji", "jo", "ju", "j\u00fc", "ka", "ke", "ki", "ko", "ku", "k\u00fc", "la", "le", "li", "lo", "lu", "l\u00fc", "ma", "me", "mi", "mo", "mu", "m\u00fc", "na", "ne", "ni", "no", "nu", "n\u00fc", "ou", "pa", "pe", "pi", "po", "pu", "p\u00fc", "qa", "qe", "qi", "qo", "qu", "q\u00fc", "ra", "re", "ri", "ro", "ru", "r\u00fc", "sa", "se", "si", "so", "su", "s\u00fc", "ta", "te", "ti", "to", "tu", "t\u00fc", "ua", "ue", "ui", "un", "uo", "wa", "we", "wi", "wo", "wu", "w\u00fc", "xa", "xe", "xi", "xo", "xu", "x\u00fc", "ya", "ye", "yi", "yo", "yu", "y\u00fc", "za", "ze", "zi", "zo", "zu", "z\u00fc", "\u00fce", "\u00fcn", "a", "e", "i", "o", "u", "\u00fc"];

// merged exceptions: USER overrides BASE
const EXCEPTIONS = {
  ...BASE_EXCEPTIONS,
  ...USER_EXCEPTIONS
};

// ─── CORE ───
function splitInitial(s) {
  for (const ini of INIT_LIST) {
    if (s.startsWith(ini) && s.length > ini.length) return [ini, s.slice(ini.length)];
  }
  return ['', s];
}

// toneless pinyin syllable → Devanagari (exception wins, else compose)
function renderSyllable(syl) {
  if (EXCEPTIONS[syl] != null) return EXCEPTIONS[syl];
  const [ini, fin] = splitInitial(syl);
  if (ini === '') return INDEPENDENT[syl] != null ? INDEPENDENT[syl] : syl;
  return (INITIALS[ini] || '') + (FINALS[fin] != null ? FINALS[fin] : fin);
}

// ─── TRANSLITERATION ───
function toDev(pinyinText) {
  if (!pinyinText) return '';
  const words = pinyinText.trim().split(/\s+/);
  return words.map(word => {
    // strip tone diacritics, remember where each tone sat
    let bare = '';
    const toneAt = [];
    for (const ch of word) {
      const lower = ch.toLowerCase();
      if (TONE_MARKS[lower]) {
        toneAt.push({
          pos: bare.length,
          tone: TONE_MARKS[lower].tone
        });
        bare += TONE_MARKS[lower].base;
      } else bare += lower;
    }

    // segment longest-first, render each, re-attach tone
    const parts = [];
    let i = 0;
    while (i < bare.length) {
      let matched = false;
      for (const key of VALID) {
        if (bare.startsWith(key, i)) {
          let tone = 0;
          for (const t of toneAt) {
            if (t.pos >= i && t.pos < i + key.length) {
              tone = t.tone;
              break;
            }
          }
          const dev = renderSyllable(key);
          const suffix = tone && TONE_SUFFIXES[tone] ? TONE_SUFFIXES[tone] : '';
          parts.push(dev + suffix);
          i += key.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        parts.push(bare[i]);
        i++;
      }
    }
    return parts.join('');
  }).join(' ');
}

// ─── SYLLABLE BREAKDOWN ───
function breakSyllables(pinyinText) {
  if (!pinyinText) return [];
  const out = [];
  for (const word of pinyinText.trim().split(/\s+/)) {
    let bare = '';
    for (const ch of word) {
      const l = ch.toLowerCase();
      bare += TONE_MARKS[l] ? TONE_MARKS[l].base : l;
    }
    let i = 0;
    while (i < bare.length) {
      let matched = false;
      for (const key of VALID) {
        if (bare.startsWith(key, i)) {
          out.push(key);
          i += key.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        out.push(bare[i]);
        i++;
      }
    }
  }
  return out;
}
return module.exports.toDev;
})()
};
;
window.CatalystMediaCatalog = {"version":1,"languages":{"ja":{"08709dff":"84bbb6ca83ab9eaedcc4efa7452335fad4ca0759ffb1413b83ccd27045be4169","08ee393b":"0a54e8481eda91b79d2e5bc9184c3ede71b538bdcdd43162e0450e14dd49d5e6","0edc7f82":"b709656e18ea5393a4b41d5ca6ab5ba8661e448748d0a34d852801e166c4b519","13c8d884":"59826980af47c7e39d9d101be5c284db3446de73bca663ae5333db961c7f2372","14a6c34c":"da058f197258511d5263f3a3f5ef0287a9fcb8aa9285d54c4a5b58db5c8ec70d","1cba1c5e":"5ff71a727cc34bb1c32e31cf62b4c8f03a804b6c02c436dbd5221e6921253b69","2648cfb6":"c8d8b87b6325a782ede7907a1cf5996ced45c2422c9f7cd4c056d89244bbcade","38930ec3":"e19f16c3aab36169720df31322a629eb916e67c5ea0394aeca21695ea7d0adf0","38af1cd3":"077386822a9b08173d97c9f1ad5b19287269bc972f24dbea83eb7a995da05a92","3ef15553":"7e427223ca76beb3f87dc123060c22ddd9277d577dd9aacfea77d1f15d163642","49b5fef1":"afb885ee98d0be61332963f478072de5922758bb5265d5eb90efe7238b554ee0","4b5a79b3":"4c634ab89362c5d7559dd0d311ee04ebfe9b130c68d2abd5f92720bf8d518532","57ffd8c0":"0b10849c20444a439036e94f5c5f4545769ad6ed0b9891f65121f22467c90af6","693e70f9":"3bef8aef7498f150b8969259e0042bd0596c15e9809e03818415842fc656a125","69e5222a":"ceca38b61fdb5ce14bf45880206ed928b27f658cc1bc11723c3b7c169db6ef05","69e792a5":"5ae8b0c172ed6c44cb37470ec5b4bd5bf476dbbbecad697129a388bb0d276c8d","6f284830":"5480257574c236fdea695a9ae5d3701496aa2fd9d83afa9e5bca80ba5c514b8f","7012a6cd":"102995622ed0c2ae38e008f20a19e301a5c04690e135bc159a9ba91ae25a51d7","734f712c":"6da834b794a779250d3abc7a316e41fb5a2e99d3270e89f7bdc80b1d5cf4a0aa","74e64114":"11012481cd5d21617102e260d163399508d70fd5a97b0d63f1109f936089b183","7927f277":"d655d9a4f02a3aed045a6c09cade7e8f70ece0892b38ebaa84a20c7545669be5","794cbbd7":"df0fb1db7907ceb6cb97ecfae7ecd8de59d39bba8b3dc0f0d168e507e1b2f748","848f3390":"ca0a488cdea942b7f85f3ece712e02a63b7553de97bc3a4a23d2d8de64278fed","8f1ee166":"f983aaa9d875f3b0b6ab273e8ebe9445fea12c1383ff8de7678c292280b6a55e","9a47f40b":"6587ad246f7bb2a494fbbc899b0d8ddbf5a6c77a68e4e60bc6883605ce499178","9bf45879":"a443ddbf6f96230e6613e7d74f7f36d26ad464bbdeb7c0bb3ad41b8ac60477bf","aa5ab1ab":"95de37973ab7bf42375dcd94af07fcfff3cb7ec0415402367d17036fb2784426","ac5e2912":"1af6fb83f402add8765b79a691f7d2f30d5a3b8dee52f19b6ff2c0d4525bb665","adb223e2":"672ded26ea3a72ec940b8c07b3a20b4c3f2c4c84b17b7f253a96c435e7b02a3f","af29181b":"70a6096abed12ad7cc0a70d0643084b653ef0d4392726f4d220a1a76f4f345a7","b6dfa1cd":"58503f3a91d730f56ec806131fe73048fb48b7bf0d5f6c64dee7c582884b3a87","bb65f63f":"b7e40635841df2a239b0b61ccb1c5dda77e4f951a3be5e0288e9b763e7e6bfd5","c10bef09":"b9b5bab9eb76ebaa1d2fce471359b0356f39296b2e538e68a51bbf05b2fd4c95","c7ceb6ce":"bf498ea8b0e7b111952d743c662e8ae987af61f592ce91ba9e08ece29c50d093","d5adb9f0":"c7cf07f56bf6e6fb7c9e64c458e4da56624891605c2d775a823ea9fa61e4175d","d870e698":"3d53b7744ce537d8cc97367650db7d76c1c8a6c41e0253d533ed98e167f48901","de918109":"61bef592e6747d95ef7e62fd5e5a6e28519c5775c7b7166903f95121709d6103","e1cd6966":"6e39d7345385e8e63f5117b748465b837de2da3ad80f71425073f6f3f9d9fde6","e35a47f5":"f0aa19304a3f92aa0d7fdd8ab3415beeffe9343b9c199354bdcdf56167024475","e7754823":"38208abf69c8222c6600ed0578632bbce9cf4cd4e977b984ab98d30c228ddfd3","ebd0a26f":"dc431f72fdad65f3a8db4859bc62de1a28ad2cb91315330d437d286733e723ed","f1924142":"8233ba81f42991f39b3f125eff1573cd2f0ae8fa411dafb8b687ebffe223334d","f5898941":"dfdec6f66498aeee4eeaf9dcbec03784eb88ffe3b67edd52ca4748f834d13c08","fbe33656":"506b46924b7a8c00c3782ed025d7c5f2787d37b42c6820a5d71ebabdd3cba6ae","fd8e6261":"ec62c97cd154dafeb2964a8310e63b5c4739a00f6fc8e90dee95b99066acf5cb","fece3b62":"74c2cc1818815f8d68b3efe5851716a5ca65458a7415dfb66ed123c323c99ca3","fed367ef":"98ed717e1409ab0104b4f8dda41d93121bb4888a2bfb1b48a5e79ce86eabab24","ff78743d":"806267a50a42d0cfbe99feb1840235f63fdaae158ac6cffeec8f8ab1746d22bb"},"my":{"18957743":"60720427e178409d15c0b0e4fa535e98402471ef8440beaa2217c0b790d8b272","56446782":"5759927b0621f94edab145c4252987c085d278dbe09f11d988b6902e49f1ebd3","69049601":"a4bc199a924ea03b8612891480022c445062835a40df89a39841ba24a3269441","00b07b8e":"95b4ac2cc81a5e92484b5dae17c927e9d63e9b780a60ae32ed80798308aabf41","04ab9507":"a3d102dbc3fd453e6dae4d79888227b23120ccc9c79279c3f6ef7fe7ce3e5706","0722679a":"bd10b63a80348ae2509a4e7ab145a9626d3b574577acba092e8ba45571b13f15","0af783d1":"1ccf15ee7cbbebe0707c059ef46648cac2fb267deb4cddc37b0fb0535e0f87fa","0b84b5f7":"848718dc2d5492c4daac4320d364b7d4242d8c61ea3202239a8ecd138234d786","10d9dc5d":"166b34bc61f2665cf2f1508263f8f93ea0d55116f6951b46147ddd68b9bcbfbb","12280e40":"bea120746aa1327aba5d247442e1405d68f35ef9fff0171308b05089926557b4","1c27a106":"20c429206987c1207f7317f8f8401bde08aae439dfecde47c1d2554712d05c3a","24b2a9a2":"dd54f27f48f3cff89e823aba8113bd8c93619dad081137b2d85355a1deb94f10","2768a374":"394b0a20537987a0c10aaf868ba5cf0d792d814fcad01997c76e6af1e06107ac","3f0ddea1":"89a9605d537d87589e2ec2557d645e362f75bb3d882236ac1f79d6935d87d71a","441c3697":"37ee8ff433cfe2e4f435bd666680e9187275fce2d13862ef068e281dadf8c1a6","45fe5870":"75b67bf9e74d27a43e47621db1ed67d255f358501e3f6a9136f8e14f0836b91a","4ef790cc":"5f63c80f9a86dbf44f5066bfd24f5d6763a6613d5ce926ddae0933d4dab6ebcd","542fcda2":"4cd790ef94470f625d58f446fc0599433d007ee5ac98704c910183aa79baf407","5ae2f0ff":"b9490624fe5dc4a3b3fd003ca32f8cdd2ec9014e9ec3e6cde19387767ad1e425","5d96c1da":"988492b98263022d7a3f05d1f4b3a189099b016d343a52f9c0c07096239331b8","5eaf8bbf":"32b3b77c3300e611a633f1729b39dc1e1c021118b9181c937d9e004233d3acfa","6449f9b6":"a492284cfff77408b9d6d5b65edfc55690fa63a38054225a41eb022df8ec5b31","685a12c3":"2eb15137942e97896873f4605f953e37d60fc73dd1ca9dfdcde9ffc3ff03db88","6d3e9e89":"35903c2b29ae7e897ff7366b44724a91887217d7fd920cedc444fa3f15d81e9f","7169900f":"5071149a6138c572ecd45ab461415a122a9e77a0195b6003cd02444672049720","7583cc96":"1bcc8f9306b5a99afe34a0405674d022af64e2ef53034dff19cce657cc316f8a","7ad8d71d":"cce8066fbb8b678babd533a5244c66ffa2521d6af27c98d17e9b30e9143a81cd","86a4925e":"51ffb29935439115f03a75b49c339775337b856af54b7db550b816cf32a0945d","89b184f5":"d7baee24c3222aabe83b4e50d09b2525c5bd0f01111b48310a073533f1e0c9c2","8a0275b8":"d9ec0946181ac827d19dc49fb3a518cc11126d5e1d6beb79a050800569f03fac","95dc8731":"6a8c13452c4119b7ded7f3fbbc50029ca83d4f238b26bb1214c6bbcaf4251f2e","9642ba13":"4040c72b2ed50460f167f466bd1cb13da8364845b75941ea5a9fe053997416a3","986efb1b":"f0be691432ef623eb0f0500bdea7ad0eecabd80e3798cfefa32e1d9dafb78ba1","9e5d8d4b":"b6eacf84575d00e32601a34d8f82c3037cbda9f410debf0c450de3cee68028ae","9e97523d":"d7b374d6cdd059527cf2c8a612e6a4f35298de6d570afbf49012c91d55876819","a21cb270":"9ebab52543f3c216468baf5f382d8558b15e756918ea9ca5639ef51be2bac227","a43c3963":"a14d95075f96c2fa63e14f31035fd003daeb24d5e47572a8b24befec076de15b","b0c94c5d":"85930fd46a49bd3376a4e17cb37c9849d7e57fb4009030d700d6e325df7294ef","b51b6840":"c53473fbe1b39fe2d872c2e93b02a08c9b239d1fc0ed73372048e6e9866357f1","bab4b1e8":"04e43bf881149cba6da177c1180ec613fca6cd4678d7fb5384cf78e6fb0a7f67","bc4ce5bc":"ea8bd9973dc3782e458af0a1070183ced31af5e2265aec1e0f4fd50ab4b3c5d2","bdaa4011":"6b50ed66ec18c68cfa4b5114334e6295821a2a57467f280433d7eee94917aeb9","c0778223":"56154cd36593c733be43f317c9a6728943e0a1fbd53584b45c6e9b8a3c848e9d","cc2ba747":"002ba96187d04d3a4c23bb8298bc88161db9b374c446d00b0ae0966ed04e8c65","cf50f9f1":"d6308ff98ef961f79b9e4f1d3f0804c2db036e48ea8adacb97f5ebc8c42e41e4","d155342e":"3c6be3eff99a96970d5bfa4558232145cd6b98d93326684743d9ef4a352d0331","da013825":"a8979e46f2f0d133f5264abd1099fd6a2c18ade9e92a5a3410b5afc1a1701ac9","da11afb7":"041f54afded20719dfaeb0da807eccbd4f57c8f3e769ad86ce5cee95e466d734","da9cf2f7":"e088b5f67672f771829a9238a70400f048e12c769cf1ce97d41672b84bd0492b","dad527b9":"c370bcdf20e857a51bcdf976068ff63edd98f8fb01475d899d219f3ea64ddd38"},"zh":{"29993367":"11355ba7c24f65a7fe621a62c0a7559547cd3acfb8806812ac0b29812a07b7bf","62942863":"037f2d0652ad0e10f6ef90b8b8e477aa8d3c7cc3c83b58e954369029afde5bd4","98811691":"7e6df7e75a5abe30577d0ad021b1e4c0fb5cf5e79c8023650a32d09b6a1e8d37","052a502f":"8c875c533cc3d3686d530de9b2d8db462819751fba5c95c28ce1f19d09dd2472","205aea2c":"7cc9cd49b01541b5211ec010cf76911a840227e30415eec6ec5b24112b0a1c8c","265d5c09":"9554a3c6f5d096bf75f04329d00b16e29674348ecb91b856b417dd3b5d5ee6d5","2a4c87e0":"ebcde23183f4314a9fea95ad71f610ee5287f60f346ea1b4c21b1d29f70330bf","2cad4f5f":"7ac073a025bd51ef4a6e53f6db3798f4fd55a8c5c7b05cdaf88c79018479dfa2","40302c09":"5a4a739ccead715d7ec50db8b1bb4fae4d8473d2a3faad4a0324c0f58cb1555e","414db358":"73c9a840811f9d0dc8ab000f8a601c9a713fa6028075ff902d4756fd9e22034c","45400db7":"016a98d4e766df8a37626deeea1623e3349c551ec2c8ac3d8ae463170da39c06","484b4b3a":"279c9a9aab258b777b39b1b44797bec64e3f4b78700ed2b24de8aa55540e3045","5268f2ad":"956bd6e2f9153fae4e71fc0648e6e7e213b3024d4920d88a10881d01f06855bb","542c106a":"937d71b8da89526a50b1159ceb0385d00ca053961de674e5564ba758f5cf1577","65832b6b":"ddc72a74704261305c400426470f3de19b61e44e624589e1a8f0a167dc5a344e","6872dd3b":"9e0b733d1ab88dc81bea6e71ecf5b1f8cb198671c09080ab3786d0a07e9cde67","68e7b569":"f1a4b700997527273cf7d42ed019d3679640fd6194d3f93d233a047b22a13bf2","6bc2de3b":"0b8aa782b33b15231d4d5797e49d0e3423caefdb80bb193e2619a56ab482aa84","6c359ce9":"19ccb5ef0a9492cb30dba4712bffbb678e6d468d6a4fc496c6e69021b3027415","6c6ff2e2":"a19160fb37679cdc09125bd4f134bc6f32bd49b7cf91817fde7693a1fa4941f0","6e31cc7d":"7f21b41f9ef90bd62de47fa717608e9590e28ea6ace744582a12f353406aa95a","6e697a77":"d3466cc0a75f3d398d279fd5f43d80750623e6881aaa04dc0ab1c256960f2444","79c9a3ea":"a8fcfe47bbca66397b5ccf9caf1e85a61c7045709a2c3d499b19333e68457ab3","7e01eacd":"f84cd1abe7809fb695984ab7368ae3d7ba91ae7358e4815605dac0f949ff7c11","81c0e254":"cdc1750bd4db8e2e72dfd0940da197652279617da7d43fcd6668a364b1f9c28b","8cd9932b":"754fd6803fa594885afb90d45214157be8e2fb81dcac56720fdb9effc3a7d775","93d0017d":"e2a16aba52032d39ad09792743d4171ef9ddedaeb2c9ab0d16cadef9f06f6522","93dfc358":"1feaf7a6c7512b250a91ef40e5e379ffcc770ca3fca0485a3f722e24709b30c3","941e4cda":"55b0a0f7bc80551386d868c821a918aeaf694e0152ebcb33a14b2db47445b751","96b6db21":"6c7f822de56523125c4460379156270cfdbc7dab835514ca7dc7efb64fa9bf9d","a37f2a80":"5718924a5c3d71479139a25109612c9434ab99783b7c180280d3ed3e1122d76e","a6ff8705":"c0d45b515f2867d713f4f242914d4e0201916642db23d5512a89137c295ec7ca","a9b5ca51":"80ba957a1d5e94ed88d4bf9b730e6738d6409b606ec9e5e105862ff7f2592b14","b4ca9c65":"72c6dd8c7435c3b6082730fa85c91e7d9475c442823b5b70afd3c35c40404462","bd3ac042":"092c12f61567fa971db2372b64a5a4944ca0e31caedae4d7ee399d46c1315db5","c0bbbc2c":"231e28dd047f63d6596c06e3e71a33e8734639e8e59d92f7c80cf3592a13329e","ceb4be90":"150c2337c2f0c46d6bfe6f7b3aeff3c1b076e2d3f610ca6e42784a59833897a9","d81974e3":"0ff3928bb2f1048403b57f2576ade752d1391b13f51d49453d3413c1f9c080ca","dfd9f098":"0da50d35b20400aed6e295eaa37856f53e9242e7c042ac1c52170ba9cac1b8da","e102f7b4":"01518be45207f432955ff4713a4318495803c8a7f43e2cc4747780b82aade3c5","e59bb561":"ce781421b546d18ea3c683d3a0edaa27c62e847974af5db4d16197795505cebd","eb94f899":"9c8414a613cdda54504cc3201f740205b22d8b9e790f4ea7d6bdeb489553a9d0","eec8c749":"7c9c4de5d9fc54d2277785a68f08c59d8f995d7f3e2e3fdea092b24c04087f27","f68fef82":"616353a3cbeee2ce84fb5d8d48f49bd49e950504dc2d180ee807ccea50d33dc9","f9d159e5":"ba0e70b06902379ec033405591dc94b8e95ec5ec562bd28f5faacc00f9c00372","faf96a79":"45cb9dcce43d2cc8fa860741af5225bcee3f71b34e13368a5c4dbc177a40842b","fdac8d35":"976a48063e29724a7c49c229eb62137a9220551365ae16232d1b6bcb8fbb23ff","fe431c24":"cd543ed71ff0c9d0f0e78ff2fd97734faabfc981e3e71a1ad714020c478da7de"},"mr":{"012b854b":"112fde7ca5ba1907116556e1ca46dbccc020d27b45abbc69694f41d754628332","0c5a09ef":"482ca793563f6a5faf3e949c5fad3125767c5a7467eca6aaa4a7d66b6d545b90","0d28f953":"a3b7892c441682296031a50ecd340c144bbdd02b06f4741ef0e43064d8b9c02c","101a8ce0":"fa52cef5b53d5aa7d41f027c04d40ea37c9594cd212c8a8e2f4f722094dfa8bb","196e7a73":"7da429f19fd2d9b03176e5fac50c353fde8e77652a925507b3b682246808b64c","209fb29b":"38eb404c137d57aa7f239e10ab12fde27a1ea3a4dd63bcbf5459c7dec4bcaf6a","224fc2bb":"f7176c94387fe9e3ee006d2eccc763cd87fe417b0a11bc08ea06ed4901cd832e","2ce4e1fb":"b7f6aba5443bfbfb4a932111845051adddde08b2829bab3439026cb35c22a48b","34fdf3e1":"f43e05462cd22f15cbddab59c63f0fd2f155e379ca88a5a45acd889c420848c7","3860b6a0":"0c29c510d0079effaa06de1255d0aa632ebdac0eb3e48b0f289f54a9e1199dcf","38fb9d18":"c1ca353d154e8611aa9dbe35bc1e325efaed322e37143586d61c4285b866bcf9","3a8db67b":"505053bfd8a609f2c92752a3aa8b60e3f83e9d9bb05001494c0668bfbac9f831","3c593fe3":"ad1ff13c1a8af4ed74281aac6a4b14f47417bcb3610a2bb227108bf063d97ec3","41012e8b":"9f37301df1b9b6bc6f39e8ee946ddfcb5752e7c19d4c005d01f3ef2f3d2ac198","437b6a51":"3a5032f96f559c8c2e30632c6fa520a1672aafae181b3dd63db34cbcdf7d7d64","46886d3f":"d23b17c292abc2dcee291f3d8f79933075b3a302176bb8f8d6e0b9651b46ef87","4c053e70":"6110eb67db43302e88b6a2eff069c6b9d61cad779c48562efd7a309fc2b3346d","5540ca14":"92e6cfdf264512fff0f32bada31a408b2add809d9dc30fd3de2518c8cb43345b","57e4c394":"c4f6c590ef95a711b0656d148814bacbc3afafa292ea3bef479f88e18d008da3","5cfd6103":"c77e5b5ff4e64f94b44b0a60caec036413edb328a5f01b3ea009cd2c7c97235c","5e325a14":"51c7dc348255cedc2e2e023eeb7f4bae016cfa8bb4b0592d4a4d080ffa104910","5f1592fa":"409c3e14a085ef07936b33a4bcc777fa62cd4d772b3088f4610e475793131510","66507cba":"d7220de5399f49349c3b3e0c19f5c06065843b9d0540c5d91f683130c8722235","66f79d66":"03dd34397198a722fd41d5ef0032b871e0c11a9da88e60fcede596d670847707","6bb236ad":"46b73326046ebdebdf38e5382d5be3f2345887c67fdc1fc96fa2e90cbd862719","6c7ecf42":"75b1bb179b35cdf06dc54bd9dc664ecbf6e3124e77722d123333f322ddf8bdff","72411fbe":"d74c54dad88531c8ce612407ee3974f73a030bb114a4fb1feee29b6fce709d2a","739f2973":"65dfc2c55c75aa995cacd08f40eec5c5a0857155076682bb50bc3ea88d575c14","77413fea":"90a1d3cb374ef0a6ac60b797cbed5129f1ba888c9468cd3e3d7ab0a542061f19","917a0120":"70a93a8e92beb3a27edd23d122c90257002c57e107891be7ae5dd786b226fd49","9da32abb":"170d54961b871df40c995ec8cb11d07b3c5981fdaf6b5f43324deb98bca96a8e","a679e385":"9efe3ae406544677597baf3a48f045aca1307f4401b60172355fb16d58a2ba3d","a6d30ee2":"045ba64489b521c5998a31a34d59b7a1b4b18b7f34394dead3e656f231d194c4","a7df533d":"79b775256de23699f568f98b559b1ea33d4f9cc68e7cf76762cb951d03fa94a7","b2e7557e":"e19c3308ba5beef4ce25688ae4491972c0994c07d4d9060b14287cd76af104f8","bd0d7af8":"e48c62ea7c62562a379fa31d1eefcbaa57242758e52c18e0e3a4f5fcf9a62fbe","c0dd0a7f":"96bb53a7b253f2f03333d09d23db42ca52f81ac214d3c233ecfcba3dc7406348","c45dffed":"6f21a6722092c398e75d8bd122ce9f0d440a4e62b210f79b283c1c36e8768862","cc06413f":"6c97ebf4a17ac1bc84a9db45f01670be18413d926cff9184afd31e1859c3b67b","ccde5d5e":"994187f00c7b58d6fcb26015d995f3e6a17db46d7c5d599fa97d2adb9374ce7b","cea6deec":"ac47764d5a0630bc9508e47296bbf285666b25bbef70c3ed8fe370f96b842781","d2dc690b":"37ca32a888deb2e027f2e447db18ede846885c8921cf70d27d90d129cdbf7171","d5b2daeb":"e8ea6c45dd8fd30f0c58e12ee6f10ffe5cb551caf966efb7665b5bc0431e9b28","dcd9bcd2":"f57dc603aa8c1e441eff66e574b0c1a608e29094719024b0a97b43b176927de3","e189b654":"dcd1256f7b27f4c0bebb5ba5ca1c03c444ce479f17f3410a19a28ab05ee32b65","e46e2402":"479557138565405d89f1c67e0b0c6a5ba480fc61317bf2efecc25e57a69d3534","f7f9ba52":"11f62b1072f5520d29eb8536136768f699e387e8c8c0717c1dbc6eea75ce7bd0"},"en":{"049e8826":"bd3b12625a37b0f074b6f79c9bfa21bbd85372b5f1928ab42867cbfeae8ba001","07821f30":"e56cec3c40e359a9ef67d48cb2c3beb0e76195f146292359f8d1b94de4e692ce","085e6410":"5ba591a2c37db68b9f58386b3d4d3a5ad25ac13ef4626eb8980e4017cb9a08a9","09570b44":"722064054fb091fc0908fbc037f5ba5073ed1af504896425b38a015c58f540eb","134fc72a":"d481bed0104e3a0a8d111c472a21c9276c24013587356bb04493826b33b28a86","4208aa86":"2377c732fadfe09a0931a424e702f092d2cb8a25eb992b22eed7f9a49cdd58bb","425a12c1":"4e3c12d2882c720984510d3594dd79f4ecb86251b459f9aec009894c30b7a3c6","5a3303b3":"df1b1f9177e3a92b3b80d3343493925df051785bd569bad4bb09b672a523e68c","5c385069":"99b725a92d71524a4db237a7f8369d3ae010c7ce3e48601a2ec12d7f753e5210","6a4c7597":"3cade501ac6adf125081f85d4d8321af26dbb61b6cefa223efd3a5e5626fc2ba","6d9c9158":"ecc026dd760ca20ade2307386b5e8cd944108d78d356ba06ef51bf740ed08c43","7459af7b":"d074dd3a05d971f5ba4c90c012be5e051c1c015564a7ae0c7ea62e6ca1063fcb","81f3bcc0":"504e792a182d149c1d27b66b3357fa57a1ce7c9ceb0b6bfdc8db564854b084ab","83350d99":"72bc4814ab5d15842e33f2d9ae0a52156a194aae7f3aba97cb79411e5f69e397","848d3b7d":"566ccbdf9b61ebd6fddda48007db0dfbebebd41b12e04fff4d9c834b519ad0d2","84a72dde":"5df8876857924d814ecdc85e531fef29b9327ff802bc40345bad50751dea5dde","860205e0":"4dfec7b6fe858196c65db7ad167795d8367fda06fd74f3f9f220f511bfa9a8c1","b5c38963":"afb61527acb00d78e65c42b1aeb061dd509487926e9eb3e8f3b5d61db09a39e3","c8b2734a":"ad8c89f1788fcd1d4313af7da127364123edc6e609457bcfd23086437035f488","d9acfa26":"c84b7ceada8caffae5c16b0fc6e92395f2aaab8e03e07a188f45274c4506639a","e1494d04":"9027f1a609b5367ed6e9c6530e2fc6199319d07287d151ed2e117dd53e6d9e9a","e5923b09":"0b5f5c3228e90f307732f0a1d13951493a5381fe11befc758c210ae8f8714939","eb6bae61":"8e65db44dbd8dcd549482b11c6eb8fbb0c0eb2cae81376179f44b60fdac85de2","ffd2c9a5":"224e6665ccc1274a4964addf3b7f775b01e8ba97fcf547246081873dac72191a"}}};
;
// Catalyst: Devanagari lines for every example.
// Burmese and Chinese use the pinned language-utils sources bundled at build time.
// Japanese has no converter there, so this file turns the kana reading into Devanagari.
// Works in the browser (window.CatalystScripts) and in Node (module.exports) for tools/build_data.mjs.
(function (root) {
  const FILES = { my: 'burmese', zh: 'chinese' };

  // ---- Japanese kana → Devanagari ----
  // Reading is kana as pronounced (は → わ). Katakana is treated as hiragana.
  const KANA = {
    'あ':'a','い':'i','う':'u','え':'e','お':'o',
    'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko','が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
    'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so','ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
    'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to','だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
    'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
    'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho','ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
    'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
    'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo','や':'ya','ゆ':'yu','よ':'yo',
    'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro','わ':'wa','を':'o','ん':'N','っ':'Q','ー':'L',
    'ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o',
  };
  const YOON = { 'ゃ':'a','ゅ':'u','ょ':'o' };
  const CONS = {
    k:'क', g:'ग', s:'स', sh:'श', z:'ज़', j:'ज', t:'त', ch:'च', ts:'त्स', d:'द', n:'न', h:'ह', f:'फ',
    b:'ब', p:'प', m:'म', y:'य', r:'र', w:'व',
  };
  const VSIGN = { a:'ा', i:'ि', u:'ु', e:'े', o:'ो' };
  const VFULL = { a:'आ', i:'इ', u:'उ', e:'ए', o:'ओ' };
  const LONG = { 'ि':'ी', 'ु':'ू', 'इ':'ई', 'उ':'ऊ' };

  const toHira = (s) => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));

  // kana → list of { c: consonant romaji, v: vowel } plus N (ん), Q (っ), L (ー), or other characters
  function syllables(kana) {
    const out = [];
    const s = toHira(kana);
    for (let i = 0; i < s.length; i++) {
      const ch = s[i], r = KANA[ch];
      if (r === undefined) { out.push({ raw: ch }); continue; }
      if (r === 'N' || r === 'Q' || r === 'L') { out.push({ mark: r }); continue; }
      const m = r.match(/^([^aiueo]*)([aiueo])$/);
      let c = m[1], v = m[2];
      const next = s[i + 1];
      if (YOON[next]) {                       // きゃ → kya, しゃ → sha, ちゃ → cha, じゃ → ja
        v = YOON[next]; i++;
        c = (c === 'sh' || c === 'ch' || c === 'j') ? c : c + 'y';
      }
      out.push({ c, v });
    }
    return out;
  }
  function consDev(c) {
    if (!c) return '';
    if (CONS[c]) return CONS[c];
    if (c.endsWith('y') && CONS[c.slice(0, -1)]) return CONS[c.slice(0, -1)] + '्य';
    return c;
  }
  function kanaToDev(kana) {
    if (!kana) return '';
    const syl = syllables(kana);
    let out = '', prevV = '';
    for (let i = 0; i < syl.length; i++) {
      const x = syl[i];
      if (x.raw !== undefined) { out += x.raw === '、' ? ',' : x.raw === '。' ? '।' : x.raw; prevV = ''; continue; }
      if (x.mark === 'N') { out += 'ं'; prevV = ''; continue; }
      if (x.mark === 'Q') {                   // small っ doubles the next consonant: いった → इत्ता
        const n = syl[i + 1];
        if (n && n.c) out += consDev(n.c)[0] + '्';
        continue;
      }
      if (x.mark === 'L') {                   // ー lengthens i / u; a, e, o look the same long or short
        const last = out.slice(-1);
        if (LONG[last]) out = out.slice(0, -1) + LONG[last];
        continue;
      }
      // おう, よう, こう…: the う only lengthens the o
      if (!x.c && x.v === 'u' && prevV === 'o') continue;
      out += x.c ? consDev(x.c) + VSIGN[x.v] : VFULL[x.v];
      prevV = x.v;
    }
    return out;
  }

  // The browser release installs these before this helper. The content build
  // registers the same pinned modules; no converter code is downloaded/evaluated.
  const converters = root.CatalystConverters || {};
  const loadConverter = async (lang) => converters[lang] || null;
  const loadAll = () => Promise.all(Object.keys(FILES).map(loadConverter));

  // Devanagari for one example: the override, else the live converter, else the saved line
  function devanagari(ex, lang) {
    if (ex.devOverride) return ex.devOverride;
    try {
      if (lang === 'ja') return kanaToDev(ex.r) || ex.dev || '';
      if (lang === 'zh' && converters.zh) return converters.zh(ex.r || '') || ex.dev || '';
      if (lang === 'my' && converters.my) return converters.my(ex.t || '') || ex.dev || '';
    } catch (e) { /* fall through */ }
    return ex.dev || '';
  }

  const api = { kanaToDev, loadConverter, loadAll, devanagari, converters, FILES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CatalystScripts = api;
})(typeof window !== 'undefined' ? window : globalThis);

;
// Public, bundled lesson recordings only. Never caches arbitrary URLs or account media.
(function(root){
  'use strict';
  const BASE='https://ulgrfumbwjovbjzjiems.supabase.co/storage/v1/object/public/vocabulary-assets/audio-grammar/';
  const LANGS=['ja','my','zh','mr','en'],VOICES=['f','m'],HEX=/^[a-f0-9]{64}$/;
  const norm=text=>(text||'').normalize('NFC').trim().split(/\s+/).filter(Boolean).join(' ');
  function hash(text){let h=0x811c9dc5;for(const b of new TextEncoder().encode(norm(text))){h^=b;h=Math.imul(h,0x01000193)>>>0;}return h.toString(16).padStart(8,'0');}
  const digest=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join('');
  const fail=(message,code)=>Object.assign(Error(message),{code});
  const pair=(lang,voice)=>{if(!LANGS.includes(lang)||!VOICES.includes(voice))throw fail('Unsupported audio language or voice.','invalid');return lang+':'+voice;};
  function validate(pack){
    if(!pack||pack.version!==1||!HEX.test(pack.id)||!Array.isArray(pack.files)||pack.files.length>1000||typeof pack.voiceName!=='string'||!pack.voiceName.trim()||pack.voiceName.length>128)throw fail('Saved audio inventory is unreadable. Existing data is preserved.','invalid');
    pair(pack.language,pack.voice);const hashes=new Set(),sizes=new Map();let total=0;
    for(const f of pack.files){
      if(!f||!/^[a-f0-9]{8}$/.test(f.hash)||!HEX.test(f.sha256)||!HEX.test(f.textSha256)||!Number.isSafeInteger(f.bytes)||f.bytes<4||f.bytes>20*1024*1024||hashes.has(f.hash))throw fail('Invalid recorded-audio inventory.','invalid');
      hashes.add(f.hash);if(sizes.has(f.sha256)&&sizes.get(f.sha256)!==f.bytes)throw fail('Conflicting audio file sizes.','invalid');
      if(!sizes.has(f.sha256))total+=f.bytes;sizes.set(f.sha256,f.bytes);
    }
    if(total!==pack.totalBytes||total>100*1024*1024||!Number.isSafeInteger(pack.lessonCount)||pack.lessonCount<pack.files.length)throw fail('Invalid audio download size.','invalid');
    return pack;
  }
  async function inventory(raw,language,voice,allowed){
    pair(language,voice);
    if(raw?.version!==2||raw.lang!==language||!Array.isArray(raw.files)||raw.files.length>2000||!raw.voices||typeof raw.voices[voice]!=='string')throw fail('Recordings need a verified size and checksum inventory before offline download.','unverified');
    for(const v of VOICES)if(!Array.isArray(raw[v])||raw[v].some(h=>!/^[a-f0-9]{8}$/.test(h))||new Set(raw[v]).size!==raw[v].length)throw fail('Invalid audio manifest.','invalid');
    const names=new Set();
    for(const f of raw.files){if(!f||!VOICES.includes(f.voice)||f.mime!=='audio/mpeg'||!HEX.test(f.sha256)||!HEX.test(f.textSha256)||!Number.isSafeInteger(f.bytes)||f.bytes<4||f.bytes>20*1024*1024||!raw[f.voice].includes(f.hash)||names.has(f.voice+':'+f.hash))throw fail('Conflicting audio manifest entries.','invalid');names.add(f.voice+':'+f.hash);}
    if(raw.m.length+raw.f.length!==raw.files.length)throw fail('Audio inventory is incomplete.','invalid');
    const files=raw.files.filter(f=>f.voice===voice&&allowed?.[f.hash]===f.textSha256).map(({hash,bytes,sha256,textSha256})=>({hash,bytes,sha256,textSha256})).sort((a,b)=>a.hash.localeCompare(b.hash));
    const content={version:1,language,voice,voiceName:raw.voices[voice],lessonCount:Object.keys(allowed||{}).length,files,totalBytes:[...new Map(files.map(f=>[f.sha256,f.bytes])).values()].reduce((n,b)=>n+b,0)};
    return validate({...content,id:await digest(new TextEncoder().encode(JSON.stringify(content)))});
  }
  function mp3(bytes){
    // Reject HTML/JSON/empty files even when a server sends an audio MIME type.
    const b=new Uint8Array(bytes);if(b.length<4)return false;
    if(b[0]===73&&b[1]===68&&b[2]===51&&b.length>=10&&[2,3,4].includes(b[3])){
      if([b[6],b[7],b[8],b[9]].some(n=>n>127))return false;
      const end=10+((b[6]<<21)|(b[7]<<14)|(b[8]<<7)|b[9]);
      if(end>=b.length)return false;
      return frame(b,end);
    }
    return frame(b,0);
  }
  function frame(b,i){return b[i]===255&&(b[i+1]&224)===224&&(b[i+1]&24)!==8&&(b[i+1]&6)!==0&&(b[i+2]&240)!==0&&(b[i+2]&240)!==240&&(b[i+2]&12)!==12;}
  async function verified(response,file){
    if(!response||response.status!==200||response.type==='opaque'||response.redirected||(response.headers.get('Content-Type')||'').split(';')[0].trim().toLowerCase()!=='audio/mpeg')return false;
    const bytes=await response.clone().arrayBuffer();return bytes.byteLength===file.bytes&&mp3(bytes)&&await digest(bytes)===file.sha256;
  }
  async function range(response,value){
    const bytes=await response.arrayBuffer(),length=bytes.byteLength,headers={'Content-Type':'audio/mpeg','Accept-Ranges':'bytes','Cache-Control':'no-store'};
    if(!value)return new Response(bytes,{status:200,headers:{...headers,'Content-Length':String(length)}});
    const match=/^bytes=(\d*)-(\d*)$/.exec(value);let start,end;
    if(match&&(match[1]||match[2])){
      start=match[1]?Number(match[1]):Math.max(0,length-Number(match[2]));end=match[1]?(match[2]?Math.min(Number(match[2]),length-1):length-1):length-1;
      if(!match[1]&&Number(match[2])===0)start=length;
    }
    if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start<0||start>=length||end<start)return new Response(null,{status:416,headers:{...headers,'Content-Range':'bytes */'+length}});
    return new Response(bytes.slice(start,end+1),{status:206,headers:{...headers,'Content-Length':String(end-start+1),'Content-Range':`bytes ${start}-${end}/${length}`}});
  }
  function manager({base,catalog={},caches,db,fetch,notify=()=>{},now=()=>Date.now(),timeout=30000}){
    const scope=new URL(base),prefix=scope.pathname+':audio:',cacheName='catalyst-audio-v1-'+encodeURIComponent(scope.pathname);
    const key=(lang,voice)=>prefix+pair(lang,voice),blobURL=sha=>new URL('__catalyst_audio_blob__/'+sha,base).href;
    const mediaURL=(pack,file)=>new URL(`__catalyst_audio__/${pack.language}/${pack.voice}/${file.hash}/${file.sha256}.mp3`,base).href;
    let job=null,sequence=0;const publish=value=>notify({...value,sequence:++sequence});
    const record=async(lang,voice)=>{
      const r=await db.get(key(lang,voice));if(!r)return {version:1,active:null,candidate:null,state:'not-downloaded'};
      if(r.version!==1||(r.removing&&(!Array.isArray(r.removing)||r.removing.some(sha=>!HEX.test(sha)))))throw fail('Audio metadata is unreadable. Saved files are preserved.','invalid');
      for(const p of [r.active,r.candidate].filter(Boolean)){validate(p);const {id,...content}=p;if(await digest(new TextEncoder().encode(JSON.stringify(content)))!==id)throw fail('Saved audio inventory checksum differs. Existing data is preserved.','invalid');if(p.language!==lang||p.voice!==voice)throw fail('Audio ownership metadata does not match this language and voice.','invalid');}
      return r;
    };
    async function scan(pack){
      if(!pack)return {files:0,bytes:0,complete:false};validate(pack);const cache=await caches.open(cacheName);let files=0,bytes=0;
      for(const file of new Map(pack.files.map(f=>[f.sha256,f])).values())if(await verified(await cache.match(blobURL(file.sha256)),file)){files++;bytes+=file.bytes;}
      return {files,bytes,complete:pack.files.length>0&&files===new Set(pack.files.map(f=>f.sha256)).size};
    }
    async function status(language,voice){
      const r=await record(language,voice),active=await scan(r.active),candidate=await scan(r.candidate);
      return {language,voice,state:job?.pair===pair(language,voice)?job.type:r.state==='downloading'?'interrupted':r.removing?.length?'removal-paused':r.state,error:r.error||'',active:r.active,activeHealthy:active.complete,candidate:r.candidate,progress:candidate,verifiedAt:active.complete?now():null,busy:job?.pair||null,removing:r.removing||[]};
    }
    async function request(url,signal,limit=1024*1024){
      const controller=new AbortController(),abort=()=>controller.abort();signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();
      const timer=setTimeout(abort,timeout);
      try{
        const response=await fetch(url,{credentials:'omit',redirect:'error',cache:'no-store',mode:'cors',signal:controller.signal});
        if(response.type==='opaque'||response.redirected)throw fail('The audio server did not return a readable file.','invalid');
        if(Number(response.headers.get('Content-Length'))>limit)throw fail('An audio response exceeds its declared size.','invalid');
        const reader=response.body?.getReader();let total=0;const chunks=[];
        if(reader){try{while(true){const {done,value}=await reader.read();if(done)break;total+=value.byteLength;if(total>limit)throw fail('An audio response exceeds its declared size.','invalid');chunks.push(value);}}catch(error){await reader.cancel().catch(()=>{});throw error;}}
        const bytes=new Uint8Array(total);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
        return new Response(bytes,{status:response.status,headers:response.headers});
      }
      finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
    }
    async function operate(language,voice,type,fn){
      if(job)throw fail('Another audio operation is running. Pause it before starting another.','busy');
      const current={pair:pair(language,voice),type,abort:new AbortController()};job=current;
      try{return await fn(current.abort.signal);}finally{if(job===current)job=null;publish({language,voice,changed:true});}
    }
    async function inspect(language,voice){return operate(language,voice,'checking',async signal=>{
      const old=await record(language,voice);
      try{
        const response=await request(BASE+language+'/clips.json',signal);
        if(!response.ok){
          let body;try{body=await response.json();}catch{}
          if(response.status===404||response.status===400&&['NoSuchKey','not_found'].includes(body?.code))throw fail('No recorded lesson audio has been published for this language. Device voices are separate.','missing');
          throw fail('The audio inventory could not be read (HTTP '+response.status+'). Retry when connected.','network');
        }
        if((response.headers.get('Content-Type')||'').split(';')[0].trim().toLowerCase()!=='application/json')throw fail('The audio manifest has an invalid format.','invalid');
        const raw=await response.text();if(raw.length>1024*1024)throw fail('Audio manifest is too large.','invalid');
        const pack=await inventory(JSON.parse(raw),language,voice,catalog[language]);if(signal.aborted)throw fail('Audio check paused.','paused');
        await db.put(key(language,voice),{...old,candidate:pack,state:pack.files.length?'available':'unavailable',error:pack.files.length?'':'No verified recordings match the bundled lessons for this voice.',checkedAt:now()});return pack;
      }catch(error){await db.put(key(language,voice),{...old,state:signal.aborted?'paused':error.code==='missing'?'unavailable':'error',error:signal.aborted?'':error.message||'Audio check failed. Previous downloads retained.'});if(!signal.aborted)throw error;}
    });}
    async function download(language,voice){return operate(language,voice,'downloading',async signal=>{
      const old=await record(language,voice),pack=old.candidate;if(!pack?.files.length)throw fail('Check available recordings before downloading.','missing');
      const cache=await caches.open(cacheName);let files=0,bytes=0;
      const progress=async(state,error='')=>{const value={...old,state,error,progress:{files,bytes},updatedAt:now()};await db.put(key(language,voice),value);publish({language,voice,state,error,progress:{files,bytes,complete:false}});};
      try{
        await progress('downloading');
        for(const file of new Map(pack.files.map(f=>[f.sha256,f])).values()){
          if(signal.aborted)throw fail('Audio download paused.','paused');
          let saved=await cache.match(blobURL(file.sha256));
          if(!await verified(saved,file)){
            const response=await request(BASE+language+'/'+voice+'/'+file.hash+'.mp3',signal,file.bytes);
            if(!response.ok)throw fail('A recording is unavailable (HTTP '+response.status+'). Saved files are retained; retry later.','network');
            if(!await verified(response,file))throw fail('A recording differs from its size, format or checksum. No replacement was saved.','invalid');
            if(signal.aborted)throw fail('Audio download paused.','paused');
            await cache.put(blobURL(file.sha256),new Response(await response.arrayBuffer(),{headers:{'Content-Type':'audio/mpeg'}}));
            if(!await verified(await cache.match(blobURL(file.sha256)),file))throw fail('A recording could not be saved. Free space and retry.','storage');
          }
          files++;bytes+=file.bytes;await progress('downloading');
        }
        if(signal.aborted)throw fail('Audio download paused.','paused');
        if(!(await scan(pack)).complete)throw fail('Audio verification failed. Resume to repair missing files.','storage');
        await db.put(key(language,voice),{...old,active:pack,candidate:pack,state:'complete',error:'',verifiedAt:now()});
      }catch(error){await progress(signal.aborted?'paused':'error',signal.aborted?'':error.message||'Audio download interrupted.');if(!signal.aborted)throw error;}
    });}
    function pause(language,voice){if(job&&(!language||job.pair===pair(language,voice)))job.abort.abort();}
    async function remove(language,voice){return operate(language,voice,'removing',async signal=>{
      const old=await record(language,voice),candidates=new Set([...(old.removing||[]),...[old.active,old.candidate].filter(Boolean).flatMap(p=>p.files.map(f=>f.sha256))]),keep=new Set();
      for(const l of LANGS)for(const v of VOICES)if(l!==language||v!==voice){const r=await record(l,v);for(const p of [r.active,r.candidate].filter(Boolean))for(const f of p.files)keep.add(f.sha256);}
      // Detach first: an interrupted removal cannot claim a missing pack ready.
      await db.put(key(language,voice),{version:1,active:null,candidate:null,state:'removal-paused',error:'',removing:[...candidates]});
      const cache=await caches.open(cacheName);for(const sha of candidates){if(signal.aborted)return;if(!keep.has(sha))await cache.delete(blobURL(sha));}
      await db.put(key(language,voice),{version:1,active:null,candidate:null,state:'not-downloaded',error:'',removing:[]});
    });}
    function eligible(request){const url=new URL(request.url);return request.method==='GET'&&url.origin===scope.origin&&!url.search&&!url.hash&&url.pathname.startsWith(scope.pathname+'__catalyst_audio__/');}
    async function serve(request){
      const url=new URL(request.url),match=/^__catalyst_audio__\/(ja|my|zh|mr|en)\/(m|f)\/([a-f0-9]{8})\/([a-f0-9]{64})\.mp3$/.exec(url.pathname.slice(scope.pathname.length));
      if(!eligible(request)||!match)return new Response('Unknown audio file',{status:404});
      const [,language,voice,hash,sha]=match,r=await record(language,voice),file=r.active?.files.find(f=>f.hash===hash&&f.sha256===sha);
      if(file){const response=await (await caches.open(cacheName)).match(blobURL(sha));if(await verified(response,file))return range(response,request.headers.get('Range'));}
      publish({language,voice,repair:true,changed:true});return new Response('Saved recording is missing or damaged. Reconnect and repair this audio pack.',{status:503,headers:{'Content-Type':'text/plain','Cache-Control':'no-store'}});
    }
    return {status,inspect,download,pause,remove,eligible,serve,scan,mediaURL,cacheName,blobURL,key,get busy(){return !!job;}};
  }
  root.CatalystMediaCore={BASE,LANGS,VOICES,norm,hash,digest,validate,inventory,mp3,verified,range,manager};
  if(typeof module!=='undefined')module.exports=root.CatalystMediaCore;
})(typeof self!=='undefined'?self:globalThis);

;
// Catalyst: recorded audio with verified offline packs and separately labelled device voices.
// Clips come from tools/gen_catalyst_audio.py, in their own folder audio-grammar/<lang>/.
// Until a language has clips, it falls back to the phone's own text-to-speech voice, if it has one.
// Voice + mute are kept on this device only (no login in this app). Exposes window.CatalystAudio.
(function () {
  const BASE = 'https://ulgrfumbwjovbjzjiems.supabase.co/storage/v1/object/public/vocabulary-assets/audio-grammar';
  const PREFS_KEY = 'catalyst_audio_prefs';
  const SLOW_RATE = 0.7;

  const norm = (t) => (t || '').normalize('NFC').trim().split(/\s+/).filter(Boolean).join(' ');
  const enc = new TextEncoder();
  function hash(text) {
    let h = 0x811c9dc5;
    for (const b of enc.encode(norm(text))) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }

  const listeners = new Set();
  let version = 0;
  const emit = () => { version++; listeners.forEach(fn => fn()); };

  // ---- prefs: voice m/f + mute (account row, localStorage mirror for first paint) ----
  let prefs = { voice: 'f', muted: false };
  try { prefs = { ...prefs, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') }; } catch (e) {}
  let sb = null, userId = null;

  async function initPrefs(client, uid) {
    sb = client; userId = uid;
    if (!sb || !uid) return;
    const { data, error } = await sb.from('kg_chart_user_prefs').select('audio_voice, audio_muted').eq('user_id', uid).maybeSingle();
    if (error) { console.warn('CatalystAudio: prefs table not available, using this device only.', error.message); return; }
    if (data) setPrefsLocal({ voice: data.audio_voice === 'm' ? 'm' : 'f', muted: !!data.audio_muted });
  }
  function setPrefsLocal(p) {
    stop();prefs = { ...prefs, ...p,voice:p.voice===undefined?prefs.voice:p.voice==='m'?'m':'f' };
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (e) {}
    emit();
  }
  async function setPrefs(p) {
    setPrefsLocal(p);
    if (!sb || !userId) return;
    const { error } = await sb.from('kg_chart_user_prefs').upsert({
      user_id: userId, audio_voice: prefs.voice, audio_muted: prefs.muted, updated_at: new Date().toISOString(),
    });
    if (error) console.warn('CatalystAudio: could not save prefs to account.', error.message);
  }

  // ---- manifests: audio/<lang>/clips.json -> { m: [hash], f: [hash] } ----
  const manifests = {};   // lang -> { m:Set, f:Set } | null (no audio) | 'loading'
  function loadManifest(lang) {
    window.CatalystMedia?.refresh(lang);
    if (!lang || manifests[lang] !== undefined) return;
    manifests[lang] = 'loading';
    fetch(`${BASE}/${lang}/clips.json`, { cache: 'no-cache' })
      .then(r => (r.ok ? r.json() : null))
      .then(j => { manifests[lang] = j ? { m: new Set(j.m || []), f: new Set(j.f || []) } : null; emit(); })
      .catch(() => { manifests[lang] = null; emit(); });
  }

  // Which clip to play: the asked-for voice (conversations: A and B), else the preferred voice, else the other one, else none.
  function resolve(text, lang, voice) {
    const offline=window.CatalystMedia?.lookup(text,lang,voice||prefs.voice);
    if(offline)return offline.url;
    if(typeof navigator!=='undefined'&&navigator.onLine===false)return null;
    const m = manifests[lang];
    if (!m || m === 'loading' || !norm(text)) return null;
    const h = hash(text);
    const first = voice === 'm' || voice === 'f' ? voice : prefs.voice;
    const order = first === 'm' ? ['m', 'f'] : ['f', 'm'];
    const g = order.find(v => m[v].has(h));
    return g ? `${BASE}/${lang}/${g}/${h}.mp3` : null;
  }
  // 'loading' while the manifest is on its way, true/false after
  function has(text, lang) {
    const m = manifests[lang];
    if (m === undefined || m === 'loading') return 'loading';
    return !!resolve(text, lang);
  }

  // ---- playback: one shared <audio>, so a new tap stops the previous clip ----
  const audio = new Audio();
  audio.preload = 'auto';
  let playGeneration=0;
  let current = null;     // { key, state: 'loading' | 'playing' }
  const keyOf = (text, lang, slow) => `${lang}|${norm(text)}|${slow ? 's' : 'n'}`;
  const setCurrent = (c) => { current = c; emit(); };
  audio.addEventListener('playing', () => { if (current) setCurrent({ ...current, state: 'playing' }); });
  audio.addEventListener('ended', () => setCurrent(null));
  audio.addEventListener('pause', () => { if (current && current.state === 'playing') setCurrent(null); });
  audio.addEventListener('error', () => { if (current) { setCurrent(null); toast("Couldn't play this clip"); } });

  function play(text, lang, opts) {
    const slow = !!(opts && opts.slow);
    if (current && current.key === keyOf(text, lang, slow)) { stop(); return true; }
    stop();
    const url = resolve(text, lang, opts && opts.voice);
    if (!url) {
      if (speakTTS(text, lang, slow)) return true;
      if (!(opts && opts.silent)) toast('No audio for this yet'); return false;
    }
    const key = keyOf(text, lang, slow);
    if (current && current.key === key) { stop(); return true; }
    audio.pause();
    setCurrent({ key, state: 'loading' });
    if (audio.src !== url) audio.src = url;
    audio.currentTime = 0;
    audio.playbackRate = slow ? SLOW_RATE : 1;
    audio.defaultPlaybackRate = audio.playbackRate;
    if ('preservesPitch' in audio) audio.preservesPitch = true;
    const generation=playGeneration;
    const p = audio.play();
    if (p && p.catch) p.catch(err => { if (generation===playGeneration && err && err.name !== 'AbortError') { setCurrent(null); toast("Couldn't play audio"); } });
    return true;
  }
  // ---- fallback: the device's own voice (Japanese, Chinese and Marathi usually have one; Burmese rarely) ----
  const TTS_LANG = { ja: 'ja-JP', my: 'my-MM', zh: 'zh-CN', mr: 'mr-IN', en: 'en-US' };
  const ttsVoice = (lang) => {
    if (typeof speechSynthesis === 'undefined') return null;
    const want = (TTS_LANG[lang] || '').toLowerCase();
    return speechSynthesis.getVoices().find(v => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith(want.slice(0, 2)) &&
      (v.lang.replace('_', '-').toLowerCase() === want || want.length === 2)) || null;
  };
  function speakTTS(text, lang, slow) {
    const v = ttsVoice(lang);
    if (!v) return false;
    audio.pause();
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(norm(text));
    u.voice = v; u.lang = v.lang; u.rate = slow ? 0.6 : 0.85;
    const key = keyOf(text, lang, slow);
    u.onend = u.onerror = () => { if (current && current.key === key) setCurrent(null); };
    setCurrent({ key, state: 'playing' });
    speechSynthesis.speak(u);
    return true;
  }
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.onvoiceschanged = () => emit();
  // 'clip' (recorded), 'tts' (device voice), 'loading', or null (nothing to play)
  function source(text, lang) {
    if(window.CatalystMedia?.lookup(text,lang,prefs.voice))return 'saved';
    const m = manifests[lang];
    if (m === undefined || m === 'loading') return 'loading';
    if (resolve(text, lang)) return 'clip';
    return ttsVoice(lang) ? 'tts' : null;
  }

  // Used after answering: respects mute, never shows a toast
  function autoPlay(text, lang, voice) { if (!prefs.muted) play(text, lang, { silent: true, voice }); }
  function stop() { playGeneration++; audio.pause(); if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel(); setCurrent(null); }
  function stateOf(text, lang, slow) { return current && current.key === keyOf(text, lang, slow) ? current.state : null; }

  // ---- tiny toast ----
  let toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#1f2937;color:#fff;padding:10px 18px;border-radius:999px;font:500 14px "DM Sans",sans-serif;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.25);transition:opacity .2s;pointer-events:none';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.style.opacity = '0'; }, 1800);
  }

  window.CatalystAudio = {
    hash, norm, loadManifest, has, source, play, autoPlay, stop, stateOf, initPrefs, setPrefs, toast, refreshSources:emit,
    get prefs() { return prefs; },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    getVersion() { return version; },
  };
})();

;
// Generated by tools/build_data.mjs from data/grammar.yaml. Do not edit by hand.
window.CATALYST_DATA = {
 "builtAt": "2026-11-04T07:42:18.265Z",
 "languages": [
  "ja",
  "my",
  "zh",
  "mr",
  "en"
 ],
 "concepts": [
  {
   "id": "verb_final",
   "sort": 1,
   "group": "Word order",
   "title": "Verb at the end",
   "summary": "Where the verb goes. Japanese, Burmese and Marathi put it last; Chinese and English put it before the object.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "none",
    "ja-mr": "close",
    "my-zh": "none",
    "my-mr": "close",
    "zh-mr": "none",
    "ja-en": "none",
    "my-en": "none",
    "zh-en": "close",
    "mr-en": "none"
   },
   "pairNotes": {
    "ja-zh": "Chinese is S-V-O. With no particles, order alone tells you who does what: 狗咬人 'dog bites man' vs 人咬狗."
   },
   "entries": {
    "ja": {
     "form": "S – O – V",
     "note": "The verb (or adjective, or です) comes last. The rest can move around because particles mark each role.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "私はりんごを食べます。",
       "e": "I eat an apple.",
       "h": [
        "食べます"
       ],
       "r": "わたし わ りんご お たべます",
       "dev": "वाताशि वा रिंगो ओ ताबेमासु"
      },
      {
       "t": "弟が学校へ行った。",
       "e": "My younger brother went to school.",
       "h": [
        "行った"
       ],
       "r": "おとうと が がっこう え いった",
       "dev": "ओतोतो गा गाक्को ए इत्ता"
      }
     ]
    },
    "my": {
     "form": "S – O – V",
     "note": "Same as Japanese: verb last, followed by its ending (တယ်, မယ်…). Order before the verb is fairly free.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ကျွန်တော် ပန်းသီး စားတယ်။",
       "e": "I eat an apple. (male speaker; a woman says ကျွန်မ)",
       "h": [
        "စားတယ်"
       ],
       "dev": "च्वंतो पंथी सादे"
      },
      {
       "t": "ညီလေး ကျောင်း သွားတယ်။",
       "e": "My younger brother goes to school.",
       "h": [
        "သွားတယ်"
       ],
       "dev": "ञीले चाउं थ्वादे"
      }
     ]
    },
    "zh": {
     "form": "S – V – O",
     "note": "Verb before the object, like English. No case particles, so you cannot move words freely.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我吃苹果。",
       "e": "I eat an apple.",
       "h": [
        "吃"
       ],
       "r": "wǒ chī píngguǒ",
       "dev": "वोˇ छ्षि- फ्फियंग´ग्वॉˇ"
      },
      {
       "t": "弟弟去学校了。",
       "e": "My younger brother went to school.",
       "h": [
        "去"
       ],
       "r": "dìdi qù xuéxiào le",
       "dev": "दि`दि छु` शुए´श्याव` ल"
      }
     ]
    },
    "mr": {
     "form": "S – O – V",
     "note": "Verb last, as in Japanese and Burmese. Unlike them, the verb agrees with the subject's gender and number.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मी सफरचंद खातो.",
       "e": "I eat an apple. (male; a woman says खाते)",
       "h": [
        "खातो"
       ]
      },
      {
       "t": "माझा भाऊ शाळेत गेला.",
       "e": "My brother went to school.",
       "h": [
        "गेला"
       ]
      }
     ]
    },
    "en": {
     "form": "S – V – O",
     "note": "Verb before the object. Order carries the meaning.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I eat an apple.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "modifier_before_noun",
   "sort": 2,
   "group": "Word order",
   "title": "Describing clause before the noun",
   "summary": "'The book I bought yesterday'. Here Chinese joins Japanese and Burmese: the whole clause comes before the noun.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "close",
    "ja-mr": "partial",
    "my-zh": "close",
    "my-mr": "partial",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "partial",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-my": "Same order. Burmese needs the linker တဲ့ between clause and noun; Japanese just puts the verb form there.",
    "my-zh": "Burmese တဲ့ and Chinese 的 do the same job in the same place.",
    "ja-mr": "Marathi uses participle forms (-लेला, -णारा) for short clauses. Long ones switch to जो … तो."
   },
   "entries": {
    "ja": {
     "form": "verb (plain form) + noun",
     "note": "No linking word. The plain verb form sits directly in front of the noun.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "昨日買った本",
       "e": "the book I bought yesterday",
       "h": [
        "買った"
       ],
       "r": "きのう かった ほん",
       "dev": "किनो कात्ता हों"
      },
      {
       "t": "日本語を話す人",
       "e": "a person who speaks Japanese",
       "h": [
        "話す"
       ],
       "r": "にほんご お はなす ひと",
       "dev": "निहोंगो ओ हानासु हितो"
      }
     ]
    },
    "my": {
     "form": "verb + တဲ့ + noun",
     "note": "The clause ends with တဲ့ (written style: သော), then the noun.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "မနေ့က ဝယ်ခဲ့တဲ့ စာအုပ်",
       "e": "the book I bought yesterday",
       "h": [
        "တဲ့"
       ],
       "dev": "मनेक वैखैतै साओʼ"
      },
      {
       "t": "ဂျပန်စကား ပြောတဲ့ လူ",
       "e": "a person who speaks Japanese",
       "h": [
        "တဲ့"
       ],
       "dev": "जपंसका प्योतै लू"
      }
     ]
    },
    "zh": {
     "form": "clause + 的 + noun",
     "note": "The clause ends with 的, then the noun: the same order as Japanese and Burmese, unlike the rest of Chinese.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "昨天买的书",
       "e": "the book I bought yesterday",
       "h": [
        "的"
       ],
       "r": "zuótiān mǎi de shū",
       "dev": "ज़्वॉ´थ्येन- मायˇ द षु-"
      },
      {
       "t": "说日语的人",
       "e": "a person who speaks Japanese",
       "h": [
        "的"
       ],
       "r": "shuō Rìyǔ de rén",
       "dev": "ष्वॉ- रि`युˇ द रन्´"
      }
     ]
    },
    "mr": {
     "form": "participle (-लेला / -णारा) + noun",
     "note": "The verb becomes an adjective-like participle that agrees with the noun.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "काल घेतलेलं पुस्तक",
       "e": "the book bought yesterday",
       "h": [
        "घेतलेलं"
       ]
      },
      {
       "t": "जपानी बोलणारा माणूस",
       "e": "a man who speaks Japanese",
       "h": [
        "बोलणारा"
       ]
      }
     ]
    },
    "en": {
     "form": "noun + who / that + clause",
     "note": "The clause comes after the noun, with a relative word.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "the book that I bought yesterday",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "topic_wa",
   "sort": 3,
   "group": "Particles",
   "title": "Topic marker は",
   "summary": "は says 'as for X…'. Nothing else matches it exactly, and this is where false matches start.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "none",
    "ja-mr": "partial",
    "my-zh": "none",
    "my-mr": "partial",
    "zh-mr": "none",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "none",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-zh": "Chinese puts the topic first but has no particle for it. Don't map は onto 是 or 呢.",
    "ja-my": "Burmese ကတော့ is contrastive 'as for', like は used for contrast. Plain は usually becomes က or nothing."
   },
   "entries": {
    "ja": {
     "form": "は (read わ)",
     "note": "Marks what the sentence is about, which is often not the subject. Also shows contrast.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "私は学生です。",
       "e": "I am a student.",
       "h": [
        "は"
       ],
       "r": "わたし わ がくせい です",
       "dev": "वाताशि वा गाकुसेइ देसु"
      },
      {
       "t": "象は鼻が長い。",
       "e": "Elephants have long trunks. (as for elephants, the trunk is long)",
       "h": [
        "は"
       ],
       "r": "ぞう わ はな が ながい",
       "dev": "ज़ो वा हाना गा नागाइ"
      }
     ]
    },
    "my": {
     "form": "ကတော့ / ဟာ / (nothing)",
     "note": "No exact equivalent. ကတော့ = 'as for' with contrast; ဟာ marks a topic in careful speech; often nothing at all.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ကျွန်တော်ကတော့ လက်ဖက်ရည် သောက်မယ်။",
       "e": "As for me, I'll drink tea.",
       "h": [
        "ကတော့"
       ],
       "dev": "च्वंतोकतो लेʼफेʼयी थाउʼमै"
      },
      {
       "t": "ဆင်က နှာမောင်း ရှည်တယ်။",
       "e": "Elephants have long trunks.",
       "h": [
        "က"
       ],
       "dev": "सिंक ह्नामाउं शीदे"
      }
     ]
    },
    "zh": {
     "form": "— (topic goes first)",
     "note": "No topic particle. You put the topic at the start of the sentence and say the rest about it.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "这本书我看过。",
       "e": "This book, I've read it.",
       "h": [
        "这本书"
       ],
       "r": "zhè běn shū wǒ kàn guo",
       "dev": "ज्ष` बन्ˇ षु- वोˇ खान` ग्वॉ"
      },
      {
       "t": "大象鼻子很长。",
       "e": "Elephants have long trunks.",
       "h": [
        "大象"
       ],
       "r": "dàxiàng bízi hěn cháng",
       "dev": "दा`श्यांग` बि´ज़ि हन्ˇ छ्षांग´"
      }
     ]
    },
    "mr": {
     "form": "तर (contrast) / (nothing)",
     "note": "तर after a word gives 'as for…', with contrast. Plain topics have no marker.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मी तर चहा घेईन.",
       "e": "As for me, I'll have tea.",
       "h": [
        "तर"
       ]
      },
      {
       "t": "हत्तीची सोंड लांब असते.",
       "e": "An elephant's trunk is long. (Marathi says 'of')",
       "h": [
        "ची"
       ]
      }
     ]
    },
    "en": {
     "form": "as for … / word order, stress",
     "note": "Only a phrase ('as for') or stress.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "As for me, I'll have tea.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "subject_ga",
   "sort": 4,
   "group": "Particles",
   "title": "Subject marker が",
   "summary": "が marks the subject, especially new information and after question words.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "none",
    "ja-mr": "partial",
    "my-zh": "none",
    "my-mr": "partial",
    "zh-mr": "none",
    "ja-en": "none",
    "my-en": "none",
    "zh-en": "close",
    "mr-en": "none"
   },
   "pairNotes": {
    "ja-my": "Burmese က marks the subject, often with a 'this one, not others' feel. It is also the word for 'from'.",
    "ja-mr": "Marathi ने is not a subject marker: it marks the doer only with past transitive verbs."
   },
   "entries": {
    "ja": {
     "form": "が",
     "note": "New or focused subject; always after question words (誰が, not 誰は).",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "誰が来ましたか。",
       "e": "Who came?",
       "h": [
        "が"
       ],
       "r": "だれ が きました か",
       "dev": "दारे गा किमाशिता का"
      },
      {
       "t": "雨が降っています。",
       "e": "It's raining. (rain is falling)",
       "h": [
        "が"
       ],
       "r": "あめ が ふって います",
       "dev": "आमे गा फुत्ते इमासु"
      }
     ]
    },
    "my": {
     "form": "က",
     "note": "Marks the subject when it matters who does it. Often left out.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ကျွန်တော်က လုပ်မယ်။",
       "e": "I'll do it. (me, not someone else)",
       "h": [
        "က"
       ],
       "dev": "च्वंतोक लोʼमै"
      },
      {
       "t": "ဘယ်သူက ပြောတာလဲ။",
       "e": "Who said it?",
       "h": [
        "က"
       ],
       "dev": "भैथूक प्योताले"
      }
     ]
    },
    "zh": {
     "form": "— (position before the verb)",
     "note": "No subject particle. Position does it, and for weather the 'subject' even comes after the verb.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "谁来了？",
       "e": "Who came?",
       "h": [
        "谁"
       ],
       "r": "shéi lái le",
       "dev": "षै´ लाय´ ल"
      },
      {
       "t": "下雨了。",
       "e": "It's raining. (rain comes after the verb)",
       "h": [
        "下雨"
       ],
       "r": "xià yǔ le",
       "dev": "श्या` युˇ ल"
      }
     ]
    },
    "mr": {
     "form": "ने (past transitive only)",
     "note": "ने marks the doer only when the verb is past and takes an object. Otherwise there is no marker.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "रामने पुस्तक वाचलं.",
       "e": "Ram read the book.",
       "h": [
        "ने"
       ]
      },
      {
       "t": "कोण आलं?",
       "e": "Who came? (no marker)",
       "h": [
        "कोण"
       ]
      }
     ]
    },
    "en": {
     "form": "— (position before the verb)",
     "note": "No marker; the subject comes before the verb.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "Who came?",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "object_o",
   "sort": 5,
   "group": "Particles",
   "title": "Object marker を",
   "summary": "を marks the direct object. Burmese and Marathi mark objects only some of the time, in the same way.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "none",
    "ja-mr": "partial",
    "my-zh": "none",
    "my-mr": "close",
    "zh-mr": "none",
    "ja-en": "none",
    "my-en": "none",
    "zh-en": "close",
    "mr-en": "none"
   },
   "pairNotes": {
    "ja-my": "を is on every object. Burmese ကို is mostly used for people and specific things; 'drink water' has none.",
    "my-mr": "Close match: ကို and ला both mark people and definite objects, and both are left off for plain things."
   },
   "entries": {
    "ja": {
     "form": "を (read お)",
     "note": "On every direct object.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "水を飲みます。",
       "e": "I drink water.",
       "h": [
        "を"
       ],
       "r": "みず お のみます",
       "dev": "मिज़ु ओ नोमिमासु"
      },
      {
       "t": "毎朝新聞を読む。",
       "e": "I read the newspaper every morning.",
       "h": [
        "を"
       ],
       "r": "まいあさ しんぶん お よむ",
       "dev": "माइआसा शिंबुं ओ योमु"
      }
     ]
    },
    "my": {
     "form": "ကို (people, specific things)",
     "note": "Used for people and 'this / that' things. Plain objects take nothing.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ရေ သောက်တယ်။",
       "e": "I drink water. (no marker)",
       "h": [
        "ရေ"
       ],
       "dev": "ये थाउʼदे"
      },
      {
       "t": "သူ့ကို ချစ်တယ်။",
       "e": "I love him / her.",
       "h": [
        "ကို"
       ],
       "dev": "थूको छिʼदे"
      },
      {
       "t": "ဒီ စာအုပ်ကို ဖတ်ပြီးပြီ။",
       "e": "I've finished reading this book.",
       "h": [
        "ကို"
       ],
       "dev": "दी साओʼको फʼप्यीप्यी"
      }
     ]
    },
    "zh": {
     "form": "— (after the verb); 把 for a moved object",
     "note": "No object particle. 把 moves a specific object before the verb, but it is a different construction.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "我喝水。",
       "e": "I drink water.",
       "h": [
        "水"
       ],
       "r": "wǒ hē shuǐ",
       "dev": "वोˇ ह- ष्वैˇ"
      },
      {
       "t": "我把书看完了。",
       "e": "I've finished reading the book.",
       "h": [
        "把"
       ],
       "r": "wǒ bǎ shū kàn wán le",
       "dev": "वोˇ बाˇ षु- खान` वान´ ल"
      }
     ]
    },
    "mr": {
     "form": "ला (people, specific things)",
     "note": "ला on people and some definite objects; things usually take nothing.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मी पाणी पितो.",
       "e": "I drink water. (no marker)",
       "h": [
        "पाणी"
       ]
      },
      {
       "t": "मी त्याला ओळखतो.",
       "e": "I know him.",
       "h": [
        "ला"
       ]
      }
     ]
    },
    "en": {
     "form": "— (after the verb)",
     "note": "Position only.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "I drink water.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "place_de_ni",
   "sort": 6,
   "group": "Particles",
   "title": "Place: で (action) vs に (existence)",
   "summary": "Japanese splits 'at a place' in two. Burmese, Chinese and Marathi use one word for both.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "partial",
    "ja-mr": "partial",
    "my-zh": "partial",
    "my-mr": "close",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "partial",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-my": "One Burmese particle, two Japanese ones: မှာ = で and に. Going the other way, you must choose.",
    "my-mr": "Both use one ending for 'at / in': မှာ and -त / मध्ये."
   },
   "entries": {
    "ja": {
     "form": "で / に",
     "note": "で = where an action happens. に = where something is (with いる / ある).",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "図書館で勉強します。",
       "e": "I study at the library.",
       "h": [
        "で"
       ],
       "r": "としょかん で べんきょう します",
       "dev": "तोशोकां दे बेंक्यो शिमासु"
      },
      {
       "t": "図書館に猫がいます。",
       "e": "There is a cat in the library.",
       "h": [
        "に"
       ],
       "r": "としょかん に ねこ が います",
       "dev": "तोशोकां नि नेको गा इमासु"
      }
     ]
    },
    "my": {
     "form": "မှာ",
     "note": "One particle for both: where something happens and where something is.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "စာကြည့်တိုက်မှာ စာ ကျက်တယ်။",
       "e": "I study at the library.",
       "h": [
        "မှာ"
       ],
       "dev": "साचीताइʼह्मा सा चेʼदे"
      },
      {
       "t": "စာကြည့်တိုက်မှာ ကြောင် ရှိတယ်။",
       "e": "There is a cat in the library.",
       "h": [
        "မှာ"
       ],
       "dev": "साचीताइʼह्मा चाउं शिदे"
      }
     ]
    },
    "zh": {
     "form": "在 … / place + 里 + 有",
     "note": "在 + place before the verb for actions. 'There is' uses place + 里 + 有, without 在.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我在图书馆学习。",
       "e": "I study at the library.",
       "h": [
        "在"
       ],
       "r": "wǒ zài túshūguǎn xuéxí",
       "dev": "वोˇ ज़ाय` थु´षु-ग्वानˇ शुए´शि´"
      },
      {
       "t": "图书馆里有一只猫。",
       "e": "There is a cat in the library.",
       "h": [
        "里有"
       ],
       "r": "túshūguǎn lǐ yǒu yì zhī māo",
       "dev": "थु´षु-ग्वानˇ लिˇ योउˇ इ` ज्षि- माव-"
      }
     ]
    },
    "mr": {
     "form": "-त / मध्ये",
     "note": "One locative ending for both.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मी ग्रंथालयात अभ्यास करतो.",
       "e": "I study at the library.",
       "h": [
        "ग्रंथालयात"
       ]
      },
      {
       "t": "ग्रंथालयात एक मांजर आहे.",
       "e": "There is a cat in the library.",
       "h": [
        "ग्रंथालयात"
       ]
      }
     ]
    },
    "en": {
     "form": "at / in",
     "note": "Prepositions, chosen by the place, not by action vs existence.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I study at the library.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "direction_ni_e",
   "sort": 7,
   "group": "Particles",
   "title": "Going to / giving to: に・へ",
   "summary": "Goal of movement and the person you give to. Burmese and Marathi reuse their object marker for this.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "partial",
    "ja-mr": "partial",
    "my-zh": "partial",
    "my-mr": "close",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "partial",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-my": "Burmese ကို covers を (object), に and へ (goal, receiver). Don't expect a separate 'to' word.",
    "my-mr": "Exact pair: ကို and ला both mean 'to (a place / a person)' and also mark people as objects."
   },
   "entries": {
    "ja": {
     "form": "に / へ (read え)",
     "note": "へ = direction; に = goal or receiver. Different from を.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "東京へ行きます。",
       "e": "I'm going to Tokyo.",
       "h": [
        "へ"
       ],
       "r": "とうきょう え いきます",
       "dev": "तोक्यो ए इकिमासु"
      },
      {
       "t": "友達に手紙を書く。",
       "e": "I write a letter to a friend.",
       "h": [
        "に"
       ],
       "r": "ともだち に てがみ お かく",
       "dev": "तोमोदाचि नि तेगामि ओ काकु"
      }
     ]
    },
    "my": {
     "form": "ကို",
     "note": "The same ကို as for objects, used for where you go and who receives.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ရန်ကုန်ကို သွားမယ်။",
       "e": "I'll go to Yangon.",
       "h": [
        "ကို"
       ],
       "dev": "यंकोंको थ्वामै"
      },
      {
       "t": "သူငယ်ချင်းကို စာ ရေးတယ်။",
       "e": "I write a letter to a friend.",
       "h": [
        "ကို"
       ],
       "dev": "थूङैछिंको सा येदे"
      }
     ]
    },
    "zh": {
     "form": "— (去 + place) / 给 (to a person)",
     "note": "Place goes straight after 去 with no marker. The receiver uses 给 before the verb.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我去东京。",
       "e": "I'm going to Tokyo.",
       "h": [
        "去"
       ],
       "r": "wǒ qù Dōngjīng",
       "dev": "वोˇ छु` दोंग-जियंग-"
      },
      {
       "t": "我给朋友写信。",
       "e": "I write a letter to a friend.",
       "h": [
        "给"
       ],
       "r": "wǒ gěi péngyou xiě xìn",
       "dev": "वोˇ गैˇ फ्फंग´योउ शियेˇ शिन`"
      }
     ]
    },
    "mr": {
     "form": "ला",
     "note": "One ending for the goal, the receiver, and people as objects, like Burmese ကို.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मी पुण्याला जातो.",
       "e": "I'm going to Pune.",
       "h": [
        "ला"
       ]
      },
      {
       "t": "मी मित्राला पत्र लिहितो.",
       "e": "I write a letter to a friend.",
       "h": [
        "ला"
       ]
      }
     ]
    },
    "en": {
     "form": "to",
     "note": "One preposition for place and person.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I'm going to Tokyo.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "also_mo",
   "sort": 8,
   "group": "Particles",
   "title": "Also: も",
   "summary": "'Me too'. Japanese, Burmese and Marathi attach it to the noun; Chinese puts it before the verb.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "partial",
    "ja-mr": "close",
    "my-zh": "partial",
    "my-mr": "close",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "close",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-zh": "も follows the noun; 也 is an adverb before the verb. 'Both A and B' in Chinese uses 都."
   },
   "entries": {
    "ja": {
     "form": "も",
     "note": "Replaces は / が / を after the noun.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "私も行きます。",
       "e": "I'm going too.",
       "h": [
        "も"
       ],
       "r": "わたし も いきます",
       "dev": "वाताशि मो इकिमासु"
      },
      {
       "t": "肉も魚も食べます。",
       "e": "I eat both meat and fish.",
       "h": [
        "も"
       ],
       "r": "にく も さかな も たべます",
       "dev": "निकु मो साकाना मो ताबेमासु"
      }
     ]
    },
    "my": {
     "form": "လည်း",
     "note": "After the noun, in the same place as も.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ကျွန်တော်လည်း သွားမယ်။",
       "e": "I'm going too.",
       "h": [
        "လည်း"
       ],
       "dev": "च्वंतोली थ्वामै"
      },
      {
       "t": "အသားလည်း စားတယ်၊ ငါးလည်း စားတယ်။",
       "e": "I eat meat and I eat fish too.",
       "h": [
        "လည်း"
       ],
       "dev": "अथाली सादे ङाली सादे"
      }
     ]
    },
    "zh": {
     "form": "也 (before the verb) / 都",
     "note": "也 goes before the verb, not after the noun. 'Both … and …' moves the nouns first and uses 都.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我也去。",
       "e": "I'm going too.",
       "h": [
        "也"
       ],
       "r": "wǒ yě qù",
       "dev": "वोˇ येˇ छु`"
      },
      {
       "t": "肉和鱼我都吃。",
       "e": "I eat both meat and fish.",
       "h": [
        "都"
       ],
       "r": "ròu hé yú wǒ dōu chī",
       "dev": "रोउ` ह´ यु´ वोˇ दोउ- छ्षि-"
      }
     ]
    },
    "mr": {
     "form": "-ही / पण",
     "note": "-ही sticks to the noun, exactly where も goes.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मीही येईन.",
       "e": "I'll come too.",
       "h": [
        "ही"
       ]
      },
      {
       "t": "मी मांसही खातो आणि मासेही खातो.",
       "e": "I eat meat and fish too.",
       "h": [
        "ही"
       ]
      }
     ]
    },
    "en": {
     "form": "too / also",
     "note": "At the end or before the verb.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I'm going too.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "from_until",
   "sort": 9,
   "group": "Particles",
   "title": "From … until: から・まで",
   "summary": "Start and end points, in time or space.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "partial",
    "ja-mr": "close",
    "my-zh": "partial",
    "my-mr": "close",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "close",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-zh": "Chinese 从 … 到 go before the nouns, like English prepositions.",
    "ja-my": "Burmese က alone can mean 'from', but it is also the subject marker; ကနေ makes 'from' clear."
   },
   "entries": {
    "ja": {
     "form": "から … まで",
     "note": "After the noun.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "九時から五時まで働きます。",
       "e": "I work from nine to five.",
       "h": [
        "から",
        "まで"
       ],
       "r": "くじ から ごじ まで はたらきます",
       "dev": "कुजि कारा गोजि मादे हाताराकिमासु"
      },
      {
       "t": "駅から歩いて来た。",
       "e": "I walked here from the station.",
       "h": [
        "から"
       ],
       "r": "えき から あるいて きた",
       "dev": "एकि कारा आरुइते किता"
      }
     ]
    },
    "my": {
     "form": "ကနေ / မှ … အထိ / ထိ",
     "note": "After the noun, same place as Japanese.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ကိုးနာရီကနေ ငါးနာရီအထိ အလုပ်လုပ်တယ်။",
       "e": "I work from nine to five.",
       "h": [
        "ကနေ",
        "အထိ"
       ],
       "dev": "कोनायीकने ङानायीअथि अलोʼलोʼदे"
      },
      {
       "t": "ဘူတာကနေ လမ်းလျှောက် လာတယ်။",
       "e": "I walked here from the station.",
       "h": [
        "ကနေ"
       ],
       "dev": "भूताकने लंशाउʼ लादे"
      }
     ]
    },
    "zh": {
     "form": "从 … 到 …",
     "note": "Before the noun, and the whole phrase goes before the verb.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我从九点到五点工作。",
       "e": "I work from nine to five.",
       "h": [
        "从",
        "到"
       ],
       "r": "wǒ cóng jiǔ diǎn dào wǔ diǎn gōngzuò",
       "dev": "वोˇ त्सोंग´ ज्योउˇ द्येनˇ दाव` उˇ द्येनˇ गोंग-ज़्वॉ`"
      },
      {
       "t": "我从车站走过来。",
       "e": "I walked here from the station.",
       "h": [
        "从"
       ],
       "r": "wǒ cóng chēzhàn zǒu guòlai",
       "dev": "वोˇ त्सोंग´ छ्ष-ज्षान` ज़ोउˇ ग्वॉ`लाय"
      }
     ]
    },
    "mr": {
     "form": "-पासून … -पर्यंत",
     "note": "After the noun, like Japanese and Burmese.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मी नऊपासून पाचपर्यंत काम करतो.",
       "e": "I work from nine to five.",
       "h": [
        "पासून",
        "पर्यंत"
       ]
      },
      {
       "t": "मी स्टेशनपासून चालत आलो.",
       "e": "I walked here from the station.",
       "h": [
        "पासून"
       ]
      }
     ]
    },
    "en": {
     "form": "from … to / until",
     "note": "Prepositions before the noun.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I work from nine to five.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "possessive_no",
   "sort": 10,
   "group": "Particles",
   "title": "Possession: の",
   "summary": "'My book', 'the teacher's car'.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "close",
    "ja-mr": "partial",
    "my-zh": "close",
    "my-mr": "partial",
    "zh-mr": "partial",
    "ja-en": "close",
    "my-en": "close",
    "zh-en": "close",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-mr": "Marathi चा / ची / चे changes with the gender of the thing owned; の never changes.",
    "ja-zh": "Close, but Chinese drops 的 for family and close ties: 我妈妈, not usually 我的妈妈."
   },
   "entries": {
    "ja": {
     "form": "の",
     "note": "Between owner and thing. Also for kinds: 日本の車.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "先生の本",
       "e": "the teacher's book",
       "h": [
        "の"
       ],
       "r": "せんせい の ほん",
       "dev": "सेंसेइ नो हों"
      },
      {
       "t": "日本の車",
       "e": "a Japanese car",
       "h": [
        "の"
       ],
       "r": "にほん の くるま",
       "dev": "निहों नो कुरुमा"
      }
     ]
    },
    "my": {
     "form": "ရဲ့ (tone change for 'my, your')",
     "note": "ရဲ့ after the owner. For pronouns the tone changes instead: ကျွန်တော် → ကျွန်တော့်.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ဆရာရဲ့ စာအုပ်",
       "e": "the teacher's book",
       "h": [
        "ရဲ့"
       ],
       "dev": "सयायै साओʼ"
      },
      {
       "t": "ကျွန်တော့် စာအုပ်",
       "e": "my book (creaky tone ့ instead of ရဲ့)",
       "h": [
        "ကျွန်တော့်"
       ],
       "dev": "च्वंतो् साओʼ"
      }
     ]
    },
    "zh": {
     "form": "的",
     "note": "Between owner and thing; left out for family and close ties.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "老师的书",
       "e": "the teacher's book",
       "h": [
        "的"
       ],
       "r": "lǎoshī de shū",
       "dev": "लावˇषि- द षु-"
      },
      {
       "t": "我妈妈",
       "e": "my mother (no 的)",
       "h": [
        "我"
       ],
       "r": "wǒ māma",
       "dev": "वोˇ मा-मा"
      }
     ]
    },
    "mr": {
     "form": "-चा / -ची / -चे",
     "note": "The ending agrees with the gender and number of the thing owned.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "शिक्षकांचं पुस्तक",
       "e": "the teacher's book",
       "h": [
        "चं"
       ]
      },
      {
       "t": "माझी गाडी",
       "e": "my car (गाडी is feminine, so माझी)",
       "h": [
        "माझी"
       ]
      }
     ]
    },
    "en": {
     "form": "'s / of",
     "note": "Fixed form.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "the teacher's book",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "with_to",
   "sort": 11,
   "group": "Particles",
   "title": "And / with: と",
   "summary": "Japanese と means both 'and' (between nouns) and 'with'. Burmese and Chinese do the same; Marathi and English split it.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "close",
    "ja-mr": "partial",
    "my-zh": "close",
    "my-mr": "partial",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "partial",
    "mr-en": "close"
   },
   "pairNotes": {
    "ja-zh": "和 / 跟 cover both meanings, but 'with someone' goes before the verb, often with 一起."
   },
   "entries": {
    "ja": {
     "form": "と",
     "note": "'A と B' = A and B. 'person と' = with a person.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "パンと卵を買った。",
       "e": "I bought bread and eggs.",
       "h": [
        "と"
       ],
       "r": "ぱん と たまご お かった",
       "dev": "पां तो तामागो ओ कात्ता"
      },
      {
       "t": "友達と映画を見た。",
       "e": "I watched a film with a friend.",
       "h": [
        "と"
       ],
       "r": "ともだち と えいが お みた",
       "dev": "तोमोदाचि तो एइगा ओ मिता"
      }
     ]
    },
    "my": {
     "form": "နဲ့",
     "note": "Same double job as と.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ပေါင်မုန့်နဲ့ ကြက်ဥ ဝယ်ခဲ့တယ်။",
       "e": "I bought bread and eggs.",
       "h": [
        "နဲ့"
       ],
       "dev": "पाउंमोंनै चेʼउ वैखैदे"
      },
      {
       "t": "သူငယ်ချင်းနဲ့ ရုပ်ရှင် ကြည့်ခဲ့တယ်။",
       "e": "I watched a film with a friend.",
       "h": [
        "နဲ့"
       ],
       "dev": "थूङैछिंनै योʼशिं चीखैदे"
      }
     ]
    },
    "zh": {
     "form": "和 / 跟 (… 一起)",
     "note": "Both mean 'and' and 'with'. 'With' sits before the verb.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我买了面包和鸡蛋。",
       "e": "I bought bread and eggs.",
       "h": [
        "和"
       ],
       "r": "wǒ mǎi le miànbāo hé jīdàn",
       "dev": "वोˇ मायˇ ल म्येन`बाव- ह´ जि-दान`"
      },
      {
       "t": "我跟朋友一起看了电影。",
       "e": "I watched a film with a friend.",
       "h": [
        "跟"
       ],
       "r": "wǒ gēn péngyou yìqǐ kàn le diànyǐng",
       "dev": "वोˇ गन्- फ्फंग´योउ इ`छिˇ खान` ल द्येन`यंगˇ"
      }
     ]
    },
    "mr": {
     "form": "आणि / -बरोबर",
     "note": "Two different words: आणि for 'and', -बरोबर (or सोबत) for 'with'.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मी पाव आणि अंडी घेतली.",
       "e": "I bought bread and eggs.",
       "h": [
        "आणि"
       ]
      },
      {
       "t": "मी मित्राबरोबर सिनेमा पाहिला.",
       "e": "I watched a film with a friend.",
       "h": [
        "बरोबर"
       ]
      }
     ]
    },
    "en": {
     "form": "and / with",
     "note": "Two different words.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I bought bread and eggs.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "yes_no_ka",
   "sort": 12,
   "group": "Questions and endings",
   "title": "Yes/no question: か",
   "summary": "Add a particle at the end. All four Asian languages do this; English changes the word order instead.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "close",
    "ja-mr": "close",
    "my-zh": "close",
    "my-mr": "close",
    "zh-mr": "close",
    "ja-en": "none",
    "my-en": "none",
    "zh-en": "none",
    "mr-en": "none"
   },
   "pairNotes": {
    "ja-my": "Close, but Burmese လား is only for yes/no. Questions with 'what, where' need လဲ (see next concept)."
   },
   "entries": {
    "ja": {
     "form": "か",
     "note": "At the very end. In casual speech, rising tone alone.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "学生ですか。",
       "e": "Are you a student?",
       "h": [
        "か"
       ],
       "r": "がくせい です か",
       "dev": "गाकुसेइ देसु का"
      },
      {
       "t": "コーヒーを飲みますか。",
       "e": "Do you drink coffee?",
       "h": [
        "か"
       ],
       "r": "こーひー お のみます か",
       "dev": "कोही ओ नोमिमासु का"
      }
     ]
    },
    "my": {
     "form": "လား",
     "note": "Replaces or follows the ending: မယ် → မလား, တယ် → သလား.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ကျောင်းသားလား။",
       "e": "Are you a student?",
       "h": [
        "လား"
       ],
       "dev": "चाउंथाला"
      },
      {
       "t": "ကော်ဖီ သောက်မလား။",
       "e": "Will you have coffee?",
       "h": [
        "လား"
       ],
       "dev": "कोफी थाउʼमला"
      }
     ]
    },
    "zh": {
     "form": "吗",
     "note": "At the end of a normal statement.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "你是学生吗？",
       "e": "Are you a student?",
       "h": [
        "吗"
       ],
       "r": "nǐ shì xuésheng ma",
       "dev": "निˇ षि` शुए´षंग मा"
      },
      {
       "t": "你喝咖啡吗？",
       "e": "Do you drink coffee?",
       "h": [
        "吗"
       ],
       "r": "nǐ hē kāfēi ma",
       "dev": "निˇ ह- खा-फै- मा"
      }
     ]
    },
    "mr": {
     "form": "का",
     "note": "At the end (or the start) of a normal statement.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "तू विद्यार्थी आहेस का?",
       "e": "Are you a student?",
       "h": [
        "का"
       ]
      },
      {
       "t": "तू कॉफी घेणार का?",
       "e": "Will you have coffee?",
       "h": [
        "का"
       ]
      }
     ]
    },
    "en": {
     "form": "— (swap verb and subject)",
     "note": "No particle; 'You are' becomes 'Are you'.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "Are you a student?",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "wh_question",
   "sort": 13,
   "group": "Questions and endings",
   "title": "Question words: 何・どこ",
   "summary": "The question word stays where the answer would go. What happens at the end differs.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "partial",
    "ja-mr": "partial",
    "my-zh": "partial",
    "my-mr": "partial",
    "zh-mr": "close",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "partial",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-my": "Japanese uses か for both kinds of question. Burmese has two endings: လား (yes/no) and လဲ (with a question word).",
    "ja-zh": "Never add 吗 to a 什么 question; with 吗 it means 'something'."
   },
   "entries": {
    "ja": {
     "form": "question word + か",
     "note": "Same か as yes/no questions.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "何を食べますか。",
       "e": "What will you eat?",
       "h": [
        "何",
        "か"
       ],
       "r": "なに お たべます か",
       "dev": "नानि ओ ताबेमासु का"
      },
      {
       "t": "どこへ行きますか。",
       "e": "Where are you going?",
       "h": [
        "どこ",
        "か"
       ],
       "r": "どこ え いきます か",
       "dev": "दोको ए इकिमासु का"
      }
     ]
    },
    "my": {
     "form": "question word + လဲ",
     "note": "လဲ, not လား, when there is a question word.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ဘာ စားမလဲ။",
       "e": "What will you eat?",
       "h": [
        "ဘာ",
        "လဲ"
       ],
       "dev": "भा सामले"
      },
      {
       "t": "ဘယ်ကို သွားမလဲ။",
       "e": "Where are you going?",
       "h": [
        "ဘယ်",
        "လဲ"
       ],
       "dev": "भैको थ्वामले"
      }
     ]
    },
    "zh": {
     "form": "question word, no 吗",
     "note": "The question word alone makes it a question.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "你吃什么？",
       "e": "What will you eat?",
       "h": [
        "什么"
       ],
       "r": "nǐ chī shénme",
       "dev": "निˇ छ्षि- षन्´म"
      },
      {
       "t": "你去哪儿？",
       "e": "Where are you going?",
       "h": [
        "哪儿"
       ],
       "r": "nǐ qù nǎr",
       "dev": "निˇ छु` नाˇr"
      }
     ]
    },
    "mr": {
     "form": "question word, no का",
     "note": "Like Chinese: no particle when there is a question word.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "तू काय खाणार?",
       "e": "What will you eat?",
       "h": [
        "काय"
       ]
      },
      {
       "t": "तू कुठे जातोस?",
       "e": "Where are you going?",
       "h": [
        "कुठे"
       ]
      }
     ]
    },
    "en": {
     "form": "question word moves to the front",
     "note": "Plus do / are before the subject.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "What will you eat?",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "tag_ne",
   "sort": 14,
   "group": "Questions and endings",
   "title": "'…, right?': ね",
   "summary": "A small word at the end that asks the listener to agree.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "partial",
    "ja-mr": "close",
    "my-zh": "partial",
    "my-mr": "close",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "partial",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-my": "ね ≈ နော်. Japanese よ ('I'm telling you') has no single Burmese word.",
    "ja-mr": "ね ≈ ना, at the end of the sentence."
   },
   "entries": {
    "ja": {
     "form": "ね (agree?) / よ (I tell you)",
     "note": "ね checks agreement; よ gives new information.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "今日は暑いですね。",
       "e": "It's hot today, isn't it?",
       "h": [
        "ね"
       ],
       "r": "きょう わ あつい です ね",
       "dev": "क्यो वा आत्सुइ देसु ने"
      },
      {
       "t": "もう時間ですよ。",
       "e": "It's time already, you know.",
       "h": [
        "よ"
       ],
       "r": "もう じかん です よ",
       "dev": "मो जिकां देसु यो"
      }
     ]
    },
    "my": {
     "form": "နော်",
     "note": "At the end: 'right?', 'OK?'.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ဒီနေ့ ပူတယ် နော်။",
       "e": "It's hot today, isn't it?",
       "h": [
        "နော်"
       ],
       "dev": "दीने पूदे नो"
      },
      {
       "t": "မနက်ဖြန် လာခဲ့ နော်။",
       "e": "Come tomorrow, OK?",
       "h": [
        "နော်"
       ],
       "dev": "मनेʼफ्यं लाखै नो"
      }
     ]
    },
    "zh": {
     "form": "吧 / 啊",
     "note": "吧 = 'I suppose, right?'; 啊 softens. Neither is an exact ね.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "你是日本人吧？",
       "e": "You're Japanese, right?",
       "h": [
        "吧"
       ],
       "r": "nǐ shì Rìběnrén ba",
       "dev": "निˇ षि` रि`बन्ˇरन्´ बा"
      },
      {
       "t": "今天很热啊。",
       "e": "It's really hot today.",
       "h": [
        "啊"
       ],
       "r": "jīntiān hěn rè a",
       "dev": "जिन-थ्येन- हन्ˇ र` आ"
      }
     ]
    },
    "mr": {
     "form": "ना",
     "note": "At the end: 'right?', or 'do…' in a request.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "आज खूप गरम आहे ना?",
       "e": "It's very hot today, isn't it?",
       "h": [
        "ना"
       ]
      },
      {
       "t": "उद्या ये ना.",
       "e": "Do come tomorrow.",
       "h": [
        "ना"
       ]
      }
     ]
    },
    "en": {
     "form": "…, isn't it? / right?",
     "note": "A tag question that copies the verb.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "It's hot today, isn't it?",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "past",
   "sort": 15,
   "group": "Tense and aspect",
   "title": "Past: た・ました",
   "summary": "Japanese and Marathi have a real past tense. Burmese marks it lightly, and Chinese 了 is not a past tense.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "partial",
    "ja-mr": "close",
    "my-zh": "partial",
    "my-mr": "partial",
    "zh-mr": "partial",
    "ja-en": "close",
    "my-en": "partial",
    "zh-en": "partial",
    "mr-en": "close"
   },
   "pairNotes": {
    "ja-zh": "False match: 了 means 'completed', not 'past'. 他昨天很忙 is past with no 了, and 了 can appear in future plans.",
    "ja-my": "Burmese တယ် covers past and present; ခဲ့ adds 'past' only when needed.",
    "ja-mr": "Both are true past tenses; Marathi also agrees with gender (and, for transitive verbs, with the object)."
   },
   "entries": {
    "ja": {
     "form": "た / ました",
     "note": "Always marked. Also used for 'already done'.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "昨日映画を見ました。",
       "e": "I watched a film yesterday.",
       "h": [
        "ました"
       ],
       "r": "きのう えいが お みました",
       "dev": "किनो एइगा ओ मिमाशिता"
      },
      {
       "t": "もう食べた。",
       "e": "I've already eaten.",
       "h": [
        "食べた"
       ],
       "r": "もう たべた",
       "dev": "मो ताबेता"
      }
     ]
    },
    "my": {
     "form": "(ခဲ့) တယ် / ပြီ",
     "note": "တယ် = real, not future (past or present). ခဲ့ makes it clearly past. ပြီ = already / now.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "မနေ့က ရုပ်ရှင် ကြည့်ခဲ့တယ်။",
       "e": "I watched a film yesterday.",
       "h": [
        "ခဲ့"
       ],
       "dev": "मनेक योʼशिं चीखैदे"
      },
      {
       "t": "စားပြီးပြီ။",
       "e": "I've already eaten.",
       "h": [
        "ပြီးပြီ"
       ],
       "dev": "साप्यीप्यी"
      }
     ]
    },
    "zh": {
     "form": "了 (completed) / time word",
     "note": "No tense. A time word sets the time; 了 marks a finished action.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我昨天看了电影。",
       "e": "I watched a film yesterday.",
       "h": [
        "了"
       ],
       "r": "wǒ zuótiān kàn le diànyǐng",
       "dev": "वोˇ ज़्वॉ´थ्येन- खान` ल द्येन`यंगˇ"
      },
      {
       "t": "我已经吃了。",
       "e": "I've already eaten.",
       "h": [
        "已经"
       ],
       "r": "wǒ yǐjīng chī le",
       "dev": "वोˇ इˇजियंग- छ्षि- ल"
      }
     ]
    },
    "mr": {
     "form": "past tense (-ला / -ली / -लं)",
     "note": "Real past tense; the ending agrees in gender and number.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मी काल सिनेमा पाहिला.",
       "e": "I watched a film yesterday. (agrees with सिनेमा)",
       "h": [
        "पाहिला"
       ]
      },
      {
       "t": "मी जेवलो.",
       "e": "I ate. (male)",
       "h": [
        "जेवलो"
       ]
      }
     ]
    },
    "en": {
     "form": "-ed / irregular past",
     "note": "Real past tense.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I watched a film yesterday.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "progressive",
   "sort": 16,
   "group": "Tense and aspect",
   "title": "Ongoing action / state: ている",
   "summary": "ている means both 'is doing' and 'is in a state'. The others split these two.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "partial",
    "ja-mr": "partial",
    "my-zh": "close",
    "my-mr": "partial",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "close",
    "zh-en": "close",
    "mr-en": "close"
   },
   "pairNotes": {
    "ja-my": "ている splits in two: နေ (in progress) and ထား (state left after an action).",
    "my-zh": "Neat pair: နေ ≈ 在 / 正在 (in progress), ထား ≈ 着 (state)."
   },
   "entries": {
    "ja": {
     "form": "て + いる",
     "note": "Action in progress, or the state after a change (窓が開いている = the window is open).",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "今雨が降っている。",
       "e": "It's raining now.",
       "h": [
        "ている"
       ],
       "r": "いま あめ が ふって いる",
       "dev": "इमा आमे गा फुत्ते इरु"
      },
      {
       "t": "窓が開いている。",
       "e": "The window is open.",
       "h": [
        "ている"
       ],
       "r": "まど が あいて いる",
       "dev": "मादो गा आइते इरु"
      }
     ]
    },
    "my": {
     "form": "နေ (doing) / ထား (state)",
     "note": "Two forms. နေ for in progress; ထား for a state someone left.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "အခု မိုး ရွာနေတယ်။",
       "e": "It's raining now.",
       "h": [
        "နေ"
       ],
       "dev": "अखु मो य्वानेदे"
      },
      {
       "t": "ပြတင်းပေါက် ဖွင့်ထားတယ်။",
       "e": "The window is (left) open.",
       "h": [
        "ထား"
       ],
       "dev": "प्यतिंपाउʼ फ्विंथादे"
      }
     ]
    },
    "zh": {
     "form": "正在 / 在 (doing) / 着 (state)",
     "note": "正在 before the verb for in progress; 着 after the verb for a lasting state.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "外面正在下雨。",
       "e": "It's raining outside.",
       "h": [
        "正在"
       ],
       "r": "wàimiàn zhèngzài xià yǔ",
       "dev": "वाय`म्येन` ज्षंग`ज़ाय` श्या` युˇ"
      },
      {
       "t": "窗户开着。",
       "e": "The window is open.",
       "h": [
        "着"
       ],
       "r": "chuānghu kāi zhe",
       "dev": "छ्षुआंग-हु खाय- ज्ष"
      }
     ]
    },
    "mr": {
     "form": "-त आहे (doing) / adjective (state)",
     "note": "Present continuous for in progress; a state is said with an adjective.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "बाहेर पाऊस पडतो आहे.",
       "e": "It's raining outside.",
       "h": [
        "पडतो आहे"
       ]
      },
      {
       "t": "खिडकी उघडी आहे.",
       "e": "The window is open.",
       "h": [
        "उघडी"
       ]
      }
     ]
    },
    "en": {
     "form": "be + -ing",
     "note": "Only in progress; a state uses an adjective (open).",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "It's raining now.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "future",
   "sort": 17,
   "group": "Tense and aspect",
   "title": "Future / plans",
   "summary": "Japanese and Chinese have no future tense; Burmese and Marathi do.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "close",
    "ja-mr": "partial",
    "my-zh": "partial",
    "my-mr": "close",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "close",
    "zh-en": "partial",
    "mr-en": "close"
   },
   "pairNotes": {
    "ja-my": "Japanese uses the ordinary non-past form for the future. Burmese changes the ending: တယ် → မယ်.",
    "ja-zh": "Both just add a time word (明日 / 明天). Plans: つもり ≈ 打算."
   },
   "entries": {
    "ja": {
     "form": "non-past (る / ます) / つもり",
     "note": "No future tense. The time word does the work; つもり = intend to.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "明日行きます。",
       "e": "I'll go tomorrow.",
       "h": [
        "明日"
       ],
       "r": "あした いきます",
       "dev": "आशिता इकिमासु"
      },
      {
       "t": "来年日本語を勉強するつもりです。",
       "e": "I plan to study Japanese next year.",
       "h": [
        "つもり"
       ],
       "r": "らいねん にほんご お べんきょう する つもり です",
       "dev": "राइनें निहोंगो ओ बेंक्यो सुरु त्सुमोरि देसु"
      }
     ]
    },
    "my": {
     "form": "မယ်",
     "note": "Future ending, replacing တယ်.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "မနက်ဖြန် သွားမယ်။",
       "e": "I'll go tomorrow.",
       "h": [
        "မယ်"
       ],
       "dev": "मनेʼफ्यं थ्वामै"
      },
      {
       "t": "နောက်နှစ် ဂျပန်စာ သင်မယ်။",
       "e": "I'll study Japanese next year.",
       "h": [
        "မယ်"
       ],
       "dev": "नाउʼह्निʼ जपंसा थिंमै"
      }
     ]
    },
    "zh": {
     "form": "time word / 要 / 打算",
     "note": "No tense; 要 = going to, 打算 = plan to.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我明天去。",
       "e": "I'll go tomorrow.",
       "h": [
        "明天"
       ],
       "r": "wǒ míngtiān qù",
       "dev": "वोˇ मियंग´थ्येन- छु`"
      },
      {
       "t": "明年我打算学日语。",
       "e": "I plan to study Japanese next year.",
       "h": [
        "打算"
       ],
       "r": "míngnián wǒ dǎsuàn xué Rìyǔ",
       "dev": "मियंग´न्येन´ वोˇ दाˇस्वान` शुए´ रि`युˇ"
      }
     ]
    },
    "mr": {
     "form": "future tense (-ईन) / -णार आहे",
     "note": "Real future endings; -णार आहे = going to.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मी उद्या जाईन.",
       "e": "I'll go tomorrow.",
       "h": [
        "जाईन"
       ]
      },
      {
       "t": "पुढच्या वर्षी मी जपानी शिकणार आहे.",
       "e": "I'm going to study Japanese next year.",
       "h": [
        "शिकणार"
       ]
      }
     ]
    },
    "en": {
     "form": "will / going to",
     "note": "Helper verbs.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I'll go tomorrow.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "experience",
   "sort": 18,
   "group": "Tense and aspect",
   "title": "Have done before: たことがある",
   "summary": "'I have climbed Fuji.' Japanese, Burmese and Chinese each have one fixed form; Marathi has none.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "close",
    "ja-mr": "none",
    "my-zh": "close",
    "my-mr": "none",
    "zh-mr": "none",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "partial",
    "mr-en": "close"
   },
   "pairNotes": {
    "my-zh": "ဖူး and 过 sit in the same place, right after the verb.",
    "ja-mr": "No dedicated form in Marathi; use the perfect tense, often with कधी ('ever')."
   },
   "entries": {
    "ja": {
     "form": "た + ことがある",
     "note": "Past form + ことがある / ことがない.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "富士山に登ったことがあります。",
       "e": "I have climbed Mt Fuji.",
       "h": [
        "ことがあります"
       ],
       "r": "ふじさん に のぼった こと が あります",
       "dev": "फुजिसां नि नोबोत्ता कोतो गा आरिमासु"
      },
      {
       "t": "寿司を食べたことがない。",
       "e": "I have never eaten sushi.",
       "h": [
        "ことがない"
       ],
       "r": "すし お たべた こと が ない",
       "dev": "सुशि ओ ताबेता कोतो गा नाइ"
      }
     ]
    },
    "my": {
     "form": "ဖူး",
     "note": "Right after the verb.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ဖူဂျီတောင် တက်ဖူးတယ်။",
       "e": "I have climbed Mt Fuji.",
       "h": [
        "ဖူး"
       ],
       "dev": "फूजीताउं तेʼफूदे"
      },
      {
       "t": "ဆူရှီ မစားဖူးဘူး။",
       "e": "I have never eaten sushi.",
       "h": [
        "ဖူး"
       ],
       "dev": "सूशी मसाफूबू"
      }
     ]
    },
    "zh": {
     "form": "过",
     "note": "Right after the verb; negative uses 没.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我爬过富士山。",
       "e": "I have climbed Mt Fuji.",
       "h": [
        "过"
       ],
       "r": "wǒ pá guo Fùshì Shān",
       "dev": "वोˇ फ्फा´ ग्वॉ फु`षि` षान-"
      },
      {
       "t": "我没吃过寿司。",
       "e": "I have never eaten sushi.",
       "h": [
        "过"
       ],
       "r": "wǒ méi chī guo shòusī",
       "dev": "वोˇ मै´ छ्षि- ग्वॉ षोउ`सु-"
      }
     ]
    },
    "mr": {
     "form": "— (perfect tense + कधी)",
     "note": "No special form. The perfect tense, with कधी / कधीच for 'ever / never'.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "मी फुजी पर्वत चढलो आहे.",
       "e": "I have climbed Mt Fuji.",
       "h": [
        "चढलो आहे"
       ]
      },
      {
       "t": "मी कधीच सुशी खाल्ली नाही.",
       "e": "I have never eaten sushi.",
       "h": [
        "कधीच"
       ]
      }
     ]
    },
    "en": {
     "form": "have + past participle",
     "note": "Present perfect, often with 'ever / never'.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I have climbed Mt Fuji.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "want_tai",
   "sort": 19,
   "group": "Mood",
   "title": "Want to: たい",
   "summary": "Japanese and Burmese add an ending to the verb; Chinese puts a word before it.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "partial",
    "ja-mr": "partial",
    "my-zh": "partial",
    "my-mr": "partial",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "close",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-my": "Same slot: verb + たい, verb + ချင်.",
    "ja-mr": "Marathi says 'to me it is to-go': मला जायचं आहे. The person wanting takes ला."
   },
   "entries": {
    "ja": {
     "form": "verb stem + たい",
     "note": "Then behaves like an adjective (たかった, たくない).",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "水が飲みたい。",
       "e": "I want to drink water.",
       "h": [
        "たい"
       ],
       "r": "みず が のみたい",
       "dev": "मिज़ु गा नोमिताइ"
      },
      {
       "t": "日本へ行きたいです。",
       "e": "I want to go to Japan.",
       "h": [
        "たい"
       ],
       "r": "にほん え いきたい です",
       "dev": "निहों ए इकिताइ देसु"
      }
     ]
    },
    "my": {
     "form": "verb + ချင်",
     "note": "Then the normal ending: ချင်တယ်.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ရေ သောက်ချင်တယ်။",
       "e": "I want to drink water.",
       "h": [
        "ချင်"
       ],
       "dev": "ये थाउʼछिंदे"
      },
      {
       "t": "ဂျပန်ကို သွားချင်တယ်။",
       "e": "I want to go to Japan.",
       "h": [
        "ချင်"
       ],
       "dev": "जपंको थ्वाछिंदे"
      }
     ]
    },
    "zh": {
     "form": "想 + verb",
     "note": "Before the verb, like English 'want to'.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我想喝水。",
       "e": "I want to drink water.",
       "h": [
        "想"
       ],
       "r": "wǒ xiǎng hē shuǐ",
       "dev": "वोˇ श्यांगˇ ह- ष्वैˇ"
      },
      {
       "t": "我想去日本。",
       "e": "I want to go to Japan.",
       "h": [
        "想"
       ],
       "r": "wǒ xiǎng qù Rìběn",
       "dev": "वोˇ श्यांगˇ छु` रि`बन्ˇ"
      }
     ]
    },
    "mr": {
     "form": "मला + verb-ायचं + आहे",
     "note": "The person wanting takes ला; the verb becomes -ायचं.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मला पाणी प्यायचं आहे.",
       "e": "I want to drink water.",
       "h": [
        "प्यायचं"
       ]
      },
      {
       "t": "मला जपानला जायचं आहे.",
       "e": "I want to go to Japan.",
       "h": [
        "जायचं"
       ]
      }
     ]
    },
    "en": {
     "form": "want to + verb",
     "note": "Before the verb.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I want to drink water.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "ability",
   "sort": 20,
   "group": "Mood",
   "title": "Can: できる・potential form",
   "summary": "Japanese has one 'can'. Burmese, Chinese and Marathi split 'know how to' from 'be able to'.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "partial",
    "ja-mr": "partial",
    "my-zh": "close",
    "my-mr": "close",
    "zh-mr": "close",
    "ja-en": "close",
    "my-en": "partial",
    "zh-en": "partial",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-my": "Japanese uses one potential form. Burmese makes you choose: တတ် (learned skill) or နိုင် (possible).",
    "my-zh": "တတ် ≈ 会 (learned skill), နိုင် ≈ 能 (able). Chinese adds 可以 for 'allowed'.",
    "my-mr": "တတ် ≈ येणे (मला पोहता येतं), နိုင် ≈ शकणे."
   },
   "entries": {
    "ja": {
     "form": "potential form / できる",
     "note": "One form for skill, possibility and permission.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "泳げます。",
       "e": "I can swim.",
       "h": [
        "泳げます"
       ],
       "r": "およげます",
       "dev": "ओयोगेमासु"
      },
      {
       "t": "明日は来られません。",
       "e": "I can't come tomorrow.",
       "h": [
        "来られません"
       ],
       "r": "あした わ こられません",
       "dev": "आशिता वा कोरारेमासें"
      }
     ]
    },
    "my": {
     "form": "တတ် (skill) / နိုင် (able)",
     "note": "Pick by meaning.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ရေ ကူးတတ်တယ်။",
       "e": "I can swim. (I know how)",
       "h": [
        "တတ်"
       ],
       "dev": "ये कूतʼदे"
      },
      {
       "t": "မနက်ဖြန် မလာနိုင်ဘူး။",
       "e": "I can't come tomorrow.",
       "h": [
        "နိုင်"
       ],
       "dev": "मनेʼफ्यं मलानाइंबू"
      }
     ]
    },
    "zh": {
     "form": "会 (skill) / 能 (able) / 可以 (allowed)",
     "note": "Three words, before the verb.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我会游泳。",
       "e": "I can swim. (I know how)",
       "h": [
        "会"
       ],
       "r": "wǒ huì yóuyǒng",
       "dev": "वोˇ ह्वै` योउ´योंगˇ"
      },
      {
       "t": "我明天不能来。",
       "e": "I can't come tomorrow.",
       "h": [
        "能"
       ],
       "r": "wǒ míngtiān bù néng lái",
       "dev": "वोˇ मियंग´थ्येन- बु` नंग´ लाय´"
      }
     ]
    },
    "mr": {
     "form": "येणे (skill) / शकणे (able)",
     "note": "Skill: मला … येतं. Able: … शकतो.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मला पोहता येतं.",
       "e": "I can swim. (I know how)",
       "h": [
        "येतं"
       ]
      },
      {
       "t": "मी उद्या येऊ शकणार नाही.",
       "e": "I won't be able to come tomorrow.",
       "h": [
        "शकणार"
       ]
      }
     ]
    },
    "en": {
     "form": "can",
     "note": "One word for all meanings, like Japanese.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I can swim.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "because",
   "sort": 21,
   "group": "Mood",
   "title": "Because: から・ので",
   "summary": "Reason first, then the result, with the 'because' word at the end of the reason.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "partial",
    "ja-mr": "close",
    "my-zh": "partial",
    "my-mr": "close",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "close",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-zh": "Chinese puts 因为 at the start of the reason and 所以 at the start of the result.",
    "ja-my": "Same place: reason + から, reason + လို့."
   },
   "entries": {
    "ja": {
     "form": "reason + から / ので",
     "note": "At the end of the reason clause. ので is softer.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "雨が降っているから行きません。",
       "e": "It's raining, so I'm not going.",
       "h": [
        "から"
       ],
       "r": "あめ が ふって いる から いきません",
       "dev": "आमे गा फुत्ते इरु कारा इकिमासें"
      },
      {
       "t": "疲れたので早く寝ました。",
       "e": "I was tired, so I went to bed early.",
       "h": [
        "ので"
       ],
       "r": "つかれた ので はやく ねました",
       "dev": "त्सुकारेता नोदे हायाकु नेमाशिता"
      }
     ]
    },
    "my": {
     "form": "reason + လို့ / ကြောင့်",
     "note": "At the end of the reason.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "မိုး ရွာနေလို့ မသွားဘူး။",
       "e": "It's raining, so I'm not going.",
       "h": [
        "လို့"
       ],
       "dev": "मो य्वानेलो मथ्वाबू"
      },
      {
       "t": "ပင်ပန်းလို့ စောစော အိပ်ခဲ့တယ်။",
       "e": "I was tired, so I went to bed early.",
       "h": [
        "လို့"
       ],
       "dev": "पिंपंलो सोसो एʼखैदे"
      }
     ]
    },
    "zh": {
     "form": "因为 … 所以 …",
     "note": "At the start of each clause; either can be dropped.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "因为下雨，所以我不去。",
       "e": "Because it's raining, I'm not going.",
       "h": [
        "因为",
        "所以"
       ],
       "r": "yīnwèi xià yǔ, suǒyǐ wǒ bú qù",
       "dev": "इन-वै` श्या` युˇ, स्वॉˇइˇ वोˇ बु´ छु`"
      },
      {
       "t": "我很累，所以早早睡了。",
       "e": "I was tired, so I went to bed early.",
       "h": [
        "所以"
       ],
       "r": "wǒ hěn lèi, suǒyǐ zǎozǎo shuì le",
       "dev": "वोˇ हन्ˇ लै`, स्वॉˇइˇ ज़ावˇज़ावˇ ष्वै` ल"
      }
     ]
    },
    "mr": {
     "form": "reason + म्हणून",
     "note": "At the end of the reason, like から. (कारण goes before the reason, like 'because'.)",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "पाऊस पडतोय म्हणून मी जाणार नाही.",
       "e": "It's raining, so I'm not going.",
       "h": [
        "म्हणून"
       ]
      },
      {
       "t": "मी थकलो होतो म्हणून लवकर झोपलो.",
       "e": "I was tired, so I went to bed early.",
       "h": [
        "म्हणून"
       ]
      }
     ]
    },
    "en": {
     "form": "because + reason / reason, so …",
     "note": "'Because' goes before the reason.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I'm not going because it's raining.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "politeness",
   "sort": 22,
   "group": "Politeness and negation",
   "title": "Polite endings: です・ます",
   "summary": "Japanese changes the verb ending for the listener. The others show respect in other ways.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "none",
    "ja-mr": "partial",
    "my-zh": "partial",
    "my-mr": "partial",
    "zh-mr": "partial",
    "ja-en": "none",
    "my-en": "partial",
    "zh-en": "close",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-zh": "Chinese verbs have no polite form. Politeness is in words: 您 (polite 'you'), 请 ('please').",
    "ja-my": "Burmese ပါ makes a sentence polite but is one small word, not a full set of endings. သည် is written style, not politeness.",
    "ja-mr": "Marathi shows respect with the plural 'you' (तुम्ही / आपण) and its verb form."
   },
   "entries": {
    "ja": {
     "form": "ます / です (polite) vs plain",
     "note": "The verb ending itself changes with who you talk to.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "行きます。",
       "e": "I'll go. (polite)",
       "h": [
        "ます"
       ],
       "r": "いきます",
       "dev": "इकिमासु"
      },
      {
       "t": "行く。",
       "e": "I'll go. (plain, to friends)",
       "h": [
        "行く"
       ],
       "r": "いく",
       "dev": "इकु"
      }
     ]
    },
    "my": {
     "form": "ပါ",
     "note": "ပါ before the ending, or after a command, makes it polite.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "သွားပါမယ်။",
       "e": "I'll go. (polite)",
       "h": [
        "ပါ"
       ],
       "dev": "थ्वाबामै"
      },
      {
       "t": "သွားမယ်။",
       "e": "I'll go. (plain)",
       "h": [
        "မယ်"
       ],
       "dev": "थ्वामै"
      },
      {
       "t": "ထိုင်ပါ။",
       "e": "Please sit.",
       "h": [
        "ပါ"
       ],
       "dev": "थाइंबा"
      }
     ]
    },
    "zh": {
     "form": "— (polite words: 您, 请)",
     "note": "No polite verb form. Use 您 instead of 你, and 请 for requests.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "您好。",
       "e": "Hello. (polite)",
       "h": [
        "您"
       ],
       "r": "nín hǎo",
       "dev": "निन´ हावˇ"
      },
      {
       "t": "请坐。",
       "e": "Please sit.",
       "h": [
        "请"
       ],
       "r": "qǐng zuò",
       "dev": "छियंगˇ ज़्वॉ`"
      }
     ]
    },
    "mr": {
     "form": "तुम्ही / आपण + plural verb",
     "note": "Respect comes from the plural 'you', which changes the verb ending.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "तुम्ही कुठे जाता?",
       "e": "Where are you going? (polite)",
       "h": [
        "जाता"
       ]
      },
      {
       "t": "तू कुठे जातोस?",
       "e": "Where are you going? (to a friend)",
       "h": [
        "जातोस"
       ]
      }
     ]
    },
    "en": {
     "form": "— (please / could you)",
     "note": "No polite grammar; only words and tone.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "Could you sit down, please?",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "negation",
   "sort": 23,
   "group": "Politeness and negation",
   "title": "Not: ない・ません",
   "summary": "Where 'not' goes: after the verb, before it, or around it.",
   "levels": {
    "ja-my": "partial",
    "ja-zh": "partial",
    "ja-mr": "close",
    "my-zh": "partial",
    "my-mr": "partial",
    "zh-mr": "partial",
    "ja-en": "partial",
    "my-en": "partial",
    "zh-en": "partial",
    "mr-en": "partial"
   },
   "pairNotes": {
    "ja-my": "Japanese adds an ending; Burmese wraps the verb: မ + verb + ဘူး.",
    "ja-zh": "Chinese puts 不 or 没 before the verb, and picks one by meaning: 没 = didn't / haven't.",
    "ja-mr": "Both put 'not' after the verb: 食べない, खात नाही."
   },
   "entries": {
    "ja": {
     "form": "ない / ません (after the verb)",
     "note": "An ending on the verb.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "肉を食べません。",
       "e": "I don't eat meat.",
       "h": [
        "ません"
       ],
       "r": "にく お たべません",
       "dev": "निकु ओ ताबेमासें"
      },
      {
       "t": "行かない。",
       "e": "I won't go.",
       "h": [
        "ない"
       ],
       "r": "いかない",
       "dev": "इकानाइ"
      }
     ]
    },
    "my": {
     "form": "မ + verb + ဘူး",
     "note": "Around the verb. The ending တယ် / မယ် disappears.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "အသား မစားဘူး။",
       "e": "I don't eat meat.",
       "h": [
        "မ",
        "ဘူး"
       ],
       "dev": "अथा मसाबू"
      },
      {
       "t": "မသွားဘူး။",
       "e": "I won't go.",
       "h": [
        "မ",
        "ဘူး"
       ],
       "dev": "मथ्वाबू"
      }
     ]
    },
    "zh": {
     "form": "不 / 没 + verb",
     "note": "Before the verb. 不 = don't / won't; 没 = didn't / haven't.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "我不吃肉。",
       "e": "I don't eat meat.",
       "h": [
        "不"
       ],
       "r": "wǒ bù chī ròu",
       "dev": "वोˇ बु` छ्षि- रोउ`"
      },
      {
       "t": "我昨天没去。",
       "e": "I didn't go yesterday.",
       "h": [
        "没"
       ],
       "r": "wǒ zuótiān méi qù",
       "dev": "वोˇ ज़्वॉ´थ्येन- मै´ छु`"
      }
     ]
    },
    "mr": {
     "form": "verb + नाही",
     "note": "After the verb, like Japanese.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "मी मांस खात नाही.",
       "e": "I don't eat meat.",
       "h": [
        "नाही"
       ]
      },
      {
       "t": "मी काल गेलो नाही.",
       "e": "I didn't go yesterday.",
       "h": [
        "नाही"
       ]
      }
     ]
    },
    "en": {
     "form": "do not / not",
     "note": "Before the verb, with 'do'.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "I don't eat meat.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  },
  {
   "id": "counters",
   "sort": 24,
   "group": "Counting",
   "title": "Counters: 本・枚・匹",
   "summary": "A counting word chosen by the thing's shape or kind. Burmese is the closest match, even in word order.",
   "levels": {
    "ja-my": "close",
    "ja-zh": "partial",
    "ja-mr": "none",
    "my-zh": "partial",
    "my-mr": "none",
    "zh-mr": "none",
    "ja-en": "none",
    "my-en": "none",
    "zh-en": "none",
    "mr-en": "close"
   },
   "pairNotes": {
    "ja-my": "Same idea and same order: noun + number + counter (ペン三本 / ခဲတံ သုံးချောင်း). Long, flat, animal counters line up too.",
    "ja-zh": "Chinese puts number + counter before the noun: 三支笔.",
    "ja-mr": "Marathi just says the number; only people get a counter (जण)."
   },
   "entries": {
    "ja": {
     "form": "noun + number + counter",
     "note": "本 = long things, 枚 = flat things, 匹 = small animals.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ペンを三本ください。",
       "e": "Three pens, please.",
       "h": [
        "三本"
       ],
       "r": "ぺん お さんぼん ください",
       "dev": "पें ओ सांबों कुदासाइ"
      },
      {
       "t": "猫が二匹いる。",
       "e": "There are two cats.",
       "h": [
        "二匹"
       ],
       "r": "ねこ が にひき いる",
       "dev": "नेको गा निहिकि इरु"
      }
     ]
    },
    "my": {
     "form": "noun + number + counter",
     "note": "ချောင်း = long things, ချပ် = flat things, ကောင် = animals.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "ခဲတံ သုံးချောင်း ပေးပါ။",
       "e": "Three pencils, please.",
       "h": [
        "သုံးချောင်း"
       ],
       "dev": "खैतं थोंछाउं पेबा"
      },
      {
       "t": "ကြောင် နှစ်ကောင် ရှိတယ်။",
       "e": "There are two cats.",
       "h": [
        "နှစ်ကောင်"
       ],
       "dev": "चाउं ह्निʼकाउं शिदे"
      }
     ]
    },
    "zh": {
     "form": "number + counter + noun",
     "note": "支 = pens, 张 = flat things, 只 = animals. Counter is required.",
     "none": false,
     "checked": false,
     "ex": [
      {
       "t": "请给我三支笔。",
       "e": "Three pens, please.",
       "h": [
        "三支"
       ],
       "r": "qǐng gěi wǒ sān zhī bǐ",
       "dev": "छियंगˇ गैˇ वोˇ सान- ज्षि- बिˇ"
      },
      {
       "t": "有两只猫。",
       "e": "There are two cats.",
       "h": [
        "两只"
       ],
       "r": "yǒu liǎng zhī māo",
       "dev": "योउˇ ल्यांगˇ ज्षि- माव-"
      }
     ]
    },
    "mr": {
     "form": "— (number + noun; जण for people)",
     "note": "No counters for things. People can take जण.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "तीन पेन द्या.",
       "e": "Give me three pens.",
       "h": [
        "तीन"
       ]
      },
      {
       "t": "आम्ही चार जण आहोत.",
       "e": "There are four of us.",
       "h": [
        "जण"
       ]
      }
     ]
    },
    "en": {
     "form": "— (number + noun)",
     "note": "No counters, except phrases like 'two sheets of paper'.",
     "none": true,
     "checked": false,
     "ex": [
      {
       "t": "Three pens, please.",
       "e": "",
       "h": []
      }
     ]
    }
   }
  }
 ]
};

;
// Meaning translations, keyed by the exact source gloss; never align examples by row.
// Draft translations: not yet independently reviewed by a native speaker.
(function(root) {
  const mr = {
    'I eat an apple.':'मी सफरचंद खातो / खाते.',
    'My younger brother went to school.':'माझा धाकटा भाऊ शाळेत गेला.',
    'I eat an apple. (male speaker; a woman says ကျွန်မ)':'मी सफरचंद खातो / खाते.',
    'My younger brother goes to school.':'माझा धाकटा भाऊ शाळेत जातो.',
    'the book I bought yesterday':'मी काल विकत घेतलेलं पुस्तक',
    'a person who speaks Japanese':'जपानी बोलणारी व्यक्ती',
    'I am a student.':'मी विद्यार्थी आहे.',
    'Elephants have long trunks. (as for elephants, the trunk is long)':'हत्तींच्या सोंडा लांब असतात.',
    "As for me, I'll drink tea.":'मी तर चहा पिईन.',
    'Elephants have long trunks.':'हत्तींच्या सोंडा लांब असतात.',
    "This book, I've read it.":'हे पुस्तक मी वाचलं आहे.',
    'Who came?':'कोण आलं?',
    "It's raining. (rain is falling)":'पाऊस पडतो आहे.',
    "I'll do it. (me, not someone else)":'मीच ते करेन.',
    'Who said it?':'ते कोणी सांगितलं?',
    "It's raining. (rain comes after the verb)":'पाऊस पडतो आहे.',
    'I drink water.':'मी पाणी पितो / पिते.',
    'I read the newspaper every morning.':'मी रोज सकाळी वर्तमानपत्र वाचतो / वाचते.',
    'I drink water. (no marker)':'मी पाणी पितो / पिते.',
    'I love him / her.':'माझं त्याच्यावर / तिच्यावर प्रेम आहे.',
    "I've finished reading this book.":'माझं हे पुस्तक वाचून झालं आहे.',
    "I've finished reading the book.":'माझं पुस्तक वाचून झालं आहे.',
    'I study at the library.':'मी ग्रंथालयात अभ्यास करतो / करते.',
    'There is a cat in the library.':'ग्रंथालयात एक मांजर आहे.',
    "I'm going to Tokyo.":'मी टोकियोला जात आहे.',
    'I write a letter to a friend.':'मी मित्राला पत्र लिहितो / लिहिते.',
    "I'll go to Yangon.":'मी यांगूनला जाईन.',
    "I'm going too.":'मीही जात आहे.',
    'I eat both meat and fish.':'मी मांस आणि मासे दोन्ही खातो / खाते.',
    'I eat meat and I eat fish too.':'मी मांसही खातो / खाते आणि मासेही खातो / खाते.',
    'I work from nine to five.':'मी नऊपासून पाचपर्यंत काम करतो / करते.',
    'I walked here from the station.':'मी स्टेशनपासून इथे चालत आलो / आले.',
    "the teacher's book":'शिक्षकांचं पुस्तक',
    'a Japanese car':'जपानी गाडी',
    'my book (creaky tone ့ instead of ရဲ့)':'माझं पुस्तक',
    'my mother (no 的)':'माझी आई',
    'I bought bread and eggs.':'मी पाव आणि अंडी विकत घेतली.',
    'I watched a film with a friend.':'मी मित्राबरोबर सिनेमा पाहिला.',
    'Are you a student?':'तू विद्यार्थी आहेस का?',
    'Do you drink coffee?':'तू कॉफी पितोस / पितेस का?',
    'Will you have coffee?':'तू कॉफी घेणार का?',
    'What will you eat?':'तू काय खाणार?',
    'Where are you going?':'तू कुठे जात आहेस?',
    "It's hot today, isn't it?":'आज गरम आहे ना?',
    "It's time already, you know.":'वेळ झाली आहे बरं का!',
    'Come tomorrow, OK?':'उद्या ये, बरं का?',
    "You're Japanese, right?":'तू जपानी आहेस ना?',
    "It's really hot today.":'आज खूपच गरम आहे.',
    'I watched a film yesterday.':'मी काल सिनेमा पाहिला.',
    "I've already eaten.":'माझं आधीच जेवण झालं आहे.',
    "It's raining now.":'आता पाऊस पडतो आहे.',
    'The window is open.':'खिडकी उघडी आहे.',
    'The window is (left) open.':'खिडकी उघडी ठेवलेली आहे.',
    "It's raining outside.":'बाहेर पाऊस पडतो आहे.',
    "I'll go tomorrow.":'मी उद्या जाईन.',
    'I plan to study Japanese next year.':'पुढच्या वर्षी जपानी शिकायचा माझा बेत आहे.',
    "I'll study Japanese next year.":'मी पुढच्या वर्षी जपानी शिकेन.',
    'I have climbed Mt Fuji.':'मी फुजी पर्वत चढलो / चढले आहे.',
    'I have never eaten sushi.':'मी कधीच सुशी खाल्ली नाही.',
    'I want to drink water.':'मला पाणी प्यायचं आहे.',
    'I want to go to Japan.':'मला जपानला जायचं आहे.',
    'I can swim.':'मला पोहता येतं.',
    "I can't come tomorrow.":'मी उद्या येऊ शकणार नाही.',
    'I can swim. (I know how)':'मला पोहता येतं.',
    "It's raining, so I'm not going.":'पाऊस पडतोय म्हणून मी जाणार नाही.',
    'I was tired, so I went to bed early.':'मी थकलो होतो / थकले होते म्हणून लवकर झोपलो / झोपले.',
    "Because it's raining, I'm not going.":'पाऊस पडतोय म्हणून मी जाणार नाही.',
    "I'll go. (polite)":'मी जाईन. (नम्रपणे)',
    "I'll go. (plain, to friends)":'मी जाईन. (मित्रांशी बोलताना)',
    "I'll go. (plain)":'मी जाईन. (साधं बोलणं)',
    'Please sit.':'कृपया बसा.',
    'Hello. (polite)':'नमस्कार.',
    "I don't eat meat.":'मी मांस खात नाही.',
    "I won't go.":'मी जाणार नाही.',
    "I didn't go yesterday.":'मी काल गेलो / गेले नाही.',
    'Three pens, please.':'कृपया तीन पेन द्या.',
    'There are two cats.':'दोन मांजरी आहेत.',
    'Three pencils, please.':'कृपया तीन पेन्सिली द्या.',

    // Phase 6I: exact gaps in the pinned lesson pack, not inferred aliases.
    // Provenance and sense/register decisions: docs/PHASE6I_MARATHI_MEANINGS.md.
    'I eat an apple. (male; a woman says खाते)':'मी सफरचंद खातो.',
    'My brother went to school.':'माझा भाऊ शाळेत गेला.',
    'the book bought yesterday':'काल विकत घेतलेलं पुस्तक',
    'a man who speaks Japanese':'जपानी बोलणारा माणूस',
    'the book that I bought yesterday':'मी काल विकत घेतलेलं पुस्तक',
    "As for me, I'll have tea.":'मी तर चहा घेईन.',
    "An elephant's trunk is long. (Marathi says 'of')":'हत्तीची सोंड लांब असते.',
    'Ram read the book.':'रामने पुस्तक वाचलं.',
    'Who came? (no marker)':'कोण आलं?',
    'I know him.':'मी त्याला ओळखतो / ओळखते.',
    "I'm going to Pune.":'मी पुण्याला जात आहे.',
    "I'll come too.":'मीही येईन.',
    'I eat meat and fish too.':'मी मांसही खातो / खाते आणि मासेही खातो / खाते.',
    'my car (गाडी is feminine, so माझी)':'माझी गाडी',
    "It's very hot today, isn't it?":'आज खूप गरम आहे ना?',
    'Do come tomorrow.':'उद्या ये ना.',
    'I watched a film yesterday. (agrees with सिनेमा)':'मी काल सिनेमा पाहिला.',
    'I ate. (male)':'मी जेवलो.',
    "I'm going to study Japanese next year.":'पुढच्या वर्षी मी जपानी शिकणार आहे.',
    "I won't be able to come tomorrow.":'मी उद्या येऊ शकणार नाही.',
    "I'm not going because it's raining.":'पाऊस पडतोय म्हणून मी जाणार नाही.',
    'Where are you going? (polite)':'तुम्ही कुठे जात आहात?',
    'Where are you going? (to a friend)':'तू कुठे जात आहेस?',
    'Could you sit down, please?':'कृपया बसाल का?',
    'Give me three pens.':'मला तीन पेन द्या.',
    'There are four of us.':'आम्ही चार जण आहोत.'
  };
  // Optional guidance stays separate from the natural meaning and quiz options.
  // These are draft notes for specific glosses, not a full grammar translation.
  const mrNotes = {
    'I eat an apple. (male; a woman says खाते)':"येथे बोलणारा पुरुष आहे: 'खातो'. स्त्री बोलताना 'खाते' म्हणते.",
    'the book bought yesterday':"पुस्तक कोणी विकत घेतलं हे या वाक्यांशात सांगितलेलं नाही.",
    'the book that I bought yesterday':"पुस्तक विकत घेणारी व्यक्ती 'मी' आहे; हा तपशील अर्थात राखला आहे.",
    "An elephant's trunk is long. (Marathi says 'of')":"'हत्तीची' हा शब्द संबंध दाखवतो; '-ची' हे रूप 'सोंड'शी जुळते.",
    'Who came? (no marker)':"या उदाहरणात 'कोण'नंतर स्वतंत्र कर्ता-खूण नाही.",
    'my car (गाडी is feminine, so माझी)':"'गाडी' हा स्त्रीलिंगी शब्द असल्यामुळे 'माझी' वापरले आहे.",
    'Do come tomorrow.':"ही उद्या येण्याची आग्रहाची विनंती आहे.",
    'I watched a film yesterday. (agrees with सिनेमा)':"या उदाहरणात 'पाहिला' हे रूप 'सिनेमा' या पुल्लिंगी एकवचनी कर्माशी जुळते.",
    'I ate. (male)':"येथे बोलणारा पुरुष आहे: 'जेवलो'. स्त्री बोलताना 'जेवले' म्हणते. जेवण झाल्याचा भूतकाळातील अर्थ आहे.",
    "I'm not going because it's raining.":'या धड्यात पाऊस हे न जाण्याचे कारण आहे.',
    'Where are you going? (polite)':"येथे एका व्यक्तीला आदराने विचारताना 'तुम्ही' वापरले आहे.",
    'Where are you going? (to a friend)':"येथे मित्राशी बोलताना एकवचनी 'तू' वापरले आहे.",
    'Could you sit down, please?':'ही बसण्याची नम्र विनंती आहे; बसता येते का याची क्षमता विचारलेली नाही.'
  };
  const lookup=(entries,text)=>typeof text==='string' && Object.prototype.hasOwnProperty.call(entries,text) ? entries[text] : null;
  root.CatalystMeanings = {
    translate: (text, lang) => typeof text!=='string' || !text.trim() ? null : lang === 'en' ? text : lang === 'mr' ? lookup(mr,text) : null,
    note: (text, lang) => lang === 'mr' ? lookup(mrNotes,text) : null,
    language: settings => settings.meaningLanguage || settings.anchor || 'en'
  };
})(typeof window === 'undefined' ? globalThis : window);

;
/* Versioned learning preferences. Legacy fields/history are retained for compatibility. */
(function(root) {
  const registry = {
    ja: {name:'Japanese',native:'日本語',font:'font-japanese',dot:'bg-red-500',dir:'ltr'},
    my: {name:'Burmese',native:'မြန်မာ',font:'font-burmese',dot:'bg-amber-500',dir:'ltr'},
    zh: {name:'Chinese',native:'中文',font:'font-chinese',dot:'bg-rose-700',dir:'ltr'},
    mr: {name:'Marathi',native:'मराठी',font:'font-devanagari',dot:'bg-orange-500',dir:'ltr'},
    en: {name:'English',native:'English',font:'font-body',dot:'bg-slate-500',dir:'ltr'}
  };
  const codes=Object.keys(registry), meaningLanguages=['mr','en'], interfaceLanguages=['en'];
  function normalize(value) {
    const v=value && typeof value==='object' && !Array.isArray(value)?value:{};
    const legacy=['ja','my','zh'].filter(l=>v.show?.[l]!==false);
    const targetLanguage=codes.includes(v.targetLanguage)?v.targetLanguage:(legacy[0]||'ja');
    const anchor=[...codes,'none'].includes(v.anchor)?v.anchor:'mr';
    const meaningLanguage=meaningLanguages.includes(v.meaningLanguage)?v.meaningLanguage:(meaningLanguages.includes(anchor)?anchor:'mr');
    const comparisons=Array.isArray(v.comparisonLanguages)?v.comparisonLanguages:(v.show?legacy:[]);
    return {...v,preferencesVersion:2,targetLanguage,anchor,meaningLanguage,
      interfaceLanguage:interfaceLanguages.includes(v.interfaceLanguage)?v.interfaceLanguage:'en',
      comparisonLanguages:[...new Set(comparisons.filter(l=>codes.includes(l)))],
      showEnglish:typeof v.showEnglish==='boolean'?v.showEnglish:false,
      dev:typeof v.dev==='boolean'?v.dev:false,reading:v.reading!==false,view:v.view==='sentence'?'sentence':'lang',
      learned:Array.isArray(v.learned)?v.learned:[]};
  }
  const languages=s=>[...new Set([s.targetLanguage,s.anchor,...s.comparisonLanguages])].filter(l=>codes.includes(l));
  const availableTargets=concepts=>codes.filter(l=>concepts.some(c=>c.entries[l]?.ex?.length));
  root.CatalystPreferences={registry,codes,meaningLanguages,interfaceLanguages,normalize,languages,availableTargets};
})(typeof window==='undefined'?globalThis:window);

;
/* Authored draft activities; provenance and review limits are recorded in docs/PHASE3_CONTENT.md and the Phase 6 activity checkpoints. */
(function(root) {
  const t=(en,mr)=>({en,mr});
  const pilots=[{
    id:'my-word-order',language:'my',concept:'verb_final',
    title:t('Build a Burmese sentence','बर्मी वाक्य तयार करा'),
    summary:t('Put the action at the end.','क्रियापद शेवटी ठेवा.'),
    situation:t('You are telling a friend what you eat. Start with who, then the food, then the action.','तुम्ही काय खाता हे मित्राला सांगत आहात. आधी कोण, मग पदार्थ, मग क्रिया सांगा.'),
    example:'ကျွန်တော် ပန်းသီး စားတယ်။',
    meaning:t('I eat an apple. (Male speaker.)','मी सफरचंद खातो. (पुरुष वक्ता.)'),
    notice:t('စားတယ် expresses the action with its ending. Keep it as one chunk at the end. ကျွန်တော် is a male speaker’s “I”; ကျွန်မ is a common female-speaker alternative.','စားတယ် या भागात क्रियापद आणि त्याचा शेवट एकत्र आहेत. हा भाग शेवटी ठेवा. ကျွန်တော် हे पुरुष वक्त्याचे “मी”; स्त्री वक्त्यासाठी ကျွန်မ हा सामान्य पर्याय आहे.'),
    comparison:t('Marathi also commonly puts the verb last: मी → सफरचंद → खातो. This similarity helps with this pattern; it does not make all Burmese and Marathi grammar equivalent.','मराठीतही सामान्यतः क्रियापद शेवटी येते: मी → सफरचंद → खातो. या रचनेत साम्य आहे; सर्व बर्मी आणि मराठी व्याकरण सारखे नाही.'),
    build:{prompt:t('Build: I eat an apple. Use the male-speaker form.','वाक्य तयार करा: मी सफरचंद खातो. पुरुष वक्त्याचे रूप वापरा.'),chunks:['ကျွန်တော်','ပန်းသီး','စားတယ်။'],orders:[[0,1,2]],hint:t('Who → food → action + ending.','कोण → पदार्थ → क्रियापद आणि त्याचा शेवट.'),explanation:t('The action chunk finishes this neutral sentence. Other orders may need a different discourse context; this exercise checks this taught pattern.','या साध्या वाक्यात क्रियापदाचा भाग शेवटी येतो. इतर क्रमांसाठी वेगळा संदर्भ लागू शकतो; येथे शिकवलेली रचना तपासली जाते.')},
    choices:[{prompt:t('For the neutral sentence pattern practised here, which chunk comes last?','येथे शिकलेल्या साध्या वाक्यरचनेत कोणता भाग शेवटी येतो?'),options:['ကျွန်တော်','ပန်းသီး','စားတယ်။'],accepted:[2],explanation:t('စားတယ် is the action and its ending.','စားတယ် हा क्रियापद आणि त्याच्या शेवटाचा भाग आहे.')},{prompt:t('Which sentence says “My younger brother goes to school”?','“माझा धाकटा भाऊ शाळेत जातो” असे कोणते वाक्य सांगते?'),options:['ညီလေး ကျောင်း သွားတယ်။','ကျွန်တော် ပန်းသီး စားတယ်။'],accepted:[0],explanation:t('ညီလေး = younger brother; ကျောင်း = school; သွားတယ် = goes.','ညီလေး = धाकटा भाऊ; ကျောင်း = शाळा; သွားတယ် = जातो.')}],
    use:t('Write a Burmese sentence about eating or going somewhere. Keep the action at the end. You may adapt either example.','खाण्याबद्दल किंवा कुठे जाण्याबद्दल बर्मी वाक्य लिहा. क्रियापद शेवटी ठेवा. कोणतेही उदाहरण बदलून वापरू शकता.'),
    checklist:t('Check: who or what is clear; the action is at the end; the speaker form fits you.','तपासा: कोण किंवा काय हे स्पष्ट आहे; क्रियापद शेवटी आहे; वक्त्याचे रूप तुमच्यासाठी योग्य आहे.'),
    sources:[{label:'Bundled verb_final examples (draft)',url:'https://github.com/Celeritas7/Catalyst/blob/main/data/grammar.yaml'}]
  },{
    id:'my-negation',language:'my',concept:'negation',
    title:t('Say what you will not do','काय करणार नाही ते सांगा'),
    summary:t('Build a negative statement, then distinguish it from a request.','नकारार्थी विधान तयार करा आणि ते विनंतीपेक्षा कसे वेगळे आहे ते ओळखा.'),
    situation:t('A friend asks whether you will join tomorrow’s outing. You have decided to stay home. Reply about your own plan; you are not asking your friend to stay.','उद्या फिरायला येणार का, असे मित्राने विचारले आहे. तुम्ही घरी राहायचे ठरवले आहे. स्वतःचा बेत सांगा; मित्राला थांबायला सांगू नका.'),
    example:'မသွားဘူး။',
    meaning:t('I won’t go. (A reply about the planned outing.)','मी जाणार नाही. (फिरायला जाण्याच्या बेताबद्दलचे उत्तर.)'),
    notice:t('Here သွား means “go”. Place မ before it and ဘူး after it: မသွားဘူး။ Use this ending instead of တယ် or မယ် in the pattern practised here. “Won’t” comes from the conversation about tomorrow; ဘူး alone does not mean future time.','येथे သွား म्हणजे “जाणे”. त्याच्या आधी မ आणि नंतर ဘူး ठेवा: မသွားဘူး။ येथे शिकवलेल्या रचनेत တယ် किंवा မယ် ऐवजी हा शेवट वापरा. उद्याबद्दल बोलत असल्यामुळे अर्थ “जाणार नाही” असा होतो; फक्त ဘူး म्हणजे भविष्यकाळ नाही.'),
    comparison:t('Compare the intentions: मी जाणार नाही. states your plan; जाऊ नकोस. tells another person not to go. The Burmese endings differ too.','हेतूंची तुलना करा: “मी जाणार नाही.” हे तुमच्या बेताबद्दलचे विधान आहे; “जाऊ नकोस.” असे दुसऱ्या व्यक्तीला सांगितले जाते. बर्मीतही शेवट वेगळा असतो.'),
    deeperTitle:t('A statement or a request?','विधान की विनंती?'),
    deeper:t('မသွားဘူး။ is the negative statement used here. မသွားနဲ့။ means “Don’t go.” These are plain spoken forms; a polite request can include ပါ before နဲ့. This activity practises the stated intentions, not every register or context.','မသွားဘူး။ हे येथे वापरलेले नकारार्थी विधान आहे. မသွားနဲ့။ म्हणजे “जाऊ नकोस.” ही साधी बोलचालीची रूपे आहेत; नम्र विनंतीत နဲ့ च्या आधी ပါ घालता येते. या सरावात दिलेले हेतू तपासले जातात; सर्व शैली किंवा संदर्भ नाहीत.'),
    build:{prompt:t('Reply about your plan: I won’t go.','तुमच्या बेताबद्दल उत्तर तयार करा: मी जाणार नाही.'),chunks:['မ','သွား','ဘူး။'],joiner:'',orders:[[0,1,2]],hint:t('Negative prefix → go → negative ending. The pieces join without spaces in this example.','नकार दर्शवणारा सुरुवातीचा भाग → जाणे → नकारार्थी शेवट. या उदाहरणात भाग जोडताना मधे जागा ठेवू नका.'),explanation:t('မသွားဘူး။ gives the intended negative reply. The buttons separate grammar pieces for practice; they are not separate written words.','မသွားဘူး။ हे अपेक्षित नकारार्थी उत्तर आहे. सरावासाठी व्याकरणाचे भाग वेगवेगळ्या बटणांवर दिले आहेत; ते स्वतंत्र लिखित शब्द नाहीत.')},
    choices:[{prompt:t('You are stating your own decision about tomorrow’s outing. Which reply means “I won’t go”?','उद्याच्या सहलीबद्दल तुमचा स्वतःचा निर्णय सांगायचा आहे. “मी जाणार नाही” हे कोणते उत्तर आहे?'),options:['မသွားနဲ့။','မသွားဘူး။'],accepted:[1],explanation:t('Choose မသွားဘူး။ for this statement. The other option tells someone not to go.','या विधानासाठी မသွားဘူး။ निवडा. दुसरा पर्याय एखाद्याला न जाण्यास सांगतो.')},{prompt:t('Now you are telling your friend “Don’t go.” Which form matches that intention?','आता मित्राला “जाऊ नकोस” असे सांगायचे आहे. कोणते रूप या हेतूशी जुळते?'),options:['မသွားနဲ့။','မသွားဘူး။'],accepted:[0],explanation:t('မသွားနဲ့။ uses the negative imperative ending နဲ့. A statement about your own plan needs the other ending in this exercise.','မသွားနဲ့။ मध्ये नकारार्थी आज्ञा किंवा विनंतीसाठी နဲ့ हा शेवट आहे. या सरावात स्वतःच्या बेताबद्दलच्या विधानासाठी दुसरा शेवट लागतो.')},{prompt:t('At a meal, you are explaining your eating habit: “I don’t eat meat.” Choose that statement.','जेवताना तुमची खाण्याची सवय सांगत आहात: “मी मांस खात नाही.” ते विधान निवडा.'),options:['မသွားဘူး။','အသား မစားဘူး။'],accepted:[1],explanation:t('အသား is meat and စား is eat. The negative statement keeps မ before စား and ဘူး after it.','အသား म्हणजे मांस आणि စား म्हणजे खाणे. नकारार्थी विधानात စား च्या आधी မ आणि नंतर ဘူး येते.')}],
    use:t('Write one negative statement about your own plan or eating habit. You may adapt မသွားဘူး။ or အသား မစားဘူး။ Add your intended meaning so you can review the context later.','स्वतःच्या बेताबद्दल किंवा खाण्याच्या सवयीबद्दल एक नकारार्थी विधान लिहा. မသွားဘူး။ किंवा အသား မစားဘူး။ यात बदल करू शकता. नंतर संदर्भ तपासता यावा म्हणून तुम्हाला अभिप्रेत असलेला अर्थही लिहा.'),
    checklist:t('Check: you mean a statement, not an instruction; မ comes before the verb and ဘူး after it; your intended meaning records who and when. Saving is not grammar approval.','तपासा: तुम्हाला विधान करायचे आहे, सूचना द्यायची नाही; क्रियापदाच्या आधी မ आणि नंतर ဘူး आहे; अभिप्रेत अर्थात कोण आणि केव्हा हे स्पष्ट आहे. जतन केले म्हणजे व्याकरण बरोबर ठरले असे नाही.'),
    content:{version:1,language:'my',script:'Myanmar',reviewStatus:'draft',
      register:t('Plain spoken statements and a direct request; politeness depends on the situation.','साधी बोलचालीतील विधाने आणि थेट विनंती; नम्रता परिस्थितीवर अवलंबून असते.'),
      sense:t('A decision about a future outing, a contrasting request, and an eating habit.','उद्याच्या सहलीबद्दलचा निर्णय, त्याहून वेगळी विनंती आणि खाण्याची सवय.'),
      provenance:t('The two negative statements reuse the bundled negation lesson. The request contrast, prompts and Marathi guidance are authored drafts informed by the linked grammar references.','दोन नकारार्थी विधाने अॅपमधील नकाराच्या धड्यातून घेतली आहेत. विनंतीशी तुलना, प्रश्न आणि मराठी मार्गदर्शन हे दिलेल्या व्याकरण संदर्भांच्या आधारे तयार केलेले मसुदे आहेत.'),
      sourceRevision:'262c47cc18d1f0c98fabeea980bf2e65b5700eb3',
      exampleRefs:[{conceptId:'negation',language:'my',index:2,text:'မသွားဘူး။'},{conceptId:'negation',language:'my',index:1,text:'အသား မစားဘူး။'}]},
    sources:[{label:'Bundled negation examples (draft, pinned source)',url:'https://github.com/Celeritas7/Catalyst/blob/262c47cc18d1f0c98fabeea980bf2e65b5700eb3/data/grammar.yaml'},{label:'NIU SEAsite: negative statements',url:'https://seasite.niu.edu/Burmese/Beginning/Blesson_5/syntax.htm'},{label:'NIU SEAsite: negative requests',url:'https://seasite.niu.edu/Burmese/Beginning/Blesson_2/syntax.htm'},{label:'WALS, Matti Miestamo: Burmese negation and time interpretation',url:'https://wals.info/chapter/113'}]
  },{
    id:'my-yes-no',language:'my',concept:'yes_no_ka',
    title:t('Ask a yes/no question','हो किंवा नाही असे उत्तर येणारा प्रश्न विचारा'),
    summary:t('Offer coffee, then tell a question from a statement.','कॉफी घेणार का ते विचारा आणि प्रश्न व विधान यांतील फरक ओळखा.'),
    situation:t('A friend visits. You offer coffee and want to know whether they will have some. Ask about their choice, rather than announcing your own drink.','मित्र भेटायला आला आहे. त्याला कॉफी हवी आहे का हे विचारायचे आहे. स्वतः काय घेणार हे सांगण्याऐवजी त्याची निवड विचारा.'),
    example:'ကော်ဖီ သောက်မလား။',
    meaning:t('Will you have coffee? (Offering some to a friend.)','तू कॉफी घेणार का? (मित्राला कॉफी देऊ करताना.)'),
    notice:t('ကော်ဖီ means coffee; သောက် means drink. In this offer, သောက်မလား asks about the friend’s choice. The မ in this future/intention question comes after the verb; it is not the negative prefix placed before a verb. Keep သောက်မလား together as one practice chunk.','ကော်ဖီ म्हणजे कॉफी; သောက် म्हणजे पिणे. येथे သောက်မလား वापरून मित्राची इच्छा विचारली आहे. या पुढील कृतीबद्दलच्या प्रश्नातील မ क्रियापदानंतर येतो; तो क्रियापदाआधी येणारा नकाराचा भाग नाही. सरावात သောက်မလား हा एक भाग म्हणून ठेवा.'),
    comparison:t('तू कॉफी घेणार का? asks the friend; मी कॉफी घेईन. states the speaker’s choice. The Burmese examples omit the pronoun, so the situation tells us who is meant.','“तू कॉफी घेणार का?” हा मित्राला विचारलेला प्रश्न आहे; “मी कॉफी घेईन.” हे वक्त्याच्या निवडीबद्दलचे विधान आहे. या बर्मी उदाहरणांत सर्वनाम नाही; कोणाबद्दल बोलले आहे ते संदर्भावरून कळते.'),
    deeperTitle:t('A question or a statement?','प्रश्न की विधान?'),
    deeper:t('Here ကော်ဖီ သောက်မလား။ asks, while ကော်ဖီ သောက်မယ်။ is the listener’s reply: “I’ll have coffee.” Use မလား in the taught question, not မယ် followed by လား. A noun can also take လား: ကျောင်းသားလား။ asks a male addressee “Are you a student?” Not every kind of question uses လား.','येथे ကော်ဖီ သောက်မလား။ हा प्रश्न आहे, तर ကော်ဖီ သောက်မယ်။ हे ऐकणाऱ्याचे “मी कॉफी घेईन” असे उत्तर आहे. शिकवलेल्या प्रश्नात မလား वापरा; မယ် नंतर လား जोडू नका. नामानंतरही လား येऊ शकतो: ကျောင်းသားလား။ म्हणजे पुरुषाला उद्देशून “तू विद्यार्थी आहेस का?” प्रत्येक प्रकारच्या प्रश्नात လား वापरला जात नाही.'),
    build:{prompt:t('Offer coffee to your friend: Will you have coffee?','मित्राला कॉफी देऊ करताना विचारा: तू कॉफी घेणार का?'),chunks:['ကော်ဖီ','သောက်မလား။'],orders:[[0,1]],hint:t('Coffee → drink + question ending. Keep the second chunk intact.','कॉफी → पिणे आणि प्रश्नाचा शेवट. दुसरा भाग एकत्र ठेवा.'),explanation:t('ကော်ဖီ သောက်မလား။ is the question in this conversation. The exercise checks these two authored chunks; it does not infer Burmese word boundaries.','ကော်ဖီ သောက်မလား။ हा या संभाषणातील प्रश्न आहे. या सरावात दिलेले दोन भाग तपासले जातात; त्यावरून बर्मीतील सर्व शब्दांच्या सीमा ठरत नाहीत.')},
    choices:[{prompt:t('You are the host. Ask your friend whether they will have coffee.','तुम्ही यजमान आहात. मित्र कॉफी घेणार का ते विचारा.'),options:['ကော်ဖီ သောက်မယ်။','ကော်ဖီ သောက်မလား။'],accepted:[1],explanation:t('မလား makes this the question about the friend’s choice. မယ် would state a plan.','မလား मुळे येथे मित्राची निवड विचारली जाते. မယ် वापरल्यास पुढील कृतीबद्दल विधान होते.')},{prompt:t('Now you are the friend answering. Say “I’ll have coffee”, without asking another question.','आता तुम्ही उत्तर देणारे मित्र आहात. दुसरा प्रश्न न विचारता “मी कॉफी घेईन” असे सांगा.'),options:['ကော်ဖီ သောက်မယ်။','ကော်ဖီ သောက်မလား။'],accepted:[0],explanation:t('ကော်ဖီ သောက်မယ်။ states your choice. Who is drinking comes from your role in this conversation.','ကော်ဖီ သောက်မယ်။ हे तुमच्या निवडीबद्दलचे विधान आहे. कॉफी कोण घेणार हे संभाषणातील तुमच्या भूमिकेवरून कळते.')},{prompt:t('You are speaking directly to a man. Ask whether he is a student.','तुम्ही एका पुरुषाशी थेट बोलत आहात. तो विद्यार्थी आहे का ते त्याला विचारा.'),options:['ကော်ဖီ သောက်မလား။','ကျောင်းသားလား။'],accepted:[1],explanation:t('ကျောင်းသားလား။ is the student question. Here လား follows the noun ကျောင်းသား; this noun question does not need မ.','ကျောင်းသားလား။ हा विद्यार्थी असण्याबद्दलचा प्रश्न आहे. येथे ကျောင်းသား या नामानंतर လား येतो; या नामाधारित प्रश्नात မ ची गरज नाही.')}],
    use:t('Write a short question offering coffee, or asking a male friend if he is a student. You may use either example. Add a meaning that makes the intended listener and situation clear.','कॉफी घेणार का किंवा पुरुष मित्र विद्यार्थी आहे का, असा छोटा प्रश्न लिहा. कोणतेही उदाहरण वापरू शकता. कोणाला आणि कोणत्या प्रसंगी विचारत आहात हे स्पष्ट होईल असा अर्थ जोडा.'),
    checklist:t('Check: the intended listener is clear; the question fits the situation; the coffee offer ends in မလား, not the statement ending မယ်; the student example fits the addressee.','तपासा: प्रश्न कोणाला विचारला आहे हे स्पष्ट आहे; प्रश्न प्रसंगाला योग्य आहे; कॉफीच्या प्रश्नाचा शेवट မလား आहे, विधानातील မယ် नाही; विद्यार्थ्याचे उदाहरण समोरच्या व्यक्तीसाठी योग्य आहे.'),
    content:{version:1,language:'my',script:'Myanmar',reviewStatus:'draft',
      register:t('Plain spoken forms for a familiar conversation; this is not a full lesson on polite address.','ओळखीच्या व्यक्तीशी बोलताना वापरण्याची साधी रूपे; आदरार्थी संबोधनाचा हा संपूर्ण धडा नाही.'),
      sense:t('An offer of coffee, the listener’s affirmative plan, and a question about a male addressee’s student status.','कॉफी देऊ करणारा प्रश्न, ऐकणाऱ्याचे होकारार्थी उत्तर आणि समोरचा पुरुष विद्यार्थी आहे का याबद्दलचा प्रश्न.'),
      provenance:t('The two questions reuse the bundled yes/no lesson. The coffee reply, situations and bilingual guidance are authored drafts informed by the linked grammar references.','दोन्ही प्रश्न अॅपमधील हो/नाही प्रश्नांच्या धड्यातून घेतले आहेत. कॉफीबद्दलचे उत्तर, प्रसंग आणि दोन्ही भाषांतील मार्गदर्शन हे दिलेल्या व्याकरण संदर्भांच्या आधारे तयार केलेले मसुदे आहेत.'),
      sourceRevision:'e329e2d1f0eb14f0fe90332d2e7c2700ed3f1ab2',
      exampleRefs:[{conceptId:'yes_no_ka',language:'my',index:2,text:'ကော်ဖီ သောက်မလား။'},{conceptId:'yes_no_ka',language:'my',index:1,text:'ကျောင်းသားလား။'}]},
    sources:[{label:'Bundled yes/no questions (draft, pinned source)',url:'https://github.com/Celeritas7/Catalyst/blob/e329e2d1f0eb14f0fe90332d2e7c2700ed3f1ab2/data/grammar.yaml'},{label:'NIU SEAsite: noun questions with လား',url:'https://seasite.niu.edu/Burmese/Beginning/Blesson_3/syntax.htm'},{label:'NIU SEAsite: question endings and future forms',url:'https://seasite.niu.edu/Burmese/Beginning/Blesson_6/syntax.htm'},{label:'NIU SEAsite: negative prefix and verb questions',url:'https://seasite.niu.edu/Burmese/Beginning/Blesson_5/syntax.htm'}]
  },{
    id:'my-wh-questions',language:'my',concept:'wh_question',
    title:t('Ask what and where','काय आणि कुठे असे प्रश्न विचारा'),
    summary:t('Ask for a food choice or a destination.','खाण्याची निवड किंवा जाण्याचे ठिकाण विचारा.'),
    situation:t('You and a friend are planning your next meal. Ask what your friend will eat: you want the name of a food, not just yes or no. Later, ask where they plan to go.','तुम्ही आणि मित्र पुढच्या जेवणाचे ठरवत आहात. मित्र काय खाणार ते विचारा: तुम्हाला पदार्थाचे नाव हवे आहे, फक्त हो किंवा नाही असे उत्तर नाही. नंतर तो कुठे जाणार आहे ते विचारा.'),
    example:'ဘာ စားမလဲ။',
    meaning:t('What will you eat? (Asking about the next meal.)','तू काय खाणार? (पुढच्या जेवणाबद्दल विचारताना.)'),
    notice:t('ဘာ asks “what”; စား means “eat”. In this planned-meal question, keep စားမလဲ together. The ending လဲ goes with the information being requested; မ before it marks the future/intention form taught here. The conversation supplies the omitted “you”.','ဘာ म्हणजे “काय”; စား म्हणजे “खाणे”. पुढच्या जेवणाबद्दलच्या या प्रश्नात စားမလဲ एकत्र ठेवा. माहिती विचारताना येथे လဲ हा शेवट येतो; त्याआधीचा မ येथे पुढील कृतीबद्दलचे रूप दर्शवतो. गाळलेले “तू” हे सर्वनाम संभाषणावरून समजते.'),
    comparison:t('तू काय खाणार? asks for the food; तू कुठे जाणार? asks for the destination. A yes/no coffee offer asks a different kind of question. These are contextual meanings, not a rule that every Marathi question maps word for word.','“तू काय खाणार?” यात पदार्थ विचारला आहे; “तू कुठे जाणार?” यात जाण्याचे ठिकाण विचारले आहे. कॉफी घेणार का हा हो/नाही प्रश्न वेगळ्या प्रकारची माहिती विचारतो. हे संदर्भानुसार अर्थ आहेत; प्रत्येक मराठी प्रश्नाचे शब्दशः भाषांतर करण्याचा नियम नाही.'),
    deeperTitle:t('What, where to, or yes/no?','काय, कुठे जाणार, की हो/नाही?'),
    deeper:t('ဘယ်ကို သွားမလဲ။ asks where your friend will go in this planning conversation. ဘယ်ကို asks for a destination, not where someone currently lives. Keep ဘယ်ကို together. The two information questions here end in လဲ; the coffee offer ကော်ဖီ သောက်မလား။ ends in လား. Choose the question for the information you need.','या बेताबद्दलच्या संभाषणात ဘယ်ကို သွားမလဲ။ म्हणजे मित्र कुठे जाणार ते विचारणे. ဘယ်ကို वापरून जाण्याचे ठिकाण विचारले आहे; सध्या कुठे राहतो हे नाही. ဘယ်ကို एकत्र ठेवा. येथील दोन्ही माहिती विचारणाऱ्या प्रश्नांचा शेवट လဲ आहे; कॉफी देऊ करणाऱ्या ကော်ဖီ သောက်မလား။ या प्रश्नाचा शेवट လား आहे. तुम्हाला हवी असलेली माहिती मिळेल असा प्रश्न निवडा.'),
    build:{prompt:t('Ask about the next meal: What will you eat?','पुढच्या जेवणाबद्दल विचारा: तू काय खाणार?'),chunks:['ဘာ','စားမလဲ။'],orders:[[0,1]],hint:t('What → eat + question ending. Keep the second chunk together.','काय → खाणे आणि प्रश्नाचा शेवट. दुसरा भाग एकत्र ठेवा.'),explanation:t('ဘာ စားမလဲ။ asks for the food choice in this situation. These are authored practice chunks; the exercise checks this taught order, not every possible conversational order.','ဘာ စားမလဲ။ वापरून या प्रसंगात खाण्याची निवड विचारली आहे. हे सरावासाठी ठरवलेले भाग आहेत; येथे शिकवलेला क्रम तपासला जातो, संभाषणातील प्रत्येक शक्य क्रम नाही.')},
    choices:[{prompt:t('At the meal-planning stage, ask which food your friend will eat.','जेवणाचे ठरवताना मित्र कोणता पदार्थ खाणार ते विचारा.'),options:['ဘာ စားမလဲ။','ဘယ်ကို သွားမလဲ။'],accepted:[0],explanation:t('ဘာ စားမလဲ။ asks what they will eat. The other question asks where they will go.','ဘာ စားမလဲ။ यात काय खाणार ते विचारले आहे. दुसऱ्या प्रश्नात कुठे जाणार ते विचारले आहे.')},{prompt:t('Your friend is planning to go out. Ask for the destination, not the food.','मित्र बाहेर जाण्याचे ठरवत आहे. खाण्याचा पदार्थ न विचारता जाण्याचे ठिकाण विचारा.'),options:['ဘာ စားမလဲ။','ဘယ်ကို သွားမလဲ။'],accepted:[1],explanation:t('ဘယ်ကို သွားမလဲ။ asks where they will go in this context. ဘယ်ကို points to the destination.','या संदर्भात ဘယ်ကို သွားမလဲ။ वापरून कुठे जाणार ते विचारले आहे. ဘယ်ကို जाण्याचे ठिकाण विचारतो.')},{prompt:t('Now offer coffee. Ask whether your friend will have some; a yes/no reply fits this intention.','आता कॉफी देऊ करा. मित्र कॉफी घेणार का ते विचारा; या हेतूसाठी हो किंवा नाही असे उत्तर योग्य आहे.'),options:['ဘာ စားမလဲ။','ကော်ဖီ သောက်မလား။'],accepted:[1],explanation:t('The coffee offer uses မလား. It asks whether they will have coffee; the other option asks for a food choice.','कॉफी देऊ करणाऱ्या प्रश्नात မလား येतो. कॉफी घेणार का ते विचारले आहे; दुसऱ्या पर्यायात खाण्याची निवड विचारली आहे.')}],
    use:t('Write a question about what a friend will eat or where they plan to go. You may adapt either example. Add a meaning that makes the person, intended information and planned situation clear.','मित्र काय खाणार किंवा कुठे जाणार, असा प्रश्न लिहा. कोणतेही उदाहरण बदलून वापरू शकता. कोणाला विचारत आहात, कोणती माहिती हवी आहे आणि कोणता बेत आहे हे स्पष्ट होईल असा अर्थ जोडा.'),
    checklist:t('Check: what or where to matches the information you need; the person and planned situation are clear; the taught question uses လဲ; you have not changed it into a yes/no offer.','तपासा: काय किंवा कुठे जाणार हा प्रश्न हवी असलेली माहिती विचारतो; व्यक्ती आणि पुढचा बेत स्पष्ट आहेत; शिकवलेल्या प्रश्नात လဲ आहे; चुकून हो/नाही असा प्रश्न झालेला नाही.'),
    content:{version:1,language:'my',script:'Myanmar',reviewStatus:'draft',
      register:t('Plain spoken questions in a familiar planning conversation; formal and polite address variants are outside this activity.','ओळखीच्या व्यक्तीशी बेत ठरवताना विचारण्याचे साधे बोलचालीतील प्रश्न; औपचारिक आणि आदरार्थी संबोधनाचे पर्याय या सरावात नाहीत.'),
      sense:t('Ask for a food choice or a planned destination, then contrast those information questions with a yes/no coffee offer.','खाण्याची निवड किंवा जाण्याचा बेत असलेले ठिकाण विचारा; नंतर या माहिती विचारणाऱ्या प्रश्नांची कॉफीच्या हो/नाही प्रश्नाशी तुलना करा.'),
      provenance:t('Both information questions and the coffee contrast reuse the bundled lesson pack. Scenarios and bilingual guidance are authored drafts informed by the linked grammar references.','दोन्ही माहिती विचारणारे प्रश्न आणि कॉफीच्या प्रश्नाशी तुलना अॅपमधील धड्यांवर आधारित आहे. प्रसंग आणि दोन्ही भाषांतील मार्गदर्शन हे दिलेल्या व्याकरण संदर्भांच्या आधारे तयार केलेले मसुदे आहेत.'),
      sourceRevision:'ab4a915cd63d4cfdc6454e3577e2d9ad1b28e09e',
      exampleRefs:[{conceptId:'wh_question',language:'my',index:1,text:'ဘာ စားမလဲ။'},{conceptId:'wh_question',language:'my',index:2,text:'ဘယ်ကို သွားမလဲ။'},{conceptId:'yes_no_ka',language:'my',index:2,text:'ကော်ဖီ သောက်မလား။'}]},
    sources:[{label:'Bundled what/where and yes/no examples (draft, pinned source)',url:'https://github.com/Celeritas7/Catalyst/blob/ab4a915cd63d4cfdc6454e3577e2d9ad1b28e09e/data/grammar.yaml'},{label:'NIU SEAsite: information questions and future forms',url:'https://seasite.niu.edu/Burmese/Beginning/Blesson_6/syntax.htm'},{label:'NIU SEAsite: place questions and at/from/to markers',url:'https://seasite.niu.edu/Burmese/Beginning/Blesson_10/syntax.htm'}]
  },{
    id:'my-location-destination',language:'my',concept:'place_de_ni',
    title:t('At a place or going to it?','क्रियेचे ठिकाण की जाण्याचे ठिकाण?'),
    summary:t('Use မှာ for the place of an action and ကို for the destination in these examples.','या उदाहरणांत क्रियेच्या ठिकाणासाठी မှာ आणि जाण्याच्या ठिकाणासाठी ကို वापरा.'),
    situation:t('A friend asks where you study. You describe your study habit at the library. Later, you tell them about a planned trip to Yangon. Keep the place of studying separate from the destination of the trip.','मित्र तुम्हाला अभ्यास कुठे करता ते विचारतो. तुम्ही ग्रंथालयात अभ्यास करण्याची सवय सांगता. नंतर यांगूनला जाण्याचा बेत सांगता. अभ्यासाचे ठिकाण आणि प्रवासाचे ठिकाण यांतील फरक लक्षात घ्या.'),
    example:'စာကြည့်တိုက်မှာ စာ ကျက်တယ်။',
    meaning:t('I study at the library. (Describing my study habit.)','मी ग्रंथालयात अभ्यास करतो/करते. (स्वतःच्या अभ्यासाच्या सवयीबद्दल.)'),
    notice:t('စာကြည့်တိုက် is library. Here မှာ follows the place and tells us where the studying happens. Keep စာကြည့်တိုက်မှာ as one practice chunk. In ရန်ကုန်ကို သွားမယ်။, ကို follows Yangon and marks the destination: “I’ll go to Yangon.” The speaker is understood from this conversation; neither sentence writes a pronoun for “I”.','စာကြည့်တိုက် म्हणजे ग्रंथालय. येथे ठिकाणानंतर မှာ येतो आणि अभ्यास कुठे होतो ते सांगतो. सरावात စာကြည့်တိုက်မှာ हा एक भाग ठेवा. ရန်ကုန်ကို သွားမယ်။ मध्ये यांगूननंतर ကို येतो आणि जाण्याचे ठिकाण दर्शवतो: “मी यांगूनला जाईन.” या संभाषणातून वक्ता कोण ते समजते; दोन्ही वाक्यांत “मी” हे सर्वनाम लिहिलेले नाही.'),
    comparison:t('“ग्रंथालयात अभ्यास करतो/करते” describes the place of studying; “यांगूनला जाईन” describes a destination. Use these Marathi meanings as context clues. Marathi endings and Burmese particles do not match word for word in every sentence.','“ग्रंथालयात अभ्यास करतो/करते” यात अभ्यासाचे ठिकाण सांगितले आहे; “यांगूनला जाईन” यात जाण्याचे ठिकाण सांगितले आहे. हे मराठी अर्थ संदर्भ समजण्यासाठी वापरा. मराठी प्रत्यय आणि बर्मीतील हे भाग प्रत्येक वाक्यात शब्दशः जुळतात असे नाही.'),
    deeperTitle:t('The place, the destination and the verb','ठिकाण, जाण्याचे ठिकाण आणि क्रियापद'),
    deeper:t('စာကြည့်တိုက်မှာ ကြောင် ရှိတယ်။ means “There is a cat in the library.” မှာ can mark where something is as well as where an action happens. The travel example uses ကို with သွားမယ်, “will go”. The endings ကျက်တယ် and သွားမယ် also differ in time/intention; do not decide the place marker from the ending alone. ကို has other uses, including objects and recipients. This activity practises these place contexts, not every use or omission of either marker.','စာကြည့်တိုက်မှာ ကြောင် ရှိတယ်။ म्हणजे “ग्रंथालयात एक मांजर आहे.” မှာ क्रिया कुठे होते तसेच एखादी गोष्ट कुठे आहे हेही दर्शवू शकतो. प्रवासाच्या उदाहरणात “जाईन” या अर्थाच्या သွားမယ် सोबत ကို येतो. ကျက်တယ် आणि သွားမယ် या शेवटांमध्ये काळ किंवा बेत यांचाही फरक आहे; केवळ शेवट पाहून ठिकाणाचा भाग ठरवू नका. ကို कर्म किंवा ज्याला काही दिले जाते ती व्यक्ती दर्शवण्यासाठीही वापरतात. या सरावात दिलेले ठिकाणांचे संदर्भ शिकवले आहेत; या दोन्ही भागांचे सर्व उपयोग किंवा ते कधी वगळतात हे नाही.'),
    build:{prompt:t('Describe your study habit: I study at the library.','तुमची अभ्यासाची सवय सांगा: मी ग्रंथालयात अभ्यास करतो/करते.'),chunks:['စာကြည့်တိုက်မှာ','စာ','ကျက်တယ်။'],orders:[[0,1,2]],hint:t('Library + at → စာ → ကျက်တယ်။ The last two chunks together express studying.','ग्रंथालय आणि ठिकाण दर्शवणारा भाग → စာ → ကျက်တယ်။ शेवटचे दोन भाग मिळून अभ्यास करणे हा अर्थ व्यक्त करतात.'),explanation:t('စာကြည့်တိုက်မှာ စာ ကျက်တယ်။ locates the studying at the library. The chunks preserve the bundled example’s spacing; they are authored practice units, not a general rule for Burmese word boundaries or every possible sentence order.','စာကြည့်တိုက်မှာ စာ ကျက်တယ်။ यात अभ्यास ग्रंथालयात होतो असे सांगितले आहे. भाग जोडल्यावर मूळ उदाहरणातील मोकळ्या जागा तशाच राहतात; हे सरावासाठी ठरवलेले भाग आहेत, बर्मीतील शब्दांच्या सीमा किंवा प्रत्येक शक्य वाक्यक्रमाचा नियम नाही.')},
    choices:[{prompt:t('You study at the library. Complete the taught example with its place marker: စာကြည့်တိုက်___ စာ ကျက်တယ်။','तुम्ही ग्रंथालयात अभ्यास करता. शिकवलेल्या उदाहरणात ठिकाण दर्शवणारा भाग भरा: စာကြည့်တိုက်___ စာ ကျက်တယ်။'),options:['မှာ','ကို'],accepted:[0],explanation:t('Use မှာ in စာကြည့်တိုက်မှာ: the library is where the studying happens. It is not the destination of a journey in this sentence.','စာကြည့်တိုက်မှာ मध्ये မှာ वापरा: ग्रंथालय हे अभ्यासाचे ठिकाण आहे. या वाक्यात ते प्रवासाचे ठिकाण नाही.')},{prompt:t('You plan to go to Yangon. Complete the taught destination phrase: ရန်ကုန်___ သွားမယ်။','तुम्ही यांगूनला जाण्याचे ठरवले आहे. शिकवलेल्या वाक्यात जाण्याचे ठिकाण दर्शवणारा भाग भरा: ရန်ကုန်___ သွားမယ်။'),options:['မှာ','ကို'],accepted:[1],explanation:t('Use ကို in ရန်ကုန်ကို: Yangon is the destination in “I’ll go to Yangon.” The question is where you will go, not where you are studying.','ရန်ကုန်ကို मध्ये ကို वापरा: “मी यांगूनला जाईन” यात यांगून हे जाण्याचे ठिकाण आहे. येथे कुठे जाणार हे सांगायचे आहे, अभ्यास कुठे करता हे नाही.')},{prompt:t('You are describing where a cat is. Choose “There is a cat in the library.”','मांजर कुठे आहे ते सांगत आहात. “ग्रंथालयात एक मांजर आहे” हे वाक्य निवडा.'),options:['စာကြည့်တိုက်မှာ ကြောင် ရှိတယ်။','ရန်ကုန်ကို သွားမယ်။'],accepted:[0],explanation:t('The cat sentence uses မှာ for its location and ရှိတယ် for existence. The other sentence describes a planned trip to Yangon.','मांजराच्या वाक्यात ठिकाणासाठी မှာ आणि आहे या अर्थासाठी ရှိတယ် येतो. दुसऱ्या वाक्यात यांगूनला जाण्याचा बेत सांगितला आहे.')}],
    use:t('Write about where you study or a destination you plan to visit. You may adapt one of the examples. Add your intended meaning so that the place’s role and who is speaking remain clear.','तुम्ही अभ्यास कुठे करता किंवा कुठे जाण्याचा बेत आहे ते लिहा. एखाद्या उदाहरणात बदल करू शकता. ठिकाणाची भूमिका आणि वक्ता कोण हे स्पष्ट होईल असा अभिप्रेत अर्थ जोडा.'),
    checklist:t('Check: the place is where the action happens or the destination you intend; the marker follows the place in the taught pattern; the verb and intended meaning fit. Saving does not approve the grammar.','तपासा: ते क्रियेचे ठिकाण आहे की जाण्याचा बेत असलेले ठिकाण हे स्पष्ट आहे; शिकवलेल्या रचनेत ठिकाणानंतर योग्य भाग येतो; क्रियापद आणि अभिप्रेत अर्थ जुळतात. जतन केले म्हणजे व्याकरण बरोबर ठरले असे नाही.'),
    content:{version:1,language:'my',script:'Myanmar',reviewStatus:'draft',
      register:t('Plain spoken statements to a friend; polite and formal variants are outside this activity.','मित्राशी बोलताना वापरायची साधी बोलचालीतील विधाने; नम्र आणि औपचारिक पर्याय या सरावात नाहीत.'),
      sense:t('A study habit at the library, a planned destination in Yangon, and a cat’s location.','ग्रंथालयात अभ्यास करण्याची सवय, यांगूनला जाण्याचा बेत आणि मांजराचे ठिकाण.'),
      provenance:t('The library and Yangon examples reuse the bundled place and direction lessons. Contexts, marker exercises and Marathi/English guidance are authored drafts informed by the linked grammar reference.','ग्रंथालयाची आणि यांगूनची उदाहरणे अॅपमधील ठिकाण आणि दिशा या धड्यांतून घेतली आहेत. संदर्भ, रिकाम्या जागांचा सराव आणि मराठी/इंग्रजी मार्गदर्शन हे दिलेल्या व्याकरण संदर्भाच्या आधारे तयार केलेले मसुदे आहेत.'),
      sourceRevision:'3ae8aef2705c012da681ff0bf084d9b54ccd10eb',
      exampleRefs:[{conceptId:'place_de_ni',language:'my',index:1,text:'စာကြည့်တိုက်မှာ စာ ကျက်တယ်။'},{conceptId:'place_de_ni',language:'my',index:2,text:'စာကြည့်တိုက်မှာ ကြောင် ရှိတယ်။'},{conceptId:'direction_ni_e',language:'my',index:1,text:'ရန်ကုန်ကို သွားမယ်။'}]},
    sources:[{label:'Bundled place and direction examples (draft, pinned source)',url:'https://github.com/Celeritas7/Catalyst/blob/3ae8aef2705c012da681ff0bf084d9b54ccd10eb/data/grammar.yaml'},{label:'NIU SEAsite: place expressions and at/from/to markers',url:'https://seasite.niu.edu/Burmese/Beginning/Blesson_10/syntax.htm'}]
  },{
    id:'ja-topic-transitions',language:'ja',
    title:t('ちなみに or ところで?','ちなみに की ところで?'),
    summary:t('Add a related detail or start another topic.','संबंधित माहिती जोडा किंवा विषय बदला.'),
    situation:t('You are talking about a café. You can add its opening days, or move to a different subject such as tomorrow’s meeting. Choose the connector for your intention.','तुम्ही एका कॅफेबद्दल बोलत आहात. त्याचे उघडण्याचे दिवस सांगू शकता, किंवा उद्याच्या बैठकीसारखा दुसरा विषय सुरू करू शकता. तुमच्या हेतूनुसार जोडशब्द निवडा.'),
    example:'この店は静かです。ちなみに、日曜日も開いています。',
    meaning:t('This place is quiet. As an additional detail, it is open on Sundays too.','हे ठिकाण शांत आहे. आणखी संबंधित माहिती सांगायची तर, रविवारीही ते उघडे असते.'),
    notice:t('ちなみに adds a related detail. Standalone ところで signals a topic shift. The surrounding conversation and your intention matter; the English gloss “by the way” alone is not enough.','ちなみに आधीच्या विषयाशी संबंधित माहिती जोडते. स्वतंत्र ところで विषय बदलल्याचे दर्शवते. संभाषणाचा संदर्भ आणि तुमचा हेतू महत्त्वाचा आहे; केवळ इंग्रजी “by the way” या अर्थावर अवलंबून राहू नका.'),
    comparison:t('Marathi prompts such as “आणखी संबंधित माहिती…” and “विषय बदलून सांगायचे तर…” can help you remember the intention. They are explanations, not fixed word-for-word equivalents.','“आणखी संबंधित माहिती…” आणि “विषय बदलून सांगायचे तर…” या मराठी खुणांनी हेतू लक्षात ठेवता येतो. ही स्पष्टीकरणे आहेत; ठराविक शब्दशः भाषांतरे नाहीत.'),
    deeper:t('Do not mix standalone ところで with verb-past + ところで. 今から急いだところで、間に合いません means “Even if we hurry now, we will not make it in time.” That construction expresses a hypothetical concession, often with an unhelpful outcome; it is not a topic switch.','स्वतंत्र ところで आणि क्रियापदाचे भूतकाळी रूप + ところで यांची गल्लत करू नका. 今から急いだところで、間に合いません म्हणजे “आता घाई केली तरी वेळेत पोहोचणार नाही.” या रचनेत कल्पित कृती करूनही अपेक्षित परिणाम होत नाही, असा अर्थ अनेकदा येतो; येथे विषय बदलत नाही.'),
    build:{prompt:t('Add a related detail: Incidentally, this place is open on Sundays too.','संबंधित माहिती जोडा: आणखी सांगायचे तर, हे ठिकाण रविवारीही उघडे असते.'),chunks:['ちなみに、','この店は','日曜日も','開いています。'],orders:[[0,1,2,3],[0,2,1,3]],hint:t('Start with the related-detail connector. Finish with 開いています。 The two middle chunks can exchange places here.','संबंधित माहिती जोडणाऱ्या शब्दाने सुरुवात करा. शेवटी 開いています。 ठेवा. येथे मधले दोन भाग आपली जागा बदलू शकतात.'),explanation:t('Both middle-chunk orders are accepted here. ちなみに introduces the additional detail about the same place.','येथे मधल्या दोन भागांचे दोन्ही क्रम स्वीकारले जातात. ちなみに त्याच ठिकाणाबद्दल अधिक माहिती जोडते.')},
    choices:[{prompt:t('You want to add another detail about the same café: “___、コーヒーもおいしいです。”','त्याच कॅफेबद्दल आणखी माहिती जोडायची आहे: “___、コーヒーもおいしいです。”'),options:['ちなみに','ところで'],accepted:[0],explanation:t('The coffee is an additional detail about the café. The stated intention is to continue that topic.','कॉफीबद्दलची माहिती त्याच कॅफेशी संबंधित आहे. दिलेला हेतू तोच विषय पुढे चालू ठेवण्याचा आहे.')},{prompt:t('After talking about the café, you intentionally change to tomorrow’s meeting: “___、明日の会議は何時ですか。”','कॅफेबद्दल बोलल्यानंतर तुम्ही मुद्दाम उद्याच्या बैठकीकडे विषय बदलता: “___、明日の会議は何時ですか。”'),options:['ちなみに','ところで'],accepted:[1],explanation:t('ところで marks the intended shift to the meeting. A different context could change how connected two statements feel.','ところで बैठकीकडे विषय बदलल्याचे दर्शवते. वेगळ्या संदर्भात दोन विधानांमधील संबंध वेगळा वाटू शकतो.')}],
    use:t('Write two short Japanese sentences. First introduce a topic. Then use ちなみに for a related detail or ところで to change the topic.','जपानीत दोन छोटी वाक्ये लिहा. पहिल्यात विषय मांडा. मग संबंधित माहिती जोडण्यासाठी ちなみに किंवा विषय बदलण्यासाठी ところで वापरा.'),
    checklist:t('Check: your intention is clear; the connector matches it; you are using standalone ところで, not verb-past + ところで.','तपासा: तुमचा हेतू स्पष्ट आहे; जोडशब्द त्या हेतूशी जुळतो; तुम्ही स्वतंत्र ところで वापरत आहात, क्रियापदाचे भूतकाळी रूप + ところで नाही.'),
    sources:[{label:'Bunpro: ところで and contrast with ちなみに',url:'https://bunpro.jp/grammar_points/ところで'}]
  }];
  const text=(value,language)=>value?.[language] || null;
  // Explicit authored grammar pieces may touch in the written sentence. Keep
  // the original pilots' spaces unless a build explicitly specifies otherwise.
  const assemble=(build,order)=>order.map(index=>build.chunks[index]).join(build.joiner??' ');
  const key=p=>`${p.language}:${p.id}`;
  const validOrder=(build,order)=>Array.isArray(order)&&build.orders.some(a=>a.length===order.length&&a.every((v,i)=>v===order[i]));
  const choiceCorrect=(question,answer)=>question.accepted.includes(answer);
  root.CatalystActivities={pilots,text,key,validOrder,choiceCorrect,assemble};
})(typeof window==='undefined'?globalThis:window);

;
/* Guided progress is account/language scoped. Legacy device writing is never assigned automatically. */
(function(root){
  'use strict';
  const object=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
  const own=(value,key)=>Object.prototype.hasOwnProperty.call(value,key);
  const empty=()=>({version:1,items:{}});
  function key(scope,language){
    if(typeof scope!=='string'||!scope||scope==='loading'||!['my','ja','zh','mr','en'].includes(language))throw Error('Wait for the study account before saving an activity.');
    return 'catalyst_activity_v1:'+encodeURIComponent(scope)+':'+language;
  }
  function parse(raw){
    if(raw===null)return empty();
    const value=JSON.parse(raw);
    const invalid=()=>{throw Error('Activity progress cannot be read. The original is preserved; export a recovery file.');};
    if(!object(value)||value.version!==1||!object(value.items)||Object.keys(value).some(k=>!['version','items'].includes(k))||Object.keys(value.items).length>500)invalid();
    for(const [id,item] of Object.entries(value.items)){
      if(!/^[a-z][a-z0-9-]{0,99}$/.test(id)||!object(item)||Object.keys(item).some(k=>!['step','completed','writing','updatedAt'].includes(k))||
        !Number.isInteger(item.step)||item.step<0||item.step>4||typeof item.completed!=='boolean'||!Number.isFinite(item.updatedAt)||!object(item.writing))invalid();
      for(const [language,writing] of Object.entries(item.writing)){
        if(!['mr','en'].includes(language)||!object(writing)||Object.keys(writing).some(k=>!['draft','meaning'].includes(k))||
          typeof writing.draft!=='string'||writing.draft.length>4000||typeof writing.meaning!=='string'||writing.meaning.length>5000)invalid();
      }
    }
    return value;
  }
  function commit(storage,scope,language,id,patch,expected){
    if(root.CatalystSafety?.isLocked())throw Error('An app update is being checked. Wait a moment.');
    const storageKey=key(scope,language),before=storage.getItem(storageKey),data=parse(before),previous=own(data.items,id)?data.items[id]:null;
    if(JSON.stringify(previous)!==JSON.stringify(expected))throw Error('This activity changed in another view. Keep your writing for later, then close and reopen the activity.');
    const item={step:0,completed:false,...previous,...patch,writing:{...previous?.writing,...patch.writing},updatedAt:Date.now()};
    const next={version:1,items:{...data.items,[id]:item}},raw=JSON.stringify(next);parse(raw);
    if(storage.getItem(storageKey)!==before)throw Error('Activity progress changed before saving. Reopen the activity and try again.');
    storage.setItem(storageKey,raw);return next;
  }
  function legacyWriting(raw,pilotKey){
    const settings=root.CatalystSafety.settings(raw),record=object(settings.activities)&&own(settings.activities,pilotKey)?settings.activities[pilotKey]:null;
    return object(record)&&typeof record.draft==='string'&&record.draft.trim()&&record.draft.length<=4000?record.draft:null;
  }
  root.CatalystActivityProgress={empty,key,parse,commit,legacyWriting};
})(typeof window==='undefined'?globalThis:window);

;
// Read-only coverage of the content currently on screen. Counts are not mastery
// scores, linguistic approval, or proof that this device has downloaded the app.
(function(root){
  'use strict';
  const text=value=>typeof value==='string'&&value.trim().length>0;
  function summarize(concepts,language,meaningLanguage,translate,pilots=[]){
    const lessons=concepts.map(concept=>{
      const entry=concept.entries?.[language];
      const examples=(entry?.ex||[]).flatMap((example,index)=>text(example.t)?[{example,index}]:[]);
      const missing=examples.flatMap(({example,index})=>{
        const gloss=example.e||(language==='en'?example.t:'');
        return text(translate(gloss,meaningLanguage))?[]:[index+1];
      });
      return {id:concept.id,title:concept.title,examples:examples.length,
        translated:examples.length-missing.length,missing,
        sourceChecked:entry?.checked===true};
    });
    const available=lessons.filter(lesson=>lesson.examples>0);
    return {language,meaningLanguage,lessons,
      availableLessons:available.length,unavailableLessons:lessons.length-available.length,
      examples:available.reduce((total,lesson)=>total+lesson.examples,0),
      translated:available.reduce((total,lesson)=>total+lesson.translated,0),
      sourceCheckedLessons:available.filter(lesson=>lesson.sourceChecked).length,
      guidedActivities:pilots.filter(pilot=>pilot.language===language).length};
  }
  root.CatalystCoverage={summarize};
})(typeof window==='undefined'?globalThis:window);

;
/* Local, deterministic review scheduler. These intervals are product defaults, not a mastery estimate. */
(function(root){
 const DAY=86400000, intervals=[1,3,7,14,30];
 const states={revision:'Needs revision',misused:'Known but misused',writing:'Cannot write yet',unused:'Known but never used'};
 const skills={understanding:'Understanding',context:'Contextual selection',production:'Production'};
 const empty=()=>({version:1,items:{},states:{}});
 const storageKey=(scope,language)=>`catalyst_review_v1:${encodeURIComponent(scope)}:${language}`;
 function parse(raw){
  if(!raw)return empty();
  const data=JSON.parse(raw);
  if(data?.version!==1||!data.items||Array.isArray(data.items)||typeof data.items!=='object'||!data.states||typeof data.states!=='object'||Array.isArray(data.states))throw Error('Unsupported or damaged review data');
  for(const r of Object.values(data.items))if(!r||!Number.isFinite(r.dueAt)||!skills[r.skill]||typeof r.conceptId!=='string')throw Error('Damaged review item');
  for(const r of Object.values(data.items))for(const field of ['attempts','independent','correct','assisted','retries','retentionAttempts','retentionCorrect','streak','lastAt'])if(!Number.isFinite(r[field])||r[field]<0)throw Error('Damaged review counts');
  return data;
 }
 function record(data,task,event,now=Date.now()){
  if(!task?.id||!task.conceptId||!skills[task.skill]||!Number.isFinite(now))return data;
  const old=data.items[task.id];
  const prior=old||{id:task.id,conceptId:task.conceptId,skill:task.skill,attempts:0,independent:0,correct:0,assisted:0,retries:0,retentionAttempts:0,retentionCorrect:0,streak:0,mistake:false};
  const independent=typeof event.correct==='boolean'&&!event.assisted&&!event.retry&&(!old||now>=prior.dueAt)&&(!Number.isFinite(prior.lastAt)||now-prior.lastAt>=DAY);
  const delayed=independent&&!!old&&now>=old.dueAt;
  const failed=event.correct===false;
  let dueAt=old?.dueAt??now+DAY,streak=prior.streak,mistake=prior.mistake;
  if(independent){streak=event.correct?Math.min(prior.streak+1,intervals.length):0;dueAt=now+intervals[Math.max(0,streak-1)]*DAY;}
  if(failed){mistake=true;dueAt=Math.min(dueAt,now+DAY);}
  if(delayed&&event.correct)mistake=false;
  // A fresh exposure needs another 24-hour gap before independent recall.
  dueAt=Math.max(dueAt,now+DAY);
  const next={...prior,attempts:prior.attempts+1,independent:prior.independent+(independent?1:0),correct:prior.correct+(independent&&event.correct?1:0),assisted:prior.assisted+(event.assisted?1:0),retries:prior.retries+(!independent&&!event.assisted?1:0),retentionAttempts:prior.retentionAttempts+(delayed?1:0),retentionCorrect:prior.retentionCorrect+(delayed&&event.correct?1:0),streak,dueAt,mistake,lastAt:now,lastIndependent:independent?now:prior.lastIndependent,lastMistake:failed?{response:event.response??null,expected:task.answer??null,at:now}:prior.lastMistake,lastResponse:event.response??null,lastAnswer:task.answer??null,lastOutcome:event.correct===null?'revealed':event.correct?'correct':'incorrect',lastIndependentOutcome:independent?(event.correct?'correct':'incorrect'):prior.lastIndependentOutcome};
  return {...data,items:{...data.items,[task.id]:next}};
 }
 function setState(data,id,value){if(!id||(!states[value]&&value!==''))return data;const next={...data.states};if(value)next[id]=value;else delete next[id];return {...data,states:next};}
 function rank(tasks,data,now=Date.now()){
  return tasks.map((task,i)=>{const r=data.items[task.id];return {task,i,priority:r?.dueAt<=now?0:r?.mistake?1:!r?2:3,preferred:({revision:'understanding',misused:'context',writing:'production',unused:'production'})[data.states[task.conceptId]]===task.skill?0:1,due:r?.dueAt||0};}).sort((a,b)=>a.priority-b.priority||a.preferred-b.preferred||a.due-b.due||a.i-b.i).map(x=>x.task);
 }
 function summary(data,conceptId){
  const rows=Object.values(data.items).filter(r=>!conceptId||r.conceptId===conceptId),result={};
  for(const skill of Object.keys(skills)){const rs=rows.filter(r=>r.skill===skill);result[skill]={attempts:rs.reduce((n,r)=>n+r.independent,0),correct:rs.reduce((n,r)=>n+r.correct,0)};}
  result.retention={attempts:rows.reduce((n,r)=>n+r.retentionAttempts,0),correct:rows.reduce((n,r)=>n+r.retentionCorrect,0)};return result;
 }
 root.CatalystReview={DAY,intervals,states,skills,empty,parse,storageKey,record,setState,rank,summary};
})(typeof window==='undefined'?globalThis:window);

;
(function(root){
  'use strict';
  const MAX_IMPORT_BYTES=5*1024*1024;
  const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
  const text=(value,max,required=false)=>typeof value==='string'&&value.length<=max&&(!required||!!value.trim());
  const language=value=>text(value,35,true)&&/^[a-z]{2,3}(?:-[a-zA-Z0-9]{2,8})*$/.test(value);
  const date=value=>text(value,40,true)&&Number.isFinite(Date.parse(value));
  function fields(value,allowed){
    if(Object.keys(value).some(k=>!allowed.includes(k)))throw new Error('This file contains unsupported fields. Keep the original export.');
  }
  function validateEntry(e){
    if(!object(e))throw new Error('Invalid sentence record.');
    fields(e,['id','original','lesson','meaning','meaningLanguage','createdAt','corrections','activityId']);
    if(!text(e.id,255,true)||!text(e.original,5000,true)||!text(e.lesson,100)||!/^[a-z0-9_-]*$/.test(e.lesson)||
       !text(e.meaning,5000)||!language(e.meaningLanguage)||!date(e.createdAt)||
       (e.activityId!==undefined&&(!text(e.activityId,100,true)||!/^[a-z0-9-]+$/.test(e.activityId)))||
       !Array.isArray(e.corrections)||e.corrections.length>1000)throw new Error('Invalid sentence record.');
    for(const c of e.corrections){
      if(!object(c))throw new Error('Invalid correction note.');
      fields(c,['text','createdAt','source']);
      if(!text(c.text,5000,true)||!date(c.createdAt)||c.source!=='user-entered')throw new Error('Invalid correction note.');
    }
  }
  function key(scope,language){
    if(!scope||scope==='loading'||!language)throw new Error('Account not ready');
    return 'catalyst_notebook_v1:'+encodeURIComponent(scope)+':'+encodeURIComponent(language);
  }
  function parse(raw){
    if(raw===null)return {version:1,entries:[]};
    const data=JSON.parse(raw);
    if(!object(data)||data.version!==1||!Array.isArray(data.entries))throw new Error('Unreadable notebook');
    fields(data,['version','entries']);
    const ids=new Set();
    for(const e of data.entries){
      validateEntry(e);
      if(ids.has(e.id))throw new Error('Duplicate sentence IDs.');
      ids.add(e.id);
    }
    return data;
  }
  function add(data,{id,original,lesson='',meaning='',meaningLanguage='en',createdAt,activityId}){
    const entry={id,original,lesson,meaning,meaningLanguage,createdAt,corrections:[]};
    if(activityId!==undefined)entry.activityId=activityId;
    validateEntry(entry);
    if(data.entries.some(e=>e.id===id))throw new Error('Invalid entry');
    return {...data,entries:[entry,...data.entries]};
  }
  function correct(data,id,note,createdAt){
    if(!text(note,5000,true)||!date(createdAt)||!data.entries.some(e=>e.id===id))throw new Error('Invalid correction');
    const next={...data,entries:data.entries.map(e=>e.id===id?{...e,corrections:[...e.corrections,{text:note,createdAt,source:'user-entered'}]}:e)};
    validateEntry(next.entries.find(e=>e.id===id));
    return next;
  }
  function parseImport(raw,targetLanguage){
    if(typeof raw!=='string'||new TextEncoder().encode(raw).byteLength>MAX_IMPORT_BYTES)throw new Error('Choose a notebook export smaller than 5 MB.');
    let backup;
    try{backup=JSON.parse(raw.replace(/^\uFEFF/,''));}catch(e){throw new Error('This file is not valid JSON. Choose a Catalyst notebook export.');}
    if(!object(backup)||backup.version!==1)throw new Error('Unsupported notebook format. Choose a version 1 Catalyst notebook export.');
    fields(backup,['language','version','entries']);
    if(!language(backup.language))throw new Error('The export is missing a valid learning language.');
    if(backup.language!==targetLanguage)throw new Error('This export is for '+backup.language+'. Switch the learning language before importing.');
    if(!Array.isArray(backup.entries)||backup.entries.length>10000)throw new Error('Invalid notebook or too many sentences (maximum 10,000 per import).');
    return {language:backup.language,...parse(JSON.stringify({version:backup.version,entries:backup.entries}))};
  }
  // Identity excludes notes so a later backup can add notes without replacing an original.
  const identity=e=>JSON.stringify([e.original,e.lesson,e.meaning,e.meaningLanguage,e.createdAt,e.activityId||'']);
  const noteIdentity=c=>JSON.stringify([c.text,c.createdAt,c.source]);
  function merge(data,backup){
    const entries=data.entries.map(e=>({...e,corrections:[...e.corrections]}));
    const byId=new Map(entries.map(e=>[e.id,e])),byIdentity=new Map(entries.map(e=>[identity(e),e]));
    const added=[],summary={added:0,updated:0,notesAdded:0,unchanged:0,conflictCopies:0};
    for(const incoming of backup.entries){
      const sameId=byId.get(incoming.id),same=identity(incoming);
      const existing=sameId&&identity(sameId)===same?sameId:byIdentity.get(same);
      if(existing){
        const notes=new Set(existing.corrections.map(noteIdentity));
        let count=0;
        for(const c of incoming.corrections){
          if(!notes.has(noteIdentity(c))){existing.corrections.push({...c});notes.add(noteIdentity(c));count++;}
        }
        validateEntry(existing);
        if(count){summary.updated++;summary.notesAdded+=count;}else summary.unchanged++;
      }else{
        let id=incoming.id,n=1;
        if(sameId){
          do{id=incoming.id.slice(0,230)+'-import-'+n++;}while(byId.has(id));
          summary.conflictCopies++;
        }
        const entry={...incoming,id,corrections:incoming.corrections.map(c=>({...c}))};
        byId.set(id,entry);byIdentity.set(same,entry);added.push(entry);summary.added++;
      }
    }
    return {data:{version:1,entries:[...added,...entries]},summary};
  }
  function addFromActivity(data,{pilot,targetLanguage,...entry}){
    if(!pilot||pilot.language!==targetLanguage)throw new Error('This activity belongs to another learning language.');
    const input={...entry,activityId:pilot.id,lesson:pilot.concept||''};
    const candidate=add({version:1,entries:[]},input).entries[0];
    // Repeated clicks or returning to the same draft do not create duplicate attempts.
    const existing=data.entries.find(e=>e.activityId===candidate.activityId&&e.original===candidate.original&&e.meaning===candidate.meaning&&e.meaningLanguage===candidate.meaningLanguage&&e.lesson===candidate.lesson);
    if(existing)return {data,added:false};
    return {data:add(data,input),added:true};
  }
  // Read latest storage immediately before a single atomic setItem. Failures propagate to UI.
  function commit(storage,scope,targetLanguage,change){
    if(root.CatalystSafety?.isLocked())throw Error('An update is being checked. Retry after it finishes.');
    const storageKey=key(scope,targetLanguage),current=parse(storage.getItem(storageKey));
    const next=change(current);
    const serialized=JSON.stringify(next);
    parse(serialized);
    storage.setItem(storageKey,serialized);
    return next;
  }
  root.CatalystNotebook={key,parse,add,correct,parseImport,merge,addFromActivity,commit,MAX_IMPORT_BYTES};
})(typeof window==='undefined'?globalThis:window);

;
// Small, explicit Burmese practice bank. No model, quota or database writes.
(function(root){
  'use strict';
  const normalize=value=>typeof value==='string'?value.normalize('NFC').trim():'';
  const english=value=>normalize(value).toLowerCase();
  const patterns=[
    {id:'pattern-my-eat-food-v1',kind:'food',label:{en:'I eat [food]',mr:'मी [खाद्यपदार्थ] खातो / खाते'},verb:'စားတယ်',dev:'सादै',en:'I eat ',mr:{masculine:'खातो',feminine:'खाते'}},
    {id:'pattern-my-drink-v1',kind:'drink',label:{en:'I drink [drink]',mr:'मी [पेय] पितो / पिते'},verb:'သောက်တယ်',dev:'थाउक् तै',en:'I drink ',mr:{masculine:'पितो',feminine:'पिते'}},
    {id:'pattern-my-go-place-v1',kind:'place',label:{en:'I go to [place]',mr:'मी [ठिकाणी] जातो / जाते'},verb:'သွားတယ်',dev:'थ्वादै',en:'I go ',mr:{masculine:'जातो',feminine:'जाते'}},
  ];
  // An exact native + English pair is required. Never infer a slot from a topic
  // name or a substring (e.g. Japanese leek is not a place). These are nouns;
  // pronouns, verbs and endings belong to the lesson frame, not learned progress.
  const words=[
    {key:'apple',kind:'food',native:'ပန်းသီး',english:['apple'],en:'an apple',mr:'सफरचंद',dev:'पान्दी'},
    {key:'rice',kind:'food',native:'ထမင်း',english:['cooked rice','rice'],en:'rice',mr:'भात',dev:'थमिन'},
    {key:'bread',kind:'food',native:'ပေါင်မုန့်',english:['bread'],en:'bread',mr:'ब्रेड',dev:'पाउंमोउन्'},
    {key:'banana',kind:'food',native:'ငှက်ပျောသီး',english:['banana'],en:'a banana',mr:'केळे',dev:'न्ग्येत् प्यॉदी'},
    {key:'water',kind:'drink',native:'ရေ',english:['water'],en:'water',mr:'पाणी',dev:'ये'},
    {key:'tea',kind:'drink',native:'လက်ဖက်ရည်',english:['tea'],en:'tea',mr:'चहा',dev:'लफेये'},
    {key:'coffee',kind:'drink',native:'ကော်ဖီ',english:['coffee'],en:'coffee',mr:'कॉफी',dev:'कॉफी'},
    {key:'soft-drink',kind:'drink',native:'အချိုရည်',english:['soft drink'],en:'a soft drink',mr:'शीतपेय',dev:'अछोये'},
    // No matching place nouns were present in the 2026-11-24 KG snapshot. Keep
    // this pattern unavailable until a matching dictionary word is actually learned.
    {key:'school',kind:'place',native:'ကျောင်း',english:['school'],en:'to school',mr:'शाळेत',dev:'चाउं'},
    {key:'home',kind:'place',native:'အိမ်',english:['home','house'],en:'home',mr:'घरी',dev:'एइन'},
    {key:'market',kind:'place',native:'ဈေး',english:['market'],en:'to the market',mr:'बाजारात',dev:'झे'},
    {key:'park',kind:'place',native:'ပန်းခြံ',english:['park'],en:'to the park',mr:'उद्यानात',dev:'पान्जान'},
  ];
  const speakers={masculine:{native:'ကျွန်တော်',dev:'चनो'},feminine:{native:'ကျွန်မ',dev:'चमा'}};
  const pattern=id=>patterns.find(p=>p.id===id);
  function choices(learned,id){
    const p=pattern(id);
    if(!p)return [];
    return words.filter(w=>w.kind===p.kind).flatMap(w=>{
      const source=learned.find(row=>row.language==='my'&&normalize(row.id)&&normalize(row.native)===w.native&&w.english.includes(english(row.english)));
      return source?[{...w,sourceId:source.id}]:[];
    });
  }
  function compose(p,w,speaker){
    const s=speakers[speaker],place=p.kind==='place';
    return {patternId:p.id,language:'my',lesson:'verb_final',word:w.native,
      t:`${s.native} ${w.native}${place?'ကို':''} ${p.verb}။`,
      // Approximate stored reading; no converter download is needed for this bank.
      dev:`${s.dev} ${w.dev}${place?' गो':''} ${p.dev}।`,h:[p.verb],
      meanings:{en:p.en+w.en+'.',mr:`मी ${w.mr} ${p.mr[speaker]}.`}};
  }
  function build(id,key,speaker,learned){
    const p=pattern(id),w=choices(learned,id).find(row=>row.key===key);
    if(!p||!w||!Object.hasOwn(speakers,speaker))throw new Error('Choose a compatible learned word and speaker form.');
    return compose(p,w,speaker);
  }
  // Versioned activity IDs reuse the existing notebook format. Never relabel a
  // learner's own writing, overwrite originals, or invent a reading for edits.
  function savedReading(entry){
    const p=pattern(entry.activityId);
    if(!p)return '';
    for(const w of words.filter(w=>w.kind===p.kind))for(const speaker of Object.keys(speakers)){
      const result=compose(p,w,speaker);
      if(result.t===entry.original)return result.dev;
    }
    return '';
  }
  async function pages(makeQuery){
    const rows=[];
    for(let start=0;start<100000;start+=500){
      const {data,error,status:responseStatus}=await makeQuery().range(start,start+499);
      if(error||!Array.isArray(data))throw Object.assign(new Error('Could not read your KG Chart progress. Try again when connected.'),{code:error?.code,status:error?.status||responseStatus});
      rows.push(...data);
      if(data.length<500)return rows;
    }
    throw new Error('Your KG Chart progress could not be loaded completely. Please retry.');
  }
  async function load(client,userId,permissions){
    if(!client||!normalize(userId))throw new Error('Sign in with your KG Chart account.');
    const access=await client.rpc('kg_chart_is_allowed');
    if(access.error)throw Object.assign(new Error('Could not check KG Chart account access. Please retry.'),{code:access.error.code,status:access.error.status||access.status});
    if(access.data!==true)throw Object.assign(new Error('This account does not have KG Chart access.'),{code:'ACCESS_DENIED'});
    const completed=await pages(()=>client.from('kg_chart_topic_completions')
      .select('user_id,language_code,topic_id').eq('user_id',userId).eq('language_code','my').order('topic_id'));
    const topics=[...new Set(completed.filter(r=>r.user_id===userId&&r.language_code==='my'&&r.topic_id).map(r=>r.topic_id))];
    const learned=new Set();
    for(let i=0;i<topics.length;i+=300){
      const batch=topics.slice(i,i+300),rows=await pages(()=>client.from('kg_chart_vocabulary')
        .select('id,topic_id').in('topic_id',batch).order('id'));
      rows.filter(r=>r.id&&batch.includes(r.topic_id)).forEach(r=>learned.add(r.id));
    }
    const sessions=await pages(()=>client.from('kg_chart_quiz_sessions').select('id,user_id,language_code')
      .eq('user_id',userId).eq('language_code','my').order('id'));
    const ids=[...new Set(sessions.filter(r=>r.user_id===userId&&r.language_code==='my'&&r.id).map(r=>r.id))];
    const correct=new Map(),seen=new Set();
    for(let i=0;i<ids.length;i+=300){
      const batch=ids.slice(i,i+300),answers=await pages(()=>client.from('kg_chart_quiz_answers')
        .select('id,session_id,vocabulary_id,is_correct').in('session_id',batch).eq('is_correct',true)
        .not('vocabulary_id','is',null).order('id'));
      for(const a of answers){
        if(!a.id||seen.has(a.id)||!batch.includes(a.session_id)||a.is_correct!==true||!a.vocabulary_id)continue;
        seen.add(a.id);correct.set(a.vocabulary_id,(correct.get(a.vocabulary_id)||0)+1);
      }
    }
    for(const [id,count] of correct)if(count>=2)learned.add(id);
    const list=[...learned].sort(),out=[];
    for(let i=0;i<list.length;i+=300){
      const batch=list.slice(i,i+300),rows=await pages(()=>client.from('kg_chart_vocabulary_translations')
        .select('vocabulary_id,language_code,native_text,vocabulary:kg_chart_vocabulary(english_text,topic_id)')
        .eq('language_code','my').in('vocabulary_id',batch).order('vocabulary_id'));
      for(const r of rows){
        if(r.language_code==='my'&&batch.includes(r.vocabulary_id)&&normalize(r.native_text)&&(!permissions||permissions.allows(r.vocabulary?.topic_id)))
          out.push({id:r.vocabulary_id,language:'my',native:normalize(r.native_text),english:normalize(r.vocabulary?.english_text)});
      }
    }
    return out;
  }
  root.CatalystPatterns={patterns,words,speakers,pattern,choices,build,savedReading,load};
})(typeof window==='undefined'?globalThis:window);

;
// Read-only adapter. Never imports another account's or unassigned progress.
(function(root){
  const normalize=t=>(t||'').normalize('NFC').trim();
  function status(state){return !state?'unrated':Number(state.mastery_level)>=4?'known':'learning';}
  function join(words,states,uid){
    const own=new Map();
    for(const s of states){
      if(s.user_id!==uid||s.word_type!=='word')continue;
      const old=own.get(s.word_id);
      if(!old||String(s.last_practiced_at||'')>String(old.last_practiced_at||''))own.set(s.word_id,s);
    }
    return words.filter(w=>normalize(w.burmese_word)).map(w=>{
      const s=own.get(w.id);
      return {id:w.id,text:normalize(w.burmese_word),english:w.english_meaning||'',status:status(s),level:s?Math.min(5,Math.max(0,Number(s.mastery_level)||0)):null};
    });
  }
  // Exact dictionary substrings, longest first; this is not Burmese tokenisation.
  function matches(text,words){
    const t=normalize(text),spans=[],found=[];
    for(const w of [...words].sort((a,b)=>b.text.length-a.text.length||String(a.id).localeCompare(String(b.id)))){
      let at=t.indexOf(w.text),hit=false;
      while(at>=0){const end=at+w.text.length;
        if(!spans.some(([s,e])=>at<e&&end>s)){spans.push([at,end]);hit=true;}
        at=t.indexOf(w.text,at+1);
      }
      if(hit)found.push(w);
    }
    return found;
  }
  const labels={0:'Not rated',1:'Monthly Review',2:"Can’t converse",3:"Can’t write",4:"Understand but can’t use",5:"Don’t know"};
  const providers={
    burmese:{name:'Burmese Study · practice levels',languages:['my'],note:'Regular Study currently saves legacy progress without an account identity. Those records cannot be attributed to you automatically. Song reviews are a separate source and are not included.'},
    japanese:{name:'Japanese Study · word markings',languages:['ja'],note:'Original marking categories, including custom labels. Markings are keyed by written word in the Japanese app; words sharing that spelling share the marking.'},
    kg:{name:'KG Chart · word ratings',languages:['ja','my','zh','mr','ms','ko','kn','fil','si','ta','te','th'],note:'Original KG Chart word ratings for this language. Quiz scores and completed topics are separate and are not converted into ratings.'}
  };
  const sources=language=>Object.entries(providers).filter(([,p])=>p.languages.includes(language)).map(([id,p])=>({id,...p}));
  async function pages(client,table,columns,filters={},order='id'){
    const rows=[];
    for(let offset=0;offset<100000;offset+=500){
      let q=client.from(table).select(columns).order(order,{ascending:true}).range(offset,offset+499);
      for(const [k,v] of Object.entries(filters))q=q.eq(k,v);
      const {data,error,status:responseStatus}=await q;
      if(error)throw Object.assign(new Error('Vocabulary connection unavailable. Please retry.'),{code:error.code,status:error.status||responseStatus});
      if(!Array.isArray(data))throw new Error('Vocabulary response was incomplete. Previous snapshot retained.');
      rows.push(...(data||[]));
      if(!data||data.length<500)return rows;
    }
    throw new Error('Vocabulary is too large to load completely. No partial ratings shown.');
  }
  function rated(words,ratings,uid,language,source,custom={}){
    const mine=new Map(ratings.filter(r=>r.user_id===uid&&(source!=='kg'||r.language_code===language)).map(r=>[source==='kg'?r.vocabulary_id:r.kanji,r]));
    return words.filter(w=>source!=='kg'||w.language_code===language).map(w=>{
      const id=source==='kg'?w.vocabulary_id:w.id, text=normalize(source==='kg'?w.native_text:w.kanji||w.hiragana);
      const r=mine.get(source==='kg'?id:w.kanji||w.hiragana), value=r?(source==='kg'?r.rating:r.marking):0;
      return {id:source+':'+language+':'+id,text,english:w.meaning_en||'',status:value?'rated':'unrated',rating:value,label:custom[value]||labels[value]||'Unrecognised rating',source,language};
    }).filter(w=>w.text);
  }
  async function loadSource(client,uid,language,source,access){
    if(!uid)throw new Error('Sign in to read your word progress.');
    if(!providers[source]?.languages.includes(language))throw new Error('Source unavailable for this language.');
    let words;
    if(source==='burmese'){
      const [dictionary,states]=await Promise.all([
        pages(client,'burmese_app_words','id,burmese_word,english_meaning'),
        pages(client,'burmese_app_user_state','id,user_id,word_id,word_type,mastery_level,last_practiced_at',{user_id:uid,word_type:'word'})
      ]);
      words=join(dictionary,states,uid).map(w=>({...w,label:w.level===null?'No account-linked rating':`Practice level ${w.level}/5`,source,language}));
    }else if(source==='kg'){
      const [dictionary,ratings]=await Promise.all([
        pages(client,'kg_chart_vocabulary_translations','vocabulary_id,language_code,native_text'+(access?',vocabulary:kg_chart_vocabulary(topic_id)':''),{language_code:language},'vocabulary_id'),
        pages(client,'kg_chart_user_ratings','id,user_id,vocabulary_id,language_code,rating',{user_id:uid,language_code:language})
      ]);words=rated(access?dictionary.filter(w=>access.allows(w.vocabulary?.topic_id)):dictionary,ratings,uid,language,source);
    }else{
      const [dictionary,ratings,categories]=await Promise.all([
        pages(client,'japanese_unified_words','id,kanji,hiragana,meaning_en'),
        pages(client,'japanese_user_markings','id,user_id,kanji,marking',{user_id:uid}),
        pages(client,'japanese_marking_categories','category_id,label',{user_id:uid},'category_id').then(data=>({data})).catch(error=>({error}))
      ]);
      // The source app permits this optional table to be absent; other failures must remain errors.
      if(categories.error&&!['PGRST205','42P01'].includes(categories.error.code))throw Object.assign(new Error('Category labels unavailable.'),{code:categories.error.code,status:categories.error.status});
      if(!categories.error&&!Array.isArray(categories.data))throw new Error('Category labels were incomplete.');
      words=rated(dictionary,ratings,uid,language,source,Object.fromEntries((categories.data||[]).map(c=>[c.category_id,c.label])));
    }
    return {words,linked:words.filter(w=>w.status!=='unrated').length,source,language};
  }
  async function load(client,uid){return (await loadSource(client,uid,'my','burmese')).words;}
  root.CatalystVocabulary={normalize,status,join,matches,load,loadSource,rated,providers,sources,labels};
})(typeof window==='undefined'?globalThis:window);

;
/* Selected-target generated examples; old multilingual JSON stays readable. */
(function(root) {
  const targets=['ja','my','zh','mr'], meanings=['en','mr'];
  function request(concept,target,meaning) {
    if(!targets.includes(target)||!meanings.includes(meaning))throw new Error('Unsupported generation language.');
    return {concept_id:concept,target_language:target,meaning_language:meaning};
  }
  function visible(row,user,target) {
    return row?.user_id===user&&!row.flagged&&(!row.target_language||row.target_language===target)&&typeof row.sentences?.[target]?.t==='string';
  }
  function meaning(row,language) {
    const sentences=row?.sentences||{};
    // Legacy Marathi was a parallel sentence; do not run AI meanings through the
    // bundled course translation lookup (which only knows fixed course examples).
    return sentences.meanings?.[language] || (language==='en'?sentences.en:language==='mr'?sentences.mr?.t:'') || '';
  }
  async function load(client,user,concept,target) {
    if(!user||!targets.includes(target))return [];
    const {data,error}=await client.from('catalyst_generated').select('*').eq('user_id',user)
      .eq('concept_id',concept).eq('flagged',false).not('sentences->'+target,'is',null)
      .order('created_at',{ascending:false}).limit(30);
    if(error)throw new Error('Saved AI sentences could not be loaded. Please retry.');
    return (data||[]).filter(row=>visible(row,user,target));
  }
  function compatible(info,target) {
    return info?.ok===true&&info.api_version===2&&info.configured===true&&Array.isArray(info.targets)&&info.targets.includes(target);
  }
  root.CatalystGeneration={targets,request,visible,meaning,load,compatible};
})(typeof window==='undefined'?globalThis:window);

;
/* Existing learner keys remain authoritative. Only explicit Catalyst records are read. */
(function(root){
  'use strict';
  const object=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
  const clone=v=>JSON.parse(JSON.stringify(v));
  const languages=['ja','my','zh','mr','en'];
  const guards=new Map(),memory=new Map();
  let locked=false;
  function dirty(id,value){if(value)guards.set(id,true);else guards.delete(id);}
  const hasDirty=()=>guards.size>0||[...memory.values()].some(value=>!value.saved);
  function settings(raw){
    if(raw===null)return {};
    const value=JSON.parse(raw);
    if(!object(value)||(value.preferencesVersion!==undefined&&![1,2].includes(value.preferencesVersion))||
       (value.learned!==undefined&&(!Array.isArray(value.learned)||value.learned.some(id=>typeof id!=='string')))||
       ['practice','activities'].some(key=>value[key]!==undefined&&!object(value[key])))throw Error('Settings or history cannot be read. The original is preserved; export a recovery file before making repairs.');
    return value;
  }
  function writeSettings(storage,patch){
    if(locked)throw Error('An app update is being checked. Wait a moment.');
    const previous=root.CatalystPreferences.normalize(settings(storage.getItem('catalyst_settings')));
    const next=root.CatalystPreferences.normalize({...previous,...(typeof patch==='function'?patch(previous):patch)});
    settings(JSON.stringify(next));storage.setItem('catalyst_settings',JSON.stringify(next));return next;
  }
  function draftKey(scope,language){
    if(!scope||scope==='loading'||!languages.includes(language))throw Error('Account is not ready for saving a draft.');
    return 'catalyst_drafts_v1:'+encodeURIComponent(scope)+':'+language;
  }
  function parseDrafts(raw){
    if(raw===null)return {version:1,drafts:{}};
    const value=JSON.parse(raw);
    if(!object(value)||value.version!==1||!object(value.drafts)||Object.keys(value.drafts).length>500)throw Error('Saved drafts cannot be read. Their original data is preserved.');
    for(const [id,draft] of Object.entries(value.drafts)){
      if(!/^[a-zA-Z0-9-]{1,100}$/.test(id)||!object(draft)||!['notebook','activity'].includes(draft.type)||typeof draft.context!=='string'||draft.context.length>150||!Number.isFinite(draft.updatedAt)||!object(draft.fields)||JSON.stringify(draft.fields).length>150000)throw Error('Unsupported draft record.');
      const allowed=draft.type==='notebook'?['original','meaning','lesson','corrections']:['draft','meaning'];
      for(const [key,field] of Object.entries(draft.fields)){
        if(!allowed.includes(key))throw Error('Unsupported draft field.');
        if(key==='corrections'){
          if(!object(field)||Object.values(field).some(text=>typeof text!=='string'||text.length>5000))throw Error('Invalid correction draft.');
        }else if(typeof field!=='string'||field.length>5000)throw Error('Invalid writing draft.');
      }
    }
    return value;
  }
  function draftSlots(storage,key){
    const slots=[];
    for(let i=0;i<storage.length;i++){
      const slot=storage.key(i);
      // Read only this exact owner/language prefix, never another account's values.
      if(slot?.startsWith(key+':'))slots.push({key:slot,raw:storage.getItem(slot)});
    }
    return slots;
  }
  function readDrafts(storage,key){
    const data=parseDrafts(storage.getItem(key)),drafts={...data.drafts};
    for(const slot of draftSlots(storage,key))for(const [id,draft] of Object.entries(parseDrafts(slot.raw).drafts)){
      if(!drafts[id]||draft.updatedAt>=drafts[id].updatedAt)drafts[id]=draft;
    }
    return {version:1,drafts};
  }
  function saveDraft(storage,scope,language,id,type,context,fields,{unsaved=true}={}){
    if(locked)throw Error('An update is being checked; wait before typing.');
    const key=draftKey(scope,language),draft={type,context,fields:clone(fields),updatedAt:Date.now()};
    memory.set(key+':'+id,{key,id,draft,saved:false});dirty('draft:'+id,unsaved);
    const current=readDrafts(storage,key); // preserve unreadable/future records
    const next={version:1,drafts:{[id]:draft}};
    // One atomic slot per page draft avoids a cross-tab read/modify/write race.
    // The aggregate key remains readable for recovery imports and older drafts.
    parseDrafts(JSON.stringify({version:1,drafts:{...current.drafts,[id]:draft}}));storage.setItem(key+':'+id,JSON.stringify(next));
    memory.set(key+':'+id,{key,id,draft,saved:true});return draft;
  }
  function listDrafts(storage,scope,language,type,context){
    const key=draftKey(scope,language),drafts={...readDrafts(storage,key).drafts};
    for(const value of memory.values())if(value.key===key)drafts[value.id]=value.draft;
    return Object.entries(drafts).filter(([,draft])=>draft.type===type&&draft.context===context).map(([id,draft])=>({id,...draft})).sort((a,b)=>b.updatedAt-a.updatedAt);
  }
  function removeDraft(storage,scope,language,id,expected){
    const key=draftKey(scope,language),data=readDrafts(storage,key);
    if(expected&&JSON.stringify(data.drafts[id])!==JSON.stringify({type:expected.type,context:expected.context,fields:expected.fields,updatedAt:expected.updatedAt}))return;
    const aggregate=parseDrafts(storage.getItem(key));
    if(aggregate.drafts[id]){const drafts={...aggregate.drafts};delete drafts[id];storage.setItem(key,JSON.stringify({version:1,drafts}));}
    storage.removeItem(key+':'+id);memory.delete(key+':'+id);dirty('draft:'+id,false);
  }
  // Recovery files use record descriptors, never arbitrary storage keys supplied by a file.
  function recordKey(record,scope){
    const owner=record.owner==='guest'?'guest':scope;
    if(record.type==='settings')return 'catalyst_settings';
    if(record.type==='audio')return 'catalyst_audio_prefs';
    if(record.type==='notebook')return root.CatalystNotebook.key(owner,record.language);
    if(record.type==='review')return root.CatalystReview.storageKey(owner,record.language);
    if(record.type==='activity')return root.CatalystActivityProgress.key(owner,record.language);
    if(record.type==='draft')return draftKey(owner,record.language);
    throw Error('Unsupported recovery record.');
  }
  const archiveKey=scope=>'catalyst_recovery_copies_v1:'+encodeURIComponent(scope);
  const journalKey=scope=>'catalyst_recovery_journal_v1:'+encodeURIComponent(scope);
  function parseCopies(raw){const value=raw===null?{version:1,copies:[]}:JSON.parse(raw);if(!object(value)||value.version!==1||Object.keys(value).some(key=>!['version','copies'].includes(key))||!Array.isArray(value.copies)||value.copies.some(copy=>!object(copy)||!object(copy.record)||typeof copy.raw!=='string'))throw Error('Recovery copies cannot be read; export their raw contents first.');return value;}
  const copyDescriptor=record=>({type:record.type,owner:record.owner,language:record.language});
  const copyIdentity=(record,raw)=>JSON.stringify([copyDescriptor(record),raw]);
  function knownCopies(raw){
    try{
      const value=parseCopies(raw);
      // Flatten only the known inert envelope. Unknown fields/formats are kept
      // verbatim as a single copy rather than silently discarded or executed.
      if(Object.keys(value).some(key=>!['version','copies'].includes(key))||value.copies.some(copy=>
        Object.keys(copy).some(key=>!['record','raw'].includes(key))||
        Object.keys(copy.record).some(key=>!['type','owner','language'].includes(key))||
        !['notebook','review','draft','activity','settings','audio','retained-copies','retained-journal'].includes(copy.record.type)||
        !['current','guest','device'].includes(copy.record.owner)||
        (copy.record.language!==undefined&&!languages.includes(copy.record.language))))return null;
      return value.copies;
    }catch{return null;}
  }
  function exportRecovery(storage,scope,{guest=false,device=true}={}){
    if(!scope||scope==='loading')throw Error('Wait for the current account before exporting.');
    const records=[],damagedDraftCopies=[];
    const owners=scope==='guest'?['guest']:['current',...guest?['guest']:[]];
    for(const owner of owners)for(const language of languages)for(const type of ['notebook','review','draft','activity']){
      const descriptor={owner,language,type},key=recordKey(descriptor,scope);let raw=storage.getItem(key);
      if(type==='draft'&&draftSlots(storage,key).length){
        try{raw=JSON.stringify(readDrafts(storage,key));}
        catch(error){for(const slot of draftSlots(storage,key))damagedDraftCopies.push({record:descriptor,raw:slot.raw});}
      }
      if(raw!==null)records.push({...descriptor,raw});
    }
    if(device)for(const type of ['settings','audio']){const raw=storage.getItem(recordKey({type},scope));if(raw!==null)records.push({owner:'device',type,raw});}
    let copies=storage.getItem(archiveKey(scope));const journal=storage.getItem(journalKey(scope));
    if(damagedDraftCopies.length)copies=JSON.stringify({version:1,copies:[...damagedDraftCopies,...copies?[{record:{type:'retained-copies',owner:scope==='guest'?'guest':'current'},raw:copies}]:[]]});
    const result={format:'catalyst-recovery',version:1,owner:scope==='guest'?{kind:'guest'}:{kind:'account',id:scope},createdAt:new Date().toISOString(),records,copies,journal};
    if(new TextEncoder().encode(JSON.stringify(result)).length>MAX_RECOVERY_BYTES)throw Error('This recovery file exceeds 25 MB. Export individual notebooks to protect them, then review the retained recovery copies.');
    return result;
  }
  const MAX_RECOVERY_BYTES=25*1024*1024;
  function parseRecovery(raw,scope){
    if(typeof raw!=='string'||new TextEncoder().encode(raw).length>MAX_RECOVERY_BYTES)throw Error('Choose a Catalyst recovery file smaller than 25 MB.');
    const value=JSON.parse(raw.replace(/^\uFEFF/,''));
    if(!object(value)||value.format!=='catalyst-recovery'||value.version!==1||!object(value.owner)||!['guest','account'].includes(value.owner.kind)||!Array.isArray(value.records)||value.records.length>42)throw Error('Unsupported Catalyst recovery file. Notebook-only exports still use Import / restore notebook.');
    if(value.owner.kind==='account'&&(scope==='guest'||scope!==value.owner.id))throw Error('Sign in to the same account that created this recovery file. Import never signs you in or transfers another account’s records.');
    const seen=new Set();
    for(const record of value.records){
      if(!object(record)||typeof record.raw!=='string'||!['notebook','review','draft','activity','settings','audio'].includes(record.type))throw Error('Invalid recovery record.');
      if(['settings','audio'].includes(record.type)){if(record.owner!=='device'||record.language!==undefined)throw Error('Invalid device record.');}
      else if(!['guest','current'].includes(record.owner)||!languages.includes(record.language)||(record.owner==='current'&&value.owner.kind!=='account'))throw Error('Invalid recovery owner or language.');
      const key=recordKey(record,scope);if(seen.has(key))throw Error('Duplicate recovery records.');seen.add(key);
    }
    for(const key of ['copies','journal'])if(value[key]!==null&&value[key]!==undefined&&typeof value[key]!=='string')throw Error('Invalid retained recovery copy.');
    return value;
  }
  function parsed(record,raw){
    if(record.type==='notebook')return root.CatalystNotebook.parse(raw);
    if(record.type==='review')return root.CatalystReview.parse(raw);
    if(record.type==='activity')return root.CatalystActivityProgress.parse(raw);
    if(record.type==='draft')return parseDrafts(raw);
    if(record.type==='settings')return settings(raw);
    if(record.type==='audio'){const value=JSON.parse(raw);if(!object(value))throw Error('Invalid audio preferences.');return value;}
  }
  function planRecovery(storage,scope,backup){
    const originalCopies=storage.getItem(archiveKey(scope)),archive=parseCopies(originalCopies),previousJournal=storage.getItem(journalKey(scope));
    const copies=[...archive.copies],seen=new Set(copies.map(copy=>copyIdentity(copy.record,copy.raw)));
    const summary={records:backup.records.length,changed:0,notebooks:0,sentences:0,notes:0,reviews:0,drafts:0,activities:0,copies:0,damaged:0};
    const changes=[],snapshots=[],draftInventories=[];
    const retain=(record,raw)=>{const descriptor=copyDescriptor(record);const identity=copyIdentity(descriptor,raw);if(!seen.has(identity)){copies.push({record:descriptor,raw});seen.add(identity);summary.copies++;}};
    for(const record of backup.records){
      const key=recordKey(record,scope),before=storage.getItem(key);snapshots.push({key,raw:before});
      let incoming,current;
      if(record.type==='draft'){const slots=draftSlots(storage,key);snapshots.push(...slots);draftInventories.push({key,slots:slots.map(slot=>slot.key).sort()});}
      try{incoming=parsed(record,record.raw);current=record.type==='draft'?readDrafts(storage,key):before===null?null:parsed(record,before);}catch(error){retain(record,record.raw);summary.damaged++;continue;}
      let next=current===null?incoming:current;
      if(record.type==='notebook'){
        const merged=root.CatalystNotebook.merge(current||{version:1,entries:[]},incoming);next=merged.data;summary.notebooks++;summary.sentences+=merged.summary.added;summary.notes+=merged.summary.notesAdded;
      }else if(current!==null&&JSON.stringify(current)!==JSON.stringify(incoming)){
        // Conflicting snapshots are retained in full; never add review counters
        // from two histories or silently replace a newer schedule/draft.
        retain(record,record.raw);
        if(record.type==='review'){
          next={version:1,items:{...incoming.items,...current.items},states:{...incoming.states,...current.states}};
        }else if(record.type==='activity')next={version:1,items:{...incoming.items,...current.items}};
        else if(record.type==='draft')next={version:1,drafts:{...incoming.drafts,...current.drafts}};
        else if(record.type==='settings')next={...incoming,...current,learned:[...new Set([...(current.learned||[]),...(incoming.learned||[])])]};
      }
      if(record.type==='review')summary.reviews+=Object.keys(next.items).length;
      if(record.type==='draft')summary.drafts+=Object.keys(next.drafts).length;
      if(record.type==='activity')summary.activities+=Object.keys(next.items).length;
      const after=JSON.stringify(next);if(before!==after){changes.push({key,before,after});summary.changed++;}
    }
    // Existing history must not wrap itself on each export/import cycle.
    // Known copy envelopes merge as inert records; journals are never replayed.
    const owner=scope==='guest'?'guest':'current';
    if(backup.copies&&backup.copies!==originalCopies){
      const incomingCopies=knownCopies(backup.copies);
      if(incomingCopies){for(const copy of incomingCopies)if(!(copy.record.type==='retained-journal'&&copy.record.owner===owner&&copy.raw===previousJournal))retain(copy.record,copy.raw);}
      else retain({type:'retained-copies',owner},backup.copies);
    }
    if(backup.journal&&backup.journal!==previousJournal)retain({type:'retained-journal',owner},backup.journal);
    snapshots.push({key:archiveKey(scope),raw:originalCopies},{key:journalKey(scope),raw:previousJournal});
    if(changes.length&&previousJournal)retain({type:'retained-journal',owner:scope==='guest'?'guest':'current'},previousJournal);
    const archiveAfter=JSON.stringify({version:1,copies});
    if(copies.length&&archiveAfter!==originalCopies)changes.push({key:archiveKey(scope),before:originalCopies,after:archiveAfter});
    return {scope,summary,changes,snapshots,draftInventories};
  }
  function commitRecovery(storage,plan){
    if(locked)throw Error('An update is in progress. Retry afterward.');
    for(const inventory of plan.draftInventories)if(JSON.stringify(draftSlots(storage,inventory.key).map(slot=>slot.key).sort())!==JSON.stringify(inventory.slots))throw Error('Drafts changed since preview. Select the file again to review the current merge.');
    for(const snapshot of plan.snapshots)if(storage.getItem(snapshot.key)!==snapshot.raw)throw Error('Records changed since preview. Select the file again to review the current merge.');
    if(!plan.changes.length)return;
    const archiveChange=plan.changes.find(change=>change.key===archiveKey(plan.scope));
    const records=plan.changes.filter(change=>change.key!==archiveKey(plan.scope));
    // Append retained history atomically before replacing its old journal. If
    // this fails, the previous journal and learner records are untouched.
    if(archiveChange)storage.setItem(archiveChange.key,archiveChange.after);
    if(!records.length)return;
    // The archive is additive and already durable: do not embed its whole
    // history inside the next journal. Record both sides of learner changes.
    const journal=plan.snapshots.find(snapshot=>snapshot.key===journalKey(plan.scope));
    if(storage.getItem(journal.key)!==journal.raw)throw Error('Recovery history changed during restore. Preview the file again.');
    storage.setItem(journal.key,JSON.stringify({version:1,createdAt:new Date().toISOString(),changes:records}));
    for(const change of records){
      if(storage.getItem(change.key)!==change.before)throw Error('A record changed during restore. The recovery journal preserves the proposed merge. Preview again.');
      storage.setItem(change.key,change.after);
    }
    // Keep the journal for recovery/export; do not delete historical data.
  }
  root.CatalystSafety={dirty,hasDirty,setLocked:value=>{locked=value;},isLocked:()=>locked,settings,writeSettings,draftKey,parseDrafts,saveDraft,listDrafts,removeDraft,exportRecovery,parseRecovery,planRecovery,commitRecovery,MAX_RECOVERY_BYTES,archiveKey,journalKey};
})(typeof window==='undefined'?globalThis:window);

;
/* Window-side controller. Registration/download happen only after a user action. */
(function(root){
  'use strict';
  if(!root.document)return;
  const base=new URL('./',location.href);base.search='';base.hash='';
  const workerURL=new URL('sw.js',base).href;
  const build=()=>document.querySelector('meta[name="catalyst-build"]')?.content||'unknown';
  const supported=()=>!!(root.isSecureContext&&navigator.serviceWorker&&root.caches&&root.indexedDB&&root.crypto?.subtle);
  let state={supported:supported(),appBuild:build(),phase:'idle',message:'',active:null,candidate:null,manifest:null,locked:false},registration=null,initialized=false,applying=false,lockNonce=null,unlockTimer=null;
  const listeners=new Set(),publish=patch=>{state={...state,...patch};for(const fn of listeners)fn();};
  function rpc(worker,type,timeout=15000){
    return new Promise((resolve,reject)=>{
      if(!worker){reject(Error('The app worker is not ready. Retry while connected.'));return;}
      const channel=new MessageChannel(),timer=setTimeout(()=>{channel.port1.close();reject(Error('The offline worker did not respond. Keep this page open and retry.'));},timeout);
      channel.port1.onmessage=event=>{clearTimeout(timer);channel.port1.close();event.data.ok?resolve(event.data.value):reject(Error(event.data.error));};
      worker.postMessage({catalystOffline:1,type},[channel.port2]);
    });
  }
  const owned=worker=>worker?.scriptURL===workerURL;
  async function refresh(){
    if(!supported())return;
    try{
      const found=await navigator.serviceWorker.getRegistration(base.href);
      registration=found&&[found.active,found.waiting,found.installing].some(owned)?found:null;
      if(!registration){publish({active:null,candidate:null,phase:'idle'});return;}
      const active=owned(registration.active)?await rpc(registration.active,'STATUS'):null;
      const candidate=owned(registration.waiting)?await rpc(registration.waiting,'STATUS'):active;
      publish({active,candidate,phase:candidate?.state||'idle',controlled:owned(navigator.serviceWorker.controller),appBuild:build()});
    }catch(error){publish({phase:'error',message:error.message,controlled:false});}
  }
  function unlock(){clearTimeout(unlockTimer);lockNonce=null;root.CatalystSafety.setLocked(false);document.getElementById('root')?.removeAttribute('inert');publish({locked:false});}
  function init(){
    if(initialized)return;initialized=true;
    root.addEventListener('beforeunload',event=>{if(root.CatalystSafety.hasDirty()){event.preventDefault();event.returnValue='';}});
    if(!supported())return;
    navigator.serviceWorker.addEventListener('message',event=>{
      const data=event.data;if(data?.catalystOffline!==1||!owned(event.source))return;
      if(data.type==='PREPARE_UPDATE'){
        const credentials=[...document.querySelectorAll('input[type="password"],input[type="email"]')].some(input=>input.value);
        const clean=!root.CatalystSafety.hasDirty()&&!credentials;
        if(clean){lockNonce=data.nonce;root.CatalystSafety.setLocked(true);document.getElementById('root')?.setAttribute('inert','');publish({locked:true});clearTimeout(unlockTimer);unlockTimer=setTimeout(unlock,30000);}
        event.source.postMessage({catalystOffline:1,type:'UPDATE_VOTE',nonce:data.nonce,clean});
      }else if(data.type==='CANCEL_UPDATE'&&lockNonce===data.nonce)unlock();
      else if(data.type==='ACTIVATED'){
        const reload=applying&&lockNonce===data.nonce;unlock();applying=false;
        if(reload)location.reload();else{publish({message:'An updated app is active. Reload this tab when your writing is saved.'});refresh();}
      }else if(data.type==='PROGRESS'){
        if(data.value.state==='repair-needed'){publish({active:null,phase:'repair-needed',message:data.value.error});}
        else publish({phase:data.value.state,candidate:{...state.candidate,...data.value,candidateBuild:data.value.buildId},message:data.value.error||''});
      }else if(data.type==='ERROR')publish({message:data.error,phase:'error'});
      else if(data.type==='CHANGED')refresh();
    });
    navigator.serviceWorker.addEventListener('controllerchange',()=>refresh()); // never auto-reload
    root.addEventListener('focus',refresh);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refresh();});
    refresh();
  }
  async function open(){
    init();publish({message:''});
    if(!supported())return;
    await refresh();
    const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),15000);
    try{
      const response=await fetch(new URL('release-manifest.json',base),{cache:'no-store',credentials:'omit',signal:abort.signal});
      if(!response.ok)throw Error('Connect to check the current app download.');
      const manifest=await response.json();if(manifest.schemaVersion!==1||!/^[a-f0-9]{20}$/.test(manifest.buildId))throw Error('The release inventory is unavailable.');
      const estimate=await navigator.storage?.estimate?.().catch(()=>null);
      const persisted=await navigator.storage?.persisted?.().catch(()=>false);
      publish({manifest,estimate,persisted});
    }catch(error){if(!state.candidate)publish({message:'Connect to check download size and prepare the app.'});}finally{clearTimeout(timer);}
  }
  async function ensure(){
    registration=await navigator.serviceWorker.register(workerURL,{scope:base.pathname,updateViaCache:'none'});
    if(registration.installing)await new Promise((resolve,reject)=>{
      const worker=registration.installing,timer=setTimeout(()=>reject(Error('Worker installation is still pending. Retry shortly.')),15000);
      const changed=()=>{if(['installed','activated'].includes(worker.state)){clearTimeout(timer);resolve();}else if(worker.state==='redundant'){clearTimeout(timer);reject(Error('The new worker could not install. The previous app is preserved.'));}};
      worker.addEventListener('statechange',changed);changed();
    });
    return registration.waiting||registration.active;
  }
  async function action(fn){try{publish({message:''});await fn();}catch(error){publish({phase:'error',message:error.message});applying=false;unlock();}}
  async function download(){return action(async()=>{
    if(!supported())throw Error('This browser cannot save an offline app. Use a secure browser or Home Screen web app.');
    init();publish({phase:'preparing'});
    const worker=await ensure(),info=await rpc(worker,'STATUS');
    const estimate=await navigator.storage?.estimate?.();
    if(estimate?.quota&&estimate.quota-estimate.usage<info.totalBytes-info.bytes+1024*1024)throw Error('There may not be enough device storage for this download. Free space and retry; saved writing is untouched.');
    const persisted=await navigator.storage?.persist?.().catch(()=>false);
    publish({candidate:info,persisted,phase:'downloading'});await rpc(worker,'DOWNLOAD');
  });}
  async function pause(){return action(async()=>{await rpc(registration?.waiting||registration?.active,'PAUSE');await refresh();});}
  async function check(){return action(async()=>{if(!registration)return open();publish({phase:'checking'});await registration.update();await ensure();await refresh();});}
  async function apply(){return action(async()=>{
    if(root.CatalystSafety.hasDirty())throw Error('Save your writing or keep the draft for later before updating.');
    applying=true;await rpc(registration?.waiting||registration?.active,'APPLY',20000);
  });}
  function ready(){return !!(state.active?.activeHealthy&&state.controlled&&state.appBuild===state.active.workerBuild&&state.appBuild===state.active.activeBuild);}
  root.CatalystOffline={init,open,download,pause,check,apply,refresh,ready,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},getSnapshot:()=>state};
})(typeof window==='undefined'?globalThis:window);

;
// UI controller for optional public audio packs. Only the matching active app worker owns writes.
(function(root){
  'use strict';if(!root.document)return;
  const base=new URL('./',location.href);base.search='';base.hash='';
  const workerURL=new URL('sw.js',base).href,core=root.CatalystMediaCore;
  let state={packs:{},busy:null,message:''},initialized=false,lastSequence=0;const listeners=new Set(),pending=new Map(),wanted=new Set();
  const key=(l,v)=>l+':'+v,owned=worker=>worker?.scriptURL===workerURL;
  function emit(patch){state={...state,...patch};root.CatalystSafety?.dirty('audio-operation',!!state.busy);listeners.forEach(fn=>fn());root.CatalystAudio?.refreshSources();}
  function update(language,voice,value){emit({packs:{...state.packs,[key(language,voice)]:{...state.packs[key(language,voice)],...value}}});}
  const supported=()=>root.CatalystOffline?.ready()&&root.CatalystOffline.getSnapshot().active?.audioProtocol===1&&owned(navigator.serviceWorker?.controller);
  function rpc(type,language,voice,timeout=40000){
    if(!supported())return Promise.reject(Error('Download or update the app files first, then prepare audio.'));
    return new Promise((resolve,reject)=>{const channel=new MessageChannel(),timer=setTimeout(()=>{channel.port1.close();reject(Error('The audio worker did not respond. Reopen Study offline to verify saved files and resume.'));},timeout);
      channel.port1.onmessage=e=>{clearTimeout(timer);channel.port1.close();e.data.ok?resolve(e.data.value):reject(Error(e.data.error));};
      navigator.serviceWorker.controller.postMessage({catalystOffline:1,type,language,voice},[channel.port2]);
    });
  }
  function init(){
    if(initialized)return;initialized=true;if(!navigator.serviceWorker)return;
    navigator.serviceWorker.addEventListener('message',e=>{
      if(!owned(e.source)||e.source!==navigator.serviceWorker.controller||e.data?.catalystOffline!==1)return;const m=e.data;
      if(m.type==='AUDIO_PROGRESS'){
        const v=m.value;if(v.sequence<=lastSequence)return;lastSequence=v.sequence;if(v.state){update(v.language,v.voice,v);emit({busy:['downloading','checking','removing'].includes(v.state)?key(v.language,v.voice):null});}
        if(v.repair)update(v.language,v.voice,{activeHealthy:false,error:'A saved recording is missing or damaged. Resume / repair this audio pack.'});
        if(v.changed)refresh(v.language,v.voice,true);
      }else if(m.type==='AUDIO_ERROR'){update(m.language,m.voice,{error:m.error,state:'error'});refresh(m.language,m.voice,true);}
    });
    const recheck=()=>{for(const k of wanted){const [l,v]=k.split(':');refresh(l,v);}};
    let wasReady=false;root.CatalystOffline.subscribe(()=>{const ready=!!supported();if(ready!==wasReady){wasReady=ready;if(ready)recheck();root.CatalystAudio?.refreshSources();}});
    root.addEventListener('focus',recheck);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')recheck();});navigator.serviceWorker.addEventListener('controllerchange',()=>{lastSequence=0;recheck();});
  }
  async function refresh(language,voice,force=false){
    init();if(!voice)return Promise.all(core.VOICES.map(v=>refresh(language,v)));
    const k=key(language,voice);wanted.add(k);if(pending.has(k))return force?pending.get(k).then(()=>refresh(language,voice)):pending.get(k);if(!supported())return null;
    const promise=(async()=>{try{const value=await rpc('AUDIO_STATUS',language,voice);update(language,voice,value);emit({busy:value.busy});return value;}catch(error){update(language,voice,{activeHealthy:false,error:error.message});emit({busy:null});return null;}finally{pending.delete(k);}})();pending.set(k,promise);return promise;
  }
  async function action(type,language,voice){
    init();emit({message:''});
    try{
      if(type==='AUDIO_DOWNLOAD'){
        const pack=state.packs[key(language,voice)]?.candidate,done=state.packs[key(language,voice)]?.progress?.bytes||0;
        const estimate=await navigator.storage?.estimate?.();
        if(estimate?.quota&&pack&&estimate.quota-estimate.usage<pack.totalBytes-done+1024*1024)throw Error('There may not be enough device space. Free space and retry; existing writing and audio are preserved.');
        await navigator.storage?.persist?.().catch(()=>false);
      }
      if(type!=='AUDIO_PAUSE'){emit({busy:key(language,voice)});update(language,voice,{state:type==='AUDIO_CHECK'?'checking':type==='AUDIO_REMOVE'?'removing':'downloading',error:''});}
      await rpc(type,language,voice);
      if(type!=='AUDIO_DOWNLOAD')await refresh(language,voice,true);
    }catch(error){emit({message:error.message});await refresh(language,voice);if(!supported())emit({busy:null});}
  }
  function lookup(text,language,voice){
    if(!supported())return null;const hash=core.hash(text),first=voice==='m'?'m':'f';
    for(const v of [first,first==='m'?'f':'m']){
      const r=state.packs[key(language,v)];if(!r?.activeHealthy)continue;
      const file=r.active?.files.find(f=>f.hash===hash&&f.textSha256===root.CatalystMediaCatalog?.languages[language]?.[hash]);
      if(file)return {url:new URL(`__catalyst_audio__/${language}/${v}/${hash}/${file.sha256}.mp3`,base).href,voice:v,voiceName:r.active.voiceName};
    }
    return null;
  }
  root.CatalystMedia={init,refresh,lookup,supported,check:(l,v)=>action('AUDIO_CHECK',l,v),download:(l,v)=>action('AUDIO_DOWNLOAD',l,v),pause:(l,v)=>action('AUDIO_PAUSE',l,v),remove:(l,v)=>action('AUDIO_REMOVE',l,v),getSnapshot:()=>state,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);}};
})(typeof window==='undefined'?globalThis:window);

;
// Local study ownership is separate from Supabase authentication. No tokens are copied.
(function(root){
  'use strict';
  const KEY='catalyst_offline_owner_v1';
  const denied=e=>[401,403].includes(Number(e?.status))||['42501','PGRST301','PGRST302','bad_jwt','session_not_found','refresh_token_not_found'].includes(e?.code);
  function create({client,storage,authKey,events=root,online=()=>root.navigator?.onLine!==false,now=()=>new Date().toISOString(),timeout=12000}){
    let state={scope:'loading',owner:null,session:null,online:false,prepared:false,message:'',epoch:0},epoch=0,stopped=false,started=false,subscription;
    const listeners=new Set();
    const emit=patch=>{state={...state,...patch,epoch};listeners.forEach(fn=>fn());};
    function saved(){
      const raw=storage.getItem(KEY);if(!raw)return null;
      const value=JSON.parse(raw);
      if(value.version!==1||typeof value.enabled!=='boolean'||typeof value.revision!=='string'||(value.enabled&&(!value.owner||typeof value.owner.id!=='string'||!value.owner.id||typeof value.owner.label!=='string'||!Number.isFinite(Date.parse(value.verifiedAt)))))throw Error('Offline account settings are unreadable. Existing records are preserved.');
      return value;
    }
    // Read only this SDK key, never enumerate other accounts or copy credentials.
    function sdkOwner(){try{const raw=storage.getItem(authKey);return raw?JSON.parse(raw)?.user?.id||'?':null;}catch{return '?';}}
    function marker(){try{return saved();}catch{return {error:'Offline account settings are unreadable. Existing records are preserved.'};}}
    function revoke(){
      const old=marker();
      if(old?.error)return old.error;
      try{storage.setItem(KEY,JSON.stringify({version:1,enabled:false,revision:root.crypto.randomUUID()}));return '';}
      catch{try{storage.removeItem(KEY);return '';}catch{return 'Offline access could not be disabled in storage. Close this app on a shared device and retry sign-out when storage works.';}}
    }
    function local(message=''){
      const stored=marker(),id=sdkOwner(),prepared=stored?.enabled===true&&stored.owner.id===id;
      if(stored?.enabled&&!prepared)revoke();
      emit({scope:prepared?id:id?'loading':'guest',owner:prepared?stored.owner:null,session:null,online:false,prepared,
        message:stored?.error||message||(prepared?'Offline study · sign-in and source refresh pending.':id?'Connect to verify this account before opening its notebook.':'')});
    }
    async function bounded(promise){let timer;try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Sign-in verification timed out.')),timeout);})]);}finally{clearTimeout(timer);}}
    function valid(ticket){
      if(stopped||ticket.epoch!==epoch||ticket.owner!==state.owner?.id||sdkOwner()!==ticket.owner)return false;
      return state.online||marker()?.enabled===true&&marker()?.owner?.id===ticket.owner;
    }
    async function verify(){
      if(stopped)return false;
      const run=++epoch;
      // Preserve the current notebook while a same-owner network verification runs.
      if(state.owner?.id!==sdkOwner()||!online())local();
      if(!client||!online()){if(!client)local();return false;}
      try{
        const result=await bounded(client.auth.getSession());if(run!==epoch||stopped)return false;
        if(result.error)throw result.error;
        const session=result.data?.session;
        if(!session){local();return false;}
        if(sdkOwner()!==session.user?.id){local();return false;}
        const checked=await bounded(client.auth.getUser(session.access_token));if(run!==epoch||stopped)return false;
        if(checked.error)throw checked.error;
        const user=checked.data?.user;
        if(!user?.id||user.id!==session.user.id||sdkOwner()!==user.id)throw Object.assign(Error('Account changed. Sign in again.'),{status:401});
        const m=marker();if(m?.enabled&&m.owner.id!==user.id)revoke();
        emit({scope:user.id,owner:{id:user.id,label:user.email||user.id},session,online:true,prepared:m?.enabled===true&&m.owner.id===user.id,message:m?.error||''});return true;
      }catch(error){
        if(run!==epoch||stopped)return false;
        if(denied(error)){const message=revoke();emit({scope:'loading',owner:null,session:null,online:false,prepared:false,message:message||'Sign-in is no longer valid. Sign in again to open your account records.'});}
        else local('Could not verify sign-in. '+(marker()?.enabled?'Using the prepared account offline.':'Connect and retry; account records have not been opened as guest.'));
        return false;
      }
    }
    async function prepare(){
      if(!await verify())throw Error('Connect and verify your sign-in before preparing this account.');
      const m=marker();if(m?.error)throw Error(m.error);
      const value={version:1,enabled:true,owner:state.owner,verifiedAt:now(),revision:root.crypto.randomUUID()};
      storage.setItem(KEY,JSON.stringify(value));emit({prepared:true,message:'Account prepared for offline notebooks and reviews.'});return ticket();
    }
    function ticket(){return {owner:state.owner?.id,epoch};}
    async function signOut(){
      ++epoch;const message=revoke();emit({scope:'guest',owner:null,session:null,online:false,prepared:false,message});
      try{const result=await bounded(client.auth.signOut({scope:'local'}));if(result?.error)throw result.error;}
      catch{emit({message:message||'Signed out on this device. Server sign-out could not be confirmed; reconnect to retry.'});}
    }
    function authChanged(event,session){
      if(event==='SIGNED_OUT'){++epoch;const message=revoke();emit({scope:'guest',owner:null,session:null,online:false,prepared:false,message});return;}
      if(session?.user?.id&&session.user.id!==state.owner?.id){++epoch;local();}
      // Never await another SDK call inside its auth callback (SDK lock).
      if(event!=='INITIAL_SESSION')setTimeout(()=>{if(!stopped)verify();},0);
    }
    function storageChanged(event){
      if(event.key!==KEY&&event.key!==authKey&&event.key!==null)return;
      if(event.key===authKey&&sdkOwner()===state.owner?.id)return; // same-owner token rotation
      ++epoch;local();if(online())setTimeout(()=>verify(),0);
    }
    function disconnected(){++epoch;local();}
    const connected=()=>verify();
    function start(){
      if(started)return;started=true;stopped=false;local();
      subscription=client?.auth.onAuthStateChange(authChanged)?.data?.subscription;
      events.addEventListener?.('storage',storageChanged);events.addEventListener?.('offline',disconnected);events.addEventListener?.('online',connected);events.addEventListener?.('focus',connected);verify();
    }
    function stop(){stopped=true;++epoch;subscription?.unsubscribe();for(const [name,fn] of [['storage',storageChanged],['offline',disconnected],['online',connected],['focus',connected]])events.removeEventListener?.(name,fn);started=false;}
    function disable(message){++epoch;const error=revoke();emit({prepared:false,message:error||message});}
    return {start,stop,verify,prepare,signOut,disable,ticket,valid,getSnapshot:()=>state,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);}};
  }
  root.CatalystAccount={KEY,create,denied};
})(typeof window==='undefined'?globalThis:window);

;
// Complete, derived source data only. Learner writing remains in its existing stores.
(function(root){
  'use strict';
  const DB='catalyst_study_snapshots_v1',STORE='snapshots';
  const error=(message,code)=>Object.assign(Error(message),{code});
  const denied=e=>root.CatalystAccount.denied(e)||e?.code==='ACCESS_DENIED';
  const changed=e=>['ACCESS_DENIED','ACCESS_CHANGED','ACCESS_UNAVAILABLE'].includes(e?.code)||denied(e);
  const descriptor=(owner,language,source,kind='ratings')=>({owner,language,source,kind});
  const key=d=>JSON.stringify([1,d.owner,d.language,d.source,d.kind]);
  function normalize(d,data){
    if(!Array.isArray(data?.words)||data.words.length>100000)throw error('Source did not return a complete word list.','INVALID_SOURCE');
    const seen=new Set(),words=data.words.map(row=>{
      if(!row||!['string','number'].includes(typeof row.id)||row.language!==d.language||seen.has(String(row.id)))throw error('Source returned ambiguous words. Previous snapshot retained.','INVALID_SOURCE');
      seen.add(String(row.id));
      const fields=d.kind==='patterns'?['id','language','native','english']:['id','language','source','text','english','status','label','level','rating'];
      const out={};for(const field of fields)if(row[field]!==undefined){if(row[field]!==null&&!['string','number'].includes(typeof row[field]))throw error('Invalid word value.','INVALID_SOURCE');out[field]=row[field];}
      if(typeof out[d.kind==='patterns'?'native':'text']!=='string'||(d.kind==='ratings'&&(out.source!==d.source||typeof out.label!=='string')))throw error('Source word contract changed.','INVALID_SOURCE');
      return out;
    });
    return {words,linked:d.kind==='patterns'?words.length:words.filter(w=>w.status!=='unrated').length,source:d.source,language:d.language};
  }
  async function kgAccess(client,language){
    const allowed=await client.rpc('kg_chart_is_allowed');if(allowed.error)throw Object.assign(Error(allowed.error.message||'KG Chart access check failed.'),allowed.error,{status:allowed.error.status||allowed.status});
    if(allowed.data!==true)throw error('KG Chart access is no longer available for this account.','ACCESS_DENIED');
    const access=await client.rpc('kg_chart_u3_my_access_snapshot');
    if(access.error){access.error.status=access.error.status||access.status;if(denied(access.error))throw access.error;if(['PGRST202','42883'].includes(access.error.code))throw error('KG Chart offline words are not ready: the account permission service has not been deployed.','ACCESS_UNAVAILABLE');throw access.error;}
    const a=access.data;
    // Restricted profiles need a separately validated source contract. Never infer
    // permission from an empty result or from unenforced client-side feature grants.
    if(a?.contract!==1||a.mode!=='legacy'||!Number.isInteger(a.revision)||a.languages!==null||a.topics!==null||a.features!==null)throw error('KG Chart offline words require a compatible, verified permission contract.','ACCESS_UNAVAILABLE');
    const visibility=await client.rpc('kg_chart_my_private_lesson_visibility',{p_language:language});
    if(visibility.error){visibility.error.status=visibility.error.status||visibility.status;if(denied(visibility.error))throw visibility.error;if(['PGRST202','42883'].includes(visibility.error.code))throw error('KG Chart offline words are not ready: private lesson checks have not been deployed.','ACCESS_UNAVAILABLE');throw visibility.error;}
    const v=visibility.data;
    if(v?.contract!==1||!Array.isArray(v.topics)||!v.topics.every(t=>typeof t==='string')||!Array.isArray(v.groups)||!v.groups.every(g=>typeof g==='string'))throw error('KG Chart private lesson checks are unavailable.','ACCESS_UNAVAILABLE');
    const hidden=[...new Set(v.topics)].sort();
    return {signature:JSON.stringify([1,a.mode,a.revision,hidden]),allows:topic=>typeof topic==='string'&&!!topic&&!hidden.includes(topic)};
  }
  function create({indexedDB,storage,account,client,events=root,now=()=>new Date().toISOString()}){
    let dbPromise,version=0;const listeners=new Set();
    const notify=()=>{version++;listeners.forEach(fn=>fn());};
    function db(){return dbPromise||(dbPromise=new Promise((resolve,reject)=>{
      if(!indexedDB){reject(Error('This browser cannot save word snapshots.'));return;}
      const request=indexedDB.open(DB,1);request.onupgradeneeded=()=>request.result.createObjectStore(STORE);
      request.onerror=()=>{dbPromise=null;reject(request.error);};request.onblocked=()=>reject(Error('Close older Catalyst tabs and retry word storage.'));
      request.onsuccess=()=>{const value=request.result;value.onversionchange=()=>{value.close();dbPromise=null;};resolve(value);};
    }));}
    async function transact(mode,fn){const database=await db();return new Promise((resolve,reject)=>{const tx=database.transaction(STORE,mode);let result,failure;tx.oncomplete=()=>resolve(result);tx.onerror=tx.onabort=()=>reject(failure||tx.error||Error('Word storage interrupted.'));fn(tx.objectStore(STORE),value=>{result=value;},tx,error=>{failure=error;tx.abort();});});}
    const gateKey=d=>'catalyst_snapshot_gate_v1:'+encodeURIComponent(d.owner)+':'+d.source;
    const gate=d=>storage.getItem(gateKey(d))||'initial';
    const storageChanged=e=>{const owner=account.getSnapshot().owner?.id;if(owner&&(e.key===null||e.key?.startsWith('catalyst_snapshot_gate_v1:'+encodeURIComponent(owner)+':')))notify();};
    events.addEventListener?.('storage',storageChanged);
    function usable(d){const s=account.getSnapshot();return s.prepared&&s.owner?.id===d.owner&&account.valid(account.ticket());}
    function validate(d,record){
      if(record.version!==1||key(record)!==key(d)||!Number.isFinite(Date.parse(record.savedAt))||typeof record.gate!=='string')throw Error('Saved words are unreadable. The original snapshot is preserved.');
      return {...record,data:normalize(d,record.data)};
    }
    async function read(d){
      if(!usable(d))return null;
      const ticket=account.ticket(),record=await transact('readonly',(store,done)=>{store.get(key(d)).onsuccess=e=>done(e.target.result);});
      if(!account.valid(ticket)||!usable(d))return null;
      if(!record)return null;
      const validated=validate(d,record);
      if(record.gate!==gate(d))throw Error('Saved words are locked until source access is checked and refreshed online.');
      return validated;
    }
    function lock(d){
      try{storage.setItem(gateKey(d),root.crypto.randomUUID());}
      catch{account.disable('Offline account access paused because a source denial could not be saved. Reconnect and prepare again.');}
      notify();
    }
    async function fetch(d,access){
      if(d.kind==='patterns')return {words:await root.CatalystPatterns.load(client,d.owner,access)};
      return root.CatalystVocabulary.loadSource(client,d.owner,d.language,d.source,access);
    }
    async function refresh(d,{persist=false,current=()=>true}={}){
      const ticket=account.ticket(),initialGate=gate(d),check=()=>account.valid(ticket)&&current()&&gate(d)===initialGate;
      if(!account.getSnapshot().online||!check())throw error('Connect to refresh your words.','OFFLINE');
      try{
        const before=persist&&d.source==='kg'?await kgAccess(client,d.language):null;
        if(!check())throw error('Account or language changed.','CANCELLED');
        const data=normalize(d,await fetch(d,before));
        if(!check())throw error('Account or language changed.','CANCELLED');
        if(before){const after=await kgAccess(client,d.language);if(after.signature!==before.signature)throw error('KG Chart permissions changed during download. Retry to refresh.','ACCESS_CHANGED');}
        if(!check())throw error('Account or language changed.','CANCELLED');
        if(!persist)return {data,savedAt:null};
        if(!usable(d))throw error('Prepare this account before saving words.','CANCELLED');
        const record={version:1,...d,data,savedAt:now(),gate:initialGate,permission:before?.signature||'owner-v1'};
        await transact('readwrite',(store,done,tx,fail)=>{
          if(!check()){tx.abort();return;}
          // Validate inside the write transaction so a newer/unknown format is
          // never overwritten, including one another tab wrote during download.
          store.get(key(d)).onsuccess=e=>{
            try{
              if(e.target.result)validate(d,e.target.result);
              if(!check()){tx.abort();return;}
              const request=store.put(record,key(d));request.onsuccess=()=>{if(!check())tx.abort();else done(record);};
            }catch(error){fail(error);}
          };
        });
        if(!check())throw error('Account or language changed.','CANCELLED');
        notify();return record;
      }catch(e){if(check()&&changed(e))lock(d);throw e;}
    }
    async function load(d,{current=()=>true}={}){
      let cached=null,readError;try{cached=await read(d);}catch(e){readError=e;}
      if(!current())throw error('View changed.','CANCELLED');
      if(!account.getSnapshot().online){if(cached)return {...cached.data,savedAt:cached.savedAt,stale:true,message:'Offline · saved words; refresh pending.'};throw readError||Error('No saved words for this account, language and source. Prepare them online in Study offline.');}
      if(readError)throw readError;
      try{
        // Only an explicitly prepared source is automatically refreshed.
        const result=await refresh(d,{persist:!!cached,current});
        return {...result.data,savedAt:result.savedAt,stale:false,message:''};
      }catch(e){
        if(e.code==='CANCELLED'||!current())throw e;
        if(changed(e)||readError)throw e;
        if(cached&&usable(d)){
          // A sibling tab may have locked this source while the network request
          // was pending. Re-read the durable gate before showing stale words.
          const retained=await read(d);
          if(retained&&current())return {...retained.data,savedAt:retained.savedAt,stale:true,message:'Refresh failed · using the last complete saved words.'};
        }
        throw e;
      }
    }
    return {read,refresh,load,lock,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},getVersion:()=>version,close:async()=>{events.removeEventListener?.('storage',storageChanged);if(dbPromise)(await dbPromise).close();dbPromise=null;}};
  }
  root.CatalystSnapshots={DB,STORE,descriptor,key,normalize,kgAccess,create};
})(typeof window==='undefined'?globalThis:window);
