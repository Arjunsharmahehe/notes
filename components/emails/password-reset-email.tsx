import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

type PasswordResetProps = {
  name: string;
  email: string;
  resetUrl: string;
};

const PasswordReset = (props: PasswordResetProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your Notes password</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
            <Section>
              <Text className="text-[24px] font-bold text-gray-900 mb-[16px] mt-0">
                Password Reset Request
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] mt-0">
                Hi {props.name},
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] mt-0">
                We received a request to reset the password for your Notes account. 
                If you made this request, click the button below to create a new password.
              </Text>
              
              <Section className="text-center mb-[32px]">
                <Button
                  href={props.resetUrl}
                  className="bg-red-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] mt-0">
                If the button above doesn&apos;t work, you can copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-red-600 mb-[24px] mt-0 break-all">
                {props.resetUrl}
              </Text>

              <Text className="text-[14px] text-gray-600 mb-[16px] mt-0">
                This password reset link will expire in 1 hour for security reasons.
              </Text>

              <Text className="text-[14px] text-gray-600 mb-[24px] mt-0">
                <strong>If you didn&apos;t request this password reset:</strong><br />
                You can safely ignore this email. Your password will remain unchanged, 
                and your Notes account remains secure.
              </Text>

              <Hr className="border-gray-200 my-[24px]" />

              <Text className="text-[14px] text-gray-600 mb-[8px] mt-0">
                Best regards,<br />
                The Notes Team
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />
            
            <Section>
              <Text className="text-[12px] text-gray-500 m-0">
                Notes - Your Local-First Note Taking Experience
              </Text>
              <Text className="text-[12px] text-gray-500 m-0">
                This email was sent to {props.email}
              </Text>
              <Text className="text-[12px] text-gray-500 m-0">
                © {new Date().getFullYear()} Notes. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PasswordReset.PreviewProps = {
  name: "John Doe",
  email: "john@example.com",
  resetUrl: "https://notes.app/reset-password?token=xyz789abc",
};

export default PasswordReset;