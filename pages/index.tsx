import { ConnectButton } from "@rainbow-me/rainbowkit";
import { erc20ABI, useAccount, useContractRead, useNetwork, useWalletClient } from "wagmi";
import { useEffect, useState } from "react";
import { Address, formatEther, parseEther } from "viem";

const usdbContract = {
  address: "0x4300000000000000000000000000000000000003",
  abi: erc20ABI,
} as const;

export default function Home() {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: usdbBalance } = useContractRead({
    ...usdbContract,
    functionName: "balanceOf",
    args: [address!],
    enabled: !!address,
  });

  const { data: walletClient } = useWalletClient();
  console.log({ walletClient });

  const handleSendTransaction = async () => {
    if (!recipientAddress || !amount || !walletClient || !address) return;

    try {
      const hash = await walletClient.writeContract({
        ...usdbContract,
        functionName: "transfer",
        args: [recipientAddress as Address, parseEther(amount)],
      });
      console.log("Transaction hash:", hash);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <ConnectButton />
      {isConnected && isMounted && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <p>Connected Address: {address}</p>
            <p>Balance: {usdbBalance ? formatEther(usdbBalance) : 0} USDB</p>
            <p>Chain ID: {chain?.id}</p>
          </div>
          <form
            className="flex flex-col gap-2 w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendTransaction();
            }}
          >
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Amount (USDB)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 border rounded text-black"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Send Transaction
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
