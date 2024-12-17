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

export const metadata = {
  title: "MareLaw",
  description: "Official project MareLaw website | fantaz",
};

export default async function RootLayout({ children }) {
  const { data } = await fetchApi(pagesMenuQuery);
  const menuItems = createDataTree(data.menu.menuItems.nodes);

  return (
    <html lang='en' suppressHydrationWarning>
      <body /* className={`${playfairDisplay.variable} ${nunitoSans.variable}`} */>
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
