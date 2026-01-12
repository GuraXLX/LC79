"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHorizonModule = void 0;
const common_1 = require("@nestjs/common");
const service_horizon_controller_1 = require("./service-horizon.controller");
const service_horizon_service_1 = require("./service-horizon.service");
let ServiceHorizonModule = class ServiceHorizonModule {
};
exports.ServiceHorizonModule = ServiceHorizonModule;
exports.ServiceHorizonModule = ServiceHorizonModule = __decorate([
    (0, common_1.Module)({
        controllers: [service_horizon_controller_1.ServiceHorizonController],
        providers: [service_horizon_service_1.ServiceHorizonService],
    })
], ServiceHorizonModule);
//# sourceMappingURL=service-horizon.module.js.map