import { useEffect, useRef, useState } from 'react';
import * as UpChunk from '@mux/upchunk';
import useSwr from 'swr';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import { BiLoaderAlt } from 'react-icons/bi';
import { IoVideocamOutline } from 'react-icons/io5';
import fetcher from 'utils/fetcher';

const UploadPostVideo = ({ setCoverImage, setCoverVideo }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [uploadId, setUploadId] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [asset, setAsset] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [check, setCheck] = useState(0);
  const inputRef = useRef(null);

  const { data, error } = useSwr(
    () => (isPreparing ? `/api/video/upload/${uploadId}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );
  const upload = data && data.upload;

  const getAssetData = async (upload = null) => {
    if (upload != null) {
      await axios
        .get(`/api/video/asset/${upload.asset_id}`)
        .then((response) => {
          setAsset(response.data.asset);
        })
        .catch((error) => {
          console.log(error.status);
        });
    }
  };

  useEffect(() => {
    if (upload && upload.asset_id) {
      setIsCompleted(true);
    }
  }, [upload]);

  useEffect(() => {
    const id = setInterval(() => {
      getAssetData(upload);
      setCheck(check + 1);
    }, 2000);
    return () => clearInterval(id);
  }, [check]);

  useEffect(() => {
    if (isCompleted) {
      if (asset && asset.playback_id && asset.status === 'ready') {
        setIsUploading(false);
        setCoverVideo(`https://stream.mux.com/${asset.playback_id}.m3u8`);
        setCoverImage(
          `https://image.mux.com/${asset.playback_id}/animated.gif`
        );
      }
    }
  }, [asset]);

  if (error) return <ErrorMessage message="Error fetching api" />;
  if (data && data.error) return <ErrorMessage message={data.error} />;

  const createUpload = async () => {
    try {
      return fetch('/api/video/upload', {
        method: 'POST',
      })
        .then((res) => res.json())
        .then(({ id, url }) => {
          setUploadId(id);
          return url;
        });
    } catch (e) {
      console.error('Error in createUpload', e);
      setErrorMessage('Error creating upload');
    }
  };

  const startUpload = () => {
    setIsCompleted(false);
    setIsUploading(true);
    const upload = UpChunk.createUpload({
      endpoint: createUpload,
      file: inputRef.current.files[0],
    });

    upload.on('error', (err) => {
      setErrorMessage(err.detail);
    });

    upload.on('progress', (progress) => {
      setProgress(Math.floor(progress.detail));
    });

    upload.on('success', () => {
      setIsPreparing(true);
    });
  };

  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <>
      <div>
        {isUploading ? (
          <>
            {isPreparing ? (
              <div className="text-sm flex items-center space-x-1">
                <BiLoaderAlt className="w-4 h-auto animate-spin" />
                <span>Preparing...</span>
              </div>
            ) : (
              <div className="text-sm flex items-center space-x-1">
                <BiLoaderAlt className="w-4 h-auto animate-spin" />
                <span>Uploading...{progress ? `${progress}%` : ''}</span>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              className="flex space-x-1 items-center font-semibold"
              onClick={() => inputRef.current.click()}
            >
              <IoVideocamOutline className="h-6 mx-auto w-auto text-gray-400 dark:text-gray-400" />
              <span className="hidden md:block text-sm">Video</span>
            </button>

            <input
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={startUpload}
              ref={inputRef}
              className="hidden"
            />
          </>
        )}
      </div>
    </>
  );
};

export default UploadPostVideo;
