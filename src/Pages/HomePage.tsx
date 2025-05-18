import Footer from "@/components/footer/Footer";
import VanishInput from "@/components/home/VanishInput";
import { useState } from "react";
import DefaultPrompts from "@/components/home/defaultPrompts";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/nav/Navbar";
import NavSidebar from "@/components/nav/NavSidebar";

const HomePage = () => {
  const [prompt, setPrompt] = useState<string>("");

  return (
    <div className="flex h-screen w-full flex-col bg-black text-white">
      <Toaster />
      <Navbar />
      <NavSidebar />

      {/* hero section */}
      <div className="flex w-full flex-1 flex-row">
        <div className="hidden h-[calc(100vh-76px)] w-[200px] md:block" />
        {/* main content */}
        <div className="flex h-full w-full flex-1 flex-col bg-black">
          <div className="w-full h-[calc(100vh-360px)] sm:h-[calc(100vh-120px)] flex flex-col items-center justify-center px-6">
            <h1 className="text-3xl font-medium mb-6">What can I help with?</h1>
            <VanishInput prompt={prompt} setPrompt={setPrompt} />
            <DefaultPrompts setPrompt={setPrompt} />
          </div>
          <div className="w-full max-w-[1376px] mx-auto px-6">
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

          <div className="w-full my-10 max-w-[1376px] mx-auto px-6">
            <div className="flex rounded-lg flex-col items-center justify-center bg-neutral-800 py-16 md:py-32 w-full gap-8">
              <h1 className="text-5xl font-medium px-4">
                Get started with OrbitAI
              </h1>
              <button className="rounded-full bg-neutral-700 px-5 py-[10px] text-sm font-medium text-white outline-none hover:bg-neutral-600 cursor-pointer">
                Log in
              </button>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
