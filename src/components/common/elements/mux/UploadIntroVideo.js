import { useEffect, useRef, useState } from 'react';
import * as UpChunk from '@mux/upchunk';
import useSwr from 'swr';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import { BiLoaderAlt } from 'react-icons/bi';
import fetcher from 'utils/fetcher';

const UploadIntroVideo = ({ setMuxAssetId, buttonLabel }) => {
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
        // setCoverVideo(`https://stream.mux.com/${asset.playback_id}.m3u8`);
        // setCoverImage(
        //   `https://image.mux.com/${asset.playback_id}/animated.gif`
        // );
        setMuxAssetId(asset.playback_id);
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
      <div className="container">
        {isUploading ? (
          <>
            {isPreparing ? (
              <div className="ml-2 flex items-center space-x-1 pt-3 text-base-300">
                <BiLoaderAlt className="h-auto w-4 animate-spin" />
                <span>Preparing video...</span>
              </div>
            ) : (
              <div className="ml-2 flex items-center space-x-1 pt-3 text-base-300">
                <BiLoaderAlt className="h-auto w-4 animate-spin" />
                <span>Uploading...{progress ? `${progress}%` : ''}</span>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => inputRef.current.click()}
              className="btn btn-secondary"
            >
              {buttonLabel}
            </button>

            <input
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={startUpload}
              ref={inputRef}
            />
          </>
        )}
      </div>
      <style jsx>{`
        input {
          display: none;
        }
      `}</style>
    </>
  );
};

export default UploadIntroVideo;
