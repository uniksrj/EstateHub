"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"


const ImageCarousel = ({ image , className = "" }) => {
    console.log(image);
    
    
    const imageArray = Array.isArray(image) ? image : [image];

    if (!imageArray || imageArray.length === 0) {
        return (
            <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
                <img
                    src="/placeholder.svg"
                    alt="No image available"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
        );
    }

    return (
        <Carousel className="w-full">
            <CarouselContent>
                {imageArray.map((image, index) => (
                    <CarouselItem key={image.id || index}>
                        <div className="p-1">
                            <div className="w-full aspect-[16/9]">
                                <img
                                    src={image.image_path || "/placeholder.svg"}
                                    alt={image.caption || `Property Image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {imageArray.length > 1 && (
                <>
                    <CarouselPrevious />
                    <CarouselNext />
                </>
            )}
        </Carousel>
    );
}

export default ImageCarousel
