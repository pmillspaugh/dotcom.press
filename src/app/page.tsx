import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <header>
        <img src="./icon.svg" alt="Dot Com Press" />
      </header>
      <main>
        <h1>Publishing for the Internet age.</h1>
        <h2>dot com et al: The strange world of Internet domains</h2>
        <p>...</p>
        <p>
          OpenAI made headlines in 2023 when it bought <em>chat.com</em> for $15
          million dollars to host ChatGPT, but big ticket domain sales are
          nothing new: wine.com sold for $3 million in the late 90s, and
          hotels.com went for $11 million in 2001.
        </p>
        <p>
          The small island nation of Anguilla earns one third of its country's
          revenue on sales of <code>.ai</code> domain names. When Yugoslavia
          split in the early 90s, some Slovenian academics conducted a literal
          heist of Serbian hosting software and domain records for the{" "}
          <code>.yu</code> top-level domain.
        </p>
        <p>
          <em>dot com et al</em> explores the history, economics, and artistry
          of domain names.
        </p>
        <h2>Mailing list</h2>
        <form>
          <p>Read email to decide whether you want to read the book.</p>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </form>
      </main>
      <footer>
        <ul>
          <li>
            <Link href="/cover">Cover</Link>
          </li>
          <li>
            <Link href="/research">Research</Link>
          </li>
          <li>
            <Link href="/shop">Merch</Link>
          </li>
          <li>
            <Link href="/tld-game">TLD Game</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/colophon">Colophon</Link>
          </li>
        </ul>
        © 2025 Dot Com Press, LLC
      </footer>
    </>
  );
}
