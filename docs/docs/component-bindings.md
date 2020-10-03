---
id: component-bindings
title: Testing @Input and @Ouput
sidebar_label: '@Input and @Output'
---

In the previous section, we have seen how to mock services and child components in a component test.  
In this section we will cover how to inject data into the inputs of our components, and how to assert events emitted on its outputs.

# Binding input data

Consider the component below:

```ts
@Component({
    selector: 'greetings-component',
    templateUrl: `
        <span test-id="message">Hello {{name}}</span>
    `
})
export class GreetingsComponent {
    @Input()
    userName: string;
}
```

We would like to verify that the label gets updated with the user name.

As always, we create a page object to model the interactions with our component:

```ts
class Page<T> extends BasePage<GreetingsComponent, T> {

    get messageText(): string {
        return (this.rendering.find('[test-id=message]').nativeElement as HTMLElement).innerText
    }
}
```

Then, we use `setInputs` on the page object to update the input bindings and trigger a change detection cycle:

```ts
it('greets the user', fakeAsync(() => {
    // Render the component with initial input values
    const page = new Page(renderComponent(GreetingsComponent, GreetingsModule, {
        inputs: {
            userName: 'John'
        }
    }));
    expect(page.messageText).toBe('Hello John');

    // Set input values and test again
    page.setInputs({
        userName: 'Atul'
    });
    expect(page.messageText).toBe('Hello Atul');
}));
```

Setting input values after the component has been initialized can be useful when you want to test `onChanges` logic.

:::caution

You can only use `setInputs` for inputs that you have initialized in `renderComponent`. This is what the template type parameter `T` in `Page<T>` is for.

:::

# Test output events

Let's consider a keypad component which lets users type in a numeric code:

```ts
@Component({
    selector: 'keypad-component',
    templateUrl: `
        <button *ngFor="number of numbers" [test-id]="number" (click)="onClick(number)></button>
    `
})
export class KeypadComponent {

    numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    code = '';

    @Output()
    codeChange = new EventEmitter<string>();

    onClick(n: number) {
        this.code += String(n);
        this.codeChange.emit(this.code);
    }
}
```

We would like to test the emitted output.


```ts
class Page<T> extends BasePage<KeypadComponent, T> {

    getButton(n: number): HTMLButtonElement {
        return this.rendering.find(`[test-id=${n}]`).nativeElement;
    }
}
```

The page object exposes outputs utilities on `page.outputs`. Use `capture()` to create an array which receives all future events emitted on this output:

```ts
it('lets the user type a combination', fakeAsync(() => {
    const page = new Page(renderComponent(KeypadComponent, KeypadModule));

    const emittedEvents = page.outputs.codeChage.capture();

    page.getButton(1).click();
    page.getButton(3).click();
    page.getButton(3).click();
    page.getButton(7).click();

    expect(emittedEvents).toEqual(['1', '13', '133', '1337'])
}));
```

