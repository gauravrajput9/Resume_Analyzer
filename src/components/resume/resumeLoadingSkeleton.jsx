export default function ResumeLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gray-700/50"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-700/50 rounded-lg w-48"></div>
                <div className="h-4 bg-gray-700/50 rounded-lg w-64"></div>
              </div>
              <div className="h-8 w-20 bg-gray-700/50 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-10 bg-gray-800/50 rounded-lg w-80 mb-2"></div>
          <div className="h-4 bg-gray-700/50 rounded-lg w-96"></div>
        </div>

        {/* Resume Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:border-purple-500/50 transition-all duration-300">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700/50 rounded w-24"></div>
                      <div className="h-3 bg-gray-700/50 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="h-8 w-16 bg-purple-500/20 rounded-full"></div>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="bg-gray-900/50 rounded-xl p-3">
                      <div className="h-3 bg-gray-700/50 rounded w-12 mb-2"></div>
                      <div className="h-6 bg-gray-700/50 rounded w-8"></div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="space-y-3 pt-4 border-t border-gray-700/50">
                  <div className="h-3 bg-gray-700/50 rounded w-full"></div>
                  <div className="h-3 bg-gray-700/50 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Text */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 text-gray-400">
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Loading your resume analyses...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
