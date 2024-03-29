import React, { useState } from "react";
import useReactRouter from "use-react-router";
import { Image } from "semantic-ui-react";

import Text from "../../components/Text";

import { Space } from "../../utils/styles";

import {
  ForgotPasswordBottomContainer,
  InfoContainer,
  Link,
  Container,
  Banner,
  StyledInput,
  ForgotPasswordContainer,
  BottomContainer,
  ImageStrip,
  RightContainer,
  StyledButton,
  ErrorContainer,
  LoginContainer,
} from "./style";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSendLink, setIsSendLink] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const { history } = useReactRouter();

  const handleLogin = () => {
    if (isSignUp) {
      if (userName !== "" && password !== "" && email !== "") {
        history.push("/dashboard");
      }
    } else {
      if (userName === "Admin" && password === "Admin@1234") {
        history.push("/dashboard");
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  };

  return (
    <Container>
      <Banner />
      <RightContainer>
        <ImageStrip>
          <Image src="/images/arrow.png" />
        </ImageStrip>
        <LoginContainer>
          <Text fontSize={18} color="#13449C" fontWeight={600}>
            {isForgotPassword ? (
              "Forgot Password?"
            ) : (
              <>{isSignUp ? "Sign Up" : "Login"} to the Dashboard</>
            )}
          </Text>
          <Space vertical space={20} />
          {!isForgotPassword ? (
            <>
              <StyledInput
                placeholder="Enter User Name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={100}
              />
              {isSignUp && (
                <StyledInput
                  placeholder="Enter Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={100}
                />
              )}
              <StyledInput
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={100}
              />
              <ForgotPasswordContainer
                onClick={() => setIsForgotPassword(true)}
              >
                <Text fontSize={14} color="gray">
                  {" "}
                  Forgot Password{" "}
                </Text>
              </ForgotPasswordContainer>

              {!isFormValid && !isSignUp && (
                <ErrorContainer>
                  <Text fontSize={12} color="red" fontWeight={400}>
                    {" "}
                    Incorrect Credentials! Please try again
                  </Text>
                </ErrorContainer>
              )}
              <Space vertical space={28} />
              <BottomContainer>
                <StyledButton
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setUserName("");
                    setPassword("");
                    setEmail("");
                    setIsFormValid(true);
                  }}
                >
                  <Text fontSize={14} fontWeight={600} color="#FFF">
                    {isSignUp ? "Back to Login" : "New? Sign Up"}
                  </Text>
                </StyledButton>
                <StyledButton onClick={handleLogin}>
                  <Text fontSize={14} fontWeight={600} color="#FFF">
                    {isSignUp ? "Sign Up" : "Login Now"}
                  </Text>
                </StyledButton>
              </BottomContainer>
            </>
          ) : (
            <>
              <StyledInput
                placeholder="Enter your Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                maxLength={100}
              />
              <br />
              {isSendLink && (
                <InfoContainer>
                  <Text fontSize={14}>
                    We have send you an email with reset password link. Kindly
                    access the link to reset the Password.
                  </Text>
                </InfoContainer>
              )}

              <ForgotPasswordBottomContainer>
                <Link
                  onClick={() => {
                    if (email !== "") {
                      setIsSendLink(true);
                    }
                  }}
                >
                  <Text fontSize={14} color="gray">
                    {isSendLink ? "Resend" : "Send"} Link
                  </Text>
                </Link>
                <Link
                  onClick={() => {
                    setIsForgotPassword(false);
                    setIsSignUp(false);
                    setEmail("");
                  }}
                >
                  <Text fontSize={14} color="gray">
                    Login
                  </Text>
                </Link>
              </ForgotPasswordBottomContainer>
            </>
          )}
        </LoginContainer>
      </RightContainer>
    </Container>
  );
};

export default Login;
