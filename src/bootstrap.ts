import { store } from "./mocks-store";
import { verify } from "omnimock";

afterEach(() => {
    const values = store.flushMocks();
    for (const entry of values) {
        verify(entry);
    }
});