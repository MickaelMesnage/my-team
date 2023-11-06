import { SVGProps } from "react";

export function DashboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#888888"
        d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h6v18H5Zm8 0v-9h8v7q0 .825-.588 1.413T19 21h-6Zm0-11V3h6q.825 0 1.413.588T21 5v5h-8Z"
      ></path>
    </svg>
  );
}
