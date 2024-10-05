"use client";

import { BackButton } from "@/components/@widgets/BackButton";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Broadcast() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(tabs[0]);

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
          mb="12px"
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
            Broadcast Channel
          </Text>
        </Flex>
        <Flex mb="24px">
          {tabs.map((tab) => {
            const isActive = tab.key === currentTab.key;
            return (
              <Box
                key={tab.key}
                role="button"
                sx={{
                  flex: "1",
                  pb: "12px",
                  borderBottom: "1px solid",
                  borderBottomColor: isActive ? "primary.1" : "#291F74",
                }}
                onClick={() => setCurrentTab(tab)}
              >
                <Text
                  textStyle="captionBold"
                  textAlign="center"
                  color="neutral.8"
                >
                  {tab.label}
                </Text>
              </Box>
            );
          })}
        </Flex>

        <Flex
          flex="1 0 0"
          overflow="auto"
          sx={{ width: "100%", flexDirection: "column", gap: "32px" }}
        >
          {data.map((broadcast, index) => {
            return (
              <Box key={index}>
                <Flex mb="8px" sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      bg: "primary.1",
                    }}
                  />
                  <Text ml="8px" textStyle="captionBold" color="neutral.8">
                    {broadcast.user}
                  </Text>
                  <Text ml="8px" textStyle="caption" color="neutral.8">
                    has offset {broadcast.amount} CER
                  </Text>
                </Flex>
                <Box
                  sx={{
                    ml: "16px",
                    width: "100%",
                    maxW: "300px",
                    borderRadius: "16px",
                    bg: "neutral.8",
                    p: "12px 16px",
                  }}
                >
                  <Text textStyle="caption" color="neutral.1">
                    {broadcast.mesage}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Flex>
        <Button variant="primary" as={Link} href="/broadcast/broadcast">
          Broadcast
        </Button>
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
