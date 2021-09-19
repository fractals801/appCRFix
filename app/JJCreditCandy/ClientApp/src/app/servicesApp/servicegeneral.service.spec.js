"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var servicegeneral_service_1 = require("./servicegeneral.service");
describe('ServicegeneralService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(servicegeneral_service_1.ServicegeneralService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=servicegeneral.service.spec.js.map