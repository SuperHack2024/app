import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import type { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { Box } from "@mui/material";
import Auth from "../components/Auth";

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
      {!session ? <Auth /> : <>Signed In</>}
    </Box>
  );
}
