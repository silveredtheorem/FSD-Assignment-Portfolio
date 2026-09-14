import { useState } from "react";
import { submitContactForm } from "../lib/api";
import "./ContactForm.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialFields = { name: "", email: "", subject: "", message: "" };

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "tell me who you are";
  if (!fields.email.trim()) errors.email = "need an email to reply to";
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "that doesn't look like a valid email";
  if (!fields.message.trim()) errors.message = "the message box is empty";
  return errors;
}

export default function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const errors = validate(fields);
  const hasRequiredFilled = fields.name.trim() && fields.email.trim() && fields.message.trim();
  const canSubmit = hasRequiredFilled && Object.keys(errors).length === 0;

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(event) {
    setTouched((prev) => ({ ...prev, [event.target.name]: true }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitContactForm({
        name: fields.name.trim(),
        email: fields.email.trim(),
        message: fields.message.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setFields(initialFields);
    setTouched({});
    setSubmitted(false);
    setSubmitError(null);
  }

  if (submitted) {
    return (
      <div className="contact-form__success">
        <p>thanks, {fields.name.split(" ")[0]} — that came through. i'll get back to you soon.</p>
        <button type="button" className="btn btn--ghost" onClick={handleReset}>
          send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-name" className="form-label">
            your name <span className="form-required">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            className="form-input"
            placeholder="Jane Smith"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
          />
          {touched.name && errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="contact-email" className="form-label">
            your email <span className="form-required">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            className="form-input"
            placeholder="jane@example.com"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
          />
          {touched.email && errors.email && <p className="form-error">{errors.email}</p>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject" className="form-label">
          subject
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          className="form-input"
          placeholder="internship inquiry / project collab / etc."
          value={fields.subject}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">
          message <span className="form-required">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-textarea"
          rows="6"
          placeholder="tell me what's on your mind..."
          value={fields.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.message && errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      {submitError && <p className="form-error" role="alert">{submitError}</p>}

      <button type="submit" className="btn btn--primary btn--full" disabled={!canSubmit || submitting}>
        {submitting ? "sending…" : "send message"}
      </button>
    </form>
  );
}
