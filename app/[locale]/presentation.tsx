import { useTranslations } from "next-intl";
import { PresentationEventMessage } from "@/app/lib/definitions";
import PresentationClaims from "./presentation-claims";
import { ReactElement, useMemo } from "react";

type Props = {
  presentationEventMessage: PresentationEventMessage;
};

export default function Presentation({ presentationEventMessage }: Props) {
  const t = useTranslations();
  const { claims, status } = presentationEventMessage;
  console.log("presentation status:", status);

  const render: Record<PresentationEventMessage["status"], ReactElement> =
    useMemo(() => {
      return {
        ok: claims ? (
          <>
            <span className="font-bold text-xl mb-4">{t("claims")}</span>
            <div className="w-full md:w-3/6 flex flex-col items-center rounded-xl bg-gray-50 dark:bg-black p-4">
              <div className="container mx-auto px-4 block justify-center">
                <PresentationClaims claims={claims} />
              </div>
            </div>
          </>
        ) : (
          <></>
        ),
        refused: (
          <p className="font-bold text-xl text-orange-500">
            <span>{t("requestRefused")}</span>
          </p>
        ),
        connected: (
          <div>
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 border-4 border-t-green-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin" />
            </div>
            <p className="font-bold text-xl text-green-500">
              <span>{t("requestConnected")}</span>
            </p>
          </div>
        ),
        "no-compatible-credentials": (
          <p className="font-bold text-xl text-orange-500">
            <span>{t("noCompatibleCredentials")}</span>
          </p>
        ),
        "verification-error": (
          <p className="font-bold text-xl text-red-500">
            <span>{t("verificationError")}</span>
          </p>
        ),
        "unspecified-error": (
          <p className="font-bold text-xl text-red-500">
            <span>{t("unspecifiedError")}</span>
          </p>
        ),
      };
    }, [claims, t]);

  return render[status];
}
