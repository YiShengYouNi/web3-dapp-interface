
import { WagmiWrapper } from '@/features/wallet/provider/WagmiWrapper';
import '@/styles/globals.css'



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WagmiWrapper>
        {children}
        </WagmiWrapper>
      </body>
    </html>
  );
}


