import "@/styles/globals.css";
import { WisdomWeaveProvider } from "../context/WisdomWeaveContext";

export default function App({ Component, pageProps }) {
  return (
    <WisdomWeaveProvider>
      <Component {...pageProps} />
    </WisdomWeaveProvider>
  );
}
