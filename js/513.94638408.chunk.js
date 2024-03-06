"use strict";(self.webpackChunkreact_game=self.webpackChunkreact_game||[]).push([[513],{513:function(e,t,r){r.d(t,{Uy:function(){return B}});var n=Symbol.for("immer-nothing"),o=Symbol.for("immer-draftable"),i=Symbol.for("immer-state");function c(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var a=Object.getPrototypeOf;function s(e){return!!e&&!!e[i]}function u(e){return!!e&&(l(e)||Array.isArray(e)||!!e[o]||!!e.constructor?.[o]||h(e)||b(e))}var f=Object.prototype.constructor.toString();function l(e){if(!e||"object"!=typeof e)return!1;const t=a(e);if(null===t)return!0;const r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object||"function"==typeof r&&Function.toString.call(r)===f}function _(e,t){0===p(e)?Object.entries(e).forEach((([r,n])=>{t(r,n,e)})):e.forEach(((r,n)=>t(n,r,e)))}function p(e){const t=e[i];return t?t.type_:Array.isArray(e)?1:h(e)?2:b(e)?3:0}function d(e,t){return 2===p(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function y(e,t,r){const n=p(e);2===n?e.set(t,r):3===n?e.add(r):e[t]=r}function h(e){return e instanceof Map}function b(e){return e instanceof Set}function m(e){return e.copy_||e.base_}function v(e,t){if(h(e))return new Map(e);if(b(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);if(!t&&l(e)){if(!a(e)){const t=Object.create(null);return Object.assign(t,e)}return{...e}}const r=Object.getOwnPropertyDescriptors(e);delete r[i];let n=Reflect.ownKeys(r);for(let t=0;t<n.length;t++){const o=n[t],i=r[o];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(r[o]={configurable:!0,writable:!0,enumerable:i.enumerable,value:e[o]})}return Object.create(a(e),r)}function g(e,t=!1){return w(e)||s(e)||!u(e)||(p(e)>1&&(e.set=e.add=e.clear=e.delete=P),Object.freeze(e),t&&_(e,((e,t)=>g(t,!0)))),e}function P(){c(2)}function w(e){return Object.isFrozen(e)}var S,z={};function O(e){const t=z[e];return t||c(0),t}function F(){return S}function j(e,t){t&&(O("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function A(e){D(e),e.drafts_.forEach(k),e.drafts_=null}function D(e){e===S&&(S=e.parent_)}function C(e){return S={drafts_:[],parent_:S,immer_:e,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function k(e){const t=e[i];0===t.type_||1===t.type_?t.revoke_():t.revoked_=!0}function M(e,t){t.unfinalizedDrafts_=t.drafts_.length;const r=t.drafts_[0];return void 0!==e&&e!==r?(r[i].modified_&&(A(t),c(4)),u(e)&&(e=N(t,e),t.parent_||R(t,e)),t.patches_&&O("Patches").generateReplacementPatches_(r[i].base_,e,t.patches_,t.inversePatches_)):e=N(t,r,[]),A(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==n?e:void 0}function N(e,t,r){if(w(t))return t;const n=t[i];if(!n)return _(t,((o,i)=>E(e,n,t,o,i,r))),t;if(n.scope_!==e)return t;if(!n.modified_)return R(e,n.base_,!0),n.base_;if(!n.finalized_){n.finalized_=!0,n.scope_.unfinalizedDrafts_--;const t=n.copy_;let o=t,i=!1;3===n.type_&&(o=new Set(t),t.clear(),i=!0),_(o,((o,c)=>E(e,n,t,o,c,r,i))),R(e,t,!1),r&&e.patches_&&O("Patches").generatePatches_(n,r,e.patches_,e.inversePatches_)}return n.copy_}function E(e,t,r,n,o,i,c){if(s(o)){const c=N(e,o,i&&t&&3!==t.type_&&!d(t.assigned_,n)?i.concat(n):void 0);if(y(r,n,c),!s(c))return;e.canAutoFreeze_=!1}else c&&r.add(o);if(u(o)&&!w(o)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;N(e,o),t&&t.scope_.parent_||R(e,o)}}function R(e,t,r=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&g(t,r)}var x={get(e,t){if(t===i)return e;const r=m(e);if(!d(r,t))return function(e,t,r){const n=W(t,r);return n?"value"in n?n.value:n.get?.call(e.draft_):void 0}(e,r,t);const n=r[t];return e.finalized_||!u(n)?n:n===U(e.base_,t)?(I(e),e.copy_[t]=X(n,e)):n},has(e,t){return t in m(e)},ownKeys(e){return Reflect.ownKeys(m(e))},set(e,t,r){const n=W(m(e),t);if(n?.set)return n.set.call(e.draft_,r),!0;if(!e.modified_){const n=U(m(e),t),a=n?.[i];if(a&&a.base_===r)return e.copy_[t]=r,e.assigned_[t]=!1,!0;if(((o=r)===(c=n)?0!==o||1/o==1/c:o!=o&&c!=c)&&(void 0!==r||d(e.base_,t)))return!0;I(e),L(e)}var o,c;return e.copy_[t]===r&&(void 0!==r||t in e.copy_)||Number.isNaN(r)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=r,e.assigned_[t]=!0),!0},deleteProperty(e,t){return void 0!==U(e.base_,t)||t in e.base_?(e.assigned_[t]=!1,I(e),L(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const r=m(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n?{writable:!0,configurable:1!==e.type_||"length"!==t,enumerable:n.enumerable,value:r[t]}:n},defineProperty(){c(11)},getPrototypeOf(e){return a(e.base_)},setPrototypeOf(){c(12)}},K={};function U(e,t){const r=e[i];return(r?m(r):e)[t]}function W(e,t){if(!(t in e))return;let r=a(e);for(;r;){const e=Object.getOwnPropertyDescriptor(r,t);if(e)return e;r=a(r)}}function L(e){e.modified_||(e.modified_=!0,e.parent_&&L(e.parent_))}function I(e){e.copy_||(e.copy_=v(e.base_,e.scope_.immer_.useStrictShallowCopy_))}_(x,((e,t)=>{K[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),K.deleteProperty=function(e,t){return K.set.call(this,e,t,void 0)},K.set=function(e,t,r){return x.set.call(this,e[0],t,r,e[0])};function X(e,t){const r=h(e)?O("MapSet").proxyMap_(e,t):b(e)?O("MapSet").proxySet_(e,t):function(e,t){const r=Array.isArray(e),n={type_:r?1:0,scope_:t?t.scope_:F(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let o=n,i=x;r&&(o=[n],i=K);const{revoke:c,proxy:a}=Proxy.revocable(o,i);return n.draft_=a,n.revoke_=c,a}(e,t);return(t?t.scope_:F()).drafts_.push(r),r}function $(e){if(!u(e)||w(e))return e;const t=e[i];let r;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,r=v(e,t.scope_.immer_.useStrictShallowCopy_)}else r=v(e,!0);return _(r,((e,t)=>{y(r,e,$(t))})),t&&(t.finalized_=!1),r}var q=new class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(e,t,r)=>{if("function"==typeof e&&"function"!=typeof t){const r=t;t=e;const n=this;return function(e=r,...o){return n.produce(e,(e=>t.call(this,e,...o)))}}let o;if("function"!=typeof t&&c(6),void 0!==r&&"function"!=typeof r&&c(7),u(e)){const n=C(this),i=X(e,void 0);let c=!0;try{o=t(i),c=!1}finally{c?A(n):D(n)}return j(n,r),M(o,n)}if(!e||"object"!=typeof e){if(o=t(e),void 0===o&&(o=e),o===n&&(o=void 0),this.autoFreeze_&&g(o,!0),r){const t=[],n=[];O("Patches").generateReplacementPatches_(e,o,t,n),r(t,n)}return o}c(1)},this.produceWithPatches=(e,t)=>{if("function"==typeof e)return(t,...r)=>this.produceWithPatches(t,(t=>e(t,...r)));let r,n;return[this.produce(e,t,((e,t)=>{r=e,n=t})),r,n]},"boolean"==typeof e?.autoFreeze&&this.setAutoFreeze(e.autoFreeze),"boolean"==typeof e?.useStrictShallowCopy&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){u(e)||c(8),s(e)&&(e=function(e){s(e)||c(10);return $(e)}(e));const t=C(this),r=X(e,void 0);return r[i].isManual_=!0,D(t),r}finishDraft(e,t){const r=e&&e[i];r&&r.isManual_||c(9);const{scope_:n}=r;return j(n,t),M(void 0,n)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let r;for(r=t.length-1;r>=0;r--){const n=t[r];if(0===n.path.length&&"replace"===n.op){e=n.value;break}}r>-1&&(t=t.slice(r+1));const n=O("Patches").applyPatches_;return s(e)?n(e,t):this.produce(e,(e=>n(e,t)))}},B=q.produce;q.produceWithPatches.bind(q),q.setAutoFreeze.bind(q),q.setUseStrictShallowCopy.bind(q),q.applyPatches.bind(q),q.createDraft.bind(q),q.finishDraft.bind(q)}}]);
//# sourceMappingURL=513.94638408.chunk.js.map