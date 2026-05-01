"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { getImageUrl } from "@/utils/seo"


const ImageCarousel = ({
    image,
    className = "",
    altBase = "Property image",
    transformation = "f_auto,q_auto,c_fill,w_960,h_540",
    fit = "cover",
}) => {
    const imageArray = Array.isArray(image) ? image : [image];
    const frameClassName = className || "aspect-video";
    const objectFitClass = fit === "contain" ? "object-contain" : "object-cover";

    if (!imageArray || imageArray.length === 0) {
        return (
            <div className={`w-full max-w-full overflow-hidden rounded-lg bg-muted ${frameClassName}`}>
                <img
                    src="/placeholder.svg"
                    alt="No image available"
                    className="block h-full w-full object-cover"
                />
            </div>
        );
    }

    return (
        <Carousel className={`w-full max-w-full overflow-hidden rounded-lg ${frameClassName}`}>
            <CarouselContent>
                {imageArray.map((image, index) => (
                    <CarouselItem key={image.id || index}>
                        <div className={`w-full overflow-hidden ${frameClassName}`}>
                            <img
                                src={getImageUrl(image, transformation)}
                                alt={image.caption || `${altBase} ${index + 1}`}
                                className={`block h-full w-full ${objectFitClass}`}
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                            />
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
