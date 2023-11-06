import React, { ComponentProps } from "react";
import { Link, Button } from "@nextui-org/react";
import NextLink from "next/link";
import { useAuthenticationStatus } from "@nhost/nextjs";
import { HeaderConnectedDropdown } from "@/components/organisms/HeaderConnectedDropdown";

export const Header = ({ className, ...props }: ComponentProps<"header">) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  return (
    <header
      className={`flex justify-between items-center p-4 ${className}`}
      {...props}
    >
      <NextLink href="/">Ma team web app</NextLink>
      {!isLoading && (
        <nav className="flex items-center gap-8">
          <div className="hidden sm:flex gap-4 items-center">
            <Link href="/" as={NextLink}>
              Accueil
            </Link>
            <Link href="/team/list" as={NextLink}>
              Mes équipes
            </Link>
            <Link href="/game/list" as={NextLink}>
              Mes matchs
            </Link>
          </div>
          {isAuthenticated ? (
            <HeaderConnectedDropdown />
          ) : (
            <Button
              as={NextLink}
              color="primary"
              href="/auth/signin"
              variant="flat"
            >
              Se connecter
            </Button>
          )}
        </nav>
      )}
    </header>
  );
};
