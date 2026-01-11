import { Button } from "@/components/hero/Button";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

const randomPrices = () => {
  return Math.floor(Math.random() * 90 + 10);
};

const pricingPlans = [
  {
    name: "Starter",
    price: `$${randomPrices()}/mo`,
    features: [
      "Basic AI resume analysis",
      "1 ATS report per month",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: `$${randomPrices()}/mo`,
    features: [
      "Full AI resume analysis",
      "5 ATS reports per month",
      "Priority email support",
      "Resume optimization tips",
    ],
  },
  {
    name: "Enterprise",
    price: `$${randomPrices()}/mo`,
    features: [
      "Unlimited AI resume analysis",
      "Dedicated account manager",
      "Custom ATS insights",
      "Team collaboration tools",
    ],
  },
];

const PricingPage = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-linear-to-r from-purple-600 to-blue-500 text-xs text-white/90 mb-4">
            Choose your plan
            <ArrowRight size={14} />
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
            Pricing Plans
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto leading-relaxed">
            Select the plan that fits your needs and start optimizing your resumes today with AI-powered insights.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white/5 p-10 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">{plan.name}</h2>
                <p className="text-4xl font-bold text-white mb-8 leading-relaxed">{plan.price}</p>
                <ul className="list-disc list-inside text-white/70 space-y-3 mb-8 leading-relaxed">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="hover:text-white transition">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild variant="gradient" size="lg">
                <Link href="/signup" className="w-full text-center">
                  Get Started
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Button asChild variant="gradient" size="lg">
            <Link className="inline-flex items-center gap-2" href="/">
              <ChevronLeft size={20} />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
