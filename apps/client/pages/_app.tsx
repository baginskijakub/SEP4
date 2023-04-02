import { AppProps } from 'next/app';
import '../globalstyles/colors.css';
import '../globalstyles/typography.css';
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] });
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
