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
    <div
      className={`w-full h-full flex justify-center ${className || ""}`}
      {...props}
    >
      <div className="w-full h-full max-w-screen-xl p-4">{children}</div>
    </div>
  );
};
