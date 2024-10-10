"use client";

import { createBroadcastApi } from "@/apis/broadcast";
import { BackButton } from "@/components/@widgets/BackButton";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { useAuthContext } from "@/hooks/store/useAuth";
import { cerContract } from "@/utils/config/contracts";
import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatEther, parseUnits } from "viem";
import { baseSepolia } from "viem/chains";
import { useWaitForTransactionReceipt } from "wagmi";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";

export default function Broadcast() {
  const { address } = useAccount();
  const router = useRouter();
  const [amount, setAmount] = useState(10);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const mutation = useWriteContract();
  const { data: hash, writeContract, isPending } = mutation;

  const { mutate: createBroadcast, data } = useMutation({
    mutationFn: createBroadcastApi,
  });

  console.log(data);

  const submit = () => {
    createBroadcast({ amount: 1, message: "Hello World" });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  console.log(isConfirmed, isConfirming, isPending);

  if (!mounted) return <></>;

  return (
    <PrivateRoute>
      <Flex
        sx={{
          width: "100%",
          height: "100%",
          px: "16px",
          py: "40px",
          background: "primary.2",
          flexDirection: "column",
        }}
      >
        <Flex
          mb="32px"
          sx={{
            alignItems: "center",
            gap: "16px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <BackButton
            onClick={() => {
              router.back();
            }}
          />
          <Text textStyle="largeBold" color="neutral.8">
            Broadcast
          </Text>
        </Flex>

        <Flex
          flex="1 0 0"
          overflow="auto"
          sx={{ width: "100%", flexDirection: "column", gap: "32px" }}
        >
          <Box>
            <Text mb={"12px"} textStyle="captionBold" color="neutral.8">
              $CER you want to offset
            </Text>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              variant="normal"
            />
            <Box height={"32px"}></Box>
          </Box>
          <Box>
            <Text mb={"12px"} textStyle="captionBold" color="neutral.8">
              Broadcast message
            </Text>
            <Textarea
              variant="normal"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something nice!"
              rows={5}
            />
            <Box height={"32px"}></Box>
          </Box>
        </Flex>
        <Box w="100%">
          <Flex mb="16px" w="100%" sx={{ justifyContent: "space-between" }}>
            <Box>
              <Text
                mb="8px"
                sx={{
                  fontSize: "24px",
                  lineHeight: "24px",
                  fontWeight: 700,
                  color: "primary.1",
                }}
              >
                {amount} tCO2
              </Text>
              <Text textStyle="caption" color="neutral.6">
                emission
              </Text>
            </Box>
            <Box>
              <Text
                mb="8px"
                sx={{
                  fontSize: "24px",
                  lineHeight: "24px",
                  fontWeight: 700,
                  color: "primary.1",
                }}
              >
                {amount / 10} hectares
              </Text>
              <Text textStyle="caption" color="neutral.6">
                of forest equivalent
              </Text>
            </Box>
          </Flex>
          <Button
            variant="primary"
            w="100%"
            onClick={submit}
            isLoading={isPending || isConfirming}
            disabled={isPending}
          >
            Send
          </Button>
        </Box>
      </Flex>
    </PrivateRoute>
  );
}
const tabs = [
  { label: "Top 1h", key: "top_1h" },
  { label: "New", key: "new" },
];

const data = [
  {
    user: "elize",
    amount: 3.12,
    mesage: "Thi first time offset carbon. Nice feeling!",
    reaction: { like: 10 },
  },
  {
    user: "baseboy",
    amount: 12.3,
    mesage: "Let’s go to An Bang beach and help us on Sunday!",
    reaction: { like: 10 },
  },
];
