import UserService from "./services/userService.js";
import CostService from "./services/costService.js";
import AuthService from "./services/authService.js";
import TokenService from "./services/tokenService.js";

const userService = new UserService();
const tokenService = new TokenService();
const costService = new CostService();
const authService = new AuthService();

export {
    userService,
    tokenService,
    costService,
    authService,
};