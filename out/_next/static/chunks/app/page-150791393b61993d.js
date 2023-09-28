(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3916:function(e,t,r){Promise.resolve().then(r.bind(r,6295))},6295:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return ef}});var n,s,a,o,l=r(4526),i=r(8690);function c(e){switch(e){case"bs":return a.Bootstrap;case"cm":return a.Centimetres;case"em":return a.Ems;case"ft":return a.Feet;case"in":return a.Inches;case"mm":return a.Millimetres;case"pc":return a.Picas;case"px":return a.Pixels;case"pt":return a.Points;case"rem":return a.Rems;case"tw":return a.Tailwind;default:return null}}function u(e){return"string"==typeof e?null!==c(e)||Object.values(a).includes(e):!!Object.values(a).includes(e)}function d(e){let{input:t,type:r,callback:n}=e,s=(0,i.useRef)(null),o=(0,i.useRef)(null),c=e=>{if(e.preventDefault(),e.stopPropagation(),e.target instanceof HTMLInputElement){if(Number.isNaN(parseFloat(e.target.value)))return;let t=parseFloat(e.target.value);t<0||n(t,r)}else if(e.target instanceof HTMLSelectElement){var s;let r=null===(s=e.target.selectedOptions[0])||void 0===s?void 0:s.text;r&&u(r)&&n(t,r)}};return(0,i.useEffect)(()=>{s.current&&s.current.focus()},[]),(0,l.jsxs)("div",{className:"flex flex-col border-b border-app-green-600 px-10 pb-8 pt-11 lg:col-span-2 lg:row-span-2 lg:flex-row lg:justify-center lg:border",children:[(0,l.jsxs)("div",{className:"mb-6 flex items-center justify-center lg:mb-0 lg:ml-6",children:[(0,l.jsxs)("svg",{width:"67",height:"46",viewBox:"0 0 67 46",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("path",{d:"M26.0972 23.1105L17.0444 7.15912L1 16.2646L10.0527 32.2161",fill:"#4EBD85"}),(0,l.jsx)("path",{d:"M26.0972 23.1105L17.0444 7.15912L1 16.2646L10.0527 32.2161",stroke:"#003641",strokeWidth:"2",strokeLinejoin:"round"}),(0,l.jsx)("path",{d:"M10.0527 32.216L43.4719 14.1078L41.9617 1L65.2671 23.2891L41.9617 44.8241L43.4719 31.4604L10.0527 32.216Z",fill:"#CFF9B9",stroke:"#003641",strokeWidth:"2",strokeLinejoin:"round"})]}),(0,l.jsx)("h1",{className:"font-space ml-1 text-4xl font-bold text-app-black",children:"UnitSwitch"})]}),(0,l.jsxs)("div",{className:"flex max-w-sm flex-col justify-center md:mx-auto md:w-96 lg:ml-12",children:[(0,l.jsx)("div",{className:"mb-2",children:(0,l.jsx)("input",{className:"border-green-usw-600 font-space-code text-green-usw-500 focus:ring-teal-usw-500 w-full rounded-sm border bg-app-green-100 px-1.5 py-1 font-bold focus:outline-none focus:ring",type:"number",value:t,ref:s,onChange:c})}),(0,l.jsx)("div",{children:(0,l.jsx)("select",{className:"border-green-usw-600 font-space text-black-usw focus:ring-teal-usw-500 rounded-sm border bg-app-gray-50 px-0.5 py-1 focus:outline-none focus:ring",name:"units",value:r,ref:o,onChange:c,"data-testid":"unit-type",children:Object.values(a).map((e,t)=>(0,l.jsx)("option",{value:e,children:e},t))})}),(0,l.jsx)("div",{className:"font-space-code mt-1 hidden text-app-gray-200 lg:block",children:(0,l.jsx)("small",{children:(0,l.jsx)("code",{children:"ctrl+k"})})})]})]})}function p(e){let{base:t,input:r,from:n,hotkey:s,converter:a,children:o}=e,c=a.convert(n,r),u=a.render(c),d=(0,i.useRef)(null),p=(0,i.useRef)(null),m=e=>{if(!0===e.ctrlKey&&e.key===s){if(e.preventDefault(),p.current){var t,r,n;null===(t=p.current)||void 0===t||t.classList.add("ring-2"),null===(r=p.current)||void 0===r||r.classList.add("ring-app-purple-400"),null===(n=p.current)||void 0===n||n.classList.add("ring-inset"),setTimeout(()=>{if(p.current){var e,t,r;null===(e=p.current)||void 0===e||e.classList.remove("ring-2"),null===(t=p.current)||void 0===t||t.classList.remove("ring-app-purple-400"),null===(r=p.current)||void 0===r||r.classList.remove("ring-inset")}},500)}else console.warn("resultDiv Ref is null")}};(0,i.useEffect)(()=>(window.addEventListener("keydown",m),()=>{window.removeEventListener("keydown",m)}),[]);let h=(0,i.useRef)(null),f=(0,i.useRef)(null),x=(0,i.useRef)(null),g=(0,i.useRef)(null);return(0,l.jsxs)("div",{children:[(0,l.jsxs)("div",{className:"flex items-center border-b border-app-green-600 lg:h-12 lg:items-stretch lg:border",children:[(0,l.jsx)("div",{className:"mx-2 lg:my-auto lg:hidden",children:o?(0,l.jsxs)("div",{ref:g,className:"flex w-6 justify-center",onClick:()=>{var e,t,r,n,s;x.current&&!x.current.classList.contains("hidden")?(x.current.classList.add("hidden"),null===(e=h.current)||void 0===e||e.classList.remove("hidden"),null===(t=f.current)||void 0===t||t.classList.add("hidden")):(null===(r=x.current)||void 0===r||r.classList.remove("hidden"),null===(n=h.current)||void 0===n||n.classList.add("hidden"),null===(s=f.current)||void 0===s||s.classList.remove("hidden"))},children:[(0,l.jsxs)("svg",{ref:h,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("path",{d:"M0 7H14",className:"stroke-app-green-500",strokeWidth:"3"}),(0,l.jsx)("path",{d:"M7 0L7 14",className:"stroke-app-green-500",strokeWidth:"3"})]}),(0,l.jsx)("svg",{ref:f,className:"hidden",width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,l.jsx)("path",{d:"M0 7H14",className:"stroke-app-green-500",strokeWidth:"3"})})]}):(0,l.jsx)("div",{className:"flex w-6 justify-center",children:(0,l.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("path",{d:"M0 7H14",className:"stroke-app-gray-100",strokeWidth:"3"}),(0,l.jsx)("path",{d:"M7 0L7 14",className:"stroke-app-gray-100",strokeWidth:"3"})]})})}),(0,l.jsxs)("div",{ref:p,className:"font-space-code w-32 border-l border-r border-app-green-600 bg-app-green-100 px-3 py-2 text-sm font-bold text-app-green-500 lg:flex lg:items-center lg:border-l-0 lg:text-base",id:t,children:[(0,l.jsx)("span",{className:"mr-2 cursor-pointer",onClick:()=>{navigator.clipboard.writeText(c.toString());let e="opacity-40";d.current?(d.current.classList.add(e),setTimeout(()=>{d.current.classList.remove(e)},500)):console.warn("copyIco Ref is null")},children:(0,l.jsxs)("svg",{ref:d,className:"inline",width:"21",height:"21",viewBox:"0 0 21 21",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("path",{d:"M5 4.7158V2.40625C5 1.6296 5.6296 1 6.40625 1H18.5938C19.3704 1 20 1.6296 20 2.40625V14.5938C20 15.3704 19.3704 16 18.5938 16H16.2582",className:"stroke-app-green-200",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,l.jsx)("path",{d:"M14.5938 5H2.40625C1.6296 5 1 5.6296 1 6.40625V18.5938C1 19.3704 1.6296 20 2.40625 20H14.5938C15.3704 20 16 19.3704 16 18.5938V6.40625C16 5.6296 15.3704 5 14.5938 5Z",className:"stroke-app-green-200",strokeWidth:"2",strokeLinejoin:"round"})]})}),u]}),(0,l.jsx)("div",{className:"font-space ml-2 mr-auto font-bold text-app-black lg:my-auto",children:t}),(0,l.jsx)("div",{className:"font-space-code hidden text-app-gray-200 lg:my-auto lg:mr-4 xl:block",children:s&&(0,l.jsx)("small",{children:(0,l.jsx)("code",{children:"ctrl+"+s})})})]}),o&&(0,l.jsx)("div",{ref:x,className:"font-space hidden border-b border-app-green-600 p-3 lg:block lg:border-x lg:text-sm",children:o})]})}function m(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o.Round;if(r!==o.Floor&&r!==o.Ceil&&r!==o.Round)throw Error('Invalid rounding method. Use "floor", "ceil", or "round".');let n=Math.pow(10,t);return r===o.Floor?Math.floor(e*n)/n:r===o.Ceil?Math.ceil(e*n)/n:Math.round(e*n)/n}function h(e,t,r,n){if(!(e>=r)||!(e<=n))return -1;{let s=m(t[0]+(e-r)/(n-r)*(t[t.length-1]-t[0]),2);return t.includes(s)?s:-1}}function f(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.01;for(let n=0;n<e.length;n++)if(Math.abs(e[n]-t)<r)return n;return -1}function x(e,t,r){if(t.length!==e.length)return console.error("model and target arguments are arrays of diffent lengths."),-1;let n=e.indexOf(r);return n>=0?t[n]:-1}function g(e){let{input:t,from:r,hotkey:n}=e,s=k.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Bootstrap,input:t,from:r,hotkey:n,converter:k,children:(0,l.jsxs)("div",{className:"font-space text-app-black",children:["Only six possible values: ",(0,l.jsx)("strong",{children:"0-5"})]})})}(n=a||(a={})).Bootstrap="Bootstrap",n.Centimetres="Centimetres",n.Ems="Ems",n.Feet="Feet",n.Inches="Inches",n.Millimetres="Millimetres",n.Picas="Picas",n.Pixels="Pixels",n.Points="Points",n.Rems="Rems",n.Tailwind="Tailwind",(s=o||(o={})).Floor="floor",s.Ceil="ceil",s.Round="round";let v=[0,4,8,16,24,48],k={convert:(e,t)=>{switch(e){case a.Bootstrap:return[0,1,2,3,4,5].includes(t)?t:-1;case a.Ems:return[0,.25,.5,1,1.5,3].indexOf(t);case a.Feet:return f([0,.0069444435695538,.0034722217847769,.013888887139108,.020833330708661,.041666661417323],t,.001);case a.Rems:return[0,.25,.5,1,1.5,3].indexOf(t);case a.Picas:return f([0,.24999996870079,.49999993740157,.99999987480315,1.4999998122047,2.9999996244094],t);case a.Inches:return f([0,.041666661417323,.083333322834646,.16666664566929,.24999996850394,.49999993700787],t);case a.Pixels:return v.indexOf(t);case a.Points:return f([0,2.9999977322849,5.9999954645698,11.99999092914,17.999986393709,35.999972787419],t,.1);case a.Tailwind:return[0,1,2,4,6,12].indexOf(t);case a.Centimetres:return f([0,.10583332,.21166664,.42333328,.63499992,1.26999984],t);case a.Millimetres:return f([0,1.0583332,2.1166664,4.2333328,6.3499992,12.6999984],t);default:return -1}},render:e=>e<0?"N/A":e.toString()};function j(e){let{input:t,from:r,hotkey:n}=e,s=y.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?.25===s?y.render(s):s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Tailwind,input:t,from:r,hotkey:n,converter:y,children:(0,l.jsxs)("div",{className:"font-space text-app-black",children:[(0,l.jsx)("strong",{children:"Example"}),":"," ",s>=0?(0,l.jsxs)("code",{className:"font-mono text-app-purple-500",children:['class="p-',y.render(s),'"']}):"N/A"]})})}let w=[0,.25,.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96],y={convert:(e,t)=>{switch(e){case a.Bootstrap:let r=[0,1,2,4,6,12];return t>=0&&t<=r.length-1?r[t]:-1;case a.Centimetres:return h(t,w,0,10.15999872);case a.Ems:return h(t,w,0,24);case a.Feet:return h(t,w,0,.33333329133858);case a.Inches:return h(t,w,0,3.999999496063);case a.Millimetres:return h(t,w,0,101.5999872);case a.Picas:return h(t,w,0,23.999996995276);case a.Pixels:return h(t,w,0,384);case a.Points:return h(t,w,0,287.99978229935);case a.Rems:return h(t,w,0,24);case a.Tailwind:let n=w.indexOf(t);return n>=0?t:-1;default:return -1}},render:e=>{if(e<0)return"N/A";if(.25===e)return"px";let t=e.toString();return t.length<8?t:t.slice(0,6)+".."}};function N(e){let{input:t,from:r,hotkey:n}=e,s=M.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Centimetres,input:t,from:r,hotkey:n,converter:M,children:""})}let b=[0,.02645833,.05291666,.10583332,.15874997999999998,.21166664,.26458329999999997,.31749995999999997,.37041662,.42333328,.5291665999999999,.6349999199999999,.74083324,.84666656,.95249988,1.0583331999999999,1.16416652,1.2699998399999999,1.48166648,1.69333312,2.1166663999999997,2.5399996799999998,2.96333296,3.38666624,3.80999952,4.2333327999999995,4.65666608,5.0799993599999995,5.50333264,5.92666592,6.3499992,6.77333248,7.61999904,8.466665599999999,10.159998719999999],L=[0,.041666666666666664,.08333333333333333,.16666666666666666,.25,.5],M={convert:(e,t)=>{if(t<0)return -1;switch(e){case a.Bootstrap:return t<=L.length-1?L[t]:-1;case a.Centimetres:return t;case a.Ems:return t*ei/ec*2.54;case a.Feet:return 30.48*t;case a.Inches:return 2.54*t;case a.Millimetres:return t/10;case a.Picas:return t*(1/6*2.54);case a.Pixels:return t/ec*2.54;case a.Points:return t*(2.54/72);case a.Rems:return t*ei/ec*2.54;case a.Tailwind:return x(w,b,t);default:return -1}},render:e=>{if(e<0)return"N/A";let t=m(e,5).toString();return t.length<9?t:t.slice(0,7)+".."}};function E(e){let{input:t,from:r,hotkey:n}=e,s=A.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Ems,input:t,from:r,hotkey:n,converter:A,children:(0,l.jsxs)("div",{className:"font-space text-app-black",children:["Based on a root font size of"," ",(0,l.jsxs)("span",{className:"font-bold",children:[ei,"px"]})]})})}let P=[0,.25,.5,1,1.5,3],S=[0,.0625,.125,.25,.375,.5,.625,.75,.875,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.5,4,5,6,7,8,9,10,11,12,13,14,15,16,18,20,24],A={convert:(e,t)=>{switch(e){case a.Bootstrap:return t>=0&&t<=P.length-1?P[t]:-1;case a.Centimetres:return .3937008*t*ec/ei;case a.Ems:return t;case a.Feet:return 12*t*ec/ei;case a.Inches:return t*ec/ei;case a.Millimetres:return ec/25.4/ei*t;case a.Picas:return ec/6/ei*t;case a.Pixels:return t/ei;case a.Points:return t/72*(ec/ei);case a.Rems:return t;case a.Tailwind:return x(w,S,t);default:return -1}},render:e=>{if(e<0)return"N/A";let t=m(e,5).toString();return t.length<9?t:t.slice(0,6)+".."}};function R(e){let{input:t,from:r,hotkey:n}=e,s=T.convert(r,t),a=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",a),()=>{document.removeEventListener("keydown",a)})),(0,l.jsx)(p,{base:"Golden Ratio",input:t,from:r,hotkey:n,converter:T,children:(0,l.jsx)("div",{className:"flex justify-center pt-4",children:(0,l.jsxs)("svg",{width:"327",height:"149",viewBox:"0 0 327 149",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("rect",{x:"51.6254",y:"2.29352",width:"141.613",height:"85.9871",className:"fill-app-green-300 stroke-app-green-600"}),(0,l.jsx)("path",{d:"M52.0223 2.69029L192.841 88.7806",className:"stroke-app-green-600",strokeDasharray:"2 2"}),(0,l.jsx)("path",{d:"M134.092 88.7806V1.79352",className:"stroke-app-green-600",strokeLinecap:"round",strokeLinejoin:"round"}),(0,l.jsx)("path",{d:"M134.092 88.7806L193.113 1.79352",className:"stroke-app-green-600",strokeDasharray:"2 2"}),(0,l.jsx)("rect",{x:"213.074",y:"88.2806",width:"85.9871",height:"51.9192",transform:"rotate(-90 213.074 88.2806)",className:"fill-app-green-300 stroke-app-green-600"}),(0,l.jsx)("path",{d:"M212.574 88.7806L265.317 1.79349",className:"stroke-app-green-600",strokeDasharray:"2 2"}),(0,l.jsx)("path",{d:"M264.596 37.6645L213.471 37.6645",className:"stroke-app-green-600",strokeLinecap:"round",strokeLinejoin:"round"}),(0,l.jsx)("path",{d:"M265.317 37.6645L212.574 1.61973",className:"stroke-app-green-600",strokeDasharray:"2 2"}),(0,l.jsx)("path",{className:"stroke-app-green-400",d:"M292 0.89679V37.6645"}),(0,l.jsx)("path",{className:"stroke-app-green-400",d:"M284 0.89679L300 0.89679"}),(0,l.jsx)("path",{className:"stroke-app-green-400",d:"M284 37.6645L300 37.6645"}),(0,l.jsx)("path",{className:"stroke-app-green-400",d:"M264.596 114.787L212.574 114.787"}),(0,l.jsx)("path",{className:"stroke-app-green-400",d:"M212.574 124.203V106.716"}),(0,l.jsx)("path",{className:"stroke-app-green-400",d:"M264.596 124.203V106.716"}),(0,l.jsx)("path",{className:"stroke-app-green-600",d:"M19.17548 2.69031H36.6657"}),(0,l.jsx)("path",{className:"stroke-app-green-600",d:"M27.6448 87.8839V2.69031"}),(0,l.jsx)("path",{className:"stroke-app-green-600",d:"M19.17548 87.8839H36.6657"}),(0,l.jsx)("path",{className:"stroke-app-green-400",d:"M192.841 114.787L51.1254 114.787"}),(0,l.jsx)("path",{className:"stroke-app-green-400",d:"M51.1254 124.203V106.716"}),(0,l.jsx)("path",{className:"stroke-app-green-400",d:"M192.841 124.203V106.716"}),(0,l.jsx)("text",{className:"font-space fill-app-green-600 text-sm font-bold ",x:"16",y:"44",transform:"rotate(-90,16,44)",textAnchor:"middle",children:t.toFixed(2)}),(0,l.jsx)("text",{className:"font-space fill-app-green-400 text-sm font-bold",x:"125",y:"140",textAnchor:"middle",children:(1.61803*t).toFixed(2)}),(0,l.jsx)("text",{className:"font-space fill-app-green-400 text-sm font-bold",x:"297",y:"50",transform:"rotate(-90,297,50)",textAnchor:"end",children:C(C(t)).toFixed(2)}),(0,l.jsx)("text",{className:"font-space fill-app-green-400 text-sm font-bold",x:"239",y:"140",textAnchor:"middle",children:C(t).toFixed(2)})]})})})}function C(e){return e/1.61803}let T={convert:(e,t)=>t<0?-1:1.61803*t,render:e=>{if(e<0)return"N/A";let t=e.toString();return t.length<8?t:t.slice(0,6)+".."}};function F(e){let{input:t,from:r,hotkey:n}=e,s=B.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Inches,input:t,from:r,hotkey:n,converter:B})}let D=[0,.010416666666666666,.020833333333333332,.041666666666666664,.0625,.08333333333333333,.10416666666666667,.125,.14583333333333334,.16666666666666666,.20833333333333334,.25,.2916666666666667,.3333333333333333,.375,.4166666666666667,.4583333333333333,.5,.5833333333333334,.6666666666666666,.8333333333333334,1,1.1666666666666667,1.3333333333333333,1.5,1.6666666666666667,1.8333333333333333,2,2.1666666666666665,2.3333333333333335,2.5,2.6666666666666665,3,3.3333333333333335,4],B={convert:(e,t)=>{if(t<0)return -1;switch(e){case a.Bootstrap:let r=[0,.041666666666666664,.08333333333333333,.16666666666666666,.25,.5];return t<=r.length-1&&t%1==0?r[t]:-1;case a.Centimetres:return .393701*t;case a.Ems:return t*ei/ec;case a.Feet:return 12*t;case a.Inches:return t;case a.Millimetres:return .0393701*t;case a.Picas:return t/6;case a.Pixels:return t/ec;case a.Points:return t/72;case a.Rems:return t*ei/ec;case a.Tailwind:return x(w,D,t);default:return -1}},render:e=>{if(e<0)return"N/A";let t=m(e,5).toString();return t.length<9?t:t.slice(0,6)+".."}};function V(e){let{input:t,from:r,hotkey:n}=e,s=H.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Millimetres,input:t,from:r,hotkey:n,converter:H})}let _=[0,.264583,.529167,1.058333,1.5875,2.116667,2.645833,3.175,3.704167,4.233333,5.291667,6.35,7.408333,8.466667,9.525,10.58333,11.64167,12.7,14.81667,16.93333,21.16667,25.4,29.63333,33.86667,38.1,42.33333,46.56667,50.8,55.03333,59.26667,63.5,67.73333,76.2,84.66667,101.6],I=[0,1.0583332,2.1166664,4.2333328,6.349999200000001,12.699998400000002];function O(e){return .2645833*e}let H={convert:(e,t)=>{if(t<0)return -1;switch(e){case a.Bootstrap:return t<=I.length-1&&t%1==0?m(I[t],4):-1;case a.Centimetres:return 10*t;case a.Ems:return O(t*ei);case a.Feet:return 304.8*t;case a.Inches:return 25.4*t;case a.Millimetres:return t;case a.Picas:return 4.23333333*t;case a.Pixels:return O(t);case a.Points:return .352778*t;case a.Rems:return O(t*ei);case a.Tailwind:return x(w,_,t);default:return -1}},render:e=>{if(e<0)return"N/A";let t=m(e,5).toString();return t.length<9?t:t.slice(0,7)+".."}};function W(e){let{input:t,from:r,hotkey:n}=e,s=Z.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Picas,input:t,from:r,hotkey:n,converter:Z,children:""})}let K=[0,.0625,.125,.25,.375,.5,.625,.75,.875,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.5,4,5,6,7,8,9,10,11,12,13,14,15,16,18,20,24],U=[0,.25,.5,1,1.5,3],Z={convert:(e,t)=>{if(t<0)return -1;switch(e){case a.Bootstrap:return t<=U.length-1&&t%1==0?U[t]:-1;case a.Centimetres:return 2.362204724*t;case a.Ems:return 6*(t*ei)/ec;case a.Feet:return 72*t;case a.Inches:return 6*t;case a.Millimetres:return .236220472*t;case a.Picas:return t;case a.Pixels:return 6*t/ec;case a.Points:return .0833*t;case a.Rems:return 6*(t*ei)/ec;case a.Tailwind:return x(w,K,t);default:return -1}},render:e=>{if(e<0)return"N/A";let t=m(e,4).toString();return t.length<8?t:t.slice(0,6)+".."}};function z(e){let{input:t,from:r,hotkey:n}=e,s=$.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Pixels,input:t,from:r,hotkey:n,converter:$,children:(0,l.jsxs)("div",{className:"font-space text-app-black",children:["Based on a resolution of ",(0,l.jsxs)("span",{className:"font-bold",children:[ec," DPI"]})]})})}let J=[0,1,2,4,6,8,10,12,14,16,20,24,28,32,36,40,44,48,56,64,80,96,112,128,144,160,176,192,208,224,240,256,288,320,384],$={convert:(e,t)=>{if(t<0)return -1;switch(e){case a.Bootstrap:let r=[0,4,8,16,24,48];return t<=r.length-1?r[t]:-1;case a.Centimetres:return Math.ceil(t*(ec/2.54));case a.Ems:return Math.ceil(t*ei);case a.Feet:return Math.ceil(12*t*ec);case a.Inches:return Math.ceil(t*ec);case a.Millimetres:return Math.ceil(t*(ec/25.4));case a.Picas:return Math.ceil(t*(1/6)*ec);case a.Pixels:return Math.ceil(t);case a.Points:return Math.ceil(t*(ec/72));case a.Rems:return Math.ceil(t*ei);case a.Tailwind:return x(w,J,t);default:return -1}},render:e=>{if(e<0)return"N/A";let t=e.toString();return t.length<9?t:t.slice(0,6)+".."}};function G(e){let{input:t,from:r,hotkey:n}=e,s=X.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Points,input:t,from:r,hotkey:n,converter:X})}let Y=[0,.75,1.5,3,4.5,6,7.5,9,10.5,12,15,18,21,24,27,30,33,36,42,48,60,72,84,96,108,120,132,144,156,168,180,192,216,240,288],q=[0,3,6,12,18,36],Q=e=>e*(72/ec),X={convert:(e,t)=>{if(t<0)return -1;switch(e){case a.Bootstrap:return t<=q.length-1&&t%1==0?q[t]:-1;case a.Centimetres:return 28.3464567*t;case a.Ems:return Q(t*ei);case a.Feet:return 864*t;case a.Inches:return 72*t;case a.Millimetres:return 2.83464567*t;case a.Picas:return 12*t;case a.Pixels:return Q(t);case a.Points:return t;case a.Rems:return Q(t*ei);case a.Tailwind:return x(w,Y,t);default:return -1}},render:e=>{if(e<0)return"N/A";let t=m(e,5).toString();return t.length<9?t:t.slice(0,6)+".."}};function ee(e){let{input:t,from:r,hotkey:n}=e,s=en.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Rems,input:t,from:r,hotkey:n,converter:en,children:(0,l.jsxs)("div",{className:"font-space text-app-black",children:["Based on a root font size of"," ",(0,l.jsxs)("span",{className:"font-bold",children:[ei,"px"]})]})})}let et=[0,.25,.5,1,1.5,3],er=[0,.063,.125,.25,.375,.5,.625,.75,.875,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.5,4,5,6,7,8,9,10,11,12,13,14,15,16,18,20,24],en={convert:(e,t)=>{if(t<0)return -1;switch(e){case a.Bootstrap:return t<=et.length-1&&t%1==0?et[t]:-1;case a.Centimetres:return .3937008*t*ec/ei;case a.Ems:return t;case a.Feet:return 12*t*ec/ei;case a.Inches:return t*ec/ei;case a.Millimetres:return ec/25.4/ei*t;case a.Picas:return ec/6/ei*t;case a.Pixels:return t/ei;case a.Points:return t/72*(ec/ei);case a.Rems:return t;case a.Tailwind:return x(w,er,t);default:return -1}},render:e=>{if(e<0)return"N/A";let t=m(e,3).toString();return t.length<8?t:t.slice(0,6)+".."}};function es(e){var t;let{input:r,from:n,hotkey:s}=e,a=ea.convert(n,r),o=e=>{e.key===s&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(a>=0?a.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:"Root 2 Rect.",input:r,from:n,hotkey:s,converter:ea,children:(0,l.jsx)("div",{className:"flex justify-center pt-4",children:(0,l.jsxs)("svg",{width:"293",height:"149",viewBox:"0 0 293 149",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("path",{d:"M53.5 78.5V1.45311H163.351V78.5H53.5Z",className:"fill-app-green-300 stroke-app-green-600"}),(0,l.jsx)("path",{d:"M53.8046 1.75771L163.231 78.1954",className:"stroke-app-green-600",strokeWidth:"0.999999",strokeDasharray:"2 2"}),(0,l.jsx)("path",{d:"M108.518 78.1954V0.953114",className:"stroke-app-green-600",strokeLinecap:"round",strokeLinejoin:"round"}),(0,l.jsx)("path",{d:"M108.518 78.1954L164.036 1.75771",className:"stroke-app-green-600",strokeWidth:"0.999999",strokeDasharray:"2 2"}),(0,l.jsx)("path",{d:"M234.175 78.5L179.823 78.5L179.823 1.45309L234.175 1.45309L234.175 78.5Z",className:"fill-app-green-300 stroke-app-green-600"}),(0,l.jsx)("path",{d:"M179.506 78.8068L234.676 0.759884",className:"stroke-app-green-600",strokeWidth:"0.999999",strokeDasharray:"2 2"}),(0,l.jsx)("path",{d:"M233.953 40.3788L179.5 40.3788",className:"stroke-app-green-600",strokeLinecap:"round",strokeLinejoin:"round"}),(0,l.jsx)("path",{d:"M234.841 40.3788L179.323 0.953082",className:"stroke-app-green-600",strokeWidth:"0.999999",strokeDasharray:"2 2"}),(0,l.jsx)("path",{d:"M32 0V80",className:"stroke-app-green-600"}),(0,l.jsx)("path",{d:"M22 1H41.5",className:"stroke-app-green-600"}),(0,l.jsx)("path",{d:"M22 79H41.5",className:"stroke-app-green-600"}),(0,l.jsx)("path",{d:"M163 110H53",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M53 120.5V101",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M163 120.5V101",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M234 110H180",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M180 120.5V101",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M234 120.5V101",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M263 1V40",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M252.5 1L273 1",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M252.5 40L273 40",className:"stroke-app-green-400"}),(0,l.jsx)("text",{className:"fill-app-green-400 font-space font-bold text-sm",x:"268",y:"50",transform:"rotate(-90,268,50)",textAnchor:"end",children:(r/1.41/1.41).toFixed(2)}),(0,l.jsx)("text",{className:"fill-app-green-400 font-space font-bold text-sm",x:"207",y:"142",textAnchor:"middle",children:(r/1.41).toFixed(2)}),(0,l.jsx)("text",{className:"fill-app-green-600 font-space font-bold text-sm",x:"18",y:"40",transform:"rotate(-90,18,40)",textAnchor:"middle",children:r.toFixed(2)}),(0,l.jsx)("text",{className:"fill-app-green-400 font-space font-bold text-sm",x:"110",y:"142",textAnchor:"middle",children:(1.41*r).toFixed(2)})]})})})}let ea={convert:(e,t)=>t<0?-1:1.41*t,render:e=>{if(e<0)return"N/A";let t=e.toString();return t.length<8?t:t.slice(0,6)+".."}};function eo(e){let{input:t,from:r,hotkey:n}=e,s=el.convert(r,t),a=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",a),()=>{document.removeEventListener("keydown",a)})),(0,l.jsx)(p,{base:"16:9",input:t,from:r,hotkey:n,converter:el,children:(0,l.jsx)("div",{className:"flex justify-center pt-4",children:(0,l.jsxs)("svg",{width:"263",height:"149",viewBox:"0 0 263 149",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("path",{d:"M203 1H59V79H203V1Z",className:"fill-app-green-300 stroke-app-green-600",strokeWidth:"1.00157",strokeLinecap:"round",strokeLinejoin:"round"}),(0,l.jsx)("path",{d:"M203 37H125V79",className:"stroke-app-green-600",strokeWidth:"1.00157",strokeLinecap:"round",strokeLinejoin:"round"}),(0,l.jsx)("path",{d:"M59 1L203 79",className:"stroke-app-green-600",strokeWidth:"0.999999",strokeDasharray:"2 2"}),(0,l.jsx)("path",{d:"M203 110L59 110",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M59 120.5V101",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M203 120.5V101",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M34 0V80",className:"stroke-app-green-600"}),(0,l.jsx)("path",{d:"M24 1H43.5",className:"stroke-app-green-600"}),(0,l.jsx)("path",{d:"M24 79H43.5",className:"stroke-app-green-600"}),(0,l.jsx)("path",{d:"M229 38V80",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M219 37L238.5 37",className:"stroke-app-green-400"}),(0,l.jsx)("path",{d:"M219 79L238.5 79",className:"stroke-app-green-400"}),(0,l.jsx)("text",{className:"fill-app-green-400 font-space font-bold text-sm",x:"256",y:"58",transform:"rotate(-90,256,58)",textAnchor:"middle",children:(9*t/16).toFixed(2)}),(0,l.jsx)("text",{className:"fill-app-green-400 font-space font-bold text-sm",x:"128",y:"140",textAnchor:"middle",children:(16*t/9).toFixed(2)}),(0,l.jsx)("text",{className:"fill-app-green-600 font-space font-bold text-sm",x:"162",y:"27",textAnchor:"middle",children:t.toFixed(2)}),(0,l.jsx)("text",{className:"fill-app-green-600 font-space font-bold text-sm",x:"18",y:"42",transform:"rotate(-90,18,42)",textAnchor:"middle",children:t.toFixed(2)})]})})})}let el={convert:(e,t)=>t<0?-1:16*t/9,render:e=>{if(e<0)return"N/A";let t=e.toString();return t.length<8?t:t.slice(0,6)+".."}},ei=16,ec=96;function eu(e){let{type:t,callback:r,hotkey:n}=e,s=(0,i.useRef)(null),a=(0,i.useRef)(null),o=e=>{var t,r;if(e.key===n&&!0===e.ctrlKey){e.preventDefault(),e.stopPropagation();let r=a.current;r&&(r.value="",null===(t=s.current)||void 0===t||t.classList.remove("hidden"),r.focus())}"Escape"===e.key&&(e.preventDefault(),e.stopPropagation(),null===(r=s.current)||void 0===r||r.classList.add("hidden"))};(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)}),[]);let d=()=>{s.current&&s.current.classList.add("hidden")};return(0,l.jsx)("div",{ref:s,className:"absolute left-0 top-0 z-10 hidden h-screen w-full bg-app-black/70","data-testid":"modal-container",children:(0,l.jsxs)("div",{className:"fixed inset-x-1/3 top-1/4 rounded-md border border-app-green-600 bg-app-black p-6 shadow-lg shadow-app-black",children:[(0,l.jsxs)("form",{onSubmit:e=>{var n;e.preventDefault();let s=null===(n=a.current)||void 0===n?void 0:n.value;if(void 0===s)return;let o=s.split(":"),l=parseFloat(o[0]);if(Number.isNaN(l)){d();return}let i=o[1].toLowerCase(),p=c(i);if(null!==p)return d(),r(l,p);let m=i.charAt(0).toUpperCase()+i.slice(1);if(!u(m)){r(l,t),d();return}r(l,m),d()},children:[(0,l.jsxs)("label",{className:"font-space font-bold text-white",children:["Enter a Unit and a Value,"," ",(0,l.jsx)("span",{className:"text-app-green-400",children:(0,l.jsx)("code",{children:"value:unit"})})]}),(0,l.jsx)("br",{}),(0,l.jsx)("input",{ref:a,className:"rounded-sm bg-app-gray-100",type:"text",name:"name","data-testid":"modal-input"}),(0,l.jsx)("input",{className:"font-space ml-3 mt-3 cursor-pointer rounded-sm border-app-green-200 bg-app-green-300 px-3",type:"submit",value:"Submit"})]}),(0,l.jsx)("div",{className:"font-space absolute right-3 top-3 cursor-pointer font-bold text-app-gray-200",onClick:d,children:(0,l.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("path",{d:"M8 8L40 40",className:"stroke-app-green-500",strokeWidth:"6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,l.jsx)("path",{d:"M8 40L40 8",className:"stroke-app-green-500",strokeWidth:"6",strokeLinecap:"round",strokeLinejoin:"round"})]})})]})})}function ed(e){let{input:t,from:r,hotkey:n}=e,s=em.convert(r,t),o=e=>{e.key===n&&!0===e.ctrlKey&&(e.preventDefault(),navigator.clipboard.writeText(s>=0?s.toString():"N/A"))};return(0,i.useEffect)(()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),(0,l.jsx)(p,{base:a.Feet,input:t,from:r,hotkey:n,converter:em,children:""})}let ep=[0,8680555555555555e-19,.001736111111111111,.003472222222222222,.005208333333333333,.006944444444444444,.008680555555555556,.010416666666666666,.012152777777777778,.013888888888888888,.017361111111111112,.020833333333333332,.024305555555555556,.027777777777777776,.03125,.034722222222222224,.03819444444444444,.041666666666666664,.04861111111111111,.05555555555555555,.06944444444444445,.08333333333333333,.09722222222222222,.1111111111111111,.125,.1388888888888889,.15277777777777776,.16666666666666666,.18055555555555555,.19444444444444445,.20833333333333334,.2222222222222222,.25,.2777777777777778,.3333333333333333],em={convert:(e,t)=>{if(t<0)return -1;switch(e){case a.Bootstrap:let r=[0,.003472222222222222,.006944444444444444,.013888888888888888,.020833333333333332,.041666666666666664];return t<=r.length-1&&t%1==0?r[t]:-1;case a.Centimetres:return t/30.48;case a.Ems:return t*ei/(12*ec);case a.Feet:return t;case a.Inches:return t/12;case a.Millimetres:return .00328084*t;case a.Picas:return .1667*t/12;case a.Pixels:return t/ec/12;case a.Points:return t/72/12;case a.Rems:return t*ei/(12*ec);case a.Tailwind:return x(w,ep,t);default:return -1}},render:e=>{if(e<0)return"N/A";let t=e.toString();return t.length<9?t:t.slice(0,6)+".."}};function eh(){let e="__unitswitch__",[t,r]=(0,i.useState)(()=>{let t={value:1,unit:a.Pixels,lineup:[]};if(window.localStorage){let r=localStorage.getItem(e);return null!==r&&"object"==typeof r&&null!==r&&"number"==typeof r.value&&"string"==typeof r.unit&&u(r.unit)&&"object"==typeof r.lineup?JSON.parse(r):t}return t}),n=(e,n)=>{r({...t,value:e,unit:n})};return(0,i.useEffect)(()=>{window.localStorage&&localStorage.setItem(e,JSON.stringify({value:t.value,unit:t.unit,lineup:t.lineup}))}),(0,l.jsxs)("div",{className:"rounded-lg border border-app-green-600 bg-app-green-50 pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12",children:[(0,l.jsx)(d,{input:t.value,type:t.unit,callback:n}),(0,l.jsx)(z,{input:t.value,from:t.unit,hotkey:"p"}),(0,l.jsx)(ee,{input:t.value,from:t.unit,hotkey:"r"}),(0,l.jsx)(E,{input:t.value,from:t.unit,hotkey:"e"}),(0,l.jsx)(j,{input:t.value,from:t.unit,hotkey:"1"}),(0,l.jsx)(g,{input:t.value,from:t.unit,hotkey:"b"}),(0,l.jsx)(V,{input:t.value,from:t.unit,hotkey:"m"}),(0,l.jsx)(N,{input:t.value,from:t.unit,hotkey:"c"}),(0,l.jsx)(G,{input:t.value,from:t.unit,hotkey:"o"}),(0,l.jsx)(W,{input:t.value,from:t.unit,hotkey:"6"}),(0,l.jsx)(F,{input:t.value,from:t.unit,hotkey:"i"}),(0,l.jsx)(ed,{input:t.value,from:t.unit,hotkey:"f"}),(0,l.jsx)(R,{input:t.value,from:t.unit,hotkey:"g"}),(0,l.jsx)(es,{input:t.value,from:t.unit,hotkey:"2"}),(0,l.jsx)(eo,{input:t.value,from:t.unit,hotkey:"9"}),(0,l.jsx)(eu,{type:t.unit,callback:n,hotkey:"k"})]})}function ef(){return(0,l.jsx)("main",{className:"m-2 max-w-screen-xl lg:mx-auto",children:(0,l.jsx)(eh,{})})}},4692:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(8690),s=Symbol.for("react.element"),a=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),o=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function i(e,t,r){var n,i={},c=null,u=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)a.call(t,n)&&!l.hasOwnProperty(n)&&(i[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===i[n]&&(i[n]=t[n]);return{$$typeof:s,type:e,key:c,ref:u,props:i,_owner:o.current}}t.jsx=i,t.jsxs=i},4526:function(e,t,r){"use strict";e.exports=r(4692)}},function(e){e.O(0,[778,615,744],function(){return e(e.s=3916)}),_N_E=e.O()}]);