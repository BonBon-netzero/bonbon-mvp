"use client";

import { BackButton } from "@/components/@widgets/BackButton";
import QRScanner from "@/components/@widgets/QRScanner";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { addressShorten } from "@/helpers";
import { Box, Button, Card, Flex, Text } from "@chakra-ui/react";
import {
  ArrowCircleRight,
  ArrowLeft,
  ArrowRight,
  Bluetooth,
  Clock,
  CubeFocus,
  Power,
  Tree,
  XCircle,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <PrivateRoute>
      <Flex
        sx={{
          flexDirection: "column",
          width: "100%",
          maxW: "400px",
          mx: "auto",
          height: "100%",
          py: "32px",
          minHeight: "800px",
          overflow: "hidden auto",
        }}
      >
        {/* Header */}
        <Flex
          px="16px"
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
          <Flex sx={{ gap: "16px" }}>
            <Button
              variant="normal"
              as={Link}
              href="/broadcast"
              sx={{ p: "4px 8px" }}
            >
              Broadcast
            </Button>
            <Button
              variant="normal"
              type="button"
              onClick={() => disconnect()}
              sx={{ p: "4px" }}
            >
              <Power size={24} />
            </Button>
          </Flex>
        </Flex>
        <Box mb="24px" />
        {/* Balance */}
        <Flex
          px="16px"
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

        <Box px="16px"></Box>
        <Actions />
        <Box mb="48px" />

        <ClaimedReward />
      </Flex>
    </PrivateRoute>
  );
}

function Actions() {
  return (
    <Flex sx={{ gap: "32px", justifyContent: "center", "& > *": { flex: 1 } }}>
      <ScanQR />

      <PairDivice />
    </Flex>
  );
}

