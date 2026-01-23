import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../interfaces/api-response.interface";
import { HeaderService } from "./header.service";
import { StorageKey } from "../enums/localstorage-key.enum";

export abstract class ApiService {

    protected constructor(
        protected httpClient: HttpClient,
        protected headerService: HeaderService
    ) {}

    /**
     * Core API call method
     */
    private callApi<T>(
        method: string,
        url: string,
        options?: {
            body?: any;
            isAuthentication?: boolean;
            contentType?: string;
        }
    ): Observable<ResponseApi<T>> {
        let httpHeaders = new HttpHeaders();

        const needAuth = options?.isAuthentication !== false;

        if (needAuth) {
            const token = this.headerService.getToken(StorageKey.ACCESS_TOKEN);

            if (token) {
                const contentType = options?.contentType || 'application/json';

                const authHeaders = this.headerService.generateAuthHeaders(
                    token,
                    contentType
                );

                // Set headers
                Object.keys(authHeaders).forEach(key => {
                    const value = authHeaders[key];
                    if (value !== undefined && value !== null) {
                        httpHeaders = httpHeaders.set(key, value);
                    }
                });
            }
        }

        return this.httpClient.request<ResponseApi<T>>(method, url, {
            body: options?.body,
            headers: httpHeaders
        });
    }

    /**
     * HTTP GET
     * @param endpoint - API endpoint
     * @param isAuthentication - Có cần auth không (default: true)
     */
    protected get<T>(
        endpoint: string,
        isAuthentication: boolean = true
    ): Observable<ResponseApi<T>> {
        return this.callApi<T>('GET', endpoint,
            !isAuthentication ? { isAuthentication: false } : undefined
        );
    }

    /**
     * HTTP POST
     * @param endpoint - API endpoint
     * @param body - Request body
     * @param isAuthentication - Có cần auth không (default: true)
     * @param contentType - Content-Type header
     */
    protected post<T>(
        endpoint: string,
        body: any,
        isAuthentication: boolean = true,
        contentType?: string
    ): Observable<ResponseApi<T>> {
        const options: {
            body: any;
            isAuthentication?: boolean;
            contentType?: string;
        } = { body };

        if (!isAuthentication) {
            options.isAuthentication = false;
        }
        if (contentType !== undefined) {
            options.contentType = contentType;
        }

        return this.callApi<T>('POST', endpoint, options);
    }

    /**
     * HTTP PUT
     * @param endpoint - API endpoint
     * @param body - Request body
     * @param isAuthentication - Có cần auth không (default: true)
     * @param contentType - Content-Type header
     */
    protected put<T>(
        endpoint: string,
        body: any,
        isAuthentication: boolean = true,
        contentType?: string
    ): Observable<ResponseApi<T>> {
        const options: {
            body: any;
            isAuthentication?: boolean;
            contentType?: string;
        } = { body };

        if (!isAuthentication) {
            options.isAuthentication = false;
        }
        if (contentType !== undefined) {
            options.contentType = contentType;
        }

        return this.callApi<T>('PUT', endpoint, options);
    }

    /**
     * HTTP DELETE
     * @param endpoint - API endpoint
     * @param isAuthentication - Có cần auth không (default: true)
     */
    protected delete<T>(
        endpoint: string,
        isAuthentication: boolean = true
    ): Observable<ResponseApi<T>> {
        return this.callApi<T>('DELETE', endpoint,
            !isAuthentication ? { isAuthentication: false } : undefined
        );
    }

    /**
     * HTTP PATCH
     * @param endpoint - API endpoint
     * @param body - Request body
     * @param isAuthentication - Có cần auth không (default: true)
     * @param contentType - Content-Type header
     */
    protected patch<T>(
        endpoint: string,
        body: any,
        isAuthentication: boolean = true,
        contentType?: string
    ): Observable<ResponseApi<T>> {
        const options: {
            body: any;
            isAuthentication?: boolean;
            contentType?: string;
        } = { body };

        if (!isAuthentication) {
            options.isAuthentication = false;
        }
        if (contentType !== undefined) {
            options.contentType = contentType;
        }

        return this.callApi<T>('PATCH', endpoint, options);
    }
}