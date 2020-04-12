import { flush } from '@angular/core/testing';
import { Rendering } from 'shallow-render/dist/lib/models/rendering';
export { Rendering } from 'shallow-render/dist/lib/models/rendering';

/**
 * Base class for test page objects.
 * 
 * Wraps some of the boilerplate required to write clean component tests. 
 */
export class BasePage<T> {

    /**
     * Build the new page object.
     * @param rendering The rendering object obtained with `renderComponent` or `getShallow().<...>.render();`.
     */
    constructor(public readonly rendering: Rendering<T, unknown>) { }

    /**
     * Detects changes to the component and flushes the fake async queue.
     * This is the most reliable way I found to consistently see the result of property modifications in
     * an angular unit test.
     * Requires the test to run in the `fakeAsync` execution context.
     */
    detectChanges() {
        this.rendering.fixture.detectChanges();
        flush();
    }
}
