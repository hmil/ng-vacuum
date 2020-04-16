(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{107:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var a=n(1),o=n(6),c=(n(0),n(118)),r={id:"component-test",title:"Test a Component",sidebar_label:"Test a Component"},i={id:"component-test",title:"Test a Component",description:"So far, we've seen how to automatically mock all dependencies of a service in order to test it in isolation. Testing a component is mostly the same, but we also need to render the template and mock the components used in that template.",source:"@site/docs/component-test.md",permalink:"/ng-vacuum/docs/component-test",editUrl:"https://github.com/hmil/ng-vacuum/edit/master/docs/docs/component-test.md",sidebar_label:"Test a Component",sidebar:"someSidebar",previous:{title:"Test a Service",permalink:"/ng-vacuum/docs/service-test"},next:{title:"Mocking techniques",permalink:"/ng-vacuum/docs/mocking-techniques"}},s=[{value:"Sample project",id:"sample-project",children:[]},{value:"Scaffolding",id:"scaffolding",children:[]},{value:"Populate the page object",id:"populate-the-page-object",children:[]},{value:"Write a test",id:"write-a-test",children:[]},{value:"Write another test (trick to customize component setup)",id:"write-another-test-trick-to-customize-component-setup",children:[]},{value:"Component bindings",id:"component-bindings",children:[]},{value:"Recap",id:"recap",children:[]}],l={rightToc:s};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"So far, we've seen how to automatically mock all dependencies of a service in order to test it in isolation. Testing a component is mostly the same, but we also need to render the template and mock the components used in that template."),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"tl;dr"),": jump directly to the ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"#recap"}),"recap")," for the full code example."),Object(c.b)("h2",{id:"sample-project"},"Sample project"),Object(c.b)("p",null,"We consider the following sample component."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'export const CONSOLE = new InjectionToken<Console>(\'CONSOLE\');\n\n@Component({\n    selector: \'sample-component\',\n    templateUrl: `\n        <div class="app">\n            <div *ngIf="isAuthenticated">\n                <app-fancy-button [confirmLabel]="\'Got it\'" [cancelLabel]="cancelLabel" (clicked)="onChoice($event)"></app-fancy-button>\n            </div>\n            <div *ngIf="!isAuthenticated">\n                <div class="message error">You must be authenticated</div>\n                <button test-id="login-button" (click)="onLogin()">Log in</button>\n            </div>\n        </div>\n    `\n})\nexport class MyComponent {\n\n    cancelLabel = \'No\';\n\n    get isAuthenticated() {\n        return this.authService.isAuthenticated();\n    }\n\n    constructor(\n        @Inject(CONSOLE) private readonly console: typeof window.console,\n        private readonly authService: AuthService) { }\n\n    public onLogin() {\n        this.authService.setAuthenticated(true);\n    }\n\n    public onChoice(choice: \'confirm\' | \'cancel\') {\n        this.console.log(choice);\n    }\n}\n')),Object(c.b)("p",null,"The sample component uses the global ",Object(c.b)("inlineCode",{parentName:"p"},"console")," object, injected using an ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"https://angular.io/api/core/InjectionToken"}),Object(c.b)("inlineCode",{parentName:"a"},"InjectionToken")),", to give this tutorial a bit more uumpf."),Object(c.b)("h2",{id:"scaffolding"},"Scaffolding"),Object(c.b)("p",null,"It is good practice to create a ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"https://angular.io/guide/testing#use-a-page-object"}),"page object")," for component tests. The page object abstracts away the selectors to access elements rendered by the template and exposes a nice interface for the tests."),Object(c.b)("p",null,"NgVcuum provides a utility class to simplify the setup of the page object"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { BasePage, renderComponent } from 'ng-vacuum';\n\ndescribe('MyComponent', () => {\n\n    let page: Page;\n\n    beforeEach(async () => {\n        page = new Page(await renderComponent(MyComponent, AppModule));\n    });\n});\n\nclass Page extends BasePage<MyComponent> { }\n")),Object(c.b)("p",null,Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"./api-reference#rendercomponenttcomponent-typet-module-typeany--modulewithproviders-promiserenderingt-never"}),Object(c.b)("inlineCode",{parentName:"a"},"renderComponent"))," internally invokes ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"https://getsaf.github.io/shallow-render/#shallow-render"}),"shallow-render")," to create a shallow rendering of the component, and takes care of creating an omnimock for each of the component's service dependencies.\nIf you would like to get a reference to the ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"https://getsaf.github.io/shallow-render/#shallow-class"}),"Shallow")," instance, to apply advanced customizations and to bind data, you can use ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"./api-reference#getshallowtcomponent-typet-module-typeany--modulewithproviders-shallowt"}),Object(c.b)("inlineCode",{parentName:"a"},"getShallow"))," instead."),Object(c.b)("h2",{id:"populate-the-page-object"},"Populate the page object"),Object(c.b)("p",null,"We need to get access to the template in our test. We populate the page object."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"// snip\n\nclass Page extends BasePage<MyComponent> {\n    get loginButton(): HTMLElement {\n        return this.rendering.find('[test-id=login-button]').nativeElement;\n    }\n\n    get fancyButton() {\n        return this.rendering.findComponent(FancyButtonComponent);\n    }\n}\n")),Object(c.b)("p",null,"We use the ",Object(c.b)("inlineCode",{parentName:"p"},"rendering")," instance member from ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"./api-reference#class-basepaget"}),Object(c.b)("inlineCode",{parentName:"a"},"BasePage"))," to find components in the template."),Object(c.b)("h2",{id:"write-a-test"},"Write a test"),Object(c.b)("p",null,"We can now write proper unit tests with the comfort of full vacuum isolation."),Object(c.b)("p",null,"Let's check what happens when the user is not authenticated and we click on the login button."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"it('lets user log in when not authenticated', fakeAsync(() => {\n    // Mock the state: user not logged in\n    when(getMock(AuthService).authenticated).return(false);\n    // Make sure the page is fully rendered\n    page.detectChanges();\n    // Use page object to locate login button, and click.\n    page.loginButton.click();\n}));\n")),Object(c.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(c.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(c.b)("h5",{parentName:"div"},Object(c.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(c.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(c.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(c.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(c.b)("p",{parentName:"div"},"Always wrap component tests with ",Object(c.b)("inlineCode",{parentName:"p"},"fakeAsync"),".\nAngular buffers internal operations in unredictible ways and so you need to be able to control the passage of time, otherwise you may experience weird and frustrating behavior."))),Object(c.b)("p",null,"If we try to run this test, we get the following error:"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"Error: Unexpected property access: <AuthService>.isAuthenticated\nThis mock is not backed\n")),Object(c.b)("p",null,"Indeed, ",Object(c.b)("inlineCode",{parentName:"p"},"MyComponent")," is trying to access ",Object(c.b)("inlineCode",{parentName:"p"},"AuthService.isAuthenticated")," during rendering to determine if the user is authenticated and, ultimately, to know what to render."),Object(c.b)("p",null,"We need to specify the behavior of ",Object(c.b)("inlineCode",{parentName:"p"},"AuthService")," ",Object(c.b)("em",{parentName:"p"},"before")," rendering the component."),Object(c.b)("p",null,"Let's do this. We move the mock behavior to the ",Object(c.b)("inlineCode",{parentName:"p"},"beforeEach")," function:"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"beforeEach(async () => {\n    when(getMock(AuthService).authenticated).return(false); // Add here\n    page = new Page(await renderComponent(AppComponent, AppModule));\n});\n\nit('lets user log in when not authenticated', fakeAsync(() => {\n    // Remove from here\n    page.detectChanges();\n    page.loginButton.click();\n}));\n")),Object(c.b)("p",null,"Now, the template has all the information it needs for a successful render. But we get this error."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{}),"Failed: Uncaught error: Error: Unexpected property access: <AuthService>.setAuthenticated\n")),Object(c.b)("p",null,"This is the thing that we are actually testing for! Let's write an expectation for this call. Remember to use the quantifier ",Object(c.b)("inlineCode",{parentName:"p"},".once()")," to tell omnimock that you expect this call to happen exactly once.\nWe also add ",Object(c.b)("inlineCode",{parentName:"p"},"expect().nothing()")," so that jasmine stops complaining about the fact that your test doesn't contain an actual expectation."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"it('lets user log in when not authenticated', fakeAsync(() => {\n    when(getMock(AuthService).setAuthenticated(true)).return().once();\n    page.detectChanges();\n    page.loginButton.click();\n    expect().nothing();\n}));\n")),Object(c.b)("p",null,"The full code of the test is given at the bottom of this page. But first, let's add a second test case"),Object(c.b)("h2",{id:"write-another-test-trick-to-customize-component-setup"},"Write another test (trick to customize component setup)"),Object(c.b)("p",null,"In the previous section, we've hardcoded the fact that the user is not authenticated. But what if we would like to test when the user is authenticated?"),Object(c.b)("p",null,"This is exactly what we will do. We first replace the hardcoded answer with a getter and declare a value that we can access to modify the behavior."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"describe('AppComponent', () => {\n\n    let page: Page;\n\n    let isAuthenticated: boolean;\n\n    beforeEach(async () => {\n        isAuthenticated = false;\n        when(getMock(AuthService).isAuthenticated()).useGetter(() => isAuthenticated);\n        page = new Page(await renderComponent(AppComponent, AppModule));\n    });\n\n// snip\n")),Object(c.b)("p",null,"Now, we can add a second test which asserts what happens when the user is authenticated."),Object(c.b)("p",null,"Remember that the component is ",Object(c.b)("em",{parentName:"p"},"shallow")," rendered. This means that ",Object(c.b)("inlineCode",{parentName:"p"},"<app-fancy-button>")," in the component template is not expanded.\nWe treat it like a black box and simulate its behavior by emitting a ",Object(c.b)("inlineCode",{parentName:"p"},"click")," event directly from the test suite. This is what makes the test of MyComponent completely decoupled from the implementation of FancyButtonComponent."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"it('presents a fancy button when authenticated', fakeAsync(() => {\n    // Change the mock behavior and re-render\n    isAuthenticated = true;\n    page.detectChanges();\n\n    // Checks properties of the nested component\n    expect(page.fancyButton.confirmLabel).toBe('Got it');\n    expect(page.fancyButton.cancelLabel).toBe('Nooo');\n\n    // Expect a call to console.log when we click on confirm\n    when(getMock(CONSOLE).log('confirm')).return().once();\n\n    // Click on confirm\n    page.fancyButton.clicked.emit('confirm');\n}));\n")),Object(c.b)("h2",{id:"component-bindings"},"Component bindings"),Object(c.b)("p",null,"TODO"),Object(c.b)("h2",{id:"recap"},"Recap"),Object(c.b)("p",null,"The complete test suite is shown below."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"describe('AppComponent', () => {\n\n    let page: Page;\n    let isAuthenticated: boolean;\n\n    beforeEach(async () => {\n        isAuthenticated = false;\n        // Mock data required by the template\n        when(getMock(AuthService).isAuthenticated()).useGetter(() => isAuthenticated);\n        page = new Page(await renderComponent(AppComponent, AppModule));\n    });\n\n    it('lets user log in when not authenticated', fakeAsync(() => {\n        // Ensure the tempalte is fully rendered\n        page.detectChanges();\n        // Prepare call expectation for setAuthenticated, then click on login\n        when(getMock(AuthService).setAuthenticated(true)).return().once();\n        page.loginButton.click();\n        expect().nothing();\n    }));\n\n    it('presents a fancy button when authenticated', fakeAsync(() => {\n        // Change the mock data and re-render the template\n        isAuthenticated = true;\n        page.detectChanges();\n        // Checks the rendered view\n        expect(page.fancyButton.confirmLabel).toBe('Got it');\n        expect(page.fancyButton.cancelLabel).toBe('Nooo');\n        // Prepare call expectation and click on the button\n        when(getMock(CONSOLE).log('confirm')).return().once();\n        page.fancyButton.clicked.emit('confirm');\n    }));\n});\n\n// Page object abstracts away the template selectors\nclass Page extends BasePage<AppComponent> {\n\n    get loginButton(): HTMLElement {\n        return this.rendering.find('[test-id=login-button]').nativeElement;\n    }\n\n    get fancyButton() {\n        return this.rendering.findComponent(FancyButtonComponent);\n    }\n}\n")))}p.isMDXComponent=!0},118:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var a=n(0),o=n.n(a);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i({},t,{},e)),n},u=function(e){var t=p(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,r=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,h=u["".concat(r,".").concat(d)]||u[d]||b[d]||c;return n?o.a.createElement(h,i({ref:t},l,{components:n})):o.a.createElement(h,i({ref:t},l))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,r=new Array(c);r[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,r[1]=i;for(var l=2;l<c;l++)r[l]=n[l];return o.a.createElement.apply(null,r)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);