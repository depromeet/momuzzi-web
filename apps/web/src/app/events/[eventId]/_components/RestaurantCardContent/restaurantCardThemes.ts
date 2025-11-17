// restaurantCardThemes.ts
export type RestaurantCardTheme = 'lightCompact' | 'heroDark';

type UI = {
  root: string;
  gallery: string;
  galleryImage: string;
  title: string;
  sendIcon: string;
  metaText: string;
  metaIcon: string;
  reviewBox: string;
  reviewText: string;

  addrButton: string;
  addrText: string;
  wishButton: string;
  wishCount: string;
  buttonContainer: string;
  imageSkeleton: string;
};

export const CARD_UI = {
  lightCompact: {
    root: 'gap-2', // 간격(갭)
    gallery: 'py-2 gap-2',
    galleryImage: 'h-[5.625rem] w-[5.625rem]',
    title: 'subheading-1 font-bold text-neutral-1500',
    sendIcon: 'h-4 w-4 text-neutral-1500',
    metaText: 'text-neutral-1200',
    metaIcon: 'text-neutral-500',
    reviewBox: 'bg-neutral-200',
    reviewText: 'text-neutral-1200',
    addrButton: 'bg-neutral-300',
    addrText: 'text-neutral-1500',
    wishButton: 'bg-neutral-1600',
    wishCount: 'text-neutral-700',
    buttonContainer: 'mt-4',
    imageSkeleton: 'bg-neutral-200',
  },
  heroDark: {
    root: 'gap-2', // 더 넓은 갭
    gallery: 'py-3 gap-3',
    galleryImage: 'h-15 w-15',
    title: 'heading-3 font-bold text-white',
    sendIcon: 'h-5 w-5 text-white',
    metaText: 'text-white',
    metaIcon: 'text-neutral-500',
    reviewBox: 'bg-black-alpha-3',
    reviewText: 'text-white',
    addrButton: 'border border-white-alpha-2 bg-white-alpha-2',
    addrText: 'text-white',
    wishButton: 'border border-white-alpha-2 bg-black-alpha-4',
    wishCount: 'text-white',
    buttonContainer: '',
    imageSkeleton: 'bg-neutral-1400',
  },
} as const satisfies Record<RestaurantCardTheme, UI>;
