---
subject: Domains by Wordle
subtitle: Using Wordle's original word list to gauge domain availability, use, and aftermarket pricing
date: 7/30/25
---

Back in December, I wrote a short blog post titled [dot com et al](https://www.petemillspaugh.com/dot-com), planting a few of the seeds that are now growing into a book. I was writing about how all the short `.com` domains are already taken and wondering where that leaves us. I wrote:

> The main problem is availability. As an experiment, I typed four adjacent words into Cloudflare’s domain registrar: `bean.com`, `beans.com`, `beanie.com`, and `beanies.com`. To no surprise, none are available. But they’re not _really_ all taken. [beans.com](https://beans.com) serves a very simple static website. [beanie.com](https://beanie.com/) is available for $200k, and both [bean.com](https://bean.com) and [beanies.com](https://beanies.com) redirect. So it’s possible that all four of those are available, for a price. In my experience, the vast majority of dot com domains for valid English words less than about 8 characters are already spoken for. That’s a very unscientific hunch, but more often than not I have to think outside of the box when buying a domain.

Now that I'm turning over domain stones full time, I decided to explore that hunch a bit more scientifically. To do that, I ran an experiment using the word list from Wordle<sup>1</sup>, which felt like a goldilocks sample size of common 5-letter English words. For each word I wanted to know:

1. _Does someone already own the `.com` domain?_
2. _If yes, does it serve a real website?_
3. _If it's for sale, what's the asking price?_

There are 2,315 Wordle answers and 10,657 valid guesses in the original version of the game created by Josh Wardle. Josh whittled down the answer list himself, removing words most of us probably haven't heard of (like yabby and yobby) then randomizing the order without looking so that he and his partner could play, sans spoilers. Back before the New York Times bought the game, you could trivially see all past and future answers with a couple clicks in your browser. This wasn't an oversight by Josh, btw—you'd only spoil the game for yourself by looking ahead. So I found that original source code in the Wayback Machine<sup>2</sup> and copied the word list. I chose the answer list rather than the guess list because I think it's fair to say domains like `zuppa.com`, `zurfs.com`, and `zuzim.com` wouldn't be all that sought after<sup>3</sup>.

## Taken

For the experiment, I first wrote a program to go through each word and check whether its `.com` domain is available. For technical reasons, I inserted a half second delay between each query<sup>4</sup>, so that means over 20 minutes of domain searching that my computer did for me while I cooked dinner (tacos).

Unsurprisingly, 0 of 2,315 Wordle solutions have an available dot com domain in the primary registrar market.

## Parked

So how many of these domains serve real websites? `chess.com`, which [Erik Allebest bought in 2005 for $55k in a bankruptcy sale](https://www.chess.com/blog/erik/how-i-got-the-chess-com-domain-name), has over 8 million daily active players. `awake.com` redirects to Amazon because it was [among the company names Jeff Bezos considered](https://www.businessinsider.com/amazon-jeff-bezos-chose-company-name-2018-5). `floss.com` is unused (fittingly, I guess).

To check each domain, I wrote some code to do the equivalent of entering the domain in your browser address bar and quickly judging if it's a real website<sup>5</sup>. The heuristics I used to judge what's "real" are imperfect but should be directionally correct. And even if the criteria were more precise, it'd still be hard to decide what's real (like the cat sticker on `karma.com`). Here's what I found:

- Only a third (800ish) of the 2,315 domains serve "real" websites
- Lots of parked domains (probably the majority) are used to solicit offers
- Many sites are scraping pennies by plastering up Google ads

So most of these domains are unused and held by investors waiting for their big payday. How much are they hoping for?

## Asking

Not a single Wordle domain is available for purchase directly, but we can turn to the aftermarket for the ones that are parked. Manually searching asking prices one by one would take too long, so I worked with a domain provider ([instantdomainsearch.com](https://instantdomainsearch.com/)) to search programmatically<sup>6</sup>. Here's what I dug up:

- 234 of the 2,315 domains (~10%) are listed for sale on the aftermarket
- The average asking price is just under $600k
- The median asking price is ~$115k (averaging `atone.com` for $113k and `shown.com` for ~$116.5k)
- The most expensive domain is $16.7m for `craze.com`
- The cheapest domain is just $269 for `dumpy.com`

Like my search for "real" websites, these findings are imprecise but broadly representative. I would bet a substantial number of domains not listed aftermarket are in fact for sale.

Other asking prices that caught my eye include `lying.com` for $30k, `eight.com` for $3.5m, and `aunty.com` for $60k. These prices are, of course, negotiable. I can't imagine anyone paying more for `craze.com` than OpenAI paid for `chat.com` a couple years ago, for example. In the book I'll cover how these aftermarkets work and what shady behavior goes on behind the scenes.

It's a bummer that so many of these pithy domains are parked by squattors running ads or waiting for a well-funded company to come along and make a compelling offer. I don't like it, but I don't know that it's unfair. It's not all that different from buying up land in the physical world and waiting around for an offer you can't refuse. This is something I'll keep turning over in my head as I work on the book, and I'm curious to hear what you think.

## Reply

Thanks for reading! If you have a minute, reply and/or forward to a friend who might be interested. I'll shape the book around what people are interested in, so I'd love to hear what resonates, what doesn't, and what open questions you have. Or just reply with your Wordle score from today (I barely escaped with a 5/6).

## Footnotes

_(1) If you've never heard of or played Wordle, I'd take five and go play at [nytimes.com/games/wordle](https://www.nytimes.com/games/wordle/index.html). If you only have five minutes to either play Wordle or read my email, I'd go with Wordle. It's a wildly popular game that caught the world by storm, and who knows if my book will be any good._

_(2) For example, you can play the Wordle puzzle from February 1, 2022 at [web.archive.org/web/20220201/powerlanguage.co.uk/wordle](https://web.archive.org/web/20220201/https://powerlanguage.co.uk/wordle). I won't spoil the word of that day (I guessed in 4/6), but you can spoil it for yourself by inspecting the source code._

_(3) After writing this sentence, I naturally grew curious whether those domains were in fact sought after. `zuppa.com` and `zuzim.com` are owned (but unused), and `zurfs.com` is owned and on sale for $1,888 on GoDaddy. Go figure._

_(4) For the curious programmers among you, I added the 500ms delay to play nice with Vercel's 120 req/min rate limit on `api.vercel.com/v4/domains/status`. I'm glad that Vercel exposes their domain availability search in a public endpoint. Few registrars do! To run more experiments like this in the future, though, I'll probably write a lower level bash script that uses command line tools like `dig` for DNS lookup._

_(5) To do this, I used heuristics like: does the request return a 404 or redirect? Does it include a title and meta description? Is the response content sufficiently large? For future experiments, I may try feeding each HTML response into a classifier LLM to better gauge legitimacy._

_(6) [instantdomainsearch.com](https://instantdomainsearch.com/) has not yet released their API publicly at the time of this writing, but I had early access and got the OK to share it here._
