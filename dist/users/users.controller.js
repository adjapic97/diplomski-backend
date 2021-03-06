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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const rxjs_1 = require("rxjs");
const users_service_1 = require("./service/users.service");
const users_helper_service_1 = require("./service/users-helper/users-helper.service");
const login_user_dto_1 = require("./dto/login-user.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const rank_service_1 = require("./service/rank/rank.service");
let UsersController = class UsersController {
    constructor(usersService, userHelperService, rankService) {
        this.usersService = usersService;
        this.userHelperService = userHelperService;
        this.rankService = rankService;
    }
    create(createUserDto) {
        console.log(createUserDto);
        return this.userHelperService.createUserDtoToEntity(createUserDto).pipe((0, rxjs_1.switchMap)((user) => this.usersService.create(user).catch(err => {
            throw new common_1.HttpException({
                message: err.message
            }, common_1.HttpStatus.CONFLICT);
        })));
    }
    findAll(page = 1, limit = 10) {
        limit = limit > 100 ? 100 : limit;
        return this.usersService.findAll({ page, limit, route: 'http://localhost:3000/api/users' });
    }
    update(id, updateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }
    async login(loginUserDto) {
        const userEntity = this.userHelperService.loginuserDtoToEntity(loginUserDto);
        const jwt = await this.usersService.login(userEntity);
        const user = await this.userHelperService.findByEmail(loginUserDto.email);
        return {
            access_token: jwt,
            token_type: 'JWT',
            expires_in: 10000,
            user: user
        };
    }
    remove(id) {
        console.log('sta');
        return this.usersService.remove(id);
    }
    async createRanks() {
        this.rankService.populateRank();
    }
    async getGrade(rank_id) {
        let grade = await this.rankService.getMinGrade(rank_id);
        console.log(grade);
        return grade;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('list')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('create-ranks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createRanks", null);
__decorate([
    (0, common_1.Get)('get-grade/:rank_id'),
    __param(0, (0, common_1.Param)('rank_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getGrade", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, users_helper_service_1.UsersHelperService,
        rank_service_1.RankService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map