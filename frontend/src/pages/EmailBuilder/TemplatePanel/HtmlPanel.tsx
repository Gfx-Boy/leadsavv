import React, { useMemo } from 'react';

import { renderToStaticMarkup } from '@usewaypoint/email-builder';

import { useDocument } from '../documents/editor/EditorContext.tsx';

import HighlightedCodePanel from './helper/HighlightedCodePanel';

export default function HtmlPanel() {
  const document = useDocument();
  const code = useMemo(() => renderToStaticMarkup(document, { rootBlockId: 'root' }), [document]);
  return <HighlightedCodePanel type="html" value={code} />;
}
