import Link from "next/link";
import auth from "./auth";
import { Button } from "@/components/ui/button";
import FlamLogo from "@/components/FlamLogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Flam | Mixed Reality Publishing Platform for Marketing &amp; Advertising",
  description:
    "Experience the most advanced mixed reality platform with Flamapp.ai. Add immersive content to print media, billboards, and more instantly.",
};

export default async function Home() {
  "use server";
  const session = await auth();

  return (
    <div className="bg-black">
      {/* Hero */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <FlamLogo className="w-20 h-20" alt="Flamapp.ai Logo" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            <span className="block">Experience the most advanced</span>
            <span className="text-[#D6FF00] block mt-2">
              mixed reality platform
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Add immersive, interactive content to print media, billboards, and
            more instantly, with no app download required.
          </p>

          {session?.user ? (
            <Button
              asChild
              className="px-8 py-6 text-lg bg-[#D6FF00] text-black hover:bg-[#c2eb00] rounded-md font-semibold shadow-lg"
            >
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button
              asChild
              className="px-8 py-6 text-lg bg-[#D6FF00] text-black hover:bg-[#c2eb00] rounded-md font-semibold shadow-lg"
            >
              <Link href="/sign-in">Sign In to Get Started</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="bg-zinc-950 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Choose <span className="text-[#D6FF00]">Flamapp.ai</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-zinc-900 rounded-xl shadow-lg p-8 border border-zinc-800 hover:border-[#D6FF00] transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-[#D6FF00]">
                Instant Mixed Reality
              </h3>
              <p className="text-gray-300">
                Transform newspapers, billboards, packaging, and magazines into
                interactive experiences no app download needed.
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl shadow-lg p-8 border border-zinc-800 hover:border-[#D6FF00] transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-[#D6FF00]">
                AI-Powered & Scalable
              </h3>
              <p className="text-gray-300">
                Fastest image recognition (50ms), accurate image tracking, and
                unlimited scalability built for billions of users.
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl shadow-lg p-8 border border-zinc-800 hover:border-[#D6FF00] transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-[#D6FF00]">
                Get viral reach on social media
              </h3>
              <p className="text-gray-300">
                Go viral with viewers recording and sharing experience online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* benifits */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">
            Key <span className="text-[#D6FF00]">Benefits</span>
          </h2>

          <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-[#D6FF00] mr-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-200">
                  Works on all mobile devices no app download
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-[#D6FF00] mr-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-200">
                  Seamless integration with Apple Vision Pro and spatial
                  computing
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-[#D6FF00] mr-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-200">
                  Localized, updatable, and viral experiences
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-[#D6FF00] mr-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-200">
                  Brands like Britannia, BW Businessworld, and Netflix use Flam
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-[#D6FF00] mr-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-200">
                  Publish and update mixed reality in minutes
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://flamapp.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D6FF00] hover:underline font-medium text-lg"
            >
              Learn more at Flamapp.ai →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
