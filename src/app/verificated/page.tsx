import Search from "@/components/Search/Search";
import VerifiedEmails from "@/components/VerifiedEmails/VerifiedEmail";
import { EmailItem } from "@/store/EmailStore";
import { observe } from "mobx";
import VerifiedEmailsPage from "./VerifiedEmailsPage";

async function Verificated() {  
  const res = await fetch("http://localhost:3000/api/emails", {
    next: { revalidate: 0 }, // или { cache: 'no-store' }
  });

  const emails: EmailItem[] = await res.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <VerifiedEmailsPage emails={emails} />;
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Sanil2045"
          target="_blank"
          rel="noopener noreferrer"
        >
          Provided by Sanil2045
        </a>
      </footer>
    </div>
  );
}

export default Verificated