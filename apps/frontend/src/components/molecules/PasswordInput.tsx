import React, { useState } from "react";
import { Input, InputProps } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";

export const PasswordInput = (props: InputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = (): void => setIsVisible(!isVisible);

  return (
    <Input
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      {...props}
    />
  );
};
