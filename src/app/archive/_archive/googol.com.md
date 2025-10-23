---
subject: googol.com
subtitle: Why did Google really sell Google Domains, and was it a mistake?
date: 9/17/25
---

![Google Domains splitting, metaphorically](/history/google.svg)

I am working from the Google office in NYC<sup>1</sup>, and after my third trip to the cafeteria (there are four in this building) for free matcha, sushi, and anything else I could want to eat or drink, I decided now is as good a time as any to write about Google’s fingerprints on the secret life of domains. While writing this, I realized that it actually might be a better time than just any because Larry and Sergey registered `google.com` exactly 28 years ago today (I started drafting this on Monday): September 15, 1997.

Also today: _GOOG stock hits all-time high $3 trillion._

Google is relevant to the domain world in many ways: as a (former) registrar, as a registry, as a way for domain investors to monetize parked domains, for its crackdown on [domain tasting](https://icannwiki.org/Domain_Tasting) and [kiting](https://icannwiki.org/Domain_Kiting), and on and on. There’s even a good story behind the “front door of the internet,” Google’s apex domain `google.com`.

## Idk, Googol it

`googol.com` is not a misspelling. `google.com` itself is the misspelling [according to David Koller](https://web.archive.org/web/20120627081942/http://graphics.stanford.edu/~dk/google_name_origin.html) who was in the room where it happened (or at least nearby).

> Sean and Larry were in their office, using the whiteboard, trying to think up a good name - something that related to the indexing of an immense amount of data. Sean verbally suggested the word “googolplex,” and Larry responded verbally with the shortened form, “googol” (both words refer to specific large numbers). Sean was seated at his computer terminal, so he executed a search of the Internet domain name registry database to see if the newly suggested name was still available for registration and use. Sean is not an infallible speller, and he made the mistake of searching for the name spelled as “google.com,” which he found to be available. Larry liked the name, and within hours he took the step of registering the name “google.com” for himself and Sergey.

So Google is nerdily named after its homophone, _googol_, which represents ten to the power of one hundred<sup>2</sup>. Google also uses the scientific notationally named `1e100.net` domain to identify its servers’ IP addresses.

In 2015, Google accidentally let `google.com` expire, and ex-Googler Sanmay Ved [purchased it](https://www.linkedin.com/pulse/i-purchased-domain-googlecom-via-google-domains-sanmay-ved) right there on Google Domains for just $12 at 1:20am (really conjuring the hooded hacker image in the middle of the night). He owned it for all of one minute before Google reversed the transaction. Google [paid him](https://security.googleblog.com/2016/01/google-security-rewards-2015-year-in.html) $6,006.13 for the ordeal because the number “spelled-out Google, numerically (squint a little and you’ll see it!).”

> Google Security has now contacted me, and has offered me a $x reward in a very Googley way. -Sanmay

Sanmay is back working at Google again, and for security reasons neither side ever revealed how the lapse happened.

For a moment, it was possible to literally buy google.com on google.com, but nowadays it’s no longer possible to buy _any_ domain from Google.

## The registrar formerly known as Google Domains

Google comes up again and again in my interviews, and it’s most often about the head-scratching sale of Google Domains to Squarespace two years ago. One programmer friend said:

> I liked it when Google got into the game, because of the high trust / their excellent security... but then I think they gave up that business? Classic fucking Google

Google has become notorious for [killing](https://killedbygoogle.com) popular products, and Google Domains was quite popular. It launched in 2015, and it was the [third most popular registrar](https://blog.pragmaticengineer.com/google-domains-to-shut-down) by the time it shut down in 2023 (10 million domains registered as of June 2023). I held all my domains there, and once they moved to Squarespace I transferred to Cloudflare.

As I’ve written about before, registrars face thin margins whereas [registries can basically print money](https://www.dotcom.press/archive/wholesale-domains). So running a registrar is not a no-brainer for _direct_ profit, but its _indirect_ impact does seem valuable. A Hacker News commenter said that a registrar’s business is like the hot dogs at Costco.

For starters, any product with millions of users feels like something you’d hold onto. But for Google specifically, you’d think Domains would be valuable for upsell/cross-sell potential to adjacent products like Google Workspace (for a nice custom domain email). Google wants developers in its ecosystem, and developers love buying domains<sup>3</sup>. If you buy a domain at Google, maybe you’d also host your website or database there, integrate with Gemini, etc.

Many registrars do follow this strategy. My two favored registrars at the moment, [Cloudflare](https://www.cloudflare.com/products/registrar) and [Vercel](https://domains.vercel.com), both sell domains at cost (i.e., no markup above the wholesale registry price plus the ICANN fee). Vercel used to mark up domains, but now they’re at cost. A friend who works on domains at Vercel told me the math is clear: customers who buy domains there have a high lifetime value—they host on Vercel, they convert to Pro plans, etc. It makes sense. I create my Next.js site and host it on Vercel, they handle my DNS, so why not store my domains there too? It can also be a source of goodwill because many other registrars have bad UX and/or a bad reputation for sketchy behavior, like buying domains you’ve queried before you can.

I also think losing G Domains could be a fumble for Google in the vibe coding era. If an order of magnitude more people start hacking together apps on Gemini (or other LLM app builders like repl.it, v0.dev, lovable.dev, bolt.new, val.town—hey, all good non-dot-com TLDs!) then it would pretty handy for Google to say, _do you want a domain for your cool new app?_ Regardless of where someone prefers to (vibe) code, registrars can meet people where they are (e.g., by selling domains through an API or MCP server). That’s not wholly a new idea—Squarespace is a website builder after all—but it might be a bigger opportunity now.

On the other hand, my Googler friend who I’m working with today pointed out that maybe Google decided the antitrust risks outweighed the economic and brand benefits. There are several [Hacker News threads](https://news.ycombinator.com/item?id=36352347) raising theories on why they sold: that it wasn’t worth the thin margins; that customer support was a major burden; that dealing with registrars and ICANN was actually a lot of work; that it was just a product focus thing (no wonder the Google graveyard is so big—they try everything); that they bartered Google Domains away to win Squarespace as a big Google Cloud customer and G Workspace partner; that there was potential friction with Google Registry; etc.

The obvious comparison is Amazon. They also have a registrar, Route 53, although it’s buried pretty deep in AWS (which could be a feature not a bug if customer support burden really is the tradeoff). It’s interesting to pit Amazon’s domain positioning against that of Google because, like Google, Amazon also has a registry, and the two often cross paths.

## Charleston Road Registry

Google’s registry is incorporated as Charleston Road Registry Inc., as in the road that cuts through their Bay Area campus in Mountain View.

Google owns the rights to 46 top-level domains, like `.dev`, which they sell wholesale to registrars who in turn sell them to end customers. By comparison, Amazon owns 53 TLDs, and other registries you’ve never heard of own even more (like [Identity Digital](https://www.identity.digital), formerly named Donuts and listed in the root zone database as Binky Moon, LLC). Registries pay Serious Money for some TLDs, like the $25 million Google paid for `.app` when it was auctioned in 2015. Google has [applied for](https://icannwiki.org/Google#Applications) 101 TLDs total, so they’ve won about half of all applications/auctions. In alphabetical order, they own:

> .ads, .android, .app, .boo, .cal, .channel, .chrome, .dad, .day, .dclk, .dev, .docs, .drive, .eat, .esq, .fly, .foo, .gbiz, .gle, .gmail, .goog, .google, .guge, .hangout, .here, .how, .ing, .map, .meet, .meme, .mov, .new, .nexus, .page, .phd, .play, .prod, .prof, .rsvp, .search, .soy, .谷歌, .みんな, .グーグル, .youtube, .zip

Of these, `.dev` is the one I see most often in the wild, and Amazon was the only other applicant before they withdrew. While no deals have been publicly disclosed, it sounds like Google and Amazon have made some backroom handshake deals to trade TLDs. Around the same time, Google won `.drive` while Amazon won `.you` and `.talk`.

About a third of these Google TLDs are tied to its products, like `.gmail` and `.youtube`. Others are kind of odd or funny, like, `.dad`? Google acquired `.dad` “to create a premiere online destination where registrants can offer and users can gain access to ideas, products, services and information about fathers and fatherhood,” but they lost out on `.mom` (which does exist and is owned by the [`.xyz` registry](https://xyz.xyz)). Delegation of `.zip` triggered widespread [security fears](https://www.reddit.com/r/programming/comments/13fsvl5/the_zip_tld_sucks_and_it_needs_to_be_immediately/) tied to potential confusion over the same-named file extension.

Each TLD (not just those owned by Google) has its own ICANN wiki page (e.g., [icannwiki.org/.zip](https://icannwiki.org/.zip)), and many have their own regular Wikipedia page (e.g., [for `.zip`](<https://wikipedia.org/wiki/.zip_(top-level_domain)>)). When you see a new TLD in the wild, look it up on ICANN Wiki and tell me about it!

As with so many domain subtopics, you could probably write an entire book on Google’s domain influence and involvement alone. I have to end these emails somewhere, though, so I’ll save Google’s role in domain investing (e.g., parked domains farming pennies with Google ads) among other topics for another day. I’ve yet to listen to part two of the [Acquired](https://acquired.fm) podcast on Google, but I’m sure that’ll turn up even more angles to research. Reply with your thoughts on the lingering question: **Why did Google really sell Google Domains, and was it a mistake?**

Thanks for reading.

## Footnotes

_(1) Google has several offices in New York. This one is at St. John’s Terminal all the way west on Houston St., in the area being heavily rebranded as Hudson Square. I’m writing from the Greenhouse room, around the corner from the ROYGBIV room, and the whole building is a greenhouse, really. There are trees all over the north-facing entrance, planted on concrete cantilevers sticking out of the all-glass facade._

_(2) When numbers get big enough they get special names, apparently. Googol even has alternate names like ten duotrigintillian and ten sexdecilliard that follow logical scale nomenclatures and, while long, are quite a bit shorter than writing 10,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000._

_(3) I own a couple dozen, many of which I’ve bought for friends and family as birthday or holiday gifts. Ok, you say, but you’re writing a book about domains. Yes, that’s fair, but I was catching up with some former coworkers last night, and one friend said he owns ~200! I’d say the median number of domains owned by most dev-friends I talk to is about 10 (then again, I probably tend to ask more side project-oriented programmers than this-is-just-my-job software engineers)._
