import React from "react";
import { Link } from "react-router-dom";
import {
  Text,
  Stack,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
} from "../components";
import { useContext } from "react";
import { AuthContext } from "../App";
import holdDocSvg from "../assets/hold-doc.svg";

export function Signin() {
  const { authorize } = useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function signin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const userResponse = await fetch("/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const user = await userResponse.json();
      authorize(user);
    } catch (e) {
      setError("Failed to authenticate. Please check your email and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const isFormValid = email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img
              src={holdDocSvg}
              width="80"
              height="80"
              alt="Hold Document"
              className="mx-auto"
            />
          </div>
          <Heading size="2xl" className="text-gray-900">
            Welcome Back
          </Heading>
          <Text align="center" className="text-gray-600">
            Sign in to your equity management account
          </Text>
        </div>

        <div className="bg-white py-8 px-6 shadow-sm rounded-lg border border-gray-200">
          <Stack as="form" spacing="6" onSubmit={signin}>
            <FormControl isInvalid={!!error}>
              <FormLabel className="text-gray-700 font-medium">
                Email Address
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your email"
                size="lg"
              />
              {error && (
                <FormHelperText>
                  {error}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              size="lg"
              disabled={!isFormValid || isLoading}
              className="w-full"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </Stack>

          <div className="mt-6 text-center space-y-4">
            <div className="space-y-4">
              <Text fontSize="sm" className="text-gray-600 mb-2">
                Don't have an account?
              </Text>
              <Button
                as={Link}
                to="/start"
                variant="outline"
                size="md"
                className="w-full mt-2"
              >
                Create Account
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Text fontSize="sm">
                <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                  ← Back to Home
                </Link>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
