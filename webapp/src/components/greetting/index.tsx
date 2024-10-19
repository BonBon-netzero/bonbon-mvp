"use client";
import { Box, Button, Card, Flex, Text } from "@chakra-ui/react";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

export default function Greetting() {
  const [step, setStep] = useState<number | null>(null); // 1 start 2 slide 3 end and hide
  const [currentSlide, setCurrentSlide] = useState(1);
  const ref = useRef<Slider>(null);
  useEffect(() => {
    if (!window || !document) return;
    const showGreetting = localStorage.getItem("show-greetting");
    if (showGreetting == null) {
      setStep(1);
      setTimeout(() => setStep(2), 1000);
      return;
    }
    if (showGreetting === "1") {
      setStep(3);
    }
  }, []);
  const handleSkip = () => {
    localStorage?.setItem("show-greetting", "1");
    setStep(3);
  };

  const handleNext = () => {
    //@ts-ignore
    if (ref.current?.innerSlider?.state?.currentSlide === 2) {
      handleSkip();
    } else {
      ref.current?.slickNext();
    }
  };
  const handlePrev = () => {
    ref.current?.slickPrev();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 9999,
        bg: "primary.2",
        px: "32px",
        transform: step === 3 ? "translateX(-100%)" : undefined,
        transition: "0.6s",
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: step === 1 ? 1 : 0,
          transition: "0.3s",
        }}
      >
        <Flex
          flex="1 0 0"
          sx={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box>
            <Image
              src="/images/bonbon.png"
              width={215}
              height={44}
              alt="bonbon"
            />
          </Box>
          <Text mt={"24px"} textStyle="body" color="neutral.8">
            Web3 Zero-carbon Social
          </Text>
        </Flex>
        <Image
          src="/images/wind-turbin.png"
          width={197}
          height={273}
          alt="bonbon"
          style={{ flexShrink: 0 }}
        />
      </Flex>

      {/* Step 2 */}
      <Flex
        sx={{
          py: "60px",
          height: "100%",
          width: "100%",
          maxWidth: "400px",
          position: "relative",
          mx: "auto",
          flexDirection: "column",
          opacity: step === 2 ? 1 : 0,
          transition: "0.3s",
          transitionDelay: "0.3s",
        }}
      >
        <Box flex="1" sx={{ width: "100%", mx: "auto" }}>
          <Slider
            ref={ref}
            dots
            arrows={false}
            infinite={false}
            // {...settings}
            afterChange={(currentSlide) => setCurrentSlide(currentSlide)}
            // ref={sliderRef}
          >
            {configs.map((config, index) => (
              <Box key={index}>
                <Image
                  src={config.imageUri}
                  width={280}
                  height={280}
                  alt=""
                  style={{ overflow: "hidden", margin: "0 auto" }}
                />
                <Box mt={"32px"} height="200px">
                  <Flex sx={{ alignItems: "start", gap: "0.5ch" }}>
                    <Text textStyle="largeBold" mb={"16px"} color="neutral.8">
                      {index + 1}.
                    </Text>
                    <Text textStyle="largeBold" mb={"16px"} color="neutral.8">
                      {config.title}
                    </Text>
                  </Flex>
                  <Text textStyle="caption" color="neutral.8">
                    {config.description}
                  </Text>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
        <Flex
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            role="button"
            color="neutral.8"
            textStyle="caption"
            sx={{ _hover: { color: "neutral.7" } }}
            onClick={handleSkip}
          >
            Skip
          </Text>
          <Flex sx={{ alignItems: "center", gap: "12px" }}>
            {currentSlide != 0 && (
              <Button
                variant="normal"
                sx={{ height: "48px", borderRadius: "16px" }}
                onClick={handlePrev}
              >
                <ArrowCircleLeft size={24} />
              </Button>
            )}
            <Button variant="primary" onClick={handleNext}>
              <ArrowCircleRight size={24} />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
const configs = [
  {
    title: "Open Aplication",
    description:
      "Open Bonbon and start your journey of exploring and building your green life.",
    imageUri: "/images/greetting_1.png",
  },
  {
    title: "Purchase products and scan the code to collect $CER",
    description:
      "When you purchase green products from brands partnered with Bonbon, you can scan the QR code to collect $CER on the Bonbon app.",
    imageUri: "/images/greetting_2.png",
  },
  {
    title: "Get rewards",
    description:
      "Using a green service or product means you are helping to reduce CO2 emissions into the environment. You will receive a corresponding number of CER credits for the amount of CO2 you have helped to reduce.",
    imageUri: "/images/greetting_3.png",
  },
];
