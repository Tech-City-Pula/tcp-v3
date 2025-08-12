import { Html, Text } from '@react-email/components';
import type { ReactNode } from 'react';

export function ContactEmail(props: { children: ReactNode }) {
  return (
    <Html>
      <Text>{props.children}</Text>
    </Html>
  );
}

export default ContactEmail;
