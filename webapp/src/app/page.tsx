"use client";

import QRScanner from "@/components/@widgets/QRScanner";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { addressShorten } from "@/helpers";
import { Box, Button, Card, Flex, Text } from "@chakra-ui/react";
import { ArrowCircleRight, Power, Tree } from "@phosphor-icons/react";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  console.log(account.status);

  return (
    <PrivateRoute>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          px: "16px",
          py: "32px",
          bg: "primary.2",
        }}
      >
        {/* Header */}
        <Flex
          sx={{
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Flex sx={{ alignItems: "center", gap: "8px" }}>
            <Box
              sx={{
                width: "40px",
                height: "40px",
                bg: "primary.1",
                borderRadius: "50%",
              }}
            />
            <Text color="neutral.8">
              {addressShorten(account.address ?? "")}
            </Text>
          </Flex>
          <Button type="button" onClick={() => disconnect()} sx={{ p: "4px" }}>
            <Power size={24} />
          </Button>
        </Flex>
        <Box mb="24px" />
        {/* Balance */}
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Text
            mb="8px"
            className="text_orbitron"
            sx={{
              fontSize: "32px",
              lineHeight: "40px",
              fontWeight: 700,
              color: "primary.1",
            }}
          >
            15.5 CER
          </Text>
          <Flex sx={{ color: "neutral.8", alignItems: "center", gap: "8px" }}>
            <Tree size={20} />
            <Text>Equivalent to planting 0.3 ha of forest</Text>
            <ArrowCircleRight size={20} />
          </Flex>
        </Flex>
        <Box mb="48px" />
        {/* Actions */}
        <Card variant="cardWhite" sx={{ p: "8px", width: "max-content" }}>
          <Image
            src="/images/scan-icon.svg"
            width={48}
            height={48}
            alt="scan"
          />
        </Card>
      </Box>
    </PrivateRoute>
  );
}

export default App;
