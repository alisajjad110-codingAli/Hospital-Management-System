import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../security/auth-service";


export const jwtInterceptor: HttpInterceptorFn = (req,next) => {

    const authService = inject(AuthService);
    const token = authService.getToken;

    if (token) {
        const cloneReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(cloneReq);
    }
    return next(req);
}