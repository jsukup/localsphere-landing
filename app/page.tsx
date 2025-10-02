// Root page - redirects are handled by middleware.ts
// PostHog will automatically capture pageviews via autocapture
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading LocalSphere...</h2>
        <p className="text-gray-500 mt-2">Preparing your experience</p>
      </div>
    </div>
  )
}
