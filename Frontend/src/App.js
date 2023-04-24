import React, { Suspense } from "react";
//import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom"; //For v6
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import NewPlace from "./places/pages/NewPlace";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
//import Auth from "./user/pages/Auth";
//import Users from "./user/pages/Users";

const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      //For v6
      // <React.Fragment>
      //   <Route path="/" element={<Users />} />
      //   <Route path="/:userId/places" element={<UserPlaces />} />
      //   <Route path="/places/new" element={<NewPlace />} />
      //   <Route path="/places/:placeId" element={<UpdatePlace />} />
      //   <Route path="*" element={<Navigate to="/" replace />} />
      //   {/* <Navigate replace to="/" /> */}
      // </React.Fragment>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      //For v6
      // <React.Fragment>
      //   <Route path="/" element={<Users />} />
      //   <Route path="/:userId/places" element={<UserPlaces />} />
      //   <Route path="/auth" element={<Auth />} />
      //   <Route path="*" element={<Navigate to="/auth" replace />} />
      //   {/* <Navigate replace to="/auth" /> */}
      // </React.Fragment>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      {/* <BrowserRouter>
        <MainNavigation />
        <main>
          <Routes>
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              {routes}
            </Suspense>
          </Routes>
        </main>
      </BrowserRouter> */}

      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
