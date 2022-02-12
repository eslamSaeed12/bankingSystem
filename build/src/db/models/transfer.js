"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trasnfer = void 0;
const typeorm_1 = require("typeorm");
const customer_1 = require("./customer");
let Trasnfer = class Trasnfer {
    id;
    senderId;
    receiverId;
    amount;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Trasnfer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => customer_1.Customer),
    (0, typeorm_1.JoinColumn)()
], Trasnfer.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => customer_1.Customer),
    (0, typeorm_1.JoinColumn)()
], Trasnfer.prototype, "receiverId", void 0);
__decorate([
    (0, typeorm_1.Column)('double precision', { nullable: false })
], Trasnfer.prototype, "amount", void 0);
Trasnfer = __decorate([
    (0, typeorm_1.Entity)('transfers')
], Trasnfer);
exports.Trasnfer = Trasnfer;
