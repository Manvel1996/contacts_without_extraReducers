import { ROUTE } from "../constants";

import {
  AllContacts,
  Groups,
  Home,
  Login,
  Profile,
  Register,
} from "../pages";

export const privateRoutes = [
  { path: ROUTE.HOME, element: <Home/> },
  { path: ROUTE.PROFILE, element: <Profile/> },
  { path: ROUTE.GROUPS, element: <Groups/> },
  { path: ROUTE.ALL_CONTACTS, element: <AllContacts/> },
];

export const publicRoutes = [
  { path: ROUTE.LOGIN, element: <Login/> },
  { path: ROUTE.REGISTER, element: <Register/> },
];
