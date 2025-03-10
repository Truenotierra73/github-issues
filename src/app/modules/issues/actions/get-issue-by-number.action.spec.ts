import { environment } from '@environments/environment';

import gitHubIssues from '@mocks/github-issues.mock.json';

import { getIssueByNumber } from './get-issue-by-number.action';

const BASE_URL: string = environment.baseUrl;
const GITHUB_TOKEN: string = environment.gitHubToken;
const issueNumber = '60200';
const issue: any = gitHubIssues[0];

describe('GetIssueByNumber [action]', () => {
  it('should fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(JSON.stringify(issue), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const result = await getIssueByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    expect(result).toEqual(issue);
  });

  it('should not fetch issue successfully', (done: DoneFn) => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    getIssueByNumber(issueNumber).catch((error) => {
      expect(window.fetch).toHaveBeenCalledWith(requestURL, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      });
      expect(error).toContain(`Error: Failed to get issue ${issueNumber}`);
      done();
    });
  });
});
