import { useContext, useState } from "react";
import {
  CircleUserRound,
  UserRound,
  Mail,
  LockKeyholeOpen,
} from "lucide-react";
import { AuthContext } from "../Context/AuthContext.js";
import BackButton from "./ButtonBack.js";
// import loginimage from "../assets/login.jpg";

function Login() {
  const [name, setName] = useState("");
  const [pasword, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const regexPasword = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/;
  const regexName = /^[A-Za-z]+$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { login, user, logout } = useContext(AuthContext);
  // FormEvent
  const handleInputs = (e: any) => {
    e.preventDefault();

    if (!name) {
      setError("name is empty.");
      return;
    }

    if (!regexName.test(name)) {
      setError("name format is wrong.");
      return;
    }

    if (!email) {
      setError("email is empty.");
      return;
    }

    if (!regexEmail.test(email)) {
      setError("email format is wrong");
      return;
    }

    if (!pasword) {
      setError("pasword is empty. ");
      return;
    }

    if (!regexPasword.test(pasword)) {
      setError("pasword format is wrong.");
      return;
    }
    login(name, email);
    setError("");
  };

  return (
    <section className="h-screen w-full overflow-hidden text-white flex">
      <div className="w-1/2 h-full hidden md:flex relative">
        <img
          src="login.jpg"
          className="absolute w-full h-full object-cover object-center inset-0"
          alt="Login"
        />
        <div className="w-fit mt-5 ml-5 h-5 p-5 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm text-gray-200 hover:bg-red-600/80 hover:border-red-500 transition duration-300 ">
          <BackButton />
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center bg-[#030E24] gap-5 relative">
        <div className=" w-fit absolute left-3 top-3 h-5 p-5 flex md:hidden items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm text-gray-200 hover:bg-red-600/80 hover:border-red-500 transition duration-300 ">
          <BackButton />
        </div>
        <div className="flex justify-center items-center flex-col">
          <CircleUserRound size={150} color="#fff" strokeWidth={1} />
          <h1 className="font-bold text-5xl">Welcome!</h1>
        </div>
        {user ? (
          <div className="flex flex-col items-center gap-4">
            <p>Hello {user.name}</p>

            <button
              onClick={logout}
              className="px-5 py-2 bg-red-600 rounded-lg"
            >
              Log out
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleInputs}
            className="w-3/4 max-w-md flex flex-col gap-4"
          >
            <p className="flex justify-center items-center text-[#ffffffba]">
              Please sign in your account
            </p>

            <div className="flex items-center bg-[#09132C] border border-[#0B1934] p-3 rounded-xl gap-3">
              <p>
                <UserRound size={30} color="#fff" strokeWidth={1} />
              </p>
              <input
                type="text"
                value={name}
                placeholder="Name"
                className="outline-none  w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center bg-[#09132C] border border-[#0B1934] p-3 rounded-xl gap-3">
              <p>
                <Mail size={30} color="#fff" strokeWidth={1} />
              </p>
              <input
                type="email"
                value={email}
                placeholder="Email"
                className="outline-none w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-[#09132C] border border-[#0B1934] p-3 rounded-xl gap-3">
              <p>
                <LockKeyholeOpen size={30} color="#fff" strokeWidth={1} />
              </p>
              <input
                type="password"
                value={pasword}
                placeholder="Password"
                className="outline-none  w-full"
                onChange={(e) => setPasword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-[#FB2332] text-white p-3 rounded font-semibold"
            >
              Login
            </button>

            {error && <p className="text-red-400">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}

export default Login;
