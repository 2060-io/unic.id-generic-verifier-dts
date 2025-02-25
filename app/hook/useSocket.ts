import { useEffect, useState } from "react";
import io from "socket.io-client";
import { transformClaimsData } from "../utils";
import {
  OriginalPresentationEventMessage,
  PresentationEventMessage,
  QRRequestState,
} from "@/app/lib/definitions";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [requestQRState, setRequestQRState] = useState<QRRequestState>({
    loading: true,
  });

  const [presentationEventMessage, setPresentationEventMessage] =
    useState<PresentationEventMessage>();

  useEffect(() => {
    const socketIo = io();

    socketIo.on("connect", () => {
      setIsConnected(true);
      socketIo.emit("generateQR", { socketConnectionId: socketIo.id });
    });

    socketIo.on("disconnect", () => {
      setIsConnected(false);
    });

    socketIo.on("generateQREventMessage", (msg) => {
      console.log("generateQREventMessage", msg);
      if (msg.ok && msg.shortUrl) {
        setRequestQRState({
          loading: false,
          shortUrl: msg.shortUrl,
        });
      } else {
        setRequestQRState({
          loading: false,
          error: msg.error ?? "An error occurred",
        });
      }
    });

    socketIo.on(
      "presentationEventMessage",
      async (msg: OriginalPresentationEventMessage) => {
        console.log("presentationEventMessage has arrived", msg);
        if (msg.status === "ok" && msg.claims) {
          const transformedClaims = await transformClaimsData(msg.claims);
          setPresentationEventMessage({ ...msg, claims: transformedClaims });
        } else {
          const { ref, status, proofExchangeId } = msg;
          setPresentationEventMessage({ ref, status, proofExchangeId });
        }
      }
    );

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return {
    isConnected,
    presentationEventMessage,
    requestQRState,
  };
};
