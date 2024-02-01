import { CheckUserLoggedIn } from "../helpers/ServerRequests.js"
import { RenderHomePage } from "../pages/home/Home.js"
import { RenderLoginPage } from "../pages/login/Login.js"
import { RenderPostPage } from "../pages/createPost/CreatePostPage.js"
import { RenderProfilePage } from "../pages/profile/ProfilePage.js"
import { RenderRegisterPage } from "../pages/register/Register.js"
import { RenderSeparatePostPage } from "../pages/separatePost/SeparatePostPage.js"
import { RenderNotFound } from "../pages/notfound/NotFound.js"

const checkUserLoggedInMiddleware = async (params) => {
    const isUserLogged = await CheckUserLoggedIn();

    if (!isUserLogged) {
        console.log('User not logged in. Redirect or handle accordingly.');
        window.location.href = '/login';
    }

    // Continue to the next middleware or route handler
    return params;
};

const routes = [
    { path: '/', view: RenderHomePage, middleware: [checkUserLoggedInMiddleware] },
    { path: '/login', view: RenderLoginPage },
    { path: '/register', view: RenderRegisterPage },
    { path: '/create-post', view: RenderPostPage, middleware: [checkUserLoggedInMiddleware] },
    { path: '/profile', view: RenderProfilePage, middleware: [checkUserLoggedInMiddleware] },
    { path: '/post/:id', view: RenderSeparatePostPage, middleware: [checkUserLoggedInMiddleware] },
    { path: '.*', view: RenderNotFound },
];

const matchRoute = (path, route) => {
    const routePathSegments = route.path.split('/');
    const urlPathSegments = path.split('/');

    if (routePathSegments.length !== urlPathSegments.length) {
        return false;
    }

    const params = {};

    for (let i = 0; i < routePathSegments.length; i++) {
        if (routePathSegments[i].startsWith(':')) {
            const paramName = routePathSegments[i].slice(1);
            params[paramName] = urlPathSegments[i];
        } else if (routePathSegments[i] !== urlPathSegments[i]) {
            return false;
        }
    }

    return params;
};

const findMatchingRoute = async (path, routes) => {
    for (const route of routes) {
        const params = matchRoute(path, route);
        if (params) {
            // Execute middleware before rendering the view
            const updatedParams = route.middleware
                ? await route.middleware.reduce(async (prev, middleware) => {
                    return await middleware(await prev);
                }, Promise.resolve(params))
                : params;

            return { route, params: updatedParams };
        }
    }

    // No matching route found, render the "not found" view
    return { route: { view: RenderNotFound }, params: {} };
};

export const RouterFunction = async () => {
    const { route, params } = await findMatchingRoute(location.pathname, routes) || {
        route: routes[0],
        params: {},
    };

    await route.view(params);
};
