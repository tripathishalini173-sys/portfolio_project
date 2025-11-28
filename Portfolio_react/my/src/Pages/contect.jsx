import React, { useState } from "react";

function Contact() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
    e.target.reset();
    setTimeout(() => setMessageSent(false), 5000);
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Contact Me</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" id="name" required />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email" required />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea className="form-control" id="message" rows="4" required />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>

            {messageSent && (
              <div className="mt-3 text-center text-success">
                Thank you! Your message has been sent.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
