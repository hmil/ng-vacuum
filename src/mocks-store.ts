import { Type, InjectionToken } from "@angular/core";
import { Mock, instance } from "omnimock";

type MockStoreKey<T> = Type<T> | InjectionToken<T>;

export class MocksStore {
    private _globalMocks: Map<MockStoreKey<any>, Mock<any>> = new Map();
    
    public addMock<T>(token: MockStoreKey<T>, mock: Mock<T>) {
        this._globalMocks.set(token, mock);
    }
    
    public getMock<T>(token: MockStoreKey<T>): Mock<T> | undefined {
        return this._globalMocks.get(token) as Mock<T>;
    }
    
    public hasMock(token: MockStoreKey<any>): boolean {
        return this._globalMocks.has(token);
    }
    
    public getMockProviders(): Array<{ provide: MockStoreKey<any>, useFactory: () => any }> {
        const providers: any[] = [ ];
        for (const [provide, m] of this._globalMocks.entries()) {
            providers.push({ provide, useFactory: () => instance(m) });
        }
        return providers;
    }
    
    /**
     * Clears the global mocks map and return the original
     */
    public flushMocks(): IterableIterator<Mock<unknown>> {
        const values = this._globalMocks.values();
        this._globalMocks = new Map();
        return values;
    }
}

export const store = new MocksStore();

