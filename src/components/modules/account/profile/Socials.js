import axios from 'axios';
import { useState } from 'react';
import Icon from 'components/common/elements/Icon';

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
      <div className="mt-4 w-full">
        {successAlert && (
          <div className="relative w-full rounded-md bg-green-500/20 py-1.5 px-2 text-center text-sm text-green-500">
            Changes saved!
          </div>
        )}
        <div className="space-y-6 py-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Your Instagram profile"
              value={instagramAc}
              onChange={(e) => setInstagramAc(e.target.value)}
              className="text-input"
            />
            <Icon
              name="SiInstagram"
              pack="Si"
              className="h-6 w-6 text-gray-400"
            />
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Your Twitter handle"
              value={twitterAcc}
              onChange={(e) => setTwitterAcc(e.target.value)}
              className="text-input"
            />
            <Icon
              name="SiTwitter"
              pack="Si"
              className="h-6 w-6 text-gray-400"
            />
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Your LinkedIn profile"
              value={linkedInAcc}
              onChange={(e) => setlinkedInAcc(e.target.value)}
              className="text-input"
            />
            <Icon
              name="SiLinkedin"
              pack="Si"
              className="h-6 w-6 text-gray-400"
            />
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Your Facebook profile"
              value={facebookAcc}
              onChange={(e) => setFacebookAcc(e.target.value)}
              className="text-input"
            />
            <Icon
              name="SiFacebook"
              pack="Si"
              className="h-6 w-6 text-gray-400"
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Socials;
