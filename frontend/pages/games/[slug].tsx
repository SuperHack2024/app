import React from 'react';
import useSWR from 'swr';
import { Box, Typography, Button, Divider, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';
import {
  shortenString,
  bigIntToEth,
  generateRandomBytes32,
} from '../../components/helpers/ops';
import RedeemIcon from '@mui/icons-material/Redeem';
import ReceiptIcon from '@mui/icons-material/Receipt';

import { abi } from '../../abis/abiLottery';
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session: JSON.stringify(session),
    },
  };
}
import LotteryAbi from '../../abis/Lottery.json';
import { fetcher } from '@/components/helpers/ops';
import Table from '@/components/Table';

import TopBar from '@/components/TopBar.tsx';

import { useReadContract, useWriteContract } from 'wagmi';
import { readContract } from 'viem/actions';
interface Item {
  block: string;
  value: string;
  type: string;
}

export default function LotteryDetail() {
  const { writeContract } = useWriteContract();
  const { data: session, status } = useSession();
  const router = useRouter();
  const id = router.query.slug;

  const {
    data: partipantsContract,
    isLoading: isLoadingFromContract,
    error: errorFromContract,
  } = useReadContract({
    abi: LotteryAbi,
    address: id as `0x${string}`,
    functionName: 'getParticipants',
  });

  const {
    data: winnerSelectionFee,
    isLoading: isLoadingwinnerSelectionFee,
    error: errorWinnerSelectionFee,
  } = useReadContract({
    abi: LotteryAbi,
    address: id as `0x${string}`,
    functionName: 'getWinnerSelectionFee',
  });

  const winnerFee = winnerSelectionFee;
  const {
    data: lotteryWinner,
    isLoading: isLoadingWinner,
    error: errorWinner,
  } = useReadContract({
    abi: LotteryAbi,
    address: id as `0x${string}`,
    functionName: 'winnerAnnounced',
  });

  const {
    data: owner,
    isLoading: isLoadingOwner,
    error: errorOwner,
  } = useReadContract({
    abi: LotteryAbi,
    address: id as `0x${string}`,
    functionName: 'owner',
  });

  const noWinner = '0x0000000000000000000000000000000000000000';

  const {
    data: balance,
    isLoading: isLoadingBalance,
    error: errorBalance,
  } = useReadContract({
    abi: LotteryAbi,
    address: id as `0x${string}`,
    functionName: 'getBalance',
    args: [id as `0x${string}`],
  });

  const participants: [] = partipantsContract as [];
  const {
    data: lotteryStatus,
    isLoading: isLoadinglotteryStatus,
    error: errorlotteryStatus,
  } = useReadContract({
    abi: LotteryAbi,
    address: id as `0x${string}`,
    functionName: 'lotteryStatus',
  });

  const apiUrl = id
    ? `https://base-sepolia.blockscout.com/api/v2/addresses/${id}/internal-transactions?filter=to%20%7C%20from`
    : null;
  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  const apiPrices =
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR';
  const {
    data: ethPrices,
    error: errorEthPrices,
    isLoading: isLoadingEthPrices,
  } = useSWR(apiPrices, fetcher);
  const prize = bigIntToEth(balance as bigint);
  if (error) return <>Error...</>;
  if (isLoading) return <>Loading...</>;
  if (!session) {
    router.push('/');
  }
  if (data && ethPrices) {
    const items: Item[] = data.items;

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', // Full viewport height
          }}
        >
          <TopBar />
          <Divider />

          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              color: 'black',
              marginTop: '3vh',
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '30%',
                paddingLeft: '8vh',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Lottery Contract:
                <br />
                <Link
                  href={`https://base-sepolia.blockscout.com/address/${id}`}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenString(id as string)}
                </Link>
              </Typography>
              <br />
              {/* <Typography variant="body2" gutterBottom>
                <ReceiptIcon />
                Contract Owner:
                <br />
                <Link
                  href={`https://base-sepolia.blockscout.com/address/${owner}`}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenString(owner as string)}
                </Link>
              </Typography> */}
              {lotteryWinner === noWinner ? (
                <Typography variant="h5" gutterBottom>
                  Prize:
                  <br />
                  {prize} ETH ~ $ {(ethPrices.USD * prize).toFixed(2)}
                </Typography>
              ) : (
                <>
                  Winner:
                  <br />
                  <Link
                    href={`https://base-sepolia.blockscout.com/address/${id}`}
                    passHref
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenString(lotteryWinner as string)}
                  </Link>
                </>
              )}
              <br />
              <br />
              <Typography variant="h5" gutterBottom>
                {(lotteryStatus as boolean) ? 'Participants:' : 'Players'}
                <br />
                <br />
                {participants?.map((item: string, index: any) => (
                  <Typography variant="h6" gutterBottom key={index}>
                    <Link
                      href={`https://base-sepolia.blockscout.com/address/${item}`}
                      passHref
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item}
                    </Link>
                  </Typography>
                ))}
                <br />
                Lottery Status:{' '}
                {(lotteryStatus as boolean) ? 'Active' : 'Closed'}
                {/* TODO: Active only if the user is the owner and if it is active */}{' '}
                <br /> <br />
                {/* <>
                  Winner Selection Fee is: {bigIntToEth(winnerFee as bigint)}{' '}
                  ETH ~ ${' '}
                  {(ethPrices.USD * bigIntToEth(winnerFee as bigint)).toFixed(
                    2
                  )}
                </> */}
              </Typography>
              <Button
                sx={{
                  boxShadow: 'none',
                  width: '12rem',
                  height: '5rem',
                  textTransform: 'none',
                  borderRadius: '30px',
                  backgroundColor: '#1976D2',
                  '&:hover': {
                    backgroundColor: '#0052FF',
                  },
                }}
                variant="contained"
                disabled={!lotteryStatus as boolean}
                onClick={() => {
                  const randomnumber = generateRandomBytes32();
                  // console.log("Generating Random Number", randomnumber);
                  // console.log("Winner Selection Fee is ", winnerSelectionFee);
                  writeContract({
                    abi,
                    address: id as `0x${string}`,
                    functionName: 'drawWinner',
                    args: [randomnumber as `0x${string}`],
                    value: winnerSelectionFee as bigint,
                  });
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: '1.2rem',
                  }}
                >
                  Pick random winner
                </Typography>
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '100vw',
                flexDirection: 'column',
              }}
            >
              <Table items={items} />
            </Box>
          </Grid>
        </Box>
      </>
    );
  }
}
