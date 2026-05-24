export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-4">
          E-Seller is a modern e-commerce platform built with Next.js, Supabase, and AI integration.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="text-gray-600">To provide seamless online shopping experiences with AI-powered features.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Tech Stack</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Next.js 14</li>
          <li>Supabase</li>
          <li>Groq AI</li>
          <li>Tailwind CSS</li>
        </ul>
      </div>
    </div>
  )
}
