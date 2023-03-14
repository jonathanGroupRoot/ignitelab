"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/config/dist");
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const node_util_1 = require("node:util");
const graphql_1 = require("@nestjs/graphql");
let AuthorizationGuard = class AuthorizationGuard {
    constructor(configService) {
        var _a;
        this.configService = configService;
        this.AUTH0_DOMAIN = (_a = this.configService.get('AUTH0_DOMAIN')) !== null && _a !== void 0 ? _a : '';
    }
    async canActivate(context) {
        const { req, res } = graphql_1.GqlExecutionContext.create(context).getContext();
        const checkJWT = (0, node_util_1.promisify)((0, express_oauth2_jwt_bearer_1.auth)({
            audience: 'ignite-lab-root-auth',
            issuerBaseURL: 'https://ignite-lab-root.us.auth0.com/',
            tokenSigningAlg: 'RS256',
            jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }));
        try {
            await checkJWT(req, res);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error,
            }, common_1.HttpStatus.UNAUTHORIZED, {
                cause: error,
            });
        }
    }
};
AuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.ConfigService])
], AuthorizationGuard);
exports.AuthorizationGuard = AuthorizationGuard;
//# sourceMappingURL=authorization.guard.js.map