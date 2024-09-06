import "@rainbow-me/rainbowkit/styles.css";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { walletConnectWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import { defineChain } from "viem";
import { publicProvider } from "wagmi/providers/public";

export const blastMainnet = defineChain({
  id: 81457,
  name: "Blast Mainnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.blast.io"] },
    public: { http: ["https://rpc.blast.io"] },
  },
  blockExplorers: {
    default: { name: "Blastscan Mainnet", url: "https://blastscan.io" },
  },
  network: "",
});

const projectId = "f8191238a3a5ba885ad6a6c2c841e96f";

const network = blastMainnet;
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [network],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: " ",
    wallets: [
      metaMaskWallet({
        projectId,
        chains,
        shimDisconnect: true,
      }),
      walletConnectWallet({
        projectId,
        chains,
      }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export const walletCustomTheme = {
  blurs: {
    modalOverlay: "blur(6px)",
  },
  colors: {
    accentColor: "#F0F0F0",
    accentColorForeground: "black",
    actionButtonBorder: "rgba(225, 225, 225, 0.04)",
    actionButtonBorderMobile: "rgba(225, 225, 225, 0.08)",
    actionButtonSecondaryBackground: "rgba(225, 225, 225, 0.08)",
    closeButton: "rgba(224, 232, 255, 0.6)",
    closeButtonBackground: "rgba(225, 225, 225, 0.08)",
    connectButtonBackground: "#0A0A0A",
    connectButtonBackgroundError: "#FF494A",
    connectButtonInnerBackground:
      "linear-gradient(0deg, rgba(225, 225, 225, 0.075), rgba(225, 225, 225, 0.15))",
    connectButtonText: "#F0F0F0",
    connectButtonTextError: "#F0F0F0",
    connectionIndicator: "#30E000",
    downloadBottomCardBackground:
      "linear-gradient(126deg, rgba(0, 0, 0, 0) 9.49%, rgba(120, 120, 120, 0.2) 71.04%), #1A1B1F",
    downloadTopCardBackground:
      "linear-gradient(126deg, rgba(120, 120, 120, 0.2) 9.49%, rgba(0, 0, 0, 0) 71.04%), #1A1B1F",
    error: "#FF494A",
    generalBorder: "rgba(225, 225, 225, 0.08)",
    generalBorderDim: "rgba(225, 225, 225, 0.04)",
    menuItemBackground: "rgba(224, 232, 255, 0.1)",
    modalBackdrop: "rgba(0, 0, 0, 0.5)",
    modalBackground: "#0A0A0A",
    modalBorder: "#F0F0F0",
    modalText: "#F0F0F0",
    modalTextDim: "rgba(224, 232, 255, 0.3)",
    modalTextSecondary: "rgba(225, 225, 225, 0.6)",
    profileAction: "rgba(224, 232, 255, 0.1)",
    profileActionHover: "rgba(224, 232, 255, 0.2)",
    profileForeground: "rgba(224, 232, 255, 0.05)",
    selectedOptionBorder: "rgba(224, 232, 255, 0.1)",
    standby: "#FFD641",
  },
  fonts: {
    body: "ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace",
  },
  radii: {
    actionButton: "8px",
    connectButton: "8px",
    menuButton: "10px",
    modal: "10px",
    modalMobile: "10px",
  },
  shadows: {
    connectButton: "0px 4px 12px rgba(0, 0, 0, 0)",
    dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
    profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
    selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)",
  },
};
