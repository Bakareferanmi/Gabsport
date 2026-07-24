export const metadata = {
  title: 'Contact Us | gabsport',
};

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="text-gray-600 leading-relaxed mb-10">
        Have a tip, correction, partnership inquiry, or just want to say hello?
        We'd love to hear from you.
      </p>

      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Email</h2>
          <p>hello@gabsport.com</p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Response Time</h2>
          <p>We typically respond within 24–48 hours.</p>
        </div>
      </div>
    </div>
  );
}
