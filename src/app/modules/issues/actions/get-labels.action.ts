import { environment } from '@environments/environment';
// import { sleep } from '@helpers/sleep';

import { GitHubLabel } from '../interfaces';

const BASE_URL: string = environment.baseUrl;
const GITHUB_TOKEN: string = environment.gitHubToken;

export const getLabels: () => Promise<GitHubLabel[]> = async (): Promise<
  GitHubLabel[]
> => {
  try {
    // await sleep(1500);

    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) {
      throw new Error('Failed to get labels.');
    }

    return await resp.json();
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
