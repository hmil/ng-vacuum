import { getTestBed } from "@angular/core/testing";
import { ErrorHandler } from "@angular/core";

/**
 * Catches all unhandled errors during test execution and fails the test if any error occurs.
 * 
 * The default angular config allows many errors to escape the test suite which can lead to silent errors.
 * Call this utility in the `test.ts` file to catch these errors before they can escape!
 */
export function catchUnhandledErrors(): void {

    let uncaughtErrors: any[] = [];

    beforeEach(() => {
        getTestBed().overrideProvider(ErrorHandler, { useValue: testingErrorHandler });
    });

    const testingErrorHandler: ErrorHandler = {
        handleError: errorHandler
    };
    window.onerror = errorHandler;

    function errorHandler(err: any) {
        uncaughtErrors.push(err);
    }

    afterEach(() => {
        const errors = uncaughtErrors;
        uncaughtErrors = [];
        for (const err of errors) {
            fail(`Uncaught error: ${err}`);
        }
    });

}
