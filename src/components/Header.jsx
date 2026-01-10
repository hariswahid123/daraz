import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../assets/daraz-logo.png";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", password: "" });
  const [passwordStrength, setPasswordStrength] = useState("");

  const [cartCount, setCartCount] = useState(0);

  const checkPasswordStrength = (pwd) => {
    if (pwd.length < 6) setPasswordStrength("Too short");
    else if (/[A-Z]/.test(pwd) || /[\W_]/.test(pwd)) setPasswordStrength("Strong");
    else setPasswordStrength("Weak");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("darazUser"));

    if (!savedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (
      savedUser.email === loginData.email &&
      savedUser.password === loginData.password
    ) {
      alert("Successfully logged in");
      setShowModal(false);
      setLoginData({ email: "", password: "" });
    } else {
      alert("Incorrect email or password");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (signupData.password.length < 6 || passwordStrength === "Weak") {
      alert("Please enter a strong password");
      return;
    }

    localStorage.setItem("darazUser", JSON.stringify(signupData));
    alert("Account created. Please login");
    setIsLogin(true);
    setSignupData({ email: "", password: "" });
    setPasswordStrength("");
  };

  const loadCart = () => {
    setCartCount(Number(localStorage.getItem("cartCount")) || 0);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdate", loadCart);
    return () => window.removeEventListener("cartUpdate", loadCart);
  }, []);

  return (
    <header className="w-full bg-[#f85606] sticky top-0 z-50">
      {/* Top Bar */}
      <div className="max-w-[1200px] mx-auto flex justify-end gap-6 text-white text-xs px-4 py-1">
        <span className="hover:text-[#fcb491] cursor-pointer">SAVE MORE ON APP</span>
        <span className="hover:text-[#fcb491] cursor-pointer">SELL ON DARAZ</span>
        <span className="hover:text-[#fcb491] cursor-pointer">HELP & SUPPORT</span>
        <span
          onClick={() => { setShowModal(true); setIsLogin(true); }}
          className="hover:text-[#fcb491] cursor-pointer"
        >
          LOGIN
        </span>
        <span
          onClick={() => { setShowModal(true); setIsLogin(false); }}
          className="hover:text-[#fcb491] cursor-pointer"
        >
          SIGN UP
        </span>
        <span className="hover:text-[#fcb491] cursor-pointer">زبان تبدیل کریں</span>
      </div>

      {/* Main Header */}
      <div className="max-w-[1200px] mx-auto flex items-center gap-6 h-[80px] px-4">
        <img src={logo} alt="Daraz" className="h-[40px] cursor-pointer" />

        <div className="flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Search in Daraz"
            className="w-full max-w-[600px] px-4 py-2 bg-white rounded-l-md outline-none text-sm"
          />
          <button className="bg-[#ffe1d2] px-4 rounded-r-md">
            <SearchIcon className="text-[#f96a24]" />
          </button>
        </div>

        <div className="relative text-white cursor-pointer">
          <ShoppingCartIcon fontSize="large" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-white text-[#f85606] text-xs px-1 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Login / Signup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] p-8 rounded-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-lg font-bold text-gray-500"
            >
              ✖
            </button>

            {isLogin ? (
              <form onSubmit={handleLogin}>
                <h2 className="text-xl font-semibold text-center mb-5">Login</h2>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mb-3 px-4 py-2.5 border rounded"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full mb-4 px-4 py-2.5 border rounded"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />

                <button className="w-full bg-[#f85606] text-white py-2.5 rounded">
                  LOGIN
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup}>
                <h2 className="text-xl font-semibold text-center mb-5">Sign Up</h2>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mb-3 px-4 py-2.5 border rounded"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full mb-1 px-4 py-2.5 border rounded"
                  value={signupData.password}
                  onChange={(e) => {
                    setSignupData({ ...signupData, password: e.target.value });
                    checkPasswordStrength(e.target.value);
                  }}
                />

                {signupData.password && (
                  <p className="text-sm mb-3 text-orange-600">
                    {passwordStrength}
                  </p>
                )}

                <button className="w-full bg-[#f85606] text-white py-2.5 rounded">
                  SIGN UP
                </button>
              </form> 
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
