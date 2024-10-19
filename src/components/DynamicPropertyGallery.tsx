import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface GalleryProps {
  images?: string[]
}

export default function DynamicPropertyGallery({ images = [] }: GalleryProps) {
  const [showAll, setShowAll] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const displayImages = showAll ? images : images.slice(0, 5)

  if (images.length === 0) {
    return (
      <div className="relative w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-4 gap-2 h-[400px]">
        {displayImages.map((src, index) => (
          <div
            key={src}
            className={`${
              index === 0
                ? "col-span-2 row-span-2"
                : index < 5
                ? "col-span-1 row-span-1"
                : "hidden"
            } relative overflow-hidden rounded-lg cursor-pointer`}
            onClick={() => setSelectedImage(src)}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
      {images.length > 5 &&
      (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="absolute bottom-4 right-4">
              View all photos
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl border-none">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
              {images.map((src, index) => (
                <div
                  key={src}
                  className="relative aspect-square cursor-pointer"
                  onClick={() => setSelectedImage(src)}
                >
                  <Image
                    src={src}
                    alt={`Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="p-0 border-none">
          <div className="relative w-full h-full min-h-[50vh]">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Expanded view"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            )}
            {/* <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button> */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}