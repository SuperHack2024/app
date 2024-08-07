// import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import {
//   IDKitWidget,
//   ISuccessResult,
//   IVerifyResponse,
//   VerificationLevel,
//   useIDKit,
// } from "@worldcoin/idkit";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

import type { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";

import { Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/Header";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}

// async function verify(
//   proof: ISuccessResult,
//   app_id: `app_${string}`,
//   action: string,
//   signal: string
// ) {
//   const response = await fetch("/api/verify", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       proof,
//       app_id,
//       action,
//       signal,
//     }),
//   });

//   const result = (await response.json()) as IVerifyResponse;

//   if (response.ok) {
//     console.log("handleVerify Success!");
//   } else {
//     throw new Error("handleVerify Error: " + result.detail);
//   }
// }

export default function ServerSidePage() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Lottery Web3</title>
        <meta
          name="description"
          content="Lottery Web3 ::: Powered by WorldCoin Base and Pyth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",

            width: "100vw",
            height: "100vh",
            gap: 3,
          }}
        >
          <Image
            alt="Lottery Background"
            src="/background.jpg"
            width="550"
            height="400"
            layout="fixed"
            style={{ borderRadius: "25px" }}
          />{" "}
          <pre>{JSON.stringify(session, null, 2)}</pre>
          {/* <IDKitWidget
            action={action}
            signal={signal}
            onError={(error) => console.log("onError: ", error)}
            onSuccess={(response) => console.log("onSuccess: ", response)}
            handleVerify={(proof) => verify(proof, app_id, action, signal)}
            app_id={app_id}
            verification_level={VerificationLevel.Device}
          >
            {({ open }) => (
              <Button variant="outlined" onClick={open}>
                Authenticate with WorldCoin
              </Button>
            )}
          </IDKitWidget> */}
        </Box>
      </Box>
    </>
  );
}
