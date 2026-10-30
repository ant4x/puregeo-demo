import { getImageProps, type ImageProps, type StaticImageData } from "next/image";

/** An upright screen shows only a third of the wide photo's width, so it gets an upright crop of the same scene instead. */
const PORTRAIT_SCREEN = "(max-aspect-ratio: 2/3)";
const WIDE_SIZES = "(max-width: 640px) 50vw, (max-width: 1024px) 75vw, 100vw";

type HeroPhotoProps = Omit<ImageProps, "src" | "fill" | "sizes" | "quality" | "priority" | "preload"> & {
  wide: StaticImageData;
  portrait: StaticImageData;
};

/** One hero layer: the wide photo, or its upright crop on an upright screen. The browser loads only the one it shows. */
export default function HeroPhoto({ wide, portrait, alt, onLoad, ...props }: HeroPhotoProps) {
  const common = { ...props, alt, fill: true, quality: 60 };
  const {
    props: { srcSet: portraitSet },
  } = getImageProps({ ...common, src: portrait, sizes: "100vw" });
  const { props: wideProps } = getImageProps({ ...common, src: wide, sizes: WIDE_SIZES });
  return (
    <picture>
      <source media={PORTRAIT_SCREEN} srcSet={portraitSet} sizes="100vw" />
      <img {...wideProps} alt={alt} onLoad={onLoad} />
    </picture>
  );
}
