import { AppProps } from 'next/app';
import '../globalstyles/colors.css';
import '../globalstyles/typography.css';
import { Inter } from '@next/font/google'
import { DefaultLayout } from "../components/layouts/DefaultLayout";

const inter = Inter({ subsets: ['latin'] });
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={inter.className}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </main>
    </>
  );
}

export default CustomApp;
