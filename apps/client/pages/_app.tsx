import { AppProps } from 'next/app';
import '../globalstyles/colors.css';
import '../globalstyles/typography.css';
import { Inter } from '@next/font/google'
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import { UserContextProvider } from "../context/UserContext";

const inter = Inter({ subsets: ['latin'] });
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContextProvider>
        <main className={inter.className}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </main>
      </UserContextProvider>
    </>
  );
}

export default CustomApp;
