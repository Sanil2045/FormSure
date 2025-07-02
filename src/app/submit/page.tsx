import FooterPanel from "@/components/FooterPanel/FooterPanel";
import NavigationPanel from "@/components/NavigationPanel/NavigationPanel";
import SubmitEmailForm from "@/components/SubmitEmailForm/SubmitEmailForm";

export const dynamic = 'force-dynamic';
async function SubmitEmail () {

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <NavigationPanel />
            <SubmitEmailForm />
            <FooterPanel />
        </div>
    )
}

export default SubmitEmail;