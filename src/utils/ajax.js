import reqwest from 'reqwest';

export default (options) => {
  let url = options.url
  delete options.url;
  return reqwest({
    url: "http://api.sanxing.life/" + url,
    ...options
  });
}