"use client";

import { Box, Button } from "@chakra-ui/react";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Login() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  useEffect(() => {
    if (account.isConnected) router.replace("/");
  }, [account.isConnected]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: "16px",
        background: "primary.2",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Image
          src="/images/bonbon.png"
          width={150.5}
          height={31}
          alt="bonbon"
        />
        <Box mb="64px" />
        {step === 1 && (
          <>
            <Button
              variant="primary"
              w="100%"
              maxW="350px"
              sx={{ display: "flex", alignItems: "center", gap: "8px" }}
              onClick={() => setStep(2)}
            >
              <Box as="span">Login</Box>
              <ArrowCircleLeft size={24} />
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                mb="32px"
                w="100%"
                onClick={() => connect({ connector })}
              >
                {connector.name}
              </Button>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}
