import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Components/Layouts/DefaultLayout/DefaultLayout";
import publicRoutes from "./routes/Routes";
import { Fragment, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import BlackBackGround from "./Components/BlackBackGround/BlackBackGround";
import { Context } from "./store/Context";
import Class from "./Components/Layouts/Class/Class";
import Games from "./Components/Layouts/Games/Games";
function App() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const { backgroundblack, setbackgroundblack } = useContext(Context);
  return (
    <Router>
      <div className="App" style={{ position: "relative" }}>
        <Routes>
          {publicRoutes.map((item, index) => {
            let Layout = DefaultLayout;
            if (item.layout) {
              Layout = item.layout;
            } else {
              if (item.layout === null) {
                Layout = Fragment;
              }
            }
            const Page = item.component;
            return (
              <Route key={index}>
                <Route
                  key={index}
                  path={item.path}
                  element={
                    <Layout>
                      <Page data={item.path}></Page>
                    </Layout>
                  }
                ></Route>
              </Route>
            );
          })}
        </Routes>
        {backgroundblack == true ? <BlackBackGround /> : <></>}
      </div>
    </Router>
  );
}

export default App;
