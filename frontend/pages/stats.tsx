import { Box, LinearProgress } from "@mui/material";
import { useReadContract } from "wagmi";
import LotteryABI from "../abis/LotteryFactory.json";
import Lottery from "@/components/Lottery";

export default function Stats() {
  const lotteryFactoryAddress = process.env.LOTTERYFACTORY_CONTRACT;

  const {
    data: lotteries,
    isLoading,
    error,
  } = useReadContract({
    abi: LotteryABI,
    address: lotteryFactoryAddress as `0x${string}`,
    functionName: "getLotteries",
  });

  if (isLoading) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  const list_lotto: [] = lotteries as [];
  if (lotteries) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            marginTop: "10vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "  column",
            }}
          >
            {list_lotto.map((item, key) => (
              <Lottery item={item} key={key} />
            ))}
          </Box>
        </Box>
      </>
    );
  }

  if (error)
    return (
      <>
        <Box
          sx={{
            display: "flex",
            marginLeft: "50px",
            marginRight: "50px",
            alignItems: "center",
            backgroundColor: "white",
            color: "black",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 5,
              width: "100%",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            Something ocurred.
          </Box>
        </Box>
      </>
    );
}
