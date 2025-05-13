import { SearchIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { NAVLINKS } from "@/constants/link";
import Footer from "@/components/footer/Footer";
import VanishInput from "@/components/home/VanishInput";
import { useState } from "react";
import DefaultPrompts from "@/components/home/defaultPrompts";

const HomePage = () => {
  const [prompt, setPrompt] = useState<string>("");

  return (
    <div className="flex h-screen w-full flex-col bg-black text-white">
      {/* navbar */}
      <div className="fixed left-0 top-0 z-10 flex h-[76px] w-full flex-row justify-between bg-black px-8">
        <div className="flex flex-row items-center gap-2">
          <p className="text-2xl font-medium font-outfit">OrbitAI</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <button className="p-3 text-zinc-500 transition-colors duration-200 hover:text-white">
            <SearchIcon className="size-4" />
          </button>
          <button className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white outline-none hover:bg-zinc-800">
            Log in
          </button>
        </div>
      </div>
      <div className="h-[76px] w-screen bg-black" />

      {/* sidebar */}
      <div className="fixed flex h-screen w-[200px] flex-col justify-center bg-black px-4">
        {NAVLINKS.map((link) => (
          <Link
            key={link.text}
            to={link.href}
            className="group flex flex-row items-center justify-between rounded-lg bg-transparent py-[9px] pl-4 pr-3 hover:bg-neutral-900"
          >
            <span className="text-sm font-light text-white">{link.text}</span>
            <ChevronRightIcon
              className="size-4 text-zinc-600 opacity-0 group-hover:opacity-100"
              strokeWidth={2}
            />
          </Link>
        ))}
      </div>

      {/* hero section */}
      <div className="flex w-full flex-1 flex-row">
        <div className="block h-[calc(100vh-76px)] w-[200px]" />
        {/* main content */}
        <div className="flex h-full w-full flex-1 flex-col bg-black">
          <div className="w-full h-[calc(100vh-90px)] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-medium mb-6">What can I help with?</h1>
            <VanishInput prompt={prompt} setPrompt={setPrompt} />
            <DefaultPrompts setPrompt={setPrompt} />
          </div>
          <div className="w-full max-w-[1376px] mx-auto">
            <p className="text-5xl text-neutral-900">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
              beatae voluptatem quae animi dicta vel obcaecati natus, est
              aliquid! Temporibus esse, nihil earum dolores explicabo cumque
              corporis nulla beatae dolorem.Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Quas beatae voluptatem quae animi
              dicta vel obcaecati natus, est aliquid! Temporibus esse, nihil
              earum dolores explicabo cumque corporis nulla beatae dolorem.Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Quas beatae
              voluptatem quae animi dicta vel obcaecati natus, est aliquid!
              Temporibus esse, nihil earum dolores explicabo cumque corporis
              nulla beatae dolorem.Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quas beatae voluptatem quae animi dicta vel
              obcaecati natus, est aliquid! Temporibus esse, nihil earum dolores
              explicabo cumque corporis nulla beatae dolorem.Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Quas beatae voluptatem
              quae animi dicta vel obcaecati natus, est aliquid! Temporibus
              esse, nihil earum dolores explicabo cumque corporis nulla beatae
              dolorem.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quas beatae voluptatem quae animi dicta vel obcaecati natus, est
              aliquid! Temporibus esse, nihil earum dolores explicabo cumque
              corporis nulla beatae dolorem.Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Quas beatae voluptatem quae animi
              dicta vel obcaecati natus, est aliquid! Temporibus esse, nihil
              earum dolores explicabo cumque corporis nulla beatae dolorem.
            </p>
          </div>

          <div className="flex mx-auto my-10 rounded flex-col items-center justify-center bg-neutral-800 w-full max-w-[1376px] h-[367px] gap-8">
            <h1 className="text-5xl font-medium">Get started with OrbitAI</h1>
            <button className="rounded-full bg-neutral-700 px-5 py-[10px] text-sm font-medium text-white outline-none hover:bg-neutral-600 cursor-pointer">
              Log in
            </button>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
