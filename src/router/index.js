import { ROUTE } from "../constants";

import {
  AllContacts,
  Error,
  Groups,
  Home,
  Login,
  Profile,
  Register,
} from "../pages";

export const privateRoutes = [
  { path: ROUTE.LOGIN, element: Login },
  { path: ROUTE.REGISTER, element: Register },
  { path: ROUTE.HOME, element: Home },
  { path: ROUTE.PROFILE, element: Profile },
  { path: ROUTE.GROUPS, element: Groups },
  { path: ROUTE.ALL_CONTACTS, element: AllContacts },
  { path: "*", element: Error },
];

export const publishRoutes = [
  { path: ROUTE.LOGIN, element: Login },
  { path: ROUTE.REGISTER, element: Register },
  { path: "*", element: Error },
];
