import { sleep } from '@helpers/sleep';

import { GitHubLabel } from '../interfaces';

export const getLabels: () => Promise<GitHubLabel[]> = async (): Promise<
  GitHubLabel[]
> => {
  try {
    await sleep(1500);

    const resp = await fetch(
      `https://api.github.com/repos/angular/angular/labels`,
    );

    if (!resp.ok) {
      throw new Error('Failed to get labels.');
    }

    const labels: GitHubLabel[] = await resp.json();
    console.log({ labels });

    return labels;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
