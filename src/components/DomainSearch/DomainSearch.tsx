import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "./DomainSearch.module.css";
import { Form } from "./Form";

export interface Domain {
  domain: string;
  available: boolean;
  price: number | null;
  used: boolean | null;
  notes: string | null;
}

export default function DomainSearch() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.h1}>Domain search</h1>
        <p>
          Upload a spreadsheet of words and choose a TLD to check domain
          availability, use, and aftermarket pricing.
        </p>
        <Form />
      </main>

      <Footer />
    </div>
  );
}
