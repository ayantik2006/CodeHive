import HeroNavbar from "./HeroNavbar.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.tsx";

function Auth() {
  const provider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .post(BACKEND_URL + "/auth/user", {}, { withCredentials: true })
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        navigate("/auth");
      });
  }, [BACKEND_URL, navigate]);

  return (
    <div className="min-h-screen bg-[#0F0F10] flex flex-col bg-[url('../../grid.svg')]">
      <HeroNavbar />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#0f0f10",
            color: "white",
            border: "3px solid #512FA2",
          },
        }}
      />

      <div className=" flex flex-col items-center m-[5rem]">
        <Tabs
          defaultValue="account"
          className="w-[400px] [@media(max-width:425px)]:w-[335px]"
        >
          <TabsList className="w-full bg-[#18191A] flex gap-2 h-[2.5rem] mb-[2rem]">
            <TabsTrigger
              value="account"
              className="bg-[#18191A] text-white data-[state=active]:bg-[#0f0f10] cursor-pointer text-[1.1rem]"
            >
              Log in
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="bg-[#18191A] text-white data-[state=active]:bg-[#0F0F10] cursor-pointer text-[1.1rem]"
            >
              Create Account
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="account"
            className="text-white flex flex-col gap-2"
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                try {
                  const res = await axios.post(
                    BACKEND_URL + "/auth/login",
                    {
                      email: e.currentTarget[0].value,
                      password: e.currentTarget[1].value,
                    },
                    { withCredentials: true }
                  );
                  setIsLoading(false);
                  navigate("/dashboard");
                } catch (e) {
                  toast("Invalid credentials!", {
                    style: {
                      border: "2px solid #d9264a",
                      color: "#d9264a",
                      fontSize: "1rem",
                    },
                  });
                  setIsLoading(false);
                }
              }}
              className="text-white flex flex-col gap-2"
            >
              <label htmlFor="login-email">Email</label>
              <Input
                id="login-email"
                placeholder="Email"
                type="email"
                className="border-2 border-[#262829] selection:bg-blue-800"
                required
              />
              <label htmlFor="login-password">Password</label>
              <Input
                id="login-password"
                placeholder="Password"
                type="password"
                className="border-2 border-[#262829] selection:bg-blue-800"
                required
              />
              <button
                className={`bg-[#512FA2] rounded-[0.5rem] py-2 font-semibold mt-3 cursor-pointer hover:bg-[#4a2a93] duration-300 flex items-center justify-center gap-2 ${
                  isLoading ? "pointer-events-none bg-gray-600" : ""
                }`}
                type="submit"
              >
                {isLoading && <Spinner />}
                <p>{isLoading ? "Please wait..." : "Log in"}</p>
              </button>
              <div className="flex items-center">
                <span className="w-[9rem] h-[0.1rem] bg-gray-700 [@media(max-width:425px)]:w-[6.9rem]"></span>
                <p className="text-gray-500 text-[0.83rem] mx-2">
                  or continue with
                </p>
                <span className="w-[9rem] h-[0.1rem] bg-gray-700 [@media(max-width:425px)]:w-[6.9rem]"></span>
              </div>
              <button
                className="bg-[#15151a] border-2 border-[#1E1F20] px-4 py-2 rounded-[0.6rem] cursor-pointer flex justify-center gap-2 items-center font-semibold"
                type="button"
                onClick={async () => {
                  const result = await signInWithPopup(auth, provider);
                  const user = result.user;
                  const email=user.email;
                  const name=user.displayName;
                  const photoUrl=user.photoURL;
                  try{
                    await axios.post(BACKEND_URL+"/auth/google-oauth",{email:email,name:name,photoUrl:photoUrl},{withCredentials:true});
                    navigate("/");
                  }
                  catch(e){
                    console.log(e);
                  }
                }}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  className="w-[1.1rem]"
                />
                <p>Google</p>
              </button>
              <p className="text-gray-500 text-center mt-5">
                Still under development, for now use, <br /> email:
                ayantik.sarkar2020@gmail.com <br />
                password: as
              </p>
            </form>
          </TabsContent>
          <TabsContent value="password">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                try {
                  const res = await axios.post(BACKEND_URL + "/auth/signup", {
                    name: e.currentTarget[0].value,
                    email: e.currentTarget[1].value,
                    password: e.currentTarget[2].value,
                  });
                  setIsLoading(false);
                  if (res.data.msg == "success") {
                    toast("Please check your email for verification link!", {
                      style: {
                        border: "2px solid #21a108",
                        color: "#21a108",
                        fontSize: "1rem",
                      },
                    });
                  } else {
                    toast(`Please try after ${res.data.timeLeft}s!`, {
                      style: {
                        border: "2px solid #512FA2",
                        color: "#7651cd",
                        fontSize: "1rem",
                      },
                    });
                  }
                } catch (e) {
                  setIsLoading(false);
                  toast("User already exists!", {
                    style: {
                      border: "2px solid #d9264a",
                      color: "#d9264a",
                      fontSize: "1rem",
                    },
                  });
                }
              }}
              className="text-white flex flex-col gap-2"
            >
              <label htmlFor="signup-name">Name</label>
              <Input
                id="signup-name"
                placeholder="Name"
                type="name"
                autoComplete="true"
                className="border-2 border-[#262829] selection:bg-blue-800"
                required
              />
              <label htmlFor="login-email">Email</label>
              <Input
                id="login-email"
                placeholder="Email"
                type="email"
                className="border-2 border-[#262829] selection:bg-blue-800"
                required
              />
              <label htmlFor="login-password">Password</label>
              <Input
                id="login-password"
                placeholder="Password"
                type="password"
                className="border-2 border-[#262829] selection:bg-blue-800"
                required
              />
              <button
                className={`bg-[#512FA2] rounded-[0.5rem] py-2 font-semibold mt-3 cursor-pointer hover:bg-[#4a2a93] duration-300 flex items-center justify-center gap-2 ${
                  isLoading ? "pointer-events-none bg-gray-600" : ""
                } pointer-events-none bg-gray-600`}
                type="submit"
                disabled={true}
              >
                {isLoading && <Spinner />}
                <p>{isLoading ? "Please wait..." : "Sign up"}</p>
              </button>
              <div className="flex items-center">
                <span className="w-[9rem] h-[0.1rem] bg-gray-700 [@media(max-width:425px)]:w-[6.9rem]"></span>
                <p className="text-gray-500 text-[0.83rem] mx-2">
                  or continue with
                </p>
                <span className="w-[9rem] h-[0.1rem] bg-gray-700 [@media(max-width:425px)]:w-[6.9rem]"></span>
              </div>
              <button
                className="bg-[#15151a] border-2 border-[#1E1F20] px-4 py-2 rounded-[0.6rem] cursor-pointer flex justify-center gap-2 items-center font-semibold"
                type="button"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  className="w-[1.1rem]"
                />
                <p>Google</p>
              </button>
              <p className="text-gray-500 text-center mt-5">
                Still under development, for now this feature will be disabled
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Auth;
