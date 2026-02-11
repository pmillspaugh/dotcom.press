//https://instantdomainsearch.com/api/v1#model/aftermarketinfo
interface AftermarketInfo {
  currency: string;
  market: string;
  current_price?: number;
  lowest_bid?: number;
  value?: number;
}

// https://instantdomainsearch.com/api/v1#model/aftermarketdomain
interface AftermarketDomain {
  availability: "available" | "taken" | "aftermarket" | "expiring" | "unknown";
  backlink: string;
  domain: string;
  tld: string;
  aftermarket?: AftermarketInfo;
}

// https://instantdomainsearch.com/api/v1#tag/domain-search/get/bulk-check
export interface BulkSearchResponse {
  results: AftermarketDomain[];
}
