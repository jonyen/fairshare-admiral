import { Link } from "react-router-dom";
import { Text, Heading, Stack, Button, Badge } from "../components";
import holdDocSvg from "../assets/hold-doc.svg";

export function Home() {
  return (
    <div>
      <Stack direction="column" alignItems="center" spacing="8" className="min-h-screen">
        <div>
          <img 
            src={holdDocSvg} 
            width="50%" 
            height="auto" 
            alt="Hold Document" 
          />
        </div>
        
        <div>
          <Badge>
            🚀 AI-Powered Platform
          </Badge>
          
          <Heading size="4xl">
            Fair Share
          </Heading>
          
          <Text fontSize="xl" align="center" fontWeight="medium">
            We make understanding equity easy–so everyone is on equal footing
          </Text>

          <Text fontSize="md">
            Empower your employees and investors to understand and manage their
            equity all in one place, using the world's <strong className="font-semibold">first</strong> AI
            powered 🤖 equity management platform.
          </Text>
          
          {/* Feature highlights */}
          <div>
            <div>
              <div>
                <span>📊</span>
              </div>
              <Heading size="lg">Transparent Tracking</Heading>
              <Text fontSize="sm">Real-time visibility into equity ownership and vesting schedules</Text>
            </div>
            
            <div>
              <div>
                <span>🤖</span>
              </div>
              <Heading size="lg">AI-Powered Insights</Heading>
              <Text fontSize="sm">Smart recommendations and automated compliance management</Text>
            </div>
            
            <div>
              <div>
                <span>🔒</span>
              </div>
              <Heading size="lg">Secure & Compliant</Heading>
              <Text fontSize="sm">Enterprise-grade security with regulatory compliance built-in</Text>
            </div>
          </div>
        </div>
        
        <div>
          <Stack direction="row" spacing="6">
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
          <div>
            <Text fontSize="sm">
              Trusted by leading companies
            </Text>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
}
