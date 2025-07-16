import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "./Research.module.css";

export default function Research() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.h1}>Research</h1>
        <p>
          Interviews, books, articles, blog posts, documentation, podcasts, and
          talks that form the foundation of <em>dot com et al</em>.
        </p>
        <p>
          If you have resources to share, email{" "}
          <a href="mailto:hello@dotcom.press">hello@dotcom.press</a>.
        </p>

        <h2>Books</h2>
        <ul>
          <li>
            <a href="https://bookshop.org/a/115276/9781436332279">
              The Domain Game: How People Get Rich From Internet Domain Names
            </a>
            , David Kesmodel
          </li>
          <li>
            <a href="https://bookshop.org/a/115276/9780062515872">
              Weaving the Web: The Original Design and Ultimate Destiny of the
              World Wide Web
            </a>
            , Tim Berners-Lee
          </li>
          <li>
            <a href="https://bookshop.org/a/115276/9781631493089">
              How the Internet Happened: From Netscape to the iPhone
            </a>
            , Brian McCullough
          </li>
          <li>
            <a href="https://wizardzines.com/zines/dns">How DNS Works</a>, Julia
            Evans
          </li>
        </ul>
        <p>
          <em>
            Books include Bookshop.org affiliate links, so if you buy one I'll
            earn a 10% commission on the profit. Regardless of my affiliation,
            Bookshop.org is a terrific Amazon alternative and way to support
            independent bookstores.
          </em>
        </p>

        <h2>Articles, blog posts</h2>
        <ul>
          <li>
            <a href="https://every.to/p/the-disappearance-of-an-internet-domain">
              The Disappearance of an Internet Domain
            </a>
            , Gareth Edwards
          </li>
          <li>
            <a href="https://jmduke.com/posts/post/buttondown-dot-com/">
              Buying a domain for $85K
            </a>
            , Justin Duke
          </li>
          <li>
            <a href="https://macwright.com/2024/10/16/domain-second-thoughts">
              If you use a domain for something popular, it will get squatted if
              you don't renew it
            </a>
            , Tom MacWright
          </li>
        </ul>

        <h2>Podcasts</h2>
        <ul>
          <li>
            <a href="https://syntax.fm/show/735/the-taliban-stole-my-domain">
              The Taliban Stole My Domain
            </a>
            , syntax.fm
          </li>
          <li>
            <a href="https://syntax.fm/show/632/where-to-register-a-domain">
              Where to Register a Domain
            </a>
            , syntax.fm
          </li>
          <li>
            <a href="https://syntax.fm/show/195/hasty-treat-buying-and-selling-domain-names">
              Buying and Selling Domain Names
            </a>
            , syntax.fm
          </li>
          <li>
            <a href="https://syntax.fm/show/53/hasty-treat-domain-management">
              Domain Management
            </a>
            , syntax.fm
          </li>
          <li>
            <a href="https://syntax.fm/show/265/hasty-treat-the-domain-name-game">
              The Domain Name Game
            </a>
            , syntax.fm
          </li>
          <li>
            <a href="https://syntax.fm/show/179/hasty-treat-the-tld-game">
              The TLD Game
            </a>
            , syntax.fm
          </li>
        </ul>

        <h2>Interviews</h2>
        <p>
          <em>Coming soon.</em>
        </p>

        <h2>Publishing resources</h2>
        <p>
          I also read and listened to a stack of resources on publishing. If you
          are a first time author, Jane Friedman's book is the place to start.
        </p>
        <ul>
          <li>
            <a href="https://www.goodreads.com/book/show/35960731-the-business-of-being-a-writer">
              The Business of Being a Writer
            </a>
            , Jane Friedman
          </li>
          <li>
            <a href="https://journal.stuffwithstuff.com/2020/04/05/crafting-crafting-interpreters">
              Crafting "Crafting Interpreters"
            </a>
            , Bob Nystrom
          </li>
          <li>
            <a href="https://journal.stuffwithstuff.com/2021/07/29/640-pages-in-15-months">
              640 Pages in 15 Months
            </a>
            , Bob Nystrom
          </li>
          <li>
            <a href="https://journal.stuffwithstuff.com/2014/11/20/how-my-book-launch-went/">
              How My Book Launch Went
            </a>
            , Bob Nystrom
          </li>
          <li>
            <a href="https://journal.stuffwithstuff.com/2014/11/03/bringing-my-web-book-to-print-and-ebook">
              Zero to 353 Pages: Bringing My Web Book to Print and E-book
            </a>
            , Bob Nystrom
          </li>
          <li>
            <a href="https://podcasts.apple.com/us/podcast/grammar-girl-quick-and-dirty-tips-for-better-writing/id173429229?i=1000710421615">
              The publishing world is changing. Jane Friedman tells us how
            </a>
            , Grammar Girl
          </li>
          <li>
            <a href="https://podcasts.apple.com/us/podcast/published-by-greenleaf-book-group/id1229367946?i=1000666747193">
              Blog Your Way to a Book Deal of Bestseller with Jane Friedman
            </a>
            , Published
          </li>
          <li>
            <a href="https://podcasts.apple.com/us/podcast/the-ultimate-fun-jobs-podcast/id1712235041?i=1000705824496">
              Be A Non-Fiction Author with Jane Friedman
            </a>
            , UFJ Podcast
          </li>
          <li>
            <a href="https://podcasts.apple.com/us/podcast/a-peoples-guide-to-publishing/id1020819314?i=1000701097978">
              Is Print-on-Demand a Class Issue? with Jane Friedman
            </a>
            , A People's Guide to Publishing
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
