import HeroNavbar from "./HeroNavbar.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

function Auth() {
  return (
    <div className="min-h-screen bg-[#0F0F10] flex flex-col">
      <HeroNavbar />

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
              onSubmit={(e) => {
                e.preventDefault();
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
              <button className="bg-[#512FA2] rounded-[0.5rem] py-2 font-semibold mt-3 cursor-pointer hover:bg-[#4a2a93] duration-300">
                Log in
              </button>
              <div className="flex items-center">
                <span className="w-[9rem] h-[0.1rem] bg-gray-700 [@media(max-width:425px)]:w-[6.9rem]"></span>
                <p className="text-gray-500 text-[0.83rem] mx-2">
                  or continue with
                </p>
                <span className="w-[9rem] h-[0.1rem] bg-gray-700 [@media(max-width:425px)]:w-[6.9rem]"></span>
              </div>
              <button className="bg-[#15151a] border-2 border-[#1E1F20] px-4 py-2 rounded-[0.6rem] cursor-pointer flex justify-center gap-2 items-center font-semibold">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  className="w-[1.1rem]"
                />
                <p>Google</p>
              </button>
            </form>
          </TabsContent>
          <TabsContent value="password">
            <form
              onSubmit={(e) => {
                e.preventDefault();
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
              <button className="bg-[#512FA2] rounded-[0.5rem] py-2 font-semibold mt-3 cursor-pointer hover:bg-[#4a2a93] duration-300">
                Sign up
              </button>
              <div className="flex items-center">
                <span className="w-[9rem] h-[0.1rem] bg-gray-700 [@media(max-width:425px)]:w-[6.9rem]"></span>
                <p className="text-gray-500 text-[0.83rem] mx-2">
                  or continue with
                </p>
                <span className="w-[9rem] h-[0.1rem] bg-gray-700 [@media(max-width:425px)]:w-[6.9rem]"></span>
              </div>
              <button className="bg-[#15151a] border-2 border-[#1E1F20] px-4 py-2 rounded-[0.6rem] cursor-pointer flex justify-center gap-2 items-center font-semibold">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  className="w-[1.1rem]"
                />
                <p>Google</p>
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Auth;
