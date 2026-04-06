export type TLD = {
  tld: string; // e.g. "ing" (no leading dot)
  tld_iso?: string; // ISO 3166-1 alpha-2 country code for ccTLD/IDN variants
  iana_tag: string; // e.g. "generic" or "country-code"
  delegated: boolean;
  orgs?: { tld_manager?: string };
  annotations?: { country_name_iso?: string };
};

export type WikiEntry = {
  name: string;
  entry: string;
  submitted_at: string; // in UTC, e.g. "2025-10-04 14:02:48"
};
