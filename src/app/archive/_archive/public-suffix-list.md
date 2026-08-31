---
subject: The Public Suffix List is “just a list”
subtitle: A rather important piece of internet infrastructure in a plain text list
date: 8/31/2026
---

A couple weeks ago, [Sam](https://samwho.dev/) asked me how much I knew about the Public Suffix List. Many people have asked me this when they hear I’m writing a book about domains. To date my answer has been: not much.

The [Public Suffix List](https://publicsuffix.org/) has this paradoxical vibe of being pretty casual but rather important. The volunteers who maintain the list call it “a globally used resource” and warn that any change will affect “tens of millions, perhaps hundreds of millions” of people on the internet. But they also say:

> The PSL is just a list.

It really is [just a file](https://github.com/publicsuffix/list/blob/main/public_suffix_list.dat) on a public GitHub repository. OK, but I’ll back up—_suffix_ here means a domain name ending, like:

- .com
- .co.uk
- .omg.lol
- .cincinnati.oh.us

And _public_ means anyone can register a domain under that suffix, like:

- rotatingsandwiches.com
- economics.co.uk
- adam.omg.lol
- nguyen.cincinnati.oh.us

The _list_ is around 10,000 of those public suffixes.

## Cookies, beer, and pizza

The first answer to “why does this list exist?” is: cookies. Browsers—Chrome, Safari, Firefox, et al.—look to the PSL to figure out whether a domain like evil.co.uk should be able to set a cookie on co.uk. Without the PSL, if evil.co.uk set a cookie on co.uk, it could be passed on to bank.co.uk. But because co.uk is on the PSL, evil.co.uk can’t set that cookie (phew).

About half of suffixes on the list are run by countries. The .us registry, for example, has entries for each state on the list: ak.us for Alaska, al.us for Alabama, ar.us for Arkansas, and so on ([how’d they come up with those state abbreviations, anyway](https://www.youtube.com/watch?v=dLECCmKnrys)?). Italy has hundreds of suffixes under .it. Japan has even more than Italy for .jp (like, way more).

The next thousand or so suffixes on the list are generic top-level domains like .com, .app, .beer and .pizza. And finally, about a third of suffixes are run by companies. Amazon has a whole bunch. Apple, Google, OpenAI, Anthropic, Cloudflare, GitHub, Figma, Shopify, Lovable, Replit, Vercel—they all have domains on the list.

A company requests to add a domain to the PSL when they issue subdomains under it. For example, at Val Town we hand out val.run domains to users—someone makes a website on garden.val.run and someone else makes one on abottom.val.run. Those websites can’t share cookies because we submitted val.run to the PSL (royal “we”—it was Tom).

The list is a shared resource, and the maintainers hint that any company serving less than “thousands of users” with their suffix won’t be approved.

> Expanding the file size even in small ways increases the overhead for everyone.

Browsers use the PSL for more than just cookie security. They can sort or group your browsing history by public suffix, or use it to determine whether what you type into the address bar is a search query or a URL. Other software uses the PSL, too, for things like rate limiting. There isn’t, as far as I’m aware, a standard ruleset dictating how browsers and other tools must use the list, or how quickly they have to adopt changes. As the PSL maintainers write, “Browsers do what browsers do, diversely, and the PSL is not the boss of them.”

## Rather important, pretty casual

The Mozilla Foundation stewards the Public Suffix List. I am not sure how many maintainers actually work for Mozilla, though. They’re volunteering under the umbrella of Universal Acceptance, ICANN’s initiative to have all domain names equally accepted across the internet (example: signup forms should accept valid email addresses with domain names in languages and scripts other than English).

I get the sense from the PSL’s [README](https://github.com/publicsuffix/list#the-public-suffix-list) and [Guidelines](https://github.com/publicsuffix/list/wiki/Guidelines) that the maintainers are a thinly staffed team of volunteers who are, unsurprisingly, burdened with low effort slop. They ask submitters to “be extremely thorough and patient.” But I imagine the maintainers are the extremely thorough and patient ones, to whom the courtesy isn’t always returned.

It’s kind of hard to believe that important parts of internet infrastructure run like this: a plain text file maintained by a group of volunteers online. The Domain Name System itself was created to replace a centralized list, hosts.txt, with domain names and corresponding IP addresses. DNS is remarkably stable, and I’m interested in the human work that goes into this sort of thing, expert volunteers maintaining these complex systems. But as the maintainers remind us—they repeat it four times, actually—the Public Suffix List is, after all, just a list.

_P.S. I want to talk to people who work on or with the PSL, or know about it. If that’s you (or your coworker/friend/whomever), reply and teach me. Tell me what’s interesting or hard or fragile or underappreciated._
