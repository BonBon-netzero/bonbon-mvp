import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner() {
  return <Scanner onScan={(result) => console.log(result?.[0]?.rawValue)} />;
}
