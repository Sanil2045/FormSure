'use client';

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/MobxProvider";
import Search from "@/components/Search/Search";
import VerifiedEmails from "@/components/VerifiedEmails/VerifiedEmail";

type Props = {
  emails: {
    email: string;
    status: string;
  }[];
};

function VerifiedEmailsPage({ emails }: Props) {
  const { emailStore } = useStore();

  useEffect(() => {
    // Засетить данные в MobX при монтировании
    if (emailStore.emails.length === 0) {
      emailStore.setEmails(emails);
    }
  }, []);

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <Search fields={["email", "status"]} modes="fields" onSearchChange={emailStore.filterEmails.bind(emailStore)}/>
      <VerifiedEmails emails={emailStore.filteredEmails} />
    </div>
  );
}

export default observer(VerifiedEmailsPage);