import { environment } from '@environments/environment';

import gitHubIssueComments from '@mocks/github-issue-comments.mock.json';

import { GitHubIssue } from '../interfaces';

import { getIssueCommentsByNumber } from './get-issue-comments-by-number.action';

const BASE_URL: string = environment.baseUrl;
const GITHUB_TOKEN: string = environment.gitHubToken;
const issueNumber = '60200';
const issueComments: any = gitHubIssueComments;

describe('GetIssueCommentsByNumber [action]', () => {
  it('should fetch issue comments successfully', (done: DoneFn) => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueResponse = new Response(JSON.stringify(issueComments), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    getIssueCommentsByNumber(issueNumber)
      .then((response: GitHubIssue[]) => {
        expect(window.fetch).toHaveBeenCalledWith(requestURL, {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        });
        expect(response.length).toBeGreaterThanOrEqual(2);
        expect(response).toEqual(issueComments);

        done();
      })
      .catch(() => done.fail());
  });

  it('should throw an error if response is not ok', (done: DoneFn) => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    getIssueCommentsByNumber(issueNumber).catch((error) => {
      expect(window.fetch).toHaveBeenCalledWith(requestURL, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      });
      expect(error).toContain(
        `Error: Failed to get issue comments ${issueNumber}`,
      );
      done();
    });
  });
});
