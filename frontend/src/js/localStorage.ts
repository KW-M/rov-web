import { type nStoreT } from "./shared/libraries/nStore";
import { changesSubscribe } from "./shared/util";

/** keeps a svelte store and local storage value in sync (value is a string).
 * @param label label to use as the key to store this value in local storage.
 * @param store the svelte store to keep in sync with the local storage value.
 * @param defaultValue {optional} the value to initilize the store and local storage with if neither has been set.
 */
export function bindStringSvelteStoreToLocalStorage(label: string, store: nStoreT<string>, defaultValue: string): void {
    store.set(localStorage.getItem(label) || store.get() || defaultValue);
    changesSubscribe(store, (newVal: string) => localStorage.setItem(label, String(newVal)));
}


/** keeps a svelte store and local storage value in sync (value is a number).
 * @param label label to use as the key to store this value in local storage.
 * @param store the svelte store to keep in sync with the local storage value.
 * @param defaultValue {optional} the value to initilize the store and local storage with if neither has been set.
 */
export function bindNumberSvelteStoreToLocalStorage(label: string, store: nStoreT<number>, defaultValue: number): void {
    const curr = localStorage.getItem(label);
    store.set((curr != null ? parseFloat(curr) : 0) || store.get() || defaultValue);
    changesSubscribe(store, (newVal: number) => localStorage.setItem(label, String(newVal)));
}


class LocalStorageWrapper {
    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    setItem(key: string, value: any | string): void {
        if (typeof value === 'string') {
            this.storage.setItem(key, value);
        } else {
            this.storage.setItem(key, JSON.stringify(value));
        }
    }

    getItem(key: string): any | string | null {
        const item = this.storage.getItem(key);
        try {
            return item ? JSON.parse(item) : null;
        } catch {
            return item;
        }
    }

    updateItem(key: string, value: any | string): void {
        const existingItem = this.getItem(key);
        if (existingItem && typeof existingItem === 'object') {
            const updatedItem = { ...existingItem, ...value };
            this.storage.setItem(key, JSON.stringify(updatedItem));
        } else {
            this.storage.setItem(key, JSON.stringify(value));
        }
    }

    deleteItem(key: string): void {
        this.storage.removeItem(key);
    }
}

let _localStore: LocalStorageWrapper | null = null;
export const getLocalStore = () => (_localStore = _localStore ?? new LocalStorageWrapper());
