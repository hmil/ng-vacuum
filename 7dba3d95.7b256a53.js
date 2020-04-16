(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{108:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return u}));var r=n(1),a=n(6),c=(n(0),n(118)),i={id:"mocking-techniques",title:"Mocking techniques",sidebar_label:"Mocking techniques"},o={id:"mocking-techniques",title:"Mocking techniques",description:"We re-use `AccessControlService` from the getting started guide to illustrate this chapter.",source:"@site/docs/advanced-mocking.md",permalink:"/ng-vacuum/docs/mocking-techniques",editUrl:"https://github.com/hmil/ng-vacuum/edit/master/docs/docs/advanced-mocking.md",sidebar_label:"Mocking techniques",sidebar:"someSidebar",previous:{title:"Test a Component",permalink:"/ng-vacuum/docs/component-test"},next:{title:"Best Practices",permalink:"/ng-vacuum/docs/best-practices"}},s=[{value:"Mocking a getter / setter",id:"mocking-a-getter--setter",children:[{value:"With a getter",id:"with-a-getter",children:[]},{value:"Testing observable subscriptions",id:"testing-observable-subscriptions",children:[]}]}],l={rightToc:s};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"We re-use ",Object(c.b)("inlineCode",{parentName:"p"},"AccessControlService")," from the getting started guide to illustrate this chapter."),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"access-control.service.ts")),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"import { Injectable } from '@angular/core';\nimport { AuthService } from './auth.service';\nimport { Router } from '@angular/router';\n\n@Injectable()\nexport class AccessControlService {\n\n    constructor(\n            private readonly authService: AuthService,\n            private readonly router: Router) {\n    }\n\n    public checkAccess(zone: 'lobby' | 'dashboard'): boolean {\n        if (zone === 'lobby' && this.authService.isAuthenticated()) {\n            this.router.navigate(['logout']);\n            return false;\n        } else if (zone === 'dashboard' && !this.authService.isAuthenticated()) {\n            this.router.navigate(['login']);\n            return false;\n        }\n        return true;\n    }\n}\n")),Object(c.b)("h2",{id:"mocking-a-getter--setter"},"Mocking a getter / setter"),Object(c.b)("p",null,"This time, ",Object(c.b)("inlineCode",{parentName:"p"},"AuthService")," has been implemented as a pair of getters and setters."),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"auth.service.ts")),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"import { Injectable } from '@angular/core';\n\n@Injectable()\nexport class AuthService {\n\n    private authenticated = false;\n\n    public get isAuthenticated(): boolean {\n        return this.authenticated;\n    }\n\n    public set isAuthenticated(value: boolean): void {\n        this.authenticated = value;\n    }\n}\n")),Object(c.b)("p",null,"Our test is:"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"describe('AccessControlService', () => {\n    let service: AccessControlService;\n\n    beforeEach(() => {\n        service = getService(AccessControlService);\n    });\n\n    it('redirects to logout when trying to access the lobby while authenticated', () => {\n        // TODO mock that the current state is authenticated\n        const result = service.checkAccess('lobby');\n        expect(result).toBe(false);\n    });\n});\n")),Object(c.b)("p",null,"Notice that we have not defined the behavior of the getter ",Object(c.b)("inlineCode",{parentName:"p"},"AuthService.isAuthenticated")," yet. Therefore, it is no surprise that we get an error when this test is run."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{}),"Error: Unexpected property access: <AuthService>.isAuthenticated\nThis mock is not backed\n")),Object(c.b)("p",null,"All we need to do is define that behavior as shown below."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts",metastring:"{9}","{9}":!0}),"describe('AccessControlService', () => {\n    let service: AccessControlService;\n\n    beforeEach(() => {\n        service = getService(AccessControlService);\n    });\n\n    it('redirects to logout when trying to access the lobby while authenticated', () => {\n        when(getMock(AuthService).isAuthenticated).useValue(true);\n        const result = service.checkAccess('lobby');\n        expect(result).toBe(false);\n    });\n});\n")),Object(c.b)("p",null,"We present an alternative way to achieve the same result. Depending on the context, you may find one technique better suited than the other for your current situation."),Object(c.b)("h3",{id:"with-a-getter"},"With a getter"),Object(c.b)("p",null,"With this technique, you define the behavior in ",Object(c.b)("inlineCode",{parentName:"p"},"beforeEach")," and then use a local variable to change the value returned by the getter."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts",metastring:"{3,6,7,12}","{3,6,7,12}":!0}),"describe('AccessControlService', () => {\n    let service: AccessControlService;\n    let isAuthenticated: boolean;\n\n    beforeEach(() => {\n        isAuthenticated = false;\n        when(getMock(AuthService).isAuthenticated).useGetter(() => isAuthenticated);\n        service = getService(AccessControlService);\n    });\n\n    it('redirects to logout when trying to access the lobby while authenticated', () => {\n        isAuthenticated = true; // Override the default value\n        const result = service.checkAccess('lobby');\n        expect(result).toBe(false);\n    });\n});\n")),Object(c.b)("div",{className:"admonition admonition-caution alert alert--warning"},Object(c.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(c.b)("h5",{parentName:"div"},Object(c.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(c.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"}),Object(c.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})))),"caution")),Object(c.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(c.b)("p",{parentName:"div"},"Remember to initialize all variables in ",Object(c.b)("inlineCode",{parentName:"p"},"beforeEach")," and not in their declaration statement. Otherwise some test may get flaky as values from other tests start leaking."))),Object(c.b)("h3",{id:"testing-observable-subscriptions"},"Testing observable subscriptions"),Object(c.b)("p",null,"We would like our authentication service to actively publish authentication state changes with rxjs. We could implement it as shown here."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"import { Injectable } from '@angular/core';\nimport { BehaviorSubject } from 'rxjs';\n\n@Injectable()\nexport class AuthService {\n\n    private authenticatedSubject = new BehaviorSubject(false);\n\n    public authenticated$(): Observable<boolean> {\n        return this.authenticatedSubject.toObservable();\n    }\n\n    public setAuthenticated(value: boolean): void {\n        this.authenticatedSubject.next(value);\n    }\n}\n")),Object(c.b)("p",null,"And the service we would like to test is subscribing to this observable in its constructor."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"@Injectable()\nexport class MyService {\n\n    constructor(\n            readonly router: Router,\n            readonly authService: AuthService) {\n        this.authService.authenticated$.subscribe(auth => {\n            if (!auth) {\n                this.router.navigate(['/home']);\n            }\n        });\n    }\n}\n")),Object(c.b)("p",null,"We have to define the behavior of ",Object(c.b)("inlineCode",{parentName:"p"},"authenticated$")," before the service gets created. Otherwise OmniMock won't know what to do when authService is used."),Object(c.b)("p",null,"Fortunately, we can call ",Object(c.b)("inlineCode",{parentName:"p"},"getMock")," before creating the actual service or component."),Object(c.b)("p",null,"We could mock the rxjs API, expect a call to ",Object(c.b)("inlineCode",{parentName:"p"},"subscribe"),", register the callback and then invoke the callback. But this would be a lot of work.",Object(c.b)("br",{parentName:"p"}),"\n","Instead, we can simply use rxjs in our test. This is a slight deviation to the true ",Object(c.b)("em",{parentName:"p"},"test in a vacuum")," philosophy, but we can make an exception here because:"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"rxjs is a single-purpose code utility library and we do not use it for I/O in this context."),Object(c.b)("li",{parentName:"ul"},"The class we are testing remains entirely isolated from all other code in our project."),Object(c.b)("li",{parentName:"ul"},"We trust rxjs to be sufficiently tested and of high quality such that it won't break our tests."),Object(c.b)("li",{parentName:"ul"},"rxjs is not used as a gateway to some global API or global state. Everything remains local to our test.")),Object(c.b)("p",null,"The last affirmation is not entirely true. rxjs might be using ",Object(c.b)("inlineCode",{parentName:"p"},"setTimeout")," or a similar I/O method to defer work internally. We must be careful to wrap everything in a ",Object(c.b)("inlineCode",{parentName:"p"},"fakeAsync")," context and call ",Object(c.b)("inlineCode",{parentName:"p"},"flush()")," such that this implementation detail doesn't interfere with our test."),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"describe('MyService', () => {\n    let authenticated$: Subject<boolean>;\n\n    beforeEach(() => {\n        authenticated$ = new Subject<boolean>();\n        when(getMock(AuthService).authenticated$).useValue(authenticated$);\n        getService(MyService);\n    });\n\n    it('redirects to home when logging out', fakeAsync(() => {\n        // Expect the call to router.navigate once\n        when(getMock(Router).navigate(['/home'])).resolve(true).once();\n        // Then, send the value to trigger the code we would like to test\n        authenticated$.next(false);\n        // Then, flush to make sure our fake event goes through\n        flush();\n    }));\n});\n")))}u.isMDXComponent=!0},118:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o({},t,{},e)),n},b=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},p=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=u(n),p=r,d=b["".concat(i,".").concat(p)]||b[p]||h[p]||c;return n?a.a.createElement(d,o({ref:t},l,{components:n})):a.a.createElement(d,o({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,i=new Array(c);i[0]=p;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var l=2;l<c;l++)i[l]=n[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);