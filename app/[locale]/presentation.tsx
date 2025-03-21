import { useTranslations } from "next-intl";
import { PresentationEventMessage } from "@/app/lib/definitions";
import PresentationClaims from "./presentation-claims";
import { QRCodeSVG } from "qrcode.react";
import { ReactElement, useMemo } from "react";

type Props = {
  presentationEventMessage: PresentationEventMessage;
};

export default function Presentation({ presentationEventMessage }: Props) {
  const t = useTranslations();
  const { claims, status, issuerInvitationUrl } = presentationEventMessage;
  console.log("presentation status:", status);

  const render: Record<PresentationEventMessage["status"], ReactElement> =
    useMemo(() => {
      return {
        ok: claims ? (
          <>
            <span className="font-bold text-xl mb-4">{t("claims")}</span>
            <PresentationClaims claims={claims} />
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
          <>
            <p className="font-bold text-xl text-black">
              <span>{t("noCompatibleCredentials")}</span>
            </p>
            {issuerInvitationUrl && (
              <>
                <p className="md:mb-2 lg:mb-3 ">
                  <span className="text-hologram-color text-xl md:text-xl lg:text-2xl font-semibold text-center">
                    {t("scanToConnectToIssuer")}
                  </span>
                </p>
                <div className="w-[300px] h-[300px] flex justify-center items-center mb-6 bg-white border-solid border-2 rounded-2xl border-gray-300">
                  <QRCodeSVG
                    value={issuerInvitationUrl}
                    size={256}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                  />
                </div>
                <button onClick={() => window.location.reload()}>
                  {t("restart")}
                </button>
              </>
            )}
          </>
        ),
        "verification-error": (
          <p className="font-bold text-xl text-red-500">
            <span>{t("verificationError")}</span>
          </p>
        ),
        "unspecified-error": (
          <p className="font-bold text-xl text-red-500">
            <span>{t("somethingWentWrong")}</span>
          </p>
        ),
      };
    }, [claims, t, issuerInvitationUrl]);

  return render[status];
}
