import { FileQuestion, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/hero/Button'
import BackButton from '@/app/back-button'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"></div>
                        <FileQuestion className="relative w-24 h-24 text-purple-500" />
                    </div>
                </div>

                <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
                    404
                </h1>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Page Not Found
                </h2>

                <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        asChild
                        variant="gradient"
                        size="lg"
                        className="items-center gap-2"
                    >
                        <Link href="/" className='flex flex-row'>
                            <Home className=" mr-3 w-5 h-5" />
                            Go Home
                        </Link>
                    </Button>

                    <BackButton />
                </div>

            </div>
        </div>
    )
}