function ScanQR() {
  const [step, setStep] = useState(1);
  const [scanResult, setScanResult] = useState("");
  console.log("scanResult", scanResult);
  return (
    <>
      <ActionItem
        label="Scan Reward Code"
        iconUri="/images/scan-icon.svg"
        onClick={() => setStep(2)}
      />
      {step === 2 && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: "white",
            zIndex: 9991,
            py: "40px",
            px: "16px",
          }}
        >
          <Flex
            mb="24px"
            sx={{
              alignItems: "center",
              gap: "16px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <BackButton
              onClick={() => {
                setStep(1);
                setScanResult("");
              }}
            />
            <Text textStyle="largeBold" color="neutral.8">
              Scan to receive reward
            </Text>
          </Flex>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              bg: "primary.2",
            }}
          >
            {scanResult ? (
              <Flex
                sx={{
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  pt: "100px",
                  pb: "32px",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Card
                    variant="cardWhite"
                    sx={{
                      width: "200px",
                      height: "200px",
                      mx: "auto",
                      background: "#ffffff url(/images/adidas.png)",
                      backgroundSize: "50%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "50%",
                    }}
                  ></Card>
                  <Text
                    mt={"24px"}
                    sx={{
                      color: "neutral.1",
                      fontSize: "24px",
                      lineHeight: "24px",
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    Gazelle Shoes
                  </Text>
                </Box>
                <Box as="ul" sx={{ listStyleType: "circle" }}>
                  <Box as="li">
                    By purchasing this product you have helped reduce 1.3 tCO2
                    emissions
                  </Box>
                  <Box as="li">The Earth thanks you!</Box>
                </Box>
                <Box sx={{ width: "100%", maxWidth: "350px", mx: "auto" }}>
                  <Text
                    sx={{
                      textAlign: "center",
                      color: "primary.1",
                      fontSize: "24px",
                      lineHeight: "24px",
                    }}
                  >
                    +1.34 CER
                  </Text>
                  <Button w="100%" variant="primary" mt="32px">
                    Receive CER
                  </Button>
                </Box>
              </Flex>
            ) : (
              <QRScanner onSuccess={(result) => setScanResult(result)} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

function PairDivice() {
  const [step, setStep] = useState(1);
  const [selectedDivice, setDivice] = useState<any>(null);
  const [diviceStatus, setStatus] = useState<"searching" | "found">(
    "searching"
  );
  // here
  const [connectionStatus, setConnection] = useState<
    "connecting" | "connected"
  >("connecting");
  const handleClickBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };
  return (
    <>
      <ActionItem
        label="Connect IOT Divice"
        iconUri="/images/hard-drive.svg"
        onClick={() => {
          setStep(2);
        }}
      />
      {step !== 1 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: "primary.1",
            zIndex: 9991,
          }}
        >
          <Flex
            mb="24px"
            mt="40px"
            sx={{
              alignItems: "center",
              gap: "16px",
              position: "relative",
              zIndex: 1,
              px: "16px",
            }}
          >
            <BackButton onClick={handleClickBack} />
            {step === 2 && (
              <Text textStyle="largeBold">Supporting divices</Text>
            )}
          </Flex>
          {step === 2 && (
            <Box px="16px">
              {divices.map((divice) => {
                return (
                  <Card
                    role="button"
                    variant="cardWhite"
                    sx={{
                      p: "16px",
                      borderRadius: "16px",
                    }}
                    onClick={() => {
                      setDivice(divice);
                      setStatus("searching");
                      setStep(3);
                    }}
                  >
                    <Flex
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <Image
                        src={divice.iconUri}
                        width={64}
                        height={64}
                        alt={divice.name}
                      />
                      <Box>
                        <Text mb="4px" textStyle="largeBold">
                          {divice.name}
                        </Text>
                        <Text textStyle="caption">
                          {divice.rewardRatio} CER / km
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                );
              })}
            </Box>
          )}
          {step === 3 && (
            <>
              <Image
                src={selectedDivice.iconUri}
                width={128}
                height={128}
                alt=""
                style={{ margin: "0 auto", marginBottom: "24px" }}
              />
              <Text
                textStyle="body"
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {diviceStatus === "searching" && (
                  <>
                    <Bluetooth size={24} />
                    <Text as="span">Searching for your Dat Bike</Text>
                  </>
                )}
                {diviceStatus === "found" && (
                  <>
                    <Bluetooth size={24} />
                    <Text as="span">Found your device</Text>
                  </>
                )}
              </Text>

              <Box flex="1" />
              <Flex
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  px: "16px",
                  py: "32px",
                  bg: "primary.2",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <Text mb="4px" textStyle="bodyBold" color="neutral.8">
                  Dat Bike 25431
                </Text>
                <Text mb="32px" textStyle="body" color="neutral.8">
                  want to connect to your account
                </Text>
                <Flex sx={{ width: "100%", alignItems: "center", gap: "16px" }}>
                  <Button variant="primary" flex="1">
                    <Text>Connect</Text>
                  </Button>
                  <Card
                    variant="cardRed"
                    sx={{ p: "12px", borderRadius: "16px" }}
                  >
                    <XCircle size={24} />
                  </Card>
                </Flex>
              </Flex>
            </>
          )}
        </Box>
      )}
    </>
  );
}
const divices = [
  { name: "Datbike", iconUri: "/images/datbike.png", rewardRatio: 0.34 },
];

function ActionItem({
  iconUri,
  label,
  onClick,
}: {
  label: string;
  iconUri: string;
  onClick: () => void;
}) {
  return (
    <Flex sx={{ alignItems: "center", flexDirection: "column", gap: "12px" }}>
      <Card
        variant="cardPrimary"
        sx={{
          p: "8px",
          width: "max-content",
          position: "relative",
        }}
      >
        {label}
        <Box
          sx={{
            width: "8px",
            height: "8px",
            border: "1px solid",
            borderWidth: "0 1px 1px 0",
            bordercolor: "neutral.1",
            position: "absolute",
            bottom: "0px",
            left: "50%",
            bg: "primary.1",
            transform: "translateY(50%) translateX(-50%) rotate(45deg)",
            transformOrigin: "50%",
            zIndex: 1,
          }}
        />
      </Card>
      <Card
        role="button"
        variant="cardWhite"
        sx={{ p: "8px", width: "max-content" }}
        onClick={onClick}
      >
        <Image src={iconUri} width={48} height={48} alt="scan" />
      </Card>
    </Flex>
  );
}

function ClaimedReward() {
  return (
    <>
      <Box px="16px">
        <Flex mb="16px" sx={{ gap: "8px", path: { fill: "primary.1" } }}>
          <CubeFocus size={24} />
          <Text textStyle="body" color="neutral.8">
            Your Claimed Rewards
          </Text>
        </Flex>

        <Flex
          sx={{
            gap: "8px",
            width: "100%",
            overflow: "auto hidden",
            flexWrap: "nowrap",
            "::-webkit-scrollbar": {
              display: "none",
            },
            "& > *": { flexShrink: 0 },
          }}
        >
          {brands.map((brand) => {
            return (
              <Card
                variant="cardWhite"
                sx={{
                  py: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100px",
                  height: "110px",
                }}
              >
                <Text textStyle="bodyBold" color="primary.2">
                  {"15.35"}
                </Text>
                <Text mb="8px" textStyle="body" color="primary.2">
                  {"CER"}
                </Text>
                <Flex
                  sx={{
                    height: "30px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={brand.iconUri}
                    width={brand.width}
                    height={brand.height}
                    alt=""
                  />
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </Box>

      <Flex
        mt="32px"
        mb="16px"
        px="16px"
        sx={{ gap: "8px", path: { fill: "primary.1" } }}
      >
        <Clock size={24} />
        <Text textStyle="body" color="neutral.8">
          Your Rewards History
        </Text>
      </Flex>

      <Box flex="1 0 0" px="16px" sx={{ overflow: "hidden auto" }}>
        {Array.from({ length: 30 }, (_, v) => v).map((v) => {
          return (
            <Flex>
              <Text textStyle="caption" color="neutral.8">
                Receive{" "}
                <Text fontWeight={700} as="span">
                  0.34 CER
                </Text>{" "}
                from{" "}
                <Text fontWeight={700} color="primary.1" as="span">
                  @adidas
                </Text>
              </Text>
            </Flex>
          );
        })}
      </Box>
    </>
  );
}
const brands = [
  { iconUri: "/images/adidas.png", width: 45, height: 30 },
  { iconUri: "/images/routine.png", width: 51, height: 30 },
  { iconUri: "/images/coolmate.png", width: 62, height: 24 },
  { iconUri: "/images/coolmate.png", width: 62, height: 24 },
  { iconUri: "/images/coolmate.png", width: 62, height: 24 },
  { iconUri: "/images/coolmate.png", width: 62, height: 24 },
];
