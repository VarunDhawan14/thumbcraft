import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";
import type { AspectRatio, IThumbnail } from "../assets/assets";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {
  const aspectClasses = {
    "16:9": "aspect-[16/8.5]",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  } as Record<AspectRatio, string>;

  const onDownload = () => {
    if (!thumbnail?.image_url) return;
    window.open(thumbnail.image_url, "_blank");
  };

  return (
    <div className='relative w-full'>
      <div
        className={`relative overflow-hidden rounded-xl bg-black/10 ${aspectClasses[aspectRatio]}`}
      >
        {/* LOADING STATE */}
        {isLoading && (
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25'>
            <Loader2Icon className='size-8 animate-spin text-zinc-400' />
            <div className='text-center'>
              <p className='text-sm font-medium text-zinc-200'>
                AI is creating your thumbnail....
              </p>
              <p className='mt-1 text-xs text-zinc-400'>
                This may take 10-20 seconds
              </p>
            </div>
          </div>
        )}
        {/* IMAGE PREVIEW */}
        {!isLoading && thumbnail?.image_url && (
          <div className='group relative h-full w-full'>
            <img
              src={thumbnail.image_url}
              alt={thumbnail.title}
              className='h-full  w-full object-cover'
            />
            <div className='absolute inset-0 flex items-end justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100'>
              <button
                onClick={onDownload}
                type='button'
                className='mb-6 flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium transition bg-white/30 ring-2 ring-white/40 backdrop-blur hover:scale-105 active:scale-95'
              >
                <DownloadIcon className='size-4' />
                Download Thumbnail
              </button>
            </div>
          </div>
        )}

        {/* EMPTY state */}
        {!isLoading && !thumbnail?.image_url && (
          <div className='absolute inset-0 flex items-center justify-center p-8'>
            <div className='flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/20 bg-black/20'>
              <ImageIcon className='mb-5 h-16 w-16 text-zinc-500' />

              <h3 className='mt-4 text-2xl font-bold'>
                Generate your first thumbnail
              </h3>

              <p className='mt-2 text-center text-sm text-zinc-400'>
                Fill out the form and click Generate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
