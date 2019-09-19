import { action } from './action';
import { store } from '../firebase/FirebaseConfig';

export const GET_INTERESTS = 'GET_INTERESTS';
export const GOT_INTERESTS = 'GOT_INTERESTS';
export const GETTING_TAGS_ERROR = 'GETTING_TAGS_ERROR';

/**
 * Tag Actions
 * @module actions/tags
 *
 */

/**
 * Get all Interests Tags
 *
 * @function
 * @param {Dispatch} dispatch
 */

export const getInterestTags = dispatch => {
  dispatch(action(GET_INTERESTS));
  store
    .collection('tags')
    .get()
    .then(res => {
      let interests = [];
      res.forEach(doc => {
        let interest = doc.data();
        interest.id = doc.id;
        interests.push(interest);
      });
      dispatch(action(GOT_INTERESTS, interests));
    })
    .catch(err => {
      dispatch(action(GETTING_TAGS_ERROR));
    });
};

export const GET_REQUIREMENTS = 'GET_REQUIREMENTS';
export const GOT_REQUIREMENTS = 'GOT_REQUIREMENTS';

/**
 * Get all requirement tags from the DB.
 *
 * @function
 * @param {Dispatch} dispatch
 */

export const getRequirementTags = dispatch => {
  dispatch(action(GET_REQUIREMENTS));
  store
    .collection('requirements')
    .get()
    .then(res => {
      let requirements = [];
      res.forEach(req => {
        let requirement = req.data();
        requirement.id = req.id;
        requirements.push(requirement);
      });
      dispatch(action(GOT_REQUIREMENTS, requirements));
    })
    .catch(err => {
      dispatch(action(GETTING_TAGS_ERROR));
    });
};

export const GET_CAUSE_AREAS = 'GET_CAUSE_AREAS';
export const GOT_CAUSE_AREAS = 'GOT_CAUSE_AREAS';

/**
 * Get all cause areas from DB.
 *
 * @function
 * @param {Dispatch} dispatch
 */

export const getCauseAreas = dispatch => {
  dispatch(action(GET_CAUSE_AREAS));
  store
    .collection('cause areas')
    .get()
    .then(res => {
      let causes = [];
      res.forEach(doc => {
        let cause = doc.data();
        cause.id = doc.id;
        causes.push(cause);
      });
      dispatch(action(GOT_CAUSE_AREAS, causes));
    })
    .catch(err => {
      dispatch(action(GETTING_TAGS_ERROR));
    });
};
