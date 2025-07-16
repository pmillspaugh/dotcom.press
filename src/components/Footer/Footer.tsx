import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Books />
      <ul className={styles.links}>
        <li>
          <Link href="/about">ABOUT</Link>
        </li>
        <li>
          <a href="mailto:hello@dotcom.press">CONTACT</a>
        </li>
        <li>
          <Link href="/research">RESEARCH</Link>
        </li>
        <li>
          <Link href="/shop">SHOP</Link>
        </li>
        <li>
          <Plant />
          <span>© 2025 Dot Com Press, LLC</span>
        </li>
      </ul>
      <Books />
    </footer>
  );
}

const Books = () => {
  return (
    <ul className={styles.books}>
      {Array.from({ length: 50 }, (_, i) => (
        <li
          key={i}
          style={{
            background: `hsl(0, 0%, ${Math.floor(50 + Math.random() * 50)}%)`,
            height: `${130 + Math.floor(Math.random() * 40)}px`,
            width: `${16 + Math.floor(Math.random() * 16)}px`,
          }}
        />
      ))}
    </ul>
  );
};

const Plant = () => {
  return (
    <svg
      width="75"
      height="118"
      viewBox="0 0 75 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M68.6799 58.8584V116.294H18.84V58.8564L43.5031 55.0117L68.6799 58.8584Z"
        fill="#8349FF"
        stroke="#5430A1"
        strokeWidth="2"
      />
      <path
        d="M34.619 38.9626L43.6173 49.3583V40.1176V30.877L40.2429 25.1016L25.6206 21.6364C21.1062 14.3135 20.183 10.0064 21.1215 2C29.6023 4.32546 33.8693 6.46329 40.2429 12.3957V25.1016L43.6173 30.877V40.1176L51.4909 37.8075L54.8652 28.5668C59.6239 25.6302 63.968 25.8008 73.9867 28.5668C74.2508 33.7997 70.5633 36.4527 64.1338 41.0783L63.8636 41.2727L51.4909 37.8075L43.6173 40.1176V49.3583L34.619 38.9626L23.3711 47.0481C13.5544 45.7722 9.0108 43.5341 2 37.8075C9.21636 31.7764 13.6734 29.2766 23.3711 28.5668L34.619 38.9626Z"
        fill="#176823"
      />
      <path
        d="M43.6173 63.2193V49.3583M43.6173 49.3583L34.619 38.9626M43.6173 49.3583V40.1176M34.619 38.9626L23.3711 47.0481C13.5544 45.7722 9.0108 43.5341 2 37.8075C9.21636 31.7764 13.6734 29.2766 23.3711 28.5668L34.619 38.9626ZM40.2429 25.1016L43.6173 30.877V40.1176M40.2429 25.1016V12.3957C33.8693 6.46329 29.6023 4.32546 21.1215 2C20.183 10.0064 21.1062 14.3135 25.6206 21.6364L40.2429 25.1016ZM43.6173 40.1176L51.4909 37.8075M51.4909 37.8075L54.8652 28.5668C59.6239 25.6302 63.968 25.8008 73.9867 28.5668C74.2545 33.8726 70.4598 36.5261 63.8636 41.2727L51.4909 37.8075Z"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M43.8752 62.9919L44.0012 63.0076L44.1271 62.9919L68.6799 59.8425V117H18.84V59.8396L43.8752 62.9919Z"
        fill="#8349FF"
        stroke="#5430A1"
        strokeWidth="2"
      />
    </svg>
  );
};
