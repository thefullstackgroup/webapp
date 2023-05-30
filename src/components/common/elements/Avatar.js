import Link from 'next/link';
import { useEffect, useState } from 'react';
import { checkIfUserOnline } from 'firebase/firebasePresence';
import Image from 'next/future/image';
import { Popover, Transition } from '@headlessui/react';

const avatarSize = 'h-11 w-11 sm:h-14 sm:w-14';
const avatarWidth = 100;
const avatarHeight = 100;

const ProfileImage = ({ src, setSrc, width, height, name }) => {
  return (
    <Image
      src={src}
      className="h-full w-full object-cover"
      alt={name}
      title={name}
      referrerPolicy="no-referrer"
      width={width}
      height={height}
      layout="fill"
      onError={() => setSrc('/assets/profile/user/avatar-notfound.webp')}
    />
  );
};

const Avatar = (props) => {
  const [isShowing, setIsShowing] = useState(false);
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

  return props.showMorePreview ? (
    <Popover className="relative z-50">
      <Popover.Button
        className={'btn px-1'}
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
      >
        <div className={`${dimensions} overflow-hidden rounded-full`}>
          <ProfileImage
            src={imgSrc ? imgSrc : '/assets/profile/user/avatar-notfound.webp'}
            setSrc={setImgSrc}
            width={width}
            height={height}
            name={props.name}
          />
        </div>
      </Popover.Button>

      <Transition
        show={isShowing}
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className={'relative z-50'}
      >
        <Popover.Panel className="relative bottom-0 -right-2 z-50 w-48">
          <div className="popover">
            {/* <div className="popover-arrow left-auto right-4"></div> */}

            <div className="flex items-start">
              <div className="w-64 space-y-2 px-2 py-4 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-base-200 p-4 dark:bg-base-700"></div>
                <p className="">Sign up or login to your account.</p>
                <div className="flex items-center justify-center space-x-2">
                  <Link href="/signup">
                    <button className="btn btn-primary btn-with-icon">
                      <span>Sign up</span>
                    </button>
                  </Link>
                  <Link href="/login">
                    <button className="btn btn-secondary btn-with-icon">
                      <span>Log in</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  ) : (
    <div className="relative cursor-pointer">
      {props.href ? (
        <Link href={`${props.href}`} passHref>
          <div
            className={`${dimensions} hover:ring-primary-500 overflow-hidden rounded-full duration-200 hover:ring-4`}
          >
            <ProfileImage
              src={
                imgSrc ? imgSrc : '/assets/profile/user/avatar-notfound.webp'
              }
              setSrc={setImgSrc}
              width={width}
              height={height}
              name={props.name}
            />
          </div>
        </Link>
      ) : (
        <div className={`${dimensions} overflow-hidden rounded-full`}>
          <ProfileImage
            src={imgSrc ? imgSrc : '/assets/profile/user/avatar-notfound.webp'}
            setSrc={setImgSrc}
            width={width}
            height={height}
            name={props.name}
          />
        </div>
      )}
      {props.userId && isOnline && (
        <div className="absolute -bottom-1 right-0 flex w-full justify-end">
          <div className="w-1/3">
            <span
              className="flex h-3 w-3 rounded-full bg-green-500 ring-0"
              title="Online"
            ></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
