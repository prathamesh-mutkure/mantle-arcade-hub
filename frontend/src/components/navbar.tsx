import React from "react";
import avatar from "../images/Netflix-avatar.png";
import { Link } from "lucide-react";
import { useWalletStore } from "@/providers/walletStoreProvider";

function Navbar() {
  const { connectedWallet, connectedAccount, api } = useWalletStore(
    (state) => state
  );

  const handleLogout = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          DotCade
        </h1>
      </Link>

      {connectedWallet?.isConnected ? (
        <div className="flex flex-row justify-between">
          <Link to="/account">
            <button className="text-white pr-4">
              <img
                className="w-[60px] h-[60px]"
                src="/images/Netflix-avatar.png"
                alt="Account"
              />
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 h-[50%] rounded cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Sign In</button>
          </Link>

          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
