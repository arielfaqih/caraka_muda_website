<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\ImageManager;

class ImageOptimizer
{
    private const MAX_WIDTH = 1600;
    private const WEBP_QUALITY = 80;

    /**
     * Resize (max 1600 px wide, no upscale), convert to WebP @80, store to disk.
     * Returns the stored path, e.g. "albums/1/abc123.webp".
     */
    public static function store(UploadedFile $file, string $directory, string $disk = 'public'): string
    {
        $manager = new ImageManager(new Driver());
        $image = $manager->decodePath($file->getPathname());

        if ($image->width() > self::MAX_WIDTH) {
            $image->scaleDown(width: self::MAX_WIDTH);
        }

        $encoded = $image->encode(new WebpEncoder(quality: self::WEBP_QUALITY));

        $path = $directory . '/' . Str::random(40) . '.webp';
        Storage::disk($disk)->put($path, (string) $encoded);

        return $path;
    }
}
