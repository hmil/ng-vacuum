(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{108:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return r})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return b}));var c=n(1),o=n(7),i=(n(0),n(118)),a={id:"api-reference",title:"API Reference",sidebar_label:"API Reference"},r={id:"api-reference",title:"API Reference",description:"## Main API",source:"@site/docs/api-reference.md",permalink:"/ng-vacuum/docs/api-reference",editUrl:"https://github.com/hmil/ng-vacuum/edit/master/docs/docs/api-reference.md",sidebar_label:"API Reference",sidebar:"someSidebar",previous:{title:"Using Injection Tokens",permalink:"/ng-vacuum/docs/injection-tokens"}},l=[{value:"Main API",id:"main-api",children:[{value:"<code>getService&lt;T&gt;(token: Type&lt;T&gt;): T</code>",id:"getservicettoken-typet-t",children:[]},{value:"<code>getMock&lt;T&gt;(token: InjectionToken&lt;T&gt;): Mock&lt;T&gt;</code>",id:"getmockttoken-injectiontokent-mockt",children:[]},{value:"<code>renderComponent&lt;T&gt;(component: Type&lt;T&gt;, module: TODO): TODO</code>",id:"rendercomponenttcomponent-typet-module-todo-todo",children:[]}]},{value:"Advanced API",id:"advanced-api",children:[{value:"<code>createMock&lt;T&gt;(token: InjectionToken&lt;T&gt;, backing?: Partial&lt;T&gt;): Mock&lt;T&gt;</code>",id:"createmockttoken-injectiontokent-backing-partialt-mockt",children:[]},{value:"<code>getShallow&lt;T&gt;(component: Type&lt;T&gt;, module: TODO): TODO</code>",id:"getshallowtcomponent-typet-module-todo-todo",children:[]},{value:"<code>configureTestbed(service: Type&lt;T&gt;)</code>",id:"configuretestbedservice-typet",children:[]}]}],d={rightToc:l};function b(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(c.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"main-api"},"Main API"),Object(i.b)("h3",{id:"getservicettoken-typet-t"},Object(i.b)("inlineCode",{parentName:"h3"},"getService<T>(token: Type<T>): T")),Object(i.b)("p",null,"Instantiate a service by providing mocks for all of its dependencies."),Object(i.b)("p",null,"A mock is automatically created for all dependencies of the service which are not mocked yet."),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",Object(c.a)({parentName:"pre"},{className:"language-ts"}),"describe('MyService', () => {\n    let myService: MyService;\n\n    beforeEach(() => {\n        myService = getService(MyService);\n    });\n});\n")),Object(i.b)("h3",{id:"getmockttoken-injectiontokent-mockt"},Object(i.b)("inlineCode",{parentName:"h3"},"getMock<T>(token: InjectionToken<T>): Mock<T>")),Object(i.b)("p",null,"Returns the mock associated with this injection token. If no such mock exists yet, it is created."),Object(i.b)("p",null,"This function can be called before or after ",Object(i.b)("inlineCode",{parentName:"p"},"getService"),". Either way, only one mock is created for each injection token."),Object(i.b)("p",null,"Calling ",Object(i.b)("inlineCode",{parentName:"p"},"getMock")," multiple times in a single test with the same injection token always returns the same object instance."),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",Object(c.a)({parentName:"pre"},{className:"language-ts"}),"const dependencyService = getMock(MyServiceDependency);\nwhen(dependencyService.greet('John')).return('Hello John').once();\n")),Object(i.b)("h3",{id:"rendercomponenttcomponent-typet-module-todo-todo"},Object(i.b)("inlineCode",{parentName:"h3"},"renderComponent<T>(component: Type<T>, module: TODO): TODO")),Object(i.b)("p",null,"Shallow-renders a component, meaning that its children components are not rendered themselves, and any constructor dependency is mocked."),Object(i.b)("p",null,"TODO example"),Object(i.b)("h2",{id:"advanced-api"},"Advanced API"),Object(i.b)("h3",{id:"createmockttoken-injectiontokent-backing-partialt-mockt"},Object(i.b)("inlineCode",{parentName:"h3"},"createMock<T>(token: InjectionToken<T>, backing?: Partial<T>): Mock<T>")),Object(i.b)("p",null,"Manually create a mock with an optional backing object."),Object(i.b)("p",null,"This function must be called before ",Object(i.b)("inlineCode",{parentName:"p"},"getService"),", ",Object(i.b)("inlineCode",{parentName:"p"},"getShallow")," or ",Object(i.b)("inlineCode",{parentName:"p"},"renderComponent"),"."),Object(i.b)("p",null,"Any subsequent call to ",Object(i.b)("inlineCode",{parentName:"p"},"getMock")," with the same injection token will return the same mock that was created with ",Object(i.b)("inlineCode",{parentName:"p"},"createMock"),"."),Object(i.b)("p",null,"TODO: example"),Object(i.b)("h3",{id:"getshallowtcomponent-typet-module-todo-todo"},Object(i.b)("inlineCode",{parentName:"h3"},"getShallow<T>(component: Type<T>, module: TODO): TODO")),Object(i.b)("p",null,"Configures and return a Shallow renderer (TODO link)."),Object(i.b)("p",null,"Use this method if you would like to further customize the renderer. In most cases, ",Object(i.b)("inlineCode",{parentName:"p"},"renderComponent")," should be used instead."),Object(i.b)("p",null,"TODO example"),Object(i.b)("h3",{id:"configuretestbedservice-typet"},Object(i.b)("inlineCode",{parentName:"h3"},"configureTestbed(service: Type<T>)")),Object(i.b)("p",null,"Configures the angular TestBed with mocks for all of the dependencies of the service."),Object(i.b)("p",null,"Only use this if you would like to customize the dependencies before creating a service. In general, you should use ",Object(i.b)("inlineCode",{parentName:"p"},"getService")," instead. "),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",Object(c.a)({parentName:"pre"},{className:"language-ts"}),"configureTestBed(MyService);\nTestBed.overrideProvider(MyDependency, { useValue: fakeDependency });\nconst service = TestBed.inject(MyService);\n")))}b.isMDXComponent=!0}}]);