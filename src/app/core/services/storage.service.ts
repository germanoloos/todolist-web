import { Injectable } from '@angular/core';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class StorageService {

    constructor() {
    }

    setItem(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getItem(key: string): any {
        const item = localStorage.getItem(key);
        return item !== null ? JSON.parse(item ?? '') : undefined;
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

}
