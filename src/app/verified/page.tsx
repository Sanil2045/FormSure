import { EmailItem } from "@/store/EmailStore";
import VerifiedEmailsPage from "./VerifiedEmailsPage";
import FooterPanel from "@/components/FooterPanel/FooterPanel";
import NavigationPanel from "@/components/NavigationPanel/NavigationPanel";
export const dynamic = 'force-dynamic';
async function VerificatedEmails() {  
  const res = await fetch("http://localhost:3000/api/emails", {
    next: { revalidate: 0 }, // или { cache: 'no-store' }
  });

  const emails: EmailItem[] = await res.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavigationPanel />
      <VerifiedEmailsPage emails={emails} />
      <FooterPanel />
    </div>
  );
}

export default VerificatedEmails