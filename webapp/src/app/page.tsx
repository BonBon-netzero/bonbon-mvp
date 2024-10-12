"use client";

import {
  brandsRewardInfoApi,
  claimRewardApi,
  claimRewardHistoryApi,
  getRewardDetailsApi,
  integrateDatBikeApi,
} from "@/apis/reward";
import { ApiListResponse } from "@/apis/type";
import Loading from "@/components/@uis/Loading";
import { BackButton } from "@/components/@widgets/BackButton";
import QRScanner from "@/components/@widgets/QRScanner";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { BrandRewardData, RewardHistoryData } from "@/entities/reward";
import { addressShorten } from "@/helpers";
import { formatNumber, formatRelativeDate } from "@/helpers/format";
import { useAuthContext } from "@/hooks/store/useAuth";
import RcDialog from "@/theme/RcDialog";
import { MAX_PAGE_WIDTH } from "@/utils/config";
import { Box, Button, Card, Flex, Text } from "@chakra-ui/react";
import {
  Bluetooth,
  Clock,
  CubeFocus,
  Power,
  Rss,
  Tree,
  XCircle,
} from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { toast } from "react-toastify";

export default function App() {
  const { profile, logout, userBalance, reloadBalance } = useAuthContext();

  const { data: claimRewardHistory, refetch: refetchClaimRewardHistory } =
    useQuery({
      queryFn: () => claimRewardHistoryApi(),
      queryKey: ["claim reward history"],
      enabled: !!profile,
    });
  const { data: brandsRewardInfo, refetch: refetchBrandsRewardInfo } = useQuery(
    {
      queryFn: () => brandsRewardInfoApi(),
      queryKey: ["brand rewards info"],
      enabled: !!profile,
    }
  );

  const onClaimRewardSuccess = () => {
    refetchBrandsRewardInfo();
    refetchClaimRewardHistory();
    reloadBalance();
  };

  return (
    <PrivateRoute>
      <Flex
        sx={{
          flexDirection: "column",
          width: "100%",
          maxW: MAX_PAGE_WIDTH,
          mx: "auto",
          height: "100%",
          minHeight: "100svh",
          overflow: "hidden auto",
        }}
      >
        {/* Header */}
        <Flex
          px="16px"
          pt="16px"
          sx={{
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Flex sx={{ alignItems: "center", gap: "8px" }}>
            <MetaMaskAvatar address={profile?.username ?? ""} size={40} />
            <Text color="neutral.8">
              {addressShorten(profile?.username ?? "")}
            </Text>
          </Flex>
          <Flex sx={{ gap: "16px", alignItems: "center" }}>
            <Button
              variant="primary"
              as={Link}
              href="/broadcast"
              sx={{ p: "4px 8px" }}
            >
              <Flex alignItems="center" sx={{ gap: 1 }}>
                <Rss />
                <div>Broadcast</div>
              </Flex>
            </Button>
            <Button
              variant="normal"
              type="button"
              onClick={() => logout()}
              sx={{ p: "4px", color: "red" }}
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
            {formatNumber(userBalance, 2, 2)} CER
          </Text>
          <Flex sx={{ color: "neutral.8", alignItems: "center", gap: "8px" }}>
            <Tree size={20} />
            <Text>
              Equivalent to planting{" "}
              {formatNumber((userBalance ?? 0) / 10, 2, 2)} ha of forest
            </Text>
            {/* <ArrowCircleRight size={20} /> */}
          </Flex>
        </Flex>
        <Box mb="24px" />

        <Box px="16px"></Box>
        <Actions onClaimSuccess={onClaimRewardSuccess} />
        <Box mb="24px" />

        <ClaimedReward
          rewardHistory={claimRewardHistory}
          brandsRewardInfo={brandsRewardInfo}
        />
      </Flex>
    </PrivateRoute>
  );
}

function Actions({ onClaimSuccess }: { onClaimSuccess: () => void }) {
  return (
    <Flex sx={{ gap: "32px", justifyContent: "center", "& > *": { flex: 1 } }}>
      <ScanQR onClaimSuccess={onClaimSuccess} />

      <PairDivice onClaimSuccess={onClaimSuccess} />
    </Flex>
  );
}

function ScanQR({ onClaimSuccess }: { onClaimSuccess: () => void }) {
  const [step, setStep] = useState(1);
  const [rewardCode, setRewardCode] = useState("");
  const { mutate: claimReward, status } = useMutation({
    mutationFn: claimRewardApi,
    onSuccess: () => {
      toast.success("Claim reward success");
      onClaimSuccess();
      setStep(1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { data: rewardDetails, isLoading: isLoadingReward } = useQuery({
    queryFn: () => getRewardDetailsApi(rewardCode ?? ""),
    queryKey: ["reward details", rewardCode],
    enabled: !!rewardCode,
  });
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
            zIndex: 9991,
            py: "40px",
            px: "16px",
            bg: "primary.2",
          }}
        >
          <Box
            w="100%"
            h="100%"
            maxW={MAX_PAGE_WIDTH}
            position="relative"
            mx="auto"
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
                  setRewardCode("");
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
              }}
            >
              {rewardCode ? (
                isLoadingReward ? (
                  <Flex>
                    <Loading />
                  </Flex>
                ) : (
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
                          background: `#ffffff url(${rewardDetails?.image})`,
                          backgroundSize: "100%",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "50%",
                        }}
                      ></Card>
                      <Text
                        mt={"24px"}
                        sx={{
                          color: "neutral.8",
                          fontSize: "24px",
                          lineHeight: "24px",
                          fontWeight: 700,
                          textAlign: "center",
                        }}
                      >
                        {rewardDetails?.name}
                      </Text>
                    </Box>
                    <Box
                      as="ul"
                      sx={{ li: { fontSize: "14px", lineHeight: "24px" } }}
                      px={"16px"}
                      color="neutral.8"
                    >
                      <Box mb={"16px"} as="li">
                        {/* By purchasing this product you have helped reduce 1.3
                        tCO2 emissions */}
                        {rewardDetails?.description}
                      </Box>
                      {/* <Box as="li">The Earth thanks you!</Box> */}
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
                        +{rewardDetails?.amount} CER
                      </Text>
                      <Button
                        w="100%"
                        variant="primary"
                        mt="32px"
                        disabled={status === "pending"}
                        onClick={() => claimReward(rewardCode)}
                      >
                        Receive CER
                      </Button>
                    </Box>
                  </Flex>
                )
              ) : (
                <QRScanner onSuccess={(result) => setRewardCode(result)} />
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

function PairDivice({ onClaimSuccess }: { onClaimSuccess: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedDevice, setDevice] = useState<any>(null);
  const [deviceStatus, setStatus] = useState<"searching" | "found">(
    "searching"
  );
  // here
  const [connectionStatus, setConnection] = useState<
    "connecting" | "connected" | "idle"
  >("idle");
  const [openSuccessModal, setOpenModal] = useState(false);
  const onDismissModal = () => {
    setOpenModal(false);
    handleClickBack();
    // setStep(1);
  };
  const { mutate: integrateDatBike } = useMutation({
    mutationFn: integrateDatBikeApi,
    onSuccess: () => {
      onClaimSuccess();
      setConnection("connected");
      setOpenModal(true);
    },
    onError: (error) => {
      toast.error(error.message);
      setConnection("idle");
    },
  });
  const handleClickBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setConnection("idle");
  };
  const connectDevice = () => {
    setConnection("connecting");
    integrateDatBike();
  };

  useEffect(() => {
    let timeout: any;
    if (deviceStatus === "searching") {
      timeout = setTimeout(() => setStatus("found"), 2_000);
    }
    return () => clearTimeout(timeout);
  }, [deviceStatus]);
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
              <Text textStyle="largeBold">Supporting devices</Text>
            )}
          </Flex>
          {step === 2 && (
            <Box px="16px">
              <Text sx={{ fontWeight: "bold", mb: 3 }}>Electric Vehicles</Text>
              {electricVehicles.map((device) => {
                return (
                  <Card
                    role="button"
                    variant="cardWhite"
                    sx={{
                      p: "16px",
                      borderRadius: "16px",
                    }}
                    onClick={() => {
                      setDevice(device);
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
                        src={device.iconUri}
                        width={64}
                        height={64}
                        alt={device.name}
                      />
                      <Box>
                        <Text mb="4px" textStyle="largeBold">
                          {device.name}
                        </Text>
                        <Text textStyle="caption">
                          {device.rewardRatio} CER / km
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                );
              })}
              <Text sx={{ fontWeight: "bold", mb: 3, mt: 4 }}>
                Public Transport
              </Text>
              {publicTransports.map((device) => {
                return (
                  <Card
                    role="button"
                    variant="cardWhite"
                    sx={{
                      p: "16px",
                      borderRadius: "16px",
                      mb: 3,
                      cursor: "inherit",
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
                        src={device.iconUri}
                        width={64}
                        height={64}
                        alt={device.name}
                      />
                      <Box>
                        <Text mb="4px" textStyle="largeBold">
                          {device.name}
                        </Text>
                        <Text textStyle="caption">
                          {device.rewardRatio} CER / km - Coming soon
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                );
              })}
              <Text sx={{ fontWeight: "bold", mb: 3, mt: 4 }}>Lifestyle</Text>
              {lifestyles.map((device) => {
                return (
                  <Card
                    role="button"
                    variant="cardWhite"
                    sx={{
                      p: "16px",
                      borderRadius: "16px",
                      mb: 3,
                      cursor: "inherit",
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
                        src={device.iconUri}
                        width={64}
                        height={64}
                        alt={device.name}
                      />
                      <Box>
                        <Text mb="4px" textStyle="largeBold">
                          {device.name}
                        </Text>
                        <Text textStyle="caption">
                          {device.rewardRatio} CER / km - Coming soon
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
                src={selectedDevice.iconUri}
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
                {deviceStatus === "searching" && (
                  <>
                    <Bluetooth size={24} />
                    <Text as="span">Searching for your Dat Bike</Text>
                    <Loading />
                  </>
                )}
                {deviceStatus === "found" && (
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
                  <Button
                    variant="primary"
                    flex="1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      ...(deviceStatus !== "found" ||
                      connectionStatus !== "idle"
                        ? { filter: "brightness(80%)", cursor: "not-allowed" }
                        : {}),
                    }}
                    onClick={() => {
                      if (connectionStatus !== "idle") return;
                      connectDevice();
                    }}
                  >
                    <Text>
                      {connectionStatus === "connecting"
                        ? "Connecting..."
                        : connectionStatus === "connected"
                          ? "Connected"
                          : "Connect"}
                    </Text>
                    {connectionStatus === "connecting" && <Loading />}
                  </Button>
                  <Card
                    variant="cardRed"
                    role="button"
                    sx={{ p: "12px", borderRadius: "16px" }}
                    onClick={() => setConnection("idle")}
                  >
                    <XCircle size={24} />
                  </Card>
                </Flex>
              </Flex>
              <Box sx={{ width: 0, height: 0, overflow: "hidden" }}>
                <RcDialog
                  isOpen={openSuccessModal}
                  onDismiss={onDismissModal}
                  bg="transparent"
                >
                  <Card
                    variant="cardWhite"
                    sx={{
                      width: "350px",
                      height: "300px",
                      bg: "neutral.8",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      p: "16px 32px",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    {/* <Box
                      role="button"
                      sx={{ position: "absolute", top: "16px", right: "16px" }}
                      onClick={onDismissModal}
                      color="neutral.1"
                    >
                      <XCircle size={20} />
                    </Box> */}
                    <Text
                      mb="16px"
                      textStyle="largeBold"
                      sx={{ color: "neutral.1" }}
                    >
                      Congrats! 🎉
                    </Text>
                    <Text
                      mb="16px"
                      textStyle="body"
                      sx={{ color: "neutral.1" }}
                    >
                      You've completed{" "}
                      <Text as="span" textStyle="bodyBold" color="primary.2">
                        10km
                      </Text>{" "}
                      since your last sync, reducing{" "}
                      <Text as="span" textStyle="bodyBold" color="primary.2">
                        0.01 tCO2!
                      </Text>{" "}
                      🌍
                    </Text>
                    <Text textStyle="body" sx={{ color: "neutral.1" }}>
                      You've earned{" "}
                      <Text as="span" textStyle="bodyBold" color="primary.2">
                        0.01 CER
                      </Text>{" "}
                      as a reward. Keep going!
                    </Text>
                    <Button
                      variant="primary"
                      sx={{ mt: 4 }}
                      onClick={onDismissModal}
                    >
                      Got it
                    </Button>
                  </Card>
                </RcDialog>
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
}
const electricVehicles = [
  { name: "Datbike", iconUri: "/images/datbike.png", rewardRatio: 0.001 },
];

const publicTransports = [
  { name: "Bus", iconUri: "/images/bus.png", rewardRatio: 0.002 },
  { name: "MRT", iconUri: "/images/mrt.png", rewardRatio: 0.003 },
];

const lifestyles = [
  { name: "Walk", iconUri: "/images/walk.png", rewardRatio: 0.0005 },
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

function ClaimedReward({
  rewardHistory,
  brandsRewardInfo,
}: {
  rewardHistory: ApiListResponse<RewardHistoryData> | undefined;
  brandsRewardInfo: BrandRewardData[] | undefined;
}) {
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
          {brandsRewardInfo?.length === 0 && (
            <Text
              sx={{
                color: "neutral.5",
                display: "block",
                width: "100%",
              }}
            >
              You don&apos;t have any reward
            </Text>
          )}
          {brandsRewardInfo?.map((brand) => {
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
                  {brand.totalReward}
                </Text>
                <Text mb="8px" textStyle="body" color="primary.2">
                  {"CER"}
                </Text>
                <Flex
                  sx={{
                    height: "30px",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={brand.brand.avatar}
                    style={{ objectFit: "contain", height: "100%" }}
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
        {rewardHistory?.data?.length === 0 && (
          <Text
            sx={{
              color: "neutral.5",
              display: "block",
              width: "100%",
            }}
          >
            You don&apos;t have any reward
          </Text>
        )}
        {rewardHistory?.data?.map((v) => {
          return (
            <Flex mb="2" justifyContent="space-between">
              <Box>
                <Text textStyle="caption" color="neutral.8">
                  Receive{" "}
                  <Text fontWeight={700} as="span">
                    {v.amount} CER
                  </Text>{" "}
                  from{" "}
                  <Text fontWeight={700} color="primary.1" as="span">
                    @{v.reward.brandName}
                  </Text>
                </Text>
              </Box>
              <Text textStyle="caption" color="neutral.5">
                {formatRelativeDate(v.createdAt)}
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
