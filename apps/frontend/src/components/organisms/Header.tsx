import React, { ComponentProps, Suspense } from "react";
import { Link, Button } from "@nextui-org/react";
import NextLink from "next/link";
import { ConnectedSignout } from "@/components/organisms/ConnectedSignout";
import { useUserData } from "@nhost/nextjs";

export const Header = ({ className, ...props }: ComponentProps<"header">) => {
  const user = useUserData();

  return (
    <header
      className={`flex justify-between items-center p-4 border-b-1 ${className}`}
      {...props}
    >
      <NextLink href="/">Ma team web app</NextLink>
      <nav className="flex items-center gap-8">
        <div className="hidden sm:flex gap-4 items-center">
          <Link color="foreground" href="/" as={NextLink}>
            Accueil
          </Link>
          <Link href="/team/list" as={NextLink}>
            Mes équipes
          </Link>
        </div>
        {user ? (
          <ConnectedSignout />
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
    </header>
  );
};
