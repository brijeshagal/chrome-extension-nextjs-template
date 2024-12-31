"use client";

import { useClickStore } from "@/store/clicks";
import { FC, PropsWithChildren, useEffect } from "react";

const BackgroundConnector: FC<PropsWithChildren> = ({ children }) => {
  const { inc } = useClickStore();

  useEffect(() => {
    const port = chrome.runtime.connect({ name: "popup" });

    // Listen for messages from the background script
    port.onMessage.addListener((message: { type: string; clicks: number }) => {
      console.log("Message received");
      if (message.type === "click") {
        inc(message.clicks);
      }
    });

    return () => {
      port.disconnect();
    };
  }, []);

  return children;
};

export default BackgroundConnector;
