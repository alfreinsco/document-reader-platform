'use client';

import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeGeneratorProps {
  url: string;
}

export function QRCodeGenerator({ url }: QRCodeGeneratorProps) {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg border border-border bg-white p-2">
        <QRCodeCanvas
          value={url}
          size={200}
          level="M"
          includeMargin={false}
        />
      </div>
    </div>
  );
}
