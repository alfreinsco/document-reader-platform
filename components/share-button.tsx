'use client';

import { useState } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QRCodeGenerator } from './qr-code';
import { Separator } from '@/components/ui/separator';

interface ShareButtonProps {
  slug: string;
}

export function ShareButton({ slug }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/read/${slug}` 
    : `https://docreader.vercel.app/read/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = `Baca dokumen: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleInstagram = () => {
    // Instagram doesn't support direct sharing via URL, so we copy to clipboard and inform user
    handleCopyLink();
    alert('Link sudah disalin! Buka Instagram dan bagikan link di bio atau caption Anda.');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
          <Share2 className="h-4 w-4" />
          Bagikan Dokumen
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bagikan Dokumen</DialogTitle>
          <DialogDescription>
            Pilih cara untuk membagikan dokumen ini kepada orang lain
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Share Link */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Link Publik
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-muted text-foreground text-sm rounded-lg border border-border"
              />
              <Button
                variant={copied ? 'default' : 'outline'}
                size="sm"
                onClick={handleCopyLink}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Disalin
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Salin
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator />

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-foreground block mb-4">
              QR Code
            </label>
            <QRCodeGenerator url={shareUrl} />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Scan QR code untuk membuka dokumen
            </p>
          </div>

          <Separator />

          {/* Social Media Share */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-3">
              Bagikan di Media Sosial
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleWhatsApp}
                className="gap-2 h-auto py-3 bg-transparent"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.999 1.493 9.967 9.967 0 003.168 18.737.976.976 0 00.939-.945v-.03c0-.19-.064-.375-.152-.54l-.81-.81a.956.956 0 00-.75-.348h-.002a9.01 9.01 0 01-6.397-2.712 9.011 9.011 0 012.712-6.397c.374-.35.591-.878.591-1.436 0-.56-.217-1.087-.591-1.436a9.99 9.99 0 00-7.098-2.941c-.557 0-1.084.214-1.437.588a9.98 9.98 0 003.097 17.191 9.98 9.98 0 009.18 1.447c.556-.199 1.06-.567 1.373-1.08.314-.513.485-1.1.485-1.701 0-.597-.171-1.183-.485-1.696a2.015 2.015 0 00-1.373-1.082c-2.067-.39-4.056-.39-6.122 0a2.015 2.015 0 00-1.373 1.081 2.029 2.029 0 00-.485 1.697 2.045 2.045 0 00.486 1.701c.313.513.817.881 1.373 1.081a9.97 9.97 0 006.121-9.978c0-.557-.214-1.084-.588-1.437a9.98 9.98 0 00-7.097-2.941z" />
                </svg>
                WhatsApp
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleFacebook}
                className="gap-2 h-auto py-3 bg-transparent"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleInstagram}
                className="gap-2 h-auto py-3 bg-transparent"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.71.272-1.313.644-1.915 1.246-.602.602-.974 1.205-1.246 1.915-.267.788-.468 1.658-.528 2.936C.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.528 2.936.272.71.644 1.313 1.246 1.915.602.602 1.205.974 1.915 1.246.788.267 1.658.468 2.936.528C8.333 23.985 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.936-.528.71-.272 1.313-.644 1.915-1.246.602-.602.974-1.205 1.246-1.915.267-.788.468-1.658.528-2.936.057-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.528-2.936-.272-.71-.644-1.313-1.246-1.915-.602-.602-1.205-.974-1.915-1.246-.788-.267-1.658-.468-2.936-.528C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.85.07 1.17.054 1.805.244 2.227.408.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.354 1.057.408 2.227.061 1.266.07 1.646.07 4.85s-.009 3.585-.07 4.85c-.054 1.17-.244 1.805-.408 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.354-2.227.408-1.266.061-1.646.07-4.85.07s-3.585-.009-4.85-.07c-1.17-.054-1.805-.244-2.227-.408-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.354-1.057-.408-2.227-.061-1.266-.07-1.646-.07-4.85s.009-3.585.07-4.85c.054-1.17.244-1.805.408-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.266-.061 1.646-.07 4.85-.07l-.003-2.16z" />
                </svg>
                Instagram
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              ℹ️ Link share bersifat public dan read-only. Penerima hanya dapat membaca dokumen tanpa akses download.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
