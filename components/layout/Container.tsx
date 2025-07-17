import { Children } from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-max-[1920px] mx-auto xl:px-10">{children}</div>
  );
};

export default Container;
