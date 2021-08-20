import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Navbar from "../components/Navbar/index.jsx";
import { useHistory } from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Show from "../pages/Show.jsx";
import Landing from "../pages/Landing.jsx";
import Sidebar from "../components/Sidebar/index.jsx";

export const App = (props) => {
  // State for Navbar and Mobile Hamburger Menu
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // State to handle browser back/forward buttons
  const [locationKeys, setLocationKeys] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // Handle forward event
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);

          // Handle back event
        }
      }
    });
  }, [locationKeys]);

  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        {/* Landing page is outside the div so the Navbar doesn't show */}
        <div>
          <Navbar isOpen={isOpen} toggle={toggle} />
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Route path="/home" component={Home} />
          <Route path="/auth/:form" component={Auth} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/bestseller/show" render={(rp) => <Show {...rp} />} />
        </div>
      </Switch>
    </>
  );
};
