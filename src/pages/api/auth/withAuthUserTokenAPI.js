import { AuthAction, withAuthUserTokenSSR } from 'next-firebase-auth';

const checkServerSideAuth =
  typeof window !== 'undefined'
    ? null // "withAuthUserTokenSSR" can only be called server-side.
    : withAuthUserTokenSSR({
        whenAuthed: AuthAction.RENDER,
        whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
        authPageURL: '401',
      })(({ AuthUser }) => ({ AuthUser, props: {} }));

export function withAuthUserTokenAPI(handler, byPassAuth = false) {
  return async (req, res) => {
    const { AuthUser, redirect } = await checkServerSideAuth({ req, res });
    if (redirect) {
      if (byPassAuth) {
        return handler(req, res);
      } else {
        res.status(401).json({ ok: false, code: 'unauthorized' });
        return;
      }
    } else {
      return handler(req, res, AuthUser);
    }
  };

  // return async (req, res) => {
  //   const { AuthUser, redirect } = await checkServerSideAuth({ req, res });
  //   if (redirect) {
  //     res.status(401).json({ ok: false, code: "unauthorized" });
  //     return;
  //   }
  //   return handler(req, res, AuthUser);
  // };
}
