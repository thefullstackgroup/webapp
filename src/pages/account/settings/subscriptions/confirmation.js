import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import Meta from 'components/common/partials/Metadata';
import SubscriptionConfirmation from 'components/modules/account/settings/subscriptions/Confirmation';

const AccountSubscriptionConfirmation = () => {
  return (
    <div>
      <Meta
        title={`${process.env.brandName} | Danger Zone`}
        description="The developer network"
        keywords=""
      />

      <SubscriptionConfirmation />
    </div>
  );
};

export default withAuthUser()(AccountSubscriptionConfirmation);

export const getServerSideProps = withAuthUserTokenSSR()();
