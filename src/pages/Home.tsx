import { Link } from "react-router-dom";
import { Text, Heading, Stack, Button, Badge } from "../components";
import holdDocSvg from "../assets/hold-doc.svg";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Stack direction="column" alignItems="center" justify="center" spacing="8" className="min-h-screen px-4 py-8">
        {/* Hero Image */}
        <div className="flex justify-center">
          <img
            src={holdDocSvg}
            className="w-64 h-auto max-w-full"
            alt="Hold Document"
          />
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-4xl">
          <div className="mb-6">
            <Badge>
              🚀 AI-Powered Platform
            </Badge>
          </div>

          <Heading size="4xl" className="mb-6">
            Fair Share
          </Heading>

          <Text fontSize="xl" align="center" className="mb-6 text-gray-600">
            We make understanding equity easy–so everyone is on equal footing
          </Text>

          <Text fontSize="md" align="center" className="mb-12 text-gray-700 max-w-2xl mx-auto">
            Empower your employees and investors to understand and manage their
            equity all in one place, using the world's <strong className="font-semibold">first</strong> AI
            powered 🤖 equity management platform.
          </Text>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-4">
                <span>📊</span>
              </div>
              <Heading size="lg" className="mb-2">Transparent Tracking</Heading>
              <Text fontSize="sm" align="center" className="text-gray-600">Real-time visibility into equity ownership and vesting schedules</Text>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">
                <span>🤖</span>
              </div>
              <Heading size="lg" className="mb-2">AI-Powered Insights</Heading>
              <Text fontSize="sm" align="center" className="text-gray-600">Smart recommendations and automated compliance management</Text>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">
                <span>🔒</span>
              </div>
              <Heading size="lg" className="mb-2">Secure & Compliant</Heading>
              <Text fontSize="sm" align="center" className="text-gray-600">Enterprise-grade security with regulatory compliance built-in</Text>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Stack direction="row" spacing="6" className="mb-8">
            <Button
              as={Link}
              to="/start"
              size="lg"
            >
              Get Started
            </Button>
            <Button
              as={Link}
              to="/signin"
              variant="ghost"
              size="lg"
            >
              Sign In
            </Button>
          </Stack>

          {/* Social proof */}
          <div className="text-center">
            <Text fontSize="sm" className="text-gray-500 mb-4" align="center">
              Trusted by leading companies
            </Text>
            <div className="flex justify-center space-x-6">
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
}
