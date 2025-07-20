interface HeadingProps {
  title: string;
  center?: boolean;
  md?: boolean;
  lg?: boolean;
}

const Heading = ({ title, center, lg, md }: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      {lg && (
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl my-3">
          {title}
        </h1>
      )}
      {md && (
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl my-3">
          {title}
        </h1>
      )}
      {!md && !lg && (
        <h3 className="font-bold text-lg sm:text-xl md:text-3xl my-3">
          {title}
        </h3>
      )}
    </div>
  );
};

export default Heading;
