import { Box } from "@chakra-ui/react";

export default function Loading({
  size = 24,
  sx = {},
}: {
  size?: number;
  sx?: any;
}) {
  return (
    <Box
      sx={{
        border: "4px solid",
        borderRadius: "50%",
        borderColor: "neutral.4",
        borderTopColor: "primary.2",
        width: `${size}px`,
        height: `${size}px`,
        animation: "spin 1s linear infinite",
        ...sx,
      }}
    />
  );
}
