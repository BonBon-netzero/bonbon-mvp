import { Card } from "@chakra-ui/react";
import { ArrowLeft } from "@phosphor-icons/react";

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Card
      role="button"
      variant="cardWhite"
      sx={{
        p: "4px",
        borderRadius: "4px",
        width: "max-content",
        position: "relative",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <ArrowLeft size={24} />
    </Card>
  );
}
