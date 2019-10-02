import qs from 'query-string';

export const authorize = ({ clientId, redirectUri }) => {
  const query = {
    client_id: clientId,
    redirect_uri: redirectUri
  };

  window.open(`https://github.com/login/oauth/authorize?${qs.stringify(query)}`, '_self');
}