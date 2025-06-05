import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/features/wallet/wagmi/wagmiClient';
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={wagmiConfig}>
        {children}
        </WagmiProvider>
      </body>
    </html>
  );
}


