import Feed from "@components/Feed";
import { Suspense } from "react";
import Loading from "./Loading";

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & Share
          <br className="max-md:hidden" />
          <span className="purple_gradient text-center">
            AI-Powered Prompts
          </span>
        </h1>
        <p className="desc text-center">
          Promptia is an open-source AI prompting tool for modern world to
          discover, create and share creative prompts
        </p>
        <Feed />
      </section>
    </Suspense>
  );
};

export default Home;
