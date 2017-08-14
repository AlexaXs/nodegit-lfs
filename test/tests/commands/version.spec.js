import NodeGit from 'nodegit';
import path from 'path';
import { todo } from '../../utils';
import { default as LFS } from '../../../build/src';
import version from '../../../build/src/commands/version';

describe('Version', function () {
  it('does provide version number', function () {
    const workdirPath = path.join(__dirname, '../../repos/workdir');
    const NodeGitLFS = LFS(NodeGit);

    return NodeGitLFS.Repository.open(workdirPath)
      .then(repo => version(repo))
      .then(() => todo());
  });
});
