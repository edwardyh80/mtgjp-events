import { BsGithub, BsTwitter } from "react-icons/bs";
import { SiVercel } from "react-icons/si";

const Footer = () => (
  <footer className="mt-16 text-sm leading-6">
    <div className="mx-auto max-w-7xl justify-between border-t border-slate-200 py-24 px-4 pt-6 text-slate-500 dark:border-slate-500 sm:flex sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-0 sm:flex">
        <p>
          Powered by{" "}
          <a
            className="p-1 hover:text-slate-900 dark:hover:text-slate-400"
            href="https://vercel.com/"
            target="_blank"
            rel="noreferrer"
          >
            <SiVercel className="inline h-4 w-4" />
          </a>
        </p>
        <p className="sm:ml-4 sm:border-l sm:border-slate-200 sm:pl-4 dark:sm:border-slate-500">
          Made with ❤️ by{" "}
          <a
            className="hover:text-slate-900 dark:hover:text-slate-400"
            href="https://twitter.com/asuka_mtg"
            target="_blank"
            rel="noreferrer"
          >
            @asuka_mtg
          </a>
        </p>
      </div>
      <div className="flex space-x-4 text-slate-400 dark:text-slate-500">
        <a
          className="p-1 hover:text-slate-900 dark:hover:text-slate-400"
          href="https://github.com/edwardyh80/mtgjp-events"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub className="h-6 w-6" />
        </a>
        <a
          className="p-1 hover:text-slate-900 dark:hover:text-slate-400"
          href="https://twitter.com/asuka_mtg"
          target="_blank"
          rel="noreferrer"
        >
          <BsTwitter className="h-6 w-6" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
