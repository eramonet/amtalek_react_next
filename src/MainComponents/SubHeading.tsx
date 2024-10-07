function SubHeading({ style = "text-center", children }: any) {
  return <p className={`text-base mt-1 opacity-80 ${style}`}>{children}</p>;
}

export default SubHeading;
