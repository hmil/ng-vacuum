(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{153:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return a})),t.d(n,"metadata",(function(){return i})),t.d(n,"rightToc",(function(){return s})),t.d(n,"default",(function(){return p}));var r=t(1),o=t(9),c=(t(0),t(157)),a={id:"injection-tokens",title:"Using Injection Tokens",sidebar_label:"Using Injection Tokens"},i={id:"injection-tokens",title:"Using Injection Tokens",description:"Use injection tokens to inject static values into a service.",source:"@site/docs/injection-tokens.md",permalink:"/ng-vacuum/docs/injection-tokens",editUrl:"https://github.com/hmil/ng-vacuum/edit/master/docs/docs/injection-tokens.md",sidebar_label:"Using Injection Tokens",sidebar:"someSidebar",previous:{title:"Best Practices",permalink:"/ng-vacuum/docs/best-practices"},next:{title:"Mocking ng-model",permalink:"/ng-vacuum/docs/ng-model"}},s=[],l={rightToc:s};function p(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Use injection tokens to inject static values into a service."),Object(c.b)("p",null,"For instance, if you need to use ",Object(c.b)("a",Object(r.a)({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/history"}),Object(c.b)("inlineCode",{parentName:"a"},"window.history")),", then instead of using the global object directly, which would tightly couple your code to the DOM api, declare an injection token and request this dependency in the constructor."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"// my.service.ts\nexport const RESULTS_PRE_PAGE = new InjectionToken<number>('RESULTS_PER_PAGE');\nexport const HISTORY = new InjectionToken<Window.history>('HISTORY');\n\n@Injectable()\nexport class MyService {\n    constructor(\n        @Inject(RESULTS_PER_PAGE) private readonly results_per_page: number,\n        @Inject(HISTORY) private readonly history: Window.history\n    ) { }\n}\n")),Object(c.b)("p",null,"Then, in your module, provide this dependency from the ambient API."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"// my.module.ts\n\nimport { HISROTY, RESULTS_PER_PAGE } from './my.service';\n\n@NgModule({\n    // ...\n    providers: [\n        { provide: HISTORY, useValue: history },\n        { provide: RESULTS_PER_PAGE, useValue: 10 }\n    ]\n})\nexport class MyModule {\n\n}\n")),Object(c.b)("p",null,"The history can now be mocked in unit tests. Note that this is a truly isolated test as there was no need for nasty tricks like patching the global browser API."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"describe('MyService', () => {\n    let service: MyService;\n\n    beforeEach(() => {\n        service = getService(MyService);\n    });\n\n    it('navigates back when on product page', () => {\n        when(getMock(HISTORY).state).useValue({ name: 'product-details' });\n        when(getMock(HISTORY).back()).return().once();\n        service.goBackIfProduct();\n    });\n});\n")),Object(c.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(c.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(c.b)("h5",{parentName:"div"},Object(c.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(c.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(c.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(c.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(c.b)("p",{parentName:"div"},"Always declare the injection token on the side of the consumer, not on the side of the provider. If multiple consumers need the same value injected, then create a file ",Object(c.b)("inlineCode",{parentName:"p"},"providers.ts")," where you place all injection token declarations. This prevents dependency cycles."))))}p.isMDXComponent=!0},157:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return m}));var r=t(0),o=t.n(r);function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){c(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=o.a.createContext({}),p=function(e){var n=o.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i({},n,{},e)),t},u=function(e){var n=p(e.components);return o.a.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},b=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,c=e.originalType,a=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(t),b=r,m=u["".concat(a,".").concat(b)]||u[b]||d[b]||c;return t?o.a.createElement(m,i({ref:n},l,{components:t})):o.a.createElement(m,i({ref:n},l))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var c=t.length,a=new Array(c);a[0]=b;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,a[1]=i;for(var l=2;l<c;l++)a[l]=t[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);