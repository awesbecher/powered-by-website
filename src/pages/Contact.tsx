
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      <Header />

      {/* Contact Form Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-24 pb-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Let's meet!
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Ready to put AI agents to work? Book a consultation with our Solutions Design team now.
          </p>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          <ContactForm />
        </div>
      </div>

      {/* Gradient orbs for visual interest */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Contact;
