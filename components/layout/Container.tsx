import { Children } from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-5 sm:px-6 xl:px-1 my-2">
      {children}
    </div>
  );
};

export default Container;
