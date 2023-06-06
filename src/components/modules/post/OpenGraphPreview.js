import React, { useEffect, useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import getVideoId from 'get-video-id';
import { FiExternalLink } from 'react-icons/fi';
import Loader from 'components/common/elements/Loader';
import Icon from 'components/common/elements/Icon';

const isValidURL = (input) => {
  if (validator.isURL(input, { require_protocol: true })) {
    return true;
  } else {
    return false;
  }
};

const OpenGraphPreview = ({ link, height, hideDescription = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [youTubeEmbedID, setYouTubeEmbedID] = useState(null);

  let sizeHeight = 'h-auto md:max-h-auto';
  if (height) {
    sizeHeight = height;
  }

  const getPreview = async () => {
    if (link != null) {
      await axios
        .get(`${process.env.BASEURL}/api/posts/getURLPreview?url=${link}`)
        .then((response) => {
          setData(response.data);
          if (response.data.ogSiteName === 'YouTube')
            setYouTubeEmbedID(getVideoId(response.data.ogVideo?.url));
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (!data) {
      getPreview(link);
    }
  }, []);

  if (loading)
    return (
      <div
        className={`flex h-36 w-full items-center justify-center overflow-hidden rounded-lg bg-base-900 text-center text-xs text-base-400`}
      >
        <Loader />
      </div>
    );
  if (!data?.success) return '';
  return (
    <>
      {data?.ogSiteName === 'YouTube' && youTubeEmbedID ? (
        <div className="h-48 max-h-96 w-full overflow-hidden rounded-lg border border-gray-800 md:h-96">
          <LiteYouTubeEmbed
            id={youTubeEmbedID.id}
            title={data?.ogTitle}
            aspectHeight={4}
            aspectWidth={3}
            autoplay={1}
          />
        </div>
      ) : (
        <div
          className={`w-full overflow-hidden bg-base-600/60 sm:bg-base-900 ${sizeHeight}`}
        >
          <a href={data?.requestUrl} target="_blank" rel="noreferrer">
            {data?.ogImage && (
              <div className="h-full w-full bg-base-800">
                {data?.ogImage?.length > 1 ? (
                  <img
                    src={data?.ogImage[0]?.url}
                    className="h-full w-full object-cover object-center"
                    style={{ marginTop: 0, marginBottom: 0 }}
                    alt={data?.ogTitle}
                  />
                ) : (
                  data?.ogImage?.url?.trim().length &&
                  isValidURL(data?.ogImage?.url) && (
                    <img
                      src={data?.ogImage?.url}
                      className="h-full w-full object-cover object-left"
                      style={{ marginTop: 0, marginBottom: 0 }}
                      alt={data?.ogTitle}
                    />
                  )
                )}
              </div>
            )}
            {!data?.ogImage && (
              <div className="flex h-20 w-full items-center justify-center bg-base-700/50 text-center sm:h-44">
                <p className="text-sm text-base-500">No preview image</p>
              </div>
            )}
            {!hideDescription && (
              <div className="w-full px-4 py-4 text-sm font-normal text-white dark:bg-base-700/70">
                <div className="flex items-center space-x-2">
                  <div className="truncate text-base font-bold">
                    {data?.ogTitle}
                  </div>
                  <Icon name="FiExternalLink" className="h-4 w-4" />
                </div>
                <div className="dark:text-base-200">{data?.ogDescription}</div>
                {/* <div className="hidden items-center space-x-1 truncate dark:text-base-200 md:flex">
                  <span>{data?.requestUrl.substr(0, 40)}...</span>
                  <Icon name="FiExternalLink" className="h-4 w-4" />
                </div> */}
              </div>
            )}
          </a>
        </div>
      )}
    </>
  );
};

export default OpenGraphPreview;
