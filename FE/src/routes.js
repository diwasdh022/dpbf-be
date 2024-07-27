/*!



* Coded by Deepak Prakash Baskota Foundation

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/Profile.js";
import Maps from "views/Maps.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import Tables from "views/Tables.js";
import Icons from "views/Icons.js";
import ConfirmEmail from "./views/ConfirmEmail";
import EditProfile from "./views/EditProfile";
import UsersTable from "./views/UsersTable";
import ResetPassword from "./views/ResetPassword";
import ConfirmPassword from "./views/ConfirmPassword";
import ResetPasswordSuccess from "./views/ResetPasswordSuccess";

var routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/admin",
        api: false,
    },
    {
        path: "/icons",
        name: "Icons",
        icon: "ni ni-planet text-blue",
        component: Icons,
        layout: "/admin",
        api: false,
    },
    {
        path: "/maps",
        name: "Maps",
        icon: "ni ni-pin-3 text-orange",
        component: Maps,
        layout: "/admin",
        api: false,
    },
    {
        path: "/user-profile",
        name: "User Profile",
        icon: "ni ni-single-02 text-yellow",
        component: Profile,
        layout: "/admin",
        api: true,
    },
    {
        path: "/tables",
        name: "Tables",
        icon: "ni ni-bullet-list-67 text-red",
        component: Tables,
        layout: "/admin",
        api: false,
    },
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth",
        api: true,
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: Register,
        layout: "/auth",
        api: true,
    },
    {
        path: "/confirm-email/:id",
        name: "Confirm Email",
        icon: "ni ni-check-bold text-green",
        component: ConfirmEmail,
        layout: "/auth",
        api: true,
    },
    {
        path: "/edit-profile",
        name: "Edit Profile",
        icon: "ni ni-ruler-pencil text-info",
        component: EditProfile,
        layout: "/admin",
        api: true,
    },
    {
        path: "/users",
        name: "Users",
        icon: "ni ni-folder-17 text-pink",
        component: UsersTable,
        layout: "/admin",
        api: true,
    },
    {
        path: "/reset-password",
        name: "Reset Password",
        icon: "ni ni-folder-17 text-pink",
        component: ResetPassword,
        layout: "/auth",
        api: true,
    },
    {
        path: "/confirm-password/:id",
        name: "Confirm Password",
        icon: "ni ni-folder-17 text-pink",
        component: ConfirmPassword,
        layout: "/auth",
        api: true,
    },
    {
        path: "/reset-success",
        name: "Password Reset Confirmed",
        icon: "ni ni-folder-17 text-pink",
        component: ResetPasswordSuccess,
        layout: "/auth",
        api: false,
    },
];
export default routes;
