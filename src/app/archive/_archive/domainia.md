---
subject: Domainia
subtitle: An interactive top-level domain wiki before the next wave of TLDs
date: 4/6/26
---

## TL;DR

1. I improved my top-level domain (TLD) wiki! I think it’s quite fun, even mesmerizing, to play with. Visit [**dotcom.press/tld-wiki**](https://dotcom.press/tld-wiki) to poke around and submit domains/articles/etc.
2. On April 30, ICANN’s 2026 gTLD round—where companies can apply to own and sell `.whatever` domains—opens for applications. The last time this happened was 2012, which is how we got the majority of those TLDs you see in the wiki. Soon, we’ll have hundreds more. It’s an important year for domains!

## TLD wiki

Every day, IANA publishes the [Root Zone Database](https://www.iana.org/domains/root/db). It’s where you see that `.ai` [belongs to Anguilla](/archive/anguilla) and that [PIR owns](/archive/dot-org) `.org`. In the fall I copied and reformatted that data into an interactive grid at [dotcom.press/tld-wiki](https://dotcom.press/tld-wiki), both for my own exploration and to crowdsource interesting domain hacks and stories.

That explorer-wiki is my go-to tool when a domain catches my eye while surfing the web, or when I’m talking to someone about domains. “Oh, you have a `.fm` domain for your podcast? Let’s see, that’s the TLD for the Federated States of Micronesia.” “Nice, I like the `.how` domain for your info-site. Who owns that...ah, it’s one of Google’s 46 TLDs.”

But that data started to get stale. As of this morning, the wiki now pulls IANA data daily from Eric Case’s [iana-data](https://github.com/case/iana-data?tab=readme-ov-file) repository. I also added filters for exploration and deep links for better URL sharing. There are many more views to paint from the rich data, like which TLDs are linked to IDNs or which are open for public registration. **If you have requests, let me know!**

I owe a huge thank you to Eric for collecting and organizing the data. His repo’s readme is educational and well written, too, if you’re keen to learn more about the data:

> IANA and ICANN publish a lot of canonical, interesting, and useful _structured_ information about the top-level domain namespace. This project fetches nightly copies of their data, and jams it into a single `data/generated/tlds.json` file so that it’s all in a single place. It’s sort of an API-in-a-box, for exploring the TLD cinematic universe.

As for why this project is particularly relevant _now_...

## The 2026 round

This morning, there are 1,594 TLDs in the Root Zone. Starting at the end of this month, organizations can apply to own, operate, and sell the next batch of Internet domain extensions. It’s the first such opportunity since 2012. It costs $227k to even apply for a new TLD (without financial aid) and likely double that to actually operate year to year. The round is expected to bring Serious Money into domain governance. One section in ICANN’s applicant guidebook estimates a range of 500 to 3,500 applications. In order of magnitude, topping that range could mean ~$1 billion in fees alone. And if two companies want the same word, auctions could bring in tens or hundreds of millions more.

But what do we know about those applications, other than the rules of the road laid out by ICANN?

We know of the [queer nonprofit applying](/archive/dot-meow) for `.meow`. We know that Nova Registry—the `.link` owner—is [applying for 200ish strings](https://domainnamewire.com/2026/03/02/nova-registry-ramps-up-dnw-podcast-576/). We know that the crypto world has [largely given up](https://domainnamewire.com/2026/03/19/web3-domains-are-dead/) on Web3 “alt roots” in favor of traditional “Web2” domains, and that they have gobs of money to spend.

But we—and I mean we the general public—don’t actually know much at all about who’ll apply for what. Donuts (since rebranded to the more corpo “Identity Digital”) [applied for 307](https://techcrunch.com/2013/04/09/donuts-series-b/) strings in 2012. Google [applied for 101](https://archive.nytimes.com/bits.blogs.nytimes.com/2012/06/13/google-wants-love-and-90-other-things/). Amazon [for 76](https://domainnamewire.com/2012/06/13/amazon-com-applies-for-76-top-level-domain-names-including-cloud-hot-wow-amazon/). But Google [divested its registrar](/archive/googol.com) a few years ago. Does that decision have portent on its registry plans? Was the 2012 round a ZIRP-y thing, or will we see just as much or more money (presumably lots of crypto and AI<sup>1</sup>) this time around?

The way everyone involved talks about the 2012 round, it sounds like total domainia<sup>2</sup>. There was “the glitch,” where ICANN’s application system accidentally exposed the private data of applicants to one another, so competitors could inspect the financial ammunition and application plans of their competition. There was ICANN’s “digital archery” program (that they killed at the last minute) where applicants would compete to submit the earliest-timestamped server request to win a TLD, kind of like the server arms race among high-frequency traders on Wall Street. There were costly geopolitical fights, like Amazon’s dispute with Brazil and most of South America over `.amazon`. And there are many legal battles still ongoing over a decade later, like the `.web` war, in which Verisign paid $135 million for it in an auction and has made exactly $0 so far.

I’m getting closer and closer to that seat edge waiting for more domainia to unfold in the 2026 round.

## Footnotes

_(1) It’s out of scope for this write-up, but much has been written about AI’s impact on domains (or really, much has been written about AI’s impact on everything, and domains are part of everything). For example, domain doomers might say that the whole point of domains was to give us humans memorable nicknames for IP addresses, and machines don’t need that. Domain defenders might say, now wait a minute, AI makes it easier to build websites than ever (sloppy as they may be), and a trusted, branded domain "front door" is more important than ever._

_(2) “Domainia” is another title I’ve considered for the book. I think it’d better suit a book more specifically covering domaining and all the speculative investment in domains. Like David Kesmodel’s book, “The Domain Game.” Reply to share your two cents on “Domainia” or my working title, “dot com et al: the secret life of domains.”_
