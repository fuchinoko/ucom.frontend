import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'; // eslint-disable-line no-unused-vars

export const OFFER_TYPES = [{
  id: 1,
  description: 'Sale',
}];
// , {
//   id: 2,
//   description: 'Token Sale',
// }, {
//   id: 3,
//   description: 'Event',
// }, {
//   id: 4,
//   description: 'Service',
// }, {
//   id: 5,
//   description: 'Whitelist',
// }, {
//   id: 6,
//   description: 'Charity',
// }, {
//   id: 7,
//   description: 'Giveaway',
// }];

export const getOfferEditUrl = (offerId) => {
  if (!offerId) {
    return null;
  }

  return `/posts/${offerId}/edit`;
};

export const getDateLeft = (createdAt, durationInDays) => {
  if (!createdAt || !durationInDays) {
    return null;
  }

  const nowDate = moment();
  const startDate = moment(createdAt);
  const endDate = startDate.add(durationInDays, 'days');
  const diff = endDate.diff(nowDate);
  if (diff < 0) {
    return null;
  }
  const duration = moment.duration(diff).format('y d h:mm:ss', { stopTrim: 'y d' }).split(' ');
  return {
    years: duration[0],
    days: duration[1],
    time: duration[2],
  };
};
