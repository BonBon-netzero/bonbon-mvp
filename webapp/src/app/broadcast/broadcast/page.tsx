"use client";

import { createBroadcastApi } from "@/apis/broadcast";

import { BackButton } from "@/components/@widgets/BackButton";
import PrivateRoute from "@/components/auth/PrivateRoute";

import { cerContract } from "@/utils/config/contracts";
import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parseUnits, stringToHex } from "viem";
import { useWriteContract } from "wagmi";
import { toast } from "react-toastify";

export default function Broadcast() {
  const router = useRouter();
  const [amount, setAmount] = useState(10);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: hash, writeContract, isSuccess, isError } = useWriteContract();

  const { mutate: createBroadcast, data: broadcastData } = useMutation({
    mutationFn: createBroadcastApi,
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      const prefix = "00000000";
      const broadcastId = stringToHex(prefix.concat(data.id));
      writeContract({
        address: cerContract.address as any,
        abi: cerContract.abi,
        functionName: "offset",
        args: [parseUnits(data.amount.toString(), 18), broadcastId],
      });
    },
  });

  const submit = async () => {
    setIsLoading(true);
    createBroadcast({ amount: amount, message: message });
  };
  useEffect(() => {
    if (isError) {
      setIsLoading(false);
    }
    let timeout: any;
    if (isSuccess) {
      timeout = setTimeout(() => {
        setIsLoading(false);
        router.push("/broadcast");
      }, 5_000);
    }
    return () => clearTimeout(timeout);
  }, [isSuccess, isError]);

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
            isLoading={isLoading}
            disabled={isLoading || !message}
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
