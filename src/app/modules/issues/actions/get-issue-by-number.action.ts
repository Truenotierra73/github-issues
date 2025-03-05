import { environment } from '@environments/environment';
// import { sleep } from '@helpers/sleep';

import { GitHubIssue } from '../interfaces';

const BASE_URL: string = environment.baseUrl;
const GITHUB_TOKEN: string = environment.gitHubToken;

export const getIssueByNumber: (
  issueNumber: string,
) => Promise<GitHubIssue> = async (
  issueNumber: string,
): Promise<GitHubIssue> => {
  try {
    // await sleep(1500);

    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) {
      throw new Error('Failed to get issue.');
    }

    return await resp.json();
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
