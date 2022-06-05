import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ContentWrapper from './Components/ContentWrapper/ContentWrapper';
import Group from './Components/Group/Group';
import Guide from './Components/Guide/Guide';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Turist from './Components/Turist/Turist';

interface Props {
}

const RouteComponent: FunctionComponent<Props> = (props) => {

  const PrivateRoute = ({ children, redirectTo }: { children: any, redirectTo: any }) => {
    const isAuthenticated = localStorage.getItem("token") !== null;
    // console.log("IsAuth: ", isAuthenticated);
    return isAuthenticated ?
      <>
        <ContentWrapper />
        {children}
      </>
      : <Navigate to={redirectTo} />
  }

  return (
    <Router>
      <Routes>
        <Route path="/home" element={
          <PrivateRoute redirectTo='/'>
            <Home />
          </PrivateRoute>}>
        </Route>
        <Route path="/guide" element={
          <PrivateRoute redirectTo='/'>
            <Guide />
          </PrivateRoute>}>
        </Route>
        <Route path="/turist" element={
          <PrivateRoute redirectTo='/'>
            <Turist />
          </PrivateRoute>}>
        </Route>
        <Route path="/group" element={
          <PrivateRoute redirectTo='/'>
            <Group />
          </PrivateRoute>}>
        </Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </Router>
  );
};

export default RouteComponent;