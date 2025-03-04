import { environment } from '@environments/environment';
import { sleep } from '@helpers/sleep';

import { GitHubIssue, State } from '../interfaces';

const BASE_URL: string = environment.baseUrl;
const GITHUB_TOKEN: string = environment.gitHubToken;

export const getIssues: (state: State) => Promise<GitHubIssue[]> = async (
  state: State = State.All,
): Promise<GitHubIssue[]> => {
  try {
    await sleep(1500);

    const params = new URLSearchParams();
    params.append('state', state);

    const resp: Response = await fetch(`${BASE_URL}/issues?${params}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) {
      throw new Error('Failed to get issues.');
    }

    return await resp.json();
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
