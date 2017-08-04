import path from 'path';
import { Error } from 'nodegit';
import { exec } from '../utils/execHelpers';

const clean = (to, from, source) => {
  const realPath = path.join(source.repo().workdir(), source.path());
  const command = `cat ${realPath} | git lfs clean`;

  return exec(command)
    .then(({ stdout }) => {
      const sha = new Buffer(stdout);
      return to.set(sha, sha.length).then(() => 0);
    });
};
// TODO: test this to see if it works
const smudge = (to, from, source) => exec(`git lfs smudge ${source.path()}`);

const apply = (to, from, source) => {
  const mode = source.mode();
  let filterPromise;
  if (mode === 1) {
    filterPromise = clean(to, from, source);
  } else if (mode === 0) {
    filterPromise = smudge(to, from, source);
  }

  // TODO import the actual error codes
  return filterPromise
    .then(() => Error.CODE.OK)
    .catch(() => Error.CODE.PASSTHROUGH);
};

export { apply };
