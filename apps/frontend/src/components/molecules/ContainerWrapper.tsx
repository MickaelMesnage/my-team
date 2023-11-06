import { ComponentProps } from "react";

export type ContainerWrapperProps = ComponentProps<"div"> & {
  id?: string;
};

export const ContainerWrapper = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className={`w-full flex justify-center ${className || ""}`} {...props}>
      <div className="w-full max-w-screen-xl">{children}</div>
    </div>
  );
};
