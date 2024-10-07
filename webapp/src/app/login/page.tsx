"use client";

import { useAuthContext } from "@/hooks/store/useAuth";
import { Box, Button } from "@chakra-ui/react";
import { ArrowCircleRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthContext();
  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated]);
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
        <Button
          variant="primary"
          mb="32px"
          w="100%"
          maxW="350px"
          sx={{ display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => login()}
        >
          <Box as="span">Login</Box>
          <ArrowCircleRight size={24} />
        </Button>
      </Box>
    </Box>
  );
}
