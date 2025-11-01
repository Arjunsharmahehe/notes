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

type VerificationTemplateProps = {
  name: string;
  email: string;
  verificationUrl: string;
};

const VerificationTemplate = (props: VerificationTemplateProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Verify your email address to get started with Notes</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
            <Section>
              <Text className="text-[24px] font-bold text-gray-900 mb-[16px] mt-0">
                Welcome to Notes!
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] mt-0">
                Hi {props.name},
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] mt-0">
                Thanks for signing up for Notes, your powerful local-first note taking experience. 
                To get started and secure your account, please verify your email address by clicking the button below.
              </Text>
              
              <Section className="text-center mb-[32px]">
                <Button
                  href={props.verificationUrl}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] mt-0">
                If the button above doesn&apos;t work, you can copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 mb-[24px] mt-0 break-all">
                {props.verificationUrl}
              </Text>

              <Text className="text-[14px] text-gray-600 mb-[24px] mt-0">
                This verification link will expire in 24 hours for security reasons. 
                If you didn&apos;t create an account with Notes, you can safely ignore this email.
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

export default VerificationTemplate;