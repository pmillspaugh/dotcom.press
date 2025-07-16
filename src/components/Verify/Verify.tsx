import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./Verify.module.css";

interface VerifyProps {
  email: string | string[] | undefined;
  token: string | string[] | undefined;
}

export default async function Verify({ email, token }: VerifyProps) {
  const missingEmail = typeof email !== "string";
  const missingToken = typeof token !== "string";
  if (missingEmail || missingToken) {
    return <Invalid reason={missingEmail ? "email" : "token"} />;
  }

  try {
    const data = await verify(email, token);
    if (data.refresh) return <Invalid reason="expired" />;
    if (!data.ok) return <Invalid reason="unknown" />;
  } catch (error) {
    console.error(error);
    return <Invalid reason="unknown" />;
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1>You're all set</h1>
        <p>
          Emails about <em>dot com et al.</em> will arrive in your inbox.
          Unsubscribe at any time, no hard feelings.
        </p>
        <p>
          If you have domain stories to share, email{" "}
          <a href="mailto:hello@dotcom.press">hello@dotcom.press</a>. Better
          yet, tell a friend about the book.
        </p>
      </main>
      <Footer />
    </div>
  );
}

const Invalid = ({ reason }: { reason: string }) => {
  let message = "";
  switch (reason) {
    case "email":
      message = "missing your email.";
      break;
    case "token":
      message = "missing a verification token.";
      break;
    case "expired":
      message = "expired. We've sent a new link to your email.";
      break;
    case "unknown":
      message = "broken. Try signing up again.";
      break;
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1>Whoops :/</h1>
        <p>Your confirmation link is {message}</p>
        <p>
          If you have trouble signing up, email{" "}
          <a href="mailto:support@dotcom.press">support@dotcom.press</a> to get
          sorted.
        </p>
      </main>
      <Footer />
    </div>
  );
};

async function verify(email: string, token: string) {
  const response = await fetch(
    `https://dotcom.val.run/verify?email=${email}&token=${token}`,
    { method: "POST" }
  );
  const data = await response.json();

  return data;
}
