import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@//theme/theme";
import { CssBaseline } from "@mui/material";
import { pagesMenuQuery } from "@/helpers/queryLists";
import { fetchApi } from "@/functions/fetchApi";
import createDataTree from "@/functions/createDataTree";
import Head from "next/head";

export const metadata = {
  title: "MareLaw",
  description: "Official project MareLaw website | fantaz",
};

export default async function RootLayout({ children }) {
  const { data } = await fetchApi(pagesMenuQuery);
  const menuItems = createDataTree(data.menu.menuItems.nodes);

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <title>MareLaw</title>
        <meta name='description' content='Official project MareLaw website | fantaz' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header menuItems={menuItems} />
            {children}
            <Footer menuItems={menuItems} />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
