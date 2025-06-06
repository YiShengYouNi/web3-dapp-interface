
import styles from "./page.module.css";
import {WalletButton} from "@/features/wallet/components/WalletButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Web3 DApp Interface</h1>
      <WalletButton />
      </main>
    </div>
  );
}
