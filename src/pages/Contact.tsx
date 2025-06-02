import React from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { ContactForm } from "@/components/contact/ContactForm";

const Contact = () => {
  return (
    <PageLayout>
      <main className="mx-auto w-full max-w-5xl px-4 md:px-6 py-12">
        <ContactForm />
      </main>
    </PageLayout>
  );
};

export default Contact;
