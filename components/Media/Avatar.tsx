import Image, { ImageProps } from "next/image";

export interface AvatarProps extends Pick<ImageProps, "src"> {
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => (
  <div className="avatar">
    <style jsx>{`
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 9999px;
        overflow: hidden;
      }
    `}</style>
    <Image alt={name} src={src} width="40px" height="40px" unoptimized />
  </div>
);

export default Avatar;
