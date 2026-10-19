'use client';

import { ActionIcon, Anchor, CopyButton, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import classes from './EmailLink.module.css';

// Assembled in the browser so the address never appears in the server-rendered HTML,
// which keeps it away from scrapers that don't run JavaScript.
const parts = ['alejandrokennedy', 'gmail.com'];

export function EmailLink() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => setEmail(parts.join('@')), []);

  if (!email) return <span className={classes.placeholder} />;

  return (
    <span className={classes.row}>
      <Anchor href={`mailto:${email}`} c="inherit">
        {email}
      </Anchor>
      <CopyButton value={email} timeout={1500}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
            <ActionIcon
              onClick={copy}
              variant="subtle"
              color="gray"
              size="sm"
              className={classes.copy}
              data-copied={copied || undefined}
              aria-label="Copy email address"
            >
              {copied ? <IconCheck size={16} /> : <IconCopy size={16} stroke={1.5} />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </span>
  );
}
