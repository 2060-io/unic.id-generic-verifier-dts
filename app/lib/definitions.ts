export type QRRequestResponse = {
  proofExchangeId: string;
  shortUrl: string;
  url: string;
};

export type UIResponse = {
  shortUrl?: string;
  ok: boolean;
  error?: string;
};

export type QRRequestState = {
  loading: boolean;
  error?: string;
  shortUrl?: string;
};

export type OriginalClaim = {
  name: string;
  value: string;
};

export type Claim = {
  key: string;
  value: string;
  type: "image" | "string";
};

export type OriginalPresentationEventMessage = {
  ref: string;
  claims?: OriginalClaim[];
  status:
    | "refused"
    | "ok"
    | "connected"
    | "no-compatible-credentials"
    | "verification-error"
    | "unspecified-error";
  proofExchangeId: string;
  issuerInvitationUrl?: string;
};

export type PresentationEventMessage = Omit<
  OriginalPresentationEventMessage,
  "claims"
> & {
  claims?: Claim[];
};
