import { Box } from "@chakra-ui/react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner({
  onSuccess,
}: {
  onSuccess: (result: any) => void;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        ".container_qrscan": { div: { display: "none" } },
      }}
    >
      <Scanner
        onScan={(result) => {
          console.log(result);
          onSuccess(result?.[0]?.rawValue);
        }}
        classNames={{ container: "container_qrscan" }}
      />
    </Box>
  );
}
