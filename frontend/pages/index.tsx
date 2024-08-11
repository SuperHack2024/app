import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import type { GetServerSidePropsContext } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Auth from "../components/Auth";
import { Box, Button } from "@mui/material";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session: JSON.stringify(session),
    },
  };
}

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {!session ? (
        <Auth />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <strong> {session?.user?.name}</strong>
          <Button
            onClick={() => {
              signOut({ callbackUrl: "http://localhost:3000/" });
            }}
            variant={"contained"}
          >
            Sign out
          </Button>
        </Box>
      )}
    </Box>
  );
}
