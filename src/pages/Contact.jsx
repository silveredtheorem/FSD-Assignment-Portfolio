import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <section className="section" aria-labelledby="contact-heading">
      <div className="container">
        <h2 id="contact-heading" className="section__heading">
          get in touch
        </h2>
        <p className="section__subheading">
          got a project idea, job opportunity, or just want to talk tech? i'm open to internships and interesting
          collaborations.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
