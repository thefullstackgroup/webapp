import Link from 'next/link';
import { useEffect, useState } from 'react';
import { checkIfUserOnline } from 'firebase/firebasePresence';
import Image from 'next/future/image';

const avatarSize = 'h-11 w-11 sm:h-14 sm:w-14';
const avatarWidth = 100;
const avatarHeight = 100;

const Avatar = (props) => {
  const [imgSrc, setImgSrc] = useState(props?.image);
  const [isOnline, setIsOnline] = useState(false);
  if (props.userId) checkIfUserOnline(props.userId, setIsOnline);

  let dimensions = avatarSize;
  if (props.dimensions) dimensions = props.dimensions;

  let width = avatarWidth;
  if (props.width) width = props.width;

  let height = avatarHeight;
  if (props.height) height = props.height;

  useEffect(() => {
    setImgSrc(props?.image);
  }, [props]);

  return (
    <div className="relative cursor-pointer">
      {props.href ? (
        <Link href={`${props.href}`} passHref>
          <div
            className={`${dimensions} rounded-full overflow-hidden hover:ring-4 hover:ring-primary-500 duration-200`}
          >
            <Image
              src={
                imgSrc ? imgSrc : '/assets/profile/user/avatar-notfound.webp'
              }
              className="h-full w-full object-cover"
              alt={props.name || ''}
              title={props.name}
              referrerPolicy="no-referrer"
              width={width}
              height={height}
              layout="fill"
              onError={() =>
                setImgSrc('/assets/profile/user/avatar-notfound.webp')
              }
            />
          </div>
        </Link>
      ) : (
        <div className={`${dimensions} rounded-full overflow-hidden`}>
          <Image
            src={imgSrc ? imgSrc : '/assets/profile/user/avatar-notfound.webp'}
            className="h-full w-full object-cover"
            alt={props.name || ''}
            title={props.name}
            referrerPolicy="no-referrer"
            width={width}
            height={height}
            layout="fill"
            onError={() =>
              setImgSrc('/assets/profile/user/avatar-notfound.webp')
            }
          />
        </div>
      )}
      {props.userId && isOnline && (
        <div className="absolute -bottom-1 right-0 w-full flex justify-end">
          <div className="w-1/3">
            <span
              className="flex rounded-full ring-0 w-3 h-3 bg-green-500"
              title="Online"
            ></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
