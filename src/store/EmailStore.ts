import { makeAutoObservable, toJS } from "mobx";

export type EmailItem = {
  email: string;
  status: string;
};

class EmailStore {
  emails: EmailItem[] = [];
  filteredEmails: EmailItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setEmails(list: EmailItem[]) {
    this.emails = list;
    this.filteredEmails = list;
  }

  setFilteredEmails(list: EmailItem[]) {
    this.filteredEmails = list;
  }

  addEmail(email: EmailItem) {
    this.emails.push(email);
    this.filteredEmails.push(email); // добавляем в оба массива
  }

  clearEmails() {
    this.emails = [];
    this.filteredEmails = [];
  }

  async fetchEmails() {
    try {
      const res = await fetch("/api/emails");
      const data = await res.json();
      this.setEmails(data);
    } catch (error) {
      console.error("Failed to fetch emails:", error);
    }
  }

  filterEmails({ query }: { query: string }) {
    const queryObj = Object.fromEntries(new URLSearchParams(query)) as {
      email?: string;
      status?: string;
    };

    if (query === "") {
      this.setFilteredEmails(this.emails);
      return;
    }

    const filtered = this.emails.filter((item) => {
      const matchesEmail = queryObj.email
        ? item.email.toLowerCase().includes(queryObj.email.toLowerCase())
        : true;

      const matchesStatus = queryObj.status
        ? item.status.toLowerCase().includes(queryObj.status.toLowerCase())
        : true;

      return matchesEmail && matchesStatus;
    });

    this.setFilteredEmails(filtered);
    console.log(queryObj)
    console.log(toJS(this.filteredEmails))
  }
}

export const emailStore = new EmailStore();