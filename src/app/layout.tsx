
import { WagmiWrapper } from '@/features/wallet/provider/WagmiWrapper';
// import { Toaster } from '@/components/ui/toaster'
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


