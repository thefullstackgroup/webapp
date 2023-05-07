import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

import axios from 'axios';
import { useState } from 'react';

const Socials = ({ user }) => {
  const [facebookAcc, setFacebookAcc] = useState(
    user.bio.facebookAccount || ''
  );
  const [linkedInAcc, setlinkedInAcc] = useState(
    user.bio.linkedInAccount || ''
  );
  const [instagramAc, setInstagramAc] = useState(
    user.bio.instagramAccount || ''
  );
  const [twitterAcc, setTwitterAcc] = useState(user.bio.twitterAccount || '');
  const [successAlert, setSuccessAlert] = useState(false);

  const validURL = (str) => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  };

  const handleValidation = () => {
    const fieldsToValidate = [
      facebookAcc,
      linkedInAcc,
      instagramAc,
      twitterAcc,
    ];
    const invalidUrl = fieldsToValidate.find(
      (elem) => elem != '' && !validURL(elem)
    );

    if (invalidUrl) {
      alert(invalidUrl + ' is not a valid URL!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessAlert(false);

    const formData = {
      facebookAccount: facebookAcc,
      instagramAccount: instagramAc,
      linkedInAccount: linkedInAcc,
      twitterAccount: twitterAcc,
    };
    if (handleValidation()) {
      await axios
        .post(
          `${process.env.BASEURL}/api/profile/bio/update`,
          JSON.stringify(formData),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          if (response.status == 204) {
            setSuccessAlert(true);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  return (
    <>
      <div className="w-full mt-4">
        {successAlert && (
          <div className="relative bg-green-500/20 text-green-500 text-sm text-center w-full rounded-md py-1.5 px-2">
            Changes saved!
          </div>
        )}
        <div className="py-4 space-y-6">
          <div>
            <div className="flex">
              <span className="mt-1 text-base block bg-tfsdark-600/50 rounded-l-md py-3 px-3 focus:outline-none">
                <FaInstagram className="w-6 h-6 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Your Instagram profile"
                value={instagramAc}
                onChange={(e) => setInstagramAc(e.target.value)}
                className="text-input rounded-l-none"
              />
            </div>
          </div>

          <div>
            <div className="flex">
              <span className="mt-1 text-base block bg-tfsdark-600/50 rounded-l-md py-3 px-3 focus:outline-none">
                <FaTwitter className="w-6 h-6 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Your Twitter handle"
                value={twitterAcc}
                onChange={(e) => setTwitterAcc(e.target.value)}
                className="text-input rounded-l-none"
              />
            </div>
          </div>
          <div>
            <div className="flex">
              <span className="mt-1 text-base block bg-tfsdark-600/50 rounded-l-md py-3 px-3 focus:outline-none">
                <FaLinkedin className="w-6 h-6 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Your LinkedIn profile"
                value={linkedInAcc}
                onChange={(e) => setlinkedInAcc(e.target.value)}
                className="text-input rounded-l-none"
              />
            </div>
          </div>

          <div>
            <div className="flex">
              <span className="mt-1 text-base block bg-tfsdark-600/50 rounded-l-md py-3 px-3 focus:outline-none">
                <FaFacebook className="w-6 h-6 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Your Facebook profile"
                value={facebookAcc}
                onChange={(e) => setFacebookAcc(e.target.value)}
                className="text-input rounded-l-none"
              />
            </div>
          </div>
          <div>
            <button
              className="btn-primary w-full px-8 py-2.5"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Socials;
