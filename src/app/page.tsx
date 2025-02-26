"use client";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLogin, usePrivy, useLogout } from "@privy-io/react-auth";
import { useAccount, useBalance } from "wagmi";
export default function Home() {
  const { ready, authenticated, user: privyUser } = usePrivy();
  const router = useRouter();
  const { address } = useAccount();
  const disableLogin = !ready || (ready && authenticated);
  const { login } = useLogin({
    onComplete: () => {
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { logout } = useLogout({
    onSuccess: () => {
      router.push("/");
    },
  });
  const { data } = useBalance({
    address,
  });
  return (
    <div className="flex h-[100vh] w-[100vw] gap-4 gap-y-4 items-center justify-center">
      <ConnectButton />{" "}
      <button
        disabled={disableLogin}
        onClick={login}
        className="bg-white nes-btn cursor-pointer text-black px-4 py-2 rounded-md text-sm"
      >
        {privyUser?.wallet
          ? privyUser?.wallet?.address.slice(0, 4) +
            "..." +
            privyUser?.wallet?.address.slice(-4) +
            " | " +
            data?.formatted +
            " " +
            data?.symbol
          : "Login"}
      </button>
      {authenticated && (
        <>
          {" "}
          <button
            onClick={logout}
            className="p-2 nes-btn bg-white cursor-pointer text-black px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
