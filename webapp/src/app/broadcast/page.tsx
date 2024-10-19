"use client";

import { getBroadcasts } from "@/apis/broadcast";
import { createReactionApi, getUserReactionApi } from "@/apis/reaction";
import { BackButton } from "@/components/@widgets/BackButton";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { BroadcastData } from "@/entities/broadcast";
import { UserReactionData } from "@/entities/reaction";
import { addressShorten } from "@/helpers";
import {
  formatDate,
  formatRelativeDate,
  formatRelativeShortDate,
} from "@/helpers/format";
import { ReactionTypeEnum } from "@/utils/config/enum";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { MetaMaskAvatar } from "react-metamask-avatar";
import OutsideClickHandler from "react-outside-click-handler";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Broadcast() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const { data: broadcasts, refetch: refetchBroadcast } = useQuery({
    queryKey: ["broadcast", currentTab],
    queryFn: () =>
      getBroadcasts(
        currentTab === tabs[1] ? new Date(Date.now() - 3600 * 1000) : undefined
      ),
    refetchInterval: 5_000,
  });

  const { mutate: createReaction } = useMutation({
    mutationFn: createReactionApi,
    onSuccess: () => refetchBroadcast(),
  });

  const { data: userReaction, refetch: refetchUserReaction } = useQuery({
    queryKey: ["user reaction"],
    queryFn: () =>
      getUserReactionApi({
        broadcastIds: broadcasts?.data?.map((v) => v.id) ?? [],
      }),
    enabled: !!broadcasts?.data?.length,
  });

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
          sx={{ width: "100%", flexDirection: "column", gap: "32px", pb: 4 }}
        >
          {broadcasts?.data?.map((broadcast, index) => {
            return (
              <Box key={index}>
                <BroadcastItem
                  userReactionData={userReaction}
                  data={broadcast}
                  onClickReaction={(vars) => createReaction(vars)}
                />
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
  { label: "New", key: "new" },
  { label: "Top 1h", key: "top_1h" },
];

function BroadcastItem({
  data,
  userReactionData,
  onClickReaction,
}: {
  data: BroadcastData;
  userReactionData: UserReactionData[] | undefined;
  onClickReaction: (vars: {
    broadcastId: string;
    type: ReactionTypeEnum;
  }) => void;
}) {
  const hasReaction =
    !!Object.keys(data.reaction).length &&
    Object.values(data.reaction).every((v) => !!v);
  const [showReactor, setShowReactor] = useState(hasReaction);
  return (
    <Box>
      <Flex mb="8px" sx={{ alignItems: "center" }}>
        <MetaMaskAvatar address={data.username} size={24} />
        <Text ml="8px" textStyle="captionBold" color="neutral.8">
          {addressShorten(data.username)}
        </Text>
        <Text ml="8px" textStyle="caption" color="neutral.5">
          offset {data.amount} CER {formatRelativeDate(data.time)}
        </Text>
      </Flex>
      <Box
        sx={{
          ml: "16px",
          width: "fit-content",
          maxW: "300px",
          borderRadius: "16px",
          bg: "neutral.8",
          p: "12px 16px",
          position: "relative",
          cursor: hasReaction ? "default" : "pointer",
        }}
        onClick={
          hasReaction
            ? undefined
            : (e) => {
                e.stopPropagation();
                setShowReactor((prev) => !prev);
              }
        }
      >
        <OutsideClickHandler
          onOutsideClick={
            showReactor && !hasReaction
              ? (e) => {
                  e.stopPropagation();
                  setShowReactor(false);
                }
              : () => {}
          }
        >
          <Text textStyle="caption" color="neutral.1">
            {data.message}
          </Text>
          <Box
            sx={{
              position: "absolute",
              bottom: "-16px",
              left: 0,
              display: showReactor ? "blocck" : "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ReactionCounter
              userReactionData={userReactionData}
              data={data}
              onClickSelectorIcon={onClickReaction}
            />
          </Box>
        </OutsideClickHandler>
      </Box>
    </Box>
  );
}

function ReactionCounter({
  data,
  onClickSelectorIcon,
  userReactionData,
}: {
  data: BroadcastData;
  userReactionData: UserReactionData[] | undefined;
  onClickSelectorIcon: (vars: {
    broadcastId: string;
    type: ReactionTypeEnum;
  }) => void;
}) {
  const hasReaction =
    !!Object.keys(data.reaction).length &&
    Object.values(data.reaction).every((v) => !!v);
  const [showReactionSelector, setShowSelector] = useState(false);
  const _onClickIcon = (vars: {
    broadcastId: string;
    type: ReactionTypeEnum;
  }) => {
    setShowSelector(false);
    onClickSelectorIcon(vars);
  };
  return (
    <Flex sx={{ position: "relative", gap: "4px", flexWrap: "nowrap" }}>
      {!hasReaction && (
        <Box
          role="button"
          sx={{
            filter: "grayscale(100%)",
            py: "2px",
            px: "8px",
            borderRadius: "14px",
            bg: "neutral.6",
            flexShrink: 0,
          }}
          onClick={() => setShowSelector(true)}
        >
          👍
        </Box>
      )}
      {hasReaction &&
        reactions.map((reaction) => {
          if (!data.reaction[reaction.value])
            return <Fragment key={reaction.value} />;
          return (
            <Box
              key={reaction.value}
              role="button"
              sx={{
                py: "2px",
                px: "8px",
                borderRadius: "14px",
                bg: "neutral.6",
                flexShrink: 0,
              }}
              onClick={() => setShowSelector(true)}
            >
              {reaction.icon} {data.reaction[reaction.value]}
            </Box>
          );
        })}
      <Box
        sx={{
          position: "absolute",
          bottom: "32px",
          display: showReactionSelector ? "block" : "none",
        }}
      >
        <ReactionSelector
          broadcastId={data.id}
          userReactionData={userReactionData}
          onClickIcon={_onClickIcon}
          onClickOutside={() => setShowSelector(false)}
        />
      </Box>
    </Flex>
  );
}

function ReactionSelector({
  broadcastId,
  onClickIcon,
  onClickOutside,
  userReactionData,
}: {
  broadcastId: string;
  userReactionData: UserReactionData[] | undefined;
  onClickIcon: (vars: { broadcastId: string; type: ReactionTypeEnum }) => void;
  onClickOutside: () => void;
}) {
  return (
    <OutsideClickHandler onOutsideClick={onClickOutside}>
      <Flex
        sx={{
          gap: "4px",
          py: "2px",
          px: "8px",
          borderRadius: "14px",
          bg: "neutral.6",
          flexShrink: 0,
        }}
      >
        {reactions
          .filter((reaction) => {
            return (
              userReactionData?.find((v) => v.broadcastId === broadcastId)
                ?.type !== reaction.value
            );
          })
          .map((reaction) => {
            return (
              <Box
                role="button"
                key={reaction.value}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickIcon({ broadcastId, type: reaction.value });
                }}
              >
                {reaction.icon}
              </Box>
            );
          })}
      </Flex>
    </OutsideClickHandler>
  );
}
const reactions = [
  {
    label: "Like",
    icon: "👍",
    value: ReactionTypeEnum.LIKE,
  },
  {
    label: "Heart",
    icon: "🧡",
    value: ReactionTypeEnum.HEART,
  },
  {
    label: "Flower",
    icon: "🌹",
    value: ReactionTypeEnum.FLOWER,
  },
  {
    label: "Gift",
    icon: "🎁",
    value: ReactionTypeEnum.GIFT,
  },
  {
    label: "Fighting",
    icon: "💪",
    value: ReactionTypeEnum.FIGHTING,
  },
  {
    label: "Rocket",
    icon: "🚀",
    value: ReactionTypeEnum.ROCKET,
  },
];
