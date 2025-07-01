import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import FindTutors from "../Pages/FindTutors/FindTutors";
import TutorDetails from "../Pages/TutorDetails/TutorDetails";
import AddTutorials from "../Pages/AddTutorials/AddTutorials";
import MyTutorials from "../Pages/MyTutorials/MyTutorials";
import MyBookedTutors from "../Pages/MyBookedTutors/MyBookedTutors";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";

let router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about-us',
        Component: AboutUs
      },
      {
        path: 'contact-us',
        Component: ContactUs
      },
      {
        path: "find-tutors",
        element: <FindTutors />,
      },
      {
        path: "find-tutors/:category",
        element: <FindTutors />,
      },
      {
        path: "tutor-details/:id",
        element: (
          <PrivateRoute>
            {" "}
            <TutorDetails />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "add-tutorials",
        element: (
          <PrivateRoute>
            {" "}
            <AddTutorials />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "my-tutorials",
        element: (
          <PrivateRoute>
            {" "}
            <MyTutorials />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "my-booked-tutors",
        element: (
          <PrivateRoute>
            {" "}
            <MyBookedTutors />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
