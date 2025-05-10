import UserService from "./services/userService.js";
import CostService from "./services/costService.js";
import AuthService from "./services/authService.js";
import TokenService from "./services/tokenService.js";
import EventService from "./services/eventService.js";
import DateService from "./services/dateService.js";

const userService = new UserService();
const tokenService = new TokenService();
const costService = new CostService();
const authService = new AuthService();
const eventService = new EventService();
const dateService = new DateService();

export {
    userService,
    tokenService,
    costService,
    authService,
    eventService,
    dateService
};