import { Injectable } from "@angular/core";
import { HttpClientHeaders } from "../interfaces/http-heades.interface";
import {StorageKey} from "../enums/localstorage-key.enum";

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    /**
     * Generate auth headers
     */
    generateAuthHeaders(
        token: string,
        contentType?: string,
        additionalHeaders?: Record<string, string>
    ): HttpClientHeaders {
        const headers: HttpClientHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': `${contentType}`
        };

        if (additionalHeaders) {
            Object.keys(additionalHeaders).forEach(key => {
                headers[key] = additionalHeaders[key];
            });
        }

        return headers;
    }

    /**
     * Generate headers từ localStorage
     * @param additionalHeaders - Custom headers bổ sung
     */
    generateHeadersFromStorage(
        additionalHeaders?: Record<string, string>,
    ): HttpClientHeaders | undefined {
        // Lấy token từ localStorage
        const token = localStorage.getItem(StorageKey.ACCESS_TOKEN);

        if (!token) {
            return additionalHeaders;
        }

        // Generate auth headers với token
        return this.generateAuthHeaders(token,"", additionalHeaders);
    }

    /**
     * Generate headers với custom token (không lấy từ storage)
     */
    generateHeadersWithToken(
        token: string,
        additionalHeaders?: Record<string, string>
    ): HttpClientHeaders {
        return this.generateAuthHeaders(token, "",additionalHeaders);
    }


    /**
     * Generate headers với custom Content-Type
     */
    generateCustomHeaders(
        token: string,
        contentType: string,
        additionalHeaders?: Record<string, string>
    ): HttpClientHeaders {
        const headers: HttpClientHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': contentType
        };

        if (additionalHeaders) {
            Object.keys(additionalHeaders).forEach(key => {
                headers[key] = additionalHeaders[key];
            });
        }

        return headers;
    }

    /**
     * Check token existence in storage
     */
    hasToken(storageKey: string = StorageKey.ACCESS_TOKEN): boolean {
        return !!localStorage.getItem(storageKey);
    }

    /**
     * Get token from storage
     */
    getToken(storageKey: string = StorageKey.ACCESS_TOKEN): string | null {
        return localStorage.getItem(storageKey);
    }

    /**
     * Set token to storage
     */
    setToken(token: string, storageKey: string = StorageKey.ACCESS_TOKEN): void {
        localStorage.setItem(storageKey, token);
    }

    /**
     * Remove token from storage
     */
    removeToken(storageKey: string = StorageKey.ACCESS_TOKEN): void {
        localStorage.removeItem(storageKey);
    }

    /**
     * Clear all auth data
     */
    clearAuthData(key: string): void {
        localStorage.removeItem(key);
    }
}