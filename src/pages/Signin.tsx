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
    <div>
      <Stack spacing="8">
        <div>
          <div>
            <img 
              src={holdDocSvg} 
              width="60" 
              height="60" 
              alt="Hold Document" 
            />
          </div>
          <Heading size="2xl">
            Welcome Back
          </Heading>
          <Text>
            Sign in to your equity management account
          </Text>
        </div>
        
        <div>
          <Stack as="form" spacing="6" onSubmit={signin}>
            <FormControl isInvalid={!!error}>
              <FormLabel>
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
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </Stack>
          
          <div>
            <Text fontSize="sm">
              Don't have an account?
            </Text>
            <Button 
              as={Link} 
              to="/start" 
              variant="outline" 
              size="md"
            >
              Create Account
            </Button>
          </div>
          
          <div>
            <Text fontSize="sm">
              <Link to="/">
                ← Back to Home
              </Link>
            </Text>
          </div>
        </div>
      </Stack>
    </div>
  );
}
