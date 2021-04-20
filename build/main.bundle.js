(()=>{"use strict";var e={481:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BinarySearchTreePrinterVisualAdapter=t.BinarySearchTreePrinterConsoleAdapter=t.BinarySearchTreePrinterAdapter=t.BinarySearchTreePrinterAdapterFactory=void 0;const i=r(882);t.BinarySearchTreePrinterAdapterFactory=class{create(e){let t;switch(e){case i.AdapterType.ConsoleAdapter:t=this.createConsoleAdapter();break;case i.AdapterType.VisualAdapter:t=this.createVisualAdapter();break;default:t=null}return t}createConsoleAdapter(){return new a}createVisualAdapter(){return new _}};class n{constructor(e){this._type=e,this._treeDepth=0}setTreeDepth(e){this._treeDepth=e}getTreeDepth(){return this._treeDepth}print(){throw new Error(i.NOT_IMPLEMENTED_METHOD)}clear(){throw new Error(i.NOT_IMPLEMENTED_METHOD)}}t.BinarySearchTreePrinterAdapter=n;class a extends n{constructor(){super(i.AdapterType.ConsoleAdapter)}print(e=null,t=i.X_START,r=i.Y_START,n=0,a=0,_=1){console.log(`Value=${e}, x=${t}, y=${r}, prevX=${n}, prevY=${a}, depth=${_}`)}}t.BinarySearchTreePrinterConsoleAdapter=a;class _ extends n{constructor(){if(super(i.AdapterType.VisualAdapter),this._ctx=null,!window)throw new Error(i.METHOD_ALLOWED_IN_BROWSER);this.setupContext()}setupContext(){let e=document.getElementsByTagName("canvas")[0];e||(e=document.createElement("canvas"),e.width=i.MAX_CANVAS_WIDTH,e.height=i.MAX_CANVAS_HEIGHT,document.body.append(e)),this._ctx=e.getContext("2d")}clear(){this._ctx&&this._ctx.clearRect(0,0,i.MAX_CANVAS_WIDTH,i.MAX_CANVAS_HEIGHT)}print(e=null,t=i.X_START,r=i.Y_START,n=0,a=0,_=1){if(this._ctx&&e){const s=`${e}`.length,o=s>2?1.5*(s-2):0,d=i.FONT_SIZE-o;this._ctx.font=`${d}px serif`,this._ctx.fillStyle=`${i.RECT_COLOR}`,this._ctx.fillRect(t,r,i.RECT_SIZE,i.RECT_SIZE),this._ctx.strokeText(`${e}`,o?t:t+.5*i.FONT_SIZE,r+1.25*i.FONT_SIZE),n&&a&&_>2&&this.drawPath(n,a+i.RECT_SIZE,t,r)}}drawPath(e,t,r,n){this._ctx&&(this._ctx.beginPath(),this._ctx.moveTo(e,t),this._ctx.lineWidth=i.LINE_WIDTH,this._ctx.lineTo(r,n),this._ctx.stroke())}}t.BinarySearchTreePrinterVisualAdapter=_},813:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=r(882);t.default=class{constructor(e,t){this._tree=e,this._adapter=t,this._adapter.setTreeDepth(this._tree.maxDepth())}getAdapter(){return this._adapter}print(e=i.Loop.InOrder){if(this._tree)switch(e){case i.Loop.PreOrder:this.printPreOrder(this._tree.getRoot());break;case i.Loop.PostOrder:this.printPostOrder(this._tree.getRoot());break;default:this.printInOrder(this._tree.getRoot())}}printPreOrder(e,t=i.X_START,r=i.Y_START,n=0,a=0,_=1){e&&(this._adapter.print(e._value,t,r,n,a,_),this.printPreOrder(e._left,t-i.STEP*_,r+i.STEP*_,t,r,_+1),this.printPreOrder(e._right,t+i.STEP*_,r+i.STEP*_,t,r,_+1))}printInOrder(e,t=i.X_START,r=i.Y_START,n=0,a=0,_=1){e&&(this.printInOrder(e._left,t-i.STEP*_,r+i.STEP*_,t,r,_+1),this._adapter.print(e._value,t,r,n,a,_),this.printInOrder(e._right,t+i.STEP*_,r+i.STEP*_,t,r,_+1))}printPostOrder(e,t=i.X_START,r=i.Y_START,n=0,a=0,_=1){e&&(this.printPostOrder(e._left,t-i.STEP*_,r+i.STEP*_,t,r,_+1),this.printPostOrder(e._right,t+i.STEP*_,r+i.STEP*_,t,r,_+1),this._adapter.print(e._value,t,r,n,a,_))}}},638:function(e,t,r){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(r(164));t.default=class{constructor(){this._root=null}getRoot(){return this._root}add(e){this._root?this.addNode(this._root,e):this._root=new n.default(e)}delete(e){this._root=this.deleteNode(this._root,e)}find(e,t=this._root){return t?e!==t._value?this.find(e,e<t._value?t._left:t._right):t:null}maxDepth(e=this._root){if(!e)return 0;const t=this.maxDepth(e._left),r=this.maxDepth(e._right);return t>r?t+1:r+1}addNode(e,t){this.find(t)||(t<e._value?e._left?this.addNode(e._left,t):e._left=new n.default(t):e._right?this.addNode(e._right,t):e._right=new n.default(t))}deleteNode(e,t){if(!e)return null;if(t<e._value)return e._left=this.deleteNode(e._left,t),e;if(t>e._value)return e._right=this.deleteNode(e._right,t),e;if(!e._left&&!e._right)return null;if(!e._left)return e._right;if(!e._right)return e._left;const r=this.findMin(e._right);return e._value=r._value,e._right=this.deleteNode(e._right,r._value),e}findMin(e){return e._left?this.findMin(e._left):e}}},882:(e,t)=>{var r,i;Object.defineProperty(t,"__esModule",{value:!0}),t.LINE_WIDTH=t.Y_COEFF=t.X_COEFF=t.MAX_WIDTH=t.STEP=t.Y_START=t.X_START=t.RECT_SIZE=t.RECT_COLOR=t.FONT_SIZE=t.MAX_CANVAS_HEIGHT=t.MAX_CANVAS_WIDTH=t.CANVAS_NOT_SPECIFIED=t.METHOD_ALLOWED_IN_BROWSER=t.NOT_IMPLEMENTED_METHOD=t.Loop=t.AdapterType=void 0,(i=t.AdapterType||(t.AdapterType={}))[i.ConsoleAdapter=0]="ConsoleAdapter",i[i.VisualAdapter=1]="VisualAdapter",(r=t.Loop||(t.Loop={}))[r.InOrder=0]="InOrder",r[r.PreOrder=1]="PreOrder",r[r.PostOrder=2]="PostOrder",t.NOT_IMPLEMENTED_METHOD="Method not implemented",t.METHOD_ALLOWED_IN_BROWSER="This method allowed in browser",t.CANVAS_NOT_SPECIFIED="Missing canvas property at BinarySearchTreePrinterVisualAdapterZoom constructor",t.MAX_CANVAS_WIDTH=1920,t.MAX_CANVAS_HEIGHT=1280,t.FONT_SIZE=16,t.RECT_COLOR="#95a5a655",t.RECT_SIZE=2*t.FONT_SIZE,t.X_START=t.MAX_CANVAS_WIDTH/2,t.Y_START=0,t.STEP=t.RECT_SIZE,t.MAX_WIDTH=25,t.X_COEFF=1,t.Y_COEFF=1,t.LINE_WIDTH=.5},164:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e){this._value=e,this._left=null,this._right=null}}},406:function(e,t,r){var i,n,a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const _=a(r(638)),s=a(r(813)),o=r(481),d=new _.default;for(const e of[14,24,9,6,21,16,12,8,26])d.add(e);const l=(new o.BinarySearchTreePrinterAdapterFactory).createVisualAdapter(),h=new s.default(d,l);h.print(),null===(i=document.querySelector("button.add-input"))||void 0===i||i.addEventListener("click",(e=>{e.preventDefault();const t=document.getElementById("input"),r=t.value;""!==r&&r.length===Number(r).toString().length&&(h.getAdapter().clear(),d.add(Number(r)),h.print(),t.value="")})),null===(n=document.querySelector("button.delete-input"))||void 0===n||n.addEventListener("click",(e=>{e.preventDefault();const t=document.getElementById("input"),r=t.value;""!==r&&r.length===Number(r).toString().length&&(h.getAdapter().clear(),d.delete(Number(r)),h.print(),t.value="")}))}},t={};!function r(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,r),a.exports}(406)})();
//# sourceMappingURL=main.bundle.js.map