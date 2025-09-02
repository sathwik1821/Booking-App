import icons from '@/lib/icons';
import React from 'react';

const StarIcon=icons["star"];
const CheckIcon=icons["check"];

const hotelInfo = {
  description:
    'A boutique resort with an Indo-Portuguese architecture, the Ronil Goa offers lively holidays filled with recreational activities.',
  details: {
    type: 'Entire Homestay',
    bedrooms: 1,
    guests: 4,
    policies: ['Free Cancellation', 'Book with ₹0 Payment'],
  },
  rating: {
    score: 4.8,
    text: 'Excellent',
    reviews: 8,
  },
};

const HotelImages = ({ photos }) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const imageHoverHandler = (imageIndex) => {
    setActiveImageIndex(imageIndex);
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="w-60">
        <img
          height={138}
          width={240}
          className="rounded-sm max-h-[138px] w-full"
          src={photos[activeImageIndex]}
          alt={'Hotel Images'}
        />
      </div>
      <div className="grid grid-cols-4 gap-1 w-60">
        {photos.slice(1).map((image, index) => (
          <div className="relative overflow-hidden rounded-sm" key={image}>
            <img
              height={50}
              width={60}
              className="h-12"
              src={image}
              alt="Hotel Images"
              onMouseEnter={() => imageHoverHandler(index + 1)}
            />
            {index === photos.length - 2 && (
              <span className="text-[10px] flex pointer-events-none items-center justify-center font-semibold text-white absolute inset-0 backdrop-blur-sm">
                View All
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const HotelCard = ({ name, photos, city, id, amenities, price }) => {
  return (
    <article className="flex w-full transition-colors border rounded-lg hover:border-primary">
      <div className="flex flex-1 gap-4 p-4">
        <HotelImages photos={photos} />
        <div className="space-y-3">
          <div className="space-y-0.5">
            <h2 className="inline text-xl font-bold">
              {name} &nbsp;
              {new Array(3).fill(0).map((_, index) => (
               
                <StarIcon
                  key={index}
                  size="12"
                  className="inline mb-2 text-yellow-500"
                />
              ))}
            </h2>
            <p className="text-sm font-semibold text-primary">{city}</p>
          </div>
          <div className="flex items-center gap-0.5 text-muted-foreground">
            <p className="text-sm font-semibold">{hotelInfo.details.type}</p>|
            <p className="text-sm">{`${hotelInfo.details.bedrooms} Bedroom`}</p>
            |
            <p className="text-sm">{`Sleep ${hotelInfo.details.guests} Guests`}</p>
          </div>
          <div>
            <ul className="space-y-1">
              {amenities.slice(0, 2).map((policy, index) => (
                <li
                  key={index}
                  className="flex items-center gap-1 text-sm text-green-700"
                >
                  <CheckIcon icon="check" size="16" className="" />
                  {policy}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            <p className="text-sm line-clamp-1">{hotelInfo.description}</p>
            <span className="flex items-center text-xs font-medium shrink-0 text-primary">
              View More
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end w-48 p-4 border-l shrink-0">
        <div>
          <div className="flex gap-1.5">
            <p className="text-base font-bold text-brand">
              {hotelInfo.rating.text}
            </p>
            <span className="inline-block px-1 py-0.5 text-sm font-bold text-white rounded bg-brand">
              {hotelInfo.rating.score}
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-end">
            &#40;{`${hotelInfo.rating.reviews} Ratings`}&#41;
          </p>
        </div>
        <div className="flex flex-col items-end justify-center flex-1">
          <p className="text-2xl font-bold">{`₹ ${price.toLocaleString()}`}</p>
          <p className="text-sm text-muted-foreground">{`+ ₹0 taxes & fees`}</p>
          <p className="text-sm text-muted-foreground">Per Night</p>
        </div>
      </div>
    </article>
  );
};

export default React.memo(HotelCard);