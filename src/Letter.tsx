import React, { useRef, useState, useEffect } from 'react';
import { extract, LetterparserNode } from 'letterparser';

import { RawLetter } from './RawLetter';

export interface LetterProps {
  /**
   * The e-mail contents to use, either as a raw RFC 822 message or output from letterparser.
   */
  message: string | LetterparserNode;

  /**
   * Should the HTML be wrapped in an iframe. Default: false.
   */
  useIframe?: boolean;

  /**
   * Class name of the wrapper div.
   */
  className?: string;
}

export const Letter: React.FC<LetterProps> = ({
  message,
  useIframe,
  className
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [html, setHtml] = useState<string>('');
  const [text, setText] = useState<string>();
  const [subject, setSubject] = useState<string>();

  useEffect(() => {
    const mail = extract(message);
    setSubject(mail.subject);
    setHtml(mail.html ?? '');
    setText(mail.text);
  }, [message, setHtml, setText, setSubject, iframeRef]);

  return (
    <RawLetter
      html={html}
      text={text}
      iframeTitle={subject}
      className={className}
      useIframe={useIframe}
    />
  );
};
