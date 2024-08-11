import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { LinearProgress } from "@mui/material";
import { Box, Button } from "@mui/material";

export default function Auth() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <LinearProgress />;
  }

  if (!session) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Link
          href={`/api/auth/signin`}
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <br />
          <Button
            onClick={(e) => {
              e.preventDefault();
              signIn("worldcoin", {
                callbackUrl: "http://localhost:3000/stats",
              });
            }}
            variant={"contained"}
          >
            Sign in
          </Button>
        </Link>
      </Box>
    );
  }

  if (session) {
    return (
      <Box sx={{ color: "white" }}>
        <Button
          onClick={() => {
            signOut({ callbackUrl: "http://localhost:3000/" });
          }}
          variant={"contained"}
        >
          Sign out
        </Button>
      </Box>
    );
  }
}
