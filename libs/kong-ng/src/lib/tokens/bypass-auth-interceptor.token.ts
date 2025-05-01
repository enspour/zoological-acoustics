import { HttpContextToken } from '@angular/common/http';

export const BYPASS_KONG_AUTH_INTERCEPTOR = new HttpContextToken(() => false);
