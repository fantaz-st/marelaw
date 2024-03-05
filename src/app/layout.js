import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";

const libreFranklin = Libre_Franklin({ subsets: ["latin"], weight: ["300", "500", "700"], style: "normal" });

export const metadata = {
  title: "MareLaw",
  description: "Official project MareLaw website | fantaz",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={libreFranklin.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
