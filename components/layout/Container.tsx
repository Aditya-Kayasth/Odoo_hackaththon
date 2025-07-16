import { Children } from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[1920px] mx-auto px-4 py-4 xl:px-25">{children}</div>;
};

export default Container;
