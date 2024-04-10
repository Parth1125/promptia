import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Suspense } from "react";
import Loading from "./Loading";

export const metadata = {
  title: "Promptia",
  description: "Discober & share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <Suspense fallback={<Loading />}>
            <div className="main">
              <div className="gradient"></div>
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
