import React, { useEffect, useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import getVideoId from 'get-video-id';
import { FiExternalLink } from 'react-icons/fi';
import Loader from 'components/common/elements/Loader';

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

  let sizeHeight = 'h-auto md:max-h-56';
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
        className={`rounded-lg bg-tfsdark-900 w-full flex items-center justify-center overflow-hidden text-xs text-center text-slate-400 h-36`}
      >
        <Loader />
      </div>
    );
  if (!data?.success) return '';
  return (
    <>
      {data?.ogSiteName === 'YouTube' && youTubeEmbedID ? (
        <div className="rounded-lg border border-gray-800 w-full h-48 md:h-96 max-h-96 overflow-hidden">
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
          className={`rounded-lg bg-tfsdark-600/60 sm:bg-tfsdark-900 w-full overflow-hidden ${sizeHeight}`}
        >
          <a href={data?.requestUrl} target="_blank" rel="noreferrer">
            <div className="flex flex-col md:flex-row items-start h-full">
              {data?.ogImage && (
                <div className="w-full h-full bg-tfsdark-800">
                  {data?.ogImage?.length > 1 ? (
                    <img
                      src={data?.ogImage[0]?.url}
                      className="w-full h-full object-cover object-center"
                      style={{ marginTop: 0, marginBottom: 0 }}
                      alt={data?.ogTitle}
                    />
                  ) : data?.ogImage?.url?.trim().length &&
                    isValidURL(data?.ogImage?.url) ? (
                    <img
                      src={data?.ogImage?.url}
                      className="w-full h-full object-cover object-left"
                      style={{ marginTop: 0, marginBottom: 0 }}
                      alt={data?.ogTitle}
                    />
                  ) : (
                    <div className="flex justify-center text-center h-20 sm:h-44 items-center bg-tfsdark-700/50">
                      <p className="text-slate-500 text-sm">No preview image</p>
                    </div>
                  )}
                </div>
              )}
              {!data?.ogImage && (
                <div className="w-full flex justify-center text-center h-20 sm:h-44 items-center bg-tfsdark-700/50">
                  <p className="text-slate-500 text-sm">No preview image</p>
                </div>
              )}
              {!hideDescription && (
                <div className="w-full px-4 py-4 text-sm font-normal space-y-2 text-white">
                  <div className="font-bold line-clamp-2">{data?.ogTitle}</div>
                  <div className="line-clamp-3 text-slate-300">
                    {data?.ogDescription}
                  </div>
                  <div className="hidden md:flex text-slate-400 truncate items-center space-x-1">
                    <FiExternalLink className="h-4 w-4" />
                    <span>{data?.requestUrl.substr(0, 40)}...</span>
                  </div>
                </div>
              )}
            </div>
          </a>
        </div>
      )}
    </>
  );
};

export default OpenGraphPreview;
