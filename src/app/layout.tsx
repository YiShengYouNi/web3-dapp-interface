
import { WagmiWrapper } from '@/features/wallet/provider/WagmiWrapper';
import "./globals.css";



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


