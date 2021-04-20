(()=>{"use strict";var t={481:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.BinarySearchTreePrinterVisualAdapter=e.BinarySearchTreePrinterConsoleAdapter=e.BinarySearchTreePrinterAdapter=e.BinarySearchTreePrinterAdapterFactory=void 0;const i=r(882);e.BinarySearchTreePrinterAdapterFactory=class{create(t){let e;switch(t){case i.AdapterType.ConsoleAdapter:e=this.createConsoleAdapter();break;case i.AdapterType.VisualAdapter:e=this.createVisualAdapter();break;default:e=null}return e}createConsoleAdapter(){return new s}createVisualAdapter(t=null){return new n(t)}};class o{constructor(t){this._type=t,this._treeDepth=0}setTreeDepth(t){this._treeDepth=t}getTreeDepth(){return this._treeDepth}print(){throw new Error(i.NOT_IMPLEMENTED_METHOD)}clear(){throw new Error(i.NOT_IMPLEMENTED_METHOD)}getZoom(){throw new Error(i.NOT_IMPLEMENTED_METHOD)}}e.BinarySearchTreePrinterAdapter=o;class s extends o{constructor(){super(i.AdapterType.ConsoleAdapter)}print(t=null,e=i.X_START,r=i.Y_START,o=0,s=0,n=1){console.log(`Value=${t}, x=${e}, y=${r}, prevX=${o}, prevY=${s}, depth=${n}`)}}e.BinarySearchTreePrinterConsoleAdapter=s;class n extends o{constructor(t=null){if(super(i.AdapterType.VisualAdapter),this._zoom=t,this._ctx=null,!window)throw new Error(i.METHOD_ALLOWED_IN_BROWSER);this.setupContext()}getZoom(){return this._zoom}setupContext(){let t=document.getElementsByTagName("canvas")[0];t||(t=document.createElement("canvas"),document.body.append(t)),t.width=i.MAX_CANVAS_WIDTH,t.height=i.MAX_CANVAS_HEIGHT,this._ctx=t.getContext("2d")}clear(){this._ctx&&this._ctx.clearRect(0,0,i.MAX_CANVAS_WIDTH,i.MAX_CANVAS_HEIGHT)}print(t=null,e=i.X_START,r=i.Y_START,o=0,s=0,n=1){var a,_;this._zoom&&(e===i.X_START&&r===i.Y_START?this.draw(t,this._zoom.getXstartScaled(),this._zoom.getYstartScaled(),o,s,n):this.draw(t,e,r,o,s,n)),console.log(`depth=${n}, value=${t}, x=${e}, y=${r}, prevX=${o}, prevY=${s}, X_START=[${null===(a=this._zoom)||void 0===a?void 0:a.X_START_SCALED},${i.X_START}], Y_START=${null===(_=this._zoom)||void 0===_?void 0:_.Y_START_SCALED},${i.Y_START}`)}draw(t,e,r,o,s,n,a=1){if(this._ctx){const _=`${t}`.length,h=_>2?1.5*(_-2):0,d=(i.FONT_SIZE-h)*a;this._ctx.font=`${this._zoom?this._zoom.ify(d):d}px serif`,this._ctx.fillStyle=`${i.RECT_COLOR}`,this._ctx.fillRect(this._zoom?this._zoom.Xify(e):e,this._zoom?this._zoom.Yify(r):r,this._zoom?this._zoom.ify(i.RECT_SIZE):i.RECT_SIZE,this._zoom?this._zoom.ify(i.RECT_SIZE):i.RECT_SIZE);const l=h?e:e+.5*i.FONT_SIZE,T=r+1.25*i.FONT_SIZE;this._ctx.strokeText(`${t}`,this._zoom?this._zoom.Xify(l):l,this._zoom?this._zoom.Yify(T):T),o&&s&&n>2&&this.drawPath(this._zoom?this._zoom.Xify(o):o,this._zoom?this._zoom.Yify(s+i.RECT_SIZE):s+i.RECT_SIZE,this._zoom?this._zoom.Xify(e):e,this._zoom?this._zoom.Yify(r):r)}}drawPath(t,e,r,o){this._ctx&&(this._ctx.beginPath(),this._ctx.moveTo(t,e),this._ctx.lineWidth=i.LINE_WIDTH,this._ctx.lineTo(r,o),this._ctx.stroke())}}e.BinarySearchTreePrinterVisualAdapter=n},508:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.BinarySearchTreePrinterVisualAdapterZoom=void 0;const i=r(882);e.BinarySearchTreePrinterVisualAdapterZoom=class{constructor(t=document.body,e=document.getElementsByTagName("canvas")[0],r=(()=>{}),o=5,s=.2,n=1,a=0,_=0,h=0,d=0,l=i.X_START,T=i.Y_START){if(this.menuParent=t,this.canvas=e,this.draw=r,this.MAX_ZOOM=o,this.MIN_ZOOM=s,this.scale=n,this.worldX=a,this.worldY=_,this.mouseScreenX=h,this.mouseScreenY=d,this.X_START_SCALED=l,this.Y_START_SCALED=T,this.setRender=t=>{this.draw=t},!e)throw new Error(i.CANVAS_NOT_SPECIFIED);this.initMenu(),this.ify=this.ify.bind(this),this.Xify=this.Xify.bind(this),this.Yify=this.Yify.bind(this),this.xFromScreenToWorld=this.xFromScreenToWorld.bind(this),this.yFromScreenToWorld=this.yFromScreenToWorld.bind(this)}getXstartScaled(){return this.X_START_SCALED}getYstartScaled(){return this.Y_START_SCALED}ify(t){return Math.floor(t*this.scale)}Xify(t){return Math.floor((t-this.worldX)*this.scale+this.mouseScreenX)}Yify(t){return Math.floor((t-this.worldY)*this.scale+this.mouseScreenY)}xFromScreenToWorld(t){return Math.floor((t-this.mouseScreenX)*(1/this.scale)+this.worldX)}yFromScreenToWorld(t){return Math.floor((t-this.mouseScreenY)*(1/this.scale)+this.worldY)}clear(){var t;const e=null===(t=this.canvas)||void 0===t?void 0:t.getContext("2d");e&&e.clearRect(0,0,i.MAX_CANVAS_WIDTH,i.MAX_CANVAS_HEIGHT)}onWay(t){switch(t){case"left":this.X_START_SCALED-=i.X_START_STEP;break;case"up":this.Y_START_SCALED-=i.Y_START_STEP;break;case"right":this.X_START_SCALED+=i.X_START_STEP;break;case"down":this.Y_START_SCALED+=i.Y_START_STEP;break;case"zoom-in":this.scale=Math.min(this.scale+i.SCALE_STEP,this.MAX_ZOOM);break;case"zoom-out":this.scale=Math.max(this.scale-i.SCALE_STEP,this.MIN_ZOOM)}this.clear(),this.draw()}initMenu(){this.createMenu(["left","up","right","down"]),this.createMenu(["zoom-in","zoom-out"])}createMenu(t,e=this.menuParent){const r=document.createElement("div");r.classList.add("btn-group"),this.menuParent.append(r);for(const e of t){const t=document.createElement("button");t.innerText=e,t.classList.add("btn","btn-secondary"),t.onclick=t=>{this.onWay(e),t.preventDefault()},r.append(t)}e.append(document.createElement("br")),e.append(r)}}},813:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0});const i=r(882);e.default=class{constructor(t,e){this._tree=t,this._adapter=e,this._adapter.setTreeDepth(this._tree.maxDepth()),this.print=this.print.bind(this)}getAdapter(){return this._adapter}print(t=i.Loop.InOrder){if(this._tree)switch(t){case i.Loop.PreOrder:this.printPreOrder(this._tree.getRoot());break;case i.Loop.PostOrder:this.printPostOrder(this._tree.getRoot());break;default:this.printInOrder(this._tree.getRoot())}}printPreOrder(t,e=i.X_START,r=i.Y_START,o=0,s=0,n=1){t&&(this._adapter.print(t._value,e,r,o,s,n),this.printPreOrder(t._left,e-i.STEP*n,r+i.STEP*n,e,r,n+1),this.printPreOrder(t._right,e+i.STEP*n,r+i.STEP*n,e,r,n+1))}printInOrder(t,e,r,o,s,n){var a,_,h,d;void 0===e&&(e=null!==(_=null===(a=this._adapter.getZoom())||void 0===a?void 0:a.X_START_SCALED)&&void 0!==_?_:i.X_START),void 0===r&&(r=null!==(d=null===(h=this._adapter.getZoom())||void 0===h?void 0:h.Y_START_SCALED)&&void 0!==d?d:i.Y_START),void 0===o&&(o=0),void 0===s&&(s=0),void 0===n&&(n=1),t&&(this.printInOrder(t._left,e-i.STEP*n,r+i.STEP*n,e,r,n+1),this._adapter.print(t._value,e,r,o,s,n),this.printInOrder(t._right,e+i.STEP*n,r+i.STEP*n,e,r,n+1))}printPostOrder(t,e=i.X_START,r=i.Y_START,o=0,s=0,n=1){t&&(this.printPostOrder(t._left,e-i.STEP*n,r+i.STEP*n,e,r,n+1),this.printPostOrder(t._right,e+i.STEP*n,r+i.STEP*n,e,r,n+1),this._adapter.print(t._value,e,r,o,s,n))}}},638:function(t,e,r){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=i(r(164));e.default=class{constructor(){this._root=null}getRoot(){return this._root}add(t){this._root?this.addNode(this._root,t):this._root=new o.default(t)}delete(t){this._root=this.deleteNode(this._root,t)}find(t,e=this._root){return e?t!==e._value?this.find(t,t<e._value?e._left:e._right):e:null}maxDepth(t=this._root){if(!t)return 0;const e=this.maxDepth(t._left),r=this.maxDepth(t._right);return e>r?e+1:r+1}addNode(t,e){this.find(e)||(e<t._value?t._left?this.addNode(t._left,e):t._left=new o.default(e):t._right?this.addNode(t._right,e):t._right=new o.default(e))}deleteNode(t,e){if(!t)return null;if(e<t._value)return t._left=this.deleteNode(t._left,e),t;if(e>t._value)return t._right=this.deleteNode(t._right,e),t;if(!t._left&&!t._right)return null;if(!t._left)return t._right;if(!t._right)return t._left;const r=this.findMin(t._right);return t._value=r._value,t._right=this.deleteNode(t._right,r._value),t}findMin(t){return t._left?this.findMin(t._left):t}}},882:(t,e)=>{var r,i;Object.defineProperty(e,"__esModule",{value:!0}),e.Y_START_STEP=e.X_START_STEP=e.LINE_WIDTH=e.STEP=e.Y_START=e.X_START=e.SCALE_STEP=e.RECT_SIZE=e.RECT_COLOR=e.FONT_SIZE=e.MAX_CANVAS_HEIGHT=e.MAX_CANVAS_WIDTH=e.CANVAS_NOT_SPECIFIED=e.METHOD_ALLOWED_IN_BROWSER=e.NOT_IMPLEMENTED_METHOD=e.Loop=e.AdapterType=void 0,(i=e.AdapterType||(e.AdapterType={}))[i.ConsoleAdapter=0]="ConsoleAdapter",i[i.VisualAdapter=1]="VisualAdapter",(r=e.Loop||(e.Loop={}))[r.InOrder=0]="InOrder",r[r.PreOrder=1]="PreOrder",r[r.PostOrder=2]="PostOrder",e.NOT_IMPLEMENTED_METHOD="Method not implemented",e.METHOD_ALLOWED_IN_BROWSER="This method allowed in browser",e.CANVAS_NOT_SPECIFIED="Missing canvas property at BinarySearchTreePrinterVisualAdapterZoom constructor",e.MAX_CANVAS_WIDTH=1920,e.MAX_CANVAS_HEIGHT=1280,e.FONT_SIZE=16,e.RECT_COLOR="#95a5a655",e.RECT_SIZE=2*e.FONT_SIZE,e.SCALE_STEP=.1,e.X_START=e.MAX_CANVAS_WIDTH/2,e.Y_START=0,e.STEP=e.RECT_SIZE,e.LINE_WIDTH=.5,e.X_START_STEP=50,e.Y_START_STEP=50},164:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){this._value=t,this._left=null,this._right=null}}},406:function(t,e,r){var i,o,s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=s(r(638)),a=s(r(813)),_=r(481),h=r(508),d=new n.default;for(const t of[14,24,9,6,21,16,12,8,26])d.add(t);const l=new h.BinarySearchTreePrinterVisualAdapterZoom(document.querySelectorAll(".form-group")[0]),T=(new _.BinarySearchTreePrinterAdapterFactory).createVisualAdapter(l),c=new a.default(d,T);l.setRender(c.print),c.print(),null===(i=document.querySelector("button.add-input"))||void 0===i||i.addEventListener("click",(t=>{t.preventDefault();const e=document.getElementById("input"),r=e.value;""!==r&&r.length===Number(r).toString().length&&(c.getAdapter().clear(),d.add(Number(r)),c.print(),e.value="")})),null===(o=document.querySelector("button.delete-input"))||void 0===o||o.addEventListener("click",(t=>{t.preventDefault();const e=document.getElementById("input"),r=e.value;""!==r&&r.length===Number(r).toString().length&&(c.getAdapter().clear(),d.delete(Number(r)),c.print(),e.value="")}))}},e={};!function r(i){var o=e[i];if(void 0!==o)return o.exports;var s=e[i]={exports:{}};return t[i].call(s.exports,s,s.exports,r),s.exports}(406)})();
//# sourceMappingURL=main.bundle.js.map